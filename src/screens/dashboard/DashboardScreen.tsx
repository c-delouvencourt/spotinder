import ToastUtils from "../../utils/ToastUtils";
import React, {createRef, RefObject, useEffect, useMemo, useState} from "react";
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

export default function DashboardScreen() {

    const { togglePlayPause, load, playing } = useAudioPlayer({
        src: "",
        format: "mp3",
        autoplay: false,
        loop: false
    });
    const { percentComplete } = useAudioPosition({ highRefreshRate: true })

    const [isLoading, setIsLoading] = useState(true);
    const [isOnboarding, setIsOnboarding] = useState(true);
    const [topArtists, setTopArtists] = useState([]);
    const [recommendations, setRecommendations] = useState<any[]>([]);
    const [currentRecommendation, setCurrentRecommendation] = useState<number>(0);
    const [savedSongs, setSavedSongs] = useSessionStorage("spotify_saved_songs", []);
    const [color, setColor] = useState<string>("#000000");

    const childRefs: RefObject<any>[] = useMemo(
        () =>
            // @ts-ignore
            Array(recommendations).fill(0)
                .map((i) => createRef()),
        [recommendations],
    );

    const _initSong = (track: any) => {
        load({
            src: track.preview_url,
            format: "mp3",
            autoplay: true,
            loop: true,
            onload: () => console.log("Song loaded : " + track.preview_url),
            onloaderror: (e: any, i: any) => console.log("Song failed to load : " + track.preview_url, i),
            onplayerror: (e: any) => console.log("Song failed to play : " + track.preview_url, e),
        });
        console.log("Changing track to " + track.preview_url);
    }

    const onSwipe = (direction: any) => {
        if(direction === "left") {
            setSavedSongs([...savedSongs, recommendations[currentRecommendation].uri]);
        }
        let next = currentRecommendation + 1;
        _initSong(recommendations[currentRecommendation + 1]);
        setCurrentRecommendation(next);
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
                ToastUtils.showError(e.toString())
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

    return (
        <div className="dashboard-screen" style={{background: 'linear-gradient(353deg, ' + color + '80 0%, rgba(0,0,0,1) 58%)'}}>
            {isLoading ? (
                <Lottie animationData={loadingAnimation} loop={true} style={{height: 200, width: 200}} />
            ) : (
                <div className="swipe-container">
                    {recommendations.map((recommendation: any, index: number) => {
                        return (
                            <div key={recommendation.uri} className="swipe" style={{zIndex: index >= currentRecommendation ? recommendations.length - index : -1}}>
                                <TinderCard
                                    ref={childRefs[recommendation.id]}
                                    preventSwipe={['up', 'bottom']}
                                    onSwipe={onSwipe}
                                    onCardLeftScreen={() => onCardLeftScreen(recommendation.uri)}>
                                    <SpotifyCardComponent isSelected={index === currentRecommendation} track={recommendation} onColorChange={(color: any) => _onChangeColor(color)} progress={percentComplete}
                                        // @ts-ignore
                                                          isPlaying={playing} onPlay={togglePlayPause} onLike={() => childRefs[recommendation.id].current.swipe('right')} onDislike={() => childRefs[recommendation.id].current.swipe('left')}/>
                                </TinderCard>
                            </div>
                        )
                    })}
                </div>
            )}

            {!isLoading && (
                <Tour
                    accentColor={'#ddd'}
                    steps={OnboardingSteps}
                    isOpen={isOnboarding}
                    onRequestClose={() => {
                        setIsOnboarding(false);
                        _initSong(recommendations[currentRecommendation]);
                    }} />
            )}
        </div>
    )
}


