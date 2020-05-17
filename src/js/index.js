import "./import/modules";
import "./import/components";
import $ from 'jquery';
import { WOW } from "wowjs";
import Parallax from "parallax-js/dist/parallax";
import './modernizr';

$(document).ready(() => {
    let wow = new WOW({
      boxClass: "wow",
      animateClass: "animated",
      offset: 0,
      mobile: true,
    });
    wow.init();

    let parallaxElems = document.querySelectorAll("[data-parallax]");

    parallaxElems.forEach((el) => {
        new Parallax(el);
    });
});

const targets = document.querySelectorAll("[data-src]");

function isIntersecting(target) {
    const docViewTop = window.pageYOffset;
    const docViewBottom = docViewTop + window.innerHeight;
    const elemTop = docViewTop + target.getBoundingClientRect().top + 250;
    const elemBottom = elemTop + target.height - 250;
    return (((elemTop <= docViewBottom) && (elemTop >= docViewTop))
        || ((elemBottom <= docViewBottom) && (elemBottom >= docViewTop)));
}

const checkImages = function() {
    targets.forEach(target => {
        if (isIntersecting(target) && target.classList.contains('loading')){
            if (target.getAttribute('data-src') && target.classList.contains('loading')) {
                console.log('is work')
                target.src = target.getAttribute('data-src');
                target.removeAttribute('data-src');
                target.classList.remove('loading');
            }
        }
    });
};

window.onload = checkImages;
window.onscroll = checkImages;
$(document).ready(function(){
    if ($('.input__info').length > 0) {
        $('.input__info').hover(function(event){
            var titleText = "Мы напишем вам в WhatsApp";

            $('<span class="tooltip">Мы напишем вам в WhatsApp</span>')
              .text(titleText)
              .appendTo("body")
              .css("top", event.pageY - 5 + "px")
              .css("left", event.pageX + 20 + "px")
              .fadeIn("slow");
        },function(){

            $(".tooltip").fadeOut("slow");
            setTimeout(() => {
                $(".tooltip").remove();
            },100)
        }).mousemove(function(event){
            $(".tooltip")
              .css("top", event.pageY - 20 + "px")
              .css("left", event.pageX + "px");
        });
    }
});