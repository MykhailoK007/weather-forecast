


let key = '5b0c5dc943728ced1ed7765080da31bd';
let arrdays = [];
let day = 1000 * 60 * 60 * 24;
let dataFromInput = [];

document.querySelector('.b-search').onclick = function () {

    try {
        let city_country = document.querySelector('.city_country').value;
        dataFromInput = city_country.split(',');
        if (!city_country) {

            throw new SyntaxError('Value is empty');

            throw new SyntaxError('Enter value')
        }
        if (!city_country.includes(',')) {
            throw new SyntaxError('Wrong value')
        }



        document.querySelector('.weather').innerHTML = '';
        (() => {
            fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${dataFromInput[0]},${dataFromInput[1]}&appid=54731b7086fcc00fab6523b3aec1bf8b`)
                .then(function (resp) { return resp.json() })
                .then(function (data) {

                    let date = new Date(data.list[0].dt_txt);
                    a = data;
                    add_day(data.list);

                })
        })()
    }
    catch (error) {


        document.querySelector('.warning').style.display = 'block';
        setTimeout(() => {
            document.querySelector('.warning').style.display = 'none';
        }, 3000)


        console.error(error)
    }
}
//button click show 5 day
document.querySelector('.last-days-b').onclick = function (e) {
    e.preventDefault();
    let lastdays = document.querySelectorAll('.last-days');
    for (let key of lastdays) {
        key.style.display = 'block';
    }

}
//button click hide last  2 day
document.querySelector('.three-days-b').onclick = function (e) {
    e.preventDefault();
    let lastdays = document.querySelectorAll('.last-days');
    for (let key of lastdays) {

        key.style.display = 'none';
    }
}


// Present time adds one day to get next 4 days the same time
function add_day(daylist) {
    let firstDay = new Date(daylist[0].dt_txt).getTime();

    for (let i = 0; i < daylist.length; i++) {
        let newdate = new Date(daylist[i].dt_txt).getTime();

        if (newdate == firstDay) {
            arrdays.push(daylist[i]);
            createWeatherIcons(daylist[i]);
            firstDay += day;
        }

    }

    let lastdays = document.querySelectorAll('.day');

    lastdays[3].classList.add('last-days');
    lastdays[4].classList.add('last-days');
}


//Create and add days with data
function createWeatherIcons(daylist) {


    let day = document.createElement('div');
    let icon = document.createElement('div');
    let temp = document.createElement('div');
    let img = document.createElement('img');
    let dayNumber = document.createElement('p');


    day.classList.add('day');
    icon.classList.add('icon');

    img.src = `https://openweathermap.org/img/wn/${daylist.weather[0].icon}@2x.png`;
    temp.innerHTML = `${Math.round(daylist.main.temp - 273)}&deg`;
    dayNumber.innerHTML = getDayAndMonth(daylist.dt_txt);

    document.querySelector('.weather').append(day);
    day.append(icon);
    icon.append(img)
    day.append(temp);
    day.append(dayNumber)


}
// Render Day and Month
function getDayAndMonth(data) {
    let day = new Date(data);
    let dayNumber = day.getDate();
    let dayMonth = `${dayNumber} `;
    switch (day.getMonth() + 1) {
        case 1:
            dayMonth += `January`;
            break;
        case 2:
            dayMonth += 'February';
            break;
        case 3:
            dayMonth += 'March';
            break;
        case 4:
            dayMonth += 'April';
            break;
        case 5:
            dayMonth += 'May';
            break;
        case 6:
            dayMonth += 'June';
            break;
        case 7:
            dayMonth += 'July';
            break;
        case 8:
            dayMonth += 'August';
            break;
        case 9:
            dayMonth += 'September';
            break;
        case 10:
            dayMonth += 'October';
            break;
        case 11:
            dayMonth += 'November';
            break;
        case 12:
            dayMonth += 'December';
            break;
    }

    return dayMonth;
}




