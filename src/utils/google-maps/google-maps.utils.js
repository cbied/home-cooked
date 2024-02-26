  // Initialize and add the map
  let map;
  
  export const google = window.google;

  export const initMap = async (host, position) => {
    // The location of Uluru
    let geoPosition
    if(position) {
      geoPosition = position;
    } 
    // Request needed libraries.
    //@ts-ignore
    var { Map } = await google.maps.importLibrary("maps");
    var { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
    
    // The map, centered at Uluru
    map = new Map(document.getElementById("map"), {
      zoom: 12,
      center: geoPosition,
      mapId: "7e95a8887ec6de55",
    });
  
    
    const content = 
      `<div className="flex flex-col text-gray-600">` +
        `<div className="text-lg font-bold">${host.foodType}</div>` +
        `<div className="mt-2">` +
          `<div className="flex items-center">` +
            `<span>${host.description}</span>` +
          `</div>` +
          `<div className="flex items-center mt-1">` +
            `<span>${host.bath}</span>` +
          `</div>` +
          `<div className="flex items-center mt-1">` +
            `<div>Guest spots left: <span className="font-bold">${host.guestSpotsLeft}</span></div>` +
          `</div>` +
          `<div className="flex items-center mt-1">` +
            `<div className="font-bold">${host.price} per person</div>` +
          `</div>` +
        `</div>` +
        `<div className='flex justify-end'>` +
          `<Button appearance="primary">Register</Button>` +
        `</div>` +
      `</div>`
    
  
    const infowindow = new google.maps.InfoWindow({
      content,
      ariaLabel: "Uluru",
    });
  
    // The marker, positioned at Uluru
    const marker = new AdvancedMarkerElement({
      map: map,
      position: geoPosition,
      title: "Uluru",
    });
  
    google.maps.event.addListener(marker, 'click', function() {
     infowindow.setContent('Hello World');
     infowindow.open(map, this);
      });
  
  }

export const getUserLocationInfo = (successFunction, failedFunction) => {
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(successFunction, failedFunction);
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
    
  }

