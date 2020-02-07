import React from 'react';
import styled from 'styled-components';

const FromYear = styled.label`
    font-size: 1.5em;
    font-width: bold;
`

const Search = () => {
  return (
    <div>
        <FromYear>From Year</FromYear><input placeholder="2014" type="number" min="2014" max="2019"></input>
        <label>To Year</label><input type="number" min="2014" max="2019"></input>
        <label>From Quarter</label><input type="number" min="1" max="4"></input>
        <label>To Quarter</label><input type="number" min="1" max="4"></input>
        <label>Area</label><input></input>
    </div> 
  );
}

export default Search;