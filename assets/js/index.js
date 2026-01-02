// WRITE YOUR JS CODE HERE
//my api key : sVRyj8UhsdgL0LDXitjRrY1Rx3WUFTq2PGsvbY6Y

var dec = {
  btn: document.querySelectorAll("nav .nav-link"),
  secLaunches: document.getElementById("launches"),
  secTodaySpace: document.getElementById("today-in-space"),
  secPlanets: document.getElementById("planets"),
  img: document.getElementById("apod-image"),
  title: document.getElementById("apod-title"),
  explanation: document.getElementById("apod-explanation"),
  textDate: document.getElementById("apod-date-info"),
  detail: document.getElementById("apod-date-detail"),
  headerText: document.getElementById("apod-date"),
  copyRight: document.getElementById("apod-copyright"),
  dateInput: document.getElementById("apod-date-input"),
  load: document.getElementById("load-date-btn"),
  mediaType: document.getElementById("apod-media-type"),
  todayBtn: document.getElementById("today-apod-btn"),
  planetInfo: document.querySelectorAll(".planet-card"),
  imgBody: document.getElementById("planet-detail-image"),
  planetName: document.getElementById("planet-detail-name"),
  planetDesc: document.getElementById("planet-detail-description"),
  planetDistance: document.getElementById("planet-distance"),
  planetRadius: document.getElementById("planet-radius"),
  planetMass: document.getElementById("planet-mass"),
  planetDensity: document.getElementById("planet-density"),
  planetPerihelion: document.getElementById("planet-perihelion"),
  planetAphelion: document.getElementById("planet-aphelion"),
  planetEccentricity: document.getElementById("planet-eccentricity"),
  planetAxial: document.getElementById("planet-axial-tilt"),
  planetTemp: document.getElementById("planet-temp"),
  planetDiscoverer: document.getElementById("planet-discoverer"),
  planetVolume: document.getElementById("planet-volume"),
  planetDiscoveryDate: document.getElementById("planet-discovery-date"),
  planetBodyType: document.getElementById("planet-body-type"),
  planetEscape: document.getElementById("planet-escape"),
  planetInclination: document.getElementById("planet-inclination"),
  planetOrbital: document.getElementById("planet-orbital-period"),
  planetRotation: document.getElementById("planet-rotation"),
  planetMoons: document.getElementById("planet-moons"),
  launchTitle: document.querySelector("#featured-launch h3"),
  launchMainImg: document.getElementById("launchMainImg"),
  launchesCards: document.getElementById("launches-grid"),
  countryName: document.getElementById("countryName"),
  locationName: document.getElementById("locationName"),
  descriptionName: document.getElementById("descriptionName"),
  planetType: document.querySelectorAll("#planetType"),
  planetNumMoons: document.querySelectorAll("#planetNumMoons"),
  planetDensityRow: document.querySelectorAll("#planetDensityRow"),
  planetMassRow: document.querySelectorAll("#planetMassRow"),
  planetDiameter:document.querySelectorAll("#planetDiameter")
};
var search;
for (var i = 0; i < dec.btn.length; i++) {
  dec.btn[i].addEventListener("click", function (e) {
    var btnData = e.currentTarget.getAttribute("data-section");
    for (var z = 0; z < dec.btn.length; z++) {
      dec.btn[z].classList.remove("bg-blue-500/10", "text-blue-400");
    }
    if (btnData == "today-in-space") {
      dec.secTodaySpace.classList.remove("hidden");
      dec.secLaunches.classList.add("hidden");
      dec.secPlanets.classList.add("hidden");
    } else if (btnData == "launches") {
      dec.secLaunches.classList.remove("hidden");
      dec.secTodaySpace.classList.add("hidden");
      dec.secPlanets.classList.add("hidden");
    } else if (btnData == "planets") {
      dec.secPlanets.classList.remove("hidden");
      dec.secTodaySpace.classList.add("hidden");
      dec.secLaunches.classList.add("hidden");
    }
    e.currentTarget.classList.add("bg-blue-500/10", "text-blue-400");
  });
}

