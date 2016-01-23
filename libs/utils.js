/**
 * Created by ray on 15-1-22.
 */
define(function () {
    'use strict';
    return {
        ajax: function (options, successCallback, errorCallback) {
            $.ajax({
                url: this.basePath + options.url,
                type: options.type || 'GET',
                data: options.params || {},
                dataType: 'json',
                traditional: true
            }).success(function (response) {
                if (response.errNo === 0) {
                    successCallback(response.data);
                }
                else {
                    if (errorCallback) {
                        errorCallback(response.message);
                    }
                    app.vent.trigger('ajax:error', {msg: response.message});
                }
            });
        },
        ajaxJsonPost: function (options, successCallback, errorCallback) {
            $.ajax({
                url: this.basePath + options.url,
                type: 'POST',
                data: JSON.stringify(options.params) || {},
                dataType: 'json',
                contentType:'application/json; charset=UTF-8'
            }).success(function (response) {
                if (response.errNo === 0) {
                    successCallback(response.data);
                }
                else {
                    if (errorCallback) {
                        errorCallback(response.message);
                    }
                    app.vent.trigger('ajax:error', {msg: response.message});
                }
            });
        },
        getData: function (data) {
            if (data['errNo'] === 0) {
                return data['data'];
            }
            else {
                return null;
            }
        },
        trim: function (str) {
            if (!str) {
                return;
            }
            return str.replace(/(^\s*)|(\s*$)/g, '');
        },
        formatterDate: function (date) {
            var m = date.getMonth() + 1;
            var d = date.getDate();
            return date.getFullYear() + '年' + (m < 10 ? '0' + m : m) + '月' + (d < 10 ? '0' + d : d) + '日';
        },
        // add by chenjianwei  添加 年月日时分 日期格式
        formatterDateTime: function (date) {
            var m = date.getMonth() + 1;
            var d = date.getDate();
            var h = date.getHours();
            var miu = date.getMinutes();
            return date.getFullYear() + '-' + (m < 10 ? '0' + m : m) + '-' + (d < 10 ? '0' + d : d)
                + ' ' + (h < 10 ? '0' + h : h) + ':' + (miu < 10 ? '0' + miu : miu);
        }
    }
});
