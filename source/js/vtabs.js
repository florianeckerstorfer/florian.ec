$(document).ready(function() {
    $('.vtabs__nav a').click(function (e) {
        // Make clicked tab active
        $('.vtabs__nav a').each(function () { $(this).removeClass('active'); });
        $(this).addClass('active');

        // Activate content
        $('.vtabs__content__tab-content').each(function () { $(this).hide().removeClass('active'); });
        $('#'+$(this).attr('data-target')).show().addClass('active');

        e.preventDefault();
    });
});
