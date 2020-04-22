import React from "react";
import styled from "styled-components";
import { Redirect, Route } from "react-router-dom";
import GameLobby from "../../game/GameLobby";
import DrawCard from "../../game/DrawCard";
import Clues from "../../game/Clues";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

class GameRouter extends React.Component {
  render() {
    /**
     * "this.props.base" is "/app" because as been passed as a prop in the parent of GameRouter, i.e., App.js
     */
    return (
      <Container>
        <Route
          exact
          path={`${this.props.base}/:GameID`}
          render={() => <GameLobby />}
        />
        <Route
          exact
          path={`${this.props.base}`}
          render={() => <Redirect to={`${this.props.base}/GameLobby`} />}
        />
      </Container>
    );
  }
}
/*
* Don't forget to export your component!
 */
export default GameRouter;