import {Box, Center, Container, Spinner, Stack, Text, useColorModeValue} from '@chakra-ui/react';
import {useNavigate} from "react-router-dom";
// @ts-ignore
import {Scopes, SpotifyAuth} from 'react-spotify-auth';
import 'react-spotify-auth/dist/index.css'
import {Routes} from "../../../Routes";
import {useLocalStorage} from "react-meilleursbiens";
import { useState } from 'react';

export default function AuthLoginScreen() {

    const [isLoading, setIsLoading] = useState(false);
    const [spotifyToken, setSpotifyToken] = useLocalStorage("spotify_token", null);

    let navigate = useNavigate();

    return (
        <Container maxW="lg" py={{ base: '12', md: '24' }} px={{ base: '0', sm: '8' }}>
            <Stack spacing="8">
                <Stack spacing="6">
                    <Text color={'#fff'} fontWeight={'bold'}>SpotifyTracker</Text>
                </Stack>
                <Box
                    py={{ base: '0', sm: '8' }}
                    px={{ base: '4', sm: '10' }}
                    bg={'white'}
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
                                    redirectUri='http://localhost:3000/auth/login'
                                    clientID='5fd9d3900ce54d6d979588225acc3056'
                                    scopes={["streaming", "user-read-playback-state", "user-modify-playback-state", "user-read-recently-played" , "user-top-read", "playlist-read-collaborative", "playlist-read-private", "user-read-private"]}
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
