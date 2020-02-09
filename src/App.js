import React from 'react';
import Navigation from './components/Navigation/Navigation';
import Search from './components/Search/Search';
import './App.css';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Navigation />
        {/* {<Logo />
        } */}
        <Search />
      </div>
    )
  }
}

export default App;
