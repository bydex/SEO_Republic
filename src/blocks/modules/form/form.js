import buildChip from '../chip/chip';
$(document).ready(function() {

    function checkValueLength(element) {
        var boolean = false,
            inputs = element;

        inputs.each(function(index, el) {
            var input = $(el);
            if (input.type === 'tel') {
                if (input.val().length !== 16) {
                    boolean = true;
                }
            } else if (input.val().length === 0) {
                boolean = true;
            }
        });
        return boolean;
    }

    function getElByType(el, type) {
        var inputs = el,
            value = undefined;
        
        inputs.each(function(index, el) {
            if (el.name === type) {
                value = $(el).val()
            };
        });
        return value;
    }

	//E-mail Ajax Send
    $("form button").click(function(e) { //Change
        e.preventDefault();
        var th = $(this).closest('form'),
            inputs = th.find('input'),
            inputsValue = checkValueLength(inputs),
            formData;

        if (!inputsValue) {
            formData = {
                moves: th.data('activity'),
                name: getElByType(inputs, 'name'),
                email: getElByType(inputs, 'email'),
                phone: getElByType(inputs, 'phone'),
            }
        }

        if (!inputsValue) {
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
            buildChip(3000, "Один из полей введен не верно!", "red");
            th.addClass("form_fail");
            setTimeout(() => {
                th.removeClass("form_fail");
            }, 300);
        }
    });

});
