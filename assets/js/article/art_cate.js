$(function () {

    // 文章渲染// 获取初始化文章类别
    initArtCateList()
    // 文章渲染// 获取初始化文章类别
    function initArtCateList() {
        $.ajax({
            type: 'get',
            url: '/my/article/cates',
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg(res.message)
                }

                var htmlStr = template('tpl-table', res)

                $('#tbody').html(htmlStr)
            }
        })
    }
    var index = null
    $("#btn-add").on("click", function () {

        index = layer.open({
            type: 1,
            area: ["500px", "250px"],
            title: '添加文章分类',
            content: $("#dialog-add").html(),
        });

    })

    $('body').on("submit", "#boxAddCade", function (e) {
        e.preventDefault()
        $.ajax({
            type: 'post',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg("添加失败")
                }
                initArtCateList()
                layui.layer.msg("添加分类成功")
                layui.layer.close(index)
            }
        })
    })
    // 点击编辑弹出修改表单
    var form = layui.form;
    $("#tbody").on("click", "#btn-edit", function () {

        index = layer.open({
            type: 1,
            area: ["500px", "250px"],
            title: '添加文章分类',
            content: $("#dialog-edit").html(),
        });
        console.log();
        $.ajax({
            type: 'get',
            url: '/my/article/cates/' + $(this).parent().attr("data-id"),

            success: function (res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg("获取文章分类数据失败")
                }
                form.val('form-edit', res.data);
            }
        })

    })
    // 通过代理方式，修改分类的表单进行绑定submit事件
    $('body').on("submit", "#boxedit", function (e) {
        e.preventDefault()
        $.ajax({
            type: 'post',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg("添加失败")
                }
                initArtCateList()
                layui.layer.msg("修改分类成功")
                layui.layer.close(index)
            }
        })
    })
    $("#tbody").on("click", "#btn-del", function () {
var id=$(this).parent().attr("data-id");
        layer.confirm('确认删除?', {
            icon: 3,
            title: '提示'
        }, function (index) {
            $.ajax({
                type: 'get',
                url: '/my/article/deletecate/'+id,
                success: function (res) {
                    // console.log(res);
                    if (res.status !== 0) {
                        return layer.msg("删除失败")
                    }
                    layer.msg("删除成功")

                    // 文章渲染// 获取初始化文章类别
                    initArtCateList()
                }
            })

            layer.close(index);
        });

    })
})