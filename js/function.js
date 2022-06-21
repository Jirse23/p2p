function checkLogin() {
    var uid = localStorage.getItem("uid");
    var username = localStorage.getItem("username");

    if (!(uid && username)) {
        alert("请先登录")
        location.href = "/login.html";
    }
}
checkLogin();