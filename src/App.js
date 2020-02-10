import React, { Component } from "react";
import Navigation from "./components/Navigation/Navigation";
import Search from "./components/Search/Search";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
          <Navigation />
          <h1>RealJapan</h1>
          <p>Search Japan Real Estate transactions!</p>
          {/* {<Logo />
        } */}
        <div className="App-wrapper">
          <Search />
        </div>
          <p style={{ fontSize: ".5em" }}>
            Data provided by https://www.land.mlit.go.jp/webland/
          </p>
      </div>
    );
  }
}

export default App;
