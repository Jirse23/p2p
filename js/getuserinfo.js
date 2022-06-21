$(function () {
    $.ajax({
        url: "http://127.0.0.1:8848/getuserinfo.php",
        type: "GET",
        data: "id=" + localStorage.getItem("uid"),
        dataType: "json",
        success: function (data) {
            //dataType 类型是json 轻量化 速度快 和后端交流的  原本是字符串
            // $("#nickname").text(data.nickname);
            $("#totalmoney2").text(data.totalmoney);
            $("#usablemoney2").text(data.usablemoney);
            $("#blockedmoney2").text(data.blockedmoney);
            // 之所以id和后端一样是为了方便循环输出
            // 用循环写
            for (var key in data) {
                // key是变量所以用[]
                $("#" + key).text(data[key]);
            }
            drawImage(data.totalmoney, data.usablemoney, data.blockedmoney);
        }
    })

    // 画图
    function drawImage(total, useable, block) {
        var myChart = echarts.init(document.getElementById("echarts-container"));
        var option = {
            title: {
                text: '个人资产统计',
                subtext: '一切以实际为准',
                left: 'center'
            },
            tooltip: {
                trigger: 'item'
            },
            legend: {
                orient: 'vertical',
                left: 'left'
            },
            series: [
                {
                    name: 'Access From',
                    type: 'pie',
                    radius: '50%',
                    data: [
                        { value: total, name: '总金额' },
                        { value: useable, name: '可用金额' },
                        { value: block, name: '冻结金额' }
                    ],
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        };
        myChart.setOption(option);
    }
})