dec.dateInput.addEventListener("input", function () {
  search = {
    date: dec.dateInput.value,
  };
  dec.dateInput.nextElementSibling.innerHTML = dec.dateInput.value;
});

dec.load.addEventListener("click", async function () {
  var request = await fetch(
    `https://api.nasa.gov/planetary/apod?api_key=sVRyj8UhsdgL0LDXitjRrY1Rx3WUFTq2PGsvbY6Y&date=${search.date}`
  );
  var data = await request.json();
  displaySelectedSpace(data);
});

function displaySelectedSpace(data) {
  dec.img.src = data.url;
  dec.title.innerHTML = data.title;
  dec.explanation.innerHTML = data.explanation;
  dec.textDate.innerHTML = data.date;
  dec.detail.innerHTML = data.date;
  dec.headerText.innerHTML = `Astronomy Picture of the Day - ${data.date}`;
  dec.copyRight.innerHTML = ` &copy; copyright:  ${data.copyright}`;
  dec.mediaType.innerHTML = data.media_type;
}

dec.todayBtn.addEventListener("click", async function () {
  var time = new Date().toLocaleDateString();
  dec.dateInput.nextElementSibling.innerHTML = time;

  var response = await fetch(
    "https://api.nasa.gov/planetary/apod?api_key=sVRyj8UhsdgL0LDXitjRrY1Rx3WUFTq2PGsvbY6Y"
  );
  var data = await response.json();
  displayTodaySpace(data, time);
});

function displayTodaySpace(data, time) {
  //dec.src=data.url
  dec.title.innerHTML = data.title;
  dec.explanation.innerHTML = data.explanation;
  dec.textDate.innerHTML = time;
  dec.detail.innerHTML = time;
  dec.headerText.innerHTML = `Astronomy Picture of the Day - ${time}`;
  dec.mediaType.innerHTML = "Video";
  //dec.mediaType.innerHTML = data.media_type;
}

////////////////////////////////plant///////////////////////////////////////////////////
var getData = [];
async function getPlantsData() {
  var response = await fetch(
    "https://solar-system-opendata-proxy.vercel.app/api/planets"
  );
  var data = await response.json();
  getData = data.bodies;
  selectPlanet();
}
getPlantsData();
function selectPlanet() {
  for (var i = 0; i < dec.planetInfo.length; i++) {
    dec.planetInfo[i].addEventListener("click", function (e) {
      var target = e.currentTarget.getAttribute("data-planet-id");
      displayPlants(target);
    });
    dec.planetType[i].innerHTML = getData[i].type;
    dec.planetDensityRow[i].innerHTML = getData[i].density.toFixed(2);
    dec.planetMassRow[i].innerHTML = (getData[i].mass.massValue/getData[i].mass.massExponent).toFixed(3);
    dec.planetDiameter[i].innerHTML=getData[i].longAscNode.toFixed(1)
    //dec.planetNumMoons[i].innerHTML=getData[i].moons.length;
  }
}
function displayPlants(target) {
  for (var i = 0; i < getData.length; i++) {
    var englishName = getData[i].englishName;
    if (target.toLocaleLowerCase() == englishName.toLocaleLowerCase()) {
      dec.imgBody.src = getData[i].image;
      dec.planetName.innerHTML = getData[i].name;
      dec.planetDesc.innerHTML = getData[i].description;
      dec.planetDistance.innerHTML = `${getData[i].semimajorAxis} Km`;
      dec.planetRadius.innerHTML = `${getData[i].meanRadius} Km`;
      dec.planetMass.innerHTML = `${getData[i].mass.massValue.toFixed(2)}*10²⁴ Kg`;
      dec.planetDensity.innerHTML = `${getData[i].density.toFixed(2)} g/cm³`;
      dec.planetPerihelion.innerHTML = `${getData[i].perihelion} M km`;
      dec.planetAphelion.innerHTML = `${getData[i].aphelion} M km`;
      dec.planetEccentricity.innerHTML = getData[i].eccentricity;
      dec.planetAxial.innerHTML = `${getData[i].axialTilt} °`;
      dec.planetTemp.innerHTML = `${getData[i].avgTemp}°C`;
      dec.planetEscape.innerHTML = `${getData[i].escape} km/s`;
      dec.planetDiscoverer.innerHTML = getData[i].discoveredBy
        ? getData[i].discoveredBy
        : `Known since antiquity`;
      dec.planetDiscoveryDate.innerHTML = getData[i].discoveryDate
        ? getData[i].discoveryDate
        : `Ancient`;
      dec.planetBodyType.innerHTML = getData[i].bodyType;
      dec.planetVolume.innerHTML = `${getData[i].vol.volValue.toFixed(2)} x10^ ${getData[i].vol.volExponent}Km`;
      dec.planetOrbital.innerHTML = getData[i].sideralOrbit;
      dec.planetRotation.innerHTML = getData[i].sideralRotation.toFixed(2);
      dec.planetMoons.innerHTML = getData[i].moons.length;
    }
  }
}
////////////////////////////////////////////////////////////////////////////////////////////////

