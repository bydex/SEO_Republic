$(document).ready(() => {
    if ($('[data-accordeon]').length > 0) {
        let accordeonHead = $('[data-accordeon-head'),
            allAccordeonBody = $('[data-accordeon-body]');

        accordeonHead.click(function() {
            let parent = $(this).closest('[data-accordeon]'),
                accordeonBody = parent.find('[data-accordeon-body]'),
                accordeonBodyHeight = accordeonBody.prop('scrollHeight') / 16 + 'rem',
                accordeon = $('[data-accordeon]');

            accordeon.each((el) => {
                if (accordeon[el] !== parent[0]) {
                    accordeon.eq(el).removeClass('accordeon_active');
                    allAccordeonBody.eq(el).css("max-height", 10 / 16 + 'rem');
                }
            })
            parent.toggleClass('accordeon_active');


            if (parent.hasClass('accordeon_active')) {
                accordeonBody.css("max-height", accordeonBodyHeight);
            } else {
                accordeonBody.css("max-height", 10 / 16 + "rem");
            }
        })
    }
})
