$(function () {
    var type = sessionStorage.getItem("type");
    // 根据switch判断类型
    switch (type) {
        case "1":
            $("#borrow-info").text("信用贷").css("background-color", "#40d47e");
            break;
        case "2":
            $("#borrow-info").text("车易贷").css("background-color", "#ec7e20");
            break;
        case "3":
            $("#borrow-info").text("房易贷").css("background-color", "#2ca2ee");
            break;
        default:
            alert("请稍后再试~~");
            break;
    }

    //表单验证
    //几个都需要判断所以可以封装函数来减少代码的量
    function checkInput(obj, reg, msg) {
        //首先获取表单的值
        var uVal = obj.val();
        // 判断正则表达式是否通过
        var res = reg.test(uVal);
        if (res) {//通过
            obj.css("border", "1px solid green").next().next().html("").removeClass("error");
        } else {//没通过
            obj.css("border", "1px solid red").next().next().html(msg).addClass("error");
        }
        //取值看是true或者false
        return res;
    }
    //正则表达式判断是否通过
    var $borrowmoney = $('#borrowmoney');
    var $interest = $('#interest');
    var $minbid = $('#minbid');
    var $bouns = $('#bouns');
    // 设标杆
    var bFlag = false, iFlag = false, mFlag = false, bsFlag = false;

    $borrowmoney.blur(function () {
        bFlag = checkInput($borrowmoney, /^(?!(0[0-9]{0,}$))[0-9]{1,}[.]{0,}[0-9]{0,}$/, "请输入大于0的数字(整数或者小数)")
    });
    $interest.blur(function () {
        iFlag = checkInput($interest, /^(?!(0[0-9]{0,}$))[0-9]{1,}[.]{0,}[0-9]{0,}$/, "请输入大于0的数字(整数或者小数)")
    });
    $minbid.blur(function () {
        mFlag = checkInput($minbid, /^(?!(0[0-9]{0,}$))[0-9]{1,}[.]{0,}[0-9]{0,}$/, "请输入大于0的数字(整数或者小数)")
    });
    $bouns.blur(function () {
        bsFlag = checkInput($bouns, /^(?!(0[0-9]{0,}$))[0-9]{1,}[.]{0,}[0-9]{0,}$/, "请输入大于0的数字(整数或者小数)")
    });

    // 给按钮添加点击事件
    $('#borrow-btn').click(function () {
        //如果标杆为true发送ajax
        if (!(bFlag && iFlag && mFlag && bsFlag)) {
            $borrowmoney.blur();
            $interest.blur();
            $minbid.blur();
            $bouns.blur();
            return false;
        }
        $.ajax({
            url: "http://127.0.0.1:8848/borrow.php",
            type: "POST",
            data: {
                acc: localStorage.getItem("username"),
                borrowmoney: $('#borrowmoney').val(),
                interest: $('#interest').val(),
                borrowtime: $('#borrowtime').val(),
                repaytype: $("[name='repaytype']:checked").val(),
                minbid: $('#minbid').val(),
                bouns: $('#bouns').val(),
                days: $('#days').val(),
                title: $('#title').val(),
                info: $('#info').val()
            },
            success: function (data) {
                if (data === "ok") {
                    alert("申请提交成功，等待审核....");
                    location.href = "/";
                } else {
                    alert("申请提交失败，请稍后再试~~~~");
                }
            }
        })
    })
})