async function getLaunches() {
  var response = await fetch(
    "https://ll.thespacedevs.com/2.3.0/launches/upcoming/?limit=10"
  );
  var data = await response.json();
  var showData = data.results;
  displayLaunches(showData);
}
getLaunches();

function displayLaunches(showData) {
  dec.locationName.innerHTML = showData[0].pad.location.name;
  dec.launchTitle.innerHTML = showData[0].name;
  dec.descriptionName.innerHTML = showData[0].mission.description;
  dec.countryName.innerHTML = showData[0].pad.country.name;
  dec.launchMainImg.src = showData[0].image
    ? `${showData[0].image.image_url}`
    : `assets/images/launch-placeholder.png`;
  var cartona = "";
  for (var i = 0; i < showData.length - 1; i++) {
    cartona += `
          <div
              class="bg-slate-800/50 border border-slate-700 rounded-2xl overflow-hidden hover:border-blue-500/30 transition-all group cursor-pointer"
            >
              <div
                class="relative h-48 bg-slate-900/50 flex items-center justify-center"
              >
              <img src="${showData[i].image.image_url}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" onerror="this.onerror=null; this.src='/images/launch-placeholder.png';">
              
                
                <div class="absolute top-3 right-3">
                
                  <span
                    class="px-3 py-1 bg-green-500/90 text-white backdrop-blur-sm rounded-full text-xs font-semibold"
                  >
                    ${showData[i].status.abbrev}
                  
                  </span>
                  
                </div>
              </div>
              <div class="p-5">
                <div class="mb-3">
                  <h4
                    class="font-bold text-lg mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors"
                  >
                    ${showData[i].name}
                  </h4>
                  <p class="text-sm text-slate-400 flex items-center gap-2">
                    <i class="fas fa-building text-xs"></i>
                    ${showData[i].image.credit}
                  </p>
                </div>
                <div class="space-y-2 mb-4">
                  <div class="flex items-center gap-2 text-sm">
                    <i class="fas fa-calendar text-slate-500 w-4"></i>
                    <span class="text-slate-300">${showData[i].last_updated}</span>
                  </div>
                  <div class="flex items-center gap-2 text-sm">
                    <i class="fas fa-clock text-slate-500 w-4"></i>
                    <span class="text-slate-300">12:00 AM UTC</span>
                  </div>
                  <div class="flex items-center gap-2 text-sm">
                    <i class="fas fa-rocket text-slate-500 w-4"></i>
                    <span class="text-slate-300">${showData[i].rocket.configuration.name}</span>
                  </div>
                  <div class="flex items-center gap-2 text-sm">
                    <i class="fas fa-map-marker-alt text-slate-500 w-4"></i>
                    <span class="text-slate-300 line-clamp-1">${showData[i].pad.location.name}</span>
                  </div>
                </div>
                <div
                  class="flex items-center gap-2 pt-4 border-t border-slate-700"
                >
                  <button
                    class="flex-1 px-4 py-2 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors text-sm font-semibold"
                  >
                    Details
                  </button>
                  <button
                    class="px-3 py-2 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors"
                  >
                    <i class="far fa-heart"></i>
                  </button>
                </div>
              </div>
            </div>
  
  `;
  }
  dec.launchesCards.innerHTML = cartona;
}
