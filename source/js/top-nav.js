$(document).ready(function() {
    initBurgerButton($('.small-header .burger-button'), $('.top-nav ul'));
});

var initBurgerButton = function (button, nav) {
    button.click(function (e) {
        if ($(this).hasClass('active')) {
            $(this).removeClass('active');
            $(this).addClass('not-active');
            nav.fadeOut();
        } else {
            $(this).addClass('active');
            $(this).removeClass('not-active');
            nav.fadeIn();
        }

        e.preventDefault();
    });
}
