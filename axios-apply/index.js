"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var axios_1 = require("axios");
var baseUrl = process.env.NODE_ENV !== 'production' ? 'http://localhost:8080' : '/';
var AjaxRequest = /** @class */ (function () {
    function AjaxRequest(baseUrl) {
        this.baseURL = baseUrl; // 配置默认路径
        this.requestQueue = {}; // 缓存当前请求队列 用来操作loading的显示或者隐藏
    }
    AjaxRequest.prototype.configInterceptors = function (instance, url) {
        var _this = this;
        // 配置请求拦截
        instance.interceptors.request.use(function (config) {
            //  loading效果 开始请求前显示loading
            if (Object.keys(_this.requestQueue).length === 0) {
                console.log('显示loading');
            }
            _this.requestQueue[url] = config.url;
            return config;
        });
        // 配置响应拦截
        instance.interceptors.response.use(function (res) {
            // 取消loading效果
            delete _this.requestQueue[url];
            if (Object.keys(_this.requestQueue).length === 0) {
                console.log('取消loading');
            }
            ;
            if (res.status !== 200) {
                return Promise.reject(res);
            }
            else {
                return res.data;
            }
        });
    };
    AjaxRequest.prototype.request = function (config) {
        // 创建一个axios实例
        var instance = axios_1["default"].create();
        // axios(config);
        config = __assign({ baseURL: this.baseURL }, config);
        this.configInterceptors(instance, config.url);
        return instance(config);
    };
    return AjaxRequest;
}());
exports["default"] = new AjaxRequest(baseUrl);
