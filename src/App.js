import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import Search from './components/Search/Search';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navigation />
        <h1>RealJapan</h1>
        <p>Search Japan Real Estate transactions!</p>
        {/* {<Logo />
        } */}
        <Search />
      </div>
    )
  }
}

export default App;
