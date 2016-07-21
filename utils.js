define(function(param){


	var to_str = Object.prototype.toString;
	var $ = {};

	/* 类型判断函数 */
	$.type = { 

		isArray:function(obj){
			 return to_str.call(obj) == '[object Array]';
		},
		isString:function(obj){
			 return to_str.call(obj) == '[object String]';
		},
		isObj:function(obj) {
			 return to_str.call(obj) == '[object Object]'
		}

	};
		

	var getCookie = $.getCookie = function(name)
		{
			var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
			if(arr=document.cookie.match(reg))
			return unescape(arr[2]);
			else
			return null;
		};

	return $;

});