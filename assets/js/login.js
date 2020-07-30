$(function () {
    // 点击按钮登入切换
    $("#link_reg").on("click", function () {
        $(".login-box").hide()
        $(".reg-box").show()
    })
    $("#link_login").on("click", function () {
        $(".login-box").show()
        $(".reg-box").hide()
    })
    // 2.表单调用规则
    /* 从layui中获取form对象 */
    var form = layui.form;
    form.verify({
        // 属性值可以是数组也可以是函数
        pwd: [/^\S{6,12}$/, "密码为6-12位，不能包含空格"],
        repwd: function (value) {
            // 通过形参拿到的是确认密码框中的内容
            // 还需要拿到密码框中的内容
            // 然后进行一次等于的判断
            // 如果判断失败,则return一个提示消息即可
            var pwd = $('.reg-box [name=password]').val()
            if (pwd !== value) {
                return '两次密码不一致！'
            }
        }
    })
    //layui弹出模块
    var layer = layui.layer
    // 监听注册submit表单提交事件
    $("#form_reg").on("submit", function (e) {
        // 阻止表单默认行为
        e.preventDefault();
        //ajax提交异步提交
        $.ajax({
            type: 'post',
            url: '/api/reguser',
            data: {
                username: $('#form_reg  input[name=username]').val(),
                password: $('#form_reg [name=password]').val()
            },
            success: function (res) {
                //注册失败校验
                if (res.status != 0) {
                    return layer.msg(res.message);
                }
                // 注册成功提示
                layer.msg('注册成功，请登录！')
                // 模拟人的点击行为
                $('#link_login').click()
                $("#form_reg")[0].reset()
            }
        })
    })
    // 监听登录submit表单提交事件
    $("#form_login").on("submit", function (e) {
        e.preventDefault();
        $.ajax({
            type:'post',
            url: '/api/login',
            data:$(this).serialize(),
            success:function(res){
                  //登录失败校验
                if (res.status != 0) {
                    return layer.msg(res.message);
                }
                // 注册成功提示
                layer.msg(res.message);
                localStorage.setItem("token",res.token);
                location.href="/index.html"
            }
        })
    })
})