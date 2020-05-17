import $ from 'jquery';
import BeforeAfter from 'before-after/dist/before-after.js';

$(document).ready(() => {
    if (document.querySelector("[data-before-after]")) {

        let compare = document.querySelector("[data-before-after]");

        let beforeAfterItem = undefined;

        let compareContainer = $(compare).find(".compare-section__container"),
        compareContainerParentWidth = $(compare).parent().width();

        function sizingCompareBox() {
            let compareContainerHeights = [];
            if ($(window).width() > 768) {
                compareContainer.map((el) => {
                    $(compare).height(0);
                    compareContainerHeights.push(compareContainer.eq(el).prop('scrollHeight'));
                });
                $(compare).height(Math.max(...compareContainerHeights));
                compareContainerParentWidth = $(compare).parent().width();
                compareContainer.width(compareContainerParentWidth);
            } else {
                $(compare).css('height', 'auto');
                compareContainer.css('width', 'auto');
            }
        }

        function beforeAfterInit() {
            let windowWidth = $(window).width();
            if (windowWidth > 768 && !beforeAfterItem) {
                beforeAfterItem = new BeforeAfter({
                    element: compare,
                    cursor: true,
                });
                beforeAfterItem.create(() => {
                    beforeAfterItem.reset();
                    $(compare).find(".beforeafter-itemActive").width('50%');
                    $(compare).find(".beforeafter-cursor").css('transform', `translate(${compareContainerParentWidth/2}px, 0px) translateZ(0px)`);
                    sizingCompareBox();
                });
            } else if (windowWidth <= 768 && beforeAfterItem) {
                beforeAfterItem.destroy();
                beforeAfterItem = undefined;
                compareContainer.each((el) => {
                    let $this = $(compare).find('.beforeafter-item').eq(el),
                    img = $this.find('img'),
                    picture = $this.find('picture');

                    img.appendTo(picture);
                })
            }
        }

        $(window).resize(() => {
            beforeAfterInit();
            sizingCompareBox();
        })
        beforeAfterInit();
        sizingCompareBox();
    }
})
