import React from "react";
import styled from "styled-components";

const SearchSelect= styled.select`
  text-align-last: center;
  text-align: center;
   -ms-text-align-last: center;
   -moz-text-align-last: center;
`

class Area extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      result: []
    };
  }

  componentDidMount() {
    fetch("https://opendata.resas-portal.go.jp/api/v1/prefectures", {
        headers: {
            'X-API-KEY': 'x0Si6hW1iuc14RIvbrEaPCMiTKidX4XZ2ZLf48KU' 
        }
    })
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            // isLoaded: true,
            result: result.data
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  render() {
    const { error, isLoaded, result } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <SearchSelect>
          {result.map(result => (
            <option key={result.prefCode}>
              {result.prefName}
            </option>
          ))}
        </SearchSelect>
      );
    }
  }
}

export default Area;