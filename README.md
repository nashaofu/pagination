# pagination
这是一个基于jQuery的翻页按钮插件！
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
        click: function(e) {
        	//参数e为返回的当前页数
			//可以在下面调用e
			console.log(e);
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
			.box,.show{
				margin: 0 auto;
				padding-top: 256px;
				margin: 10px auto;
				text-align: center;
			}
			.show{
				padding: 0;
			}
		</style>
	</head>
	<body>
		<div class="box">
		    <ul class="pagination"></ul>
		</div>
		<div class="show"></div>
		<script type="text/javascript">
		var pagination=$('.pagination').pagination({
		    total: 30,
		    active: 1,
		    size: 3,
		    click: function(e) {
		    	console.log(pagination);
		        $('.show').text('当前为：第'+e+'页');
		    }
		});
		</script>
	</body>
	</html>
## 插件示例
[DEMO](https://diaocheng.github.io/pagination/)