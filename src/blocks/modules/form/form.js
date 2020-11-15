import 'micromodal';
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

    function sendForm(obj) {
        var formData = obj.formData,
            th = obj.th,
            inputs = obj.inputs,
            inputsValue = obj.inputsValue;

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
    }

    function filedForm(th) {
        buildChip(3000, "Один из полей введен не верно!", "red");
        th.addClass("form_fail");
        setTimeout(() => {
            th.removeClass("form_fail");
        }, 300);
    }

    var breakPoint = 768;

	//E-mail Ajax Send
    $("form button").click(function(e) { //Change
        e.preventDefault();

        var windowWidth = $(window).width(),
            btn = $(e.target),
            btnModalParent = btn.closest('.modal').attr('id'),
            btnForm = btn.closest('form'),
            btnInputs = btnForm.find('input');

            if (btn.hasClass('modal-reg__btn') && windowWidth < breakPoint) {
                var form = btn.closest('form'),
                    inputs = form.find('input');
                    MicroModal.close('modal-2');
                    MicroModal.show('modal-4');

                if (btnModalParent === 'modal-4') {
                    if (checkValueLength(btnInputs) === false) {
                        formData = {
                            moves: btnForm.data('activity'),
                            name: getElByType(btnInputs, 'name'),
                            email: getElByType(btnInputs, 'email'),
                            phone: getElByType(btnInputs, 'phone'),
                        }
                        MicroModal.close('modal-4');
                        MicroModal.show('modal-5');
                    } else {
                        filedForm(btnForm);
                    }
                } 
            } else {
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
                    sendForm({th, inputs, inputsValue, formData});
                } else {
                    filedForm(th);
                }
            }

    });

    $('#modal-5 button').click(function(e) {
        var nav = $('.nav');

        MicroModal.close('modal-5');
        nav.removeClass('nav_menu_active')
    })    

});
