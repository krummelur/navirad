import React, {useEffect} from "react";
import PropTypes from "prop-types";
import "../Shared-Styles/View-Menu.css";
import "./MapMenu.css";
import Select from 'react-select'

MapMenu.propTypes = {
    places: PropTypes.object.isRequired,
    fetchPlaces: PropTypes.func.isRequired,
    setRadarCenter: PropTypes.func.isRequired
};

function MapMenu(props) {

    const CustomOption = (innerProps) => {
        let label = innerProps.label;
        let disabled = innerProps.isDisabled;
        return (
            <div className="list-option-container">
                <div className={disabled ? "disabled-option" : "list-option"}   {...innerProps.innerProps}>
                    {label}
                </div>
                <div className="option-remover"
                     onClick={(evt) => {
                         !disabled && props.removePlace(innerProps.value);
                         evt.stopPropagation()
                     }}>
                    {innerProps.isDisabled ? "" : "X"}
                </div>
            </div>
        );
    }

    useEffect(() => {
        props.fetchPlaces();
    }, []);

    return (
        <div className="view-menu-container">
            <div className="large-text">Options</div>
            <div className="slider-outer">
                <p className="medium-text">Pick from your saved locations:</p>
                <Select className="content-selector"
                        options={[{label: "Choose a location", value: 0, isDisabled: true},
                            ...props.places.result.map((el) => {
                                return {value: el, label: el.name}
                            })]}
                        placeholder="Choose a location"
                        components={{Option: CustomOption}}
                        onChange={(evt) => {
                            props.setRadarCenter({...evt.value, lat: evt.value.lat + Math.random() * 0.0001})
                        }}
                />
            </div>
        </div>
    );
}

export default MapMenu;
