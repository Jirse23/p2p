$(function () {
    $("#box").on("click", "button", function () {
        var type = $(this).data("type");
        // 获取自定义的属性的值
        // 原生js dataset['type']

        // 存储在会话中
        sessionStorage.setItem("type", type);
        // 跳转到指定页面
        location.href = "/#personal/borrow_apply";
    })
})