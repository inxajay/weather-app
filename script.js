const apiKey = "e3c2222a218f1502be6d8bcbd1203da8";

async function getWeather() {
  const city = document.getElementById("cityInput").value;

  if (!city) {
    alert("Please enter a city name");
    return;
  }

  const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  const proxyURL = `https://api.allorigins.win/raw?url=${encodeURIComponent(apiURL)}`;

  try {
    const response = await fetch(proxyURL);
    const data = await response.json();

    if (data.cod === "404") {
      document.getElementById("weatherResult").innerHTML = "City not found.";
      return;
    }

    const weatherInfo = `
      <p><strong>${data.name}, ${data.sys.country}</strong></p>
      <p>Temperature: ${data.main.temp}°C</p>
      <p>Weather: ${data.weather[0].main}</p>
      <p>Description: ${data.weather[0].description}</p>
    `;

    document.getElementById("weatherResult").innerHTML = weatherInfo;

  } catch (error) {
    console.error("Fetch error:", error);
    document.getElementById("weatherResult").innerHTML = "Something went wrong.";
  }
}
