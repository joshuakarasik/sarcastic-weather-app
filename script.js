const sarcasticComments = {
  Clear: "You should be outside right now getting Vitamin D, not looking at this app.",
  Clouds: "Look up for a surprise",
  Rain: "We are still in a drought somehow?",
  Snow: "Get ready for a snowball fight, or you know, don't.",
  Thunderstorm: "Great day for a picnic.",
};

document.getElementById("search-button").addEventListener("click", function () {
  var location = document.getElementById("location-input").value;
  fetchWeatherData(location);
});

async function fetchWeatherData(location) {
  var apiKey = "75a91458aa66a0fe1bce10983ca60a05";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=imperial`;

  try {
    var response = await fetch(apiUrl);
    var data = await response.json();

    if (!response.ok) {
      throw new Error("Weather data not found");
    }
    displayWeatherData(data);
  } catch (error) {
    console.error("Error:", error);
    document.getElementById("weather-display").innerHTML = "Unable to fetch weather data.";
  }
}

function displayWeatherData(data) {
  var weatherDisplay = document.getElementById("weather-display");
  var sarcasticCommentDisplay = document.getElementById("sarcastic-comment"); // New line to get the comment display element

  var weatherCondition = data.weather[0].main;
  var sarcasticComment = sarcasticComments[weatherCondition] || "What a day!";

  weatherDisplay.innerHTML = `${data.main.temp}°F <br>
                              ${data.weather[0].main} <br>
                              ${data.main.humidity}%`;

  sarcasticCommentDisplay.innerHTML = `<em>${sarcasticComment}</em>`; // Update the sarcastic comment display
}
