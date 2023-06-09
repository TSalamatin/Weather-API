# Weather-API
Week 6, Server Side APIs

In this assigment, we were tasked to pull data from the OpenWeather API and display the data on the screen.
When a user types in a city, and presses the search button, the script will ping the API using the the city name and display today's data in the large field. Then, it will take the coordinates from that data and search up the forecast for the next 5 days, this is because the forecast part of the API does not work with city names. When a city is successfully identified and displayed, it will store that data into local storage and generate a button on the left hand side of the screen with the city name. If any of those buttons with city names are pressed, the script will pull the old data from local storage and display it on the screen.
