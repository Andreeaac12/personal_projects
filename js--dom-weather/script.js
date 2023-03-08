const city = document.querySelector("[data-city]");
const buttonSearch = document.querySelector("[data-search]");
const outputSelection = document.querySelector("[data-result]");

buttonSearch.addEventListener("click", (e) => {
  e.preventDefault();

  const userInput = city.value;
  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${userInput}?unitGroup=metric&key=GZT3CHGJ3J7X34V7AWGUVJV3N&contentType=json`;
  console.log(url);

  outputSelection.textContent = "";
  city.value = "";
  fetch(url)
    .then((response) => response.json())
    .then((data) => displayWeatherResult(data));
});

function displayWeatherResult(data) {
  const template = document.querySelector("#weather");
  const cloneTemplate = template.content.cloneNode(true);

  const temp = cloneTemplate.querySelector("[data-temp]");
  const description = cloneTemplate.querySelector("[data-description]");
  const conditions = cloneTemplate.querySelector("[data-conditions]");

  // const tableHead = cloneTemplate.querySelector("[data-thead]");
  // const tableBody = cloneTemplate.querySelector("[data-tbody]");

  temp.textContent = `🟢 Today is ${data.currentConditions.temp} °C`;
  description.textContent = `🟢 ${data.description}`;
  conditions.textContent = `🟢 Sky is ${data.currentConditions.conditions}`;

  // for (let day of data.days) {
  //   const th = document.createElement("th");
  //   const td = document.createElement("td");

  //   th.textContent = day.datetime;
  //   td.textContent = day.temp;

  //   tableHead.appendChild(th);
  //   tableBody.appendChild(td);
  // }

  outputSelection.appendChild(cloneTemplate);
}
