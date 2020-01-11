import React, { useEffect } from "react";
import PropTypes from "prop-types";
import "../Shared-Styles/View-Menu.css";

MapMenu.propTypes = {
  places: PropTypes.array.isRequired,
  fetchPlaces: PropTypes.func.isRequired,
  setRadarCenter: PropTypes.func.isRequired
};

function MapMenu(props) {
  useEffect(() => {
    props.fetchPlaces();
  }, []);

  return (
    <div className="view-menu-container">
      <div className="large-text">Options</div>
      <div className="slider-outer">
        <p className="medium-text">Pick from your saved locations:</p>
        <select className="content-selector" defaultValue="DEFAULT"
          onChange={(evt) => {
            console.log("Setting radar center");
            props.setRadarCenter(props.places[evt.target.value])}}>
          <option value="DEFAULT" disabled>Choose a location</option>
          {
            props.places.map((place, i) =>
              <option key={"placeSelector"+i} value={i}>{place.name}</option>)
          }
        </select>
      </div>
    </div>
  );
}

export default MapMenu;
