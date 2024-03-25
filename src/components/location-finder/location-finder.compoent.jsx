import React from "react";
import { Input } from "rsuite";
import { connect } from "react-redux";
import { setLocation } from "../../store/experience-finder-slice/experience-finder-slice";
/* global google */

class LocationFinder extends React.Component {
  constructor(props) {
    super(props);
    this.autocompleteInput = React.createRef();
    this.autocomplete = null;
    this.handlePlaceChanged = this.handlePlaceChanged.bind(this);
  }

  componentDidMount() {
    this.autocomplete = new google.maps.places.Autocomplete(
      this.autocompleteInput.current,
      { types: ["geocode"] }
    );
    this.autocomplete.addListener("place_changed", this.handlePlaceChanged);
  }

  handlePlaceChanged() {
    const place = this.autocomplete.getPlace();
    let lat = place.geometry.location.lat();
    let lng = place.geometry.location.lng();
    let currentLocation = { lat, lng };
    this.props.dispatch(setLocation(currentLocation));
  }

  render() {
    return (
      <Input
        ref={this.autocompleteInput}
        id="autocomplete"
        placeholder="Enter your address"
        type="text"
      />
    );
  }
}

export default connect()(LocationFinder);
