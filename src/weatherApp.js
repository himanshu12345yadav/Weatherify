import React, { Component } from 'react';
class Weather extends Component {
    state = {
        temp: '~',
        humidity: '~',
        wind_speed: '~',
        description: '~',
        icon: 'wi-sunrise',
        wind_icon: 'wi-wind-beaufort-0',
        location: '~',
        city: '',
        country: '',
    };
    showWeather = () => {
        const API_KEY = 'YOUR_API_KEY';
        let city = document.getElementById('city').value;
        let country = document.getElementById('country').value;
        const url = `https://openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric`;
        if (city === '' || country === '') {
            alert('Please enter a valid Location :(');
        } else {
            fetch(url)
                .then((req) => req.json())
                .then((res) => {
                    const Temp = res.main.temp;
                    const humidity = res.main.humidity;
                    const windSpeed = res.wind.speed;
                    const weatherDescription = res.weather[0].main.toLowerCase();
                    const wind_speed = Math.round(res.wind.speed);
                    if (weatherDescription === 'haze') {
                        this.setState({ icon: 'wi-day-haze' });
                    } else if (weatherDescription === 'clouds') {
                        this.setState({ icon: 'wi-cloudy' });
                    } else if (weatherDescription === 'clear') {
                        this.setState({ icon: 'wi-night-clear' });
                    } else {
                        this.setState({ icon: `wi-${weatherDescription}` });
                    }
                    this.setState({ temp: Temp });
                    this.setState({ humidity: humidity });
                    this.setState({ wind_speed: windSpeed });
                    this.setState({ description: weatherDescription });
                    this.setState({
                        wind_icon: `wi-wind-beaufort-${wind_speed}`,
                    });
                    this.setState({ location: `${city}, ${country}` });
                    this.clearInput();
                })
                .catch((error) => {
                    alert(
                        'Something went wrong please check your details and try again, TIP: Try typing your city or country name seprated by space :('
                    );
                    this.clearInput('clear_both');
                });
        }
    };
    clearInput = (item) => {
        if (item === 'city') {
            document.getElementById('city').value = '';
        } else if (item === 'country') {
            document.getElementById('country').value = '';
        } else {
            document.getElementById('city').value = '';
            document.getElementById('country').value = '';
        }
    };

    render() {
        return (
            <>
                <div className="brand">
                    <img
                        src="https://www.airzone.es/wp-content/uploads/2015/11/meteo-ico.png"
                        alt="brand_icon"
                    />
                </div>
                <header className="header">
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
                            onClick={this.clearInput.bind(this, 'city')}
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
                            onClick={this.clearInput.bind(this, 'country')}
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
                <div className="weather-details">
                    <div className="location">{this.state.location}</div>
                    <div className="weather-icon">
                        <i className={`wi ${this.state.icon} weather-icon`}></i>
                    </div>
                    <div className="temp">
                        <div className="temp-icon">
                            <i className="wi wi-thermometer"></i>
                        </div>
                        <div className="temp-value">
                            {this.state.temp} &#8451;
                        </div>
                    </div>

                    <div className="wind-speed-humidity">
                        <div className="wind-speed">
                            <i
                                className={`wi ${this.state.wind_icon} wind-speed-icon`}
                            ></i>
                            <div className="wind-speed-value">
                                {this.state.wind_speed} m/s
                            </div>
                        </div>
                        <div className="humidity">
                            <i className="wi wi-humidity"></i>
                            <div className="humidity-value">
                                {this.state.humidity}%
                            </div>
                        </div>
                    </div>
                    <div className="weather-description">
                        {this.state.description}
                    </div>
                </div>
                <footer>
                    <span>
                        Made with <i className="fa fa-heart fab"></i> by
                        Himanshu Yadav
                    </span>
                </footer>
            </>
        );
    }
}
export default Weather;
