export const getUserLocationInfo = (successFunction, failedFunction) => {
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(successFunction, failedFunction);
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
    
  }

  export const buildContent = (host) => {
    const content = document.createElement("div");
  
    content.classList.add("host");
    content.innerHTML = `
      <div class="icon">
          <i aria-hidden="true" class="fa fa-icon fa-${host.foodType}" title="${host.foodType}"></i>
          <span class="fa-sr-only">${host.foodType}</span>
      </div>
      <div class="details">
          <div class="price">${host.price} per person</div>
          <div class="address">${host.address}</div>
          <div class="features">
          <div>
              <i aria-hidden="true" class="fa fa-bed fa-lg bed" title="Host description"></i>
              <span class="fa-sr-only">Host description</span>
              <span>${host.description}</span>
          </div>
          <div>
              <i aria-hidden="true" class="fa fa-bath fa-lg bath" title="bathroom"></i>
              <span class="fa-sr-only">bathroom</span>
              <span>${host.bath}</span>
          </div>
          <div>
              <i aria-hidden="true" class="fa fa-ruler fa-lg size" title="Guest spots left"></i>
              <span class="fa-sr-only">Guest spots left</span>
              <span>${host.guestSpotsLeft} ft<sup>2</sup></span>
          </div>
          </div>
      </div>
      `;
    return content;
  }

  export const toggleHighlight = (markerView, host) => {
    console.log(markerView)
    if (markerView.content.classList.contains("highlight")) {
      markerView.content.classList.remove("highlight");
      markerView.zIndex = null;
    } else {
      markerView.content.classList.add("highlight");
      markerView.zIndex = 1;
    }
  }