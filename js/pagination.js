(function($) {
    'use strict';
    var pagination = {
        init: function(options) {
            if (typeof(options) == 'undefined') {
                throw new Error('参数未定义');
            }
            if (typeof(options.object) != 'object') {
                throw new Error('参数类型不是Object');
            }
            if (typeof(options.total) != 'number' || typeof(options.current) != 'number') {
                throw new Error('参数类型不是Number');
            }
            if (options.total < 1) {
                throw new Error('参数不能小于1');
            }
            if (options.current < 1 || options.current > options.total) {
                throw new Error('参数必须大于0小于总页数');
            }
            if (typeof(options.callback) != 'function') {
                throw new Error('回调参数不是function');
            }
            return (function(options) {
                pagination.build(options);
                pagination.bindEvent(options);
            })(options);
        },
        build: function(options) {
            //清空分页按钮
            options.object.empty();
            if (options.current > 1) {
                options.object.append('<a href="javascript:void(0);" class="prev">上一页</a>');
            } else {
                options.object.remove('.prev');
                options.object.append('<a href="javascript:void(0);" class="disabled">上一页</a>');
            }
            if (options.current != 1 && options.current >= 4 && options.total != 4) {
                options.object.append('<a href="javascript:void(0);" class="page">' + 1 + '</a>');
            }
            if (options.current - 2 > 2 && options.current <= options.total && options.total > 5) {
                options.object.append('<span>...</span>');
            }
            var start = options.current - 2,
                end = options.current + 2;
            if ((start > 1 && options.current < 4) || options.current == 1) {
                end++;
            }
            if (options.current > options.current - 4 && options.current >= options.total) {
                start--;
            }
            for (; start <= end; start++) {
                if (start <= options.total && start >= 1) {
                    if (start != options.current) {
                        options.object.append('<a href="javascript:void(0);" class="page">' + start + '</a>');
                    } else {
                        options.object.append('<a href="javascript:void(0);" class="current">' + start + '</a>');
                    }
                }
            }
            if (options.current + 2 < options.total - 1 && options.current >= 1 && options.total > 5) {
                options.object.append('<span>...</span>');
            }
            if (options.current != options.total && options.current < options.total - 2 && options.total != 4) {
                options.object.append('<a href="javascript:void(0);" class="page">' + options.total + '</a>');
            }
            //下一页
            if (options.current < options.total) {
                options.object.append('<a href="javascript:void(0);" class="next">下一页</a>');
            } else {
                options.object.remove('.next');
                options.object.append('<a href="javascript:void(0);" class="disabled">下一页</a>');
            }
        },
        bindEvent: function(options) {
            options.object.on("click", "a.page", function() {
                options.current = parseInt($(this).text());
                pagination.build(options);
                options.callback(options.current);
            });
            //上一页
            options.object.on("click", "a.prev", function() {
                options.current = parseInt(options.object.children("a.current").text()) - 1;
                pagination.build(options);
                options.callback(options.current);
            });
            //下一页
            options.object.on("click", "a.next", function() {
                options.current = parseInt(options.object.children("a.current").text()) + 1;
                pagination.build(options);
                options.callback(options.current);
            });
        }
    }
    $.fn.pagination = function(options) {
        options.object = this;
        pagination.init(options);
    }
})(jQuery);