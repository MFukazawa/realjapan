import React, { useState } from "react";
import { useTable, useFilters } from "react-table";
import styled from "styled-components";

const Searchbox = styled.input`
  width: 50%;
  border-radius: 5px;
  height: 30px;
  font-size: 16px;
  text-align: center;
  border: 1px solid black;
  margin: 0 0 20px 0;
`;

export default function Table({ columns, data }) {
  const {
    getTableProps, // table props from react-table
    getTableBodyProps, // table body props from react-table
    headerGroups, // headerGroups if your table have groupings
    rows, // rows for the table based on the data passed
    prepareRow, // Prepare the row (this function need to called for each row before getting the row props)
    setFilter
  } = useTable(
    {
      columns,
      data
    },
    useFilters
  );

  const [filterInput, setFilterInput] = useState("");

  const handleFilterChange = event => {
    const value = event.target.value || "";
    setFilter("DistrictName", value);
    console.log(value);
    setFilterInput(value);
  };

  return (
    <>
      <Searchbox
        value={filterInput}
        onChange={handleFilterChange}
        placeholder={"Search District"}
      ></Searchbox>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
