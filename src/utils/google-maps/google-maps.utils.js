export const getUserLocationInfo = (successFunction, failedFunction) => {
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(successFunction, failedFunction);
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
    
  }