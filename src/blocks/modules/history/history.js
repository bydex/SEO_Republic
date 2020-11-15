import slick from 'slick-carousel';

$(document).ready(() => {
    let slider = $(".history__items"),
    hasSlider = undefined;

    function initSlider() {
        if ($(window).width() <= 576 && !hasSlider) {
            hasSlider = true;

            slider.slick({
              infinite: false,
              arrows: false,
              responsive: [
                {
                  breakpoint: 380,
                  settings: {
                    slidesToShow: 1,
                  },
                },
                {
                  breakpoint: 420,
                  settings: {
                    slidesToShow: 1.1,
                  },
                },
                {
                  breakpoint: 2000,
                  settings: {
                    slidesToShow: 1.4,
                  },
                },
              ],
            });
        } else if ($(window).width() > 576 && hasSlider) {
            hasSlider = undefined;
            slider.slick("unslick");
        }
    }
    initSlider();

    $(window).resize(initSlider);

})
