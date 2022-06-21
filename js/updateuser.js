$(function () {
    // 保存节点
    var $nickname = $("#nickname");
    var $email = $("#email");
    var $phone = $("#phone");

    // 设标杆来判断表单验证
    var nFlag = false, eFlag = false, pFlag = false;

    //失去焦点用正则表达式判断
    $nickname.blur(function () {
        nFlag = checkInput($nickname, /^([\u4E00-\uFA29]|[\uE7C7-\uE7F3]|[a-zA-Z0-9_-]){2,10}$/, "2~10的中文,数字,字母,-");
    });

    $email.blur(function () {
        eFlag = checkInput($email, /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/, "邮箱的格式不正确");
    });

    $phone.blur(function () {
        pFlag = checkInput($phone, /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/, "手机号格式不正确");
    })

    //几个都需要判断所以可以封装函数来减少代码的量
    function checkInput(obj, reg, msg) {
        //首先获取表单的值
        var uVal = obj.val();
        // 判断正则表达式是否通过
        var res = reg.test(uVal);
        if (res) {//通过
            obj.css("border", "1px solid green").next().html("").removeClass("error");
        } else {//没通过
            obj.css("border", "1px solid red").next().html(msg).addClass("error");
        }
        //取值看是true或者false
        return res;
    }
    $("#update-btn").click(function () {
        var nickname = $nickname.val();
        var email = $email.val();
        var phone = $phone.val();

        if (!(nFlag && eFlag && pFlag)) return false;

        // 成功发送ajax
        $.ajax({
            url: "http://127.0.0.1:8848/updateuser.php",
            type: "POST",
            data: {
                id: localStorage.getItem("uid"),
                nickname: nickname,
                email: email,
                phone: phone
            },
            success: function (data) {
                if (data == "ok") {
                    alert("更新资料成功！");
                    location.href = "/#personal";

                } else {
                    alert("请稍后再试~~~");
                }
            }
        });
    })
})