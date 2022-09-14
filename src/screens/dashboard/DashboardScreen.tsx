import ToastUtils from "../../utils/ToastUtils";
import React, {createRef, RefObject, useEffect, useMemo, useRef, useState} from "react";
import UserAPI from "../../api/spotify/UserAPI";
import ArtistAPI from "../../api/spotify/ArtistAPI";
import TinderCard from 'react-tinder-card';
import {useLocalStorage, useSessionStorage} from "react-meilleursbiens";
import Lottie from "lottie-react";
import loadingAnimation from "../../assets/lottie/lf30_editor_f26pm7hb.json";
import SpotifyCardComponent from "./components/SpotifyCardComponent";
import {useAudioPlayer, useAudioPosition} from "react-use-audio-player";
import Tour from 'reactour';
import OnboardingSteps from "./onboarding/OnboardingSteps";
import {useHotkeys} from "react-hotkeys-hook";
import LoadingBar from "react-top-loading-bar";
import {Button, ButtonGroup, Center, Divider, HStack, Kbd, Text, Tooltip, VStack} from "@chakra-ui/react";
import sadFaceImage from "../../assets/images/sad_face.png";
import happyFaceImage from "../../assets/images/happy_face.png";
import {useNavigate} from "react-router-dom";
import {Routes} from "../../Routes";
import {SaveIcon} from "@heroicons/react/outline";
import LoadingModalComponent from "./components/LoadingModalComponent";
import PlaylistAPI from "../../api/spotify/PlaylistAPI";

