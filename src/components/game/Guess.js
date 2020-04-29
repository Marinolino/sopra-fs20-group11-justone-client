import React from 'react';
import styled from 'styled-components';
import { BaseContainer } from '../../helpers/layout';
import { api, handleError } from '../../helpers/api';
import Games from '../../views/Games';
import { Spinner } from '../../views/design/Spinner';
import { Button } from '../../views/design/Button';
import { withRouter } from 'react-router-dom';
import { Redirect, Route } from "react-router-dom";
import DrawCard from './DrawCard';
import Game from '../shared/models/Game';


const Container = styled(BaseContainer)`
  color: grey0;
  text-align: center;
`;

const Users = styled.ul`
  list-style: none;
  padding-left: 0;
`;

const GameContainer = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  align-self: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const Label2 = styled.h1`
  font-weight: bold;
  font-family: system-ui;
  font-size: 30px;
  text-shadow: 0 0 10px black;
  color: rgba(204, 73, 3, 1);
  text-align: center;
`;

const GameButton = styled.button`
  &:hover {
    transform: translateY(-2px);
  }
  padding: 0px;
  box-shadow: 3px 3px 5px 4px;
  font-family: system-ui;
  font-weight: 900;
  font-size: 25px;
  text-align: center;
  color: rgba(0, 0, 0, 1);
  width: 600px;
  height: 90px;
  border: none;
  border-radius: 5px;
  cursor: ${props => (props.disabled ? "default" : "pointer")};
  opacity: ${props => (props.disabled ? 0.4 : 1)};
  background: rgb(255, 229, 210);
  transition: all 0.3s ease;
`;

const MainButton = styled.button`
  &:hover {
    transform: translateY(-2px);
  }
  padding: 0px;
  box-shadow: 3px 3px 5px 4px;
  font-family: system-ui;
  align-content: center;
  font-weight: 900;
  font-size: 30px;
  text-align: center;
  align-self: center;
  margin-left: auto;
  color: rgba(0, 0, 0, 1);
  width: 50%;
  height: 50px;
  border: none;
  border-radius: 5px;
  cursor: ${props => (props.disabled ? "default" : "pointer")};
  opacity: ${props => (props.disabled ? 0.4 : 1)};
  background: rgb(255, 229, 153);
  transition: all 0.3s ease;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 60%;
  height: 100px;
  font-family: system-ui;
  font-size: 20px;
  font-weight: 1000;
  padding-left: 37px;
  padding-right: 37px;
  border-radius: 10px;
  background: linear-gradient(rgb(255, 165, 0), rgb(255, 140, 0));
  transition: opacity 0.5s ease, transform 0.5s ease;
`;

const InputField = styled.input`
  &::placeholder {
    color: grey4;
  }
  height: 35px;
  padding-left: 15px;
  margin-left: -4px;
  border: grey0;
  border-radius: 20px;
  align-content: center;
  font-weight: bold;
  margin-bottom: 20px;
  background: rgba(255, 255, 255, 0.2);
  color: grey0;
`;


class Guess extends React.Component {
    constructor() {
        super();
        this.state = {
            clues: null,
            guess: null
        };
    }

    async componentDidMount() {
        try {
            const gameID = localStorage.getItem('gameID');
            const response = await api.get(`/clues/${gameID}`);
            
            await new Promise(resolve => setTimeout(resolve, 1000));

            this.setState({clues: response.data.clues});

        } catch (error) {
            alert(`Something went wrong while fetching the clues: \n${handleError(error)}`);
        }
        localStorage.setItem('clues', JSON.stringify(this.state.clues.clues));
    }
    async submitGuess() {
        try {
            const gameID = localStorage.getItem('gameID');
            //send a request to guess the mystery word
        } catch (error) {
            alert(`Something went wrong during the submit of the guess: \n${handleError(error)}`);
        }
        this.nextPlayer();
    }

    skipGuess() {
        const gameID = localStorage.getItem('gameID');
        // ==> skip to the nextpage
        this.props.history.push(`/nextpage`);
        this.nextPlayer();
    }

    handleInputChange(key, value) {
        this.setState({[key]: value});
    }

    // After the current player guessed, the next player will be set to the current Player
    nextPlayer() {
        const List = localStorage.getItem('PlayersList');
        const PlayersList = JSON.parse(List);
        const index = (localStorage.getItem('currentPlayerIndex') + 1) % PlayersList.length;
        localStorage.setItem('Length', PlayersList.length);
        localStorage.setItem('currentPlayerIndex', index);
        const NextCurrentPlayer = PlayersList[localStorage.getItem('currentPlayerIndex')];
        localStorage.setItem('currentPlayer', NextCurrentPlayer);
      }

    render() {
        return (
            <Container>
                <Label2> Here you see the clues! Try to guess the mysteryword! </Label2>
                {!this.state.clues ? (
                    <Spinner />
                ) : (
                    <GameContainer>
                        <Users>
                            {this.state.clues.map(clue => {
                                return (
                                    <ButtonContainer key={clue.clues}>
                                        <GameButton>
                                            {clue}
                                        </GameButton>
                                    </ButtonContainer>
                                );
                            })}
                        </Users>
                        <Form>
                        <InputField 
                            placeholder="Enter your guess..."
                            onChange={e => {
                                this.handleInputChange('guess', e.target.value);
                            }}
                        />
                        </Form>
                        &nbsp;
                        <MainButton
                            disabled={!this.state.guess}
                            width="10%"
                            onClick={() => {
                                this.submitGuess();
                            }}
                        > Submit
                        </MainButton>
                        &nbsp;
                        <MainButton
                            width="10%"
                            onClick={() => {
                                this.skipGuess();
                            }}
                            >
                            Skip guessing
                        </MainButton>
                    </GameContainer>
                )}
            </Container>
        )
    }
}
export default withRouter(Guess);