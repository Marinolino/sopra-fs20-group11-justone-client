import React from "react";
import { Redirect } from "react-router-dom";
import DrawCard from './DrawCard';
import Game from '../shared/models/Game';
import StartGame from '../../game/StartGame';

/**
 * routeProtectors interfaces can tell the router whether or not it should allow navigation to a requested route.
 * They are functional components. Based on the props passed, a route gets rendered.
 * In this case, if the user is authenticated (i.e., a token is stored in the local storage)
 * {props.children} are rendered --> The content inside the <GameGuard> in the App.js file, i.e. the user is able to access the main app.
 * If the user isn't authenticated, the components redirects to the /login screen
 * @Guard
 * @param props
 */
export const CurrentPlayerGuard = props => {
    const currentPlayerID = localStorage.getItem('id');
    const gameID = localStorage.getItem('gameID');
    const currentPlayer = StartGame.currentPlayer;

    if (currentPlayerID == currentPlayer) {
        return props.children;
    }
    return <Redirect to={"/waitingscreen"} />;
};
