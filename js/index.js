$(function () {
    //$('.main').load("../../pages/home.html")
    // 动态调用  用hash 获取锚点链接 再用switch匹配
    loadPages();
    // 自动刷新监听hash
    window.onhashchange = loadPages;
    // 封装函数
    function loadPages() {
        var hash = location.hash;
        if (hash == "") { hash = "#home" };
        switch (hash) {
            case "#home":
                $('.main').load("../../pages/home.html");
                break;
            case "#invest":
                $('.main').load("../../pages/invest.html");
                break;
            case "#borrow":
                $('.main').load("../../pages/borrow.html");
                break;
            case "#personal":
                $('.main').load("../../pages/personal.html", function () {
                    $('#personal-right').load("../../pages/personal/getuserinfo.html");
                });

                // 高级方法 不用给li加active
                // loadPersonalHash("#personal/getuserinfo");
                break;
            // 个人中心/账号信息   有个bug 找到时要先加载personal load是异步函数，可以使用回调函数
            case "#personal/getuserinfo":
                //第一种方法 不管是不是刷新都要重新加载
                // $('.main').load("../../pages/personal.html", function () {
                //     $('#personal-right').load("../../pages/personal/getuserinfo.html");
                // });
                // 第二种 只在刷新加载两次
                // if($('#personal-right').length) {//点击一次变成1
                //     $('#personal-right').load("../../pages/personal/getuserinfo.html");
                // }else {//刷新不变是0
                //     $('.main').load("../../pages/personal.html", function () {
                //         $('#personal-right').load("../../pages/personal/getuserinfo.html");
                //     });
                // }
                // 可以封装函数 直接用
                loadPersonalHash(hash);
                break;
            // 个人中心/更新资料
            case "#personal/updateuser":
                // $('.main').load("../../pages/personal.html", function () {
                //     $('#personal-right').load("../../pages/personal/updateuser.html");
                // });
                loadPersonalHash(hash);
                break;
            // 我要借款的跳转页面  个人中心的二级hash
            case "#personal/borrow_apply":
                loadPersonalHash(hash);
                break;
            //404页面
            default:
                $('.main').load("../../pages/404.html");
                break;
        }
        activeNav(hash);
    }

    // 个人中心二级hash函数
    function loadPersonalHash(hash) {
        if ($('#personal-right').length) {//点击一次变成1
            $('#personal-right').load("../../pages/" + hash.substr(1) + ".html");
            activePersonalNav(hash);
        } else {//刷新不变是0
            $('.main').load("../../pages/personal.html", function () {
                $('#personal-right').load("../../pages/" + hash.substr(1) + ".html");
                activePersonalNav(hash);
            });
        }
    }

    //个人中心二级hash的激活active事件  
    function activePersonalNav(hash) {
        // 先删除所有li中的active
        $('.card .card-body li').removeClass("active");
        // 给当前的hash加active 注意是给li加不是a
        $('.card .card-body li a[href="' + hash + '"]').parent().addClass('active');
    }

    // 激活导航栏active
    // 第一种
    // $('.content-nav .nav-link').on('click', function () {
    //     $('.content-nav .nav-link').removeClass('active');
    //     $(this).addClass('active');
    // })

    // 第二种
    function activeNav(hash) {
        // $('.content-nav .nav-link').removeClass('active');
        // $('.content-nav .nav-link[href="' + hash + '"]').addClass('active');

        // 激活导航栏,出现刷新个人中心没有添加active的bug
        if (hash.includes("#personal")) hash = "#personal"; //个人中心的二级hash全部包含#personal

        // 第三种链式
        $('.content-nav .nav-link[href="' + hash + '"]').addClass('active').parent().siblings().find('a').removeClass('active');
    }

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
})