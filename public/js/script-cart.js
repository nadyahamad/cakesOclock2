
var locationRequest = new XMLHttpRequest();

locationRequest.open('GET' ,'http://localhost:4300/location')
locationRequest.onload=function(){
    var locationData =JSON.parse(locationRequest.responseText);
    showResult(locationData);
    console.log(locationData);
}

locationRequest.send();


function showResult(locationRequest) {
  let loc = document.getElementById("location");
  
  for(let key in locationRequest) {
    let option = document.createElement("option");
    option.innerHTML = locationRequest[key];
    option.value = key;
    loc.append(option);
  }
}

