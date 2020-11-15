import maskInput from "vanilla-text-mask";


$(document).ready(() => {
  var phoneMask = ['+', '7', '(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

  var myInput = document.querySelectorAll('input[type="tel"]');
  console.log(myInput)
  
  myInput.forEach((el) => {
    maskInput({
      inputElement: el,
      mask: phoneMask
    })
  })
})
