$(function () {
    $("label").on('click', function () {
        $(this).addClass("btn-default").siblings().removeClass('active btn-default');
    })
})