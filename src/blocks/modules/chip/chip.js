function addChipField() {
    let chipField = $('<div></div>');

    chipField.addClass("chip-field");
    $('body').append(chipField);
}
function addChip(removeTime, chipText, chipColor) {
    let chipField = $(".chip-field");
    let chip = $("<div></div>");

    setTimeout(() => {
        chip.fadeOut('slow').remove();
        if (chipField.children().length === 0) chipField.remove();
    }, removeTime);
    chip.addClass(`chip ${chipColor}`)
    .text(chipText);
    chipField.append(chip)
    .fadeIn('slow');
}
let buildChip = (
    removeTime = 3000,
    chipText = "It's a chip, Bro!",
    chipColor = "blue") => {
        if (!$(".chip-field").length) {
            addChipField();
            addChip(removeTime, chipText, chipColor);
        } else {
            addChip(removeTime, chipText, chipColor);
        }
    }

export default buildChip;
