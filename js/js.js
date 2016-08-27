(function(factory) {
    "use strict";
    if (typeof define === "function" && define.amd) {
        /** AMD规范模块调用 */
        define(["jquery"], factory);
    } else if (typeof define === "function" && define.cmd) {
        /** CMD规范模块调用 */
        define(function(require, exports, module) {
            factory(require("jquery"));
        });
    } else {
        /** 在浏览器环境下 */
        factory(jQuery);
    }
})(function($) {
    "use strict";
    var Pagination = function($target, options) {
        this.$target = $target;
        this.options = $.extend({}, Pagination.DEFAULTS, this.$target.data("pagination"), typeof options == "object" && options);
        if (this.options.total < 1) {
            throw new Error("页码总数不得小于1");
        }
        if (this.options.active < 1 || this.options.active > this.options.total) {
            throw new Error("页码必须是1~总页码之间的数字");
        }
        if (this.options.size < 1) {
            throw new Error("可见页码数不得小于1");
        }
        this.active = this.options.active;
        this.size = this.options.size;
        this.build();
        this.onClick();
    };
    // 插件版本号
    Pagination.VERSION = "1.1.0";
    // 插件默认值
    Pagination.DEFAULTS = {
        total: 1, // 页码总数
        active: 1, // 当前页码
        size: 2, // 当前页码两边显示页码数量
        first: "first", //首页
        last: "last", //最后一页
        prev: "&lt;", // 上一页默认符号
        next: "&gt;", // 下一页默认符号
        click: function(active, $target) {} //点击回调函数
    };
    Pagination.prototype = {
        init: function() {},
        build: function() {
            var me = this,
                $target = me.$target,
                options = me.options;
            //清空分页按钮
            $target.empty();
            // 首页
            $target.append('<li><a herf="javascript:void(0)" data-page="first">' + options.first + '</a></li>');
            // 上一页
            $target.append('<li><a herf="javascript:void(0)" data-page="prev">' + options.prev + '</a></li>');
            // 中间页码
            // 生成中间页码
            var size = me.getSize();
            for (var i = size.start; i <= size.end; i++) {
                $target.append('<li><a herf="javascript:void(0)" data-page="' + i + '">' + i + '</a></li>');
            }
            // 下一页
            $target.append('<li><a herf="javascript:void(0)" data-page="next">' + options.next + '</a></li>');
            // 最后一页
            $target.append('<li><a herf="javascript:void(0)" data-page="last">' + options.last + '</a></li>');
            me.addClass();
        },
        // 获取中间页码起始值
        getSize: function() {
            var me = this,
                $target = me.$target,
                options = me.options,
                start = me.active - me.size,
                end = me.active + me.size;
            // 获取开始页码
            if (me.active >= options.total - me.size) {
                start -= me.active - options.total + me.size;
            }
            // 获取结束页码
            if (me.active <= me.size) {
                end += me.size - me.active + 1;
            }
            // 起始页码不得小于等于1
            if (start < 1) {
                start = 1;
            }
            // 终止页码不得大于等于总页数
            if (end > options.total) {
                end = options.total;
            }
            var size = {
                start: start,
                end: end
            }
            return size;
        },
        addClass: function() {
            var me = this,
                $target = me.$target,
                options = me.options;
            // 设置当前页码样式
            $target.find('li>a[data-page="' + me.active + '"]').addClass("active");
            // 设置上一页样式
            if (me.active <= 1) {
                $target.find('li>a[data-page="prev"]').addClass("disabled");
                $target.find('li>a[data-page="first"]').addClass("disabled");
            }
            // 设置下一页样式
            if (me.active >= options.total) {
                $target.find('li>a[data-page="next"]').addClass("disabled");
                $target.find('li>a[data-page="last"]').addClass("disabled");
            }
        },
        // 页码点击事件
        onClick: function() {
            var me = this,
                $target = me.$target,
                options = me.options;
            $target.on("click", "a[data-page]", function() {
                if ($(this).data("page") === "prev") {
                    // 上一页
                    if (me.active > 1) {
                        me.active--;
                    } else {
                        return;
                    }
                } else if ($(this).data("page") === "next") {
                    // 下一页
                    if (me.active < options.total) {
                        me.active++;
                    } else {
                        return;
                    }
                } else if ($(this).data("page") === "first") {
                    me.active = 1;
                } else if ($(this).data("page") === "last") {
                    me.active = me.options.total;
                } else {
                    // 页码点击
                    if (!isNaN($(this).data("page"))) {
                        me.active = parseInt($(this).data("page"));
                    } else {
                        return;
                    }
                }
                me.build();
                // 返回当前页和页码列表jQuery对象
                options.click(me.active, $target);
            });
        }
    };
    // 定义为jQuery插件
    $.fn.pagination = function(options) {
        this.each(function() {
            $(this).data("pagination", new Pagination($(this), options));
        });
        return this;
    }
});