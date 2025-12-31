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

/* 

{
    "count": 90,
    "next": "https://lldev.thespacedevs.com/2.3.0/launches/upcoming/?limit=10&offset=10",
    "previous": null,
    "results": [
        {
            "id": "fb6d9dd6-2087-40b7-b3ca-c807b5b2be43",
            "url": "https://lldev.thespacedevs.com/2.3.0/launches/fb6d9dd6-2087-40b7-b3ca-c807b5b2be43/",
            "name": "Long March 7A | Unknown Payload",
            "response_mode": "normal",
            "slug": "long-march-7a-unknown-payload",
            "launch_designator": null,
            "status": {
                "id": 1,
                "name": "Go for Launch",
                "abbrev": "Go",
                "description": "Current T-0 confirmed by official or reliable sources."
            },
            "last_updated": "2025-12-26T10:22:33Z",
            "net": "2025-12-30T22:40:00Z",
            "net_precision": {
                "id": 2,
                "name": "Hour",
                "abbrev": "HR",
                "description": "The T-0 is accurate to the hour."
            },
            "window_end": "2025-12-30T23:10:00Z",
            "window_start": "2025-12-30T22:32:00Z",
            "image": {
                "id": 2617,
                "name": "CZ-7A Launch (Yaogan 45)",
                "image_url": "https://thespacedevs-dev.nyc3.digitaloceanspaces.com/media/images/cz-7a_launch_2_image_20251206093324.jpeg",
                "thumbnail_url": "https://thespacedevs-dev.nyc3.digitaloceanspaces.com/media/images/cz-7a_launch_2_image_thumbnail_20251206093324.jpeg",
                "credit": "CASC",
                "license": {
                    "id": 1,
                    "name": "Unknown",
                    "priority": 9,
                    "link": null
                },
                "single_use": false,
                "variants": []
            },
            "infographic": null,
            "probability": null,
            "weather_concerns": null,
            "failreason": "",
            "hashtag": null,
            "launch_service_provider": {
                "response_mode": "list",
                "id": 88,
                "url": "https://lldev.thespacedevs.com/2.3.0/agencies/88/",
                "name": "China Aerospace Science and Technology Corporation",
                "abbrev": "CASC",
                "type": {
                    "id": 1,
                    "name": "Government"
                }
            },
            "rocket": {
                "id": 8858,
                "configuration": {
                    "response_mode": "list",
                    "id": 216,
                    "url": "https://lldev.thespacedevs.com/2.3.0/launcher_configurations/216/",
                    "name": "Long March 7A",
                    "families": [
                        {
                            "response_mode": "list",
                            "id": 106,
                            "name": "Long March"
                        },
                        {
                            "response_mode": "list",
                            "id": 114,
                            "name": "Long March 7"
                        }
                    ],
                    "full_name": "Long March 7A",
                    "variant": "A"
                }
            },
            "mission": {
                "id": 7449,
                "name": "Unknown Payload",
                "type": "Unknown",
                "description": "Details TBD.",
                "image": null,
                "orbit": {
                    "id": 25,
                    "name": "Unknown",
                    "abbrev": "N/A",
                    "celestial_body": {
                        "response_mode": "list",
                        "id": 1,
                        "name": "Earth"
                    }
                },
                "agencies": [],
                "info_urls": [],
                "vid_urls": []
            },
            "pad": {
                "id": 176,
                "url": "https://lldev.thespacedevs.com/2.3.0/pads/176/",
                "active": true,
                "agencies": [],
                "name": "201",
                "image": {
                    "id": 2019,
                    "name": "CZ-8 liftoff from pad 201 (Queqiao-2)",
                    "image_url": "https://thespacedevs-dev.nyc3.digitaloceanspaces.com/media/images/cz-8_liftoff_2_image_20240320175819.jpeg",
                    "thumbnail_url": "https://thespacedevs-dev.nyc3.digitaloceanspaces.com/media/images/cz-8_liftoff_2_image_thumbnail_20240320175820.jpeg",
                    "credit": "秦英健/Qin Yingjian",
                    "license": {
                        "id": 1,
                        "name": "Unknown",
                        "priority": 9,
                        "link": null
                    },
                    "single_use": false,
                    "variants": []
                },
                "description": "",
                "info_url": null,
                "wiki_url": "https://en.wikipedia.org/wiki/Wenchang_Spacecraft_Launch_Site",
                "map_url": "https://www.google.com/maps?q=19.618452,110.955356",
                "latitude": 19.618452,
                "longitude": 110.955356,
                "country": {
                    "id": 6,
                    "name": "China",
                    "alpha_2_code": "CN",
                    "alpha_3_code": "CHN",
                    "nationality_name": "Chinese",
                    "nationality_name_composed": "Sino"
                },
                "map_image": "https://thespacedevs-dev.nyc3.digitaloceanspaces.com/media/map_images/pad_176_20200803143412.jpg",
                "total_launch_count": 27,
                "orbital_launch_attempt_count": 27,
                "fastest_turnaround": "P27DT8H33M",
                "location": {
                    "response_mode": "normal",
                    "id": 8,
                    "url": "https://lldev.thespacedevs.com/2.3.0/locations/8/",
                    "name": "Wenchang Space Launch Site, People's Republic of China",
                    "celestial_body": {
                        "response_mode": "normal",
                        "id": 1,
                        "name": "Earth",
                        "type": {
                            "id": 1,
                            "name": "Planet"
                        },
                        "diameter": 12742000.0,
                        "mass": 5.972168e+24,
                        "gravity": 9.80655,
                        "length_of_day": "1 00:00:00",
                        "atmosphere": true,
                        "image": {
                            "id": 2040,
                            "name": "Earth (Apollo 17)",
                            "image_url": "https://thespacedevs-dev.nyc3.digitaloceanspaces.com/media/images/earth_2528apol_image_20240402194304.jpeg",
                            "thumbnail_url": "https://thespacedevs-dev.nyc3.digitaloceanspaces.com/media/images/earth_2528apol_image_thumbnail_20240402194305.jpeg",
                            "credit": "NASA",
                            "license": {
                                "id": 4,
                                "name": "NASA Image and Media Guidelines",
                                "priority": 0,
                                "link": "https://www.nasa.gov/nasa-brand-center/images-and-media/"
                            },
                            "single_use": true,
                            "variants": []
                        },
                        "description": "Earth is the third planet from the Sun and the only astronomical object known to harbor life.",
                        "wiki_url": "https://en.wikipedia.org/wiki/Earth",
                        "total_attempted_launches": 7388,
                        "successful_launches": 6838,
                        "failed_launches": 550,
                        "total_attempted_landings": 1243,
                        "successful_landings": 1196,
                        "failed_landings": 47
                    },
                    "active": true,
                    "country": {
                        "id": 6,
                        "name": "China",
                        "alpha_2_code": "CN",
                        "alpha_3_code": "CHN",
                        "nationality_name": "Chinese",
                        "nationality_name_composed": "Sino"
                    },
                    "description": "The Wenchang Space Launch Site is a rocket launch site located in Wenchang on the island of Hainan, in China.\r\n\r\nFormally a suborbital test center, it currently serves as China's southernmost spaceport. The site was selected for its low latitude, 19° north of the equator, allowing for larger payloads to be launched. It is capable of launching the Long March 5, the heaviest Chinese rocket. Unlike launch facilities on the mainland, Wenchang uses its seaport for deliveries.",
                    "image": {
                        "id": 2019,
                        "name": "CZ-8 liftoff from pad 201 (Queqiao-2)",
                        "image_url": "https://thespacedevs-dev.nyc3.digitaloceanspaces.com/media/images/cz-8_liftoff_2_image_20240320175819.jpeg",
                        "thumbnail_url": "https://thespacedevs-dev.nyc3.digitaloceanspaces.com/media/images/cz-8_liftoff_2_image_thumbnail_20240320175820.jpeg",
                        "credit": "秦英健/Qin Yingjian",
                        "license": {
                            "id": 1,
                            "name": "Unknown",
                            "priority": 9,
                            "link": null
                        },
                        "single_use": false,
                        "variants": []
                    },
                    "map_image": "https://thespacedevs-dev.nyc3.digitaloceanspaces.com/media/map_images/location_8_20200803142445.jpg",
                    "longitude": 110.951133,
                    "latitude": 19.614492,
                    "timezone_name": "Asia/Shanghai",
                    "total_launch_count": 54,
                    "total_landing_count": 0
                }
            },
            "webcast_live": false,
            "program": [],
            "orbital_launch_attempt_count": 7174,
            "location_launch_attempt_count": 55,
            "pad_launch_attempt_count": 28,
            "agency_launch_attempt_count": 570,
            "orbital_launch_attempt_count_year": 325,
            "location_launch_attempt_count_year": 21,
            "pad_launch_attempt_count_year": 8,
            "agency_launch_attempt_count_year": 69
        },
        {
            "id": "ae315ab0-ecda-4c54-99c6-0a8818f55b0d",
            "url": "https://lldev.thespacedevs.com/2.3.0/launches/ae315ab0-ecda-4c54-99c6-0a8818f55b0d/",
            "name": "Falcon 9 Block 5 | Starlink Group 6-88",
            "response_mode": "normal",
            "slug": "falcon-9-block-5-starlink-group-6-88",
            "launch_designator": null,
            "status": {
                "id": 1,
                "name": "Go for Launch",
                "abbrev": "Go",
                "description": "Current T-0 confirmed by official or reliable sources."
            },
            "last_updated": "2025-12-24T05:37:42Z",
            "net": "2026-01-03T05:00:00Z",
            "net_precision": {
                "id": 1,
                "name": "Minute",
                "abbrev": "MIN",
                "description": "The T-0 is accurate to the minute."
            },
            "window_end": "2026-01-03T08:17:00Z",
            "window_start": "2026-01-03T05:00:00Z",
            "image": {
                "id": 1296,
                "name": "Starlink night fairing",
                "image_url": "https://thespacedevs-dev.nyc3.digitaloceanspaces.com/media/images/falcon2520925_image_20221009234147.png",
                "thumbnail_url": "https://thespacedevs-dev.nyc3.digitaloceanspaces.com/media/images/255bauto255d__image_thumbnail_20240305192320.png",
                "credit": "SpaceX",
                "license": {
                    "id": 5,
                    "name": "CC BY-NC 2.0",
                    "priority": 1,
                    "link": "https://creativecommons.org/licenses/by-nc/2.0/"
                },
                "single_use": false,
                "variants": []
            },
            "infographic": null,
            "probability": null,
            "weather_concerns": null,
            "failreason": "",
            "hashtag": null,
            "launch_service_provider": {
                "response_mode": "list",
                "id": 121,
                "url": "https://lldev.thespacedevs.com/2.3.0/agencies/121/",
                "name": "SpaceX",
                "abbrev": "SpX",
                "type": {
                    "id": 3,
                    "name": "Commercial"
                }
            },
            "rocket": {
                "id": 8850,
                "configuration": {
                    "response_mode": "list",
                    "id": 164,
                    "url": "https://lldev.thespacedevs.com/2.3.0/launcher_configurations/164/",
                    "name": "Falcon 9",
                    "families": [
                        {
                            "response_mode": "list",
                            "id": 1,
                            "name": "Falcon"
                        },
                        {
                            "response_mode": "list",
                            "id": 176,
                            "name": "Falcon 9"
                        }
                    ],
                    "full_name": "Falcon 9 Block 5",
                    "variant": "Block 5"
                }
            },
            "mission": {
                "id": 7441,
                "name": "Starlink Group 6-88",
                "type": "Communications",
                "description": "A batch of 29 satellites for the Starlink mega-constellation - SpaceX's project for space-based Internet communication system.",
                "image": null,
                "orbit": {
                    "id": 8,
                    "name": "Low Earth Orbit",
                    "abbrev": "LEO",
                    "celestial_body": {
                        "response_mode": "list",
                        "id": 1,
                        "name": "Earth"
                    }
                },
                "agencies": [
                    {
                        "response_mode": "normal",
                        "id": 121,
                        "url": "https://lldev.thespacedevs.com/2.3.0/agencies/121/",
                        "name": "SpaceX",
                        "abbrev": "SpX",
                        "type": {
                            "id": 3,
                            "name": "Commercial"
                        },
                        "featured": true,
                        "country": [
                            {
                                "id": 2,
                                "name": "United States of America",
                                "alpha_2_code": "US",
                                "alpha_3_code": "USA",
                                "nationality_name": "American",
                                "nationality_name_composed": "Americano"
                            }
                        ],
                        "description": "Space Exploration Technologies Corp., known as SpaceX, is an American aerospace manufacturer and space transport services company headquartered in Hawthorne, California. It was founded in 2002 by entrepreneur Elon Musk with the goal of reducing space transportation costs and enabling the colonization of Mars. SpaceX operates from many pads, on the East Coast of the US they operate from SLC-40 at Cape Canaveral Space Force Station and historic LC-39A at Kennedy Space Center. They also operate from SLC-4E at Vandenberg Space Force Base, California, usually for polar launches. Another launch site is being developed at Boca Chica, Texas.",
                        "administrator": "CEO: Elon Musk",
                        "founding_year": 2002,
                        "launchers": "Falcon | Starship",
                        "spacecraft": "Dragon",
                        "parent": null,
                        "image": {
                            "id": 29,
                            "name": "[AUTO] SpaceX - image",
                            "image_url": "https://thespacedevs-dev.nyc3.digitaloceanspaces.com/media/images/spacex_image_20190207032501.jpeg",
                            "thumbnail_url": "https://thespacedevs-dev.nyc3.digitaloceanspaces.com/media/images/255bauto255d__image_thumbnail_20240305184704.jpeg",
                            "credit": null,
                            "license": {
                                "id": 1,
                                "name": "Unknown",
                                "priority": 9,
                                "link": null
                            },
                            "single_use": true,
                            "variants": []
                        },
                        "logo": {
                            "id": 186,
                            "name": "[AUTO] SpaceX - logo",
                            "image_url": "https://thespacedevs-dev.nyc3.digitaloceanspaces.com/media/images/spacex_logo_20220826094919.png",
                            "thumbnail_url": "https://thespacedevs-dev.nyc3.digitaloceanspaces.com/media/images/255bauto255d__image_thumbnail_20240305185138.png",
                            "credit": null,
                            "license": {
                                "id": 1,
                                "name": "Unknown",
                                "priority": 9,
                                "link": null
                            },
                            "single_use": true,
                            "variants": []
                        },
                        "social_logo": {
                            "id": 94,
                            "name": "[AUTO] SpaceX - social_logo",
                            "image_url": "https://thespacedevs-dev.nyc3.digitaloceanspaces.com/media/images/spacex_nation_20230531064544.jpg",
                            "thumbnail_url": "https://thespacedevs-dev.nyc3.digitaloceanspaces.com/media/images/255bauto255d__image_thumbnail_20240305184848.jpeg",
                            "credit": null,
                            "license": {
                                "id": 1,
                                "name": "Unknown",
                                "priority": 9,
                                "link": null
                            },
                            "single_use": true,
                            "variants": []
                        },
                        "total_launch_count": 619,
                        "consecutive_successful_launches": 104,
                        "successful_launches": 604,
                        "failed_launches": 15,
                        "pending_launches": 116,
                        "consecutive_successful_landings": 103,
                        "successful_landings": 564,
                        "failed_landings": 27,
                        "attempted_landings": 590,
                        "successful_landings_spacecraft": 58,
                        "failed_landings_spacecraft": 3,
                        "attempted_landings_spacecraft": 61,
                        "successful_landings_payload": 0,
                        "failed_landings_payload": 0,
                        "attempted_landings_payload": 0,
                        "info_url": "https://www.spacex.com/",
                        "wiki_url": "https://en.wikipedia.org/wiki/SpaceX",
                        "social_media_links": []
                    }
                ],
                "info_urls": [],
                "vid_urls": []
            },
            "pad": {
                "id": 80,
                "url": "https://lldev.thespacedevs.com/2.3.0/pads/80/",
                "active": true,
                "agencies": [
                    {
                        "response_mode": "normal",
                        "id": 121,
                        "url": "https://lldev.thespacedevs.com/2.3.0/agencies/121/",
                        "name": "SpaceX",
                        "abbrev": "SpX",
                        "type": {
                            "id": 3,
                            "name": "Commercial"
                        },
                        "featured": true,
                        "country": [
                            {
                                "id": 2,
                                "name": "United States of America",
                                "alpha_2_code": "US",
                                "alpha_3_code": "USA",
                                "nationality_name": "American",
                                "nationality_name_composed": "Americano"
                            }
                        ],
                        "description": "Space Exploration Technologies Corp., known as SpaceX, is an American aerospace manufacturer and space transport services company headquartered in Hawthorne, California. It was founded in 2002 by entrepreneur Elon Musk with the goal of reducing space transportation costs and enabling the colonization of Mars. SpaceX operates from many pads, on the East Coast of the US they operate from SLC-40 at Cape Canaveral Space Force Station and historic LC-39A at Kennedy Space Center. They also operate from SLC-4E at Vandenberg Space Force Base, California, usually for polar launches. Another launch site is being developed at Boca Chica, Texas.",
                        "administrator": "CEO: Elon Musk",
                        "founding_year": 2002,
                        "launchers": "Falcon | Starship",
                        "spacecraft": "Dragon",
                        "parent": null,
                        "image": {
                            "id": 29,
                            "name": "[AUTO] SpaceX - image",
                            "image_url": "https://thespacedevs-dev.nyc3.digitaloceanspaces.com/media/images/spacex_image_20190207032501.jpeg",
                            "thumbnail_url": "https://thespacedevs-dev.nyc3.digitaloceanspaces.com/media/images/255bauto255d__image_thumbnail_20240305184704.jpeg",
                            "credit": null,
                            "license": {
                                "id": 1,
                                "name": "Unknown",
                                "priority": 9,
                                "link": null
                            },
                            "single_use": true,
                            "variants": []
                        },
                        "logo": {
                            "id": 186,
                            "name": "[AUTO] SpaceX - logo",
                            "image_url": "https://thespacedevs-dev.nyc3.digitaloceanspaces.com/media/images/spacex_logo_20220826094919.png",
                            "thumbnail_url": "https://thespacedevs-dev.nyc3.digitaloceanspaces.com/media/images/255bauto255d__image_thumbnail_20240305185138.png",
                            "credit": null,
                            "license": {
                                "id": 1,
                                "name": "Unknown",
                                "priority": 9,
                                "link": null
                            },
                            "single_use": true,
                            "variants": []
                        },
                        "social_logo": {
                            "id": 94,
                            "name": "[AUTO] SpaceX - social_logo",
                            "image_url": "https://thespacedevs-dev.nyc3.digitaloceanspaces.com/media/images/spacex_nation_20230531064544.jpg",
                            "thumbnail_url": "https://thespacedevs-dev.nyc3.digitaloceanspaces.com/media/images/255bauto255d__image_thumbnail_20240305184848.jpeg",
                            "credit": null,
                            "license": {
                                "id": 1,
                                "name": "Unknown",
                                "priority": 9,
                                "link": null
                            },
                            "single_use": true,
                            "variants": []
                        }
                    }
                ],
                "name": "Space Launch Complex 40",
                "image": {
                    "id": 2113,
                    "name": "F9 liftoff from SLC-40 (SES-24)",
                    "image_url": "https://thespacedevs-dev.nyc3.digitaloceanspaces.com/media/images/f9_liftoff_from_image_20240621050513.jpeg",
                    "thumbnail_url": "https://thespacedevs-dev.nyc3.digitaloceanspaces.com/media/images/f9_liftoff_from_image_thumbnail_20240621050514.jpeg",
                    "credit": "SpaceX",
                    "license": {
                        "id": 5,
                        "name": "CC BY-NC 2.0",
                        "priority": 1,
                        "link": "https://creativecommons.org/licenses/by-nc/2.0/"
                    },
                    "single_use": false,
                    "variants": []
                },
                "description": "",
                "info_url": null,
                "wiki_url": "https://en.wikipedia.org/wiki/Cape_Canaveral_Air_Force_Station_Space_Launch_Complex_40",
                "map_url": "https://www.google.com/maps?q=28.56194122,-80.57735736",
                "latitude": 28.56194122,
                "longitude": -80.57735736,
                "country": {
                    "id": 2,
                    "name": "United States of America",
                    "alpha_2_code": "US",
                    "alpha_3_code": "USA",
                    "nationality_name": "American",
                    "nationality_name_composed": "Americano"
                },
                "map_image": "https://thespacedevs-dev.nyc3.digitaloceanspaces.com/media/map_images/pad_80_20200803143323.jpg",
                "total_launch_count": 354,
                "orbital_launch_attempt_count": 354,
                "fastest_turnaround": "P2DT2H44M55S",
                "location": {
                    "response_mode": "normal",
                    "id": 12,
                    "url": "https://lldev.thespacedevs.com/2.3.0/locations/12/",
                    "name": "Cape Canaveral SFS, FL, USA",
                    "celestial_body": {
                        "response_mode": "normal",
                        "id": 1,
                        "name": "Earth",
                        "type": {
                            "id": 1,
                            "name": "Planet"
                        },
                        "diameter": 12742000.0,
                        "mass": 5.972168e+24,
                        "gravity": 9.80655,
                        "length_of_day": "1 00:00:00",
                        "atmosphere": true,
                        "image": {
                            "id": 2040,
                            "name": "Earth (Apollo 17)",
                            "image_url": "https://thespacedevs-dev.nyc3.digitaloceanspaces.com/media/images/earth_2528apol_image_20240402194304.jpeg",
                            "thumbnail_url": "https://thespacedevs-dev.nyc3.digitaloceanspaces.com/media/images/earth_2528apol_image_thumbnail_20240402194305.jpeg",
                            "credit": "NASA",
                            "license": {
                                "id": 4,
                                "name": "NASA Image and Media Guidelines",
                                "priority": 0,
                                "link": "https://www.nasa.gov/nasa-brand-center/images-and-media/"
                            },
                            "single_use": true,
                            "variants": []
                        },
                        "description": "Earth is the third planet from the Sun and the only astronomical object known to harbor life.",
                        "wiki_url": "https://en.wikipedia.org/wiki/Earth",
                        "total_attempted_launches": 7388,
                        "successful_launches": 6838,
                        "failed_launches": 550,
                        "total_attempted_landings": 1243,
                        "successful_landings": 1196,
                        "failed_landings": 47
                    },
                    "active": true,
                    "country": {
                        "id": 2,
                        "name": "United States of America",
                        "alpha_2_code": "US",
                        "alpha_3_code": "USA",
                        "nationality_name": "American",
                        "nationality_name_composed": "Americano"
                    },
                    "description": "Cape Canaveral Space Force Station (CCSFS) is an installation of the United States Space Force's Space Launch Delta 45, located on Cape Canaveral in Brevard County, Florida.",
                    "image": {
                        "id": 2200,
                        "name": "Cape Canaveral & KSC seen from orbit (STS-43)",
                        "image_url": "https://thespacedevs-dev.nyc3.digitaloceanspaces.com/media/images/cape_canaveral__image_20240918151615.jpg",
                        "thumbnail_url": "https://thespacedevs-dev.nyc3.digitaloceanspaces.com/media/images/cape_canaveral__image_thumbnail_20240918151616.jpeg",
                        "credit": "NASA",
                        "license": {
                            "id": 4,
                            "name": "NASA Image and Media Guidelines",
                            "priority": 0,
                            "link": "https://www.nasa.gov/nasa-brand-center/images-and-media/"
                        },
                        "single_use": true,
                        "variants": []
                    },
                    "map_image": "https://thespacedevs-dev.nyc3.digitaloceanspaces.com/media/map_images/location_12_20200803142519.jpg",
                    "longitude": -80.577778,
                    "latitude": 28.488889,
                    "timezone_name": "America/New_York",
                    "total_launch_count": 1076,
                    "total_landing_count": 70
                }
            },
            "webcast_live": false,
            "program": [
                {
                    "response_mode": "normal",
                    "id": 25,
                    "url": "https://lldev.thespacedevs.com/2.3.0/programs/25/",
                    "name": "Starlink",
                    "image": {
                        "id": 1890,
                        "name": "Starlink stack in space before deployment",
                        "image_url": "https://thespacedevs-dev.nyc3.digitaloceanspaces.com/media/images/starlink_program_20231228154508.jpeg",
                        "thumbnail_url": "https://thespacedevs-dev.nyc3.digitaloceanspaces.com/media/images/255bauto255d__image_thumbnail_20240305194044.jpeg",
                        "credit": "SpaceX",
                        "license": {
                            "id": 5,
                            "name": "CC BY-NC 2.0",
                            "priority": 1,
                            "link": "https://creativecommons.org/licenses/by-nc/2.0/"
                        },
                        "single_use": true,
                        "variants": []
                    },
                    "info_url": "https://starlink.com",
                    "wiki_url": "https://en.wikipedia.org/wiki/Starlink",
                    "description": "Starlink is a satellite internet constellation operated by American aerospace company SpaceX",
                    "agencies": [
                        {
                            "response_mode": "list",
                            "id": 121,
                            "url": "https://lldev.thespacedevs.com/2.3.0/agencies/121/",
                            "name": "SpaceX",
                            "abbrev": "SpX",
                            "type": {
                                "id": 3,
                                "name": "Commercial"
                            }
                        }
                    ],
                    "start_date": "2018-02-22T14:17:00Z",
                    "end_date": null,
                    "mission_patches": [
                        {
                            "id": 7,
                            "name": "Space X Starlink Mission Patch",
                            "priority": 10,
                            "image_url": "https://thespacedevs-dev.nyc3.digitaloceanspaces.com/media/mission_patch_images/space2520x252_mission_patch_20221011205756.png",
                            "agency": {
                                "response_mode": "list",
                                "id": 121,
                                "url": "https://lldev.thespacedevs.com/2.3.0/agencies/121/",
                                "name": "SpaceX",
                                "abbrev": "SpX",
                                "type": {
                                    "id": 3,
                                    "name": "Commercial"
                                }
                            },
                            "response_mode": "normal"
                        }
                    ],
                    "type": {
                        "id": 3,
                        "name": "Communication Constellation"
                    }
                }
            ],
            "orbital_launch_attempt_count": 7177,
            "location_launch_attempt_count": 1077,
            "pad_launch_attempt_count": 355,
            "agency_launch_attempt_count": 621,
            "orbital_launch_attempt_count_year": 1,
            "location_launch_attempt_count_year": 1,
            "pad_launch_attempt_count_year": 1,
            "agency_launch_attempt_count_year": 1
        },
        {
            "id": "02700e48-65c6-4a95-8b97-c47152302283",
            "url": "https://lldev.thespacedevs.com/2.3.0/launches/02700e48-65c6-4a95-8b97-c47152302283/",
            "name": "Falcon 9 Block 5 | Pandora / Twilight rideshare mission",
            "response_mode": "normal",
            "slug": "falcon-9-block-5-pandora-twilight-rideshare-missio",
            "launch_designator": null,
            "status": {
                "id": 2,
                "name": "To Be Determined",
                "abbrev": "TBD",
                "description": "Current date is a placeholder or rough estimation based on unreliable or interpreted sources."
            },
            "last_updated": "2025-12-09T02:49:18Z",
            "net": "2026-01-05T00:00:00Z",
            "net_precision": {
                "id": 5,
                "name": "Day",
                "abbrev": "DAY",
                "description": "The T-0 is expected on the given day."
            },
            "window_end": "2026-01-05T00:00:00Z",
            "window_start": "2026-01-05T00:00:00Z",
            "image": {
                "id": 1736,
                "name": "[AUTO] Falcon 9 - image",
                "image_url": "https://thespacedevs-dev.nyc3.digitaloceanspaces.com/media/images/falcon_9_image_20230807133459.jpeg",
                "thumbnail_url": "https://thespacedevs-dev.nyc3.digitaloceanspaces.com/media/images/255bauto255d__image_thumbnail_20240305193628.jpeg",
                "credit": null,
                "license": {
                    "id": 1,
                    "name": "Unknown",
                    "priority": 9,
                    "link": null
                },
                "single_use": true,
                "variants": []
            },
            "infographic": null,
            "probability": null,
            "weather_concerns": null,
            "failreason": "",
            "hashtag": null,
            "launch_service_provider": {
                "response_mode": "list",
                "id": 121,
                "url": "https://lldev.thespacedevs.com/2.3.0/agencies/121/",
                "name": "SpaceX",
                "abbrev": "SpX",
                "type": {
                    "id": 3,
                    "name": "Commercial"
                }
            },
            "rocket": {
                "id": 8846,
                "configuration": {
                    "response_mode": "list",
                    "id": 164,
                    "url": "https://lldev.thespacedevs.com/2.3.0/launcher_configurations/164/",
                    "name": "Falcon 9",
                    "families": [
                        {
                            "response_mode": "list",
                            "id": 1,
                            "name": "Falcon"
                        },
                        {
                            "response_mode": "list",
                            "id": 176,
                            "name": "Falcon 9"
                        }
                    ],
                    "full_name": "Falcon 9 Block 5",
                    "variant": "Block 5"
                }
            },
            "mission": {
                "id": 7437,
                "name": "Pandora / Twilight rideshare mission",
                "type": "Astrophysics",
                "description": "The Pandora small satellite was selected in 2021 as an inaugural mission in NASA’s Astrophysics Pioneers Program. It includes a 0.45-meter telescope that will improve our understanding of exoplanet atmospheres by disentangling exoplanet signals from their host stars, as well as studying host star variability with long-duration observations of 20 unique planets through visible-light photometry and near-infrared spectroscopy.\r\n\r\nAlso launching on this launch are ride-share payloads under the \"Falcon 9 Twilight mission\", including satellites from Spire Global and Kepler Communications.",
                "image": null,
                "orbit": {
                    "id": 17,
                    "name": "Sun-Synchronous Orbit",
                    "abbrev": "SSO",
                    "celestial_body": {
                        "response_mode": "list",
                        "id": 1,
                        "name": "Earth"
                    }
                },
                "agencies": [],
                "info_urls": [],
                "vid_urls": []
            },
            "pad": {
                "id": 16,
                "url": "https://lldev.thespacedevs.com/2.3.0/pads/16/",
                "active": true,
                "agencies": [],
                "name": "Space Launch Complex 4E",
                "image": {
                    "id": 1342,
                    "name": "Falcon 9 Block 5 | SARah 2 & 3 from SLC-4E",
                    "image_url": "https://thespacedevs-dev.nyc3.digitaloceanspaces.com/media/images/falcon2520925_image_20231223073520.jpeg",
                    "thumbnail_url": "https://thespacedevs-dev.nyc3.digitaloceanspaces.com/media/images/255bauto255d__image_thumbnail_20240305192449.jpeg",
                    "credit": "SpaceX",
                    "license": {
                        "id": 5,
                        "name": "CC BY-NC 2.0",
                        "priority": 1,
                        "link": "https://creativecommons.org/licenses/by-nc/2.0/"
                    },
                    "single_use": false,
                    "variants": []
                },
                "description": "Space Launch Complex 4 East (SLC-4E) is a launch site at Vandenberg Space Force Base, California, U.S.\r\n\r\nThe pad was previously used by Atlas and Titan rockets between 1963 and 2005. The pad was built for use by Atlas-Agena rockets, but was later rebuilt to handle Titan rockets.",
                "info_url": null,
                "wiki_url": "https://en.wikipedia.org/wiki/Vandenberg_Space_Launch_Complex_4#SLC-4E",
                "map_url": "https://www.google.com/maps?q=34.632,-120.611",
                "latitude": 34.632,
                "longitude": -120.611,
                "country": {
                    "id": 2,
                    "name": "United States of America",
                    "alpha_2_code": "US",
                    "alpha_3_code": "USA",
                    "nationality_name": "American",
                    "nationality_name_composed": "Americano"
                },
                "map_image": "https://thespacedevs-dev.nyc3.digitaloceanspaces.com/media/map_images/pad_16_20200803143532.jpg",
                "total_launch_count": 238,
                "orbital_launch_attempt_count": 238,
                "fastest_turnaround": "P2DT10H22M59S",
                "location": {
                    "response_mode": "normal",
                    "id": 11,
                    "url": "https://lldev.thespacedevs.com/2.3.0/locations/11/",
                    "name": "Vandenberg SFB, CA, USA",
                    "celestial_body": {
                        "response_mode": "normal",
                        "id": 1,
                        "name": "Earth",
                        "type": {
                            "id": 1,
                            "name": "Planet"
                        },
                        "diameter": 12742000.0,
                        "mass": 5.972168e+24,
                        "gravity": 9.80655,
                        "length_of_day": "1 00:00:00",
                        "atmosphere": true,
                        "image": {
                            "id": 2040,
                            "name": "Earth (Apollo 17)",
                            "image_url": "https://thespacedevs-dev.nyc3.digitaloceanspaces.com/media/images/earth_2528apol_image_20240402194304.jpeg",
                            "thumbnail_url": "https://thespacedevs-dev.nyc3.digitaloceanspaces.com/media/images/earth_2528apol_image_thumbnail_20240402194305.jpeg",
                            "credit": "NASA",
                            "license": {
                                "id": 4,
                                "name": "NASA Image and Media Guidelines",
                                "priority": 0,
                                "link": "https://www.nasa.gov/nasa-brand-center/images-and-media/"
                            },
                            "single_use": true,
                            "variants": []
                        },
                        "description": "Earth is the third planet from the Sun and the only astronomical object known to harbor life.",
                        "wiki_url": "https://en.wikipedia.org/wiki/Earth",
                        "total_attempted_launches": 7388,
                        "successful_launches": 6838,
                        "failed_launches": 550,
                        "total_attempted_landings": 1243,
                        "successful_landings": 1196,
                        "failed_landings": 47
                    },
                    "active": true,
                    "country": {
                        "id": 2,
                        "name": "United States of America",
                        "alpha_2_code": "US",
                        "alpha_3_code": "USA",
                        "nationality_name": "American",
                        "nationality_name_composed": "Americano"
                    },
                    "description": "Vandenberg Space Force Base is a United States Space Force Base in Santa Barbara County, California. Established in 1941, Vandenberg Space Force Base is a space launch base, launching spacecraft from the Western Range, and also performs missile testing. The United States Space Force's Space Launch Delta 30 serves as the host delta for the base, equivalent to an Air Force air base wing. In addition to its military space launch mission, Vandenberg Space Force Base also hosts space launches for civil and commercial space entities, such as NASA and SpaceX.",
                    "image": {
                        "id": 2226,
                        "name": "Vandenberg SFB imaged by Sentinel-2",
                        "image_url": "https://thespacedevs-dev.nyc3.digitaloceanspaces.com/media/images/vandenberg_sfb__image_20240920082910.jpeg",
                        "thumbnail_url": "https://thespacedevs-dev.nyc3.digitaloceanspaces.com/media/images/vandenberg_sfb__image_thumbnail_20240920082910.jpeg",
                        "credit": "Contains modified Copernicus Sentinel data 2020",
                        "license": {
                            "id": 33,
                            "name": "Copernicus Image Use Policy",
                            "priority": 0,
                            "link": "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32013R1159"
                        },
                        "single_use": true,
                        "variants": []
                    },
                    "map_image": "https://thespacedevs-dev.nyc3.digitaloceanspaces.com/media/map_images/location_11_20200803142416.jpg",
                    "longitude": -120.52023,
                    "latitude": 34.75133,
                    "timezone_name": "America/Los_Angeles",
                    "total_launch_count": 852,
                    "total_landing_count": 30
                }
            },
            "webcast_live": false,
            "program": [],
            "orbital_launch_attempt_count": 7178,
            "location_launch_attempt_count": 854,
            "pad_launch_attempt_count": 240,
            "agency_launch_attempt_count": 622,
            "orbital_launch_attempt_count_year": 2,
            "location_launch_attempt_count_year": 1,
            "pad_launch_attempt_count_year": 1,
            "agency_launch_attempt_count_year": 2
        },
        {
            "id": "520a0927-088f-4273-a7ea-eedb09965d89",
            "url": "https://lldev.thespacedevs.com/2.3.0/launches/520a0927-088f-4273-a7ea-eedb09965d89/",
            "name": "PSLV-DL | EOS-N1 and others",
            "response_mode": "normal",
            "slug": "pslv-dl-eos-n1-and-others",
            "launch_designator": null,
            "status": {
                "id": 8,
                "name": "To Be Confirmed",
                "abbrev": "TBC",
                "description": "Awaiting official confirmation - current date is known with some certainty."
            },
            "last_updated": "2025-12-26T10:26:29Z",
            "net": "2026-01-10T04:15:00Z",
            "net_precision": {
                "id": 2,
                "name": "Hour",
                "abbrev": "HR",
                "description": "The T-0 is accurate to the hour."
            },
            "window_end": "2026-01-10T08:15:00Z",
            "window_start": "2026-01-10T04:15:00Z",
            "image": {
                "id": 1809,
                "name": "[AUTO] PSLV-DL - image",
                "image_url": "https://thespacedevs-dev.nyc3.digitaloceanspaces.com/media/images/pslv-dl_image_20191201202351.jpeg",
                "thumbnail_url": "https://thespacedevs-dev.nyc3.digitaloceanspaces.com/media/images/255bauto255d__image_thumbnail_20240305193827.jpeg",
                "credit": null,
                "license": {
                    "id": 1,
                    "name": "Unknown",
                    "priority": 9,
                    "link": null
                },
                "single_use": true,
                "variants": []
            },
            "infographic": null,
            "probability": null,
            "weather_concerns": null,
            "failreason": "",
            "hashtag": null,
            "launch_service_provider": {
                "response_mode": "list",
                "id": 31,
                "url": "https://lldev.thespacedevs.com/2.3.0/agencies/31/",
                "name": "Indian Space Research Organization",
                "abbrev": "ISRO",
                "type": {
                    "id": 1,
                    "name": "Government"
                }
            },
            "rocket": {
                "id": 8802,
                "configuration": {
                    "response_mode": "list",
                    "id": 178,
                    "url": "https://lldev.thespacedevs.com/2.3.0/launcher_configurations/178/",
                    "name": "PSLV-DL",
                    "families": [
                        {
                            "response_mode": "list",
                            "id": 131,
                            "name": "PSLV"
                        }
                    ],
                    "full_name": "PSLV-DL",
                    "variant": "DL"
                }
            },
            "mission": {
                "id": 7393,
                "name": "EOS-N1 and others",
                "type": "Earth Science",
                "description": "Small Earth observation satellite from NewSpace India Limited (NSIL) for an \"Indian strategic user\", details TBD.\r\n\r\nThis launch will also carry 18 other ride-share payloads.",
                "image": null,
                "orbit": {
                    "id": 17,
                    "name": "Sun-Synchronous Orbit",
                    "abbrev": "SSO",
                    "celestial_body": {
                        "response_mode": "list",
                        "id": 1,
                        "name": "Earth"
                    }
                },
                "agencies": [],
                "info_urls": [],
                "vid_urls": []
            },
            "pad": {
                "id": 50,
                "url": "https://lldev.thespacedevs.com/2.3.0/pads/50/",
                "active": true,
                "agencies": [
                    {
                        "response_mode": "normal",
                        "id": 31,
                        "url": "https://lldev.thespacedevs.com/2.3.0/agencies/31/",
                        "name": "Indian Space Research Organization",
                        "abbrev": "ISRO",
                        "type": {
                            "id": 1,
                            "name": "Government"
                        },
                        "featured": true,
                        "country": [
                            {
                                "id": 9,
                                "name": "India",
                                "alpha_2_code": "IN",
                                "alpha_3_code": "IND",
                                "nationality_name": "Indian",
                                "nationality_name_composed": "Indo"
                            }
                        ],
                        "description": "The Indian Space Research Organisation (ISRO) is the space agency of the Government of India headquartered in the city of Bangalore. Its vision is to \"harness space technology for national development while pursuing space science research and planetary exploration.\"",
                        "administrator": "Chairman: V. Narayanan",
                        "founding_year": 1969,
                        "launchers": "PSLV | GSLV",
                        "spacecraft": "Gaganyaan",
                        "parent": null,
                        "image": {
                            "id": 14,
                            "name": "[AUTO] Indian Space Research Organization - image",
                            "image_url": "https://thespacedevs-dev.nyc3.digitaloceanspaces.com/media/images/indian2520space2520research2520organization_image_20190215225409.jpeg",
                            "thumbnail_url": "https://thespacedevs-dev.nyc3.digitaloceanspaces.com/media/images/255bauto255d__image_thumbnail_20240305184615.jpeg",
                            "credit": null,
                            "license": {
                                "id": 1,
                                "name": "Unknown",
                                "priority": 9,
                                "link": null
                            },
                            "single_use": true,
                            "variants": []
                        },
                        "logo": {
                            "id": 141,
                            "name": "[AUTO] Indian Space Research Organization - logo",
                            "image_url": "https://thespacedevs-dev.nyc3.digitaloceanspaces.com/media/images/indian2520space2520research2520organization_logo_20190215225409.png",
                            "thumbnail_url": "https://thespacedevs-dev.nyc3.digitaloceanspaces.com/media/images/255bauto255d__image_thumbnail_20240305185007.png",
                            "credit": null,
                            "license": {
                                "id": 1,
                                "name": "Unknown",
                                "priority": 9,
                                "link": null
                            },
                            "single_use": true,
                            "variants": []
                        },
                        "social_logo": {
                            "id": 63,
                            "name": "[AUTO] Indian Space Research Organization - social_logo",
                            "image_url": "https://thespacedevs-dev.nyc3.digitaloceanspaces.com/media/images/indian2520space2520research2520organization_nation_20230624125733.jpg",
                            "thumbnail_url": "https://thespacedevs-dev.nyc3.digitaloceanspaces.com/media/images/255bauto255d__image_thumbnail_20240305184805.jpeg",
                            "credit": null,
                            "license": {
                                "id": 1,
                                "name": "Unknown",
                                "priority": 9,
                                "link": null
                            },
                            "single_use": true,
                            "variants": []
                        }
                    }
                ],
                "name": "Satish Dhawan Space Centre First Launch Pad",
                "image": {
                    "id": 1993,
                    "name": "First Launch Pad",
                    "image_url": "https://thespacedevs-dev.nyc3.digitaloceanspaces.com/media/images/first_launch_pa_image_20240311093432.jpeg",
                    "thumbnail_url": "https://thespacedevs-dev.nyc3.digitaloceanspaces.com/media/images/first_launch_pa_image_thumbnail_20240311093432.jpeg",
                    "credit": "Indian Space Research Organisation",
                    "license": {
                        "id": 11,
                        "name": "Government Open Data License - India (GODL)",
                        "priority": 3,
                        "link": "https://data.gov.in/sites/default/files/Gazette_Notification_OGDL.pdf"
                    },
                    "single_use": true,
                    "variants": []
                },
                "description": "India has two launch pads at the site. The First Launch Pad, operational since 1993, is used for Polar Satellite Launch Vehicle, Small Satellite Launch Vehicle and formerly used by Geosynchronous Satellite Launch Vehicle.",
                "info_url": null,
                "wiki_url": "https://en.wikipedia.org/wiki/Satish_Dhawan_Space_Centre_First_Launch_Pad",
                "map_url": "https://www.google.com/maps?q=13.733,80.235",
                "latitude": 13.733,
                "longitude": 80.235,
                "country": {
                    "id": 9,
                    "name": "India",
                    "alpha_2_code": "IN",
                    "alpha_3_code": "IND",
                    "nationality_name": "Indian",
                    "nationality_name_composed": "Indo"
                },
                "map_image": "https://thespacedevs-dev.nyc3.digitaloceanspaces.com/media/map_images/pad_50_20200803143457.jpg",
                "total_launch_count": 62,
                "orbital_launch_attempt_count": 61,
                "fastest_turnaround": "P25DT5H56M15S",
                "location": {
                    "response_mode": "normal",
                    "id": 14,
                    "url": "https://lldev.thespacedevs.com/2.3.0/locations/14/",
                    "name": "Satish Dhawan Space Centre, India",
                    "celestial_body": {
                        "response_mode": "normal",
                        "id": 1,
                        "name": "Earth",
                        "type": {
                            "id": 1,
                            "name": "Planet"
                        },
                        "diameter": 12742000.0,
                        "mass": 5.972168e+24,
                        "gravity": 9.80655,
                        "length_of_day": "1 00:00:00",
                        "atmosphere": true,
                        "image": {
                            "id": 2040,
                            "name": "Earth (Apollo 17)",
                            "image_url": "https://thespacedevs-dev.nyc3.digitaloceanspaces.com/media/images/earth_2528apol_image_20240402194304.jpeg",
                            "thumbnail_url": "https://thespacedevs-dev.nyc3.digitaloceanspaces.com/media/images/earth_2528apol_image_thumbnail_20240402194305.jpeg",
                            "credit": "NASA",
                            "license": {
                                "id": 4,
                                "name": "NASA Image and Media Guidelines",
                                "priority": 0,
                                "link": "https://www.nasa.gov/nasa-brand-center/images-and-media/"
                            },
                            "single_use": true,
                            "variants": []
                        },
                        "description": "Earth is the third planet from the Sun and the only astronomical object known to harbor life.",
                        "wiki_url": "https://en.wikipedia.org/wiki/Earth",
                        "total_attempted_launches": 7388,
                        "successful_launches": 6838,
                        "failed_launches": 550,
                        "total_attempted_landings": 1243,
                        "successful_landings": 1196,
                        "failed_landings": 47
                    },
                    "active": true,
                    "country": {
                        "id": 9,
                        "name": "India",
                        "alpha_2_code": "IN",
                        "alpha_3_code": "IND",
                        "nationality_name": "Indian",
                        "nationality_name_composed": "Indo"
                    },
                    "description": "Satish Dhawan Space Centre – SDSC (formerly Sriharikota Range – SHAR),[1] is the primary spaceport of the Indian Space Research Organisation (ISRO), located in Sriharikota, Andhra Pradesh.",
                    "image": {
                        "id": 2212,
                        "name": "Satish Dhawan Space Centre",
                        "image_url": "https://thespacedevs-dev.nyc3.digitaloceanspaces.com/media/images/satish_dhawan_s_image_20240919164153.png",
                        "thumbnail_url": "https://thespacedevs-dev.nyc3.digitaloceanspaces.com/media/images/satish_dhawan_s_image_thumbnail_20240919164154.png",
                        "credit": "ISRO",
                        "license": {
                            "id": 11,
                            "name": "Government Open Data License - India (GODL)",
                            "priority": 3,
                            "link": "https://data.gov.in/sites/default/files/Gazette_Notification_OGDL.pdf"
                        },
                        "single_use": true,
                        "variants": []
                    },
                    "map_image": "https://thespacedevs-dev.nyc3.digitaloceanspaces.com/media/map_images/location_14_20200803142403.jpg",
                    "longitude": 80.23,
                    "latitude": 13.72,
                    "timezone_name": "Asia/Kolkata",
                    "total_launch_count": 102,
                    "total_landing_count": 0
                }
            },
            "webcast_live": false,
            "program": [],
            "orbital_launch_attempt_count": 7179,
            "location_launch_attempt_count": 103,
            "pad_launch_attempt_count": 63,
            "agency_launch_attempt_count": 99,
            "orbital_launch_attempt_count_year": 3,
            "location_launch_attempt_count_year": 1,
            "pad_launch_attempt_count_year": 1,
            "agency_launch_attempt_count_year": 1
        },
        {
            "id": "1b23eb18-e06e-4058-9b42-e95ca0980511",
            "url": "https://lldev.thespacedevs.com/2.3.0/launches/1b23eb18-e06e-4058-9b42-e95ca0980511/",
            "name": "Spectrum | Flight Two",
            "response_mode": "normal",
            "slug": "spectrum-flight-two",
            "launch_designator": null,
            "status": {
                "id": 2,
                "name": "To Be Determined",
                "abbrev": "TBD",
                "description": "Current date is a placeholder or rough estimation based on unreliable or interpreted sources."
            },
            "last_updated": "2025-12-23T19:21:50Z",
            "net": "2026-01-17T00:00:00Z",
            "net_precision": {
                "id": 5,
                "name": "Day",
                "abbrev": "DAY",
                "description": "The T-0 is expected on the given day."
            },
            "window_end": "2026-01-17T00:00:00Z",
            "window_start": "2026-01-17T00:00:00Z",
            "image": {
                "id": 2355,
                "name": "Spectrum on the pad at Andøya Spaceport (Maiden Flight)",
                "image_url": "https://thespacedevs-dev.nyc3.digitaloceanspaces.com/media/images/spectrum_on_the_image_20250321072643.jpeg",
                "thumbnail_url": "https://thespacedevs-dev.nyc3.digitaloceanspaces.com/media/images/spectrum_on_the_image_thumbnail_20250321072643.jpeg",
                "credit": "Isar Aerospace | Robin Brillert, Wingmen Media",
                "license": {
                    "id": 1,
                    "name": "Unknown",
                    "priority": 9,
                    "link": null
                },
                "single_use": false,
                "variants": []
            },
            "infographic": null,
            "probability": null,
            "weather_concerns": null,
            "failreason": "",
            "hashtag": null,
            "launch_service_provider": {
                "response_mode": "list",
                "id": 1046,
                "url": "https://lldev.thespacedevs.com/2.3.0/agencies/1046/",
                "name": "Isar Aerospace",
                "abbrev": "ISAR",
                "type": {
                    "id": 5,
                    "name": "Private"
                }
            },
            "rocket": {
                "id": 8716,
                "configuration": {
                    "response_mode": "list",
                    "id": 491,
                    "url": "https://lldev.thespacedevs.com/2.3.0/launcher_configurations/491/",
                    "name": "Spectrum",
                    "families": [],
                    "full_name": "Spectrum",
                    "variant": ""
                }
            },
            "mission": {
                "id": 7309,
                "name": "Flight Two",
                "type": "Test Flight",
                "description": "Second test flight of the Isar Spectrum launch vehicle, carrying several cubesats as part of the European Space Agency's “Boost!” program.",
                "image": null,
                "orbit": {
                    "id": 17,
                    "name": "Sun-Synchronous Orbit",
                    "abbrev": "SSO",
                    "celestial_body": {
                        "response_mode": "list",
                        "id": 1,
                        "name": "Earth"
                    }
                },
                "agencies": [],
                "info_urls": [],
                "vid_urls": []
            },
            "pad": {
                "id": 51,
                "url": "https://lldev.thespacedevs.com/2.3.0/pads/51/",
                "active": true,
                "agencies": [],
                "name": "Orbital Launch Pad",
                "image": null,
                "description": null,
                "info_url": null,
                "wiki_url": "https://en.wikipedia.org/wiki/And%C3%B8ya_Space",
                "map_url": "https://www.google.com/maps?q=69.1084,15.5895",
                "latitude": 69.1084,
                "longitude": 15.5895,
                "country": {
                    "id": 49,
                    "name": "Norway",
                    "alpha_2_code": "NO",
                    "alpha_3_code": "NOR",
                    "nationality_name": "Norwegian",
                    "nationality_name_composed": "Norwegian"
                },
                "map_image": "https://thespacedevs-dev.nyc3.digitaloceanspaces.com/media/map_images/pad_51_20200803143605.jpg",
                "total_launch_count": 1,
                "orbital_launch_attempt_count": 1,
                "fastest_turnaround": null,
                "location": {
                    "response_mode": "normal",
                    "id": 161,
                    "url": "https://lldev.thespacedevs.com/2.3.0/locations/161/",
                    "name": "Andøya Spaceport",
                    "celestial_body": {
                        "response_mode": "normal",
                        "id": 1,
                        "name": "Earth",
                        "type": {
                            "id": 1,
                            "name": "Planet"
                        },
                        "diameter": 12742000.0,
                        "mass": 5.972168e+24,
                        "gravity": 9.80655,
                        "length_of_day": "1 00:00:00",
                        "atmosphere": true,
                        "image": {
                            "id": 2040,
                            "name": "Earth (Apollo 17)",
                            "image_url": "https://thespacedevs-dev.nyc3.digitaloceanspaces.com/media/images/earth_2528apol_image_20240402194304.jpeg",
                            "thumbnail_url": "https://thespacedevs-dev.nyc3.digitaloceanspaces.com/media/images/earth_2528apol_image_thumbnail_20240402194305.jpeg",
                            "credit": "NASA",
                            "license": {
                                "id": 4,
                                "name": "NASA Image and Media Guidelines",
                                "priority": 0,
                                "link": "https://www.nasa.gov/nasa-brand-center/images-and-media/"
                            },
                            "single_use": true,
                            "variants": []
                        },
                        "description": "Earth is the third planet from the Sun and the only astronomical object known to harbor life.",
                        "wiki_url": "https://en.wikipedia.org/wiki/Earth",
                        "total_attempted_launches": 7388,
                        "successful_launches": 6838,
                        "failed_launches": 550,
                        "total_attempted_landings": 1243,
                        "successful_landings": 1196,
                        "failed_landings": 47
                    },
                    "active": true,
                    "country": {
                        "id": 49,
                        "name": "Norway",
                        "alpha_2_code": "NO",
                        "alpha_3_code": "NOR",
                        "nationality_name": "Norwegian",
                        "nationality_name_composed": "Norwegian"
                    },
                    "description": "Andøya Space, also named Andøya Space Center and formerly Andøya Rocket Range, is a rocket launch site, rocket range, and spaceport on Andøya island (the northernmost in the Vesterålen archipelago) in Andøy Municipality in Nordland county, Norway.",
                    "image": {
                        "id": 2137,
                        "name": "Andøya Spaceport",
                        "image_url": "https://thespacedevs-dev.nyc3.digitaloceanspaces.com/media/images/and25c325b8ya_image_20240808093551.jpg",
                        "thumbnail_url": "https://thespacedevs-dev.nyc3.digitaloceanspaces.com/media/images/and25c325b8ya_image_thumbnail_20240808093552.jpeg",
                        "credit": "Andøya Space",
                        "license": {
                            "id": 1,
                            "name": "Unknown",
                            "priority": 9,
                            "link": null
                        },
                        "single_use": true,
                        "variants": []
                    },
                    "map_image": "https://thespacedevs-dev.nyc3.digitaloceanspaces.com/media/map_images/location_161_20240109072235.jpg",
                    "longitude": 16.020833,
                    "latitude": 69.294167,
                    "timezone_name": "Europe/Oslo",
                    "total_launch_count": 1,
                    "total_landing_count": 0
                }
            },
            "webcast_live": false,
            "program": [],
            "orbital_launch_attempt_count": 7180,
            "location_launch_attempt_count": 2,
            "pad_launch_attempt_count": 2,
            "agency_launch_attempt_count": 2,
            "orbital_launch_attempt_count_year": 4,
            "location_launch_attempt_count_year": 1,
            "pad_launch_attempt_count_year": 1,
            "agency_launch_attempt_count_year": 1
        },
        {
            "id": "7650a17a-cc52-4597-bd1a-0951d7389a95",
            "url": "https://lldev.thespacedevs.com/2.3.0/launches/7650a17a-cc52-4597-bd1a-0951d7389a95/",
            "name": "Ceres-2 | Demo Flight",
            "response_mode": "normal",
            "slug": "ceres-2-demo-flight",
            "launch_designator": null,
            "status": {
                "id": 2,
                "name": "To Be Determined",
                "abbrev": "TBD",
                "description": "Current date is a placeholder or rough estimation based on unreliable or interpreted sources."
            },
            "last_updated": "2025-12-28T20:15:05Z",
            "net": "2026-01-31T00:00:00Z",
            "net_precision": {
                "id": 7,
                "name": "Month",
                "abbrev": "M",
                "description": "The T-0 is expected in the given month."
            },
            "window_end": "2026-01-31T00:00:00Z",
            "window_start": "2026-01-31T00:00:00Z",
            "image": {
                "id": 2620,
                "name": "Ceres-2 Illustration",
                "image_url": "https://thespacedevs-dev.nyc3.digitaloceanspaces.com/media/images/ceres-2_illustr_image_20251210054657.png",
                "thumbnail_url": "https://thespacedevs-dev.nyc3.digitaloceanspaces.com/media/images/ceres-2_illustr_image_thumbnail_20251210054658.png",
                "credit": "Galactic Energy",
                "license": {
                    "id": 1,
                    "name": "Unknown",
                    "priority": 9,
                    "link": null
                },
                "single_use": true,
                "variants": []
            },
            "infographic": null,
            "probability": null,
            "weather_concerns": null,
            "failreason": "",
            "hashtag": null,
            "launch_service_provider": {
                "response_mode": "list",
                "id": 1021,
                "url": "https://lldev.thespacedevs.com/2.3.0/agencies/1021/",
                "name": "Galactic Energy",
                "abbrev": "GE",
                "type": {
                    "id": 3,
                    "name": "Commercial"
                }
            },
            "rocket": {
                "id": 8828,
                "configuration": {
                    "response_mode": "list",
                    "id": 546,
                    "url": "https://lldev.thespacedevs.com/2.3.0/launcher_configurations/546/",
                    "name": "Ceres-2",
                    "families": [],
                    "full_name": "Ceres-2",
                    "variant": ""
                }
            },
            "mission": {
                "id": 7419,
                "name": "Demo Flight",
                "type": "Test Flight",
                "description": "First test launch of Galactic Energy’s Ceres-2 rocket.",
                "image": null,
                "orbit": {
                    "id": 25,
                    "name": "Unknown",
                    "abbrev": "N/A",
                    "celestial_body": {
                        "response_mode": "list",
                        "id": 1,
                        "name": "Earth"
                    }
                },
                "agencies": [],
                "info_urls": [],
                "vid_urls": []
            },
            "pad": {
                "id": 21,
                "url": "https://lldev.thespacedevs.com/2.3.0/pads/21/",
                "active": true,
                "agencies": [],
                "name": "Launch Area 95A",
                "image": {
                    "id": 1329,
                    "name": "Ceres-1 liftoff from LA-95A (Jilin-1 High Resolution 03D-08, 51 to 54)",
                    "image_url": "https://thespacedevs-dev.nyc3.digitaloceanspaces.com/media/images/ceres-1252025_image_20230703100031.jpeg",
                    "thumbnail_url": "https://thespacedevs-dev.nyc3.digitaloceanspaces.com/media/images/255bauto255d__image_thumbnail_20240305192423.jpeg",
                    "credit": "Galactic Energy",
                    "license": {
                        "id": 1,
                        "name": "Unknown",
                        "priority": 9,
                        "link": null
                    },
                    "single_use": false,
                    "variants": []
                },
                "description": "",
                "info_url": null,
                "wiki_url": "https://en.wikipedia.org/wiki/Jiuquan_Satellite_Launch_Center",
                "map_url": "https://www.google.com/maps?q=40.969117,100.343333",
                "latitude": 40.969117,
                "longitude": 100.343333,
                "country": {
                    "id": 6,
                    "name": "China",
                    "alpha_2_code": "CN",
                    "alpha_3_code": "CHN",
                    "nationality_name": "Chinese",
                    "nationality_name_composed": "Sino"
                },
                "map_image": "https://thespacedevs-dev.nyc3.digitaloceanspaces.com/media/map_images/pad_21_20200803143253.jpg",
                "total_launch_count": 64,
                "orbital_launch_attempt_count": 64,
                "fastest_turnaround": "P2DT1H47M",
                "location": {
                    "response_mode": "normal",
                    "id": 17,
                    "url": "https://lldev.thespacedevs.com/2.3.0/locations/17/",
                    "name": "Jiuquan Satellite Launch Center, People's Republic of China",
                    "celestial_body": {
                        "response_mode": "normal",
                        "id": 1,
                        "name": "Earth",
                        "type": {
                            "id": 1,
                            "name": "Planet"
                        },
                        "diameter": 12742000.0,
                        "mass": 5.972168e+24,
                        "gravity": 9.80655,
                        "length_of_day": "1 00:00:00",
                        "atmosphere": true,
                        "image": {
                            "id": 2040,
                            "name": "Earth (Apollo 17)",
                            "image_url": "https://thespacedevs-dev.nyc3.digitaloceanspaces.com/media/images/earth_2528apol_image_20240402194304.jpeg",
                            "thumbnail_url": "https://thespacedevs-dev.nyc3.digitaloceanspaces.com/media/images/earth_2528apol_image_thumbnail_20240402194305.jpeg",
                            "credit": "NASA",
                            "license": {
                                "id": 4,
                                "name": "NASA Image and Media Guidelines",
                                "priority": 0,
                                "link": "https://www.nasa.gov/nasa-brand-center/images-and-media/"
                            },
                            "single_use": true,
                            "variants": []
                        },
                        "description": "Earth is the third planet from the Sun and the only astronomical object known to harbor life.",
                        "wiki_url": "https://en.wikipedia.org/wiki/Earth",
                        "total_attempted_launches": 7388,
                        "successful_launches": 6838,
                        "failed_launches": 550,
                        "total_attempted_landings": 1243,
                        "successful_landings": 1196,
                        "failed_landings": 47
                    },
                    "active": true,
                    "country": {
                        "id": 6,
                        "name": "China",
                        "alpha_2_code": "CN",
                        "alpha_3_code": "CHN",
                        "nationality_name": "Chinese",
                        "nationality_name_composed": "Sino"
                    },
                    "description": "Jiuquan Satellite Launch Center is a Chinese spaceport located between the Ejin, Alxa, Inner Mongolia and Hangtian Town, Jinta County, Jiuquan, Gansu Province. It is part of the Dongfeng Aerospace City (Base 10).",
                    "image": {
                        "id": 1374,
                        "name": "Long March 2F/G liftoff (Shenzhou 16)",
                        "image_url": "https://thespacedevs-dev.nyc3.digitaloceanspaces.com/media/images/long2520march_image_20240101085213.jpeg",
                        "thumbnail_url": "https://thespacedevs-dev.nyc3.digitaloceanspaces.com/media/images/255bauto255d__image_thumbnail_20240305192548.jpeg",
                        "credit": "CMS",
                        "license": {
                            "id": 1,
                            "name": "Unknown",
                            "priority": 9,
                            "link": null
                        },
                        "single_use": false,
                        "variants": []
                    },
                    "map_image": "https://thespacedevs-dev.nyc3.digitaloceanspaces.com/media/map_images/location_17_20200803142429.jpg",
                    "longitude": 100.291111,
                    "latitude": 40.958056,
                    "timezone_name": "Asia/Shanghai",
                    "total_launch_count": 272,
                    "total_landing_count": 2
                }
            },
            "webcast_live": false,
            "program": [],
            "orbital_launch_attempt_count": 7186,
            "location_launch_attempt_count": 274,
            "pad_launch_attempt_count": 65,
            "agency_launch_attempt_count": 23,
            "orbital_launch_attempt_count_year": 12,
            "location_launch_attempt_count_year": 1,
            "pad_launch_attempt_count_year": 1,
            "agency_launch_attempt_count_year": 1
        },
        {
            "id": "3639c1c6-1f92-4836-9eeb-fd50ef398550",
            "url": "https://lldev.thespacedevs.com/2.3.0/launches/3639c1c6-1f92-4836-9eeb-fd50ef398550/",
            "name": "Electron | Bridging The Swarm (NeonSat-1A)",
            "response_mode": "normal",
            "slug": "electron-bridging-the-swarm-neonsat-1a",
            "launch_designator": null,
            "status": {
                "id": 2,
                "name": "To Be Determined",
                "abbrev": "TBD",
                "description": "Current date is a placeholder or rough estimation based on unreliable or interpreted sources."
            },
            "last_updated": "2025-12-21T07:53:53Z",
            "net": "2026-01-31T00:00:00Z",
            "net_precision": {
                "id": 7,
                "name": "Month",
                "abbrev": "M",
                "description": "The T-0 is expected in the given month."
            },
            "window_end": "2026-01-31T00:00:00Z",
            "window_start": "2026-01-31T00:00:00Z",
            "image": {
                "id": 2628,
                "name": "Electron on the Pad (Braiding the Swarm)",
                "image_url": "https://thespacedevs-dev.nyc3.digitaloceanspaces.com/media/images/electron_on_the_image_20251215193751.jpg",
                "thumbnail_url": "https://thespacedevs-dev.nyc3.digitaloceanspaces.com/media/images/electron_on_the_image_thumbnail_20251215193751.jpeg",
                "credit": "Rocket Lab",
                "license": {
                    "id": 7,
                    "name": "Rocket Lab Image Use Policy",
                    "priority": 3,
                    "link": "https://www.rocketlabusa.com/about/gallery/"
                },
                "single_use": true,
                "variants": []
            },
            "infographic": null,
            "probability": null,
            "weather_concerns": null,
            "failreason": "",
            "hashtag": null,
            "launch_service_provider": {
                "response_mode": "list",
                "id": 147,
                "url": "https://lldev.thespacedevs.com/2.3.0/agencies/147/",
                "name": "Rocket Lab",
                "abbrev": "RL",
                "type": {
                    "id": 3,
                    "name": "Commercial"
                }
            },
            "rocket": {
                "id": 8847,
                "configuration": {
                    "response_mode": "list",
                    "id": 26,
                    "url": "https://lldev.thespacedevs.com/2.3.0/launcher_configurations/26/",
                    "name": "Electron",
                    "families": [],
                    "full_name": "Electron",
                    "variant": ""
                }
            },
            "mission": {
                "id": 7438,
                "name": "Bridging The Swarm (NeonSat-1A)",
                "type": "Earth Science",
                "description": "The NeonSat-1A, carrying a high-resolution optical camera, is designed to test the constellation capabilities of the South Korean government's Earth observation micro-satellite constellation NeonSat (New-space Earth Observation Satellite), in particular technology improvements identified from operations of NeonSat-1 after its launch in April 2024. These technologies will in turn be incorporated into the next 10 NeonSat under construction, as well as providing more site re-visiting capabilities along with NeonSat-1.\r\n\r\nThe NeonSat constellation is the first satellite system developed by the government using a mass-production approach for precise monitoring of the Korean Peninsula, lead by the Satellite Technology Research Center (SaTReC) at the Korea Advanced Institute of Science and Technology (KAIST), Korea’s leading university dedicated to science and technology. Designed to capture near-real time natural disaster monitoring for the Korean peninsula, KAIST’s NEONSAT constellation is a collaboration across multiple Korean academic, industry, and research institutions, including SaTReC, which is leading the program’s system design and engineering. \r\n\r\nThe NEONSAT program is funded by the Korean government’s Ministry of Science and ICT (MSIT).",
                "image": null,
                "orbit": {
                    "id": 17,
                    "name": "Sun-Synchronous Orbit",
                    "abbrev": "SSO",
                    "celestial_body": {
                        "response_mode": "list",
                        "id": 1,
                        "name": "Earth"
                    }
                },
                "agencies": [],
                "info_urls": [],
                "vid_urls": []
            },
            "pad": {
                "id": 65,
                "url": "https://lldev.thespacedevs.com/2.3.0/pads/65/",
                "active": true,
                "agencies": [
                    {
                        "response_mode": "normal",
                        "id": 147,
                        "url": "https://lldev.thespacedevs.com/2.3.0/agencies/147/",
                        "name": "Rocket Lab",
                        "abbrev": "RL",
                        "type": {
                            "id": 3,
                            "name": "Commercial"
                        },
                        "featured": true,
                        "country": [
                            {
                                "id": 2,
                                "name": "United States of America",
                                "alpha_2_code": "US",
                                "alpha_3_code": "USA",
                                "nationality_name": "American",
                                "nationality_name_composed": "Americano"
                            }
                        ],
                        "description": "Rocket Lab is an American aerospace manufacturer with a wholly owned New Zealand subsidiary. The company develops lightweight, cost-effective commercial rocket launch services. The Electron Program was founded on the premise that small payloads such as CubeSats require dedicated small launch vehicles and flexibility not currently offered by traditional rocket systems. Its rocket, the Electron, is a light-weight rocket and is now operating commercially. The company is also producing a variety of spacecrafts and spacecrafts components.",
                        "administrator": "CEO: Peter Beck",
                        "founding_year": 2006,
                        "launchers": "Electron",
                        "spacecraft": "",
                        "parent": null,
                        "image": {
                            "id": 24,
                            "name": "[AUTO] Rocket Lab - image",
                            "image_url": "https://thespacedevs-dev.nyc3.digitaloceanspaces.com/media/images/rocket2520lab2520ltd_image_20190207032456.jpeg",
                            "thumbnail_url": "https://thespacedevs-dev.nyc3.digitaloceanspaces.com/media/images/255bauto255d__image_thumbnail_20240305184649.jpeg",
                            "credit": null,
                            "license": {
                                "id": 1,
                                "name": "Unknown",
                                "priority": 9,
                                "link": null
                            },
                            "single_use": true,
                            "variants": []
                        },
                        "logo": {
                            "id": 176,
                            "name": "[AUTO] Rocket Lab - logo",
                            "image_url": "https://thespacedevs-dev.nyc3.digitaloceanspaces.com/media/images/rocket2520lab2520ltd_logo_20220218075411.png",
                            "thumbnail_url": "https://thespacedevs-dev.nyc3.digitaloceanspaces.com/media/images/255bauto255d__image_thumbnail_20240305185115.png",
                            "credit": null,
                            "license": {
                                "id": 1,
                                "name": "Unknown",
                                "priority": 9,
                                "link": null
                            },
                            "single_use": true,
                            "variants": []
                        },
                        "social_logo": {
                            "id": 88,
                            "name": "[AUTO] Rocket Lab - social_logo",
                            "image_url": "https://thespacedevs-dev.nyc3.digitaloceanspaces.com/media/images/rocket2520lab2520ltd_nation_20230531050352.jpg",
                            "thumbnail_url": "https://thespacedevs-dev.nyc3.digitaloceanspaces.com/media/images/255bauto255d__image_thumbnail_20240305184840.jpeg",
                            "credit": null,
                            "license": {
                                "id": 1,
                                "name": "Unknown",
                                "priority": 9,
                                "link": null
                            },
                            "single_use": true,
                            "variants": []
                        }
                    }
                ],
                "name": "Rocket Lab Launch Complex 1A",
                "image": {
                    "id": 1412,
                    "name": "Electron on LC-1A (Return to Sender)",
                    "image_url": "https://thespacedevs-dev.nyc3.digitaloceanspaces.com/media/images/electron25202_image_20201120015105.jpg",
                    "thumbnail_url": "https://thespacedevs-dev.nyc3.digitaloceanspaces.com/media/images/255bauto255d__image_thumbnail_20240305192700.jpeg",
                    "credit": "Rocket Lab",
                    "license": {
                        "id": 7,
                        "name": "Rocket Lab Image Use Policy",
                        "priority": 3,
                        "link": "https://www.rocketlabusa.com/about/gallery/"
                    },
                    "single_use": false,
                    "variants": []
                },
                "description": "",
                "info_url": null,
                "wiki_url": "https://en.wikipedia.org/wiki/Rocket_Lab_Launch_Complex_1",
                "map_url": "https://www.google.com/maps?q=-39.262833,177.864469",
                "latitude": -39.262833,
                "longitude": 177.864469,
                "country": {
                    "id": 51,
                    "name": "New Zealand",
                    "alpha_2_code": "NZ",
                    "alpha_3_code": "NZL",
                    "nationality_name": "Kiwi",
                    "nationality_name_composed": "Kiwi"
                },
                "map_image": "https://thespacedevs-dev.nyc3.digitaloceanspaces.com/media/map_images/pad_65_20200803143549.jpg",
                "total_launch_count": 35,
                "orbital_launch_attempt_count": 35,
                "fastest_turnaround": "P15DT1H57M",
                "location": {
                    "response_mode": "normal",
                    "id": 10,
                    "url": "https://lldev.thespacedevs.com/2.3.0/locations/10/",
                    "name": "Rocket Lab Launch Complex 1, Mahia Peninsula, New Zealand",
                    "celestial_body": {
                        "response_mode": "normal",
                        "id": 1,
                        "name": "Earth",
                        "type": {
                            "id": 1,
                            "name": "Planet"
                        },
                        "diameter": 12742000.0,
                        "mass": 5.972168e+24,
                        "gravity": 9.80655,
                        "length_of_day": "1 00:00:00",
                        "atmosphere": true,
                        "image": {
                            "id": 2040,
                            "name": "Earth (Apollo 17)",
                            "image_url": "https://thespacedevs-dev.nyc3.digitaloceanspaces.com/media/images/earth_2528apol_image_20240402194304.jpeg",
                            "thumbnail_url": "https://thespacedevs-dev.nyc3.digitaloceanspaces.com/media/images/earth_2528apol_image_thumbnail_20240402194305.jpeg",
                            "credit": "NASA",
                            "license": {
                                "id": 4,
                                "name": "NASA Image and Media Guidelines",
                                "priority": 0,
                                "link": "https://www.nasa.gov/nasa-brand-center/images-and-media/"
                            },
                            "single_use": true,
                            "variants": []
                        },
                        "description": "Earth is the third planet from the Sun and the only astronomical object known to harbor life.",
                        "wiki_url": "https://en.wikipedia.org/wiki/Earth",
                        "total_attempted_launches": 7388,
                        "successful_launches": 6838,
                        "failed_launches": 550,
                        "total_attempted_landings": 1243,
                        "successful_landings": 1196,
                        "failed_landings": 47
                    },
                    "active": true,
                    "country": {
                        "id": 51,
                        "name": "New Zealand",
                        "alpha_2_code": "NZ",
                        "alpha_3_code": "NZL",
                        "nationality_name": "Kiwi",
                        "nationality_name_composed": "Kiwi"
                    },
                    "description": "Rocket Lab Launch Complex 1 is a commercial spaceport located close to Ahuriri Point at the southern tip of Māhia Peninsula, on the east coast of New Zealand's North Island. It is owned and operated by private spaceflight company Rocket Lab and supports launches of the company's Electron rocket for small satellites. With the launch of Electron on 25 May 2017, it became the first private spaceport to host an orbital launch attempt, and the first site in New Zealand to host an orbital launch attempt. With the Electron launch of 21 January 2018, it became the first private spaceport to host a successful orbital launch.",
                    "image": {
                        "id": 2206,
                        "name": "Rocket Lab Launch Complex 1",
                        "image_url": "https://thespacedevs-dev.nyc3.digitaloceanspaces.com/media/images/rocket_lab_laun_image_20240918164228.jpg",
                        "thumbnail_url": "https://thespacedevs-dev.nyc3.digitaloceanspaces.com/media/images/rocket_lab_laun_image_thumbnail_20240918164228.jpeg",
                        "credit": "Rocket Lab",
                        "license": {
                            "id": 7,
                            "name": "Rocket Lab Image Use Policy",
                            "priority": 3,
                            "link": "https://www.rocketlabusa.com/about/gallery/"
                        },
                        "single_use": true,
                        "variants": []
                    },
                    "map_image": "https://thespacedevs-dev.nyc3.digitaloceanspaces.com/media/map_images/location_10_20200803142509.jpg",
                    "longitude": 177.86586,
                    "latitude": -39.26085,
                    "timezone_name": "Pacific/Auckland",
                    "total_launch_count": 69,
                    "total_landing_count": 17
                }
            },
            "webcast_live": false,
            "program": [],
            "orbital_launch_attempt_count": 7186,
            "location_launch_attempt_count": 70,
            "pad_launch_attempt_count": 36,
            "agency_launch_attempt_count": 80,
            "orbital_launch_attempt_count_year": 10,
            "location_launch_attempt_count_year": 1,
            "pad_launch_attempt_count_year": 1,
            "agency_launch_attempt_count_year": 1
        },
        {
            "id": "53769468-bfd3-45c7-a52b-46a68ed7510f",
            "url": "https://lldev.thespacedevs.com/2.3.0/launches/53769468-bfd3-45c7-a52b-46a68ed7510f/",
            "name": "Falcon 9 Block 5 | BlueBird Block 2 #2",
            "response_mode": "normal",
            "slug": "falcon-9-block-5-bluebird-block-2-2",
            "launch_designator": null,
            "status": {
                "id": 2,
                "name": "To Be Determined",
                "abbrev": "TBD",
                "description": "Current date is a placeholder or rough estimation based on unreliable or interpreted sources."
            },
            "last_updated": "2025-12-22T00:43:35Z",
            "net": "2026-01-31T00:00:00Z",
            "net_precision": {
                "id": 7,
                "name": "Month",
                "abbrev": "M",
                "description": "The T-0 is expected in the given month."
            },
            "window_end": "2026-01-31T00:00:00Z",
            "window_start": "2026-01-31T00:00:00Z",
            "image": {
                "id": 2210,
                "name": "F9 on SLC-40 (BlueBird 1)",
                "image_url": "https://thespacedevs-dev.nyc3.digitaloceanspaces.com/media/images/f9_on_slc-40_2_image_20240919072420.jpg",
                "thumbnail_url": "https://thespacedevs-dev.nyc3.digitaloceanspaces.com/media/images/f9_on_slc-40_2_image_thumbnail_20240919072420.jpeg",
                "credit": "SpaceX",
                "license": {
                    "id": 1,
                    "name": "Unknown",
                    "priority": 9,
                    "link": null
                },
                "single_use": true,
                "variants": []
            },
            "infographic": null,
            "probability": null,
            "weather_concerns": null,
            "failreason": "",
            "hashtag": null,
            "launch_service_provider": {
                "response_mode": "list",
                "id": 121,
                "url": "https://lldev.thespacedevs.com/2.3.0/agencies/121/",
                "name": "SpaceX",
                "abbrev": "SpX",
                "type": {
                    "id": 3,
                    "name": "Commercial"
                }
            },
            "rocket": {
                "id": 8408,
                "configuration": {
                    "response_mode": "list",
                    "id": 164,
                    "url": "https://lldev.thespacedevs.com/2.3.0/launcher_configurations/164/",
                    "name": "Falcon 9",
                    "families": [
                        {
                            "response_mode": "list",
                            "id": 1,
                            "name": "Falcon"
                        },
                        {
                            "response_mode": "list",
                            "id": 176,
                            "name": "Falcon 9"
                        }
                    ],
                    "full_name": "Falcon 9 Block 5",
                    "variant": "Block 5"
                }
            },
            "mission": {
                "id": 6996,
                "name": "BlueBird Block 2 #2",
                "type": "Communications",
                "description": "AST SpaceMobile’s Block 2 BlueBird satellites are designed to deliver up to 10 times the bandwidth capacity of the BlueBird Block 1 satellites, required to achieve 24/7 continuous cellular broadband service coverage in the United States, with beams designed to support a capacity of up to 40 MHz, enabling peak data transmission speeds up to 120 Mbps, supporting voice, full data and video applications. The Block 2 BlueBirds, featuring as large as 2400 square foot communications arrays, will be the largest satellites ever commercially deployed in Low Earth orbit once launched.\r\n\r\nThis launch will feature 4 satellites.",
                "image": null,
                "orbit": {
                    "id": 8,
                    "name": "Low Earth Orbit",
                    "abbrev": "LEO",
                    "celestial_body": {
                        "response_mode": "list",
                        "id": 1,
                        "name": "Earth"
                    }
                },
                "agencies": [],
                "info_urls": [],
                "vid_urls": []
            },
            "pad": {
                "id": 80,
                "url": "https://lldev.thespacedevs.com/2.3.0/pads/80/",
                "active": true,
                "agencies": [
                    {
                        "response_mode": "normal",
                        "id": 121,
                        "url": "https://lldev.thespacedevs.com/2.3.0/agencies/121/",
                        "name": "SpaceX",
                        "abbrev": "SpX",
                        "type": {
                            "id": 3,
                            "name": "Commercial"
                        },
                        "featured": true,
                        "country": [
                            {
                                "id": 2,
                                "name": "United States of America",
                                "alpha_2_code": "US",
                                "alpha_3_code": "USA",
                                "nationality_name": "American",
                                "nationality_name_composed": "Americano"
                            }
                        ],
                        "description": "Space Exploration Technologies Corp., known as SpaceX, is an American aerospace manufacturer and space transport services company headquartered in Hawthorne, California. It was founded in 2002 by entrepreneur Elon Musk with the goal of reducing space transportation costs and enabling the colonization of Mars. SpaceX operates from many pads, on the East Coast of the US they operate from SLC-40 at Cape Canaveral Space Force Station and historic LC-39A at Kennedy Space Center. They also operate from SLC-4E at Vandenberg Space Force Base, California, usually for polar launches. Another launch site is being developed at Boca Chica, Texas.",
                        "administrator": "CEO: Elon Musk",
                        "founding_year": 2002,
                        "launchers": "Falcon | Starship",
                        "spacecraft": "Dragon",
                        "parent": null,
                        "image": {
                            "id": 29,
                            "name": "[AUTO] SpaceX - image",
                            "image_url": "https://thespacedevs-dev.nyc3.digitaloceanspaces.com/media/images/spacex_image_20190207032501.jpeg",
                            "thumbnail_url": "https://thespacedevs-dev.nyc3.digitaloceanspaces.com/media/images/255bauto255d__image_thumbnail_20240305184704.jpeg",
                            "credit": null,
                            "license": {
                                "id": 1,
                                "name": "Unknown",
                                "priority": 9,
                                "link": null
                            },
                            "single_use": true,
                            "variants": []
                        },
                        "logo": {
                            "id": 186,
                            "name": "[AUTO] SpaceX - logo",
                            "image_url": "https://thespacedevs-dev.nyc3.digitaloceanspaces.com/media/images/spacex_logo_20220826094919.png",
                            "thumbnail_url": "https://thespacedevs-dev.nyc3.digitaloceanspaces.com/media/images/255bauto255d__image_thumbnail_20240305185138.png",
                            "credit": null,
                            "license": {
                                "id": 1,
                                "name": "Unknown",
                                "priority": 9,
                                "link": null
                            },
                            "single_use": true,
                            "variants": []
                        },
                        "social_logo": {
                            "id": 94,
                            "name": "[AUTO] SpaceX - social_logo",
                            "image_url": "https://thespacedevs-dev.nyc3.digitaloceanspaces.com/media/images/spacex_nation_20230531064544.jpg",
                            "thumbnail_url": "https://thespacedevs-dev.nyc3.digitaloceanspaces.com/media/images/255bauto255d__image_thumbnail_20240305184848.jpeg",
                            "credit": null,
                            "license": {
                                "id": 1,
                                "name": "Unknown",
                                "priority": 9,
                                "link": null
                            },
                            "single_use": true,
                            "variants": []
                        }
                    }
                ],
                "name": "Space Launch Complex 40",
                "image": {
                    "id": 2113,
                    "name": "F9 liftoff from SLC-40 (SES-24)",
                    "image_url": "https://thespacedevs-dev.nyc3.digitaloceanspaces.com/media/images/f9_liftoff_from_image_20240621050513.jpeg",
                    "thumbnail_url": "https://thespacedevs-dev.nyc3.digitaloceanspaces.com/media/images/f9_liftoff_from_image_thumbnail_20240621050514.jpeg",
                    "credit": "SpaceX",
                    "license": {
                        "id": 5,
                        "name": "CC BY-NC 2.0",
                        "priority": 1,
                        "link": "https://creativecommons.org/licenses/by-nc/2.0/"
                    },
                    "single_use": false,
                    "variants": []
                },
                "description": "",
                "info_url": null,
                "wiki_url": "https://en.wikipedia.org/wiki/Cape_Canaveral_Air_Force_Station_Space_Launch_Complex_40",
                "map_url": "https://www.google.com/maps?q=28.56194122,-80.57735736",
                "latitude": 28.56194122,
                "longitude": -80.57735736,
                "country": {
                    "id": 2,
                    "name": "United States of America",
                    "alpha_2_code": "US",
                    "alpha_3_code": "USA",
                    "nationality_name": "American",
                    "nationality_name_composed": "Americano"
                },
                "map_image": "https://thespacedevs-dev.nyc3.digitaloceanspaces.com/media/map_images/pad_80_20200803143323.jpg",
                "total_launch_count": 354,
                "orbital_launch_attempt_count": 354,
                "fastest_turnaround": "P2DT2H44M55S",
                "location": {
                    "response_mode": "normal",
                    "id": 12,
                    "url": "https://lldev.thespacedevs.com/2.3.0/locations/12/",
                    "name": "Cape Canaveral SFS, FL, USA",
                    "celestial_body": {
                        "response_mode": "normal",
                        "id": 1,
                        "name": "Earth",
                        "type": {
                            "id": 1,
                            "name": "Planet"
                        },
                        "diameter": 12742000.0,
                        "mass": 5.972168e+24,
                        "gravity": 9.80655,
                        "length_of_day": "1 00:00:00",
                        "atmosphere": true,
                        "image": {
                            "id": 2040,
                            "name": "Earth (Apollo 17)",
                            "image_url": "https://thespacedevs-dev.nyc3.digitaloceanspaces.com/media/images/earth_2528apol_image_20240402194304.jpeg",
                            "thumbnail_url": "https://thespacedevs-dev.nyc3.digitaloceanspaces.com/media/images/earth_2528apol_image_thumbnail_20240402194305.jpeg",
                            "credit": "NASA",
                            "license": {
                                "id": 4,
                                "name": "NASA Image and Media Guidelines",
                                "priority": 0,
                                "link": "https://www.nasa.gov/nasa-brand-center/images-and-media/"
                            },
                            "single_use": true,
                            "variants": []
                        },
                        "description": "Earth is the third planet from the Sun and the only astronomical object known to harbor life.",
                        "wiki_url": "https://en.wikipedia.org/wiki/Earth",
                        "total_attempted_launches": 7388,
                        "successful_launches": 6838,
                        "failed_launches": 550,
                        "total_attempted_landings": 1243,
                        "successful_landings": 1196,
                        "failed_landings": 47
                    },
                    "active": true,
                    "country": {
                        "id": 2,
                        "name": "United States of America",
                        "alpha_2_code": "US",
                        "alpha_3_code": "USA",
                        "nationality_name": "American",
                        "nationality_name_composed": "Americano"
                    },
                    "description": "Cape Canaveral Space Force Station (CCSFS) is an installation of the United States Space Force's Space Launch Delta 45, located on Cape Canaveral in Brevard County, Florida.",
                    "image": {
                        "id": 2200,
                        "name": "Cape Canaveral & KSC seen from orbit (STS-43)",
                        "image_url": "https://thespacedevs-dev.nyc3.digitaloceanspaces.com/media/images/cape_canaveral__image_20240918151615.jpg",
                        "thumbnail_url": "https://thespacedevs-dev.nyc3.digitaloceanspaces.com/media/images/cape_canaveral__image_thumbnail_20240918151616.jpeg",
                        "credit": "NASA",
                        "license": {
                            "id": 4,
                            "name": "NASA Image and Media Guidelines",
                            "priority": 0,
                            "link": "https://www.nasa.gov/nasa-brand-center/images-and-media/"
                        },
                        "single_use": true,
                        "variants": []
                    },
                    "map_image": "https://thespacedevs-dev.nyc3.digitaloceanspaces.com/media/map_images/location_12_20200803142519.jpg",
                    "longitude": -80.577778,
                    "latitude": 28.488889,
                    "timezone_name": "America/New_York",
                    "total_launch_count": 1076,
                    "total_landing_count": 70
                }
            },
            "webcast_live": false,
            "program": [],
            "orbital_launch_attempt_count": 7186,
            "location_launch_attempt_count": 1080,
            "pad_launch_attempt_count": 357,
            "agency_launch_attempt_count": 625,
            "orbital_launch_attempt_count_year": 10,
            "location_launch_attempt_count_year": 4,
            "pad_launch_attempt_count_year": 3,
            "agency_launch_attempt_count_year": 5
        },
        {
            "id": "57cc5e9e-97c2-4833-8bcd-e4e62ce63ec6",
            "url": "https://lldev.thespacedevs.com/2.3.0/launches/57cc5e9e-97c2-4833-8bcd-e4e62ce63ec6/",
            "name": "Falcon 9 Block 5 | Starlink Group 10-36",
            "response_mode": "normal",
            "slug": "falcon-9-block-5-starlink-group-10-36",
            "launch_designator": null,
            "status": {
                "id": 2,
                "name": "To Be Determined",
                "abbrev": "TBD",
                "description": "Current date is a placeholder or rough estimation based on unreliable or interpreted sources."
            },
            "last_updated": "2025-12-18T16:57:02Z",
            "net": "2026-01-31T00:00:00Z",
            "net_precision": {
                "id": 7,
                "name": "Month",
                "abbrev": "M",
                "description": "The T-0 is expected in the given month."
            },
            "window_end": "2026-01-31T00:00:00Z",
            "window_start": "2026-01-31T00:00:00Z",
            "image": {
                "id": 1296,
                "name": "Starlink night fairing",
                "image_url": "https://thespacedevs-dev.nyc3.digitaloceanspaces.com/media/images/falcon2520925_image_20221009234147.png",
                "thumbnail_url": "https://thespacedevs-dev.nyc3.digitaloceanspaces.com/media/images/255bauto255d__image_thumbnail_20240305192320.png",
                "credit": "SpaceX",
                "license": {
                    "id": 5,
                    "name": "CC BY-NC 2.0",
                    "priority": 1,
                    "link": "https://creativecommons.org/licenses/by-nc/2.0/"
                },
                "single_use": false,
                "variants": []
            },
            "infographic": null,
            "probability": null,
            "weather_concerns": null,
            "failreason": "",
            "hashtag": null,
            "launch_service_provider": {
                "response_mode": "list",
                "id": 121,
                "url": "https://lldev.thespacedevs.com/2.3.0/agencies/121/",
                "name": "SpaceX",
                "abbrev": "SpX",
                "type": {
                    "id": 3,
                    "name": "Commercial"
                }
            },
            "rocket": {
                "id": 8843,
                "configuration": {
                    "response_mode": "list",
                    "id": 164,
                    "url": "https://lldev.thespacedevs.com/2.3.0/launcher_configurations/164/",
                    "name": "Falcon 9",
                    "families": [
                        {
                            "response_mode": "list",
                            "id": 1,
                            "name": "Falcon"
                        },
                        {
                            "response_mode": "list",
                            "id": 176,
                            "name": "Falcon 9"
                        }
                    ],
                    "full_name": "Falcon 9 Block 5",
                    "variant": "Block 5"
                }
            },
            "mission": {
                "id": 7434,
                "name": "Starlink Group 10-36",
                "type": "Communications",
                "description": "A batch of satellites for the Starlink mega-constellation - SpaceX's project for space-based Internet communication system.\r\n\r\nFirst Starlink launch to feature a Falcon 9 booster landing within The Bahamas waters operationally, after the trajectory was tested during launch of Starlink Group 10-12 in February 2025.",
                "image": null,
                "orbit": {
                    "id": 8,
                    "name": "Low Earth Orbit",
                    "abbrev": "LEO",
                    "celestial_body": {
                        "response_mode": "list",
                        "id": 1,
                        "name": "Earth"
                    }
                },
                "agencies": [
                    {
                        "response_mode": "normal",
                        "id": 121,
                        "url": "https://lldev.thespacedevs.com/2.3.0/agencies/121/",
                        "name": "SpaceX",
                        "abbrev": "SpX",
                        "type": {
                            "id": 3,
                            "name": "Commercial"
                        },
                        "featured": true,
                        "country": [
                            {
                                "id": 2,
                                "name": "United States of America",
                                "alpha_2_code": "US",
                                "alpha_3_code": "USA",
                                "nationality_name": "American",
                                "nationality_name_composed": "Americano"
                            }
                        ],
                        "description": "Space Exploration Technologies Corp., known as SpaceX, is an American aerospace manufacturer and space transport services company headquartered in Hawthorne, California. It was founded in 2002 by entrepreneur Elon Musk with the goal of reducing space transportation costs and enabling the colonization of Mars. SpaceX operates from many pads, on the East Coast of the US they operate from SLC-40 at Cape Canaveral Space Force Station and historic LC-39A at Kennedy Space Center. They also operate from SLC-4E at Vandenberg Space Force Base, California, usually for polar launches. Another launch site is being developed at Boca Chica, Texas.",
                        "administrator": "CEO: Elon Musk",
                        "founding_year": 2002,
                        "launchers": "Falcon | Starship",
                        "spacecraft": "Dragon",
                        "parent": null,
                        "image": {
                            "id": 29,
                            "name": "[AUTO] SpaceX - image",
                            "image_url": "https://thespacedevs-dev.nyc3.digitaloceanspaces.com/media/images/spacex_image_20190207032501.jpeg",
                            "thumbnail_url": "https://thespacedevs-dev.nyc3.digitaloceanspaces.com/media/images/255bauto255d__image_thumbnail_20240305184704.jpeg",
                            "credit": null,
                            "license": {
                                "id": 1,
                                "name": "Unknown",
                                "priority": 9,
                                "link": null
                            },
                            "single_use": true,
                            "variants": []
                        },
                        "logo": {
                            "id": 186,
                            "name": "[AUTO] SpaceX - logo",
                            "image_url": "https://thespacedevs-dev.nyc3.digitaloceanspaces.com/media/images/spacex_logo_20220826094919.png",
                            "thumbnail_url": "https://thespacedevs-dev.nyc3.digitaloceanspaces.com/media/images/255bauto255d__image_thumbnail_20240305185138.png",
                            "credit": null,
                            "license": {
                                "id": 1,
                                "name": "Unknown",
                                "priority": 9,
                                "link": null
                            },
                            "single_use": true,
                            "variants": []
                        },
                        "social_logo": {
                            "id": 94,
                            "name": "[AUTO] SpaceX - social_logo",
                            "image_url": "https://thespacedevs-dev.nyc3.digitaloceanspaces.com/media/images/spacex_nation_20230531064544.jpg",
                            "thumbnail_url": "https://thespacedevs-dev.nyc3.digitaloceanspaces.com/media/images/255bauto255d__image_thumbnail_20240305184848.jpeg",
                            "credit": null,
                            "license": {
                                "id": 1,
                                "name": "Unknown",
                                "priority": 9,
                                "link": null
                            },
                            "single_use": true,
                            "variants": []
                        },
                        "total_launch_count": 619,
                        "consecutive_successful_launches": 104,
                        "successful_launches": 604,
                        "failed_launches": 15,
                        "pending_launches": 116,
                        "consecutive_successful_landings": 103,
                        "successful_landings": 564,
                        "failed_landings": 27,
                        "attempted_landings": 590,
                        "successful_landings_spacecraft": 58,
                        "failed_landings_spacecraft": 3,
                        "attempted_landings_spacecraft": 61,
                        "successful_landings_payload": 0,
                        "failed_landings_payload": 0,
                        "attempted_landings_payload": 0,
                        "info_url": "https://www.spacex.com/",
                        "wiki_url": "https://en.wikipedia.org/wiki/SpaceX",
                        "social_media_links": []
                    }
                ],
                "info_urls": [],
                "vid_urls": []
            },
            "pad": {
                "id": 80,
                "url": "https://lldev.thespacedevs.com/2.3.0/pads/80/",
                "active": true,
                "agencies": [
                    {
                        "response_mode": "normal",
                        "id": 121,
                        "url": "https://lldev.thespacedevs.com/2.3.0/agencies/121/",
                        "name": "SpaceX",
                        "abbrev": "SpX",
                        "type": {
                            "id": 3,
                            "name": "Commercial"
                        },
                        "featured": true,
                        "country": [
                            {
                                "id": 2,
                                "name": "United States of America",
                                "alpha_2_code": "US",
                                "alpha_3_code": "USA",
                                "nationality_name": "American",
                                "nationality_name_composed": "Americano"
                            }
                        ],
                        "description": "Space Exploration Technologies Corp., known as SpaceX, is an American aerospace manufacturer and space transport services company headquartered in Hawthorne, California. It was founded in 2002 by entrepreneur Elon Musk with the goal of reducing space transportation costs and enabling the colonization of Mars. SpaceX operates from many pads, on the East Coast of the US they operate from SLC-40 at Cape Canaveral Space Force Station and historic LC-39A at Kennedy Space Center. They also operate from SLC-4E at Vandenberg Space Force Base, California, usually for polar launches. Another launch site is being developed at Boca Chica, Texas.",
                        "administrator": "CEO: Elon Musk",
                        "founding_year": 2002,
                        "launchers": "Falcon | Starship",
                        "spacecraft": "Dragon",
                        "parent": null,
                        "image": {
                            "id": 29,
                            "name": "[AUTO] SpaceX - image",
                            "image_url": "https://thespacedevs-dev.nyc3.digitaloceanspaces.com/media/images/spacex_image_20190207032501.jpeg",
                            "thumbnail_url": "https://thespacedevs-dev.nyc3.digitaloceanspaces.com/media/images/255bauto255d__image_thumbnail_20240305184704.jpeg",
                            "credit": null,
                            "license": {
                                "id": 1,
                                "name": "Unknown",
                                "priority": 9,
                                "link": null
                            },
                            "single_use": true,
                            "variants": []
                        },
                        "logo": {
                            "id": 186,
                            "name": "[AUTO] SpaceX - logo",
                            "image_url": "https://thespacedevs-dev.nyc3.digitaloceanspaces.com/media/images/spacex_logo_20220826094919.png",
                            "thumbnail_url": "https://thespacedevs-dev.nyc3.digitaloceanspaces.com/media/images/255bauto255d__image_thumbnail_20240305185138.png",
                            "credit": null,
                            "license": {
                                "id": 1,
                                "name": "Unknown",
                                "priority": 9,
                                "link": null
                            },
                            "single_use": true,
                            "variants": []
                        },
                        "social_logo": {
                            "id": 94,
                            "name": "[AUTO] SpaceX - social_logo",
                            "image_url": "https://thespacedevs-dev.nyc3.digitaloceanspaces.com/media/images/spacex_nation_20230531064544.jpg",
                            "thumbnail_url": "https://thespacedevs-dev.nyc3.digitaloceanspaces.com/media/images/255bauto255d__image_thumbnail_20240305184848.jpeg",
                            "credit": null,
                            "license": {
                                "id": 1,
                                "name": "Unknown",
                                "priority": 9,
                                "link": null
                            },
                            "single_use": true,
                            "variants": []
                        }
                    }
                ],
                "name": "Space Launch Complex 40",
                "image": {
                    "id": 2113,
                    "name": "F9 liftoff from SLC-40 (SES-24)",
                    "image_url": "https://thespacedevs-dev.nyc3.digitaloceanspaces.com/media/images/f9_liftoff_from_image_20240621050513.jpeg",
                    "thumbnail_url": "https://thespacedevs-dev.nyc3.digitaloceanspaces.com/media/images/f9_liftoff_from_image_thumbnail_20240621050514.jpeg",
                    "credit": "SpaceX",
                    "license": {
                        "id": 5,
                        "name": "CC BY-NC 2.0",
                        "priority": 1,
                        "link": "https://creativecommons.org/licenses/by-nc/2.0/"
                    },
                    "single_use": false,
                    "variants": []
                },
                "description": "",
                "info_url": null,
                "wiki_url": "https://en.wikipedia.org/wiki/Cape_Canaveral_Air_Force_Station_Space_Launch_Complex_40",
                "map_url": "https://www.google.com/maps?q=28.56194122,-80.57735736",
                "latitude": 28.56194122,
                "longitude": -80.57735736,
                "country": {
                    "id": 2,
                    "name": "United States of America",
                    "alpha_2_code": "US",
                    "alpha_3_code": "USA",
                    "nationality_name": "American",
                    "nationality_name_composed": "Americano"
                },
                "map_image": "https://thespacedevs-dev.nyc3.digitaloceanspaces.com/media/map_images/pad_80_20200803143323.jpg",
                "total_launch_count": 354,
                "orbital_launch_attempt_count": 354,
                "fastest_turnaround": "P2DT2H44M55S",
                "location": {
                    "response_mode": "normal",
                    "id": 12,
                    "url": "https://lldev.thespacedevs.com/2.3.0/locations/12/",
                    "name": "Cape Canaveral SFS, FL, USA",
                    "celestial_body": {
                        "response_mode": "normal",
                        "id": 1,
                        "name": "Earth",
                        "type": {
                            "id": 1,
                            "name": "Planet"
                        },
                        "diameter": 12742000.0,
                        "mass": 5.972168e+24,
                        "gravity": 9.80655,
                        "length_of_day": "1 00:00:00",
                        "atmosphere": true,
                        "image": {
                            "id": 2040,
                            "name": "Earth (Apollo 17)",
                            "image_url": "https://thespacedevs-dev.nyc3.digitaloceanspaces.com/media/images/earth_2528apol_image_20240402194304.jpeg",
                            "thumbnail_url": "https://thespacedevs-dev.nyc3.digitaloceanspaces.com/media/images/earth_2528apol_image_thumbnail_20240402194305.jpeg",
                            "credit": "NASA",
                            "license": {
                                "id": 4,
                                "name": "NASA Image and Media Guidelines",
                                "priority": 0,
                                "link": "https://www.nasa.gov/nasa-brand-center/images-and-media/"
                            },
                            "single_use": true,
                            "variants": []
                        },
                        "description": "Earth is the third planet from the Sun and the only astronomical object known to harbor life.",
                        "wiki_url": "https://en.wikipedia.org/wiki/Earth",
                        "total_attempted_launches": 7388,
                        "successful_launches": 6838,
                        "failed_launches": 550,
                        "total_attempted_landings": 1243,
                        "successful_landings": 1196,
                        "failed_landings": 47
                    },
                    "active": true,
                    "country": {
                        "id": 2,
                        "name": "United States of America",
                        "alpha_2_code": "US",
                        "alpha_3_code": "USA",
                        "nationality_name": "American",
                        "nationality_name_composed": "Americano"
                    },
                    "description": "Cape Canaveral Space Force Station (CCSFS) is an installation of the United States Space Force's Space Launch Delta 45, located on Cape Canaveral in Brevard County, Florida.",
                    "image": {
                        "id": 2200,
                        "name": "Cape Canaveral & KSC seen from orbit (STS-43)",
                        "image_url": "https://thespacedevs-dev.nyc3.digitaloceanspaces.com/media/images/cape_canaveral__image_20240918151615.jpg",
                        "thumbnail_url": "https://thespacedevs-dev.nyc3.digitaloceanspaces.com/media/images/cape_canaveral__image_thumbnail_20240918151616.jpeg",
                        "credit": "NASA",
                        "license": {
                            "id": 4,
                            "name": "NASA Image and Media Guidelines",
                            "priority": 0,
                            "link": "https://www.nasa.gov/nasa-brand-center/images-and-media/"
                        },
                        "single_use": true,
                        "variants": []
                    },
                    "map_image": "https://thespacedevs-dev.nyc3.digitaloceanspaces.com/media/map_images/location_12_20200803142519.jpg",
                    "longitude": -80.577778,
                    "latitude": 28.488889,
                    "timezone_name": "America/New_York",
                    "total_launch_count": 1076,
                    "total_landing_count": 70
                }
            },
            "webcast_live": false,
            "program": [
                {
                    "response_mode": "normal",
                    "id": 25,
                    "url": "https://lldev.thespacedevs.com/2.3.0/programs/25/",
                    "name": "Starlink",
                    "image": {
                        "id": 1890,
                        "name": "Starlink stack in space before deployment",
                        "image_url": "https://thespacedevs-dev.nyc3.digitaloceanspaces.com/media/images/starlink_program_20231228154508.jpeg",
                        "thumbnail_url": "https://thespacedevs-dev.nyc3.digitaloceanspaces.com/media/images/255bauto255d__image_thumbnail_20240305194044.jpeg",
                        "credit": "SpaceX",
                        "license": {
                            "id": 5,
                            "name": "CC BY-NC 2.0",
                            "priority": 1,
                            "link": "https://creativecommons.org/licenses/by-nc/2.0/"
                        },
                        "single_use": true,
                        "variants": []
                    },
                    "info_url": "https://starlink.com",
                    "wiki_url": "https://en.wikipedia.org/wiki/Starlink",
                    "description": "Starlink is a satellite internet constellation operated by American aerospace company SpaceX",
                    "agencies": [
                        {
                            "response_mode": "list",
                            "id": 121,
                            "url": "https://lldev.thespacedevs.com/2.3.0/agencies/121/",
                            "name": "SpaceX",
                            "abbrev": "SpX",
                            "type": {
                                "id": 3,
                                "name": "Commercial"
                            }
                        }
                    ],
                    "start_date": "2018-02-22T14:17:00Z",
                    "end_date": null,
                    "mission_patches": [
                        {
                            "id": 7,
                            "name": "Space X Starlink Mission Patch",
                            "priority": 10,
                            "image_url": "https://thespacedevs-dev.nyc3.digitaloceanspaces.com/media/mission_patch_images/space2520x252_mission_patch_20221011205756.png",
                            "agency": {
                                "response_mode": "list",
                                "id": 121,
                                "url": "https://lldev.thespacedevs.com/2.3.0/agencies/121/",
                                "name": "SpaceX",
                                "abbrev": "SpX",
                                "type": {
                                    "id": 3,
                                    "name": "Commercial"
                                }
                            },
                            "response_mode": "normal"
                        }
                    ],
                    "type": {
                        "id": 3,
                        "name": "Communication Constellation"
                    }
                }
            ],
            "orbital_launch_attempt_count": 7186,
            "location_launch_attempt_count": 1080,
            "pad_launch_attempt_count": 357,
            "agency_launch_attempt_count": 625,
            "orbital_launch_attempt_count_year": 10,
            "location_launch_attempt_count_year": 4,
            "pad_launch_attempt_count_year": 3,
            "agency_launch_attempt_count_year": 5
        },
        {
            "id": "20d5676e-111b-40e3-8923-b218c3665ca2",
            "url": "https://lldev.thespacedevs.com/2.3.0/launches/20d5676e-111b-40e3-8923-b218c3665ca2/",
            "name": "GSLV Mk II | IRNSS-1L (NVS-03)",
            "response_mode": "normal",
            "slug": "gslv-mk-ii-irnss-1l-nvs-03",
            "launch_designator": null,
            "status": {
                "id": 2,
                "name": "To Be Determined",
                "abbrev": "TBD",
                "description": "Current date is a placeholder or rough estimation based on unreliable or interpreted sources."
            },
            "last_updated": "2025-11-13T06:04:41Z",
            "net": "2026-01-31T00:00:00Z",
            "net_precision": {
                "id": 7,
                "name": "Month",
                "abbrev": "M",
                "description": "The T-0 is expected in the given month."
            },
            "window_end": "2026-01-31T00:00:00Z",
            "window_start": "2026-01-31T00:00:00Z",
            "image": {
                "id": 1469,
                "name": "[AUTO] GSLV Mk II | IRNSS-1J (NVS-01) - image",
                "image_url": "https://thespacedevs-dev.nyc3.digitaloceanspaces.com/media/images/gslv2520mk252_image_20240101090337.jpg",
                "thumbnail_url": "https://thespacedevs-dev.nyc3.digitaloceanspaces.com/media/images/255bauto255d__image_thumbnail_20240305192851.jpeg",
                "credit": null,
                "license": {
                    "id": 1,
                    "name": "Unknown",
                    "priority": 9,
                    "link": null
                },
                "single_use": true,
                "variants": []
            },
            "infographic": null,
            "probability": null,
            "weather_concerns": null,
            "failreason": "",
            "hashtag": null,
            "launch_service_provider": {
                "response_mode": "list",
                "id": 31,
                "url": "https://lldev.thespacedevs.com/2.3.0/agencies/31/",
                "name": "Indian Space Research Organization",
                "abbrev": "ISRO",
                "type": {
                    "id": 1,
                    "name": "Government"
                }
            },
            "rocket": {
                "id": 8637,
                "configuration": {
                    "response_mode": "list",
                    "id": 168,
                    "url": "https://lldev.thespacedevs.com/2.3.0/launcher_configurations/168/",
                    "name": "GSLV Mk II",
                    "families": [
                        {
                            "response_mode": "list",
                            "id": 84,
                            "name": "GSLV"
                        }
                    ],
                    "full_name": "GSLV Mk. II",
                    "variant": ""
                }
            },
            "mission": {
                "id": 7229,
                "name": "IRNSS-1L (NVS-03)",
                "type": "Navigation",
                "description": "This is a replacement satellite for the Indian Regional Navigation Satellite System. The constellation will provide India with an alternative to GPS and will be used for military and civilian use. Located at a geosynchronous orbit, the system will be operated by the Indian government.",
                "image": null,
                "orbit": {
                    "id": 2,
                    "name": "Geostationary Transfer Orbit",
                    "abbrev": "GTO",
                    "celestial_body": {
                        "response_mode": "list",
                        "id": 1,
                        "name": "Earth"
                    }
                },
                "agencies": [],
                "info_urls": [],
                "vid_urls": []
            },
            "pad": {
                "id": 82,
                "url": "https://lldev.thespacedevs.com/2.3.0/pads/82/",
                "active": true,
                "agencies": [
                    {
                        "response_mode": "normal",
                        "id": 31,
                        "url": "https://lldev.thespacedevs.com/2.3.0/agencies/31/",
                        "name": "Indian Space Research Organization",
                        "abbrev": "ISRO",
                        "type": {
                            "id": 1,
                            "name": "Government"
                        },
                        "featured": true,
                        "country": [
                            {
                                "id": 9,
                                "name": "India",
                                "alpha_2_code": "IN",
                                "alpha_3_code": "IND",
                                "nationality_name": "Indian",
                                "nationality_name_composed": "Indo"
                            }
                        ],
                        "description": "The Indian Space Research Organisation (ISRO) is the space agency of the Government of India headquartered in the city of Bangalore. Its vision is to \"harness space technology for national development while pursuing space science research and planetary exploration.\"",
                        "administrator": "Chairman: V. Narayanan",
                        "founding_year": 1969,
                        "launchers": "PSLV | GSLV",
                        "spacecraft": "Gaganyaan",
                        "parent": null,
                        "image": {
                            "id": 14,
                            "name": "[AUTO] Indian Space Research Organization - image",
                            "image_url": "https://thespacedevs-dev.nyc3.digitaloceanspaces.com/media/images/indian2520space2520research2520organization_image_20190215225409.jpeg",
                            "thumbnail_url": "https://thespacedevs-dev.nyc3.digitaloceanspaces.com/media/images/255bauto255d__image_thumbnail_20240305184615.jpeg",
                            "credit": null,
                            "license": {
                                "id": 1,
                                "name": "Unknown",
                                "priority": 9,
                                "link": null
                            },
                            "single_use": true,
                            "variants": []
                        },
                        "logo": {
                            "id": 141,
                            "name": "[AUTO] Indian Space Research Organization - logo",
                            "image_url": "https://thespacedevs-dev.nyc3.digitaloceanspaces.com/media/images/indian2520space2520research2520organization_logo_20190215225409.png",
                            "thumbnail_url": "https://thespacedevs-dev.nyc3.digitaloceanspaces.com/media/images/255bauto255d__image_thumbnail_20240305185007.png",
                            "credit": null,
                            "license": {
                                "id": 1,
                                "name": "Unknown",
                                "priority": 9,
                                "link": null
                            },
                            "single_use": true,
                            "variants": []
                        },
                        "social_logo": {
                            "id": 63,
                            "name": "[AUTO] Indian Space Research Organization - social_logo",
                            "image_url": "https://thespacedevs-dev.nyc3.digitaloceanspaces.com/media/images/indian2520space2520research2520organization_nation_20230624125733.jpg",
                            "thumbnail_url": "https://thespacedevs-dev.nyc3.digitaloceanspaces.com/media/images/255bauto255d__image_thumbnail_20240305184805.jpeg",
                            "credit": null,
                            "license": {
                                "id": 1,
                                "name": "Unknown",
                                "priority": 9,
                                "link": null
                            },
                            "single_use": true,
                            "variants": []
                        }
                    }
                ],
                "name": "Satish Dhawan Space Centre Second Launch Pad",
                "image": {
                    "id": 1992,
                    "name": "Second Launch Pad",
                    "image_url": "https://thespacedevs-dev.nyc3.digitaloceanspaces.com/media/images/second_launch_p_image_20240311093204.jpeg",
                    "thumbnail_url": "https://thespacedevs-dev.nyc3.digitaloceanspaces.com/media/images/second_launch_p_image_thumbnail_20240311093204.jpeg",
                    "credit": "Indian Space Research Organisation",
                    "license": {
                        "id": 11,
                        "name": "Government Open Data License - India (GODL)",
                        "priority": 3,
                        "link": "https://data.gov.in/sites/default/files/Gazette_Notification_OGDL.pdf"
                    },
                    "single_use": true,
                    "variants": []
                },
                "description": "The second launch pad was built between 1999 and 2003.  It became functional in 2005 and has since been used for various rockets. This launch pad supports missions by PSLV, GSLV, LVM3 rockets and is even envisioned for India's future crewed spaceflight.",
                "info_url": null,
                "wiki_url": "https://en.wikipedia.org/wiki/Satish_Dhawan_Space_Centre_Second_Launch_Pad",
                "map_url": "https://www.google.com/maps?q=13.7199,80.2304",
                "latitude": 13.7199,
                "longitude": 80.2304,
                "country": {
                    "id": 9,
                    "name": "India",
                    "alpha_2_code": "IN",
                    "alpha_3_code": "IND",
                    "nationality_name": "Indian",
                    "nationality_name_composed": "Indo"
                },
                "map_image": "https://thespacedevs-dev.nyc3.digitaloceanspaces.com/media/map_images/pad_82_20200803143602.jpg",
                "total_launch_count": 32,
                "orbital_launch_attempt_count": 31,
                "fastest_turnaround": "P31DT31M",
                "location": {
                    "response_mode": "normal",
                    "id": 14,
                    "url": "https://lldev.thespacedevs.com/2.3.0/locations/14/",
                    "name": "Satish Dhawan Space Centre, India",
                    "celestial_body": {
                        "response_mode": "normal",
                        "id": 1,
                        "name": "Earth",
                        "type": {
                            "id": 1,
                            "name": "Planet"
                        },
                        "diameter": 12742000.0,
                        "mass": 5.972168e+24,
                        "gravity": 9.80655,
                        "length_of_day": "1 00:00:00",
                        "atmosphere": true,
                        "image": {
                            "id": 2040,
                            "name": "Earth (Apollo 17)",
                            "image_url": "https://thespacedevs-dev.nyc3.digitaloceanspaces.com/media/images/earth_2528apol_image_20240402194304.jpeg",
                            "thumbnail_url": "https://thespacedevs-dev.nyc3.digitaloceanspaces.com/media/images/earth_2528apol_image_thumbnail_20240402194305.jpeg",
                            "credit": "NASA",
                            "license": {
                                "id": 4,
                                "name": "NASA Image and Media Guidelines",
                                "priority": 0,
                                "link": "https://www.nasa.gov/nasa-brand-center/images-and-media/"
                            },
                            "single_use": true,
                            "variants": []
                        },
                        "description": "Earth is the third planet from the Sun and the only astronomical object known to harbor life.",
                        "wiki_url": "https://en.wikipedia.org/wiki/Earth",
                        "total_attempted_launches": 7388,
                        "successful_launches": 6838,
                        "failed_launches": 550,
                        "total_attempted_landings": 1243,
                        "successful_landings": 1196,
                        "failed_landings": 47
                    },
                    "active": true,
                    "country": {
                        "id": 9,
                        "name": "India",
                        "alpha_2_code": "IN",
                        "alpha_3_code": "IND",
                        "nationality_name": "Indian",
                        "nationality_name_composed": "Indo"
                    },
                    "description": "Satish Dhawan Space Centre – SDSC (formerly Sriharikota Range – SHAR),[1] is the primary spaceport of the Indian Space Research Organisation (ISRO), located in Sriharikota, Andhra Pradesh.",
                    "image": {
                        "id": 2212,
                        "name": "Satish Dhawan Space Centre",
                        "image_url": "https://thespacedevs-dev.nyc3.digitaloceanspaces.com/media/images/satish_dhawan_s_image_20240919164153.png",
                        "thumbnail_url": "https://thespacedevs-dev.nyc3.digitaloceanspaces.com/media/images/satish_dhawan_s_image_thumbnail_20240919164154.png",
                        "credit": "ISRO",
                        "license": {
                            "id": 11,
                            "name": "Government Open Data License - India (GODL)",
                            "priority": 3,
                            "link": "https://data.gov.in/sites/default/files/Gazette_Notification_OGDL.pdf"
                        },
                        "single_use": true,
                        "variants": []
                    },
                    "map_image": "https://thespacedevs-dev.nyc3.digitaloceanspaces.com/media/map_images/location_14_20200803142403.jpg",
                    "longitude": 80.23,
                    "latitude": 13.72,
                    "timezone_name": "Asia/Kolkata",
                    "total_launch_count": 102,
                    "total_landing_count": 0
                }
            },
            "webcast_live": false,
            "program": [],
            "orbital_launch_attempt_count": 7186,
            "location_launch_attempt_count": 105,
            "pad_launch_attempt_count": 34,
            "agency_launch_attempt_count": 101,
            "orbital_launch_attempt_count_year": 10,
            "location_launch_attempt_count_year": 3,
            "pad_launch_attempt_count_year": 2,
            "agency_launch_attempt_count_year": 3
        }
    ]
}
*/
