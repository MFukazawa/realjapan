import React from "react";
import styled from "styled-components";

const SearchSelect= styled.select`
  text-align-last: center;
  text-align: center;
   -ms-text-align-last: center;
   -moz-text-align-last: center;
`

class City extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      data: []
    };
  }

  componentDidMount() {
    fetch("https://www.land.mlit.go.jp/webland_english/api/CitySearch?area=45")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            data: result.data
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
    const { error, isLoaded, data } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <SearchSelect>
          {data.map(data => (
            <option key={data.id}>
              {data.name}
            </option>
          ))}
        </SearchSelect>
      );
    }
  }
}

export default City;