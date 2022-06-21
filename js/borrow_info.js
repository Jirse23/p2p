$(function () {
    // 发送ajax 调用详细接口
    $.ajax({
        url: "http://127.0.0.1:8848/getborrowinfo.php",
        data: "borrowid=" + sessionStorage.getItem("borrowid"),
        type: "get",
        dataType: "json",
        success: function (data) {
            for (var key in data) {
                $("#" + key).text(data[key]);
            }
        }
    })


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
        }
        return false; //阻止a的默认事件 即在链接末尾加#
    })



    //表单验证
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
    var $chargemoney = $('#chargemoney');
    var CFlag = false;
    $chargemoney.blur(function () {
        CFlag = checkInput($chargemoney, /^(?!(0[0-9]{0,}$))[0-9]{1,}[.]{0,}[0-9]{0,}$/, "请输入大于0的数字");
    })

    //判断投资金额的钱
    // var cm = $chargemoney.val();
    // var kt = data.borrowmoney - data.ownmoney;
    // if (kt < data.minbid) {
    //     alert("当前最大投资金额为:" + kt)
    //     cm <= kt;
    // } else {
    //     alert("当前投资金额必须大于最小投标" + data.minbid)
    //     cm >= data.minbid;
    // }


    // 给投资按钮添加点击事件  发送ajax请求
    $("#invest-btn").click(function () {
        // 先判断是否登录
        var uid = localStorage.getItem("uid");
        var username = localStorage.getItem("username");

        if (!(uid && username)) {
            alert("请先登录")
            location.href = "/login.html";
        }

        //正则表达式判断输入框的数字
        if (!CFlag) {
            $chargemoney.blur();
            alert("请重新输入")
            return false;
        }

        $.ajax({
            url: "http://127.0.0.1:8848/invest.php",
            type: "POST",
            data: {
                chargemoney: $("#chargemoney").val(),
                id: localStorage.getItem("uid"),
                borrowid: sessionStorage.getItem("borrowid")
            },
            success: function (data) {
                if (data === "10001") {
                    alert("余额不足，请先充值");
                    location.href = "/recharge.html"
                } else if (data === "10002") {
                    alert("投资失败，请稍后再试，不要错过分红")
                } else if (data === "10003") {
                    alert("扣款失败，请稍后再试，不要错过分红")
                } else {
                    alert("投资成功，坐等分红，人生就是这么无趣")
                    location.href = "/#personal";
                }
            }
        })
    })
})