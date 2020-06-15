
import React, { Component } from 'react';
import './App.css';
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import dragon from './dragon.jpg'
import chevalier from './chevalier.jpg'


class View extends Component {
    state = {
        player: {
            life: 150,
            pm: 30,
            atk: 16,
            def: 23,
            spells: ['Attaque', 'Soin', 'Attaque magique', 'Contre', 'Boost Attaque', 'Boost Défense'],
            counter: false,
            boosts_atk: [],
            boosts_def: []
        },
        ennemy: {
            life: 200,
            pm: 50,
            atk: 15,
            def: 20,
            spells: ['Attaque violente', 'Rugissement effrayant', 'Boost Surpuissant', 'Boule de feu'],
            spellsView: ['?', '?', '?', '?'],
            boosts_atk: [],
            boosts_def: []
        },
        player_turn: 0,
        message:
            <div>
                <p>A vous de jouer</p>
                <p>Séléctionnez une action ! </p>
            </div>,
        active_player: false,
        result: false
    }



    calcBoost = (props) => {
        let result = 0;
        for (let i = 0; i < props.length; i++) {
            result += 4
        }
        return result
    }


    playerDecrementeBoost = (prop1, prop2) => {
        for (let i = 0; i < prop1.length; i++) {
            prop1[i] -= 1
        }
        for (let i = 0; i < prop1.length; i++) {
            if (prop1[i] == 0) prop1.splice(i, 1)
        }
        this.setState(prevState => {
            let player = { ...prevState.player };
            player.boosts_atk = prop1;
            return { player };
        })
        for (let i = 0; i < prop2.length; i++) {
            prop2[i] -= 1
        }
        for (let i = 0; i < prop2.length; i++) {
            if (prop2[i] == 0) prop2.splice(i, 1)
        }
        this.setState(prevState => {
            let player = { ...prevState.player };
            player.boosts_def = prop2;
            return { player };
        })
    }

    ennemyDecrementeBoost = (prop1, prop2) => {
        for (let i = 0; i < prop1.length; i++) {
            prop1[i] -= 1
        }
        for (let i = 0; i < prop1.length; i++) {
            if (prop1[i] == 0) prop1.splice(i, 1)
        }
        this.setState(prevState => {
            let ennemy = { ...prevState.ennemy };
            ennemy.boosts_atk = prop1;
            return { ennemy };
        })
        for (let i = 0; i < prop2.length; i++) {
            prop2[i] -= 1
        }
        for (let i = 0; i < prop2.length; i++) {
            if (prop2[i] == 0) prop2.splice(i, 1)
        }
        this.setState(prevState => {
            let ennemy = { ...prevState.ennemy };
            ennemy.boosts_def = prop2;
            return { ennemy };
        })
    }


    resultActionPlayer = (action) => {



        this.playerDecrementeBoost(this.state.player.boosts_atk, this.state.player.boosts_def)

        let message = ''

        switch (action) {

            case 'Attaque':
                this.setState(prevState => {
                    let ennemy = { ...prevState.ennemy };
                    ennemy.life -= (this.state.player.atk - this.state.ennemy.def / 2);
                    return { ennemy };
                })
                message = "Le dragon a perdu " + (this.state.player.atk - this.state.ennemy.def / 2) + " PV"
                break;

            case 'Soin':
                if (this.state.player.pm >= 5) {
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

                    if (this.state.player.life > 150) {
                        this.setState(prevState => {
                            let player = { ...prevState.player };
                            player.life = 150;
                            return { player };
                        })
                    }


                    message = "Vous avez récupéré " + (Math.floor(this.state.player.atk / 4 * 3)) + " PV  /  Tu as perdu 5 PM"
                }
                else {
                    message = "Vous n'avez plus de PM, vôtre action échoue !"
                }
                break;

            case 'Attaque magique':
                if (this.state.player.pm >= 8) {
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
                    message = "Le dragon a perdu " + (this.state.player.atk * 2 - this.state.ennemy.def / 2) + " PV  /  Tu as perdu 8 PM"
                }
                else {
                    message = "Vous n'avez plus de PM, vôtre action échoue !"
                }
                break;

            case 'Contre':
                this.setState(prevState => {
                    let player = { ...prevState.player };
                    player.counter = true;
                    return { player };
                })
                message = "Vous allez bloquer la prochaine attaque !"
                break;

            case 'Boost Attaque':
                let newArrayAtk = [...this.state.player.boosts_atk]
                newArrayAtk.push(4)
                this.setState(prevState => {
                    let player = { ...prevState.player };
                    player.boosts_atk = newArrayAtk;
                    return { player };
                })
                message = "Vous avez boosté vôtre attaque pour 3 tours"
                break;

            case 'Boost Défense':
                let newArrayDef = [...this.state.player.boosts_def]
                newArrayDef.push(3)
                this.setState(prevState => {
                    let player = { ...prevState.player };
                    player.boosts_def = newArrayDef;
                    return { player };
                })
                message = "Vous avez boosté vôtre défense pour 3 tours"
                break;

            default:
                break;
        }

        this.setState(prevState => {
            let player = { ...prevState.player };
            player.atk = 16 + this.calcBoost(player.boosts_atk);
            return { player };
        })
        this.setState(prevState => {
            let player = { ...prevState.player };
            player.def = 23 + this.calcBoost(player.boosts_def);
            return { player };
        })
        return (message)
    }

