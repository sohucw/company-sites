define(["backbone","common"],function(t,e){"use strict";var n=t.Model.extend({urlRoot:e.basePath+"user",initialize:function(){},parse:function(t){return e.dealResponse(t)}}),i=t.Model.extend({url:e.basePath+"user/notice/read/stat",defaults:{total:0,unread:0},initialize:function(){},parse:function(t){return e.getData(t)}});return t.Model.extend({defaults:{isCollapsed:!0},initialize:function(){this.currUser=new n,this.currUser.parent=this,this.notice=new i,this.notice.parent=this,this.getData()},getData:function(){this.currUser.fetch(),this.notice.fetch()}})});