/*************************************

	location.url 参数解析模块

 ************************************/
define(function(){

	function eqsplit(str) {
		var eqIndex = str.indexOf("=");
		if (eqIndex != -1) {
			return [ str.substr(0, eqIndex), str.substr(eqIndex + 1) ]
		}
	}

	var $param = window.$param = {}
	var search = location.search.substr(1);
	var pairstr = search.split("&");

	for (var i = 0; i < pairstr.length; i++) {
		var pair = eqsplit(pairstr[i]);
		if (pair) {
			var oldValue = $param[pair[0]];
			if (oldValue != undefined) {
				var objToString = Object.prototype.toString;
				if (objToString.call(oldValue) == '[object Array]') {
					$param[pair[0]] = oldValue.push(pair[1]);
				} else {
					$param[pair[0]] = [ oldValue, pair[1] ];
				}
				continue;
			}
			$param[pair[0]] = pair[1];

		}
	}

	return $param;
});