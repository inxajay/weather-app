const apiKey = "e3c2222a218f1502be6d8bcbd1203da8";

async function getWeather() {
  const city = document.getElementById("cityInput").value;

  if (!city) {
    alert("Please enter a city name");
    return;
  }

  const apiURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(apiURL);
    const data = await response.json();

    if (data.cod !== "200") {
      document.getElementById("weatherResult").innerHTML = "City not found.";
      return;
    }

    // Get forecast entries at 12:00 PM for 4 days
    const dailyForecasts = {};
    data.list.forEach(entry => {
      const date = entry.dt_txt.split(" ")[0];
      const time = entry.dt_txt.split(" ")[1];
      if (time === "12:00:00" && Object.keys(dailyForecasts).length < 4) {
        dailyForecasts[date] = entry;
      }
    });

    // Clear old cards
    const rightSection = document.querySelector(".right-section");
    rightSection.innerHTML = "";

    // Display 4 cards
    Object.values(dailyForecasts).forEach(entry => {
      const date = new Date(entry.dt_txt);
      const day = date.toLocaleDateString("en-US", { weekday: "long" });

      const card = `
        <div class="card">
          <h3>${day}</h3>
          <img src="https://openweathermap.org/img/wn/${entry.weather[0].icon}@2x.png" alt="${entry.weather[0].main}" />
          <p><strong>${Math.round(entry.main.temp)}°C</strong></p>
          <p>${entry.weather[0].description}</p>
        </div>
      `;
      rightSection.innerHTML += card;
    });

    // document.getElementById("weatherResult").innerHTML = `Showing 4-day forecast for <strong>${data.city.name}, ${data.city.country}</strong>`;
const today = data.list[0];
const todayInfo = `
  <p><strong>${data.city.name}, ${data.city.country}</strong></p>
  <p>Temperature: ${Math.round(today.main.temp)}°C</p>
  <p>Weather: ${today.weather[0].main}</p>
  <p>Description: ${today.weather[0].description}</p>
  <p>Humidity: ${today.main.humidity}%</p>
  <p>Wind Speed: ${today.wind.speed} m/s</p>
`;

document.getElementById("weatherResult").innerHTML = todayInfo;



  } catch (error) {
    console.error("Fetch error:", error);
    document.getElementById("weatherResult").innerHTML = "Something went wrong.";
  }
}
