import React, { Component } from 'react';
import Logo from '../logo.png';
import Loader from './spinner';
import weatherIcons from '../assets/iconsMapping.json';
import ErrorModal from './errorModal';
import Callout from './callout';
import beautifulNight from '../assets/beautifulNight.png';
import hot from '../assets/hot.png';
import rainy from '../assets/rainy.png';

class Weather extends Component {
    constructor(props) {
        super(props);
        this.closeModal = this.closeModal.bind(this);
        this.closeCallout = this.closeCallout.bind(this);
        this.ImageCache = [beautifulNight, hot, rainy];
        this.ImageCache.forEach((image) => {
            new Image().src = image;
        });
    }
    closeModal = () => {
        this.setState({ isErrorOccured: false });
    };
    closeCallout = () => {
        this.setState({
            isCallout: false,
        });
    };
    state = {
        temp: '',
        min_temp: '',
        max_temp: '',
        feels_like: '',
        description: '',
        icon: ``,
        location: '',
        date: '',
        city: '',
        country: '',
        isLoading: false,
        isCallout: true,
        errorCause: '',
        isErrorOccured: false,
    };
    componentDidMount = () => {
        let inputField = document.getElementById('city');
        inputField.addEventListener('keyup', (event) => {
            if (event.code === 'Enter' || event.key === 'Enter') {
                event.preventDefault();
                event.stopPropagation();
                this.showWeather();
                inputField.blur();
            }
        });
    };
    showWeather = () => {
        const API_KEY = 'YOUR_API_KEY_HERE';
        let city = document.getElementById('city').value;
        const url = `https://openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
        if (city === '') {
            this.setState({
                isErrorOccured: true,
                errorCause: 'emptyCountry',
            });
        } else {
            this.setState({ isLoading: true });
            fetch(url)
                .then((req) => req.json())
                .then((res) => {
                    var prefix = 'wi wi-';
                    var code = res.weather[0].id;
                    var icon = weatherIcons[code].icon;
                    if (
                        !(code > 699 && code < 800) &&
                        !(code > 899 && code < 1000)
                    ) {
                        icon = 'day-' + icon;
                    }
                    icon = prefix + icon;
                    const Temp = Math.round(res.main.temp);
                    const min_temp = Math.round(res.main.temp_min);
                    const max_temp = Math.round(res.main.temp_max);
                    const feels_like = Math.round(res.main.feels_like);
                    const humidity = res.main.humidity;
                    const weatherDescription = res.weather[0].main.toLowerCase();
                    const windSpeed = Math.round(res.wind.speed * 3.6);
                    this.setState({
                        temp: Temp,
                        min_temp: min_temp,
                        max_temp: max_temp,
                        feels_like: feels_like,
                        humidity: humidity,
                        wind_speed: windSpeed,
                        description: weatherDescription,
                        icon: `${icon}`,
                        isLoading: false,
                        date: this.setDate(),
                    });
                    res.sys.country === undefined
                        ? this.setState({ location: `${city}` })
                        : this.setState({
                              location: `${city}, ${res.sys.country}`,
                          });
                    this.clearInput();
                    this.handleCover();
                    this.setDate();
                    if (document.querySelectorAll('.hidden')) {
                        document.querySelectorAll('.hidden').forEach((item) => {
                            item.classList.remove('hidden');
                        });
                    }
                })
                .catch(() => {
                    this.setState({
                        isErrorOccured: true,
                        errorCause: 'wrongCountry',
                    });
                    this.clearInput();
                    this.setState({ isLoading: false });
                });
        }
    };
    clearInput = () => {
        document.getElementById('city').value = '';
    };
    handleCover = () => {
        let active = document.body.classList[0];
        if (active !== undefined) {
            document.body.classList.remove(active);
        }
        if (this.state.description === 'haze') {
            document.body.classList.add('cover--hot');
        } else if (
            this.state.description === 'rain' ||
            this.state.description === 'clouds'
        ) {
            document.body.classList.add('cover--rainy');
        } else if (this.state.description === 'clear') {
            document.body.classList.add('cover--beautifulNight');
        }
    };
    setDate = () => {
        let date = new Date();
        const options = {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
        };
        return date.toLocaleDateString('en-US', options);
    };
    render() {
        return (
            <>
                <div className="brand">
                    <img src={Logo} alt="brand_icon" />
                    <div className="search">
                        <form
                            action="/"
                            autoComplete="off"
                            onSubmit={(event) => {
                                event.preventDefault();
                                event.stopPropagation();
                            }}
                        >
                            <input
                                type="text"
                                id="city"
                                required
                                className="search-input"
                                placeholder="City Name"
                                onFocus={this.closeCallout}
                            />
                            <div className="search-icon-wrapper">
                                <span className="material-icons">search</span>
                            </div>
                        </form>
                    </div>
                    {this.state.isCallout ? (
                        <Callout closeCallout={this.closeCallout} />
                    ) : null}
                </div>
                {this.state.isLoading ? <Loader /> : null}
                <div className="weather-icon">
                    <i className={`${this.state.icon}`} alt="Weather Icon"></i>
                    <div className="feels-like hidden">
                        feels like {this.state.feels_like}{' '}
                        <sup className="hidden">&deg;</sup>{' '}
                    </div>
                    <div className="wind-speed">
                        <i
                            className={`hidden wind-speed-icon wi wi-sandstorm`}
                        ></i>
                        {this.state.wind_speed}{' '}
                        <span className="hidden units">km/h</span>
                    </div>
                    <div className="humidity">
                        <i
                            className={`hidden humidity-icon wi wi-humidity`}
                        ></i>
                        {this.state.humidity}{' '}
                        <span className="hidden units">%</span>
                    </div>
                </div>
                <div className="weather-details">
                    <div className="main-info">
                        <div className="location">{this.state.location}</div>
                        <div className="date">{this.state.date}</div>
                        <div className="weather-description">
                            {this.state.description}
                        </div>
                    </div>
                    <div className="temp">
                        <div className="temp-value">
                            {this.state.temp}{' '}
                            <sup className="small hidden">&#8451;</sup>
                        </div>
                        <div className="additional-temp">
                            <div className="max_temp">
                                <span className="uparrow hidden"></span>
                                <span className="max-temp">
                                    {this.state.max_temp}{' '}
                                    <sup className="hidden">&deg;</sup>
                                </span>
                            </div>
                            <div className="min_temp">
                                <span className="downarrow hidden"></span>
                                <span className="min-temp">
                                    {this.state.min_temp}{' '}
                                    <sup className="hidden">&deg;</sup>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                {this.state.isErrorOccured ? (
                    <ErrorModal
                        closeModal={this.closeModal}
                        errorCause={this.state.errorCause}
                    />
                ) : null}
                <footer>
                    <span>Made with &#9829; by Himanshu Yadav</span>
                </footer>
            </>
        );
    }
}
export default Weather;
