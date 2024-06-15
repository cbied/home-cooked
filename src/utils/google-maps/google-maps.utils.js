import { Button } from "rsuite";
import { renderToString } from "react-dom/server";
import { store } from "../../store/store";
// Initialize and add the map
export let map;

const google = window.google;

class CenterControl {
  map_;
  drawer_;
  constructor(controlDiv, map, handleOpenFn) {
    this.map_ = map;
    // Set the center property upon construction
    this.drawer_ = false;

    // Set CSS for the setCenter control border
    const setDrawerButtonUI = document.createElement("button");

    setDrawerButtonUI.id = "setDrawerUI";
    setDrawerButtonUI.type = "button";
    setDrawerButtonUI.title = "Open Drawer for list of Host info";
    setDrawerButtonUI.style.backgroundColor = "#eb3626";
    setDrawerButtonUI.style.border = "2px solid #eb3626";
    setDrawerButtonUI.style.borderRadius = "999px";
    setDrawerButtonUI.style.boxShadow = "0 2px 6px rgba(0,0,0,.3)";
    setDrawerButtonUI.style.color = "#fff";
    setDrawerButtonUI.style.cursor = "pointer";
    setDrawerButtonUI.style.fontFamily = "Roboto,Arial,sans-serif";
    setDrawerButtonUI.style.fontSize = "16px";
    setDrawerButtonUI.style.lineHeight = "38px";
    setDrawerButtonUI.style.margin = "8px 0 22px";
    setDrawerButtonUI.style.padding = "0 5px";
    setDrawerButtonUI.style.textAlign = "center";
    setDrawerButtonUI.style.width = "140px";
    setDrawerButtonUI.style.height = "60px";
    setDrawerButtonUI.textContent = "List";
    setDrawerButtonUI.title = "Click to get a list of hosts";
    if (window.outerWidth <= 550) {
      setDrawerButtonUI.style.marginBottom = "50px";
    }

    controlDiv.appendChild(setDrawerButtonUI);

    // Set CSS for the control interior
    const setCenterText = document.createElement("div");

    setCenterText.id = "setCenterText";
    setDrawerButtonUI.appendChild(setCenterText);

    // Set up the click event listener for 'Set Center': Set the center of
    // the control to the current center of the map.
    setDrawerButtonUI.addEventListener(
      "click",
      () => {
        handleOpenFn();
      },
      { capture: true }
    );
  }
}

class FilterControl {
  map_;
  drawer_;
  constructor(controlDiv, map, handleFilterOpenFn) {
    this.map_ = map;
    // Set the center property upon construction
    this.drawer_ = false;

    // Set CSS for the setCenter control border
    const setDrawerButtonUI = document.createElement("button");

    setDrawerButtonUI.id = "setDrawerUI";
    setDrawerButtonUI.type = "button";
    setDrawerButtonUI.title = "Open modal to filter results";
    setDrawerButtonUI.style.backgroundColor = "#eb3626";
    setDrawerButtonUI.style.border = "2px solid #eb3626";
    setDrawerButtonUI.style.borderRadius = "999px";
    setDrawerButtonUI.style.boxShadow = "0 2px 6px rgba(0,0,0,.3)";
    setDrawerButtonUI.style.color = "#fff";
    setDrawerButtonUI.style.cursor = "pointer";
    setDrawerButtonUI.style.fontFamily = "Roboto,Arial,sans-serif";
    setDrawerButtonUI.style.fontSize = "16px";
    setDrawerButtonUI.style.lineHeight = "38px";
    setDrawerButtonUI.style.margin = "8px 25px 22px";
    setDrawerButtonUI.style.padding = "0 5px";
    setDrawerButtonUI.style.textAlign = "center";
    setDrawerButtonUI.style.width = "110px";
    setDrawerButtonUI.style.height = "50px";
    setDrawerButtonUI.textContent = "Filter";
    setDrawerButtonUI.title = "Click to get filter options";

    controlDiv.appendChild(setDrawerButtonUI);

    // Set CSS for the control interior
    const setCenterText = document.createElement("div");

    setCenterText.id = "setCenterText";
    setDrawerButtonUI.appendChild(setCenterText);

    // Set up the click event listener for 'Set Center': Set the center of
    // the control to the current center of the map.
    setDrawerButtonUI.addEventListener(
      "click",
      () => {
        handleFilterOpenFn();
      },
      { capture: true }
    );
  }
}

