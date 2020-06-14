
import React, { Component } from 'react';
import './App.css';

class View extends Component {
    state = {
        player: {
            life: 200,
            pm: 50,
            atk: 20,
            def: 20,
            spells: ['Attaque', 'Soin', 'Attaque magique', 'Contre', 'Boost Attaque', 'Boost Défense'],
            counter: false
        },
        ennemy: {
            life: 200,
            pm: 50,
            atk: 20,
            def: 20,
            spells: ['Attaque violente', 'Moquerie', 'Boost Superpuissant', 'Rayon de la mort']
        },
        player_turn: 0,
        message:
            <div>
                <p>A vous de jouer</p>
                <p>Séléctionnez une action ! </p>
            </div>,
        active_player: false,
        insultes: ['Larve', 'Nul', 'Bon à rien', 'Nigot', 'Fanfreluche']
    }


    resultActionPlayer = (action) => {

        let message = ''

        switch (action) {

            case 'Attaque':
                this.setState(prevState => {
                    let ennemy = { ...prevState.ennemy };
                    ennemy.life -= (this.state.player.atk - this.state.ennemy.def / 2);
                    return { ennemy };
                })
                message = "L'ennmi a perdu " + (this.state.player.atk - this.state.ennemy.def / 2) + " PV"
                break;

            case 'Soin':
                this.setState(prevState => {
                    let player = { ...prevState.player };
                    player.life += (Math.floor(this.state.player.atk / 4 * 3));
                    return { player };
                })
                this.setState(prevState => {
                    let player = { ...prevState.player };
                    player.pm -= 5;
                    return { player };
                })
                message = "Vous avez récupérer " + (Math.floor(this.state.player.atk / 4 * 3)) + " PV  /  Tu as perdu 5 PM"
                break;

            case 'Attaque magique':
                this.setState(prevState => {
                    let ennemy = { ...prevState.ennemy };
                    ennemy.life -= (this.state.player.atk * 2 - this.state.ennemy.def / 2);
                    return { ennemy };
                })
                this.setState(prevState => {
                    let player = { ...prevState.player };
                    player.pm -= 8;
                    return { player };
                })
                message = "L'ennmi a perdu " + (this.state.player.atk * 2 - this.state.ennemy.def / 2) + " PV  /  Tu as perdu 8 PM"
                break;

            case 'Contre':
                this.setState(prevState => {
                    let player = { ...prevState.player };
                    player.counter = true;
                    return { player };
                })
                message = "Vous allez bloquer la prochaine attaque !"
                break;

            default:
                break;
        }

        return (message)
    }

    resultActionEnnemy = (action) => {

        let message = ''

        switch (action) {
            case 'Attaque violente':
                this.setState(prevState => {
                    let player = { ...prevState.player };
                    player.life -= Math.floor(this.state.ennemy.atk * 2 - this.state.player.def / 4 * 3);
                    return { player };
                })
                message = "Tu as perdu " + Math.floor(this.state.ennemy.atk * 2 - this.state.player.def / 4 * 3) + " PV"
                break;

            case 'Moquerie':
                message = "L'ennemi vous provoque, il vous traîte de " + this.state.insultes[Math.floor(Math.random() * this.state.insultes.length)]
                break;

            case 'Boost Superpuissant':


                message = "L'ennemi boost son attaque très fortement !"
                break;

            case 'Rayon de la mort':
                this.setState(prevState => {
                    let player = { ...prevState.player };
                    player.life -= Math.floor(this.state.ennemy.atk * 2 - this.state.player.def / 3);
                    return { player };
                })
                this.setState(prevState => {
                    let ennemy = { ...prevState.ennemy };
                    ennemy.pm -= 35;
                    return { ennemy };
                })
                message = "Tu as perdu " + Math.floor(this.state.ennemy.atk * 2 - this.state.player.def / 3) + " PV mais l'ennemi n'a plus beaucoup de PM !"
                break;

            default:
                break;
        }

        return (message)
    }


