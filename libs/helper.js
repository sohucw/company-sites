/**
 * @file
 * @author cjw
 * Created by cjw on 16/1/19.
 */

define(['handlebars'], function (Handlebars) {
    'use strict';
    //注册一个比较大小的Helper,判断v1是否大于v2
    Handlebars.registerHelper("compare",function(v1,v2,options){
          if(v1>v2){
                //满足添加继续执行
                return options.fn(this);
              }else{
                //不满足条件执行{{else}}部分
               return options.inverse(this);
             }
    });
});