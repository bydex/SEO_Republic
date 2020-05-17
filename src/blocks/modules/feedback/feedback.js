import $ from 'jquery';
import 'slick-carousel';

$(document).ready(() => {
    let videoSlider = $(".feedback__video-slider"),
        infoSlider = $(".feedback__info");

    videoSlider.slick({
        infinite: false,
        draggable: false,
        asNavFor: infoSlider,
        arrows: false,
    });
    infoSlider.slick({
        infinite: false,
        asNavFor: videoSlider,
        vertical: true,
        prevArrow: $(".feedback__arrow_left"),
        nextArrow: $(".feedback__arrow_right"),
    });
})
