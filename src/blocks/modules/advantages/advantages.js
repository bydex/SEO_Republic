import slick from 'slick-carousel';

$(document).ready(() => {
    let slider = $(".advantages__slider");

    function initSlider() {
        if ($(window).width() >= 576 && !slider.hasClass('slick-initialized')) {
            slider.slick({
                slidesToShow: 2,
                infinite: false,
                arrows: false,
            });
        } else if ($(window).width() < 576 && slider.hasClass("slick-initialized")) {
            slider.slick("unslick");
        }
    }
    initSlider();

    $(window).resize(initSlider);

})