    actionPlayer = (e) => {
        this.setState({ active_player: true })
        const action = e.currentTarget.value
        setTimeout(() => {
            this.setState({
                message:
                    <div>
                        <p> Vous avez utilisé l'action : '{action}'</p>
                        <p> {this.resultActionPlayer(action)} </p>
                    </div>
            })
            this.ennemyAction()
        }, 500)
    }

    ennemyAction = () => {
        setTimeout(() => {

            if (this.state.ennemy.life <= 0) this.WinAction()
            else {
                const spell = Math.floor(Math.random() * 3);
                this.setState({
                    message:
                        <div>
                            <p>  L'ennemi à  utilisé l'action : '{this.state.ennemy.spells[spell]}'</p>
                            <p> {this.resultActionEnnemy(this.state.ennemy.spells[spell])} </p>
                        </div>
                })
                this.resetAction()
            }
        }, 2000)
    }


    resetAction = () => {
        setTimeout(() => {
            if (this.state.player.life <= 0) this.LoseAction()
            else {
                this.setState({
                    message: <div>
                        <p>  A vous de jouer </p>
                        <p> Séléctionnez une action !  </p>
                    </div>
                })
                this.setState({ active_player: false })
            }
        }, 2000)
    }


    WinAction = () => {
        this.setState({ message: <p>Bien joué, vous avez gagné</p> })
    }

    LoseAction = () => {
        this.setState({ message: <p>Vous avez perdu, appuyer sur ce boutton pour réessayer  <a href="index.html" className="btn btn-primary">Reset</a> </p> })
    }

    render() {
        return (<div>

            <div className="pres">
                <h4> {this.state.message}</h4>
            </div>

            <div className="row justify-content-around">

                <div className="partie col-lg-5 col-sm-11 p-2 mt-3">
                    <h2>Joueur </h2>
                    <h3>Pv : {this.state.player.life} /200</h3>
                    <h3>Pm : {this.state.player.pm} /50</h3>
                    <hr />
                    <div action="" className="col-12 row justify-content-around" >
                        <input disabled={this.state.active_player} className="m-2 col-lg-5 col-sm-11" type="button" value={this.state.player.spells[0]} onClick={this.actionPlayer} />
                        <input disabled={this.state.active_player} className="m-2 col-lg-5 col-sm-11" type="button" value={this.state.player.spells[1]} onClick={this.actionPlayer} />
                        <input disabled={this.state.active_player} className="m-2 col-lg-5 col-sm-11" type="button" value={this.state.player.spells[2]} onClick={this.actionPlayer} />
                        <input disabled={this.state.active_player} className="m-2 col-lg-5 col-sm-11" type="button" value={this.state.player.spells[3]} onClick={this.actionPlayer} />
                        <input disabled={this.state.active_player} className="m-2 col-lg-5 col-sm-11" type="button" value={this.state.player.spells[4]} onClick={this.actionPlayer} />
                        <input disabled={this.state.active_player} className="m-2 col-lg-5 col-sm-11" type="button" value={this.state.player.spells[5]} onClick={this.actionPlayer} />
                    </div>
                </div>

                <div className="partie col-lg-5 col-sm-11 p-2 mt-3">
                    <h2>Ennemy </h2>
                    <h3>Pv : {this.state.ennemy.life} /200</h3>
                    <h3>Pm : ? /?</h3>
                    <hr />
                    <div action="" className="col-12 row justify-content-around" >
                        <input className="m-2 col-lg-5 col-sm-11" type="submit" value='?' disabled />
                        <input className="m-2 col-lg-5 col-sm-11" type="submit" value='?' disabled />
                        <input className="m-2 col-lg-5 col-sm-11" type="submit" value='?' disabled />
                        <input className="m-2 col-lg-5 col-sm-11" type="submit" value='?' disabled />
                    </div>
                </div>

            </div>

        </div>);
    }
}
export default View;