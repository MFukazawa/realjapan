import React, { useState, useMemo, createContext } from "react";
import Navigation from "./components/Navigation/Navigation";
import Form from "./components/Form";
import "./App.css";
import styled from "styled-components";
// import { useFetch } from "./components/Search/hooks";
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

export const searchResults = createContext({
  data: [],
  setData: () => {}
});

// End styles

function App() {
  const jpNumberFormat = new Intl.NumberFormat("ja-JP");
  const [data, setData] = useState([]);

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
            accessor: "TradePrice",
            Cell: ({ cell: { value } }) => {
              return jpNumberFormat.format(value);
            }
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
                return "-";
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
    [jpNumberFormat]
  );

  return (
    <div className="App">
      <div className="top">
        <Navigation />
        <div className="hero">
          <h1 className="title">RealJapan</h1>
          <p className="hero-text">Search Japan Real Estate transactions!</p>
        </div>
        <searchResults.Provider value={{ ...data, setData }}>
          <Form />
        </searchResults.Provider>
      </div>
      <div id="app-wrapper">
        <div id="app-contents" className="app-contents">
          <Styles>
            <Table columns={columns} data={data} />
          </Styles>
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
