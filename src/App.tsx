import React from 'react';
import {ChakraProvider} from "@chakra-ui/react";
import theme from "./Theme";
import {Provider} from 'react-redux';
import {HashRouter, Navigate, Route, Routes as Switch} from "react-router-dom";
import {Routes} from "./Routes";
import "./assets/scss/app.scss";
import AuthLoginScreen from "./screens/auth/login/AuthLoginScreen";
import {useLocalStorage} from "react-meilleursbiens";
import DashboardScreen from "./screens/dashboard/DashboardScreen";
import {AudioPlayerProvider} from "react-use-audio-player";

function App({store} : {store: any}) {

    const [spotifyToken, setSpotifyToken] = useLocalStorage("spotify_token", null);

    return (
        <ChakraProvider theme={theme}>
            <Provider store={store}>
                <AudioPlayerProvider>
                    <HashRouter>
                        <Switch>
                            <Route path={"/"} element={<Navigate to={Routes.AUTH.LOGIN} replace/>} />

                            <Route path={Routes.AUTH.LOGIN} element={<AuthLoginScreen/>} />

                            <Route path={Routes.DASHBOARD} element={<DashboardScreen/>} />
                        </Switch>
                    </HashRouter>
                </AudioPlayerProvider>
            </Provider>
        </ChakraProvider>
    );
}

export default App;
