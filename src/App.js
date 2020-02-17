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
    displayHeaders();
    scrollResults();
  };

  const displayHeaders = () => {
    var headers = document.getElementById("categories");
    if (headers.style.display === "none") {
      headers.style.display = "grid";
    } else {
      headers.style.display = "grid";
    }
  };

  const scrollResults = () => {
    var scroller = document.getElementById("app-wrapper");

    scroller.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="App">
      <div className="top">
        <Navigation />
        <div className="hero">
          <h1 className="title">RealJapan</h1>
          <p className="hero-text">Search Japan Real Estate transactions!</p>
        </div>
        {/* {<Logo />
        } */}
        <div className="button-container">
          <button className="fetch-button" onClick={fetchData}>
            Search
          </button>
        </div>
      </div>
      <div id="app-wrapper">
        <div className="app-contents">
          {/* <Search /> */}

          {/* Fetch data from API */}

          {/* Result Categories */}
          <div id="categories">
            <span>
              Property Type
              <i class="fas fa-sort"></i>
            </span>
            <span>Zoning</span>
            <span>Municipality</span>
            <span>District Name</span>
            <span>Sale Price (Yen)</span>
            <span>Area (m²)</span>
            <span>Year Built</span>
            <span>Period of Sale</span>
          </div>

          {/* Display data from API */}
          <div className="listings-wrapper">
            {listings &&
              listings.data.map((listing, index) => {
                const cleanPrice = listing.TradePrice.split("")
                  .reverse()
                  .map((digit, index) =>
                    index !== 0 && index % 3 === 0 ? `${digit},` : digit
                  )
                  .reverse()
                  .join("");

                return (
                  <ul className="listings" key={index}>
                    <li className="listing">{listing.Type}</li>
                    <li className="listing">{listing.Region}</li>
                    <li className="listing">{listing.Municipality}</li>
                    <li className="listing">{listing.DistrictName}</li>
                    <li className="listing">{cleanPrice}</li>
                    <li className="listing">{listing.Area}</li>
                    <li className="listing">{listing.BuildingYear}</li>
                    <li className="listing">{listing.Period}</li>
                  </ul>
                );
              })}
          </div>
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
