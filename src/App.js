
import React, { Component } from 'react';
import Header from "./Header"
import View from "./View"
import './App.css';

class App extends Component {


  render() {
    return (
      <div className="App">
        <Header />
        <View />
        <footer className="mt-4">
          <div className="m-4">
            <b className="footeritem"> © Copyright 2020</b>
            <a href='index.html' className="footeritem">Bastoss RPG</a>
            <a href='http://bastien-chantrel.fr/' target='_blank' className="footeritem">Bastien Chantrel</a>
            <a href='https://github.com/BastosC/Bastoss-RPG---React.js' target='_blank' className="footeritem">Github</a>
          </div>
        </footer>
      </div>
    );
  }
}
export default App;