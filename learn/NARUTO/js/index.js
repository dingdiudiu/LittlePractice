(function() {
	var $moduleText = $("#listItem")[0].text.replace(/^\s*/, "")
	var $experienceThree = $("#experienceThree")[0].text.replace(/^\s*/, "")
	var $template = $moduleText;
	var $module = ["Iruka", "Udakacandra", "Kakashi", "Jugo", "Jiraiya", "Honglin", "Akatsuki", "Spotzone", "Night"];
	var $pkL = $("#pkL");
	var $pkR = $("#pkR");
	var $pkHd = $("#pkHd");
	var $lM = $("#lM");
	var $rM = $("#rM");
	var $appDownLoad;
	var $downloadAll = $(".downloadAll");
	var interval = 1000;
	var pkValue = {
		left: 200,
		right: 300
	}
	var args = ["clienturl", "icon", "sname", "sname"];
	var add = "";
	var experience = {
		Iruka: ["Iruka", "1", "4"],
		Udakacandra: ["Udakacandra", "1", "4"]
	}
	var index = {
		init: function() {
			this.bindEvent();
		},
		bindEvent: function() {
			this.pk();
			this.fill();
			this.exper();
			$appDownLoad.bind("click", function() {
				window.open($(this).attr("data-appDownLoad"));
			})
			$downloadAll.bind("click", function() {
				var self = $(this),
					liList =$(this).parent().find(".appDownLoad"),
					i = 0;
				setTimeout((function(i, self) {
					if (i < 7) {
						window.open(liList[i].attributes["data-appDownLoad"].value);
						setTimeout(arguments.callee(++i, self), interval);
					} else {
						return 0;
					}
				})(i), 0);
			})
		},
		pk: function() {/*总查克拉值部分的pk比例以及值得设定*/
			$pkHd.text(pkValue.left + pkValue.right);
			$lM.text(pkValue.left);
			$rM.text(pkValue.right);
			$pkL[0].style.width = pkValue.left / (pkValue.left + pkValue.right) * 100 + "%";
			$pkR[0].style.width = pkValue.right / (pkValue.left + pkValue.right) * 100 + "%";
		},
		fill: function() { /*添加所有模块的全部应用*/
			var self = this,
				txt = "";
			$.each($module, function(i, val) {
				var $ul = $("<ul></ul>");
				txt = self.oneModule(val);
				$ul.html(txt);
				$("#" + val).html($ul[0]);
				add = "";
			});
		},
		oneModule: function(node) { /*添加一个模块的全部应用*/
			var obj = eval(node),
				j = 0;
			/*使用模板，每一个li*/
			for (var i = 0; i < 8; i++) {
				add += $template.replace(/%s/g, function() {
					return (j < args.length) ? obj[i][args[j++]] : "";
				})
				$template = $moduleText;
				j = 0;
			};
			return add;
		},
		exper: function() { /*添加三倍经验图片*/
			$.each(experience, function() {
				for (var k = 1; k < $(this).length; k++) {
					var aaa = $("#" + this[0]).find("li")[this[k]];
					aaa.innerHTML = aaa.innerHTML + $experienceThree;
				};
			})
			$appDownLoad = $(".appDownLoad");
		}
	}
	index.init();
})()