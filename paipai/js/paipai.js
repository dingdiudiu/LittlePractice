(function() {
	var headRSel = DK.$(null, "headRSel");
	var topNavBdR = DK.$(null, "topNavBdR");
	var searchSubmit = DK.$(null, "searchSubmit");
	var searchForm = DK.$(null, "searchForm");
	var searchInput = DK.$(null, "searchInput");
	var searchLabel = DK.$(null,"searchLabel");

	var menuOff = DK.getClassName("menu-off", null, "li");

	var target;
	var cName;
	var change;
	var ExtraData = function(name, value) {
		this.name = name;
		this.value = value;
	}
	var eData1 = new ExtraData("extraData", "宝贝");
	var ControlEvent = function(o) {
		this.tar = o.tar;
		this.nowClassName = o.nowClassName;
		this.changeClassName = o.changeClassName;
		this.willClassName = o.willClassName;
		this.tier = o.tier;
	}
	ControlEvent.prototype = {
		hasClassName: function() {
			var pattern = new RegExp("\\b" + this.nowClassName + "\\b");
			var className;
			if (this.tier == "*") {

			} else if (this.tier >= 0) {
				while (this.tier--) {
					this.tar = this.tar.parentNode;
					if (pattern.test(this.tar.className)) {
						return this.tar;
					}
				}
			} else if (this.tier < 0) {

			} else {
				return false;
			}
			return false;
		}
	}


	var paipai = {
		init: function() {
			this.bindEvent();
		},
		bindEvent: function() {
			DK.EventUtil.addHandler(topNavBdR, "mouseover", this.menuOver)
			DK.EventUtil.addHandler(topNavBdR, "mouseout", this.menuOut)
			DK.EventUtil.addHandler(headRSel, "mouseover", this.selOver)
			DK.EventUtil.addHandler(headRSel, "mouseout", this.selOut)
			DK.EventUtil.addHandler(headRSel, "click", this.selClick)
			DK.EventUtil.addHandler(searchInput, "focus", this.inputFocus)
			DK.EventUtil.addHandler(searchInput, "blur", this.inputBlur)
			DK.EventUtil.addHandler(searchSubmit, "click", this.subClick)

		},
		menuOver: function(event) {
			var obj = {
				nowClassName: "menu-off",
				changeClassName: "menu-off",
				willClassName: "menu-on",
				tier: 3
			};
			paipai.menuEvent(event, obj);
		},
		menuOut: function(event) {
			var obj = {
				nowClassName: "menu-on",
				changeClassName: "menu-on",
				willClassName: "menu-off",
				tier: 3
			};
			paipai.menuEvent(event, obj);
		},
		selOver: function(event) {
			var obj = {
				nowClassName: "head-r-search",
				changeClassName: null,
				willClassName: "head-r-sel-hover",
				tier: 4
			};
			paipai.menuEvent(event, obj);
		},
		selOut: function(event) {
			var obj = {
				nowClassName: "head-r-search",
				changeClassName: "head-r-sel-hover",
				willClassName: null,
				tier: 4
			};
			paipai.menuEvent(event, obj);
		},
		selClick: function(event) {
			target = DK.EventUtil.getTarget(event);
			var parents = target.parentNode.parentNode;
			var aList = DK.tag(parents, "a");
			if (target.parentNode.attributes["data-type"].value == "2") {
				var pitchOn = paipai.exchange(aList);
				eData1 = new ExtraData("extraData", pitchOn);
				paipai.selOut(event)
			} else {
				eData1 = new ExtraData("extraData", 
					aList[0].firstChild.nodeValue.trim());
			}

		},
		inputFocus: function(event) {searchLabel.innerText = '';},
		inputBlur: function(event) {
			target = DK.EventUtil.getTarget(event);
			if (target.value == '') {
				searchLabel.innerText = '请输入搜索关键字';
			}
		},
		subClick: function(event) {
			var input = document.createElement("input");
			input.setAttribute("type","hidden");
			input.setAttribute("name",eData1.name);
			input.setAttribute("value", eData1.value);
			searchForm.appendChild(input);
		},
		exchange: function(aList) {
			change = aList[1].firstChild.nodeValue.trim();
			aList[1].firstChild.nodeValue = aList[0].firstChild.nodeValue.trim();
			aList[0].firstChild.nodeValue = change;
			return change;
		},
		menuEvent: function(event, obj) {
			obj.tar = DK.EventUtil.getTarget(event);
			var arguments = new ControlEvent(obj);
			paipai.actionEvent(event, arguments);
		},
		actionEvent: function(event, arguments) {
			cName = arguments.hasClassName();
			if (cName) {
				cName.className = DK.controlClassName(cName.className, arguments.changeClassName, arguments.willClassName)
			}
		}

	}
	paipai.init();
})()