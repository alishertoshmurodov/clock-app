let timezone = ''

const bodyEl = document.querySelector('body');

window.addEventListener('load', function (e) {
    bodyEl.classList.remove('not-loaded');


    fetch(`https://api.ipgeolocation.io/ipgeo?apiKey=30f072f1bd0d4055a9b9d3bf7efc2aa3`)
        .then((response) => response.json())
        .then((data) => {
            timezone = data.time_zone.name
            document.querySelector('.app-container__clock-location #location').textContent = data.city + ', ' + data.country_name;
        })

    fetch(`https://api.ipgeolocation.io/timezone?apiKey=30f072f1bd0d4055a9b9d3bf7efc2aa3&tz=${timezone}`)
        .then((response) => response.json())
        .then((data) => {
            let time = data.date_time.slice(11, 16);
            let hours = time.slice(0, 2);

            // greeting change

            if (Number(hours) > 4 && Number(hours) < 12) {
                document.querySelector('.app-container__clock-heading span:nth-child(2)').textContent = 'good morning';
            } else if (Number(hours) > 11 && Number(hours) < 18) {
                document.querySelector('.app-container__clock-heading span:nth-child(2)').textContent = 'good afternoon';
            } else {
                document.querySelector('.app-container__clock-heading span:nth-child(2)').textContent = 'good evening';
            }

            // background change

            if (Number(hours) > 4 && Number(hours) < 18) {
                document.querySelector('.app-container__clock-heading span:first-child').style = 'width: 24px; height: 24px; background-image: url(assets/images/icon-sun.svg); background-repeat: no-repeat; display: inline-block; margin-inline: 10px';
                document.querySelector('.overlay').style = 'background-image: url(assets/images/bg-image-daytime.jpg)';
                document.querySelector('.more-background').classList.remove('more-background-night');
            } else {
                document.querySelector('.app-container__clock-heading span:first-child').style = 'width: 24px; height: 24px; background-image: url(assets/images/icon-moon.svg); background-repeat: no-repeat; display: inline-block; margin-inline: 10px';
                document.querySelector('.overlay').style = 'background-image: url(assets/images/bg-image-nighttime.jpg)';
                document.querySelector('.more-background').classList.add('more-background-night');
            }

            // More section
            const dayOfYear = date =>
                Math.floor((date - new Date(date.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
            let dayYear = dayOfYear(new Date())
            console.log(data);
            document.querySelector('#timezone').textContent = data.timezone;
            document.querySelector('#yearDay').textContent = dayYear;
            document.querySelector('#weekDay').textContent = data.date_time_txt.split(',')[0];
            document.querySelector('#weekNumber').textContent = data.week;

            ip = data.client_ip
            document.querySelector('.app-container__clock-time h1').textContent = time;
        });

    fetch('https://api.quotable.io/random/')
        .then((response) => response.json())
        .then((data) => {
            document.querySelector('#quote-text q').textContent = data.content;
            document.querySelector('#quote-author').textContent = data.author;
        })

    const refreshBtnEl = document.querySelector('.refresh-btn');
    refreshBtnEl.addEventListener('click', function (e) {
        fetch('https://api.quotable.io/random/')
            .then((response) => response.json())
            .then((data) => {
                document.querySelector('#quote-text q').textContent = data.content;
                document.querySelector('#quote-author').textContent = data.author;
            })
    });


    const arrowBtnEl = document.querySelector('.app-container__button');
    const moreSection = document.querySelector('.app-container__clock-more');
    const quoteSection = document.querySelector('.app-container__quote');
    const buttonArrowEl = document.querySelector('.button-arrow');

    arrowBtnEl.addEventListener('click', function (e) {

        if (moreSection.classList.contains('hidden')) {
            moreSection.classList.remove('hidden');
            moreSection.classList.add('expanded');
            quoteSection.classList.add('hidden');
            buttonArrowEl.classList.add('arrow-rotate');
            arrowBtnEl.querySelector('span').textContent = 'less';
        } else {
            moreSection.classList.remove('expanded');
            moreSection.classList.add('hidden');
            quoteSection.classList.remove('hidden');
            buttonArrowEl.classList.remove('arrow-rotate');
            arrowBtnEl.querySelector('span').textContent = 'more';
        }



    });
});

