var baseURL='http://ajax.frontend.itheima.net'
//拦截、过滤每一次ajax请求，配置每次请求用的参数
$.ajaxPrefilter(function(options){
    options.url=baseURL+options.url
})