export let geoPosition;
export let meter = 10000;
export let regionCircle;
export const initMap = async (position, handleOpenFn, handleFilterOpenFn) => {
  if (position) {
    geoPosition = position;
  }
  // Request needed libraries.
  //@ts-ignore
  var { Map } = await google.maps.importLibrary("maps");

  if (Map) {
    map = new Map(document.getElementById("map"), {
      zoom: 14,
      // maxZoom: 17,
      // minZoom: 13,
      center: geoPosition,
      disableDefaultUI: true,
      clickableIcons: false,
      keyboardShortcuts: false,
      mapId: "7e95a8887ec6de55",
    });
  }

  regionCircle = new google.maps.Circle({
    // strokeOpacity: 0.8,
    // strokeWeight: 2,
    // fillColor: "#FF0000",
    // fillOpacity: 0.19,
    strokeOpacity: 0,
    fillOpacity: 0,
    map: map,
    center: position,
    radius: meter,
    clickable: false,
  });

  addControlsToMap(handleOpenFn, handleFilterOpenFn);
};

export const addControlsToMap = (handleOpenFn, handleFilterOpenFn) => {
  // Create the DIV to hold the control and call the CenterControl()
  // constructor passing in this DIV.
  const centerControlDiv = document.createElement("div");

  // @ts-ignore
  centerControlDiv.index = 1;
  centerControlDiv.style.paddingTop = "10px";

  // Create the DIV to hold the control and call the FilterControl()
  // constructor passing in this DIV.
  const filterControlDiv = document.createElement("div");

  // @ts-ignore
  filterControlDiv.index = 1;
  filterControlDiv.style.paddingTop = "10px";

  if (map) {
    new CenterControl(centerControlDiv, map, handleOpenFn);
    new FilterControl(filterControlDiv, map, handleFilterOpenFn);
    if (window.outerWidth <= 550) {
      map.controls[google.maps.ControlPosition.BOTTOM_CENTER].push(
        centerControlDiv
      );
    } else {
      map.controls[google.maps.ControlPosition.TOP_CENTER].push(
        centerControlDiv
      );
    }
    map.controls[google.maps.ControlPosition.TOP_RIGHT].push(filterControlDiv);
  }
};
export let markers = [];

export const updateHostMakers = async (hostsInfo, position) => {
  for (let i = 0; i < markers.length; i++) {
    markers[i].setMap(null);
  }

  const newMarkers = markers.filter((marker) => marker.map !== null);
  markers = [];
  markers.push(...newMarkers);

  let marker;
  const { AdvancedMarkerElement } =
    await window.google.maps.importLibrary("marker");
  const infowindow = new window.google.maps.InfoWindow();

  hostsInfo.forEach((host, i) => {
    if (!markers[i]) {
      if (AdvancedMarkerElement) {
        marker = new AdvancedMarkerElement();
      }
      const markerPosition = { lat: host.lat, lng: host.lng };
      marker.position = markerPosition;
      marker.title = host.foodType;
      const state = store.getState();
      const dateRangeStart = state.experienceFinder.dateRange[0];
      const dateRangeEnd = state.experienceFinder.dateRange[1];
      const hostDate = new Date(host.date);
      const isBetweenDates =
        new Date(dateRangeStart) <= hostDate &&
        hostDate <= new Date(dateRangeEnd);
      if (
        isMarkerInRegion(marker, regionCircle) &&
        state.experienceFinder.foodTypes.includes(marker.title) &&
        isBetweenDates
      ) {
        marker[i] = true;
        markers.push(marker);
        marker.setMap(map);
      } else {
        marker.setMap(null);
      }
      let hostInfoContent = renderToString(
        <div className="flex flex-col text-gray-600">
          <div className="text-lg font-bsold">{host.foodType}</div>
          <div className="mt-2">
            <div className="flex items-center">
              <span>{host.description}</span>
            </div>
            <div className="flex items-center mt-1">
              <div>
                Guest spots left:{" "}
                <span className="font-bold">{host.guestSpotsLeft}</span>
              </div>
            </div>
            <div className="flex items-center mt-1">
              <div className="font-bold">${host.price} per person</div>
            </div>
          </div>
          <div className="flex justify-end">
            <Button appearance="primary">Register</Button>
          </div>
        </div>
      ).toString();

      if (marker) {
        google.maps.event.addListener(marker, "click", function () {
          infowindow.setContent(hostInfoContent);
          infowindow.open(map, this);
        });
      }
    }
  });
};

export const check = (marker, circle, radius) => {
  var km = radius / 1000;
  var kx = Math.cos((Math.PI * circle.lat) / 180) * 111;
  var dx = Math.abs(circle.lng - marker.lng) * kx;
  var dy = Math.abs(circle.lat - marker.lat) * 111;
  return Math.sqrt(dx * dx + dy * dy) <= km;
};

export const isMarkerInRegion = (marker, regionCircle) => {
  let center;
  let radius;
  let distance;
  if (regionCircle) {
    center = { lat: regionCircle.center.lat(), lng: regionCircle.center.lng() };
    radius = regionCircle.radius;
  }
  if (marker) {
    distance = window.google.maps.geometry.spherical.computeDistanceBetween(
      center,
      marker.position
    );
  }
  return distance <= radius;
};

export const getUserLocationInfo = (successFunction, failedFunction) => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(successFunction, failedFunction);
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
};
