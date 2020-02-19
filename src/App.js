import React, { useState, useMemo } from "react";
import axios from "axios";
import Navigation from "./components/Navigation/Navigation";
import "./App.css";
import styled from "styled-components";
import { useFetch } from "./components/Search/hooks";
import Table from "./components/Table";

// CSS Styles
const Styles = styled.div`
  padding: 1rem;
  table {
    margin: 0 auto;
    border-spacing: 0;
    border: 1px solid black;
    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }
    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;
      position: relative;
      :last-child {
        border-right: 0;
      }
    }
    th {
      padding: 0.5rem 1.3rem;
      height: 35px;
      :first-child {
        padding: 0.5rem;
      }
    }
  }
  table tr:nth-child(even) {
    background-color: #fff;
  }
  table th::before {
    position: absolute;
    right: 10px;
    top: 23px;
    content: "";
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
  }
  table th.sort-asc::before {
    border-bottom: 5px solid #22543d;
  }
  table th.sort-desc::before {
    border-top: 5px solid #22543d;
  }
`;

const Wrapper = styled.form`
  padding: 0 10%;
  background-color: rgba(255, 255, 255, 0.47);
  border-radius: 10px;
  width: 300px;
  margin: 0 auto;
`;

const SearchLabel = styled.label`
  font-size: 1em;
`;

const SearchItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1em 0;
`;

const SearchSelect = styled.select`
  text-align-last: center;
  text-align: center;
  -ms-text-align-last: center;
  -moz-text-align-last: center;
`;

// End styles

function App() {
  const [state, setState] = useState({
    fromYear: "2014",
    toYear: "2014",
    fromQuarter: "1",
    toQuarter: "1",
    area: "Miyazaki",
    code: "45",
    city: ""
  });

  const [data, setData] = useState([]);

  const [prefData, loading] = useFetch("../prefectures.json");

  const fetchData = async () => {
    const response = await axios.get(
      `https://www.land.mlit.go.jp/webland_english/api/TradeListSearch?from=${state.fromYear}${state.fromQuarter}&to=${state.toYear}${state.toQuarter}&area=${state.code}&city=${state.city}`
    );
    // console.log(response.data);
    console.log(response);
    setData(response.data.data);
    displayHeaders();
    scrollResults();
  };

  const [cityData, cityLoading] = useFetch(
    `https://www.land.mlit.go.jp/webland_english/api/CitySearch?area=${state.code}`
  );

  const displayHeaders = () => {
    var headers = document.getElementById("app-contents");
    if (headers.style.display === "none") {
      headers.style.display = "block";
    } else {
      headers.style.display = "block";
    }
  };

  const scrollResults = () => {
    var scroller = document.getElementById("app-wrapper");

    scroller.scrollIntoView({ behavior: "smooth" });
  };

  function handleChange(event) {
    const value = event.target.value;
    setState({
      ...state,
      [event.target.name]: value
    });
    console.log(value);
  }

  const columns = useMemo(
    () => [
      {
        Header: "RealJapan Search Results",
        columns: [
          {
            Header: "Property Type",
            accessor: "Type"
          },
          {
            Header: "Zoning",
            accessor: "Region"
          },
          {
            Header: "Municipality",
            accessor: "Municipality"
          },
          {
            Header: "District",
            accessor: "DistrictName"
          },
          {
            Header: "Sale Price (Yen)",
            accessor: "TradePrice"
          },
          {
            Header: "Area (m2)",
            accessor: "Area"
          },
          {
            Header: "Building Age",
            accessor: "BuildingYear",
            Cell: ({ cell: { value } }) => {
              const today = new Date();
              const year = today.getFullYear();
              const age = year - value;
              if (isNaN(age)) {
                return null;
              } else {
                return <>{age}</>;
              }
            }
          },
          {
            Header: "Sale Date",
            accessor: "Period"
          }
        ]
      }
    ],
    []
  );

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
        <Wrapper>
          {/* From Year */}
          <SearchItem>
            <SearchLabel htmlFor="FromYear">From Year</SearchLabel>
            <SearchSelect
              name="fromYear"
              id="FromYear"
              value={state.fromYear}
              onChange={handleChange}
              required
            >
              <option value="2014">2014</option>
              <option value="2015">2015</option>
              <option value="2016">2016</option>
              <option value="2017">2017</option>
              <option value="2018">2018</option>
              <option value="2019">2019</option>
            </SearchSelect>
          </SearchItem>
          {/* To Year */}
          <SearchItem>
            <SearchLabel>To Year</SearchLabel>
            <SearchSelect
              name="toYear"
              id="ToYear"
              value={state.toYear}
              onChange={handleChange}
              required
            >
              <option value="2014">2014</option>
              <option value="2015">2015</option>
              <option value="2016">2016</option>
              <option value="2017">2017</option>
              <option value="2018">2018</option>
              <option value="2019">2019</option>
            </SearchSelect>
          </SearchItem>
          {/* From Quarter */}
          <SearchItem>
            <SearchLabel>From Quarter</SearchLabel>
            <SearchSelect
              name="fromQuarter"
              id="FromQuarter"
              value={state.fromQuarter}
              onChange={handleChange}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </SearchSelect>
          </SearchItem>
          {/* To Quarter */}
          <SearchItem>
            <SearchLabel>To Quarter</SearchLabel>
            <SearchSelect
              name="toQuarter"
              id="ToQuarter"
              value={state.toQuarter}
              onChange={handleChange}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </SearchSelect>
          </SearchItem>
          {/* Prefecture */}
          <SearchItem>
            <SearchLabel>Prefecture</SearchLabel>
            {loading ? (
              "Loading..."
            ) : (
              <SearchSelect
                name="area"
                id="Area"
                value={(state.area, state.code)}
                onChange={handleChange}
              >
                {prefData.data.map(({ code, name }) => (
                  <option key={code} value={code}>
                    {name}
                  </option>
                ))}
              </SearchSelect>
            )}
          </SearchItem>
          {/* Municipality */}
          <SearchItem>
            <SearchLabel>Municipality</SearchLabel>
            {cityLoading ? (
              "Loading..."
            ) : (
              <SearchSelect
                name="city"
                id="City"
                value={state.city}
                onChange={handleChange}
              >
                {cityData.data.map(({ id, name }) => (
                  <option key={id} value={id}>
                    {name}
                  </option>
                ))}
              </SearchSelect>
            )}
          </SearchItem>
        </Wrapper>
        <div className="button-container">
          <button className="fetch-button" onClick={fetchData}>
            Search
          </button>
        </div>
      </div>
      <div id="app-wrapper">
        <div id="app-contents" className="app-contents">
          <Styles>
            <Table columns={columns} data={data} />
          </Styles>
          {/* Display data from API */}
          {/* <div className="listings-wrapper">
            {listings &&
              listings.data.map((listing, index) => {
                const cleanPrice = listing.TradePrice.split("")
                  .reverse()
                  .map((digit, index) =>
                    index !== 0 && index % 3 === 0 ? `${digit},` : digit
                  )
                  .reverse()
                  .join("");
          */}
        </div>
      </div>

      {/* Credit */}
      <p className="footer">
        Data provided by https://www.land.mlit.go.jp/webland/
      </p>
    </div>
  );
}

export default App;
