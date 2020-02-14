import React, { useState } from "react";
import axios from "axios";
import Navigation from "./components/Navigation/Navigation";
// import Search from "./components/Search/Search";
import "./App.css";

function App() {
  const [listings, setListings] = useState(null);

  const fetchData = async () => {
    const response = await axios.get(
      "https://www.land.mlit.go.jp/webland_english/api/TradeListSearch?from=20161&to=20163&area=45"
    );
    console.log(response.data);
    setListings(response.data);
  };

  return (
    <div className="App">
      <Navigation />
      <h1>RealJapan</h1>
      <p>Search Japan Real Estate transactions!</p>
      {/* {<Logo />
      } */}
      <div className="App-wrapper">
        {/* <Search /> */}

        {/* Fetch data from API */}
        <div>
          <button className="fetch-button" onClick={fetchData}>
            Fetch Data
          </button>
        </div>

        {/* Display data from API */}
        <div className="listings">
          {listings &&
            listings.data.map((listing, index) => {
              return (
                <ul className="listing" key={index}>
                  <li>Property Type: {listing.Type}</li>
                  <li>Zoning: {listing.Region}</li>
                  <li>City: {listing.Municipality}</li>
                  <li>District: {listing.DistrictName}</li>
                  <li>Price: {listing.TradePrice}</li>
                  <li>Square footage: {listing.Area}</li>
                  <li>Year Built: {listing.BuildingYear}</li>
                  <li>Period of Sale: {listing.Period}</li>
                </ul>
              );
            })}
        </div>
      </div>

      {/* Credit */}
      <p style={{ fontSize: ".5em" }}>
        Data provided by https://www.land.mlit.go.jp/webland/
      </p>
    </div>
  );
}

export default App;
