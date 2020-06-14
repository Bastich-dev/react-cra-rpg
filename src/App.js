
import React, { Component } from 'react';
import Header from "./Header"
import Pres from "./Pres"
import View from "./View"
import './App.css';

class App extends Component {


  render() {
    return (
      <div className="App">
        <Header />

        <View />
        <footer className="mt-4">
          <div class="m-4">
            <b class="footeritem"> © Copyright 2020</b>
            <a href='index.html' class="footeritem"> Bastoss RPG</a>
          </div>
        </footer>
      </div>
    );
  }
}
export default App;