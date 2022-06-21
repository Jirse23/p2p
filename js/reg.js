$(function () {
    //变量保存dom节点
    var $username = $('#username');
    var $pwd = $('#pwd');
    var $epwd = $('#en-pwd');
    var $nickname = $('#nickname');
    var $email = $('#email');

    var uFlag = false, pFlag = false, epFlag = false, nFlag = false, eFlag = false;
    // 第一种方法直接写
    // //用户名表单失去焦点事件
    // $username.blur(function () {
    //     //首先获取表单的值
    //     var uVal = $username.val();
    //     // 判断正则表达式是否通过
    //     var res = /^([\u4E00-\uFA29]|[\uE7C7-\uE7F3]|[a-zA-Z0-9_-]){2,10}$/.test(uVal);
    //     if (res) {//通过
    //         $username.css("border", "1px solid green").next().html("").removeClass("error");
    //     } else {//没通过
    //         $username.css("border", "1px solid red").next().html("2~10的中文,数字,字母,-").addClass("error");
    //     }
    // })
    $username.blur(function () {
        //用户名还需要判断 是否重复
        var res = checkInput($username, /^([\u4E00-\uFA29]|[\uE7C7-\uE7F3]|[a-zA-Z0-9_-]){2,10}$/, "2~10的中文,数字,字母,-");
        //正则通过再判断
        if (res) {
            //调用ajax接口
            $.ajax({
                url: "http://127.0.0.1:8848/accrepeat.php",
                type: "get",
                data: "username=" + $username.val(),
                success: function (data) {
                    if (data === "fail") {//fail 就是重复了
                        $username.css("border", "1px solid red").next().html("该用户名重复了").addClass("error");
                        uFlag = false;
                    } else {//没有重复
                        $username.css("border", "1px solid green").next().html("").removeClass("error");
                        uFlag = true;
                    }
                }
            })
        }
    })

    $pwd.blur(function () {
        //不能直接替换匿名函数，如果替换了就直接调用了
        pFlag = checkInput($pwd, /[a-zA-Z0-9_-]{3,10}$/, "3~10的数字字母或者-");
    })

    $epwd.blur(function () {
        var uVal = $('#en-pwd').val();
        var wVal = $('#pwd').val();
        var res = /[a-zA-Z0-9_-]{3,10}$/.test(uVal);
        // 也可以直接再if里面直接用pFlag标杆
        if (res) {
            if (uVal == wVal) {
                $epwd.css("border", "1px solid green").next().html("").removeClass("error");
                epFlag = true;
            } else {
                $epwd.css("border", "1px solid red").next().html("两次密码不一致,请重新输入").addClass("error");
                epFlag = false;
            }
        } else {
            $epwd.css("border", "1px solid red").next().html("密码不正确").addClass("error");
            epFlag = false;
        }
    })

    $nickname.blur(function () {
        nFlag = checkInput($nickname, /^([\u4E00-\uFA29]|[\uE7C7-\uE7F3]|[a-zA-Z0-9_-]){2,10}$/, "2~10的中文,数字,字母,-");
    })

    $email.blur(function () {
        eFlag = checkInput($email, /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/, "邮箱的格式不正确");
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

    // 给注册按钮添加点击事件
    $("#reg-btn").click(function () {
        if (!(uFlag && pFlag && epFlag && nFlag && eFlag)) {
            $username.trigger("blur");
            $pwd.blur();
            $email.blur();
            $epwd.blur();
            $nickname.blur();
            return false;
        }
        $.ajax({
            url: "http://127.0.0.1:8848/reg.php",
            type: "POST",
            data: {
                username: $username.val(),
                pwd: $pwd.val(),
                nickname: $nickname.val(),
                email: $email.val()
            },
            success: function (res) {
                if (res === 'ok') {//成功
                    alert("恭喜您!" + $username.val() + "注册成功!");
                    location.href = "./login.html";
                } else {
                    alert("未成功,请重试~~~~");
                }
            }
        })
    })
})