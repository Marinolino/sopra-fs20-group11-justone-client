import React from 'react';
import styled from 'styled-components';
import { BaseContainer } from '../../helpers/layout';
import { api, handleError } from '../../helpers/api';
import User from '../shared/models/User';
import { withRouter } from 'react-router-dom';
import { Button } from '../../views/design/Button';
import { MainButton } from '../../views/design/Buttons/MainScreenButtons';
import { LogoutButton } from '../../views/design/Buttons/MainScreenButtons';
import { RulesButton } from '../../views/design/Buttons/MainScreenButtons';
import { Spinner } from '../../views/design/Spinner';

//for the Spinner
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from 'react-loader-spinner';

const Container = styled(BaseContainer)`
  color: white;
  text-align: center;
`;
const LabelContainer = styled.div`
  margin-top: 4em;
`;

const RulesButtonContainer = styled.div`
  display: flex;
  direction: rtl;
  margin-top: 4em;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  margin-top: 3em;
`;

const Label2 = styled.h1`
  font-weight: bold;
  font-family: system-ui;
  font-size: 50px;
  text-shadow: 0 0 10px black;
  color: rgba(204, 73, 3, 1);
  text-align: center;
`;

class WaitingForClues extends React.Component {
    intervalID;

    constructor() {
        super();
        this.state = {
            allUsers: null,
            game: null,
            activePlayerName: null,
            allClues: null
        };
    }

    async componentDidMount() {
        const GameID = localStorage.getItem('gameID');
        const responseUsers = await api.get('/users');
        this.setState({allUsers : responseUsers.data});

        const response = await api.get(`/games/${GameID}`);
        this.setState({game: response.data});
        const UserList = [];
        for (var i=0; i < this.state.allUsers.length; i++) {
            if (this.state.game.currentUserId == this.state.allUsers[i].id) {
                UserList.push(this.state.allUsers[i].username);
            }
        }
        this.setState({activePlayerName: UserList});

        this.intervalID = setInterval(
            () => this.checkClues(),
            5000
        );
    }

    componentWillUnmount() {
        clearInterval(this.intervalID);
    }

    async checkClues() {
        const GameID = localStorage.getItem('gameID');
        const responseClues = await api.get(`/clues/${GameID}`);
        this.setState({allClues: responseClues.data.allAutomaticClues});
        if (this.state.allClues == true) {
            this.props.history.push('/games/guessphase')
        }
    }
    
    render() {
        return (
            <Container>
                <LabelContainer>
                &nbsp;
                <Label2> Waiting for the Clues! </Label2>
                <Loader
                    type="Triangle"
                    color="rgba(204, 73, 3, 1)"
                    height={200}
                    width={200}
                />
                </LabelContainer>
            </Container>
        );
    }
}

export default withRouter(WaitingForClues);