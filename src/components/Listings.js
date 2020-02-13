import React from "react";
import Listing from "./Listing";

const Listings = props => {
  const length = Object.keys(props).length; // gets the length of props
  const listings = [];

  for (let i = 0; i < length; i++) {
    listings.push(<Listing key={i} {...props[i]} />);
  }

  return <div className="listings">{listings}</div>;
};

export default Listings;
