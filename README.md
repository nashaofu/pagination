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
		    <ul class="pagination" id="cc"></ul>
		    <div class="show"></div>
		</div>
		<div class="box">
		    <ul class="pagination"></ul>
		    <div class="show"></div>
		</div>
	</div>
	<script type="text/javascript">
	var pagination=$('.pagination').pagination({
	    total: 30,
	    active: 1,
	    size: 2,
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