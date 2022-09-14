import {Box, Button, Center, Container, Spinner, Stack, Text, useColorModeValue} from '@chakra-ui/react';
import {useNavigate} from "react-router-dom";
// @ts-ignore
import {Scopes, SpotifyAuth} from 'react-spotify-auth';
import 'react-spotify-auth/dist/index.css'
import {Routes} from "../../../Routes";
import {useLocalStorage} from "react-meilleursbiens";
import { useState } from 'react';
import {ArrowRightIcon} from "@heroicons/react/outline";

export default function AuthLoginScreen() {

    const [isLoading, setIsLoading] = useState(false);
    const [spotifyToken, setSpotifyToken] = useLocalStorage("spotify_token", null);

    let navigate = useNavigate();

    return (
        <Container maxW="lg" py={{ base: '12', md: '24' }} px={{ base: '0', sm: '8' }}>
            <Stack spacing="8">
                <Stack spacing="2">
                    <Text color={'#fff'} fontSize={28} fontWeight={'bold'}>Spotinder</Text>
                    <Text color={'#727272'} fontSize={'lg'} style={{marginBottom: 10}}>Sign in to Spotify to start using Spotinder</Text>
                    <Text color={'#414141'} fontSize={'sm'} style={{marginBottom: 10}}>Spotinder allows you to discover new music based on the music you listen to on Spotify, we base it on your listening and your playlists. Simply swipe if you like the music and then create a playlist with the sounds you've discovered.</Text>
                    <Text fontSize={'12px'} textDecoration={'underline'} cursor={'pointer'} color={'#68c165'} onClick={() => window.open('https://github.com/c-delouvencourt/spotinder.git')}>GitHub Repository</Text>
                </Stack>
                <Box
                    py={{ base: '0', sm: '8' }}
                    px={{ base: '4', sm: '10' }}
                    bg={'#161616'}
                    boxShadow={{ base: 'none', sm: useColorModeValue('md', 'md-dark') }}
                    borderRadius={{ base: 'none', sm: 'xl' }}
                >
                    <Stack spacing="6">
                        <Stack spacing="6">
                            {isLoading ? (
                                <Center>
                                    <Spinner/>
                                </Center>
                            ) : (
                                <SpotifyAuth
                                    redirectUri='https://spotify.nocturne.app/auth/login'
                                    clientID='5fd9d3900ce54d6d979588225acc3056'
                                    scopes={["playlist-modify-private", "playlist-modify-public", "playlist-read-private", "playlist-read-collaborative", "user-read-playback-state", "user-modify-playback-state", "user-read-recently-played" , "user-top-read", "playlist-read-collaborative", "playlist-read-private", "user-read-private"]}
                                    onAccessToken={(token: string) => {
                                        setIsLoading(true);
                                        setSpotifyToken(token);
                                        setTimeout(() => {
                                            setIsLoading(false);
                                            navigate(Routes.DASHBOARD);
                                        }, 1000);
                                    }}
                                />
                            )}
                        </Stack>
                    </Stack>
                </Box>
            </Stack>
        </Container>
    );
}
