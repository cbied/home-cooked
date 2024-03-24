import { Button } from "rsuite";
import { renderToString } from "react-dom/server";
// Initialize and add the map
let map;

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
      { capture: true },
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
      { capture: true },
    );
  }
}

export const initMap = async (
  hostsInfo,
  position,
  handleOpenFn,
  handleFilterOpenFn,
) => {
  // The location of Uluru
  let geoPosition;
  if (position) {
    geoPosition = position;
  }
  // Request needed libraries.
  //@ts-ignore
  var { Map } = await google.maps.importLibrary("maps");
  var { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

  // The map, centered at Uluru
  map = new Map(document.getElementById("map"), {
    zoom: 14,
    // maxZoom: 17,
    // minZoom: 13,
    center: geoPosition,
    disableDefaultUI: true,
    clickableIcons: false,
    mapId: "7e95a8887ec6de55",
  });

  // Create the DIV to hold the control and call the CenterControl()
  // constructor passing in this DIV.
  const centerControlDiv = document.createElement("div");
  const control = new CenterControl(centerControlDiv, map, handleOpenFn);

  // @ts-ignore
  centerControlDiv.index = 1;
  centerControlDiv.style.paddingTop = "10px";
  map.controls[google.maps.ControlPosition.TOP_CENTER].push(centerControlDiv);

  // Create the DIV to hold the control and call the FilterControl()
  // constructor passing in this DIV.
  const filterControlDiv = document.createElement("div");
  const filterControl = new FilterControl(
    filterControlDiv,
    map,
    handleFilterOpenFn,
  );

  // @ts-ignore
  filterControlDiv.index = 1;
  filterControlDiv.style.paddingTop = "10px";
  map.controls[google.maps.ControlPosition.TOP_RIGHT].push(filterControlDiv);

  const infowindow = new google.maps.InfoWindow();
  let marker;

  hostsInfo.forEach((host) => {
    const markerPosition = { lat: host.lat, lng: host.lng };
    marker = new AdvancedMarkerElement({
      map: map,
      position: markerPosition,
      title: host.foodType,
    });

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
      </div>,
    ).toString();

    google.maps.event.addListener(marker, "click", function () {
      infowindow.setContent(hostInfoContent);
      infowindow.open(map, this);
    });
  });
};

export const getUserLocationInfo = (successFunction, failedFunction) => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(successFunction, failedFunction);
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
};
