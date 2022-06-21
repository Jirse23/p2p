$(function () {

    var row = 2;
    var page = 1;
    var pageSize;
    loadData();
    // 每次分页都要调用ajax最好封装
    function loadData() {
        // 发送ajax调用借款列表接口
        $.ajax({
            url: "http://127.0.0.1:8848/getborrow.php",
            type: "GET",
            data: {
                page: page,
                row: row
            },
            dataType: "json",
            success: function (data) {
                var total = data.total;//总记录数
                pageSize = Math.ceil(total / row);  //向上取整
                //由于pageSize处于异步函数中所以直接拿进来
                $('#page').pagenation({
                    nowPage: page,//当前页
                    pageNum: pageSize,//总页数
                    callback: function (p) {
                        page = p;
                        //点击没反应所以重新调用
                        loadData();
                    }
                })
                var lists = data.list;//数据[{},{}]
                var len = lists.length;
                // 用一个空的字符串接收resHtml+=''
                var resHtml = '';
                for (var i = 0; i < len; i++) {
                    resHtml += '<tr>'
                    resHtml += '<td scope="row">' + lists[i].userid + '</td>'
                    resHtml += '<td>' + lists[i].title + '</td>'
                    resHtml += '<td class="text-primary">' + Number(lists[i].interest).toFixed(2) + '%</td>'
                    resHtml += '<td class="text-danger">￥' + Number(lists[i].borrowmoney).toFixed(2) + '</td>'
                    resHtml += '<td>' + (lists[i].repaytype == 0 ? "按月分期" : "按月到期") + '</td>'
                    resHtml += '<td class="text-success">' + ((lists[i].ownmoney / lists[i].borrowmoney) * 100).toFixed(2) + '%</td>'
                    resHtml += '<td>'
                    resHtml += '<a href="#"><button type="button" class="btn btn-danger btn-sm" data-borrowid="' + lists[i].id + '">查看</button></a>'
                    resHtml += '</td>'
                    resHtml += '</tr>'
                }
                $('#borrow-list').html(resHtml);
            }
        })
    }
    $("#borrow-list").on("click", '.btn', function () {
        var borrowid = $(this).data('borrowid');
        // 获取到存入会话存储
        sessionStorage.setItem("borrowid", borrowid);
        location.href = "/borrow_info.html";
        //因为是a所以要阻止默认行为
        return false;

    })
})