import React from "react";

const Listing = props => {
  const { type, region, municipality, tradePrice } = props;

  return (
    <div className="listing">
      <ul>
        <li>{type}</li>
        <li>{region}</li>
        <li>{municipality}</li>
        <li>{tradePrice}</li>
      </ul>
    </div>
  );
};

export default Listing;
