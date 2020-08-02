$(function () {
    var layer = layui.layer

    // 调用getUserInfo函数获取用户请求
    getUserInfo()

   
    // 退出登录
    $("#btnLogout").on("click",tuichu)
})
function tuichu() {
   
        layer.confirm('确认退出登录?', function (index) {
            layer.close(index);
            localStorage.removeItem("token");
            location.href = "/login.html";
        });


    

   }
var layer = layui.layer
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
       
        success: function (res) {
         
            if (res.status != 0) {
                return layer.msg("获取用户失败")
            }
            renderAvatar(res.data)
            layer.msg("好久不见" + res.data.username)



        }
    })
}

// 渲染用户头像
function renderAvatar(user) {
    // 获取用户名
    var name = user.nickname || user.username
    // 设置欢迎文本      
    $("#welcome").html("欢迎&nbsp;&nbsp;" + name);
    if (user.user_pic != null) {
        $(".layui-nav-img").show().attr("src", user.user_pic)
        $(".text-avatar").hide()
    } else {
        $(".layui-nav-img").hide()
        // 获取第一个字符并转换为大写
        var frist = name[0].toUpperCase()
        $(".text-avatar").show().html(frist)
    }
}


