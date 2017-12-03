! function() {
	var t = function(t) {
			var e = {
				exports: {}
			};
			return t.call(e.exports, e, e.exports), e.exports
		},
		e = function(t, e) {
			if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
			t.prototype = Object.create(e && e.prototype, {
				constructor: {
					value: t,
					enumerable: !1,
					writable: !0,
					configurable: !0
				}
			}), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
		},
		n = function(t, e) {
			if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
			return !e || "object" != typeof e && "function" != typeof e ? t : e
		},
		r = function(t, e) {
			if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
		},
		i = function() {
			function t(t, e) {
				for (var n = 0; n < e.length; n++) {
					var r = e[n];
					r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r)
				}
			}
			return function(e, n, r) {
				return n && t(e.prototype, n), r && t(e, r), e
			}
		}(),
		o = Object.assign || function(t) {
			for (var e = 1; e < arguments.length; e++) {
				var n = arguments[e];
				for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r])
			}
			return t
		},
		a = function(t) {
			return t && t.__esModule ? t : {
				"default": t
			}
		},
		s = function t(e, n, r) {
			null === e && (e = Function.prototype);
			var i = Object.getOwnPropertyDescriptor(e, n);
			if (i === undefined) {
				var o = Object.getPrototypeOf(e);
				return null === o ? undefined : t(o, n, r)
			}
			if ("value" in i) return i.value;
			var a = i.get;
			return a === undefined ? undefined : a.call(r)
		},
		u = function() {
			function t(t, e) {
				var n = [],
					r = !0,
					i = !1,
					o = undefined;
				try {
					for (var a, s = t[Symbol.iterator](); !(r = (a = s.next()).done) && (n.push(a.value), !e || n.length !== e); r = !0);
				} catch (t) {
					i = !0, o = t
				} finally {
					try {
						!r && s["return"] && s["return"]()
					} finally {
						if (i) throw o
					}
				}
				return n
			}
			return function(e, n) {
				if (Array.isArray(e)) return e;
				if (Symbol.iterator in Object(e)) return t(e, n);
				throw new TypeError("Invalid attempt to destructure non-iterable instance")
			}
		}(),
		c = function(t, e) {
			var n = {};
			for (var r in t) e.indexOf(r) >= 0 || Object.prototype.hasOwnProperty.call(t, r) && (n[r] = t[r]);
			return n
		},
		l = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
			return typeof t
		} : function(t) {
			return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
		};
	(function() {
		this.ScriptLoader = function() {
			function t() {}
			return t.lazyLoad = function(t, e, n) {
				var r;
				if (null != (r = document.querySelector("." + e))) return "function" == typeof n ? n() : void 0;
				r = document.createElement("script"), r.async = !0, r.defer = !0, r.onload = n, r.src = t, r.className = e, document.getElementsByTagName("head")[0].appendChild(r)
			}, t
		}()
	}).call(this),
		function() {
			var t;
			this.AmazonPayments = {
				metadataTag: function() {
					return document.getElementById("amazon-payments-metadata")
				},
				metadata: function(t) {
					return AmazonPayments.metadataTag().getAttribute("data-amazon-payments-" + t)
				},
				withinFlow: function() {
					return null != AmazonPayments.metadataTag()
				},
				sellerId: function() {
					return AmazonPayments.metadata("seller-id")
				},
				language: function() {
					return AmazonPayments.metadata("language")
				},
				authorize: function() {
					var t, e;
					return t = AmazonPayments.metadata("callback-url"), e = {
						popup: !1,
						scope: "payments:widget payments:shipping_address"
					}, amazon.Login.authorize(e, t)
				}
			}, t = function() {
				function t() {
					window.addEventListener("pageshow", this.cleanup)
				}
				return t.prototype.assign = function(t) {
					return this.flow = this[t]
				}, t.prototype.execute = function(t) {
					return this.flow.call(this, t)
				}, t.prototype.checkout = function() {
					return AmazonPayments.authorize()
				}, t.prototype.cart = function(t) {
					var e;
					return e = document.createElement("input"), e.type = "hidden", e.name = "goto_amazon_payments", e.value = "amazon_payments", t.parentElement.appendChild(e), e.form.submit()
				}, t.prototype.cleanup = function() {
					var t;
					if (t = document.getElementsByName("goto_amazon_payments"), t.length > 0) return t.parentNode.removeChild(t)
				}, t
			}(), this.amazonPaymentsButtonHandler = new t, this.AmazonPaymentsPayButton = function() {
				var t, e;
				if (AmazonPayments.withinFlow()) return e = AmazonPayments.metadata("widget-library-url"), t = "amazon-payments-widget-library", ScriptLoader.lazyLoad(e, t, onAmazonPaymentsReady)
			}, this.AmazonPaymentsPayButtonReady = function(t) {
				var e, n, r, i, o, a;
				for (null == t && (t = document), r = t.getElementsByClassName("amazon-payments-pay-button"), a = [], i = 0, o = r.length; i < o; i++) n = r[i], "true" !== n.getAttribute("data-amazon-payments-pay-button") && (OffAmazonPayments.Button(n.id, AmazonPayments.sellerId(), {
					type: "PwA",
					size: "small",
					language: AmazonPayments.language(),
					authorization: function() {
						return amazonPaymentsButtonHandler.execute(n)
					},
					onError: function(t) {
						return "undefined" != typeof console && null !== console ? console.error(t.getErrorCode() + ": " + t.getErrorMessage()) : void 0
					}
				}), n.setAttribute("data-amazon-payments-pay-button", "true"), e = n.querySelector("img:not(.alt-payment-list__item__logo):not(.additional-checkout-button__logo)"), a.push(e.className += " alt-payment-list-amazon-button-image"));
				return a
			}
		}.call(this);
	var h = (t(function() {
			"use strict";
			window.amazonPaymentsButtonHandler.assign("cart"), window.onAmazonLoginReady = function() {
				amazon.Login.setSandboxMode(JSON.parse(AmazonPayments.metadata("sandbox-mode"))), amazon.Login.setClientId(AmazonPayments.metadata("client-id")), amazon.Login.setRegion(AmazonPayments.metadata("region")), amazon.Login.setUseCookie(!0)
			}, window.onAmazonPaymentsReady = function() {
				AmazonPaymentsPayButtonReady()
			}
		}), t(function(t, e) {
			"use strict";

			function n(t) {
				var e = document.createElement("input");
				e.setAttribute("type", "hidden"), e.setAttribute("name", "clear_cart"), e.setAttribute("value", "true"), t.appendChild(e);
				var n = t.elements.quantity,
					r = t.elements.id,
					i = document.createElement("input");
				i.setAttribute("type", "hidden"), i.setAttribute("name", "updates[" + r.value + "]"), i.setAttribute("value", n ? n.value : 1), t.appendChild(i), t.setAttribute("action", "/checkout"), window.ShopifyAnalytics.lib.track("Buy Now Button"), t.submit()
			}

			function r() {
				var t = document.getElementById("buy-now-button--checkout");
				if (t) {
					for (var e = void 0, r = document.forms, i = 0; i < r.length; i++)
						if (document.forms[i].action && -1 !== r[i].action.indexOf("cart/add")) {
							e = r[i];
							break
						}
					e && e.elements.id && (t.style.display = "inline-block", t.onclick = function(t) {
						t.preventDefault ? t.preventDefault() : t.returnValue = !1, t.preventDefault(), n(e)
					})
				}
			}
			Object.defineProperty(e, "__esModule", {
				value: !0
			}), e["default"] = r, window.Shopify = window.Shopify || {}, Shopify.StorefrontExpressButtons = Shopify.StorefrontExpressButtons || {}, Shopify.StorefrontExpressButtons.ExpressCheckout = {
				initialize: r
			}
		}), t(function(t, e) {
			"use strict";

			function n(t) {
				var e = document.querySelector('meta[name="' + r + "-" + t + '"]');
				return e ? e.getAttribute("content") : null
			}
			Object.defineProperty(e, "__esModule", {
				value: !0
			});
			var r = "shopify-checkout",
				i = {
					getApiToken: function() {
						return n("api-token")
					},
					getAuthorizationToken: function() {
						return n("authorization-token")
					}
				};
			e["default"] = i
		})),
		f = (t(function() {
			"use strict";
			! function() {
				function t(t) {
					this.message = t
				}
				var e = window,
					n = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
				t.prototype = new Error, t.prototype.name = "InvalidCharacterError", e.btoa || (e.btoa = function(e) {
					for (var r, i, o = String(e), a = 0, s = n, u = ""; o.charAt(0 | a) || (s = "=", a % 1); u += s.charAt(63 & r >> 8 - a % 1 * 8)) {
						if ((i = o.charCodeAt(a += .75)) > 255) throw new t("'btoa' failed: The string to be encoded contains characters outside of the Latin1 range.");
						r = r << 8 | i
					}
					return u
				}), e.atob || (e.atob = function(e) {
					var r = String(e).replace(/[=]+$/, "");
					if (r.length % 4 == 1) throw new t("'atob' failed: The string to be decoded is not correctly encoded.");
					for (var i, o, a = 0, s = 0, u = ""; o = r.charAt(s++); ~o && (i = a % 4 ? 64 * i + o : o, a++ % 4) ? u += String.fromCharCode(255 & i >> (-2 * a & 6)) : 0) o = n.indexOf(o);
					return u
				})
			}()
		}), t(function(t, i) {
			"use strict";
			Object.defineProperty(i, "__esModule", {
				value: !0
			});
			var o = function(t) {
				function i(t) {
					r(this, i);
					var e = n(this, (i.__proto__ || Object.getPrototypeOf(i)).call(this));
					return e.response = t, e.stack = (new Error).stack, e.name = e.constructor.name, e
				}
				return e(i, t), i
			}(Error);
			i["default"] = o
		}));
	! function(t) {
		"use strict";

		function e(t) {
			if ("string" != typeof t && (t = String(t)), /[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(t)) throw new TypeError("Invalid character in header field name");
			return t.toLowerCase()
		}

		function n(t) {
			return "string" != typeof t && (t = String(t)), t
		}

		function r(t) {
			var e = {
				next: function() {
					var e = t.shift();
					return {
						done: e === undefined,
						value: e
					}
				}
			};
			return v.iterable && (e[Symbol.iterator] = function() {
				return e
			}), e
		}

		function i(t) {
			this.map = {}, t instanceof i ? t.forEach(function(t, e) {
				this.append(e, t)
			}, this) : Array.isArray(t) ? t.forEach(function(t) {
				this.append(t[0], t[1])
			}, this) : t && Object.getOwnPropertyNames(t).forEach(function(e) {
				this.append(e, t[e])
			}, this)
		}

		function o(t) {
			if (t.bodyUsed) return Promise.reject(new TypeError("Already read"));
			t.bodyUsed = !0
		}

		function a(t) {
			return new Promise(function(e, n) {
				t.onload = function() {
					e(t.result)
				}, t.onerror = function() {
					n(t.error)
				}
			})
		}

		function s(t) {
			var e = new FileReader,
				n = a(e);
			return e.readAsArrayBuffer(t), n
		}

		function u(t) {
			var e = new FileReader,
				n = a(e);
			return e.readAsText(t), n
		}

		function c(t) {
			for (var e = new Uint8Array(t), n = new Array(e.length), r = 0; r < e.length; r++) n[r] = String.fromCharCode(e[r]);
			return n.join("")
		}

		function l(t) {
			if (t.slice) return t.slice(0);
			var e = new Uint8Array(t.byteLength);
			return e.set(new Uint8Array(t)), e.buffer
		}

		function h() {
			return this.bodyUsed = !1, this._initBody = function(t) {
				if (this._bodyInit = t, t)
					if ("string" == typeof t) this._bodyText = t;
					else if (v.blob && Blob.prototype.isPrototypeOf(t)) this._bodyBlob = t;
				else if (v.formData && FormData.prototype.isPrototypeOf(t)) this._bodyFormData = t;
				else if (v.searchParams && URLSearchParams.prototype.isPrototypeOf(t)) this._bodyText = t.toString();
				else if (v.arrayBuffer && v.blob && _(t)) this._bodyArrayBuffer = l(t.buffer), this._bodyInit = new Blob([this._bodyArrayBuffer]);
				else {
					if (!v.arrayBuffer || !ArrayBuffer.prototype.isPrototypeOf(t) && !g(t)) throw new Error("unsupported BodyInit type");
					this._bodyArrayBuffer = l(t)
				} else this._bodyText = "";
				this.headers.get("content-type") || ("string" == typeof t ? this.headers.set("content-type", "text/plain;charset=UTF-8") : this._bodyBlob && this._bodyBlob.type ? this.headers.set("content-type", this._bodyBlob.type) : v.searchParams && URLSearchParams.prototype.isPrototypeOf(t) && this.headers.set("content-type", "application/x-www-form-urlencoded;charset=UTF-8"))
			}, v.blob && (this.blob = function() {
				var t = o(this);
				if (t) return t;
				if (this._bodyBlob) return Promise.resolve(this._bodyBlob);
				if (this._bodyArrayBuffer) return Promise.resolve(new Blob([this._bodyArrayBuffer]));
				if (this._bodyFormData) throw new Error("could not read FormData body as blob");
				return Promise.resolve(new Blob([this._bodyText]))
			}, this.arrayBuffer = function() {
				return this._bodyArrayBuffer ? o(this) || Promise.resolve(this._bodyArrayBuffer) : this.blob().then(s)
			}), this.text = function() {
				var t = o(this);
				if (t) return t;
				if (this._bodyBlob) return u(this._bodyBlob);
				if (this._bodyArrayBuffer) return Promise.resolve(c(this._bodyArrayBuffer));
				if (this._bodyFormData) throw new Error("could not read FormData body as text");
				return Promise.resolve(this._bodyText)
			}, v.formData && (this.formData = function() {
				return this.text().then(p)
			}), this.json = function() {
				return this.text().then(JSON.parse)
			}, this
		}

		function f(t) {
			var e = t.toUpperCase();
			return k.indexOf(e) > -1 ? e : t
		}

		function d(t, e) {
			e = e || {};
			var n = e.body;
			if (t instanceof d) {
				if (t.bodyUsed) throw new TypeError("Already read");
				this.url = t.url, this.credentials = t.credentials, e.headers || (this.headers = new i(t.headers)), this.method = t.method, this.mode = t.mode, n || null == t._bodyInit || (n = t._bodyInit, t.bodyUsed = !0)
			} else this.url = String(t);
			if (this.credentials = e.credentials || this.credentials || "omit", !e.headers && this.headers || (this.headers = new i(e.headers)), this.method = f(e.method || this.method || "GET"), this.mode = e.mode || this.mode || null, this.referrer = null, ("GET" === this.method || "HEAD" === this.method) && n) throw new TypeError("Body not allowed for GET or HEAD requests");
			this._initBody(n)
		}

		function p(t) {
			var e = new FormData;
			return t.trim().split("&").forEach(function(t) {
				if (t) {
					var n = t.split("="),
						r = n.shift().replace(/\+/g, " "),
						i = n.join("=").replace(/\+/g, " ");
					e.append(decodeURIComponent(r), decodeURIComponent(i))
				}
			}), e
		}

		function y(t) {
			var e = new i;
			return t.split(/\r?\n/).forEach(function(t) {
				var n = t.split(":"),
					r = n.shift().trim();
				if (r) {
					var i = n.join(":").trim();
					e.append(r, i)
				}
			}), e
		}

		function m(t, e) {
			e || (e = {}), this.type = "default", this.status = "status" in e ? e.status : 200, this.ok = this.status >= 200 && this.status < 300, this.statusText = "statusText" in e ? e.statusText : "OK", this.headers = new i(e.headers), this.url = e.url || "", this._initBody(t)
		}
		if (!t.fetch) {
			var v = {
				searchParams: "URLSearchParams" in t,
				iterable: "Symbol" in t && "iterator" in Symbol,
				blob: "FileReader" in t && "Blob" in t && function() {
					try {
						return new Blob, !0
					} catch (t) {
						return !1
					}
				}(),
				formData: "FormData" in t,
				arrayBuffer: "ArrayBuffer" in t
			};
			if (v.arrayBuffer) var b = ["[object Int8Array]", "[object Uint8Array]", "[object Uint8ClampedArray]", "[object Int16Array]", "[object Uint16Array]", "[object Int32Array]", "[object Uint32Array]", "[object Float32Array]", "[object Float64Array]"],
				_ = function(t) {
					return t && DataView.prototype.isPrototypeOf(t)
				},
				g = ArrayBuffer.isView || function(t) {
					return t && b.indexOf(Object.prototype.toString.call(t)) > -1
				};
			i.prototype.append = function(t, r) {
				t = e(t), r = n(r);
				var i = this.map[t];
				this.map[t] = i ? i + "," + r : r
			}, i.prototype["delete"] = function(t) {
				delete this.map[e(t)]
			}, i.prototype.get = function(t) {
				return t = e(t), this.has(t) ? this.map[t] : null
			}, i.prototype.has = function(t) {
				return this.map.hasOwnProperty(e(t))
			}, i.prototype.set = function(t, r) {
				this.map[e(t)] = n(r)
			}, i.prototype.forEach = function(t, e) {
				for (var n in this.map) this.map.hasOwnProperty(n) && t.call(e, this.map[n], n, this)
			}, i.prototype.keys = function() {
				var t = [];
				return this.forEach(function(e, n) {
					t.push(n)
				}), r(t)
			}, i.prototype.values = function() {
				var t = [];
				return this.forEach(function(e) {
					t.push(e)
				}), r(t)
			}, i.prototype.entries = function() {
				var t = [];
				return this.forEach(function(e, n) {
					t.push([n, e])
				}), r(t)
			}, v.iterable && (i.prototype[Symbol.iterator] = i.prototype.entries);
			var k = ["DELETE", "GET", "HEAD", "OPTIONS", "POST", "PUT"];
			d.prototype.clone = function() {
				return new d(this, {
					body: this._bodyInit
				})
			}, h.call(d.prototype), h.call(m.prototype), m.prototype.clone = function() {
				return new m(this._bodyInit, {
					status: this.status,
					statusText: this.statusText,
					headers: new i(this.headers),
					url: this.url
				})
			}, m.error = function() {
				var t = new m(null, {
					status: 0,
					statusText: ""
				});
				return t.type = "error", t
			};
			var w = [301, 302, 303, 307, 308];
			m.redirect = function(t, e) {
				if (-1 === w.indexOf(e)) throw new RangeError("Invalid status code");
				return new m(null, {
					status: e,
					headers: {
						location: t
					}
				})
			}, t.Headers = i, t.Request = d, t.Response = m, t.fetch = function(t, e) {
				return new Promise(function(n, r) {
					var i = new d(t, e),
						o = new XMLHttpRequest;
					o.onload = function() {
						var t = {
							status: o.status,
							statusText: o.statusText,
							headers: y(o.getAllResponseHeaders() || "")
						};
						t.url = "responseURL" in o ? o.responseURL : t.headers.get("X-Request-URL");
						var e = "response" in o ? o.response : o.responseText;
						n(new m(e, t))
					}, o.onerror = function() {
						r(new TypeError("Network request failed"))
					}, o.ontimeout = function() {
						r(new TypeError("Network request failed"))
					}, o.open(i.method, i.url, !0), "include" === i.credentials && (o.withCredentials = !0), "responseType" in o && v.blob && (o.responseType = "blob"), i.headers.forEach(function(t, e) {
						o.setRequestHeader(e, t)
					}), o.send("undefined" == typeof i._bodyInit ? null : i._bodyInit)
				})
			}, t.fetch.polyfill = !0
		}
	}("undefined" != typeof self ? self : this);
	var d = t(function(t, e) {
			"use strict";

			function n(t, e) {
				var n = this,
					r = o({
						poll: !0,
						timeout: 2e4
					}, t),
					i = r.poll,
					a = r.timeout;
				if (!i || 202 !== e.status) return e;
				var s = {
					method: "GET",
					headers: this.headers
				};
				return new Promise(function(t, r) {
					n._pollExpiryTimeout = setTimeout(function() {
							clearTimeout(n._pollScheduleTimeout), r(new Error("API request polling timed out. Exceeded maximum timeout of " + a + "ms"))
						}, a),
						function e(n) {
							var i = this;
							if (202 === n.status) {
								var o = n.headers.get("Location"),
									a = 1e3 * (Number(n.headers.get("Retry-After")) || 1);
								this._pollScheduleTimeout = setTimeout(function() {
									fetch(o, s).then(e.bind(i))["catch"](r)
								}, a)
							} else clearTimeout(this._pollExpiryTimeout), t(n)
						}.call(n, e)
				})
			}

			function s(t) {
				return t.status >= 200 && t.status < 300 ? t : Promise.reject(new u["default"](t))
			}
			Object.defineProperty(e, "__esModule", {
				value: !0
			});
			var u = a(f),
				c = function() {
					function t(e) {
						var n = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
						r(this, t), this.host = e, this.headers = o({
							"Content-Type": "application/json",
							Accept: "application/json"
						}, n)
					}
					return i(t, [{
						key: "get",
						value: function(t, e) {
							return this.request("GET", t, null, e)
						}
					}, {
						key: "post",
						value: function(t, e, n) {
							return this.request("POST", t, e, n)
						}
					}, {
						key: "patch",
						value: function(t, e, n) {
							return this.request("PATCH", t, e, n)
						}
					}, {
						key: "put",
						value: function(t, e, n) {
							return this.request("PUT", t, e, n)
						}
					}, {
						key: "stopPolling",
						value: function() {
							clearTimeout(this._pollExpiryTimeout), clearTimeout(this._pollScheduleTimeout)
						}
					}, {
						key: "request",
						value: function(t, e, r, i) {
							var o = {
								method: t,
								headers: this.headers,
								body: r ? JSON.stringify(r) : null,
								credentials: "same-origin"
							};
							return "GET" === t && delete o.body, "/" === e[0] && this.host && (e = "https://" + this.host + e), fetch(e, o).then(n.bind(this, i)).then(s)
						}
					}]), t
				}();
			e["default"] = c
		}),
		p = t(function(t, o) {
			"use strict";

			function u(t) {
				var e = t.headers.get(y);
				return t.ok && this.storeAuthorizationToken(e), t
			}

			function c(t) {
				return 204 === t.status || 202 === t.status ? t : t.json()
			}

			function l(t) {
				return btoa(t + ":")
			}
			Object.defineProperty(o, "__esModule", {
				value: !0
			});
			var f = a(h),
				p = a(d),
				y = "X-Shopify-Checkout-Authorization-Token",
				m = function(t) {
					function o() {
						var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
							e = t.host,
							i = t.accessToken;
						r(this, o), i || (i = f["default"].getApiToken());
						var a = {
								Authorization: "Basic " + l(i),
								"X-Shopify-Checkout-Version": "2016-09-06"
							},
							s = n(this, (o.__proto__ || Object.getPrototypeOf(o)).call(this, e, a));
						return s.storeAuthorizationToken(f["default"].getAuthorizationToken()), s
					}
					return e(o, t), i(o, [{
						key: "request",
						value: function(t, e, n, r) {
							return s(o.prototype.__proto__ || Object.getPrototypeOf(o.prototype), "request", this).call(this, t, e, n, r).then(u.bind(this)).then(c)
						}
					}, {
						key: "storeAuthorizationToken",
						value: function(t) {
							t && (this.secretKey = t, this.headers[y] = t)
						}
					}, {
						key: "getCheckout",
						value: function(t) {
							return this.get("/api/checkouts/" + t + ".json")
						}
					}, {
						key: "createCheckout",
						value: function(t) {
							return t.checkout && null == t.checkout.secret && (t.checkout.secret = !0), this.post("/api/checkouts.json", t)
						}
					}, {
						key: "updateCheckout",
						value: function(t, e) {
							return this.patch("/api/checkouts/" + t + ".json", e)
						}
					}, {
						key: "getShippingRates",
						value: function(t) {
							return this.get("/api/checkouts/" + t + "/shipping_rates.json")
						}
					}, {
						key: "createPayment",
						value: function(t, e, n) {
							return this.post("/api/checkouts/" + t + "/payments.json", {
								payment: e
							}, n)
						}
					}, {
						key: "createPaymentSession",
						value: function(t, e) {
							return fetch(t, {
								headers: {
									Accept: "application/json",
									"Content-Type": "application/json"
								},
								body: JSON.stringify(e),
								mode: "cors",
								method: "POST"
							}).then(function(t) {
								return t.json()
							})
						}
					}]), o
				}(p["default"]);
			o["default"] = m
		}),
		y = t(function(t, e) {
			"use strict";
			Object.defineProperty(e, "__esModule", {
				value: !0
			});
			var n = {
				init: function() {
					return Promise.all([this.loadCSS(), this.loadDOM()])
				},
				loadCSS: function() {
					var t = this;
					return new Promise(function(e) {
						if (document.querySelector('link[href*="sheet/main.css"]')) return e(document.querySelector('link[href*="sheet/main.css"]'));
						var n = document.createElement("link"),
							r = document.createElement("img"),
							i = Shopify.Checkout.sheetStyleSheetUrl;
						return n.href = i, n.media = "all", n.rel = "stylesheet", n.type = "text/css", r.src = i, r.style.width = 0, r.style.height = 0, r.onerror = function() {
							r.parentNode.removeChild(r), e(n)
						}, t.stylesheet = n, document.head.appendChild(n), document.body.appendChild(r)
					})
				},
				loadDOM: function() {
					var t = this;
					return new Promise(function(e) {
						if (document.querySelector("#sheet-cleanslate")) return e(document.querySelector("#sheet-cleanslate"));
						var n = document.createElement("div");
						return n.setAttribute("style", "display: none !important"), n.setAttribute("tabindex", "-1"), n.setAttribute("aria-hidden", "true"), n.setAttribute("id", "sheet-cleanslate"), n.className = "cleanslate", n.innerHTML = '\n      <div id="sheet-container" class="sheet-container sheet-container--hidden">\n        <div class="sheet-backdrop sheet-backdrop--hidden" id="sheet-backdrop"></div>\n        <div class="sheet" id="sheet">\n          <div class="sheet-content sheet-content--hidden" aria-hidden="true" id="sheet-content"></div>\n          <div class="sheet-spinner-wrapper">\n            <svg id="sheet-spinner" class="sheet-spinner sheet-spinner--hidden icon--double-spinner" aria-hidden="true" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30">\n              <path class="icon--double-spinner__circle icon--double-spinner__outer-circle" d="M0 15c0 8.284 6.716 15 15 15 8.284 0 15-6.716 15-15 0-8.284-6.716-15-15-15-.552 0-1 .448-1 1s.448 1 1 1c7.18 0 13 5.82 13 13s-5.82 13-13 13S2 22.18 2 15c0-.552-.448-1-1-1s-1 .448-1 1z"></path>\n              <path class="icon--double-spinner__circle icon--double-spinner__inner-circle" d="M4 15c0 6.075 4.925 11 11 11s11-4.925 11-11S21.075 4 15 4c-.552 0-1 .448-1 1s.448 1 1 1c4.97 0 9 4.03 9 9s-4.03 9-9 9-9-4.03-9-9c0-.552-.448-1-1-1s-1 .448-1 1z"></path>\n            </svg>\n          </div>\n        </div>\n      </div>', document.body.appendChild(n), t.dom = n, e(n)
					})
				},
				unload: function() {
					this.stylesheet && this.stylesheet.remove(), this.dom && this.dom.remove()
				}
			};
			e["default"] = n
		}),
		m = t(function(t, e) {
			"use strict";

			function n(t, e) {
				c.matches = c.matches || c.webkitMatchesSelector || c.msMatchesSelector || c.mozMatchesSelector;
				for (var n = t; n && n !== document.body;)
					if (n = n.parentElement, n.matches(e)) return n;
				return null
			}

			function r() {
				for (var t = [], e = s(), n = e.length - 1; n >= 0; n--) t.push(u(e[n]));
				return t.join("")
			}

			function i(t) {
				return t ? t.dataset ? t.dataset : [].slice.call(t.attributes).reduce(function(t, e) {
					return /^data-/.test(e.name) && (t[e.name.substr(5)] = e.value), t
				}, {}) : null
			}

			function o(t) {
				window.location.assign(t)
			}

			function a(t, e) {
				var n = void 0;
				return function() {
					for (var r = this, i = arguments.length, o = Array(i), a = 0; a < i; a++) o[a] = arguments[a];
					clearTimeout(n), n = setTimeout(function() {
						n = null, t.apply(r, o)
					}, e)
				}
			}

			function s() {
				var t = window.crypto || window.msCrypto;
				if (t && t.getRandomValues) {
					var e = new Uint8Array(16);
					return t.getRandomValues(e), e
				}
				for (var n, r = new Array(16), i = 0; i < 16; i++) 0 == (3 & i) && (n = 4294967296 * Math.random()), r[i] = n >>> ((3 & i) << 3) & 255;
				return r
			}

			function u(t) {
				return (t + 256).toString(16).substr(1)
			}
			Object.defineProperty(e, "__esModule", {
				value: !0
			}), e.getClosest = n, e.generateRandomId = r, e.dataset = i, e.redirect = o, e.debounce = a;
			var c = Element.prototype
		}),
		v = t(function(t, e) {
			"use strict";

			function n(t) {
				"click" !== t.type && "Escape" !== t.key || v.hide()
			}

			function r(t) {
				t.target.innerHeight !== v.windowHeight && i(t.target.innerHeight)
			}

			function i(t) {
				var e = v.contentHeight ? v.contentHeight : f;
				p = t, v.maxHeight = p * h, v.setContentHeight(e), v.sheet.style.setProperty("max-height", v.maxHeight + "px", "important")
			}

			function o(t, e) {
				t.classList ? t.classList.add(e) : s(t, e) || t.setAttribute("class", t.getAttribute("class") + " " + e)
			}

			function s(t, e) {
				return t.getAttribute("class").indexOf(e) > -1
			}

			function c(t, e) {
				t.classList ? t.classList.remove(e) : s(t, e) && t.setAttribute("class", t.getAttribute("class").replace(e, " "))
			}
			Object.defineProperty(e, "__esModule", {
				value: !0
			});
			var l = a(y),
				h = .95,
				f = 580,
				d = 250,
				p = window.innerHeight,
				v = {
					load: function() {
						var t = this,
							e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : l["default"];
						return this.loader = e, this.loader.init().then(function(e) {
							var n = u(e, 2),
								i = n[0],
								o = n[1];
							return t.stylesheet = i, t.cleanslate = o, t.sheetContainer = o.querySelector("#sheet-container"), t.backdrop = t.sheetContainer.querySelector("#sheet-backdrop"), t.sheet = t.sheetContainer.querySelector("#sheet"), t.content = t.sheet.querySelector("#sheet-content"), t.spinner = t.sheet.querySelector("#sheet-spinner"), t.handleResize = (0, m.debounce)(r, d), t
						})
					},
					hasLoaded: function() {
						return "undefined" != typeof this.stylesheet && "undefined" != typeof this.cleanslate
					},
					setContent: function(t) {
						return !!this.hasLoaded() && (this.element && this.content.removeChild(this.element), this.element = t, this.content.appendChild(this.element), !0)
					},
					getSheetNode: function() {
						return !!this.hasLoaded() && this.sheet
					},
					hide: function() {
						return !!this.hasLoaded() && (this.sheetContainer.className.indexOf("sheet-container--hidden") >= 0 || (this.cleanslate.setAttribute("tabindex", "-1"), this.cleanslate.setAttribute("aria-hidden", "true"), this.cleanslate.setAttribute("style", "display: none !important"), this.sheetContainer.classList.add("sheet-container--hidden"), this.backdrop.classList.add("sheet-backdrop--hidden"), document.body.classList.remove("lock-scroll"), this.sheet.blur(), this.backdrop.removeEventListener("click", n), document.removeEventListener("keyup", n), window.removeEventListener("resize", this.handleResize), !0))
					},
					show: function() {
						return !!this.hasLoaded() && (-1 === this.sheetContainer.className.indexOf("sheet-container--hidden") || (this.cleanslate.removeAttribute("style"), this.cleanslate.removeAttribute("tabindex"), this.cleanslate.removeAttribute("aria-hidden"), this.sheetContainer.classList.remove("sheet-container--hidden"), this.backdrop.classList.remove("sheet-backdrop--hidden"), document.body.classList.add("lock-scroll"), this.sheet.focus(), i(window.innerHeight), this.backdrop.addEventListener("click", n), document.addEventListener("keyup", n), window.addEventListener("resize", this.handleResize), !0))
					},
					showContent: function() {
						this.show(), this.content.classList.remove("sheet-content--hidden"), this.content.removeAttribute("aria-hidden"), o(this.spinner, "sheet-content--hidden"), this.spinner.setAttribute("aria-hidden", "true")
					},
					showSpinner: function() {
						this.show(), c(this.spinner, "sheet-spinner--hidden"), this.spinner.removeAttribute("aria-hidden"), this.content.classList.add("sheet-content--hidden"), this.content.setAttribute("aria-hidden", "true")
					},
					setContentHeight: function(t) {
						if (!this.hasLoaded()) return !1;
						this.contentHeight = t;
						var e = this.contentHeight > this.maxHeight ? this.maxHeight : this.contentHeight;
						return this.content.style.setProperty("height", e + "px", "important"), !0
					},
					unload: function() {
						this.hide(), this.loader.unload(), delete this.stylesheet, delete this.cleanslate, delete this.sheetContainer, delete this.backdrop, delete this.sheet
					}
				};
			e["default"] = v
		}),
		b = t(function(t, e) {
			"use strict";

			function n(t, e, n) {
				var r = $.param({
						shopify_domain: Shopify.Checkout.apiHost,
						checkout_token: t.token,
						checkout_secret: e,
						session_token: n || "",
						metadata: {
							flow: "accelerated_flow_incontext"
						}
					}),
					i = document.createElement("iframe");
				return i.id = "shopify-pay-review-sheet", i.src = "https://" + window.Shopify.Checkout.rememberMeHost + "/customers?" + r, i
			}

			function r(t) {
				var e = t.indexOf(l),
					n = t.substring(0, e),
					r = t.substring(e + 1);
				return n !== c ? {} : JSON.parse(r)
			}

			function i() {
				document.cookie = "shopify_pay=;expires=Thu, 01 Jan 1970 00:00:01 GMT;"
			}

			function o(t) {
				window.location = t
			}
			Object.defineProperty(e, "__esModule", {
				value: !0
			}), e.ShopifyPaySheet = undefined;
			var s = a(v),
				u = 5e3,
				c = "shopify_pay",
				l = ":";
			e.ShopifyPaySheet = {
				init: function(t, e, r) {
					var i = this;
					return this.checkout = t, this.secretKey = e, this.cookie = r, s["default"].load().then(function(t) {
						return i.sheet = t, i.iframe ? t.showContent() : (i.iframe = n(i.checkout, i.secretKey, i.cookie), i.timeout = setTimeout(function() {
							o(i.checkout.web_url)
						}, u), i.sheet.setContent(i.iframe), i.sheet.showSpinner(), window.addEventListener("message", function(e) {
							return i.handleMessages(e, t)
						}))
					})
				},
				handleMessages: function(t, e) {
					var n = r(t.data);
					if (n !== {}) switch (n.action) {
						case "loaded":
							clearTimeout(this.timeout);
							break;
						case "ready":
							e.showContent();
							break;
						case "completed":
							o(n.redirectUrl);
							break;
						case "closed":
							e.hide();
							break;
						case "error":
							i(), o(this.checkout.web_url + "/clone");
							break;
						case "resized":
							e.setContentHeight(parseInt(n.height, 10));
							break;
						case "redirect":
							i(), o(n.clone ? this.checkout.web_url + "/clone" : this.checkout.web_url + "?step=" + n.step)
					}
				}
			}
		}),
		_ = t(function(t, e) {
			"use strict";

			function n(t) {
				return r().then(i).then(function(e) {
					return o(e.checkout, e.secretKey, t)
				}).then(Promise.resolve())
			}

			function r() {
				var t = document.querySelector('form[action="/cart"]');
				return fetch("/cart.json", {
					method: "POST",
					body: new FormData(t),
					headers: {
						Accept: "application/json"
					},
					credentials: "same-origin"
				}).then(function(t) {
					return t.json()
				})
			}

			function i(t) {
				var e = Shopify.Checkout.apiHost,
					n = new s["default"]({
						host: e
					});
				return n.createCheckout({
					checkout: {
						cart_token: t.token
					}
				}).then(function(t) {
					return Promise.resolve({
						checkout: t.checkout,
						secretKey: n.secretKey
					})
				})
			}

			function o(t, e, n) {
				b.ShopifyPaySheet.init(t, e, n)
			}
			Object.defineProperty(e, "__esModule", {
				value: !0
			}), e["default"] = n;
			var s = a(p)
		}),
		g = t(function(t, e) {
			"use strict";

			function n() {
				if (window.ShopifyExperiments && window.ShopifyExperiments.shopifyPayAcceleratedFlow && (h = i())) {
					var t = document.querySelectorAll(s + "," + u),
						e = !0,
						n = !1,
						o = undefined;
					try {
						for (var a, c = t[Symbol.iterator](); !(e = (a = c.next()).done); e = !0) {
							var f = a.value; - 1 === l.indexOf(f) && (l.push(f), f.addEventListener("click", r))
						}
					} catch (t) {
						n = !0, o = t
					} finally {
						try {
							!e && c["return"] && c["return"]()
						} finally {
							if (n) throw o
						}
					}
				}
			}

			function r(t) {
				t.preventDefault(), t.target.removeEventListener("click", r), ShopifyAnalytics.lib.track("accelerated_flow_incontext", {
					step: "started"
				}), setTimeout(function() {
					t.target.disabled = !0
				}), (0, o["default"])(h).then(function() {
					return t.target.disabled = !1, t.target.addEventListener("click", r)
				})["catch"](function() {
					ShopifyAnalytics.lib.track("accelerated_flow_incontext", {
						step: "failed"
					}), t.target.disabled = !1, t.target.click()
				})
			}

			function i() {
				var t = c.exec(document.cookie);
				return !!t && unescape(t[2])
			}
			Object.defineProperty(e, "__esModule", {
				value: !0
			}), e["default"] = n;
			var o = a(_),
				s = '[type="submit"][name="checkout"]',
				u = 'a[href="/checkout"]',
				c = new RegExp("(shopify_pay|remember_me_authentication)=([^;]+)"),
				l = [],
				h = void 0
		}),
		k = t(function(t) {
			var e = t.exports = "undefined" != typeof window && window.Math == Math ? window : "undefined" != typeof self && self.Math == Math ? self : Function("return this")();
			"number" == typeof __g && (__g = e)
		}),
		w = t(function(t) {
			var e = {}.hasOwnProperty;
			t.exports = function(t, n) {
				return e.call(t, n)
			}
		}),
		S = t(function(t) {
			t.exports = function(t) {
				try {
					return !!t()
				} catch (t) {
					return !0
				}
			}
		}),
		P = t(function(t) {
			t.exports = !S(function() {
				return 7 != Object.defineProperty({}, "a", {
					get: function() {
						return 7
					}
				}).a
			})
		}),
		A = t(function(t) {
			var e = t.exports = {
				version: "2.5.1"
			};
			"number" == typeof __e && (__e = e)
		}),
		E = t(function(t) {
			t.exports = function(t) {
				return "object" == typeof t ? null !== t : "function" == typeof t
			}
		}),
		C = t(function(t) {
			t.exports = function(t) {
				if (!E(t)) throw TypeError(t + " is not an object!");
				return t
			}
		}),
		x = t(function(t) {
			var e = k.document,
				n = E(e) && E(e.createElement);
			t.exports = function(t) {
				return n ? e.createElement(t) : {}
			}
		}),
		O = t(function(t) {
			t.exports = !P && !S(function() {
				return 7 != Object.defineProperty(x("div"), "a", {
					get: function() {
						return 7
					}
				}).a
			})
		}),
		T = t(function(t) {
			t.exports = function(t, e) {
				if (!E(t)) return t;
				var n, r;
				if (e && "function" == typeof(n = t.toString) && !E(r = n.call(t))) return r;
				if ("function" == typeof(n = t.valueOf) && !E(r = n.call(t))) return r;
				if (!e && "function" == typeof(n = t.toString) && !E(r = n.call(t))) return r;
				throw TypeError("Can't convert object to primitive value")
			}
		}),
		j = t(function(t, e) {
			var n = Object.defineProperty;
			e.f = P ? Object.defineProperty : function(t, e, r) {
				if (C(t), e = T(e, !0), C(r), O) try {
					return n(t, e, r)
				} catch (t) {}
				if ("get" in r || "set" in r) throw TypeError("Accessors not supported!");
				return "value" in r && (t[e] = r.value), t
			}
		}),
		I = t(function(t) {
			t.exports = function(t, e) {
				return {
					enumerable: !(1 & t),
					configurable: !(2 & t),
					writable: !(4 & t),
					value: e
				}
			}
		}),
		L = t(function(t) {
			t.exports = P ? function(t, e, n) {
				return j.f(t, e, I(1, n))
			} : function(t, e, n) {
				return t[e] = n, t
			}
		}),
		M = t(function(t) {
			var e = 0,
				n = Math.random();
			t.exports = function(t) {
				return "Symbol(".concat(t === undefined ? "" : t, ")_", (++e + n).toString(36))
			}
		}),
		z = t(function(t) {
			var e = M("src"),
				n = "toString",
				r = Function[n],
				i = ("" + r).split(n);
			A.inspectSource = function(t) {
				return r.call(t)
			}, (t.exports = function(t, n, r, o) {
				var a = "function" == typeof r;
				a && (w(r, "name") || L(r, "name", n)), t[n] !== r && (a && (w(r, e) || L(r, e, t[n] ? "" + t[n] : i.join(String(n)))), t === k ? t[n] = r : o ? t[n] ? t[n] = r : L(t, n, r) : (delete t[n], L(t, n, r)))
			})(Function.prototype, n, function() {
				return "function" == typeof this && this[e] || r.call(this)
			})
		}),
		R = t(function(t) {
			t.exports = function(t) {
				if ("function" != typeof t) throw TypeError(t + " is not a function!");
				return t
			}
		}),
		D = t(function(t) {
			t.exports = function(t, e, n) {
				if (R(t), e === undefined) return t;
				switch (n) {
					case 1:
						return function(n) {
							return t.call(e, n)
						};
					case 2:
						return function(n, r) {
							return t.call(e, n, r)
						};
					case 3:
						return function(n, r, i) {
							return t.call(e, n, r, i)
						}
				}
				return function() {
					return t.apply(e, arguments)
				}
			}
		}),
		F = t(function(t) {
			var e = "prototype",
				n = function(t, r, i) {
					var o, a, s, u, c = t & n.F,
						l = t & n.G,
						h = t & n.S,
						f = t & n.P,
						d = t & n.B,
						p = l ? k : h ? k[r] || (k[r] = {}) : (k[r] || {})[e],
						y = l ? A : A[r] || (A[r] = {}),
						m = y[e] || (y[e] = {});
					l && (i = r);
					for (o in i) a = !c && p && p[o] !== undefined, s = (a ? p : i)[o], u = d && a ? D(s, k) : f && "function" == typeof s ? D(Function.call, s) : s, p && z(p, o, s, t & n.U), y[o] != s && L(y, o, u), f && m[o] != s && (m[o] = s)
				};
			k.core = A, n.F = 1, n.G = 2, n.S = 4, n.P = 8, n.B = 16, n.W = 32, n.U = 64, n.R = 128, t.exports = n
		}),
		N = t(function(t) {
			var e = M("meta"),
				n = j.f,
				r = 0,
				i = Object.isExtensible || function() {
					return !0
				},
				o = !S(function() {
					return i(Object.preventExtensions({}))
				}),
				a = function(t) {
					n(t, e, {
						value: {
							i: "O" + ++r,
							w: {}
						}
					})
				},
				s = function(t, n) {
					if (!E(t)) return "symbol" == typeof t ? t : ("string" == typeof t ? "S" : "P") + t;
					if (!w(t, e)) {
						if (!i(t)) return "F";
						if (!n) return "E";
						a(t)
					}
					return t[e].i
				},
				u = function(t, n) {
					if (!w(t, e)) {
						if (!i(t)) return !0;
						if (!n) return !1;
						a(t)
					}
					return t[e].w
				},
				c = function(t) {
					return o && l.NEED && i(t) && !w(t, e) && a(t), t
				},
				l = t.exports = {
					KEY: e,
					NEED: !1,
					fastKey: s,
					getWeak: u,
					onFreeze: c
				}
		}),
		B = t(function(t) {
			var e = "__core-js_shared__",
				n = k[e] || (k[e] = {});
			t.exports = function(t) {
				return n[t] || (n[t] = {})
			}
		}),
		U = t(function(t) {
			var e = B("wks"),
				n = k.Symbol,
				r = "function" == typeof n;
			(t.exports = function(t) {
				return e[t] || (e[t] = r && n[t] || (r ? n : M)("Symbol." + t))
			}).store = e
		}),
		H = t(function(t) {
			var e = j.f,
				n = U("toStringTag");
			t.exports = function(t, r, i) {
				t && !w(t = i ? t : t.prototype, n) && e(t, n, {
					configurable: !0,
					value: r
				})
			}
		}),
		q = t(function(t, e) {
			e.f = U
		}),
		V = t(function(t) {
			t.exports = !1
		}),
		G = t(function(t) {
			var e = j.f;
			t.exports = function(t) {
				var n = A.Symbol || (A.Symbol = V ? {} : k.Symbol || {});
				"_" == t.charAt(0) || t in n || e(n, t, {
					value: q.f(t)
				})
			}
		}),
		W = t(function(t) {
			var e = {}.toString;
			t.exports = function(t) {
				return e.call(t).slice(8, -1)
			}
		}),
		J = t(function(t) {
			t.exports = Object("z").propertyIsEnumerable(0) ? Object : function(t) {
				return "String" == W(t) ? t.split("") : Object(t)
			}
		}),
		Y = t(function(t) {
			t.exports = function(t) {
				if (t == undefined) throw TypeError("Can't call method on  " + t);
				return t
			}
		}),
		K = t(function(t) {
			t.exports = function(t) {
				return J(Y(t))
			}
		}),
		Z = t(function(t) {
			var e = Math.ceil,
				n = Math.floor;
			t.exports = function(t) {
				return isNaN(t = +t) ? 0 : (t > 0 ? n : e)(t)
			}
		}),
		X = t(function(t) {
			var e = Math.min;
			t.exports = function(t) {
				return t > 0 ? e(Z(t), 9007199254740991) : 0
			}
		}),
		Q = t(function(t) {
			var e = Math.max,
				n = Math.min;
			t.exports = function(t, r) {
				return t = Z(t), t < 0 ? e(t + r, 0) : n(t, r)
			}
		}),
		tt = t(function(t) {
			t.exports = function(t) {
				return function(e, n, r) {
					var i, o = K(e),
						a = X(o.length),
						s = Q(r, a);
					if (t && n != n) {
						for (; a > s;)
							if ((i = o[s++]) != i) return !0
					} else
						for (; a > s; s++)
							if ((t || s in o) && o[s] === n) return t || s || 0;
					return !t && -1
				}
			}
		}),
		et = t(function(t) {
			var e = B("keys");
			t.exports = function(t) {
				return e[t] || (e[t] = M(t))
			}
		}),
		nt = t(function(t) {
			var e = tt(!1),
				n = et("IE_PROTO");
			t.exports = function(t, r) {
				var i, o = K(t),
					a = 0,
					s = [];
				for (i in o) i != n && w(o, i) && s.push(i);
				for (; r.length > a;) w(o, i = r[a++]) && (~e(s, i) || s.push(i));
				return s
			}
		}),
		rt = t(function(t) {
			t.exports = "constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",")
		}),
		it = t(function(t) {
			t.exports = Object.keys || function(t) {
				return nt(t, rt)
			}
		}),
		ot = t(function(t, e) {
			e.f = Object.getOwnPropertySymbols
		}),
		at = t(function(t, e) {
			e.f = {}.propertyIsEnumerable
		}),
		st = t(function(t) {
			t.exports = function(t) {
				var e = it(t),
					n = ot.f;
				if (n)
					for (var r, i = n(t), o = at.f, a = 0; i.length > a;) o.call(t, r = i[a++]) && e.push(r);
				return e
			}
		}),
		ut = t(function(t) {
			t.exports = Array.isArray || function(t) {
				return "Array" == W(t)
			}
		}),
		ct = t(function(t) {
			t.exports = P ? Object.defineProperties : function(t, e) {
				C(t);
				for (var n, r = it(e), i = r.length, o = 0; i > o;) j.f(t, n = r[o++], e[n]);
				return t
			}
		}),
		lt = t(function(t) {
			var e = k.document;
			t.exports = e && e.documentElement
		}),
		ht = t(function(t) {
			var e = et("IE_PROTO"),
				n = function() {},
				r = "prototype",
				i = function() {
					var t, e = x("iframe"),
						n = rt.length,
						o = "<",
						a = ">";
					for (e.style.display = "none", lt.appendChild(e), e.src = "javascript:", t = e.contentWindow.document, t.open(), t.write(o + "script" + a + "document.F=Object" + o + "/script" + a), t.close(), i = t.F; n--;) delete i[r][rt[n]];
					return i()
				};
			t.exports = Object.create || function(t, o) {
				var a;
				return null !== t ? (n[r] = C(t), a = new n, n[r] = null, a[e] = t) : a = i(), o === undefined ? a : ct(a, o)
			}
		}),
		ft = t(function(t, e) {
			var n = rt.concat("length", "prototype");
			e.f = Object.getOwnPropertyNames || function(t) {
				return nt(t, n)
			}
		}),
		dt = t(function(t) {
			var e = ft.f,
				n = {}.toString,
				r = "object" == typeof window && window && Object.getOwnPropertyNames ? Object.getOwnPropertyNames(window) : [],
				i = function(t) {
					try {
						return e(t)
					} catch (t) {
						return r.slice()
					}
				};
			t.exports.f = function(t) {
				return r && "[object Window]" == n.call(t) ? i(t) : e(K(t))
			}
		}),
		pt = t(function(t, e) {
			var n = Object.getOwnPropertyDescriptor;
			e.f = P ? n : function(t, e) {
				if (t = K(t), e = T(e, !0), O) try {
					return n(t, e)
				} catch (t) {}
				if (w(t, e)) return I(!at.f.call(t, e), t[e])
			}
		}),
		yt = (t(function() {
			"use strict";
			var t = N.KEY,
				e = pt.f,
				n = j.f,
				r = dt.f,
				i = k.Symbol,
				o = k.JSON,
				a = o && o.stringify,
				s = "prototype",
				u = U("_hidden"),
				c = U("toPrimitive"),
				l = {}.propertyIsEnumerable,
				h = B("symbol-registry"),
				f = B("symbols"),
				d = B("op-symbols"),
				p = Object[s],
				y = "function" == typeof i,
				m = k.QObject,
				v = !m || !m[s] || !m[s].findChild,
				b = P && S(function() {
					return 7 != ht(n({}, "a", {
						get: function() {
							return n(this, "a", {
								value: 7
							}).a
						}
					})).a
				}) ? function(t, r, i) {
					var o = e(p, r);
					o && delete p[r], n(t, r, i), o && t !== p && n(p, r, o)
				} : n,
				_ = function(t) {
					var e = f[t] = ht(i[s]);
					return e._k = t, e
				},
				g = y && "symbol" == typeof i.iterator ? function(t) {
					return "symbol" == typeof t
				} : function(t) {
					return t instanceof i
				},
				A = function(t, e, r) {
					return t === p && A(d, e, r), C(t), e = T(e, !0), C(r), w(f, e) ? (r.enumerable ? (w(t, u) && t[u][e] && (t[u][e] = !1), r = ht(r, {
						enumerable: I(0, !1)
					})) : (w(t, u) || n(t, u, I(1, {})), t[u][e] = !0), b(t, e, r)) : n(t, e, r)
				},
				E = function(t, e) {
					C(t);
					for (var n, r = st(e = K(e)), i = 0, o = r.length; o > i;) A(t, n = r[i++], e[n]);
					return t
				},
				x = function(t, e) {
					return e === undefined ? ht(t) : E(ht(t), e)
				},
				O = function(t) {
					var e = l.call(this, t = T(t, !0));
					return !(this === p && w(f, t) && !w(d, t)) && (!(e || !w(this, t) || !w(f, t) || w(this, u) && this[u][t]) || e)
				},
				R = function(t, n) {
					if (t = K(t), n = T(n, !0), t !== p || !w(f, n) || w(d, n)) {
						var r = e(t, n);
						return !r || !w(f, n) || w(t, u) && t[u][n] || (r.enumerable = !0), r
					}
				},
				D = function(e) {
					for (var n, i = r(K(e)), o = [], a = 0; i.length > a;) w(f, n = i[a++]) || n == u || n == t || o.push(n);
					return o
				},
				$ = function(t) {
					for (var e, n = t === p, i = r(n ? d : K(t)), o = [], a = 0; i.length > a;) !w(f, e = i[a++]) || n && !w(p, e) || o.push(f[e]);
					return o
				};
			y || (i = function() {
				if (this instanceof i) throw TypeError("Symbol is not a constructor!");
				var t = M(arguments.length > 0 ? arguments[0] : undefined),
					e = function(n) {
						this === p && e.call(d, n), w(this, u) && w(this[u], t) && (this[u][t] = !1), b(this, t, I(1, n))
					};
				return P && v && b(p, t, {
					configurable: !0,
					set: e
				}), _(t)
			}, z(i[s], "toString", function() {
				return this._k
			}), pt.f = R, j.f = A, ft.f = dt.f = D, at.f = O, ot.f = $, P && !V && z(p, "propertyIsEnumerable", O, !0), q.f = function(t) {
				return _(U(t))
			}), F(F.G + F.W + F.F * !y, {
				Symbol: i
			});
			for (var W = "hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables".split(","), J = 0; W.length > J;) U(W[J++]);
			for (var Y = it(U.store), Z = 0; Y.length > Z;) G(Y[Z++]);
			F(F.S + F.F * !y, "Symbol", {
				"for": function(t) {
					return w(h, t += "") ? h[t] : h[t] = i(t)
				},
				keyFor: function(t) {
					if (!g(t)) throw TypeError(t + " is not a symbol!");
					for (var e in h)
						if (h[e] === t) return e
				},
				useSetter: function() {
					v = !0
				},
				useSimple: function() {
					v = !1
				}
			}), F(F.S + F.F * !y, "Object", {
				create: x,
				defineProperty: A,
				defineProperties: E,
				getOwnPropertyDescriptor: R,
				getOwnPropertyNames: D,
				getOwnPropertySymbols: $
			}), o && F(F.S + F.F * (!y || S(function() {
				var t = i();
				return "[null]" != a([t]) || "{}" != a({
					a: t
				}) || "{}" != a(Object(t))
			})), "JSON", {
				stringify: function(t) {
					if (t !== undefined && !g(t)) {
						for (var e, n, r = [t], i = 1; arguments.length > i;) r.push(arguments[i++]);
						return e = r[1], "function" == typeof e && (n = e), !n && ut(e) || (e = function(t, e) {
							if (n && (e = n.call(this, t, e)), !g(e)) return e
						}), r[1] = e, a.apply(o, r)
					}
				}
			}), i[s][c] || L(i[s], c, i[s].valueOf), H(i, "Symbol"), H(Math, "Math", !0), H(k.JSON, "JSON", !0)
		}), t(function(t) {
			var e = U("toStringTag"),
				n = "Arguments" == W(function() {
					return arguments
				}()),
				r = function(t, e) {
					try {
						return t[e]
					} catch (t) {}
				};
			t.exports = function(t) {
				var i, o, a;
				return t === undefined ? "Undefined" : null === t ? "Null" : "string" == typeof(o = r(i = Object(t), e)) ? o : n ? W(i) : "Object" == (a = W(i)) && "function" == typeof i.callee ? "Arguments" : a
			}
		})),
		mt = (t(function() {
			"use strict";
			var t = {};
			t[U("toStringTag")] = "z", t + "" != "[object z]" && z(Object.prototype, "toString", function() {
				return "[object " + yt(this) + "]"
			}, !0)
		}), t(function(t) {
			t.exports = A.Symbol
		}), t(function(t, e) {
			"use strict";

			function n(t) {
				"loading" !== document.readyState ? t() : document.addEventListener ? document.addEventListener("DOMContentLoaded", t) : document.attachEvent("onreadystatechange", function() {
					"loading" !== document.readyState && t()
				})
			}
			Object.defineProperty(e, "__esModule", {
				value: !0
			}), e["default"] = n
		})),
		vt = t(function(t) {
			t.exports = function(t) {
				return function(e, n) {
					var r, i, o = String(Y(e)),
						a = Z(n),
						s = o.length;
					return a < 0 || a >= s ? t ? "" : undefined : (r = o.charCodeAt(a), r < 55296 || r > 56319 || a + 1 === s || (i = o.charCodeAt(a + 1)) < 56320 || i > 57343 ? t ? o.charAt(a) : r : t ? o.slice(a, a + 2) : i - 56320 + (r - 55296 << 10) + 65536)
				}
			}
		}),
		bt = t(function(t) {
			t.exports = {}
		}),
		_t = t(function(t) {
			"use strict";
			var e = {};
			L(e, U("iterator"), function() {
				return this
			}), t.exports = function(t, n, r) {
				t.prototype = ht(e, {
					next: I(1, r)
				}), H(t, n + " Iterator")
			}
		}),
		gt = t(function(t) {
			t.exports = function(t) {
				return Object(Y(t))
			}
		}),
		kt = t(function(t) {
			var e = et("IE_PROTO"),
				n = Object.prototype;
			t.exports = Object.getPrototypeOf || function(t) {
				return t = gt(t), w(t, e) ? t[e] : "function" == typeof t.constructor && t instanceof t.constructor ? t.constructor.prototype : t instanceof Object ? n : null
			}
		}),
		wt = t(function(t) {
			"use strict";
			var e = U("iterator"),
				n = !([].keys && "next" in [].keys()),
				r = "keys",
				i = "values",
				o = function() {
					return this
				};
			t.exports = function(t, a, s, u, c, l, h) {
				_t(s, a, u);
				var f, d, p, y = function(t) {
						if (!n && t in _) return _[t];
						switch (t) {
							case r:
							case i:
								return function() {
									return new s(this, t)
								}
						}
						return function() {
							return new s(this, t)
						}
					},
					m = a + " Iterator",
					v = c == i,
					b = !1,
					_ = t.prototype,
					g = _[e] || _["@@iterator"] || c && _[c],
					k = g || y(c),
					S = c ? v ? y("entries") : k : undefined,
					P = "Array" == a ? _.entries || g : g;
				if (P && (p = kt(P.call(new t))) !== Object.prototype && p.next && (H(p, m, !0), V || w(p, e) || L(p, e, o)), v && g && g.name !== i && (b = !0, k = function() {
						return g.call(this)
					}), V && !h || !n && !b && _[e] || L(_, e, k), bt[a] = k, bt[m] = o, c)
					if (f = {
							values: v ? k : y(i),
							keys: l ? k : y(r),
							entries: S
						}, h)
						for (d in f) d in _ || z(_, d, f[d]);
					else F(F.P + F.F * (n || b), a, f);
				return f
			}
		}),
		St = (t(function() {
			"use strict";
			var t = vt(!0);
			wt(String, "String", function(t) {
				this._t = String(t), this._i = 0
			}, function() {
				var e, n = this._t,
					r = this._i;
				return r >= n.length ? {
					value: undefined,
					done: !0
				} : (e = t(n, r), this._i += e.length, {
					value: e,
					done: !1
				})
			})
		}), t(function(t) {
			var e = U("unscopables"),
				n = Array.prototype;
			n[e] == undefined && L(n, e, {}), t.exports = function(t) {
				n[e][t] = !0
			}
		})),
		Pt = t(function(t) {
			t.exports = function(t, e) {
				return {
					value: e,
					done: !!t
				}
			}
		}),
		At = t(function(t) {
			"use strict";
			t.exports = wt(Array, "Array", function(t, e) {
				this._t = K(t), this._i = 0, this._k = e
			}, function() {
				var t = this._t,
					e = this._k,
					n = this._i++;
				return !t || n >= t.length ? (this._t = undefined, Pt(1)) : "keys" == e ? Pt(0, n) : "values" == e ? Pt(0, t[n]) : Pt(0, [n, t[n]])
			}, "values"), bt.Arguments = bt.Array, St("keys"), St("values"), St("entries")
		}),
		Et = (t(function() {
			for (var t = U("iterator"), e = U("toStringTag"), n = bt.Array, r = {
					CSSRuleList: !0,
					CSSStyleDeclaration: !1,
					CSSValueList: !1,
					ClientRectList: !1,
					DOMRectList: !1,
					DOMStringList: !1,
					DOMTokenList: !0,
					DataTransferItemList: !1,
					FileList: !1,
					HTMLAllCollection: !1,
					HTMLCollection: !1,
					HTMLFormElement: !1,
					HTMLSelectElement: !1,
					MediaList: !0,
					MimeTypeArray: !1,
					NamedNodeMap: !1,
					NodeList: !0,
					PaintRequestList: !1,
					Plugin: !1,
					PluginArray: !1,
					SVGLengthList: !1,
					SVGNumberList: !1,
					SVGPathSegList: !1,
					SVGPointList: !1,
					SVGStringList: !1,
					SVGTransformList: !1,
					SourceBufferList: !1,
					StyleSheetList: !0,
					TextTrackCueList: !1,
					TextTrackList: !1,
					TouchList: !1
				}, i = it(r), o = 0; o < i.length; o++) {
				var a, s = i[o],
					u = r[s],
					c = k[s],
					l = c && c.prototype;
				if (l && (l[t] || L(l, t, n), l[e] || L(l, e, s), bt[s] = n, u))
					for (a in At) l[a] || z(l, a, At[a], !0)
			}
		}), t(function(t) {
			t.exports = function(t, e, n, r) {
				if (!(t instanceof e) || r !== undefined && r in t) throw TypeError(n + ": incorrect invocation!");
				return t
			}
		})),
		Ct = t(function(t) {
			t.exports = function(t, e, n, r) {
				try {
					return r ? e(C(n)[0], n[1]) : e(n)
				} catch (e) {
					var i = t["return"];
					throw i !== undefined && C(i.call(t)), e
				}
			}
		}),
		xt = t(function(t) {
			var e = U("iterator"),
				n = Array.prototype;
			t.exports = function(t) {
				return t !== undefined && (bt.Array === t || n[e] === t)
			}
		}),
		Ot = t(function(t) {
			var e = U("iterator");
			t.exports = A.getIteratorMethod = function(t) {
				if (t != undefined) return t[e] || t["@@iterator"] || bt[yt(t)]
			}
		}),
		Tt = t(function(t, e) {
			var n = {},
				r = {},
				e = t.exports = function(t, e, i, o, a) {
					var s, u, c, l, h = a ? function() {
							return t
						} : Ot(t),
						f = D(i, o, e ? 2 : 1),
						d = 0;
					if ("function" != typeof h) throw TypeError(t + " is not iterable!");
					if (xt(h)) {
						for (s = X(t.length); s > d; d++)
							if ((l = e ? f(C(u = t[d])[0], u[1]) : f(t[d])) === n || l === r) return l
					} else
						for (c = h.call(t); !(u = c.next()).done;)
							if ((l = Ct(c, f, u.value, e)) === n || l === r) return l
				};
			e.BREAK = n, e.RETURN = r
		}),
		jt = t(function(t) {
			var e = U("species");
			t.exports = function(t, n) {
				var r, i = C(t).constructor;
				return i === undefined || (r = C(i)[e]) == undefined ? n : R(r)
			}
		}),
		It = t(function(t) {
			t.exports = function(t, e, n) {
				var r = n === undefined;
				switch (e.length) {
					case 0:
						return r ? t() : t.call(n);
					case 1:
						return r ? t(e[0]) : t.call(n, e[0]);
					case 2:
						return r ? t(e[0], e[1]) : t.call(n, e[0], e[1]);
					case 3:
						return r ? t(e[0], e[1], e[2]) : t.call(n, e[0], e[1], e[2]);
					case 4:
						return r ? t(e[0], e[1], e[2], e[3]) : t.call(n, e[0], e[1], e[2], e[3])
				}
				return t.apply(n, e)
			}
		}),
		Lt = t(function(t) {
			var e, n, r, i = k.process,
				o = k.setImmediate,
				a = k.clearImmediate,
				s = k.MessageChannel,
				u = k.Dispatch,
				c = 0,
				l = {},
				h = "onreadystatechange",
				f = function() {
					var t = +this;
					if (l.hasOwnProperty(t)) {
						var e = l[t];
						delete l[t], e()
					}
				},
				d = function(t) {
					f.call(t.data)
				};
			o && a || (o = function(t) {
				for (var n = [], r = 1; arguments.length > r;) n.push(arguments[r++]);
				return l[++c] = function() {
					It("function" == typeof t ? t : Function(t), n)
				}, e(c), c
			}, a = function(t) {
				delete l[t]
			}, "process" == W(i) ? e = function(t) {
				i.nextTick(D(f, t, 1))
			} : u && u.now ? e = function(t) {
				u.now(D(f, t, 1))
			} : s ? (n = new s, r = n.port2, n.port1.onmessage = d, e = D(r.postMessage, r, 1)) : k.addEventListener && "function" == typeof postMessage && !k.importScripts ? (e = function(t) {
				k.postMessage(t + "", "*")
			}, k.addEventListener("message", d, !1)) : e = h in x("script") ? function(t) {
				lt.appendChild(x("script"))[h] = function() {
					lt.removeChild(this), f.call(t)
				}
			} : function(t) {
				setTimeout(D(f, t, 1), 0)
			}), t.exports = {
				set: o,
				clear: a
			}
		}),
		Mt = t(function(t) {
			var e = Lt.set,
				n = k.MutationObserver || k.WebKitMutationObserver,
				r = k.process,
				i = k.Promise,
				o = "process" == W(r);
			t.exports = function() {
				var t, a, s, u = function() {
					var e, n;
					for (o && (e = r.domain) && e.exit(); t;) {
						n = t.fn, t = t.next;
						try {
							n()
						} catch (e) {
							throw t ? s() : a = undefined, e
						}
					}
					a = undefined, e && e.enter()
				};
				if (o) s = function() {
					r.nextTick(u)
				};
				else if (n) {
					var c = !0,
						l = document.createTextNode("");
					new n(u).observe(l, {
						characterData: !0
					}), s = function() {
						l.data = c = !c
					}
				} else if (i && i.resolve) {
					var h = i.resolve();
					s = function() {
						h.then(u)
					}
				} else s = function() {
					e.call(k, u)
				};
				return function(e) {
					var n = {
						fn: e,
						next: undefined
					};
					a && (a.next = n), t || (t = n, s()), a = n
				}
			}
		}),
		zt = t(function(t) {
			"use strict";

			function e(t) {
				var e, n;
				this.promise = new t(function(t, r) {
					if (e !== undefined || n !== undefined) throw TypeError("Bad Promise constructor");
					e = t, n = r
				}), this.resolve = R(e), this.reject = R(n)
			}
			t.exports.f = function(t) {
				return new e(t)
			}
		}),
		Rt = t(function(t) {
			t.exports = function(t) {
				try {
					return {
						e: !1,
						v: t()
					}
				} catch (t) {
					return {
						e: !0,
						v: t
					}
				}
			}
		}),
		Dt = t(function(t) {
			t.exports = function(t, e) {
				if (C(t), E(e) && e.constructor === t) return e;
				var n = zt.f(t);
				return (0, n.resolve)(e), n.promise
			}
		}),
		Ft = t(function(t) {
			t.exports = function(t, e, n) {
				for (var r in e) z(t, r, e[r], n);
				return t
			}
		}),
		Nt = t(function(t) {
			"use strict";
			var e = U("species");
			t.exports = function(t) {
				var n = k[t];
				P && n && !n[e] && j.f(n, e, {
					configurable: !0,
					get: function() {
						return this
					}
				})
			}
		}),
		Bt = t(function(t) {
			var e = U("iterator"),
				n = !1;
			try {
				var r = [7][e]();
				r["return"] = function() {
					n = !0
				}, Array.from(r, function() {
					throw 2
				})
			} catch (t) {}
			t.exports = function(t, r) {
				if (!r && !n) return !1;
				var i = !1;
				try {
					var o = [7],
						a = o[e]();
					a.next = function() {
						return {
							done: i = !0
						}
					}, o[e] = function() {
						return a
					}, t(o)
				} catch (t) {}
				return i
			}
		}),
		Ut = (t(function() {
			"use strict";
			var t, e, n, r, i = Lt.set,
				o = Mt(),
				a = "Promise",
				s = k.TypeError,
				u = k.process,
				c = k[a],
				l = "process" == yt(u),
				h = function() {},
				f = e = zt.f,
				d = !! function() {
					try {
						var t = c.resolve(1),
							e = (t.constructor = {})[U("species")] = function(t) {
								t(h, h)
							};
						return (l || "function" == typeof PromiseRejectionEvent) && t.then(h) instanceof e
					} catch (t) {}
				}(),
				p = function(t) {
					var e;
					return !(!E(t) || "function" != typeof(e = t.then)) && e
				},
				y = function(t, e) {
					if (!t._n) {
						t._n = !0;
						var n = t._c;
						o(function() {
							for (var r = t._v, i = 1 == t._s, o = 0, a = function(e) {
									var n, o, a = i ? e.ok : e.fail,
										u = e.resolve,
										c = e.reject,
										l = e.domain;
									try {
										a ? (i || (2 == t._h && b(t), t._h = 1), !0 === a ? n = r : (l && l.enter(), n = a(r), l && l.exit()), n === e.promise ? c(s("Promise-chain cycle")) : (o = p(n)) ? o.call(n, u, c) : u(n)) : c(r)
									} catch (t) {
										c(t)
									}
								}; n.length > o;) a(n[o++]);
							t._c = [], t._n = !1, e && !t._h && m(t)
						})
					}
				},
				m = function(t) {
					i.call(k, function() {
						var e, n, r, i = t._v,
							o = v(t);
						if (o && (e = Rt(function() {
								l ? u.emit("unhandledRejection", i, t) : (n = k.onunhandledrejection) ? n({
									promise: t,
									reason: i
								}) : (r = k.console) && r.error && r.error("Unhandled promise rejection", i)
							}), t._h = l || v(t) ? 2 : 1), t._a = undefined, o && e.e) throw e.v
					})
				},
				v = function(t) {
					if (1 == t._h) return !1;
					for (var e, n = t._a || t._c, r = 0; n.length > r;)
						if (e = n[r++], e.fail || !v(e.promise)) return !1;
					return !0
				},
				b = function(t) {
					i.call(k, function() {
						var e;
						l ? u.emit("rejectionHandled", t) : (e = k.onrejectionhandled) && e({
							promise: t,
							reason: t._v
						})
					})
				},
				_ = function(t) {
					var e = this;
					e._d || (e._d = !0, e = e._w || e, e._v = t, e._s = 2, e._a || (e._a = e._c.slice()), y(e, !0))
				},
				g = function(t) {
					var e, n = this;
					if (!n._d) {
						n._d = !0, n = n._w || n;
						try {
							if (n === t) throw s("Promise can't be resolved itself");
							(e = p(t)) ? o(function() {
								var r = {
									_w: n,
									_d: !1
								};
								try {
									e.call(t, D(g, r, 1), D(_, r, 1))
								} catch (t) {
									_.call(r, t)
								}
							}): (n._v = t, n._s = 1, y(n, !1))
						} catch (t) {
							_.call({
								_w: n,
								_d: !1
							}, t)
						}
					}
				};
			d || (c = function(e) {
				Et(this, c, a, "_h"), R(e), t.call(this);
				try {
					e(D(g, this, 1), D(_, this, 1))
				} catch (t) {
					_.call(this, t)
				}
			}, t = function() {
				this._c = [], this._a = undefined, this._s = 0, this._d = !1, this._v = undefined, this._h = 0, this._n = !1
			}, t.prototype = Ft(c.prototype, {
				then: function(t, e) {
					var n = f(jt(this, c));
					return n.ok = "function" != typeof t || t, n.fail = "function" == typeof e && e, n.domain = l ? u.domain : undefined, this._c.push(n), this._a && this._a.push(n), this._s && y(this, !1), n.promise
				},
				"catch": function(t) {
					return this.then(undefined, t)
				}
			}), n = function() {
				var e = new t;
				this.promise = e, this.resolve = D(g, e, 1), this.reject = D(_, e, 1)
			}, zt.f = f = function(t) {
				return t === c || t === r ? new n(t) : e(t)
			}), F(F.G + F.W + F.F * !d, {
				Promise: c
			}), H(c, a), Nt(a), r = A[a], F(F.S + F.F * !d, a, {
				reject: function(t) {
					var e = f(this);
					return (0, e.reject)(t), e.promise
				}
			}), F(F.S + F.F * (V || !d), a, {
				resolve: function(t) {
					return Dt(V && this === r ? c : this, t)
				}
			}), F(F.S + F.F * !(d && Bt(function(t) {
				c.all(t)["catch"](h)
			})), a, {
				all: function(t) {
					var e = this,
						n = f(e),
						r = n.resolve,
						i = n.reject,
						o = Rt(function() {
							var n = [],
								o = 0,
								a = 1;
							Tt(t, !1, function(t) {
								var s = o++,
									u = !1;
								n.push(undefined), a++, e.resolve(t).then(function(t) {
									u || (u = !0, n[s] = t, --a || r(n))
								}, i)
							}), --a || r(n)
						});
					return o.e && i(o.v), n.promise
				},
				race: function(t) {
					var e = this,
						n = f(e),
						r = n.reject,
						i = Rt(function() {
							Tt(t, !1, function(t) {
								e.resolve(t).then(n.resolve, r)
							})
						});
					return i.e && r(i.v), n.promise
				}
			})
		}), t(function(t) {
			t.exports = A.Promise
		}), t(function(t, e) {
			"use strict";

			function n(t) {
				var e = {
					city: t.locality,
					province_code: t.administrativeArea,
					zip: t.postalCode
				};
				t.countryCode ? e.country_code = t.countryCode.toLowerCase() : t.country && (e.country = t.country.toLowerCase(), "usa" === e.country && (e.country = "united states")), t.givenName && (e.first_name = t.givenName), t.familyName && (e.last_name = t.familyName), t.phoneNumber && (e.phone = t.phoneNumber);
				var n = t.addressLines;
				return n && n.length && (e.address1 = n[0], n[1] && (e.address2 = n[1])), s(e)
			}

			function r(t, e) {
				return {
					type: "final",
					label: e,
					amount: t.total_price
				}
			}

			function i(t) {
				var e = [{
					type: "final",
					label: "Subtotal",
					amount: t.total_line_items_price
				}];
				return t.shipping_line && (e = e.concat([{
					type: "final",
					label: "Shipping",
					amount: t.shipping_line.price
				}])), t.total_tax && (e = e.concat([{
					type: "final",
					label: "Estimated Tax",
					amount: t.total_tax
				}])), t.applied_discount && (e = e.concat([{
					type: "final",
					label: "Discount",
					amount: -t.applied_discount.amount
				}])), e
			}

			function o(t) {
				return a(t).map(c)
			}

			function a(t) {
				return [].concat(t).sort(u)
			}

			function s(t) {
				var e = t.country_code,
					n = t.country,
					r = t.zip,
					i = {};
				return l.test(r) && ("ca" !== e && "canada" !== n || (i.zip = r.trim() + " 0Z0"), "gb" === e && (i.zip = r.trim() + " 0ZZ")), Object.assign({}, t, i)
			}

			function u(t, e) {
				var n = parseFloat(t.price),
					r = parseFloat(e.price);
				return n < r ? -1 : n > r ? 1 : 0
			}

			function c(t) {
				return {
					identifier: t.id,
					label: t.title,
					detail: "",
					amount: t.price
				}
			}
			Object.defineProperty(e, "__esModule", {
				value: !0
			}), e.addressFromEvent = n, e.totalFromCheckout = r, e.lineItemsFromCheckout = i, e.transformedShippingRates = o, e.sortShippingRates = a;
			var l = /^[a-z0-9]{2,4}\s?$/i
		})),
		Ht = t(function(t, e) {
			"use strict";

			function n(t, e) {
				for (var n = 0; n < a.length; n++)
					if (a[n][0].test(t)) {
						var r = a[n][1];
						return "function" == typeof r && e ? r(e.field) : r
					}
				return s
			}

			function r(t) {
				var e = [];
				return Object.keys(t).forEach(function(r) {
					Object.keys(t[r]).forEach(function(i) {
						t[r][i].forEach(function(t) {
							t && t.code && e.push(n(r + "_" + i + "_" + t.code, {
								field: i,
								category: r
							}))
						})
					})
				}), e
			}

			function i(t) {
				t = Array.isArray(t) ? t : [t];
				var e = t.map(function(t) {
					return o(t)
				});
				return 1 === e.length && e[0].startsWith("Enter ") && (e = ["Please e" + e[0].substr(1) + " and try again"]), e
			}

			function o(t) {
				switch (t) {
					case "Some products became unavailable and your cart has been updated. We're sorry for the inconvenience.":
						return n("not_enough_in_stock");
					case "Checkout is already completed.":
						return n("already_completed");
					default:
						return t
				}
			}
			Object.defineProperty(e, "__esModule", {
				value: !0
			}), e.errorFromCode = n, e.errorMessagesFromJson = r, e.normalizeErrors = i;
			var a = [
					[/failed_session/, "There was a problem with the payment service. Please select a different payment method or try again later."],
					[/first_name_blank$/, "Enter a first name for your shipping address"],
					[/last_name_blank$/, "Enter a last name for your shipping address"],
					[/address1_blank$/, "Enter your shipping address"],
					[/address2_blank$/, "Enter the apt, suite, etc. for your shipping address"],
					[/city_blank$/, "Enter the city of your shipping address"],
					[/country(_code)?_blank$/, "Select a country for your shipping address"],
					[/country(_code)?_not_supported$/, "Enter a valid country for your shipping address"],
					[/province(_code)?_blank$/, "Enter a state / province for your shipping address"],
					[/province(_code)?_invalid_state_in_country$/, "Enter a valid state for your shipping address country"],
					[/province(_code)?_invalid_province_in_country$/, "Enter a valid province for your shipping address country"],
					[/province(_code)?_invalid_region_in_country$/, "Enter a valid region for your shipping address country"],
					[/company_blank$/, "Enter a company name for your shipping address"],
					[/phone_blank$/, "Enter a valid phone number for your shipping address"],
					[/zip(_code)?_blank$/, "Enter a ZIP code / postal code for your shipping address"],
					[/zip(_code)?_invalid_for_country$/, "Enter a valid ZIP code / postal code for your shipping address"],
					[/zip(_code)?_invalid_for_country_and_province$/, "Enter a valid ZIP code / postal code for your shipping address"],
					[/email_invalid$/, "Enter a valid email address"],
					[/generic_error$/, "An error occurred while processing your payment. Please try again."],
					[/credit_card_processing$/, "Your card can't be processed due to technical difficulties. Please try again in a few minutes."],
					[/not_enough_in_stock$/, "Some items became unavailable. Refresh your cart and try again."],
					[/already_completed/, "Your items have already been purchased."],
					[/empty_cart/, "Your cart is currently empty. Please add items to your cart and try again."],
					[/full_name_required$/, "Enter both your first and last name"],
					[/total_price_too_big$/, "Your order total exceeds the limit. Please edit your cart and try again."],
					[/total_price_zero$/, "To check out with Apple Pay, your order total must be greater than 0. Please choose a new payment method and try again."],
					[/no_shipping_option$/, "Sorry, we currently don't ship to this country. Please choose a new shipping address and try again."],
					[/expired_card/, "Your credit card is expired. Please update your card."],
					[/card_declined/, "Your credit card was declined. In order to resolve this issue, you will need to contact your bank."],
					[/(invalid|blank)$/, function(t) {
						return "Enter a valid " + t
					}]
				],
				s = "An error occurred while processing your checkout. Please try again."
		}),
		qt = t(function(t, e) {
			"use strict";

			function n(t) {
				return t && t.response && 422 === t.response.status
			}

			function o() {
				var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
					e = t.checkout || t;
				return e.billing_address ? ApplePaySession.STATUS_INVALID_BILLING_POSTAL_ADDRESS : e.shipping_address ? ApplePaySession.STATUS_INVALID_SHIPPING_POSTAL_ADDRESS : ApplePaySession.STATUS_FAILURE
			}
			Object.defineProperty(e, "__esModule", {
				value: !0
			});
			var a = function() {
				function t(e) {
					var n = e.apiClient,
						i = e.sessionToken,
						o = e.merchantName,
						a = e.session,
						s = e.strategy,
						u = e.shopId,
						c = e.showErrors;
					if (r(this, t), this.apiClient = n, this.strategy = s, this._sessionToken = i || (0, m.generateRandomId)(), this._merchantName = o, this._session = a, this._shopId = u, this._showErrors = c, this._firstShippingContactSelected = !0, this._paymentInProgress = !1, !s) throw new Error("`strategy` must be supplied to ShopifyApplePaySession");
					this._session.oncancel = this._trackCallback("cancelled", this._onCancel).bind(this), this._session.onvalidatemerchant = this._trackCallback("merchant validated", this._onValidateMerchant.bind(this)), this._session.onshippingcontactselected = this._trackCallback("shipping contact selected", this._onShippingContactSelected).bind(this), this._session.onshippingmethodselected = this._trackCallback("shipping method selected", this._onShippingMethodSelected).bind(this), this._session.onpaymentauthorized = this._trackCallback("payment authorized", this._onPaymentAuthorized).bind(this), this._session.onpaymentmethodselected = this._trackCallback("payment method selected", this._onPaymentMethodSelected).bind(this)
				}
				return i(t, [{
					key: "begin",
					value: function() {
						var t = this;
						return this.strategy.build().then(function(e) {
							return t.checkout = e
						}).then(function() {
							return t._session.begin()
						})["catch"](function(e) {
							return t._handleStrategyError(e)
						})["catch"](function() {
							return t._handleErrors((0, Ht.errorFromCode)("failed_session"))
						})
					}
				}, {
					key: "_onCancel",
					value: function() {
						return this.apiClient.stopPolling(), this._paymentInProgress && this._showErrors(["\n        Your order is being processed and can't be cancelled at this time.\n        You will receive an email confirmation once the transaction is succesful.\n      "], "Payment in progress"), Promise.resolve()
					}
				}, {
					key: "_onValidateMerchant",
					value: function(t) {
						var e = this,
							n = t.validationURL,
							r = {
								domain: window.location.hostname,
								id: this._sessionToken,
								validation_url: n
							};
						return this.apiClient.post("/" + this._shopId + "/apple_pay/sessions", r).then(function(t) {
							var n = t.body;
							return e._session.completeMerchantValidation(n)
						})["catch"](function() {
							return e._handleErrors((0, Ht.errorFromCode)("failed_session"))
						})
					}
				}, {
					key: "_onShippingContactSelected",
					value: function(t) {
						var e = this,
							n = {
								partial_addresses: !0,
								shipping_address: (0, Ut.addressFromEvent)(t.shippingContact)
							};
						return this._updateCheckout(n).then(this._fetchShippingRates.bind(this)).then(this._setDefaultShippingRate.bind(this)).then(function(t) {
							return e._session.completeShippingContactSelection(ApplePaySession.STATUS_SUCCESS, (0, Ut.transformedShippingRates)(e.availableShippingRates), (0, Ut.totalFromCheckout)(t, e._merchantName), (0, Ut.lineItemsFromCheckout)(t))
						}).then(function() {
							return e._firstShippingContactSelected = !1
						})["catch"](function(t) {
							return e._displayInitialAddressError(t)
						})["catch"](function(t) {
							return e._handleResponseError(t)
						})["catch"](function(t) {
							return e._catchPaymentRequestValidatorError(t)
						})
					}
				}, {
					key: "_onShippingMethodSelected",
					value: function(t) {
						var e = this,
							n = t.shippingMethod,
							r = {
								shipping_line: {
									handle: n.identifier
								}
							};
						return this._updateCheckout(r).then(function(t) {
							return e._session.completeShippingMethodSelection(ApplePaySession.STATUS_SUCCESS, (0, Ut.totalFromCheckout)(t, e._merchantName), (0, Ut.lineItemsFromCheckout)(t))
						})["catch"](function() {
							return e._session.completeShippingMethodSelection(ApplePaySession.STATUS_FAILURE)
						})
					}
				}, {
					key: "_onPaymentAuthorized",
					value: function(t) {
						var e = t.payment,
							n = e.token.paymentData,
							r = {
								email: e.billingContact.emailAddress || e.shippingContact.emailAddress,
								billing_address: (0, Ut.addressFromEvent)(e.billingContact),
								shipping_address: (0, Ut.addressFromEvent)(e.shippingContact)
							};
						if (!1 !== this.checkout.requires_shipping && !this.checkout.shipping_line) return this._handleErrors([(0, Ht.errorFromCode)("no_shipping_option")]);
						var i = {
							unique_token: (0, m.generateRandomId)(),
							amount: this.checkout.total_price,
							payment_token: {
								type: "apple_pay",
								payment_data: JSON.stringify(n)
							}
						};
						return this._updateCheckout(r).then(this._submitPayment.bind(this, i)).then(this._completePayment.bind(this))["catch"](this._handlePaymentError.bind(this))
					}
				}, {
					key: "_onPaymentMethodSelected",
					value: function() {
						return this._session.completePaymentMethodSelection((0, Ut.totalFromCheckout)(this.checkout, this._merchantName), (0, Ut.lineItemsFromCheckout)(this.checkout)), Promise.resolve()
					}
				}, {
					key: "_fetchShippingRates",
					value: function() {
						var t = this;
						return !1 === this.checkout.requires_shipping ? (this.availableShippingRates = [], this.checkout) : this.apiClient.getShippingRates(this.checkout.token).then(function(e) {
							var n = e.shipping_rates;
							return t.availableShippingRates = (0, Ut.sortShippingRates)(n), t.checkout
						})
					}
				}, {
					key: "_setDefaultShippingRate",
					value: function() {
						if (!this.checkout.requires_shipping) return this.checkout;
						var t = this.availableShippingRates || [],
							e = t[0];
						return e ? this._currentShippingRateAvailable(this.checkout, t) ? this.checkout : this._updateCheckout({
							shipping_line: {
								handle: e.id
							}
						}) : this.checkout
					}
				}, {
					key: "_currentShippingRateAvailable",
					value: function(t, e) {
						return !!this.checkout.shipping_line && !!e.map(function(t) {
							return t.id
						}).includes(this.checkout.shipping_line.handle)
					}
				}, {
					key: "_getCheckout",
					value: function() {
						var t = this;
						return this.apiClient.getCheckout(this.checkout.token).then(function(e) {
							return t.checkout = e.checkout
						})
					}
				}, {
					key: "_updateCheckout",
					value: function(t) {
						var e = this;
						return this.apiClient.updateCheckout(this.checkout.token, {
							checkout: t
						}).then(function(t) {
							return e.checkout = t.checkout
						})
					}
				}, {
					key: "_submitPayment",
					value: function(t) {
						return this._paymentInProgress = !0, this.apiClient.createPayment(this.checkout.token, t)
					}
				}, {
					key: "_completePayment",
					value: function(t) {
						var e = this;
						this._paymentInProgress = !1;
						var n = t.payment,
							r = n && n.transaction,
							i = void 0;
						return n && n.payment_processing_error_message ? i = n.payment_processing_error_message : r && "success" !== r.status && "pending" !== r.status && (i = r.message || "Payment Transaction " + r.status), i ? (this._handleErrors([i]), t) : this._getCheckout().then(function(t) {
							var n = t.order;
							return e._session.completePayment(ApplePaySession.STATUS_SUCCESS), n
						}).then(function(t) {
							return e._track("payment completed"), t
						}).then(function(t) {
							return e._redirect(t.status_url)
						})
					}
				}, {
					key: "_handlePaymentError",
					value: function(t) {
						var e = this;
						n(t) ? t.response.json().then(function(t) {
							return o(t.errors)
						}).then(function(t) {
							return e._session.completePayment(t)
						})["catch"](function() {
							return e._session.completePayment(ApplePaySession.STATUS_FAILURE)
						}) : this._session.completePayment(ApplePaySession.STATUS_FAILURE)
					}
				}, {
					key: "_displayInitialAddressError",
					value: function(t) {
						if (n(t) && this._firstShippingContactSelected) return this._session.completeShippingContactSelection(ApplePaySession.STATUS_INVALID_SHIPPING_POSTAL_ADDRESS, [], (0, Ut.totalFromCheckout)(this.checkout, this._merchantName), (0, Ut.lineItemsFromCheckout)(this.checkout)), this._firstShippingContactSelected = !1, this.checkout;
						throw t
					}
				}, {
					key: "_handleStrategyError",
					value: function(t) {
						var e = this;
						if (n(t)) return t.response.json().then(function(t) {
							var n = t.errors;
							return n.base ? e._showErrors((0, Ht.normalizeErrors)(n.base.map(function(t) {
								return t.message
							}))) : n
						});
						if (t && t.errorCode) return this._showErrors((0, Ht.normalizeErrors)((0, Ht.errorFromCode)(t.errorCode)));
						throw t
					}
				}, {
					key: "_catchPaymentRequestValidatorError",
					value: function(t) {
						switch (t.message) {
							case "Total amount must be greater than zero":
								return this._handleErrors([(0, Ht.errorFromCode)("total_price_zero")]);
							case "Total amount is too big":
								return this._handleErrors([(0, Ht.errorFromCode)("total_price_too_big")]);
							default:
								return this._session.abort()
						}
					}
				}, {
					key: "_trackCallback",
					value: function(t, e) {
						var n = this;
						return function(r) {
							return e.call(n, r).then(function() {
								return n._track(t)
							})["catch"](function(t) {
								throw t
							})
						}
					}
				}, {
					key: "_handleErrors",
					value: function(t) {
						var e = this;
						this._showErrors && setTimeout(function() {
							e._showErrors((0, Ht.normalizeErrors)(t))
						}, 200), this._session.abort()
					}
				}, {
					key: "_handleResponseError",
					value: function(t) {
						var e = this;
						if (!n(t)) throw t;
						t.response.json().then(function(t) {
							var n = t.errors;
							return e._handleErrors((0, Ht.errorMessagesFromJson)(n))
						})["catch"](function(t) {
							throw t
						})
					}
				}, {
					key: "_track",
					value: function(t) {
						window.ShopifyAnalytics && ShopifyAnalytics.lib && ShopifyAnalytics.lib.track && ShopifyAnalytics.lib.track("Apple Pay slate - " + t, {
							strategy: this.strategy.identifier,
							checkoutToken: this.checkout && this.checkout.token
						})
					}
				}, {
					key: "_redirect",
					value: function(t) {
						window.location = t
					}
				}]), t
			}();
			e["default"] = a
		}),
		Vt = t(function(t, e) {
			"use strict";
			Object.defineProperty(e, "__esModule", {
				value: !0
			});
			var n = function() {
				function t() {
					var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
						n = e.apiClient,
						i = e.type,
						o = e.button;
					r(this, t), this.gatewayParams = {
						type: i
					}, this.button = o, this.setApiClient(n), this.identifier = "NA"
				}
				return i(t, [{
					key: "setApiClient",
					value: function(t) {
						this.apiClient = t
					}
				}, {
					key: "getCheckout",
					value: function(t) {
						return this.apiClient.patch("/api/checkouts/" + t, this.params()).then(function(t) {
							return t.checkout
						})
					}
				}, {
					key: "createCheckout",
					value: function(t) {
						return this.apiClient.post("/api/checkouts", this.params(t)).then(function(t) {
							return t.checkout
						})
					}
				}, {
					key: "params",
					value: function(t) {
						return {
							checkout: o({}, t, {
								gateway_params: this.gatewayParams
							})
						}
					}
				}]), t
			}();
			e["default"] = n
		}),
		Gt = t(function(t, o) {
			"use strict";

			function s(t) {
				var e = (0, m.getClosest)(t.button, c) || document.querySelector(c);
				if (!e) return {};
				var n = e.elements.quantity,
					r = n ? n.value : 1;
				return {
					line_items: [{
						variant_id: e.elements.id.value,
						quantity: r
					}]
				}
			}
			Object.defineProperty(o, "__esModule", {
				value: !0
			});
			var u = a(Vt),
				c = 'form[action^="/cart/add"]',
				l = function(t) {
					function o() {
						var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
							e = t.apiClient,
							i = t.type,
							a = t.button;
						r(this, o);
						var s = n(this, (o.__proto__ || Object.getPrototypeOf(o)).call(this, {
							apiClient: e,
							type: i,
							button: a
						}));
						return s.identifier = "product", s
					}
					return e(o, t), i(o, [{
						key: "build",
						value: function() {
							return this.createCheckout(s(this))
						}
					}]), o
				}(u["default"]);
			o["default"] = l
		}),
		$t = t(function(t, o) {
			"use strict";
			Object.defineProperty(o, "__esModule", {
				value: !0
			});
			var s = a(Vt),
				u = 'form[action^="/cart"]',
				c = /^(https?:\/\/[^\/]+)?\/checkout\/poll/,
				l = function(t) {
					function o() {
						var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
							e = t.apiClient,
							i = t.type,
							a = t.button;
						r(this, o);
						var s = n(this, (o.__proto__ || Object.getPrototypeOf(o)).call(this, {
							apiClient: e,
							type: i,
							button: a
						}));
						return s.identifier = "cart", s
					}
					return e(o, t), i(o, [{
						key: "build",
						value: function() {
							var t = this;
							return this.updateCart().then(function(t) {
								var e = t.token;
								return e || Promise.reject({
									errorCode: "empty_cart"
								})
							}).then(function(e) {
								return t.createCheckout({
									cart_token: e
								})
							})
						}
					}, {
						key: "createCheckout",
						value: function(t) {
							return t.secret = !0, this.apiClient.post("/api/checkouts", this.params(t), {
								poll: !1
							}).then(this.handleThrottling.bind(this)).then(function(t) {
								return t.checkout
							})
						}
					}, {
						key: "handleThrottling",
						value: function(t) {
							if (202 === t.status && t.headers) {
								var e = t.headers.get("Location");
								return c.test(e) ? (this.redirectToQueue(), Promise.reject()) : this.apiClient.get(e)
							}
							return t
						}
					}, {
						key: "updateCart",
						value: function() {
							return fetch("/cart", {
								method: "POST",
								body: this.formData(),
								headers: {
									Accept: "application/json"
								},
								credentials: "same-origin"
							}).then(function(t) {
								return t.json()
							})
						}
					}, {
						key: "redirectToQueue",
						value: function() {
							var t = document.createElement("input");
							t.type = "hidden", t.name = "checkout", t.value = "1", this.form.appendChild(t), this.form.submit()
						}
					}, {
						key: "formData",
						value: function() {
							var t = new FormData(this.form);
							return t.append("__this_is_not_empty_form", "1"), t
						}
					}, {
						key: "form",
						get: function() {
							return this._form ? this._form : (this._form = (0, m.getClosest)(this.button, u) || document.querySelector(u), this._form)
						}
					}]), o
				}(s["default"]);
			o["default"] = l
		}),
		Wt = t(function(t, o) {
			"use strict";
			Object.defineProperty(o, "__esModule", {
				value: !0
			});
			var s = a(Vt),
				u = function(t) {
					function o() {
						var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
							e = t.apiClient,
							i = t.token,
							a = t.type,
							s = t.button;
						r(this, o);
						var u = n(this, (o.__proto__ || Object.getPrototypeOf(o)).call(this, {
							apiClient: e,
							type: a,
							button: s
						}));
						return u.token = i, u.identifier = "checkout", u
					}
					return e(o, t), i(o, [{
						key: "build",
						value: function() {
							return this.getCheckout(this.token)
						}
					}]), o
				}(s["default"]);
			o["default"] = u
		}),
		Jt = t(function(t, e) {
			"use strict";

			function n(t, e, n) {
				window.ShopifyAnalytics && ShopifyAnalytics.lib && ShopifyAnalytics.lib.track && ShopifyAnalytics.lib.track(t + " button - " + e, {
					strategy: n
				})
			}

			function r(t) {
				var e = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "Transaction unsuccessful";
				return DigitalWalletsDialog.showMessage({
					title: e,
					errors: t,
					button: "Return to checkout"
				})
			}

			function i(t, e) {
				return a(t, "cart", e)
			}

			function o(t, e) {
				return a(t, "product", e)
			}

			function a(t, e) {
				var n = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "Transaction unsuccessful";
				return Shopify.StorefrontExpressButtons.DigitalWalletsDialog.showMessage({
					title: n,
					errors: t,
					button: "Return to " + e
				})
			}
			Object.defineProperty(e, "__esModule", {
				value: !0
			}), e.track = n, e.checkoutShowErrors = r, e.cartShowErrors = i, e.productShowErrors = o
		}),
		Yt = t(function(t, e) {
			"use strict";
			Object.defineProperty(e, "__esModule", {
				value: !0
			});
			var n = a(Gt),
				o = a($t),
				s = a(Wt),
				u = a(p),
				c = function() {
					function t(e, i) {
						r(this, t);
						var a = e.getAttribute("data-strategy");
						if (!a) throw new Error("Unspecified strategy");
						this.button = e, this.apiClient = new u["default"], this.requireActiveCard = !1;
						var c = {
							apiClient: this.apiClient,
							token: Shopify.Checkout.token,
							type: i,
							button: e
						};
						switch (a) {
							case "cart":
								this.strategy = new o["default"](c), this.showErrors = Jt.cartShowErrors;
								break;
							case "product":
								this.strategy = new n["default"](c), this.requireActiveCard = !0, this.showErrors = Jt.productShowErrors;
								break;
							case "checkout":
								this.strategy = new s["default"](c), this.showErrors = Jt.checkoutShowErrors, this.apiClient.host = Shopify.Checkout.apiHost
						}
					}
					return i(t, [{
						key: "init",
						value: function() {
							throw new Error("You must overwrite the init method.")
						}
					}]), t
				}();
			e["default"] = c
		}),
		Kt = t(function(t, o) {
			"use strict";

			function s(t, e) {
				t.style.display = t.getAttribute("data-display-value") || "inline-block", (0, Jt.track)(y, "shown", e)
			}

			function u(t) {
				t.button.addEventListener("click", l.bind(t))
			}

			function l(t) {
				t.preventDefault(), (0, Jt.track)(y, "clicked", this.strategy.identifier);
				var e = new ApplePaySession(p, h(this.merchantCapabilities));
				new f["default"]({
					merchantName: this.merchantCapabilities.merchantName,
					apiClient: this.apiClient,
					strategy: this.strategy,
					shopId: this.shopId,
					showErrors: this.showErrors,
					session: e
				}).begin()
			}

			function h(t) {
				var e = t.merchantName,
					n = c(t, ["merchantName"]);
				return n.total = {
					type: "pending",
					label: e,
					amount: "1.00"
				}, n
			}
			Object.defineProperty(o, "__esModule", {
				value: !0
			});
			var f = a(qt),
				d = a(Yt),
				p = 1,
				y = "Apple Pay",
				m = function(t) {
					function o(t) {
						return r(this, o), n(this, (o.__proto__ || Object.getPrototypeOf(o)).call(this, t, "apple_pay_web"))
					}
					return e(o, t), i(o, [{
						key: "init",
						value: function() {
							var t = this,
								e = document.getElementById("apple-pay-shop-capabilities");
							if (!e) return Promise.reject(new Error("Missing shop capabilities for Apple Pay"));
							var n = JSON.parse(e.textContent),
								r = n.shopId,
								i = n.merchantId,
								o = c(n, ["shopId", "merchantId"]);
							return this.shopId = r, this.merchantId = i, this.merchantCapabilities = o, this.canMakePayments().then(function(e) {
								return e ? (s(t.button, t.strategy.identifier), u(t), Promise.resolve(t)) : Promise.reject(new Error("Apple Pay canMakePayments is false"))
							})
						}
					}, {
						key: "canMakePayments",
						value: function() {
							var t = this;
							if (!window.ApplePaySession) return Promise.resolve(!1);
							var e = ApplePaySession.canMakePaymentsWithActiveCard(this.merchantId).then(function(e) {
								return (0, Jt.track)(y, "canMakePaymentsWithActiveCard: " + e, t.strategy.identifier), e
							});
							return this.requireActiveCard ? e : Promise.resolve(ApplePaySession.canMakePayments())
						}
					}]), o
				}(d["default"]);
			o["default"] = m
		}),
		Zt = t(function(t, o) {
			"use strict";

			function s(t) {
				window.paypal.Button.render({
					env: t.metadata.environment,
					commit: !0,
					style: {
						label: "paypal",
						layout: "horizontal",
						color: "gold",
						shape: "rect",
						size: "responsive",
						maxbuttons: 1,
						tagline: !1,
						height: 44
					},
					payment: t.payment.bind(t),
					onAuthorize: t.handleAuthorize.bind(t),
					onRememberUser: t.handleRememberedUser.bind(t)
				}, t.button.id)
			}

			function u(t) {
				return window.paypal.request.post("/" + this.metadata.shopId + "/checkouts/" + t.token + "/express/setup_purchase", {
					key: this.strategy.apiClient.secretKey
				})
			}

			function c(t) {
				return this.redirectUrl = t.redirect_url + "?token=" + t.token + "&from_cart=true", t
			}

			function l() {
				this.showErrors(["There was a problem with the payment service. Please select a different payment method or try again later."], "Something went wrong")
			}
			Object.defineProperty(o, "__esModule", {
				value: !0
			});
			var h = a(Yt),
				f = "PayPalV4",
				d = function(t) {
					function o(t) {
						return r(this, o), t.id = (0, m.generateRandomId)(), n(this, (o.__proto__ || Object.getPrototypeOf(o)).call(this, t))
					}
					return e(o, t), i(o, [{
						key: "init",
						value: function() {
							if (this.metadata = (0, m.dataset)(document.getElementById("in-context-paypal-metadata")), !this.metadata) return Promise.reject("PayPal metadata was not found");
							if ("true" !== this.metadata.paypalV4) return Promise.reject("PayPal V4 not enabled");
							try {
								return s(this), (0, Jt.track)(f, "shown", this.strategy.identifier), Promise.resolve(this)
							} catch (t) {
								return l(t), Promise.reject(t)
							}
						}
					}, {
						key: "payment",
						value: function() {
							return (0, Jt.track)(f, "clicked", this.strategy.identifier), this.strategy.build().then(u.bind(this)).then(c.bind(this)).then(function(t) {
								return t.token
							})["catch"](l.bind(this))
						}
					}, {
						key: "handleAuthorize",
						value: function(t) {
							(0, Jt.track)(f, "redirecting", this.strategy.identifier), (0, m.redirect)(this.redirectUrl + "&PayerID=" + t.payerID)
						}
					}, {
						key: "handleRememberedUser",
						value: function() {
							(0, Jt.track)(f, "remembered_user", this.strategy.identifier)
						}
					}]), o
				}(h["default"]);
			o["default"] = d
		}),
		Xt = t(function(t, e) {
			"use strict";

			function n(t) {
				var e = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;
				if (h = [], !t) return Promise.reject(new Error("No checkout buttons provided"));
				for (var n = new s["default"], i = l.length - 1; i >= 0; i--) r(l[i], t[l[i]], n, e);
				return Promise.all(h).then(function(t) {
					return t.filter(function(t) {
						return t
					})
				})
			}

			function r(t, e, n, r) {
				var o = r.querySelectorAll(e);
				if (o.length)
					for (var a = o.length - 1; a >= 0; a--) h.push(i(t, o[a], n)["catch"](function() {
						return !1
					}))
			}

			function i(t, e) {
				try {
					if (f[t]) return f[t](e);
					throw new Error("Invalid checkout method " + t)
				} catch (t) {
					return o(t), Promise.reject(t)
				}
			}

			function o(t) {
				console.error("Error" === t.constructor.name ? t.message : t)
			}
			Object.defineProperty(e, "__esModule", {
				value: !0
			}), e["default"] = n;
			var s = a(p),
				u = a(Kt),
				c = a(Zt),
				l = ["applePay", "paypal"],
				h = void 0,
				f = {
					applePay: function(t) {
						return new u["default"](t).init()
					},
					paypal: function(t) {
						return new c["default"](t).init()
					}
				}
		}),
		Qt = t(function(t, e) {
			"use strict";
			Object.defineProperty(e, "__esModule", {
				value: !0
			});
			var n = Symbol("targetSymbol"),
				o = Symbol("actionQueueSymbol"),
				a = Symbol("finishedLoadingSymbol"),
				s = function() {
					function t(e) {
						var i = this,
							s = arguments.length > 1 && arguments[1] !== undefined && arguments[1];
						if (r(this, t), this[o] = [], this[a] = !1, s) {
							var u = e.onload;
							e.onload = function() {
								u && u(), i[n] = e, i[a] = !0, i[o].forEach(function(t) {
									return t()
								})
							}
						} else this[n] = e, this[a] = !0
					}
					return i(t, [{
						key: "postMessage",
						value: function(t) {
							var e = this,
								r = function() {
									t.digitalWalletsDialog = !0, e[n].postMessage(t, e[n].location)
								};
							this[a] ? r() : this[o].push(function() {
								r()
							})
						}
					}]), t
				}();
			e["default"] = s
		}),
		te = t(function(t, e) {
			"use strict";
			Object.defineProperty(e, "__esModule", {
				value: !0
			});
			var n = e.EVENTS_PREFIX = "DigitalWalletsDialog";
			e.DIALOG_CHANGE = n + ":change", e.DIALOG_CHANGED = n + ":changed", e.DIALOG_DISMISSED = n + ":dismissed", e.IFRAME_SHOWN = n + ":iframe_shown", e.IFRAME_HIDDEN = n + ":iframe_hidden", e.HTML_ESCAPED_CHARACTERS = {
				"&": "&amp;",
				"<": "&lt;",
				">": "&gt;",
				'"': "&quot;",
				"'": "&#39;",
				"/": "&#x2F;",
				"`": "&#x60;",
				"=": "&#x3D;"
			}
		}),
		ee = t(function(t, e) {
			"use strict";

			function n(t) {
				t[d] = new h["default"](t[f].contentWindow, !0)
			}

			function o(t, e) {
				t[f] = document.createElement("iframe"), t[f].src = e, t[f].style.position = "fixed", t[f].style.top = 0, t[f].style.left = 0, t[f].style.zIndex = 99999, t[f].style.height = 0, t[f].style.width = 0, t[f].style.border = 0, t[f].scrolling = "no", t[f].tabIndex = "-1", t[f].setAttribute("aria-hidden", !0), document.body.appendChild(t[f])
			}

			function s(t, e) {
				switch (e.data.type) {
					case te.DIALOG_CHANGED:
						m = window.pageYOffset, u(t[f], !0), c(!0), l(t, te.IFRAME_SHOWN), t[d].postMessage({
							type: te.IFRAME_SHOWN
						});
						break;
					case te.DIALOG_DISMISSED:
						u(t[f], !1), c(!1, m), l(t, te.IFRAME_HIDDEN);
						break;
					default:
						return
				}
			}

			function u(t, e) {
				var n = e ? "100%" : "0";
				t.style.height = n, t.style.width = n, e ? (t.removeAttribute("tabindex"), t.removeAttribute("aria-hidden")) : (t.tabIndex = "-1", t.setAttribute("aria-hidden", !0))
			}

			function c(t) {
				var e = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
				document.documentElement.style.overflow = t ? "hidden" : "visible", document.documentElement.style.height = t ? "100%" : "auto", document.body.style.overflow = t ? "hidden" : "visible", document.body.style.height = t ? "100%" : "auto", window.scrollTo(0, e)
			}

			function l(t, e) {
				if (-1 !== p.indexOf(e)) {
					var n = new Event(e);
					t[f].dispatchEvent(n)
				}
			}
			Object.defineProperty(e, "__esModule", {
				value: !0
			});
			var h = a(Qt),
				f = Symbol("iframeSymbol"),
				d = Symbol("messengerSymbol"),
				p = [te.IFRAME_SHOWN, te.IFRAME_HIDDEN],
				y = void 0,
				m = void 0,
				v = function() {
					function t(e) {
						var i = this;
						return r(this, t), y || (y = this, o(this, e), n(this), this._messageHandler = function(t) {
							t.data && t.data.type && t.data.digitalWalletsDialog && s(i, t)
						}, window.addEventListener("message", this._messageHandler)), y
					}
					return i(t, [{
						key: "showMessage",
						value: function(t) {
							return this[d].postMessage({
								payload: t,
								type: te.DIALOG_CHANGE
							})
						}
					}, {
						key: "destroy",
						value: function() {
							null !== this[f] && this[f].remove(), y = null, this[f] = null, this[d] = null, window.removeEventListener("message", this._messageHandler), c(!1)
						}
					}]), t
				}();
			e["default"] = v
		}),
		ne = t(function(t, e) {
			"use strict";

			function n() {
				if (!Shopify.StorefrontExpressButtons.DigitalWalletsDialog) {
					var t = document.getElementById("shopify-digital-wallet");
					t && (Shopify.StorefrontExpressButtons.DigitalWalletsDialog = new r["default"](t.getAttribute("content")))
				}
			}
			Object.defineProperty(e, "__esModule", {
				value: !0
			}), e["default"] = n;
			var r = a(ee)
		}),
		re = t(function(t, e) {
			"use strict";

			function n() {
				var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "//www.paypalobjects.com/api/checkout.js";
				if (!(document.querySelectorAll('script[src*="' + t + '"]').length > 0)) {
					var e = document.createElement("script");
					e.src = t, window.paypalCheckoutReady = r, document.body.appendChild(e)
				}
			}

			function r() {
				o() && (a("Paypal V4", {
					event_type: "available"
				}), i(function(t) {
					return t ? a("Paypal V4", {
						event_type: "remembered-user"
					}) : null
				}))
			}

			function i(t) {
				o() && paypal.isFundingRemembered(paypal.FUNDING.PAYPAL).then(t)
			}

			function o() {
				return "object" === ("undefined" == typeof paypal ? "undefined" : l(paypal)) && "function" == typeof paypal.isFundingRemembered && "object" === l(paypal.FUNDING) && "string" == typeof paypal.FUNDING.PAYPAL
			}

			function a() {
				var t;
				"object" === ("undefined" == typeof ShopifyAnalytics ? "undefined" : l(ShopifyAnalytics)) && "object" === l(ShopifyAnalytics.lib) && "function" == typeof ShopifyAnalytics.lib.track && (t = ShopifyAnalytics.lib).track.apply(t, arguments)
			}
			Object.defineProperty(e, "__esModule", {
				value: !0
			}), e.loadPaypalV4WithVisibilityTracking = n, e.trackPaypalV4Visibility = r, e.paypalV4Visibility = i
		});
	t(function() {
		"use strict";
		var t = a(mt),
			e = a(Xt),
			n = a(ne),
			r = a(g),
			i = document.querySelectorAll("#paypal-express-button");
		"undefined" != typeof ShopifyPaypalV4VisibilityTracking && i.length > 0 && (0, re.loadPaypalV4WithVisibilityTracking)(), Shopify.StorefrontExpressButtons.initialize = function() {
			(0, e["default"])({
				applePay: ".additional-checkout-button--apple-pay",
				paypal: ".additional-checkout-button--paypal"
			}), AmazonPaymentsPayButton(), Shopify.StorefrontExpressButtons.ExpressCheckout.initialize(), (0, n["default"])(), (0, r["default"])()
		}, (0, t["default"])(Shopify.StorefrontExpressButtons.initialize)
	})
}("undefined" != typeof global ? global : "undefined" != typeof window && window);