    resultActionEnnemy = (action) => {


        this.ennemyDecrementeBoost(this.state.ennemy.boosts_atk, this.state.ennemy.boosts_def)
        let message = ''

        switch (action) {
            case 'Attaque violente':
                if (this.state.player.counter == true) {
                    this.setState(prevState => {
                        let player = { ...prevState.player };
                        player.life -= Math.floor((this.state.ennemy.atk * 2 - this.state.player.def / 4 * 3) / 2);
                        return { player };
                    })
                    this.setState(prevState => {
                        let ennemy = { ...prevState.ennemy };
                        ennemy.life -= Math.floor((this.state.ennemy.atk * 2 - this.state.ennemy.def / 4 * 3) / 4);
                        return { ennemy };
                    })
                    message = "Tu as réussi à contrer ! Tu as perdu " + Math.floor((this.state.ennemy.atk * 2 - this.state.player.def / 4 * 3) / 2) + " PV et à infliger " + Math.floor((this.state.ennemy.atk * 2 - this.state.ennemy.def / 4 * 3) / 4) + " PV"
                }
                else {
                    this.setState(prevState => {
                        let player = { ...prevState.player };
                        player.life -= Math.floor(this.state.ennemy.atk * 2 - this.state.player.def / 4 * 3);
                        return { player };
                    })
                    message = "Tu as perdu " + Math.floor(this.state.ennemy.atk * 2 - this.state.player.def / 4 * 3) + " PV"
                }


                break;

            case 'Rugissement effrayant':
                this.setState(prevState => {
                    let ennemy = { ...prevState.ennemy };
                    ennemy.pm += 5
                    return { ennemy };
                })

                if (this.state.ennemy.pm > 50) {
                    this.setState(prevState => {
                        let ennemy = { ...prevState.ennemy };
                        ennemy.pm = 50
                        return { ennemy };
                    })
                }
                message = "Le dragon pousse un rugissement effroyable, il regagne 5 PM "
                break;

            case 'Boost Surpuissant':

                let newArrayEnnemy = [...this.state.ennemy.boosts_atk]
                newArrayEnnemy.push(2)
                this.setState(prevState => {
                    let ennemy = { ...prevState.ennemy };
                    ennemy.boosts_atk = newArrayEnnemy;
                    return { ennemy };
                })
                message = "Le dragon boost son attaque très fortement pendant 2 tours !"
                break;

            case 'Boule de feu':

                if (this.state.ennemy.pm >= 35) {

                    if (this.state.player.counter == true) {
                        this.setState(prevState => {
                            let player = { ...prevState.player };
                            player.life -= Math.floor((this.state.ennemy.atk * 2 - this.state.player.def / 3) / 2);
                            return { player };
                        })
                        this.setState(prevState => {
                            let ennemy = { ...prevState.ennemy };
                            ennemy.pm -= 35;
                            return { ennemy };
                        })
                        this.setState(prevState => {
                            let ennemy = { ...prevState.ennemy };
                            ennemy.life -= Math.floor((this.state.ennemy.atk * 2 - this.state.player.def / 3) / 4);
                            return { ennemy };
                        })
                        message = "Tu as  réussi à contrer, tu as perdu " + Math.floor((this.state.ennemy.atk * 2 - this.state.player.def / 3) / 2) + " PV, et à infliger " + Math.floor((this.state.ennemy.atk * 2 - this.state.player.def / 3) / 4) + ", et le dragon n'a plus beaucoup de PM !"
                    }
                    else {
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
                        message = "Tu as perdu " + Math.floor(this.state.ennemy.atk * 2 - this.state.player.def / 3) + " PV mais le dragon n'a plus beaucoup de PM !"
                    }
                }
                else {
                    message = "Le dragon n'a pas assez de PM, il échoue son action !"
                }
                break;

            default:
                break;
        }

        this.setState(prevState => {
            let ennemy = { ...prevState.ennemy };
            ennemy.atk = 20 + this.calcBoost(ennemy.boosts_atk) + 10;
            return { ennemy };
        })
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

                const spell = Math.floor(Math.random() * 4);
                this.setState(prevState => {
                    let ennemy = { ...prevState.ennemy };
                    ennemy.spellsView[spell] = this.state.ennemy.spells[spell];
                    return { ennemy };
                })
                this.setState({
                    message:
                        <div>
                            <p>  Le dragon à  utilisé l'action : '{this.state.ennemy.spells[spell]}'</p>
                            <p> {this.resultActionEnnemy(this.state.ennemy.spells[spell])} </p>
                        </div>
                })
                this.resetAction()
            }
        }, 3000)
    }


    resetAction = () => {
        setTimeout(() => {
            this.setState(prevState => {
                let player = { ...prevState.player };
                player.counter = false;
                return { player };
            })
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
        }, 3000)
    }


    WinAction = () => {
        this.setState({ message: <p>Bien joué, vous avez gagné</p> })
        this.setState({ result: 'Win' })
    }

    LoseAction = () => {
        this.setState({ message: <p>Vous avez perdu, appuyer sur ce boutton pour réessayer  <a href="index.html" className="btn btn-primary">Reset</a> </p> })
        this.setState({ result: 'Lose' })
    }

    changecolor = () => {
        console.log('lol')
    }


    render() {
        return (<div className='col-12'>

            <div className="d-flex justify-content-center">
                <div className="pres m-3 mb-5">
                    <h4> {this.state.message}</h4>
                </div>
            </div>


            <div className="row justify-content-around">

                <div className="partie col-lg-5 col-sm-11 p-2 mt-3">
                    <div className='picture_player'>
                        <img className="picture_img" src={chevalier} alt="" />
                    </div>
                    <h2>Chevalier </h2>
                    <h3>Pv : {this.state.player.life} /150  <span className="ml-4"> Stat Attaque : {this.state.player.atk} </span> </h3>
                    <h3>Pm : {this.state.player.pm} /30  <span className="ml-4"> Stat Defense : {this.state.player.def} </span>  </h3>
                    <hr />
                    <div action="" className="col-12 row justify-content-around" >
                        <input title="Attaque le dragon" disabled={this.state.active_player} className="m-2 col-lg-5 col-sm-11" type="button" value={this.state.player.spells[0]} onClick={this.actionPlayer} />
                        <input title="Vous vous soignez en fonction de vôtre puissance d'attaque, consomme 5 PM" disabled={this.state.active_player} className="m-2 col-lg-5 col-sm-11" type="button" value={this.state.player.spells[1]} onClick={this.actionPlayer} />
                        <input title="Effectue une puissante attaque mais consomme 8 PM" disabled={this.state.active_player} className="m-2 col-lg-5 col-sm-11" type="button" value={this.state.player.spells[2]} onClick={this.actionPlayer} />
                        <input title="Vous perdez moins de PV sur l'attaque de votree dragon et lui infligez quelques dégâts" disabled={this.state.active_player} className="m-2 col-lg-5 col-sm-11" type="button" value={this.state.player.spells[3]} onClick={this.actionPlayer} />
                        <input title="Boost vôtre attque durant 3 tours" disabled={this.state.active_player} className="m-2 col-lg-5 col-sm-11" type="button" value={this.state.player.spells[4]} onClick={this.actionPlayer} />
                        <input title="Boost vôtre défense durant 3 tours" disabled={this.state.active_player} className="m-2 col-lg-5 col-sm-11" type="button" value={this.state.player.spells[5]} onClick={this.actionPlayer} />
                    </div>
                </div>

                <div className="partie col-lg-5 col-sm-11 p-2 mt-3">
                    <div className='picture_ennemy'>
                        <img className="picture_img" src={dragon} alt="" />
                    </div>
                    <h2>Dragon </h2>
                    <h3>  Pv : {this.state.ennemy.life} /200</h3>
                    <h3>Pm : ? /?</h3>
                    <hr />
                    <div action="" className="col-12 row justify-content-around" >
                        <input className="ennemy_input m-2 col-lg-5 col-sm-11" type="button" value={this.state.ennemy.spellsView[0]} disabled />
                        <input className="ennemy_input m-2 col-lg-5 col-sm-11" type="button" value={this.state.ennemy.spellsView[1]} disabled />
                        <input className="ennemy_input m-2 col-lg-5 col-sm-11" type="button" value={this.state.ennemy.spellsView[2]} disabled />
                        <input className="ennemy_input m-2 col-lg-5 col-sm-11" type="button" value={this.state.ennemy.spellsView[3]} disabled />
                    </div>
                </div>

            </div>
            <MyVerticallyCenteredModal show={this.state.result ? true : false} result={this.state.result} />
        </div>);
    }
}
export default View;







function MyVerticallyCenteredModal(props) {
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header >
                <Modal.Title id="contained-modal-title-vcenter">
                    {props.result == 'Win' ? 'Bravo, vous avez triomphé !' : 'Dommage, vous avez perdu !'}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>By Bastien Chantrel, Développeur Web Front-end </h4>
                <p>
                    Mon premier projet React.js . Ce projet avait pour but de m'initier au principes du JSX et de débuter avec React.js, je l'utilise désormais pour m'entraîner à réduire et factoriser mon code .
                    <br />
                    Vous pouvez trouver le repo Github : <a href="https://github.com/BastosC/Bastoss-RPG---React.js">Lien github</a>
                    <br />
                    Merci d'avoir joué !
          </p>
            </Modal.Body>
            <Modal.Footer>
                <a href="index.html" className="btn btn-primary">Réessayer</a>
            </Modal.Footer>
        </Modal>
    );
}


