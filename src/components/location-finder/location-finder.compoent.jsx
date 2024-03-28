import React, { useRef, useEffect } from "react";
import { Input } from "rsuite";
import { useDispatch, useSelector } from "react-redux";
import {
  setLocation,
  setFormattedAddress,
} from "../../store/experience-finder-slice/experience-finder-slice";
/* global google */

const LocationFinder = () => {
  const autocompleteInput = useRef(null);
  const dispatch = useDispatch();
  const selectFormattedAddress = useSelector(
    (state) => state.experienceFinder.formattedAddress
  );
  let autocomplete = null;

  useEffect(() => {
    autocomplete = new google.maps.places.Autocomplete(
      autocompleteInput.current,
      { types: ["geocode"] }
    );
    autocomplete.addListener("place_changed", handlePlaceChanged);

    return () => {
      google.maps.event.clearInstanceListeners(autocomplete);
    };
  }, []);

  const handlePlaceChanged = () => {
    const place = autocomplete.getPlace();
    if (place.geometry && place.geometry.location) {
      let lat = place.geometry.location.lat();
      let lng = place.geometry.location.lng();
      let currentLocation = { lat, lng };
      dispatch(setLocation(currentLocation));
      dispatch(setFormattedAddress(place.formatted_address));
    }
  };

  return (
    <Input
      ref={autocompleteInput}
      id="autocomplete"
      placeholder="Enter your address"
      type="text"
      defaultValue={
        selectFormattedAddress
          ? selectFormattedAddress
          : autocompleteInput.current
      }
    />
  );
};

export default LocationFinder;
