// IE 11 polyfills
// import 'core-js/fn/object/assign'
// import 'core-js/fn/array/find'
import 'micromodal';
$(document).ready(() => {

    $(window).scrollTop(0);

    if (localStorage.getItem('link')) {
        let link = localStorage.getItem("link");
        setTimeout(() => {
            $('html, body').animate({
                scrollTop: $(link).offset().top - 89
            }, (!$(this).hasClass('nav__link_active')) ? 1500 : 300);

            localStorage.removeItem("link");
        }, 500);
    }

    let navbar = $('[data-nav]'),
        navbarHeight = navbar.innerHeight();

    let navItem = navbar.find(".nav__link"),
        navLink = [];

    let menuBtn = navbar.find('[data-nav-menu]');

    function htmlOverflow() {
        $('body, html').toggleClass('overflow-hidden');
    }

    menuBtn.click(function() {
        navbar.toggleClass('nav_menu_active');
        if($('.modal[aria-hidden="false"]').length === 0) {
            $("body, html").toggleClass("overflow-hidden");
        }
    })

    navItem.each((el) => {
        navLink.push(navItem.eq(el).attr('href'));

        navItem.eq(el).click(function(e) {
            if (!$('.header').hasClass('another-page')) {
                e.preventDefault();
                if (navbar.hasClass('nav_menu_active')) {
                    $("body, html").removeClass("overflow-hidden");
                    navbar.removeClass('nav_menu_active');
                }
                $('html, body').animate({
                    scrollTop: $($(this).attr('href')).offset().top - 89
                }, (!$(this).hasClass('nav__link_active')) ? 1500 : 300);
            } else {
                e.preventDefault();
                 $(location).attr("href", "/");
                localStorage.setItem("link", navItem.eq(el).attr("href")); //теперь у вас в localStorage хранится ключ "myKey" cо значением "myValue"
            }
        })
    });

    // navbarHeight = navbar.innerHeight();
    // $('#about').css('padding-top', navbarHeight / 16 + 'rem');

    $(window).scroll(() => {

        let scrolled = $(window).scrollTop();

        if (scrolled >= navbarHeight) {
            
            navbar.addClass('nav_fixed');
        } else {
            navbar.removeClass('nav_fixed');
        }

        navLink.forEach((el) => {
            if ($(el).length > 0) {
                let section = $(el),
                    sectionPosition = section.position().top,
                    sectionHeight = section.innerHeight();

                if (
                  scrolled >= sectionPosition - 90 &&
                  scrolled <= sectionPosition + sectionHeight - 90
                ) {
                  $(`a[href="${el}"]`).addClass("nav__link_active");
                } else {
                  $(`a[href="${el}"]`).removeClass("nav__link_active");
                }
            }
        })
    })

    if ($('.footer .nav__link').length > 0) {
        $('.footer').find('.nav__link').click(function(e) {
            e.preventDefault();
            $('html, body').animate({
                scrollTop: $($(this).attr('href')).offset().top - 89
            }, 1500);
        })
    }

    $(window).resize(() => {
        if ($(window).width() >= 992) {
            $("body").removeClass("overflow-hidden");
            navbar.removeClass("nav_menu_active");
        }
    })

})

$(function() {
    var navBtnModal = $('#profile-btn'),
        navForm = $('.nav-form'),
        navCloseBtn = $('.nav-form__close');

    if (navForm.length > 0) {
        navBtnModal.on('click', function() {
            var windowWidth = $(window).width(),
                breakPointLg = 992;

            if (windowWidth > breakPointLg) {
                navForm.addClass('nav_fixed');
            } else {
                MicroModal.show('modal-4');
            }
        })

        navCloseBtn.on('click', function() {
            navForm.removeClass('nav_fixed');
        })
    }
})