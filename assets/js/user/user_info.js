$(function () {
    var form = layui.form;
    var layer = layui.layer;

    form.verify({
        // 属性值可以是数组也可以是函数
        nickname: function (value) {
            if (value.length > 6)
                return '昵称应输入 1~6位之间'

        }
    })
    // 初始化用户基础信息
    initUserInfo()

    function initUserInfo() {
        $.ajax({
            type: 'get',
            url: '/my/userinfo',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }

                form.val('formUserInfo', res.data);

            }
        })

    }

    // 重置表单的数据 
    //  重置只接受click事件的绑定
    $('#btnReset').on('click', function (e) {
        // 阻止表单的默认重置行为

        e.preventDefault()
        initUserInfo()
    })

    // 修改用户信息
    $(".layui-form").on("submit", function (e) {
        e.preventDefault()
        $.ajax({
            method: 'post',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function (res) {
                console.log(res.data);
                if (res.status !== 0) {
                    return layer.msg("用户信息修改失败")
                } else {
                    layer.msg("恭喜您，信息修改成功")
                    window.parent.getUserInfo()
                }
            }
        })
    })
})