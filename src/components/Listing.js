import React from "react";

const Listing = props => {
  const { Type, Region, Municipality, DistrictName, TradePrice } = props;

  return (
    <div className="listing">
      <ul>
        <li>{Type}</li>
        <li>{Region}</li>
        <li>{Municipality}</li>
        <li>{DistrictName}</li>
        <li>{TradePrice}</li>
      </ul>
    </div>
  );
};

export default Listing;
