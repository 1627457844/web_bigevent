var baseURL = 'http://ajax.frontend.itheima.net'
//拦截、过滤每一次ajax请求，配置每次请求之前用的参数
$.ajaxPrefilter(function (options) {
    // 每次请求添加完整地址
    options.url = baseURL + options.url;
    // 每次请请求是否有权限
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem("token") || ''
        }
    }
    // 所有请求完成后都要进行身份啊判断
    options.complete = function (res) {
        var data = res.responseJSON;
        
        console.log(data);
        if (data.status == 1 && data.message == "身份认证失败！") {
            // 1. 强制清空 token
            localStorage.removeItem('token')
            // 2. 强制跳转到登录页面
            location.href = '/login.html'
        }
    }
})