// IE 11 polyfills
import MicroModal from 'micromodal';

MicroModal.init({
  onShow: (modal) => {
    $("body").addClass("overflow-hidden");
    let video = $(modal).find('iframe');

    if (video.length > 0) {
        if (video.data('src') !== false) {
            video.attr('src', video.data('src'));
            video.data('src', false);
        }
    }
  },
  onClose: (modal) => {
    if(!$('[data-nav]').hasClass("nav_menu_active")) {
      $("body").removeClass("overflow-hidden");
    }
    let video = $(modal).find("iframe");

    if (video.length > 0) {
        $(modal).find("iframe").each(function() {
            $(this)[0].contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*')
        });
    }
  }
});
