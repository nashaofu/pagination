# pagination
这是一个基于jQuery的翻页按钮插件！

# 插件说明
* 浏览器支持IE7+、Firefox、Chrome
* 插件支持自定义页码长度
* 插件支持data属性获取插件信息
* 插件支持一个CSS选择器生成多个独立的分页列表

# 插件调用示例
## HTML代码
    <ul class="pagination"></ul>
## jQuery代码
	$('.pagination').pagination({
		total: 30, // 页码总数
		active: 1, // 当前页码
        size: 2, // 当前页码两边显示页码数量
        style: "ellipsis", // 页码显示样式(默认值为ellipsis显示省略符号，非默认值则为连续显示样式)
        prev: "&lt;", // 上一页默认符号
        next: "&gt;", // 下一页默认符号
        click:  function(active,$target) {
	        // 参数active为返回的当前页数
			// $target页码列表jQuery对象
	    	console.log($target);
	        $target.next(".show").text('当前为：第'+active+'页');
	    }
	});
## 完整示例
	<!DOCTYPE html>
	<html>
	<head>
		<meta charset="utf-8">
		<title>分页按钮</title>
		<link rel="stylesheet" type="text/css" href="css/pagination.css">
		<script type="text/javascript" src="js/jquery-1.12.4.min.js"></script>
		<script type="text/javascript" src="js/pagination.js"></script>
		<style type="text/css">
			.container{
				margin: 100px auto;
			}
			.box,.show{
				margin: 20px auto;
				text-align: center;
			}
			.show{
				padding: 10px 0;
			}
		</style>
	</head>
	<body>
	<div class="container">
		<div class="box">
		    <ul class="pagination example-1"></ul>
		    <div class="show"></div>
		</div>
		<div class="box">
		    <ul class="pagination example-1"></ul>
		    <div class="show"></div>
		</div>
		<div class="box">
		    <ul id="example-2" class="pagination"></ul>
		    <div class="show"></div>
		</div>
	</div>
	<script type="text/javascript">
	// 显示省略号的样式，并且使用同一个选择器选择生成多个实例
	var pagination=$('.example-1').pagination({
	    total: 30,
	    active: 1,
	    size: 2,
	    click: function(active,$target) {
	    	console.log($target);
	        $target.next(".show").text('当前为：第'+active+'页');
	    }
	});
	// 不显示省略号的样式
	$('#example-2').pagination({
	    total: 30,
	    active: 1,
	    size: 2,
	    style: 1,
	    click: function(active,$target) {
	    	console.log($target);
	        $target.next(".show").text('当前为：第'+active+'页');
	    }
	});
	console.log(pagination);
	</script>
	</body>
	</html>
## 插件示例
[DEMO](https://diaocheng.github.io/pagination/)