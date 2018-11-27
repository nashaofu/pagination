# pagination
这是一个基于jQuery的翻页按钮插件！

# 插件说明
* 浏览器支持IE6+、Firefox、Chrome
* 插件支持自定义页码长度
* 支持服务器端ajax请求生成分页
* 支持bootstrap样式
* 提供自定义样式
* 插件支持AMD规范与CMD规范

# 插件调用示例
## HTML代码
    <ul class="pagination"></ul>
## jQuery代码
	// 本地模式
	$('#example-1').pagination({
		total: 100, // 总数据条数
		current: 2, // 当前页码
		length: 10, // 每页数据量
		size: 2, // 显示按钮个数
		prev: '上一页',
		next: '下一页',
		/**
		* [click description]
		* @param  {[object]} options = {
		*      current: options.current,
		*      length: options.length,
		*      total: options.total
		*  }
		* @param  {[object]} $target [description]
		* @return {[type]}         [description]
		*/
		click: function(options,$target) { // 点击按钮事件
			console.log(options);
			$target.next(".show").text('当前为：第'+options.current+'页');
		}
	});
	// ajax方式
	$('#example-3').pagination({
		total: 100, // 总数据条数
		current: 2, // 当前页码
		length: 10, // 每页数据量
		size: 2, // 显示按钮个数
		/**
		* ajax请求远程数据
		* 此方法阻止按钮渲染
		* 直到调用refresh方法
		* @param  {[object]} options = {
		*      current: options.current,
		*      length: options.length,
		*      total: options.total
		*  }
		* @param  {[function]} refresh 回调函数以刷新分页按钮
		* @param  {[object]} $target [description]
		* @return {[type]}         [description]
		*/
		ajax: function(options, refresh, $target){
			$.ajax({
				url: 'test.json',
				data:{
					current: options.current,
					length: options.length
				},
				dataType: 'json'
			}).done(function(res){
				console.log(res.data);
				// do something
				// 请务必调用此方法，否则分页按钮不会刷新
				refresh({
					total: res.total,// 可选
					length: res.length // 可选
				});
			}).fail(function(error){

			});
		}
	});
## 完整示例
	<!DOCTYPE html>
	<html>
	<head>
		<meta charset="utf-8">
		<title>分页按钮</title>
		<!-- boostrap分页css文件 -->
		<!--<link rel="stylesheet" type="text/css" href="css/bs-pagination.css">-->
		<link rel="stylesheet" type="text/css" href="css/pagination.css">
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
			<ul id="example-1" class="pagination"></ul>
			<div class="show"></div>
		</div>
		<div class="box">
			<ul id="example-2" class="pagination"></ul>
			<div class="show"></div>
		</div>
		<div class="box">
			<ul id="example-3" class="pagination"></ul>
			<div class="show"></div>
		</div>
	</div>
	<script type="text/javascript" src="js/jquery-1.12.4.min.js"></script>
	<script type="text/javascript" src="js/pagination.js"></script>
	<script type="text/javascript">
	$('#example-1').pagination({
		total: 100, // 总数据条数
		current: 2, // 当前页码
		length: 10, // 每页数据量
		size: 2, // 显示按钮个数
		/**
		* [click description]
		* @param  {[object]} options = {
		*      current: options.current,
		*      length: options.length,
		*      total: options.total
		*  }
		* @param  {[object]} $target [description]
		* @return {[type]}         [description]
		*/
		click: function(options,$target) { // 点击按钮事件
			console.log(options);
			$target.next(".show").text('当前为：第'+options.current+'页');
		}
	});
	$('#example-2').pagination({
		total: 100, // 总数据条数
		current: 2, // 当前页码
		length: 10, // 每页数据量
		size: 2, // 显示按钮个数
		prev: '上一页',
		next: '下一页',
		/**
		* [click description]
		* @param  {[object]} options = {
		*      current: options.current,
		*      length: options.length,
		*      total: options.total
		*  }
		* @param  {[object]} $target [description]
		* @return {[type]}         [description]
		*/
		click: function(options,$target) { // 点击按钮事件
			console.log(options);
			$target.next(".show").text('当前为：第'+options.current+'页');
		}
	});
	$('#example-3').pagination({
		total: 100, // 总数据条数
		current: 2, // 当前页码
		length: 10, // 每页数据量
		size: 2, // 显示按钮个数
		/**
		* ajax请求远程数据
		* 此方法阻止按钮渲染
		* 直到调用refresh方法
		* @param  {[object]} options = {
		*      current: options.current,
		*      length: options.length,
		*      total: options.total
		*  }
		* @param  {[function]} refresh 回调函数以刷新分页按钮
		* @param  {[object]} $target [description]
		* @return {[type]}         [description]
		*/
		ajax: function(options, refresh, $target){
			$.ajax({
				url: 'test.json',
				data:{
					current: options.current,
					length: options.length
				},
				dataType: 'json'
			}).done(function(res){
				console.log(res.data);
				// do something
				// 请务必调用此方法，否则分页按钮不会刷新
				refresh({
					total: res.total,// 可选
					length: res.length // 可选
				});
			}).fail(function(error){

			});
		}
	});
	</script>
	</body>
	</html>
## 插件示例
[DEMO](https://nashaofu.github.io/pagination/)