export default function DashboardScreen() {

    const loadinBarRef = useRef();
    const refCard = useRef();

    let navigate = useNavigate();

    const { togglePlayPause, load, playing } = useAudioPlayer({
        src: "",
        format: "mp3",
        autoplay: false,
        loop: false
    });
    const { percentComplete } = useAudioPosition({ highRefreshRate: true })

    const [isLoading, setIsLoading] = useState(true);
    const [progress, setProgress] = useState(0);
    const [isOnboarding, setIsOnboarding] = useState(true);
    const [topArtists, setTopArtists] = useState([]);
    const [recommendations, setRecommendations] = useState<any[]>([]);
    const [currentRecommendation, setCurrentRecommendation] = useState<number>(0);
    const [savedSongs, setSavedSongs] = useSessionStorage("spotify_saved_songs", []);
    const [color, setColor] = useState<string>("#000000");

    const [isLoadingAddToPlaylist, setIsLoadingAddToPlaylist] = useState(false);
    const [isDoneAddToPlaylist, setIsDoneAddToPlaylist] = useState(false);

    const _initSong = (track: any) => {
        load({
            src: track.preview_url,
            format: "mp3",
            autoplay: true,
            loop: true,
            onend: () => {
                if(refCard.current) {
                    // @ts-ignore
                    refCard.current.swipe('left');
                }
            }
        });
        console.log("Changing track to " + track.preview_url);
    }

    const onSwipe = (direction: any) => {
        setTimeout(() => {
            setCurrentRecommendation(currentRecommendation + 1);
        }, 500);
        if(direction === "right") {
            setSavedSongs([...savedSongs, recommendations[currentRecommendation].uri]);
        }
    }

    const onCardLeftScreen = (myIdentifier: any) => {

    }

    const _onChangeColor = (colors: string[]) => {
        if(colors.length > 0) setColor(colors[0]);
        else setColor("#000");
        console.log("Change color", colors[0]);
    }

    const _getTopArtists = () => {
        return new Promise((resolve, reject) => {
            UserAPI.getUserTopArtists().then((response: any) => {
                // @ts-ignore
                setTopArtists(response);
                resolve(response.items);
            }).catch((e: Error) => {
                ToastUtils.showError(e.toString());
                localStorage.clear();
                sessionStorage.clear();
                navigate(Routes.AUTH.LOGIN);
                reject(e);
            });
        });
    }

    const _getRecommendations = (ids: string[]) => {
        return new Promise((resolve, reject) => {
            ArtistAPI.getRecommendations(ids).then((response: any) => {
                let tracks = response.tracks.filter((track: any) => track.preview_url !== null);
                // @ts-ignore
                setRecommendations(tracks);
                setCurrentRecommendation(0);
                resolve(response.tracks);

                setTimeout(() => {
                    setIsLoading(false);
                }, 1000);
            }).catch((e: Error) => {
                ToastUtils.showError(e.toString())
                reject(e);
            });
        });
    }

    const _saveToPlaylist = (ids: string[]) => {
        setIsDoneAddToPlaylist(false);
        setIsLoadingAddToPlaylist(true);
        return new Promise((resolve, reject) => {
            PlaylistAPI.createPlaylistAndAllSongsToThem(ids).then((response: any) => {
                setIsDoneAddToPlaylist(true);
            }).catch((e: Error) => {
                ToastUtils.showError(e.toString())
                setIsDoneAddToPlaylist(false);
                setIsLoadingAddToPlaylist(false);
                reject(e);
            });
        });
    }

    useEffect(() => {
        // @ts-ignore
        _getTopArtists().then((artists: [any]) => {
            let ids = [];
            //@ts-ignore
            for(let artist of artists) {
                ids.push(artist.id);
            }

            _getRecommendations(ids);
        });
    }, []);

    useEffect(() => {
        // @ts-ignore
        if(recommendations.length > 0) {
            _initSong(recommendations[currentRecommendation]);
            setProgress(currentRecommendation * 100 / recommendations.length);
        }
    }, [currentRecommendation]);

    useHotkeys('left', () => {
        if(refCard.current) {
            // @ts-ignore
            refCard.current.swipe('left');
        }
    }, [refCard]);

    useHotkeys('right', () => {
        if(refCard.current) {
            // @ts-ignore
            refCard.current.swipe('right');
        }
    }, [refCard]);

    return (
        <div className="dashboard-screen" style={{background: 'linear-gradient(353deg, ' + color + '80 0%, rgba(0,0,0,1) 58%)'}}>
            {isLoading ? (
                <Lottie animationData={loadingAnimation} loop={true} style={{height: 200, width: 200}} />
            ) : (
                <div className="swipe-container">
                    {recommendations.map((recommendation: any, index: number) => {
                        if(index === currentRecommendation || index == currentRecommendation + 1 || index == currentRecommendation - 1) return (
                            <div key={recommendation.uri} className="swipe" style={{zIndex: index >= currentRecommendation ? recommendations.length - index : -1}}>
                                <TinderCard
                                    // @ts-ignore
                                    ref={index === currentRecommendation ? refCard : null}
                                    swipeRequirementType={'position'}
                                    preventSwipe={['up', 'bottom']}
                                    onSwipe={onSwipe}
                                    onSwipeRequirementFulfilled={() => onCardLeftScreen(recommendation.uri)}>
                                    <SpotifyCardComponent isSelected={index === currentRecommendation} track={recommendation} onColorChange={(color: any) => _onChangeColor(color)} progress={percentComplete}
                                        // @ts-ignore
                                                          isPlaying={playing} onPlay={togglePlayPause} onLike={() => refCard.current.swipe('right')} onDislike={() => refCard.current.swipe('left')}/>
                                </TinderCard>
                            </div>
                        )
                    })}
                </div>
            )}

            {!isLoading && (
                <Center className={'review'}>
                        <ButtonGroup size={'md'} variant={'outline'}>
                            <Button aria-label={"Dislike"} className={'onboard-1 like-button is-red'} variant={'outline'}
                                // @ts-ignore
                                    onClick={() => refCard.current.swipe('left')}>
                                <VStack spacing={1}>
                                    <img src={sadFaceImage} style={{ height: 25 }} />
                                    <span><Kbd className={'keyboard-key'}>{'←'}</Kbd></span>
                                </VStack>
                            </Button>
                            <Button aria-label={"Like"} className={'onboard-2 like-button is-green'} variant={'outline'}
                                // @ts-ignore
                                    onClick={() => refCard.current.swipe('right')}>
                                <VStack spacing={1}>
                                    <img src={happyFaceImage} style={{ height: 25 }} />
                                    <span><Kbd className={'keyboard-key'}>{'→'}</Kbd></span>
                                </VStack>
                            </Button>
                        </ButtonGroup>
                </Center>
            )}

            {!isLoading && (
                <Tour
                    accentColor={'#4eb34b'}
                    steps={OnboardingSteps}
                    isOpen={isOnboarding}
                    onRequestClose={() => {
                        setIsOnboarding(false);
                        _initSong(recommendations[currentRecommendation]);
                    }} />
            )}

            <LoadingBar color={color}
                        progress={progress}/>

            {!isLoading && (
                <Tooltip label={'Add to a new playlist'} placement={'left'}>
                    <Button aria-label={"Save"} size={'sm'} className={'save-button onboard-3'} leftIcon={<img src={happyFaceImage} style={{ height: 20 }} />} variant={'outline'} onClick={() => _saveToPlaylist(savedSongs)}>{savedSongs.length} song{savedSongs.length > 0 ? 's' : ''}</Button>
                </Tooltip>
            )}

            <div className={'overlay-footer'}>
                <Text color={color + '90'} fontSize={11} textAlign={'center'}>{new Date().getFullYear()} - NocturneLab - <a style={{textDecoration: 'underline'}} href={'https://github.com/c-delouvencourt'}>GitHub</a></Text>
            </div>

            <LoadingModalComponent isOpen={isLoadingAddToPlaylist} isDone={isDoneAddToPlaylist}/>
        </div>
    )
}


