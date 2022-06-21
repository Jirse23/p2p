$(function () {
    isLogin();
    //向本地存储取值 判断用户是否登录
    function isLogin() {
        var username = localStorage.getItem('username');
        var uid = localStorage.getItem('uid');
        if (username && uid) {//登录成功
            $('#login-text').html('<a class="nav-link" href="#">' + username + '</a>');
            $('#reg-text').html('<a class="nav-link" href="#" id="exit">注销</a>');
        } else {//登录失败
            $('#login-text').html('<a class="nav-link" href="./login.html">登录</a>');
            $('#reg-text').html('<a class="nav-link" href="./reg.html">注册</a>');
        }
    }

    // 注销事件 事件委托 给父亲加
    $("#reg-text").on("click", "#exit", function () {
        if (confirm("您确定要推出吗?")) {
            //删除本地存储
            localStorage.removeItem("uid");
            localStorage.removeItem("username");
            $('#login-text').html('<a class="nav-link" href="./login.html">登录</a>');
            $('#reg-text').html('<a class="nav-link" href="./reg.html">注册</a>');
            location.href = "/login.html";
        }
        return false; //阻止a的默认事件 即在链接末尾加#
    })

    $("#recharge-btn").click(function () {
        // 获取值
        var chargemoney = $("#chargemoney").val();
        // 空就不执行下一步
        if (!chargemoney) return false;
        // 发送ajax 调用充值接口
        $.ajax({
            url: "http://127.0.0.1:8848/charge.php",
            type: "POST",
            data: {
                id: localStorage.getItem("uid"),
                bankcode: $("#bankcode").val(),
                chargemoney: chargemoney
            },
            success: function (data) {
                if (data == "ok") {
                    alert("老板，充值成功！");
                    location.href = "/#personal"
                } else {
                    alert("请稍后再试~~~~~");
                }
            }
        })
    })
})