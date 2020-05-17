import buildChip from '../chip/chip';
$(document).ready(function() {
	//E-mail Ajax Send
    $("form button").click(function(e) { //Change
        e.preventDefault();
        var th = $(this).closest('form'),
            valuePhone = th.find('.input__field').val(),
            slicePhone = () => {
                let underscore = valuePhone.indexOf('_');

                if (underscore === -1) {
                    return valuePhone;
                } else {
                    return valuePhone.slice(0,underscore);
                }
            };

        let formData = {
            phone: slicePhone(),
            moves: th.data('activity'),
        }
        console.log(formData)
        if (formData.phone.length === 16) {
            buildChip(3000, "Заявка обрабатывается.", "yellow");
            $.ajax({
                type: "POST",
                url: "mail.php", //Change
                data: formData
            }).done(function() {
                buildChip(3000, "Спасибо за заявку!", "green");
                th.removeClass("form_fail");
                th.addClass('form_success');
                setTimeout(function() {
                    // Done Functions
                    th.removeClass("form_success");
                    th.trigger("reset");
                }, 1000);
            });
            return false;
        } else {
            buildChip(3000, "Телефон введен неверно!", "red");
            th.addClass("form_fail");
            setTimeout(() => {
                th.removeClass("form_fail");
            }, 300);
        }
	});

});
