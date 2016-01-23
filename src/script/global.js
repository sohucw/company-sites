/**
 * Created by ray on 15-1-26.
 */
// 用于管理全局数据模型
define([
    'backbone',
    'common'
], function (Backbone, Common) {
    'use strict';

    var currUserModel = Backbone.Model.extend({
        urlRoot: Common.basePath + 'user',
        initialize: function() {
        },
        parse: function(response) {
            return Common.dealResponse(response);
        }
    });
    var notification = Backbone.Model.extend({
        url:Common.basePath + 'user/notice/read/stat',
        defaults: {
            total: 0,
            unread: 0
        },
        initialize: function() {
        },
        parse: function(data) {
            return Common.getData(data);
        }
    });
    return Backbone.Model.extend({
        defaults: {
            isCollapsed: true
        },
        initialize: function() {
            // currUser 是子model
            //this.currUser = new currUserModel();
            this.currUser = new currUserModel();
            this.currUser.parent = this;
            this.notice = new notification();
            this.notice.parent = this;
            this.getData();
        },
        getData: function() {
            this.currUser.fetch();
            this.notice.fetch();
        }
    });
});