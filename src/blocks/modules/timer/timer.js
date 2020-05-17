$(document).ready(() => {
  if ($('.timer').length) {
    function updateTimer(type, date, time) {
      // Consider date to deadline
      let now = new Date().getTime();
      let timeleft = date - now;

      let days = Math.floor(timeleft / (1000 * 60 * 60 * 24));
      let hours = Math.floor((timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      let minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));

      if (timeleft >= 0) {
        time.days.text(days);
        time.hours.text(hours);
        time.minutes.text(minutes);
      } else {
        time.days.text(0);
        time.hours.text(0);
        time.minutes.text(0);
      }
    }


    // Get timer blocks
    let timers = $('.timer');

    timers.each((i) => {
        let timer = timers.eq(i);
        let type = timer.data('type');

        // Set date
        let constructorOfDate = `${timerInfo[type].month.eng} ${timerInfo[type].date}, ${timerInfo[type].year} ${timerInfo[type].time}`;
        let countDownDate = new Date(constructorOfDate).getTime();

        let time = {
          days: timer.find('[data-days]'),
          hours: timer.find('[data-hours]'),
          minutes: timer.find('[data-minutes]'),
        };

        // Update timer onload and every 60 seconds
        updateTimer(type, countDownDate, time);
        let myfunc = setInterval(updateTimer, 1000 * 60, type, countDownDate, time);
    })


    let mobileTimers = $('.timer-mobile');

    mobileTimers.each((i) => {
      let mobileTimer = mobileTimers.eq(i);

      type = mobileTimer.data("type");

      // Set date
      let constructorOfDate = `${timerInfo[type].month.eng} ${timerInfo[type].date}, ${timerInfo[type].year} ${timerInfo[type].time}`;
      let countDownDate = new Date(constructorOfDate).getTime();

      let mobileTime = {
        month: mobileTimer.find('[data-mobile-month]'),
        year: mobileTimer.find('[data-mobile-year]'),
        time: mobileTimer.find('[data-mobile-time]'),
      };

      mobileTime.month.text(`${timerInfo[type].date} ${timerInfo[type].month.ru}`);
      mobileTime.year.text(`${timerInfo[type].year}`);
      mobileTime.time.text(`${timerInfo[type].time}`);
    })
  }
})
