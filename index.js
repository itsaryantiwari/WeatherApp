const wrapper = document.querySelector(".wrapper"),
  inputpart = document.querySelector(".input-section"),
  infotext = inputpart.querySelector(".info-text"),
  inputField = inputpart.querySelector("input"),
  weatherPart = wrapper.querySelector(".weather-part"),
  wIcon = weatherPart.querySelector("img"),
  arrowBack = wrapper.querySelector(".header i");
let api;

inputField.addEventListener("keyup", (e) => {
  if (e.key == "Enter" && inputField.value != "") {
    RequestApi(inputField.value);
  }
});
function RequestApi(city) {
  //Api key
  api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=71859fd383ce6a6ea4e59cafa06f6a37`;
  featchDate();
}
function featchDate() {
  infotext.innerText = "Getting Weather details...";
  infotext.classList.add("pending");
  fetch(api)
    .then((res) => res.json())
    .then((result) => weatherDetails(result))
    .catch(() => {
      infotext.innerText = "something went wrong";
      infotext.classList.replace("pending", "error");
    });
}

function weatherDetails(info) {
  console.log(info);
  if (info.cod == "404") {
    infotext.classList.replace("pending", "error");
    console.log(`not entry `);
    infotext.innerText = `${inputField.value} is't a valid city name`;
  } else {
    console.log(info);

    const city = info.name;
    const country = info.sys.country;
    const { description, id } = info.weather[0];
    const { temp, feels_like, humidity } = info.main;

    if (id == 800) {
      wIcon.src = "icons/clear.svg";
    } else if (id >= 200 && id <= 232) {
      wIcon.src = "icons/storm.svg";
    } else if (id >= 600 && id <= 622) {
      wIcon.src = "icons/snow.svg";
    } else if (id >= 701 && id <= 781) {
      wIcon.src = "icons/haze.svg";
    } else if (id >= 801 && id <= 804) {
      wIcon.src = "icons/cloud.svg";
    } else if ((id >= 500 && id <= 531) || (id >= 300 && id <= 321)) {
      wIcon.src = "icons/rain.svg";
    }

    weatherPart.querySelector(".temp .numb").innerText = Math.floor(temp);

    weatherPart.querySelector(".weather").innerText = description;

    weatherPart.querySelector(
      ".location span"
    ).innerText = `${city}, ${country}`;
    console.log(wrapper);
    weatherPart.querySelector(".temp .num-2").innerText =
      Math.floor(feels_like);
    weatherPart.querySelector(".humidity span").innerText = `${humidity}%`;
    infotext.classList.remove("pending", "error");
    infotext.innerText = "";
    inputField.value = "";
    wrapper.classList.add("active");
    console.log(wrapper + "is the");
    console.log(wrapper);
  }
}

arrowBack.addEventListener("click", () => {
  wrapper.classList.remove("active");
});
