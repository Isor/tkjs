define(function (){

	var $ = {};

	var protocols = [ "http", "https", "ftp" ];

	var selfUrlEvent = {};

	$.on = function(stringUrlEvent,func){

		selfUrlEvent[stringUrlEvent] = func;	

	}



	/****************************************
        
        将(string ,string) 对象值转换成形如 a=x&b=2 的字符串 

	 ***************************************/
	function $_to_query_string(obj){ //   (string ,string)
		if(!obj) { return ""};
		var str = null;
		for(var i in obj ){
			if(obj.hasOwnProperty(i)){
				if(str == null){
					str = i+"="+obj[i];
				}else{
					str = str+"&"+i+"="+obj[i];
				}
			}
		}

		return str ;
	};

	/* 判断是否为绝对路径 */
	function isAbs(url) {
		var protocol = url.substring(0, url.indexOf("://"));
		for (var i = 0; i < protocols.length; i++) {
			if (protocol.toLowerCase() == protocols[i]) {
				return true;
			}
		}
		return false;
	};
	/*
	 * Resolves relative path param : paths 相对路径层目录. param : url 相对路径
	 */
	function rrp(paths, url) {
		
		if (isAbs(url)) {
			return url;
		}
		
		if (/^\/.*$/.test(url)) {
			return url;
		} else if (/^\.\/.*/.test(url)){
			var subUrl = url.substring(2);
			paths.pop();
			return rrp(paths,subUrl);
			
		} else if (/^\.\.\/.*$/.test(url)) {
			var subUrl = url.substring(3);
			paths.pop();
			return rrp(paths, subUrl)
		} else if (/^(\w)*$/) {
			paths.pop();
			return paths.join("/") + "/" + url;
		}

		throw "Unrecognized url str '" + url + "'";

	};


	/* 解析 url 返回对应的绝对路径 */
	$.url = function(url) {
		if (isAbs(url)) {
			return url;
		}
		
		// var mergedUrl = url.replace(/\/+/,"/"); // 合并 '//'
		url = url.replace(/\s+/,"");
		var targetUrl = rrp(location.pathname.split("/"), url.replace(/\/+/,
				"/"))

		return location.protocol + "//" + location.host + targetUrl;
	};

	

	return $;


});
