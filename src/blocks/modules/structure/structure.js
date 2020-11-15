import 'slick-carousel';

$(document).ready(() => {
    let progressBar = $('.structure__progress'),
    sliderMain = $(".structure__slides"),
    sliderDots = $(".structure__dots"),
    mobileBtnNumber = $(".structure__dots-number");

    function progress() {
        let slidesLength = sliderDots.find(".slick-slide"),
        activeIndex,
        oneSlide = 100 / slidesLength.length;

        slidesLength.each((i) => {
            slidesLength.eq(i).css('min-width', oneSlide + '%');
            slidesLength.eq(i).css('max-width', oneSlide + '%');
            if (slidesLength.eq(i).hasClass('slick-active')) {
                return activeIndex = i + 1;
            }
        })
        let progressWidth = oneSlide * activeIndex;
        progressBar.width(progressWidth + '%');
    }

    function swapNumberOfLesson() {
        mobileBtnNumber.html(sliderDots.find('.slick-active').data("slick-index") + 1);
    }

    sliderDots.on("init afterChange", progress);
    sliderMain.on("afterChange", progress);

    sliderDots.on('init', () => {
        let dropdown = sliderDots.find(".slick-list"),
          mobileBtn = $(".structure__dots-header, .structure__dots-wrapper .slick-slide");

        mobileBtn.click(function () {
            swapNumberOfLesson();
            dropdown.toggleClass('active');
        })
        
        mobileBtn.on("focusout", function () {
          dropdown.removeClass("active");
        });
    })
    sliderDots.on('afterChange', () => {
        swapNumberOfLesson();
    })
    sliderMain.slick({
        prevArrow: $(".structure__arrow_left"),
        nextArrow: $(".structure__arrow_right"),
        asNavFor: ".structure__dots",
        infinite: false,
    });
    sliderDots.slick({
        asNavFor: '.structure__slides',
        dots: false,
        arrows: false,
        useTransform: false,
        infinite: false,
        draggable: false,
        focusOnSelect: true,
        autoplay: true,
        autoplaySpeed: 3000
    })

    function structureTabs() {
        sliderMain.on('afterChange', function(e, slick, indexSlider) {
            var structureTabs = $('.structure__tabs-item'),
                structureTabsActive = 'structure__tabs-item_active';

            structureTabs.each(function(index, el) {
                if ($(this).hasClass(structureTabsActive)) {
                    $(this).removeClass(structureTabsActive);
                }
                if (index === indexSlider) {
                    $(this).addClass(structureTabsActive);
                }
            });
        });
    }
    
    var breakPoint = 768;

    $(window).resize(function() {
        if ($(window).width() > breakPoint) {
            structureTabs()
        };
    });

    if ($(window).width > breakPoint) {
        structureTabs();
    }
})
