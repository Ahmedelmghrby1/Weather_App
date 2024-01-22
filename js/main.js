var days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const today = document.getElementById("today");
const dayDate = document.getElementById("dayDate");
const tomorrow = document.getElementById("tomorrow");
const forecast_head = document.getElementById("forecast_head");
const tomorrow2 = document.getElementById("tomorrow2");
const forecast_head2 = document.getElementById("forecast_head2");
const search = document.getElementById("search");
const submit = document.getElementById("submit");



async function api(city) {
  try {
    let http = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=abfd019c8d0d4ac6851114721241301&q=${city}&days=3`
  );

  if(http.ok && http.status != 400){
    let data = await http.json();
    console.log(data);
    displayCity(data.location, data.current);
  displayAnother(data.forecast.forecastday);
  } else {
    console.log("somthing wrong");
  }


} catch (error) {
  console.log("error fetching weather data:", error);
}

}

api("cairo");

function displayCity(location, current) {
  const date = new Date();

  dayDate.innerHTML = `<div class="day"> <p>${days[date.getDay()]}</p></div>
  <div class="date"><p>${date.getDate()} ${
    monthNames[date.getMonth()]
  }</p> </div>`;

  today.innerHTML = `<div class="city">
  <p>${location.name}</p>
  </div>
  <div class="degree d-flex align-content-center justify-content-center">
   <div class="temp"> <h2> ${current.temp_c}<sup>o</sup>C </h2></div>
    <div class="icon"> <img src=" ${current.condition.icon}" width='90'> </div>
   </div>
   <div class="status text-center"> <p> ${current.condition.text}</p> </div>
   <span class='pe-2'><i class="fa-solid fa-umbrella"></i> ${current.cloud}</span>
   <span class='pe-2'> <i class="fa-solid fa-wind "></i> ${current.wind_kph} </span>
   <span class='pe-2'> <i class="fa-regular fa-compass "></i> ${current.wind_dir} </span>
  `;
}

function displayAnother(forecast) {
  tomorrow.innerHTML = `
  <div class="degree  d-flex align-content-center justify-content-center flex-column">
  <div class="icon"> <img src=" ${forecast[1].day.condition.icon}" width='48'> </div>
   <div class="temp my-3"> <h5> ${forecast[1].day.maxtemp_c}<sup>o</sup>C </h5> <p>${forecast[1].day.mintemp_c}<sup>o</sup>C </p></div>

   </div>
   <div class="status text-center"> <p> ${forecast[1].day.condition.text}</p> </div>`;
  forecast_head.innerHTML = `<div class="day">${
    days[new Date(forecast[1].date.replace(" ", "T")).getDay()]
  }</div>`;

  tomorrow2.innerHTML = `
  <div class="degree  d-flex align-content-center justify-content-center flex-column">
  <div class="icon"> <img src=" ${forecast[2].day.condition.icon}" alt="" width='48'> </div>
   <div class="temp my-3"><h5> ${forecast[2].day.maxtemp_c}<sup>o</sup>C </h5> <p>${forecast[2].day.mintemp_c}<sup>o</sup>C </p></div>
   
   </div>
   <div class="status text-center"> <p> ${forecast[2].day.condition.text}</p> </div>`;
  forecast_head2.innerHTML = `<div class="day">${
    days[new Date(forecast[2].date.replace(" ", "T")).getDay()]
  }</div>`;
}

search.addEventListener("keyup", function () {
  api(search.value);
});
submit.addEventListener("click", function () {
  api(search.value);
});


