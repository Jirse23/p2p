$(function () {
    $('#login-btn').click(function () {
        // 获取两个input的值
        var username = $('#username').val();
        var pwd = $('#pwd').val();
        // 表单验证
        if (!(username && pwd)) return false;
        // 调用登录接口 发送ajax
        $.ajax({
            url: "http://127.0.0.1:8848/login.php",
            type: "POST",
            data: "username=" + username + "&pwd=" + pwd,
            //data另一种写法
            // data: {
            //     还可以直接写对象前面不用
            //     username: username,
            //     pwd: pwd
            // },
            success: function (res) {
                if (res === "fail") {//成功
                    alert("用户名或者密码错误!");
                    $('#username')
                        .css('border', '2px solid red')
                        .next()
                        .html('用户名出错')
                        .addClass('error');
                    $('#pwd')
                        .css('border', '2px solid red')
                        .next()
                        .html('密码出错')
                        .addClass('error');
                } else {//失败
                    //向本地存储存放数据 id 用户名
                    localStorage.setItem('uid', res);
                    localStorage.setItem('username', username);
                    alert("欢迎回来!" + username);
                    location.href = "/";
                }
            }
        })
        qx();
    })
    var qx = function () {
        $('.form-input').blur(function () {
            $('.form-group ').removeClass('error');
            $('.form-group span').html('');
            $('.form-input').css('border', '1px solid #ccc');
        })
    }
})