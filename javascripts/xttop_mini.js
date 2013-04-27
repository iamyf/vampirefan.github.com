(function(docu) {
	var objxttop = null;
	var xttop = function(topjason) {
			var doc = document,
				win = window,
				docbody = doc.body,
				goto_top_type = -1,
				goto_top_itv = 0,
				isNotIE = -[-1, ],
				config = topjason || {};
			var topdiv = doc.createElement("div");
			topdiv.id = config["id"] || "xttop";
			topdiv.style.cssText = "position:fixed;"+"bottom:" + (config["bottom"] || "10px") + ";right:" + (config["right"] || "28%") + ";display:none"+ ";width:" + (config["width"] || "40px") + ";height:" + (config["height"] || "19px") + ";cursor:pointer;";
			if (config["img"]) {
				topdiv.style.background = "url(" + (config["img"] == "defaults" ? "{{ root_url }}/images/totop0.png" : config["img"]) + ") no-repeat"
			} else {
				topdiv.innerHTML = "<span style='font-size:15px;border:1px solid #7B8693;'>↑UP↑</span>"
			};

			function goto_top_timer() {
				var y = docbody.scrollTop || doc.documentElement.scrollTop;
				var moveby = config["speed"] || 35;
				y -= Math.ceil(y * moveby / 100);
				if (y < 0) {
					y = 0
				};
				if (docbody.scrollTop) {
					docbody.scrollTop = y
				} else {
					doc.documentElement.scrollTop = y
				};
				if (y == 0) {
					win.onmousewheel = function() {
						return true
					};
					clearInterval(goto_top_itv);
					goto_top_itv = 0
				}
			};

			function goto_top() {
				if (goto_top_itv == 0) {
					win.onmousewheel = function() {
						return false
					};
					goto_top_itv = setInterval(goto_top_timer, 50)
				}
			};
			bind(topdiv, "click", goto_top);
			docbody.appendChild(topdiv)
		};
	var bind = function(object, type, fn) {
			if (object.attachEvent) {
				object.attachEvent("on" + type, (function() {
					return function() {
						window.event.cancelBubble = true;
						object.attachEvent = fn.apply(object)
					}
				})(object))
			} else if (object.addEventListener) {
				object.addEventListener(type, function(event) {
					event.stopPropagation();
					fn.apply(this)
				}, false)
			}
		};
	var scrollevent = function() {
			objxttop = objxttop || document.getElementById("xttop");
			if (document.documentElement.scrollTop > 120 || document.body.scrollTop > 120) {
				objxttop.style.display = "block"
			} else {
				objxttop.style.display = "none"
			}
		};
	window.xttop = xttop;
	window.onscroll = scrollevent
})();