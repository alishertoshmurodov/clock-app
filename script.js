let ip = '';

const bodyEl = document.querySelector('body');

window.addEventListener('load', function (e) {
    bodyEl.classList.remove('not-loaded');

    fetch('http://worldtimeapi.org/api/ip')
        .then((response) => response.json())
        .then((data) => {
            let time = data.datetime.slice(11, 16);
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

            document.querySelector('#timezone').textContent = data.timezone;
            document.querySelector('#yearDay').textContent = data.day_of_year;
            document.querySelector('#weekDay').textContent = data.day_of_week;
            document.querySelector('#weekNumber').textContent = data.week_number;

            ip = data.client_ip
            document.querySelector('.app-container__clock-time h1').textContent = time;
        });

    fetch(`https://api.ipgeolocation.io/ipgeo?apiKey=30f072f1bd0d4055a9b9d3bf7efc2aa3&ip=${ip}`)
        .then((response) => response.json())
        .then((data) => {
            document.querySelector('.app-container__clock-location #location').textContent = data.city + ', ' + data.country_name;
        })

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

