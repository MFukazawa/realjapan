import React from "react";
import styled from "styled-components";
import { useFetch } from "./hooks";

const SearchSelect = styled.select`
  text-align-last: center;
  text-align: center;
  -ms-text-align-last: center;
  -moz-text-align-last: center;
`;

function Area2() {
  const [data, loading] = useFetch("../prefectures.json");

  return (
    <>
      {loading ? (
        "Loading..."
      ) : (
        <SearchSelect
          name="area2"
          id="Area2"
          // value={state.area}
          // onChange={handleChange}
        >
          {data.data.map(({ code, name }) => (
            <option key={code}>{name}</option>
          ))}
        </SearchSelect>
      )}
    </>
  );
}

export default Area2;
