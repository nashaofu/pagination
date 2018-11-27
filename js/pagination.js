/*!
 * Pagination v1.4.1 (https://github.com/nashaofu/pagination)
 * Copyright 2016 nashaofu
 * Licensed under MIT
 */
(function (factory) {
    "use strict";
    if (typeof define === "function" && define.amd) {
        /** AMD规范模块调用 */
        define(["jquery"], factory);
    } else if (typeof define === "function" && define.cmd) {
        /** CMD规范模块调用 */
        define(function (require, exports, module) {
            factory(require("jquery"));
        });
    } else {
        /** 在浏览器环境下 */
        factory(jQuery);
    }
})(function ($) {
    'use strict';
    /**
     * 分页按钮构造函数
     * @param {[type]} $target [description]
     * @param {[type]} options [description]
     */
    var Pagination = function ($target, options) {
        this.$target = $target;
        this.options = $.extend({}, Pagination.DEFAULTS, this.$target.data("pagination"), typeof options == "object" && options);
        this.init();
    };
    // 插件版本号
    Pagination.VERSION = "1.4.0";
    // 插件默认值
    Pagination.DEFAULTS = {
        total: 1, // 数据总数
        current: 1, // 当前页码
        length: 10, // 每页数量
        size: 2, // 当前页码两边显示页码数量
        prev: "&lt;", // 上一页默认符号
        next: "&gt;", // 下一页默认符号
        click: function (e) { } //点击回调函数
    };
    // 插件原型方法
    Pagination.prototype = {
        /**
         * 插件初始化
         * 对数据进行分析和对数据的标准化处理
         * @return {[type]} [description]
         */
        init: function () {
            if (this.options.total < 1) {
                this.options.total = 1;
            }
            if (this.options.current < 1) {
                this.options.current = 1;
            }
            if (this.options.length < 1) {
                this.options.length = 1;
            }
            if (this.options.current > Math.ceil(this.options.total / this.options.length)) {
                this.options.current = Math.ceil(this.options.total / this.options.length);
            }
            if (this.options.size < 1) {
                this.options.size = 1;
            }
            if ('function' === typeof this.options.ajax) {
                var me = this;
                this.options.ajax({
                    current: me.options.current,
                    length: me.options.length,
                    total: me.options.total
                }, function (options) {
                    return me.refresh(options);
                }, me.$target);
            } else {
                this.render();
            }
            this.onClick();
        },
        /**
         * 渲染分页按钮
         * @return {[type]} [description]
         */
        render: function () {
            var options = this.options,
                $target = this.$target;
            $target.empty();
            // 上一页
            $target.append('<li><a herf="javascript:void(0)" data-page="prev">' + options.prev + '</a></li>');
            var page = this.getPages();
            if (page.start > 1) {
                $target.append('<li><a herf="javascript:void(0)" data-page="' + 1 + '">' + 1 + '</a></li>');
                $target.append('<li><span>...</span></li>');

            }
            // 生成中间页码
            for (var i = page.start; i <= page.end; i++) {
                $target.append('<li><a herf="javascript:void(0)" data-page="' + i + '">' + i + '</a></li>');
            }
            if (page.end < Math.ceil(options.total / options.length)) {
                $target.append('<li><span>...</span></li>');
                $target.append('<li><a herf="javascript:void(0)" data-page="' + Math.ceil(options.total / options.length) + '">' + Math.ceil(options.total / options.length) + '</a></li>');
            }
            // 下一页
            $target.append('<li><a herf="javascript:void(0)" data-page="next">' + options.next + '</a></li>');
            // 设置当前页样式
            $target.find('li>a[data-page="' + options.current + '"]').parent().addClass('active');
            // 设置上一页样式
            if (options.current <= 1) {
                $target.find('li>a[data-page="prev"]').parent().addClass("disabled");
            }
            // 设置下一页样式
            if (options.current >= Math.ceil(options.total / options.length)) {
                $target.find('li>a[data-page="next"]').parent().addClass("disabled");
            }
        },
        /**
         * 根据插件的参数获取分页页码渲染数据
         * @return {[type]} [description]
         */
        getPages: function () {
            var $target = this.$target,
                options = this.options,
                start = options.current - options.size,
                end = options.current + options.size;
            // 获取开始页码
            if (options.current >= Math.ceil(options.total / options.length) - options.size) {
                start -= options.current - Math.ceil(options.total / options.length) + options.size;
            }
            // 获取结束页码
            if (options.current <= options.size) {
                end += options.size - options.current + 1;
            }
            // 起始页码不得小于等于1
            if (start < 1) {
                start = 1;
            }
            // 终止页码不得大于等于总页数
            if (end > Math.ceil(options.total / options.length)) {
                end = Math.ceil(options.total / options.length);
            }
            var pages = {
                start: start,
                end: end
            }
            return pages;
        },
        /**
         * 页码点击事件
         * @return {[type]} [description]
         */
        onClick: function () {
            var $target = this.$target,
                options = this.options,
                me = this;
            $target.off('click');
            $target.on('click', '>li>a[data-page]', function (e) {
                if ($(this).parent().hasClass('disabled') || $(this).parent().hasClass('active')) {
                    return
                }
                var button = $(this).data("page");
                switch (button) {
                    case 'prev': // 上一页
                        if (options.current > 1) {
                            options.current--;
                        }
                        break;
                    case 'next': // 下一页
                        if (options.current < Math.ceil(options.total)) {
                            options.current++;
                        }
                        break;
                    default:
                        button = parseInt(button);
                        if (!isNaN(button)) {
                            options.current = parseInt(button);
                        }
                        break;
                }
                var temp = {
                    current: options.current,
                    length: options.length,
                    total: options.total
                }
                if ('function' === typeof options.ajax) {
                    options.ajax(temp, function (options) {
                        return me.refresh(options);
                    }, $target);
                } else {
                    me.render();
                }
                // 返回当前页和页码列表jQuery对象
                options.click(temp, $target);
            });
        },
        /**
         * 刷新分页按钮方法
         * @param  {[object]} options [description]
         * @return {[type]}         [description]
         */
        refresh: function (options) {
            if ('object' === typeof options) {
                if (options.total) {
                    this.options.total = options.total;
                }
                if (options.length) {
                    this.options.length = options.length;
                }
            }
            this.render();
        }
    };
    // 定义为jQuery插件
    $.fn.pagination = function (options) {
        this.each(function () {
            $(this).data("pagination", new Pagination($(this), options));
        });
        return this;
    }
});