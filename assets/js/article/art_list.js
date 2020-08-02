$(function () {
    // 定义一个查询的参数对象，将来请求数据的时候，
    // 需要将请求参数对象提交到服务器
    var form = layui.form
    var q = {
        pagenum: 1, // 页码值，默认请求第一页的数据
        pagesize: 2, // 每页显示几条数据，默认每页显示2条
        cate_id: '', // 文章分类的 Id
        state: '' // 文章的发布状态
    }
    initTable()
    // 渲染列表页面
    function initTable() {
        $.ajax({
            method: 'get',
            url: '/my/article/list',
            data: q,
            success: function (res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg("获取文章信息失败")
                };
                // 使用模板引擎渲染页面数据
                var htmlStr = template('tpl-table', res)
                $('tbody').html(htmlStr)
            }
        })
    }
    // 渲染可选分类
    initCate()

    function initCate() {
        $.ajax({
            type: 'get',
            url: '/my/article/cates',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取分类数据失败')
                }
                var htmlStr = template('tpl-cate', res)
                $('[name=cate_id]').html(htmlStr)
                form.render()
            }
        })
    }
    // 为筛选表单绑定事件
    $('#form-search').on('submit', function (e) {
        e.preventDefault()
        // 获取表单中选中项的值
        var cate_id = $('[name=cate_id]').val()
        var state = $('[name=state]').val()
        console.log(cate_id);
        console.log(state);
        // 为查询的参数对象重新赋值
        q.cate_id = cate_id;
        q.state = state;
        console.log(q.cate_id);
        console.log(q.state);
        initTable()
    })
    // 时间过滤器
    template.defaults.imports.dateFormat = function (date) {
        var dl=new Date(date)
        var yyy=dl.getFullYear()
        var m=padZero(dl.getMonth()+1)
        var dd=padZero(dl.getDate());
        var hh=padZero(dl.getHours());
        var mm=padZero(dl.getMinutes());
        var ss=padZero(dl.getSeconds());
        return yyy + '-' + m + '-' + dd + ' ' + hh + ':' + mm + ':' + ss
    }
    //    补零函数
    function padZero(params) {
       return params<10?"0"+params:params
    }
})