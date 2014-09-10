
String.prototype.trim = function() {
	return this.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
}

if (typeof window.DK === 'undefined') {
	window.DK = {};
}

DK.$ = function(node, id) {
	if (node == null)
		node = document;
	return node.getElementById(id);
}
DK.tag = function(node, tag) {
	if (node == null)
		node = document;
	return node.getElementsByTagName(tag);
}

DK.getClassName = function(searchClass, node, tag) {
	var result = new Array();
	if (document.getElementsByClassName) {
		var nodes = (node || document).getElementsByClassName(searchClass),
			result = [];
		for (var i = 0; node = nodes[i++];) {
			if (tag !== "*" && node.tagName === tag.toUpperCase()) {
				result.push(node)
			} else {
				result.push(node)
			}
		}
		return result
	} else {
		if (node == null)
			node = document;
		if (tag == null)
			tag = '*';
		var els = node.getElementsByTagName(tag);
		var elsLen = els.length;
		var pattern = new RegExp("\\b" + searchClass + "\\b");
		for (i = 0, j = 0; i < elsLen; i++) {
			if (pattern.test(els[i].className)) {
				result[j] = els[i];
				j++;
			}
		}
		return result;
	}
}
DK.EventUtil = {
	addHandler: function(element, type, handler) {
		if (element.addEventListener) {
			element.addEventListener(type, handler, false);
		} else if (element.attachEvent) {
			element.attachEvent("on" + type, handler);
		} else {
			element["on" + type] = handler;
		}
	},
	getEvent: function(event) {
		return event ? event : window.event;
	},
	getTarget: function(event) {
		return event.target ? event.target : event.srcElement;
	}
}

DK.controlClassName = function(className, remove, add) {
	if (remove == null) {
		className += " " + add;
		return className;
	} else {
		var rPattern = new RegExp("\\b" + remove + "\\b");
		if (add == null) {
			return className.replace(rPattern, "");
		} else {

			return className.replace(rPattern, add);
		}
	}

}