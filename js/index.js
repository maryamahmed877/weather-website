
const apiKey = `30af8e917b5f48588d4182513241712`;
const baseUrl = `https://api.weatherapi.com/v1`;
const container = document.getElementById('container');
const input = document.querySelector('input');
let weatherData = {};

function getDate(date) {
    let dateDetails = new Date(date);
    let weekDay = dateDetails.toLocaleString('en-us', { weekday: 'long' })
    let day = dateDetails.toLocaleString('en-us', { day: '2-digit' })
    let month = dateDetails.toLocaleString('en-us', { month: 'long' })
    return { weekDay, day, month };
}
function displayData(arr) {
    let cartona = ``;
    for (let i = 0; i < arr.length; i++) {
        let { weekDay, day, month } = getDate(arr[i].date);
        // console.log(weekDay,day,month);      
        cartona += `<div class="col-md-6 col-lg-4">
                        <div class="card text-white">
                            <div class="d-flex justify-content-between align-items-center fs-3">
                                ${i === 0 ? `
                                <p class='fs-5'>${weekDay}</p>
                                <p class='fs-5'>${day}${month}</p>`
                : `<p class='fs-5'>${weekDay}</p>`}
                                
                            </div>
                            <div class="fs-4">
                                    ${i === 0 ? `<p class="text-start">${weatherData.location.name}</p>` : ``}

                                <div class="d-flex flex-column justify-content-between align-items-center">
                                ${i === 0 ? `
                                    <p class="display-2 fw-bold">${weatherData.current.temp_c}&deg;C</p>
                                    <img src="${weatherData.current.condition.icon}" alt="Weather Logo">`
                : `                 <img class='my-3' src="${arr[i].day.condition.icon}" alt="Weather Logo" />

                                    <p class="display-2 fs-4 fw-bolder">${arr[i].day.maxtemp_c}&deg;C</p>
                                    <p class="display-2 fs-6 fw-medium">${arr[i].day.mintemp_c}&deg;C</p>
                                    `}
                                </div>
                                ${i === 0 ? `
                                    <p class="text-center fs-6 text-warning">${weatherData.current.condition.text}</p>
                                    `
                : `<p class="text-center fs-6 text-warning">${arr[i].day.condition.text}</p>`}
                                
                            </div>
                            <div class="d-flex justify-content-between align-items-center py-2">
                            ${i === 0 ? `
                                <span>
                                    <i class="fa-solid fa-umbrella"></i>
                                    ${arr[0].day.daily_chance_of_rain}%
                                </span>
                                <span>
                                    <i class="fa-solid fa-wind"></i>
                                     ${arr[0].day.maxwind_kph}km/h

                                </span>
                                <span>
                                    <i class="fa-solid fa-compass"></i>
                                    ${weatherData.current.wind_dir}
                                </span>
                                `
                : ``}

                            </div>
                        </div>
                    </div>`
    }
    container.innerHTML = cartona;
}


async function getData(city = 'cairo') {
    if (city.length == 0) { getData() }
    if (city.length < 3) return
    try {
        let response = await fetch(` ${baseUrl}/forecast.json?key=${apiKey}&q=${city}&days=3`);
        response = await response.json();
        weatherData = response;
        displayData(weatherData.forecast.forecastday);
        // console.log(weatherData);
    } catch (error) {
        console.log(error);

    }
}
getData()
input.addEventListener('input', function (e) {
    getData(e.target.value)

})