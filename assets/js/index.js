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
  countryName:document.getElementById("countryName"),
  locationName:document.getElementById("locationName")
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
////////////////////////////////////////////////////////////////////////////

////////////////////////////////plant///////////////////////////////////////////////////
var getData = [];
async function getPlantsData() {
  var response = await fetch(
    "https://solar-system-opendata-proxy.vercel.app/api/planets"
  );
  var data = await response.json();
  getData = data.bodies;
}
getPlantsData();
for (var i = 0; i < dec.planetInfo.length; i++) {
  dec.planetInfo[i].addEventListener("click", function (e) {
    var target = e.currentTarget.getAttribute("data-planet-id");
    displayPlants(target);
  });
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
      dec.planetMass.innerHTML = `${getData[i].mass.massValue}*10²⁴ Kg`;
      dec.planetDensity.innerHTML = `${getData[i].density} g/cm³`;
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
      dec.planetVolume.innerHTML = `${getData[i].vol.volValue} x10^ ${getData[i].vol.volExponent}Km`;
      dec.planetOrbital.innerHTML = getData[i].sideralOrbit;
      dec.planetRotation.innerHTML = getData[i].sideralRotation;
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
 // dec.launchTitle.innerHTML = showData[0].name;
 // dec.countryName.innerHTML=showData[0].country.name
  //dec.locationName.innerHTML=showData[0].location.name
  var cartona = ""
   console.log("hhhh");
  for (var i = 0; i < showData.length-1; i++) {
    cartona += `
          <div
              class="bg-slate-800/50 border border-slate-700 rounded-2xl overflow-hidden hover:border-blue-500/30 transition-all group cursor-pointer"
            >
              <div
                class="relative h-48 bg-slate-900/50 flex items-center justify-center"
              >
              <img src="${showData[i].image.image_url}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" onerror="this.onerror=null; this.src='/images/launch-placeholder.png';">
              
                <i class="fas fa-space-shuttle text-5xl text-slate-700"></i>
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
                    <span class="text-slate-300">${showData[i].last_updated}</span>
                  </div>
                  <div class="flex items-center gap-2 text-sm">
                    <i class="fas fa-rocket text-slate-500 w-4"></i>
                    <span class="text-slate-300">${showData[i].rocket.configuration.name}</span>
                  </div>
                  <div class="flex items-center gap-2 text-sm">
                    <i class="fas fa-map-marker-alt text-slate-500 w-4"></i>
                    <span class="text-slate-300 line-clamp-1"></span>
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
  console.log("hhhh");
  dec.launchesCards.innerHTML = cartona;
}
console.log("hhhh");
//         {
//             "id": "a81fcb21-ed57-47ef-ab57-33ddd9c6ffcd",
//             "url": "https://ll.thespacedevs.com/2.3.0/launches/a81fcb21-ed57-47ef-ab57-33ddd9c6ffcd/",
//             "response_mode": "normal",
//             "slug": "hanbit-nano-spaceward",
//             "launch_designator": null,
//             "status": {
//                 "id": 4,
//                 "name": "Launch Failure",
//                 "abbrev": "Failure",
//                 "description": "Either the launch vehicle did not reach orbit, or the payload(s) failed to separate."
//             },
//             "last_updated": "2025-12-23T01:49:54Z",
//             "net": "2025-12-23T01:13:00Z",
//             "net_precision": {
//                 "id": 1,
//                 "name": "Minute",
//                 "abbrev": "MIN",
//                 "description": "The T-0 is accurate to the minute."
//             },
//             "window_end": "2025-12-23T02:59:00Z",
//             "window_start": "2025-12-22T15:00:00Z",
//             "image": {
//                 "id": 2492,
//                 "name": "HANBIT-Nano during ground tests in South Korean",
//                 "image_url": "https://thespacedevs-prod.nyc3.digitaloceanspaces.com/media/images/hanbit-nano_gro_image_20251021114236.jpg",
//                 "thumbnail_url": "https://thespacedevs-prod.nyc3.digitaloceanspaces.com/media/images/hanbit-nano_gro_image_thumbnail_20251021114237.jpeg",
//                 "credit": "Innospace",
//                 "license": {
//                     "id": 1,
//                     "name": "Unknown",
//                     "priority": 9,
//                     "link": null
//                 },
//                 "single_use": true,
//                 "variants": []
//             },
//             "infographic": null,
//             "probability": null,
//             "weather_concerns": null,
//             "failreason": "Apparently loss of control and crashed back on ground about 1 minute after launch.",
//             "hashtag": null,
//             "launch_service_provider": {
//                 "response_mode": "list",
//                 "id": 1098,
//                 "url": "https://ll.thespacedevs.com/2.3.0/agencies/1098/",
//                 "name": "Innospace",
//                 "abbrev": "IS",
//                 "type": {
//                     "id": 5,
//                     "name": "Private"
//                 }
//             },
//             "rocket": {
//                 "id": 8777,
//                 "configuration": {
//                     "response_mode": "list",
//                     "id": 530,
//                     "url": "https://ll.thespacedevs.com/2.3.0/launcher_configurations/530/",
//                     "name": "HANBIT-Nano",
//                     "families": [
//                         {
//                             "response_mode": "list",
//                             "id": 208,
//                             "name": "HANBIT"
//                         }
//                     ],
//                     "full_name": "HANBIT-Nano",
//                     "variant": "Nano"
//                 }
//             },
//             "mission": {
//                 "id": 7368,
//                 "name": "Spaceward",
//                 "type": "Test Flight",
//                 "description": "Maiden orbital launch attempt for the South Korean stratup Innospace and its HANBIT-Nano small launch vehicle. Onboard this flight are five small satellites from the Brazilian space agency AEB, Brazilian university Universidade Federal do Maranhão and Indian startup Grahaa Space, as well as three payloads from AEB and Brazilian company Castro Leite Consultoria that will remain attached to the rocket, and an empty aluminium can from the South Korean beverage company Brewguru.",
//                 "image": null,
//                 "orbit": {
//                     "id": 17,
//                     "name": "Sun-Synchronous Orbit",
//                     "abbrev": "SSO",
//                     "celestial_body": {
//                         "response_mode": "list",
//                         "id": 1,
//                         "name": "Earth"
//                     }
//                 },
//                 "agencies": [
//                     {
//                         "response_mode": "normal",
//                         "id": 12,
//                         "url": "https://ll.thespacedevs.com/2.3.0/agencies/12/",
//                         "name": "Brazilian Space Agency",
//                         "abbrev": "AEB",
//                         "type": {
//                             "id": 1,
//                             "name": "Government"
//                         },
//                         "featured": false,
//                         "country": [
//                             {
//                                 "id": 24,
//                                 "name": "Brazil",
//                                 "alpha_2_code": "BR",
//                                 "alpha_3_code": "BRA",
//                                 "nationality_name": "Brazilian",
//                                 "nationality_name_composed": "Brazilian"
//                             }
//                         ],
//                         "description": "The Brazilian Space Agency is a space agency in South America.  They work in partnership with the US and Russia aboard the ISS. It was previously operated by the military until 1994. They now operate largely in tandem with other nations. They run a spaceport and rocket launch site both in Brazil. They built the VLM small satellite launch system in tandem with Germany. The VLS-1 was intended to be a primary launch vehicle for the BSA, but it failed 3 times and was canceled. They have restarted work on the system in tandem with the Russian Space Agency.",
//                         "administrator": "Administrator: Marco Antonio Chamon",
//                         "founding_year": 1961,
//                         "launchers": "VLM | VLS",
//                         "spacecraft": "None",
//                         "parent": null,
//                         "image": null,
//                         "logo": null,
//                         "social_logo": null,
//                         "total_launch_count": 2,
//                         "consecutive_successful_launches": 0,
//                         "successful_launches": 0,
//                         "failed_launches": 2,
//                         "pending_launches": 0,
//                         "consecutive_successful_landings": 0,
//                         "successful_landings": 0,
//                         "failed_landings": 0,
//                         "attempted_landings": 0,
//                         "successful_landings_spacecraft": 0,
//                         "failed_landings_spacecraft": 0,
//                         "attempted_landings_spacecraft": 0,
//                         "successful_landings_payload": 0,
//                         "failed_landings_payload": 0,
//                         "attempted_landings_payload": 0,
//                         "info_url": "https://www.gov.br/aeb/pt-br",
//                         "wiki_url": "https://en.wikipedia.org/wiki/Brazilian_Space_Agency",
//                         "social_media_links": []
//                     },
//                     {
//                         "response_mode": "normal",
//                         "id": 1098,
//                         "url": "https://ll.thespacedevs.com/2.3.0/agencies/1098/",
//                         "name": "Innospace",
//                         "abbrev": "IS",
//                         "type": {
//                             "id": 5,
//                             "name": "Private"
//                         },
//                         "featured": false,
//                         "country": [
//                             {
//                                 "id": 35,
//                                 "name": "South Korea",
//                                 "alpha_2_code": "KR",
//                                 "alpha_3_code": "KOR",
//                                 "nationality_name": "South Korean",
//                                 "nationality_name_composed": "South Korean"
//                             }
//                         ],
//                         "description": "Innospace is a South Korean startup company specializing in developing hybrid space rocket.",
//                         "administrator": "CEO: Kim Soo-jong",
//                         "founding_year": 2017,
//                         "launchers": "HANBIT",
//                         "spacecraft": "",
//                         "parent": null,
//                         "image": {
//                             "id": 2491,
//                             "name": "HANBIT-TLV launch from Alcântara",
//                             "image_url": "https://thespacedevs-prod.nyc3.digitaloceanspaces.com/media/images/hanbit-tlv_laun_image_20251021112914.jpg",
//                             "thumbnail_url": "https://thespacedevs-prod.nyc3.digitaloceanspaces.com/media/images/hanbit-tlv_laun_image_thumbnail_20251021112914.jpeg",
//                             "credit": "Innospace",
//                             "license": {
//                                 "id": 1,
//                                 "name": "Unknown",
//                                 "priority": 9,
//                                 "link": null
//                             },
//                             "single_use": false,
//                             "variants": []
//                         },
//                         "logo": {
//                             "id": 2490,
//                             "name": "Innospace social logo",
//                             "image_url": "https://thespacedevs-prod.nyc3.digitaloceanspaces.com/media/images/innospace_socia_image_20251021112531.png",
//                             "thumbnail_url": "https://thespacedevs-prod.nyc3.digitaloceanspaces.com/media/images/innospace_socia_image_thumbnail_20251021112531.png",
//                             "credit": "Innospace",
//                             "license": {
//                                 "id": 1,
//                                 "name": "Unknown",
//                                 "priority": 9,
//                                 "link": null
//                             },
//                             "single_use": true,
//                             "variants": []
//                         },
//                         "social_logo": {
//                             "id": 2490,
//                             "name": "Innospace social logo",
//                             "image_url": "https://thespacedevs-prod.nyc3.digitaloceanspaces.com/media/images/innospace_socia_image_20251021112531.png",
//                             "thumbnail_url": "https://thespacedevs-prod.nyc3.digitaloceanspaces.com/media/images/innospace_socia_image_thumbnail_20251021112531.png",
//                             "credit": "Innospace",
//                             "license": {
//                                 "id": 1,
//                                 "name": "Unknown",
//                                 "priority": 9,
//                                 "link": null
//                             },
//                             "single_use": true,
//                             "variants": []
//                         },
//                         "total_launch_count": 2,
//                         "consecutive_successful_launches": 0,
//                         "successful_launches": 1,
//                         "failed_launches": 1,
//                         "pending_launches": 0,
//                         "consecutive_successful_landings": 0,
//                         "successful_landings": 0,
//                         "failed_landings": 0,
//                         "attempted_landings": 0,
//                         "successful_landings_spacecraft": 0,
//                         "failed_landings_spacecraft": 0,
//                         "attempted_landings_spacecraft": 0,
//                         "successful_landings_payload": 0,
//                         "failed_landings_payload": 0,
//                         "attempted_landings_payload": 0,
//                         "info_url": "https://www.innospc.com/main",
//                         "wiki_url": "https://en.wikipedia.org/wiki/Innospace",
//                         "social_media_links": [
//                             {
//                                 "id": 324,
//                                 "social_media": {
//                                     "id": 3,
//                                     "name": "Homepage",
//                                     "url": null,
//                                     "logo": null
//                                 },
//                                 "url": "https://www.innospc.com/main"
//                             },
//                             {
//                                 "id": 325,
//                                 "social_media": {
//                                     "id": 4,
//                                     "name": "LinkedIn",
//                                     "url": "https://www.linkedin.com/",
//                                     "logo": {
//                                         "id": 2321,
//                                         "name": "LinkedIn logo",
//                                         "image_url": "https://thespacedevs-prod.nyc3.digitaloceanspaces.com/media/images/linkedin_logo_image_20250211191111.png",
//                                         "thumbnail_url": "https://thespacedevs-prod.nyc3.digitaloceanspaces.com/media/images/linkedin_logo_image_thumbnail_20250211191112.png",
//                                         "credit": "LinkedIn",
//                                         "license": {
//                                             "id": 1,
//                                             "name": "Unknown",
//                                             "priority": 9,
//                                             "link": null
//                                         },
//                                         "single_use": true,
//                                         "variants": []
//                                     }
//                                 },
//                                 "url": "https://www.linkedin.com/company/innospacecorp/"
//                             },
//                             {
//                                 "id": 326,
//                                 "social_media": {
//                                     "id": 1,
//                                     "name": "X",
//                                     "url": "https://x.com",
//                                     "logo": {
//                                         "id": 2320,
//                                         "name": "X logo",
//                                         "image_url": "https://thespacedevs-prod.nyc3.digitaloceanspaces.com/media/images/x_logo_image_20250211191027.jpg",
//                                         "thumbnail_url": "https://thespacedevs-prod.nyc3.digitaloceanspaces.com/media/images/x_logo_image_thumbnail_20250211191027.jpeg",
//                                         "credit": "X",
//                                         "license": {
//                                             "id": 1,
//                                             "name": "Unknown",
//                                             "priority": 9,
//                                             "link": null
//                                         },
//                                         "single_use": true,
//                                         "variants": []
//                                     }
//                                 },
//                                 "url": "https://x.com/innospacecorp"
//                             },
//                             {
//                                 "id": 327,
//                                 "social_media": {
//                                     "id": 7,
//                                     "name": "Facebook",
//                                     "url": "https://www.facebook.com/",
//                                     "logo": {
//                                         "id": 2420,
//                                         "name": "Facebook logo",
//                                         "image_url": "https://thespacedevs-prod.nyc3.digitaloceanspaces.com/media/images/facebook_logo_image_20250721163611.png",
//                                         "thumbnail_url": "https://thespacedevs-prod.nyc3.digitaloceanspaces.com/media/images/facebook_logo_image_thumbnail_20250721163611.png",
//                                         "credit": "Facebook",
//                                         "license": {
//                                             "id": 1,
//                                             "name": "Unknown",
//                                             "priority": 9,
//                                             "link": null
//                                         },
//                                         "single_use": true,
//                                         "variants": []
//                                     }
//                                 },
//                                 "url": "https://www.facebook.com/innospacecorp/"
//                             },
//                             {
//                                 "id": 328,
//                                 "social_media": {
//                                     "id": 6,
//                                     "name": "Youtube",
//                                     "url": "https://www.youtube.com/",
//                                     "logo": {
//                                         "id": 2356,
//                                         "name": "YouTube logo",
//                                         "image_url": "https://thespacedevs-prod.nyc3.digitaloceanspaces.com/media/images/youtube_logo_image_20250321073112.png",
//                                         "thumbnail_url": "https://thespacedevs-prod.nyc3.digitaloceanspaces.com/media/images/youtube_logo_image_thumbnail_20250321073112.png",
//                                         "credit": "YouTube",
//                                         "license": {
//                                             "id": 1,
//                                             "name": "Unknown",
//                                             "priority": 9,
//                                             "link": null
//                                         },
//                                         "single_use": true,
//                                         "variants": []
//                                     }
//                                 },
//                                 "url": "https://www.youtube.com/channel/UCGa3zejAynD2FlbphQQTFrw/"
//                             }
//                         ]
//                     }
//                 ],
//                 "info_urls": [],
//                 "vid_urls": []
//             },
//             "pad": {
//                 "id": 240,
//                 "url": "https://ll.thespacedevs.com/2.3.0/pads/240/",
//                 "active": true,
//                 "agencies": [
//                     {
//                         "response_mode": "normal",
//                         "id": 1098,
//                         "url": "https://ll.thespacedevs.com/2.3.0/agencies/1098/",
//                         "name": "Innospace",
//                         "abbrev": "IS",
//                         "type": {
//                             "id": 5,
//                             "name": "Private"
//                         },
//                         "featured": false,
//                         "country": [
//                             {
//                                 "id": 35,
//                                 "name": "South Korea",
//                                 "alpha_2_code": "KR",
//                                 "alpha_3_code": "KOR",
//                                 "nationality_name": "South Korean",
//                                 "nationality_name_composed": "South Korean"
//                             }
//                         ],
//                         "description": "Innospace is a South Korean startup company specializing in developing hybrid space rocket.",
//                         "administrator": "CEO: Kim Soo-jong",
//                         "founding_year": 2017,
//                         "launchers": "HANBIT",
//                         "spacecraft": "",
//                         "parent": null,
//                         "image": {
//                             "id": 2491,
//                             "name": "HANBIT-TLV launch from Alcântara",
//                             "image_url": "https://thespacedevs-prod.nyc3.digitaloceanspaces.com/media/images/hanbit-tlv_laun_image_20251021112914.jpg",
//                             "thumbnail_url": "https://thespacedevs-prod.nyc3.digitaloceanspaces.com/media/images/hanbit-tlv_laun_image_thumbnail_20251021112914.jpeg",
//                             "credit": "Innospace",
//                             "license": {
//                                 "id": 1,
//                                 "name": "Unknown",
//                                 "priority": 9,
//                                 "link": null
//                             },
//                             "single_use": false,
//                             "variants": []
//                         },
//                         "logo": {
//                             "id": 2490,
//                             "name": "Innospace social logo",
//                             "image_url": "https://thespacedevs-prod.nyc3.digitaloceanspaces.com/media/images/innospace_socia_image_20251021112531.png",
//                             "thumbnail_url": "https://thespacedevs-prod.nyc3.digitaloceanspaces.com/media/images/innospace_socia_image_thumbnail_20251021112531.png",
//                             "credit": "Innospace",
//                             "license": {
//                                 "id": 1,
//                                 "name": "Unknown",
//                                 "priority": 9,
//                                 "link": null
//                             },
//                             "single_use": true,
//                             "variants": []
//                         },
//                         "social_logo": {
//                             "id": 2490,
//                             "name": "Innospace social logo",
//                             "image_url": "https://thespacedevs-prod.nyc3.digitaloceanspaces.com/media/images/innospace_socia_image_20251021112531.png",
//                             "thumbnail_url": "https://thespacedevs-prod.nyc3.digitaloceanspaces.com/media/images/innospace_socia_image_thumbnail_20251021112531.png",
//                             "credit": "Innospace",
//                             "license": {
//                                 "id": 1,
//                                 "name": "Unknown",
//                                 "priority": 9,
//                                 "link": null
//                             },
//                             "single_use": true,
//                             "variants": []
//                         }
//                     }
//                 ],
//                 "name": "HANBIT Pad",
//                 "image": null,
//                 "description": "Launchpad of the HANBIT rockets developed by South Korean company Innospace.",
//                 "info_url": null,
//                 "wiki_url": "https://en.wikipedia.org/wiki/Alc%C3%A2ntara_Space_Center",
//                 "map_url": "https://www.google.com/maps?q=-2.31698,-44.36873",
//                 "latitude": -2.31698,
//                 "longitude": -44.36873,
//                 "country": {
//                     "id": 24,
//                     "name": "Brazil",
//                     "alpha_2_code": "BR",
//                     "alpha_3_code": "BRA",
//                     "nationality_name": "Brazilian",
//                     "nationality_name_composed": "Brazilian"
//                 },
//                 "map_image": "https://thespacedevs-prod.nyc3.digitaloceanspaces.com/media/map_images/pad_hanbit_pad_20251021114902.jpg",
//                 "total_launch_count": 2,
//                 "orbital_launch_attempt_count": 1,
//                 "fastest_turnaround": "P1009DT7H21M",
//                 "location": {
//                     "response_mode": "normal",
//                     "id": 150,
//                     "url": "https://ll.thespacedevs.com/2.3.0/locations/150/",
//                     "name": "Alcântara Space Center, Federative Republic of Brazil",
//                     "celestial_body": {
//                         "response_mode": "normal",
//                         "id": 1,
//                         "name": "Earth",
//                         "type": {
//                             "id": 1,
//                             "name": "Planet"
//                         },
//                         "diameter": 12742000.0,
//                         "mass": 5.972168e+24,
//                         "gravity": 9.80655,
//                         "length_of_day": "1 00:00:00",
//                         "atmosphere": true,
//                         "image": {
//                             "id": 2040,
//                             "name": "Earth (Apollo 17)",
//                             "image_url": "https://thespacedevs-prod.nyc3.digitaloceanspaces.com/media/images/earth_2528apol_image_20240402194304.jpeg",
//                             "thumbnail_url": "https://thespacedevs-prod.nyc3.digitaloceanspaces.com/media/images/earth_2528apol_image_thumbnail_20240402194305.jpeg",
//                             "credit": "NASA",
//                             "license": {
//                                 "id": 4,
//                                 "name": "NASA Image and Media Guidelines",
//                                 "priority": 0,
//                                 "link": "https://www.nasa.gov/nasa-brand-center/images-and-media/"
//                             },
//                             "single_use": true,
//                             "variants": []
//                         },
//                         "description": "Earth is the third planet from the Sun and the only astronomical object known to harbor life.",
//                         "wiki_url": "https://en.wikipedia.org/wiki/Earth",
//                         "total_attempted_launches": 7382,
//                         "successful_launches": 6833,
//                         "failed_launches": 549,
//                         "total_attempted_landings": 1242,
//                         "successful_landings": 1196,
//                         "failed_landings": 46
//                     },
//                     "active": true,
//                     "country": {
//                         "id": 24,
//                         "name": "Brazil",
//                         "alpha_2_code": "BR",
//                         "alpha_3_code": "BRA",
//                         "nationality_name": "Brazilian",
//                         "nationality_name_composed": "Brazilian"
//                     },
//                     "description": "The Alcântara Space Center, formerly known as Alcântara Launch Center is a space center and launching facility of the Brazilian Space Agency in the city of Alcântara, located on Brazil's northern Atlantic coast, in the state of Maranhão.",
//                     "image": {
//                         "id": 2136,
//                         "name": "VLS Pad at the Alcântara Space Center",
//                         "image_url": "https://thespacedevs-prod.nyc3.digitaloceanspaces.com/media/images/vls_pad_at_the__image_20240808093113.jpeg",
//                         "thumbnail_url": "https://thespacedevs-prod.nyc3.digitaloceanspaces.com/media/images/vls_pad_at_the__image_thumbnail_20240808093114.jpeg",
//                         "credit": "AEB",
//                         "license": {
//                             "id": 27,
//                             "name": "CC BY-ND 3.0",
//                             "priority": 0,
//                             "link": "https://creativecommons.org/licenses/by-nd/3.0/deed.en"
//                         },
//                         "single_use": true,
//                         "variants": []
//                     },
//                     "map_image": "https://thespacedevs-prod.nyc3.digitaloceanspaces.com/media/map_images/location_150_20200803142405.jpg",
//                     "longitude": -44.4175,
//                     "latitude": -2.339444,
//                     "timezone_name": "America/Fortaleza",
//                     "total_launch_count": 4,
//                     "total_landing_count": 0
//                 }
//             },
//             "webcast_live": false,
//             "program": [],
//             "orbital_launch_attempt_count": 7165,
//             "location_launch_attempt_count": 4,
//             "pad_launch_attempt_count": 2,
//             "agency_launch_attempt_count": 2,
//             "orbital_launch_attempt_count_year": 316,
//             "location_launch_attempt_count_year": 1,
//             "pad_launch_attempt_count_year": 1,
//             "agency_launch_attempt_count_year": 1
//         },

//     ]
// }

//
/*  
            "isPlanet": true,
            "mass": {
               
                "massExponent": 25
            },
            "gravity": 8.87,
            "equaRadius": 25559,
            "polarRadius": 24973,
            "flattening": 0.02293,
            "dimension": "",
            "aroundPlanet": null,
            "alternativeName": "",
            "mainAnomaly": 142.2386,
            "argPeriapsis": 98.862,
            "longAscNode": 73.967,
            "type": "Ice Giant"

*/
/* 


*/