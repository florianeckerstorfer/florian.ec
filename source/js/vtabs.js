$(document).ready(function() {
    $('.vtabs .nav a').click(function (e) {
        // Make clicked tab active
        $('.vtabs .nav a').each(function () { $(this).removeClass('active'); });
        $(this).addClass('active');

        // Activate content
        $('.tab-content').each(function () { $(this).hide().removeClass('active'); });
        $('#'+$(this).attr('data-target')).show().addClass('active');

        e.preventDefault();
    });
});
