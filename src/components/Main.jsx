import React, { Component } from "react";
import Logo from "../logo.png";
import { Loader } from "./spinner";
class Weather extends Component {
  state = {
    temp: "~",
    humidity: "~",
    wind_speed: "~",
    description: "~",
    icon: `https://openweathermap.org/img/wn/10d@2x.png`,
    wind_icon: "wi-wind-beaufort-0",
    location: "~",
    city: "",
    country: "",
    isLoading: false,
  };
  showWeather = () => {
    const API_KEY = 'YOUR_API_KEY_HERE';
    this.setState({ isLoading: true });
    let city = document.getElementById("city").value;
    let country = document.getElementById("country").value;
    const url = `https://openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric`;
    if (city === "" || country === "") {
      alert("Please enter a valid Location :(");
    } else {
      fetch(url)
        .then((req) => req.json())
        .then((res) => {
          const Temp = res.main.temp;
          const humidity = res.main.humidity;
          const windSpeed = (res.wind.speed * 3.6).toFixed(1);
          const weatherDescription = res.weather[0].main.toLowerCase();
          const wind_speed = Math.round(res.wind.speed * 3.6);
          this.setState({
            temp: Temp,
            humidity: humidity,
            wind_speed: windSpeed,
            description: weatherDescription,
            wind_icon: `wi-wind-beaufort-${wind_speed}`,
            icon: `https://openweathermap.org/img/wn/${res.weather[0].icon}@2x.png`,
            location: `${city}, ${country}`,
            isLoading: false,
          });
          this.clearInput();
        })
        .catch((error) => {
          alert(
            "Something went wrong :) please check your details and try again"
          );
          this.clearInput("clear_both");
          this.setState({isLoading: false});
        });
    }
  };
  clearInput = (item) => {
    if (item === "city") {
      document.getElementById("city").value = "";
    } else if (item === "country") {
      document.getElementById("country").value = "";
    } else {
      document.getElementById("city").value = "";
      document.getElementById("country").value = "";
    }
  };

  render() {
    return (
      <>
        <div className="brand">
          <img src={Logo} alt="brand_icon" />
        </div>
        <header>
          <div className="input-fields">
            <input
              type="text"
              id="city"
              required
              title="Enter your city name"
              placeholder="City"
            />
            <label htmlFor="city">City</label>
            <i
              className="fa fa-times clear-btn"
              onClick={this.clearInput.bind(this, "city")}
            ></i>
          </div>
          <div className="input-fields">
            <input
              type="text"
              id="country"
              required
              title="Enter your country name"
              placeholder="Country"
            />
            <label htmlFor="country">Country</label>
            <i
              className="fa fa-times clear-btn"
              onClick={this.clearInput.bind(this, "country")}
            ></i>
          </div>
          <button
            className="weather-btn"
            type="submit"
            onClick={this.showWeather}
          >
            Show Weather
          </button>
        </header>

        {this.state.isLoading ? <Loader /> : null}
        <div className="weather-details">
          <div className="location">{this.state.location}</div>
          <div className="weather-icon">
            <img src={this.state.icon} alt="Weather Icon" />
          </div>
          <div className="temp">
            <div className="temp-icon">
              <i className="wi wi-thermometer"></i>
            </div>
            <div className="temp-value" style={{ color: "var(--theme)" }}>
              {this.state.temp} &#8451;
            </div>
          </div>

          <div className="wind-speed-humidity">
            <div className="wind-speed">
              <i className={`wi ${this.state.wind_icon} wind-speed-icon`}></i>
              <div
                className="wind-speed-value"
                style={{ color: "var(--theme)" }}
              >
                {this.state.wind_speed} km/h
              </div>
            </div>
            <div className="humidity">
              <i className="wi wi-humidity"></i>
              <div className="humidity-value" style={{ color: "var(--theme)" }}>
                {this.state.humidity}%
              </div>
            </div>
          </div>
          <div
            className="weather-description"
            style={{ color: "var(--theme)" }}
          >
            {this.state.description}
          </div>
        </div>
        <footer>
          <span>
            Made with <i className="fa fa-heart fab"></i> by Himanshu Yadav
          </span>
        </footer>
      </>
    );
  }
}
export default Weather;
