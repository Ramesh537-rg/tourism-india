const apiKey = "YOUR_GEOAPIFY_API_KEY";

async function searchPlace(){

let place = document.getElementById("placeInput").value;

let geoURL =
`https://api.geoapify.com/v1/geocode/search?text=${place}&apiKey=${apiKey}`;

let geoRes = await fetch(geoURL);
let geoData = await geoRes.json();

if(!geoData.features.length){
alert("Place Not Found");
return;
}

let lat = geoData.features[0].properties.lat;
let lon = geoData.features[0].properties.lon;

document.getElementById("placeDetails").innerHTML = `
<h2>${geoData.features[0].properties.formatted}</h2>
<p>Latitude : ${lat}</p>
<p>Longitude : ${lon}</p>
`;

loadHotels(lat,lon);
loadRestaurants(lat,lon);
loadAttractions(lat,lon);

}

async function loadHotels(lat,lon){

let url =
`https://api.geoapify.com/v2/places?categories=accommodation.hotel&filter=circle:${lon},${lat},5000&limit=10&apiKey=${apiKey}`;

let res = await fetch(url);
let data = await res.json();

let html="";

data.features.forEach(item=>{
html+=`
<div class="card">
<h3>${item.properties.name || "Hotel"}</h3>
<p>${item.properties.address_line2 || ""}</p>
</div>`;
});

document.getElementById("hotels").innerHTML=html;
}

async function loadRestaurants(lat,lon){

let url =
`https://api.geoapify.com/v2/places?categories=catering.restaurant&filter=circle:${lon},${lat},5000&limit=10&apiKey=${apiKey}`;

let res = await fetch(url);
let data = await res.json();

let html="";

data.features.forEach(item=>{
html+=`
<div class="card">
<h3>${item.properties.name || "Restaurant"}</h3>
<p>${item.properties.address_line2 || ""}</p>
</div>`;
});

document.getElementById("restaurants").innerHTML=html;
}

async function loadAttractions(lat,lon){

let url =
`https://api.geoapify.com/v2/places?categories=tourism.attraction&filter=circle:${lon},${lat},10000&limit=10&apiKey=${apiKey}`;

let res = await fetch(url);
let data = await res.json();

let html="";

data.features.forEach(item=>{
html+=`
<div class="card">
<h3>${item.properties.name || "Tourist Spot"}</h3>
<p>${item.properties.address_line2 || ""}</p>
</div>`;
});

document.getElementById("attractions").innerHTML=html;
}