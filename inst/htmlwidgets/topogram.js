/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/accessor-fn/dist/accessor-fn.module.js":
/*!*************************************************************!*\
  !*** ./node_modules/accessor-fn/dist/accessor-fn.module.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var index = (function (p) {
  return p instanceof Function ? p // fn
  : typeof p === 'string' ? function (obj) {
    return obj[p];
  } // property name
  : function (obj) {
    return p;
  };
}); // constant

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (index);


/***/ }),

/***/ "./node_modules/cartogram-chart/dist/cartogram-chart.module.js":
/*!*********************************************************************!*\
  !*** ./node_modules/cartogram-chart/dist/cartogram-chart.module.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ cartogram)
/* harmony export */ });
/* harmony import */ var d3_selection__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! d3-selection */ "./node_modules/d3-selection/src/select.js");
/* harmony import */ var d3_selection__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! d3-selection */ "./node_modules/d3-selection/src/pointer.js");
/* harmony import */ var d3_transition__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! d3-transition */ "./node_modules/d3-transition/src/index.js");
/* harmony import */ var d3_geo__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! d3-geo */ "./node_modules/d3-geo/src/projection/mercator.js");
/* harmony import */ var topogram__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! topogram */ "./node_modules/topogram/build/topogram.js");
/* harmony import */ var topogram__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(topogram__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var kapsule__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! kapsule */ "./node_modules/kapsule/dist/kapsule.module.js");
/* harmony import */ var accessor_fn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! accessor-fn */ "./node_modules/accessor-fn/dist/accessor-fn.module.js");







var ANIMATION_DURATION = 1200;
var cartogram = new kapsule__WEBPACK_IMPORTED_MODULE_2__["default"]({
  props: {
    width: {
      "default": window.innerWidth
    },
    height: {
      "default": window.innerHeight
    },
    iterations: {
      "default": 20
    },
    projection: {
      "default": (0,d3_geo__WEBPACK_IMPORTED_MODULE_4__["default"])().scale(Math.min((window.innerWidth - 3) / (2 * Math.PI), (window.innerHeight - 3) / (1.2 * Math.PI))).translate([window.innerWidth / 2, window.innerHeight / 1.5])
    },
    topoJson: {},
    topoObjectName: {},
    value: {
      "default": 1
    },
    color: {
      "default": 'lightgrey'
    },
    label: {
      "default": ''
    },
    valFormatter: {
      "default": function _default(n) {
        return n;
      }
    },
    units: {
      "default": ''
    },
    tooltipContent: {
      "default": function _default(d) {
        return '';
      }
    },
    onClick: {}
  },
  init: function init(domNode, state) {
    state.cartogram = (0,topogram__WEBPACK_IMPORTED_MODULE_1__.cartogram)().properties(function (d) {
      return d.properties;
    }); // Dom

    state.svg = (0,d3_selection__WEBPACK_IMPORTED_MODULE_5__["default"])(domNode).append('svg').attr('class', 'cartogram'); // tooltips

    state.tooltip = (0,d3_selection__WEBPACK_IMPORTED_MODULE_5__["default"])('body').append('div').attr('class', 'chart-tooltip cartogram-tooltip'); // tooltip cleanup on unmount

    domNode.addEventListener('DOMNodeRemoved', function (e) {
      if (e.target === this) {
        state.tooltip.remove();
      }
    });
    state.svg.on('mousemove', function (ev) {
      var mousePos = (0,d3_selection__WEBPACK_IMPORTED_MODULE_6__["default"])(ev);
      state.tooltip.style('left', mousePos[0] + 'px').style('top', mousePos[1] + 'px').style('transform', "translate(-".concat(mousePos[0] / state.width * 100, "%, 21px)")); // adjust horizontal position to not exceed canvas boundaries
    });
  },
  update: function update(state) {
    var valueOf = (0,accessor_fn__WEBPACK_IMPORTED_MODULE_3__["default"])(state.value);
    var colorOf = (0,accessor_fn__WEBPACK_IMPORTED_MODULE_3__["default"])(state.color);
    state.svg.attr('width', state.width).attr('height', state.height);
    if (!state.topoJson) return; // No features to render

    var topoObject = state.topoJson.objects[state.topoObjectName] || Object.values(state.topoJson.objects)[0];

    if (!topoObject) {
      console.warn('Unable to find topology object in TopoJson');
      return;
    }

    state.cartogram.projection(state.projection).value(valueOf);
    var features = state.svg.selectAll('path.feature').data(state.cartogram.iterations(1) // Initialize new features non-distorted
    (state.topoJson, topoObject.geometries).features);
    features.exit().remove();
    var newFeatures = features.enter().append('path').attr('class', 'feature').style('fill', 'lightgrey').attr('d', state.cartogram.path).on('mouseover', function (ev, feature) {
      var valueOf = (0,accessor_fn__WEBPACK_IMPORTED_MODULE_3__["default"])(state.value);
      var labelOf = (0,accessor_fn__WEBPACK_IMPORTED_MODULE_3__["default"])(state.label);
      var tooltipContentOf = (0,accessor_fn__WEBPACK_IMPORTED_MODULE_3__["default"])(state.tooltipContent);
      var label = labelOf(feature);
      var extraContent = tooltipContentOf(feature);
      state.tooltip.style('display', 'inline');
      state.tooltip.html("\n          ".concat(label ? "<b>".concat(label, "</b>:") : '', "\n          ").concat(state.valFormatter(valueOf(feature)), "\n          ").concat(state.units, "\n          ").concat(extraContent ? "<br/><br/>".concat(extraContent) : '', "\n        "));
    }).on('mouseout', function () {
      state.tooltip.style('display', 'none');
    }).on('click', function (ev, d) {
      return state.onClick && state.onClick(d);
    });
    features.merge(newFeatures).data(state.cartogram.iterations(state.iterations) // distort all features
    (state.topoJson, topoObject.geometries).features).style('cursor', state.onClick ? 'pointer' : null).transition().duration(ANIMATION_DURATION).style('fill', colorOf).attr('d', state.cartogram.path);
  }
});

function styleInject(css, ref) {
  if (ref === void 0) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') {
    return;
  }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z = ".cartogram .feature {\n    stroke: darkgrey;\n    transition: fill-opacity .7s;\n}\n\n.cartogram .feature:hover {\n    fill-opacity: 0.6;\n    transition: fill-opacity .1s;\n}\n\n.cartogram-tooltip {\n    display: none;\n    position: absolute;\n    max-width: 320px;\n    white-space: nowrap;\n    padding: 5px;\n    border-radius: 3px;\n    font: 12px sans-serif;\n    color: #eee;\n    background: rgba(0,0,0,0.65);\n    pointer-events: none;\n}";
styleInject(css_248z);




/***/ }),

/***/ "./node_modules/debounce/index.js":
/*!****************************************!*\
  !*** ./node_modules/debounce/index.js ***!
  \****************************************/
/***/ ((module) => {

/**
 * Returns a function, that, as long as it continues to be invoked, will not
 * be triggered. The function will be called after it stops being called for
 * N milliseconds. If `immediate` is passed, trigger the function on the
 * leading edge, instead of the trailing. The function also has a property 'clear' 
 * that is a function which will clear the timer to prevent previously scheduled executions. 
 *
 * @source underscore.js
 * @see http://unscriptable.com/2009/03/20/debouncing-javascript-methods/
 * @param {Function} function to wrap
 * @param {Number} timeout in ms (`100`)
 * @param {Boolean} whether to execute at the beginning (`false`)
 * @api public
 */
function debounce(func, wait, immediate){
  var timeout, args, context, timestamp, result;
  if (null == wait) wait = 100;

  function later() {
    var last = Date.now() - timestamp;

    if (last < wait && last >= 0) {
      timeout = setTimeout(later, wait - last);
    } else {
      timeout = null;
      if (!immediate) {
        result = func.apply(context, args);
        context = args = null;
      }
    }
  };

  var debounced = function(){
    context = this;
    args = arguments;
    timestamp = Date.now();
    var callNow = immediate && !timeout;
    if (!timeout) timeout = setTimeout(later, wait);
    if (callNow) {
      result = func.apply(context, args);
      context = args = null;
    }

    return result;
  };

  debounced.clear = function() {
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }
  };
  
  debounced.flush = function() {
    if (timeout) {
      result = func.apply(context, args);
      context = args = null;
      
      clearTimeout(timeout);
      timeout = null;
    }
  };

  return debounced;
};

// Adds compatibility for ES modules
debounce.debounce = debounce;

module.exports = debounce;


/***/ }),

/***/ "./node_modules/kapsule/dist/kapsule.module.js":
/*!*****************************************************!*\
  !*** ./node_modules/kapsule/dist/kapsule.module.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var debounce__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! debounce */ "./node_modules/debounce/index.js");
/* harmony import */ var debounce__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(debounce__WEBPACK_IMPORTED_MODULE_0__);


function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]);

  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;

  var _s, _e;

  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

var Prop = function Prop(name, _ref) {
  var _ref$default = _ref["default"],
      defaultVal = _ref$default === void 0 ? null : _ref$default,
      _ref$triggerUpdate = _ref.triggerUpdate,
      triggerUpdate = _ref$triggerUpdate === void 0 ? true : _ref$triggerUpdate,
      _ref$onChange = _ref.onChange,
      onChange = _ref$onChange === void 0 ? function (newVal, state) {} : _ref$onChange;

  _classCallCheck(this, Prop);

  this.name = name;
  this.defaultVal = defaultVal;
  this.triggerUpdate = triggerUpdate;
  this.onChange = onChange;
};

function index (_ref2) {
  var _ref2$stateInit = _ref2.stateInit,
      stateInit = _ref2$stateInit === void 0 ? function () {
    return {};
  } : _ref2$stateInit,
      _ref2$props = _ref2.props,
      rawProps = _ref2$props === void 0 ? {} : _ref2$props,
      _ref2$methods = _ref2.methods,
      methods = _ref2$methods === void 0 ? {} : _ref2$methods,
      _ref2$aliases = _ref2.aliases,
      aliases = _ref2$aliases === void 0 ? {} : _ref2$aliases,
      _ref2$init = _ref2.init,
      initFn = _ref2$init === void 0 ? function () {} : _ref2$init,
      _ref2$update = _ref2.update,
      updateFn = _ref2$update === void 0 ? function () {} : _ref2$update;
  // Parse props into Prop instances
  var props = Object.keys(rawProps).map(function (propName) {
    return new Prop(propName, rawProps[propName]);
  });
  return function () {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    // Holds component state
    var state = Object.assign({}, stateInit instanceof Function ? stateInit(options) : stateInit, // Support plain objects for backwards compatibility
    {
      initialised: false
    }); // keeps track of which props triggered an update

    var changedProps = {}; // Component constructor

    function comp(nodeElement) {
      initStatic(nodeElement, options);
      digest();
      return comp;
    }

    var initStatic = function initStatic(nodeElement, options) {
      initFn.call(comp, nodeElement, state, options);
      state.initialised = true;
    };

    var digest = debounce__WEBPACK_IMPORTED_MODULE_0___default()(function () {
      if (!state.initialised) {
        return;
      }

      updateFn.call(comp, state, changedProps);
      changedProps = {};
    }, 1); // Getter/setter methods

    props.forEach(function (prop) {
      comp[prop.name] = getSetProp(prop);

      function getSetProp(_ref3) {
        var prop = _ref3.name,
            _ref3$triggerUpdate = _ref3.triggerUpdate,
            redigest = _ref3$triggerUpdate === void 0 ? false : _ref3$triggerUpdate,
            _ref3$onChange = _ref3.onChange,
            onChange = _ref3$onChange === void 0 ? function (newVal, state) {} : _ref3$onChange,
            _ref3$defaultVal = _ref3.defaultVal,
            defaultVal = _ref3$defaultVal === void 0 ? null : _ref3$defaultVal;
        return function (_) {
          var curVal = state[prop];

          if (!arguments.length) {
            return curVal;
          } // Getter mode


          var val = _ === undefined ? defaultVal : _; // pick default if value passed is undefined

          state[prop] = val;
          onChange.call(comp, val, state, curVal); // track changed props

          !changedProps.hasOwnProperty(prop) && (changedProps[prop] = curVal);

          if (redigest) {
            digest();
          }

          return comp;
        };
      }
    }); // Other methods

    Object.keys(methods).forEach(function (methodName) {
      comp[methodName] = function () {
        var _methods$methodName;

        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        return (_methods$methodName = methods[methodName]).call.apply(_methods$methodName, [comp, state].concat(args));
      };
    }); // Link aliases

    Object.entries(aliases).forEach(function (_ref4) {
      var _ref5 = _slicedToArray(_ref4, 2),
          alias = _ref5[0],
          target = _ref5[1];

      return comp[alias] = comp[target];
    }); // Reset all component props to their default value

    comp.resetProps = function () {
      props.forEach(function (prop) {
        comp[prop.name](prop.defaultVal);
      });
      return comp;
    }; //


    comp.resetProps(); // Apply all prop defaults

    state._rerender = digest; // Expose digest method

    return comp;
  };
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (index);


/***/ }),

/***/ "./node_modules/topogram/build/topogram.js":
/*!*************************************************!*\
  !*** ./node_modules/topogram/build/topogram.js ***!
  \*************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

(function (global, factory) {
	 true ? factory(exports) :
	0;
}(this, function (exports) { 'use strict';

	function ascending(a, b) {
	  return a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
	}

	function bisector(compare) {
	  if (compare.length === 1) compare = ascendingComparator(compare);
	  return {
	    left: function(a, x, lo, hi) {
	      if (lo == null) lo = 0;
	      if (hi == null) hi = a.length;
	      while (lo < hi) {
	        var mid = lo + hi >>> 1;
	        if (compare(a[mid], x) < 0) lo = mid + 1;
	        else hi = mid;
	      }
	      return lo;
	    },
	    right: function(a, x, lo, hi) {
	      if (lo == null) lo = 0;
	      if (hi == null) hi = a.length;
	      while (lo < hi) {
	        var mid = lo + hi >>> 1;
	        if (compare(a[mid], x) > 0) hi = mid;
	        else lo = mid + 1;
	      }
	      return lo;
	    }
	  };
	}

	function ascendingComparator(f) {
	  return function(d, x) {
	    return ascending(f(d), x);
	  };
	}

	var ascendingBisect = bisector(ascending);

	function merge(arrays) {
	  var n = arrays.length,
	      m,
	      i = -1,
	      j = 0,
	      merged,
	      array;

	  while (++i < n) j += arrays[i].length;
	  merged = new Array(j);

	  while (--n >= 0) {
	    array = arrays[n];
	    m = array.length;
	    while (--m >= 0) {
	      merged[--j] = array[m];
	    }
	  }

	  return merged;
	}

	function sum(array, f) {
	  var s = 0,
	      n = array.length,
	      a,
	      i = -1;

	  if (f == null) {
	    while (++i < n) if (a = +array[i]) s += a; // Note: zero and null are equivalent.
	  }

	  else {
	    while (++i < n) if (a = +f(array[i], i, array)) s += a;
	  }

	  return s;
	}

	// Adds floating point numbers with twice the normal precision.
	// Reference: J. R. Shewchuk, Adaptive Precision Floating-Point Arithmetic and
	// Fast Robust Geometric Predicates, Discrete & Computational Geometry 18(3)
	// 305–363 (1997).
	// Code adapted from GeographicLib by Charles F. F. Karney,
	// http://geographiclib.sourceforge.net/

	function adder() {
	  return new Adder;
	}

	function Adder() {
	  this.reset();
	}

	Adder.prototype = {
	  constructor: Adder,
	  reset: function() {
	    this.s = // rounded value
	    this.t = 0; // exact error
	  },
	  add: function(y) {
	    add(temp, y, this.t);
	    add(this, temp.s, this.s);
	    if (this.s) this.t += temp.t;
	    else this.s = temp.t;
	  },
	  valueOf: function() {
	    return this.s;
	  }
	};

	var temp = new Adder;

	function add(adder, a, b) {
	  var x = adder.s = a + b,
	      bv = x - a,
	      av = x - bv;
	  adder.t = (a - av) + (b - bv);
	}

	var epsilon = 1e-6;
	var pi = Math.PI;
	var halfPi = pi / 2;
	var quarterPi = pi / 4;
	var tau = pi * 2;

	var degrees = 180 / pi;
	var radians = pi / 180;

	var abs = Math.abs;
	var atan = Math.atan;
	var atan2 = Math.atan2;
	var cos = Math.cos;
	var sin = Math.sin;
	var sign = Math.sign || function(x) { return x > 0 ? 1 : x < 0 ? -1 : 0; };
	var sqrt = Math.sqrt;
	function acos(x) {
	  return x > 1 ? 0 : x < -1 ? pi : Math.acos(x);
	}

	function asin(x) {
	  return x > 1 ? halfPi : x < -1 ? -halfPi : Math.asin(x);
	}

	function noop() {}

	function streamGeometry(geometry, stream) {
	  if (geometry && streamGeometryType.hasOwnProperty(geometry.type)) {
	    streamGeometryType[geometry.type](geometry, stream);
	  }
	}

	var streamObjectType = {
	  Feature: function(object, stream) {
	    streamGeometry(object.geometry, stream);
	  },
	  FeatureCollection: function(object, stream) {
	    var features = object.features, i = -1, n = features.length;
	    while (++i < n) streamGeometry(features[i].geometry, stream);
	  }
	};

	var streamGeometryType = {
	  Sphere: function(object, stream) {
	    stream.sphere();
	  },
	  Point: function(object, stream) {
	    object = object.coordinates;
	    stream.point(object[0], object[1], object[2]);
	  },
	  MultiPoint: function(object, stream) {
	    var coordinates = object.coordinates, i = -1, n = coordinates.length;
	    while (++i < n) object = coordinates[i], stream.point(object[0], object[1], object[2]);
	  },
	  LineString: function(object, stream) {
	    streamLine(object.coordinates, stream, 0);
	  },
	  MultiLineString: function(object, stream) {
	    var coordinates = object.coordinates, i = -1, n = coordinates.length;
	    while (++i < n) streamLine(coordinates[i], stream, 0);
	  },
	  Polygon: function(object, stream) {
	    streamPolygon(object.coordinates, stream);
	  },
	  MultiPolygon: function(object, stream) {
	    var coordinates = object.coordinates, i = -1, n = coordinates.length;
	    while (++i < n) streamPolygon(coordinates[i], stream);
	  },
	  GeometryCollection: function(object, stream) {
	    var geometries = object.geometries, i = -1, n = geometries.length;
	    while (++i < n) streamGeometry(geometries[i], stream);
	  }
	};

	function streamLine(coordinates, stream, closed) {
	  var i = -1, n = coordinates.length - closed, coordinate;
	  stream.lineStart();
	  while (++i < n) coordinate = coordinates[i], stream.point(coordinate[0], coordinate[1], coordinate[2]);
	  stream.lineEnd();
	}

	function streamPolygon(coordinates, stream) {
	  var i = -1, n = coordinates.length;
	  stream.polygonStart();
	  while (++i < n) streamLine(coordinates[i], stream, 1);
	  stream.polygonEnd();
	}

	function geoStream(object, stream) {
	  if (object && streamObjectType.hasOwnProperty(object.type)) {
	    streamObjectType[object.type](object, stream);
	  } else {
	    streamGeometry(object, stream);
	  }
	}

	var areaRingSum = adder();

	var areaSum = adder();
	var lambda00;
	var phi00;
	var lambda0;
	var cosPhi0;
	var sinPhi0;
	var areaStream = {
	  point: noop,
	  lineStart: noop,
	  lineEnd: noop,
	  polygonStart: function() {
	    areaRingSum.reset();
	    areaStream.lineStart = areaRingStart;
	    areaStream.lineEnd = areaRingEnd;
	  },
	  polygonEnd: function() {
	    var areaRing = +areaRingSum;
	    areaSum.add(areaRing < 0 ? tau + areaRing : areaRing);
	    this.lineStart = this.lineEnd = this.point = noop;
	  },
	  sphere: function() {
	    areaSum.add(tau);
	  }
	};

	function areaRingStart() {
	  areaStream.point = areaPointFirst;
	}

	function areaRingEnd() {
	  areaPoint(lambda00, phi00);
	}

	function areaPointFirst(lambda, phi) {
	  areaStream.point = areaPoint;
	  lambda00 = lambda, phi00 = phi;
	  lambda *= radians, phi *= radians;
	  lambda0 = lambda, cosPhi0 = cos(phi = phi / 2 + quarterPi), sinPhi0 = sin(phi);
	}

	function areaPoint(lambda, phi) {
	  lambda *= radians, phi *= radians;
	  phi = phi / 2 + quarterPi; // half the angular distance from south pole

	  // Spherical excess E for a spherical triangle with vertices: south pole,
	  // previous point, current point.  Uses a formula derived from Cagnoli’s
	  // theorem.  See Todhunter, Spherical Trig. (1871), Sec. 103, Eq. (2).
	  var dLambda = lambda - lambda0,
	      sdLambda = dLambda >= 0 ? 1 : -1,
	      adLambda = sdLambda * dLambda,
	      cosPhi = cos(phi),
	      sinPhi = sin(phi),
	      k = sinPhi0 * sinPhi,
	      u = cosPhi0 * cosPhi + k * cos(adLambda),
	      v = k * sdLambda * sin(adLambda);
	  areaRingSum.add(atan2(v, u));

	  // Advance the previous points.
	  lambda0 = lambda, cosPhi0 = cosPhi, sinPhi0 = sinPhi;
	}

	function spherical(cartesian) {
	  return [atan2(cartesian[1], cartesian[0]), asin(cartesian[2])];
	}

	function cartesian(spherical) {
	  var lambda = spherical[0], phi = spherical[1], cosPhi = cos(phi);
	  return [cosPhi * cos(lambda), cosPhi * sin(lambda), sin(phi)];
	}

	function cartesianDot(a, b) {
	  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
	}

	function cartesianCross(a, b) {
	  return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
	}

	// TODO return a
	function cartesianAddInPlace(a, b) {
	  a[0] += b[0], a[1] += b[1], a[2] += b[2];
	}

	function cartesianScale(vector, k) {
	  return [vector[0] * k, vector[1] * k, vector[2] * k];
	}

	// TODO return d
	function cartesianNormalizeInPlace(d) {
	  var l = sqrt(d[0] * d[0] + d[1] * d[1] + d[2] * d[2]);
	  d[0] /= l, d[1] /= l, d[2] /= l;
	}

	var lambda0$1;
	var phi0;
	var lambda1;
	var phi1;
	var lambda2;
	var lambda00$1;
	var phi00$1;
	var p0;
	var deltaSum = adder();
	var ranges;
	var range$1;
	var boundsStream = {
	  point: boundsPoint,
	  lineStart: boundsLineStart,
	  lineEnd: boundsLineEnd,
	  polygonStart: function() {
	    boundsStream.point = boundsRingPoint;
	    boundsStream.lineStart = boundsRingStart;
	    boundsStream.lineEnd = boundsRingEnd;
	    deltaSum.reset();
	    areaStream.polygonStart();
	  },
	  polygonEnd: function() {
	    areaStream.polygonEnd();
	    boundsStream.point = boundsPoint;
	    boundsStream.lineStart = boundsLineStart;
	    boundsStream.lineEnd = boundsLineEnd;
	    if (areaRingSum < 0) lambda0$1 = -(lambda1 = 180), phi0 = -(phi1 = 90);
	    else if (deltaSum > epsilon) phi1 = 90;
	    else if (deltaSum < -epsilon) phi0 = -90;
	    range$1[0] = lambda0$1, range$1[1] = lambda1;
	  }
	};

	function boundsPoint(lambda, phi) {
	  ranges.push(range$1 = [lambda0$1 = lambda, lambda1 = lambda]);
	  if (phi < phi0) phi0 = phi;
	  if (phi > phi1) phi1 = phi;
	}

	function linePoint(lambda, phi) {
	  var p = cartesian([lambda * radians, phi * radians]);
	  if (p0) {
	    var normal = cartesianCross(p0, p),
	        equatorial = [normal[1], -normal[0], 0],
	        inflection = cartesianCross(equatorial, normal);
	    cartesianNormalizeInPlace(inflection);
	    inflection = spherical(inflection);
	    var delta = lambda - lambda2,
	        sign = delta > 0 ? 1 : -1,
	        lambdai = inflection[0] * degrees * sign,
	        phii,
	        antimeridian = abs(delta) > 180;
	    if (antimeridian ^ (sign * lambda2 < lambdai && lambdai < sign * lambda)) {
	      phii = inflection[1] * degrees;
	      if (phii > phi1) phi1 = phii;
	    } else if (lambdai = (lambdai + 360) % 360 - 180, antimeridian ^ (sign * lambda2 < lambdai && lambdai < sign * lambda)) {
	      phii = -inflection[1] * degrees;
	      if (phii < phi0) phi0 = phii;
	    } else {
	      if (phi < phi0) phi0 = phi;
	      if (phi > phi1) phi1 = phi;
	    }
	    if (antimeridian) {
	      if (lambda < lambda2) {
	        if (angle(lambda0$1, lambda) > angle(lambda0$1, lambda1)) lambda1 = lambda;
	      } else {
	        if (angle(lambda, lambda1) > angle(lambda0$1, lambda1)) lambda0$1 = lambda;
	      }
	    } else {
	      if (lambda1 >= lambda0$1) {
	        if (lambda < lambda0$1) lambda0$1 = lambda;
	        if (lambda > lambda1) lambda1 = lambda;
	      } else {
	        if (lambda > lambda2) {
	          if (angle(lambda0$1, lambda) > angle(lambda0$1, lambda1)) lambda1 = lambda;
	        } else {
	          if (angle(lambda, lambda1) > angle(lambda0$1, lambda1)) lambda0$1 = lambda;
	        }
	      }
	    }
	  } else {
	    ranges.push(range$1 = [lambda0$1 = lambda, lambda1 = lambda]);
	  }
	  if (phi < phi0) phi0 = phi;
	  if (phi > phi1) phi1 = phi;
	  p0 = p, lambda2 = lambda;
	}

	function boundsLineStart() {
	  boundsStream.point = linePoint;
	}

	function boundsLineEnd() {
	  range$1[0] = lambda0$1, range$1[1] = lambda1;
	  boundsStream.point = boundsPoint;
	  p0 = null;
	}

	function boundsRingPoint(lambda, phi) {
	  if (p0) {
	    var delta = lambda - lambda2;
	    deltaSum.add(abs(delta) > 180 ? delta + (delta > 0 ? 360 : -360) : delta);
	  } else {
	    lambda00$1 = lambda, phi00$1 = phi;
	  }
	  areaStream.point(lambda, phi);
	  linePoint(lambda, phi);
	}

	function boundsRingStart() {
	  areaStream.lineStart();
	}

	function boundsRingEnd() {
	  boundsRingPoint(lambda00$1, phi00$1);
	  areaStream.lineEnd();
	  if (abs(deltaSum) > epsilon) lambda0$1 = -(lambda1 = 180);
	  range$1[0] = lambda0$1, range$1[1] = lambda1;
	  p0 = null;
	}

	// Finds the left-right distance between two longitudes.
	// This is almost the same as (lambda1 - lambda0 + 360°) % 360°, except that we want
	// the distance between ±180° to be 360°.
	function angle(lambda0, lambda1) {
	  return (lambda1 -= lambda0) < 0 ? lambda1 + 360 : lambda1;
	}

	var W0;
	var W1;
	var X0;
	var Y0;
	var Z0;
	var X1;
	var Y1;
	var Z1;
	var X2;
	var Y2;
	var Z2;
	var lambda00$2;
	var phi00$2;
	var x0;
	var y0;
	var z0;
	// previous point

	var centroidStream = {
	  sphere: noop,
	  point: centroidPoint,
	  lineStart: centroidLineStart,
	  lineEnd: centroidLineEnd,
	  polygonStart: function() {
	    centroidStream.lineStart = centroidRingStart;
	    centroidStream.lineEnd = centroidRingEnd;
	  },
	  polygonEnd: function() {
	    centroidStream.lineStart = centroidLineStart;
	    centroidStream.lineEnd = centroidLineEnd;
	  }
	};

	// Arithmetic mean of Cartesian vectors.
	function centroidPoint(lambda, phi) {
	  lambda *= radians, phi *= radians;
	  var cosPhi = cos(phi);
	  centroidPointCartesian(cosPhi * cos(lambda), cosPhi * sin(lambda), sin(phi));
	}

	function centroidPointCartesian(x, y, z) {
	  ++W0;
	  X0 += (x - X0) / W0;
	  Y0 += (y - Y0) / W0;
	  Z0 += (z - Z0) / W0;
	}

	function centroidLineStart() {
	  centroidStream.point = centroidLinePointFirst;
	}

	function centroidLinePointFirst(lambda, phi) {
	  lambda *= radians, phi *= radians;
	  var cosPhi = cos(phi);
	  x0 = cosPhi * cos(lambda);
	  y0 = cosPhi * sin(lambda);
	  z0 = sin(phi);
	  centroidStream.point = centroidLinePoint;
	  centroidPointCartesian(x0, y0, z0);
	}

	function centroidLinePoint(lambda, phi) {
	  lambda *= radians, phi *= radians;
	  var cosPhi = cos(phi),
	      x = cosPhi * cos(lambda),
	      y = cosPhi * sin(lambda),
	      z = sin(phi),
	      w = atan2(sqrt((w = y0 * z - z0 * y) * w + (w = z0 * x - x0 * z) * w + (w = x0 * y - y0 * x) * w), x0 * x + y0 * y + z0 * z);
	  W1 += w;
	  X1 += w * (x0 + (x0 = x));
	  Y1 += w * (y0 + (y0 = y));
	  Z1 += w * (z0 + (z0 = z));
	  centroidPointCartesian(x0, y0, z0);
	}

	function centroidLineEnd() {
	  centroidStream.point = centroidPoint;
	}

	// See J. E. Brock, The Inertia Tensor for a Spherical Triangle,
	// J. Applied Mechanics 42, 239 (1975).
	function centroidRingStart() {
	  centroidStream.point = centroidRingPointFirst;
	}

	function centroidRingEnd() {
	  centroidRingPoint(lambda00$2, phi00$2);
	  centroidStream.point = centroidPoint;
	}

	function centroidRingPointFirst(lambda, phi) {
	  lambda00$2 = lambda, phi00$2 = phi;
	  lambda *= radians, phi *= radians;
	  centroidStream.point = centroidRingPoint;
	  var cosPhi = cos(phi);
	  x0 = cosPhi * cos(lambda);
	  y0 = cosPhi * sin(lambda);
	  z0 = sin(phi);
	  centroidPointCartesian(x0, y0, z0);
	}

	function centroidRingPoint(lambda, phi) {
	  lambda *= radians, phi *= radians;
	  var cosPhi = cos(phi),
	      x = cosPhi * cos(lambda),
	      y = cosPhi * sin(lambda),
	      z = sin(phi),
	      cx = y0 * z - z0 * y,
	      cy = z0 * x - x0 * z,
	      cz = x0 * y - y0 * x,
	      m = sqrt(cx * cx + cy * cy + cz * cz),
	      w = asin(m), // line weight = angle
	      v = m && -w / m; // area weight multiplier
	  X2 += v * cx;
	  Y2 += v * cy;
	  Z2 += v * cz;
	  W1 += w;
	  X1 += w * (x0 + (x0 = x));
	  Y1 += w * (y0 + (y0 = y));
	  Z1 += w * (z0 + (z0 = z));
	  centroidPointCartesian(x0, y0, z0);
	}

	function compose(a, b) {

	  function compose(x, y) {
	    return x = a(x, y), b(x[0], x[1]);
	  }

	  if (a.invert && b.invert) compose.invert = function(x, y) {
	    return x = b.invert(x, y), x && a.invert(x[0], x[1]);
	  };

	  return compose;
	}

	function rotationIdentity(lambda, phi) {
	  return [lambda > pi ? lambda - tau : lambda < -pi ? lambda + tau : lambda, phi];
	}

	rotationIdentity.invert = rotationIdentity;

	function rotateRadians(deltaLambda, deltaPhi, deltaGamma) {
	  return (deltaLambda %= tau) ? (deltaPhi || deltaGamma ? compose(rotationLambda(deltaLambda), rotationPhiGamma(deltaPhi, deltaGamma))
	    : rotationLambda(deltaLambda))
	    : (deltaPhi || deltaGamma ? rotationPhiGamma(deltaPhi, deltaGamma)
	    : rotationIdentity);
	}

	function forwardRotationLambda(deltaLambda) {
	  return function(lambda, phi) {
	    return lambda += deltaLambda, [lambda > pi ? lambda - tau : lambda < -pi ? lambda + tau : lambda, phi];
	  };
	}

	function rotationLambda(deltaLambda) {
	  var rotation = forwardRotationLambda(deltaLambda);
	  rotation.invert = forwardRotationLambda(-deltaLambda);
	  return rotation;
	}

	function rotationPhiGamma(deltaPhi, deltaGamma) {
	  var cosDeltaPhi = cos(deltaPhi),
	      sinDeltaPhi = sin(deltaPhi),
	      cosDeltaGamma = cos(deltaGamma),
	      sinDeltaGamma = sin(deltaGamma);

	  function rotation(lambda, phi) {
	    var cosPhi = cos(phi),
	        x = cos(lambda) * cosPhi,
	        y = sin(lambda) * cosPhi,
	        z = sin(phi),
	        k = z * cosDeltaPhi + x * sinDeltaPhi;
	    return [
	      atan2(y * cosDeltaGamma - k * sinDeltaGamma, x * cosDeltaPhi - z * sinDeltaPhi),
	      asin(k * cosDeltaGamma + y * sinDeltaGamma)
	    ];
	  }

	  rotation.invert = function(lambda, phi) {
	    var cosPhi = cos(phi),
	        x = cos(lambda) * cosPhi,
	        y = sin(lambda) * cosPhi,
	        z = sin(phi),
	        k = z * cosDeltaGamma - y * sinDeltaGamma;
	    return [
	      atan2(y * cosDeltaGamma + z * sinDeltaGamma, x * cosDeltaPhi + k * sinDeltaPhi),
	      asin(k * cosDeltaPhi - x * sinDeltaPhi)
	    ];
	  };

	  return rotation;
	}

	// Generates a circle centered at [0°, 0°], with a given radius and precision.
	function circleStream(stream, radius, delta, direction, t0, t1) {
	  if (!delta) return;
	  var cosRadius = cos(radius),
	      sinRadius = sin(radius),
	      step = direction * delta;
	  if (t0 == null) {
	    t0 = radius + direction * tau;
	    t1 = radius - step / 2;
	  } else {
	    t0 = circleRadius(cosRadius, t0);
	    t1 = circleRadius(cosRadius, t1);
	    if (direction > 0 ? t0 < t1 : t0 > t1) t0 += direction * tau;
	  }
	  for (var point, t = t0; direction > 0 ? t > t1 : t < t1; t -= step) {
	    point = spherical([cosRadius, -sinRadius * cos(t), -sinRadius * sin(t)]);
	    stream.point(point[0], point[1]);
	  }
	}

	// Returns the signed angle of a cartesian point relative to [cosRadius, 0, 0].
	function circleRadius(cosRadius, point) {
	  point = cartesian(point), point[0] -= cosRadius;
	  cartesianNormalizeInPlace(point);
	  var radius = acos(-point[1]);
	  return ((-point[2] < 0 ? -radius : radius) + tau - epsilon) % tau;
	}

	function clipBuffer() {
	  var lines = [],
	      line;
	  return {
	    point: function(x, y) {
	      line.push([x, y]);
	    },
	    lineStart: function() {
	      lines.push(line = []);
	    },
	    lineEnd: noop,
	    rejoin: function() {
	      if (lines.length > 1) lines.push(lines.pop().concat(lines.shift()));
	    },
	    result: function() {
	      var result = lines;
	      lines = [];
	      line = null;
	      return result;
	    }
	  };
	}

	function clipLine(a, b, x0, y0, x1, y1) {
	  var ax = a[0],
	      ay = a[1],
	      bx = b[0],
	      by = b[1],
	      t0 = 0,
	      t1 = 1,
	      dx = bx - ax,
	      dy = by - ay,
	      r;

	  r = x0 - ax;
	  if (!dx && r > 0) return;
	  r /= dx;
	  if (dx < 0) {
	    if (r < t0) return;
	    if (r < t1) t1 = r;
	  } else if (dx > 0) {
	    if (r > t1) return;
	    if (r > t0) t0 = r;
	  }

	  r = x1 - ax;
	  if (!dx && r < 0) return;
	  r /= dx;
	  if (dx < 0) {
	    if (r > t1) return;
	    if (r > t0) t0 = r;
	  } else if (dx > 0) {
	    if (r < t0) return;
	    if (r < t1) t1 = r;
	  }

	  r = y0 - ay;
	  if (!dy && r > 0) return;
	  r /= dy;
	  if (dy < 0) {
	    if (r < t0) return;
	    if (r < t1) t1 = r;
	  } else if (dy > 0) {
	    if (r > t1) return;
	    if (r > t0) t0 = r;
	  }

	  r = y1 - ay;
	  if (!dy && r < 0) return;
	  r /= dy;
	  if (dy < 0) {
	    if (r > t1) return;
	    if (r > t0) t0 = r;
	  } else if (dy > 0) {
	    if (r < t0) return;
	    if (r < t1) t1 = r;
	  }

	  if (t0 > 0) a[0] = ax + t0 * dx, a[1] = ay + t0 * dy;
	  if (t1 < 1) b[0] = ax + t1 * dx, b[1] = ay + t1 * dy;
	  return true;
	}

	function pointEqual(a, b) {
	  return abs(a[0] - b[0]) < epsilon && abs(a[1] - b[1]) < epsilon;
	}

	function Intersection(point, points, other, entry) {
	  this.x = point;
	  this.z = points;
	  this.o = other; // another intersection
	  this.e = entry; // is an entry?
	  this.v = false; // visited
	  this.n = this.p = null; // next & previous
	}

	// A generalized polygon clipping algorithm: given a polygon that has been cut
	// into its visible line segments, and rejoins the segments by interpolating
	// along the clip edge.
	function clipPolygon(segments, compareIntersection, startInside, interpolate, stream) {
	  var subject = [],
	      clip = [],
	      i,
	      n;

	  segments.forEach(function(segment) {
	    if ((n = segment.length - 1) <= 0) return;
	    var n, p0 = segment[0], p1 = segment[n], x;

	    // If the first and last points of a segment are coincident, then treat as a
	    // closed ring. TODO if all rings are closed, then the winding order of the
	    // exterior ring should be checked.
	    if (pointEqual(p0, p1)) {
	      stream.lineStart();
	      for (i = 0; i < n; ++i) stream.point((p0 = segment[i])[0], p0[1]);
	      stream.lineEnd();
	      return;
	    }

	    subject.push(x = new Intersection(p0, segment, null, true));
	    clip.push(x.o = new Intersection(p0, null, x, false));
	    subject.push(x = new Intersection(p1, segment, null, false));
	    clip.push(x.o = new Intersection(p1, null, x, true));
	  });

	  if (!subject.length) return;

	  clip.sort(compareIntersection);
	  link(subject);
	  link(clip);

	  for (i = 0, n = clip.length; i < n; ++i) {
	    clip[i].e = startInside = !startInside;
	  }

	  var start = subject[0],
	      points,
	      point;

	  while (1) {
	    // Find first unvisited intersection.
	    var current = start,
	        isSubject = true;
	    while (current.v) if ((current = current.n) === start) return;
	    points = current.z;
	    stream.lineStart();
	    do {
	      current.v = current.o.v = true;
	      if (current.e) {
	        if (isSubject) {
	          for (i = 0, n = points.length; i < n; ++i) stream.point((point = points[i])[0], point[1]);
	        } else {
	          interpolate(current.x, current.n.x, 1, stream);
	        }
	        current = current.n;
	      } else {
	        if (isSubject) {
	          points = current.p.z;
	          for (i = points.length - 1; i >= 0; --i) stream.point((point = points[i])[0], point[1]);
	        } else {
	          interpolate(current.x, current.p.x, -1, stream);
	        }
	        current = current.p;
	      }
	      current = current.o;
	      points = current.z;
	      isSubject = !isSubject;
	    } while (!current.v);
	    stream.lineEnd();
	  }
	}

	function link(array) {
	  if (!(n = array.length)) return;
	  var n,
	      i = 0,
	      a = array[0],
	      b;
	  while (++i < n) {
	    a.n = b = array[i];
	    b.p = a;
	    a = b;
	  }
	  a.n = b = array[0];
	  b.p = a;
	}

	var clipMax = 1e9;
	var clipMin = -clipMax;
	// TODO Use d3-polygon’s polygonContains here for the ring check?
	// TODO Eliminate duplicate buffering in clipBuffer and polygon.push?

	function clipExtent(x0, y0, x1, y1) {

	  function visible(x, y) {
	    return x0 <= x && x <= x1 && y0 <= y && y <= y1;
	  }

	  function interpolate(from, to, direction, stream) {
	    var a = 0, a1 = 0;
	    if (from == null
	        || (a = corner(from, direction)) !== (a1 = corner(to, direction))
	        || comparePoint(from, to) < 0 ^ direction > 0) {
	      do stream.point(a === 0 || a === 3 ? x0 : x1, a > 1 ? y1 : y0);
	      while ((a = (a + direction + 4) % 4) !== a1);
	    } else {
	      stream.point(to[0], to[1]);
	    }
	  }

	  function corner(p, direction) {
	    return abs(p[0] - x0) < epsilon ? direction > 0 ? 0 : 3
	        : abs(p[0] - x1) < epsilon ? direction > 0 ? 2 : 1
	        : abs(p[1] - y0) < epsilon ? direction > 0 ? 1 : 0
	        : direction > 0 ? 3 : 2; // abs(p[1] - y1) < epsilon
	  }

	  function compareIntersection(a, b) {
	    return comparePoint(a.x, b.x);
	  }

	  function comparePoint(a, b) {
	    var ca = corner(a, 1),
	        cb = corner(b, 1);
	    return ca !== cb ? ca - cb
	        : ca === 0 ? b[1] - a[1]
	        : ca === 1 ? a[0] - b[0]
	        : ca === 2 ? a[1] - b[1]
	        : b[0] - a[0];
	  }

	  return function(stream) {
	    var activeStream = stream,
	        bufferStream = clipBuffer(),
	        segments,
	        polygon,
	        ring,
	        x__, y__, v__, // first point
	        x_, y_, v_, // previous point
	        first,
	        clean;

	    var clipStream = {
	      point: point,
	      lineStart: lineStart,
	      lineEnd: lineEnd,
	      polygonStart: polygonStart,
	      polygonEnd: polygonEnd
	    };

	    function point(x, y) {
	      if (visible(x, y)) activeStream.point(x, y);
	    }

	    function polygonInside() {
	      var winding = 0;

	      for (var i = 0, n = polygon.length; i < n; ++i) {
	        for (var ring = polygon[i], j = 1, m = ring.length, point = ring[0], a0, a1, b0 = point[0], b1 = point[1]; j < m; ++j) {
	          a0 = b0, a1 = b1, point = ring[j], b0 = point[0], b1 = point[1];
	          if (a1 <= y1) { if (b1 > y1 && (b0 - a0) * (y1 - a1) > (b1 - a1) * (x0 - a0)) ++winding; }
	          else { if (b1 <= y1 && (b0 - a0) * (y1 - a1) < (b1 - a1) * (x0 - a0)) --winding; }
	        }
	      }

	      return winding;
	    }

	    // Buffer geometry within a polygon and then clip it en masse.
	    function polygonStart() {
	      activeStream = bufferStream, segments = [], polygon = [], clean = true;
	    }

	    function polygonEnd() {
	      var startInside = polygonInside(),
	          cleanInside = clean && startInside,
	          visible = (segments = merge(segments)).length;
	      if (cleanInside || visible) {
	        stream.polygonStart();
	        if (cleanInside) {
	          stream.lineStart();
	          interpolate(null, null, 1, stream);
	          stream.lineEnd();
	        }
	        if (visible) {
	          clipPolygon(segments, compareIntersection, startInside, interpolate, stream);
	        }
	        stream.polygonEnd();
	      }
	      activeStream = stream, segments = polygon = ring = null;
	    }

	    function lineStart() {
	      clipStream.point = linePoint;
	      if (polygon) polygon.push(ring = []);
	      first = true;
	      v_ = false;
	      x_ = y_ = NaN;
	    }

	    // TODO rather than special-case polygons, simply handle them separately.
	    // Ideally, coincident intersection points should be jittered to avoid
	    // clipping issues.
	    function lineEnd() {
	      if (segments) {
	        linePoint(x__, y__);
	        if (v__ && v_) bufferStream.rejoin();
	        segments.push(bufferStream.result());
	      }
	      clipStream.point = point;
	      if (v_) activeStream.lineEnd();
	    }

	    function linePoint(x, y) {
	      var v = visible(x, y);
	      if (polygon) ring.push([x, y]);
	      if (first) {
	        x__ = x, y__ = y, v__ = v;
	        first = false;
	        if (v) {
	          activeStream.lineStart();
	          activeStream.point(x, y);
	        }
	      } else {
	        if (v && v_) activeStream.point(x, y);
	        else {
	          var a = [x_ = Math.max(clipMin, Math.min(clipMax, x_)), y_ = Math.max(clipMin, Math.min(clipMax, y_))],
	              b = [x = Math.max(clipMin, Math.min(clipMax, x)), y = Math.max(clipMin, Math.min(clipMax, y))];
	          if (clipLine(a, b, x0, y0, x1, y1)) {
	            if (!v_) {
	              activeStream.lineStart();
	              activeStream.point(a[0], a[1]);
	            }
	            activeStream.point(b[0], b[1]);
	            if (!v) activeStream.lineEnd();
	            clean = false;
	          } else if (v) {
	            activeStream.lineStart();
	            activeStream.point(x, y);
	            clean = false;
	          }
	        }
	      }
	      x_ = x, y_ = y, v_ = v;
	    }

	    return clipStream;
	  };
	}

	var sum$1 = adder();

	function polygonContains(polygon, point) {
	  var lambda = point[0],
	      phi = point[1],
	      normal = [sin(lambda), -cos(lambda), 0],
	      angle = 0,
	      winding = 0;

	  sum$1.reset();

	  for (var i = 0, n = polygon.length; i < n; ++i) {
	    if (!(m = (ring = polygon[i]).length)) continue;
	    var ring,
	        m,
	        point0 = ring[m - 1],
	        lambda0 = point0[0],
	        phi0 = point0[1] / 2 + quarterPi,
	        sinPhi0 = sin(phi0),
	        cosPhi0 = cos(phi0);

	    for (var j = 0; j < m; ++j, lambda0 = lambda1, sinPhi0 = sinPhi1, cosPhi0 = cosPhi1, point0 = point1) {
	      var point1 = ring[j],
	          lambda1 = point1[0],
	          phi1 = point1[1] / 2 + quarterPi,
	          sinPhi1 = sin(phi1),
	          cosPhi1 = cos(phi1),
	          delta = lambda1 - lambda0,
	          sign = delta >= 0 ? 1 : -1,
	          absDelta = sign * delta,
	          antimeridian = absDelta > pi,
	          k = sinPhi0 * sinPhi1;

	      sum$1.add(atan2(k * sign * sin(absDelta), cosPhi0 * cosPhi1 + k * cos(absDelta)));
	      angle += antimeridian ? delta + sign * tau : delta;

	      // Are the longitudes either side of the point’s meridian (lambda),
	      // and are the latitudes smaller than the parallel (phi)?
	      if (antimeridian ^ lambda0 >= lambda ^ lambda1 >= lambda) {
	        var arc = cartesianCross(cartesian(point0), cartesian(point1));
	        cartesianNormalizeInPlace(arc);
	        var intersection = cartesianCross(normal, arc);
	        cartesianNormalizeInPlace(intersection);
	        var phiArc = (antimeridian ^ delta >= 0 ? -1 : 1) * asin(intersection[2]);
	        if (phi > phiArc || phi === phiArc && (arc[0] || arc[1])) {
	          winding += antimeridian ^ delta >= 0 ? 1 : -1;
	        }
	      }
	    }
	  }

	  // First, determine whether the South pole is inside or outside:
	  //
	  // It is inside if:
	  // * the polygon winds around it in a clockwise direction.
	  // * the polygon does not (cumulatively) wind around it, but has a negative
	  //   (counter-clockwise) area.
	  //
	  // Second, count the (signed) number of times a segment crosses a lambda
	  // from the point to the South pole.  If it is zero, then the point is the
	  // same side as the South pole.

	  return (angle < -epsilon || angle < epsilon && sum$1 < -epsilon) ^ (winding & 1);
	}

	var lengthSum = adder();
	var lambda0$2;
	var sinPhi0$1;
	var cosPhi0$1;
	var lengthStream = {
	  sphere: noop,
	  point: noop,
	  lineStart: lengthLineStart,
	  lineEnd: noop,
	  polygonStart: noop,
	  polygonEnd: noop
	};

	function lengthLineStart() {
	  lengthStream.point = lengthPointFirst;
	  lengthStream.lineEnd = lengthLineEnd;
	}

	function lengthLineEnd() {
	  lengthStream.point = lengthStream.lineEnd = noop;
	}

	function lengthPointFirst(lambda, phi) {
	  lambda *= radians, phi *= radians;
	  lambda0$2 = lambda, sinPhi0$1 = sin(phi), cosPhi0$1 = cos(phi);
	  lengthStream.point = lengthPoint;
	}

	function lengthPoint(lambda, phi) {
	  lambda *= radians, phi *= radians;
	  var sinPhi = sin(phi),
	      cosPhi = cos(phi),
	      delta = abs(lambda - lambda0$2),
	      cosDelta = cos(delta),
	      sinDelta = sin(delta),
	      x = cosPhi * sinDelta,
	      y = cosPhi0$1 * sinPhi - sinPhi0$1 * cosPhi * cosDelta,
	      z = sinPhi0$1 * sinPhi + cosPhi0$1 * cosPhi * cosDelta;
	  lengthSum.add(atan2(sqrt(x * x + y * y), z));
	  lambda0$2 = lambda, sinPhi0$1 = sinPhi, cosPhi0$1 = cosPhi;
	}

	function identity$1(x) {
	  return x;
	}

	var areaSum$1 = adder();
	var areaRingSum$1 = adder();
	var x00;
	var y00;
	var x0$1;
	var y0$1;
	var areaStream$1 = {
	  point: noop,
	  lineStart: noop,
	  lineEnd: noop,
	  polygonStart: function() {
	    areaStream$1.lineStart = areaRingStart$1;
	    areaStream$1.lineEnd = areaRingEnd$1;
	  },
	  polygonEnd: function() {
	    areaStream$1.lineStart = areaStream$1.lineEnd = areaStream$1.point = noop;
	    areaSum$1.add(abs(areaRingSum$1));
	    areaRingSum$1.reset();
	  },
	  result: function() {
	    var area = areaSum$1 / 2;
	    areaSum$1.reset();
	    return area;
	  }
	};

	function areaRingStart$1() {
	  areaStream$1.point = areaPointFirst$1;
	}

	function areaPointFirst$1(x, y) {
	  areaStream$1.point = areaPoint$1;
	  x00 = x0$1 = x, y00 = y0$1 = y;
	}

	function areaPoint$1(x, y) {
	  areaRingSum$1.add(y0$1 * x - x0$1 * y);
	  x0$1 = x, y0$1 = y;
	}

	function areaRingEnd$1() {
	  areaPoint$1(x00, y00);
	}

	var x0$2 = Infinity;
	var y0$2 = x0$2;
	var x1 = -x0$2;
	var y1 = x1;
	var boundsStream$1 = {
	  point: boundsPoint$1,
	  lineStart: noop,
	  lineEnd: noop,
	  polygonStart: noop,
	  polygonEnd: noop,
	  result: function() {
	    var bounds = [[x0$2, y0$2], [x1, y1]];
	    x1 = y1 = -(y0$2 = x0$2 = Infinity);
	    return bounds;
	  }
	};

	function boundsPoint$1(x, y) {
	  if (x < x0$2) x0$2 = x;
	  if (x > x1) x1 = x;
	  if (y < y0$2) y0$2 = y;
	  if (y > y1) y1 = y;
	}

	var X0$1 = 0;
	var Y0$1 = 0;
	var Z0$1 = 0;
	var X1$1 = 0;
	var Y1$1 = 0;
	var Z1$1 = 0;
	var X2$1 = 0;
	var Y2$1 = 0;
	var Z2$1 = 0;
	var x00$1;
	var y00$1;
	var x0$3;
	var y0$3;
	var centroidStream$1 = {
	  point: centroidPoint$1,
	  lineStart: centroidLineStart$1,
	  lineEnd: centroidLineEnd$1,
	  polygonStart: function() {
	    centroidStream$1.lineStart = centroidRingStart$1;
	    centroidStream$1.lineEnd = centroidRingEnd$1;
	  },
	  polygonEnd: function() {
	    centroidStream$1.point = centroidPoint$1;
	    centroidStream$1.lineStart = centroidLineStart$1;
	    centroidStream$1.lineEnd = centroidLineEnd$1;
	  },
	  result: function() {
	    var centroid = Z2$1 ? [X2$1 / Z2$1, Y2$1 / Z2$1]
	        : Z1$1 ? [X1$1 / Z1$1, Y1$1 / Z1$1]
	        : Z0$1 ? [X0$1 / Z0$1, Y0$1 / Z0$1]
	        : [NaN, NaN];
	    X0$1 = Y0$1 = Z0$1 =
	    X1$1 = Y1$1 = Z1$1 =
	    X2$1 = Y2$1 = Z2$1 = 0;
	    return centroid;
	  }
	};

	function centroidPoint$1(x, y) {
	  X0$1 += x;
	  Y0$1 += y;
	  ++Z0$1;
	}

	function centroidLineStart$1() {
	  centroidStream$1.point = centroidPointFirstLine;
	}

	function centroidPointFirstLine(x, y) {
	  centroidStream$1.point = centroidPointLine;
	  centroidPoint$1(x0$3 = x, y0$3 = y);
	}

	function centroidPointLine(x, y) {
	  var dx = x - x0$3, dy = y - y0$3, z = sqrt(dx * dx + dy * dy);
	  X1$1 += z * (x0$3 + x) / 2;
	  Y1$1 += z * (y0$3 + y) / 2;
	  Z1$1 += z;
	  centroidPoint$1(x0$3 = x, y0$3 = y);
	}

	function centroidLineEnd$1() {
	  centroidStream$1.point = centroidPoint$1;
	}

	function centroidRingStart$1() {
	  centroidStream$1.point = centroidPointFirstRing;
	}

	function centroidRingEnd$1() {
	  centroidPointRing(x00$1, y00$1);
	}

	function centroidPointFirstRing(x, y) {
	  centroidStream$1.point = centroidPointRing;
	  centroidPoint$1(x00$1 = x0$3 = x, y00$1 = y0$3 = y);
	}

	function centroidPointRing(x, y) {
	  var dx = x - x0$3,
	      dy = y - y0$3,
	      z = sqrt(dx * dx + dy * dy);

	  X1$1 += z * (x0$3 + x) / 2;
	  Y1$1 += z * (y0$3 + y) / 2;
	  Z1$1 += z;

	  z = y0$3 * x - x0$3 * y;
	  X2$1 += z * (x0$3 + x);
	  Y2$1 += z * (y0$3 + y);
	  Z2$1 += z * 3;
	  centroidPoint$1(x0$3 = x, y0$3 = y);
	}

	function PathContext(context) {
	  this._context = context;
	}

	PathContext.prototype = {
	  _radius: 4.5,
	  pointRadius: function(_) {
	    return this._radius = _, this;
	  },
	  polygonStart: function() {
	    this._line = 0;
	  },
	  polygonEnd: function() {
	    this._line = NaN;
	  },
	  lineStart: function() {
	    this._point = 0;
	  },
	  lineEnd: function() {
	    if (this._line === 0) this._context.closePath();
	    this._point = NaN;
	  },
	  point: function(x, y) {
	    switch (this._point) {
	      case 0: {
	        this._context.moveTo(x, y);
	        this._point = 1;
	        break;
	      }
	      case 1: {
	        this._context.lineTo(x, y);
	        break;
	      }
	      default: {
	        this._context.moveTo(x + this._radius, y);
	        this._context.arc(x, y, this._radius, 0, tau);
	        break;
	      }
	    }
	  },
	  result: noop
	};

	var lengthSum$1 = adder();
	var lengthRing;
	var x00$2;
	var y00$2;
	var x0$4;
	var y0$4;
	var lengthStream$1 = {
	  point: noop,
	  lineStart: function() {
	    lengthStream$1.point = lengthPointFirst$1;
	  },
	  lineEnd: function() {
	    if (lengthRing) lengthPoint$1(x00$2, y00$2);
	    lengthStream$1.point = noop;
	  },
	  polygonStart: function() {
	    lengthRing = true;
	  },
	  polygonEnd: function() {
	    lengthRing = null;
	  },
	  result: function() {
	    var length = +lengthSum$1;
	    lengthSum$1.reset();
	    return length;
	  }
	};

	function lengthPointFirst$1(x, y) {
	  lengthStream$1.point = lengthPoint$1;
	  x00$2 = x0$4 = x, y00$2 = y0$4 = y;
	}

	function lengthPoint$1(x, y) {
	  x0$4 -= x, y0$4 -= y;
	  lengthSum$1.add(sqrt(x0$4 * x0$4 + y0$4 * y0$4));
	  x0$4 = x, y0$4 = y;
	}

	function PathString() {
	  this._string = [];
	}

	PathString.prototype = {
	  _circle: circle$1(4.5),
	  pointRadius: function(_) {
	    return this._circle = circle$1(_), this;
	  },
	  polygonStart: function() {
	    this._line = 0;
	  },
	  polygonEnd: function() {
	    this._line = NaN;
	  },
	  lineStart: function() {
	    this._point = 0;
	  },
	  lineEnd: function() {
	    if (this._line === 0) this._string.push("Z");
	    this._point = NaN;
	  },
	  point: function(x, y) {
	    switch (this._point) {
	      case 0: {
	        this._string.push("M", x, ",", y);
	        this._point = 1;
	        break;
	      }
	      case 1: {
	        this._string.push("L", x, ",", y);
	        break;
	      }
	      default: {
	        this._string.push("M", x, ",", y, this._circle);
	        break;
	      }
	    }
	  },
	  result: function() {
	    if (this._string.length) {
	      var result = this._string.join("");
	      this._string = [];
	      return result;
	    }
	  }
	};

	function circle$1(radius) {
	  return "m0," + radius
	      + "a" + radius + "," + radius + " 0 1,1 0," + -2 * radius
	      + "a" + radius + "," + radius + " 0 1,1 0," + 2 * radius
	      + "z";
	}

	function geoPath(projection, context) {
	  var pointRadius = 4.5,
	      projectionStream,
	      contextStream;

	  function path(object) {
	    if (object) {
	      if (typeof pointRadius === "function") contextStream.pointRadius(+pointRadius.apply(this, arguments));
	      geoStream(object, projectionStream(contextStream));
	    }
	    return contextStream.result();
	  }

	  path.area = function(object) {
	    geoStream(object, projectionStream(areaStream$1));
	    return areaStream$1.result();
	  };

	  path.measure = function(object) {
	    geoStream(object, projectionStream(lengthStream$1));
	    return lengthStream$1.result();
	  };

	  path.bounds = function(object) {
	    geoStream(object, projectionStream(boundsStream$1));
	    return boundsStream$1.result();
	  };

	  path.centroid = function(object) {
	    geoStream(object, projectionStream(centroidStream$1));
	    return centroidStream$1.result();
	  };

	  path.projection = function(_) {
	    return arguments.length ? (projectionStream = _ == null ? (projection = null, identity$1) : (projection = _).stream, path) : projection;
	  };

	  path.context = function(_) {
	    if (!arguments.length) return context;
	    contextStream = _ == null ? (context = null, new PathString) : new PathContext(context = _);
	    if (typeof pointRadius !== "function") contextStream.pointRadius(pointRadius);
	    return path;
	  };

	  path.pointRadius = function(_) {
	    if (!arguments.length) return pointRadius;
	    pointRadius = typeof _ === "function" ? _ : (contextStream.pointRadius(+_), +_);
	    return path;
	  };

	  return path.projection(projection).context(context);
	}

	function clip(pointVisible, clipLine, interpolate, start) {
	  return function(rotate, sink) {
	    var line = clipLine(sink),
	        rotatedStart = rotate.invert(start[0], start[1]),
	        ringBuffer = clipBuffer(),
	        ringSink = clipLine(ringBuffer),
	        polygonStarted = false,
	        polygon,
	        segments,
	        ring;

	    var clip = {
	      point: point,
	      lineStart: lineStart,
	      lineEnd: lineEnd,
	      polygonStart: function() {
	        clip.point = pointRing;
	        clip.lineStart = ringStart;
	        clip.lineEnd = ringEnd;
	        segments = [];
	        polygon = [];
	      },
	      polygonEnd: function() {
	        clip.point = point;
	        clip.lineStart = lineStart;
	        clip.lineEnd = lineEnd;
	        segments = merge(segments);
	        var startInside = polygonContains(polygon, rotatedStart);
	        if (segments.length) {
	          if (!polygonStarted) sink.polygonStart(), polygonStarted = true;
	          clipPolygon(segments, compareIntersection, startInside, interpolate, sink);
	        } else if (startInside) {
	          if (!polygonStarted) sink.polygonStart(), polygonStarted = true;
	          sink.lineStart();
	          interpolate(null, null, 1, sink);
	          sink.lineEnd();
	        }
	        if (polygonStarted) sink.polygonEnd(), polygonStarted = false;
	        segments = polygon = null;
	      },
	      sphere: function() {
	        sink.polygonStart();
	        sink.lineStart();
	        interpolate(null, null, 1, sink);
	        sink.lineEnd();
	        sink.polygonEnd();
	      }
	    };

	    function point(lambda, phi) {
	      var point = rotate(lambda, phi);
	      if (pointVisible(lambda = point[0], phi = point[1])) sink.point(lambda, phi);
	    }

	    function pointLine(lambda, phi) {
	      var point = rotate(lambda, phi);
	      line.point(point[0], point[1]);
	    }

	    function lineStart() {
	      clip.point = pointLine;
	      line.lineStart();
	    }

	    function lineEnd() {
	      clip.point = point;
	      line.lineEnd();
	    }

	    function pointRing(lambda, phi) {
	      ring.push([lambda, phi]);
	      var point = rotate(lambda, phi);
	      ringSink.point(point[0], point[1]);
	    }

	    function ringStart() {
	      ringSink.lineStart();
	      ring = [];
	    }

	    function ringEnd() {
	      pointRing(ring[0][0], ring[0][1]);
	      ringSink.lineEnd();

	      var clean = ringSink.clean(),
	          ringSegments = ringBuffer.result(),
	          i, n = ringSegments.length, m,
	          segment,
	          point;

	      ring.pop();
	      polygon.push(ring);
	      ring = null;

	      if (!n) return;

	      // No intersections.
	      if (clean & 1) {
	        segment = ringSegments[0];
	        if ((m = segment.length - 1) > 0) {
	          if (!polygonStarted) sink.polygonStart(), polygonStarted = true;
	          sink.lineStart();
	          for (i = 0; i < m; ++i) sink.point((point = segment[i])[0], point[1]);
	          sink.lineEnd();
	        }
	        return;
	      }

	      // Rejoin connected segments.
	      // TODO reuse ringBuffer.rejoin()?
	      if (n > 1 && clean & 2) ringSegments.push(ringSegments.pop().concat(ringSegments.shift()));

	      segments.push(ringSegments.filter(validSegment));
	    }

	    return clip;
	  };
	}

	function validSegment(segment) {
	  return segment.length > 1;
	}

	// Intersections are sorted along the clip edge. For both antimeridian cutting
	// and circle clipping, the same comparison is used.
	function compareIntersection(a, b) {
	  return ((a = a.x)[0] < 0 ? a[1] - halfPi - epsilon : halfPi - a[1])
	       - ((b = b.x)[0] < 0 ? b[1] - halfPi - epsilon : halfPi - b[1]);
	}

	var clipAntimeridian = clip(
	  function() { return true; },
	  clipAntimeridianLine,
	  clipAntimeridianInterpolate,
	  [-pi, -halfPi]
	);

	// Takes a line and cuts into visible segments. Return values: 0 - there were
	// intersections or the line was empty; 1 - no intersections; 2 - there were
	// intersections, and the first and last segments should be rejoined.
	function clipAntimeridianLine(stream) {
	  var lambda0 = NaN,
	      phi0 = NaN,
	      sign0 = NaN,
	      clean; // no intersections

	  return {
	    lineStart: function() {
	      stream.lineStart();
	      clean = 1;
	    },
	    point: function(lambda1, phi1) {
	      var sign1 = lambda1 > 0 ? pi : -pi,
	          delta = abs(lambda1 - lambda0);
	      if (abs(delta - pi) < epsilon) { // line crosses a pole
	        stream.point(lambda0, phi0 = (phi0 + phi1) / 2 > 0 ? halfPi : -halfPi);
	        stream.point(sign0, phi0);
	        stream.lineEnd();
	        stream.lineStart();
	        stream.point(sign1, phi0);
	        stream.point(lambda1, phi0);
	        clean = 0;
	      } else if (sign0 !== sign1 && delta >= pi) { // line crosses antimeridian
	        if (abs(lambda0 - sign0) < epsilon) lambda0 -= sign0 * epsilon; // handle degeneracies
	        if (abs(lambda1 - sign1) < epsilon) lambda1 -= sign1 * epsilon;
	        phi0 = clipAntimeridianIntersect(lambda0, phi0, lambda1, phi1);
	        stream.point(sign0, phi0);
	        stream.lineEnd();
	        stream.lineStart();
	        stream.point(sign1, phi0);
	        clean = 0;
	      }
	      stream.point(lambda0 = lambda1, phi0 = phi1);
	      sign0 = sign1;
	    },
	    lineEnd: function() {
	      stream.lineEnd();
	      lambda0 = phi0 = NaN;
	    },
	    clean: function() {
	      return 2 - clean; // if intersections, rejoin first and last segments
	    }
	  };
	}

	function clipAntimeridianIntersect(lambda0, phi0, lambda1, phi1) {
	  var cosPhi0,
	      cosPhi1,
	      sinLambda0Lambda1 = sin(lambda0 - lambda1);
	  return abs(sinLambda0Lambda1) > epsilon
	      ? atan((sin(phi0) * (cosPhi1 = cos(phi1)) * sin(lambda1)
	          - sin(phi1) * (cosPhi0 = cos(phi0)) * sin(lambda0))
	          / (cosPhi0 * cosPhi1 * sinLambda0Lambda1))
	      : (phi0 + phi1) / 2;
	}

	function clipAntimeridianInterpolate(from, to, direction, stream) {
	  var phi;
	  if (from == null) {
	    phi = direction * halfPi;
	    stream.point(-pi, phi);
	    stream.point(0, phi);
	    stream.point(pi, phi);
	    stream.point(pi, 0);
	    stream.point(pi, -phi);
	    stream.point(0, -phi);
	    stream.point(-pi, -phi);
	    stream.point(-pi, 0);
	    stream.point(-pi, phi);
	  } else if (abs(from[0] - to[0]) > epsilon) {
	    var lambda = from[0] < to[0] ? pi : -pi;
	    phi = direction * lambda / 2;
	    stream.point(-lambda, phi);
	    stream.point(0, phi);
	    stream.point(lambda, phi);
	  } else {
	    stream.point(to[0], to[1]);
	  }
	}

	function clipCircle(radius, delta) {
	  var cr = cos(radius),
	      smallRadius = cr > 0,
	      notHemisphere = abs(cr) > epsilon; // TODO optimise for this common case

	  function interpolate(from, to, direction, stream) {
	    circleStream(stream, radius, delta, direction, from, to);
	  }

	  function visible(lambda, phi) {
	    return cos(lambda) * cos(phi) > cr;
	  }

	  // Takes a line and cuts into visible segments. Return values used for polygon
	  // clipping: 0 - there were intersections or the line was empty; 1 - no
	  // intersections 2 - there were intersections, and the first and last segments
	  // should be rejoined.
	  function clipLine(stream) {
	    var point0, // previous point
	        c0, // code for previous point
	        v0, // visibility of previous point
	        v00, // visibility of first point
	        clean; // no intersections
	    return {
	      lineStart: function() {
	        v00 = v0 = false;
	        clean = 1;
	      },
	      point: function(lambda, phi) {
	        var point1 = [lambda, phi],
	            point2,
	            v = visible(lambda, phi),
	            c = smallRadius
	              ? v ? 0 : code(lambda, phi)
	              : v ? code(lambda + (lambda < 0 ? pi : -pi), phi) : 0;
	        if (!point0 && (v00 = v0 = v)) stream.lineStart();
	        // Handle degeneracies.
	        // TODO ignore if not clipping polygons.
	        if (v !== v0) {
	          point2 = intersect(point0, point1);
	          if (pointEqual(point0, point2) || pointEqual(point1, point2)) {
	            point1[0] += epsilon;
	            point1[1] += epsilon;
	            v = visible(point1[0], point1[1]);
	          }
	        }
	        if (v !== v0) {
	          clean = 0;
	          if (v) {
	            // outside going in
	            stream.lineStart();
	            point2 = intersect(point1, point0);
	            stream.point(point2[0], point2[1]);
	          } else {
	            // inside going out
	            point2 = intersect(point0, point1);
	            stream.point(point2[0], point2[1]);
	            stream.lineEnd();
	          }
	          point0 = point2;
	        } else if (notHemisphere && point0 && smallRadius ^ v) {
	          var t;
	          // If the codes for two points are different, or are both zero,
	          // and there this segment intersects with the small circle.
	          if (!(c & c0) && (t = intersect(point1, point0, true))) {
	            clean = 0;
	            if (smallRadius) {
	              stream.lineStart();
	              stream.point(t[0][0], t[0][1]);
	              stream.point(t[1][0], t[1][1]);
	              stream.lineEnd();
	            } else {
	              stream.point(t[1][0], t[1][1]);
	              stream.lineEnd();
	              stream.lineStart();
	              stream.point(t[0][0], t[0][1]);
	            }
	          }
	        }
	        if (v && (!point0 || !pointEqual(point0, point1))) {
	          stream.point(point1[0], point1[1]);
	        }
	        point0 = point1, v0 = v, c0 = c;
	      },
	      lineEnd: function() {
	        if (v0) stream.lineEnd();
	        point0 = null;
	      },
	      // Rejoin first and last segments if there were intersections and the first
	      // and last points were visible.
	      clean: function() {
	        return clean | ((v00 && v0) << 1);
	      }
	    };
	  }

	  // Intersects the great circle between a and b with the clip circle.
	  function intersect(a, b, two) {
	    var pa = cartesian(a),
	        pb = cartesian(b);

	    // We have two planes, n1.p = d1 and n2.p = d2.
	    // Find intersection line p(t) = c1 n1 + c2 n2 + t (n1 ⨯ n2).
	    var n1 = [1, 0, 0], // normal
	        n2 = cartesianCross(pa, pb),
	        n2n2 = cartesianDot(n2, n2),
	        n1n2 = n2[0], // cartesianDot(n1, n2),
	        determinant = n2n2 - n1n2 * n1n2;

	    // Two polar points.
	    if (!determinant) return !two && a;

	    var c1 =  cr * n2n2 / determinant,
	        c2 = -cr * n1n2 / determinant,
	        n1xn2 = cartesianCross(n1, n2),
	        A = cartesianScale(n1, c1),
	        B = cartesianScale(n2, c2);
	    cartesianAddInPlace(A, B);

	    // Solve |p(t)|^2 = 1.
	    var u = n1xn2,
	        w = cartesianDot(A, u),
	        uu = cartesianDot(u, u),
	        t2 = w * w - uu * (cartesianDot(A, A) - 1);

	    if (t2 < 0) return;

	    var t = sqrt(t2),
	        q = cartesianScale(u, (-w - t) / uu);
	    cartesianAddInPlace(q, A);
	    q = spherical(q);

	    if (!two) return q;

	    // Two intersection points.
	    var lambda0 = a[0],
	        lambda1 = b[0],
	        phi0 = a[1],
	        phi1 = b[1],
	        z;

	    if (lambda1 < lambda0) z = lambda0, lambda0 = lambda1, lambda1 = z;

	    var delta = lambda1 - lambda0,
	        polar = abs(delta - pi) < epsilon,
	        meridian = polar || delta < epsilon;

	    if (!polar && phi1 < phi0) z = phi0, phi0 = phi1, phi1 = z;

	    // Check that the first point is between a and b.
	    if (meridian
	        ? polar
	          ? phi0 + phi1 > 0 ^ q[1] < (abs(q[0] - lambda0) < epsilon ? phi0 : phi1)
	          : phi0 <= q[1] && q[1] <= phi1
	        : delta > pi ^ (lambda0 <= q[0] && q[0] <= lambda1)) {
	      var q1 = cartesianScale(u, (-w + t) / uu);
	      cartesianAddInPlace(q1, A);
	      return [q, spherical(q1)];
	    }
	  }

	  // Generates a 4-bit vector representing the location of a point relative to
	  // the small circle's bounding box.
	  function code(lambda, phi) {
	    var r = smallRadius ? radius : pi - radius,
	        code = 0;
	    if (lambda < -r) code |= 1; // left
	    else if (lambda > r) code |= 2; // right
	    if (phi < -r) code |= 4; // below
	    else if (phi > r) code |= 8; // above
	    return code;
	  }

	  return clip(visible, clipLine, interpolate, smallRadius ? [0, -radius] : [-pi, radius - pi]);
	}

	function transformer(methods) {
	  return function(stream) {
	    var s = new TransformStream;
	    for (var key in methods) s[key] = methods[key];
	    s.stream = stream;
	    return s;
	  };
	}

	function TransformStream() {}

	TransformStream.prototype = {
	  constructor: TransformStream,
	  point: function(x, y) { this.stream.point(x, y); },
	  sphere: function() { this.stream.sphere(); },
	  lineStart: function() { this.stream.lineStart(); },
	  lineEnd: function() { this.stream.lineEnd(); },
	  polygonStart: function() { this.stream.polygonStart(); },
	  polygonEnd: function() { this.stream.polygonEnd(); }
	};

	function fitExtent(projection, extent, object) {
	  var w = extent[1][0] - extent[0][0],
	      h = extent[1][1] - extent[0][1],
	      clip = projection.clipExtent && projection.clipExtent();

	  projection
	      .scale(150)
	      .translate([0, 0]);

	  if (clip != null) projection.clipExtent(null);

	  geoStream(object, projection.stream(boundsStream$1));

	  var b = boundsStream$1.result(),
	      k = Math.min(w / (b[1][0] - b[0][0]), h / (b[1][1] - b[0][1])),
	      x = +extent[0][0] + (w - k * (b[1][0] + b[0][0])) / 2,
	      y = +extent[0][1] + (h - k * (b[1][1] + b[0][1])) / 2;

	  if (clip != null) projection.clipExtent(clip);

	  return projection
	      .scale(k * 150)
	      .translate([x, y]);
	}

	function fitSize(projection, size, object) {
	  return fitExtent(projection, [[0, 0], size], object);
	}

	var maxDepth = 16;
	var cosMinDistance = cos(30 * radians);
	// cos(minimum angular distance)

	function resample(project, delta2) {
	  return +delta2 ? resample$1(project, delta2) : resampleNone(project);
	}

	function resampleNone(project) {
	  return transformer({
	    point: function(x, y) {
	      x = project(x, y);
	      this.stream.point(x[0], x[1]);
	    }
	  });
	}

	function resample$1(project, delta2) {

	  function resampleLineTo(x0, y0, lambda0, a0, b0, c0, x1, y1, lambda1, a1, b1, c1, depth, stream) {
	    var dx = x1 - x0,
	        dy = y1 - y0,
	        d2 = dx * dx + dy * dy;
	    if (d2 > 4 * delta2 && depth--) {
	      var a = a0 + a1,
	          b = b0 + b1,
	          c = c0 + c1,
	          m = sqrt(a * a + b * b + c * c),
	          phi2 = asin(c /= m),
	          lambda2 = abs(abs(c) - 1) < epsilon || abs(lambda0 - lambda1) < epsilon ? (lambda0 + lambda1) / 2 : atan2(b, a),
	          p = project(lambda2, phi2),
	          x2 = p[0],
	          y2 = p[1],
	          dx2 = x2 - x0,
	          dy2 = y2 - y0,
	          dz = dy * dx2 - dx * dy2;
	      if (dz * dz / d2 > delta2 // perpendicular projected distance
	          || abs((dx * dx2 + dy * dy2) / d2 - 0.5) > 0.3 // midpoint close to an end
	          || a0 * a1 + b0 * b1 + c0 * c1 < cosMinDistance) { // angular distance
	        resampleLineTo(x0, y0, lambda0, a0, b0, c0, x2, y2, lambda2, a /= m, b /= m, c, depth, stream);
	        stream.point(x2, y2);
	        resampleLineTo(x2, y2, lambda2, a, b, c, x1, y1, lambda1, a1, b1, c1, depth, stream);
	      }
	    }
	  }
	  return function(stream) {
	    var lambda00, x00, y00, a00, b00, c00, // first point
	        lambda0, x0, y0, a0, b0, c0; // previous point

	    var resampleStream = {
	      point: point,
	      lineStart: lineStart,
	      lineEnd: lineEnd,
	      polygonStart: function() { stream.polygonStart(); resampleStream.lineStart = ringStart; },
	      polygonEnd: function() { stream.polygonEnd(); resampleStream.lineStart = lineStart; }
	    };

	    function point(x, y) {
	      x = project(x, y);
	      stream.point(x[0], x[1]);
	    }

	    function lineStart() {
	      x0 = NaN;
	      resampleStream.point = linePoint;
	      stream.lineStart();
	    }

	    function linePoint(lambda, phi) {
	      var c = cartesian([lambda, phi]), p = project(lambda, phi);
	      resampleLineTo(x0, y0, lambda0, a0, b0, c0, x0 = p[0], y0 = p[1], lambda0 = lambda, a0 = c[0], b0 = c[1], c0 = c[2], maxDepth, stream);
	      stream.point(x0, y0);
	    }

	    function lineEnd() {
	      resampleStream.point = point;
	      stream.lineEnd();
	    }

	    function ringStart() {
	      lineStart();
	      resampleStream.point = ringPoint;
	      resampleStream.lineEnd = ringEnd;
	    }

	    function ringPoint(lambda, phi) {
	      linePoint(lambda00 = lambda, phi), x00 = x0, y00 = y0, a00 = a0, b00 = b0, c00 = c0;
	      resampleStream.point = linePoint;
	    }

	    function ringEnd() {
	      resampleLineTo(x0, y0, lambda0, a0, b0, c0, x00, y00, lambda00, a00, b00, c00, maxDepth, stream);
	      resampleStream.lineEnd = lineEnd;
	      lineEnd();
	    }

	    return resampleStream;
	  };
	}

	var transformRadians = transformer({
	  point: function(x, y) {
	    this.stream.point(x * radians, y * radians);
	  }
	});

	function projectionMutator(projectAt) {
	  var project,
	      k = 150, // scale
	      x = 480, y = 250, // translate
	      dx, dy, lambda = 0, phi = 0, // center
	      deltaLambda = 0, deltaPhi = 0, deltaGamma = 0, rotate, projectRotate, // rotate
	      theta = null, preclip = clipAntimeridian, // clip angle
	      x0 = null, y0, x1, y1, postclip = identity$1, // clip extent
	      delta2 = 0.5, projectResample = resample(projectTransform, delta2), // precision
	      cache,
	      cacheStream;

	  function projection(point) {
	    point = projectRotate(point[0] * radians, point[1] * radians);
	    return [point[0] * k + dx, dy - point[1] * k];
	  }

	  function invert(point) {
	    point = projectRotate.invert((point[0] - dx) / k, (dy - point[1]) / k);
	    return point && [point[0] * degrees, point[1] * degrees];
	  }

	  function projectTransform(x, y) {
	    return x = project(x, y), [x[0] * k + dx, dy - x[1] * k];
	  }

	  projection.stream = function(stream) {
	    return cache && cacheStream === stream ? cache : cache = transformRadians(preclip(rotate, projectResample(postclip(cacheStream = stream))));
	  };

	  projection.clipAngle = function(_) {
	    return arguments.length ? (preclip = +_ ? clipCircle(theta = _ * radians, 6 * radians) : (theta = null, clipAntimeridian), reset()) : theta * degrees;
	  };

	  projection.clipExtent = function(_) {
	    return arguments.length ? (postclip = _ == null ? (x0 = y0 = x1 = y1 = null, identity$1) : clipExtent(x0 = +_[0][0], y0 = +_[0][1], x1 = +_[1][0], y1 = +_[1][1]), reset()) : x0 == null ? null : [[x0, y0], [x1, y1]];
	  };

	  projection.scale = function(_) {
	    return arguments.length ? (k = +_, recenter()) : k;
	  };

	  projection.translate = function(_) {
	    return arguments.length ? (x = +_[0], y = +_[1], recenter()) : [x, y];
	  };

	  projection.center = function(_) {
	    return arguments.length ? (lambda = _[0] % 360 * radians, phi = _[1] % 360 * radians, recenter()) : [lambda * degrees, phi * degrees];
	  };

	  projection.rotate = function(_) {
	    return arguments.length ? (deltaLambda = _[0] % 360 * radians, deltaPhi = _[1] % 360 * radians, deltaGamma = _.length > 2 ? _[2] % 360 * radians : 0, recenter()) : [deltaLambda * degrees, deltaPhi * degrees, deltaGamma * degrees];
	  };

	  projection.precision = function(_) {
	    return arguments.length ? (projectResample = resample(projectTransform, delta2 = _ * _), reset()) : sqrt(delta2);
	  };

	  projection.fitExtent = function(extent, object) {
	    return fitExtent(projection, extent, object);
	  };

	  projection.fitSize = function(size, object) {
	    return fitSize(projection, size, object);
	  };

	  function recenter() {
	    projectRotate = compose(rotate = rotateRadians(deltaLambda, deltaPhi, deltaGamma), project);
	    var center = project(lambda, phi);
	    dx = x - center[0] * k;
	    dy = y + center[1] * k;
	    return reset();
	  }

	  function reset() {
	    cache = cacheStream = null;
	    return projection;
	  }

	  return function() {
	    project = projectAt.apply(this, arguments);
	    projection.invert = project.invert && invert;
	    return recenter();
	  };
	}

	function conicProjection(projectAt) {
	  var phi0 = 0,
	      phi1 = pi / 3,
	      m = projectionMutator(projectAt),
	      p = m(phi0, phi1);

	  p.parallels = function(_) {
	    return arguments.length ? m(phi0 = _[0] * radians, phi1 = _[1] * radians) : [phi0 * degrees, phi1 * degrees];
	  };

	  return p;
	}

	function cylindricalEqualAreaRaw(phi0) {
	  var cosPhi0 = cos(phi0);

	  function forward(lambda, phi) {
	    return [lambda * cosPhi0, sin(phi) / cosPhi0];
	  }

	  forward.invert = function(x, y) {
	    return [x / cosPhi0, asin(y * cosPhi0)];
	  };

	  return forward;
	}

	function conicEqualAreaRaw(y0, y1) {
	  var sy0 = sin(y0), n = (sy0 + sin(y1)) / 2;

	  // Are the parallels symmetrical around the Equator?
	  if (abs(n) < epsilon) return cylindricalEqualAreaRaw(y0);

	  var c = 1 + sy0 * (2 * n - sy0), r0 = sqrt(c) / n;

	  function project(x, y) {
	    var r = sqrt(c - 2 * n * sin(y)) / n;
	    return [r * sin(x *= n), r0 - r * cos(x)];
	  }

	  project.invert = function(x, y) {
	    var r0y = r0 - y;
	    return [atan2(x, abs(r0y)) / n * sign(r0y), asin((c - (x * x + r0y * r0y) * n * n) / (2 * n))];
	  };

	  return project;
	}

	function conicEqualArea() {
	  return conicProjection(conicEqualAreaRaw)
	      .scale(155.424)
	      .center([0, 33.6442]);
	}

	function albers() {
	  return conicEqualArea()
	      .parallels([29.5, 45.5])
	      .scale(1070)
	      .translate([480, 250])
	      .rotate([96, 0])
	      .center([-0.6, 38.7]);
	}

	function identity$3(x) {
	  return x;
	}

	function transform$1(transform) {
	  if (transform == null) return identity$3;
	  var x0,
	      y0,
	      kx = transform.scale[0],
	      ky = transform.scale[1],
	      dx = transform.translate[0],
	      dy = transform.translate[1];
	  return function(input, i) {
	    if (!i) x0 = y0 = 0;
	    var j = 2, n = input.length, output = new Array(n);
	    output[0] = (x0 += input[0]) * kx + dx;
	    output[1] = (y0 += input[1]) * ky + dy;
	    while (j < n) output[j] = input[j], ++j;
	    return output;
	  };
	}

	function reverse(array, n) {
	  var t, j = array.length, i = j - n;
	  while (i < --j) t = array[i], array[i++] = array[j], array[j] = t;
	}

	function topoFeature(topology, o) {
	  return o.type === "GeometryCollection"
	      ? {type: "FeatureCollection", features: o.geometries.map(function(o) { return feature(topology, o); })}
	      : feature(topology, o);
	}

	function feature(topology, o) {
	  var id = o.id,
	      bbox = o.bbox,
	      properties = o.properties == null ? {} : o.properties,
	      geometry = object$1(topology, o);
	  return id == null && bbox == null ? {type: "Feature", properties: properties, geometry: geometry}
	      : bbox == null ? {type: "Feature", id: id, properties: properties, geometry: geometry}
	      : {type: "Feature", id: id, bbox: bbox, properties: properties, geometry: geometry};
	}

	function object$1(topology, o) {
	  var transformPoint = transform$1(topology.transform),
	      arcs = topology.arcs;

	  function arc(i, points) {
	    if (points.length) points.pop();
	    for (var a = arcs[i < 0 ? ~i : i], k = 0, n = a.length; k < n; ++k) {
	      points.push(transformPoint(a[k], k));
	    }
	    if (i < 0) reverse(points, n);
	  }

	  function point(p) {
	    return transformPoint(p);
	  }

	  function line(arcs) {
	    var points = [];
	    for (var i = 0, n = arcs.length; i < n; ++i) arc(arcs[i], points);
	    if (points.length < 2) points.push(points[0]); // This should never happen per the specification.
	    return points;
	  }

	  function ring(arcs) {
	    var points = line(arcs);
	    while (points.length < 4) points.push(points[0]); // This may happen if an arc has only two points.
	    return points;
	  }

	  function polygon(arcs) {
	    return arcs.map(ring);
	  }

	  function geometry(o) {
	    var type = o.type, coordinates;
	    switch (type) {
	      case "GeometryCollection": return {type: type, geometries: o.geometries.map(geometry)};
	      case "Point": coordinates = point(o.coordinates); break;
	      case "MultiPoint": coordinates = o.coordinates.map(point); break;
	      case "LineString": coordinates = line(o.arcs); break;
	      case "MultiLineString": coordinates = o.arcs.map(line); break;
	      case "Polygon": coordinates = polygon(o.arcs); break;
	      case "MultiPolygon": coordinates = o.arcs.map(polygon); break;
	      default: return null;
	    }
	    return {type: type, coordinates: coordinates};
	  }

	  return geometry(o);
	}

	var commonjsGlobal = typeof window !== 'undefined' ? window : typeof __webpack_require__.g !== 'undefined' ? __webpack_require__.g : typeof self !== 'undefined' ? self : {};

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var index = createCommonjsModule(function (module, exports) {
	;(function (name, root, factory) {
	  if (true) {
	    module.exports = factory()
	  }
	  else {}
	}('dcopy', commonjsGlobal, function () {
	  /**
	   * Deep copy objects and arrays
	   *
	   * @param {Object/Array} target
	   * @return {Object/Array} copy
	   * @api public
	   */

	  return function (target) {
	    var copy = (target instanceof Array) ? [] : {}
	    ;(function read (target, copy) {
	      for (var key in target) {
	        var obj = target[key]
	        if (obj instanceof Array) {
	          var value = []
	          var last = add(copy, key, value)
	          read(obj, last)
	        }
	        else if (obj instanceof Object && typeof obj !== 'function') {
	          var value = {}
	          var last = add(copy, key, value)
	          read(obj, last)
	        }
	        else {
	          var value = obj
	          add(copy, key, value)
	        }
	      }
	    }(target, copy))
	    return copy
	  }

	  /**
	   * Adds a value to the copy object based on its type
	   *
	   * @api private
	   */

	  function add (copy, key, value) {
	    if (copy instanceof Array) {
	      copy.push(value)
	      return copy[copy.length - 1]
	    }
	    else if (copy instanceof Object) {
	      copy[key] = value
	      return copy[key]
	    }
	  }
	}))
	});

	function cartogram() {
	    /*
	     * d3.cartogram is a d3-friendly implementation of An Algorithm to Construct
	     * Continuous Area Cartograms:
	     *
	     * <http://lambert.nico.free.fr/tp/biblio/Dougeniketal1985.pdf>
	     *
	     * It requires topojson to decode TopoJSON-encoded topologies:
	     *
	     * <http://github.com/mbostock/topojson/>
	     *
	     * Usage:
	     * var proj = d3.geo.albersUsa(),
	     *     path = d3.geoPath()
	     *        .projection(proj);
	     * d3.geoPath()
	     *        .projection(proj);
	     * var cartogram = d3.cartogram()
	     *  .projection(proj)
	     *  .value(function(d) {
	     *    return Math.random() * 100;
	     *  });
	     * d3.json("path/to/topology.json", function(topology) {
	     *  var features = cartogram.features(topology, topology.objects.OBJECTNAME.geometries);
	     *  d3.select("svg").selectAll("path")
	     *    .data(features)
	     *    .enter()
	     *    .append("path")
	     *      .attr("d", path);
	     * });
	     */

	   var iterations = 8,
	        projection = albers(),
	        properties = function(id) {
	            return {};
	        },
	        value = function(d) {
	            return 1;
	        };

	  function cartogram(topology, geometries) {

	    // copy it first
	    topology = copy(topology);

	    // objects are projected into screen coordinates

	    // project the arcs into screen space
	    var tf = transformer(topology.transform),x,y,len1,i1,out1,len2=topology.arcs.length,i2=0,
	        projectedArcs = new Array(len2);
	        while(i2<len2){
	          x = 0;
	          y = 0;
	          len1 = topology.arcs[i2].length;
	          i1 = 0;
	          out1 = new Array(len1);
	          while(i1<len1){
	            topology.arcs[i2][i1][0] = (x += topology.arcs[i2][i1][0]);
	            topology.arcs[i2][i1][1] = (y += topology.arcs[i2][i1][1]);
	            out1[i1] = projection === null ? tf(topology.arcs[i2][i1]) : projection(tf(topology.arcs[i2][i1]));
	            i1++;
	          }
	          projectedArcs[i2++]=out1;
	          
	        }

	    // path with identity projection
	    var path = geoPath()
	      .projection(null);

	    var objects = object(projectedArcs, {type: "GeometryCollection", geometries: geometries})
	        .geometries.map(function(geom) {
	          return {
	            type: "Feature",
	            id: geom.id,
	            properties: properties.call(null, geom, topology),
	            geometry: geom
	          };
	        });

	    var values = objects.map(value),
	        totalValue = sum(values);

	    // no iterations; just return the features
	    if (iterations <= 0) {
	      return objects;
	    }

	    var i = 0;
	    while (i++ < iterations) {
	      var areas = objects.map(path.area);
	          var totalArea = sum(areas),
	          sizeErrorsTot =0,
	          sizeErrorsNum=0,
	          meta = objects.map(function(o, j) {
	            var area = Math.abs(areas[j]), // XXX: why do we have negative areas?
	                v = +values[j],
	                desired = totalArea * v / totalValue,
	                radius = Math.sqrt(area / Math.PI),
	                mass = Math.sqrt(desired / Math.PI) - radius,
	                sizeError = Math.max(area, desired) / Math.min(area, desired);
	            sizeErrorsTot+=sizeError;
	            sizeErrorsNum++;
	            // console.log(o.id, "@", j, "area:", area, "value:", v, "->", desired, radius, mass, sizeError);
	            return {
	              id:         o.id,
	              area:       area,
	              centroid:   path.centroid(o),
	              value:      v,
	              desired:    desired,
	              radius:     radius,
	              mass:       mass,
	              sizeError:  sizeError
	            };
	          });

	      var sizeError = sizeErrorsTot/sizeErrorsNum,
	          forceReductionFactor = 1 / (1 + sizeError);

	      // console.log("meta:", meta);
	      // console.log("  total area:", totalArea);
	      // console.log("  force reduction factor:", forceReductionFactor, "mean error:", sizeError);

	      var len1,i1,delta,len2=projectedArcs.length,i2=0,delta,len3,i3,centroid,mass,radius,rSquared,dx,dy,distSquared,dist,Fij;
	      while(i2<len2){
	          len1=projectedArcs[i2].length;
	          i1=0;
	          while(i1<len1){
	            // create an array of vectors: [x, y]
	            delta = [0,0];
	            len3 = meta.length;
	            i3=0;
	            while(i3<len3) {
	              centroid =  meta[i3].centroid;
	              mass =      meta[i3].mass;
	              radius =    meta[i3].radius;
	              rSquared = (radius*radius);
	              dx = projectedArcs[i2][i1][0] - centroid[0];
	              dy = projectedArcs[i2][i1][1] - centroid[1];
	              distSquared = dx * dx + dy * dy;
	              dist=Math.sqrt(distSquared);
	              Fij = (dist > radius)
	                ? mass * radius / dist
	                : mass *
	                  (distSquared / rSquared) *
	                  (4 - 3 * dist / radius);
	              delta[0]+=(Fij * cosArctan(dy,dx));
	              delta[1]+=(Fij * sinArctan(dy,dx));
	              i3++;
	            }
	          projectedArcs[i2][i1][0] += (delta[0]*forceReductionFactor);
	          projectedArcs[i2][i1][1] += (delta[1]*forceReductionFactor);
	          i1++;
	        }
	        i2++;
	      }

	      // break if we hit the target size error
	      if (sizeError <= 1) break;
	    }

	    return {
	      features: objects,
	      arcs: projectedArcs
	    };
	  }      

	  function cosArctan(dx,dy) {
	    if (dy===0) return 0;
	    var div = dx/dy;
	    return (dy>0)?
	      (1/Math.sqrt(1+(div*div))):
	      (-1/Math.sqrt(1+(div*div)));
	  }

	  function sinArctan(dx,dy){
	    if (dy===0) return 1;
	    var div = dx/dy;
	    return (dy>0)?
	      (div/Math.sqrt(1+(div*div))):
	      (-div/Math.sqrt(1+(div*div)));
	  }

	  function copy(o) {
	    return (o instanceof Array)
	      ? o.map(copy)
	      : (typeof o === "string" || typeof o === "number")
	        ? o
	        : copyObject(o);
	  }
	    
	  function copyObject(o) {
	    var obj = {};
	    for (var k in o) obj[k] = copy(o[k]);
	    return obj;
	  }

	  function object(arcs, o) {
	    function arc(i, points) {
	      if (points.length) points.pop();
	      for (var a = arcs[i < 0 ? ~i : i], k = 0, n = a.length; k < n; ++k) {
	        points.push(a[k]);
	      }
	      if (i < 0) reverse(points, n);
	    }

	    function line(arcs) {
	      var points = [];
	      for (var i = 0, n = arcs.length; i < n; ++i) arc(arcs[i], points);
	      return points;
	    }

	    function polygon(arcs) {
	      return arcs.map(line);
	    }

	    function geometry(o) {
	      o = Object.create(o);
	      o.coordinates = geometryType[o.type](o.arcs);
	      return o;
	    }

	    var geometryType = {
	        LineString: line,
	        MultiLineString: polygon,
	        Polygon: polygon,
	        MultiPolygon: function(arcs) { return arcs.map(polygon); }
	    };

	    return o.type === "GeometryCollection"
	          ? (o = Object.create(o), o.geometries = o.geometries.map(geometry), o)
	          : geometry(o);
	  }

	  function reverse(array, n) {
	      var t, j = array.length, i = j - n; while (i < --j) t = array[i], array[i++] = array[j], array[j] = t;
	  }

	     // for convenience
	  cartogram.path = geoPath()
	        .projection(null);

	  cartogram.iterations = function(i) {
	        if (arguments.length) {
	          iterations = i;
	          return cartogram;
	        } else {
	          return iterations;
	        }
	      };

	  cartogram.value = function(v) {
	        if (arguments.length) {
	          value = typeof v === "function" ? v : constant(v);
	          return cartogram;
	        } else {
	          return value;
	        }
	      };

	  cartogram.projection = function(p) {
	        if (arguments.length) {
	          projection = p;
	          return cartogram;
	        } else {
	          return projection;
	        }
	      };

	  cartogram.feature = function(topology, geom) {
	        return {
	          type: "Feature",
	          id: geom.id,
	          properties: properties.call(null, geom, topology),
	          geometry: {
	            type: geom.type,
	            coordinates: topoFeature(topology, geom).geometry.coordinates
	          }
	        };
	      };

	  cartogram.features = function(topo, geometries) {
	    return geometries.map(function(f) {
	      return cartogram.feature(topo, f);
	    });
	  };

	  cartogram.properties = function(props) {
	    if (arguments.length) {
	      properties = typeof props === "function" ? props : constant(props);
	      return cartogram;
	    } else {
	      return properties;
	    }
	  };

	  function constant(x) {
	    return function() {
	      return x;
	    };
	  };


	  var transformer = cartogram.transformer = function(tf) {
	      var kx = tf.scale[0],
	          ky = tf.scale[1],
	          dx = tf.translate[0],
	          dy = tf.translate[1];

	      function transform(c) {
	        return [c[0] * kx + dx, c[1] * ky + dy];
	      }

	      transform.invert = function(c) {
	        return [(c[0] - dx) / kx, (c[1]- dy) / ky];
	      };

	      return transform;
	    };

	  return cartogram;
	};

	exports.cartogram = cartogram;

	Object.defineProperty(exports, '__esModule', { value: true });

}));

/***/ }),

/***/ "./node_modules/topojson-client/src/bbox.js":
/*!**************************************************!*\
  !*** ./node_modules/topojson-client/src/bbox.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _transform_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./transform.js */ "./node_modules/topojson-client/src/transform.js");


/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(topology) {
  var t = (0,_transform_js__WEBPACK_IMPORTED_MODULE_0__["default"])(topology.transform), key,
      x0 = Infinity, y0 = x0, x1 = -x0, y1 = -x0;

  function bboxPoint(p) {
    p = t(p);
    if (p[0] < x0) x0 = p[0];
    if (p[0] > x1) x1 = p[0];
    if (p[1] < y0) y0 = p[1];
    if (p[1] > y1) y1 = p[1];
  }

  function bboxGeometry(o) {
    switch (o.type) {
      case "GeometryCollection": o.geometries.forEach(bboxGeometry); break;
      case "Point": bboxPoint(o.coordinates); break;
      case "MultiPoint": o.coordinates.forEach(bboxPoint); break;
    }
  }

  topology.arcs.forEach(function(arc) {
    var i = -1, n = arc.length, p;
    while (++i < n) {
      p = t(arc[i], i);
      if (p[0] < x0) x0 = p[0];
      if (p[0] > x1) x1 = p[0];
      if (p[1] < y0) y0 = p[1];
      if (p[1] > y1) y1 = p[1];
    }
  });

  for (key in topology.objects) {
    bboxGeometry(topology.objects[key]);
  }

  return [x0, y0, x1, y1];
}


/***/ }),

/***/ "./node_modules/topojson-client/src/bisect.js":
/*!****************************************************!*\
  !*** ./node_modules/topojson-client/src/bisect.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(a, x) {
  var lo = 0, hi = a.length;
  while (lo < hi) {
    var mid = lo + hi >>> 1;
    if (a[mid] < x) lo = mid + 1;
    else hi = mid;
  }
  return lo;
}


/***/ }),

/***/ "./node_modules/topojson-client/src/feature.js":
/*!*****************************************************!*\
  !*** ./node_modules/topojson-client/src/feature.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "object": () => (/* binding */ object)
/* harmony export */ });
/* harmony import */ var _reverse_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./reverse.js */ "./node_modules/topojson-client/src/reverse.js");
/* harmony import */ var _transform_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./transform.js */ "./node_modules/topojson-client/src/transform.js");



/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(topology, o) {
  if (typeof o === "string") o = topology.objects[o];
  return o.type === "GeometryCollection"
      ? {type: "FeatureCollection", features: o.geometries.map(function(o) { return feature(topology, o); })}
      : feature(topology, o);
}

function feature(topology, o) {
  var id = o.id,
      bbox = o.bbox,
      properties = o.properties == null ? {} : o.properties,
      geometry = object(topology, o);
  return id == null && bbox == null ? {type: "Feature", properties: properties, geometry: geometry}
      : bbox == null ? {type: "Feature", id: id, properties: properties, geometry: geometry}
      : {type: "Feature", id: id, bbox: bbox, properties: properties, geometry: geometry};
}

function object(topology, o) {
  var transformPoint = (0,_transform_js__WEBPACK_IMPORTED_MODULE_1__["default"])(topology.transform),
      arcs = topology.arcs;

  function arc(i, points) {
    if (points.length) points.pop();
    for (var a = arcs[i < 0 ? ~i : i], k = 0, n = a.length; k < n; ++k) {
      points.push(transformPoint(a[k], k));
    }
    if (i < 0) (0,_reverse_js__WEBPACK_IMPORTED_MODULE_0__["default"])(points, n);
  }

  function point(p) {
    return transformPoint(p);
  }

  function line(arcs) {
    var points = [];
    for (var i = 0, n = arcs.length; i < n; ++i) arc(arcs[i], points);
    if (points.length < 2) points.push(points[0]); // This should never happen per the specification.
    return points;
  }

  function ring(arcs) {
    var points = line(arcs);
    while (points.length < 4) points.push(points[0]); // This may happen if an arc has only two points.
    return points;
  }

  function polygon(arcs) {
    return arcs.map(ring);
  }

  function geometry(o) {
    var type = o.type, coordinates;
    switch (type) {
      case "GeometryCollection": return {type: type, geometries: o.geometries.map(geometry)};
      case "Point": coordinates = point(o.coordinates); break;
      case "MultiPoint": coordinates = o.coordinates.map(point); break;
      case "LineString": coordinates = line(o.arcs); break;
      case "MultiLineString": coordinates = o.arcs.map(line); break;
      case "Polygon": coordinates = polygon(o.arcs); break;
      case "MultiPolygon": coordinates = o.arcs.map(polygon); break;
      default: return null;
    }
    return {type: type, coordinates: coordinates};
  }

  return geometry(o);
}


/***/ }),

/***/ "./node_modules/topojson-client/src/identity.js":
/*!******************************************************!*\
  !*** ./node_modules/topojson-client/src/identity.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(x) {
  return x;
}


/***/ }),

/***/ "./node_modules/topojson-client/src/index.js":
/*!***************************************************!*\
  !*** ./node_modules/topojson-client/src/index.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "bbox": () => (/* reexport safe */ _bbox_js__WEBPACK_IMPORTED_MODULE_0__["default"]),
/* harmony export */   "feature": () => (/* reexport safe */ _feature_js__WEBPACK_IMPORTED_MODULE_1__["default"]),
/* harmony export */   "mesh": () => (/* reexport safe */ _mesh_js__WEBPACK_IMPORTED_MODULE_2__["default"]),
/* harmony export */   "meshArcs": () => (/* reexport safe */ _mesh_js__WEBPACK_IMPORTED_MODULE_2__.meshArcs),
/* harmony export */   "merge": () => (/* reexport safe */ _merge_js__WEBPACK_IMPORTED_MODULE_3__["default"]),
/* harmony export */   "mergeArcs": () => (/* reexport safe */ _merge_js__WEBPACK_IMPORTED_MODULE_3__.mergeArcs),
/* harmony export */   "neighbors": () => (/* reexport safe */ _neighbors_js__WEBPACK_IMPORTED_MODULE_4__["default"]),
/* harmony export */   "quantize": () => (/* reexport safe */ _quantize_js__WEBPACK_IMPORTED_MODULE_5__["default"]),
/* harmony export */   "transform": () => (/* reexport safe */ _transform_js__WEBPACK_IMPORTED_MODULE_6__["default"]),
/* harmony export */   "untransform": () => (/* reexport safe */ _untransform_js__WEBPACK_IMPORTED_MODULE_7__["default"])
/* harmony export */ });
/* harmony import */ var _bbox_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./bbox.js */ "./node_modules/topojson-client/src/bbox.js");
/* harmony import */ var _feature_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./feature.js */ "./node_modules/topojson-client/src/feature.js");
/* harmony import */ var _mesh_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./mesh.js */ "./node_modules/topojson-client/src/mesh.js");
/* harmony import */ var _merge_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./merge.js */ "./node_modules/topojson-client/src/merge.js");
/* harmony import */ var _neighbors_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./neighbors.js */ "./node_modules/topojson-client/src/neighbors.js");
/* harmony import */ var _quantize_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./quantize.js */ "./node_modules/topojson-client/src/quantize.js");
/* harmony import */ var _transform_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./transform.js */ "./node_modules/topojson-client/src/transform.js");
/* harmony import */ var _untransform_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./untransform.js */ "./node_modules/topojson-client/src/untransform.js");










/***/ }),

/***/ "./node_modules/topojson-client/src/merge.js":
/*!***************************************************!*\
  !*** ./node_modules/topojson-client/src/merge.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "mergeArcs": () => (/* binding */ mergeArcs)
/* harmony export */ });
/* harmony import */ var _feature_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./feature.js */ "./node_modules/topojson-client/src/feature.js");
/* harmony import */ var _stitch_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./stitch.js */ "./node_modules/topojson-client/src/stitch.js");



function planarRingArea(ring) {
  var i = -1, n = ring.length, a, b = ring[n - 1], area = 0;
  while (++i < n) a = b, b = ring[i], area += a[0] * b[1] - a[1] * b[0];
  return Math.abs(area); // Note: doubled area!
}

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(topology) {
  return (0,_feature_js__WEBPACK_IMPORTED_MODULE_0__.object)(topology, mergeArcs.apply(this, arguments));
}

function mergeArcs(topology, objects) {
  var polygonsByArc = {},
      polygons = [],
      groups = [];

  objects.forEach(geometry);

  function geometry(o) {
    switch (o.type) {
      case "GeometryCollection": o.geometries.forEach(geometry); break;
      case "Polygon": extract(o.arcs); break;
      case "MultiPolygon": o.arcs.forEach(extract); break;
    }
  }

  function extract(polygon) {
    polygon.forEach(function(ring) {
      ring.forEach(function(arc) {
        (polygonsByArc[arc = arc < 0 ? ~arc : arc] || (polygonsByArc[arc] = [])).push(polygon);
      });
    });
    polygons.push(polygon);
  }

  function area(ring) {
    return planarRingArea((0,_feature_js__WEBPACK_IMPORTED_MODULE_0__.object)(topology, {type: "Polygon", arcs: [ring]}).coordinates[0]);
  }

  polygons.forEach(function(polygon) {
    if (!polygon._) {
      var group = [],
          neighbors = [polygon];
      polygon._ = 1;
      groups.push(group);
      while (polygon = neighbors.pop()) {
        group.push(polygon);
        polygon.forEach(function(ring) {
          ring.forEach(function(arc) {
            polygonsByArc[arc < 0 ? ~arc : arc].forEach(function(polygon) {
              if (!polygon._) {
                polygon._ = 1;
                neighbors.push(polygon);
              }
            });
          });
        });
      }
    }
  });

  polygons.forEach(function(polygon) {
    delete polygon._;
  });

  return {
    type: "MultiPolygon",
    arcs: groups.map(function(polygons) {
      var arcs = [], n;

      // Extract the exterior (unique) arcs.
      polygons.forEach(function(polygon) {
        polygon.forEach(function(ring) {
          ring.forEach(function(arc) {
            if (polygonsByArc[arc < 0 ? ~arc : arc].length < 2) {
              arcs.push(arc);
            }
          });
        });
      });

      // Stitch the arcs into one or more rings.
      arcs = (0,_stitch_js__WEBPACK_IMPORTED_MODULE_1__["default"])(topology, arcs);

      // If more than one ring is returned,
      // at most one of these rings can be the exterior;
      // choose the one with the greatest absolute area.
      if ((n = arcs.length) > 1) {
        for (var i = 1, k = area(arcs[0]), ki, t; i < n; ++i) {
          if ((ki = area(arcs[i])) > k) {
            t = arcs[0], arcs[0] = arcs[i], arcs[i] = t, k = ki;
          }
        }
      }

      return arcs;
    }).filter(function(arcs) {
      return arcs.length > 0;
    })
  };
}


/***/ }),

/***/ "./node_modules/topojson-client/src/mesh.js":
/*!**************************************************!*\
  !*** ./node_modules/topojson-client/src/mesh.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "meshArcs": () => (/* binding */ meshArcs)
/* harmony export */ });
/* harmony import */ var _feature_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./feature.js */ "./node_modules/topojson-client/src/feature.js");
/* harmony import */ var _stitch_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./stitch.js */ "./node_modules/topojson-client/src/stitch.js");



/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(topology) {
  return (0,_feature_js__WEBPACK_IMPORTED_MODULE_0__.object)(topology, meshArcs.apply(this, arguments));
}

function meshArcs(topology, object, filter) {
  var arcs, i, n;
  if (arguments.length > 1) arcs = extractArcs(topology, object, filter);
  else for (i = 0, arcs = new Array(n = topology.arcs.length); i < n; ++i) arcs[i] = i;
  return {type: "MultiLineString", arcs: (0,_stitch_js__WEBPACK_IMPORTED_MODULE_1__["default"])(topology, arcs)};
}

function extractArcs(topology, object, filter) {
  var arcs = [],
      geomsByArc = [],
      geom;

  function extract0(i) {
    var j = i < 0 ? ~i : i;
    (geomsByArc[j] || (geomsByArc[j] = [])).push({i: i, g: geom});
  }

  function extract1(arcs) {
    arcs.forEach(extract0);
  }

  function extract2(arcs) {
    arcs.forEach(extract1);
  }

  function extract3(arcs) {
    arcs.forEach(extract2);
  }

  function geometry(o) {
    switch (geom = o, o.type) {
      case "GeometryCollection": o.geometries.forEach(geometry); break;
      case "LineString": extract1(o.arcs); break;
      case "MultiLineString": case "Polygon": extract2(o.arcs); break;
      case "MultiPolygon": extract3(o.arcs); break;
    }
  }

  geometry(object);

  geomsByArc.forEach(filter == null
      ? function(geoms) { arcs.push(geoms[0].i); }
      : function(geoms) { if (filter(geoms[0].g, geoms[geoms.length - 1].g)) arcs.push(geoms[0].i); });

  return arcs;
}


/***/ }),

/***/ "./node_modules/topojson-client/src/neighbors.js":
/*!*******************************************************!*\
  !*** ./node_modules/topojson-client/src/neighbors.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _bisect_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./bisect.js */ "./node_modules/topojson-client/src/bisect.js");


/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(objects) {
  var indexesByArc = {}, // arc index -> array of object indexes
      neighbors = objects.map(function() { return []; });

  function line(arcs, i) {
    arcs.forEach(function(a) {
      if (a < 0) a = ~a;
      var o = indexesByArc[a];
      if (o) o.push(i);
      else indexesByArc[a] = [i];
    });
  }

  function polygon(arcs, i) {
    arcs.forEach(function(arc) { line(arc, i); });
  }

  function geometry(o, i) {
    if (o.type === "GeometryCollection") o.geometries.forEach(function(o) { geometry(o, i); });
    else if (o.type in geometryType) geometryType[o.type](o.arcs, i);
  }

  var geometryType = {
    LineString: line,
    MultiLineString: polygon,
    Polygon: polygon,
    MultiPolygon: function(arcs, i) { arcs.forEach(function(arc) { polygon(arc, i); }); }
  };

  objects.forEach(geometry);

  for (var i in indexesByArc) {
    for (var indexes = indexesByArc[i], m = indexes.length, j = 0; j < m; ++j) {
      for (var k = j + 1; k < m; ++k) {
        var ij = indexes[j], ik = indexes[k], n;
        if ((n = neighbors[ij])[i = (0,_bisect_js__WEBPACK_IMPORTED_MODULE_0__["default"])(n, ik)] !== ik) n.splice(i, 0, ik);
        if ((n = neighbors[ik])[i = (0,_bisect_js__WEBPACK_IMPORTED_MODULE_0__["default"])(n, ij)] !== ij) n.splice(i, 0, ij);
      }
    }
  }

  return neighbors;
}


/***/ }),

/***/ "./node_modules/topojson-client/src/quantize.js":
/*!******************************************************!*\
  !*** ./node_modules/topojson-client/src/quantize.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _bbox_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./bbox.js */ "./node_modules/topojson-client/src/bbox.js");
/* harmony import */ var _untransform_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./untransform.js */ "./node_modules/topojson-client/src/untransform.js");



/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(topology, transform) {
  if (topology.transform) throw new Error("already quantized");

  if (!transform || !transform.scale) {
    if (!((n = Math.floor(transform)) >= 2)) throw new Error("n must be ≥2");
    box = topology.bbox || (0,_bbox_js__WEBPACK_IMPORTED_MODULE_0__["default"])(topology);
    var x0 = box[0], y0 = box[1], x1 = box[2], y1 = box[3], n;
    transform = {scale: [x1 - x0 ? (x1 - x0) / (n - 1) : 1, y1 - y0 ? (y1 - y0) / (n - 1) : 1], translate: [x0, y0]};
  } else {
    box = topology.bbox;
  }

  var t = (0,_untransform_js__WEBPACK_IMPORTED_MODULE_1__["default"])(transform), box, key, inputs = topology.objects, outputs = {};

  function quantizePoint(point) {
    return t(point);
  }

  function quantizeGeometry(input) {
    var output;
    switch (input.type) {
      case "GeometryCollection": output = {type: "GeometryCollection", geometries: input.geometries.map(quantizeGeometry)}; break;
      case "Point": output = {type: "Point", coordinates: quantizePoint(input.coordinates)}; break;
      case "MultiPoint": output = {type: "MultiPoint", coordinates: input.coordinates.map(quantizePoint)}; break;
      default: return input;
    }
    if (input.id != null) output.id = input.id;
    if (input.bbox != null) output.bbox = input.bbox;
    if (input.properties != null) output.properties = input.properties;
    return output;
  }

  function quantizeArc(input) {
    var i = 0, j = 1, n = input.length, p, output = new Array(n); // pessimistic
    output[0] = t(input[0], 0);
    while (++i < n) if ((p = t(input[i], i))[0] || p[1]) output[j++] = p; // non-coincident points
    if (j === 1) output[j++] = [0, 0]; // an arc must have at least two points
    output.length = j;
    return output;
  }

  for (key in inputs) outputs[key] = quantizeGeometry(inputs[key]);

  return {
    type: "Topology",
    bbox: box,
    transform: transform,
    objects: outputs,
    arcs: topology.arcs.map(quantizeArc)
  };
}


/***/ }),

/***/ "./node_modules/topojson-client/src/reverse.js":
/*!*****************************************************!*\
  !*** ./node_modules/topojson-client/src/reverse.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(array, n) {
  var t, j = array.length, i = j - n;
  while (i < --j) t = array[i], array[i++] = array[j], array[j] = t;
}


/***/ }),

/***/ "./node_modules/topojson-client/src/stitch.js":
/*!****************************************************!*\
  !*** ./node_modules/topojson-client/src/stitch.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(topology, arcs) {
  var stitchedArcs = {},
      fragmentByStart = {},
      fragmentByEnd = {},
      fragments = [],
      emptyIndex = -1;

  // Stitch empty arcs first, since they may be subsumed by other arcs.
  arcs.forEach(function(i, j) {
    var arc = topology.arcs[i < 0 ? ~i : i], t;
    if (arc.length < 3 && !arc[1][0] && !arc[1][1]) {
      t = arcs[++emptyIndex], arcs[emptyIndex] = i, arcs[j] = t;
    }
  });

  arcs.forEach(function(i) {
    var e = ends(i),
        start = e[0],
        end = e[1],
        f, g;

    if (f = fragmentByEnd[start]) {
      delete fragmentByEnd[f.end];
      f.push(i);
      f.end = end;
      if (g = fragmentByStart[end]) {
        delete fragmentByStart[g.start];
        var fg = g === f ? f : f.concat(g);
        fragmentByStart[fg.start = f.start] = fragmentByEnd[fg.end = g.end] = fg;
      } else {
        fragmentByStart[f.start] = fragmentByEnd[f.end] = f;
      }
    } else if (f = fragmentByStart[end]) {
      delete fragmentByStart[f.start];
      f.unshift(i);
      f.start = start;
      if (g = fragmentByEnd[start]) {
        delete fragmentByEnd[g.end];
        var gf = g === f ? f : g.concat(f);
        fragmentByStart[gf.start = g.start] = fragmentByEnd[gf.end = f.end] = gf;
      } else {
        fragmentByStart[f.start] = fragmentByEnd[f.end] = f;
      }
    } else {
      f = [i];
      fragmentByStart[f.start = start] = fragmentByEnd[f.end = end] = f;
    }
  });

  function ends(i) {
    var arc = topology.arcs[i < 0 ? ~i : i], p0 = arc[0], p1;
    if (topology.transform) p1 = [0, 0], arc.forEach(function(dp) { p1[0] += dp[0], p1[1] += dp[1]; });
    else p1 = arc[arc.length - 1];
    return i < 0 ? [p1, p0] : [p0, p1];
  }

  function flush(fragmentByEnd, fragmentByStart) {
    for (var k in fragmentByEnd) {
      var f = fragmentByEnd[k];
      delete fragmentByStart[f.start];
      delete f.start;
      delete f.end;
      f.forEach(function(i) { stitchedArcs[i < 0 ? ~i : i] = 1; });
      fragments.push(f);
    }
  }

  flush(fragmentByEnd, fragmentByStart);
  flush(fragmentByStart, fragmentByEnd);
  arcs.forEach(function(i) { if (!stitchedArcs[i < 0 ? ~i : i]) fragments.push([i]); });

  return fragments;
}


/***/ }),

/***/ "./node_modules/topojson-client/src/transform.js":
/*!*******************************************************!*\
  !*** ./node_modules/topojson-client/src/transform.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _identity_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./identity.js */ "./node_modules/topojson-client/src/identity.js");


/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(transform) {
  if (transform == null) return _identity_js__WEBPACK_IMPORTED_MODULE_0__["default"];
  var x0,
      y0,
      kx = transform.scale[0],
      ky = transform.scale[1],
      dx = transform.translate[0],
      dy = transform.translate[1];
  return function(input, i) {
    if (!i) x0 = y0 = 0;
    var j = 2, n = input.length, output = new Array(n);
    output[0] = (x0 += input[0]) * kx + dx;
    output[1] = (y0 += input[1]) * ky + dy;
    while (j < n) output[j] = input[j], ++j;
    return output;
  };
}


/***/ }),

/***/ "./node_modules/topojson-client/src/untransform.js":
/*!*********************************************************!*\
  !*** ./node_modules/topojson-client/src/untransform.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _identity_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./identity.js */ "./node_modules/topojson-client/src/identity.js");


/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(transform) {
  if (transform == null) return _identity_js__WEBPACK_IMPORTED_MODULE_0__["default"];
  var x0,
      y0,
      kx = transform.scale[0],
      ky = transform.scale[1],
      dx = transform.translate[0],
      dy = transform.translate[1];
  return function(input, i) {
    if (!i) x0 = y0 = 0;
    var j = 2,
        n = input.length,
        output = new Array(n),
        x1 = Math.round((input[0] - dx) / kx),
        y1 = Math.round((input[1] - dy) / ky);
    output[0] = x1 - x0, x0 = x1;
    output[1] = y1 - y0, y0 = y1;
    while (j < n) output[j] = input[j], ++j;
    return output;
  };
}


/***/ }),

/***/ "./srcjs/modules/proxy.js":
/*!********************************!*\
  !*** ./srcjs/modules/proxy.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getTopogram": () => (/* binding */ getTopogram),
/* harmony export */   "updateVariable": () => (/* binding */ updateVariable)
/* harmony export */ });
function getTopogram(id) {
  // Get the HTMLWidgets object
  var htmlWidgetsObj = HTMLWidgets.find("#" + id);

  // Use the getChart method we created to get the underlying billboard chart
  var widgetObj;

  if (typeof htmlWidgetsObj != "undefined") {
    widgetObj = htmlWidgetsObj.getTopogram();
  }

  return widgetObj;
}

function updateVariable(obj) {
  var carto = getTopogram(obj.id);
  carto
    .value(function(d) {
      var value = d.properties[obj.data.variable];
      if (value <= 0) {
        value = 0.001;
      }
      return value;
    })
    .color(function(d) {
      return obj.data.colors[d.properties.topogram_id];
    })
    .tooltipContent(function(d) {
      return obj.data.labels[d.properties.topogram_id];
    });
}



/***/ }),

/***/ "./srcjs/modules/utils.js":
/*!********************************!*\
  !*** ./srcjs/modules/utils.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "removeElement": () => (/* binding */ removeElement),
/* harmony export */   "setLabs": () => (/* binding */ setLabs)
/* harmony export */ });
function removeElement(elementId) {
  var element = document.getElementById(elementId);
  if (element !== null)
    element.parentNode.removeChild(element);
}

function setLabs(elementId, enabled, options) {
  if (!enabled) {
    removeElement(elementId + "-title");
    removeElement(elementId + "-subtitle");
    removeElement(elementId + "-caption");
  } else {
    if (options.title !== null) {
      document.getElementById(elementId + "-title").innerHTML = options.title;
    } else {
      removeElement(elementId + "-title");
    }
    if (options.subtitle !== null) {
      document.getElementById(elementId + "-subtitle").innerHTML =
        options.subtitle;
    } else {
      removeElement(elementId + "-subtitle");
    }
    if (options.caption !== null) {
      document.getElementById(elementId + "-caption").innerHTML =
        options.caption;
    } else {
      removeElement(elementId + "-caption");
    }
  }
}



/***/ }),

/***/ "widgets":
/*!******************************!*\
  !*** external "HTMLWidgets" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = HTMLWidgets;

/***/ }),

/***/ "./node_modules/d3-array/src/fsum.js":
/*!*******************************************!*\
  !*** ./node_modules/d3-array/src/fsum.js ***!
  \*******************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Adder": () => (/* binding */ Adder),
/* harmony export */   "fsum": () => (/* binding */ fsum),
/* harmony export */   "fcumsum": () => (/* binding */ fcumsum)
/* harmony export */ });
// https://github.com/python/cpython/blob/a74eea238f5baba15797e2e8b570d153bc8690a7/Modules/mathmodule.c#L1423
class Adder {
  constructor() {
    this._partials = new Float64Array(32);
    this._n = 0;
  }
  add(x) {
    const p = this._partials;
    let i = 0;
    for (let j = 0; j < this._n && j < 32; j++) {
      const y = p[j],
        hi = x + y,
        lo = Math.abs(x) < Math.abs(y) ? x - (hi - y) : y - (hi - x);
      if (lo) p[i++] = lo;
      x = hi;
    }
    p[i] = x;
    this._n = i + 1;
    return this;
  }
  valueOf() {
    const p = this._partials;
    let n = this._n, x, y, lo, hi = 0;
    if (n > 0) {
      hi = p[--n];
      while (n > 0) {
        x = hi;
        y = p[--n];
        hi = x + y;
        lo = y - (hi - x);
        if (lo) break;
      }
      if (n > 0 && ((lo < 0 && p[n - 1] < 0) || (lo > 0 && p[n - 1] > 0))) {
        y = lo * 2;
        x = hi + y;
        if (y == x - hi) hi = x;
      }
    }
    return hi;
  }
}

function fsum(values, valueof) {
  const adder = new Adder();
  if (valueof === undefined) {
    for (let value of values) {
      if (value = +value) {
        adder.add(value);
      }
    }
  } else {
    let index = -1;
    for (let value of values) {
      if (value = +valueof(value, ++index, values)) {
        adder.add(value);
      }
    }
  }
  return +adder;
}

function fcumsum(values, valueof) {
  const adder = new Adder();
  let index = -1;
  return Float64Array.from(values, valueof === undefined
      ? v => adder.add(+v || 0)
      : v => adder.add(+valueof(v, ++index, values) || 0)
  );
}


/***/ }),

/***/ "./node_modules/d3-array/src/merge.js":
/*!********************************************!*\
  !*** ./node_modules/d3-array/src/merge.js ***!
  \********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ merge)
/* harmony export */ });
function* flatten(arrays) {
  for (const array of arrays) {
    yield* array;
  }
}

function merge(arrays) {
  return Array.from(flatten(arrays));
}


/***/ }),

/***/ "./node_modules/d3-array/src/range.js":
/*!********************************************!*\
  !*** ./node_modules/d3-array/src/range.js ***!
  \********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ range)
/* harmony export */ });
function range(start, stop, step) {
  start = +start, stop = +stop, step = (n = arguments.length) < 2 ? (stop = start, start = 0, 1) : n < 3 ? 1 : +step;

  var i = -1,
      n = Math.max(0, Math.ceil((stop - start) / step)) | 0,
      range = new Array(n);

  while (++i < n) {
    range[i] = start + i * step;
  }

  return range;
}


/***/ }),

/***/ "./node_modules/d3-color/src/color.js":
/*!********************************************!*\
  !*** ./node_modules/d3-color/src/color.js ***!
  \********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Color": () => (/* binding */ Color),
/* harmony export */   "darker": () => (/* binding */ darker),
/* harmony export */   "brighter": () => (/* binding */ brighter),
/* harmony export */   "default": () => (/* binding */ color),
/* harmony export */   "rgbConvert": () => (/* binding */ rgbConvert),
/* harmony export */   "rgb": () => (/* binding */ rgb),
/* harmony export */   "Rgb": () => (/* binding */ Rgb),
/* harmony export */   "hslConvert": () => (/* binding */ hslConvert),
/* harmony export */   "hsl": () => (/* binding */ hsl)
/* harmony export */ });
/* harmony import */ var _define_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./define.js */ "./node_modules/d3-color/src/define.js");


function Color() {}

var darker = 0.7;
var brighter = 1 / darker;

var reI = "\\s*([+-]?\\d+)\\s*",
    reN = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)\\s*",
    reP = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)%\\s*",
    reHex = /^#([0-9a-f]{3,8})$/,
    reRgbInteger = new RegExp("^rgb\\(" + [reI, reI, reI] + "\\)$"),
    reRgbPercent = new RegExp("^rgb\\(" + [reP, reP, reP] + "\\)$"),
    reRgbaInteger = new RegExp("^rgba\\(" + [reI, reI, reI, reN] + "\\)$"),
    reRgbaPercent = new RegExp("^rgba\\(" + [reP, reP, reP, reN] + "\\)$"),
    reHslPercent = new RegExp("^hsl\\(" + [reN, reP, reP] + "\\)$"),
    reHslaPercent = new RegExp("^hsla\\(" + [reN, reP, reP, reN] + "\\)$");

var named = {
  aliceblue: 0xf0f8ff,
  antiquewhite: 0xfaebd7,
  aqua: 0x00ffff,
  aquamarine: 0x7fffd4,
  azure: 0xf0ffff,
  beige: 0xf5f5dc,
  bisque: 0xffe4c4,
  black: 0x000000,
  blanchedalmond: 0xffebcd,
  blue: 0x0000ff,
  blueviolet: 0x8a2be2,
  brown: 0xa52a2a,
  burlywood: 0xdeb887,
  cadetblue: 0x5f9ea0,
  chartreuse: 0x7fff00,
  chocolate: 0xd2691e,
  coral: 0xff7f50,
  cornflowerblue: 0x6495ed,
  cornsilk: 0xfff8dc,
  crimson: 0xdc143c,
  cyan: 0x00ffff,
  darkblue: 0x00008b,
  darkcyan: 0x008b8b,
  darkgoldenrod: 0xb8860b,
  darkgray: 0xa9a9a9,
  darkgreen: 0x006400,
  darkgrey: 0xa9a9a9,
  darkkhaki: 0xbdb76b,
  darkmagenta: 0x8b008b,
  darkolivegreen: 0x556b2f,
  darkorange: 0xff8c00,
  darkorchid: 0x9932cc,
  darkred: 0x8b0000,
  darksalmon: 0xe9967a,
  darkseagreen: 0x8fbc8f,
  darkslateblue: 0x483d8b,
  darkslategray: 0x2f4f4f,
  darkslategrey: 0x2f4f4f,
  darkturquoise: 0x00ced1,
  darkviolet: 0x9400d3,
  deeppink: 0xff1493,
  deepskyblue: 0x00bfff,
  dimgray: 0x696969,
  dimgrey: 0x696969,
  dodgerblue: 0x1e90ff,
  firebrick: 0xb22222,
  floralwhite: 0xfffaf0,
  forestgreen: 0x228b22,
  fuchsia: 0xff00ff,
  gainsboro: 0xdcdcdc,
  ghostwhite: 0xf8f8ff,
  gold: 0xffd700,
  goldenrod: 0xdaa520,
  gray: 0x808080,
  green: 0x008000,
  greenyellow: 0xadff2f,
  grey: 0x808080,
  honeydew: 0xf0fff0,
  hotpink: 0xff69b4,
  indianred: 0xcd5c5c,
  indigo: 0x4b0082,
  ivory: 0xfffff0,
  khaki: 0xf0e68c,
  lavender: 0xe6e6fa,
  lavenderblush: 0xfff0f5,
  lawngreen: 0x7cfc00,
  lemonchiffon: 0xfffacd,
  lightblue: 0xadd8e6,
  lightcoral: 0xf08080,
  lightcyan: 0xe0ffff,
  lightgoldenrodyellow: 0xfafad2,
  lightgray: 0xd3d3d3,
  lightgreen: 0x90ee90,
  lightgrey: 0xd3d3d3,
  lightpink: 0xffb6c1,
  lightsalmon: 0xffa07a,
  lightseagreen: 0x20b2aa,
  lightskyblue: 0x87cefa,
  lightslategray: 0x778899,
  lightslategrey: 0x778899,
  lightsteelblue: 0xb0c4de,
  lightyellow: 0xffffe0,
  lime: 0x00ff00,
  limegreen: 0x32cd32,
  linen: 0xfaf0e6,
  magenta: 0xff00ff,
  maroon: 0x800000,
  mediumaquamarine: 0x66cdaa,
  mediumblue: 0x0000cd,
  mediumorchid: 0xba55d3,
  mediumpurple: 0x9370db,
  mediumseagreen: 0x3cb371,
  mediumslateblue: 0x7b68ee,
  mediumspringgreen: 0x00fa9a,
  mediumturquoise: 0x48d1cc,
  mediumvioletred: 0xc71585,
  midnightblue: 0x191970,
  mintcream: 0xf5fffa,
  mistyrose: 0xffe4e1,
  moccasin: 0xffe4b5,
  navajowhite: 0xffdead,
  navy: 0x000080,
  oldlace: 0xfdf5e6,
  olive: 0x808000,
  olivedrab: 0x6b8e23,
  orange: 0xffa500,
  orangered: 0xff4500,
  orchid: 0xda70d6,
  palegoldenrod: 0xeee8aa,
  palegreen: 0x98fb98,
  paleturquoise: 0xafeeee,
  palevioletred: 0xdb7093,
  papayawhip: 0xffefd5,
  peachpuff: 0xffdab9,
  peru: 0xcd853f,
  pink: 0xffc0cb,
  plum: 0xdda0dd,
  powderblue: 0xb0e0e6,
  purple: 0x800080,
  rebeccapurple: 0x663399,
  red: 0xff0000,
  rosybrown: 0xbc8f8f,
  royalblue: 0x4169e1,
  saddlebrown: 0x8b4513,
  salmon: 0xfa8072,
  sandybrown: 0xf4a460,
  seagreen: 0x2e8b57,
  seashell: 0xfff5ee,
  sienna: 0xa0522d,
  silver: 0xc0c0c0,
  skyblue: 0x87ceeb,
  slateblue: 0x6a5acd,
  slategray: 0x708090,
  slategrey: 0x708090,
  snow: 0xfffafa,
  springgreen: 0x00ff7f,
  steelblue: 0x4682b4,
  tan: 0xd2b48c,
  teal: 0x008080,
  thistle: 0xd8bfd8,
  tomato: 0xff6347,
  turquoise: 0x40e0d0,
  violet: 0xee82ee,
  wheat: 0xf5deb3,
  white: 0xffffff,
  whitesmoke: 0xf5f5f5,
  yellow: 0xffff00,
  yellowgreen: 0x9acd32
};

(0,_define_js__WEBPACK_IMPORTED_MODULE_0__["default"])(Color, color, {
  copy: function(channels) {
    return Object.assign(new this.constructor, this, channels);
  },
  displayable: function() {
    return this.rgb().displayable();
  },
  hex: color_formatHex, // Deprecated! Use color.formatHex.
  formatHex: color_formatHex,
  formatHsl: color_formatHsl,
  formatRgb: color_formatRgb,
  toString: color_formatRgb
});

function color_formatHex() {
  return this.rgb().formatHex();
}

function color_formatHsl() {
  return hslConvert(this).formatHsl();
}

function color_formatRgb() {
  return this.rgb().formatRgb();
}

function color(format) {
  var m, l;
  format = (format + "").trim().toLowerCase();
  return (m = reHex.exec(format)) ? (l = m[1].length, m = parseInt(m[1], 16), l === 6 ? rgbn(m) // #ff0000
      : l === 3 ? new Rgb((m >> 8 & 0xf) | (m >> 4 & 0xf0), (m >> 4 & 0xf) | (m & 0xf0), ((m & 0xf) << 4) | (m & 0xf), 1) // #f00
      : l === 8 ? rgba(m >> 24 & 0xff, m >> 16 & 0xff, m >> 8 & 0xff, (m & 0xff) / 0xff) // #ff000000
      : l === 4 ? rgba((m >> 12 & 0xf) | (m >> 8 & 0xf0), (m >> 8 & 0xf) | (m >> 4 & 0xf0), (m >> 4 & 0xf) | (m & 0xf0), (((m & 0xf) << 4) | (m & 0xf)) / 0xff) // #f000
      : null) // invalid hex
      : (m = reRgbInteger.exec(format)) ? new Rgb(m[1], m[2], m[3], 1) // rgb(255, 0, 0)
      : (m = reRgbPercent.exec(format)) ? new Rgb(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, 1) // rgb(100%, 0%, 0%)
      : (m = reRgbaInteger.exec(format)) ? rgba(m[1], m[2], m[3], m[4]) // rgba(255, 0, 0, 1)
      : (m = reRgbaPercent.exec(format)) ? rgba(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, m[4]) // rgb(100%, 0%, 0%, 1)
      : (m = reHslPercent.exec(format)) ? hsla(m[1], m[2] / 100, m[3] / 100, 1) // hsl(120, 50%, 50%)
      : (m = reHslaPercent.exec(format)) ? hsla(m[1], m[2] / 100, m[3] / 100, m[4]) // hsla(120, 50%, 50%, 1)
      : named.hasOwnProperty(format) ? rgbn(named[format]) // eslint-disable-line no-prototype-builtins
      : format === "transparent" ? new Rgb(NaN, NaN, NaN, 0)
      : null;
}

function rgbn(n) {
  return new Rgb(n >> 16 & 0xff, n >> 8 & 0xff, n & 0xff, 1);
}

function rgba(r, g, b, a) {
  if (a <= 0) r = g = b = NaN;
  return new Rgb(r, g, b, a);
}

function rgbConvert(o) {
  if (!(o instanceof Color)) o = color(o);
  if (!o) return new Rgb;
  o = o.rgb();
  return new Rgb(o.r, o.g, o.b, o.opacity);
}

function rgb(r, g, b, opacity) {
  return arguments.length === 1 ? rgbConvert(r) : new Rgb(r, g, b, opacity == null ? 1 : opacity);
}

function Rgb(r, g, b, opacity) {
  this.r = +r;
  this.g = +g;
  this.b = +b;
  this.opacity = +opacity;
}

(0,_define_js__WEBPACK_IMPORTED_MODULE_0__["default"])(Rgb, rgb, (0,_define_js__WEBPACK_IMPORTED_MODULE_0__.extend)(Color, {
  brighter: function(k) {
    k = k == null ? brighter : Math.pow(brighter, k);
    return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
  },
  darker: function(k) {
    k = k == null ? darker : Math.pow(darker, k);
    return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
  },
  rgb: function() {
    return this;
  },
  displayable: function() {
    return (-0.5 <= this.r && this.r < 255.5)
        && (-0.5 <= this.g && this.g < 255.5)
        && (-0.5 <= this.b && this.b < 255.5)
        && (0 <= this.opacity && this.opacity <= 1);
  },
  hex: rgb_formatHex, // Deprecated! Use color.formatHex.
  formatHex: rgb_formatHex,
  formatRgb: rgb_formatRgb,
  toString: rgb_formatRgb
}));

function rgb_formatHex() {
  return "#" + hex(this.r) + hex(this.g) + hex(this.b);
}

function rgb_formatRgb() {
  var a = this.opacity; a = isNaN(a) ? 1 : Math.max(0, Math.min(1, a));
  return (a === 1 ? "rgb(" : "rgba(")
      + Math.max(0, Math.min(255, Math.round(this.r) || 0)) + ", "
      + Math.max(0, Math.min(255, Math.round(this.g) || 0)) + ", "
      + Math.max(0, Math.min(255, Math.round(this.b) || 0))
      + (a === 1 ? ")" : ", " + a + ")");
}

function hex(value) {
  value = Math.max(0, Math.min(255, Math.round(value) || 0));
  return (value < 16 ? "0" : "") + value.toString(16);
}

function hsla(h, s, l, a) {
  if (a <= 0) h = s = l = NaN;
  else if (l <= 0 || l >= 1) h = s = NaN;
  else if (s <= 0) h = NaN;
  return new Hsl(h, s, l, a);
}

function hslConvert(o) {
  if (o instanceof Hsl) return new Hsl(o.h, o.s, o.l, o.opacity);
  if (!(o instanceof Color)) o = color(o);
  if (!o) return new Hsl;
  if (o instanceof Hsl) return o;
  o = o.rgb();
  var r = o.r / 255,
      g = o.g / 255,
      b = o.b / 255,
      min = Math.min(r, g, b),
      max = Math.max(r, g, b),
      h = NaN,
      s = max - min,
      l = (max + min) / 2;
  if (s) {
    if (r === max) h = (g - b) / s + (g < b) * 6;
    else if (g === max) h = (b - r) / s + 2;
    else h = (r - g) / s + 4;
    s /= l < 0.5 ? max + min : 2 - max - min;
    h *= 60;
  } else {
    s = l > 0 && l < 1 ? 0 : h;
  }
  return new Hsl(h, s, l, o.opacity);
}

function hsl(h, s, l, opacity) {
  return arguments.length === 1 ? hslConvert(h) : new Hsl(h, s, l, opacity == null ? 1 : opacity);
}

function Hsl(h, s, l, opacity) {
  this.h = +h;
  this.s = +s;
  this.l = +l;
  this.opacity = +opacity;
}

(0,_define_js__WEBPACK_IMPORTED_MODULE_0__["default"])(Hsl, hsl, (0,_define_js__WEBPACK_IMPORTED_MODULE_0__.extend)(Color, {
  brighter: function(k) {
    k = k == null ? brighter : Math.pow(brighter, k);
    return new Hsl(this.h, this.s, this.l * k, this.opacity);
  },
  darker: function(k) {
    k = k == null ? darker : Math.pow(darker, k);
    return new Hsl(this.h, this.s, this.l * k, this.opacity);
  },
  rgb: function() {
    var h = this.h % 360 + (this.h < 0) * 360,
        s = isNaN(h) || isNaN(this.s) ? 0 : this.s,
        l = this.l,
        m2 = l + (l < 0.5 ? l : 1 - l) * s,
        m1 = 2 * l - m2;
    return new Rgb(
      hsl2rgb(h >= 240 ? h - 240 : h + 120, m1, m2),
      hsl2rgb(h, m1, m2),
      hsl2rgb(h < 120 ? h + 240 : h - 120, m1, m2),
      this.opacity
    );
  },
  displayable: function() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s))
        && (0 <= this.l && this.l <= 1)
        && (0 <= this.opacity && this.opacity <= 1);
  },
  formatHsl: function() {
    var a = this.opacity; a = isNaN(a) ? 1 : Math.max(0, Math.min(1, a));
    return (a === 1 ? "hsl(" : "hsla(")
        + (this.h || 0) + ", "
        + (this.s || 0) * 100 + "%, "
        + (this.l || 0) * 100 + "%"
        + (a === 1 ? ")" : ", " + a + ")");
  }
}));

/* From FvD 13.37, CSS Color Module Level 3 */
function hsl2rgb(h, m1, m2) {
  return (h < 60 ? m1 + (m2 - m1) * h / 60
      : h < 180 ? m2
      : h < 240 ? m1 + (m2 - m1) * (240 - h) / 60
      : m1) * 255;
}


/***/ }),

/***/ "./node_modules/d3-color/src/define.js":
/*!*********************************************!*\
  !*** ./node_modules/d3-color/src/define.js ***!
  \*********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "extend": () => (/* binding */ extend)
/* harmony export */ });
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(constructor, factory, prototype) {
  constructor.prototype = factory.prototype = prototype;
  prototype.constructor = constructor;
}

function extend(parent, definition) {
  var prototype = Object.create(parent.prototype);
  for (var key in definition) prototype[key] = definition[key];
  return prototype;
}


/***/ }),

/***/ "./node_modules/d3-dispatch/src/dispatch.js":
/*!**************************************************!*\
  !*** ./node_modules/d3-dispatch/src/dispatch.js ***!
  \**************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var noop = {value: () => {}};

function dispatch() {
  for (var i = 0, n = arguments.length, _ = {}, t; i < n; ++i) {
    if (!(t = arguments[i] + "") || (t in _) || /[\s.]/.test(t)) throw new Error("illegal type: " + t);
    _[t] = [];
  }
  return new Dispatch(_);
}

function Dispatch(_) {
  this._ = _;
}

function parseTypenames(typenames, types) {
  return typenames.trim().split(/^|\s+/).map(function(t) {
    var name = "", i = t.indexOf(".");
    if (i >= 0) name = t.slice(i + 1), t = t.slice(0, i);
    if (t && !types.hasOwnProperty(t)) throw new Error("unknown type: " + t);
    return {type: t, name: name};
  });
}

Dispatch.prototype = dispatch.prototype = {
  constructor: Dispatch,
  on: function(typename, callback) {
    var _ = this._,
        T = parseTypenames(typename + "", _),
        t,
        i = -1,
        n = T.length;

    // If no callback was specified, return the callback of the given type and name.
    if (arguments.length < 2) {
      while (++i < n) if ((t = (typename = T[i]).type) && (t = get(_[t], typename.name))) return t;
      return;
    }

    // If a type was specified, set the callback for the given type and name.
    // Otherwise, if a null callback was specified, remove callbacks of the given name.
    if (callback != null && typeof callback !== "function") throw new Error("invalid callback: " + callback);
    while (++i < n) {
      if (t = (typename = T[i]).type) _[t] = set(_[t], typename.name, callback);
      else if (callback == null) for (t in _) _[t] = set(_[t], typename.name, null);
    }

    return this;
  },
  copy: function() {
    var copy = {}, _ = this._;
    for (var t in _) copy[t] = _[t].slice();
    return new Dispatch(copy);
  },
  call: function(type, that) {
    if ((n = arguments.length - 2) > 0) for (var args = new Array(n), i = 0, n, t; i < n; ++i) args[i] = arguments[i + 2];
    if (!this._.hasOwnProperty(type)) throw new Error("unknown type: " + type);
    for (t = this._[type], i = 0, n = t.length; i < n; ++i) t[i].value.apply(that, args);
  },
  apply: function(type, that, args) {
    if (!this._.hasOwnProperty(type)) throw new Error("unknown type: " + type);
    for (var t = this._[type], i = 0, n = t.length; i < n; ++i) t[i].value.apply(that, args);
  }
};

function get(type, name) {
  for (var i = 0, n = type.length, c; i < n; ++i) {
    if ((c = type[i]).name === name) {
      return c.value;
    }
  }
}

function set(type, name, callback) {
  for (var i = 0, n = type.length; i < n; ++i) {
    if (type[i].name === name) {
      type[i] = noop, type = type.slice(0, i).concat(type.slice(i + 1));
      break;
    }
  }
  if (callback != null) type.push({name: name, value: callback});
  return type;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (dispatch);


/***/ }),

/***/ "./node_modules/d3-ease/src/cubic.js":
/*!*******************************************!*\
  !*** ./node_modules/d3-ease/src/cubic.js ***!
  \*******************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "cubicIn": () => (/* binding */ cubicIn),
/* harmony export */   "cubicOut": () => (/* binding */ cubicOut),
/* harmony export */   "cubicInOut": () => (/* binding */ cubicInOut)
/* harmony export */ });
function cubicIn(t) {
  return t * t * t;
}

function cubicOut(t) {
  return --t * t * t + 1;
}

function cubicInOut(t) {
  return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
}


/***/ }),

/***/ "./node_modules/d3-geo-projection/src/airy.js":
/*!****************************************************!*\
  !*** ./node_modules/d3-geo-projection/src/airy.js ***!
  \****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "airyRaw": () => (/* binding */ airyRaw),
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var d3_geo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! d3-geo */ "./node_modules/d3-geo/src/projection/index.js");
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./math.js */ "./node_modules/d3-geo-projection/src/math.js");



function airyRaw(beta) {
  var tanBeta_2 = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.tan)(beta / 2),
      b = 2 * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.log)((0,_math_js__WEBPACK_IMPORTED_MODULE_0__.cos)(beta / 2)) / (tanBeta_2 * tanBeta_2);

  function forward(x, y) {
    var cosx = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.cos)(x),
        cosy = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.cos)(y),
        siny = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sin)(y),
        cosz = cosy * cosx,
        k = -((1 - cosz ? (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.log)((1 + cosz) / 2) / (1 - cosz) : -0.5) + b / (1 + cosz));
    return [k * cosy * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sin)(x), k * siny];
  }

  forward.invert = function(x, y) {
    var r = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sqrt)(x * x + y * y),
        z = -beta / 2,
        i = 50, delta;
    if (!r) return [0, 0];
    do {
      var z_2 = z / 2,
          cosz_2 = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.cos)(z_2),
          sinz_2 = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sin)(z_2),
          tanz_2 = sinz_2 / cosz_2,
          lnsecz_2 = -(0,_math_js__WEBPACK_IMPORTED_MODULE_0__.log)((0,_math_js__WEBPACK_IMPORTED_MODULE_0__.abs)(cosz_2));
      z -= delta = (2 / tanz_2 * lnsecz_2 - b * tanz_2 - r) / (-lnsecz_2 / (sinz_2 * sinz_2) + 1 - b / (2 * cosz_2 * cosz_2)) * (cosz_2 < 0 ? 0.7 : 1);
    } while ((0,_math_js__WEBPACK_IMPORTED_MODULE_0__.abs)(delta) > _math_js__WEBPACK_IMPORTED_MODULE_0__.epsilon && --i > 0);
    var sinz = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sin)(z);
    return [(0,_math_js__WEBPACK_IMPORTED_MODULE_0__.atan2)(x * sinz, r * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.cos)(z)), (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.asin)(y * sinz / r)];
  };

  return forward;
}

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {
  var beta = _math_js__WEBPACK_IMPORTED_MODULE_0__.halfPi,
      m = (0,d3_geo__WEBPACK_IMPORTED_MODULE_1__.projectionMutator)(airyRaw),
      p = m(beta);

  p.radius = function(_) {
    return arguments.length ? m(beta = _ * _math_js__WEBPACK_IMPORTED_MODULE_0__.radians) : beta * _math_js__WEBPACK_IMPORTED_MODULE_0__.degrees;
  };

  return p
      .scale(179.976)
      .clipAngle(147);
}


/***/ }),

/***/ "./node_modules/d3-geo-projection/src/aitoff.js":
/*!******************************************************!*\
  !*** ./node_modules/d3-geo-projection/src/aitoff.js ***!
  \******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "aitoffRaw": () => (/* binding */ aitoffRaw),
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var d3_geo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! d3-geo */ "./node_modules/d3-geo/src/projection/index.js");
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./math.js */ "./node_modules/d3-geo-projection/src/math.js");



function aitoffRaw(x, y) {
  var cosy = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.cos)(y), sincia = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sinci)((0,_math_js__WEBPACK_IMPORTED_MODULE_0__.acos)(cosy * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.cos)(x /= 2)));
  return [2 * cosy * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sin)(x) * sincia, (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sin)(y) * sincia];
}

// Abort if [x, y] is not within an ellipse centered at [0, 0] with
// semi-major axis pi and semi-minor axis pi/2.
aitoffRaw.invert = function(x, y) {
  if (x * x + 4 * y * y > _math_js__WEBPACK_IMPORTED_MODULE_0__.pi * _math_js__WEBPACK_IMPORTED_MODULE_0__.pi + _math_js__WEBPACK_IMPORTED_MODULE_0__.epsilon) return;
  var x1 = x, y1 = y, i = 25;
  do {
    var sinx = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sin)(x1),
        sinx_2 = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sin)(x1 / 2),
        cosx_2 = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.cos)(x1 / 2),
        siny = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sin)(y1),
        cosy = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.cos)(y1),
        sin_2y = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sin)(2 * y1),
        sin2y = siny * siny,
        cos2y = cosy * cosy,
        sin2x_2 = sinx_2 * sinx_2,
        c = 1 - cos2y * cosx_2 * cosx_2,
        e = c ? (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.acos)(cosy * cosx_2) * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sqrt)(f = 1 / c) : f = 0,
        f,
        fx = 2 * e * cosy * sinx_2 - x,
        fy = e * siny - y,
        dxdx = f * (cos2y * sin2x_2 + e * cosy * cosx_2 * sin2y),
        dxdy = f * (0.5 * sinx * sin_2y - e * 2 * siny * sinx_2),
        dydx = f * 0.25 * (sin_2y * sinx_2 - e * siny * cos2y * sinx),
        dydy = f * (sin2y * cosx_2 + e * sin2x_2 * cosy),
        z = dxdy * dydx - dydy * dxdx;
    if (!z) break;
    var dx = (fy * dxdy - fx * dydy) / z,
        dy = (fx * dydx - fy * dxdx) / z;
    x1 -= dx, y1 -= dy;
  } while (((0,_math_js__WEBPACK_IMPORTED_MODULE_0__.abs)(dx) > _math_js__WEBPACK_IMPORTED_MODULE_0__.epsilon || (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.abs)(dy) > _math_js__WEBPACK_IMPORTED_MODULE_0__.epsilon) && --i > 0);
  return [x1, y1];
};

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {
  return (0,d3_geo__WEBPACK_IMPORTED_MODULE_1__["default"])(aitoffRaw)
      .scale(152.63);
}


/***/ }),

/***/ "./node_modules/d3-geo-projection/src/armadillo.js":
/*!*********************************************************!*\
  !*** ./node_modules/d3-geo-projection/src/armadillo.js ***!
  \*********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "armadilloRaw": () => (/* binding */ armadilloRaw),
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var d3_geo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! d3-geo */ "./node_modules/d3-geo/src/projection/index.js");
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./math.js */ "./node_modules/d3-geo-projection/src/math.js");



function armadilloRaw(phi0) {
  var sinPhi0 = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sin)(phi0),
      cosPhi0 = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.cos)(phi0),
      sPhi0 = phi0 >= 0 ? 1 : -1,
      tanPhi0 = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.tan)(sPhi0 * phi0),
      k = (1 + sinPhi0 - cosPhi0) / 2;

  function forward(lambda, phi) {
    var cosPhi = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.cos)(phi),
        cosLambda = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.cos)(lambda /= 2);
    return [
      (1 + cosPhi) * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sin)(lambda),
      (sPhi0 * phi > -(0,_math_js__WEBPACK_IMPORTED_MODULE_0__.atan2)(cosLambda, tanPhi0) - 1e-3 ? 0 : -sPhi0 * 10) + k + (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sin)(phi) * cosPhi0 - (1 + cosPhi) * sinPhi0 * cosLambda // TODO D3 core should allow null or [NaN, NaN] to be returned.
    ];
  }

  forward.invert = function(x, y) {
    var lambda = 0,
        phi = 0,
        i = 50;
    do {
      var cosLambda = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.cos)(lambda),
          sinLambda = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sin)(lambda),
          cosPhi = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.cos)(phi),
          sinPhi = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sin)(phi),
          A = 1 + cosPhi,
          fx = A * sinLambda - x,
          fy = k + sinPhi * cosPhi0 - A * sinPhi0 * cosLambda - y,
          dxdLambda = A * cosLambda / 2,
          dxdPhi = -sinLambda * sinPhi,
          dydLambda = sinPhi0 * A * sinLambda / 2,
          dydPhi = cosPhi0 * cosPhi + sinPhi0 * cosLambda * sinPhi,
          denominator = dxdPhi * dydLambda - dydPhi * dxdLambda,
          dLambda = (fy * dxdPhi - fx * dydPhi) / denominator / 2,
          dPhi = (fx * dydLambda - fy * dxdLambda) / denominator;
      if ((0,_math_js__WEBPACK_IMPORTED_MODULE_0__.abs)(dPhi) > 2) dPhi /= 2;
      lambda -= dLambda, phi -= dPhi;
    } while (((0,_math_js__WEBPACK_IMPORTED_MODULE_0__.abs)(dLambda) > _math_js__WEBPACK_IMPORTED_MODULE_0__.epsilon || (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.abs)(dPhi) > _math_js__WEBPACK_IMPORTED_MODULE_0__.epsilon) && --i > 0);
    return sPhi0 * phi > -(0,_math_js__WEBPACK_IMPORTED_MODULE_0__.atan2)((0,_math_js__WEBPACK_IMPORTED_MODULE_0__.cos)(lambda), tanPhi0) - 1e-3 ? [lambda * 2, phi] : null;
  };

  return forward;
}

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {
  var phi0 = 20 * _math_js__WEBPACK_IMPORTED_MODULE_0__.radians,
      sPhi0 = phi0 >= 0 ? 1 : -1,
      tanPhi0 = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.tan)(sPhi0 * phi0),
      m = (0,d3_geo__WEBPACK_IMPORTED_MODULE_1__.projectionMutator)(armadilloRaw),
      p = m(phi0),
      stream_ = p.stream;

  p.parallel = function(_) {
    if (!arguments.length) return phi0 * _math_js__WEBPACK_IMPORTED_MODULE_0__.degrees;
    tanPhi0 = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.tan)((sPhi0 = (phi0 = _ * _math_js__WEBPACK_IMPORTED_MODULE_0__.radians) >= 0 ? 1 : -1) * phi0);
    return m(phi0);
  };

  p.stream = function(stream) {
    var rotate = p.rotate(),
        rotateStream = stream_(stream),
        sphereStream = (p.rotate([0, 0]), stream_(stream)),
        precision = p.precision();
    p.rotate(rotate);
    rotateStream.sphere = function() {
      sphereStream.polygonStart(), sphereStream.lineStart();
      for (var lambda = sPhi0 * -180; sPhi0 * lambda < 180; lambda += sPhi0 * 90)
        sphereStream.point(lambda, sPhi0 * 90);
      if (phi0) while (sPhi0 * (lambda -= 3 * sPhi0 * precision) >= -180) {
        sphereStream.point(lambda, sPhi0 * -(0,_math_js__WEBPACK_IMPORTED_MODULE_0__.atan2)((0,_math_js__WEBPACK_IMPORTED_MODULE_0__.cos)(lambda * _math_js__WEBPACK_IMPORTED_MODULE_0__.radians / 2), tanPhi0) * _math_js__WEBPACK_IMPORTED_MODULE_0__.degrees);
      }
      sphereStream.lineEnd(), sphereStream.polygonEnd();
    };
    return rotateStream;
  };

  return p
      .scale(218.695)
      .center([0, 28.0974]);
}


/***/ }),

/***/ "./node_modules/d3-geo-projection/src/august.js":
/*!******************************************************!*\
  !*** ./node_modules/d3-geo-projection/src/august.js ***!
  \******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "augustRaw": () => (/* binding */ augustRaw),
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var d3_geo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! d3-geo */ "./node_modules/d3-geo/src/projection/index.js");
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./math.js */ "./node_modules/d3-geo-projection/src/math.js");



function augustRaw(lambda, phi) {
  var tanPhi = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.tan)(phi / 2),
      k = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sqrt)(1 - tanPhi * tanPhi),
      c = 1 + k * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.cos)(lambda /= 2),
      x = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sin)(lambda) * k / c,
      y = tanPhi / c,
      x2 = x * x,
      y2 = y * y;
  return [
    4 / 3 * x * (3 + x2 - 3 * y2),
    4 / 3 * y * (3 + 3 * x2 - y2)
  ];
}

augustRaw.invert = function(x, y) {
  x *= 3 / 8, y *= 3 / 8;
  if (!x && (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.abs)(y) > 1) return null;
  var x2 = x * x,
      y2 = y * y,
      s = 1 + x2 + y2,
      sin3Eta = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sqrt)((s - (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sqrt)(s * s - 4 * y * y)) / 2),
      eta = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.asin)(sin3Eta) / 3,
      xi = sin3Eta ? (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.arcosh)((0,_math_js__WEBPACK_IMPORTED_MODULE_0__.abs)(y / sin3Eta)) / 3 : (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.arsinh)((0,_math_js__WEBPACK_IMPORTED_MODULE_0__.abs)(x)) / 3,
      cosEta = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.cos)(eta),
      coshXi = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.cosh)(xi),
      d = coshXi * coshXi - cosEta * cosEta;
  return [
    (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sign)(x) * 2 * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.atan2)((0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sinh)(xi) * cosEta, 0.25 - d),
    (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sign)(y) * 2 * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.atan2)(coshXi * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sin)(eta), 0.25 + d)
  ];
};

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {
  return (0,d3_geo__WEBPACK_IMPORTED_MODULE_1__["default"])(augustRaw)
      .scale(66.1603);
}


/***/ }),

/***/ "./node_modules/d3-geo-projection/src/baker.js":
/*!*****************************************************!*\
  !*** ./node_modules/d3-geo-projection/src/baker.js ***!
  \*****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "bakerRaw": () => (/* binding */ bakerRaw),
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var d3_geo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! d3-geo */ "./node_modules/d3-geo/src/projection/index.js");
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./math.js */ "./node_modules/d3-geo-projection/src/math.js");



var sqrt8 = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sqrt)(8),
    phi0 = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.log)(1 + _math_js__WEBPACK_IMPORTED_MODULE_0__.sqrt2);

function bakerRaw(lambda, phi) {
  var phi0 = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.abs)(phi);
  return phi0 < _math_js__WEBPACK_IMPORTED_MODULE_0__.quarterPi
      ? [lambda, (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.log)((0,_math_js__WEBPACK_IMPORTED_MODULE_0__.tan)(_math_js__WEBPACK_IMPORTED_MODULE_0__.quarterPi + phi / 2))]
      : [lambda * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.cos)(phi0) * (2 * _math_js__WEBPACK_IMPORTED_MODULE_0__.sqrt2 - 1 / (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sin)(phi0)), (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sign)(phi) * (2 * _math_js__WEBPACK_IMPORTED_MODULE_0__.sqrt2 * (phi0 - _math_js__WEBPACK_IMPORTED_MODULE_0__.quarterPi) - (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.log)((0,_math_js__WEBPACK_IMPORTED_MODULE_0__.tan)(phi0 / 2)))];
}

bakerRaw.invert = function(x, y) {
  if ((y0 = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.abs)(y)) < phi0) return [x, 2 * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.atan)((0,_math_js__WEBPACK_IMPORTED_MODULE_0__.exp)(y)) - _math_js__WEBPACK_IMPORTED_MODULE_0__.halfPi];
  var phi = _math_js__WEBPACK_IMPORTED_MODULE_0__.quarterPi, i = 25, delta, y0;
  do {
    var cosPhi_2 = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.cos)(phi / 2), tanPhi_2 = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.tan)(phi / 2);
    phi -= delta = (sqrt8 * (phi - _math_js__WEBPACK_IMPORTED_MODULE_0__.quarterPi) - (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.log)(tanPhi_2) - y0) / (sqrt8 - cosPhi_2 * cosPhi_2 / (2 * tanPhi_2));
  } while ((0,_math_js__WEBPACK_IMPORTED_MODULE_0__.abs)(delta) > _math_js__WEBPACK_IMPORTED_MODULE_0__.epsilon2 && --i > 0);
  return [x / ((0,_math_js__WEBPACK_IMPORTED_MODULE_0__.cos)(phi) * (sqrt8 - 1 / (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sin)(phi))), (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sign)(y) * phi];
};

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {
  return (0,d3_geo__WEBPACK_IMPORTED_MODULE_1__["default"])(bakerRaw)
      .scale(112.314);
}


/***/ }),

/***/ "./node_modules/d3-geo-projection/src/berghaus.js":
/*!********************************************************!*\
  !*** ./node_modules/d3-geo-projection/src/berghaus.js ***!
  \********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "berghausRaw": () => (/* binding */ berghausRaw),
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var d3_geo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! d3-geo */ "./node_modules/d3-geo/src/projection/azimuthalEquidistant.js");
/* harmony import */ var d3_geo__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! d3-geo */ "./node_modules/d3-geo/src/projection/index.js");
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./math.js */ "./node_modules/d3-geo-projection/src/math.js");



function berghausRaw(lobes) {
  var k = 2 * _math_js__WEBPACK_IMPORTED_MODULE_0__.pi / lobes;

  function forward(lambda, phi) {
    var p = (0,d3_geo__WEBPACK_IMPORTED_MODULE_1__.azimuthalEquidistantRaw)(lambda, phi);
    if ((0,_math_js__WEBPACK_IMPORTED_MODULE_0__.abs)(lambda) > _math_js__WEBPACK_IMPORTED_MODULE_0__.halfPi) { // back hemisphere
      var theta = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.atan2)(p[1], p[0]),
          r = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sqrt)(p[0] * p[0] + p[1] * p[1]),
          theta0 = k * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.round)((theta - _math_js__WEBPACK_IMPORTED_MODULE_0__.halfPi) / k) + _math_js__WEBPACK_IMPORTED_MODULE_0__.halfPi,
          alpha = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.atan2)((0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sin)(theta -= theta0), 2 - (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.cos)(theta)); // angle relative to lobe end
      theta = theta0 + (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.asin)(_math_js__WEBPACK_IMPORTED_MODULE_0__.pi / r * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sin)(alpha)) - alpha;
      p[0] = r * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.cos)(theta);
      p[1] = r * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sin)(theta);
    }
    return p;
  }

  forward.invert = function(x, y) {
    var r = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sqrt)(x * x + y * y);
    if (r > _math_js__WEBPACK_IMPORTED_MODULE_0__.halfPi) {
      var theta = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.atan2)(y, x),
          theta0 = k * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.round)((theta - _math_js__WEBPACK_IMPORTED_MODULE_0__.halfPi) / k) + _math_js__WEBPACK_IMPORTED_MODULE_0__.halfPi,
          s = theta > theta0 ? -1 : 1,
          A = r * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.cos)(theta0 - theta),
          cotAlpha = 1 / (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.tan)(s * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.acos)((A - _math_js__WEBPACK_IMPORTED_MODULE_0__.pi) / (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sqrt)(_math_js__WEBPACK_IMPORTED_MODULE_0__.pi * (_math_js__WEBPACK_IMPORTED_MODULE_0__.pi - 2 * A) + r * r)));
      theta = theta0 + 2 * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.atan)((cotAlpha + s * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sqrt)(cotAlpha * cotAlpha - 3)) / 3);
      x = r * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.cos)(theta), y = r * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sin)(theta);
    }
    return d3_geo__WEBPACK_IMPORTED_MODULE_1__.azimuthalEquidistantRaw.invert(x, y);
  };

  return forward;
}

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {
  var lobes = 5,
      m = (0,d3_geo__WEBPACK_IMPORTED_MODULE_2__.projectionMutator)(berghausRaw),
      p = m(lobes),
      projectionStream = p.stream,
      epsilon = 1e-2,
      cr = -(0,_math_js__WEBPACK_IMPORTED_MODULE_0__.cos)(epsilon * _math_js__WEBPACK_IMPORTED_MODULE_0__.radians),
      sr = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sin)(epsilon * _math_js__WEBPACK_IMPORTED_MODULE_0__.radians);

  p.lobes = function(_) {
    return arguments.length ? m(lobes = +_) : lobes;
  };

  p.stream = function(stream) {
    var rotate = p.rotate(),
        rotateStream = projectionStream(stream),
        sphereStream = (p.rotate([0, 0]), projectionStream(stream));
    p.rotate(rotate);
    rotateStream.sphere = function() {
      sphereStream.polygonStart(), sphereStream.lineStart();
      for (var i = 0, delta = 360 / lobes, delta0 = 2 * _math_js__WEBPACK_IMPORTED_MODULE_0__.pi / lobes, phi = 90 - 180 / lobes, phi0 = _math_js__WEBPACK_IMPORTED_MODULE_0__.halfPi; i < lobes; ++i, phi -= delta, phi0 -= delta0) {
        sphereStream.point((0,_math_js__WEBPACK_IMPORTED_MODULE_0__.atan2)(sr * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.cos)(phi0), cr) * _math_js__WEBPACK_IMPORTED_MODULE_0__.degrees, (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.asin)(sr * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sin)(phi0)) * _math_js__WEBPACK_IMPORTED_MODULE_0__.degrees);
        if (phi < -90) {
          sphereStream.point(-90, -180 - phi - epsilon);
          sphereStream.point(-90, -180 - phi + epsilon);
        } else {
          sphereStream.point(90, phi + epsilon);
          sphereStream.point(90, phi - epsilon);
        }
      }
      sphereStream.lineEnd(), sphereStream.polygonEnd();
    };
    return rotateStream;
  };

  return p
      .scale(87.8076)
      .center([0, 17.1875])
      .clipAngle(180 - 1e-3);
}


/***/ }),

/***/ "./node_modules/d3-geo-projection/src/bertin.js":
/*!******************************************************!*\
  !*** ./node_modules/d3-geo-projection/src/bertin.js ***!
  \******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "bertin1953Raw": () => (/* binding */ bertin1953Raw),
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var d3_geo__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! d3-geo */ "./node_modules/d3-geo/src/projection/index.js");
/* harmony import */ var _hammer_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./hammer.js */ "./node_modules/d3-geo-projection/src/hammer.js");
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./math.js */ "./node_modules/d3-geo-projection/src/math.js");
/* harmony import */ var _newton_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./newton.js */ "./node_modules/d3-geo-projection/src/newton.js");





// Bertin 1953 as a modified Briesemeister
// https://bl.ocks.org/Fil/5b9ee9636dfb6ffa53443c9006beb642
function bertin1953Raw() {
  var hammer = (0,_hammer_js__WEBPACK_IMPORTED_MODULE_0__.hammerRaw)(1.68, 2),
      fu = 1.4, k = 12;

  function forward(lambda, phi) {

    if (lambda + phi < -fu) {
      var u = (lambda - phi + 1.6) * (lambda + phi + fu) / 8;
      lambda += u;
      phi -= 0.8 * u * (0,_math_js__WEBPACK_IMPORTED_MODULE_1__.sin)(phi + _math_js__WEBPACK_IMPORTED_MODULE_1__.pi / 2);
    }

    var r = hammer(lambda, phi);

    var d = (1 - (0,_math_js__WEBPACK_IMPORTED_MODULE_1__.cos)(lambda * phi)) / k;

    if (r[1] < 0) {
      r[0] *= 1 + d;
    }
    if (r[1] > 0) {
      r[1] *= 1 + d / 1.5 * r[0] * r[0];
    }

    return r;
  }
  
  forward.invert = (0,_newton_js__WEBPACK_IMPORTED_MODULE_2__.solve2d)(forward);
  return forward;
}

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {
  // this projection should not be rotated
  return (0,d3_geo__WEBPACK_IMPORTED_MODULE_3__["default"])(bertin1953Raw())
    .rotate([-16.5, -42])
    .scale(176.57)
    .center([7.93, 0.09]);
}


/***/ }),

/***/ "./node_modules/d3-geo-projection/src/boggs.js":
/*!*****************************************************!*\
  !*** ./node_modules/d3-geo-projection/src/boggs.js ***!
  \*****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "boggsRaw": () => (/* binding */ boggsRaw),
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var d3_geo__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! d3-geo */ "./node_modules/d3-geo/src/projection/index.js");
/* harmony import */ var _mollweide_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./mollweide.js */ "./node_modules/d3-geo-projection/src/mollweide.js");
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./math.js */ "./node_modules/d3-geo-projection/src/math.js");




var k = 2.00276,
    w = 1.11072;

function boggsRaw(lambda, phi) {
  var theta = (0,_mollweide_js__WEBPACK_IMPORTED_MODULE_0__.mollweideBromleyTheta)(_math_js__WEBPACK_IMPORTED_MODULE_1__.pi, phi);
  return [k * lambda / (1 / (0,_math_js__WEBPACK_IMPORTED_MODULE_1__.cos)(phi) + w / (0,_math_js__WEBPACK_IMPORTED_MODULE_1__.cos)(theta)), (phi + _math_js__WEBPACK_IMPORTED_MODULE_1__.sqrt2 * (0,_math_js__WEBPACK_IMPORTED_MODULE_1__.sin)(theta)) / k];
}

boggsRaw.invert = function(x, y) {
  var ky = k * y, theta = y < 0 ? -_math_js__WEBPACK_IMPORTED_MODULE_1__.quarterPi : _math_js__WEBPACK_IMPORTED_MODULE_1__.quarterPi, i = 25, delta, phi;
  do {
    phi = ky - _math_js__WEBPACK_IMPORTED_MODULE_1__.sqrt2 * (0,_math_js__WEBPACK_IMPORTED_MODULE_1__.sin)(theta);
    theta -= delta = ((0,_math_js__WEBPACK_IMPORTED_MODULE_1__.sin)(2 * theta) + 2 * theta - _math_js__WEBPACK_IMPORTED_MODULE_1__.pi * (0,_math_js__WEBPACK_IMPORTED_MODULE_1__.sin)(phi)) / (2 * (0,_math_js__WEBPACK_IMPORTED_MODULE_1__.cos)(2 * theta) + 2 + _math_js__WEBPACK_IMPORTED_MODULE_1__.pi * (0,_math_js__WEBPACK_IMPORTED_MODULE_1__.cos)(phi) * _math_js__WEBPACK_IMPORTED_MODULE_1__.sqrt2 * (0,_math_js__WEBPACK_IMPORTED_MODULE_1__.cos)(theta));
  } while ((0,_math_js__WEBPACK_IMPORTED_MODULE_1__.abs)(delta) > _math_js__WEBPACK_IMPORTED_MODULE_1__.epsilon && --i > 0);
  phi = ky - _math_js__WEBPACK_IMPORTED_MODULE_1__.sqrt2 * (0,_math_js__WEBPACK_IMPORTED_MODULE_1__.sin)(theta);
  return [x * (1 / (0,_math_js__WEBPACK_IMPORTED_MODULE_1__.cos)(phi) + w / (0,_math_js__WEBPACK_IMPORTED_MODULE_1__.cos)(theta)) / k, phi];
};

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {
  return (0,d3_geo__WEBPACK_IMPORTED_MODULE_2__["default"])(boggsRaw)
      .scale(160.857);
}


/***/ }),

/***/ "./node_modules/d3-geo-projection/src/bonne.js":
/*!*****************************************************!*\
  !*** ./node_modules/d3-geo-projection/src/bonne.js ***!
  \*****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "bonneRaw": () => (/* binding */ bonneRaw),
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _parallel1_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./parallel1.js */ "./node_modules/d3-geo-projection/src/parallel1.js");
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./math.js */ "./node_modules/d3-geo-projection/src/math.js");
/* harmony import */ var _sinusoidal_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./sinusoidal.js */ "./node_modules/d3-geo-projection/src/sinusoidal.js");




function bonneRaw(phi0) {
  if (!phi0) return _sinusoidal_js__WEBPACK_IMPORTED_MODULE_0__.sinusoidalRaw;
  var cotPhi0 = 1 / (0,_math_js__WEBPACK_IMPORTED_MODULE_1__.tan)(phi0);

  function forward(lambda, phi) {
    var rho = cotPhi0 + phi0 - phi,
        e = rho ? lambda * (0,_math_js__WEBPACK_IMPORTED_MODULE_1__.cos)(phi) / rho : rho;
    return [rho * (0,_math_js__WEBPACK_IMPORTED_MODULE_1__.sin)(e), cotPhi0 - rho * (0,_math_js__WEBPACK_IMPORTED_MODULE_1__.cos)(e)];
  }

  forward.invert = function(x, y) {
    var rho = (0,_math_js__WEBPACK_IMPORTED_MODULE_1__.sqrt)(x * x + (y = cotPhi0 - y) * y),
        phi = cotPhi0 + phi0 - rho;
    return [rho / (0,_math_js__WEBPACK_IMPORTED_MODULE_1__.cos)(phi) * (0,_math_js__WEBPACK_IMPORTED_MODULE_1__.atan2)(x, y), phi];
  };

  return forward;
}

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {
  return (0,_parallel1_js__WEBPACK_IMPORTED_MODULE_2__["default"])(bonneRaw)
      .scale(123.082)
      .center([0, 26.1441])
      .parallel(45);
}


/***/ }),

/***/ "./node_modules/d3-geo-projection/src/bottomley.js":
/*!*********************************************************!*\
  !*** ./node_modules/d3-geo-projection/src/bottomley.js ***!
  \*********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "bottomleyRaw": () => (/* binding */ bottomleyRaw),
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var d3_geo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! d3-geo */ "./node_modules/d3-geo/src/projection/index.js");
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./math.js */ "./node_modules/d3-geo-projection/src/math.js");



function bottomleyRaw(sinPsi) {

  function forward(lambda, phi) {
    var rho = _math_js__WEBPACK_IMPORTED_MODULE_0__.halfPi - phi,
        eta = rho ? lambda * sinPsi * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sin)(rho) / rho : rho;
    return [rho * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sin)(eta) / sinPsi, _math_js__WEBPACK_IMPORTED_MODULE_0__.halfPi - rho * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.cos)(eta)];
  }

  forward.invert = function(x, y) {
    var x1 = x * sinPsi,
        y1 = _math_js__WEBPACK_IMPORTED_MODULE_0__.halfPi - y,
        rho = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sqrt)(x1 * x1 + y1 * y1),
        eta = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.atan2)(x1, y1);
    return [(rho ? rho / (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sin)(rho) : 1) * eta / sinPsi, _math_js__WEBPACK_IMPORTED_MODULE_0__.halfPi - rho];
  };

  return forward;
}

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {
  var sinPsi = 0.5,
      m = (0,d3_geo__WEBPACK_IMPORTED_MODULE_1__.projectionMutator)(bottomleyRaw),
      p = m(sinPsi);

  p.fraction = function(_) {
    return arguments.length ? m(sinPsi = +_) : sinPsi;
  };

  return p
      .scale(158.837);
}


/***/ }),

/***/ "./node_modules/d3-geo-projection/src/bromley.js":
/*!*******************************************************!*\
  !*** ./node_modules/d3-geo-projection/src/bromley.js ***!
  \*******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "bromleyRaw": () => (/* binding */ bromleyRaw),
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var d3_geo__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! d3-geo */ "./node_modules/d3-geo/src/projection/index.js");
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./math.js */ "./node_modules/d3-geo-projection/src/math.js");
/* harmony import */ var _mollweide_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./mollweide.js */ "./node_modules/d3-geo-projection/src/mollweide.js");




var bromleyRaw = (0,_mollweide_js__WEBPACK_IMPORTED_MODULE_0__.mollweideBromleyRaw)(1, 4 / _math_js__WEBPACK_IMPORTED_MODULE_1__.pi, _math_js__WEBPACK_IMPORTED_MODULE_1__.pi);

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {
  return (0,d3_geo__WEBPACK_IMPORTED_MODULE_2__["default"])(bromleyRaw)
      .scale(152.63);
}


/***/ }),

/***/ "./node_modules/d3-geo-projection/src/chamberlin.js":
/*!**********************************************************!*\
  !*** ./node_modules/d3-geo-projection/src/chamberlin.js ***!
  \**********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "chamberlinRaw": () => (/* binding */ chamberlinRaw),
/* harmony export */   "chamberlinAfrica": () => (/* binding */ chamberlinAfrica),
/* harmony export */   "default": () => (/* binding */ chamberlin)
/* harmony export */ });
/* harmony import */ var d3_geo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! d3-geo */ "./node_modules/d3-geo/src/centroid.js");
/* harmony import */ var d3_geo__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! d3-geo */ "./node_modules/d3-geo/src/rotation.js");
/* harmony import */ var d3_geo__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! d3-geo */ "./node_modules/d3-geo/src/projection/index.js");
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./math.js */ "./node_modules/d3-geo-projection/src/math.js");
/* harmony import */ var _newton_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./newton.js */ "./node_modules/d3-geo-projection/src/newton.js");




// Azimuthal distance.
function distance(dPhi, c1, s1, c2, s2, dLambda) {
  var cosdLambda = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.cos)(dLambda), r;
  if ((0,_math_js__WEBPACK_IMPORTED_MODULE_0__.abs)(dPhi) > 1 || (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.abs)(dLambda) > 1) {
    r = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.acos)(s1 * s2 + c1 * c2 * cosdLambda);
  } else {
    var sindPhi = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sin)(dPhi / 2), sindLambda = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sin)(dLambda / 2);
    r = 2 * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.asin)((0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sqrt)(sindPhi * sindPhi + c1 * c2 * sindLambda * sindLambda));
  }
  return (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.abs)(r) > _math_js__WEBPACK_IMPORTED_MODULE_0__.epsilon ? [r, (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.atan2)(c2 * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sin)(dLambda), c1 * s2 - s1 * c2 * cosdLambda)] : [0, 0];
}

// Angle opposite a, and contained between sides of lengths b and c.
function angle(b, c, a) {
  return (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.acos)((b * b + c * c - a * a) / (2 * b * c));
}

// Normalize longitude.
function longitude(lambda) {
  return lambda - 2 * _math_js__WEBPACK_IMPORTED_MODULE_0__.pi * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.floor)((lambda + _math_js__WEBPACK_IMPORTED_MODULE_0__.pi) / (2 * _math_js__WEBPACK_IMPORTED_MODULE_0__.pi));
}

function chamberlinRaw(p0, p1, p2) {
  var points = [
    [p0[0], p0[1], (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sin)(p0[1]), (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.cos)(p0[1])],
    [p1[0], p1[1], (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sin)(p1[1]), (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.cos)(p1[1])],
    [p2[0], p2[1], (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sin)(p2[1]), (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.cos)(p2[1])]
  ];

  for (var a = points[2], b, i = 0; i < 3; ++i, a = b) {
    b = points[i];
    a.v = distance(b[1] - a[1], a[3], a[2], b[3], b[2], b[0] - a[0]);
    a.point = [0, 0];
  }

  var beta0 = angle(points[0].v[0], points[2].v[0], points[1].v[0]),
      beta1 = angle(points[0].v[0], points[1].v[0], points[2].v[0]),
      beta2 = _math_js__WEBPACK_IMPORTED_MODULE_0__.pi - beta0;

  points[2].point[1] = 0;
  points[0].point[0] = -(points[1].point[0] = points[0].v[0] / 2);

  var mean = [
    points[2].point[0] = points[0].point[0] + points[2].v[0] * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.cos)(beta0),
    2 * (points[0].point[1] = points[1].point[1] = points[2].v[0] * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sin)(beta0))
  ];

  function forward(lambda, phi) {
    var sinPhi = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sin)(phi),
        cosPhi = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.cos)(phi),
        v = new Array(3), i;

    // Compute distance and azimuth from control points.
    for (i = 0; i < 3; ++i) {
      var p = points[i];
      v[i] = distance(phi - p[1], p[3], p[2], cosPhi, sinPhi, lambda - p[0]);
      if (!v[i][0]) return p.point;
      v[i][1] = longitude(v[i][1] - p.v[1]);
    }

    // Arithmetic mean of interception points.
    var point = mean.slice();
    for (i = 0; i < 3; ++i) {
      var j = i == 2 ? 0 : i + 1;
      var a = angle(points[i].v[0], v[i][0], v[j][0]);
      if (v[i][1] < 0) a = -a;

      if (!i) {
        point[0] += v[i][0] * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.cos)(a);
        point[1] -= v[i][0] * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sin)(a);
      } else if (i == 1) {
        a = beta1 - a;
        point[0] -= v[i][0] * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.cos)(a);
        point[1] -= v[i][0] * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sin)(a);
      } else {
        a = beta2 - a;
        point[0] += v[i][0] * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.cos)(a);
        point[1] += v[i][0] * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sin)(a);
      }
    }

    point[0] /= 3, point[1] /= 3;
    return point;
  }

  return forward;
}

function pointRadians(p) {
  return p[0] *= _math_js__WEBPACK_IMPORTED_MODULE_0__.radians, p[1] *= _math_js__WEBPACK_IMPORTED_MODULE_0__.radians, p;
}

function chamberlinAfrica() {
  return chamberlin([0, 22], [45, 22], [22.5, -22])
      .scale(380)
      .center([22.5, 2]);
}

function chamberlin(p0, p1, p2) { // TODO order matters!
  var c = (0,d3_geo__WEBPACK_IMPORTED_MODULE_1__["default"])({type: "MultiPoint", coordinates: [p0, p1, p2]}),
      R = [-c[0], -c[1]],
      r = (0,d3_geo__WEBPACK_IMPORTED_MODULE_2__["default"])(R),
      f = chamberlinRaw(pointRadians(r(p0)), pointRadians(r(p1)), pointRadians(r(p2)));
  f.invert = (0,_newton_js__WEBPACK_IMPORTED_MODULE_3__.solve2d)(f);
  var p = (0,d3_geo__WEBPACK_IMPORTED_MODULE_4__["default"])(f).rotate(R),
      center = p.center;

  delete p.rotate;

  p.center = function(_) {
    return arguments.length ? center(r(_)) : r.invert(center());
  };

  return p
      .clipAngle(90);
}


/***/ }),

/***/ "./node_modules/d3-geo-projection/src/collignon.js":
/*!*********************************************************!*\
  !*** ./node_modules/d3-geo-projection/src/collignon.js ***!
  \*********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "collignonRaw": () => (/* binding */ collignonRaw),
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var d3_geo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! d3-geo */ "./node_modules/d3-geo/src/projection/index.js");
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./math.js */ "./node_modules/d3-geo-projection/src/math.js");



function collignonRaw(lambda, phi) {
  var alpha = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sqrt)(1 - (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sin)(phi));
  return [(2 / _math_js__WEBPACK_IMPORTED_MODULE_0__.sqrtPi) * lambda * alpha, _math_js__WEBPACK_IMPORTED_MODULE_0__.sqrtPi * (1 - alpha)];
}

collignonRaw.invert = function(x, y) {
  var lambda = (lambda = y / _math_js__WEBPACK_IMPORTED_MODULE_0__.sqrtPi - 1) * lambda;
  return [lambda > 0 ? x * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sqrt)(_math_js__WEBPACK_IMPORTED_MODULE_0__.pi / lambda) / 2 : 0, (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.asin)(1 - lambda)];
};

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {
  return (0,d3_geo__WEBPACK_IMPORTED_MODULE_1__["default"])(collignonRaw)
      .scale(95.6464)
      .center([0, 30]);
}


/***/ }),

/***/ "./node_modules/d3-geo-projection/src/craig.js":
/*!*****************************************************!*\
  !*** ./node_modules/d3-geo-projection/src/craig.js ***!
  \*****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "craigRaw": () => (/* binding */ craigRaw),
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./math.js */ "./node_modules/d3-geo-projection/src/math.js");
/* harmony import */ var _parallel1_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./parallel1.js */ "./node_modules/d3-geo-projection/src/parallel1.js");



function craigRaw(phi0) {
  var tanPhi0 = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.tan)(phi0);

  function forward(lambda, phi) {
    return [lambda, (lambda ? lambda / (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sin)(lambda) : 1) * ((0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sin)(phi) * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.cos)(lambda) - tanPhi0 * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.cos)(phi))];
  }

  forward.invert = tanPhi0 ? function(x, y) {
    if (x) y *= (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sin)(x) / x;
    var cosLambda = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.cos)(x);
    return [x, 2 * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.atan2)((0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sqrt)(cosLambda * cosLambda + tanPhi0 * tanPhi0 - y * y) - cosLambda, tanPhi0 - y)];
  } : function(x, y) {
    return [x, (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.asin)(x ? y * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.tan)(x) / x : y)];
  };

  return forward;
}

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {
  return (0,_parallel1_js__WEBPACK_IMPORTED_MODULE_1__["default"])(craigRaw)
      .scale(249.828)
      .clipAngle(90);
}


/***/ }),

/***/ "./node_modules/d3-geo-projection/src/craster.js":
/*!*******************************************************!*\
  !*** ./node_modules/d3-geo-projection/src/craster.js ***!
  \*******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "crasterRaw": () => (/* binding */ crasterRaw),
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var d3_geo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! d3-geo */ "./node_modules/d3-geo/src/projection/index.js");
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./math.js */ "./node_modules/d3-geo-projection/src/math.js");



var sqrt3 = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sqrt)(3);

function crasterRaw(lambda, phi) {
  return [sqrt3 * lambda * (2 * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.cos)(2 * phi / 3) - 1) / _math_js__WEBPACK_IMPORTED_MODULE_0__.sqrtPi, sqrt3 * _math_js__WEBPACK_IMPORTED_MODULE_0__.sqrtPi * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sin)(phi / 3)];
}

crasterRaw.invert = function(x, y) {
  var phi = 3 * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.asin)(y / (sqrt3 * _math_js__WEBPACK_IMPORTED_MODULE_0__.sqrtPi));
  return [_math_js__WEBPACK_IMPORTED_MODULE_0__.sqrtPi * x / (sqrt3 * (2 * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.cos)(2 * phi / 3) - 1)), phi];
};

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {
  return (0,d3_geo__WEBPACK_IMPORTED_MODULE_1__["default"])(crasterRaw)
      .scale(156.19);
}


/***/ }),

/***/ "./node_modules/d3-geo-projection/src/cylindricalEqualArea.js":
/*!********************************************************************!*\
  !*** ./node_modules/d3-geo-projection/src/cylindricalEqualArea.js ***!
  \********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "cylindricalEqualAreaRaw": () => (/* binding */ cylindricalEqualAreaRaw),
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./math.js */ "./node_modules/d3-geo-projection/src/math.js");
/* harmony import */ var _parallel1_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./parallel1.js */ "./node_modules/d3-geo-projection/src/parallel1.js");



function cylindricalEqualAreaRaw(phi0) {
  var cosPhi0 = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.cos)(phi0);

  function forward(lambda, phi) {
    return [lambda * cosPhi0, (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sin)(phi) / cosPhi0];
  }

  forward.invert = function(x, y) {
    return [x / cosPhi0, (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.asin)(y * cosPhi0)];
  };

  return forward;
}

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {
  return (0,_parallel1_js__WEBPACK_IMPORTED_MODULE_1__["default"])(cylindricalEqualAreaRaw)
      .parallel(38.58) // acos(sqrt(width / height / pi)) * radians
      .scale(195.044); // width / (sqrt(width / height / pi) * 2 * pi)
}


/***/ }),

/***/ "./node_modules/d3-geo-projection/src/cylindricalStereographic.js":
/*!************************************************************************!*\
  !*** ./node_modules/d3-geo-projection/src/cylindricalStereographic.js ***!
  \************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "cylindricalStereographicRaw": () => (/* binding */ cylindricalStereographicRaw),
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./math.js */ "./node_modules/d3-geo-projection/src/math.js");
/* harmony import */ var _parallel1_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./parallel1.js */ "./node_modules/d3-geo-projection/src/parallel1.js");



function cylindricalStereographicRaw(phi0) {
  var cosPhi0 = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.cos)(phi0);

  function forward(lambda, phi) {
    return [lambda * cosPhi0, (1 + cosPhi0) * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.tan)(phi / 2)];
  }

  forward.invert = function(x, y) {
    return [x / cosPhi0, (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.atan)(y / (1 + cosPhi0)) * 2];
  };

  return forward;
}

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {
  return (0,_parallel1_js__WEBPACK_IMPORTED_MODULE_1__["default"])(cylindricalStereographicRaw)
      .scale(124.75);
}


/***/ }),

/***/ "./node_modules/d3-geo-projection/src/eckert1.js":
/*!*******************************************************!*\
  !*** ./node_modules/d3-geo-projection/src/eckert1.js ***!
  \*******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "eckert1Raw": () => (/* binding */ eckert1Raw),
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var d3_geo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! d3-geo */ "./node_modules/d3-geo/src/projection/index.js");
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./math.js */ "./node_modules/d3-geo-projection/src/math.js");



function eckert1Raw(lambda, phi) {
  var alpha = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sqrt)(8 / (3 * _math_js__WEBPACK_IMPORTED_MODULE_0__.pi));
  return [
    alpha * lambda * (1 - (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.abs)(phi) / _math_js__WEBPACK_IMPORTED_MODULE_0__.pi),
    alpha * phi
  ];
}

eckert1Raw.invert = function(x, y) {
  var alpha = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sqrt)(8 / (3 * _math_js__WEBPACK_IMPORTED_MODULE_0__.pi)),
      phi = y / alpha;
  return [
    x / (alpha * (1 - (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.abs)(phi) / _math_js__WEBPACK_IMPORTED_MODULE_0__.pi)),
    phi
  ];
};

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {
  return (0,d3_geo__WEBPACK_IMPORTED_MODULE_1__["default"])(eckert1Raw)
      .scale(165.664);
}


/***/ }),

/***/ "./node_modules/d3-geo-projection/src/eckert2.js":
/*!*******************************************************!*\
  !*** ./node_modules/d3-geo-projection/src/eckert2.js ***!
  \*******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "eckert2Raw": () => (/* binding */ eckert2Raw),
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var d3_geo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! d3-geo */ "./node_modules/d3-geo/src/projection/index.js");
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./math.js */ "./node_modules/d3-geo-projection/src/math.js");



function eckert2Raw(lambda, phi) {
  var alpha = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sqrt)(4 - 3 * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sin)((0,_math_js__WEBPACK_IMPORTED_MODULE_0__.abs)(phi)));
  return [
    2 / (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sqrt)(6 * _math_js__WEBPACK_IMPORTED_MODULE_0__.pi) * lambda * alpha,
    (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sign)(phi) * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sqrt)(2 * _math_js__WEBPACK_IMPORTED_MODULE_0__.pi / 3) * (2 - alpha)
  ];
}

eckert2Raw.invert = function(x, y) {
  var alpha = 2 - (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.abs)(y) / (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sqrt)(2 * _math_js__WEBPACK_IMPORTED_MODULE_0__.pi / 3);
  return [
    x * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sqrt)(6 * _math_js__WEBPACK_IMPORTED_MODULE_0__.pi) / (2 * alpha),
    (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sign)(y) * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.asin)((4 - alpha * alpha) / 3)
  ];
};

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {
  return (0,d3_geo__WEBPACK_IMPORTED_MODULE_1__["default"])(eckert2Raw)
      .scale(165.664);
}


/***/ }),

/***/ "./node_modules/d3-geo-projection/src/eckert3.js":
/*!*******************************************************!*\
  !*** ./node_modules/d3-geo-projection/src/eckert3.js ***!
  \*******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "eckert3Raw": () => (/* binding */ eckert3Raw),
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var d3_geo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! d3-geo */ "./node_modules/d3-geo/src/projection/index.js");
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./math.js */ "./node_modules/d3-geo-projection/src/math.js");



function eckert3Raw(lambda, phi) {
  var k = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sqrt)(_math_js__WEBPACK_IMPORTED_MODULE_0__.pi * (4 + _math_js__WEBPACK_IMPORTED_MODULE_0__.pi));
  return [
    2 / k * lambda * (1 + (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sqrt)(1 - 4 * phi * phi / (_math_js__WEBPACK_IMPORTED_MODULE_0__.pi * _math_js__WEBPACK_IMPORTED_MODULE_0__.pi))),
    4 / k * phi
  ];
}

eckert3Raw.invert = function(x, y) {
  var k = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sqrt)(_math_js__WEBPACK_IMPORTED_MODULE_0__.pi * (4 + _math_js__WEBPACK_IMPORTED_MODULE_0__.pi)) / 2;
  return [
    x * k / (1 + (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sqrt)(1 - y * y * (4 + _math_js__WEBPACK_IMPORTED_MODULE_0__.pi) / (4 * _math_js__WEBPACK_IMPORTED_MODULE_0__.pi))),
    y * k / 2
  ];
};

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {
  return (0,d3_geo__WEBPACK_IMPORTED_MODULE_1__["default"])(eckert3Raw)
      .scale(180.739);
}


/***/ }),

/***/ "./node_modules/d3-geo-projection/src/eckert4.js":
/*!*******************************************************!*\
  !*** ./node_modules/d3-geo-projection/src/eckert4.js ***!
  \*******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "eckert4Raw": () => (/* binding */ eckert4Raw),
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var d3_geo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! d3-geo */ "./node_modules/d3-geo/src/projection/index.js");
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./math.js */ "./node_modules/d3-geo-projection/src/math.js");



function eckert4Raw(lambda, phi) {
  var k = (2 + _math_js__WEBPACK_IMPORTED_MODULE_0__.halfPi) * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sin)(phi);
  phi /= 2;
  for (var i = 0, delta = Infinity; i < 10 && (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.abs)(delta) > _math_js__WEBPACK_IMPORTED_MODULE_0__.epsilon; i++) {
    var cosPhi = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.cos)(phi);
    phi -= delta = (phi + (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sin)(phi) * (cosPhi + 2) - k) / (2 * cosPhi * (1 + cosPhi));
  }
  return [
    2 / (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sqrt)(_math_js__WEBPACK_IMPORTED_MODULE_0__.pi * (4 + _math_js__WEBPACK_IMPORTED_MODULE_0__.pi)) * lambda * (1 + (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.cos)(phi)),
    2 * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sqrt)(_math_js__WEBPACK_IMPORTED_MODULE_0__.pi / (4 + _math_js__WEBPACK_IMPORTED_MODULE_0__.pi)) * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sin)(phi)
  ];
}

eckert4Raw.invert = function(x, y) {
  var A = y * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sqrt)((4 + _math_js__WEBPACK_IMPORTED_MODULE_0__.pi) / _math_js__WEBPACK_IMPORTED_MODULE_0__.pi) / 2,
      k = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.asin)(A),
      c = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.cos)(k);
  return [
    x / (2 / (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sqrt)(_math_js__WEBPACK_IMPORTED_MODULE_0__.pi * (4 + _math_js__WEBPACK_IMPORTED_MODULE_0__.pi)) * (1 + c)),
    (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.asin)((k + A * (c + 2)) / (2 + _math_js__WEBPACK_IMPORTED_MODULE_0__.halfPi))
  ];
};

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {
  return (0,d3_geo__WEBPACK_IMPORTED_MODULE_1__["default"])(eckert4Raw)
      .scale(180.739);
}


/***/ }),

/***/ "./node_modules/d3-geo-projection/src/eckert5.js":
/*!*******************************************************!*\
  !*** ./node_modules/d3-geo-projection/src/eckert5.js ***!
  \*******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "eckert5Raw": () => (/* binding */ eckert5Raw),
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var d3_geo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! d3-geo */ "./node_modules/d3-geo/src/projection/index.js");
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./math.js */ "./node_modules/d3-geo-projection/src/math.js");



function eckert5Raw(lambda, phi) {
  return [
    lambda * (1 + (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.cos)(phi)) / (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sqrt)(2 + _math_js__WEBPACK_IMPORTED_MODULE_0__.pi),
    2 * phi / (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sqrt)(2 + _math_js__WEBPACK_IMPORTED_MODULE_0__.pi)
  ];
}

eckert5Raw.invert = function(x, y) {
  var k = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sqrt)(2 + _math_js__WEBPACK_IMPORTED_MODULE_0__.pi),
      phi = y * k / 2;
  return [
    k * x / (1 + (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.cos)(phi)),
    phi
  ];
};

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {
  return (0,d3_geo__WEBPACK_IMPORTED_MODULE_1__["default"])(eckert5Raw)
      .scale(173.044);
}


/***/ }),

/***/ "./node_modules/d3-geo-projection/src/eckert6.js":
/*!*******************************************************!*\
  !*** ./node_modules/d3-geo-projection/src/eckert6.js ***!
  \*******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "eckert6Raw": () => (/* binding */ eckert6Raw),
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var d3_geo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! d3-geo */ "./node_modules/d3-geo/src/projection/index.js");
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./math.js */ "./node_modules/d3-geo-projection/src/math.js");



function eckert6Raw(lambda, phi) {
  var k = (1 + _math_js__WEBPACK_IMPORTED_MODULE_0__.halfPi) * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sin)(phi);
  for (var i = 0, delta = Infinity; i < 10 && (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.abs)(delta) > _math_js__WEBPACK_IMPORTED_MODULE_0__.epsilon; i++) {
    phi -= delta = (phi + (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sin)(phi) - k) / (1 + (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.cos)(phi));
  }
  k = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sqrt)(2 + _math_js__WEBPACK_IMPORTED_MODULE_0__.pi);
  return [
    lambda * (1 + (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.cos)(phi)) / k,
    2 * phi / k
  ];
}

eckert6Raw.invert = function(x, y) {
  var j = 1 + _math_js__WEBPACK_IMPORTED_MODULE_0__.halfPi,
      k = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sqrt)(j / 2);
  return [
    x * 2 * k / (1 + (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.cos)(y *= k)),
    (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.asin)((y + (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sin)(y)) / j)
  ];
};

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {
  return (0,d3_geo__WEBPACK_IMPORTED_MODULE_1__["default"])(eckert6Raw)
      .scale(173.044);
}


/***/ }),

/***/ "./node_modules/d3-geo-projection/src/eisenlohr.js":
/*!*********************************************************!*\
  !*** ./node_modules/d3-geo-projection/src/eisenlohr.js ***!
  \*********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "eisenlohrRaw": () => (/* binding */ eisenlohrRaw),
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var d3_geo__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! d3-geo */ "./node_modules/d3-geo/src/projection/index.js");
/* harmony import */ var _august_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./august.js */ "./node_modules/d3-geo-projection/src/august.js");
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./math.js */ "./node_modules/d3-geo-projection/src/math.js");




var eisenlohrK = 3 + 2 * _math_js__WEBPACK_IMPORTED_MODULE_0__.sqrt2;

function eisenlohrRaw(lambda, phi) {
  var s0 = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sin)(lambda /= 2),
      c0 = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.cos)(lambda),
      k = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sqrt)((0,_math_js__WEBPACK_IMPORTED_MODULE_0__.cos)(phi)),
      c1 = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.cos)(phi /= 2),
      t = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sin)(phi) / (c1 + _math_js__WEBPACK_IMPORTED_MODULE_0__.sqrt2 * c0 * k),
      c = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sqrt)(2 / (1 + t * t)),
      v = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sqrt)((_math_js__WEBPACK_IMPORTED_MODULE_0__.sqrt2 * c1 + (c0 + s0) * k) / (_math_js__WEBPACK_IMPORTED_MODULE_0__.sqrt2 * c1 + (c0 - s0) * k));
  return [
    eisenlohrK * (c * (v - 1 / v) - 2 * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.log)(v)),
    eisenlohrK * (c * t * (v + 1 / v) - 2 * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.atan)(t))
  ];
}

eisenlohrRaw.invert = function(x, y) {
  if (!(p = _august_js__WEBPACK_IMPORTED_MODULE_1__.augustRaw.invert(x / 1.2, y * 1.065))) return null;
  var lambda = p[0], phi = p[1], i = 20, p;
  x /= eisenlohrK, y /= eisenlohrK;
  do {
    var _0 = lambda / 2,
        _1 = phi / 2,
        s0 = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sin)(_0),
        c0 = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.cos)(_0),
        s1 = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sin)(_1),
        c1 = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.cos)(_1),
        cos1 = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.cos)(phi),
        k = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sqrt)(cos1),
        t = s1 / (c1 + _math_js__WEBPACK_IMPORTED_MODULE_0__.sqrt2 * c0 * k),
        t2 = t * t,
        c = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sqrt)(2 / (1 + t2)),
        v0 = (_math_js__WEBPACK_IMPORTED_MODULE_0__.sqrt2 * c1 + (c0 + s0) * k),
        v1 = (_math_js__WEBPACK_IMPORTED_MODULE_0__.sqrt2 * c1 + (c0 - s0) * k),
        v2 = v0 / v1,
        v = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sqrt)(v2),
        vm1v = v - 1 / v,
        vp1v = v + 1 / v,
        fx = c * vm1v - 2 * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.log)(v) - x,
        fy = c * t * vp1v - 2 * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.atan)(t) - y,
        deltatDeltaLambda = s1 && _math_js__WEBPACK_IMPORTED_MODULE_0__.sqrt1_2 * k * s0 * t2 / s1,
        deltatDeltaPhi = (_math_js__WEBPACK_IMPORTED_MODULE_0__.sqrt2 * c0 * c1 + k) / (2 * (c1 + _math_js__WEBPACK_IMPORTED_MODULE_0__.sqrt2 * c0 * k) * (c1 + _math_js__WEBPACK_IMPORTED_MODULE_0__.sqrt2 * c0 * k) * k),
        deltacDeltat = -0.5 * t * c * c * c,
        deltacDeltaLambda = deltacDeltat * deltatDeltaLambda,
        deltacDeltaPhi = deltacDeltat * deltatDeltaPhi,
        A = (A = 2 * c1 + _math_js__WEBPACK_IMPORTED_MODULE_0__.sqrt2 * k * (c0 - s0)) * A * v,
        deltavDeltaLambda = (_math_js__WEBPACK_IMPORTED_MODULE_0__.sqrt2 * c0 * c1 * k + cos1) / A,
        deltavDeltaPhi = -(_math_js__WEBPACK_IMPORTED_MODULE_0__.sqrt2 * s0 * s1) / (k * A),
        deltaxDeltaLambda = vm1v * deltacDeltaLambda - 2 * deltavDeltaLambda / v + c * (deltavDeltaLambda + deltavDeltaLambda / v2),
        deltaxDeltaPhi = vm1v * deltacDeltaPhi - 2 * deltavDeltaPhi / v + c * (deltavDeltaPhi + deltavDeltaPhi / v2),
        deltayDeltaLambda = t * vp1v * deltacDeltaLambda - 2 * deltatDeltaLambda / (1 + t2) + c * vp1v * deltatDeltaLambda + c * t * (deltavDeltaLambda - deltavDeltaLambda / v2),
        deltayDeltaPhi = t * vp1v * deltacDeltaPhi - 2 * deltatDeltaPhi / (1 + t2) + c * vp1v * deltatDeltaPhi + c * t * (deltavDeltaPhi - deltavDeltaPhi / v2),
        denominator = deltaxDeltaPhi * deltayDeltaLambda - deltayDeltaPhi * deltaxDeltaLambda;
    if (!denominator) break;
    var deltaLambda = (fy * deltaxDeltaPhi - fx * deltayDeltaPhi) / denominator,
        deltaPhi = (fx * deltayDeltaLambda - fy * deltaxDeltaLambda) / denominator;
    lambda -= deltaLambda;
    phi = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.max)(-_math_js__WEBPACK_IMPORTED_MODULE_0__.halfPi, (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.min)(_math_js__WEBPACK_IMPORTED_MODULE_0__.halfPi, phi - deltaPhi));
  } while (((0,_math_js__WEBPACK_IMPORTED_MODULE_0__.abs)(deltaLambda) > _math_js__WEBPACK_IMPORTED_MODULE_0__.epsilon || (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.abs)(deltaPhi) > _math_js__WEBPACK_IMPORTED_MODULE_0__.epsilon) && --i > 0);
  return (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.abs)((0,_math_js__WEBPACK_IMPORTED_MODULE_0__.abs)(phi) - _math_js__WEBPACK_IMPORTED_MODULE_0__.halfPi) < _math_js__WEBPACK_IMPORTED_MODULE_0__.epsilon ? [0, phi] : i && [lambda, phi];
};

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {
  return (0,d3_geo__WEBPACK_IMPORTED_MODULE_2__["default"])(eisenlohrRaw)
      .scale(62.5271);
}


/***/ }),

/***/ "./node_modules/d3-geo-projection/src/elliptic.js":
/*!********************************************************!*\
  !*** ./node_modules/d3-geo-projection/src/elliptic.js ***!
  \********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ellipticJi": () => (/* binding */ ellipticJi),
/* harmony export */   "ellipticJ": () => (/* binding */ ellipticJ),
/* harmony export */   "ellipticFi": () => (/* binding */ ellipticFi),
/* harmony export */   "ellipticF": () => (/* binding */ ellipticF)
/* harmony export */ });
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./math.js */ "./node_modules/d3-geo-projection/src/math.js");


// Returns [sn, cn, dn](u + iv|m).
function ellipticJi(u, v, m) {
  var a, b, c;
  if (!u) {
    b = ellipticJ(v, 1 - m);
    return [
      [0, b[0] / b[1]],
      [1 / b[1], 0],
      [b[2] / b[1], 0]
    ];
  }
  a = ellipticJ(u, m);
  if (!v) return [[a[0], 0], [a[1], 0], [a[2], 0]];
  b = ellipticJ(v, 1 - m);
  c = b[1] * b[1] + m * a[0] * a[0] * b[0] * b[0];
  return [
    [a[0] * b[2] / c, a[1] * a[2] * b[0] * b[1] / c],
    [a[1] * b[1] / c, -a[0] * a[2] * b[0] * b[2] / c],
    [a[2] * b[1] * b[2] / c, -m * a[0] * a[1] * b[0] / c]
  ];
}

// Returns [sn, cn, dn, ph](u|m).
function ellipticJ(u, m) {
  var ai, b, phi, t, twon;
  if (m < _math_js__WEBPACK_IMPORTED_MODULE_0__.epsilon) {
    t = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sin)(u);
    b = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.cos)(u);
    ai = m * (u - t * b) / 4;
    return [
      t - ai * b,
      b + ai * t,
      1 - m * t * t / 2,
      u - ai
    ];
  }
  if (m >= 1 - _math_js__WEBPACK_IMPORTED_MODULE_0__.epsilon) {
    ai = (1 - m) / 4;
    b = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.cosh)(u);
    t = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.tanh)(u);
    phi = 1 / b;
    twon = b * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sinh)(u);
    return [
      t + ai * (twon - u) / (b * b),
      phi - ai * t * phi * (twon - u),
      phi + ai * t * phi * (twon + u),
      2 * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.atan)((0,_math_js__WEBPACK_IMPORTED_MODULE_0__.exp)(u)) - _math_js__WEBPACK_IMPORTED_MODULE_0__.halfPi + ai * (twon - u) / b
    ];
  }

  var a = [1, 0, 0, 0, 0, 0, 0, 0, 0],
      c = [(0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sqrt)(m), 0, 0, 0, 0, 0, 0, 0, 0],
      i = 0;
  b = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sqrt)(1 - m);
  twon = 1;

  while ((0,_math_js__WEBPACK_IMPORTED_MODULE_0__.abs)(c[i] / a[i]) > _math_js__WEBPACK_IMPORTED_MODULE_0__.epsilon && i < 8) {
    ai = a[i++];
    c[i] = (ai - b) / 2;
    a[i] = (ai + b) / 2;
    b = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sqrt)(ai * b);
    twon *= 2;
  }

  phi = twon * a[i] * u;
  do {
    t = c[i] * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sin)(b = phi) / a[i];
    phi = ((0,_math_js__WEBPACK_IMPORTED_MODULE_0__.asin)(t) + phi) / 2;
  } while (--i);

  return [(0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sin)(phi), t = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.cos)(phi), t / (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.cos)(phi - b), phi];
}

// Calculate F(phi+iPsi|m).
// See Abramowitz and Stegun, 17.4.11.
function ellipticFi(phi, psi, m) {
  var r = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.abs)(phi),
      i = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.abs)(psi),
      sinhPsi = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sinh)(i);
  if (r) {
    var cscPhi = 1 / (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sin)(r),
        cotPhi2 = 1 / ((0,_math_js__WEBPACK_IMPORTED_MODULE_0__.tan)(r) * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.tan)(r)),
        b = -(cotPhi2 + m * (sinhPsi * sinhPsi * cscPhi * cscPhi) - 1 + m),
        c = (m - 1) * cotPhi2,
        cotLambda2 = (-b + (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sqrt)(b * b - 4 * c)) / 2;
    return [
      ellipticF((0,_math_js__WEBPACK_IMPORTED_MODULE_0__.atan)(1 / (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sqrt)(cotLambda2)), m) * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sign)(phi),
      ellipticF((0,_math_js__WEBPACK_IMPORTED_MODULE_0__.atan)((0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sqrt)((cotLambda2 / cotPhi2 - 1) / m)), 1 - m) * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sign)(psi)
    ];
  }
  return [
    0,
    ellipticF((0,_math_js__WEBPACK_IMPORTED_MODULE_0__.atan)(sinhPsi), 1 - m) * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sign)(psi)
  ];
}

// Calculate F(phi|m) where m = k² = sin²α.
// See Abramowitz and Stegun, 17.6.7.
function ellipticF(phi, m) {
  if (!m) return phi;
  if (m === 1) return (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.log)((0,_math_js__WEBPACK_IMPORTED_MODULE_0__.tan)(phi / 2 + _math_js__WEBPACK_IMPORTED_MODULE_0__.quarterPi));
  var a = 1,
      b = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sqrt)(1 - m),
      c = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sqrt)(m);
  for (var i = 0; (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.abs)(c) > _math_js__WEBPACK_IMPORTED_MODULE_0__.epsilon; i++) {
    if (phi % _math_js__WEBPACK_IMPORTED_MODULE_0__.pi) {
      var dPhi = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.atan)(b * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.tan)(phi) / a);
      if (dPhi < 0) dPhi += _math_js__WEBPACK_IMPORTED_MODULE_0__.pi;
      phi += dPhi + ~~(phi / _math_js__WEBPACK_IMPORTED_MODULE_0__.pi) * _math_js__WEBPACK_IMPORTED_MODULE_0__.pi;
    } else phi += phi;
    c = (a + b) / 2;
    b = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sqrt)(a * b);
    c = ((a = c) - b) / 2;
  }
  return phi / ((0,_math_js__WEBPACK_IMPORTED_MODULE_0__.pow)(2, i) * a);
}


/***/ }),

/***/ "./node_modules/d3-geo-projection/src/fahey.js":
/*!*****************************************************!*\
  !*** ./node_modules/d3-geo-projection/src/fahey.js ***!
  \*****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "faheyRaw": () => (/* binding */ faheyRaw),
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var d3_geo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! d3-geo */ "./node_modules/d3-geo/src/projection/index.js");
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./math.js */ "./node_modules/d3-geo-projection/src/math.js");



var faheyK = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.cos)(35 * _math_js__WEBPACK_IMPORTED_MODULE_0__.radians);

function faheyRaw(lambda, phi) {
  var t = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.tan)(phi / 2);
  return [lambda * faheyK * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sqrt)(1 - t * t), (1 + faheyK) * t];
}

faheyRaw.invert = function(x, y) {
  var t = y / (1 + faheyK);
  return [x && x / (faheyK * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sqrt)(1 - t * t)), 2 * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.atan)(t)];
};

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {
  return (0,d3_geo__WEBPACK_IMPORTED_MODULE_1__["default"])(faheyRaw)
      .scale(137.152);
}


/***/ }),

/***/ "./node_modules/d3-geo-projection/src/foucaut.js":
/*!*******************************************************!*\
  !*** ./node_modules/d3-geo-projection/src/foucaut.js ***!
  \*******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "foucautRaw": () => (/* binding */ foucautRaw),
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var d3_geo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! d3-geo */ "./node_modules/d3-geo/src/projection/index.js");
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./math.js */ "./node_modules/d3-geo-projection/src/math.js");



function foucautRaw(lambda, phi) {
  var k = phi / 2, cosk = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.cos)(k);
  return [ 2 * lambda / _math_js__WEBPACK_IMPORTED_MODULE_0__.sqrtPi * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.cos)(phi) * cosk * cosk, _math_js__WEBPACK_IMPORTED_MODULE_0__.sqrtPi * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.tan)(k)];
}

foucautRaw.invert = function(x, y) {
  var k = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.atan)(y / _math_js__WEBPACK_IMPORTED_MODULE_0__.sqrtPi), cosk = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.cos)(k), phi = 2 * k;
  return [x * _math_js__WEBPACK_IMPORTED_MODULE_0__.sqrtPi / 2 / ((0,_math_js__WEBPACK_IMPORTED_MODULE_0__.cos)(phi) * cosk * cosk), phi];
};

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {
  return (0,d3_geo__WEBPACK_IMPORTED_MODULE_1__["default"])(foucautRaw)
      .scale(135.264);
}


/***/ }),

/***/ "./node_modules/d3-geo-projection/src/foucautSinusoidal.js":
/*!*****************************************************************!*\
  !*** ./node_modules/d3-geo-projection/src/foucautSinusoidal.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "foucautSinusoidalRaw": () => (/* binding */ foucautSinusoidalRaw),
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var d3_geo__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! d3-geo */ "./node_modules/d3-geo/src/projection/index.js");
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./math.js */ "./node_modules/d3-geo-projection/src/math.js");
/* harmony import */ var _newton_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./newton.js */ "./node_modules/d3-geo-projection/src/newton.js");




function foucautSinusoidalRaw(alpha) {
  var beta = 1 - alpha,
      equatorial = raw(_math_js__WEBPACK_IMPORTED_MODULE_0__.pi, 0)[0] - raw(-_math_js__WEBPACK_IMPORTED_MODULE_0__.pi, 0)[0],
      polar = raw(0, _math_js__WEBPACK_IMPORTED_MODULE_0__.halfPi)[1] - raw(0, -_math_js__WEBPACK_IMPORTED_MODULE_0__.halfPi)[1],
      ratio = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sqrt)(2 * polar / equatorial);

  function raw(lambda, phi) {
    var cosphi = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.cos)(phi),
        sinphi = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sin)(phi);
    return [
      cosphi / (beta + alpha * cosphi) * lambda,
      beta * phi + alpha * sinphi
    ];
  }

  function forward(lambda, phi) {
    var p = raw(lambda, phi);
    return [p[0] * ratio, p[1] / ratio];
  }

  function forwardMeridian(phi) {
    return forward(0, phi)[1];
  }

  forward.invert = function(x, y) {
    var phi = (0,_newton_js__WEBPACK_IMPORTED_MODULE_1__.solve)(forwardMeridian, y),
        lambda = x / ratio * (alpha + beta / (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.cos)(phi));
    return [lambda, phi];
  };

  return forward;
}

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {
  var alpha = 0.5,
      m = (0,d3_geo__WEBPACK_IMPORTED_MODULE_2__.projectionMutator)(foucautSinusoidalRaw),
      p = m(alpha);

  p.alpha = function(_) {
    return arguments.length ? m(alpha = +_) : alpha;
  };

  return p
      .scale(168.725);
}


/***/ }),

/***/ "./node_modules/d3-geo-projection/src/gilbert.js":
/*!*******************************************************!*\
  !*** ./node_modules/d3-geo-projection/src/gilbert.js ***!
  \*******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var d3_geo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! d3-geo */ "./node_modules/d3-geo/src/projection/orthographic.js");
/* harmony import */ var d3_geo__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! d3-geo */ "./node_modules/d3-geo/src/projection/equirectangular.js");
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./math.js */ "./node_modules/d3-geo-projection/src/math.js");



function gilbertForward(point) {
  return [point[0] / 2, (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.asin)((0,_math_js__WEBPACK_IMPORTED_MODULE_0__.tan)(point[1] / 2 * _math_js__WEBPACK_IMPORTED_MODULE_0__.radians)) * _math_js__WEBPACK_IMPORTED_MODULE_0__.degrees];
}

function gilbertInvert(point) {
  return [point[0] * 2, 2 * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.atan)((0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sin)(point[1] * _math_js__WEBPACK_IMPORTED_MODULE_0__.radians)) * _math_js__WEBPACK_IMPORTED_MODULE_0__.degrees];
}

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(projectionType) {
  if (projectionType == null) projectionType = d3_geo__WEBPACK_IMPORTED_MODULE_1__["default"];
  var projection = projectionType(),
      equirectangular = (0,d3_geo__WEBPACK_IMPORTED_MODULE_2__["default"])().scale(_math_js__WEBPACK_IMPORTED_MODULE_0__.degrees).precision(0).clipAngle(null).translate([0, 0]); // antimeridian cutting

  function gilbert(point) {
    return projection(gilbertForward(point));
  }

  if (projection.invert) gilbert.invert = function(point) {
    return gilbertInvert(projection.invert(point));
  };

  gilbert.stream = function(stream) {
    var s1 = projection.stream(stream), s0 = equirectangular.stream({
      point: function(lambda, phi) { s1.point(lambda / 2, (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.asin)((0,_math_js__WEBPACK_IMPORTED_MODULE_0__.tan)(-phi / 2 * _math_js__WEBPACK_IMPORTED_MODULE_0__.radians)) * _math_js__WEBPACK_IMPORTED_MODULE_0__.degrees); },
      lineStart: function() { s1.lineStart(); },
      lineEnd: function() { s1.lineEnd(); },
      polygonStart: function() { s1.polygonStart(); },
      polygonEnd: function() { s1.polygonEnd(); }
    });
    s0.sphere = s1.sphere;
    return s0;
  };

  function property(name) {
    gilbert[name] = function() {
      return arguments.length ? (projection[name].apply(projection, arguments), gilbert) : projection[name]();
    };
  }

  gilbert.rotate = function(_) {
    return arguments.length ? (equirectangular.rotate(_), gilbert) : equirectangular.rotate();
  };

  gilbert.center = function(_) {
    return arguments.length ? (projection.center(gilbertForward(_)), gilbert) : gilbertInvert(projection.center());
  };

  property("angle");
  property("clipAngle");
  property("clipExtent");
  property("fitExtent");
  property("fitHeight");
  property("fitSize");
  property("fitWidth");
  property("scale");
  property("translate");
  property("precision");

  return gilbert
      .scale(249.5);
}


/***/ }),

/***/ "./node_modules/d3-geo-projection/src/gingery.js":
/*!*******************************************************!*\
  !*** ./node_modules/d3-geo-projection/src/gingery.js ***!
  \*******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "gingeryRaw": () => (/* binding */ gingeryRaw),
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var d3_geo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! d3-geo */ "./node_modules/d3-geo/src/projection/azimuthalEquidistant.js");
/* harmony import */ var d3_geo__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! d3-geo */ "./node_modules/d3-geo/src/projection/index.js");
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./math.js */ "./node_modules/d3-geo-projection/src/math.js");



function gingeryRaw(rho, n) {
  var k = 2 * _math_js__WEBPACK_IMPORTED_MODULE_0__.pi / n,
      rho2 = rho * rho;

  function forward(lambda, phi) {
    var p = (0,d3_geo__WEBPACK_IMPORTED_MODULE_1__.azimuthalEquidistantRaw)(lambda, phi),
        x = p[0],
        y = p[1],
        r2 = x * x + y * y;

    if (r2 > rho2) {
      var r = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sqrt)(r2),
          theta = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.atan2)(y, x),
          theta0 = k * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.round)(theta / k),
          alpha = theta - theta0,
          rhoCosAlpha = rho * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.cos)(alpha),
          k_ = (rho * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sin)(alpha) - alpha * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sin)(rhoCosAlpha)) / (_math_js__WEBPACK_IMPORTED_MODULE_0__.halfPi - rhoCosAlpha),
          s_ = gingeryLength(alpha, k_),
          e = (_math_js__WEBPACK_IMPORTED_MODULE_0__.pi - rho) / gingeryIntegrate(s_, rhoCosAlpha, _math_js__WEBPACK_IMPORTED_MODULE_0__.pi);

      x = r;
      var i = 50, delta;
      do {
        x -= delta = (rho + gingeryIntegrate(s_, rhoCosAlpha, x) * e - r) / (s_(x) * e);
      } while ((0,_math_js__WEBPACK_IMPORTED_MODULE_0__.abs)(delta) > _math_js__WEBPACK_IMPORTED_MODULE_0__.epsilon && --i > 0);

      y = alpha * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sin)(x);
      if (x < _math_js__WEBPACK_IMPORTED_MODULE_0__.halfPi) y -= k_ * (x - _math_js__WEBPACK_IMPORTED_MODULE_0__.halfPi);

      var s = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sin)(theta0),
          c = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.cos)(theta0);
      p[0] = x * c - y * s;
      p[1] = x * s + y * c;
    }
    return p;
  }

  forward.invert = function(x, y) {
    var r2 = x * x + y * y;
    if (r2 > rho2) {
      var r = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sqrt)(r2),
          theta = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.atan2)(y, x),
          theta0 = k * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.round)(theta / k),
          dTheta = theta - theta0;

      x = r * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.cos)(dTheta);
      y = r * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sin)(dTheta);

      var x_halfPi = x - _math_js__WEBPACK_IMPORTED_MODULE_0__.halfPi,
          sinx = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sin)(x),
          alpha = y / sinx,
          delta = x < _math_js__WEBPACK_IMPORTED_MODULE_0__.halfPi ? Infinity : 0,
          i = 10;

      while (true) {
        var rhosinAlpha = rho * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sin)(alpha),
            rhoCosAlpha = rho * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.cos)(alpha),
            sinRhoCosAlpha = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sin)(rhoCosAlpha),
            halfPi_RhoCosAlpha = _math_js__WEBPACK_IMPORTED_MODULE_0__.halfPi - rhoCosAlpha,
            k_ = (rhosinAlpha - alpha * sinRhoCosAlpha) / halfPi_RhoCosAlpha,
            s_ = gingeryLength(alpha, k_);

        if ((0,_math_js__WEBPACK_IMPORTED_MODULE_0__.abs)(delta) < _math_js__WEBPACK_IMPORTED_MODULE_0__.epsilon2 || !--i) break;

        alpha -= delta = (alpha * sinx - k_ * x_halfPi - y) / (
          sinx - x_halfPi * 2 * (
            halfPi_RhoCosAlpha * (rhoCosAlpha + alpha * rhosinAlpha * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.cos)(rhoCosAlpha) - sinRhoCosAlpha) -
            rhosinAlpha * (rhosinAlpha - alpha * sinRhoCosAlpha)
          ) / (halfPi_RhoCosAlpha * halfPi_RhoCosAlpha));
      }
      r = rho + gingeryIntegrate(s_, rhoCosAlpha, x) * (_math_js__WEBPACK_IMPORTED_MODULE_0__.pi - rho) / gingeryIntegrate(s_, rhoCosAlpha, _math_js__WEBPACK_IMPORTED_MODULE_0__.pi);
      theta = theta0 + alpha;
      x = r * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.cos)(theta);
      y = r * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sin)(theta);
    }
    return d3_geo__WEBPACK_IMPORTED_MODULE_1__.azimuthalEquidistantRaw.invert(x, y);
  };

  return forward;
}

function gingeryLength(alpha, k) {
  return function(x) {
    var y_ = alpha * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.cos)(x);
    if (x < _math_js__WEBPACK_IMPORTED_MODULE_0__.halfPi) y_ -= k;
    return (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sqrt)(1 + y_ * y_);
  };
}

// Numerical integration: trapezoidal rule.
function gingeryIntegrate(f, a, b) {
  var n = 50,
      h = (b - a) / n,
      s = f(a) + f(b);
  for (var i = 1, x = a; i < n; ++i) s += 2 * f(x += h);
  return s * 0.5 * h;
}

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {
  var n = 6,
      rho = 30 * _math_js__WEBPACK_IMPORTED_MODULE_0__.radians,
      cRho = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.cos)(rho),
      sRho = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sin)(rho),
      m = (0,d3_geo__WEBPACK_IMPORTED_MODULE_2__.projectionMutator)(gingeryRaw),
      p = m(rho, n),
      stream_ = p.stream,
      epsilon = 1e-2,
      cr = -(0,_math_js__WEBPACK_IMPORTED_MODULE_0__.cos)(epsilon * _math_js__WEBPACK_IMPORTED_MODULE_0__.radians),
      sr = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sin)(epsilon * _math_js__WEBPACK_IMPORTED_MODULE_0__.radians);

  p.radius = function(_) {
    if (!arguments.length) return rho * _math_js__WEBPACK_IMPORTED_MODULE_0__.degrees;
    cRho = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.cos)(rho = _ * _math_js__WEBPACK_IMPORTED_MODULE_0__.radians);
    sRho = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sin)(rho);
    return m(rho, n);
  };

  p.lobes = function(_) {
    if (!arguments.length) return n;
    return m(rho, n = +_);
  };

  p.stream = function(stream) {
    var rotate = p.rotate(),
        rotateStream = stream_(stream),
        sphereStream = (p.rotate([0, 0]), stream_(stream));
    p.rotate(rotate);
    rotateStream.sphere = function() {
      sphereStream.polygonStart(), sphereStream.lineStart();
      for (var i = 0, delta = 2 * _math_js__WEBPACK_IMPORTED_MODULE_0__.pi / n, phi = 0; i < n; ++i, phi -= delta) {
        sphereStream.point((0,_math_js__WEBPACK_IMPORTED_MODULE_0__.atan2)(sr * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.cos)(phi), cr) * _math_js__WEBPACK_IMPORTED_MODULE_0__.degrees, (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.asin)(sr * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sin)(phi)) * _math_js__WEBPACK_IMPORTED_MODULE_0__.degrees);
        sphereStream.point((0,_math_js__WEBPACK_IMPORTED_MODULE_0__.atan2)(sRho * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.cos)(phi - delta / 2), cRho) * _math_js__WEBPACK_IMPORTED_MODULE_0__.degrees, (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.asin)(sRho * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sin)(phi - delta / 2)) * _math_js__WEBPACK_IMPORTED_MODULE_0__.degrees);
      }
      sphereStream.lineEnd(), sphereStream.polygonEnd();
    };
    return rotateStream;
  };

  return p
      .rotate([90, -40])
      .scale(91.7095)
      .clipAngle(180 - 1e-3);
}


/***/ }),

/***/ "./node_modules/d3-geo-projection/src/ginzburg4.js":
/*!*********************************************************!*\
  !*** ./node_modules/d3-geo-projection/src/ginzburg4.js ***!
  \*********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ginzburg4Raw": () => (/* binding */ ginzburg4Raw),
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var d3_geo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! d3-geo */ "./node_modules/d3-geo/src/projection/index.js");
/* harmony import */ var _ginzburgPolyconic_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ginzburgPolyconic.js */ "./node_modules/d3-geo-projection/src/ginzburgPolyconic.js");



var ginzburg4Raw = (0,_ginzburgPolyconic_js__WEBPACK_IMPORTED_MODULE_0__["default"])(2.8284, -1.6988, 0.75432, -0.18071, 1.76003, -0.38914, 0.042555);

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {
  return (0,d3_geo__WEBPACK_IMPORTED_MODULE_1__["default"])(ginzburg4Raw)
      .scale(149.995);
}


/***/ }),

/***/ "./node_modules/d3-geo-projection/src/ginzburg5.js":
/*!*********************************************************!*\
  !*** ./node_modules/d3-geo-projection/src/ginzburg5.js ***!
  \*********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ginzburg5Raw": () => (/* binding */ ginzburg5Raw),
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var d3_geo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! d3-geo */ "./node_modules/d3-geo/src/projection/index.js");
/* harmony import */ var _ginzburgPolyconic_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ginzburgPolyconic.js */ "./node_modules/d3-geo-projection/src/ginzburgPolyconic.js");



var ginzburg5Raw = (0,_ginzburgPolyconic_js__WEBPACK_IMPORTED_MODULE_0__["default"])(2.583819, -0.835827, 0.170354, -0.038094, 1.543313, -0.411435,0.082742);

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {
  return (0,d3_geo__WEBPACK_IMPORTED_MODULE_1__["default"])(ginzburg5Raw)
      .scale(153.93);
}


/***/ }),

/***/ "./node_modules/d3-geo-projection/src/ginzburg6.js":
/*!*********************************************************!*\
  !*** ./node_modules/d3-geo-projection/src/ginzburg6.js ***!
  \*********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ginzburg6Raw": () => (/* binding */ ginzburg6Raw),
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var d3_geo__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! d3-geo */ "./node_modules/d3-geo/src/projection/index.js");
/* harmony import */ var _ginzburgPolyconic_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ginzburgPolyconic.js */ "./node_modules/d3-geo-projection/src/ginzburgPolyconic.js");
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./math.js */ "./node_modules/d3-geo-projection/src/math.js");




var ginzburg6Raw = (0,_ginzburgPolyconic_js__WEBPACK_IMPORTED_MODULE_0__["default"])(5 / 6 * _math_js__WEBPACK_IMPORTED_MODULE_1__.pi, -0.62636, -0.0344, 0, 1.3493, -0.05524, 0, 0.045);

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {
  return (0,d3_geo__WEBPACK_IMPORTED_MODULE_2__["default"])(ginzburg6Raw)
      .scale(130.945);
}


/***/ }),

/***/ "./node_modules/d3-geo-projection/src/ginzburg8.js":
/*!*********************************************************!*\
  !*** ./node_modules/d3-geo-projection/src/ginzburg8.js ***!
  \*********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ginzburg8Raw": () => (/* binding */ ginzburg8Raw),
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var d3_geo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! d3-geo */ "./node_modules/d3-geo/src/projection/index.js");
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./math.js */ "./node_modules/d3-geo-projection/src/math.js");



function ginzburg8Raw(lambda, phi) {
  var lambda2 = lambda * lambda,
      phi2 = phi * phi;
  return [
    lambda * (1 - 0.162388 * phi2) * (0.87 - 0.000952426 * lambda2 * lambda2),
    phi * (1 + phi2 / 12)
  ];
}

ginzburg8Raw.invert = function(x, y) {
  var lambda = x,
      phi = y,
      i = 50, delta;
  do {
    var phi2 = phi * phi;
    phi -= delta = (phi * (1 + phi2 / 12) - y) / (1 + phi2 / 4);
  } while ((0,_math_js__WEBPACK_IMPORTED_MODULE_0__.abs)(delta) > _math_js__WEBPACK_IMPORTED_MODULE_0__.epsilon && --i > 0);
  i = 50;
  x /= 1 -0.162388 * phi2;
  do {
    var lambda4 = (lambda4 = lambda * lambda) * lambda4;
    lambda -= delta = (lambda * (0.87 - 0.000952426 * lambda4) - x) / (0.87 - 0.00476213 * lambda4);
  } while ((0,_math_js__WEBPACK_IMPORTED_MODULE_0__.abs)(delta) > _math_js__WEBPACK_IMPORTED_MODULE_0__.epsilon && --i > 0);
  return [lambda, phi];
};

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {
  return (0,d3_geo__WEBPACK_IMPORTED_MODULE_1__["default"])(ginzburg8Raw)
      .scale(131.747);
}


/***/ }),

/***/ "./node_modules/d3-geo-projection/src/ginzburg9.js":
/*!*********************************************************!*\
  !*** ./node_modules/d3-geo-projection/src/ginzburg9.js ***!
  \*********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ginzburg9Raw": () => (/* binding */ ginzburg9Raw),
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var d3_geo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! d3-geo */ "./node_modules/d3-geo/src/projection/index.js");
/* harmony import */ var _ginzburgPolyconic_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ginzburgPolyconic.js */ "./node_modules/d3-geo-projection/src/ginzburgPolyconic.js");



var ginzburg9Raw = (0,_ginzburgPolyconic_js__WEBPACK_IMPORTED_MODULE_0__["default"])(2.6516, -0.76534, 0.19123, -0.047094, 1.36289, -0.13965,0.031762);

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {
  return (0,d3_geo__WEBPACK_IMPORTED_MODULE_1__["default"])(ginzburg9Raw)
      .scale(131.087);
}


/***/ }),

/***/ "./node_modules/d3-geo-projection/src/ginzburgPolyconic.js":
/*!*****************************************************************!*\
  !*** ./node_modules/d3-geo-projection/src/ginzburgPolyconic.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./math.js */ "./node_modules/d3-geo-projection/src/math.js");


/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(a, b, c, d, e, f, g, h) {
  if (arguments.length < 8) h = 0;

  function forward(lambda, phi) {
    if (!phi) return [a * lambda / _math_js__WEBPACK_IMPORTED_MODULE_0__.pi, 0];
    var phi2 = phi * phi,
        xB = a + phi2 * (b + phi2 * (c + phi2 * d)),
        yB = phi * (e - 1 + phi2 * (f - h + phi2 * g)),
        m = (xB * xB + yB * yB) / (2 * yB),
        alpha = lambda * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.asin)(xB / m) / _math_js__WEBPACK_IMPORTED_MODULE_0__.pi;
    return [m * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sin)(alpha), phi * (1 + phi2 * h) + m * (1 - (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.cos)(alpha))];
  }

  forward.invert = function(x, y) {
    var lambda = _math_js__WEBPACK_IMPORTED_MODULE_0__.pi * x / a,
        phi = y,
        deltaLambda, deltaPhi, i = 50;
    do {
      var phi2 = phi * phi,
          xB = a + phi2 * (b + phi2 * (c + phi2 * d)),
          yB = phi * (e - 1 + phi2 * (f - h + phi2 * g)),
          p = xB * xB + yB * yB,
          q = 2 * yB,
          m = p / q,
          m2 = m * m,
          dAlphadLambda = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.asin)(xB / m) / _math_js__WEBPACK_IMPORTED_MODULE_0__.pi,
          alpha = lambda * dAlphadLambda,
          xB2 = xB * xB,
          dxBdPhi = (2 * b + phi2 * (4 * c + phi2 * 6 * d)) * phi,
          dyBdPhi = e + phi2 * (3 * f + phi2 * 5 * g),
          dpdPhi = 2 * (xB * dxBdPhi + yB * (dyBdPhi - 1)),
          dqdPhi = 2 * (dyBdPhi - 1),
          dmdPhi = (dpdPhi * q - p * dqdPhi) / (q * q),
          cosAlpha = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.cos)(alpha),
          sinAlpha = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sin)(alpha),
          mcosAlpha = m * cosAlpha,
          msinAlpha = m * sinAlpha,
          dAlphadPhi = ((lambda / _math_js__WEBPACK_IMPORTED_MODULE_0__.pi) * (1 / (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sqrt)(1 - xB2 / m2)) * (dxBdPhi * m - xB * dmdPhi)) / m2,
          fx = msinAlpha - x,
          fy = phi * (1 + phi2 * h) + m - mcosAlpha - y,
          deltaxDeltaPhi = dmdPhi * sinAlpha + mcosAlpha * dAlphadPhi,
          deltaxDeltaLambda = mcosAlpha * dAlphadLambda,
          deltayDeltaPhi = 1 + dmdPhi - (dmdPhi * cosAlpha - msinAlpha * dAlphadPhi),
          deltayDeltaLambda = msinAlpha * dAlphadLambda,
          denominator = deltaxDeltaPhi * deltayDeltaLambda - deltayDeltaPhi * deltaxDeltaLambda;
      if (!denominator) break;
      lambda -= deltaLambda = (fy * deltaxDeltaPhi - fx * deltayDeltaPhi) / denominator;
      phi -= deltaPhi = (fx * deltayDeltaLambda - fy * deltaxDeltaLambda) / denominator;
    } while (((0,_math_js__WEBPACK_IMPORTED_MODULE_0__.abs)(deltaLambda) > _math_js__WEBPACK_IMPORTED_MODULE_0__.epsilon || (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.abs)(deltaPhi) > _math_js__WEBPACK_IMPORTED_MODULE_0__.epsilon) && --i > 0);
    return [lambda, phi];
  };

  return forward;
}


/***/ }),

/***/ "./node_modules/d3-geo-projection/src/gringorten.js":
/*!**********************************************************!*\
  !*** ./node_modules/d3-geo-projection/src/gringorten.js ***!
  \**********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "gringortenRaw": () => (/* binding */ gringortenRaw),
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var d3_geo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! d3-geo */ "./node_modules/d3-geo/src/projection/index.js");
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./math.js */ "./node_modules/d3-geo-projection/src/math.js");
/* harmony import */ var _square_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./square.js */ "./node_modules/d3-geo-projection/src/square.js");




function gringortenRaw(lambda, phi) {
  var sLambda = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sign)(lambda),
      sPhi = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sign)(phi),
      cosPhi = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.cos)(phi),
      x = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.cos)(lambda) * cosPhi,
      y = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sin)(lambda) * cosPhi,
      z = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sin)(sPhi * phi);
  lambda = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.abs)((0,_math_js__WEBPACK_IMPORTED_MODULE_0__.atan2)(y, z));
  phi = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.asin)(x);
  if ((0,_math_js__WEBPACK_IMPORTED_MODULE_0__.abs)(lambda - _math_js__WEBPACK_IMPORTED_MODULE_0__.halfPi) > _math_js__WEBPACK_IMPORTED_MODULE_0__.epsilon) lambda %= _math_js__WEBPACK_IMPORTED_MODULE_0__.halfPi;
  var point = gringortenHexadecant(lambda > _math_js__WEBPACK_IMPORTED_MODULE_0__.pi / 4 ? _math_js__WEBPACK_IMPORTED_MODULE_0__.halfPi - lambda : lambda, phi);
  if (lambda > _math_js__WEBPACK_IMPORTED_MODULE_0__.pi / 4) z = point[0], point[0] = -point[1], point[1] = -z;
  return (point[0] *= sLambda, point[1] *= -sPhi, point);
}

gringortenRaw.invert = function(x, y) {
  if ((0,_math_js__WEBPACK_IMPORTED_MODULE_0__.abs)(x) > 1) x = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sign)(x) * 2 - x;
  if ((0,_math_js__WEBPACK_IMPORTED_MODULE_0__.abs)(y) > 1) y = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sign)(y) * 2 - y;
  var sx = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sign)(x),
      sy = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sign)(y),
      x0 = -sx * x,
      y0 = -sy * y,
      t = y0 / x0 < 1,
      p = gringortenHexadecantInvert(t ? y0 : x0, t ? x0 : y0),
      lambda = p[0],
      phi = p[1],
      cosPhi = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.cos)(phi);
  if (t) lambda = -_math_js__WEBPACK_IMPORTED_MODULE_0__.halfPi - lambda;
  return [sx * ((0,_math_js__WEBPACK_IMPORTED_MODULE_0__.atan2)((0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sin)(lambda) * cosPhi, -(0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sin)(phi)) + _math_js__WEBPACK_IMPORTED_MODULE_0__.pi), sy * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.asin)((0,_math_js__WEBPACK_IMPORTED_MODULE_0__.cos)(lambda) * cosPhi)];
};

function gringortenHexadecant(lambda, phi) {
  if (phi === _math_js__WEBPACK_IMPORTED_MODULE_0__.halfPi) return [0, 0];

  var sinPhi = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sin)(phi),
      r = sinPhi * sinPhi,
      r2 = r * r,
      j = 1 + r2,
      k = 1 + 3 * r2,
      q = 1 - r2,
      z = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.asin)(1 / (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sqrt)(j)),
      v = q + r * j * z,
      p2 = (1 - sinPhi) / v,
      p = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sqrt)(p2),
      a2 = p2 * j,
      a = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sqrt)(a2),
      h = p * q,
      x,
      i;

  if (lambda === 0) return [0, -(h + r * a)];

  var cosPhi = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.cos)(phi),
      secPhi = 1 / cosPhi,
      drdPhi = 2 * sinPhi * cosPhi,
      dvdPhi = (-3 * r + z * k) * drdPhi,
      dp2dPhi = (-v * cosPhi - (1 - sinPhi) * dvdPhi) / (v * v),
      dpdPhi = (0.5 * dp2dPhi) / p,
      dhdPhi = q * dpdPhi - 2 * r * p * drdPhi,
      dra2dPhi = r * j * dp2dPhi + p2 * k * drdPhi,
      mu = -secPhi * drdPhi,
      nu = -secPhi * dra2dPhi,
      zeta = -2 * secPhi * dhdPhi,
      lambda1 = 4 * lambda / _math_js__WEBPACK_IMPORTED_MODULE_0__.pi,
      delta;

  // Slower but accurate bisection method.
  if (lambda > 0.222 * _math_js__WEBPACK_IMPORTED_MODULE_0__.pi || phi < _math_js__WEBPACK_IMPORTED_MODULE_0__.pi / 4 && lambda > 0.175 * _math_js__WEBPACK_IMPORTED_MODULE_0__.pi) {
    x = (h + r * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sqrt)(a2 * (1 + r2) - h * h)) / (1 + r2);
    if (lambda > _math_js__WEBPACK_IMPORTED_MODULE_0__.pi / 4) return [x, x];
    var x1 = x, x0 = 0.5 * x;
    x = 0.5 * (x0 + x1), i = 50;
    do {
      var g = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sqrt)(a2 - x * x),
          f = (x * (zeta + mu * g) + nu * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.asin)(x / a)) - lambda1;
      if (!f) break;
      if (f < 0) x0 = x;
      else x1 = x;
      x = 0.5 * (x0 + x1);
    } while ((0,_math_js__WEBPACK_IMPORTED_MODULE_0__.abs)(x1 - x0) > _math_js__WEBPACK_IMPORTED_MODULE_0__.epsilon && --i > 0);
  }

  // Newton-Raphson.
  else {
    x = _math_js__WEBPACK_IMPORTED_MODULE_0__.epsilon, i = 25;
    do {
      var x2 = x * x,
          g2 = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sqrt)(a2 - x2),
          zetaMug = zeta + mu * g2,
          f2 = x * zetaMug + nu * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.asin)(x / a) - lambda1,
          df = zetaMug + (nu - mu * x2) / g2;
      x -= delta = g2 ? f2 / df : 0;
    } while ((0,_math_js__WEBPACK_IMPORTED_MODULE_0__.abs)(delta) > _math_js__WEBPACK_IMPORTED_MODULE_0__.epsilon && --i > 0);
  }

  return [x, -h - r * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sqrt)(a2 - x * x)];
}

function gringortenHexadecantInvert(x, y) {
  var x0 = 0,
      x1 = 1,
      r = 0.5,
      i = 50;

  while (true) {
    var r2 = r * r,
        sinPhi = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sqrt)(r),
        z = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.asin)(1 / (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sqrt)(1 + r2)),
        v = (1 - r2) + r * (1 + r2) * z,
        p2 = (1 - sinPhi) / v,
        p = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sqrt)(p2),
        a2 = p2 * (1 + r2),
        h = p * (1 - r2),
        g2 = a2 - x * x,
        g = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sqrt)(g2),
        y0 = y + h + r * g;
    if ((0,_math_js__WEBPACK_IMPORTED_MODULE_0__.abs)(x1 - x0) < _math_js__WEBPACK_IMPORTED_MODULE_0__.epsilon2 || --i === 0 || y0 === 0) break;
    if (y0 > 0) x0 = r;
    else x1 = r;
    r = 0.5 * (x0 + x1);
  }

  if (!i) return null;

  var phi = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.asin)(sinPhi),
      cosPhi = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.cos)(phi),
      secPhi = 1 / cosPhi,
      drdPhi = 2 * sinPhi * cosPhi,
      dvdPhi = (-3 * r + z * (1 + 3 * r2)) * drdPhi,
      dp2dPhi = (-v * cosPhi - (1 - sinPhi) * dvdPhi) / (v * v),
      dpdPhi = 0.5 * dp2dPhi / p,
      dhdPhi = (1 - r2) * dpdPhi - 2 * r * p * drdPhi,
      zeta = -2 * secPhi * dhdPhi,
      mu = -secPhi * drdPhi,
      nu = -secPhi * (r * (1 + r2) * dp2dPhi + p2 * (1 + 3 * r2) * drdPhi);

  return [_math_js__WEBPACK_IMPORTED_MODULE_0__.pi / 4 * (x * (zeta + mu * g) + nu * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.asin)(x / (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sqrt)(a2))), phi];
}

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {
  return (0,d3_geo__WEBPACK_IMPORTED_MODULE_1__["default"])((0,_square_js__WEBPACK_IMPORTED_MODULE_2__["default"])(gringortenRaw))
      .scale(239.75);
}


/***/ }),

/***/ "./node_modules/d3-geo-projection/src/guyou.js":
/*!*****************************************************!*\
  !*** ./node_modules/d3-geo-projection/src/guyou.js ***!
  \*****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "guyouRaw": () => (/* binding */ guyouRaw),
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var d3_geo__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! d3-geo */ "./node_modules/d3-geo/src/projection/index.js");
/* harmony import */ var _elliptic_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./elliptic.js */ "./node_modules/d3-geo-projection/src/elliptic.js");
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./math.js */ "./node_modules/d3-geo-projection/src/math.js");
/* harmony import */ var _square_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./square.js */ "./node_modules/d3-geo-projection/src/square.js");





function guyouRaw(lambda, phi) {
  var k_ = (_math_js__WEBPACK_IMPORTED_MODULE_0__.sqrt2 - 1) / (_math_js__WEBPACK_IMPORTED_MODULE_0__.sqrt2 + 1),
      k = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sqrt)(1 - k_ * k_),
      K = (0,_elliptic_js__WEBPACK_IMPORTED_MODULE_1__.ellipticF)(_math_js__WEBPACK_IMPORTED_MODULE_0__.halfPi, k * k),
      f = -1,
      psi = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.log)((0,_math_js__WEBPACK_IMPORTED_MODULE_0__.tan)(_math_js__WEBPACK_IMPORTED_MODULE_0__.pi / 4 + (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.abs)(phi) / 2)),
      r = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.exp)(f * psi) / (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sqrt)(k_),
      at = guyouComplexAtan(r * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.cos)(f * lambda), r * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sin)(f * lambda)),
      t = (0,_elliptic_js__WEBPACK_IMPORTED_MODULE_1__.ellipticFi)(at[0], at[1], k * k);
  return [-t[1], (phi >= 0 ? 1 : -1) * (0.5 * K - t[0])];
}

function guyouComplexAtan(x, y) {
  var x2 = x * x,
      y_1 = y + 1,
      t = 1 - x2 - y * y;
  return [
   0.5 * ((x >= 0 ? _math_js__WEBPACK_IMPORTED_MODULE_0__.halfPi : -_math_js__WEBPACK_IMPORTED_MODULE_0__.halfPi) - (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.atan2)(t, 2 * x)),
    -0.25 * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.log)(t * t + 4 * x2) +0.5 * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.log)(y_1 * y_1 + x2)
  ];
}

function guyouComplexDivide(a, b) {
  var denominator = b[0] * b[0] + b[1] * b[1];
  return [
    (a[0] * b[0] + a[1] * b[1]) / denominator,
    (a[1] * b[0] - a[0] * b[1]) / denominator
  ];
}

guyouRaw.invert = function(x, y) {
  var k_ = (_math_js__WEBPACK_IMPORTED_MODULE_0__.sqrt2 - 1) / (_math_js__WEBPACK_IMPORTED_MODULE_0__.sqrt2 + 1),
      k = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sqrt)(1 - k_ * k_),
      K = (0,_elliptic_js__WEBPACK_IMPORTED_MODULE_1__.ellipticF)(_math_js__WEBPACK_IMPORTED_MODULE_0__.halfPi, k * k),
      f = -1,
      j = (0,_elliptic_js__WEBPACK_IMPORTED_MODULE_1__.ellipticJi)(0.5 * K - y, -x, k * k),
      tn = guyouComplexDivide(j[0], j[1]),
      lambda = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.atan2)(tn[1], tn[0]) / f;
  return [
    lambda,
    2 * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.atan)((0,_math_js__WEBPACK_IMPORTED_MODULE_0__.exp)(0.5 / f * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.log)(k_ * tn[0] * tn[0] + k_ * tn[1] * tn[1]))) - _math_js__WEBPACK_IMPORTED_MODULE_0__.halfPi
  ];
};

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {
  return (0,d3_geo__WEBPACK_IMPORTED_MODULE_2__["default"])((0,_square_js__WEBPACK_IMPORTED_MODULE_3__["default"])(guyouRaw))
      .scale(151.496);
}


/***/ }),

/***/ "./node_modules/d3-geo-projection/src/hammer.js":
/*!******************************************************!*\
  !*** ./node_modules/d3-geo-projection/src/hammer.js ***!
  \******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "hammerRaw": () => (/* binding */ hammerRaw),
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var d3_geo__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! d3-geo */ "./node_modules/d3-geo/src/projection/azimuthalEqualArea.js");
/* harmony import */ var d3_geo__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! d3-geo */ "./node_modules/d3-geo/src/projection/index.js");
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./math.js */ "./node_modules/d3-geo-projection/src/math.js");



function hammerRaw(A, B) {
  if (arguments.length < 2) B = A;
  if (B === 1) return d3_geo__WEBPACK_IMPORTED_MODULE_0__.azimuthalEqualAreaRaw;
  if (B === Infinity) return hammerQuarticAuthalicRaw;

  function forward(lambda, phi) {
    var coordinates = (0,d3_geo__WEBPACK_IMPORTED_MODULE_0__.azimuthalEqualAreaRaw)(lambda / B, phi);
    coordinates[0] *= A;
    return coordinates;
  }

  forward.invert = function(x, y) {
    var coordinates = d3_geo__WEBPACK_IMPORTED_MODULE_0__.azimuthalEqualAreaRaw.invert(x / A, y);
    coordinates[0] *= B;
    return coordinates;
  };

  return forward;
}

function hammerQuarticAuthalicRaw(lambda, phi) {
  return [
    lambda * (0,_math_js__WEBPACK_IMPORTED_MODULE_1__.cos)(phi) / (0,_math_js__WEBPACK_IMPORTED_MODULE_1__.cos)(phi /= 2),
    2 * (0,_math_js__WEBPACK_IMPORTED_MODULE_1__.sin)(phi)
  ];
}

hammerQuarticAuthalicRaw.invert = function(x, y) {
  var phi = 2 * (0,_math_js__WEBPACK_IMPORTED_MODULE_1__.asin)(y / 2);
  return [
    x * (0,_math_js__WEBPACK_IMPORTED_MODULE_1__.cos)(phi / 2) / (0,_math_js__WEBPACK_IMPORTED_MODULE_1__.cos)(phi),
    phi
  ];
};

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {
  var B = 2,
      m = (0,d3_geo__WEBPACK_IMPORTED_MODULE_2__.projectionMutator)(hammerRaw),
      p = m(B);

  p.coefficient = function(_) {
    if (!arguments.length) return B;
    return m(B = +_);
  };

  return p
    .scale(169.529);
}


/***/ }),

/***/ "./node_modules/d3-geo-projection/src/hammerRetroazimuthal.js":
/*!********************************************************************!*\
  !*** ./node_modules/d3-geo-projection/src/hammerRetroazimuthal.js ***!
  \********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "hammerRetroazimuthalRaw": () => (/* binding */ hammerRetroazimuthalRaw),
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var d3_geo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! d3-geo */ "./node_modules/d3-geo/src/projection/index.js");
/* harmony import */ var d3_geo__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! d3-geo */ "./node_modules/d3-geo/src/circle.js");
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./math.js */ "./node_modules/d3-geo-projection/src/math.js");



function hammerRetroazimuthalRaw(phi0) {
  var sinPhi0 = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sin)(phi0),
      cosPhi0 = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.cos)(phi0),
      rotate = hammerRetroazimuthalRotation(phi0);

  rotate.invert = hammerRetroazimuthalRotation(-phi0);

  function forward(lambda, phi) {
    var p = rotate(lambda, phi);
    lambda = p[0], phi = p[1];
    var sinPhi = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sin)(phi),
        cosPhi = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.cos)(phi),
        cosLambda = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.cos)(lambda),
        z = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.acos)(sinPhi0 * sinPhi + cosPhi0 * cosPhi * cosLambda),
        sinz = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sin)(z),
        K = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.abs)(sinz) > _math_js__WEBPACK_IMPORTED_MODULE_0__.epsilon ? z / sinz : 1;
    return [
      K * cosPhi0 * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sin)(lambda),
      ((0,_math_js__WEBPACK_IMPORTED_MODULE_0__.abs)(lambda) > _math_js__WEBPACK_IMPORTED_MODULE_0__.halfPi ? K : -K) // rotate for back hemisphere
        * (sinPhi0 * cosPhi - cosPhi0 * sinPhi * cosLambda)
    ];
  }

  forward.invert = function(x, y) {
    var rho = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sqrt)(x * x + y * y),
        sinz = -(0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sin)(rho),
        cosz = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.cos)(rho),
        a = rho * cosz,
        b = -y * sinz,
        c = rho * sinPhi0,
        d = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sqrt)(a * a + b * b - c * c),
        phi = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.atan2)(a * c + b * d, b * c - a * d),
        lambda = (rho > _math_js__WEBPACK_IMPORTED_MODULE_0__.halfPi ? -1 : 1) * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.atan2)(x * sinz, rho * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.cos)(phi) * cosz + y * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sin)(phi) * sinz);
    return rotate.invert(lambda, phi);
  };

  return forward;
}

// Latitudinal rotation by phi0.
// Temporary hack until D3 supports arbitrary small-circle clipping origins.
function hammerRetroazimuthalRotation(phi0) {
  var sinPhi0 = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sin)(phi0),
      cosPhi0 = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.cos)(phi0);

  return function(lambda, phi) {
    var cosPhi = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.cos)(phi),
        x = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.cos)(lambda) * cosPhi,
        y = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sin)(lambda) * cosPhi,
        z = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sin)(phi);
    return [
      (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.atan2)(y, x * cosPhi0 - z * sinPhi0),
      (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.asin)(z * cosPhi0 + x * sinPhi0)
    ];
  };
}

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {
  var phi0 = 0,
      m = (0,d3_geo__WEBPACK_IMPORTED_MODULE_1__.projectionMutator)(hammerRetroazimuthalRaw),
      p = m(phi0),
      rotate_ = p.rotate,
      stream_ = p.stream,
      circle = (0,d3_geo__WEBPACK_IMPORTED_MODULE_2__["default"])();

  p.parallel = function(_) {
    if (!arguments.length) return phi0 * _math_js__WEBPACK_IMPORTED_MODULE_0__.degrees;
    var r = p.rotate();
    return m(phi0 = _ * _math_js__WEBPACK_IMPORTED_MODULE_0__.radians).rotate(r);
  };

  // Temporary hack; see hammerRetroazimuthalRotation.
  p.rotate = function(_) {
    if (!arguments.length) return (_ = rotate_.call(p), _[1] += phi0 * _math_js__WEBPACK_IMPORTED_MODULE_0__.degrees, _);
    rotate_.call(p, [_[0], _[1] - phi0 * _math_js__WEBPACK_IMPORTED_MODULE_0__.degrees]);
    circle.center([-_[0], -_[1]]);
    return p;
  };

  p.stream = function(stream) {
    stream = stream_(stream);
    stream.sphere = function() {
      stream.polygonStart();
      var epsilon = 1e-2,
          ring = circle.radius(90 - epsilon)().coordinates[0],
          n = ring.length - 1,
          i = -1,
          p;
      stream.lineStart();
      while (++i < n) stream.point((p = ring[i])[0], p[1]);
      stream.lineEnd();
      ring = circle.radius(90 + epsilon)().coordinates[0];
      n = ring.length - 1;
      stream.lineStart();
      while (--i >= 0) stream.point((p = ring[i])[0], p[1]);
      stream.lineEnd();
      stream.polygonEnd();
    };
    return stream;
  };

  return p
      .scale(79.4187)
      .parallel(45)
      .clipAngle(180 - 1e-3);
}


/***/ }),

/***/ "./node_modules/d3-geo-projection/src/healpix.js":
/*!*******************************************************!*\
  !*** ./node_modules/d3-geo-projection/src/healpix.js ***!
  \*******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "healpixRaw": () => (/* binding */ healpixRaw),
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var d3_array__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! d3-array */ "./node_modules/d3-array/src/range.js");
/* harmony import */ var d3_geo__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! d3-geo */ "./node_modules/d3-geo/src/projection/index.js");
/* harmony import */ var d3_geo__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! d3-geo */ "./node_modules/d3-geo/src/stream.js");
/* harmony import */ var _collignon_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./collignon.js */ "./node_modules/d3-geo-projection/src/collignon.js");
/* harmony import */ var _cylindricalEqualArea_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./cylindricalEqualArea.js */ "./node_modules/d3-geo-projection/src/cylindricalEqualArea.js");
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./math.js */ "./node_modules/d3-geo-projection/src/math.js");






var K = 3,
    healpixParallel = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.asin)(1 - 1 / K) * _math_js__WEBPACK_IMPORTED_MODULE_0__.degrees,
    healpixLambert = (0,_cylindricalEqualArea_js__WEBPACK_IMPORTED_MODULE_1__.cylindricalEqualAreaRaw)(0);

function healpixRaw(H) {
  var phi0 = healpixParallel * _math_js__WEBPACK_IMPORTED_MODULE_0__.radians,
      dx = (0,_collignon_js__WEBPACK_IMPORTED_MODULE_2__.collignonRaw)(_math_js__WEBPACK_IMPORTED_MODULE_0__.pi, phi0)[0] - (0,_collignon_js__WEBPACK_IMPORTED_MODULE_2__.collignonRaw)(-_math_js__WEBPACK_IMPORTED_MODULE_0__.pi, phi0)[0],
      y0 = healpixLambert(0, phi0)[1],
      y1 = (0,_collignon_js__WEBPACK_IMPORTED_MODULE_2__.collignonRaw)(0, phi0)[1],
      dy1 = _math_js__WEBPACK_IMPORTED_MODULE_0__.sqrtPi - y1,
      k = _math_js__WEBPACK_IMPORTED_MODULE_0__.tau / H,
      w = 4 / _math_js__WEBPACK_IMPORTED_MODULE_0__.tau,
      h = y0 + (dy1 * dy1 * 4) / _math_js__WEBPACK_IMPORTED_MODULE_0__.tau;

  function forward(lambda, phi) {
    var point,
        phi2 = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.abs)(phi);
    if (phi2 > phi0) {
      var i = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.min)(H - 1, (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.max)(0, (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.floor)((lambda + _math_js__WEBPACK_IMPORTED_MODULE_0__.pi) / k)));
      lambda += _math_js__WEBPACK_IMPORTED_MODULE_0__.pi * (H - 1) / H - i * k;
      point = (0,_collignon_js__WEBPACK_IMPORTED_MODULE_2__.collignonRaw)(lambda, phi2);
      point[0] = point[0] * _math_js__WEBPACK_IMPORTED_MODULE_0__.tau / dx - _math_js__WEBPACK_IMPORTED_MODULE_0__.tau * (H - 1) / (2 * H) + i * _math_js__WEBPACK_IMPORTED_MODULE_0__.tau / H;
      point[1] = y0 + (point[1] - y1) * 4 * dy1 / _math_js__WEBPACK_IMPORTED_MODULE_0__.tau;
      if (phi < 0) point[1] = -point[1];
    } else {
      point = healpixLambert(lambda, phi);
    }
    point[0] *= w, point[1] /= h;
    return point;
  }

  forward.invert = function(x, y) {
    x /= w, y *= h;
    var y2 = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.abs)(y);
    if (y2 > y0) {
      var i = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.min)(H - 1, (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.max)(0, (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.floor)((x + _math_js__WEBPACK_IMPORTED_MODULE_0__.pi) / k)));
      x = (x + _math_js__WEBPACK_IMPORTED_MODULE_0__.pi * (H - 1) / H - i * k) * dx / _math_js__WEBPACK_IMPORTED_MODULE_0__.tau;
      var point = _collignon_js__WEBPACK_IMPORTED_MODULE_2__.collignonRaw.invert(x, 0.25 * (y2 - y0) * _math_js__WEBPACK_IMPORTED_MODULE_0__.tau / dy1 + y1);
      point[0] -= _math_js__WEBPACK_IMPORTED_MODULE_0__.pi * (H - 1) / H - i * k;
      if (y < 0) point[1] = -point[1];
      return point;
    }
    return healpixLambert.invert(x, y);
  };

  return forward;
}

function sphereTop(x, i) {
  return [x, i & 1 ? 90 - _math_js__WEBPACK_IMPORTED_MODULE_0__.epsilon : healpixParallel];
}

function sphereBottom(x, i) {
  return [x, i & 1 ? -90 + _math_js__WEBPACK_IMPORTED_MODULE_0__.epsilon : -healpixParallel];
}

function sphereNudge(d) {
  return [d[0] * (1 - _math_js__WEBPACK_IMPORTED_MODULE_0__.epsilon), d[1]];
}

function sphere(step) {
  var c = [].concat(
    (0,d3_array__WEBPACK_IMPORTED_MODULE_3__["default"])(-180, 180 + step / 2, step).map(sphereTop),
    (0,d3_array__WEBPACK_IMPORTED_MODULE_3__["default"])(180, -180 - step / 2, -step).map(sphereBottom)
  );
  return {
    type: "Polygon",
    coordinates: [step === 180 ? c.map(sphereNudge) : c]
  };
}

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {
  var H = 4,
      m = (0,d3_geo__WEBPACK_IMPORTED_MODULE_4__.projectionMutator)(healpixRaw),
      p = m(H),
      stream_ = p.stream;

  p.lobes = function(_) {
    return arguments.length ? m(H = +_) : H;
  };

  p.stream = function(stream) {
    var rotate = p.rotate(),
        rotateStream = stream_(stream),
        sphereStream = (p.rotate([0, 0]), stream_(stream));
    p.rotate(rotate);
    rotateStream.sphere = function() { (0,d3_geo__WEBPACK_IMPORTED_MODULE_5__["default"])(sphere(180 / H), sphereStream); };
    return rotateStream;
  };

  return p
      .scale(239.75);
}


/***/ }),

/***/ "./node_modules/d3-geo-projection/src/hill.js":
/*!****************************************************!*\
  !*** ./node_modules/d3-geo-projection/src/hill.js ***!
  \****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "hillRaw": () => (/* binding */ hillRaw),
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var d3_geo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! d3-geo */ "./node_modules/d3-geo/src/projection/index.js");
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./math.js */ "./node_modules/d3-geo-projection/src/math.js");



function hillRaw(K) {
  var L = 1 + K,
      sinBt = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sin)(1 / L),
      Bt = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.asin)(sinBt),
      A = 2 * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sqrt)(_math_js__WEBPACK_IMPORTED_MODULE_0__.pi / (B = _math_js__WEBPACK_IMPORTED_MODULE_0__.pi + 4 * Bt * L)),
      B,
      rho0 = 0.5 * A * (L + (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sqrt)(K * (2 + K))),
      K2 = K * K,
      L2 = L * L;

  function forward(lambda, phi) {
    var t = 1 - (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sin)(phi),
        rho,
        omega;
    if (t && t < 2) {
      var theta = _math_js__WEBPACK_IMPORTED_MODULE_0__.halfPi - phi, i = 25, delta;
      do {
        var sinTheta = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sin)(theta),
            cosTheta = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.cos)(theta),
            Bt_Bt1 = Bt + (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.atan2)(sinTheta, L - cosTheta),
            C = 1 + L2 - 2 * L * cosTheta;
        theta -= delta = (theta - K2 * Bt - L * sinTheta + C * Bt_Bt1 -0.5 * t * B) / (2 * L * sinTheta * Bt_Bt1);
      } while ((0,_math_js__WEBPACK_IMPORTED_MODULE_0__.abs)(delta) > _math_js__WEBPACK_IMPORTED_MODULE_0__.epsilon2 && --i > 0);
      rho = A * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sqrt)(C);
      omega = lambda * Bt_Bt1 / _math_js__WEBPACK_IMPORTED_MODULE_0__.pi;
    } else {
      rho = A * (K + t);
      omega = lambda * Bt / _math_js__WEBPACK_IMPORTED_MODULE_0__.pi;
    }
    return [
      rho * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sin)(omega),
      rho0 - rho * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.cos)(omega)
    ];
  }

  forward.invert = function(x, y) {
    var rho2 = x * x + (y -= rho0) * y,
        cosTheta = (1 + L2 - rho2 / (A * A)) / (2 * L),
        theta = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.acos)(cosTheta),
        sinTheta = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sin)(theta),
        Bt_Bt1 = Bt + (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.atan2)(sinTheta, L - cosTheta);
    return [
      (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.asin)(x / (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sqrt)(rho2)) * _math_js__WEBPACK_IMPORTED_MODULE_0__.pi / Bt_Bt1,
      (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.asin)(1 - 2 * (theta - K2 * Bt - L * sinTheta + (1 + L2 - 2 * L * cosTheta) * Bt_Bt1) / B)
    ];
  };

  return forward;
}

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {
  var K = 1,
      m = (0,d3_geo__WEBPACK_IMPORTED_MODULE_1__.projectionMutator)(hillRaw),
      p = m(K);

  p.ratio = function(_) {
    return arguments.length ? m(K = +_) : K;
  };

  return p
      .scale(167.774)
      .center([0, 18.67]);
}


/***/ }),

/***/ "./node_modules/d3-geo-projection/src/homolosine.js":
/*!**********************************************************!*\
  !*** ./node_modules/d3-geo-projection/src/homolosine.js ***!
  \**********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "homolosineRaw": () => (/* binding */ homolosineRaw),
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var d3_geo__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! d3-geo */ "./node_modules/d3-geo/src/projection/index.js");
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./math.js */ "./node_modules/d3-geo-projection/src/math.js");
/* harmony import */ var _mollweide_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./mollweide.js */ "./node_modules/d3-geo-projection/src/mollweide.js");
/* harmony import */ var _sinusoidal_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./sinusoidal.js */ "./node_modules/d3-geo-projection/src/sinusoidal.js");
/* harmony import */ var _sinuMollweide_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./sinuMollweide.js */ "./node_modules/d3-geo-projection/src/sinuMollweide.js");






function homolosineRaw(lambda, phi) {
  return (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.abs)(phi) > _sinuMollweide_js__WEBPACK_IMPORTED_MODULE_1__.sinuMollweidePhi
      ? (lambda = (0,_mollweide_js__WEBPACK_IMPORTED_MODULE_2__.mollweideRaw)(lambda, phi), lambda[1] -= phi > 0 ? _sinuMollweide_js__WEBPACK_IMPORTED_MODULE_1__.sinuMollweideY : -_sinuMollweide_js__WEBPACK_IMPORTED_MODULE_1__.sinuMollweideY, lambda)
      : (0,_sinusoidal_js__WEBPACK_IMPORTED_MODULE_3__.sinusoidalRaw)(lambda, phi);
}

homolosineRaw.invert = function(x, y) {
  return (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.abs)(y) > _sinuMollweide_js__WEBPACK_IMPORTED_MODULE_1__.sinuMollweidePhi
      ? _mollweide_js__WEBPACK_IMPORTED_MODULE_2__.mollweideRaw.invert(x, y + (y > 0 ? _sinuMollweide_js__WEBPACK_IMPORTED_MODULE_1__.sinuMollweideY : -_sinuMollweide_js__WEBPACK_IMPORTED_MODULE_1__.sinuMollweideY))
      : _sinusoidal_js__WEBPACK_IMPORTED_MODULE_3__.sinusoidalRaw.invert(x, y);
};

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {
  return (0,d3_geo__WEBPACK_IMPORTED_MODULE_4__["default"])(homolosineRaw)
      .scale(152.63);
}


/***/ }),

/***/ "./node_modules/d3-geo-projection/src/hufnagel.js":
/*!********************************************************!*\
  !*** ./node_modules/d3-geo-projection/src/hufnagel.js ***!
  \********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "hufnagelRaw": () => (/* binding */ hufnagelRaw),
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var d3_geo__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! d3-geo */ "./node_modules/d3-geo/src/projection/index.js");
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./math.js */ "./node_modules/d3-geo-projection/src/math.js");
/* harmony import */ var _newton_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./newton.js */ "./node_modules/d3-geo-projection/src/newton.js");




function hufnagelRaw(a, b, psiMax, ratio) {
  var k = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sqrt)(
      (4 * _math_js__WEBPACK_IMPORTED_MODULE_0__.pi) /
        (2 * psiMax +
          (1 + a - b / 2) * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sin)(2 * psiMax) +
          ((a + b) / 2) * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sin)(4 * psiMax) +
          (b / 2) * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sin)(6 * psiMax))
    ),
    c = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sqrt)(
      ratio *
        (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sin)(psiMax) *
        (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sqrt)((1 + a * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.cos)(2 * psiMax) + b * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.cos)(4 * psiMax)) / (1 + a + b))
    ),
    M = psiMax * mapping(1);

  function radius(psi) {
    return (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sqrt)(1 + a * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.cos)(2 * psi) + b * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.cos)(4 * psi));
  }

  function mapping(t) {
    var psi = t * psiMax;
    return (
      (2 * psi +
        (1 + a - b / 2) * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sin)(2 * psi) +
        ((a + b) / 2) * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sin)(4 * psi) +
        (b / 2) * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sin)(6 * psi)) /
      psiMax
    );
  }

  function inversemapping(psi) {
    return radius(psi) * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sin)(psi);
  }

  var forward = function(lambda, phi) {
    var psi = psiMax * (0,_newton_js__WEBPACK_IMPORTED_MODULE_1__.solve)(mapping, (M * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sin)(phi)) / psiMax, phi / _math_js__WEBPACK_IMPORTED_MODULE_0__.pi);
    if (isNaN(psi)) psi = psiMax * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sign)(phi);
    var kr = k * radius(psi);
    return [((kr * c * lambda) / _math_js__WEBPACK_IMPORTED_MODULE_0__.pi) * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.cos)(psi), (kr / c) * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sin)(psi)];
  };

  forward.invert = function(x, y) {
    var psi = (0,_newton_js__WEBPACK_IMPORTED_MODULE_1__.solve)(inversemapping, (y * c) / k);
    return [
      (x * _math_js__WEBPACK_IMPORTED_MODULE_0__.pi) / ((0,_math_js__WEBPACK_IMPORTED_MODULE_0__.cos)(psi) * k * c * radius(psi)),
      (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.asin)((psiMax * mapping(psi / psiMax)) / M)
    ];
  };

  if (psiMax === 0) {
    k = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sqrt)(ratio / _math_js__WEBPACK_IMPORTED_MODULE_0__.pi);
    forward = function(lambda, phi) {
      return [lambda * k, (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sin)(phi) / k];
    };
    forward.invert = function(x, y) {
      return [x / k, (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.asin)(y * k)];
    };
  }

  return forward;
}

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {
  var a = 1,
    b = 0,
    psiMax = 45 * _math_js__WEBPACK_IMPORTED_MODULE_0__.radians,
    ratio = 2,
    mutate = (0,d3_geo__WEBPACK_IMPORTED_MODULE_2__.projectionMutator)(hufnagelRaw),
    projection = mutate(a, b, psiMax, ratio);

  projection.a = function(_) {
    return arguments.length ? mutate((a = +_), b, psiMax, ratio) : a;
  };
  projection.b = function(_) {
    return arguments.length ? mutate(a, (b = +_), psiMax, ratio) : b;
  };
  projection.psiMax = function(_) {
    return arguments.length
      ? mutate(a, b, (psiMax = +_ * _math_js__WEBPACK_IMPORTED_MODULE_0__.radians), ratio)
      : psiMax * _math_js__WEBPACK_IMPORTED_MODULE_0__.degrees;
  };
  projection.ratio = function(_) {
    return arguments.length ? mutate(a, b, psiMax, (ratio = +_)) : ratio;
  };

  return projection.scale(180.739);
}


/***/ }),

/***/ "./node_modules/d3-geo-projection/src/hyperelliptical.js":
/*!***************************************************************!*\
  !*** ./node_modules/d3-geo-projection/src/hyperelliptical.js ***!
  \***************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "hyperellipticalRaw": () => (/* binding */ hyperellipticalRaw),
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var d3_geo__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! d3-geo */ "./node_modules/d3-geo/src/projection/index.js");
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./math.js */ "./node_modules/d3-geo-projection/src/math.js");
/* harmony import */ var _integrate_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./integrate.js */ "./node_modules/d3-geo-projection/src/integrate.js");




function hyperellipticalRaw(alpha, k, gamma) {

  function elliptic (f) {
    return alpha + (1 - alpha) * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.pow)(1 - (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.pow)(f, k), 1 / k);
  }

  function z(f) {
    return (0,_integrate_js__WEBPACK_IMPORTED_MODULE_1__.integrate)(elliptic, 0, f, 1e-4);
  }

  var G = 1 / z(1),
      n = 1000,
      m = (1 + 1e-8) * G,
      approx = [];
  for (var i = 0; i <= n; i++)
      approx.push(z(i / n) * m);

  function Y(sinphi) {
    var rmin = 0, rmax = n, r = n >> 1;
    do {
      if (approx[r] > sinphi) rmax = r; else rmin = r;
      r = (rmin + rmax) >> 1;
    } while (r > rmin);
    var u = approx[r + 1] - approx[r];
    if (u) u = (sinphi - approx[r + 1]) / u;
    return (r + 1 + u) / n;
  }

  var ratio = 2 * Y(1) / _math_js__WEBPACK_IMPORTED_MODULE_0__.pi * G / gamma;

  var forward = function(lambda, phi) {
    var y = Y((0,_math_js__WEBPACK_IMPORTED_MODULE_0__.abs)((0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sin)(phi))),
        x = elliptic(y) * lambda;
    y /= ratio;
    return [ x, (phi >= 0) ? y : -y ];
  };

  forward.invert = function(x, y) {
    var phi;
    y *= ratio;
    if ((0,_math_js__WEBPACK_IMPORTED_MODULE_0__.abs)(y) < 1) phi = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sign)(y) * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.asin)(z((0,_math_js__WEBPACK_IMPORTED_MODULE_0__.abs)(y)) * G);
    return [ x / elliptic((0,_math_js__WEBPACK_IMPORTED_MODULE_0__.abs)(y)), phi ];
  };

  return forward;
}

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {
  var alpha = 0,
      k = 2.5,
      gamma = 1.183136, // affine = sqrt(2 * gamma / pi) = 0.8679
      m = (0,d3_geo__WEBPACK_IMPORTED_MODULE_2__.projectionMutator)(hyperellipticalRaw),
      p = m(alpha, k, gamma);

  p.alpha = function(_) {
    return arguments.length ? m(alpha = +_, k, gamma) : alpha;
  };

  p.k = function(_) {
    return arguments.length ? m(alpha, k = +_, gamma) : k;
  };

  p.gamma = function(_) {
    return arguments.length ? m(alpha, k, gamma = +_) : gamma;
  };

  return p
      .scale(152.63);
}


/***/ }),

/***/ "./node_modules/d3-geo-projection/src/index.js":
/*!*****************************************************!*\
  !*** ./node_modules/d3-geo-projection/src/index.js ***!
  \*****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "geoAiry": () => (/* reexport safe */ _airy_js__WEBPACK_IMPORTED_MODULE_0__["default"]),
/* harmony export */   "geoAiryRaw": () => (/* reexport safe */ _airy_js__WEBPACK_IMPORTED_MODULE_0__.airyRaw),
/* harmony export */   "geoAitoff": () => (/* reexport safe */ _aitoff_js__WEBPACK_IMPORTED_MODULE_1__["default"]),
/* harmony export */   "geoAitoffRaw": () => (/* reexport safe */ _aitoff_js__WEBPACK_IMPORTED_MODULE_1__.aitoffRaw),
/* harmony export */   "geoArmadillo": () => (/* reexport safe */ _armadillo_js__WEBPACK_IMPORTED_MODULE_2__["default"]),
/* harmony export */   "geoArmadilloRaw": () => (/* reexport safe */ _armadillo_js__WEBPACK_IMPORTED_MODULE_2__.armadilloRaw),
/* harmony export */   "geoAugust": () => (/* reexport safe */ _august_js__WEBPACK_IMPORTED_MODULE_3__["default"]),
/* harmony export */   "geoAugustRaw": () => (/* reexport safe */ _august_js__WEBPACK_IMPORTED_MODULE_3__.augustRaw),
/* harmony export */   "geoBaker": () => (/* reexport safe */ _baker_js__WEBPACK_IMPORTED_MODULE_4__["default"]),
/* harmony export */   "geoBakerRaw": () => (/* reexport safe */ _baker_js__WEBPACK_IMPORTED_MODULE_4__.bakerRaw),
/* harmony export */   "geoBerghaus": () => (/* reexport safe */ _berghaus_js__WEBPACK_IMPORTED_MODULE_5__["default"]),
/* harmony export */   "geoBerghausRaw": () => (/* reexport safe */ _berghaus_js__WEBPACK_IMPORTED_MODULE_5__.berghausRaw),
/* harmony export */   "geoBertin1953": () => (/* reexport safe */ _bertin_js__WEBPACK_IMPORTED_MODULE_6__["default"]),
/* harmony export */   "geoBertin1953Raw": () => (/* reexport safe */ _bertin_js__WEBPACK_IMPORTED_MODULE_6__.bertin1953Raw),
/* harmony export */   "geoBoggs": () => (/* reexport safe */ _boggs_js__WEBPACK_IMPORTED_MODULE_7__["default"]),
/* harmony export */   "geoBoggsRaw": () => (/* reexport safe */ _boggs_js__WEBPACK_IMPORTED_MODULE_7__.boggsRaw),
/* harmony export */   "geoBonne": () => (/* reexport safe */ _bonne_js__WEBPACK_IMPORTED_MODULE_8__["default"]),
/* harmony export */   "geoBonneRaw": () => (/* reexport safe */ _bonne_js__WEBPACK_IMPORTED_MODULE_8__.bonneRaw),
/* harmony export */   "geoBottomley": () => (/* reexport safe */ _bottomley_js__WEBPACK_IMPORTED_MODULE_9__["default"]),
/* harmony export */   "geoBottomleyRaw": () => (/* reexport safe */ _bottomley_js__WEBPACK_IMPORTED_MODULE_9__.bottomleyRaw),
/* harmony export */   "geoBromley": () => (/* reexport safe */ _bromley_js__WEBPACK_IMPORTED_MODULE_10__["default"]),
/* harmony export */   "geoBromleyRaw": () => (/* reexport safe */ _bromley_js__WEBPACK_IMPORTED_MODULE_10__.bromleyRaw),
/* harmony export */   "geoChamberlin": () => (/* reexport safe */ _chamberlin_js__WEBPACK_IMPORTED_MODULE_11__["default"]),
/* harmony export */   "geoChamberlinRaw": () => (/* reexport safe */ _chamberlin_js__WEBPACK_IMPORTED_MODULE_11__.chamberlinRaw),
/* harmony export */   "geoChamberlinAfrica": () => (/* reexport safe */ _chamberlin_js__WEBPACK_IMPORTED_MODULE_11__.chamberlinAfrica),
/* harmony export */   "geoCollignon": () => (/* reexport safe */ _collignon_js__WEBPACK_IMPORTED_MODULE_12__["default"]),
/* harmony export */   "geoCollignonRaw": () => (/* reexport safe */ _collignon_js__WEBPACK_IMPORTED_MODULE_12__.collignonRaw),
/* harmony export */   "geoCraig": () => (/* reexport safe */ _craig_js__WEBPACK_IMPORTED_MODULE_13__["default"]),
/* harmony export */   "geoCraigRaw": () => (/* reexport safe */ _craig_js__WEBPACK_IMPORTED_MODULE_13__.craigRaw),
/* harmony export */   "geoCraster": () => (/* reexport safe */ _craster_js__WEBPACK_IMPORTED_MODULE_14__["default"]),
/* harmony export */   "geoCrasterRaw": () => (/* reexport safe */ _craster_js__WEBPACK_IMPORTED_MODULE_14__.crasterRaw),
/* harmony export */   "geoCylindricalEqualArea": () => (/* reexport safe */ _cylindricalEqualArea_js__WEBPACK_IMPORTED_MODULE_15__["default"]),
/* harmony export */   "geoCylindricalEqualAreaRaw": () => (/* reexport safe */ _cylindricalEqualArea_js__WEBPACK_IMPORTED_MODULE_15__.cylindricalEqualAreaRaw),
/* harmony export */   "geoCylindricalStereographic": () => (/* reexport safe */ _cylindricalStereographic_js__WEBPACK_IMPORTED_MODULE_16__["default"]),
/* harmony export */   "geoCylindricalStereographicRaw": () => (/* reexport safe */ _cylindricalStereographic_js__WEBPACK_IMPORTED_MODULE_16__.cylindricalStereographicRaw),
/* harmony export */   "geoEckert1": () => (/* reexport safe */ _eckert1_js__WEBPACK_IMPORTED_MODULE_17__["default"]),
/* harmony export */   "geoEckert1Raw": () => (/* reexport safe */ _eckert1_js__WEBPACK_IMPORTED_MODULE_17__.eckert1Raw),
/* harmony export */   "geoEckert2": () => (/* reexport safe */ _eckert2_js__WEBPACK_IMPORTED_MODULE_18__["default"]),
/* harmony export */   "geoEckert2Raw": () => (/* reexport safe */ _eckert2_js__WEBPACK_IMPORTED_MODULE_18__.eckert2Raw),
/* harmony export */   "geoEckert3": () => (/* reexport safe */ _eckert3_js__WEBPACK_IMPORTED_MODULE_19__["default"]),
/* harmony export */   "geoEckert3Raw": () => (/* reexport safe */ _eckert3_js__WEBPACK_IMPORTED_MODULE_19__.eckert3Raw),
/* harmony export */   "geoEckert4": () => (/* reexport safe */ _eckert4_js__WEBPACK_IMPORTED_MODULE_20__["default"]),
/* harmony export */   "geoEckert4Raw": () => (/* reexport safe */ _eckert4_js__WEBPACK_IMPORTED_MODULE_20__.eckert4Raw),
/* harmony export */   "geoEckert5": () => (/* reexport safe */ _eckert5_js__WEBPACK_IMPORTED_MODULE_21__["default"]),
/* harmony export */   "geoEckert5Raw": () => (/* reexport safe */ _eckert5_js__WEBPACK_IMPORTED_MODULE_21__.eckert5Raw),
/* harmony export */   "geoEckert6": () => (/* reexport safe */ _eckert6_js__WEBPACK_IMPORTED_MODULE_22__["default"]),
/* harmony export */   "geoEckert6Raw": () => (/* reexport safe */ _eckert6_js__WEBPACK_IMPORTED_MODULE_22__.eckert6Raw),
/* harmony export */   "geoEisenlohr": () => (/* reexport safe */ _eisenlohr_js__WEBPACK_IMPORTED_MODULE_23__["default"]),
/* harmony export */   "geoEisenlohrRaw": () => (/* reexport safe */ _eisenlohr_js__WEBPACK_IMPORTED_MODULE_23__.eisenlohrRaw),
/* harmony export */   "geoFahey": () => (/* reexport safe */ _fahey_js__WEBPACK_IMPORTED_MODULE_24__["default"]),
/* harmony export */   "geoFaheyRaw": () => (/* reexport safe */ _fahey_js__WEBPACK_IMPORTED_MODULE_24__.faheyRaw),
/* harmony export */   "geoFoucaut": () => (/* reexport safe */ _foucaut_js__WEBPACK_IMPORTED_MODULE_25__["default"]),
/* harmony export */   "geoFoucautRaw": () => (/* reexport safe */ _foucaut_js__WEBPACK_IMPORTED_MODULE_25__.foucautRaw),
/* harmony export */   "geoFoucautSinusoidal": () => (/* reexport safe */ _foucautSinusoidal_js__WEBPACK_IMPORTED_MODULE_26__["default"]),
/* harmony export */   "geoFoucautSinusoidalRaw": () => (/* reexport safe */ _foucautSinusoidal_js__WEBPACK_IMPORTED_MODULE_26__.foucautSinusoidalRaw),
/* harmony export */   "geoGilbert": () => (/* reexport safe */ _gilbert_js__WEBPACK_IMPORTED_MODULE_27__["default"]),
/* harmony export */   "geoGingery": () => (/* reexport safe */ _gingery_js__WEBPACK_IMPORTED_MODULE_28__["default"]),
/* harmony export */   "geoGingeryRaw": () => (/* reexport safe */ _gingery_js__WEBPACK_IMPORTED_MODULE_28__.gingeryRaw),
/* harmony export */   "geoGinzburg4": () => (/* reexport safe */ _ginzburg4_js__WEBPACK_IMPORTED_MODULE_29__["default"]),
/* harmony export */   "geoGinzburg4Raw": () => (/* reexport safe */ _ginzburg4_js__WEBPACK_IMPORTED_MODULE_29__.ginzburg4Raw),
/* harmony export */   "geoGinzburg5": () => (/* reexport safe */ _ginzburg5_js__WEBPACK_IMPORTED_MODULE_30__["default"]),
/* harmony export */   "geoGinzburg5Raw": () => (/* reexport safe */ _ginzburg5_js__WEBPACK_IMPORTED_MODULE_30__.ginzburg5Raw),
/* harmony export */   "geoGinzburg6": () => (/* reexport safe */ _ginzburg6_js__WEBPACK_IMPORTED_MODULE_31__["default"]),
/* harmony export */   "geoGinzburg6Raw": () => (/* reexport safe */ _ginzburg6_js__WEBPACK_IMPORTED_MODULE_31__.ginzburg6Raw),
/* harmony export */   "geoGinzburg8": () => (/* reexport safe */ _ginzburg8_js__WEBPACK_IMPORTED_MODULE_32__["default"]),
/* harmony export */   "geoGinzburg8Raw": () => (/* reexport safe */ _ginzburg8_js__WEBPACK_IMPORTED_MODULE_32__.ginzburg8Raw),
/* harmony export */   "geoGinzburg9": () => (/* reexport safe */ _ginzburg9_js__WEBPACK_IMPORTED_MODULE_33__["default"]),
/* harmony export */   "geoGinzburg9Raw": () => (/* reexport safe */ _ginzburg9_js__WEBPACK_IMPORTED_MODULE_33__.ginzburg9Raw),
/* harmony export */   "geoGringorten": () => (/* reexport safe */ _gringorten_js__WEBPACK_IMPORTED_MODULE_34__["default"]),
/* harmony export */   "geoGringortenRaw": () => (/* reexport safe */ _gringorten_js__WEBPACK_IMPORTED_MODULE_34__.gringortenRaw),
/* harmony export */   "geoGuyou": () => (/* reexport safe */ _guyou_js__WEBPACK_IMPORTED_MODULE_35__["default"]),
/* harmony export */   "geoGuyouRaw": () => (/* reexport safe */ _guyou_js__WEBPACK_IMPORTED_MODULE_35__.guyouRaw),
/* harmony export */   "geoHammer": () => (/* reexport safe */ _hammer_js__WEBPACK_IMPORTED_MODULE_36__["default"]),
/* harmony export */   "geoHammerRaw": () => (/* reexport safe */ _hammer_js__WEBPACK_IMPORTED_MODULE_36__.hammerRaw),
/* harmony export */   "geoHammerRetroazimuthal": () => (/* reexport safe */ _hammerRetroazimuthal_js__WEBPACK_IMPORTED_MODULE_37__["default"]),
/* harmony export */   "geoHammerRetroazimuthalRaw": () => (/* reexport safe */ _hammerRetroazimuthal_js__WEBPACK_IMPORTED_MODULE_37__.hammerRetroazimuthalRaw),
/* harmony export */   "geoHealpix": () => (/* reexport safe */ _healpix_js__WEBPACK_IMPORTED_MODULE_38__["default"]),
/* harmony export */   "geoHealpixRaw": () => (/* reexport safe */ _healpix_js__WEBPACK_IMPORTED_MODULE_38__.healpixRaw),
/* harmony export */   "geoHill": () => (/* reexport safe */ _hill_js__WEBPACK_IMPORTED_MODULE_39__["default"]),
/* harmony export */   "geoHillRaw": () => (/* reexport safe */ _hill_js__WEBPACK_IMPORTED_MODULE_39__.hillRaw),
/* harmony export */   "geoHomolosine": () => (/* reexport safe */ _homolosine_js__WEBPACK_IMPORTED_MODULE_40__["default"]),
/* harmony export */   "geoHomolosineRaw": () => (/* reexport safe */ _homolosine_js__WEBPACK_IMPORTED_MODULE_40__.homolosineRaw),
/* harmony export */   "geoHufnagel": () => (/* reexport safe */ _hufnagel_js__WEBPACK_IMPORTED_MODULE_41__["default"]),
/* harmony export */   "geoHufnagelRaw": () => (/* reexport safe */ _hufnagel_js__WEBPACK_IMPORTED_MODULE_41__.hufnagelRaw),
/* harmony export */   "geoHyperelliptical": () => (/* reexport safe */ _hyperelliptical_js__WEBPACK_IMPORTED_MODULE_42__["default"]),
/* harmony export */   "geoHyperellipticalRaw": () => (/* reexport safe */ _hyperelliptical_js__WEBPACK_IMPORTED_MODULE_42__.hyperellipticalRaw),
/* harmony export */   "geoInterrupt": () => (/* reexport safe */ _interrupted_index_js__WEBPACK_IMPORTED_MODULE_43__["default"]),
/* harmony export */   "geoInterruptedBoggs": () => (/* reexport safe */ _interrupted_boggs_js__WEBPACK_IMPORTED_MODULE_44__["default"]),
/* harmony export */   "geoInterruptedHomolosine": () => (/* reexport safe */ _interrupted_homolosine_js__WEBPACK_IMPORTED_MODULE_45__["default"]),
/* harmony export */   "geoInterruptedMollweide": () => (/* reexport safe */ _interrupted_mollweide_js__WEBPACK_IMPORTED_MODULE_46__["default"]),
/* harmony export */   "geoInterruptedMollweideHemispheres": () => (/* reexport safe */ _interrupted_mollweideHemispheres_js__WEBPACK_IMPORTED_MODULE_47__["default"]),
/* harmony export */   "geoInterruptedSinuMollweide": () => (/* reexport safe */ _interrupted_sinuMollweide_js__WEBPACK_IMPORTED_MODULE_48__["default"]),
/* harmony export */   "geoInterruptedSinusoidal": () => (/* reexport safe */ _interrupted_sinusoidal_js__WEBPACK_IMPORTED_MODULE_49__["default"]),
/* harmony export */   "geoKavrayskiy7": () => (/* reexport safe */ _kavrayskiy7_js__WEBPACK_IMPORTED_MODULE_50__["default"]),
/* harmony export */   "geoKavrayskiy7Raw": () => (/* reexport safe */ _kavrayskiy7_js__WEBPACK_IMPORTED_MODULE_50__.kavrayskiy7Raw),
/* harmony export */   "geoLagrange": () => (/* reexport safe */ _lagrange_js__WEBPACK_IMPORTED_MODULE_51__["default"]),
/* harmony export */   "geoLagrangeRaw": () => (/* reexport safe */ _lagrange_js__WEBPACK_IMPORTED_MODULE_51__.lagrangeRaw),
/* harmony export */   "geoLarrivee": () => (/* reexport safe */ _larrivee_js__WEBPACK_IMPORTED_MODULE_52__["default"]),
/* harmony export */   "geoLarriveeRaw": () => (/* reexport safe */ _larrivee_js__WEBPACK_IMPORTED_MODULE_52__.larriveeRaw),
/* harmony export */   "geoLaskowski": () => (/* reexport safe */ _laskowski_js__WEBPACK_IMPORTED_MODULE_53__["default"]),
/* harmony export */   "geoLaskowskiRaw": () => (/* reexport safe */ _laskowski_js__WEBPACK_IMPORTED_MODULE_53__.laskowskiRaw),
/* harmony export */   "geoLittrow": () => (/* reexport safe */ _littrow_js__WEBPACK_IMPORTED_MODULE_54__["default"]),
/* harmony export */   "geoLittrowRaw": () => (/* reexport safe */ _littrow_js__WEBPACK_IMPORTED_MODULE_54__.littrowRaw),
/* harmony export */   "geoLoximuthal": () => (/* reexport safe */ _loximuthal_js__WEBPACK_IMPORTED_MODULE_55__["default"]),
/* harmony export */   "geoLoximuthalRaw": () => (/* reexport safe */ _loximuthal_js__WEBPACK_IMPORTED_MODULE_55__.loximuthalRaw),
/* harmony export */   "geoMiller": () => (/* reexport safe */ _miller_js__WEBPACK_IMPORTED_MODULE_56__["default"]),
/* harmony export */   "geoMillerRaw": () => (/* reexport safe */ _miller_js__WEBPACK_IMPORTED_MODULE_56__.millerRaw),
/* harmony export */   "geoModifiedStereographic": () => (/* reexport safe */ _modifiedStereographic_js__WEBPACK_IMPORTED_MODULE_57__["default"]),
/* harmony export */   "geoModifiedStereographicRaw": () => (/* reexport safe */ _modifiedStereographic_js__WEBPACK_IMPORTED_MODULE_57__.modifiedStereographicRaw),
/* harmony export */   "geoModifiedStereographicAlaska": () => (/* reexport safe */ _modifiedStereographic_js__WEBPACK_IMPORTED_MODULE_57__.modifiedStereographicAlaska),
/* harmony export */   "geoModifiedStereographicGs48": () => (/* reexport safe */ _modifiedStereographic_js__WEBPACK_IMPORTED_MODULE_57__.modifiedStereographicGs48),
/* harmony export */   "geoModifiedStereographicGs50": () => (/* reexport safe */ _modifiedStereographic_js__WEBPACK_IMPORTED_MODULE_57__.modifiedStereographicGs50),
/* harmony export */   "geoModifiedStereographicMiller": () => (/* reexport safe */ _modifiedStereographic_js__WEBPACK_IMPORTED_MODULE_57__.modifiedStereographicMiller),
/* harmony export */   "geoModifiedStereographicLee": () => (/* reexport safe */ _modifiedStereographic_js__WEBPACK_IMPORTED_MODULE_57__.modifiedStereographicLee),
/* harmony export */   "geoMollweide": () => (/* reexport safe */ _mollweide_js__WEBPACK_IMPORTED_MODULE_58__["default"]),
/* harmony export */   "geoMollweideRaw": () => (/* reexport safe */ _mollweide_js__WEBPACK_IMPORTED_MODULE_58__.mollweideRaw),
/* harmony export */   "geoMtFlatPolarParabolic": () => (/* reexport safe */ _mtFlatPolarParabolic_js__WEBPACK_IMPORTED_MODULE_59__["default"]),
/* harmony export */   "geoMtFlatPolarParabolicRaw": () => (/* reexport safe */ _mtFlatPolarParabolic_js__WEBPACK_IMPORTED_MODULE_59__.mtFlatPolarParabolicRaw),
/* harmony export */   "geoMtFlatPolarQuartic": () => (/* reexport safe */ _mtFlatPolarQuartic_js__WEBPACK_IMPORTED_MODULE_60__["default"]),
/* harmony export */   "geoMtFlatPolarQuarticRaw": () => (/* reexport safe */ _mtFlatPolarQuartic_js__WEBPACK_IMPORTED_MODULE_60__.mtFlatPolarQuarticRaw),
/* harmony export */   "geoMtFlatPolarSinusoidal": () => (/* reexport safe */ _mtFlatPolarSinusoidal_js__WEBPACK_IMPORTED_MODULE_61__["default"]),
/* harmony export */   "geoMtFlatPolarSinusoidalRaw": () => (/* reexport safe */ _mtFlatPolarSinusoidal_js__WEBPACK_IMPORTED_MODULE_61__.mtFlatPolarSinusoidalRaw),
/* harmony export */   "geoNaturalEarth2": () => (/* reexport safe */ _naturalEarth2_js__WEBPACK_IMPORTED_MODULE_62__["default"]),
/* harmony export */   "geoNaturalEarth2Raw": () => (/* reexport safe */ _naturalEarth2_js__WEBPACK_IMPORTED_MODULE_62__.naturalEarth2Raw),
/* harmony export */   "geoNellHammer": () => (/* reexport safe */ _nellHammer_js__WEBPACK_IMPORTED_MODULE_63__["default"]),
/* harmony export */   "geoNellHammerRaw": () => (/* reexport safe */ _nellHammer_js__WEBPACK_IMPORTED_MODULE_63__.nellHammerRaw),
/* harmony export */   "geoInterruptedQuarticAuthalic": () => (/* reexport safe */ _interrupted_quarticAuthalic_js__WEBPACK_IMPORTED_MODULE_64__["default"]),
/* harmony export */   "geoNicolosi": () => (/* reexport safe */ _nicolosi_js__WEBPACK_IMPORTED_MODULE_65__["default"]),
/* harmony export */   "geoNicolosiRaw": () => (/* reexport safe */ _nicolosi_js__WEBPACK_IMPORTED_MODULE_65__.nicolosiRaw),
/* harmony export */   "geoPatterson": () => (/* reexport safe */ _patterson_js__WEBPACK_IMPORTED_MODULE_66__["default"]),
/* harmony export */   "geoPattersonRaw": () => (/* reexport safe */ _patterson_js__WEBPACK_IMPORTED_MODULE_66__.pattersonRaw),
/* harmony export */   "geoPolyconic": () => (/* reexport safe */ _polyconic_js__WEBPACK_IMPORTED_MODULE_67__["default"]),
/* harmony export */   "geoPolyconicRaw": () => (/* reexport safe */ _polyconic_js__WEBPACK_IMPORTED_MODULE_67__.polyconicRaw),
/* harmony export */   "geoPolyhedral": () => (/* reexport safe */ _polyhedral_index_js__WEBPACK_IMPORTED_MODULE_68__["default"]),
/* harmony export */   "geoPolyhedralButterfly": () => (/* reexport safe */ _polyhedral_butterfly_js__WEBPACK_IMPORTED_MODULE_69__["default"]),
/* harmony export */   "geoPolyhedralCollignon": () => (/* reexport safe */ _polyhedral_collignon_js__WEBPACK_IMPORTED_MODULE_70__["default"]),
/* harmony export */   "geoPolyhedralWaterman": () => (/* reexport safe */ _polyhedral_waterman_js__WEBPACK_IMPORTED_MODULE_71__["default"]),
/* harmony export */   "geoProject": () => (/* reexport safe */ _project_index_js__WEBPACK_IMPORTED_MODULE_72__["default"]),
/* harmony export */   "geoGringortenQuincuncial": () => (/* reexport safe */ _quincuncial_gringorten_js__WEBPACK_IMPORTED_MODULE_73__["default"]),
/* harmony export */   "geoPeirceQuincuncial": () => (/* reexport safe */ _quincuncial_peirce_js__WEBPACK_IMPORTED_MODULE_74__["default"]),
/* harmony export */   "geoQuantize": () => (/* reexport safe */ _quantize_js__WEBPACK_IMPORTED_MODULE_75__["default"]),
/* harmony export */   "geoQuincuncial": () => (/* reexport safe */ _quincuncial_index_js__WEBPACK_IMPORTED_MODULE_76__["default"]),
/* harmony export */   "geoRectangularPolyconic": () => (/* reexport safe */ _rectangularPolyconic_js__WEBPACK_IMPORTED_MODULE_77__["default"]),
/* harmony export */   "geoRectangularPolyconicRaw": () => (/* reexport safe */ _rectangularPolyconic_js__WEBPACK_IMPORTED_MODULE_77__.rectangularPolyconicRaw),
/* harmony export */   "geoRobinson": () => (/* reexport safe */ _robinson_js__WEBPACK_IMPORTED_MODULE_78__["default"]),
/* harmony export */   "geoRobinsonRaw": () => (/* reexport safe */ _robinson_js__WEBPACK_IMPORTED_MODULE_78__.robinsonRaw),
/* harmony export */   "geoSatellite": () => (/* reexport safe */ _satellite_js__WEBPACK_IMPORTED_MODULE_79__["default"]),
/* harmony export */   "geoSatelliteRaw": () => (/* reexport safe */ _satellite_js__WEBPACK_IMPORTED_MODULE_79__.satelliteRaw),
/* harmony export */   "geoSinuMollweide": () => (/* reexport safe */ _sinuMollweide_js__WEBPACK_IMPORTED_MODULE_80__["default"]),
/* harmony export */   "geoSinuMollweideRaw": () => (/* reexport safe */ _sinuMollweide_js__WEBPACK_IMPORTED_MODULE_80__.sinuMollweideRaw),
/* harmony export */   "geoSinusoidal": () => (/* reexport safe */ _sinusoidal_js__WEBPACK_IMPORTED_MODULE_81__["default"]),
/* harmony export */   "geoSinusoidalRaw": () => (/* reexport safe */ _sinusoidal_js__WEBPACK_IMPORTED_MODULE_81__.sinusoidalRaw),
/* harmony export */   "geoStitch": () => (/* reexport safe */ _stitch_js__WEBPACK_IMPORTED_MODULE_82__["default"]),
/* harmony export */   "geoTimes": () => (/* reexport safe */ _times_js__WEBPACK_IMPORTED_MODULE_83__["default"]),
/* harmony export */   "geoTimesRaw": () => (/* reexport safe */ _times_js__WEBPACK_IMPORTED_MODULE_83__.timesRaw),
/* harmony export */   "geoTwoPointAzimuthal": () => (/* reexport safe */ _twoPointAzimuthal_js__WEBPACK_IMPORTED_MODULE_84__["default"]),
/* harmony export */   "geoTwoPointAzimuthalRaw": () => (/* reexport safe */ _twoPointAzimuthal_js__WEBPACK_IMPORTED_MODULE_84__.twoPointAzimuthalRaw),
/* harmony export */   "geoTwoPointAzimuthalUsa": () => (/* reexport safe */ _twoPointAzimuthal_js__WEBPACK_IMPORTED_MODULE_84__.twoPointAzimuthalUsa),
/* harmony export */   "geoTwoPointEquidistant": () => (/* reexport safe */ _twoPointEquidistant_js__WEBPACK_IMPORTED_MODULE_85__["default"]),
/* harmony export */   "geoTwoPointEquidistantRaw": () => (/* reexport safe */ _twoPointEquidistant_js__WEBPACK_IMPORTED_MODULE_85__.twoPointEquidistantRaw),
/* harmony export */   "geoTwoPointEquidistantUsa": () => (/* reexport safe */ _twoPointEquidistant_js__WEBPACK_IMPORTED_MODULE_85__.twoPointEquidistantUsa),
/* harmony export */   "geoVanDerGrinten": () => (/* reexport safe */ _vanDerGrinten_js__WEBPACK_IMPORTED_MODULE_86__["default"]),
/* harmony export */   "geoVanDerGrintenRaw": () => (/* reexport safe */ _vanDerGrinten_js__WEBPACK_IMPORTED_MODULE_86__.vanDerGrintenRaw),
/* harmony export */   "geoVanDerGrinten2": () => (/* reexport safe */ _vanDerGrinten2_js__WEBPACK_IMPORTED_MODULE_87__["default"]),
/* harmony export */   "geoVanDerGrinten2Raw": () => (/* reexport safe */ _vanDerGrinten2_js__WEBPACK_IMPORTED_MODULE_87__.vanDerGrinten2Raw),
/* harmony export */   "geoVanDerGrinten3": () => (/* reexport safe */ _vanDerGrinten3_js__WEBPACK_IMPORTED_MODULE_88__["default"]),
/* harmony export */   "geoVanDerGrinten3Raw": () => (/* reexport safe */ _vanDerGrinten3_js__WEBPACK_IMPORTED_MODULE_88__.vanDerGrinten3Raw),
/* harmony export */   "geoVanDerGrinten4": () => (/* reexport safe */ _vanDerGrinten4_js__WEBPACK_IMPORTED_MODULE_89__["default"]),
/* harmony export */   "geoVanDerGrinten4Raw": () => (/* reexport safe */ _vanDerGrinten4_js__WEBPACK_IMPORTED_MODULE_89__.vanDerGrinten4Raw),
/* harmony export */   "geoWagner": () => (/* reexport safe */ _wagner_js__WEBPACK_IMPORTED_MODULE_90__["default"]),
/* harmony export */   "geoWagner7": () => (/* reexport safe */ _wagner_js__WEBPACK_IMPORTED_MODULE_90__.wagner7),
/* harmony export */   "geoWagnerRaw": () => (/* reexport safe */ _wagner_js__WEBPACK_IMPORTED_MODULE_90__.wagnerRaw),
/* harmony export */   "geoWagner4": () => (/* reexport safe */ _wagner4_js__WEBPACK_IMPORTED_MODULE_91__["default"]),
/* harmony export */   "geoWagner4Raw": () => (/* reexport safe */ _wagner4_js__WEBPACK_IMPORTED_MODULE_91__.wagner4Raw),
/* harmony export */   "geoWagner6": () => (/* reexport safe */ _wagner6_js__WEBPACK_IMPORTED_MODULE_92__["default"]),
/* harmony export */   "geoWagner6Raw": () => (/* reexport safe */ _wagner6_js__WEBPACK_IMPORTED_MODULE_92__.wagner6Raw),
/* harmony export */   "geoWiechel": () => (/* reexport safe */ _wiechel_js__WEBPACK_IMPORTED_MODULE_93__["default"]),
/* harmony export */   "geoWiechelRaw": () => (/* reexport safe */ _wiechel_js__WEBPACK_IMPORTED_MODULE_93__.wiechelRaw),
/* harmony export */   "geoWinkel3": () => (/* reexport safe */ _winkel3_js__WEBPACK_IMPORTED_MODULE_94__["default"]),
/* harmony export */   "geoWinkel3Raw": () => (/* reexport safe */ _winkel3_js__WEBPACK_IMPORTED_MODULE_94__.winkel3Raw)
/* harmony export */ });
/* harmony import */ var _airy_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./airy.js */ "./node_modules/d3-geo-projection/src/airy.js");
/* harmony import */ var _aitoff_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./aitoff.js */ "./node_modules/d3-geo-projection/src/aitoff.js");
/* harmony import */ var _armadillo_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./armadillo.js */ "./node_modules/d3-geo-projection/src/armadillo.js");
/* harmony import */ var _august_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./august.js */ "./node_modules/d3-geo-projection/src/august.js");
/* harmony import */ var _baker_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./baker.js */ "./node_modules/d3-geo-projection/src/baker.js");
/* harmony import */ var _berghaus_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./berghaus.js */ "./node_modules/d3-geo-projection/src/berghaus.js");
/* harmony import */ var _bertin_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./bertin.js */ "./node_modules/d3-geo-projection/src/bertin.js");
/* harmony import */ var _boggs_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./boggs.js */ "./node_modules/d3-geo-projection/src/boggs.js");
/* harmony import */ var _bonne_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./bonne.js */ "./node_modules/d3-geo-projection/src/bonne.js");
/* harmony import */ var _bottomley_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./bottomley.js */ "./node_modules/d3-geo-projection/src/bottomley.js");
/* harmony import */ var _bromley_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./bromley.js */ "./node_modules/d3-geo-projection/src/bromley.js");
/* harmony import */ var _chamberlin_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./chamberlin.js */ "./node_modules/d3-geo-projection/src/chamberlin.js");
/* harmony import */ var _collignon_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./collignon.js */ "./node_modules/d3-geo-projection/src/collignon.js");
/* harmony import */ var _craig_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./craig.js */ "./node_modules/d3-geo-projection/src/craig.js");
/* harmony import */ var _craster_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./craster.js */ "./node_modules/d3-geo-projection/src/craster.js");
/* harmony import */ var _cylindricalEqualArea_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./cylindricalEqualArea.js */ "./node_modules/d3-geo-projection/src/cylindricalEqualArea.js");
/* harmony import */ var _cylindricalStereographic_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./cylindricalStereographic.js */ "./node_modules/d3-geo-projection/src/cylindricalStereographic.js");
/* harmony import */ var _eckert1_js__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./eckert1.js */ "./node_modules/d3-geo-projection/src/eckert1.js");
/* harmony import */ var _eckert2_js__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./eckert2.js */ "./node_modules/d3-geo-projection/src/eckert2.js");
/* harmony import */ var _eckert3_js__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./eckert3.js */ "./node_modules/d3-geo-projection/src/eckert3.js");
/* harmony import */ var _eckert4_js__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./eckert4.js */ "./node_modules/d3-geo-projection/src/eckert4.js");
/* harmony import */ var _eckert5_js__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./eckert5.js */ "./node_modules/d3-geo-projection/src/eckert5.js");
/* harmony import */ var _eckert6_js__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./eckert6.js */ "./node_modules/d3-geo-projection/src/eckert6.js");
/* harmony import */ var _eisenlohr_js__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./eisenlohr.js */ "./node_modules/d3-geo-projection/src/eisenlohr.js");
/* harmony import */ var _fahey_js__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./fahey.js */ "./node_modules/d3-geo-projection/src/fahey.js");
/* harmony import */ var _foucaut_js__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./foucaut.js */ "./node_modules/d3-geo-projection/src/foucaut.js");
/* harmony import */ var _foucautSinusoidal_js__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./foucautSinusoidal.js */ "./node_modules/d3-geo-projection/src/foucautSinusoidal.js");
/* harmony import */ var _gilbert_js__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./gilbert.js */ "./node_modules/d3-geo-projection/src/gilbert.js");
/* harmony import */ var _gingery_js__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ./gingery.js */ "./node_modules/d3-geo-projection/src/gingery.js");
/* harmony import */ var _ginzburg4_js__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ./ginzburg4.js */ "./node_modules/d3-geo-projection/src/ginzburg4.js");
/* harmony import */ var _ginzburg5_js__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ./ginzburg5.js */ "./node_modules/d3-geo-projection/src/ginzburg5.js");
/* harmony import */ var _ginzburg6_js__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! ./ginzburg6.js */ "./node_modules/d3-geo-projection/src/ginzburg6.js");
/* harmony import */ var _ginzburg8_js__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! ./ginzburg8.js */ "./node_modules/d3-geo-projection/src/ginzburg8.js");
/* harmony import */ var _ginzburg9_js__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! ./ginzburg9.js */ "./node_modules/d3-geo-projection/src/ginzburg9.js");
/* harmony import */ var _gringorten_js__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! ./gringorten.js */ "./node_modules/d3-geo-projection/src/gringorten.js");
/* harmony import */ var _guyou_js__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(/*! ./guyou.js */ "./node_modules/d3-geo-projection/src/guyou.js");
/* harmony import */ var _hammer_js__WEBPACK_IMPORTED_MODULE_36__ = __webpack_require__(/*! ./hammer.js */ "./node_modules/d3-geo-projection/src/hammer.js");
/* harmony import */ var _hammerRetroazimuthal_js__WEBPACK_IMPORTED_MODULE_37__ = __webpack_require__(/*! ./hammerRetroazimuthal.js */ "./node_modules/d3-geo-projection/src/hammerRetroazimuthal.js");
/* harmony import */ var _healpix_js__WEBPACK_IMPORTED_MODULE_38__ = __webpack_require__(/*! ./healpix.js */ "./node_modules/d3-geo-projection/src/healpix.js");
/* harmony import */ var _hill_js__WEBPACK_IMPORTED_MODULE_39__ = __webpack_require__(/*! ./hill.js */ "./node_modules/d3-geo-projection/src/hill.js");
/* harmony import */ var _homolosine_js__WEBPACK_IMPORTED_MODULE_40__ = __webpack_require__(/*! ./homolosine.js */ "./node_modules/d3-geo-projection/src/homolosine.js");
/* harmony import */ var _hufnagel_js__WEBPACK_IMPORTED_MODULE_41__ = __webpack_require__(/*! ./hufnagel.js */ "./node_modules/d3-geo-projection/src/hufnagel.js");
/* harmony import */ var _hyperelliptical_js__WEBPACK_IMPORTED_MODULE_42__ = __webpack_require__(/*! ./hyperelliptical.js */ "./node_modules/d3-geo-projection/src/hyperelliptical.js");
/* harmony import */ var _interrupted_index_js__WEBPACK_IMPORTED_MODULE_43__ = __webpack_require__(/*! ./interrupted/index.js */ "./node_modules/d3-geo-projection/src/interrupted/index.js");
/* harmony import */ var _interrupted_boggs_js__WEBPACK_IMPORTED_MODULE_44__ = __webpack_require__(/*! ./interrupted/boggs.js */ "./node_modules/d3-geo-projection/src/interrupted/boggs.js");
/* harmony import */ var _interrupted_homolosine_js__WEBPACK_IMPORTED_MODULE_45__ = __webpack_require__(/*! ./interrupted/homolosine.js */ "./node_modules/d3-geo-projection/src/interrupted/homolosine.js");
/* harmony import */ var _interrupted_mollweide_js__WEBPACK_IMPORTED_MODULE_46__ = __webpack_require__(/*! ./interrupted/mollweide.js */ "./node_modules/d3-geo-projection/src/interrupted/mollweide.js");
/* harmony import */ var _interrupted_mollweideHemispheres_js__WEBPACK_IMPORTED_MODULE_47__ = __webpack_require__(/*! ./interrupted/mollweideHemispheres.js */ "./node_modules/d3-geo-projection/src/interrupted/mollweideHemispheres.js");
/* harmony import */ var _interrupted_sinuMollweide_js__WEBPACK_IMPORTED_MODULE_48__ = __webpack_require__(/*! ./interrupted/sinuMollweide.js */ "./node_modules/d3-geo-projection/src/interrupted/sinuMollweide.js");
/* harmony import */ var _interrupted_sinusoidal_js__WEBPACK_IMPORTED_MODULE_49__ = __webpack_require__(/*! ./interrupted/sinusoidal.js */ "./node_modules/d3-geo-projection/src/interrupted/sinusoidal.js");
/* harmony import */ var _kavrayskiy7_js__WEBPACK_IMPORTED_MODULE_50__ = __webpack_require__(/*! ./kavrayskiy7.js */ "./node_modules/d3-geo-projection/src/kavrayskiy7.js");
/* harmony import */ var _lagrange_js__WEBPACK_IMPORTED_MODULE_51__ = __webpack_require__(/*! ./lagrange.js */ "./node_modules/d3-geo-projection/src/lagrange.js");
/* harmony import */ var _larrivee_js__WEBPACK_IMPORTED_MODULE_52__ = __webpack_require__(/*! ./larrivee.js */ "./node_modules/d3-geo-projection/src/larrivee.js");
/* harmony import */ var _laskowski_js__WEBPACK_IMPORTED_MODULE_53__ = __webpack_require__(/*! ./laskowski.js */ "./node_modules/d3-geo-projection/src/laskowski.js");
/* harmony import */ var _littrow_js__WEBPACK_IMPORTED_MODULE_54__ = __webpack_require__(/*! ./littrow.js */ "./node_modules/d3-geo-projection/src/littrow.js");
/* harmony import */ var _loximuthal_js__WEBPACK_IMPORTED_MODULE_55__ = __webpack_require__(/*! ./loximuthal.js */ "./node_modules/d3-geo-projection/src/loximuthal.js");
/* harmony import */ var _miller_js__WEBPACK_IMPORTED_MODULE_56__ = __webpack_require__(/*! ./miller.js */ "./node_modules/d3-geo-projection/src/miller.js");
/* harmony import */ var _modifiedStereographic_js__WEBPACK_IMPORTED_MODULE_57__ = __webpack_require__(/*! ./modifiedStereographic.js */ "./node_modules/d3-geo-projection/src/modifiedStereographic.js");
/* harmony import */ var _mollweide_js__WEBPACK_IMPORTED_MODULE_58__ = __webpack_require__(/*! ./mollweide.js */ "./node_modules/d3-geo-projection/src/mollweide.js");
/* harmony import */ var _mtFlatPolarParabolic_js__WEBPACK_IMPORTED_MODULE_59__ = __webpack_require__(/*! ./mtFlatPolarParabolic.js */ "./node_modules/d3-geo-projection/src/mtFlatPolarParabolic.js");
/* harmony import */ var _mtFlatPolarQuartic_js__WEBPACK_IMPORTED_MODULE_60__ = __webpack_require__(/*! ./mtFlatPolarQuartic.js */ "./node_modules/d3-geo-projection/src/mtFlatPolarQuartic.js");
/* harmony import */ var _mtFlatPolarSinusoidal_js__WEBPACK_IMPORTED_MODULE_61__ = __webpack_require__(/*! ./mtFlatPolarSinusoidal.js */ "./node_modules/d3-geo-projection/src/mtFlatPolarSinusoidal.js");
/* harmony import */ var _naturalEarth2_js__WEBPACK_IMPORTED_MODULE_62__ = __webpack_require__(/*! ./naturalEarth2.js */ "./node_modules/d3-geo-projection/src/naturalEarth2.js");
/* harmony import */ var _nellHammer_js__WEBPACK_IMPORTED_MODULE_63__ = __webpack_require__(/*! ./nellHammer.js */ "./node_modules/d3-geo-projection/src/nellHammer.js");
/* harmony import */ var _interrupted_quarticAuthalic_js__WEBPACK_IMPORTED_MODULE_64__ = __webpack_require__(/*! ./interrupted/quarticAuthalic.js */ "./node_modules/d3-geo-projection/src/interrupted/quarticAuthalic.js");
/* harmony import */ var _nicolosi_js__WEBPACK_IMPORTED_MODULE_65__ = __webpack_require__(/*! ./nicolosi.js */ "./node_modules/d3-geo-projection/src/nicolosi.js");
/* harmony import */ var _patterson_js__WEBPACK_IMPORTED_MODULE_66__ = __webpack_require__(/*! ./patterson.js */ "./node_modules/d3-geo-projection/src/patterson.js");
/* harmony import */ var _polyconic_js__WEBPACK_IMPORTED_MODULE_67__ = __webpack_require__(/*! ./polyconic.js */ "./node_modules/d3-geo-projection/src/polyconic.js");
/* harmony import */ var _polyhedral_index_js__WEBPACK_IMPORTED_MODULE_68__ = __webpack_require__(/*! ./polyhedral/index.js */ "./node_modules/d3-geo-projection/src/polyhedral/index.js");
/* harmony import */ var _polyhedral_butterfly_js__WEBPACK_IMPORTED_MODULE_69__ = __webpack_require__(/*! ./polyhedral/butterfly.js */ "./node_modules/d3-geo-projection/src/polyhedral/butterfly.js");
/* harmony import */ var _polyhedral_collignon_js__WEBPACK_IMPORTED_MODULE_70__ = __webpack_require__(/*! ./polyhedral/collignon.js */ "./node_modules/d3-geo-projection/src/polyhedral/collignon.js");
/* harmony import */ var _polyhedral_waterman_js__WEBPACK_IMPORTED_MODULE_71__ = __webpack_require__(/*! ./polyhedral/waterman.js */ "./node_modules/d3-geo-projection/src/polyhedral/waterman.js");
/* harmony import */ var _project_index_js__WEBPACK_IMPORTED_MODULE_72__ = __webpack_require__(/*! ./project/index.js */ "./node_modules/d3-geo-projection/src/project/index.js");
/* harmony import */ var _quincuncial_gringorten_js__WEBPACK_IMPORTED_MODULE_73__ = __webpack_require__(/*! ./quincuncial/gringorten.js */ "./node_modules/d3-geo-projection/src/quincuncial/gringorten.js");
/* harmony import */ var _quincuncial_peirce_js__WEBPACK_IMPORTED_MODULE_74__ = __webpack_require__(/*! ./quincuncial/peirce.js */ "./node_modules/d3-geo-projection/src/quincuncial/peirce.js");
/* harmony import */ var _quantize_js__WEBPACK_IMPORTED_MODULE_75__ = __webpack_require__(/*! ./quantize.js */ "./node_modules/d3-geo-projection/src/quantize.js");
/* harmony import */ var _quincuncial_index_js__WEBPACK_IMPORTED_MODULE_76__ = __webpack_require__(/*! ./quincuncial/index.js */ "./node_modules/d3-geo-projection/src/quincuncial/index.js");
/* harmony import */ var _rectangularPolyconic_js__WEBPACK_IMPORTED_MODULE_77__ = __webpack_require__(/*! ./rectangularPolyconic.js */ "./node_modules/d3-geo-projection/src/rectangularPolyconic.js");
/* harmony import */ var _robinson_js__WEBPACK_IMPORTED_MODULE_78__ = __webpack_require__(/*! ./robinson.js */ "./node_modules/d3-geo-projection/src/robinson.js");
/* harmony import */ var _satellite_js__WEBPACK_IMPORTED_MODULE_79__ = __webpack_require__(/*! ./satellite.js */ "./node_modules/d3-geo-projection/src/satellite.js");
/* harmony import */ var _sinuMollweide_js__WEBPACK_IMPORTED_MODULE_80__ = __webpack_require__(/*! ./sinuMollweide.js */ "./node_modules/d3-geo-projection/src/sinuMollweide.js");
/* harmony import */ var _sinusoidal_js__WEBPACK_IMPORTED_MODULE_81__ = __webpack_require__(/*! ./sinusoidal.js */ "./node_modules/d3-geo-projection/src/sinusoidal.js");
/* harmony import */ var _stitch_js__WEBPACK_IMPORTED_MODULE_82__ = __webpack_require__(/*! ./stitch.js */ "./node_modules/d3-geo-projection/src/stitch.js");
/* harmony import */ var _times_js__WEBPACK_IMPORTED_MODULE_83__ = __webpack_require__(/*! ./times.js */ "./node_modules/d3-geo-projection/src/times.js");
/* harmony import */ var _twoPointAzimuthal_js__WEBPACK_IMPORTED_MODULE_84__ = __webpack_require__(/*! ./twoPointAzimuthal.js */ "./node_modules/d3-geo-projection/src/twoPointAzimuthal.js");
/* harmony import */ var _twoPointEquidistant_js__WEBPACK_IMPORTED_MODULE_85__ = __webpack_require__(/*! ./twoPointEquidistant.js */ "./node_modules/d3-geo-projection/src/twoPointEquidistant.js");
/* harmony import */ var _vanDerGrinten_js__WEBPACK_IMPORTED_MODULE_86__ = __webpack_require__(/*! ./vanDerGrinten.js */ "./node_modules/d3-geo-projection/src/vanDerGrinten.js");
/* harmony import */ var _vanDerGrinten2_js__WEBPACK_IMPORTED_MODULE_87__ = __webpack_require__(/*! ./vanDerGrinten2.js */ "./node_modules/d3-geo-projection/src/vanDerGrinten2.js");
/* harmony import */ var _vanDerGrinten3_js__WEBPACK_IMPORTED_MODULE_88__ = __webpack_require__(/*! ./vanDerGrinten3.js */ "./node_modules/d3-geo-projection/src/vanDerGrinten3.js");
/* harmony import */ var _vanDerGrinten4_js__WEBPACK_IMPORTED_MODULE_89__ = __webpack_require__(/*! ./vanDerGrinten4.js */ "./node_modules/d3-geo-projection/src/vanDerGrinten4.js");
/* harmony import */ var _wagner_js__WEBPACK_IMPORTED_MODULE_90__ = __webpack_require__(/*! ./wagner.js */ "./node_modules/d3-geo-projection/src/wagner.js");
/* harmony import */ var _wagner4_js__WEBPACK_IMPORTED_MODULE_91__ = __webpack_require__(/*! ./wagner4.js */ "./node_modules/d3-geo-projection/src/wagner4.js");
/* harmony import */ var _wagner6_js__WEBPACK_IMPORTED_MODULE_92__ = __webpack_require__(/*! ./wagner6.js */ "./node_modules/d3-geo-projection/src/wagner6.js");
/* harmony import */ var _wiechel_js__WEBPACK_IMPORTED_MODULE_93__ = __webpack_require__(/*! ./wiechel.js */ "./node_modules/d3-geo-projection/src/wiechel.js");
/* harmony import */ var _winkel3_js__WEBPACK_IMPORTED_MODULE_94__ = __webpack_require__(/*! ./winkel3.js */ "./node_modules/d3-geo-projection/src/winkel3.js");

































































































/***/ }),

/***/ "./node_modules/d3-geo-projection/src/integrate.js":
/*!*********************************************************!*\
  !*** ./node_modules/d3-geo-projection/src/integrate.js ***!
  \*********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "integrate": () => (/* binding */ integrate)
/* harmony export */ });
// https://github.com/scijs/integrate-adaptive-simpson

// This algorithm adapted from pseudocode in:
// http://www.math.utk.edu/~ccollins/refs/Handouts/rich.pdf
function adsimp (f, a, b, fa, fm, fb, V0, tol, maxdepth, depth, state) {
  if (state.nanEncountered) {
    return NaN;
  }

  var h, f1, f2, sl, sr, s2, m, V1, V2, err;

  h = b - a;
  f1 = f(a + h * 0.25);
  f2 = f(b - h * 0.25);

  // Simple check for NaN:
  if (isNaN(f1)) {
    state.nanEncountered = true;
    return;
  }

  // Simple check for NaN:
  if (isNaN(f2)) {
    state.nanEncountered = true;
    return;
  }

  sl = h * (fa + 4 * f1 + fm) / 12;
  sr = h * (fm + 4 * f2 + fb) / 12;
  s2 = sl + sr;
  err = (s2 - V0) / 15;

  if (depth > maxdepth) {
    state.maxDepthCount++;
    return s2 + err;
  } else if (Math.abs(err) < tol) {
    return s2 + err;
  } else {
    m = a + h * 0.5;

    V1 = adsimp(f, a, m, fa, f1, fm, sl, tol * 0.5, maxdepth, depth + 1, state);

    if (isNaN(V1)) {
      state.nanEncountered = true;
      return NaN;
    }

    V2 = adsimp(f, m, b, fm, f2, fb, sr, tol * 0.5, maxdepth, depth + 1, state);

    if (isNaN(V2)) {
      state.nanEncountered = true;
      return NaN;
    }

    return V1 + V2;
  }
}

function integrate (f, a, b, tol, maxdepth) {
  var state = {
    maxDepthCount: 0,
    nanEncountered: false
  };

  if (tol === undefined) {
    tol = 1e-8;
  }
  if (maxdepth === undefined) {
    maxdepth = 20;
  }

  var fa = f(a);
  var fm = f(0.5 * (a + b));
  var fb = f(b);

  var V0 = (fa + 4 * fm + fb) * (b - a) / 6;

  var result = adsimp(f, a, b, fa, fm, fb, V0, tol, maxdepth, 1, state);

/*
  if (state.maxDepthCount > 0 && console && console.warn) {
    console.warn('integrate-adaptive-simpson: Warning: maximum recursion depth (' + maxdepth + ') reached ' + state.maxDepthCount + ' times');
  }

  if (state.nanEncountered && console && console.warn) {
    console.warn('integrate-adaptive-simpson: Warning: NaN encountered. Halting early.');
  }
*/

  return result;
}

/***/ }),

/***/ "./node_modules/d3-geo-projection/src/interrupted/boggs.js":
/*!*****************************************************************!*\
  !*** ./node_modules/d3-geo-projection/src/interrupted/boggs.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _boggs_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../boggs.js */ "./node_modules/d3-geo-projection/src/boggs.js");
/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.js */ "./node_modules/d3-geo-projection/src/interrupted/index.js");



var lobes = [[ // northern hemisphere
  [[-180,   0], [-100,  90], [ -40,   0]],
  [[ -40,   0], [  30,  90], [ 180,   0]]
], [ // southern hemisphere
  [[-180,   0], [-160, -90], [-100,   0]],
  [[-100,   0], [ -60, -90], [ -20,   0]],
  [[ -20,   0], [  20, -90], [  80,   0]],
  [[  80,   0], [ 140, -90], [ 180,   0]]
]];

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {
  return (0,_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(_boggs_js__WEBPACK_IMPORTED_MODULE_1__.boggsRaw, lobes)
      .scale(160.857);
}


/***/ }),

/***/ "./node_modules/d3-geo-projection/src/interrupted/homolosine.js":
/*!**********************************************************************!*\
  !*** ./node_modules/d3-geo-projection/src/interrupted/homolosine.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _homolosine_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../homolosine.js */ "./node_modules/d3-geo-projection/src/homolosine.js");
/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.js */ "./node_modules/d3-geo-projection/src/interrupted/index.js");



var lobes = [[ // northern hemisphere
  [[-180,   0], [-100,  90], [ -40,   0]],
  [[ -40,   0], [  30,  90], [ 180,   0]]
], [ // southern hemisphere
  [[-180,   0], [-160, -90], [-100,   0]],
  [[-100,   0], [ -60, -90], [ -20,   0]],
  [[ -20,   0], [  20, -90], [  80,   0]],
  [[  80,   0], [ 140, -90], [ 180,   0]]
]];

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {
  return (0,_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(_homolosine_js__WEBPACK_IMPORTED_MODULE_1__.homolosineRaw, lobes)
      .scale(152.63);
}


/***/ }),

/***/ "./node_modules/d3-geo-projection/src/interrupted/index.js":
/*!*****************************************************************!*\
  !*** ./node_modules/d3-geo-projection/src/interrupted/index.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var d3_array__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! d3-array */ "./node_modules/d3-array/src/merge.js");
/* harmony import */ var d3_geo__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! d3-geo */ "./node_modules/d3-geo/src/projection/index.js");
/* harmony import */ var d3_geo__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! d3-geo */ "./node_modules/d3-geo/src/stream.js");
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../math.js */ "./node_modules/d3-geo-projection/src/math.js");




function pointEqual(a, b) {
  return (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.abs)(a[0] - b[0]) < _math_js__WEBPACK_IMPORTED_MODULE_0__.epsilon && (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.abs)(a[1] - b[1]) < _math_js__WEBPACK_IMPORTED_MODULE_0__.epsilon;
}

function interpolateLine(coordinates, m) {
  var i = -1,
      n = coordinates.length,
      p0 = coordinates[0],
      p1,
      dx,
      dy,
      resampled = [];
  while (++i < n) {
    p1 = coordinates[i];
    dx = (p1[0] - p0[0]) / m;
    dy = (p1[1] - p0[1]) / m;
    for (var j = 0; j < m; ++j) resampled.push([p0[0] + j * dx, p0[1] + j * dy]);
    p0 = p1;
  }
  resampled.push(p1);
  return resampled;
}

function interpolateSphere(lobes) {
  var coordinates = [],
      lobe,
      lambda0, phi0, phi1,
      lambda2, phi2,
      i, n = lobes[0].length;

  // Northern Hemisphere
  for (i = 0; i < n; ++i) {
    lobe = lobes[0][i];
    lambda0 = lobe[0][0], phi0 = lobe[0][1], phi1 = lobe[1][1];
    lambda2 = lobe[2][0], phi2 = lobe[2][1];
    coordinates.push(interpolateLine([
      [lambda0 + _math_js__WEBPACK_IMPORTED_MODULE_0__.epsilon, phi0 + _math_js__WEBPACK_IMPORTED_MODULE_0__.epsilon],
      [lambda0 + _math_js__WEBPACK_IMPORTED_MODULE_0__.epsilon, phi1 - _math_js__WEBPACK_IMPORTED_MODULE_0__.epsilon],
      [lambda2 - _math_js__WEBPACK_IMPORTED_MODULE_0__.epsilon, phi1 - _math_js__WEBPACK_IMPORTED_MODULE_0__.epsilon],
      [lambda2 - _math_js__WEBPACK_IMPORTED_MODULE_0__.epsilon, phi2 + _math_js__WEBPACK_IMPORTED_MODULE_0__.epsilon]
    ], 30));
  }

  // Southern Hemisphere
  for (i = lobes[1].length - 1; i >= 0; --i) {
    lobe = lobes[1][i];
    lambda0 = lobe[0][0], phi0 = lobe[0][1], phi1 = lobe[1][1];
    lambda2 = lobe[2][0], phi2 = lobe[2][1];
    coordinates.push(interpolateLine([
      [lambda2 - _math_js__WEBPACK_IMPORTED_MODULE_0__.epsilon, phi2 - _math_js__WEBPACK_IMPORTED_MODULE_0__.epsilon],
      [lambda2 - _math_js__WEBPACK_IMPORTED_MODULE_0__.epsilon, phi1 + _math_js__WEBPACK_IMPORTED_MODULE_0__.epsilon],
      [lambda0 + _math_js__WEBPACK_IMPORTED_MODULE_0__.epsilon, phi1 + _math_js__WEBPACK_IMPORTED_MODULE_0__.epsilon],
      [lambda0 + _math_js__WEBPACK_IMPORTED_MODULE_0__.epsilon, phi0 - _math_js__WEBPACK_IMPORTED_MODULE_0__.epsilon]
    ], 30));
  }

  return {
    type: "Polygon",
    coordinates: [(0,d3_array__WEBPACK_IMPORTED_MODULE_1__["default"])(coordinates)]
  };
}

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(project, lobes, inverse) {
  var sphere, bounds;

  function forward(lambda, phi) {
    var sign = phi < 0 ? -1 : +1, lobe = lobes[+(phi < 0)];
    for (var i = 0, n = lobe.length - 1; i < n && lambda > lobe[i][2][0]; ++i);
    var p = project(lambda - lobe[i][1][0], phi);
    p[0] += project(lobe[i][1][0], sign * phi > sign * lobe[i][0][1] ? lobe[i][0][1] : phi)[0];
    return p;
  }

  if (inverse) {
    forward.invert = inverse(forward);
  } else if (project.invert) {
    forward.invert = function(x, y) {
      var bound = bounds[+(y < 0)], lobe = lobes[+(y < 0)];
      for (var i = 0, n = bound.length; i < n; ++i) {
        var b = bound[i];
        if (b[0][0] <= x && x < b[1][0] && b[0][1] <= y && y < b[1][1]) {
          var p = project.invert(x - project(lobe[i][1][0], 0)[0], y);
          p[0] += lobe[i][1][0];
          return pointEqual(forward(p[0], p[1]), [x, y]) ? p : null;
        }
      }
    };
  }

  var p = (0,d3_geo__WEBPACK_IMPORTED_MODULE_2__["default"])(forward),
      stream_ = p.stream;

  p.stream = function(stream) {
    var rotate = p.rotate(),
        rotateStream = stream_(stream),
        sphereStream = (p.rotate([0, 0]), stream_(stream));
    p.rotate(rotate);
    rotateStream.sphere = function() { (0,d3_geo__WEBPACK_IMPORTED_MODULE_3__["default"])(sphere, sphereStream); };
    return rotateStream;
  };
  
  p.lobes = function(_) {
    if (!arguments.length) return lobes.map(function(lobe) {
      return lobe.map(function(l) {
        return [
          [l[0][0] * _math_js__WEBPACK_IMPORTED_MODULE_0__.degrees, l[0][1] * _math_js__WEBPACK_IMPORTED_MODULE_0__.degrees],
          [l[1][0] * _math_js__WEBPACK_IMPORTED_MODULE_0__.degrees, l[1][1] * _math_js__WEBPACK_IMPORTED_MODULE_0__.degrees],
          [l[2][0] * _math_js__WEBPACK_IMPORTED_MODULE_0__.degrees, l[2][1] * _math_js__WEBPACK_IMPORTED_MODULE_0__.degrees]
        ];
      });
    });

    sphere = interpolateSphere(_);

    lobes = _.map(function(lobe) {
      return lobe.map(function(l) {
        return [
          [l[0][0] * _math_js__WEBPACK_IMPORTED_MODULE_0__.radians, l[0][1] * _math_js__WEBPACK_IMPORTED_MODULE_0__.radians],
          [l[1][0] * _math_js__WEBPACK_IMPORTED_MODULE_0__.radians, l[1][1] * _math_js__WEBPACK_IMPORTED_MODULE_0__.radians],
          [l[2][0] * _math_js__WEBPACK_IMPORTED_MODULE_0__.radians, l[2][1] * _math_js__WEBPACK_IMPORTED_MODULE_0__.radians]
        ];
      });
    });

    bounds = lobes.map(function(lobe) {
      return lobe.map(function(l) {
        var x0 = project(l[0][0], l[0][1])[0],
            x1 = project(l[2][0], l[2][1])[0],
            y0 = project(l[1][0], l[0][1])[1],
            y1 = project(l[1][0], l[1][1])[1],
            t;
        if (y0 > y1) t = y0, y0 = y1, y1 = t;
        return [[x0, y0], [x1, y1]];
      });
    });

    return p;
  };

  if (lobes != null) p.lobes(lobes);

  return p;
}


/***/ }),

/***/ "./node_modules/d3-geo-projection/src/interrupted/mollweide.js":
/*!*********************************************************************!*\
  !*** ./node_modules/d3-geo-projection/src/interrupted/mollweide.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _mollweide_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../mollweide.js */ "./node_modules/d3-geo-projection/src/mollweide.js");
/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.js */ "./node_modules/d3-geo-projection/src/interrupted/index.js");



var lobes = [[ // northern hemisphere
  [[-180,   0], [-100,  90], [ -40,   0]],
  [[ -40,   0], [  30,  90], [ 180,   0]]
], [ // southern hemisphere
  [[-180,   0], [-160, -90], [-100,   0]],
  [[-100,   0], [ -60, -90], [ -20,   0]],
  [[ -20,   0], [  20, -90], [  80,   0]],
  [[  80,   0], [ 140, -90], [ 180,   0]]
]];

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {
  return (0,_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(_mollweide_js__WEBPACK_IMPORTED_MODULE_1__.mollweideRaw, lobes)
      .scale(169.529);
}


/***/ }),

/***/ "./node_modules/d3-geo-projection/src/interrupted/mollweideHemispheres.js":
/*!********************************************************************************!*\
  !*** ./node_modules/d3-geo-projection/src/interrupted/mollweideHemispheres.js ***!
  \********************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _mollweide_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../mollweide.js */ "./node_modules/d3-geo-projection/src/mollweide.js");
/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.js */ "./node_modules/d3-geo-projection/src/interrupted/index.js");



var lobes = [[ // northern hemisphere
  [[-180,   0], [ -90,  90], [   0,   0]],
  [[   0,   0], [  90,  90], [ 180,   0]]
], [ // southern hemisphere
  [[-180,   0], [ -90, -90], [   0,   0]],
  [[   0,   0], [  90, -90], [ 180,   0]]
]];

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {
  return (0,_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(_mollweide_js__WEBPACK_IMPORTED_MODULE_1__.mollweideRaw, lobes)
      .scale(169.529)
      .rotate([20, 0]);
}


/***/ }),

/***/ "./node_modules/d3-geo-projection/src/interrupted/quarticAuthalic.js":
/*!***************************************************************************!*\
  !*** ./node_modules/d3-geo-projection/src/interrupted/quarticAuthalic.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _hammer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../hammer.js */ "./node_modules/d3-geo-projection/src/hammer.js");
/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.js */ "./node_modules/d3-geo-projection/src/interrupted/index.js");



var lobes = [[ // northern hemisphere
  [[-180,  0],  [-90,  90], [   0,  0]],
  [[   0,  0], [  90,  90], [ 180, 0]]
], [ // southern hemisphere
  [[-180, 0], [-90, -90], [  0, 0]],
  [[   0, 0], [ 90, -90], [180, 0]]
]];

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {
  return (0,_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])((0,_hammer_js__WEBPACK_IMPORTED_MODULE_1__.hammerRaw)(Infinity), lobes)
      .rotate([20, 0])
      .scale(152.63);
}


/***/ }),

/***/ "./node_modules/d3-geo-projection/src/interrupted/sinuMollweide.js":
/*!*************************************************************************!*\
  !*** ./node_modules/d3-geo-projection/src/interrupted/sinuMollweide.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _sinuMollweide_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../sinuMollweide.js */ "./node_modules/d3-geo-projection/src/sinuMollweide.js");
/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.js */ "./node_modules/d3-geo-projection/src/interrupted/index.js");
/* harmony import */ var _newton_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../newton.js */ "./node_modules/d3-geo-projection/src/newton.js");




var lobes = [[ // northern hemisphere
  [[-180,  35], [ -30,  90], [   0,  35]],
  [[   0,  35], [  30,  90], [ 180,  35]]
], [ // southern hemisphere
  [[-180, -10], [-102, -90], [ -65, -10]],
  [[ -65, -10], [   5, -90], [  77, -10]],
  [[  77, -10], [ 103, -90], [ 180, -10]]
]];

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {
  return (0,_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(_sinuMollweide_js__WEBPACK_IMPORTED_MODULE_1__.sinuMollweideRaw, lobes, _newton_js__WEBPACK_IMPORTED_MODULE_2__.solve2d)
      .rotate([-20, -55])
      .scale(164.263)
      .center([0, -5.4036]);
}


/***/ }),

/***/ "./node_modules/d3-geo-projection/src/interrupted/sinusoidal.js":
/*!**********************************************************************!*\
  !*** ./node_modules/d3-geo-projection/src/interrupted/sinusoidal.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _sinusoidal_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../sinusoidal.js */ "./node_modules/d3-geo-projection/src/sinusoidal.js");
/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.js */ "./node_modules/d3-geo-projection/src/interrupted/index.js");



var lobes = [[ // northern hemisphere
  [[-180,   0], [-110,  90], [ -40,   0]],
  [[ -40,   0], [   0,  90], [  40,   0]],
  [[  40,   0], [ 110,  90], [ 180,   0]]
], [ // southern hemisphere
  [[-180,   0], [-110, -90], [ -40,   0]],
  [[ -40,   0], [   0, -90], [  40,   0]],
  [[  40,   0], [ 110, -90], [ 180,   0]]
]];

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {
  return (0,_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(_sinusoidal_js__WEBPACK_IMPORTED_MODULE_1__.sinusoidalRaw, lobes)
      .scale(152.63)
      .rotate([-20, 0]);
}


/***/ }),

/***/ "./node_modules/d3-geo-projection/src/kavrayskiy7.js":
/*!***********************************************************!*\
  !*** ./node_modules/d3-geo-projection/src/kavrayskiy7.js ***!
  \***********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "kavrayskiy7Raw": () => (/* binding */ kavrayskiy7Raw),
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var d3_geo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! d3-geo */ "./node_modules/d3-geo/src/projection/index.js");
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./math.js */ "./node_modules/d3-geo-projection/src/math.js");



function kavrayskiy7Raw(lambda, phi) {
  return [3 / _math_js__WEBPACK_IMPORTED_MODULE_0__.tau * lambda * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sqrt)(_math_js__WEBPACK_IMPORTED_MODULE_0__.pi * _math_js__WEBPACK_IMPORTED_MODULE_0__.pi / 3 - phi * phi), phi];
}

kavrayskiy7Raw.invert = function(x, y) {
  return [_math_js__WEBPACK_IMPORTED_MODULE_0__.tau / 3 * x / (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sqrt)(_math_js__WEBPACK_IMPORTED_MODULE_0__.pi * _math_js__WEBPACK_IMPORTED_MODULE_0__.pi / 3 - y * y), y];
};

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {
  return (0,d3_geo__WEBPACK_IMPORTED_MODULE_1__["default"])(kavrayskiy7Raw)
      .scale(158.837);
}


/***/ }),

/***/ "./node_modules/d3-geo-projection/src/lagrange.js":
/*!********************************************************!*\
  !*** ./node_modules/d3-geo-projection/src/lagrange.js ***!
  \********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "lagrangeRaw": () => (/* binding */ lagrangeRaw),
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var d3_geo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! d3-geo */ "./node_modules/d3-geo/src/projection/index.js");
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./math.js */ "./node_modules/d3-geo-projection/src/math.js");



function lagrangeRaw(n) {

  function forward(lambda, phi) {
    if ((0,_math_js__WEBPACK_IMPORTED_MODULE_0__.abs)((0,_math_js__WEBPACK_IMPORTED_MODULE_0__.abs)(phi) - _math_js__WEBPACK_IMPORTED_MODULE_0__.halfPi) < _math_js__WEBPACK_IMPORTED_MODULE_0__.epsilon) return [0, phi < 0 ? -2 : 2];
    var sinPhi = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sin)(phi),
        v = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.pow)((1 + sinPhi) / (1 - sinPhi), n / 2),
        c = 0.5 * (v + 1 / v) + (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.cos)(lambda *= n);
    return [
      2 * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sin)(lambda) / c,
      (v - 1 / v) / c
    ];
  }

  forward.invert = function(x, y) {
    var y0 = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.abs)(y);
    if ((0,_math_js__WEBPACK_IMPORTED_MODULE_0__.abs)(y0 - 2) < _math_js__WEBPACK_IMPORTED_MODULE_0__.epsilon) return x ? null : [0, (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sign)(y) * _math_js__WEBPACK_IMPORTED_MODULE_0__.halfPi];
    if (y0 > 2) return null;

    x /= 2, y /= 2;
    var x2 = x * x,
        y2 = y * y,
        t = 2 * y / (1 + x2 + y2); // tanh(nPhi)
    t = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.pow)((1 + t) / (1 - t), 1 / n);
    return [
      (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.atan2)(2 * x, 1 - x2 - y2) / n,
      (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.asin)((t - 1) / (t + 1))
    ];
  };

  return forward;
}

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {
  var n = 0.5,
      m = (0,d3_geo__WEBPACK_IMPORTED_MODULE_1__.projectionMutator)(lagrangeRaw),
      p = m(n);

  p.spacing = function(_) {
    return arguments.length ? m(n = +_) : n;
  };

  return p
      .scale(124.75);
}


/***/ }),

/***/ "./node_modules/d3-geo-projection/src/larrivee.js":
/*!********************************************************!*\
  !*** ./node_modules/d3-geo-projection/src/larrivee.js ***!
  \********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "larriveeRaw": () => (/* binding */ larriveeRaw),
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var d3_geo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! d3-geo */ "./node_modules/d3-geo/src/projection/index.js");
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./math.js */ "./node_modules/d3-geo-projection/src/math.js");



var pi_sqrt2 = _math_js__WEBPACK_IMPORTED_MODULE_0__.pi / _math_js__WEBPACK_IMPORTED_MODULE_0__.sqrt2;

function larriveeRaw(lambda, phi) {
  return [
    lambda * (1 + (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sqrt)((0,_math_js__WEBPACK_IMPORTED_MODULE_0__.cos)(phi))) / 2,
    phi / ((0,_math_js__WEBPACK_IMPORTED_MODULE_0__.cos)(phi / 2) * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.cos)(lambda / 6))
  ];
}

larriveeRaw.invert = function(x, y) {
  var x0 = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.abs)(x),
      y0 = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.abs)(y),
      lambda = _math_js__WEBPACK_IMPORTED_MODULE_0__.epsilon,
      phi = _math_js__WEBPACK_IMPORTED_MODULE_0__.halfPi;
  if (y0 < pi_sqrt2) phi *= y0 / pi_sqrt2;
  else lambda += 6 * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.acos)(pi_sqrt2 / y0);
  for (var i = 0; i < 25; i++) {
    var sinPhi = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sin)(phi),
        sqrtcosPhi = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sqrt)((0,_math_js__WEBPACK_IMPORTED_MODULE_0__.cos)(phi)),
        sinPhi_2 = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sin)(phi / 2),
        cosPhi_2 = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.cos)(phi / 2),
        sinLambda_6 = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sin)(lambda / 6),
        cosLambda_6 = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.cos)(lambda / 6),
        f0 = 0.5 * lambda * (1 + sqrtcosPhi) - x0,
        f1 = phi / (cosPhi_2 * cosLambda_6) - y0,
        df0dPhi = sqrtcosPhi ? -0.25 * lambda * sinPhi / sqrtcosPhi : 0,
        df0dLambda = 0.5 * (1 + sqrtcosPhi),
        df1dPhi = (1 + 0.5 * phi * sinPhi_2 / cosPhi_2) / (cosPhi_2 * cosLambda_6),
        df1dLambda = (phi / cosPhi_2) * (sinLambda_6 / 6) / (cosLambda_6 * cosLambda_6),
        denom = df0dPhi * df1dLambda - df1dPhi * df0dLambda,
        dPhi = (f0 * df1dLambda - f1 * df0dLambda) / denom,
        dLambda = (f1 * df0dPhi - f0 * df1dPhi) / denom;
    phi -= dPhi;
    lambda -= dLambda;
    if ((0,_math_js__WEBPACK_IMPORTED_MODULE_0__.abs)(dPhi) < _math_js__WEBPACK_IMPORTED_MODULE_0__.epsilon && (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.abs)(dLambda) < _math_js__WEBPACK_IMPORTED_MODULE_0__.epsilon) break;
  }
  return [x < 0 ? -lambda : lambda, y < 0 ? -phi : phi];
};

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {
  return (0,d3_geo__WEBPACK_IMPORTED_MODULE_1__["default"])(larriveeRaw)
      .scale(97.2672);
}


/***/ }),

/***/ "./node_modules/d3-geo-projection/src/laskowski.js":
/*!*********************************************************!*\
  !*** ./node_modules/d3-geo-projection/src/laskowski.js ***!
  \*********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "laskowskiRaw": () => (/* binding */ laskowskiRaw),
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var d3_geo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! d3-geo */ "./node_modules/d3-geo/src/projection/index.js");
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./math.js */ "./node_modules/d3-geo-projection/src/math.js");



function laskowskiRaw(lambda, phi) {
  var lambda2 = lambda * lambda, phi2 = phi * phi;
  return [
    lambda * (0.975534 + phi2 * (-0.119161 + lambda2 * -0.0143059 + phi2 * -0.0547009)),
    phi * (1.00384 + lambda2 * (0.0802894 + phi2 * -0.02855 + lambda2 * 0.000199025) + phi2 * (0.0998909 + phi2 * -0.0491032))
  ];
}

laskowskiRaw.invert = function(x, y) {
  var lambda = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sign)(x) * _math_js__WEBPACK_IMPORTED_MODULE_0__.pi,
      phi = y / 2,
      i = 50;
  do {
    var lambda2 = lambda * lambda,
        phi2 = phi * phi,
        lambdaPhi = lambda * phi,
        fx = lambda * (0.975534 + phi2 * (-0.119161 + lambda2 * -0.0143059 + phi2 * -0.0547009)) - x,
        fy = phi * (1.00384 + lambda2 * (0.0802894 + phi2 * -0.02855 + lambda2 * 0.000199025) + phi2 * (0.0998909 + phi2 * -0.0491032)) - y,
        deltaxDeltaLambda = 0.975534 - phi2 * (0.119161 + 3 * lambda2 * 0.0143059 + phi2 * 0.0547009),
        deltaxDeltaPhi = -lambdaPhi * (2 * 0.119161 + 4 * 0.0547009 * phi2 + 2 * 0.0143059 * lambda2),
        deltayDeltaLambda = lambdaPhi * (2 * 0.0802894 + 4 * 0.000199025 * lambda2 + 2 * -0.02855 * phi2),
        deltayDeltaPhi = 1.00384 + lambda2 * (0.0802894 + 0.000199025 * lambda2) + phi2 * (3 * (0.0998909 - 0.02855 * lambda2) - 5 * 0.0491032 * phi2),
        denominator = deltaxDeltaPhi * deltayDeltaLambda - deltayDeltaPhi * deltaxDeltaLambda,
        deltaLambda = (fy * deltaxDeltaPhi - fx * deltayDeltaPhi) / denominator,
        deltaPhi = (fx * deltayDeltaLambda - fy * deltaxDeltaLambda) / denominator;
    lambda -= deltaLambda, phi -= deltaPhi;
  } while (((0,_math_js__WEBPACK_IMPORTED_MODULE_0__.abs)(deltaLambda) > _math_js__WEBPACK_IMPORTED_MODULE_0__.epsilon || (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.abs)(deltaPhi) > _math_js__WEBPACK_IMPORTED_MODULE_0__.epsilon) && --i > 0);
  return i && [lambda, phi];
};

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {
  return (0,d3_geo__WEBPACK_IMPORTED_MODULE_1__["default"])(laskowskiRaw)
      .scale(139.98);
}


/***/ }),

/***/ "./node_modules/d3-geo-projection/src/littrow.js":
/*!*******************************************************!*\
  !*** ./node_modules/d3-geo-projection/src/littrow.js ***!
  \*******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "littrowRaw": () => (/* binding */ littrowRaw),
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var d3_geo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! d3-geo */ "./node_modules/d3-geo/src/projection/index.js");
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./math.js */ "./node_modules/d3-geo-projection/src/math.js");



function littrowRaw(lambda, phi) {
  return [
    (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sin)(lambda) / (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.cos)(phi),
    (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.tan)(phi) * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.cos)(lambda)
  ];
}

littrowRaw.invert = function(x, y) {
  var x2 = x * x,
      y2 = y * y,
      y2_1 = y2 + 1,
      x2_y2_1 = x2 + y2_1,
      cosPhi = x
          ? _math_js__WEBPACK_IMPORTED_MODULE_0__.sqrt1_2 * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sqrt)((x2_y2_1 - (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sqrt)(x2_y2_1 * x2_y2_1 - 4 * x2)) / x2)
          : 1 / (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sqrt)(y2_1);
  return [
    (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.asin)(x * cosPhi),
    (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sign)(y) * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.acos)(cosPhi)
  ];
};

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {
  return (0,d3_geo__WEBPACK_IMPORTED_MODULE_1__["default"])(littrowRaw)
      .scale(144.049)
      .clipAngle(90 - 1e-3);
}


/***/ }),

/***/ "./node_modules/d3-geo-projection/src/loximuthal.js":
/*!**********************************************************!*\
  !*** ./node_modules/d3-geo-projection/src/loximuthal.js ***!
  \**********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "loximuthalRaw": () => (/* binding */ loximuthalRaw),
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _parallel1_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./parallel1.js */ "./node_modules/d3-geo-projection/src/parallel1.js");
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./math.js */ "./node_modules/d3-geo-projection/src/math.js");



function loximuthalRaw(phi0) {
  var cosPhi0 = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.cos)(phi0),
      tanPhi0 = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.tan)(_math_js__WEBPACK_IMPORTED_MODULE_0__.quarterPi + phi0 / 2);

  function forward(lambda, phi) {
    var y = phi - phi0,
        x = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.abs)(y) < _math_js__WEBPACK_IMPORTED_MODULE_0__.epsilon ? lambda * cosPhi0
            : (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.abs)(x = _math_js__WEBPACK_IMPORTED_MODULE_0__.quarterPi + phi / 2) < _math_js__WEBPACK_IMPORTED_MODULE_0__.epsilon || (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.abs)((0,_math_js__WEBPACK_IMPORTED_MODULE_0__.abs)(x) - _math_js__WEBPACK_IMPORTED_MODULE_0__.halfPi) < _math_js__WEBPACK_IMPORTED_MODULE_0__.epsilon
            ? 0 : lambda * y / (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.log)((0,_math_js__WEBPACK_IMPORTED_MODULE_0__.tan)(x) / tanPhi0);
    return [x, y];
  }

  forward.invert = function(x, y) {
    var lambda,
        phi = y + phi0;
    return [
      (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.abs)(y) < _math_js__WEBPACK_IMPORTED_MODULE_0__.epsilon ? x / cosPhi0
          : ((0,_math_js__WEBPACK_IMPORTED_MODULE_0__.abs)(lambda = _math_js__WEBPACK_IMPORTED_MODULE_0__.quarterPi + phi / 2) < _math_js__WEBPACK_IMPORTED_MODULE_0__.epsilon || (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.abs)((0,_math_js__WEBPACK_IMPORTED_MODULE_0__.abs)(lambda) - _math_js__WEBPACK_IMPORTED_MODULE_0__.halfPi) < _math_js__WEBPACK_IMPORTED_MODULE_0__.epsilon) ? 0
          : x * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.log)((0,_math_js__WEBPACK_IMPORTED_MODULE_0__.tan)(lambda) / tanPhi0) / y,
      phi
    ];
  };

  return forward;
}

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {
  return (0,_parallel1_js__WEBPACK_IMPORTED_MODULE_1__["default"])(loximuthalRaw)
      .parallel(40)
      .scale(158.837);
}


/***/ }),

/***/ "./node_modules/d3-geo-projection/src/math.js":
/*!****************************************************!*\
  !*** ./node_modules/d3-geo-projection/src/math.js ***!
  \****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "abs": () => (/* binding */ abs),
/* harmony export */   "atan": () => (/* binding */ atan),
/* harmony export */   "atan2": () => (/* binding */ atan2),
/* harmony export */   "ceil": () => (/* binding */ ceil),
/* harmony export */   "cos": () => (/* binding */ cos),
/* harmony export */   "exp": () => (/* binding */ exp),
/* harmony export */   "floor": () => (/* binding */ floor),
/* harmony export */   "log": () => (/* binding */ log),
/* harmony export */   "max": () => (/* binding */ max),
/* harmony export */   "min": () => (/* binding */ min),
/* harmony export */   "pow": () => (/* binding */ pow),
/* harmony export */   "round": () => (/* binding */ round),
/* harmony export */   "sign": () => (/* binding */ sign),
/* harmony export */   "sin": () => (/* binding */ sin),
/* harmony export */   "tan": () => (/* binding */ tan),
/* harmony export */   "epsilon": () => (/* binding */ epsilon),
/* harmony export */   "epsilon2": () => (/* binding */ epsilon2),
/* harmony export */   "pi": () => (/* binding */ pi),
/* harmony export */   "halfPi": () => (/* binding */ halfPi),
/* harmony export */   "quarterPi": () => (/* binding */ quarterPi),
/* harmony export */   "sqrt1_2": () => (/* binding */ sqrt1_2),
/* harmony export */   "sqrt2": () => (/* binding */ sqrt2),
/* harmony export */   "sqrtPi": () => (/* binding */ sqrtPi),
/* harmony export */   "tau": () => (/* binding */ tau),
/* harmony export */   "degrees": () => (/* binding */ degrees),
/* harmony export */   "radians": () => (/* binding */ radians),
/* harmony export */   "sinci": () => (/* binding */ sinci),
/* harmony export */   "asin": () => (/* binding */ asin),
/* harmony export */   "acos": () => (/* binding */ acos),
/* harmony export */   "sqrt": () => (/* binding */ sqrt),
/* harmony export */   "tanh": () => (/* binding */ tanh),
/* harmony export */   "sinh": () => (/* binding */ sinh),
/* harmony export */   "cosh": () => (/* binding */ cosh),
/* harmony export */   "arsinh": () => (/* binding */ arsinh),
/* harmony export */   "arcosh": () => (/* binding */ arcosh)
/* harmony export */ });
var abs = Math.abs;
var atan = Math.atan;
var atan2 = Math.atan2;
var ceil = Math.ceil;
var cos = Math.cos;
var exp = Math.exp;
var floor = Math.floor;
var log = Math.log;
var max = Math.max;
var min = Math.min;
var pow = Math.pow;
var round = Math.round;
var sign = Math.sign || function(x) { return x > 0 ? 1 : x < 0 ? -1 : 0; };
var sin = Math.sin;
var tan = Math.tan;

var epsilon = 1e-6;
var epsilon2 = 1e-12;
var pi = Math.PI;
var halfPi = pi / 2;
var quarterPi = pi / 4;
var sqrt1_2 = Math.SQRT1_2;
var sqrt2 = sqrt(2);
var sqrtPi = sqrt(pi);
var tau = pi * 2;
var degrees = 180 / pi;
var radians = pi / 180;

function sinci(x) {
  return x ? x / Math.sin(x) : 1;
}

function asin(x) {
  return x > 1 ? halfPi : x < -1 ? -halfPi : Math.asin(x);
}

function acos(x) {
  return x > 1 ? 0 : x < -1 ? pi : Math.acos(x);
}

function sqrt(x) {
  return x > 0 ? Math.sqrt(x) : 0;
}

function tanh(x) {
  x = exp(2 * x);
  return (x - 1) / (x + 1);
}

function sinh(x) {
  return (exp(x) - exp(-x)) / 2;
}

function cosh(x) {
  return (exp(x) + exp(-x)) / 2;
}

function arsinh(x) {
  return log(x + sqrt(x * x + 1));
}

function arcosh(x) {
  return log(x + sqrt(x * x - 1));
}


/***/ }),

/***/ "./node_modules/d3-geo-projection/src/miller.js":
/*!******************************************************!*\
  !*** ./node_modules/d3-geo-projection/src/miller.js ***!
  \******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "millerRaw": () => (/* binding */ millerRaw),
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var d3_geo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! d3-geo */ "./node_modules/d3-geo/src/projection/index.js");
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./math.js */ "./node_modules/d3-geo-projection/src/math.js");



function millerRaw(lambda, phi) {
  return [lambda, 1.25 * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.log)((0,_math_js__WEBPACK_IMPORTED_MODULE_0__.tan)(_math_js__WEBPACK_IMPORTED_MODULE_0__.quarterPi + 0.4 * phi))];
}

millerRaw.invert = function(x, y) {
  return [x, 2.5 * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.atan)((0,_math_js__WEBPACK_IMPORTED_MODULE_0__.exp)(0.8 * y)) - 0.625 * _math_js__WEBPACK_IMPORTED_MODULE_0__.pi];
};

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {
  return (0,d3_geo__WEBPACK_IMPORTED_MODULE_1__["default"])(millerRaw)
      .scale(108.318);
}


/***/ }),

/***/ "./node_modules/d3-geo-projection/src/modifiedStereographic.js":
/*!*********************************************************************!*\
  !*** ./node_modules/d3-geo-projection/src/modifiedStereographic.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "modifiedStereographicRaw": () => (/* binding */ modifiedStereographicRaw),
/* harmony export */   "modifiedStereographicAlaska": () => (/* binding */ modifiedStereographicAlaska),
/* harmony export */   "modifiedStereographicGs48": () => (/* binding */ modifiedStereographicGs48),
/* harmony export */   "modifiedStereographicGs50": () => (/* binding */ modifiedStereographicGs50),
/* harmony export */   "modifiedStereographicMiller": () => (/* binding */ modifiedStereographicMiller),
/* harmony export */   "modifiedStereographicLee": () => (/* binding */ modifiedStereographicLee),
/* harmony export */   "default": () => (/* binding */ modifiedStereographic)
/* harmony export */ });
/* harmony import */ var d3_geo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! d3-geo */ "./node_modules/d3-geo/src/projection/index.js");
/* harmony import */ var d3_geo__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! d3-geo */ "./node_modules/d3-geo/src/rotation.js");
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./math.js */ "./node_modules/d3-geo-projection/src/math.js");



function modifiedStereographicRaw(C) {
  var m = C.length - 1;

  function forward(lambda, phi) {
    var cosPhi = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.cos)(phi),
        k = 2 / (1 + cosPhi * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.cos)(lambda)),
        zr = k * cosPhi * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sin)(lambda),
        zi = k * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sin)(phi),
        i = m,
        w = C[i],
        ar = w[0],
        ai = w[1],
        t;
    while (--i >= 0) {
      w = C[i];
      ar = w[0] + zr * (t = ar) - zi * ai;
      ai = w[1] + zr * ai + zi * t;
    }
    ar = zr * (t = ar) - zi * ai;
    ai = zr * ai + zi * t;
    return [ar, ai];
  }

  forward.invert = function(x, y) {
    var i = 20,
        zr = x,
        zi = y;
    do {
      var j = m,
          w = C[j],
          ar = w[0],
          ai = w[1],
          br = 0,
          bi = 0,
          t;

      while (--j >= 0) {
        w = C[j];
        br = ar + zr * (t = br) - zi * bi;
        bi = ai + zr * bi + zi * t;
        ar = w[0] + zr * (t = ar) - zi * ai;
        ai = w[1] + zr * ai + zi * t;
      }
      br = ar + zr * (t = br) - zi * bi;
      bi = ai + zr * bi + zi * t;
      ar = zr * (t = ar) - zi * ai - x;
      ai = zr * ai + zi * t - y;

      var denominator = br * br + bi * bi, deltar, deltai;
      zr -= deltar = (ar * br + ai * bi) / denominator;
      zi -= deltai = (ai * br - ar * bi) / denominator;
    } while ((0,_math_js__WEBPACK_IMPORTED_MODULE_0__.abs)(deltar) + (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.abs)(deltai) > _math_js__WEBPACK_IMPORTED_MODULE_0__.epsilon * _math_js__WEBPACK_IMPORTED_MODULE_0__.epsilon && --i > 0);

    if (i) {
      var rho = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sqrt)(zr * zr + zi * zi),
          c = 2 * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.atan)(rho * 0.5),
          sinc = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sin)(c);
      return [(0,_math_js__WEBPACK_IMPORTED_MODULE_0__.atan2)(zr * sinc, rho * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.cos)(c)), rho ? (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.asin)(zi * sinc / rho) : 0];
    }
  };

  return forward;
}

var alaska = [[0.9972523, 0], [0.0052513, -0.0041175], [0.0074606, 0.0048125], [-0.0153783, -0.1968253], [0.0636871, -0.1408027], [0.3660976, -0.2937382]],
    gs48 = [[0.98879, 0], [0, 0], [-0.050909, 0], [0, 0], [0.075528, 0]],
    gs50 = [[0.9842990, 0], [0.0211642, 0.0037608], [-0.1036018, -0.0575102], [-0.0329095, -0.0320119], [0.0499471, 0.1223335], [0.0260460, 0.0899805], [0.0007388, -0.1435792], [0.0075848, -0.1334108], [-0.0216473, 0.0776645], [-0.0225161, 0.0853673]],
    miller = [[0.9245, 0], [0, 0], [0.01943, 0]],
    lee = [[0.721316, 0], [0, 0], [-0.00881625, -0.00617325]];

function modifiedStereographicAlaska() {
  return modifiedStereographic(alaska, [152, -64])
      .scale(1400)
      .center([-160.908, 62.4864])
      .clipAngle(30)
      .angle(7.8);
}

function modifiedStereographicGs48() {
  return modifiedStereographic(gs48, [95, -38])
      .scale(1000)
      .clipAngle(55)
      .center([-96.5563, 38.8675]);
}

function modifiedStereographicGs50() {
  return modifiedStereographic(gs50, [120, -45])
      .scale(359.513)
      .clipAngle(55)
      .center([-117.474, 53.0628]);
}

function modifiedStereographicMiller() {
  return modifiedStereographic(miller, [-20, -18])
      .scale(209.091)
      .center([20, 16.7214])
      .clipAngle(82);
}

function modifiedStereographicLee() {
  return modifiedStereographic(lee, [165, 10])
      .scale(250)
      .clipAngle(130)
      .center([-165, -10]);
}

function modifiedStereographic(coefficients, rotate) {
  var p = (0,d3_geo__WEBPACK_IMPORTED_MODULE_1__["default"])(modifiedStereographicRaw(coefficients)).rotate(rotate).clipAngle(90),
      r = (0,d3_geo__WEBPACK_IMPORTED_MODULE_2__["default"])(rotate),
      center = p.center;

  delete p.rotate;

  p.center = function(_) {
    return arguments.length ? center(r(_)) : r.invert(center());
  };

  return p;
}


/***/ }),

/***/ "./node_modules/d3-geo-projection/src/mollweide.js":
/*!*********************************************************!*\
  !*** ./node_modules/d3-geo-projection/src/mollweide.js ***!
  \*********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "mollweideBromleyTheta": () => (/* binding */ mollweideBromleyTheta),
/* harmony export */   "mollweideBromleyRaw": () => (/* binding */ mollweideBromleyRaw),
/* harmony export */   "mollweideRaw": () => (/* binding */ mollweideRaw),
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var d3_geo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! d3-geo */ "./node_modules/d3-geo/src/projection/index.js");
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./math.js */ "./node_modules/d3-geo-projection/src/math.js");



function mollweideBromleyTheta(cp, phi) {
  var cpsinPhi = cp * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sin)(phi), i = 30, delta;
  do phi -= delta = (phi + (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sin)(phi) - cpsinPhi) / (1 + (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.cos)(phi));
  while ((0,_math_js__WEBPACK_IMPORTED_MODULE_0__.abs)(delta) > _math_js__WEBPACK_IMPORTED_MODULE_0__.epsilon && --i > 0);
  return phi / 2;
}

function mollweideBromleyRaw(cx, cy, cp) {

  function forward(lambda, phi) {
    return [cx * lambda * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.cos)(phi = mollweideBromleyTheta(cp, phi)), cy * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sin)(phi)];
  }

  forward.invert = function(x, y) {
    return y = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.asin)(y / cy), [x / (cx * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.cos)(y)), (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.asin)((2 * y + (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sin)(2 * y)) / cp)];
  };

  return forward;
}

var mollweideRaw = mollweideBromleyRaw(_math_js__WEBPACK_IMPORTED_MODULE_0__.sqrt2 / _math_js__WEBPACK_IMPORTED_MODULE_0__.halfPi, _math_js__WEBPACK_IMPORTED_MODULE_0__.sqrt2, _math_js__WEBPACK_IMPORTED_MODULE_0__.pi);

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {
  return (0,d3_geo__WEBPACK_IMPORTED_MODULE_1__["default"])(mollweideRaw)
      .scale(169.529);
}


/***/ }),

/***/ "./node_modules/d3-geo-projection/src/mtFlatPolarParabolic.js":
/*!********************************************************************!*\
  !*** ./node_modules/d3-geo-projection/src/mtFlatPolarParabolic.js ***!
  \********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "mtFlatPolarParabolicRaw": () => (/* binding */ mtFlatPolarParabolicRaw),
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var d3_geo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! d3-geo */ "./node_modules/d3-geo/src/projection/index.js");
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./math.js */ "./node_modules/d3-geo-projection/src/math.js");



var sqrt6 = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sqrt)(6),
    sqrt7 = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sqrt)(7);

function mtFlatPolarParabolicRaw(lambda, phi) {
  var theta = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.asin)(7 * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sin)(phi) / (3 * sqrt6));
  return [
    sqrt6 * lambda * (2 * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.cos)(2 * theta / 3) - 1) / sqrt7,
    9 * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sin)(theta / 3) / sqrt7
  ];
}

mtFlatPolarParabolicRaw.invert = function(x, y) {
  var theta = 3 * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.asin)(y * sqrt7 / 9);
  return [
    x * sqrt7 / (sqrt6 * (2 * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.cos)(2 * theta / 3) - 1)),
    (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.asin)((0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sin)(theta) * 3 * sqrt6 / 7)
  ];
};

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {
  return (0,d3_geo__WEBPACK_IMPORTED_MODULE_1__["default"])(mtFlatPolarParabolicRaw)
      .scale(164.859);
}


/***/ }),

/***/ "./node_modules/d3-geo-projection/src/mtFlatPolarQuartic.js":
/*!******************************************************************!*\
  !*** ./node_modules/d3-geo-projection/src/mtFlatPolarQuartic.js ***!
  \******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "mtFlatPolarQuarticRaw": () => (/* binding */ mtFlatPolarQuarticRaw),
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var d3_geo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! d3-geo */ "./node_modules/d3-geo/src/projection/index.js");
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./math.js */ "./node_modules/d3-geo-projection/src/math.js");



function mtFlatPolarQuarticRaw(lambda, phi) {
  var k = (1 + _math_js__WEBPACK_IMPORTED_MODULE_0__.sqrt1_2) * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sin)(phi),
      theta = phi;
  for (var i = 0, delta; i < 25; i++) {
    theta -= delta = ((0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sin)(theta / 2) + (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sin)(theta) - k) / (0.5 * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.cos)(theta / 2) + (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.cos)(theta));
    if ((0,_math_js__WEBPACK_IMPORTED_MODULE_0__.abs)(delta) < _math_js__WEBPACK_IMPORTED_MODULE_0__.epsilon) break;
  }
  return [
    lambda * (1 + 2 * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.cos)(theta) / (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.cos)(theta / 2)) / (3 * _math_js__WEBPACK_IMPORTED_MODULE_0__.sqrt2),
    2 * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sqrt)(3) * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sin)(theta / 2) / (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sqrt)(2 + _math_js__WEBPACK_IMPORTED_MODULE_0__.sqrt2)
  ];
}

mtFlatPolarQuarticRaw.invert = function(x, y) {
  var sinTheta_2 = y * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sqrt)(2 + _math_js__WEBPACK_IMPORTED_MODULE_0__.sqrt2) / (2 * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sqrt)(3)),
      theta = 2 * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.asin)(sinTheta_2);
  return [
    3 * _math_js__WEBPACK_IMPORTED_MODULE_0__.sqrt2 * x / (1 + 2 * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.cos)(theta) / (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.cos)(theta / 2)),
    (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.asin)((sinTheta_2 + (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sin)(theta)) / (1 + _math_js__WEBPACK_IMPORTED_MODULE_0__.sqrt1_2))
  ];
};

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {
  return (0,d3_geo__WEBPACK_IMPORTED_MODULE_1__["default"])(mtFlatPolarQuarticRaw)
      .scale(188.209);
}


/***/ }),

/***/ "./node_modules/d3-geo-projection/src/mtFlatPolarSinusoidal.js":
/*!*********************************************************************!*\
  !*** ./node_modules/d3-geo-projection/src/mtFlatPolarSinusoidal.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "mtFlatPolarSinusoidalRaw": () => (/* binding */ mtFlatPolarSinusoidalRaw),
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var d3_geo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! d3-geo */ "./node_modules/d3-geo/src/projection/index.js");
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./math.js */ "./node_modules/d3-geo-projection/src/math.js");



function mtFlatPolarSinusoidalRaw(lambda, phi) {
  var A = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sqrt)(6 / (4 + _math_js__WEBPACK_IMPORTED_MODULE_0__.pi)),
      k = (1 + _math_js__WEBPACK_IMPORTED_MODULE_0__.pi / 4) * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sin)(phi),
      theta = phi / 2;
  for (var i = 0, delta; i < 25; i++) {
    theta -= delta = (theta / 2 + (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sin)(theta) - k) / (0.5 + (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.cos)(theta));
    if ((0,_math_js__WEBPACK_IMPORTED_MODULE_0__.abs)(delta) < _math_js__WEBPACK_IMPORTED_MODULE_0__.epsilon) break;
  }
  return [
    A * (0.5 + (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.cos)(theta)) * lambda / 1.5,
    A * theta
  ];
}

mtFlatPolarSinusoidalRaw.invert = function(x, y) {
  var A = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sqrt)(6 / (4 + _math_js__WEBPACK_IMPORTED_MODULE_0__.pi)),
      theta = y / A;
  if ((0,_math_js__WEBPACK_IMPORTED_MODULE_0__.abs)((0,_math_js__WEBPACK_IMPORTED_MODULE_0__.abs)(theta) - _math_js__WEBPACK_IMPORTED_MODULE_0__.halfPi) < _math_js__WEBPACK_IMPORTED_MODULE_0__.epsilon) theta = theta < 0 ? -_math_js__WEBPACK_IMPORTED_MODULE_0__.halfPi : _math_js__WEBPACK_IMPORTED_MODULE_0__.halfPi;
  return [
    1.5 * x / (A * (0.5 + (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.cos)(theta))),
    (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.asin)((theta / 2 + (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sin)(theta)) / (1 + _math_js__WEBPACK_IMPORTED_MODULE_0__.pi / 4))
  ];
};

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {
  return (0,d3_geo__WEBPACK_IMPORTED_MODULE_1__["default"])(mtFlatPolarSinusoidalRaw)
      .scale(166.518);
}


/***/ }),

/***/ "./node_modules/d3-geo-projection/src/naturalEarth2.js":
/*!*************************************************************!*\
  !*** ./node_modules/d3-geo-projection/src/naturalEarth2.js ***!
  \*************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "naturalEarth2Raw": () => (/* binding */ naturalEarth2Raw),
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var d3_geo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! d3-geo */ "./node_modules/d3-geo/src/projection/index.js");
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./math.js */ "./node_modules/d3-geo-projection/src/math.js");



function naturalEarth2Raw(lambda, phi) {
  var phi2 = phi * phi, phi4 = phi2 * phi2, phi6 = phi2 * phi4;
  return [
    lambda * (0.84719 - 0.13063 * phi2 + phi6 * phi6 * (-0.04515 + 0.05494 * phi2 - 0.02326 * phi4 + 0.00331 * phi6)),
    phi * (1.01183 + phi4 * phi4 * (-0.02625 + 0.01926 * phi2 - 0.00396 * phi4))
  ];
}

naturalEarth2Raw.invert = function(x, y) {
  var phi = y, i = 25, delta, phi2, phi4, phi6;
  do {
    phi2 = phi * phi; phi4 = phi2 * phi2;
    phi -= delta = ((phi * (1.01183 + phi4 * phi4 * (-0.02625 + 0.01926 * phi2 - 0.00396 * phi4))) - y) /
      (1.01183 + phi4 * phi4 * ((9 * -0.02625) + (11 * 0.01926) * phi2 + (13 * -0.00396) * phi4));
  } while ((0,_math_js__WEBPACK_IMPORTED_MODULE_0__.abs)(delta) > _math_js__WEBPACK_IMPORTED_MODULE_0__.epsilon2 && --i > 0);
  phi2 = phi * phi; phi4 = phi2 * phi2; phi6 = phi2 * phi4;
  return [
    x / (0.84719 - 0.13063 * phi2 + phi6 * phi6 * (-0.04515 + 0.05494 * phi2 - 0.02326 * phi4 + 0.00331 * phi6)),
    phi
  ];
};

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {
  return (0,d3_geo__WEBPACK_IMPORTED_MODULE_1__["default"])(naturalEarth2Raw)
      .scale(175.295);
}


/***/ }),

/***/ "./node_modules/d3-geo-projection/src/nellHammer.js":
/*!**********************************************************!*\
  !*** ./node_modules/d3-geo-projection/src/nellHammer.js ***!
  \**********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "nellHammerRaw": () => (/* binding */ nellHammerRaw),
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var d3_geo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! d3-geo */ "./node_modules/d3-geo/src/projection/index.js");
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./math.js */ "./node_modules/d3-geo-projection/src/math.js");



function nellHammerRaw(lambda, phi) {
  return [
    lambda * (1 + (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.cos)(phi)) / 2,
    2 * (phi - (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.tan)(phi / 2))
  ];
}

nellHammerRaw.invert = function(x, y) {
  var p = y / 2;
  for (var i = 0, delta = Infinity; i < 10 && (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.abs)(delta) > _math_js__WEBPACK_IMPORTED_MODULE_0__.epsilon; ++i) {
    var c = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.cos)(y / 2);
    y -= delta = (y - (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.tan)(y / 2) - p) / (1 - 0.5 / (c * c));
  }
  return [
    2 * x / (1 + (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.cos)(y)),
    y
  ];
};

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {
  return (0,d3_geo__WEBPACK_IMPORTED_MODULE_1__["default"])(nellHammerRaw)
      .scale(152.63);
}


/***/ }),

/***/ "./node_modules/d3-geo-projection/src/newton.js":
/*!******************************************************!*\
  !*** ./node_modules/d3-geo-projection/src/newton.js ***!
  \******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "solve": () => (/* binding */ solve),
/* harmony export */   "solve2d": () => (/* binding */ solve2d)
/* harmony export */ });
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./math.js */ "./node_modules/d3-geo-projection/src/math.js");


// Approximate Newton-Raphson
// Solve f(x) = y, start from x
function solve(f, y, x) {
  var steps = 100, delta, f0, f1;
  x = x === undefined ? 0 : +x;
  y = +y;
  do {
    f0 = f(x);
    f1 = f(x + _math_js__WEBPACK_IMPORTED_MODULE_0__.epsilon);
    if (f0 === f1) f1 = f0 + _math_js__WEBPACK_IMPORTED_MODULE_0__.epsilon;
    x -= delta = (-1 * _math_js__WEBPACK_IMPORTED_MODULE_0__.epsilon * (f0 - y)) / (f0 - f1);
  } while (steps-- > 0 && (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.abs)(delta) > _math_js__WEBPACK_IMPORTED_MODULE_0__.epsilon);
  return steps < 0 ? NaN : x;
}

// Approximate Newton-Raphson in 2D
// Solve f(a,b) = [x,y]
function solve2d(f, MAX_ITERATIONS, eps) {
  if (MAX_ITERATIONS === undefined) MAX_ITERATIONS = 40;
  if (eps === undefined) eps = _math_js__WEBPACK_IMPORTED_MODULE_0__.epsilon2;
  return function(x, y, a, b) {
    var err2, da, db;
    a = a === undefined ? 0 : +a;
    b = b === undefined ? 0 : +b;
    for (var i = 0; i < MAX_ITERATIONS; i++) {
      var p = f(a, b),
        // diffs
        tx = p[0] - x,
        ty = p[1] - y;
      if ((0,_math_js__WEBPACK_IMPORTED_MODULE_0__.abs)(tx) < eps && (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.abs)(ty) < eps) break; // we're there!

      // backtrack if we overshot
      var h = tx * tx + ty * ty;
      if (h > err2) {
        a -= da /= 2;
        b -= db /= 2;
        continue;
      }
      err2 = h;

      // partial derivatives
      var ea = (a > 0 ? -1 : 1) * eps,
        eb = (b > 0 ? -1 : 1) * eps,
        pa = f(a + ea, b),
        pb = f(a, b + eb),
        dxa = (pa[0] - p[0]) / ea,
        dya = (pa[1] - p[1]) / ea,
        dxb = (pb[0] - p[0]) / eb,
        dyb = (pb[1] - p[1]) / eb,
        // determinant
        D = dyb * dxa - dya * dxb,
        // newton step — or half-step for small D
        l = ((0,_math_js__WEBPACK_IMPORTED_MODULE_0__.abs)(D) < 0.5 ? 0.5 : 1) / D;
      da = (ty * dxb - tx * dyb) * l;
      db = (tx * dya - ty * dxa) * l;
      a += da;
      b += db;
      if ((0,_math_js__WEBPACK_IMPORTED_MODULE_0__.abs)(da) < eps && (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.abs)(db) < eps) break; // we're crawling
    }
    return [a, b];
  };
}

/***/ }),

/***/ "./node_modules/d3-geo-projection/src/nicolosi.js":
/*!********************************************************!*\
  !*** ./node_modules/d3-geo-projection/src/nicolosi.js ***!
  \********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "nicolosiRaw": () => (/* binding */ nicolosiRaw),
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var d3_geo__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! d3-geo */ "./node_modules/d3-geo/src/projection/index.js");
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./math.js */ "./node_modules/d3-geo-projection/src/math.js");
/* harmony import */ var _newton_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./newton.js */ "./node_modules/d3-geo-projection/src/newton.js");




// Based on Torben Jansen's implementation
// https://beta.observablehq.com/@toja/nicolosi-globular-projection
// https://beta.observablehq.com/@toja/nicolosi-globular-inverse

function nicolosiRaw(lambda, phi) {
  var sinPhi = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sin)(phi),
    q = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.cos)(phi),
    s = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sign)(lambda);

  if (lambda === 0 || (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.abs)(phi) === _math_js__WEBPACK_IMPORTED_MODULE_0__.halfPi) return [0, phi];
  else if (phi === 0) return [lambda, 0];
  else if ((0,_math_js__WEBPACK_IMPORTED_MODULE_0__.abs)(lambda) === _math_js__WEBPACK_IMPORTED_MODULE_0__.halfPi) return [lambda * q, _math_js__WEBPACK_IMPORTED_MODULE_0__.halfPi * sinPhi];

  var b = _math_js__WEBPACK_IMPORTED_MODULE_0__.pi / (2 * lambda) - (2 * lambda) / _math_js__WEBPACK_IMPORTED_MODULE_0__.pi,
    c = (2 * phi) / _math_js__WEBPACK_IMPORTED_MODULE_0__.pi,
    d = (1 - c * c) / (sinPhi - c);

  var b2 = b * b,
    d2 = d * d,
    b2d2 = 1 + b2 / d2,
    d2b2 = 1 + d2 / b2;

  var M = ((b * sinPhi) / d - b / 2) / b2d2,
    N = ((d2 * sinPhi) / b2 + d / 2) / d2b2,
    m = M * M + (q * q) / b2d2,
    n = N * N - ((d2 * sinPhi * sinPhi) / b2 + d * sinPhi - 1) / d2b2;

  return [
    _math_js__WEBPACK_IMPORTED_MODULE_0__.halfPi * (M + (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sqrt)(m) * s),
    _math_js__WEBPACK_IMPORTED_MODULE_0__.halfPi * (N + (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sqrt)(n < 0 ? 0 : n) * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sign)(-phi * b) * s)
  ];
}

nicolosiRaw.invert = function(x, y) {

  x /= _math_js__WEBPACK_IMPORTED_MODULE_0__.halfPi;
  y /= _math_js__WEBPACK_IMPORTED_MODULE_0__.halfPi;

  var x2 = x * x,
    y2 = y * y,
    x2y2 = x2 + y2,
    pi2 = _math_js__WEBPACK_IMPORTED_MODULE_0__.pi * _math_js__WEBPACK_IMPORTED_MODULE_0__.pi;

  return [
    x ? (x2y2 -1 + (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sqrt)((1 - x2y2) * (1 - x2y2) + 4 * x2)) / (2 * x) * _math_js__WEBPACK_IMPORTED_MODULE_0__.halfPi : 0,
    (0,_newton_js__WEBPACK_IMPORTED_MODULE_1__.solve)(function(phi) {
      return (
        x2y2 * (_math_js__WEBPACK_IMPORTED_MODULE_0__.pi * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sin)(phi) - 2 * phi) * _math_js__WEBPACK_IMPORTED_MODULE_0__.pi +
        4 * phi * phi * (y - (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sin)(phi)) +
        2 * _math_js__WEBPACK_IMPORTED_MODULE_0__.pi * phi -
        pi2 * y
      );
    }, 0)
  ];
};

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {
  return (0,d3_geo__WEBPACK_IMPORTED_MODULE_2__["default"])(nicolosiRaw)
    .scale(127.267);
}


/***/ }),

/***/ "./node_modules/d3-geo-projection/src/noop.js":
/*!****************************************************!*\
  !*** ./node_modules/d3-geo-projection/src/noop.js ***!
  \****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (() => {});


/***/ }),

/***/ "./node_modules/d3-geo-projection/src/parallel1.js":
/*!*********************************************************!*\
  !*** ./node_modules/d3-geo-projection/src/parallel1.js ***!
  \*********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var d3_geo__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! d3-geo */ "./node_modules/d3-geo/src/projection/index.js");
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./math.js */ "./node_modules/d3-geo-projection/src/math.js");



/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(projectAt) {
  var phi0 = 0,
      m = (0,d3_geo__WEBPACK_IMPORTED_MODULE_0__.projectionMutator)(projectAt),
      p = m(phi0);

  p.parallel = function(_) {
    return arguments.length ? m(phi0 = _ * _math_js__WEBPACK_IMPORTED_MODULE_1__.radians) : phi0 * _math_js__WEBPACK_IMPORTED_MODULE_1__.degrees;
  };

  return p;
}


/***/ }),

/***/ "./node_modules/d3-geo-projection/src/patterson.js":
/*!*********************************************************!*\
  !*** ./node_modules/d3-geo-projection/src/patterson.js ***!
  \*********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "pattersonRaw": () => (/* binding */ pattersonRaw),
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var d3_geo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! d3-geo */ "./node_modules/d3-geo/src/projection/index.js");
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./math.js */ "./node_modules/d3-geo-projection/src/math.js");



// Based on Java implementation by Bojan Savric.
// https://github.com/OSUCartography/JMapProjLib/blob/master/src/com/jhlabs/map/proj/PattersonProjection.java

var pattersonK1 = 1.0148,
    pattersonK2 = 0.23185,
    pattersonK3 = -0.14499,
    pattersonK4 = 0.02406,
    pattersonC1 = pattersonK1,
    pattersonC2 = 5 * pattersonK2,
    pattersonC3 = 7 * pattersonK3,
    pattersonC4 = 9 * pattersonK4,
    pattersonYmax = 1.790857183;

function pattersonRaw(lambda, phi) {
  var phi2 = phi * phi;
  return [
    lambda,
    phi * (pattersonK1 + phi2 * phi2 * (pattersonK2 + phi2 * (pattersonK3 + pattersonK4 * phi2)))
  ];
}

pattersonRaw.invert = function(x, y) {
  if (y > pattersonYmax) y = pattersonYmax;
  else if (y < -pattersonYmax) y = -pattersonYmax;
  var yc = y, delta;

  do { // Newton-Raphson
    var y2 = yc * yc;
    yc -= delta = ((yc * (pattersonK1 + y2 * y2 * (pattersonK2 + y2 * (pattersonK3 + pattersonK4 * y2)))) - y) / (pattersonC1 + y2 * y2 * (pattersonC2 + y2 * (pattersonC3 + pattersonC4 * y2)));
  } while ((0,_math_js__WEBPACK_IMPORTED_MODULE_0__.abs)(delta) > _math_js__WEBPACK_IMPORTED_MODULE_0__.epsilon);

  return [x, yc];
};

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {
  return (0,d3_geo__WEBPACK_IMPORTED_MODULE_1__["default"])(pattersonRaw)
      .scale(139.319);
}


/***/ }),

/***/ "./node_modules/d3-geo-projection/src/polyconic.js":
/*!*********************************************************!*\
  !*** ./node_modules/d3-geo-projection/src/polyconic.js ***!
  \*********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "polyconicRaw": () => (/* binding */ polyconicRaw),
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var d3_geo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! d3-geo */ "./node_modules/d3-geo/src/projection/index.js");
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./math.js */ "./node_modules/d3-geo-projection/src/math.js");



function polyconicRaw(lambda, phi) {
  if ((0,_math_js__WEBPACK_IMPORTED_MODULE_0__.abs)(phi) < _math_js__WEBPACK_IMPORTED_MODULE_0__.epsilon) return [lambda, 0];
  var tanPhi = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.tan)(phi),
      k = lambda * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sin)(phi);
  return [
    (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sin)(k) / tanPhi,
    phi + (1 - (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.cos)(k)) / tanPhi
  ];
}

polyconicRaw.invert = function(x, y) {
  if ((0,_math_js__WEBPACK_IMPORTED_MODULE_0__.abs)(y) < _math_js__WEBPACK_IMPORTED_MODULE_0__.epsilon) return [x, 0];
  var k = x * x + y * y,
      phi = y * 0.5,
      i = 10, delta;
  do {
    var tanPhi = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.tan)(phi),
        secPhi = 1 / (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.cos)(phi),
        j = k - 2 * y * phi + phi * phi;
    phi -= delta = (tanPhi * j + 2 * (phi - y)) / (2 + j * secPhi * secPhi + 2 * (phi - y) * tanPhi);
  } while ((0,_math_js__WEBPACK_IMPORTED_MODULE_0__.abs)(delta) > _math_js__WEBPACK_IMPORTED_MODULE_0__.epsilon && --i > 0);
  tanPhi = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.tan)(phi);
  return [
    ((0,_math_js__WEBPACK_IMPORTED_MODULE_0__.abs)(y) < (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.abs)(phi + 1 / tanPhi) ? (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.asin)(x * tanPhi) : (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sign)(y) * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sign)(x) * ((0,_math_js__WEBPACK_IMPORTED_MODULE_0__.acos)((0,_math_js__WEBPACK_IMPORTED_MODULE_0__.abs)(x * tanPhi)) + _math_js__WEBPACK_IMPORTED_MODULE_0__.halfPi)) / (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sin)(phi),
    phi
  ];
};

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {
  return (0,d3_geo__WEBPACK_IMPORTED_MODULE_1__["default"])(polyconicRaw)
      .scale(103.74);
}


/***/ }),

/***/ "./node_modules/d3-geo-projection/src/polyhedral/butterfly.js":
/*!********************************************************************!*\
  !*** ./node_modules/d3-geo-projection/src/polyhedral/butterfly.js ***!
  \********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var d3_geo__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! d3-geo */ "./node_modules/d3-geo/src/centroid.js");
/* harmony import */ var d3_geo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! d3-geo */ "./node_modules/d3-geo/src/projection/gnomonic.js");
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../math.js */ "./node_modules/d3-geo-projection/src/math.js");
/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./index.js */ "./node_modules/d3-geo-projection/src/polyhedral/index.js");
/* harmony import */ var _octahedron_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./octahedron.js */ "./node_modules/d3-geo-projection/src/polyhedral/octahedron.js");





/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(faceProjection) {

  faceProjection = faceProjection || function(face) {
    var c = (0,d3_geo__WEBPACK_IMPORTED_MODULE_0__["default"])({type: "MultiPoint", coordinates: face});
    return (0,d3_geo__WEBPACK_IMPORTED_MODULE_1__["default"])().scale(1).translate([0, 0]).rotate([-c[0], -c[1]]);
  };

  var faces = _octahedron_js__WEBPACK_IMPORTED_MODULE_2__["default"].map(function(face) {
    return {face: face, project: faceProjection(face)};
  });

  [-1, 0, 0, 1, 0, 1, 4, 5].forEach(function(d, i) {
    var node = faces[d];
    node && (node.children || (node.children = [])).push(faces[i]);
  });

  return (0,_index_js__WEBPACK_IMPORTED_MODULE_3__["default"])(faces[0], function(lambda, phi) {
        return faces[lambda < -_math_js__WEBPACK_IMPORTED_MODULE_4__.pi / 2 ? phi < 0 ? 6 : 4
            : lambda < 0 ? phi < 0 ? 2 : 0
            : lambda < _math_js__WEBPACK_IMPORTED_MODULE_4__.pi / 2 ? phi < 0 ? 3 : 1
            : phi < 0 ? 7 : 5];
      })
      .angle(-30)
      .scale(101.858)
      .center([0, 45]);
}


/***/ }),

/***/ "./node_modules/d3-geo-projection/src/polyhedral/collignon.js":
/*!********************************************************************!*\
  !*** ./node_modules/d3-geo-projection/src/polyhedral/collignon.js ***!
  \********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var d3_geo__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! d3-geo */ "./node_modules/d3-geo/src/centroid.js");
/* harmony import */ var d3_geo__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! d3-geo */ "./node_modules/d3-geo/src/projection/index.js");
/* harmony import */ var _collignon_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../collignon.js */ "./node_modules/d3-geo-projection/src/collignon.js");
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../math.js */ "./node_modules/d3-geo-projection/src/math.js");
/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./index.js */ "./node_modules/d3-geo-projection/src/polyhedral/index.js");
/* harmony import */ var _octahedron_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./octahedron.js */ "./node_modules/d3-geo-projection/src/polyhedral/octahedron.js");






var kx = 2 / (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sqrt)(3);

function collignonK(a, b) {
  var p = (0,_collignon_js__WEBPACK_IMPORTED_MODULE_1__.collignonRaw)(a, b);
  return [p[0] * kx, p[1]];
}

collignonK.invert = function(x,y) {
  return _collignon_js__WEBPACK_IMPORTED_MODULE_1__.collignonRaw.invert(x / kx, y);
};

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(faceProjection) {

  faceProjection = faceProjection || function(face) {
    var c = (0,d3_geo__WEBPACK_IMPORTED_MODULE_2__["default"])({type: "MultiPoint", coordinates: face});
    return (0,d3_geo__WEBPACK_IMPORTED_MODULE_3__["default"])(collignonK).translate([0, 0]).scale(1).rotate(c[1] > 0 ? [-c[0], 0] : [180 - c[0], 180]);
  };

  var faces = _octahedron_js__WEBPACK_IMPORTED_MODULE_4__["default"].map(function(face) {
    return {face: face, project: faceProjection(face)};
  });

  [-1, 0, 0, 1, 0, 1, 4, 5].forEach(function(d, i) {
    var node = faces[d];
    node && (node.children || (node.children = [])).push(faces[i]);
  });

  return (0,_index_js__WEBPACK_IMPORTED_MODULE_5__["default"])(faces[0], function(lambda, phi) {
        return faces[lambda < -_math_js__WEBPACK_IMPORTED_MODULE_0__.pi / 2 ? phi < 0 ? 6 : 4
            : lambda < 0 ? phi < 0 ? 2 : 0
            : lambda < _math_js__WEBPACK_IMPORTED_MODULE_0__.pi / 2 ? phi < 0 ? 3 : 1
            : phi < 0 ? 7 : 5];
      })
      .angle(-30)
      .scale(121.906)
      .center([0, 48.5904]);
}


/***/ }),

/***/ "./node_modules/d3-geo-projection/src/polyhedral/index.js":
/*!****************************************************************!*\
  !*** ./node_modules/d3-geo-projection/src/polyhedral/index.js ***!
  \****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var d3_geo__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! d3-geo */ "./node_modules/d3-geo/src/projection/index.js");
/* harmony import */ var d3_geo__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! d3-geo */ "./node_modules/d3-geo/src/bounds.js");
/* harmony import */ var d3_geo__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! d3-geo */ "./node_modules/d3-geo/src/centroid.js");
/* harmony import */ var d3_geo__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! d3-geo */ "./node_modules/d3-geo/src/interpolate.js");
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../math.js */ "./node_modules/d3-geo-projection/src/math.js");
/* harmony import */ var _matrix_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./matrix.js */ "./node_modules/d3-geo-projection/src/polyhedral/matrix.js");




// Creates a polyhedral projection.
//  * root: a spanning tree of polygon faces.  Nodes are automatically
//    augmented with a transform matrix.
//  * face: a function that returns the appropriate node for a given {lambda, phi}
//    point (radians).
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(root, face) {

  recurse(root, {transform: null});

  function recurse(node, parent) {
    node.edges = faceEdges(node.face);
    // Find shared edge.
    if (parent.face) {
      var shared = node.shared = sharedEdge(node.face, parent.face),
          m = (0,_matrix_js__WEBPACK_IMPORTED_MODULE_0__["default"])(shared.map(parent.project), shared.map(node.project));
      node.transform = parent.transform ? (0,_matrix_js__WEBPACK_IMPORTED_MODULE_0__.multiply)(parent.transform, m) : m;
      // Replace shared edge in parent edges array.
      var edges = parent.edges;
      for (var i = 0, n = edges.length; i < n; ++i) {
        if (pointEqual(shared[0], edges[i][1]) && pointEqual(shared[1], edges[i][0])) edges[i] = node;
        if (pointEqual(shared[0], edges[i][0]) && pointEqual(shared[1], edges[i][1])) edges[i] = node;
      }
      edges = node.edges;
      for (i = 0, n = edges.length; i < n; ++i) {
        if (pointEqual(shared[0], edges[i][0]) && pointEqual(shared[1], edges[i][1])) edges[i] = parent;
        if (pointEqual(shared[0], edges[i][1]) && pointEqual(shared[1], edges[i][0])) edges[i] = parent;
      }
    } else {
      node.transform = parent.transform;
    }
    if (node.children) {
      node.children.forEach(function(child) {
        recurse(child, node);
      });
    }
    return node;
  }

  function forward(lambda, phi) {
    var node = face(lambda, phi),
        point = node.project([lambda * _math_js__WEBPACK_IMPORTED_MODULE_1__.degrees, phi * _math_js__WEBPACK_IMPORTED_MODULE_1__.degrees]),
        t;
    if (t = node.transform) {
      return [
        t[0] * point[0] + t[1] * point[1] + t[2],
        -(t[3] * point[0] + t[4] * point[1] + t[5])
      ];
    }
    point[1] = -point[1];
    return point;
  }

  // Naive inverse!  A faster solution would use bounding boxes, or even a
  // polygonal quadtree.
  if (hasInverse(root)) forward.invert = function(x, y) {
    var coordinates = faceInvert(root, [x, -y]);
    return coordinates && (coordinates[0] *= _math_js__WEBPACK_IMPORTED_MODULE_1__.radians, coordinates[1] *= _math_js__WEBPACK_IMPORTED_MODULE_1__.radians, coordinates);
  };

  function faceInvert(node, coordinates) {
    var invert = node.project.invert,
        t = node.transform,
        point = coordinates;
    if (t) {
      t = (0,_matrix_js__WEBPACK_IMPORTED_MODULE_0__.inverse)(t);
      point = [
        t[0] * point[0] + t[1] * point[1] + t[2],
        (t[3] * point[0] + t[4] * point[1] + t[5])
      ];
    }
    if (invert && node === faceDegrees(p = invert(point))) return p;
    var p,
        children = node.children;
    for (var i = 0, n = children && children.length; i < n; ++i) {
      if (p = faceInvert(children[i], coordinates)) return p;
    }
  }

  function faceDegrees(coordinates) {
    return face(coordinates[0] * _math_js__WEBPACK_IMPORTED_MODULE_1__.radians, coordinates[1] * _math_js__WEBPACK_IMPORTED_MODULE_1__.radians);
  }

  var proj = (0,d3_geo__WEBPACK_IMPORTED_MODULE_2__["default"])(forward),
      stream_ = proj.stream;

  proj.stream = function(stream) {
    var rotate = proj.rotate(),
        rotateStream = stream_(stream),
        sphereStream = (proj.rotate([0, 0]), stream_(stream));
    proj.rotate(rotate);
    rotateStream.sphere = function() {
      sphereStream.polygonStart();
      sphereStream.lineStart();
      outline(sphereStream, root);
      sphereStream.lineEnd();
      sphereStream.polygonEnd();
    };
    return rotateStream;
  };

  return proj.angle(-30);
}

function outline(stream, node, parent) {
  var point,
      edges = node.edges,
      n = edges.length,
      edge,
      multiPoint = {type: "MultiPoint", coordinates: node.face},
      notPoles = node.face.filter(function(d) { return (0,_math_js__WEBPACK_IMPORTED_MODULE_1__.abs)(d[1]) !== 90; }),
      b = (0,d3_geo__WEBPACK_IMPORTED_MODULE_3__["default"])({type: "MultiPoint", coordinates: notPoles}),
      inside = false,
      j = -1,
      dx = b[1][0] - b[0][0];
  // TODO
  var c = dx === 180 || dx === 360
      ? [(b[0][0] + b[1][0]) / 2, (b[0][1] + b[1][1]) / 2]
      : (0,d3_geo__WEBPACK_IMPORTED_MODULE_4__["default"])(multiPoint);
  // First find the shared edge…
  if (parent) while (++j < n) {
    if (edges[j] === parent) break;
  }
  ++j;
  for (var i = 0; i < n; ++i) {
    edge = edges[(i + j) % n];
    if (Array.isArray(edge)) {
      if (!inside) {
        stream.point((point = (0,d3_geo__WEBPACK_IMPORTED_MODULE_5__["default"])(edge[0], c)(_math_js__WEBPACK_IMPORTED_MODULE_1__.epsilon))[0], point[1]);
        inside = true;
      }
      stream.point((point = (0,d3_geo__WEBPACK_IMPORTED_MODULE_5__["default"])(edge[1], c)(_math_js__WEBPACK_IMPORTED_MODULE_1__.epsilon))[0], point[1]);
    } else {
      inside = false;
      if (edge !== parent) outline(stream, edge, node);
    }
  }
}

// Tests equality of two spherical points.
function pointEqual(a, b) {
  return a && b && a[0] === b[0] && a[1] === b[1];
}

// Finds a shared edge given two clockwise polygons.
function sharedEdge(a, b) {
  var x, y, n = a.length, found = null;
  for (var i = 0; i < n; ++i) {
    x = a[i];
    for (var j = b.length; --j >= 0;) {
      y = b[j];
      if (x[0] === y[0] && x[1] === y[1]) {
        if (found) return [found, x];
        found = x;
      }
    }
  }
}

// Converts an array of n face vertices to an array of n + 1 edges.
function faceEdges(face) {
  var n = face.length,
      edges = [];
  for (var a = face[n - 1], i = 0; i < n; ++i) edges.push([a, a = face[i]]);
  return edges;
}

function hasInverse(node) {
  return node.project.invert || node.children && node.children.some(hasInverse);
}


/***/ }),

/***/ "./node_modules/d3-geo-projection/src/polyhedral/matrix.js":
/*!*****************************************************************!*\
  !*** ./node_modules/d3-geo-projection/src/polyhedral/matrix.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "inverse": () => (/* binding */ inverse),
/* harmony export */   "multiply": () => (/* binding */ multiply)
/* harmony export */ });
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../math.js */ "./node_modules/d3-geo-projection/src/math.js");


// Note: 6-element arrays are used to denote the 3x3 affine transform matrix:
// [a, b, c,
//  d, e, f,
//  0, 0, 1] - this redundant row is left out.

// Transform matrix for [a0, a1] -> [b0, b1].
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(a, b) {
  var u = subtract(a[1], a[0]),
      v = subtract(b[1], b[0]),
      phi = angle(u, v),
      s = length(u) / length(v);

  return multiply([
    1, 0, a[0][0],
    0, 1, a[0][1]
  ], multiply([
    s, 0, 0,
    0, s, 0
  ], multiply([
    (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.cos)(phi), (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sin)(phi), 0,
    -(0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sin)(phi), (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.cos)(phi), 0
  ], [
    1, 0, -b[0][0],
    0, 1, -b[0][1]
  ])));
}

// Inverts a transform matrix.
function inverse(m) {
  var k = 1 / (m[0] * m[4] - m[1] * m[3]);
  return [
    k * m[4], -k * m[1], k * (m[1] * m[5] - m[2] * m[4]),
    -k * m[3], k * m[0], k * (m[2] * m[3] - m[0] * m[5])
  ];
}

// Multiplies two 3x2 matrices.
function multiply(a, b) {
  return [
    a[0] * b[0] + a[1] * b[3],
    a[0] * b[1] + a[1] * b[4],
    a[0] * b[2] + a[1] * b[5] + a[2],
    a[3] * b[0] + a[4] * b[3],
    a[3] * b[1] + a[4] * b[4],
    a[3] * b[2] + a[4] * b[5] + a[5]
  ];
}

// Subtracts 2D vectors.
function subtract(a, b) {
  return [a[0] - b[0], a[1] - b[1]];
}

// Magnitude of a 2D vector.
function length(v) {
  return (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sqrt)(v[0] * v[0] + v[1] * v[1]);
}

// Angle between two 2D vectors.
function angle(a, b) {
  return (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.atan2)(a[0] * b[1] - a[1] * b[0], a[0] * b[0] + a[1] * b[1]);
}


/***/ }),

/***/ "./node_modules/d3-geo-projection/src/polyhedral/octahedron.js":
/*!*********************************************************************!*\
  !*** ./node_modules/d3-geo-projection/src/polyhedral/octahedron.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// TODO generate on-the-fly to avoid external modification.
var octahedron = [
  [0, 90],
  [-90, 0], [0, 0], [90, 0], [180, 0],
  [0, -90]
];

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ([
  [0, 2, 1],
  [0, 3, 2],
  [5, 1, 2],
  [5, 2, 3],
  [0, 1, 4],
  [0, 4, 3],
  [5, 4, 1],
  [5, 3, 4]
].map(function(face) {
  return face.map(function(i) {
    return octahedron[i];
  });
}));


/***/ }),

/***/ "./node_modules/d3-geo-projection/src/polyhedral/waterman.js":
/*!*******************************************************************!*\
  !*** ./node_modules/d3-geo-projection/src/polyhedral/waterman.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var d3_geo__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! d3-geo */ "./node_modules/d3-geo/src/centroid.js");
/* harmony import */ var d3_geo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! d3-geo */ "./node_modules/d3-geo/src/projection/gnomonic.js");
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../math.js */ "./node_modules/d3-geo-projection/src/math.js");
/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./index.js */ "./node_modules/d3-geo-projection/src/polyhedral/index.js");
/* harmony import */ var _octahedron_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./octahedron.js */ "./node_modules/d3-geo-projection/src/polyhedral/octahedron.js");





/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(faceProjection) {

  faceProjection = faceProjection || function(face) {
    var c = face.length === 6 ? (0,d3_geo__WEBPACK_IMPORTED_MODULE_0__["default"])({type: "MultiPoint", coordinates: face}) : face[0];
    return (0,d3_geo__WEBPACK_IMPORTED_MODULE_1__["default"])().scale(1).translate([0, 0]).rotate([-c[0], -c[1]]);
  };

  var w5 = _octahedron_js__WEBPACK_IMPORTED_MODULE_2__["default"].map(function(face) {
    var xyz = face.map(cartesian),
        n = xyz.length,
        a = xyz[n - 1],
        b,
        hexagon = [];
    for (var i = 0; i < n; ++i) {
      b = xyz[i];
      hexagon.push(spherical([
        a[0] * 0.9486832980505138 + b[0] * 0.31622776601683794,
        a[1] * 0.9486832980505138 + b[1] * 0.31622776601683794,
        a[2] * 0.9486832980505138 + b[2] * 0.31622776601683794
      ]), spherical([
        b[0] * 0.9486832980505138 + a[0] * 0.31622776601683794,
        b[1] * 0.9486832980505138 + a[1] * 0.31622776601683794,
        b[2] * 0.9486832980505138 + a[2] * 0.31622776601683794
      ]));
      a = b;
    }
    return hexagon;
  });

  var cornerNormals = [];

  var parents = [-1, 0, 0, 1, 0, 1, 4, 5];

  w5.forEach(function(hexagon, j) {
    var face = _octahedron_js__WEBPACK_IMPORTED_MODULE_2__["default"][j],
        n = face.length,
        normals = cornerNormals[j] = [];
    for (var i = 0; i < n; ++i) {
      w5.push([
        face[i],
        hexagon[(i * 2 + 2) % (2 * n)],
        hexagon[(i * 2 + 1) % (2 * n)]
      ]);
      parents.push(j);
      normals.push(cross(
        cartesian(hexagon[(i * 2 + 2) % (2 * n)]),
        cartesian(hexagon[(i * 2 + 1) % (2 * n)])
      ));
    }
  });

  var faces = w5.map(function(face) {
    return {
      project: faceProjection(face),
      face: face
    };
  });

  parents.forEach(function(d, i) {
    var parent = faces[d];
    parent && (parent.children || (parent.children = [])).push(faces[i]);
  });

  function face(lambda, phi) {
    var cosphi = (0,_math_js__WEBPACK_IMPORTED_MODULE_3__.cos)(phi),
        p = [cosphi * (0,_math_js__WEBPACK_IMPORTED_MODULE_3__.cos)(lambda), cosphi * (0,_math_js__WEBPACK_IMPORTED_MODULE_3__.sin)(lambda), (0,_math_js__WEBPACK_IMPORTED_MODULE_3__.sin)(phi)];

    var hexagon = lambda < -_math_js__WEBPACK_IMPORTED_MODULE_3__.pi / 2 ? phi < 0 ? 6 : 4
        : lambda < 0 ? phi < 0 ? 2 : 0
        : lambda < _math_js__WEBPACK_IMPORTED_MODULE_3__.pi / 2 ? phi < 0 ? 3 : 1
        : phi < 0 ? 7 : 5;

    var n = cornerNormals[hexagon];

    return faces[dot(n[0], p) < 0 ? 8 + 3 * hexagon
        : dot(n[1], p) < 0 ? 8 + 3 * hexagon + 1
        : dot(n[2], p) < 0 ? 8 + 3 * hexagon + 2
        : hexagon];
  }

  return (0,_index_js__WEBPACK_IMPORTED_MODULE_4__["default"])(faces[0], face)
      .angle(-30)
      .scale(110.625)
      .center([0,45]);
}

function dot(a, b) {
  for (var i = 0, n = a.length, s = 0; i < n; ++i) s += a[i] * b[i];
  return s;
}

function cross(a, b) {
  return [
    a[1] * b[2] - a[2] * b[1],
    a[2] * b[0] - a[0] * b[2],
    a[0] * b[1] - a[1] * b[0]
  ];
}

// Converts 3D Cartesian to spherical coordinates (degrees).
function spherical(cartesian) {
  return [
    (0,_math_js__WEBPACK_IMPORTED_MODULE_3__.atan2)(cartesian[1], cartesian[0]) * _math_js__WEBPACK_IMPORTED_MODULE_3__.degrees,
    (0,_math_js__WEBPACK_IMPORTED_MODULE_3__.asin)((0,_math_js__WEBPACK_IMPORTED_MODULE_3__.max)(-1, (0,_math_js__WEBPACK_IMPORTED_MODULE_3__.min)(1, cartesian[2]))) * _math_js__WEBPACK_IMPORTED_MODULE_3__.degrees
  ];
}

// Converts spherical coordinates (degrees) to 3D Cartesian.
function cartesian(coordinates) {
  var lambda = coordinates[0] * _math_js__WEBPACK_IMPORTED_MODULE_3__.radians,
      phi = coordinates[1] * _math_js__WEBPACK_IMPORTED_MODULE_3__.radians,
      cosphi = (0,_math_js__WEBPACK_IMPORTED_MODULE_3__.cos)(phi);
  return [
    cosphi * (0,_math_js__WEBPACK_IMPORTED_MODULE_3__.cos)(lambda),
    cosphi * (0,_math_js__WEBPACK_IMPORTED_MODULE_3__.sin)(lambda),
    (0,_math_js__WEBPACK_IMPORTED_MODULE_3__.sin)(phi)
  ];
}


/***/ }),

/***/ "./node_modules/d3-geo-projection/src/project/clockwise.js":
/*!*****************************************************************!*\
  !*** ./node_modules/d3-geo-projection/src/project/clockwise.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(ring) {
  if ((n = ring.length) < 4) return false;
  var i = 0,
      n,
      area = ring[n - 1][1] * ring[0][0] - ring[n - 1][0] * ring[0][1];
  while (++i < n) area += ring[i - 1][1] * ring[i][0] - ring[i - 1][0] * ring[i][1];
  return area <= 0;
}


/***/ }),

/***/ "./node_modules/d3-geo-projection/src/project/contains.js":
/*!****************************************************************!*\
  !*** ./node_modules/d3-geo-projection/src/project/contains.js ***!
  \****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(ring, point) {
  var x = point[0],
      y = point[1],
      contains = false;
  for (var i = 0, n = ring.length, j = n - 1; i < n; j = i++) {
    var pi = ring[i], xi = pi[0], yi = pi[1],
        pj = ring[j], xj = pj[0], yj = pj[1];
    if (((yi > y) ^ (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi)) contains = !contains;
  }
  return contains;
}


/***/ }),

/***/ "./node_modules/d3-geo-projection/src/project/index.js":
/*!*************************************************************!*\
  !*** ./node_modules/d3-geo-projection/src/project/index.js ***!
  \*************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var d3_geo__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! d3-geo */ "./node_modules/d3-geo/src/stream.js");
/* harmony import */ var _noop_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../noop.js */ "./node_modules/d3-geo-projection/src/noop.js");
/* harmony import */ var _clockwise_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./clockwise.js */ "./node_modules/d3-geo-projection/src/project/clockwise.js");
/* harmony import */ var _contains_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./contains.js */ "./node_modules/d3-geo-projection/src/project/contains.js");





/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(object, projection) {
  var stream = projection.stream, project;
  if (!stream) throw new Error("invalid projection");
  switch (object && object.type) {
    case "Feature": project = projectFeature; break;
    case "FeatureCollection": project = projectFeatureCollection; break;
    default: project = projectGeometry; break;
  }
  return project(object, stream);
}

function projectFeatureCollection(o, stream) {
  return {
    type: "FeatureCollection",
    features: o.features.map(function(f) {
      return projectFeature(f, stream);
    })
  };
}

function projectFeature(o, stream) {
  return {
    type: "Feature",
    id: o.id,
    properties: o.properties,
    geometry: projectGeometry(o.geometry, stream)
  };
}

function projectGeometryCollection(o, stream) {
  return {
    type: "GeometryCollection",
    geometries: o.geometries.map(function(o) {
      return projectGeometry(o, stream);
    })
  };
}

function projectGeometry(o, stream) {
  if (!o) return null;
  if (o.type === "GeometryCollection") return projectGeometryCollection(o, stream);
  var sink;
  switch (o.type) {
    case "Point": sink = sinkPoint; break;
    case "MultiPoint": sink = sinkPoint; break;
    case "LineString": sink = sinkLine; break;
    case "MultiLineString": sink = sinkLine; break;
    case "Polygon": sink = sinkPolygon; break;
    case "MultiPolygon": sink = sinkPolygon; break;
    case "Sphere": sink = sinkPolygon; break;
    default: return null;
  }
  (0,d3_geo__WEBPACK_IMPORTED_MODULE_0__["default"])(o, stream(sink));
  return sink.result();
}

var points = [],
    lines = [];

var sinkPoint = {
  point: function(x, y) {
    points.push([x, y]);
  },
  result: function() {
    var result = !points.length ? null
        : points.length < 2 ? {type: "Point", coordinates: points[0]}
        : {type: "MultiPoint", coordinates: points};
    points = [];
    return result;
  }
};

var sinkLine = {
  lineStart: _noop_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  point: function(x, y) {
    points.push([x, y]);
  },
  lineEnd: function() {
    if (points.length) lines.push(points), points = [];
  },
  result: function() {
    var result = !lines.length ? null
        : lines.length < 2 ? {type: "LineString", coordinates: lines[0]}
        : {type: "MultiLineString", coordinates: lines};
    lines = [];
    return result;
  }
};

var sinkPolygon = {
  polygonStart: _noop_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  lineStart: _noop_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  point: function(x, y) {
    points.push([x, y]);
  },
  lineEnd: function() {
    var n = points.length;
    if (n) {
      do points.push(points[0].slice()); while (++n < 4);
      lines.push(points), points = [];
    }
  },
  polygonEnd: _noop_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  result: function() {
    if (!lines.length) return null;
    var polygons = [],
        holes = [];

    // https://github.com/d3/d3/issues/1558
    lines.forEach(function(ring) {
      if ((0,_clockwise_js__WEBPACK_IMPORTED_MODULE_2__["default"])(ring)) polygons.push([ring]);
      else holes.push(ring);
    });

    holes.forEach(function(hole) {
      var point = hole[0];
      polygons.some(function(polygon) {
        if ((0,_contains_js__WEBPACK_IMPORTED_MODULE_3__["default"])(polygon[0], point)) {
          polygon.push(hole);
          return true;
        }
      }) || polygons.push([hole]);
    });

    lines = [];

    return !polygons.length ? null
        : polygons.length > 1 ? {type: "MultiPolygon", coordinates: polygons}
        : {type: "Polygon", coordinates: polygons[0]};
  }
};


/***/ }),

/***/ "./node_modules/d3-geo-projection/src/quantize.js":
/*!********************************************************!*\
  !*** ./node_modules/d3-geo-projection/src/quantize.js ***!
  \********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(input, digits) {
  if (!(0 <= (digits = +digits) && digits <= 20)) throw new Error("invalid digits");

  function quantizePoint(input) {
    var n = input.length, i = 2, output = new Array(n);
    output[0] = +input[0].toFixed(digits);
    output[1] = +input[1].toFixed(digits);
    while (i < n) output[i] = input[i], ++i;
    return output;
  }

  function quantizePoints(input) {
    return input.map(quantizePoint);
  }

  function quantizePointsNoDuplicates(input) {
    var point0 = quantizePoint(input[0]);
    var output = [point0];
    for (var i = 1; i < input.length; i++) {
      var point = quantizePoint(input[i]);
      if (point.length > 2 || point[0] != point0[0] || point[1] != point0[1]) {
        output.push(point);
        point0 = point;
      }
    }
    if (output.length === 1 && input.length > 1) {
      output.push(quantizePoint(input[input.length - 1]));
    }
    return output;
  }

  function quantizePolygon(input) {
    return input.map(quantizePointsNoDuplicates);
  }

  function quantizeGeometry(input) {
    if (input == null) return input;
    var output;
    switch (input.type) {
      case "GeometryCollection": output = {type: "GeometryCollection", geometries: input.geometries.map(quantizeGeometry)}; break;
      case "Point": output = {type: "Point", coordinates: quantizePoint(input.coordinates)}; break;
      case "MultiPoint": output = {type: input.type, coordinates: quantizePoints(input.coordinates)}; break;
      case "LineString": output = {type: input.type, coordinates: quantizePointsNoDuplicates(input.coordinates)}; break;
      case "MultiLineString": case "Polygon": output = {type: input.type, coordinates: quantizePolygon(input.coordinates)}; break;
      case "MultiPolygon": output = {type: "MultiPolygon", coordinates: input.coordinates.map(quantizePolygon)}; break;
      default: return input;
    }
    if (input.bbox != null) output.bbox = input.bbox;
    return output;
  }

  function quantizeFeature(input) {
    var output = {type: "Feature", properties: input.properties, geometry: quantizeGeometry(input.geometry)};
    if (input.id != null) output.id = input.id;
    if (input.bbox != null) output.bbox = input.bbox;
    return output;
  }

  if (input != null) switch (input.type) {
    case "Feature": return quantizeFeature(input);
    case "FeatureCollection": {
      var output = {type: "FeatureCollection", features: input.features.map(quantizeFeature)};
      if (input.bbox != null) output.bbox = input.bbox;
      return output;
    }
    default: return quantizeGeometry(input);
  }

  return input;
}


/***/ }),

/***/ "./node_modules/d3-geo-projection/src/quincuncial/gringorten.js":
/*!**********************************************************************!*\
  !*** ./node_modules/d3-geo-projection/src/quincuncial/gringorten.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _gringorten_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../gringorten.js */ "./node_modules/d3-geo-projection/src/gringorten.js");
/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.js */ "./node_modules/d3-geo-projection/src/quincuncial/index.js");



/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {
  return (0,_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(_gringorten_js__WEBPACK_IMPORTED_MODULE_1__.gringortenRaw)
      .scale(176.423);
}


/***/ }),

/***/ "./node_modules/d3-geo-projection/src/quincuncial/index.js":
/*!*****************************************************************!*\
  !*** ./node_modules/d3-geo-projection/src/quincuncial/index.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var d3_geo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! d3-geo */ "./node_modules/d3-geo/src/projection/index.js");
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../math.js */ "./node_modules/d3-geo-projection/src/math.js");



/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(project) {
  var dx = project(_math_js__WEBPACK_IMPORTED_MODULE_0__.halfPi, 0)[0] - project(-_math_js__WEBPACK_IMPORTED_MODULE_0__.halfPi, 0)[0];

  function projectQuincuncial(lambda, phi) {
    var t = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.abs)(lambda) < _math_js__WEBPACK_IMPORTED_MODULE_0__.halfPi,
        p = project(t ? lambda : lambda > 0 ? lambda - _math_js__WEBPACK_IMPORTED_MODULE_0__.pi : lambda + _math_js__WEBPACK_IMPORTED_MODULE_0__.pi, phi),
        x = (p[0] - p[1]) * _math_js__WEBPACK_IMPORTED_MODULE_0__.sqrt1_2,
        y = (p[0] + p[1]) * _math_js__WEBPACK_IMPORTED_MODULE_0__.sqrt1_2;
    if (t) return [x, y];
    var d = dx * _math_js__WEBPACK_IMPORTED_MODULE_0__.sqrt1_2,
        s = x > 0 ^ y > 0 ? -1 : 1;
    return [s * x - (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sign)(y) * d, s * y - (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sign)(x) * d];
  }

  if (project.invert) projectQuincuncial.invert = function(x0, y0) {
    var x = (x0 + y0) * _math_js__WEBPACK_IMPORTED_MODULE_0__.sqrt1_2,
        y = (y0 - x0) * _math_js__WEBPACK_IMPORTED_MODULE_0__.sqrt1_2,
        t = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.abs)(x) < 0.5 * dx && (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.abs)(y) < 0.5 * dx;

    if (!t) {
      var d = dx * _math_js__WEBPACK_IMPORTED_MODULE_0__.sqrt1_2,
          s = x > 0 ^ y > 0 ? -1 : 1,
          x1 = -s * x0 + (y > 0 ? 1 : -1) * d,
          y1 = -s * y0 + (x > 0 ? 1 : -1) * d;
      x = (-x1 - y1) * _math_js__WEBPACK_IMPORTED_MODULE_0__.sqrt1_2;
      y = (x1 - y1) * _math_js__WEBPACK_IMPORTED_MODULE_0__.sqrt1_2;
    }

    var p = project.invert(x, y);
    if (!t) p[0] += x > 0 ? _math_js__WEBPACK_IMPORTED_MODULE_0__.pi : -_math_js__WEBPACK_IMPORTED_MODULE_0__.pi;
    return p;
  };

  return (0,d3_geo__WEBPACK_IMPORTED_MODULE_1__["default"])(projectQuincuncial)
      .rotate([-90, -90, 45])
      .clipAngle(180 - 1e-3);
}


/***/ }),

/***/ "./node_modules/d3-geo-projection/src/quincuncial/peirce.js":
/*!******************************************************************!*\
  !*** ./node_modules/d3-geo-projection/src/quincuncial/peirce.js ***!
  \******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _guyou_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../guyou.js */ "./node_modules/d3-geo-projection/src/guyou.js");
/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.js */ "./node_modules/d3-geo-projection/src/quincuncial/index.js");



/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {
  return (0,_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(_guyou_js__WEBPACK_IMPORTED_MODULE_1__.guyouRaw)
      .scale(111.48);
}


/***/ }),

/***/ "./node_modules/d3-geo-projection/src/rectangularPolyconic.js":
/*!********************************************************************!*\
  !*** ./node_modules/d3-geo-projection/src/rectangularPolyconic.js ***!
  \********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "rectangularPolyconicRaw": () => (/* binding */ rectangularPolyconicRaw),
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./math.js */ "./node_modules/d3-geo-projection/src/math.js");
/* harmony import */ var _parallel1_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./parallel1.js */ "./node_modules/d3-geo-projection/src/parallel1.js");



function rectangularPolyconicRaw(phi0) {
  var sinPhi0 = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sin)(phi0);

  function forward(lambda, phi) {
    var A = sinPhi0 ? (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.tan)(lambda * sinPhi0 / 2) / sinPhi0 : lambda / 2;
    if (!phi) return [2 * A, -phi0];
    var E = 2 * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.atan)(A * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sin)(phi)),
        cotPhi = 1 / (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.tan)(phi);
    return [
      (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sin)(E) * cotPhi,
      phi + (1 - (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.cos)(E)) * cotPhi - phi0
    ];
  }

  // TODO return null for points outside outline.
  forward.invert = function(x, y) {
    if ((0,_math_js__WEBPACK_IMPORTED_MODULE_0__.abs)(y += phi0) < _math_js__WEBPACK_IMPORTED_MODULE_0__.epsilon) return [sinPhi0 ? 2 * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.atan)(sinPhi0 * x / 2) / sinPhi0 : x, 0];
    var k = x * x + y * y,
        phi = 0,
        i = 10, delta;
    do {
      var tanPhi = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.tan)(phi),
          secPhi = 1 / (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.cos)(phi),
          j = k - 2 * y * phi + phi * phi;
      phi -= delta = (tanPhi * j + 2 * (phi - y)) / (2 + j * secPhi * secPhi + 2 * (phi - y) * tanPhi);
    } while ((0,_math_js__WEBPACK_IMPORTED_MODULE_0__.abs)(delta) > _math_js__WEBPACK_IMPORTED_MODULE_0__.epsilon && --i > 0);
    var E = x * (tanPhi = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.tan)(phi)),
        A = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.tan)((0,_math_js__WEBPACK_IMPORTED_MODULE_0__.abs)(y) < (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.abs)(phi + 1 / tanPhi) ? (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.asin)(E) * 0.5 : (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.acos)(E) * 0.5 + _math_js__WEBPACK_IMPORTED_MODULE_0__.pi / 4) / (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sin)(phi);
    return [
      sinPhi0 ? 2 * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.atan)(sinPhi0 * A) / sinPhi0 : 2 * A,
      phi
    ];
  };

  return forward;
}

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {
  return (0,_parallel1_js__WEBPACK_IMPORTED_MODULE_1__["default"])(rectangularPolyconicRaw)
      .scale(131.215);
}


/***/ }),

/***/ "./node_modules/d3-geo-projection/src/robinson.js":
/*!********************************************************!*\
  !*** ./node_modules/d3-geo-projection/src/robinson.js ***!
  \********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "robinsonRaw": () => (/* binding */ robinsonRaw),
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var d3_geo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! d3-geo */ "./node_modules/d3-geo/src/projection/index.js");
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./math.js */ "./node_modules/d3-geo-projection/src/math.js");



var K = [
  [0.9986, -0.062],
  [1.0000, 0.0000],
  [0.9986, 0.0620],
  [0.9954, 0.1240],
  [0.9900, 0.1860],
  [0.9822, 0.2480],
  [0.9730, 0.3100],
  [0.9600, 0.3720],
  [0.9427, 0.4340],
  [0.9216, 0.4958],
  [0.8962, 0.5571],
  [0.8679, 0.6176],
  [0.8350, 0.6769],
  [0.7986, 0.7346],
  [0.7597, 0.7903],
  [0.7186, 0.8435],
  [0.6732, 0.8936],
  [0.6213, 0.9394],
  [0.5722, 0.9761],
  [0.5322, 1.0000]
];

K.forEach(function(d) {
  d[1] *= 1.593415793900743;
});

function robinsonRaw(lambda, phi) {
  var i = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.min)(18, (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.abs)(phi) * 36 / _math_js__WEBPACK_IMPORTED_MODULE_0__.pi),
      i0 = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.floor)(i),
      di = i - i0,
      ax = (k = K[i0])[0],
      ay = k[1],
      bx = (k = K[++i0])[0],
      by = k[1],
      cx = (k = K[(0,_math_js__WEBPACK_IMPORTED_MODULE_0__.min)(19, ++i0)])[0],
      cy = k[1],
      k;
  return [
    lambda * (bx + di * (cx - ax) / 2 + di * di * (cx - 2 * bx + ax) / 2),
    (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sign)(phi) * (by + di * (cy - ay) / 2 + di * di * (cy - 2 * by + ay) / 2)
  ];
}

robinsonRaw.invert = function(x, y) {
  var phi = y * 90,
      i = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.min)(18, (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.abs)(phi / 5)),
      i0 = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.max)(0, (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.floor)(i));
  do {
    var ay = K[i0][1],
        by = K[i0 + 1][1],
        cy = K[(0,_math_js__WEBPACK_IMPORTED_MODULE_0__.min)(19, i0 + 2)][1],
        u = cy - ay,
        v = cy - 2 * by + ay,
        t = 2 * ((0,_math_js__WEBPACK_IMPORTED_MODULE_0__.abs)(y) - by) / u,
        c = v / u,
        di = t * (1 - c * t * (1 - 2 * c * t));
    if (di >= 0 || i0 === 1) {
      phi = (y >= 0 ? 5 : -5) * (di + i);
      var j = 50, delta;
      do {
        i = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.min)(18, (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.abs)(phi) / 5);
        i0 = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.floor)(i);
        di = i - i0;
        ay = K[i0][1];
        by = K[i0 + 1][1];
        cy = K[(0,_math_js__WEBPACK_IMPORTED_MODULE_0__.min)(19, i0 + 2)][1];
        phi -= (delta = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sign)(y) * (by + di * (cy - ay) / 2 + di * di * (cy - 2 * by + ay) / 2) - y) * _math_js__WEBPACK_IMPORTED_MODULE_0__.degrees;
      } while ((0,_math_js__WEBPACK_IMPORTED_MODULE_0__.abs)(delta) > _math_js__WEBPACK_IMPORTED_MODULE_0__.epsilon2 && --j > 0);
      break;
    }
  } while (--i0 >= 0);
  var ax = K[i0][0],
      bx = K[i0 + 1][0],
      cx = K[(0,_math_js__WEBPACK_IMPORTED_MODULE_0__.min)(19, i0 + 2)][0];
  return [
    x / (bx + di * (cx - ax) / 2 + di * di * (cx - 2 * bx + ax) / 2),
    phi * _math_js__WEBPACK_IMPORTED_MODULE_0__.radians
  ];
};

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {
  return (0,d3_geo__WEBPACK_IMPORTED_MODULE_1__["default"])(robinsonRaw)
      .scale(152.63);
}


/***/ }),

/***/ "./node_modules/d3-geo-projection/src/satellite.js":
/*!*********************************************************!*\
  !*** ./node_modules/d3-geo-projection/src/satellite.js ***!
  \*********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "satelliteRaw": () => (/* binding */ satelliteRaw),
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var d3_geo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! d3-geo */ "./node_modules/d3-geo/src/projection/index.js");
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./math.js */ "./node_modules/d3-geo-projection/src/math.js");



function satelliteVerticalRaw(P) {
  function forward(lambda, phi) {
    var cosPhi = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.cos)(phi),
        k = (P - 1) / (P - cosPhi * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.cos)(lambda));
    return [
      k * cosPhi * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sin)(lambda),
      k * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sin)(phi)
    ];
  }

  forward.invert = function(x, y) {
    var rho2 = x * x + y * y,
        rho = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sqrt)(rho2),
        sinc = (P - (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sqrt)(1 - rho2 * (P + 1) / (P - 1))) / ((P - 1) / rho + rho / (P - 1));
    return [
      (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.atan2)(x * sinc, rho * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sqrt)(1 - sinc * sinc)),
      rho ? (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.asin)(y * sinc / rho) : 0
    ];
  };

  return forward;
}

function satelliteRaw(P, omega) {
  var vertical = satelliteVerticalRaw(P);
  if (!omega) return vertical;
  var cosOmega = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.cos)(omega),
      sinOmega = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sin)(omega);

  function forward(lambda, phi) {
    var coordinates = vertical(lambda, phi),
        y = coordinates[1],
        A = y * sinOmega / (P - 1) + cosOmega;
    return [
      coordinates[0] * cosOmega / A,
      y / A
    ];
  }

  forward.invert = function(x, y) {
    var k = (P - 1) / (P - 1 - y * sinOmega);
    return vertical.invert(k * x, k * y * cosOmega);
  };

  return forward;
}

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {
  var distance = 2,
      omega = 0,
      m = (0,d3_geo__WEBPACK_IMPORTED_MODULE_1__.projectionMutator)(satelliteRaw),
      p = m(distance, omega);

  // As a multiple of radius.
  p.distance = function(_) {
    if (!arguments.length) return distance;
    return m(distance = +_, omega);
  };

  p.tilt = function(_) {
    if (!arguments.length) return omega * _math_js__WEBPACK_IMPORTED_MODULE_0__.degrees;
    return m(distance, omega = _ * _math_js__WEBPACK_IMPORTED_MODULE_0__.radians);
  };

  return p
      .scale(432.147)
      .clipAngle((0,_math_js__WEBPACK_IMPORTED_MODULE_0__.acos)(1 / distance) * _math_js__WEBPACK_IMPORTED_MODULE_0__.degrees - 1e-6);
}


/***/ }),

/***/ "./node_modules/d3-geo-projection/src/sinuMollweide.js":
/*!*************************************************************!*\
  !*** ./node_modules/d3-geo-projection/src/sinuMollweide.js ***!
  \*************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "sinuMollweidePhi": () => (/* binding */ sinuMollweidePhi),
/* harmony export */   "sinuMollweideY": () => (/* binding */ sinuMollweideY),
/* harmony export */   "sinuMollweideRaw": () => (/* binding */ sinuMollweideRaw),
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var d3_geo__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! d3-geo */ "./node_modules/d3-geo/src/projection/index.js");
/* harmony import */ var _mollweide_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./mollweide.js */ "./node_modules/d3-geo-projection/src/mollweide.js");
/* harmony import */ var _sinusoidal_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./sinusoidal.js */ "./node_modules/d3-geo-projection/src/sinusoidal.js");




var sinuMollweidePhi = 0.7109889596207567;

var sinuMollweideY = 0.0528035274542;

function sinuMollweideRaw(lambda, phi) {
  return phi > -sinuMollweidePhi
      ? (lambda = (0,_mollweide_js__WEBPACK_IMPORTED_MODULE_0__.mollweideRaw)(lambda, phi), lambda[1] += sinuMollweideY, lambda)
      : (0,_sinusoidal_js__WEBPACK_IMPORTED_MODULE_1__.sinusoidalRaw)(lambda, phi);
}

sinuMollweideRaw.invert = function(x, y) {
  return y > -sinuMollweidePhi
      ? _mollweide_js__WEBPACK_IMPORTED_MODULE_0__.mollweideRaw.invert(x, y - sinuMollweideY)
      : _sinusoidal_js__WEBPACK_IMPORTED_MODULE_1__.sinusoidalRaw.invert(x, y);
};

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {
  return (0,d3_geo__WEBPACK_IMPORTED_MODULE_2__["default"])(sinuMollweideRaw)
      .rotate([-20, -55])
      .scale(164.263)
      .center([0, -5.4036]);
}


/***/ }),

/***/ "./node_modules/d3-geo-projection/src/sinusoidal.js":
/*!**********************************************************!*\
  !*** ./node_modules/d3-geo-projection/src/sinusoidal.js ***!
  \**********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "sinusoidalRaw": () => (/* binding */ sinusoidalRaw),
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var d3_geo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! d3-geo */ "./node_modules/d3-geo/src/projection/index.js");
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./math.js */ "./node_modules/d3-geo-projection/src/math.js");



function sinusoidalRaw(lambda, phi) {
  return [lambda * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.cos)(phi), phi];
}

sinusoidalRaw.invert = function(x, y) {
  return [x / (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.cos)(y), y];
};

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {
  return (0,d3_geo__WEBPACK_IMPORTED_MODULE_1__["default"])(sinusoidalRaw)
      .scale(152.63);
}


/***/ }),

/***/ "./node_modules/d3-geo-projection/src/square.js":
/*!******************************************************!*\
  !*** ./node_modules/d3-geo-projection/src/square.js ***!
  \******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./math.js */ "./node_modules/d3-geo-projection/src/math.js");


/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(project) {
  var dx = project(_math_js__WEBPACK_IMPORTED_MODULE_0__.halfPi, 0)[0] - project(-_math_js__WEBPACK_IMPORTED_MODULE_0__.halfPi, 0)[0];

  function projectSquare(lambda, phi) {
    var s = lambda > 0 ? -0.5 : 0.5,
        point = project(lambda + s * _math_js__WEBPACK_IMPORTED_MODULE_0__.pi, phi);
    point[0] -= s * dx;
    return point;
  }

  if (project.invert) projectSquare.invert = function(x, y) {
    var s = x > 0 ? -0.5 : 0.5,
        location = project.invert(x + s * dx, y),
        lambda = location[0] - s * _math_js__WEBPACK_IMPORTED_MODULE_0__.pi;
    if (lambda < -_math_js__WEBPACK_IMPORTED_MODULE_0__.pi) lambda += 2 * _math_js__WEBPACK_IMPORTED_MODULE_0__.pi;
    else if (lambda > _math_js__WEBPACK_IMPORTED_MODULE_0__.pi) lambda -= 2 * _math_js__WEBPACK_IMPORTED_MODULE_0__.pi;
    location[0] = lambda;
    return location;
  };

  return projectSquare;
}


/***/ }),

/***/ "./node_modules/d3-geo-projection/src/stitch.js":
/*!******************************************************!*\
  !*** ./node_modules/d3-geo-projection/src/stitch.js ***!
  \******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var epsilon = 1e-4,
    epsilonInverse = 1e4,
    x0 = -180, x0e = x0 + epsilon,
    x1 = 180, x1e = x1 - epsilon,
    y0 = -90, y0e = y0 + epsilon,
    y1 = 90, y1e = y1 - epsilon;

function nonempty(coordinates) {
  return coordinates.length > 0;
}

function quantize(x) {
  return Math.floor(x * epsilonInverse) / epsilonInverse;
}

function normalizePoint(y) {
  return y === y0 || y === y1 ? [0, y] : [x0, quantize(y)]; // pole or antimeridian?
}

function clampPoint(p) {
  var x = p[0], y = p[1], clamped = false;
  if (x <= x0e) x = x0, clamped = true;
  else if (x >= x1e) x = x1, clamped = true;
  if (y <= y0e) y = y0, clamped = true;
  else if (y >= y1e) y = y1, clamped = true;
  return clamped ? [x, y] : p;
}

function clampPoints(points) {
  return points.map(clampPoint);
}

// For each ring, detect where it crosses the antimeridian or pole.
function extractFragments(rings, polygon, fragments) {
  for (var j = 0, m = rings.length; j < m; ++j) {
    var ring = rings[j].slice();

    // By default, assume that this ring doesn’t need any stitching.
    fragments.push({index: -1, polygon: polygon, ring: ring});

    for (var i = 0, n = ring.length; i < n; ++i) {
      var point = ring[i],
          x = point[0],
          y = point[1];

      // If this is an antimeridian or polar point…
      if (x <= x0e || x >= x1e || y <= y0e || y >= y1e) {
        ring[i] = clampPoint(point);

        // Advance through any antimeridian or polar points…
        for (var k = i + 1; k < n; ++k) {
          var pointk = ring[k],
              xk = pointk[0],
              yk = pointk[1];
          if (xk > x0e && xk < x1e && yk > y0e && yk < y1e) break;
        }

        // If this was just a single antimeridian or polar point,
        // we don’t need to cut this ring into a fragment;
        // we can just leave it as-is.
        if (k === i + 1) continue;

        // Otherwise, if this is not the first point in the ring,
        // cut the current fragment so that it ends at the current point.
        // The current point is also normalized for later joining.
        if (i) {
          var fragmentBefore = {index: -1, polygon: polygon, ring: ring.slice(0, i + 1)};
          fragmentBefore.ring[fragmentBefore.ring.length - 1] = normalizePoint(y);
          fragments[fragments.length - 1] = fragmentBefore;
        }

        // If the ring started with an antimeridian fragment,
        // we can ignore that fragment entirely.
        else fragments.pop();

        // If the remainder of the ring is an antimeridian fragment,
        // move on to the next ring.
        if (k >= n) break;

        // Otherwise, add the remaining ring fragment and continue.
        fragments.push({index: -1, polygon: polygon, ring: ring = ring.slice(k - 1)});
        ring[0] = normalizePoint(ring[0][1]);
        i = -1;
        n = ring.length;
      }
    }
  }
}

// Now stitch the fragments back together into rings.
function stitchFragments(fragments) {
  var i, n = fragments.length;

  // To connect the fragments start-to-end, create a simple index by end.
  var fragmentByStart = {},
      fragmentByEnd = {},
      fragment,
      start,
      startFragment,
      end,
      endFragment;

  // For each fragment…
  for (i = 0; i < n; ++i) {
    fragment = fragments[i];
    start = fragment.ring[0];
    end = fragment.ring[fragment.ring.length - 1];

    // If this fragment is closed, add it as a standalone ring.
    if (start[0] === end[0] && start[1] === end[1]) {
      fragment.polygon.push(fragment.ring);
      fragments[i] = null;
      continue;
    }

    fragment.index = i;
    fragmentByStart[start] = fragmentByEnd[end] = fragment;
  }

  // For each open fragment…
  for (i = 0; i < n; ++i) {
    fragment = fragments[i];
    if (fragment) {
      start = fragment.ring[0];
      end = fragment.ring[fragment.ring.length - 1];
      startFragment = fragmentByEnd[start];
      endFragment = fragmentByStart[end];

      delete fragmentByStart[start];
      delete fragmentByEnd[end];

      // If this fragment is closed, add it as a standalone ring.
      if (start[0] === end[0] && start[1] === end[1]) {
        fragment.polygon.push(fragment.ring);
        continue;
      }

      if (startFragment) {
        delete fragmentByEnd[start];
        delete fragmentByStart[startFragment.ring[0]];
        startFragment.ring.pop(); // drop the shared coordinate
        fragments[startFragment.index] = null;
        fragment = {index: -1, polygon: startFragment.polygon, ring: startFragment.ring.concat(fragment.ring)};

        if (startFragment === endFragment) {
          // Connect both ends to this single fragment to create a ring.
          fragment.polygon.push(fragment.ring);
        } else {
          fragment.index = n++;
          fragments.push(fragmentByStart[fragment.ring[0]] = fragmentByEnd[fragment.ring[fragment.ring.length - 1]] = fragment);
        }
      } else if (endFragment) {
        delete fragmentByStart[end];
        delete fragmentByEnd[endFragment.ring[endFragment.ring.length - 1]];
        fragment.ring.pop(); // drop the shared coordinate
        fragment = {index: n++, polygon: endFragment.polygon, ring: fragment.ring.concat(endFragment.ring)};
        fragments[endFragment.index] = null;
        fragments.push(fragmentByStart[fragment.ring[0]] = fragmentByEnd[fragment.ring[fragment.ring.length - 1]] = fragment);
      } else {
        fragment.ring.push(fragment.ring[0]); // close ring
        fragment.polygon.push(fragment.ring);
      }
    }
  }
}

function stitchFeature(input) {
  var output = {type: "Feature", geometry: stitchGeometry(input.geometry)};
  if (input.id != null) output.id = input.id;
  if (input.bbox != null) output.bbox = input.bbox;
  if (input.properties != null) output.properties = input.properties;
  return output;
}

function stitchGeometry(input) {
  if (input == null) return input;
  var output, fragments, i, n;
  switch (input.type) {
    case "GeometryCollection": output = {type: "GeometryCollection", geometries: input.geometries.map(stitchGeometry)}; break;
    case "Point": output = {type: "Point", coordinates: clampPoint(input.coordinates)}; break;
    case "MultiPoint": case "LineString": output = {type: input.type, coordinates: clampPoints(input.coordinates)}; break;
    case "MultiLineString": output = {type: "MultiLineString", coordinates: input.coordinates.map(clampPoints)}; break;
    case "Polygon": {
      var polygon = [];
      extractFragments(input.coordinates, polygon, fragments = []);
      stitchFragments(fragments);
      output = {type: "Polygon", coordinates: polygon};
      break;
    }
    case "MultiPolygon": {
      fragments = [], i = -1, n = input.coordinates.length;
      var polygons = new Array(n);
      while (++i < n) extractFragments(input.coordinates[i], polygons[i] = [], fragments);
      stitchFragments(fragments);
      output = {type: "MultiPolygon", coordinates: polygons.filter(nonempty)};
      break;
    }
    default: return input;
  }
  if (input.bbox != null) output.bbox = input.bbox;
  return output;
}

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(input) {
  if (input == null) return input;
  switch (input.type) {
    case "Feature": return stitchFeature(input);
    case "FeatureCollection": {
      var output = {type: "FeatureCollection", features: input.features.map(stitchFeature)};
      if (input.bbox != null) output.bbox = input.bbox;
      return output;
    }
    default: return stitchGeometry(input);
  }
}


/***/ }),

/***/ "./node_modules/d3-geo-projection/src/times.js":
/*!*****************************************************!*\
  !*** ./node_modules/d3-geo-projection/src/times.js ***!
  \*****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "timesRaw": () => (/* binding */ timesRaw),
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var d3_geo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! d3-geo */ "./node_modules/d3-geo/src/projection/index.js");
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./math.js */ "./node_modules/d3-geo-projection/src/math.js");



function timesRaw(lambda, phi) {
  var t = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.tan)(phi / 2),
      s = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sin)(_math_js__WEBPACK_IMPORTED_MODULE_0__.quarterPi * t);
  return [
    lambda * (0.74482 - 0.34588 * s * s),
    1.70711 * t
  ];
}

timesRaw.invert = function(x, y) {
  var t = y / 1.70711,
      s = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sin)(_math_js__WEBPACK_IMPORTED_MODULE_0__.quarterPi * t);
  return [
    x / (0.74482 - 0.34588 * s * s),
    2 * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.atan)(t)
  ];
};

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {
  return (0,d3_geo__WEBPACK_IMPORTED_MODULE_1__["default"])(timesRaw)
      .scale(146.153);
}


/***/ }),

/***/ "./node_modules/d3-geo-projection/src/twoPoint.js":
/*!********************************************************!*\
  !*** ./node_modules/d3-geo-projection/src/twoPoint.js ***!
  \********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var d3_geo__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! d3-geo */ "./node_modules/d3-geo/src/interpolate.js");
/* harmony import */ var d3_geo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! d3-geo */ "./node_modules/d3-geo/src/rotation.js");
/* harmony import */ var d3_geo__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! d3-geo */ "./node_modules/d3-geo/src/projection/index.js");
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./math.js */ "./node_modules/d3-geo-projection/src/math.js");



// Compute the origin as the midpoint of the two reference points.
// Rotate one of the reference points by the origin.
// Apply the spherical law of sines to compute gamma rotation.
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(raw, p0, p1) {
  var i = (0,d3_geo__WEBPACK_IMPORTED_MODULE_0__["default"])(p0, p1),
      o = i(0.5),
      a = (0,d3_geo__WEBPACK_IMPORTED_MODULE_1__["default"])([-o[0], -o[1]])(p0),
      b = i.distance / 2,
      y = -(0,_math_js__WEBPACK_IMPORTED_MODULE_2__.asin)((0,_math_js__WEBPACK_IMPORTED_MODULE_2__.sin)(a[1] * _math_js__WEBPACK_IMPORTED_MODULE_2__.radians) / (0,_math_js__WEBPACK_IMPORTED_MODULE_2__.sin)(b)),
      R = [-o[0], -o[1], -(a[0] > 0 ? _math_js__WEBPACK_IMPORTED_MODULE_2__.pi - y : y) * _math_js__WEBPACK_IMPORTED_MODULE_2__.degrees],
      p = (0,d3_geo__WEBPACK_IMPORTED_MODULE_3__["default"])(raw(b)).rotate(R),
      r = (0,d3_geo__WEBPACK_IMPORTED_MODULE_1__["default"])(R),
      center = p.center;

  delete p.rotate;

  p.center = function(_) {
    return arguments.length ? center(r(_)) : r.invert(center());
  };

  return p
      .clipAngle(90);
}


/***/ }),

/***/ "./node_modules/d3-geo-projection/src/twoPointAzimuthal.js":
/*!*****************************************************************!*\
  !*** ./node_modules/d3-geo-projection/src/twoPointAzimuthal.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "twoPointAzimuthalRaw": () => (/* binding */ twoPointAzimuthalRaw),
/* harmony export */   "twoPointAzimuthalUsa": () => (/* binding */ twoPointAzimuthalUsa),
/* harmony export */   "default": () => (/* binding */ twoPointAzimuthal)
/* harmony export */ });
/* harmony import */ var d3_geo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! d3-geo */ "./node_modules/d3-geo/src/projection/gnomonic.js");
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./math.js */ "./node_modules/d3-geo-projection/src/math.js");
/* harmony import */ var _twoPoint_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./twoPoint.js */ "./node_modules/d3-geo-projection/src/twoPoint.js");




function twoPointAzimuthalRaw(d) {
  var cosd = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.cos)(d);

  function forward(lambda, phi) {
    var coordinates = (0,d3_geo__WEBPACK_IMPORTED_MODULE_1__.gnomonicRaw)(lambda, phi);
    coordinates[0] *= cosd;
    return coordinates;
  }

  forward.invert = function(x, y) {
    return d3_geo__WEBPACK_IMPORTED_MODULE_1__.gnomonicRaw.invert(x / cosd, y);
  };

  return forward;
}

function twoPointAzimuthalUsa() {
  return twoPointAzimuthal([-158, 21.5], [-77, 39])
      .clipAngle(60)
      .scale(400);
}

function twoPointAzimuthal(p0, p1) {
  return (0,_twoPoint_js__WEBPACK_IMPORTED_MODULE_2__["default"])(twoPointAzimuthalRaw, p0, p1);
}


/***/ }),

/***/ "./node_modules/d3-geo-projection/src/twoPointEquidistant.js":
/*!*******************************************************************!*\
  !*** ./node_modules/d3-geo-projection/src/twoPointEquidistant.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "twoPointEquidistantRaw": () => (/* binding */ twoPointEquidistantRaw),
/* harmony export */   "twoPointEquidistantUsa": () => (/* binding */ twoPointEquidistantUsa),
/* harmony export */   "default": () => (/* binding */ twoPointEquidistant)
/* harmony export */ });
/* harmony import */ var d3_geo__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! d3-geo */ "./node_modules/d3-geo/src/projection/azimuthalEquidistant.js");
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./math.js */ "./node_modules/d3-geo-projection/src/math.js");
/* harmony import */ var _twoPoint_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./twoPoint.js */ "./node_modules/d3-geo-projection/src/twoPoint.js");




function twoPointEquidistantRaw(z0) {
  if (!(z0 *= 2)) return d3_geo__WEBPACK_IMPORTED_MODULE_0__.azimuthalEquidistantRaw;
  var lambdaa = -z0 / 2,
      lambdab = -lambdaa,
      z02 = z0 * z0,
      tanLambda0 = (0,_math_js__WEBPACK_IMPORTED_MODULE_1__.tan)(lambdab),
      S = 0.5 / (0,_math_js__WEBPACK_IMPORTED_MODULE_1__.sin)(lambdab);

  function forward(lambda, phi) {
    var za = (0,_math_js__WEBPACK_IMPORTED_MODULE_1__.acos)((0,_math_js__WEBPACK_IMPORTED_MODULE_1__.cos)(phi) * (0,_math_js__WEBPACK_IMPORTED_MODULE_1__.cos)(lambda - lambdaa)),
        zb = (0,_math_js__WEBPACK_IMPORTED_MODULE_1__.acos)((0,_math_js__WEBPACK_IMPORTED_MODULE_1__.cos)(phi) * (0,_math_js__WEBPACK_IMPORTED_MODULE_1__.cos)(lambda - lambdab)),
        ys = phi < 0 ? -1 : 1;
    za *= za, zb *= zb;
    return [
      (za - zb) / (2 * z0),
      ys * (0,_math_js__WEBPACK_IMPORTED_MODULE_1__.sqrt)(4 * z02 * zb - (z02 - za + zb) * (z02 - za + zb)) / (2 * z0)
    ];
  }

  forward.invert = function(x, y) {
    var y2 = y * y,
        cosza = (0,_math_js__WEBPACK_IMPORTED_MODULE_1__.cos)((0,_math_js__WEBPACK_IMPORTED_MODULE_1__.sqrt)(y2 + (t = x + lambdaa) * t)),
        coszb = (0,_math_js__WEBPACK_IMPORTED_MODULE_1__.cos)((0,_math_js__WEBPACK_IMPORTED_MODULE_1__.sqrt)(y2 + (t = x + lambdab) * t)),
        t,
        d;
    return [
      (0,_math_js__WEBPACK_IMPORTED_MODULE_1__.atan2)(d = cosza - coszb, t = (cosza + coszb) * tanLambda0),
      (y < 0 ? -1 : 1) * (0,_math_js__WEBPACK_IMPORTED_MODULE_1__.acos)((0,_math_js__WEBPACK_IMPORTED_MODULE_1__.sqrt)(t * t + d * d) * S)
    ];
  };

  return forward;
}

function twoPointEquidistantUsa() {
  return twoPointEquidistant([-158, 21.5], [-77, 39])
      .clipAngle(130)
      .scale(122.571);
}

function twoPointEquidistant(p0, p1) {
  return (0,_twoPoint_js__WEBPACK_IMPORTED_MODULE_2__["default"])(twoPointEquidistantRaw, p0, p1);
}


/***/ }),

/***/ "./node_modules/d3-geo-projection/src/vanDerGrinten.js":
/*!*************************************************************!*\
  !*** ./node_modules/d3-geo-projection/src/vanDerGrinten.js ***!
  \*************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "vanDerGrintenRaw": () => (/* binding */ vanDerGrintenRaw),
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var d3_geo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! d3-geo */ "./node_modules/d3-geo/src/projection/index.js");
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./math.js */ "./node_modules/d3-geo-projection/src/math.js");



function vanDerGrintenRaw(lambda, phi) {
  if ((0,_math_js__WEBPACK_IMPORTED_MODULE_0__.abs)(phi) < _math_js__WEBPACK_IMPORTED_MODULE_0__.epsilon) return [lambda, 0];
  var sinTheta = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.abs)(phi / _math_js__WEBPACK_IMPORTED_MODULE_0__.halfPi),
      theta = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.asin)(sinTheta);
  if ((0,_math_js__WEBPACK_IMPORTED_MODULE_0__.abs)(lambda) < _math_js__WEBPACK_IMPORTED_MODULE_0__.epsilon || (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.abs)((0,_math_js__WEBPACK_IMPORTED_MODULE_0__.abs)(phi) - _math_js__WEBPACK_IMPORTED_MODULE_0__.halfPi) < _math_js__WEBPACK_IMPORTED_MODULE_0__.epsilon) return [0, (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sign)(phi) * _math_js__WEBPACK_IMPORTED_MODULE_0__.pi * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.tan)(theta / 2)];
  var cosTheta = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.cos)(theta),
      A = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.abs)(_math_js__WEBPACK_IMPORTED_MODULE_0__.pi / lambda - lambda / _math_js__WEBPACK_IMPORTED_MODULE_0__.pi) / 2,
      A2 = A * A,
      G = cosTheta / (sinTheta + cosTheta - 1),
      P = G * (2 / sinTheta - 1),
      P2 = P * P,
      P2_A2 = P2 + A2,
      G_P2 = G - P2,
      Q = A2 + G;
  return [
    (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sign)(lambda) * _math_js__WEBPACK_IMPORTED_MODULE_0__.pi * (A * G_P2 + (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sqrt)(A2 * G_P2 * G_P2 - P2_A2 * (G * G - P2))) / P2_A2,
    (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sign)(phi) * _math_js__WEBPACK_IMPORTED_MODULE_0__.pi * (P * Q - A * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sqrt)((A2 + 1) * P2_A2 - Q * Q)) / P2_A2
  ];
}

vanDerGrintenRaw.invert = function(x, y) {
  if ((0,_math_js__WEBPACK_IMPORTED_MODULE_0__.abs)(y) < _math_js__WEBPACK_IMPORTED_MODULE_0__.epsilon) return [x, 0];
  if ((0,_math_js__WEBPACK_IMPORTED_MODULE_0__.abs)(x) < _math_js__WEBPACK_IMPORTED_MODULE_0__.epsilon) return [0, _math_js__WEBPACK_IMPORTED_MODULE_0__.halfPi * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sin)(2 * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.atan)(y / _math_js__WEBPACK_IMPORTED_MODULE_0__.pi))];
  var x2 = (x /= _math_js__WEBPACK_IMPORTED_MODULE_0__.pi) * x,
      y2 = (y /= _math_js__WEBPACK_IMPORTED_MODULE_0__.pi) * y,
      x2_y2 = x2 + y2,
      z = x2_y2 * x2_y2,
      c1 = -(0,_math_js__WEBPACK_IMPORTED_MODULE_0__.abs)(y) * (1 + x2_y2),
      c2 = c1 - 2 * y2 + x2,
      c3 = -2 * c1 + 1 + 2 * y2 + z,
      d = y2 / c3 + (2 * c2 * c2 * c2 / (c3 * c3 * c3) - 9 * c1 * c2 / (c3 * c3)) / 27,
      a1 = (c1 - c2 * c2 / (3 * c3)) / c3,
      m1 = 2 * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sqrt)(-a1 / 3),
      theta1 = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.acos)(3 * d / (a1 * m1)) / 3;
  return [
    _math_js__WEBPACK_IMPORTED_MODULE_0__.pi * (x2_y2 - 1 + (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sqrt)(1 + 2 * (x2 - y2) + z)) / (2 * x),
    (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sign)(y) * _math_js__WEBPACK_IMPORTED_MODULE_0__.pi * (-m1 * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.cos)(theta1 + _math_js__WEBPACK_IMPORTED_MODULE_0__.pi / 3) - c2 / (3 * c3))
  ];
};

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {
  return (0,d3_geo__WEBPACK_IMPORTED_MODULE_1__["default"])(vanDerGrintenRaw)
      .scale(79.4183);
}


/***/ }),

/***/ "./node_modules/d3-geo-projection/src/vanDerGrinten2.js":
/*!**************************************************************!*\
  !*** ./node_modules/d3-geo-projection/src/vanDerGrinten2.js ***!
  \**************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "vanDerGrinten2Raw": () => (/* binding */ vanDerGrinten2Raw),
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var d3_geo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! d3-geo */ "./node_modules/d3-geo/src/projection/index.js");
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./math.js */ "./node_modules/d3-geo-projection/src/math.js");



function vanDerGrinten2Raw(lambda, phi) {
  if ((0,_math_js__WEBPACK_IMPORTED_MODULE_0__.abs)(phi) < _math_js__WEBPACK_IMPORTED_MODULE_0__.epsilon) return [lambda, 0];
  var sinTheta = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.abs)(phi / _math_js__WEBPACK_IMPORTED_MODULE_0__.halfPi),
      theta = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.asin)(sinTheta);
  if ((0,_math_js__WEBPACK_IMPORTED_MODULE_0__.abs)(lambda) < _math_js__WEBPACK_IMPORTED_MODULE_0__.epsilon || (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.abs)((0,_math_js__WEBPACK_IMPORTED_MODULE_0__.abs)(phi) - _math_js__WEBPACK_IMPORTED_MODULE_0__.halfPi) < _math_js__WEBPACK_IMPORTED_MODULE_0__.epsilon) return [0, (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sign)(phi) * _math_js__WEBPACK_IMPORTED_MODULE_0__.pi * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.tan)(theta / 2)];
  var cosTheta = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.cos)(theta),
      A = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.abs)(_math_js__WEBPACK_IMPORTED_MODULE_0__.pi / lambda - lambda / _math_js__WEBPACK_IMPORTED_MODULE_0__.pi) / 2,
      A2 = A * A,
      x1 = cosTheta * ((0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sqrt)(1 + A2) - A * cosTheta) / (1 + A2 * sinTheta * sinTheta);
  return [
    (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sign)(lambda) * _math_js__WEBPACK_IMPORTED_MODULE_0__.pi * x1,
    (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sign)(phi) * _math_js__WEBPACK_IMPORTED_MODULE_0__.pi * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sqrt)(1 - x1 * (2 * A + x1))
  ];
}

vanDerGrinten2Raw.invert = function(x, y) {
  if (!x) return [0, _math_js__WEBPACK_IMPORTED_MODULE_0__.halfPi * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sin)(2 * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.atan)(y / _math_js__WEBPACK_IMPORTED_MODULE_0__.pi))];
  var x1 = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.abs)(x / _math_js__WEBPACK_IMPORTED_MODULE_0__.pi),
      A = (1 - x1 * x1 - (y /= _math_js__WEBPACK_IMPORTED_MODULE_0__.pi) * y) / (2 * x1),
      A2 = A * A,
      B = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sqrt)(A2 + 1);
  return [
    (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sign)(x) * _math_js__WEBPACK_IMPORTED_MODULE_0__.pi * (B - A),
    (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sign)(y) * _math_js__WEBPACK_IMPORTED_MODULE_0__.halfPi * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sin)(2 * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.atan2)((0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sqrt)((1 - 2 * A * x1) * (A + B) - x1), (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sqrt)(B + A + x1)))
  ];
};

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {
  return (0,d3_geo__WEBPACK_IMPORTED_MODULE_1__["default"])(vanDerGrinten2Raw)
      .scale(79.4183);
}


/***/ }),

/***/ "./node_modules/d3-geo-projection/src/vanDerGrinten3.js":
/*!**************************************************************!*\
  !*** ./node_modules/d3-geo-projection/src/vanDerGrinten3.js ***!
  \**************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "vanDerGrinten3Raw": () => (/* binding */ vanDerGrinten3Raw),
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var d3_geo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! d3-geo */ "./node_modules/d3-geo/src/projection/index.js");
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./math.js */ "./node_modules/d3-geo-projection/src/math.js");



function vanDerGrinten3Raw(lambda, phi) {
  if ((0,_math_js__WEBPACK_IMPORTED_MODULE_0__.abs)(phi) < _math_js__WEBPACK_IMPORTED_MODULE_0__.epsilon) return [lambda, 0];
  var sinTheta = phi / _math_js__WEBPACK_IMPORTED_MODULE_0__.halfPi,
      theta = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.asin)(sinTheta);
  if ((0,_math_js__WEBPACK_IMPORTED_MODULE_0__.abs)(lambda) < _math_js__WEBPACK_IMPORTED_MODULE_0__.epsilon || (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.abs)((0,_math_js__WEBPACK_IMPORTED_MODULE_0__.abs)(phi) - _math_js__WEBPACK_IMPORTED_MODULE_0__.halfPi) < _math_js__WEBPACK_IMPORTED_MODULE_0__.epsilon) return [0, _math_js__WEBPACK_IMPORTED_MODULE_0__.pi * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.tan)(theta / 2)];
  var A = (_math_js__WEBPACK_IMPORTED_MODULE_0__.pi / lambda - lambda / _math_js__WEBPACK_IMPORTED_MODULE_0__.pi) / 2,
      y1 = sinTheta / (1 + (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.cos)(theta));
  return [
    _math_js__WEBPACK_IMPORTED_MODULE_0__.pi * ((0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sign)(lambda) * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sqrt)(A * A + 1 - y1 * y1) - A),
    _math_js__WEBPACK_IMPORTED_MODULE_0__.pi * y1
  ];
}

vanDerGrinten3Raw.invert = function(x, y) {
  if (!y) return [x, 0];
  var y1 = y / _math_js__WEBPACK_IMPORTED_MODULE_0__.pi,
      A = (_math_js__WEBPACK_IMPORTED_MODULE_0__.pi * _math_js__WEBPACK_IMPORTED_MODULE_0__.pi * (1 - y1 * y1) - x * x) / (2 * _math_js__WEBPACK_IMPORTED_MODULE_0__.pi * x);
  return [
    x ? _math_js__WEBPACK_IMPORTED_MODULE_0__.pi * ((0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sign)(x) * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sqrt)(A * A + 1) - A) : 0,
    _math_js__WEBPACK_IMPORTED_MODULE_0__.halfPi * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sin)(2 * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.atan)(y1))
  ];
};

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {
  return (0,d3_geo__WEBPACK_IMPORTED_MODULE_1__["default"])(vanDerGrinten3Raw)
        .scale(79.4183);
}


/***/ }),

/***/ "./node_modules/d3-geo-projection/src/vanDerGrinten4.js":
/*!**************************************************************!*\
  !*** ./node_modules/d3-geo-projection/src/vanDerGrinten4.js ***!
  \**************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "vanDerGrinten4Raw": () => (/* binding */ vanDerGrinten4Raw),
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var d3_geo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! d3-geo */ "./node_modules/d3-geo/src/projection/index.js");
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./math.js */ "./node_modules/d3-geo-projection/src/math.js");



function vanDerGrinten4Raw(lambda, phi) {
  if (!phi) return [lambda, 0];
  var phi0 = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.abs)(phi);
  if (!lambda || phi0 === _math_js__WEBPACK_IMPORTED_MODULE_0__.halfPi) return [0, phi];
  var B = phi0 / _math_js__WEBPACK_IMPORTED_MODULE_0__.halfPi,
      B2 = B * B,
      C = (8 * B - B2 * (B2 + 2) - 5) / (2 * B2 * (B - 1)),
      C2 = C * C,
      BC = B * C,
      B_C2 = B2 + C2 + 2 * BC,
      B_3C = B + 3 * C,
      lambda0 = lambda / _math_js__WEBPACK_IMPORTED_MODULE_0__.halfPi,
      lambda1 = lambda0 + 1 / lambda0,
      D = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sign)((0,_math_js__WEBPACK_IMPORTED_MODULE_0__.abs)(lambda) - _math_js__WEBPACK_IMPORTED_MODULE_0__.halfPi) * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sqrt)(lambda1 * lambda1 - 4),
      D2 = D * D,
      F = B_C2 * (B2 + C2 * D2 - 1) + (1 - B2) * (B2 * (B_3C * B_3C + 4 * C2) + 12 * BC * C2 + 4 * C2 * C2),
      x1 = (D * (B_C2 + C2 - 1) + 2 * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sqrt)(F)) / (4 * B_C2 + D2);
  return [
    (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sign)(lambda) * _math_js__WEBPACK_IMPORTED_MODULE_0__.halfPi * x1,
    (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sign)(phi) * _math_js__WEBPACK_IMPORTED_MODULE_0__.halfPi * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sqrt)(1 + D * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.abs)(x1) - x1 * x1)
  ];
}

vanDerGrinten4Raw.invert = function(x, y) {
  var delta;
  if (!x || !y) return [x, y];
  var sy = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sign)(y);
  y = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.abs)(y) / _math_js__WEBPACK_IMPORTED_MODULE_0__.pi;
  var x1 = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sign)(x) * x / _math_js__WEBPACK_IMPORTED_MODULE_0__.halfPi,
      D = (x1 * x1 - 1 + 4 * y * y) / (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.abs)(x1),
      D2 = D * D,
      B = y * (2 - (y > 0.5 ? (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.min)(y, (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.abs)(x)) : 0)),
      r = x * x + y * y,
      i = 50;
  do {
    var B2 = B * B,
        C = (8 * B - B2 * (B2 + 2) - 5) / (2 * B2 * (B - 1)),
        C_ = (3 * B - B2 * B - 10) / (2 * B2 * B),
        C2 = C * C,
        BC = B * C,
        B_C = B + C,
        B_C2 = B_C * B_C,
        B_3C = B + 3 * C,
        F = B_C2 * (B2 + C2 * D2 - 1) + (1 - B2) * (B2 * (B_3C * B_3C + 4 * C2) + C2 * (12 * BC + 4 * C2)),
        F_ = -2 * B_C * (4 * BC * C2 + (1 - 4 * B2 + 3 * B2 * B2) * (1 + C_) + C2 * (-6 + 14 * B2 - D2 + (-8 + 8 * B2 - 2 * D2) * C_) + BC * (-8 + 12 * B2 + (-10 + 10 * B2 - D2) * C_)),
        sqrtF = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sqrt)(F),
        f = D * (B_C2 + C2 - 1) + 2 * sqrtF - x1 * (4 * B_C2 + D2),
        f_ = D * (2 * C * C_ + 2 * B_C * (1 + C_)) + F_ / sqrtF - 8 * B_C * (D * (-1 + C2 + B_C2) + 2 * sqrtF) * (1 + C_) / (D2 + 4 * B_C2);
    B -= delta = f / f_;
  } while (delta * r * r > _math_js__WEBPACK_IMPORTED_MODULE_0__.epsilon && --i > 0);
  return [
    (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sign)(x) * ((0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sqrt)(D * D + 4) + D) * _math_js__WEBPACK_IMPORTED_MODULE_0__.pi / 4,
    sy * _math_js__WEBPACK_IMPORTED_MODULE_0__.halfPi * B
  ];
};

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {
  return (0,d3_geo__WEBPACK_IMPORTED_MODULE_1__["default"])(vanDerGrinten4Raw)
      .scale(127.16);
}


/***/ }),

/***/ "./node_modules/d3-geo-projection/src/wagner.js":
/*!******************************************************!*\
  !*** ./node_modules/d3-geo-projection/src/wagner.js ***!
  \******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "wagnerRaw": () => (/* binding */ wagnerRaw),
/* harmony export */   "default": () => (/* binding */ wagner),
/* harmony export */   "wagner7": () => (/* binding */ wagner7)
/* harmony export */ });
/* harmony import */ var d3_geo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! d3-geo */ "./node_modules/d3-geo/src/projection/index.js");
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./math.js */ "./node_modules/d3-geo-projection/src/math.js");



function wagnerFormula(cx, cy, m1, m2, n) {
  function forward(lambda, phi) {
    var s = m1 * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sin)(m2 * phi),
        c0 = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sqrt)(1 - s * s),
        c1 = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sqrt)(2 / (1 + c0 * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.cos)(lambda *= n)));
    return [
      cx * c0 * c1 * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sin)(lambda),
      cy * s * c1
    ];
  }

  forward.invert = function(x, y) {
    var t1 = x / cx,
        t2 = y / cy,
        p = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sqrt)(t1 * t1 + t2 * t2),
        c = 2 * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.asin)(p / 2);
    return [
      (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.atan2)(x * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.tan)(c), cx * p) / n,
      p && (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.asin)(y * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sin)(c) / (cy * m1 * p)) / m2
    ];
  };

  return forward;
}

function wagnerRaw(poleline, parallels, inflation, ratio) {
  // 60 is always used as reference parallel
  var phi1 = _math_js__WEBPACK_IMPORTED_MODULE_0__.pi / 3;

  // sanitizing the input values
  // poleline and parallels may approximate but never equal 0
  poleline = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.max)(poleline, _math_js__WEBPACK_IMPORTED_MODULE_0__.epsilon);
  parallels = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.max)(parallels, _math_js__WEBPACK_IMPORTED_MODULE_0__.epsilon);
  // poleline must be <= 90; parallels may approximate but never equal 180
  poleline = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.min)(poleline, _math_js__WEBPACK_IMPORTED_MODULE_0__.halfPi);
  parallels = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.min)(parallels, _math_js__WEBPACK_IMPORTED_MODULE_0__.pi - _math_js__WEBPACK_IMPORTED_MODULE_0__.epsilon);
  // 0 <= inflation <= 99.999
  inflation = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.max)(inflation, 0);
  inflation = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.min)(inflation, 100 - _math_js__WEBPACK_IMPORTED_MODULE_0__.epsilon);
  // ratio > 0.
  // sensible values, i.e. something that renders a map which still can be
  // recognized as world map, are e.g. 20 <= ratio <= 1000.
  ratio = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.max)(ratio, _math_js__WEBPACK_IMPORTED_MODULE_0__.epsilon);

  // convert values from boehm notation
  // areal inflation e.g. from 0 to 1 or 20 to 1.2:
  var vinflation = inflation/100 + 1;
  // axial ratio e.g. from 200 to 2:
  var vratio  = ratio / 100;
  // the other ones are a bit more complicated...
  var m2 = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.acos)(vinflation * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.cos)(phi1)) / phi1,
      m1 = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sin)(poleline) / (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sin)(m2 * _math_js__WEBPACK_IMPORTED_MODULE_0__.halfPi),
      n = parallels / _math_js__WEBPACK_IMPORTED_MODULE_0__.pi,
      k = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sqrt)(vratio * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sin)(poleline / 2) / (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sin)(parallels / 2)),
      cx = k / (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sqrt)(n * m1 * m2),
      cy = 1 / (k * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sqrt)(n * m1 * m2));

  return wagnerFormula(cx, cy, m1, m2, n);
}

function wagner() {
  // default values generate wagner8
  var poleline = 65 * _math_js__WEBPACK_IMPORTED_MODULE_0__.radians,
      parallels = 60 * _math_js__WEBPACK_IMPORTED_MODULE_0__.radians,
      inflation = 20,
      ratio = 200,
      mutate = (0,d3_geo__WEBPACK_IMPORTED_MODULE_1__.projectionMutator)(wagnerRaw),
      projection = mutate(poleline, parallels, inflation, ratio);

  projection.poleline = function(_) {
    return arguments.length ? mutate(poleline = +_ * _math_js__WEBPACK_IMPORTED_MODULE_0__.radians, parallels, inflation, ratio) : poleline * _math_js__WEBPACK_IMPORTED_MODULE_0__.degrees;
  };

  projection.parallels = function(_) {
    return arguments.length ? mutate(poleline, parallels = +_ * _math_js__WEBPACK_IMPORTED_MODULE_0__.radians, inflation, ratio) : parallels * _math_js__WEBPACK_IMPORTED_MODULE_0__.degrees;
  };
  projection.inflation = function(_) {
    return arguments.length ? mutate(poleline, parallels, inflation = +_, ratio) : inflation;
  };
  projection.ratio = function(_) {
    return arguments.length ? mutate(poleline, parallels, inflation, ratio = +_) : ratio;
  };

  return projection
    .scale(163.775);
}

function wagner7() {
  return wagner()
      .poleline(65)
      .parallels(60)
      .inflation(0)
      .ratio(200)
      .scale(172.633);
}


/***/ }),

/***/ "./node_modules/d3-geo-projection/src/wagner4.js":
/*!*******************************************************!*\
  !*** ./node_modules/d3-geo-projection/src/wagner4.js ***!
  \*******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "wagner4Raw": () => (/* binding */ wagner4Raw),
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var d3_geo__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! d3-geo */ "./node_modules/d3-geo/src/projection/index.js");
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./math.js */ "./node_modules/d3-geo-projection/src/math.js");
/* harmony import */ var _mollweide_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./mollweide.js */ "./node_modules/d3-geo-projection/src/mollweide.js");




var A = 4 * _math_js__WEBPACK_IMPORTED_MODULE_0__.pi + 3 * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sqrt)(3),
    B = 2 * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sqrt)(2 * _math_js__WEBPACK_IMPORTED_MODULE_0__.pi * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sqrt)(3) / A);

var wagner4Raw = (0,_mollweide_js__WEBPACK_IMPORTED_MODULE_1__.mollweideBromleyRaw)(B * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sqrt)(3) / _math_js__WEBPACK_IMPORTED_MODULE_0__.pi, B, A / 6);

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {
  return (0,d3_geo__WEBPACK_IMPORTED_MODULE_2__["default"])(wagner4Raw)
      .scale(176.84);
}


/***/ }),

/***/ "./node_modules/d3-geo-projection/src/wagner6.js":
/*!*******************************************************!*\
  !*** ./node_modules/d3-geo-projection/src/wagner6.js ***!
  \*******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "wagner6Raw": () => (/* binding */ wagner6Raw),
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var d3_geo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! d3-geo */ "./node_modules/d3-geo/src/projection/index.js");
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./math.js */ "./node_modules/d3-geo-projection/src/math.js");



function wagner6Raw(lambda, phi) {
  return [lambda * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sqrt)(1 - 3 * phi * phi / (_math_js__WEBPACK_IMPORTED_MODULE_0__.pi * _math_js__WEBPACK_IMPORTED_MODULE_0__.pi)), phi];
}

wagner6Raw.invert = function(x, y) {
  return [x / (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sqrt)(1 - 3 * y * y / (_math_js__WEBPACK_IMPORTED_MODULE_0__.pi * _math_js__WEBPACK_IMPORTED_MODULE_0__.pi)), y];
};

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {
  return (0,d3_geo__WEBPACK_IMPORTED_MODULE_1__["default"])(wagner6Raw)
      .scale(152.63);
}


/***/ }),

/***/ "./node_modules/d3-geo-projection/src/wiechel.js":
/*!*******************************************************!*\
  !*** ./node_modules/d3-geo-projection/src/wiechel.js ***!
  \*******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "wiechelRaw": () => (/* binding */ wiechelRaw),
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var d3_geo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! d3-geo */ "./node_modules/d3-geo/src/projection/index.js");
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./math.js */ "./node_modules/d3-geo-projection/src/math.js");



function wiechelRaw(lambda, phi) {
  var cosPhi = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.cos)(phi),
      sinPhi = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.cos)(lambda) * cosPhi,
      sin1_Phi = 1 - sinPhi,
      cosLambda = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.cos)(lambda = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.atan2)((0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sin)(lambda) * cosPhi, -(0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sin)(phi))),
      sinLambda = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sin)(lambda);
  cosPhi = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sqrt)(1 - sinPhi * sinPhi);
  return [
    sinLambda * cosPhi - cosLambda * sin1_Phi,
    -cosLambda * cosPhi - sinLambda * sin1_Phi
  ];
}

wiechelRaw.invert = function(x, y) {
  var w = (x * x + y * y) / -2,
      k = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sqrt)(-w * (2 + w)),
      b = y * w + x * k,
      a = x * w - y * k,
      D = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sqrt)(a * a + b * b);
  return [
    (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.atan2)(k * b, D * (1 + w)),
    D ? -(0,_math_js__WEBPACK_IMPORTED_MODULE_0__.asin)(k * a / D) : 0
  ];
};

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {
  return (0,d3_geo__WEBPACK_IMPORTED_MODULE_1__["default"])(wiechelRaw)
      .rotate([0, -90, 45])
      .scale(124.75)
      .clipAngle(180 - 1e-3);
}


/***/ }),

/***/ "./node_modules/d3-geo-projection/src/winkel3.js":
/*!*******************************************************!*\
  !*** ./node_modules/d3-geo-projection/src/winkel3.js ***!
  \*******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "winkel3Raw": () => (/* binding */ winkel3Raw),
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var d3_geo__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! d3-geo */ "./node_modules/d3-geo/src/projection/index.js");
/* harmony import */ var _aitoff_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./aitoff.js */ "./node_modules/d3-geo-projection/src/aitoff.js");
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./math.js */ "./node_modules/d3-geo-projection/src/math.js");




function winkel3Raw(lambda, phi) {
  var coordinates = (0,_aitoff_js__WEBPACK_IMPORTED_MODULE_0__.aitoffRaw)(lambda, phi);
  return [
    (coordinates[0] + lambda / _math_js__WEBPACK_IMPORTED_MODULE_1__.halfPi) / 2,
    (coordinates[1] + phi) / 2
  ];
}

winkel3Raw.invert = function(x, y) {
  var lambda = x, phi = y, i = 25;
  do {
    var cosphi = (0,_math_js__WEBPACK_IMPORTED_MODULE_1__.cos)(phi),
        sinphi = (0,_math_js__WEBPACK_IMPORTED_MODULE_1__.sin)(phi),
        sin_2phi = (0,_math_js__WEBPACK_IMPORTED_MODULE_1__.sin)(2 * phi),
        sin2phi = sinphi * sinphi,
        cos2phi = cosphi * cosphi,
        sinlambda = (0,_math_js__WEBPACK_IMPORTED_MODULE_1__.sin)(lambda),
        coslambda_2 = (0,_math_js__WEBPACK_IMPORTED_MODULE_1__.cos)(lambda / 2),
        sinlambda_2 = (0,_math_js__WEBPACK_IMPORTED_MODULE_1__.sin)(lambda / 2),
        sin2lambda_2 = sinlambda_2 * sinlambda_2,
        C = 1 - cos2phi * coslambda_2 * coslambda_2,
        E = C ? (0,_math_js__WEBPACK_IMPORTED_MODULE_1__.acos)(cosphi * coslambda_2) * (0,_math_js__WEBPACK_IMPORTED_MODULE_1__.sqrt)(F = 1 / C) : F = 0,
        F,
        fx = 0.5 * (2 * E * cosphi * sinlambda_2 + lambda / _math_js__WEBPACK_IMPORTED_MODULE_1__.halfPi) - x,
        fy = 0.5 * (E * sinphi + phi) - y,
        dxdlambda = 0.5 * F * (cos2phi * sin2lambda_2 + E * cosphi * coslambda_2 * sin2phi) + 0.5 / _math_js__WEBPACK_IMPORTED_MODULE_1__.halfPi,
        dxdphi = F * (sinlambda * sin_2phi / 4 - E * sinphi * sinlambda_2),
        dydlambda = 0.125 * F * (sin_2phi * sinlambda_2 - E * sinphi * cos2phi * sinlambda),
        dydphi = 0.5 * F * (sin2phi * coslambda_2 + E * sin2lambda_2 * cosphi) + 0.5,
        denominator = dxdphi * dydlambda - dydphi * dxdlambda,
        dlambda = (fy * dxdphi - fx * dydphi) / denominator,
        dphi = (fx * dydlambda - fy * dxdlambda) / denominator;
    lambda -= dlambda, phi -= dphi;
  } while (((0,_math_js__WEBPACK_IMPORTED_MODULE_1__.abs)(dlambda) > _math_js__WEBPACK_IMPORTED_MODULE_1__.epsilon || (0,_math_js__WEBPACK_IMPORTED_MODULE_1__.abs)(dphi) > _math_js__WEBPACK_IMPORTED_MODULE_1__.epsilon) && --i > 0);
  return [lambda, phi];
};

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {
  return (0,d3_geo__WEBPACK_IMPORTED_MODULE_2__["default"])(winkel3Raw)
      .scale(158.837);
}


/***/ }),

/***/ "./node_modules/d3-geo/src/area.js":
/*!*****************************************!*\
  !*** ./node_modules/d3-geo/src/area.js ***!
  \*****************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "areaRingSum": () => (/* binding */ areaRingSum),
/* harmony export */   "areaStream": () => (/* binding */ areaStream),
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var d3_array__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! d3-array */ "./node_modules/d3-array/src/fsum.js");
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./math.js */ "./node_modules/d3-geo/src/math.js");
/* harmony import */ var _noop_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./noop.js */ "./node_modules/d3-geo/src/noop.js");
/* harmony import */ var _stream_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./stream.js */ "./node_modules/d3-geo/src/stream.js");





var areaRingSum = new d3_array__WEBPACK_IMPORTED_MODULE_0__.Adder();

// hello?

var areaSum = new d3_array__WEBPACK_IMPORTED_MODULE_0__.Adder(),
    lambda00,
    phi00,
    lambda0,
    cosPhi0,
    sinPhi0;

var areaStream = {
  point: _noop_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  lineStart: _noop_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  lineEnd: _noop_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  polygonStart: function() {
    areaRingSum = new d3_array__WEBPACK_IMPORTED_MODULE_0__.Adder();
    areaStream.lineStart = areaRingStart;
    areaStream.lineEnd = areaRingEnd;
  },
  polygonEnd: function() {
    var areaRing = +areaRingSum;
    areaSum.add(areaRing < 0 ? _math_js__WEBPACK_IMPORTED_MODULE_2__.tau + areaRing : areaRing);
    this.lineStart = this.lineEnd = this.point = _noop_js__WEBPACK_IMPORTED_MODULE_1__["default"];
  },
  sphere: function() {
    areaSum.add(_math_js__WEBPACK_IMPORTED_MODULE_2__.tau);
  }
};

function areaRingStart() {
  areaStream.point = areaPointFirst;
}

function areaRingEnd() {
  areaPoint(lambda00, phi00);
}

function areaPointFirst(lambda, phi) {
  areaStream.point = areaPoint;
  lambda00 = lambda, phi00 = phi;
  lambda *= _math_js__WEBPACK_IMPORTED_MODULE_2__.radians, phi *= _math_js__WEBPACK_IMPORTED_MODULE_2__.radians;
  lambda0 = lambda, cosPhi0 = (0,_math_js__WEBPACK_IMPORTED_MODULE_2__.cos)(phi = phi / 2 + _math_js__WEBPACK_IMPORTED_MODULE_2__.quarterPi), sinPhi0 = (0,_math_js__WEBPACK_IMPORTED_MODULE_2__.sin)(phi);
}

function areaPoint(lambda, phi) {
  lambda *= _math_js__WEBPACK_IMPORTED_MODULE_2__.radians, phi *= _math_js__WEBPACK_IMPORTED_MODULE_2__.radians;
  phi = phi / 2 + _math_js__WEBPACK_IMPORTED_MODULE_2__.quarterPi; // half the angular distance from south pole

  // Spherical excess E for a spherical triangle with vertices: south pole,
  // previous point, current point.  Uses a formula derived from Cagnoli’s
  // theorem.  See Todhunter, Spherical Trig. (1871), Sec. 103, Eq. (2).
  var dLambda = lambda - lambda0,
      sdLambda = dLambda >= 0 ? 1 : -1,
      adLambda = sdLambda * dLambda,
      cosPhi = (0,_math_js__WEBPACK_IMPORTED_MODULE_2__.cos)(phi),
      sinPhi = (0,_math_js__WEBPACK_IMPORTED_MODULE_2__.sin)(phi),
      k = sinPhi0 * sinPhi,
      u = cosPhi0 * cosPhi + k * (0,_math_js__WEBPACK_IMPORTED_MODULE_2__.cos)(adLambda),
      v = k * sdLambda * (0,_math_js__WEBPACK_IMPORTED_MODULE_2__.sin)(adLambda);
  areaRingSum.add((0,_math_js__WEBPACK_IMPORTED_MODULE_2__.atan2)(v, u));

  // Advance the previous points.
  lambda0 = lambda, cosPhi0 = cosPhi, sinPhi0 = sinPhi;
}

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(object) {
  areaSum = new d3_array__WEBPACK_IMPORTED_MODULE_0__.Adder();
  (0,_stream_js__WEBPACK_IMPORTED_MODULE_3__["default"])(object, areaStream);
  return areaSum * 2;
}


/***/ }),

/***/ "./node_modules/d3-geo/src/bounds.js":
/*!*******************************************!*\
  !*** ./node_modules/d3-geo/src/bounds.js ***!
  \*******************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var d3_array__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! d3-array */ "./node_modules/d3-array/src/fsum.js");
/* harmony import */ var _area_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./area.js */ "./node_modules/d3-geo/src/area.js");
/* harmony import */ var _cartesian_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./cartesian.js */ "./node_modules/d3-geo/src/cartesian.js");
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./math.js */ "./node_modules/d3-geo/src/math.js");
/* harmony import */ var _stream_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./stream.js */ "./node_modules/d3-geo/src/stream.js");






var lambda0, phi0, lambda1, phi1, // bounds
    lambda2, // previous lambda-coordinate
    lambda00, phi00, // first point
    p0, // previous 3D point
    deltaSum,
    ranges,
    range;

var boundsStream = {
  point: boundsPoint,
  lineStart: boundsLineStart,
  lineEnd: boundsLineEnd,
  polygonStart: function() {
    boundsStream.point = boundsRingPoint;
    boundsStream.lineStart = boundsRingStart;
    boundsStream.lineEnd = boundsRingEnd;
    deltaSum = new d3_array__WEBPACK_IMPORTED_MODULE_0__.Adder();
    _area_js__WEBPACK_IMPORTED_MODULE_1__.areaStream.polygonStart();
  },
  polygonEnd: function() {
    _area_js__WEBPACK_IMPORTED_MODULE_1__.areaStream.polygonEnd();
    boundsStream.point = boundsPoint;
    boundsStream.lineStart = boundsLineStart;
    boundsStream.lineEnd = boundsLineEnd;
    if (_area_js__WEBPACK_IMPORTED_MODULE_1__.areaRingSum < 0) lambda0 = -(lambda1 = 180), phi0 = -(phi1 = 90);
    else if (deltaSum > _math_js__WEBPACK_IMPORTED_MODULE_2__.epsilon) phi1 = 90;
    else if (deltaSum < -_math_js__WEBPACK_IMPORTED_MODULE_2__.epsilon) phi0 = -90;
    range[0] = lambda0, range[1] = lambda1;
  },
  sphere: function() {
    lambda0 = -(lambda1 = 180), phi0 = -(phi1 = 90);
  }
};

function boundsPoint(lambda, phi) {
  ranges.push(range = [lambda0 = lambda, lambda1 = lambda]);
  if (phi < phi0) phi0 = phi;
  if (phi > phi1) phi1 = phi;
}

function linePoint(lambda, phi) {
  var p = (0,_cartesian_js__WEBPACK_IMPORTED_MODULE_3__.cartesian)([lambda * _math_js__WEBPACK_IMPORTED_MODULE_2__.radians, phi * _math_js__WEBPACK_IMPORTED_MODULE_2__.radians]);
  if (p0) {
    var normal = (0,_cartesian_js__WEBPACK_IMPORTED_MODULE_3__.cartesianCross)(p0, p),
        equatorial = [normal[1], -normal[0], 0],
        inflection = (0,_cartesian_js__WEBPACK_IMPORTED_MODULE_3__.cartesianCross)(equatorial, normal);
    (0,_cartesian_js__WEBPACK_IMPORTED_MODULE_3__.cartesianNormalizeInPlace)(inflection);
    inflection = (0,_cartesian_js__WEBPACK_IMPORTED_MODULE_3__.spherical)(inflection);
    var delta = lambda - lambda2,
        sign = delta > 0 ? 1 : -1,
        lambdai = inflection[0] * _math_js__WEBPACK_IMPORTED_MODULE_2__.degrees * sign,
        phii,
        antimeridian = (0,_math_js__WEBPACK_IMPORTED_MODULE_2__.abs)(delta) > 180;
    if (antimeridian ^ (sign * lambda2 < lambdai && lambdai < sign * lambda)) {
      phii = inflection[1] * _math_js__WEBPACK_IMPORTED_MODULE_2__.degrees;
      if (phii > phi1) phi1 = phii;
    } else if (lambdai = (lambdai + 360) % 360 - 180, antimeridian ^ (sign * lambda2 < lambdai && lambdai < sign * lambda)) {
      phii = -inflection[1] * _math_js__WEBPACK_IMPORTED_MODULE_2__.degrees;
      if (phii < phi0) phi0 = phii;
    } else {
      if (phi < phi0) phi0 = phi;
      if (phi > phi1) phi1 = phi;
    }
    if (antimeridian) {
      if (lambda < lambda2) {
        if (angle(lambda0, lambda) > angle(lambda0, lambda1)) lambda1 = lambda;
      } else {
        if (angle(lambda, lambda1) > angle(lambda0, lambda1)) lambda0 = lambda;
      }
    } else {
      if (lambda1 >= lambda0) {
        if (lambda < lambda0) lambda0 = lambda;
        if (lambda > lambda1) lambda1 = lambda;
      } else {
        if (lambda > lambda2) {
          if (angle(lambda0, lambda) > angle(lambda0, lambda1)) lambda1 = lambda;
        } else {
          if (angle(lambda, lambda1) > angle(lambda0, lambda1)) lambda0 = lambda;
        }
      }
    }
  } else {
    ranges.push(range = [lambda0 = lambda, lambda1 = lambda]);
  }
  if (phi < phi0) phi0 = phi;
  if (phi > phi1) phi1 = phi;
  p0 = p, lambda2 = lambda;
}

function boundsLineStart() {
  boundsStream.point = linePoint;
}

function boundsLineEnd() {
  range[0] = lambda0, range[1] = lambda1;
  boundsStream.point = boundsPoint;
  p0 = null;
}

function boundsRingPoint(lambda, phi) {
  if (p0) {
    var delta = lambda - lambda2;
    deltaSum.add((0,_math_js__WEBPACK_IMPORTED_MODULE_2__.abs)(delta) > 180 ? delta + (delta > 0 ? 360 : -360) : delta);
  } else {
    lambda00 = lambda, phi00 = phi;
  }
  _area_js__WEBPACK_IMPORTED_MODULE_1__.areaStream.point(lambda, phi);
  linePoint(lambda, phi);
}

function boundsRingStart() {
  _area_js__WEBPACK_IMPORTED_MODULE_1__.areaStream.lineStart();
}

function boundsRingEnd() {
  boundsRingPoint(lambda00, phi00);
  _area_js__WEBPACK_IMPORTED_MODULE_1__.areaStream.lineEnd();
  if ((0,_math_js__WEBPACK_IMPORTED_MODULE_2__.abs)(deltaSum) > _math_js__WEBPACK_IMPORTED_MODULE_2__.epsilon) lambda0 = -(lambda1 = 180);
  range[0] = lambda0, range[1] = lambda1;
  p0 = null;
}

// Finds the left-right distance between two longitudes.
// This is almost the same as (lambda1 - lambda0 + 360°) % 360°, except that we want
// the distance between ±180° to be 360°.
function angle(lambda0, lambda1) {
  return (lambda1 -= lambda0) < 0 ? lambda1 + 360 : lambda1;
}

function rangeCompare(a, b) {
  return a[0] - b[0];
}

function rangeContains(range, x) {
  return range[0] <= range[1] ? range[0] <= x && x <= range[1] : x < range[0] || range[1] < x;
}

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(feature) {
  var i, n, a, b, merged, deltaMax, delta;

  phi1 = lambda1 = -(lambda0 = phi0 = Infinity);
  ranges = [];
  (0,_stream_js__WEBPACK_IMPORTED_MODULE_4__["default"])(feature, boundsStream);

  // First, sort ranges by their minimum longitudes.
  if (n = ranges.length) {
    ranges.sort(rangeCompare);

    // Then, merge any ranges that overlap.
    for (i = 1, a = ranges[0], merged = [a]; i < n; ++i) {
      b = ranges[i];
      if (rangeContains(a, b[0]) || rangeContains(a, b[1])) {
        if (angle(a[0], b[1]) > angle(a[0], a[1])) a[1] = b[1];
        if (angle(b[0], a[1]) > angle(a[0], a[1])) a[0] = b[0];
      } else {
        merged.push(a = b);
      }
    }

    // Finally, find the largest gap between the merged ranges.
    // The final bounding box will be the inverse of this gap.
    for (deltaMax = -Infinity, n = merged.length - 1, i = 0, a = merged[n]; i <= n; a = b, ++i) {
      b = merged[i];
      if ((delta = angle(a[1], b[0])) > deltaMax) deltaMax = delta, lambda0 = b[0], lambda1 = a[1];
    }
  }

  ranges = range = null;

  return lambda0 === Infinity || phi0 === Infinity
      ? [[NaN, NaN], [NaN, NaN]]
      : [[lambda0, phi0], [lambda1, phi1]];
}


/***/ }),

/***/ "./node_modules/d3-geo/src/cartesian.js":
/*!**********************************************!*\
  !*** ./node_modules/d3-geo/src/cartesian.js ***!
  \**********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "spherical": () => (/* binding */ spherical),
/* harmony export */   "cartesian": () => (/* binding */ cartesian),
/* harmony export */   "cartesianDot": () => (/* binding */ cartesianDot),
/* harmony export */   "cartesianCross": () => (/* binding */ cartesianCross),
/* harmony export */   "cartesianAddInPlace": () => (/* binding */ cartesianAddInPlace),
/* harmony export */   "cartesianScale": () => (/* binding */ cartesianScale),
/* harmony export */   "cartesianNormalizeInPlace": () => (/* binding */ cartesianNormalizeInPlace)
/* harmony export */ });
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./math.js */ "./node_modules/d3-geo/src/math.js");


function spherical(cartesian) {
  return [(0,_math_js__WEBPACK_IMPORTED_MODULE_0__.atan2)(cartesian[1], cartesian[0]), (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.asin)(cartesian[2])];
}

function cartesian(spherical) {
  var lambda = spherical[0], phi = spherical[1], cosPhi = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.cos)(phi);
  return [cosPhi * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.cos)(lambda), cosPhi * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sin)(lambda), (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sin)(phi)];
}

function cartesianDot(a, b) {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
}

function cartesianCross(a, b) {
  return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
}

// TODO return a
function cartesianAddInPlace(a, b) {
  a[0] += b[0], a[1] += b[1], a[2] += b[2];
}

function cartesianScale(vector, k) {
  return [vector[0] * k, vector[1] * k, vector[2] * k];
}

// TODO return d
function cartesianNormalizeInPlace(d) {
  var l = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sqrt)(d[0] * d[0] + d[1] * d[1] + d[2] * d[2]);
  d[0] /= l, d[1] /= l, d[2] /= l;
}


/***/ }),

/***/ "./node_modules/d3-geo/src/centroid.js":
/*!*********************************************!*\
  !*** ./node_modules/d3-geo/src/centroid.js ***!
  \*********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var d3_array__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! d3-array */ "./node_modules/d3-array/src/fsum.js");
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./math.js */ "./node_modules/d3-geo/src/math.js");
/* harmony import */ var _noop_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./noop.js */ "./node_modules/d3-geo/src/noop.js");
/* harmony import */ var _stream_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./stream.js */ "./node_modules/d3-geo/src/stream.js");





var W0, W1,
    X0, Y0, Z0,
    X1, Y1, Z1,
    X2, Y2, Z2,
    lambda00, phi00, // first point
    x0, y0, z0; // previous point

var centroidStream = {
  sphere: _noop_js__WEBPACK_IMPORTED_MODULE_0__["default"],
  point: centroidPoint,
  lineStart: centroidLineStart,
  lineEnd: centroidLineEnd,
  polygonStart: function() {
    centroidStream.lineStart = centroidRingStart;
    centroidStream.lineEnd = centroidRingEnd;
  },
  polygonEnd: function() {
    centroidStream.lineStart = centroidLineStart;
    centroidStream.lineEnd = centroidLineEnd;
  }
};

// Arithmetic mean of Cartesian vectors.
function centroidPoint(lambda, phi) {
  lambda *= _math_js__WEBPACK_IMPORTED_MODULE_1__.radians, phi *= _math_js__WEBPACK_IMPORTED_MODULE_1__.radians;
  var cosPhi = (0,_math_js__WEBPACK_IMPORTED_MODULE_1__.cos)(phi);
  centroidPointCartesian(cosPhi * (0,_math_js__WEBPACK_IMPORTED_MODULE_1__.cos)(lambda), cosPhi * (0,_math_js__WEBPACK_IMPORTED_MODULE_1__.sin)(lambda), (0,_math_js__WEBPACK_IMPORTED_MODULE_1__.sin)(phi));
}

function centroidPointCartesian(x, y, z) {
  ++W0;
  X0 += (x - X0) / W0;
  Y0 += (y - Y0) / W0;
  Z0 += (z - Z0) / W0;
}

function centroidLineStart() {
  centroidStream.point = centroidLinePointFirst;
}

function centroidLinePointFirst(lambda, phi) {
  lambda *= _math_js__WEBPACK_IMPORTED_MODULE_1__.radians, phi *= _math_js__WEBPACK_IMPORTED_MODULE_1__.radians;
  var cosPhi = (0,_math_js__WEBPACK_IMPORTED_MODULE_1__.cos)(phi);
  x0 = cosPhi * (0,_math_js__WEBPACK_IMPORTED_MODULE_1__.cos)(lambda);
  y0 = cosPhi * (0,_math_js__WEBPACK_IMPORTED_MODULE_1__.sin)(lambda);
  z0 = (0,_math_js__WEBPACK_IMPORTED_MODULE_1__.sin)(phi);
  centroidStream.point = centroidLinePoint;
  centroidPointCartesian(x0, y0, z0);
}

function centroidLinePoint(lambda, phi) {
  lambda *= _math_js__WEBPACK_IMPORTED_MODULE_1__.radians, phi *= _math_js__WEBPACK_IMPORTED_MODULE_1__.radians;
  var cosPhi = (0,_math_js__WEBPACK_IMPORTED_MODULE_1__.cos)(phi),
      x = cosPhi * (0,_math_js__WEBPACK_IMPORTED_MODULE_1__.cos)(lambda),
      y = cosPhi * (0,_math_js__WEBPACK_IMPORTED_MODULE_1__.sin)(lambda),
      z = (0,_math_js__WEBPACK_IMPORTED_MODULE_1__.sin)(phi),
      w = (0,_math_js__WEBPACK_IMPORTED_MODULE_1__.atan2)((0,_math_js__WEBPACK_IMPORTED_MODULE_1__.sqrt)((w = y0 * z - z0 * y) * w + (w = z0 * x - x0 * z) * w + (w = x0 * y - y0 * x) * w), x0 * x + y0 * y + z0 * z);
  W1 += w;
  X1 += w * (x0 + (x0 = x));
  Y1 += w * (y0 + (y0 = y));
  Z1 += w * (z0 + (z0 = z));
  centroidPointCartesian(x0, y0, z0);
}

function centroidLineEnd() {
  centroidStream.point = centroidPoint;
}

// See J. E. Brock, The Inertia Tensor for a Spherical Triangle,
// J. Applied Mechanics 42, 239 (1975).
function centroidRingStart() {
  centroidStream.point = centroidRingPointFirst;
}

function centroidRingEnd() {
  centroidRingPoint(lambda00, phi00);
  centroidStream.point = centroidPoint;
}

function centroidRingPointFirst(lambda, phi) {
  lambda00 = lambda, phi00 = phi;
  lambda *= _math_js__WEBPACK_IMPORTED_MODULE_1__.radians, phi *= _math_js__WEBPACK_IMPORTED_MODULE_1__.radians;
  centroidStream.point = centroidRingPoint;
  var cosPhi = (0,_math_js__WEBPACK_IMPORTED_MODULE_1__.cos)(phi);
  x0 = cosPhi * (0,_math_js__WEBPACK_IMPORTED_MODULE_1__.cos)(lambda);
  y0 = cosPhi * (0,_math_js__WEBPACK_IMPORTED_MODULE_1__.sin)(lambda);
  z0 = (0,_math_js__WEBPACK_IMPORTED_MODULE_1__.sin)(phi);
  centroidPointCartesian(x0, y0, z0);
}

function centroidRingPoint(lambda, phi) {
  lambda *= _math_js__WEBPACK_IMPORTED_MODULE_1__.radians, phi *= _math_js__WEBPACK_IMPORTED_MODULE_1__.radians;
  var cosPhi = (0,_math_js__WEBPACK_IMPORTED_MODULE_1__.cos)(phi),
      x = cosPhi * (0,_math_js__WEBPACK_IMPORTED_MODULE_1__.cos)(lambda),
      y = cosPhi * (0,_math_js__WEBPACK_IMPORTED_MODULE_1__.sin)(lambda),
      z = (0,_math_js__WEBPACK_IMPORTED_MODULE_1__.sin)(phi),
      cx = y0 * z - z0 * y,
      cy = z0 * x - x0 * z,
      cz = x0 * y - y0 * x,
      m = (0,_math_js__WEBPACK_IMPORTED_MODULE_1__.hypot)(cx, cy, cz),
      w = (0,_math_js__WEBPACK_IMPORTED_MODULE_1__.asin)(m), // line weight = angle
      v = m && -w / m; // area weight multiplier
  X2.add(v * cx);
  Y2.add(v * cy);
  Z2.add(v * cz);
  W1 += w;
  X1 += w * (x0 + (x0 = x));
  Y1 += w * (y0 + (y0 = y));
  Z1 += w * (z0 + (z0 = z));
  centroidPointCartesian(x0, y0, z0);
}

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(object) {
  W0 = W1 =
  X0 = Y0 = Z0 =
  X1 = Y1 = Z1 = 0;
  X2 = new d3_array__WEBPACK_IMPORTED_MODULE_2__.Adder();
  Y2 = new d3_array__WEBPACK_IMPORTED_MODULE_2__.Adder();
  Z2 = new d3_array__WEBPACK_IMPORTED_MODULE_2__.Adder();
  (0,_stream_js__WEBPACK_IMPORTED_MODULE_3__["default"])(object, centroidStream);

  var x = +X2,
      y = +Y2,
      z = +Z2,
      m = (0,_math_js__WEBPACK_IMPORTED_MODULE_1__.hypot)(x, y, z);

  // If the area-weighted ccentroid is undefined, fall back to length-weighted ccentroid.
  if (m < _math_js__WEBPACK_IMPORTED_MODULE_1__.epsilon2) {
    x = X1, y = Y1, z = Z1;
    // If the feature has zero length, fall back to arithmetic mean of point vectors.
    if (W1 < _math_js__WEBPACK_IMPORTED_MODULE_1__.epsilon) x = X0, y = Y0, z = Z0;
    m = (0,_math_js__WEBPACK_IMPORTED_MODULE_1__.hypot)(x, y, z);
    // If the feature still has an undefined ccentroid, then return.
    if (m < _math_js__WEBPACK_IMPORTED_MODULE_1__.epsilon2) return [NaN, NaN];
  }

  return [(0,_math_js__WEBPACK_IMPORTED_MODULE_1__.atan2)(y, x) * _math_js__WEBPACK_IMPORTED_MODULE_1__.degrees, (0,_math_js__WEBPACK_IMPORTED_MODULE_1__.asin)(z / m) * _math_js__WEBPACK_IMPORTED_MODULE_1__.degrees];
}


/***/ }),

/***/ "./node_modules/d3-geo/src/circle.js":
/*!*******************************************!*\
  !*** ./node_modules/d3-geo/src/circle.js ***!
  \*******************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "circleStream": () => (/* binding */ circleStream),
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _cartesian_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./cartesian.js */ "./node_modules/d3-geo/src/cartesian.js");
/* harmony import */ var _constant_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./constant.js */ "./node_modules/d3-geo/src/constant.js");
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./math.js */ "./node_modules/d3-geo/src/math.js");
/* harmony import */ var _rotation_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./rotation.js */ "./node_modules/d3-geo/src/rotation.js");





// Generates a circle centered at [0°, 0°], with a given radius and precision.
function circleStream(stream, radius, delta, direction, t0, t1) {
  if (!delta) return;
  var cosRadius = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.cos)(radius),
      sinRadius = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sin)(radius),
      step = direction * delta;
  if (t0 == null) {
    t0 = radius + direction * _math_js__WEBPACK_IMPORTED_MODULE_0__.tau;
    t1 = radius - step / 2;
  } else {
    t0 = circleRadius(cosRadius, t0);
    t1 = circleRadius(cosRadius, t1);
    if (direction > 0 ? t0 < t1 : t0 > t1) t0 += direction * _math_js__WEBPACK_IMPORTED_MODULE_0__.tau;
  }
  for (var point, t = t0; direction > 0 ? t > t1 : t < t1; t -= step) {
    point = (0,_cartesian_js__WEBPACK_IMPORTED_MODULE_1__.spherical)([cosRadius, -sinRadius * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.cos)(t), -sinRadius * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sin)(t)]);
    stream.point(point[0], point[1]);
  }
}

// Returns the signed angle of a cartesian point relative to [cosRadius, 0, 0].
function circleRadius(cosRadius, point) {
  point = (0,_cartesian_js__WEBPACK_IMPORTED_MODULE_1__.cartesian)(point), point[0] -= cosRadius;
  (0,_cartesian_js__WEBPACK_IMPORTED_MODULE_1__.cartesianNormalizeInPlace)(point);
  var radius = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.acos)(-point[1]);
  return ((-point[2] < 0 ? -radius : radius) + _math_js__WEBPACK_IMPORTED_MODULE_0__.tau - _math_js__WEBPACK_IMPORTED_MODULE_0__.epsilon) % _math_js__WEBPACK_IMPORTED_MODULE_0__.tau;
}

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {
  var center = (0,_constant_js__WEBPACK_IMPORTED_MODULE_2__["default"])([0, 0]),
      radius = (0,_constant_js__WEBPACK_IMPORTED_MODULE_2__["default"])(90),
      precision = (0,_constant_js__WEBPACK_IMPORTED_MODULE_2__["default"])(6),
      ring,
      rotate,
      stream = {point: point};

  function point(x, y) {
    ring.push(x = rotate(x, y));
    x[0] *= _math_js__WEBPACK_IMPORTED_MODULE_0__.degrees, x[1] *= _math_js__WEBPACK_IMPORTED_MODULE_0__.degrees;
  }

  function circle() {
    var c = center.apply(this, arguments),
        r = radius.apply(this, arguments) * _math_js__WEBPACK_IMPORTED_MODULE_0__.radians,
        p = precision.apply(this, arguments) * _math_js__WEBPACK_IMPORTED_MODULE_0__.radians;
    ring = [];
    rotate = (0,_rotation_js__WEBPACK_IMPORTED_MODULE_3__.rotateRadians)(-c[0] * _math_js__WEBPACK_IMPORTED_MODULE_0__.radians, -c[1] * _math_js__WEBPACK_IMPORTED_MODULE_0__.radians, 0).invert;
    circleStream(stream, r, p, 1);
    c = {type: "Polygon", coordinates: [ring]};
    ring = rotate = null;
    return c;
  }

  circle.center = function(_) {
    return arguments.length ? (center = typeof _ === "function" ? _ : (0,_constant_js__WEBPACK_IMPORTED_MODULE_2__["default"])([+_[0], +_[1]]), circle) : center;
  };

  circle.radius = function(_) {
    return arguments.length ? (radius = typeof _ === "function" ? _ : (0,_constant_js__WEBPACK_IMPORTED_MODULE_2__["default"])(+_), circle) : radius;
  };

  circle.precision = function(_) {
    return arguments.length ? (precision = typeof _ === "function" ? _ : (0,_constant_js__WEBPACK_IMPORTED_MODULE_2__["default"])(+_), circle) : precision;
  };

  return circle;
}


/***/ }),

/***/ "./node_modules/d3-geo/src/clip/antimeridian.js":
/*!******************************************************!*\
  !*** ./node_modules/d3-geo/src/clip/antimeridian.js ***!
  \******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.js */ "./node_modules/d3-geo/src/clip/index.js");
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../math.js */ "./node_modules/d3-geo/src/math.js");



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(
  function() { return true; },
  clipAntimeridianLine,
  clipAntimeridianInterpolate,
  [-_math_js__WEBPACK_IMPORTED_MODULE_1__.pi, -_math_js__WEBPACK_IMPORTED_MODULE_1__.halfPi]
));

// Takes a line and cuts into visible segments. Return values: 0 - there were
// intersections or the line was empty; 1 - no intersections; 2 - there were
// intersections, and the first and last segments should be rejoined.
function clipAntimeridianLine(stream) {
  var lambda0 = NaN,
      phi0 = NaN,
      sign0 = NaN,
      clean; // no intersections

  return {
    lineStart: function() {
      stream.lineStart();
      clean = 1;
    },
    point: function(lambda1, phi1) {
      var sign1 = lambda1 > 0 ? _math_js__WEBPACK_IMPORTED_MODULE_1__.pi : -_math_js__WEBPACK_IMPORTED_MODULE_1__.pi,
          delta = (0,_math_js__WEBPACK_IMPORTED_MODULE_1__.abs)(lambda1 - lambda0);
      if ((0,_math_js__WEBPACK_IMPORTED_MODULE_1__.abs)(delta - _math_js__WEBPACK_IMPORTED_MODULE_1__.pi) < _math_js__WEBPACK_IMPORTED_MODULE_1__.epsilon) { // line crosses a pole
        stream.point(lambda0, phi0 = (phi0 + phi1) / 2 > 0 ? _math_js__WEBPACK_IMPORTED_MODULE_1__.halfPi : -_math_js__WEBPACK_IMPORTED_MODULE_1__.halfPi);
        stream.point(sign0, phi0);
        stream.lineEnd();
        stream.lineStart();
        stream.point(sign1, phi0);
        stream.point(lambda1, phi0);
        clean = 0;
      } else if (sign0 !== sign1 && delta >= _math_js__WEBPACK_IMPORTED_MODULE_1__.pi) { // line crosses antimeridian
        if ((0,_math_js__WEBPACK_IMPORTED_MODULE_1__.abs)(lambda0 - sign0) < _math_js__WEBPACK_IMPORTED_MODULE_1__.epsilon) lambda0 -= sign0 * _math_js__WEBPACK_IMPORTED_MODULE_1__.epsilon; // handle degeneracies
        if ((0,_math_js__WEBPACK_IMPORTED_MODULE_1__.abs)(lambda1 - sign1) < _math_js__WEBPACK_IMPORTED_MODULE_1__.epsilon) lambda1 -= sign1 * _math_js__WEBPACK_IMPORTED_MODULE_1__.epsilon;
        phi0 = clipAntimeridianIntersect(lambda0, phi0, lambda1, phi1);
        stream.point(sign0, phi0);
        stream.lineEnd();
        stream.lineStart();
        stream.point(sign1, phi0);
        clean = 0;
      }
      stream.point(lambda0 = lambda1, phi0 = phi1);
      sign0 = sign1;
    },
    lineEnd: function() {
      stream.lineEnd();
      lambda0 = phi0 = NaN;
    },
    clean: function() {
      return 2 - clean; // if intersections, rejoin first and last segments
    }
  };
}

function clipAntimeridianIntersect(lambda0, phi0, lambda1, phi1) {
  var cosPhi0,
      cosPhi1,
      sinLambda0Lambda1 = (0,_math_js__WEBPACK_IMPORTED_MODULE_1__.sin)(lambda0 - lambda1);
  return (0,_math_js__WEBPACK_IMPORTED_MODULE_1__.abs)(sinLambda0Lambda1) > _math_js__WEBPACK_IMPORTED_MODULE_1__.epsilon
      ? (0,_math_js__WEBPACK_IMPORTED_MODULE_1__.atan)(((0,_math_js__WEBPACK_IMPORTED_MODULE_1__.sin)(phi0) * (cosPhi1 = (0,_math_js__WEBPACK_IMPORTED_MODULE_1__.cos)(phi1)) * (0,_math_js__WEBPACK_IMPORTED_MODULE_1__.sin)(lambda1)
          - (0,_math_js__WEBPACK_IMPORTED_MODULE_1__.sin)(phi1) * (cosPhi0 = (0,_math_js__WEBPACK_IMPORTED_MODULE_1__.cos)(phi0)) * (0,_math_js__WEBPACK_IMPORTED_MODULE_1__.sin)(lambda0))
          / (cosPhi0 * cosPhi1 * sinLambda0Lambda1))
      : (phi0 + phi1) / 2;
}

function clipAntimeridianInterpolate(from, to, direction, stream) {
  var phi;
  if (from == null) {
    phi = direction * _math_js__WEBPACK_IMPORTED_MODULE_1__.halfPi;
    stream.point(-_math_js__WEBPACK_IMPORTED_MODULE_1__.pi, phi);
    stream.point(0, phi);
    stream.point(_math_js__WEBPACK_IMPORTED_MODULE_1__.pi, phi);
    stream.point(_math_js__WEBPACK_IMPORTED_MODULE_1__.pi, 0);
    stream.point(_math_js__WEBPACK_IMPORTED_MODULE_1__.pi, -phi);
    stream.point(0, -phi);
    stream.point(-_math_js__WEBPACK_IMPORTED_MODULE_1__.pi, -phi);
    stream.point(-_math_js__WEBPACK_IMPORTED_MODULE_1__.pi, 0);
    stream.point(-_math_js__WEBPACK_IMPORTED_MODULE_1__.pi, phi);
  } else if ((0,_math_js__WEBPACK_IMPORTED_MODULE_1__.abs)(from[0] - to[0]) > _math_js__WEBPACK_IMPORTED_MODULE_1__.epsilon) {
    var lambda = from[0] < to[0] ? _math_js__WEBPACK_IMPORTED_MODULE_1__.pi : -_math_js__WEBPACK_IMPORTED_MODULE_1__.pi;
    phi = direction * lambda / 2;
    stream.point(-lambda, phi);
    stream.point(0, phi);
    stream.point(lambda, phi);
  } else {
    stream.point(to[0], to[1]);
  }
}


/***/ }),

/***/ "./node_modules/d3-geo/src/clip/buffer.js":
/*!************************************************!*\
  !*** ./node_modules/d3-geo/src/clip/buffer.js ***!
  \************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _noop_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../noop.js */ "./node_modules/d3-geo/src/noop.js");


/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {
  var lines = [],
      line;
  return {
    point: function(x, y, m) {
      line.push([x, y, m]);
    },
    lineStart: function() {
      lines.push(line = []);
    },
    lineEnd: _noop_js__WEBPACK_IMPORTED_MODULE_0__["default"],
    rejoin: function() {
      if (lines.length > 1) lines.push(lines.pop().concat(lines.shift()));
    },
    result: function() {
      var result = lines;
      lines = [];
      line = null;
      return result;
    }
  };
}


/***/ }),

/***/ "./node_modules/d3-geo/src/clip/circle.js":
/*!************************************************!*\
  !*** ./node_modules/d3-geo/src/clip/circle.js ***!
  \************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _cartesian_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../cartesian.js */ "./node_modules/d3-geo/src/cartesian.js");
/* harmony import */ var _circle_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../circle.js */ "./node_modules/d3-geo/src/circle.js");
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../math.js */ "./node_modules/d3-geo/src/math.js");
/* harmony import */ var _pointEqual_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../pointEqual.js */ "./node_modules/d3-geo/src/pointEqual.js");
/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./index.js */ "./node_modules/d3-geo/src/clip/index.js");






/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(radius) {
  var cr = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.cos)(radius),
      delta = 6 * _math_js__WEBPACK_IMPORTED_MODULE_0__.radians,
      smallRadius = cr > 0,
      notHemisphere = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.abs)(cr) > _math_js__WEBPACK_IMPORTED_MODULE_0__.epsilon; // TODO optimise for this common case

  function interpolate(from, to, direction, stream) {
    (0,_circle_js__WEBPACK_IMPORTED_MODULE_1__.circleStream)(stream, radius, delta, direction, from, to);
  }

  function visible(lambda, phi) {
    return (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.cos)(lambda) * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.cos)(phi) > cr;
  }

  // Takes a line and cuts into visible segments. Return values used for polygon
  // clipping: 0 - there were intersections or the line was empty; 1 - no
  // intersections 2 - there were intersections, and the first and last segments
  // should be rejoined.
  function clipLine(stream) {
    var point0, // previous point
        c0, // code for previous point
        v0, // visibility of previous point
        v00, // visibility of first point
        clean; // no intersections
    return {
      lineStart: function() {
        v00 = v0 = false;
        clean = 1;
      },
      point: function(lambda, phi) {
        var point1 = [lambda, phi],
            point2,
            v = visible(lambda, phi),
            c = smallRadius
              ? v ? 0 : code(lambda, phi)
              : v ? code(lambda + (lambda < 0 ? _math_js__WEBPACK_IMPORTED_MODULE_0__.pi : -_math_js__WEBPACK_IMPORTED_MODULE_0__.pi), phi) : 0;
        if (!point0 && (v00 = v0 = v)) stream.lineStart();
        if (v !== v0) {
          point2 = intersect(point0, point1);
          if (!point2 || (0,_pointEqual_js__WEBPACK_IMPORTED_MODULE_2__["default"])(point0, point2) || (0,_pointEqual_js__WEBPACK_IMPORTED_MODULE_2__["default"])(point1, point2))
            point1[2] = 1;
        }
        if (v !== v0) {
          clean = 0;
          if (v) {
            // outside going in
            stream.lineStart();
            point2 = intersect(point1, point0);
            stream.point(point2[0], point2[1]);
          } else {
            // inside going out
            point2 = intersect(point0, point1);
            stream.point(point2[0], point2[1], 2);
            stream.lineEnd();
          }
          point0 = point2;
        } else if (notHemisphere && point0 && smallRadius ^ v) {
          var t;
          // If the codes for two points are different, or are both zero,
          // and there this segment intersects with the small circle.
          if (!(c & c0) && (t = intersect(point1, point0, true))) {
            clean = 0;
            if (smallRadius) {
              stream.lineStart();
              stream.point(t[0][0], t[0][1]);
              stream.point(t[1][0], t[1][1]);
              stream.lineEnd();
            } else {
              stream.point(t[1][0], t[1][1]);
              stream.lineEnd();
              stream.lineStart();
              stream.point(t[0][0], t[0][1], 3);
            }
          }
        }
        if (v && (!point0 || !(0,_pointEqual_js__WEBPACK_IMPORTED_MODULE_2__["default"])(point0, point1))) {
          stream.point(point1[0], point1[1]);
        }
        point0 = point1, v0 = v, c0 = c;
      },
      lineEnd: function() {
        if (v0) stream.lineEnd();
        point0 = null;
      },
      // Rejoin first and last segments if there were intersections and the first
      // and last points were visible.
      clean: function() {
        return clean | ((v00 && v0) << 1);
      }
    };
  }

  // Intersects the great circle between a and b with the clip circle.
  function intersect(a, b, two) {
    var pa = (0,_cartesian_js__WEBPACK_IMPORTED_MODULE_3__.cartesian)(a),
        pb = (0,_cartesian_js__WEBPACK_IMPORTED_MODULE_3__.cartesian)(b);

    // We have two planes, n1.p = d1 and n2.p = d2.
    // Find intersection line p(t) = c1 n1 + c2 n2 + t (n1 ⨯ n2).
    var n1 = [1, 0, 0], // normal
        n2 = (0,_cartesian_js__WEBPACK_IMPORTED_MODULE_3__.cartesianCross)(pa, pb),
        n2n2 = (0,_cartesian_js__WEBPACK_IMPORTED_MODULE_3__.cartesianDot)(n2, n2),
        n1n2 = n2[0], // cartesianDot(n1, n2),
        determinant = n2n2 - n1n2 * n1n2;

    // Two polar points.
    if (!determinant) return !two && a;

    var c1 =  cr * n2n2 / determinant,
        c2 = -cr * n1n2 / determinant,
        n1xn2 = (0,_cartesian_js__WEBPACK_IMPORTED_MODULE_3__.cartesianCross)(n1, n2),
        A = (0,_cartesian_js__WEBPACK_IMPORTED_MODULE_3__.cartesianScale)(n1, c1),
        B = (0,_cartesian_js__WEBPACK_IMPORTED_MODULE_3__.cartesianScale)(n2, c2);
    (0,_cartesian_js__WEBPACK_IMPORTED_MODULE_3__.cartesianAddInPlace)(A, B);

    // Solve |p(t)|^2 = 1.
    var u = n1xn2,
        w = (0,_cartesian_js__WEBPACK_IMPORTED_MODULE_3__.cartesianDot)(A, u),
        uu = (0,_cartesian_js__WEBPACK_IMPORTED_MODULE_3__.cartesianDot)(u, u),
        t2 = w * w - uu * ((0,_cartesian_js__WEBPACK_IMPORTED_MODULE_3__.cartesianDot)(A, A) - 1);

    if (t2 < 0) return;

    var t = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sqrt)(t2),
        q = (0,_cartesian_js__WEBPACK_IMPORTED_MODULE_3__.cartesianScale)(u, (-w - t) / uu);
    (0,_cartesian_js__WEBPACK_IMPORTED_MODULE_3__.cartesianAddInPlace)(q, A);
    q = (0,_cartesian_js__WEBPACK_IMPORTED_MODULE_3__.spherical)(q);

    if (!two) return q;

    // Two intersection points.
    var lambda0 = a[0],
        lambda1 = b[0],
        phi0 = a[1],
        phi1 = b[1],
        z;

    if (lambda1 < lambda0) z = lambda0, lambda0 = lambda1, lambda1 = z;

    var delta = lambda1 - lambda0,
        polar = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.abs)(delta - _math_js__WEBPACK_IMPORTED_MODULE_0__.pi) < _math_js__WEBPACK_IMPORTED_MODULE_0__.epsilon,
        meridian = polar || delta < _math_js__WEBPACK_IMPORTED_MODULE_0__.epsilon;

    if (!polar && phi1 < phi0) z = phi0, phi0 = phi1, phi1 = z;

    // Check that the first point is between a and b.
    if (meridian
        ? polar
          ? phi0 + phi1 > 0 ^ q[1] < ((0,_math_js__WEBPACK_IMPORTED_MODULE_0__.abs)(q[0] - lambda0) < _math_js__WEBPACK_IMPORTED_MODULE_0__.epsilon ? phi0 : phi1)
          : phi0 <= q[1] && q[1] <= phi1
        : delta > _math_js__WEBPACK_IMPORTED_MODULE_0__.pi ^ (lambda0 <= q[0] && q[0] <= lambda1)) {
      var q1 = (0,_cartesian_js__WEBPACK_IMPORTED_MODULE_3__.cartesianScale)(u, (-w + t) / uu);
      (0,_cartesian_js__WEBPACK_IMPORTED_MODULE_3__.cartesianAddInPlace)(q1, A);
      return [q, (0,_cartesian_js__WEBPACK_IMPORTED_MODULE_3__.spherical)(q1)];
    }
  }

  // Generates a 4-bit vector representing the location of a point relative to
  // the small circle's bounding box.
  function code(lambda, phi) {
    var r = smallRadius ? radius : _math_js__WEBPACK_IMPORTED_MODULE_0__.pi - radius,
        code = 0;
    if (lambda < -r) code |= 1; // left
    else if (lambda > r) code |= 2; // right
    if (phi < -r) code |= 4; // below
    else if (phi > r) code |= 8; // above
    return code;
  }

  return (0,_index_js__WEBPACK_IMPORTED_MODULE_4__["default"])(visible, clipLine, interpolate, smallRadius ? [0, -radius] : [-_math_js__WEBPACK_IMPORTED_MODULE_0__.pi, radius - _math_js__WEBPACK_IMPORTED_MODULE_0__.pi]);
}


/***/ }),

/***/ "./node_modules/d3-geo/src/clip/extent.js":
/*!************************************************!*\
  !*** ./node_modules/d3-geo/src/clip/extent.js ***!
  \************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _rectangle_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./rectangle.js */ "./node_modules/d3-geo/src/clip/rectangle.js");


/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {
  var x0 = 0,
      y0 = 0,
      x1 = 960,
      y1 = 500,
      cache,
      cacheStream,
      clip;

  return clip = {
    stream: function(stream) {
      return cache && cacheStream === stream ? cache : cache = (0,_rectangle_js__WEBPACK_IMPORTED_MODULE_0__["default"])(x0, y0, x1, y1)(cacheStream = stream);
    },
    extent: function(_) {
      return arguments.length ? (x0 = +_[0][0], y0 = +_[0][1], x1 = +_[1][0], y1 = +_[1][1], cache = cacheStream = null, clip) : [[x0, y0], [x1, y1]];
    }
  };
}


/***/ }),

/***/ "./node_modules/d3-geo/src/clip/index.js":
/*!***********************************************!*\
  !*** ./node_modules/d3-geo/src/clip/index.js ***!
  \***********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _buffer_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./buffer.js */ "./node_modules/d3-geo/src/clip/buffer.js");
/* harmony import */ var _rejoin_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./rejoin.js */ "./node_modules/d3-geo/src/clip/rejoin.js");
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../math.js */ "./node_modules/d3-geo/src/math.js");
/* harmony import */ var _polygonContains_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../polygonContains.js */ "./node_modules/d3-geo/src/polygonContains.js");
/* harmony import */ var d3_array__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! d3-array */ "./node_modules/d3-array/src/merge.js");






/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(pointVisible, clipLine, interpolate, start) {
  return function(sink) {
    var line = clipLine(sink),
        ringBuffer = (0,_buffer_js__WEBPACK_IMPORTED_MODULE_0__["default"])(),
        ringSink = clipLine(ringBuffer),
        polygonStarted = false,
        polygon,
        segments,
        ring;

    var clip = {
      point: point,
      lineStart: lineStart,
      lineEnd: lineEnd,
      polygonStart: function() {
        clip.point = pointRing;
        clip.lineStart = ringStart;
        clip.lineEnd = ringEnd;
        segments = [];
        polygon = [];
      },
      polygonEnd: function() {
        clip.point = point;
        clip.lineStart = lineStart;
        clip.lineEnd = lineEnd;
        segments = (0,d3_array__WEBPACK_IMPORTED_MODULE_1__["default"])(segments);
        var startInside = (0,_polygonContains_js__WEBPACK_IMPORTED_MODULE_2__["default"])(polygon, start);
        if (segments.length) {
          if (!polygonStarted) sink.polygonStart(), polygonStarted = true;
          (0,_rejoin_js__WEBPACK_IMPORTED_MODULE_3__["default"])(segments, compareIntersection, startInside, interpolate, sink);
        } else if (startInside) {
          if (!polygonStarted) sink.polygonStart(), polygonStarted = true;
          sink.lineStart();
          interpolate(null, null, 1, sink);
          sink.lineEnd();
        }
        if (polygonStarted) sink.polygonEnd(), polygonStarted = false;
        segments = polygon = null;
      },
      sphere: function() {
        sink.polygonStart();
        sink.lineStart();
        interpolate(null, null, 1, sink);
        sink.lineEnd();
        sink.polygonEnd();
      }
    };

    function point(lambda, phi) {
      if (pointVisible(lambda, phi)) sink.point(lambda, phi);
    }

    function pointLine(lambda, phi) {
      line.point(lambda, phi);
    }

    function lineStart() {
      clip.point = pointLine;
      line.lineStart();
    }

    function lineEnd() {
      clip.point = point;
      line.lineEnd();
    }

    function pointRing(lambda, phi) {
      ring.push([lambda, phi]);
      ringSink.point(lambda, phi);
    }

    function ringStart() {
      ringSink.lineStart();
      ring = [];
    }

    function ringEnd() {
      pointRing(ring[0][0], ring[0][1]);
      ringSink.lineEnd();

      var clean = ringSink.clean(),
          ringSegments = ringBuffer.result(),
          i, n = ringSegments.length, m,
          segment,
          point;

      ring.pop();
      polygon.push(ring);
      ring = null;

      if (!n) return;

      // No intersections.
      if (clean & 1) {
        segment = ringSegments[0];
        if ((m = segment.length - 1) > 0) {
          if (!polygonStarted) sink.polygonStart(), polygonStarted = true;
          sink.lineStart();
          for (i = 0; i < m; ++i) sink.point((point = segment[i])[0], point[1]);
          sink.lineEnd();
        }
        return;
      }

      // Rejoin connected segments.
      // TODO reuse ringBuffer.rejoin()?
      if (n > 1 && clean & 2) ringSegments.push(ringSegments.pop().concat(ringSegments.shift()));

      segments.push(ringSegments.filter(validSegment));
    }

    return clip;
  };
}

function validSegment(segment) {
  return segment.length > 1;
}

// Intersections are sorted along the clip edge. For both antimeridian cutting
// and circle clipping, the same comparison is used.
function compareIntersection(a, b) {
  return ((a = a.x)[0] < 0 ? a[1] - _math_js__WEBPACK_IMPORTED_MODULE_4__.halfPi - _math_js__WEBPACK_IMPORTED_MODULE_4__.epsilon : _math_js__WEBPACK_IMPORTED_MODULE_4__.halfPi - a[1])
       - ((b = b.x)[0] < 0 ? b[1] - _math_js__WEBPACK_IMPORTED_MODULE_4__.halfPi - _math_js__WEBPACK_IMPORTED_MODULE_4__.epsilon : _math_js__WEBPACK_IMPORTED_MODULE_4__.halfPi - b[1]);
}


/***/ }),

/***/ "./node_modules/d3-geo/src/clip/line.js":
/*!**********************************************!*\
  !*** ./node_modules/d3-geo/src/clip/line.js ***!
  \**********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(a, b, x0, y0, x1, y1) {
  var ax = a[0],
      ay = a[1],
      bx = b[0],
      by = b[1],
      t0 = 0,
      t1 = 1,
      dx = bx - ax,
      dy = by - ay,
      r;

  r = x0 - ax;
  if (!dx && r > 0) return;
  r /= dx;
  if (dx < 0) {
    if (r < t0) return;
    if (r < t1) t1 = r;
  } else if (dx > 0) {
    if (r > t1) return;
    if (r > t0) t0 = r;
  }

  r = x1 - ax;
  if (!dx && r < 0) return;
  r /= dx;
  if (dx < 0) {
    if (r > t1) return;
    if (r > t0) t0 = r;
  } else if (dx > 0) {
    if (r < t0) return;
    if (r < t1) t1 = r;
  }

  r = y0 - ay;
  if (!dy && r > 0) return;
  r /= dy;
  if (dy < 0) {
    if (r < t0) return;
    if (r < t1) t1 = r;
  } else if (dy > 0) {
    if (r > t1) return;
    if (r > t0) t0 = r;
  }

  r = y1 - ay;
  if (!dy && r < 0) return;
  r /= dy;
  if (dy < 0) {
    if (r > t1) return;
    if (r > t0) t0 = r;
  } else if (dy > 0) {
    if (r < t0) return;
    if (r < t1) t1 = r;
  }

  if (t0 > 0) a[0] = ax + t0 * dx, a[1] = ay + t0 * dy;
  if (t1 < 1) b[0] = ax + t1 * dx, b[1] = ay + t1 * dy;
  return true;
}


/***/ }),

/***/ "./node_modules/d3-geo/src/clip/rectangle.js":
/*!***************************************************!*\
  !*** ./node_modules/d3-geo/src/clip/rectangle.js ***!
  \***************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ clipRectangle)
/* harmony export */ });
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../math.js */ "./node_modules/d3-geo/src/math.js");
/* harmony import */ var _buffer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./buffer.js */ "./node_modules/d3-geo/src/clip/buffer.js");
/* harmony import */ var _line_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./line.js */ "./node_modules/d3-geo/src/clip/line.js");
/* harmony import */ var _rejoin_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./rejoin.js */ "./node_modules/d3-geo/src/clip/rejoin.js");
/* harmony import */ var d3_array__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! d3-array */ "./node_modules/d3-array/src/merge.js");






var clipMax = 1e9, clipMin = -clipMax;

// TODO Use d3-polygon’s polygonContains here for the ring check?
// TODO Eliminate duplicate buffering in clipBuffer and polygon.push?

function clipRectangle(x0, y0, x1, y1) {

  function visible(x, y) {
    return x0 <= x && x <= x1 && y0 <= y && y <= y1;
  }

  function interpolate(from, to, direction, stream) {
    var a = 0, a1 = 0;
    if (from == null
        || (a = corner(from, direction)) !== (a1 = corner(to, direction))
        || comparePoint(from, to) < 0 ^ direction > 0) {
      do stream.point(a === 0 || a === 3 ? x0 : x1, a > 1 ? y1 : y0);
      while ((a = (a + direction + 4) % 4) !== a1);
    } else {
      stream.point(to[0], to[1]);
    }
  }

  function corner(p, direction) {
    return (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.abs)(p[0] - x0) < _math_js__WEBPACK_IMPORTED_MODULE_0__.epsilon ? direction > 0 ? 0 : 3
        : (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.abs)(p[0] - x1) < _math_js__WEBPACK_IMPORTED_MODULE_0__.epsilon ? direction > 0 ? 2 : 1
        : (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.abs)(p[1] - y0) < _math_js__WEBPACK_IMPORTED_MODULE_0__.epsilon ? direction > 0 ? 1 : 0
        : direction > 0 ? 3 : 2; // abs(p[1] - y1) < epsilon
  }

  function compareIntersection(a, b) {
    return comparePoint(a.x, b.x);
  }

  function comparePoint(a, b) {
    var ca = corner(a, 1),
        cb = corner(b, 1);
    return ca !== cb ? ca - cb
        : ca === 0 ? b[1] - a[1]
        : ca === 1 ? a[0] - b[0]
        : ca === 2 ? a[1] - b[1]
        : b[0] - a[0];
  }

  return function(stream) {
    var activeStream = stream,
        bufferStream = (0,_buffer_js__WEBPACK_IMPORTED_MODULE_1__["default"])(),
        segments,
        polygon,
        ring,
        x__, y__, v__, // first point
        x_, y_, v_, // previous point
        first,
        clean;

    var clipStream = {
      point: point,
      lineStart: lineStart,
      lineEnd: lineEnd,
      polygonStart: polygonStart,
      polygonEnd: polygonEnd
    };

    function point(x, y) {
      if (visible(x, y)) activeStream.point(x, y);
    }

    function polygonInside() {
      var winding = 0;

      for (var i = 0, n = polygon.length; i < n; ++i) {
        for (var ring = polygon[i], j = 1, m = ring.length, point = ring[0], a0, a1, b0 = point[0], b1 = point[1]; j < m; ++j) {
          a0 = b0, a1 = b1, point = ring[j], b0 = point[0], b1 = point[1];
          if (a1 <= y1) { if (b1 > y1 && (b0 - a0) * (y1 - a1) > (b1 - a1) * (x0 - a0)) ++winding; }
          else { if (b1 <= y1 && (b0 - a0) * (y1 - a1) < (b1 - a1) * (x0 - a0)) --winding; }
        }
      }

      return winding;
    }

    // Buffer geometry within a polygon and then clip it en masse.
    function polygonStart() {
      activeStream = bufferStream, segments = [], polygon = [], clean = true;
    }

    function polygonEnd() {
      var startInside = polygonInside(),
          cleanInside = clean && startInside,
          visible = (segments = (0,d3_array__WEBPACK_IMPORTED_MODULE_2__["default"])(segments)).length;
      if (cleanInside || visible) {
        stream.polygonStart();
        if (cleanInside) {
          stream.lineStart();
          interpolate(null, null, 1, stream);
          stream.lineEnd();
        }
        if (visible) {
          (0,_rejoin_js__WEBPACK_IMPORTED_MODULE_3__["default"])(segments, compareIntersection, startInside, interpolate, stream);
        }
        stream.polygonEnd();
      }
      activeStream = stream, segments = polygon = ring = null;
    }

    function lineStart() {
      clipStream.point = linePoint;
      if (polygon) polygon.push(ring = []);
      first = true;
      v_ = false;
      x_ = y_ = NaN;
    }

    // TODO rather than special-case polygons, simply handle them separately.
    // Ideally, coincident intersection points should be jittered to avoid
    // clipping issues.
    function lineEnd() {
      if (segments) {
        linePoint(x__, y__);
        if (v__ && v_) bufferStream.rejoin();
        segments.push(bufferStream.result());
      }
      clipStream.point = point;
      if (v_) activeStream.lineEnd();
    }

    function linePoint(x, y) {
      var v = visible(x, y);
      if (polygon) ring.push([x, y]);
      if (first) {
        x__ = x, y__ = y, v__ = v;
        first = false;
        if (v) {
          activeStream.lineStart();
          activeStream.point(x, y);
        }
      } else {
        if (v && v_) activeStream.point(x, y);
        else {
          var a = [x_ = Math.max(clipMin, Math.min(clipMax, x_)), y_ = Math.max(clipMin, Math.min(clipMax, y_))],
              b = [x = Math.max(clipMin, Math.min(clipMax, x)), y = Math.max(clipMin, Math.min(clipMax, y))];
          if ((0,_line_js__WEBPACK_IMPORTED_MODULE_4__["default"])(a, b, x0, y0, x1, y1)) {
            if (!v_) {
              activeStream.lineStart();
              activeStream.point(a[0], a[1]);
            }
            activeStream.point(b[0], b[1]);
            if (!v) activeStream.lineEnd();
            clean = false;
          } else if (v) {
            activeStream.lineStart();
            activeStream.point(x, y);
            clean = false;
          }
        }
      }
      x_ = x, y_ = y, v_ = v;
    }

    return clipStream;
  };
}


/***/ }),

/***/ "./node_modules/d3-geo/src/clip/rejoin.js":
/*!************************************************!*\
  !*** ./node_modules/d3-geo/src/clip/rejoin.js ***!
  \************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _pointEqual_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../pointEqual.js */ "./node_modules/d3-geo/src/pointEqual.js");
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../math.js */ "./node_modules/d3-geo/src/math.js");



function Intersection(point, points, other, entry) {
  this.x = point;
  this.z = points;
  this.o = other; // another intersection
  this.e = entry; // is an entry?
  this.v = false; // visited
  this.n = this.p = null; // next & previous
}

// A generalized polygon clipping algorithm: given a polygon that has been cut
// into its visible line segments, and rejoins the segments by interpolating
// along the clip edge.
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(segments, compareIntersection, startInside, interpolate, stream) {
  var subject = [],
      clip = [],
      i,
      n;

  segments.forEach(function(segment) {
    if ((n = segment.length - 1) <= 0) return;
    var n, p0 = segment[0], p1 = segment[n], x;

    if ((0,_pointEqual_js__WEBPACK_IMPORTED_MODULE_0__["default"])(p0, p1)) {
      if (!p0[2] && !p1[2]) {
        stream.lineStart();
        for (i = 0; i < n; ++i) stream.point((p0 = segment[i])[0], p0[1]);
        stream.lineEnd();
        return;
      }
      // handle degenerate cases by moving the point
      p1[0] += 2 * _math_js__WEBPACK_IMPORTED_MODULE_1__.epsilon;
    }

    subject.push(x = new Intersection(p0, segment, null, true));
    clip.push(x.o = new Intersection(p0, null, x, false));
    subject.push(x = new Intersection(p1, segment, null, false));
    clip.push(x.o = new Intersection(p1, null, x, true));
  });

  if (!subject.length) return;

  clip.sort(compareIntersection);
  link(subject);
  link(clip);

  for (i = 0, n = clip.length; i < n; ++i) {
    clip[i].e = startInside = !startInside;
  }

  var start = subject[0],
      points,
      point;

  while (1) {
    // Find first unvisited intersection.
    var current = start,
        isSubject = true;
    while (current.v) if ((current = current.n) === start) return;
    points = current.z;
    stream.lineStart();
    do {
      current.v = current.o.v = true;
      if (current.e) {
        if (isSubject) {
          for (i = 0, n = points.length; i < n; ++i) stream.point((point = points[i])[0], point[1]);
        } else {
          interpolate(current.x, current.n.x, 1, stream);
        }
        current = current.n;
      } else {
        if (isSubject) {
          points = current.p.z;
          for (i = points.length - 1; i >= 0; --i) stream.point((point = points[i])[0], point[1]);
        } else {
          interpolate(current.x, current.p.x, -1, stream);
        }
        current = current.p;
      }
      current = current.o;
      points = current.z;
      isSubject = !isSubject;
    } while (!current.v);
    stream.lineEnd();
  }
}

function link(array) {
  if (!(n = array.length)) return;
  var n,
      i = 0,
      a = array[0],
      b;
  while (++i < n) {
    a.n = b = array[i];
    b.p = a;
    a = b;
  }
  a.n = b = array[0];
  b.p = a;
}


/***/ }),

/***/ "./node_modules/d3-geo/src/compose.js":
/*!********************************************!*\
  !*** ./node_modules/d3-geo/src/compose.js ***!
  \********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(a, b) {

  function compose(x, y) {
    return x = a(x, y), b(x[0], x[1]);
  }

  if (a.invert && b.invert) compose.invert = function(x, y) {
    return x = b.invert(x, y), x && a.invert(x[0], x[1]);
  };

  return compose;
}


/***/ }),

/***/ "./node_modules/d3-geo/src/constant.js":
/*!*********************************************!*\
  !*** ./node_modules/d3-geo/src/constant.js ***!
  \*********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(x) {
  return function() {
    return x;
  };
}


/***/ }),

/***/ "./node_modules/d3-geo/src/contains.js":
/*!*********************************************!*\
  !*** ./node_modules/d3-geo/src/contains.js ***!
  \*********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _polygonContains_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./polygonContains.js */ "./node_modules/d3-geo/src/polygonContains.js");
/* harmony import */ var _distance_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./distance.js */ "./node_modules/d3-geo/src/distance.js");
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./math.js */ "./node_modules/d3-geo/src/math.js");




var containsObjectType = {
  Feature: function(object, point) {
    return containsGeometry(object.geometry, point);
  },
  FeatureCollection: function(object, point) {
    var features = object.features, i = -1, n = features.length;
    while (++i < n) if (containsGeometry(features[i].geometry, point)) return true;
    return false;
  }
};

var containsGeometryType = {
  Sphere: function() {
    return true;
  },
  Point: function(object, point) {
    return containsPoint(object.coordinates, point);
  },
  MultiPoint: function(object, point) {
    var coordinates = object.coordinates, i = -1, n = coordinates.length;
    while (++i < n) if (containsPoint(coordinates[i], point)) return true;
    return false;
  },
  LineString: function(object, point) {
    return containsLine(object.coordinates, point);
  },
  MultiLineString: function(object, point) {
    var coordinates = object.coordinates, i = -1, n = coordinates.length;
    while (++i < n) if (containsLine(coordinates[i], point)) return true;
    return false;
  },
  Polygon: function(object, point) {
    return containsPolygon(object.coordinates, point);
  },
  MultiPolygon: function(object, point) {
    var coordinates = object.coordinates, i = -1, n = coordinates.length;
    while (++i < n) if (containsPolygon(coordinates[i], point)) return true;
    return false;
  },
  GeometryCollection: function(object, point) {
    var geometries = object.geometries, i = -1, n = geometries.length;
    while (++i < n) if (containsGeometry(geometries[i], point)) return true;
    return false;
  }
};

function containsGeometry(geometry, point) {
  return geometry && containsGeometryType.hasOwnProperty(geometry.type)
      ? containsGeometryType[geometry.type](geometry, point)
      : false;
}

function containsPoint(coordinates, point) {
  return (0,_distance_js__WEBPACK_IMPORTED_MODULE_0__["default"])(coordinates, point) === 0;
}

function containsLine(coordinates, point) {
  var ao, bo, ab;
  for (var i = 0, n = coordinates.length; i < n; i++) {
    bo = (0,_distance_js__WEBPACK_IMPORTED_MODULE_0__["default"])(coordinates[i], point);
    if (bo === 0) return true;
    if (i > 0) {
      ab = (0,_distance_js__WEBPACK_IMPORTED_MODULE_0__["default"])(coordinates[i], coordinates[i - 1]);
      if (
        ab > 0 &&
        ao <= ab &&
        bo <= ab &&
        (ao + bo - ab) * (1 - Math.pow((ao - bo) / ab, 2)) < _math_js__WEBPACK_IMPORTED_MODULE_1__.epsilon2 * ab
      )
        return true;
    }
    ao = bo;
  }
  return false;
}

function containsPolygon(coordinates, point) {
  return !!(0,_polygonContains_js__WEBPACK_IMPORTED_MODULE_2__["default"])(coordinates.map(ringRadians), pointRadians(point));
}

function ringRadians(ring) {
  return ring = ring.map(pointRadians), ring.pop(), ring;
}

function pointRadians(point) {
  return [point[0] * _math_js__WEBPACK_IMPORTED_MODULE_1__.radians, point[1] * _math_js__WEBPACK_IMPORTED_MODULE_1__.radians];
}

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(object, point) {
  return (object && containsObjectType.hasOwnProperty(object.type)
      ? containsObjectType[object.type]
      : containsGeometry)(object, point);
}


/***/ }),

/***/ "./node_modules/d3-geo/src/distance.js":
/*!*********************************************!*\
  !*** ./node_modules/d3-geo/src/distance.js ***!
  \*********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _length_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./length.js */ "./node_modules/d3-geo/src/length.js");


var coordinates = [null, null],
    object = {type: "LineString", coordinates: coordinates};

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(a, b) {
  coordinates[0] = a;
  coordinates[1] = b;
  return (0,_length_js__WEBPACK_IMPORTED_MODULE_0__["default"])(object);
}


/***/ }),

/***/ "./node_modules/d3-geo/src/graticule.js":
/*!**********************************************!*\
  !*** ./node_modules/d3-geo/src/graticule.js ***!
  \**********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ graticule),
/* harmony export */   "graticule10": () => (/* binding */ graticule10)
/* harmony export */ });
/* harmony import */ var d3_array__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! d3-array */ "./node_modules/d3-array/src/range.js");
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./math.js */ "./node_modules/d3-geo/src/math.js");



function graticuleX(y0, y1, dy) {
  var y = (0,d3_array__WEBPACK_IMPORTED_MODULE_0__["default"])(y0, y1 - _math_js__WEBPACK_IMPORTED_MODULE_1__.epsilon, dy).concat(y1);
  return function(x) { return y.map(function(y) { return [x, y]; }); };
}

function graticuleY(x0, x1, dx) {
  var x = (0,d3_array__WEBPACK_IMPORTED_MODULE_0__["default"])(x0, x1 - _math_js__WEBPACK_IMPORTED_MODULE_1__.epsilon, dx).concat(x1);
  return function(y) { return x.map(function(x) { return [x, y]; }); };
}

function graticule() {
  var x1, x0, X1, X0,
      y1, y0, Y1, Y0,
      dx = 10, dy = dx, DX = 90, DY = 360,
      x, y, X, Y,
      precision = 2.5;

  function graticule() {
    return {type: "MultiLineString", coordinates: lines()};
  }

  function lines() {
    return (0,d3_array__WEBPACK_IMPORTED_MODULE_0__["default"])((0,_math_js__WEBPACK_IMPORTED_MODULE_1__.ceil)(X0 / DX) * DX, X1, DX).map(X)
        .concat((0,d3_array__WEBPACK_IMPORTED_MODULE_0__["default"])((0,_math_js__WEBPACK_IMPORTED_MODULE_1__.ceil)(Y0 / DY) * DY, Y1, DY).map(Y))
        .concat((0,d3_array__WEBPACK_IMPORTED_MODULE_0__["default"])((0,_math_js__WEBPACK_IMPORTED_MODULE_1__.ceil)(x0 / dx) * dx, x1, dx).filter(function(x) { return (0,_math_js__WEBPACK_IMPORTED_MODULE_1__.abs)(x % DX) > _math_js__WEBPACK_IMPORTED_MODULE_1__.epsilon; }).map(x))
        .concat((0,d3_array__WEBPACK_IMPORTED_MODULE_0__["default"])((0,_math_js__WEBPACK_IMPORTED_MODULE_1__.ceil)(y0 / dy) * dy, y1, dy).filter(function(y) { return (0,_math_js__WEBPACK_IMPORTED_MODULE_1__.abs)(y % DY) > _math_js__WEBPACK_IMPORTED_MODULE_1__.epsilon; }).map(y));
  }

  graticule.lines = function() {
    return lines().map(function(coordinates) { return {type: "LineString", coordinates: coordinates}; });
  };

  graticule.outline = function() {
    return {
      type: "Polygon",
      coordinates: [
        X(X0).concat(
        Y(Y1).slice(1),
        X(X1).reverse().slice(1),
        Y(Y0).reverse().slice(1))
      ]
    };
  };

  graticule.extent = function(_) {
    if (!arguments.length) return graticule.extentMinor();
    return graticule.extentMajor(_).extentMinor(_);
  };

  graticule.extentMajor = function(_) {
    if (!arguments.length) return [[X0, Y0], [X1, Y1]];
    X0 = +_[0][0], X1 = +_[1][0];
    Y0 = +_[0][1], Y1 = +_[1][1];
    if (X0 > X1) _ = X0, X0 = X1, X1 = _;
    if (Y0 > Y1) _ = Y0, Y0 = Y1, Y1 = _;
    return graticule.precision(precision);
  };

  graticule.extentMinor = function(_) {
    if (!arguments.length) return [[x0, y0], [x1, y1]];
    x0 = +_[0][0], x1 = +_[1][0];
    y0 = +_[0][1], y1 = +_[1][1];
    if (x0 > x1) _ = x0, x0 = x1, x1 = _;
    if (y0 > y1) _ = y0, y0 = y1, y1 = _;
    return graticule.precision(precision);
  };

  graticule.step = function(_) {
    if (!arguments.length) return graticule.stepMinor();
    return graticule.stepMajor(_).stepMinor(_);
  };

  graticule.stepMajor = function(_) {
    if (!arguments.length) return [DX, DY];
    DX = +_[0], DY = +_[1];
    return graticule;
  };

  graticule.stepMinor = function(_) {
    if (!arguments.length) return [dx, dy];
    dx = +_[0], dy = +_[1];
    return graticule;
  };

  graticule.precision = function(_) {
    if (!arguments.length) return precision;
    precision = +_;
    x = graticuleX(y0, y1, 90);
    y = graticuleY(x0, x1, precision);
    X = graticuleX(Y0, Y1, 90);
    Y = graticuleY(X0, X1, precision);
    return graticule;
  };

  return graticule
      .extentMajor([[-180, -90 + _math_js__WEBPACK_IMPORTED_MODULE_1__.epsilon], [180, 90 - _math_js__WEBPACK_IMPORTED_MODULE_1__.epsilon]])
      .extentMinor([[-180, -80 - _math_js__WEBPACK_IMPORTED_MODULE_1__.epsilon], [180, 80 + _math_js__WEBPACK_IMPORTED_MODULE_1__.epsilon]]);
}

function graticule10() {
  return graticule()();
}


/***/ }),

/***/ "./node_modules/d3-geo/src/identity.js":
/*!*********************************************!*\
  !*** ./node_modules/d3-geo/src/identity.js ***!
  \*********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (x => x);


/***/ }),

/***/ "./node_modules/d3-geo/src/index.js":
/*!******************************************!*\
  !*** ./node_modules/d3-geo/src/index.js ***!
  \******************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "geoArea": () => (/* reexport safe */ _area_js__WEBPACK_IMPORTED_MODULE_0__["default"]),
/* harmony export */   "geoBounds": () => (/* reexport safe */ _bounds_js__WEBPACK_IMPORTED_MODULE_1__["default"]),
/* harmony export */   "geoCentroid": () => (/* reexport safe */ _centroid_js__WEBPACK_IMPORTED_MODULE_2__["default"]),
/* harmony export */   "geoCircle": () => (/* reexport safe */ _circle_js__WEBPACK_IMPORTED_MODULE_3__["default"]),
/* harmony export */   "geoClipAntimeridian": () => (/* reexport safe */ _clip_antimeridian_js__WEBPACK_IMPORTED_MODULE_4__["default"]),
/* harmony export */   "geoClipCircle": () => (/* reexport safe */ _clip_circle_js__WEBPACK_IMPORTED_MODULE_5__["default"]),
/* harmony export */   "geoClipExtent": () => (/* reexport safe */ _clip_extent_js__WEBPACK_IMPORTED_MODULE_6__["default"]),
/* harmony export */   "geoClipRectangle": () => (/* reexport safe */ _clip_rectangle_js__WEBPACK_IMPORTED_MODULE_7__["default"]),
/* harmony export */   "geoContains": () => (/* reexport safe */ _contains_js__WEBPACK_IMPORTED_MODULE_8__["default"]),
/* harmony export */   "geoDistance": () => (/* reexport safe */ _distance_js__WEBPACK_IMPORTED_MODULE_9__["default"]),
/* harmony export */   "geoGraticule": () => (/* reexport safe */ _graticule_js__WEBPACK_IMPORTED_MODULE_10__["default"]),
/* harmony export */   "geoGraticule10": () => (/* reexport safe */ _graticule_js__WEBPACK_IMPORTED_MODULE_10__.graticule10),
/* harmony export */   "geoInterpolate": () => (/* reexport safe */ _interpolate_js__WEBPACK_IMPORTED_MODULE_11__["default"]),
/* harmony export */   "geoLength": () => (/* reexport safe */ _length_js__WEBPACK_IMPORTED_MODULE_12__["default"]),
/* harmony export */   "geoPath": () => (/* reexport safe */ _path_index_js__WEBPACK_IMPORTED_MODULE_13__["default"]),
/* harmony export */   "geoAlbers": () => (/* reexport safe */ _projection_albers_js__WEBPACK_IMPORTED_MODULE_14__["default"]),
/* harmony export */   "geoAlbersUsa": () => (/* reexport safe */ _projection_albersUsa_js__WEBPACK_IMPORTED_MODULE_15__["default"]),
/* harmony export */   "geoAzimuthalEqualArea": () => (/* reexport safe */ _projection_azimuthalEqualArea_js__WEBPACK_IMPORTED_MODULE_16__["default"]),
/* harmony export */   "geoAzimuthalEqualAreaRaw": () => (/* reexport safe */ _projection_azimuthalEqualArea_js__WEBPACK_IMPORTED_MODULE_16__.azimuthalEqualAreaRaw),
/* harmony export */   "geoAzimuthalEquidistant": () => (/* reexport safe */ _projection_azimuthalEquidistant_js__WEBPACK_IMPORTED_MODULE_17__["default"]),
/* harmony export */   "geoAzimuthalEquidistantRaw": () => (/* reexport safe */ _projection_azimuthalEquidistant_js__WEBPACK_IMPORTED_MODULE_17__.azimuthalEquidistantRaw),
/* harmony export */   "geoConicConformal": () => (/* reexport safe */ _projection_conicConformal_js__WEBPACK_IMPORTED_MODULE_18__["default"]),
/* harmony export */   "geoConicConformalRaw": () => (/* reexport safe */ _projection_conicConformal_js__WEBPACK_IMPORTED_MODULE_18__.conicConformalRaw),
/* harmony export */   "geoConicEqualArea": () => (/* reexport safe */ _projection_conicEqualArea_js__WEBPACK_IMPORTED_MODULE_19__["default"]),
/* harmony export */   "geoConicEqualAreaRaw": () => (/* reexport safe */ _projection_conicEqualArea_js__WEBPACK_IMPORTED_MODULE_19__.conicEqualAreaRaw),
/* harmony export */   "geoConicEquidistant": () => (/* reexport safe */ _projection_conicEquidistant_js__WEBPACK_IMPORTED_MODULE_20__["default"]),
/* harmony export */   "geoConicEquidistantRaw": () => (/* reexport safe */ _projection_conicEquidistant_js__WEBPACK_IMPORTED_MODULE_20__.conicEquidistantRaw),
/* harmony export */   "geoEqualEarth": () => (/* reexport safe */ _projection_equalEarth_js__WEBPACK_IMPORTED_MODULE_21__["default"]),
/* harmony export */   "geoEqualEarthRaw": () => (/* reexport safe */ _projection_equalEarth_js__WEBPACK_IMPORTED_MODULE_21__.equalEarthRaw),
/* harmony export */   "geoEquirectangular": () => (/* reexport safe */ _projection_equirectangular_js__WEBPACK_IMPORTED_MODULE_22__["default"]),
/* harmony export */   "geoEquirectangularRaw": () => (/* reexport safe */ _projection_equirectangular_js__WEBPACK_IMPORTED_MODULE_22__.equirectangularRaw),
/* harmony export */   "geoGnomonic": () => (/* reexport safe */ _projection_gnomonic_js__WEBPACK_IMPORTED_MODULE_23__["default"]),
/* harmony export */   "geoGnomonicRaw": () => (/* reexport safe */ _projection_gnomonic_js__WEBPACK_IMPORTED_MODULE_23__.gnomonicRaw),
/* harmony export */   "geoIdentity": () => (/* reexport safe */ _projection_identity_js__WEBPACK_IMPORTED_MODULE_24__["default"]),
/* harmony export */   "geoProjection": () => (/* reexport safe */ _projection_index_js__WEBPACK_IMPORTED_MODULE_25__["default"]),
/* harmony export */   "geoProjectionMutator": () => (/* reexport safe */ _projection_index_js__WEBPACK_IMPORTED_MODULE_25__.projectionMutator),
/* harmony export */   "geoMercator": () => (/* reexport safe */ _projection_mercator_js__WEBPACK_IMPORTED_MODULE_26__["default"]),
/* harmony export */   "geoMercatorRaw": () => (/* reexport safe */ _projection_mercator_js__WEBPACK_IMPORTED_MODULE_26__.mercatorRaw),
/* harmony export */   "geoNaturalEarth1": () => (/* reexport safe */ _projection_naturalEarth1_js__WEBPACK_IMPORTED_MODULE_27__["default"]),
/* harmony export */   "geoNaturalEarth1Raw": () => (/* reexport safe */ _projection_naturalEarth1_js__WEBPACK_IMPORTED_MODULE_27__.naturalEarth1Raw),
/* harmony export */   "geoOrthographic": () => (/* reexport safe */ _projection_orthographic_js__WEBPACK_IMPORTED_MODULE_28__["default"]),
/* harmony export */   "geoOrthographicRaw": () => (/* reexport safe */ _projection_orthographic_js__WEBPACK_IMPORTED_MODULE_28__.orthographicRaw),
/* harmony export */   "geoStereographic": () => (/* reexport safe */ _projection_stereographic_js__WEBPACK_IMPORTED_MODULE_29__["default"]),
/* harmony export */   "geoStereographicRaw": () => (/* reexport safe */ _projection_stereographic_js__WEBPACK_IMPORTED_MODULE_29__.stereographicRaw),
/* harmony export */   "geoTransverseMercator": () => (/* reexport safe */ _projection_transverseMercator_js__WEBPACK_IMPORTED_MODULE_30__["default"]),
/* harmony export */   "geoTransverseMercatorRaw": () => (/* reexport safe */ _projection_transverseMercator_js__WEBPACK_IMPORTED_MODULE_30__.transverseMercatorRaw),
/* harmony export */   "geoRotation": () => (/* reexport safe */ _rotation_js__WEBPACK_IMPORTED_MODULE_31__["default"]),
/* harmony export */   "geoStream": () => (/* reexport safe */ _stream_js__WEBPACK_IMPORTED_MODULE_32__["default"]),
/* harmony export */   "geoTransform": () => (/* reexport safe */ _transform_js__WEBPACK_IMPORTED_MODULE_33__["default"])
/* harmony export */ });
/* harmony import */ var _area_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./area.js */ "./node_modules/d3-geo/src/area.js");
/* harmony import */ var _bounds_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./bounds.js */ "./node_modules/d3-geo/src/bounds.js");
/* harmony import */ var _centroid_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./centroid.js */ "./node_modules/d3-geo/src/centroid.js");
/* harmony import */ var _circle_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./circle.js */ "./node_modules/d3-geo/src/circle.js");
/* harmony import */ var _clip_antimeridian_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./clip/antimeridian.js */ "./node_modules/d3-geo/src/clip/antimeridian.js");
/* harmony import */ var _clip_circle_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./clip/circle.js */ "./node_modules/d3-geo/src/clip/circle.js");
/* harmony import */ var _clip_extent_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./clip/extent.js */ "./node_modules/d3-geo/src/clip/extent.js");
/* harmony import */ var _clip_rectangle_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./clip/rectangle.js */ "./node_modules/d3-geo/src/clip/rectangle.js");
/* harmony import */ var _contains_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./contains.js */ "./node_modules/d3-geo/src/contains.js");
/* harmony import */ var _distance_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./distance.js */ "./node_modules/d3-geo/src/distance.js");
/* harmony import */ var _graticule_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./graticule.js */ "./node_modules/d3-geo/src/graticule.js");
/* harmony import */ var _interpolate_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./interpolate.js */ "./node_modules/d3-geo/src/interpolate.js");
/* harmony import */ var _length_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./length.js */ "./node_modules/d3-geo/src/length.js");
/* harmony import */ var _path_index_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./path/index.js */ "./node_modules/d3-geo/src/path/index.js");
/* harmony import */ var _projection_albers_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./projection/albers.js */ "./node_modules/d3-geo/src/projection/albers.js");
/* harmony import */ var _projection_albersUsa_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./projection/albersUsa.js */ "./node_modules/d3-geo/src/projection/albersUsa.js");
/* harmony import */ var _projection_azimuthalEqualArea_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./projection/azimuthalEqualArea.js */ "./node_modules/d3-geo/src/projection/azimuthalEqualArea.js");
/* harmony import */ var _projection_azimuthalEquidistant_js__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./projection/azimuthalEquidistant.js */ "./node_modules/d3-geo/src/projection/azimuthalEquidistant.js");
/* harmony import */ var _projection_conicConformal_js__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./projection/conicConformal.js */ "./node_modules/d3-geo/src/projection/conicConformal.js");
/* harmony import */ var _projection_conicEqualArea_js__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./projection/conicEqualArea.js */ "./node_modules/d3-geo/src/projection/conicEqualArea.js");
/* harmony import */ var _projection_conicEquidistant_js__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./projection/conicEquidistant.js */ "./node_modules/d3-geo/src/projection/conicEquidistant.js");
/* harmony import */ var _projection_equalEarth_js__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./projection/equalEarth.js */ "./node_modules/d3-geo/src/projection/equalEarth.js");
/* harmony import */ var _projection_equirectangular_js__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./projection/equirectangular.js */ "./node_modules/d3-geo/src/projection/equirectangular.js");
/* harmony import */ var _projection_gnomonic_js__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./projection/gnomonic.js */ "./node_modules/d3-geo/src/projection/gnomonic.js");
/* harmony import */ var _projection_identity_js__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./projection/identity.js */ "./node_modules/d3-geo/src/projection/identity.js");
/* harmony import */ var _projection_index_js__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./projection/index.js */ "./node_modules/d3-geo/src/projection/index.js");
/* harmony import */ var _projection_mercator_js__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./projection/mercator.js */ "./node_modules/d3-geo/src/projection/mercator.js");
/* harmony import */ var _projection_naturalEarth1_js__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./projection/naturalEarth1.js */ "./node_modules/d3-geo/src/projection/naturalEarth1.js");
/* harmony import */ var _projection_orthographic_js__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ./projection/orthographic.js */ "./node_modules/d3-geo/src/projection/orthographic.js");
/* harmony import */ var _projection_stereographic_js__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ./projection/stereographic.js */ "./node_modules/d3-geo/src/projection/stereographic.js");
/* harmony import */ var _projection_transverseMercator_js__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ./projection/transverseMercator.js */ "./node_modules/d3-geo/src/projection/transverseMercator.js");
/* harmony import */ var _rotation_js__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! ./rotation.js */ "./node_modules/d3-geo/src/rotation.js");
/* harmony import */ var _stream_js__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! ./stream.js */ "./node_modules/d3-geo/src/stream.js");
/* harmony import */ var _transform_js__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! ./transform.js */ "./node_modules/d3-geo/src/transform.js");






 // DEPRECATED! Use d3.geoIdentity().clipExtent(…).





























/***/ }),

/***/ "./node_modules/d3-geo/src/interpolate.js":
/*!************************************************!*\
  !*** ./node_modules/d3-geo/src/interpolate.js ***!
  \************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./math.js */ "./node_modules/d3-geo/src/math.js");


/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(a, b) {
  var x0 = a[0] * _math_js__WEBPACK_IMPORTED_MODULE_0__.radians,
      y0 = a[1] * _math_js__WEBPACK_IMPORTED_MODULE_0__.radians,
      x1 = b[0] * _math_js__WEBPACK_IMPORTED_MODULE_0__.radians,
      y1 = b[1] * _math_js__WEBPACK_IMPORTED_MODULE_0__.radians,
      cy0 = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.cos)(y0),
      sy0 = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sin)(y0),
      cy1 = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.cos)(y1),
      sy1 = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sin)(y1),
      kx0 = cy0 * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.cos)(x0),
      ky0 = cy0 * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sin)(x0),
      kx1 = cy1 * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.cos)(x1),
      ky1 = cy1 * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sin)(x1),
      d = 2 * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.asin)((0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sqrt)((0,_math_js__WEBPACK_IMPORTED_MODULE_0__.haversin)(y1 - y0) + cy0 * cy1 * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.haversin)(x1 - x0))),
      k = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sin)(d);

  var interpolate = d ? function(t) {
    var B = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sin)(t *= d) / k,
        A = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sin)(d - t) / k,
        x = A * kx0 + B * kx1,
        y = A * ky0 + B * ky1,
        z = A * sy0 + B * sy1;
    return [
      (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.atan2)(y, x) * _math_js__WEBPACK_IMPORTED_MODULE_0__.degrees,
      (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.atan2)(z, (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sqrt)(x * x + y * y)) * _math_js__WEBPACK_IMPORTED_MODULE_0__.degrees
    ];
  } : function() {
    return [x0 * _math_js__WEBPACK_IMPORTED_MODULE_0__.degrees, y0 * _math_js__WEBPACK_IMPORTED_MODULE_0__.degrees];
  };

  interpolate.distance = d;

  return interpolate;
}


/***/ }),

/***/ "./node_modules/d3-geo/src/length.js":
/*!*******************************************!*\
  !*** ./node_modules/d3-geo/src/length.js ***!
  \*******************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var d3_array__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! d3-array */ "./node_modules/d3-array/src/fsum.js");
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./math.js */ "./node_modules/d3-geo/src/math.js");
/* harmony import */ var _noop_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./noop.js */ "./node_modules/d3-geo/src/noop.js");
/* harmony import */ var _stream_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./stream.js */ "./node_modules/d3-geo/src/stream.js");





var lengthSum,
    lambda0,
    sinPhi0,
    cosPhi0;

var lengthStream = {
  sphere: _noop_js__WEBPACK_IMPORTED_MODULE_0__["default"],
  point: _noop_js__WEBPACK_IMPORTED_MODULE_0__["default"],
  lineStart: lengthLineStart,
  lineEnd: _noop_js__WEBPACK_IMPORTED_MODULE_0__["default"],
  polygonStart: _noop_js__WEBPACK_IMPORTED_MODULE_0__["default"],
  polygonEnd: _noop_js__WEBPACK_IMPORTED_MODULE_0__["default"]
};

function lengthLineStart() {
  lengthStream.point = lengthPointFirst;
  lengthStream.lineEnd = lengthLineEnd;
}

function lengthLineEnd() {
  lengthStream.point = lengthStream.lineEnd = _noop_js__WEBPACK_IMPORTED_MODULE_0__["default"];
}

function lengthPointFirst(lambda, phi) {
  lambda *= _math_js__WEBPACK_IMPORTED_MODULE_1__.radians, phi *= _math_js__WEBPACK_IMPORTED_MODULE_1__.radians;
  lambda0 = lambda, sinPhi0 = (0,_math_js__WEBPACK_IMPORTED_MODULE_1__.sin)(phi), cosPhi0 = (0,_math_js__WEBPACK_IMPORTED_MODULE_1__.cos)(phi);
  lengthStream.point = lengthPoint;
}

function lengthPoint(lambda, phi) {
  lambda *= _math_js__WEBPACK_IMPORTED_MODULE_1__.radians, phi *= _math_js__WEBPACK_IMPORTED_MODULE_1__.radians;
  var sinPhi = (0,_math_js__WEBPACK_IMPORTED_MODULE_1__.sin)(phi),
      cosPhi = (0,_math_js__WEBPACK_IMPORTED_MODULE_1__.cos)(phi),
      delta = (0,_math_js__WEBPACK_IMPORTED_MODULE_1__.abs)(lambda - lambda0),
      cosDelta = (0,_math_js__WEBPACK_IMPORTED_MODULE_1__.cos)(delta),
      sinDelta = (0,_math_js__WEBPACK_IMPORTED_MODULE_1__.sin)(delta),
      x = cosPhi * sinDelta,
      y = cosPhi0 * sinPhi - sinPhi0 * cosPhi * cosDelta,
      z = sinPhi0 * sinPhi + cosPhi0 * cosPhi * cosDelta;
  lengthSum.add((0,_math_js__WEBPACK_IMPORTED_MODULE_1__.atan2)((0,_math_js__WEBPACK_IMPORTED_MODULE_1__.sqrt)(x * x + y * y), z));
  lambda0 = lambda, sinPhi0 = sinPhi, cosPhi0 = cosPhi;
}

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(object) {
  lengthSum = new d3_array__WEBPACK_IMPORTED_MODULE_2__.Adder();
  (0,_stream_js__WEBPACK_IMPORTED_MODULE_3__["default"])(object, lengthStream);
  return +lengthSum;
}


/***/ }),

/***/ "./node_modules/d3-geo/src/math.js":
/*!*****************************************!*\
  !*** ./node_modules/d3-geo/src/math.js ***!
  \*****************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "epsilon": () => (/* binding */ epsilon),
/* harmony export */   "epsilon2": () => (/* binding */ epsilon2),
/* harmony export */   "pi": () => (/* binding */ pi),
/* harmony export */   "halfPi": () => (/* binding */ halfPi),
/* harmony export */   "quarterPi": () => (/* binding */ quarterPi),
/* harmony export */   "tau": () => (/* binding */ tau),
/* harmony export */   "degrees": () => (/* binding */ degrees),
/* harmony export */   "radians": () => (/* binding */ radians),
/* harmony export */   "abs": () => (/* binding */ abs),
/* harmony export */   "atan": () => (/* binding */ atan),
/* harmony export */   "atan2": () => (/* binding */ atan2),
/* harmony export */   "cos": () => (/* binding */ cos),
/* harmony export */   "ceil": () => (/* binding */ ceil),
/* harmony export */   "exp": () => (/* binding */ exp),
/* harmony export */   "floor": () => (/* binding */ floor),
/* harmony export */   "hypot": () => (/* binding */ hypot),
/* harmony export */   "log": () => (/* binding */ log),
/* harmony export */   "pow": () => (/* binding */ pow),
/* harmony export */   "sin": () => (/* binding */ sin),
/* harmony export */   "sign": () => (/* binding */ sign),
/* harmony export */   "sqrt": () => (/* binding */ sqrt),
/* harmony export */   "tan": () => (/* binding */ tan),
/* harmony export */   "acos": () => (/* binding */ acos),
/* harmony export */   "asin": () => (/* binding */ asin),
/* harmony export */   "haversin": () => (/* binding */ haversin)
/* harmony export */ });
var epsilon = 1e-6;
var epsilon2 = 1e-12;
var pi = Math.PI;
var halfPi = pi / 2;
var quarterPi = pi / 4;
var tau = pi * 2;

var degrees = 180 / pi;
var radians = pi / 180;

var abs = Math.abs;
var atan = Math.atan;
var atan2 = Math.atan2;
var cos = Math.cos;
var ceil = Math.ceil;
var exp = Math.exp;
var floor = Math.floor;
var hypot = Math.hypot;
var log = Math.log;
var pow = Math.pow;
var sin = Math.sin;
var sign = Math.sign || function(x) { return x > 0 ? 1 : x < 0 ? -1 : 0; };
var sqrt = Math.sqrt;
var tan = Math.tan;

function acos(x) {
  return x > 1 ? 0 : x < -1 ? pi : Math.acos(x);
}

function asin(x) {
  return x > 1 ? halfPi : x < -1 ? -halfPi : Math.asin(x);
}

function haversin(x) {
  return (x = sin(x / 2)) * x;
}


/***/ }),

/***/ "./node_modules/d3-geo/src/noop.js":
/*!*****************************************!*\
  !*** ./node_modules/d3-geo/src/noop.js ***!
  \*****************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ noop)
/* harmony export */ });
function noop() {}


/***/ }),

/***/ "./node_modules/d3-geo/src/path/area.js":
/*!**********************************************!*\
  !*** ./node_modules/d3-geo/src/path/area.js ***!
  \**********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var d3_array__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! d3-array */ "./node_modules/d3-array/src/fsum.js");
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../math.js */ "./node_modules/d3-geo/src/math.js");
/* harmony import */ var _noop_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../noop.js */ "./node_modules/d3-geo/src/noop.js");




var areaSum = new d3_array__WEBPACK_IMPORTED_MODULE_0__.Adder(),
    areaRingSum = new d3_array__WEBPACK_IMPORTED_MODULE_0__.Adder(),
    x00,
    y00,
    x0,
    y0;

var areaStream = {
  point: _noop_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  lineStart: _noop_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  lineEnd: _noop_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  polygonStart: function() {
    areaStream.lineStart = areaRingStart;
    areaStream.lineEnd = areaRingEnd;
  },
  polygonEnd: function() {
    areaStream.lineStart = areaStream.lineEnd = areaStream.point = _noop_js__WEBPACK_IMPORTED_MODULE_1__["default"];
    areaSum.add((0,_math_js__WEBPACK_IMPORTED_MODULE_2__.abs)(areaRingSum));
    areaRingSum = new d3_array__WEBPACK_IMPORTED_MODULE_0__.Adder();
  },
  result: function() {
    var area = areaSum / 2;
    areaSum = new d3_array__WEBPACK_IMPORTED_MODULE_0__.Adder();
    return area;
  }
};

function areaRingStart() {
  areaStream.point = areaPointFirst;
}

function areaPointFirst(x, y) {
  areaStream.point = areaPoint;
  x00 = x0 = x, y00 = y0 = y;
}

function areaPoint(x, y) {
  areaRingSum.add(y0 * x - x0 * y);
  x0 = x, y0 = y;
}

function areaRingEnd() {
  areaPoint(x00, y00);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (areaStream);


/***/ }),

/***/ "./node_modules/d3-geo/src/path/bounds.js":
/*!************************************************!*\
  !*** ./node_modules/d3-geo/src/path/bounds.js ***!
  \************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _noop_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../noop.js */ "./node_modules/d3-geo/src/noop.js");


var x0 = Infinity,
    y0 = x0,
    x1 = -x0,
    y1 = x1;

var boundsStream = {
  point: boundsPoint,
  lineStart: _noop_js__WEBPACK_IMPORTED_MODULE_0__["default"],
  lineEnd: _noop_js__WEBPACK_IMPORTED_MODULE_0__["default"],
  polygonStart: _noop_js__WEBPACK_IMPORTED_MODULE_0__["default"],
  polygonEnd: _noop_js__WEBPACK_IMPORTED_MODULE_0__["default"],
  result: function() {
    var bounds = [[x0, y0], [x1, y1]];
    x1 = y1 = -(y0 = x0 = Infinity);
    return bounds;
  }
};

function boundsPoint(x, y) {
  if (x < x0) x0 = x;
  if (x > x1) x1 = x;
  if (y < y0) y0 = y;
  if (y > y1) y1 = y;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (boundsStream);


/***/ }),

/***/ "./node_modules/d3-geo/src/path/centroid.js":
/*!**************************************************!*\
  !*** ./node_modules/d3-geo/src/path/centroid.js ***!
  \**************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../math.js */ "./node_modules/d3-geo/src/math.js");


// TODO Enforce positive area for exterior, negative area for interior?

var X0 = 0,
    Y0 = 0,
    Z0 = 0,
    X1 = 0,
    Y1 = 0,
    Z1 = 0,
    X2 = 0,
    Y2 = 0,
    Z2 = 0,
    x00,
    y00,
    x0,
    y0;

var centroidStream = {
  point: centroidPoint,
  lineStart: centroidLineStart,
  lineEnd: centroidLineEnd,
  polygonStart: function() {
    centroidStream.lineStart = centroidRingStart;
    centroidStream.lineEnd = centroidRingEnd;
  },
  polygonEnd: function() {
    centroidStream.point = centroidPoint;
    centroidStream.lineStart = centroidLineStart;
    centroidStream.lineEnd = centroidLineEnd;
  },
  result: function() {
    var centroid = Z2 ? [X2 / Z2, Y2 / Z2]
        : Z1 ? [X1 / Z1, Y1 / Z1]
        : Z0 ? [X0 / Z0, Y0 / Z0]
        : [NaN, NaN];
    X0 = Y0 = Z0 =
    X1 = Y1 = Z1 =
    X2 = Y2 = Z2 = 0;
    return centroid;
  }
};

function centroidPoint(x, y) {
  X0 += x;
  Y0 += y;
  ++Z0;
}

function centroidLineStart() {
  centroidStream.point = centroidPointFirstLine;
}

function centroidPointFirstLine(x, y) {
  centroidStream.point = centroidPointLine;
  centroidPoint(x0 = x, y0 = y);
}

function centroidPointLine(x, y) {
  var dx = x - x0, dy = y - y0, z = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sqrt)(dx * dx + dy * dy);
  X1 += z * (x0 + x) / 2;
  Y1 += z * (y0 + y) / 2;
  Z1 += z;
  centroidPoint(x0 = x, y0 = y);
}

function centroidLineEnd() {
  centroidStream.point = centroidPoint;
}

function centroidRingStart() {
  centroidStream.point = centroidPointFirstRing;
}

function centroidRingEnd() {
  centroidPointRing(x00, y00);
}

function centroidPointFirstRing(x, y) {
  centroidStream.point = centroidPointRing;
  centroidPoint(x00 = x0 = x, y00 = y0 = y);
}

function centroidPointRing(x, y) {
  var dx = x - x0,
      dy = y - y0,
      z = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sqrt)(dx * dx + dy * dy);

  X1 += z * (x0 + x) / 2;
  Y1 += z * (y0 + y) / 2;
  Z1 += z;

  z = y0 * x - x0 * y;
  X2 += z * (x0 + x);
  Y2 += z * (y0 + y);
  Z2 += z * 3;
  centroidPoint(x0 = x, y0 = y);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (centroidStream);


/***/ }),

/***/ "./node_modules/d3-geo/src/path/context.js":
/*!*************************************************!*\
  !*** ./node_modules/d3-geo/src/path/context.js ***!
  \*************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ PathContext)
/* harmony export */ });
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../math.js */ "./node_modules/d3-geo/src/math.js");
/* harmony import */ var _noop_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../noop.js */ "./node_modules/d3-geo/src/noop.js");



function PathContext(context) {
  this._context = context;
}

PathContext.prototype = {
  _radius: 4.5,
  pointRadius: function(_) {
    return this._radius = _, this;
  },
  polygonStart: function() {
    this._line = 0;
  },
  polygonEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._point = 0;
  },
  lineEnd: function() {
    if (this._line === 0) this._context.closePath();
    this._point = NaN;
  },
  point: function(x, y) {
    switch (this._point) {
      case 0: {
        this._context.moveTo(x, y);
        this._point = 1;
        break;
      }
      case 1: {
        this._context.lineTo(x, y);
        break;
      }
      default: {
        this._context.moveTo(x + this._radius, y);
        this._context.arc(x, y, this._radius, 0, _math_js__WEBPACK_IMPORTED_MODULE_0__.tau);
        break;
      }
    }
  },
  result: _noop_js__WEBPACK_IMPORTED_MODULE_1__["default"]
};


/***/ }),

/***/ "./node_modules/d3-geo/src/path/index.js":
/*!***********************************************!*\
  !*** ./node_modules/d3-geo/src/path/index.js ***!
  \***********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _identity_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../identity.js */ "./node_modules/d3-geo/src/identity.js");
/* harmony import */ var _stream_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../stream.js */ "./node_modules/d3-geo/src/stream.js");
/* harmony import */ var _area_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./area.js */ "./node_modules/d3-geo/src/path/area.js");
/* harmony import */ var _bounds_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./bounds.js */ "./node_modules/d3-geo/src/path/bounds.js");
/* harmony import */ var _centroid_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./centroid.js */ "./node_modules/d3-geo/src/path/centroid.js");
/* harmony import */ var _context_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./context.js */ "./node_modules/d3-geo/src/path/context.js");
/* harmony import */ var _measure_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./measure.js */ "./node_modules/d3-geo/src/path/measure.js");
/* harmony import */ var _string_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./string.js */ "./node_modules/d3-geo/src/path/string.js");









/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(projection, context) {
  var pointRadius = 4.5,
      projectionStream,
      contextStream;

  function path(object) {
    if (object) {
      if (typeof pointRadius === "function") contextStream.pointRadius(+pointRadius.apply(this, arguments));
      (0,_stream_js__WEBPACK_IMPORTED_MODULE_0__["default"])(object, projectionStream(contextStream));
    }
    return contextStream.result();
  }

  path.area = function(object) {
    (0,_stream_js__WEBPACK_IMPORTED_MODULE_0__["default"])(object, projectionStream(_area_js__WEBPACK_IMPORTED_MODULE_1__["default"]));
    return _area_js__WEBPACK_IMPORTED_MODULE_1__["default"].result();
  };

  path.measure = function(object) {
    (0,_stream_js__WEBPACK_IMPORTED_MODULE_0__["default"])(object, projectionStream(_measure_js__WEBPACK_IMPORTED_MODULE_2__["default"]));
    return _measure_js__WEBPACK_IMPORTED_MODULE_2__["default"].result();
  };

  path.bounds = function(object) {
    (0,_stream_js__WEBPACK_IMPORTED_MODULE_0__["default"])(object, projectionStream(_bounds_js__WEBPACK_IMPORTED_MODULE_3__["default"]));
    return _bounds_js__WEBPACK_IMPORTED_MODULE_3__["default"].result();
  };

  path.centroid = function(object) {
    (0,_stream_js__WEBPACK_IMPORTED_MODULE_0__["default"])(object, projectionStream(_centroid_js__WEBPACK_IMPORTED_MODULE_4__["default"]));
    return _centroid_js__WEBPACK_IMPORTED_MODULE_4__["default"].result();
  };

  path.projection = function(_) {
    return arguments.length ? (projectionStream = _ == null ? (projection = null, _identity_js__WEBPACK_IMPORTED_MODULE_5__["default"]) : (projection = _).stream, path) : projection;
  };

  path.context = function(_) {
    if (!arguments.length) return context;
    contextStream = _ == null ? (context = null, new _string_js__WEBPACK_IMPORTED_MODULE_6__["default"]) : new _context_js__WEBPACK_IMPORTED_MODULE_7__["default"](context = _);
    if (typeof pointRadius !== "function") contextStream.pointRadius(pointRadius);
    return path;
  };

  path.pointRadius = function(_) {
    if (!arguments.length) return pointRadius;
    pointRadius = typeof _ === "function" ? _ : (contextStream.pointRadius(+_), +_);
    return path;
  };

  return path.projection(projection).context(context);
}


/***/ }),

/***/ "./node_modules/d3-geo/src/path/measure.js":
/*!*************************************************!*\
  !*** ./node_modules/d3-geo/src/path/measure.js ***!
  \*************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var d3_array__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! d3-array */ "./node_modules/d3-array/src/fsum.js");
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../math.js */ "./node_modules/d3-geo/src/math.js");
/* harmony import */ var _noop_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../noop.js */ "./node_modules/d3-geo/src/noop.js");




var lengthSum = new d3_array__WEBPACK_IMPORTED_MODULE_0__.Adder(),
    lengthRing,
    x00,
    y00,
    x0,
    y0;

var lengthStream = {
  point: _noop_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  lineStart: function() {
    lengthStream.point = lengthPointFirst;
  },
  lineEnd: function() {
    if (lengthRing) lengthPoint(x00, y00);
    lengthStream.point = _noop_js__WEBPACK_IMPORTED_MODULE_1__["default"];
  },
  polygonStart: function() {
    lengthRing = true;
  },
  polygonEnd: function() {
    lengthRing = null;
  },
  result: function() {
    var length = +lengthSum;
    lengthSum = new d3_array__WEBPACK_IMPORTED_MODULE_0__.Adder();
    return length;
  }
};

function lengthPointFirst(x, y) {
  lengthStream.point = lengthPoint;
  x00 = x0 = x, y00 = y0 = y;
}

function lengthPoint(x, y) {
  x0 -= x, y0 -= y;
  lengthSum.add((0,_math_js__WEBPACK_IMPORTED_MODULE_2__.sqrt)(x0 * x0 + y0 * y0));
  x0 = x, y0 = y;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (lengthStream);


/***/ }),

/***/ "./node_modules/d3-geo/src/path/string.js":
/*!************************************************!*\
  !*** ./node_modules/d3-geo/src/path/string.js ***!
  \************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ PathString)
/* harmony export */ });
function PathString() {
  this._string = [];
}

PathString.prototype = {
  _radius: 4.5,
  _circle: circle(4.5),
  pointRadius: function(_) {
    if ((_ = +_) !== this._radius) this._radius = _, this._circle = null;
    return this;
  },
  polygonStart: function() {
    this._line = 0;
  },
  polygonEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._point = 0;
  },
  lineEnd: function() {
    if (this._line === 0) this._string.push("Z");
    this._point = NaN;
  },
  point: function(x, y) {
    switch (this._point) {
      case 0: {
        this._string.push("M", x, ",", y);
        this._point = 1;
        break;
      }
      case 1: {
        this._string.push("L", x, ",", y);
        break;
      }
      default: {
        if (this._circle == null) this._circle = circle(this._radius);
        this._string.push("M", x, ",", y, this._circle);
        break;
      }
    }
  },
  result: function() {
    if (this._string.length) {
      var result = this._string.join("");
      this._string = [];
      return result;
    } else {
      return null;
    }
  }
};

function circle(radius) {
  return "m0," + radius
      + "a" + radius + "," + radius + " 0 1,1 0," + -2 * radius
      + "a" + radius + "," + radius + " 0 1,1 0," + 2 * radius
      + "z";
}


/***/ }),

/***/ "./node_modules/d3-geo/src/pointEqual.js":
/*!***********************************************!*\
  !*** ./node_modules/d3-geo/src/pointEqual.js ***!
  \***********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./math.js */ "./node_modules/d3-geo/src/math.js");


/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(a, b) {
  return (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.abs)(a[0] - b[0]) < _math_js__WEBPACK_IMPORTED_MODULE_0__.epsilon && (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.abs)(a[1] - b[1]) < _math_js__WEBPACK_IMPORTED_MODULE_0__.epsilon;
}


/***/ }),

/***/ "./node_modules/d3-geo/src/polygonContains.js":
/*!****************************************************!*\
  !*** ./node_modules/d3-geo/src/polygonContains.js ***!
  \****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var d3_array__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! d3-array */ "./node_modules/d3-array/src/fsum.js");
/* harmony import */ var _cartesian_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./cartesian.js */ "./node_modules/d3-geo/src/cartesian.js");
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./math.js */ "./node_modules/d3-geo/src/math.js");




function longitude(point) {
  return (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.abs)(point[0]) <= _math_js__WEBPACK_IMPORTED_MODULE_0__.pi ? point[0] : (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sign)(point[0]) * (((0,_math_js__WEBPACK_IMPORTED_MODULE_0__.abs)(point[0]) + _math_js__WEBPACK_IMPORTED_MODULE_0__.pi) % _math_js__WEBPACK_IMPORTED_MODULE_0__.tau - _math_js__WEBPACK_IMPORTED_MODULE_0__.pi);
}

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(polygon, point) {
  var lambda = longitude(point),
      phi = point[1],
      sinPhi = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sin)(phi),
      normal = [(0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sin)(lambda), -(0,_math_js__WEBPACK_IMPORTED_MODULE_0__.cos)(lambda), 0],
      angle = 0,
      winding = 0;

  var sum = new d3_array__WEBPACK_IMPORTED_MODULE_1__.Adder();

  if (sinPhi === 1) phi = _math_js__WEBPACK_IMPORTED_MODULE_0__.halfPi + _math_js__WEBPACK_IMPORTED_MODULE_0__.epsilon;
  else if (sinPhi === -1) phi = -_math_js__WEBPACK_IMPORTED_MODULE_0__.halfPi - _math_js__WEBPACK_IMPORTED_MODULE_0__.epsilon;

  for (var i = 0, n = polygon.length; i < n; ++i) {
    if (!(m = (ring = polygon[i]).length)) continue;
    var ring,
        m,
        point0 = ring[m - 1],
        lambda0 = longitude(point0),
        phi0 = point0[1] / 2 + _math_js__WEBPACK_IMPORTED_MODULE_0__.quarterPi,
        sinPhi0 = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sin)(phi0),
        cosPhi0 = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.cos)(phi0);

    for (var j = 0; j < m; ++j, lambda0 = lambda1, sinPhi0 = sinPhi1, cosPhi0 = cosPhi1, point0 = point1) {
      var point1 = ring[j],
          lambda1 = longitude(point1),
          phi1 = point1[1] / 2 + _math_js__WEBPACK_IMPORTED_MODULE_0__.quarterPi,
          sinPhi1 = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sin)(phi1),
          cosPhi1 = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.cos)(phi1),
          delta = lambda1 - lambda0,
          sign = delta >= 0 ? 1 : -1,
          absDelta = sign * delta,
          antimeridian = absDelta > _math_js__WEBPACK_IMPORTED_MODULE_0__.pi,
          k = sinPhi0 * sinPhi1;

      sum.add((0,_math_js__WEBPACK_IMPORTED_MODULE_0__.atan2)(k * sign * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sin)(absDelta), cosPhi0 * cosPhi1 + k * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.cos)(absDelta)));
      angle += antimeridian ? delta + sign * _math_js__WEBPACK_IMPORTED_MODULE_0__.tau : delta;

      // Are the longitudes either side of the point’s meridian (lambda),
      // and are the latitudes smaller than the parallel (phi)?
      if (antimeridian ^ lambda0 >= lambda ^ lambda1 >= lambda) {
        var arc = (0,_cartesian_js__WEBPACK_IMPORTED_MODULE_2__.cartesianCross)((0,_cartesian_js__WEBPACK_IMPORTED_MODULE_2__.cartesian)(point0), (0,_cartesian_js__WEBPACK_IMPORTED_MODULE_2__.cartesian)(point1));
        (0,_cartesian_js__WEBPACK_IMPORTED_MODULE_2__.cartesianNormalizeInPlace)(arc);
        var intersection = (0,_cartesian_js__WEBPACK_IMPORTED_MODULE_2__.cartesianCross)(normal, arc);
        (0,_cartesian_js__WEBPACK_IMPORTED_MODULE_2__.cartesianNormalizeInPlace)(intersection);
        var phiArc = (antimeridian ^ delta >= 0 ? -1 : 1) * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.asin)(intersection[2]);
        if (phi > phiArc || phi === phiArc && (arc[0] || arc[1])) {
          winding += antimeridian ^ delta >= 0 ? 1 : -1;
        }
      }
    }
  }

  // First, determine whether the South pole is inside or outside:
  //
  // It is inside if:
  // * the polygon winds around it in a clockwise direction.
  // * the polygon does not (cumulatively) wind around it, but has a negative
  //   (counter-clockwise) area.
  //
  // Second, count the (signed) number of times a segment crosses a lambda
  // from the point to the South pole.  If it is zero, then the point is the
  // same side as the South pole.

  return (angle < -_math_js__WEBPACK_IMPORTED_MODULE_0__.epsilon || angle < _math_js__WEBPACK_IMPORTED_MODULE_0__.epsilon && sum < -_math_js__WEBPACK_IMPORTED_MODULE_0__.epsilon2) ^ (winding & 1);
}


/***/ }),

/***/ "./node_modules/d3-geo/src/projection/albers.js":
/*!******************************************************!*\
  !*** ./node_modules/d3-geo/src/projection/albers.js ***!
  \******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _conicEqualArea_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./conicEqualArea.js */ "./node_modules/d3-geo/src/projection/conicEqualArea.js");


/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {
  return (0,_conicEqualArea_js__WEBPACK_IMPORTED_MODULE_0__["default"])()
      .parallels([29.5, 45.5])
      .scale(1070)
      .translate([480, 250])
      .rotate([96, 0])
      .center([-0.6, 38.7]);
}


/***/ }),

/***/ "./node_modules/d3-geo/src/projection/albersUsa.js":
/*!*********************************************************!*\
  !*** ./node_modules/d3-geo/src/projection/albersUsa.js ***!
  \*********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../math.js */ "./node_modules/d3-geo/src/math.js");
/* harmony import */ var _albers_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./albers.js */ "./node_modules/d3-geo/src/projection/albers.js");
/* harmony import */ var _conicEqualArea_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./conicEqualArea.js */ "./node_modules/d3-geo/src/projection/conicEqualArea.js");
/* harmony import */ var _fit_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./fit.js */ "./node_modules/d3-geo/src/projection/fit.js");





// The projections must have mutually exclusive clip regions on the sphere,
// as this will avoid emitting interleaving lines and polygons.
function multiplex(streams) {
  var n = streams.length;
  return {
    point: function(x, y) { var i = -1; while (++i < n) streams[i].point(x, y); },
    sphere: function() { var i = -1; while (++i < n) streams[i].sphere(); },
    lineStart: function() { var i = -1; while (++i < n) streams[i].lineStart(); },
    lineEnd: function() { var i = -1; while (++i < n) streams[i].lineEnd(); },
    polygonStart: function() { var i = -1; while (++i < n) streams[i].polygonStart(); },
    polygonEnd: function() { var i = -1; while (++i < n) streams[i].polygonEnd(); }
  };
}

// A composite projection for the United States, configured by default for
// 960×500. The projection also works quite well at 960×600 if you change the
// scale to 1285 and adjust the translate accordingly. The set of standard
// parallels for each region comes from USGS, which is published here:
// http://egsc.usgs.gov/isb/pubs/MapProjections/projections.html#albers
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {
  var cache,
      cacheStream,
      lower48 = (0,_albers_js__WEBPACK_IMPORTED_MODULE_0__["default"])(), lower48Point,
      alaska = (0,_conicEqualArea_js__WEBPACK_IMPORTED_MODULE_1__["default"])().rotate([154, 0]).center([-2, 58.5]).parallels([55, 65]), alaskaPoint, // EPSG:3338
      hawaii = (0,_conicEqualArea_js__WEBPACK_IMPORTED_MODULE_1__["default"])().rotate([157, 0]).center([-3, 19.9]).parallels([8, 18]), hawaiiPoint, // ESRI:102007
      point, pointStream = {point: function(x, y) { point = [x, y]; }};

  function albersUsa(coordinates) {
    var x = coordinates[0], y = coordinates[1];
    return point = null,
        (lower48Point.point(x, y), point)
        || (alaskaPoint.point(x, y), point)
        || (hawaiiPoint.point(x, y), point);
  }

  albersUsa.invert = function(coordinates) {
    var k = lower48.scale(),
        t = lower48.translate(),
        x = (coordinates[0] - t[0]) / k,
        y = (coordinates[1] - t[1]) / k;
    return (y >= 0.120 && y < 0.234 && x >= -0.425 && x < -0.214 ? alaska
        : y >= 0.166 && y < 0.234 && x >= -0.214 && x < -0.115 ? hawaii
        : lower48).invert(coordinates);
  };

  albersUsa.stream = function(stream) {
    return cache && cacheStream === stream ? cache : cache = multiplex([lower48.stream(cacheStream = stream), alaska.stream(stream), hawaii.stream(stream)]);
  };

  albersUsa.precision = function(_) {
    if (!arguments.length) return lower48.precision();
    lower48.precision(_), alaska.precision(_), hawaii.precision(_);
    return reset();
  };

  albersUsa.scale = function(_) {
    if (!arguments.length) return lower48.scale();
    lower48.scale(_), alaska.scale(_ * 0.35), hawaii.scale(_);
    return albersUsa.translate(lower48.translate());
  };

  albersUsa.translate = function(_) {
    if (!arguments.length) return lower48.translate();
    var k = lower48.scale(), x = +_[0], y = +_[1];

    lower48Point = lower48
        .translate(_)
        .clipExtent([[x - 0.455 * k, y - 0.238 * k], [x + 0.455 * k, y + 0.238 * k]])
        .stream(pointStream);

    alaskaPoint = alaska
        .translate([x - 0.307 * k, y + 0.201 * k])
        .clipExtent([[x - 0.425 * k + _math_js__WEBPACK_IMPORTED_MODULE_2__.epsilon, y + 0.120 * k + _math_js__WEBPACK_IMPORTED_MODULE_2__.epsilon], [x - 0.214 * k - _math_js__WEBPACK_IMPORTED_MODULE_2__.epsilon, y + 0.234 * k - _math_js__WEBPACK_IMPORTED_MODULE_2__.epsilon]])
        .stream(pointStream);

    hawaiiPoint = hawaii
        .translate([x - 0.205 * k, y + 0.212 * k])
        .clipExtent([[x - 0.214 * k + _math_js__WEBPACK_IMPORTED_MODULE_2__.epsilon, y + 0.166 * k + _math_js__WEBPACK_IMPORTED_MODULE_2__.epsilon], [x - 0.115 * k - _math_js__WEBPACK_IMPORTED_MODULE_2__.epsilon, y + 0.234 * k - _math_js__WEBPACK_IMPORTED_MODULE_2__.epsilon]])
        .stream(pointStream);

    return reset();
  };

  albersUsa.fitExtent = function(extent, object) {
    return (0,_fit_js__WEBPACK_IMPORTED_MODULE_3__.fitExtent)(albersUsa, extent, object);
  };

  albersUsa.fitSize = function(size, object) {
    return (0,_fit_js__WEBPACK_IMPORTED_MODULE_3__.fitSize)(albersUsa, size, object);
  };

  albersUsa.fitWidth = function(width, object) {
    return (0,_fit_js__WEBPACK_IMPORTED_MODULE_3__.fitWidth)(albersUsa, width, object);
  };

  albersUsa.fitHeight = function(height, object) {
    return (0,_fit_js__WEBPACK_IMPORTED_MODULE_3__.fitHeight)(albersUsa, height, object);
  };

  function reset() {
    cache = cacheStream = null;
    return albersUsa;
  }

  return albersUsa.scale(1070);
}


/***/ }),

/***/ "./node_modules/d3-geo/src/projection/azimuthal.js":
/*!*********************************************************!*\
  !*** ./node_modules/d3-geo/src/projection/azimuthal.js ***!
  \*********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "azimuthalRaw": () => (/* binding */ azimuthalRaw),
/* harmony export */   "azimuthalInvert": () => (/* binding */ azimuthalInvert)
/* harmony export */ });
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../math.js */ "./node_modules/d3-geo/src/math.js");


function azimuthalRaw(scale) {
  return function(x, y) {
    var cx = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.cos)(x),
        cy = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.cos)(y),
        k = scale(cx * cy);
        if (k === Infinity) return [2, 0];
    return [
      k * cy * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sin)(x),
      k * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sin)(y)
    ];
  }
}

function azimuthalInvert(angle) {
  return function(x, y) {
    var z = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sqrt)(x * x + y * y),
        c = angle(z),
        sc = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sin)(c),
        cc = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.cos)(c);
    return [
      (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.atan2)(x * sc, z * cc),
      (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.asin)(z && y * sc / z)
    ];
  }
}


/***/ }),

/***/ "./node_modules/d3-geo/src/projection/azimuthalEqualArea.js":
/*!******************************************************************!*\
  !*** ./node_modules/d3-geo/src/projection/azimuthalEqualArea.js ***!
  \******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "azimuthalEqualAreaRaw": () => (/* binding */ azimuthalEqualAreaRaw),
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../math.js */ "./node_modules/d3-geo/src/math.js");
/* harmony import */ var _azimuthal_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./azimuthal.js */ "./node_modules/d3-geo/src/projection/azimuthal.js");
/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./index.js */ "./node_modules/d3-geo/src/projection/index.js");




var azimuthalEqualAreaRaw = (0,_azimuthal_js__WEBPACK_IMPORTED_MODULE_0__.azimuthalRaw)(function(cxcy) {
  return (0,_math_js__WEBPACK_IMPORTED_MODULE_1__.sqrt)(2 / (1 + cxcy));
});

azimuthalEqualAreaRaw.invert = (0,_azimuthal_js__WEBPACK_IMPORTED_MODULE_0__.azimuthalInvert)(function(z) {
  return 2 * (0,_math_js__WEBPACK_IMPORTED_MODULE_1__.asin)(z / 2);
});

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {
  return (0,_index_js__WEBPACK_IMPORTED_MODULE_2__["default"])(azimuthalEqualAreaRaw)
      .scale(124.75)
      .clipAngle(180 - 1e-3);
}


/***/ }),

/***/ "./node_modules/d3-geo/src/projection/azimuthalEquidistant.js":
/*!********************************************************************!*\
  !*** ./node_modules/d3-geo/src/projection/azimuthalEquidistant.js ***!
  \********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "azimuthalEquidistantRaw": () => (/* binding */ azimuthalEquidistantRaw),
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../math.js */ "./node_modules/d3-geo/src/math.js");
/* harmony import */ var _azimuthal_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./azimuthal.js */ "./node_modules/d3-geo/src/projection/azimuthal.js");
/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./index.js */ "./node_modules/d3-geo/src/projection/index.js");




var azimuthalEquidistantRaw = (0,_azimuthal_js__WEBPACK_IMPORTED_MODULE_0__.azimuthalRaw)(function(c) {
  return (c = (0,_math_js__WEBPACK_IMPORTED_MODULE_1__.acos)(c)) && c / (0,_math_js__WEBPACK_IMPORTED_MODULE_1__.sin)(c);
});

azimuthalEquidistantRaw.invert = (0,_azimuthal_js__WEBPACK_IMPORTED_MODULE_0__.azimuthalInvert)(function(z) {
  return z;
});

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {
  return (0,_index_js__WEBPACK_IMPORTED_MODULE_2__["default"])(azimuthalEquidistantRaw)
      .scale(79.4188)
      .clipAngle(180 - 1e-3);
}


/***/ }),

/***/ "./node_modules/d3-geo/src/projection/conic.js":
/*!*****************************************************!*\
  !*** ./node_modules/d3-geo/src/projection/conic.js ***!
  \*****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "conicProjection": () => (/* binding */ conicProjection)
/* harmony export */ });
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../math.js */ "./node_modules/d3-geo/src/math.js");
/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index.js */ "./node_modules/d3-geo/src/projection/index.js");



function conicProjection(projectAt) {
  var phi0 = 0,
      phi1 = _math_js__WEBPACK_IMPORTED_MODULE_0__.pi / 3,
      m = (0,_index_js__WEBPACK_IMPORTED_MODULE_1__.projectionMutator)(projectAt),
      p = m(phi0, phi1);

  p.parallels = function(_) {
    return arguments.length ? m(phi0 = _[0] * _math_js__WEBPACK_IMPORTED_MODULE_0__.radians, phi1 = _[1] * _math_js__WEBPACK_IMPORTED_MODULE_0__.radians) : [phi0 * _math_js__WEBPACK_IMPORTED_MODULE_0__.degrees, phi1 * _math_js__WEBPACK_IMPORTED_MODULE_0__.degrees];
  };

  return p;
}


/***/ }),

/***/ "./node_modules/d3-geo/src/projection/conicConformal.js":
/*!**************************************************************!*\
  !*** ./node_modules/d3-geo/src/projection/conicConformal.js ***!
  \**************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "conicConformalRaw": () => (/* binding */ conicConformalRaw),
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../math.js */ "./node_modules/d3-geo/src/math.js");
/* harmony import */ var _conic_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./conic.js */ "./node_modules/d3-geo/src/projection/conic.js");
/* harmony import */ var _mercator_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./mercator.js */ "./node_modules/d3-geo/src/projection/mercator.js");




function tany(y) {
  return (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.tan)((_math_js__WEBPACK_IMPORTED_MODULE_0__.halfPi + y) / 2);
}

function conicConformalRaw(y0, y1) {
  var cy0 = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.cos)(y0),
      n = y0 === y1 ? (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sin)(y0) : (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.log)(cy0 / (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.cos)(y1)) / (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.log)(tany(y1) / tany(y0)),
      f = cy0 * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.pow)(tany(y0), n) / n;

  if (!n) return _mercator_js__WEBPACK_IMPORTED_MODULE_1__.mercatorRaw;

  function project(x, y) {
    if (f > 0) { if (y < -_math_js__WEBPACK_IMPORTED_MODULE_0__.halfPi + _math_js__WEBPACK_IMPORTED_MODULE_0__.epsilon) y = -_math_js__WEBPACK_IMPORTED_MODULE_0__.halfPi + _math_js__WEBPACK_IMPORTED_MODULE_0__.epsilon; }
    else { if (y > _math_js__WEBPACK_IMPORTED_MODULE_0__.halfPi - _math_js__WEBPACK_IMPORTED_MODULE_0__.epsilon) y = _math_js__WEBPACK_IMPORTED_MODULE_0__.halfPi - _math_js__WEBPACK_IMPORTED_MODULE_0__.epsilon; }
    var r = f / (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.pow)(tany(y), n);
    return [r * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sin)(n * x), f - r * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.cos)(n * x)];
  }

  project.invert = function(x, y) {
    var fy = f - y, r = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sign)(n) * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sqrt)(x * x + fy * fy),
      l = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.atan2)(x, (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.abs)(fy)) * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sign)(fy);
    if (fy * n < 0)
      l -= _math_js__WEBPACK_IMPORTED_MODULE_0__.pi * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sign)(x) * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sign)(fy);
    return [l / n, 2 * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.atan)((0,_math_js__WEBPACK_IMPORTED_MODULE_0__.pow)(f / r, 1 / n)) - _math_js__WEBPACK_IMPORTED_MODULE_0__.halfPi];
  };

  return project;
}

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {
  return (0,_conic_js__WEBPACK_IMPORTED_MODULE_2__.conicProjection)(conicConformalRaw)
      .scale(109.5)
      .parallels([30, 30]);
}


/***/ }),

/***/ "./node_modules/d3-geo/src/projection/conicEqualArea.js":
/*!**************************************************************!*\
  !*** ./node_modules/d3-geo/src/projection/conicEqualArea.js ***!
  \**************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "conicEqualAreaRaw": () => (/* binding */ conicEqualAreaRaw),
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../math.js */ "./node_modules/d3-geo/src/math.js");
/* harmony import */ var _conic_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./conic.js */ "./node_modules/d3-geo/src/projection/conic.js");
/* harmony import */ var _cylindricalEqualArea_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./cylindricalEqualArea.js */ "./node_modules/d3-geo/src/projection/cylindricalEqualArea.js");




function conicEqualAreaRaw(y0, y1) {
  var sy0 = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sin)(y0), n = (sy0 + (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sin)(y1)) / 2;

  // Are the parallels symmetrical around the Equator?
  if ((0,_math_js__WEBPACK_IMPORTED_MODULE_0__.abs)(n) < _math_js__WEBPACK_IMPORTED_MODULE_0__.epsilon) return (0,_cylindricalEqualArea_js__WEBPACK_IMPORTED_MODULE_1__.cylindricalEqualAreaRaw)(y0);

  var c = 1 + sy0 * (2 * n - sy0), r0 = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sqrt)(c) / n;

  function project(x, y) {
    var r = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sqrt)(c - 2 * n * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sin)(y)) / n;
    return [r * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sin)(x *= n), r0 - r * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.cos)(x)];
  }

  project.invert = function(x, y) {
    var r0y = r0 - y,
        l = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.atan2)(x, (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.abs)(r0y)) * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sign)(r0y);
    if (r0y * n < 0)
      l -= _math_js__WEBPACK_IMPORTED_MODULE_0__.pi * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sign)(x) * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sign)(r0y);
    return [l / n, (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.asin)((c - (x * x + r0y * r0y) * n * n) / (2 * n))];
  };

  return project;
}

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {
  return (0,_conic_js__WEBPACK_IMPORTED_MODULE_2__.conicProjection)(conicEqualAreaRaw)
      .scale(155.424)
      .center([0, 33.6442]);
}


/***/ }),

/***/ "./node_modules/d3-geo/src/projection/conicEquidistant.js":
/*!****************************************************************!*\
  !*** ./node_modules/d3-geo/src/projection/conicEquidistant.js ***!
  \****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "conicEquidistantRaw": () => (/* binding */ conicEquidistantRaw),
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../math.js */ "./node_modules/d3-geo/src/math.js");
/* harmony import */ var _conic_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./conic.js */ "./node_modules/d3-geo/src/projection/conic.js");
/* harmony import */ var _equirectangular_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./equirectangular.js */ "./node_modules/d3-geo/src/projection/equirectangular.js");




function conicEquidistantRaw(y0, y1) {
  var cy0 = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.cos)(y0),
      n = y0 === y1 ? (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sin)(y0) : (cy0 - (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.cos)(y1)) / (y1 - y0),
      g = cy0 / n + y0;

  if ((0,_math_js__WEBPACK_IMPORTED_MODULE_0__.abs)(n) < _math_js__WEBPACK_IMPORTED_MODULE_0__.epsilon) return _equirectangular_js__WEBPACK_IMPORTED_MODULE_1__.equirectangularRaw;

  function project(x, y) {
    var gy = g - y, nx = n * x;
    return [gy * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sin)(nx), g - gy * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.cos)(nx)];
  }

  project.invert = function(x, y) {
    var gy = g - y,
        l = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.atan2)(x, (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.abs)(gy)) * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sign)(gy);
    if (gy * n < 0)
      l -= _math_js__WEBPACK_IMPORTED_MODULE_0__.pi * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sign)(x) * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sign)(gy);
    return [l / n, g - (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sign)(n) * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sqrt)(x * x + gy * gy)];
  };

  return project;
}

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {
  return (0,_conic_js__WEBPACK_IMPORTED_MODULE_2__.conicProjection)(conicEquidistantRaw)
      .scale(131.154)
      .center([0, 13.9389]);
}


/***/ }),

/***/ "./node_modules/d3-geo/src/projection/cylindricalEqualArea.js":
/*!********************************************************************!*\
  !*** ./node_modules/d3-geo/src/projection/cylindricalEqualArea.js ***!
  \********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "cylindricalEqualAreaRaw": () => (/* binding */ cylindricalEqualAreaRaw)
/* harmony export */ });
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../math.js */ "./node_modules/d3-geo/src/math.js");


function cylindricalEqualAreaRaw(phi0) {
  var cosPhi0 = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.cos)(phi0);

  function forward(lambda, phi) {
    return [lambda * cosPhi0, (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sin)(phi) / cosPhi0];
  }

  forward.invert = function(x, y) {
    return [x / cosPhi0, (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.asin)(y * cosPhi0)];
  };

  return forward;
}


/***/ }),

/***/ "./node_modules/d3-geo/src/projection/equalEarth.js":
/*!**********************************************************!*\
  !*** ./node_modules/d3-geo/src/projection/equalEarth.js ***!
  \**********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "equalEarthRaw": () => (/* binding */ equalEarthRaw),
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index.js */ "./node_modules/d3-geo/src/projection/index.js");
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../math.js */ "./node_modules/d3-geo/src/math.js");



var A1 = 1.340264,
    A2 = -0.081106,
    A3 = 0.000893,
    A4 = 0.003796,
    M = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sqrt)(3) / 2,
    iterations = 12;

function equalEarthRaw(lambda, phi) {
  var l = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.asin)(M * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sin)(phi)), l2 = l * l, l6 = l2 * l2 * l2;
  return [
    lambda * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.cos)(l) / (M * (A1 + 3 * A2 * l2 + l6 * (7 * A3 + 9 * A4 * l2))),
    l * (A1 + A2 * l2 + l6 * (A3 + A4 * l2))
  ];
}

equalEarthRaw.invert = function(x, y) {
  var l = y, l2 = l * l, l6 = l2 * l2 * l2;
  for (var i = 0, delta, fy, fpy; i < iterations; ++i) {
    fy = l * (A1 + A2 * l2 + l6 * (A3 + A4 * l2)) - y;
    fpy = A1 + 3 * A2 * l2 + l6 * (7 * A3 + 9 * A4 * l2);
    l -= delta = fy / fpy, l2 = l * l, l6 = l2 * l2 * l2;
    if ((0,_math_js__WEBPACK_IMPORTED_MODULE_0__.abs)(delta) < _math_js__WEBPACK_IMPORTED_MODULE_0__.epsilon2) break;
  }
  return [
    M * x * (A1 + 3 * A2 * l2 + l6 * (7 * A3 + 9 * A4 * l2)) / (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.cos)(l),
    (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.asin)((0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sin)(l) / M)
  ];
};

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {
  return (0,_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(equalEarthRaw)
      .scale(177.158);
}


/***/ }),

/***/ "./node_modules/d3-geo/src/projection/equirectangular.js":
/*!***************************************************************!*\
  !*** ./node_modules/d3-geo/src/projection/equirectangular.js ***!
  \***************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "equirectangularRaw": () => (/* binding */ equirectangularRaw),
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.js */ "./node_modules/d3-geo/src/projection/index.js");


function equirectangularRaw(lambda, phi) {
  return [lambda, phi];
}

equirectangularRaw.invert = equirectangularRaw;

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {
  return (0,_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(equirectangularRaw)
      .scale(152.63);
}


/***/ }),

/***/ "./node_modules/d3-geo/src/projection/fit.js":
/*!***************************************************!*\
  !*** ./node_modules/d3-geo/src/projection/fit.js ***!
  \***************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "fitExtent": () => (/* binding */ fitExtent),
/* harmony export */   "fitSize": () => (/* binding */ fitSize),
/* harmony export */   "fitWidth": () => (/* binding */ fitWidth),
/* harmony export */   "fitHeight": () => (/* binding */ fitHeight)
/* harmony export */ });
/* harmony import */ var _stream_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../stream.js */ "./node_modules/d3-geo/src/stream.js");
/* harmony import */ var _path_bounds_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../path/bounds.js */ "./node_modules/d3-geo/src/path/bounds.js");



function fit(projection, fitBounds, object) {
  var clip = projection.clipExtent && projection.clipExtent();
  projection.scale(150).translate([0, 0]);
  if (clip != null) projection.clipExtent(null);
  (0,_stream_js__WEBPACK_IMPORTED_MODULE_0__["default"])(object, projection.stream(_path_bounds_js__WEBPACK_IMPORTED_MODULE_1__["default"]));
  fitBounds(_path_bounds_js__WEBPACK_IMPORTED_MODULE_1__["default"].result());
  if (clip != null) projection.clipExtent(clip);
  return projection;
}

function fitExtent(projection, extent, object) {
  return fit(projection, function(b) {
    var w = extent[1][0] - extent[0][0],
        h = extent[1][1] - extent[0][1],
        k = Math.min(w / (b[1][0] - b[0][0]), h / (b[1][1] - b[0][1])),
        x = +extent[0][0] + (w - k * (b[1][0] + b[0][0])) / 2,
        y = +extent[0][1] + (h - k * (b[1][1] + b[0][1])) / 2;
    projection.scale(150 * k).translate([x, y]);
  }, object);
}

function fitSize(projection, size, object) {
  return fitExtent(projection, [[0, 0], size], object);
}

function fitWidth(projection, width, object) {
  return fit(projection, function(b) {
    var w = +width,
        k = w / (b[1][0] - b[0][0]),
        x = (w - k * (b[1][0] + b[0][0])) / 2,
        y = -k * b[0][1];
    projection.scale(150 * k).translate([x, y]);
  }, object);
}

function fitHeight(projection, height, object) {
  return fit(projection, function(b) {
    var h = +height,
        k = h / (b[1][1] - b[0][1]),
        x = -k * b[0][0],
        y = (h - k * (b[1][1] + b[0][1])) / 2;
    projection.scale(150 * k).translate([x, y]);
  }, object);
}


/***/ }),

/***/ "./node_modules/d3-geo/src/projection/gnomonic.js":
/*!********************************************************!*\
  !*** ./node_modules/d3-geo/src/projection/gnomonic.js ***!
  \********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "gnomonicRaw": () => (/* binding */ gnomonicRaw),
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../math.js */ "./node_modules/d3-geo/src/math.js");
/* harmony import */ var _azimuthal_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./azimuthal.js */ "./node_modules/d3-geo/src/projection/azimuthal.js");
/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./index.js */ "./node_modules/d3-geo/src/projection/index.js");




function gnomonicRaw(x, y) {
  var cy = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.cos)(y), k = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.cos)(x) * cy;
  return [cy * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sin)(x) / k, (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sin)(y) / k];
}

gnomonicRaw.invert = (0,_azimuthal_js__WEBPACK_IMPORTED_MODULE_1__.azimuthalInvert)(_math_js__WEBPACK_IMPORTED_MODULE_0__.atan);

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {
  return (0,_index_js__WEBPACK_IMPORTED_MODULE_2__["default"])(gnomonicRaw)
      .scale(144.049)
      .clipAngle(60);
}


/***/ }),

/***/ "./node_modules/d3-geo/src/projection/identity.js":
/*!********************************************************!*\
  !*** ./node_modules/d3-geo/src/projection/identity.js ***!
  \********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _clip_rectangle_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../clip/rectangle.js */ "./node_modules/d3-geo/src/clip/rectangle.js");
/* harmony import */ var _identity_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../identity.js */ "./node_modules/d3-geo/src/identity.js");
/* harmony import */ var _transform_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../transform.js */ "./node_modules/d3-geo/src/transform.js");
/* harmony import */ var _fit_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./fit.js */ "./node_modules/d3-geo/src/projection/fit.js");
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../math.js */ "./node_modules/d3-geo/src/math.js");






/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {
  var k = 1, tx = 0, ty = 0, sx = 1, sy = 1, // scale, translate and reflect
      alpha = 0, ca, sa, // angle
      x0 = null, y0, x1, y1, // clip extent
      kx = 1, ky = 1,
      transform = (0,_transform_js__WEBPACK_IMPORTED_MODULE_0__.transformer)({
        point: function(x, y) {
          var p = projection([x, y])
          this.stream.point(p[0], p[1]);
        }
      }),
      postclip = _identity_js__WEBPACK_IMPORTED_MODULE_1__["default"],
      cache,
      cacheStream;

  function reset() {
    kx = k * sx;
    ky = k * sy;
    cache = cacheStream = null;
    return projection;
  }

  function projection (p) {
    var x = p[0] * kx, y = p[1] * ky;
    if (alpha) {
      var t = y * ca - x * sa;
      x = x * ca + y * sa;
      y = t;
    }    
    return [x + tx, y + ty];
  }
  projection.invert = function(p) {
    var x = p[0] - tx, y = p[1] - ty;
    if (alpha) {
      var t = y * ca + x * sa;
      x = x * ca - y * sa;
      y = t;
    }
    return [x / kx, y / ky];
  };
  projection.stream = function(stream) {
    return cache && cacheStream === stream ? cache : cache = transform(postclip(cacheStream = stream));
  };
  projection.postclip = function(_) {
    return arguments.length ? (postclip = _, x0 = y0 = x1 = y1 = null, reset()) : postclip;
  };
  projection.clipExtent = function(_) {
    return arguments.length ? (postclip = _ == null ? (x0 = y0 = x1 = y1 = null, _identity_js__WEBPACK_IMPORTED_MODULE_1__["default"]) : (0,_clip_rectangle_js__WEBPACK_IMPORTED_MODULE_2__["default"])(x0 = +_[0][0], y0 = +_[0][1], x1 = +_[1][0], y1 = +_[1][1]), reset()) : x0 == null ? null : [[x0, y0], [x1, y1]];
  };
  projection.scale = function(_) {
    return arguments.length ? (k = +_, reset()) : k;
  };
  projection.translate = function(_) {
    return arguments.length ? (tx = +_[0], ty = +_[1], reset()) : [tx, ty];
  }
  projection.angle = function(_) {
    return arguments.length ? (alpha = _ % 360 * _math_js__WEBPACK_IMPORTED_MODULE_3__.radians, sa = (0,_math_js__WEBPACK_IMPORTED_MODULE_3__.sin)(alpha), ca = (0,_math_js__WEBPACK_IMPORTED_MODULE_3__.cos)(alpha), reset()) : alpha * _math_js__WEBPACK_IMPORTED_MODULE_3__.degrees;
  };
  projection.reflectX = function(_) {
    return arguments.length ? (sx = _ ? -1 : 1, reset()) : sx < 0;
  };
  projection.reflectY = function(_) {
    return arguments.length ? (sy = _ ? -1 : 1, reset()) : sy < 0;
  };
  projection.fitExtent = function(extent, object) {
    return (0,_fit_js__WEBPACK_IMPORTED_MODULE_4__.fitExtent)(projection, extent, object);
  };
  projection.fitSize = function(size, object) {
    return (0,_fit_js__WEBPACK_IMPORTED_MODULE_4__.fitSize)(projection, size, object);
  };
  projection.fitWidth = function(width, object) {
    return (0,_fit_js__WEBPACK_IMPORTED_MODULE_4__.fitWidth)(projection, width, object);
  };
  projection.fitHeight = function(height, object) {
    return (0,_fit_js__WEBPACK_IMPORTED_MODULE_4__.fitHeight)(projection, height, object);
  };

  return projection;
}


/***/ }),

/***/ "./node_modules/d3-geo/src/projection/index.js":
/*!*****************************************************!*\
  !*** ./node_modules/d3-geo/src/projection/index.js ***!
  \*****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ projection),
/* harmony export */   "projectionMutator": () => (/* binding */ projectionMutator)
/* harmony export */ });
/* harmony import */ var _clip_antimeridian_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../clip/antimeridian.js */ "./node_modules/d3-geo/src/clip/antimeridian.js");
/* harmony import */ var _clip_circle_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../clip/circle.js */ "./node_modules/d3-geo/src/clip/circle.js");
/* harmony import */ var _clip_rectangle_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../clip/rectangle.js */ "./node_modules/d3-geo/src/clip/rectangle.js");
/* harmony import */ var _compose_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../compose.js */ "./node_modules/d3-geo/src/compose.js");
/* harmony import */ var _identity_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../identity.js */ "./node_modules/d3-geo/src/identity.js");
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../math.js */ "./node_modules/d3-geo/src/math.js");
/* harmony import */ var _rotation_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../rotation.js */ "./node_modules/d3-geo/src/rotation.js");
/* harmony import */ var _transform_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../transform.js */ "./node_modules/d3-geo/src/transform.js");
/* harmony import */ var _fit_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./fit.js */ "./node_modules/d3-geo/src/projection/fit.js");
/* harmony import */ var _resample_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./resample.js */ "./node_modules/d3-geo/src/projection/resample.js");











var transformRadians = (0,_transform_js__WEBPACK_IMPORTED_MODULE_0__.transformer)({
  point: function(x, y) {
    this.stream.point(x * _math_js__WEBPACK_IMPORTED_MODULE_1__.radians, y * _math_js__WEBPACK_IMPORTED_MODULE_1__.radians);
  }
});

function transformRotate(rotate) {
  return (0,_transform_js__WEBPACK_IMPORTED_MODULE_0__.transformer)({
    point: function(x, y) {
      var r = rotate(x, y);
      return this.stream.point(r[0], r[1]);
    }
  });
}

function scaleTranslate(k, dx, dy, sx, sy) {
  function transform(x, y) {
    x *= sx; y *= sy;
    return [dx + k * x, dy - k * y];
  }
  transform.invert = function(x, y) {
    return [(x - dx) / k * sx, (dy - y) / k * sy];
  };
  return transform;
}

function scaleTranslateRotate(k, dx, dy, sx, sy, alpha) {
  if (!alpha) return scaleTranslate(k, dx, dy, sx, sy);
  var cosAlpha = (0,_math_js__WEBPACK_IMPORTED_MODULE_1__.cos)(alpha),
      sinAlpha = (0,_math_js__WEBPACK_IMPORTED_MODULE_1__.sin)(alpha),
      a = cosAlpha * k,
      b = sinAlpha * k,
      ai = cosAlpha / k,
      bi = sinAlpha / k,
      ci = (sinAlpha * dy - cosAlpha * dx) / k,
      fi = (sinAlpha * dx + cosAlpha * dy) / k;
  function transform(x, y) {
    x *= sx; y *= sy;
    return [a * x - b * y + dx, dy - b * x - a * y];
  }
  transform.invert = function(x, y) {
    return [sx * (ai * x - bi * y + ci), sy * (fi - bi * x - ai * y)];
  };
  return transform;
}

function projection(project) {
  return projectionMutator(function() { return project; })();
}

function projectionMutator(projectAt) {
  var project,
      k = 150, // scale
      x = 480, y = 250, // translate
      lambda = 0, phi = 0, // center
      deltaLambda = 0, deltaPhi = 0, deltaGamma = 0, rotate, // pre-rotate
      alpha = 0, // post-rotate angle
      sx = 1, // reflectX
      sy = 1, // reflectX
      theta = null, preclip = _clip_antimeridian_js__WEBPACK_IMPORTED_MODULE_2__["default"], // pre-clip angle
      x0 = null, y0, x1, y1, postclip = _identity_js__WEBPACK_IMPORTED_MODULE_3__["default"], // post-clip extent
      delta2 = 0.5, // precision
      projectResample,
      projectTransform,
      projectRotateTransform,
      cache,
      cacheStream;

  function projection(point) {
    return projectRotateTransform(point[0] * _math_js__WEBPACK_IMPORTED_MODULE_1__.radians, point[1] * _math_js__WEBPACK_IMPORTED_MODULE_1__.radians);
  }

  function invert(point) {
    point = projectRotateTransform.invert(point[0], point[1]);
    return point && [point[0] * _math_js__WEBPACK_IMPORTED_MODULE_1__.degrees, point[1] * _math_js__WEBPACK_IMPORTED_MODULE_1__.degrees];
  }

  projection.stream = function(stream) {
    return cache && cacheStream === stream ? cache : cache = transformRadians(transformRotate(rotate)(preclip(projectResample(postclip(cacheStream = stream)))));
  };

  projection.preclip = function(_) {
    return arguments.length ? (preclip = _, theta = undefined, reset()) : preclip;
  };

  projection.postclip = function(_) {
    return arguments.length ? (postclip = _, x0 = y0 = x1 = y1 = null, reset()) : postclip;
  };

  projection.clipAngle = function(_) {
    return arguments.length ? (preclip = +_ ? (0,_clip_circle_js__WEBPACK_IMPORTED_MODULE_4__["default"])(theta = _ * _math_js__WEBPACK_IMPORTED_MODULE_1__.radians) : (theta = null, _clip_antimeridian_js__WEBPACK_IMPORTED_MODULE_2__["default"]), reset()) : theta * _math_js__WEBPACK_IMPORTED_MODULE_1__.degrees;
  };

  projection.clipExtent = function(_) {
    return arguments.length ? (postclip = _ == null ? (x0 = y0 = x1 = y1 = null, _identity_js__WEBPACK_IMPORTED_MODULE_3__["default"]) : (0,_clip_rectangle_js__WEBPACK_IMPORTED_MODULE_5__["default"])(x0 = +_[0][0], y0 = +_[0][1], x1 = +_[1][0], y1 = +_[1][1]), reset()) : x0 == null ? null : [[x0, y0], [x1, y1]];
  };

  projection.scale = function(_) {
    return arguments.length ? (k = +_, recenter()) : k;
  };

  projection.translate = function(_) {
    return arguments.length ? (x = +_[0], y = +_[1], recenter()) : [x, y];
  };

  projection.center = function(_) {
    return arguments.length ? (lambda = _[0] % 360 * _math_js__WEBPACK_IMPORTED_MODULE_1__.radians, phi = _[1] % 360 * _math_js__WEBPACK_IMPORTED_MODULE_1__.radians, recenter()) : [lambda * _math_js__WEBPACK_IMPORTED_MODULE_1__.degrees, phi * _math_js__WEBPACK_IMPORTED_MODULE_1__.degrees];
  };

  projection.rotate = function(_) {
    return arguments.length ? (deltaLambda = _[0] % 360 * _math_js__WEBPACK_IMPORTED_MODULE_1__.radians, deltaPhi = _[1] % 360 * _math_js__WEBPACK_IMPORTED_MODULE_1__.radians, deltaGamma = _.length > 2 ? _[2] % 360 * _math_js__WEBPACK_IMPORTED_MODULE_1__.radians : 0, recenter()) : [deltaLambda * _math_js__WEBPACK_IMPORTED_MODULE_1__.degrees, deltaPhi * _math_js__WEBPACK_IMPORTED_MODULE_1__.degrees, deltaGamma * _math_js__WEBPACK_IMPORTED_MODULE_1__.degrees];
  };

  projection.angle = function(_) {
    return arguments.length ? (alpha = _ % 360 * _math_js__WEBPACK_IMPORTED_MODULE_1__.radians, recenter()) : alpha * _math_js__WEBPACK_IMPORTED_MODULE_1__.degrees;
  };

  projection.reflectX = function(_) {
    return arguments.length ? (sx = _ ? -1 : 1, recenter()) : sx < 0;
  };

  projection.reflectY = function(_) {
    return arguments.length ? (sy = _ ? -1 : 1, recenter()) : sy < 0;
  };

  projection.precision = function(_) {
    return arguments.length ? (projectResample = (0,_resample_js__WEBPACK_IMPORTED_MODULE_6__["default"])(projectTransform, delta2 = _ * _), reset()) : (0,_math_js__WEBPACK_IMPORTED_MODULE_1__.sqrt)(delta2);
  };

  projection.fitExtent = function(extent, object) {
    return (0,_fit_js__WEBPACK_IMPORTED_MODULE_7__.fitExtent)(projection, extent, object);
  };

  projection.fitSize = function(size, object) {
    return (0,_fit_js__WEBPACK_IMPORTED_MODULE_7__.fitSize)(projection, size, object);
  };

  projection.fitWidth = function(width, object) {
    return (0,_fit_js__WEBPACK_IMPORTED_MODULE_7__.fitWidth)(projection, width, object);
  };

  projection.fitHeight = function(height, object) {
    return (0,_fit_js__WEBPACK_IMPORTED_MODULE_7__.fitHeight)(projection, height, object);
  };

  function recenter() {
    var center = scaleTranslateRotate(k, 0, 0, sx, sy, alpha).apply(null, project(lambda, phi)),
        transform = scaleTranslateRotate(k, x - center[0], y - center[1], sx, sy, alpha);
    rotate = (0,_rotation_js__WEBPACK_IMPORTED_MODULE_8__.rotateRadians)(deltaLambda, deltaPhi, deltaGamma);
    projectTransform = (0,_compose_js__WEBPACK_IMPORTED_MODULE_9__["default"])(project, transform);
    projectRotateTransform = (0,_compose_js__WEBPACK_IMPORTED_MODULE_9__["default"])(rotate, projectTransform);
    projectResample = (0,_resample_js__WEBPACK_IMPORTED_MODULE_6__["default"])(projectTransform, delta2);
    return reset();
  }

  function reset() {
    cache = cacheStream = null;
    return projection;
  }

  return function() {
    project = projectAt.apply(this, arguments);
    projection.invert = project.invert && invert;
    return recenter();
  };
}


/***/ }),

/***/ "./node_modules/d3-geo/src/projection/mercator.js":
/*!********************************************************!*\
  !*** ./node_modules/d3-geo/src/projection/mercator.js ***!
  \********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "mercatorRaw": () => (/* binding */ mercatorRaw),
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "mercatorProjection": () => (/* binding */ mercatorProjection)
/* harmony export */ });
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../math.js */ "./node_modules/d3-geo/src/math.js");
/* harmony import */ var _rotation_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../rotation.js */ "./node_modules/d3-geo/src/rotation.js");
/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index.js */ "./node_modules/d3-geo/src/projection/index.js");




function mercatorRaw(lambda, phi) {
  return [lambda, (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.log)((0,_math_js__WEBPACK_IMPORTED_MODULE_0__.tan)((_math_js__WEBPACK_IMPORTED_MODULE_0__.halfPi + phi) / 2))];
}

mercatorRaw.invert = function(x, y) {
  return [x, 2 * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.atan)((0,_math_js__WEBPACK_IMPORTED_MODULE_0__.exp)(y)) - _math_js__WEBPACK_IMPORTED_MODULE_0__.halfPi];
};

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {
  return mercatorProjection(mercatorRaw)
      .scale(961 / _math_js__WEBPACK_IMPORTED_MODULE_0__.tau);
}

function mercatorProjection(project) {
  var m = (0,_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(project),
      center = m.center,
      scale = m.scale,
      translate = m.translate,
      clipExtent = m.clipExtent,
      x0 = null, y0, x1, y1; // clip extent

  m.scale = function(_) {
    return arguments.length ? (scale(_), reclip()) : scale();
  };

  m.translate = function(_) {
    return arguments.length ? (translate(_), reclip()) : translate();
  };

  m.center = function(_) {
    return arguments.length ? (center(_), reclip()) : center();
  };

  m.clipExtent = function(_) {
    return arguments.length ? ((_ == null ? x0 = y0 = x1 = y1 = null : (x0 = +_[0][0], y0 = +_[0][1], x1 = +_[1][0], y1 = +_[1][1])), reclip()) : x0 == null ? null : [[x0, y0], [x1, y1]];
  };

  function reclip() {
    var k = _math_js__WEBPACK_IMPORTED_MODULE_0__.pi * scale(),
        t = m((0,_rotation_js__WEBPACK_IMPORTED_MODULE_2__["default"])(m.rotate()).invert([0, 0]));
    return clipExtent(x0 == null
        ? [[t[0] - k, t[1] - k], [t[0] + k, t[1] + k]] : project === mercatorRaw
        ? [[Math.max(t[0] - k, x0), y0], [Math.min(t[0] + k, x1), y1]]
        : [[x0, Math.max(t[1] - k, y0)], [x1, Math.min(t[1] + k, y1)]]);
  }

  return reclip();
}


/***/ }),

/***/ "./node_modules/d3-geo/src/projection/naturalEarth1.js":
/*!*************************************************************!*\
  !*** ./node_modules/d3-geo/src/projection/naturalEarth1.js ***!
  \*************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "naturalEarth1Raw": () => (/* binding */ naturalEarth1Raw),
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index.js */ "./node_modules/d3-geo/src/projection/index.js");
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../math.js */ "./node_modules/d3-geo/src/math.js");



function naturalEarth1Raw(lambda, phi) {
  var phi2 = phi * phi, phi4 = phi2 * phi2;
  return [
    lambda * (0.8707 - 0.131979 * phi2 + phi4 * (-0.013791 + phi4 * (0.003971 * phi2 - 0.001529 * phi4))),
    phi * (1.007226 + phi2 * (0.015085 + phi4 * (-0.044475 + 0.028874 * phi2 - 0.005916 * phi4)))
  ];
}

naturalEarth1Raw.invert = function(x, y) {
  var phi = y, i = 25, delta;
  do {
    var phi2 = phi * phi, phi4 = phi2 * phi2;
    phi -= delta = (phi * (1.007226 + phi2 * (0.015085 + phi4 * (-0.044475 + 0.028874 * phi2 - 0.005916 * phi4))) - y) /
        (1.007226 + phi2 * (0.015085 * 3 + phi4 * (-0.044475 * 7 + 0.028874 * 9 * phi2 - 0.005916 * 11 * phi4)));
  } while ((0,_math_js__WEBPACK_IMPORTED_MODULE_0__.abs)(delta) > _math_js__WEBPACK_IMPORTED_MODULE_0__.epsilon && --i > 0);
  return [
    x / (0.8707 + (phi2 = phi * phi) * (-0.131979 + phi2 * (-0.013791 + phi2 * phi2 * phi2 * (0.003971 - 0.001529 * phi2)))),
    phi
  ];
};

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {
  return (0,_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(naturalEarth1Raw)
      .scale(175.295);
}


/***/ }),

/***/ "./node_modules/d3-geo/src/projection/orthographic.js":
/*!************************************************************!*\
  !*** ./node_modules/d3-geo/src/projection/orthographic.js ***!
  \************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "orthographicRaw": () => (/* binding */ orthographicRaw),
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../math.js */ "./node_modules/d3-geo/src/math.js");
/* harmony import */ var _azimuthal_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./azimuthal.js */ "./node_modules/d3-geo/src/projection/azimuthal.js");
/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./index.js */ "./node_modules/d3-geo/src/projection/index.js");




function orthographicRaw(x, y) {
  return [(0,_math_js__WEBPACK_IMPORTED_MODULE_0__.cos)(y) * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sin)(x), (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sin)(y)];
}

orthographicRaw.invert = (0,_azimuthal_js__WEBPACK_IMPORTED_MODULE_1__.azimuthalInvert)(_math_js__WEBPACK_IMPORTED_MODULE_0__.asin);

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {
  return (0,_index_js__WEBPACK_IMPORTED_MODULE_2__["default"])(orthographicRaw)
      .scale(249.5)
      .clipAngle(90 + _math_js__WEBPACK_IMPORTED_MODULE_0__.epsilon);
}


/***/ }),

/***/ "./node_modules/d3-geo/src/projection/resample.js":
/*!********************************************************!*\
  !*** ./node_modules/d3-geo/src/projection/resample.js ***!
  \********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _cartesian_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../cartesian.js */ "./node_modules/d3-geo/src/cartesian.js");
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../math.js */ "./node_modules/d3-geo/src/math.js");
/* harmony import */ var _transform_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../transform.js */ "./node_modules/d3-geo/src/transform.js");




var maxDepth = 16, // maximum depth of subdivision
    cosMinDistance = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.cos)(30 * _math_js__WEBPACK_IMPORTED_MODULE_0__.radians); // cos(minimum angular distance)

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(project, delta2) {
  return +delta2 ? resample(project, delta2) : resampleNone(project);
}

function resampleNone(project) {
  return (0,_transform_js__WEBPACK_IMPORTED_MODULE_1__.transformer)({
    point: function(x, y) {
      x = project(x, y);
      this.stream.point(x[0], x[1]);
    }
  });
}

function resample(project, delta2) {

  function resampleLineTo(x0, y0, lambda0, a0, b0, c0, x1, y1, lambda1, a1, b1, c1, depth, stream) {
    var dx = x1 - x0,
        dy = y1 - y0,
        d2 = dx * dx + dy * dy;
    if (d2 > 4 * delta2 && depth--) {
      var a = a0 + a1,
          b = b0 + b1,
          c = c0 + c1,
          m = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sqrt)(a * a + b * b + c * c),
          phi2 = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.asin)(c /= m),
          lambda2 = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.abs)((0,_math_js__WEBPACK_IMPORTED_MODULE_0__.abs)(c) - 1) < _math_js__WEBPACK_IMPORTED_MODULE_0__.epsilon || (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.abs)(lambda0 - lambda1) < _math_js__WEBPACK_IMPORTED_MODULE_0__.epsilon ? (lambda0 + lambda1) / 2 : (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.atan2)(b, a),
          p = project(lambda2, phi2),
          x2 = p[0],
          y2 = p[1],
          dx2 = x2 - x0,
          dy2 = y2 - y0,
          dz = dy * dx2 - dx * dy2;
      if (dz * dz / d2 > delta2 // perpendicular projected distance
          || (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.abs)((dx * dx2 + dy * dy2) / d2 - 0.5) > 0.3 // midpoint close to an end
          || a0 * a1 + b0 * b1 + c0 * c1 < cosMinDistance) { // angular distance
        resampleLineTo(x0, y0, lambda0, a0, b0, c0, x2, y2, lambda2, a /= m, b /= m, c, depth, stream);
        stream.point(x2, y2);
        resampleLineTo(x2, y2, lambda2, a, b, c, x1, y1, lambda1, a1, b1, c1, depth, stream);
      }
    }
  }
  return function(stream) {
    var lambda00, x00, y00, a00, b00, c00, // first point
        lambda0, x0, y0, a0, b0, c0; // previous point

    var resampleStream = {
      point: point,
      lineStart: lineStart,
      lineEnd: lineEnd,
      polygonStart: function() { stream.polygonStart(); resampleStream.lineStart = ringStart; },
      polygonEnd: function() { stream.polygonEnd(); resampleStream.lineStart = lineStart; }
    };

    function point(x, y) {
      x = project(x, y);
      stream.point(x[0], x[1]);
    }

    function lineStart() {
      x0 = NaN;
      resampleStream.point = linePoint;
      stream.lineStart();
    }

    function linePoint(lambda, phi) {
      var c = (0,_cartesian_js__WEBPACK_IMPORTED_MODULE_2__.cartesian)([lambda, phi]), p = project(lambda, phi);
      resampleLineTo(x0, y0, lambda0, a0, b0, c0, x0 = p[0], y0 = p[1], lambda0 = lambda, a0 = c[0], b0 = c[1], c0 = c[2], maxDepth, stream);
      stream.point(x0, y0);
    }

    function lineEnd() {
      resampleStream.point = point;
      stream.lineEnd();
    }

    function ringStart() {
      lineStart();
      resampleStream.point = ringPoint;
      resampleStream.lineEnd = ringEnd;
    }

    function ringPoint(lambda, phi) {
      linePoint(lambda00 = lambda, phi), x00 = x0, y00 = y0, a00 = a0, b00 = b0, c00 = c0;
      resampleStream.point = linePoint;
    }

    function ringEnd() {
      resampleLineTo(x0, y0, lambda0, a0, b0, c0, x00, y00, lambda00, a00, b00, c00, maxDepth, stream);
      resampleStream.lineEnd = lineEnd;
      lineEnd();
    }

    return resampleStream;
  };
}


/***/ }),

/***/ "./node_modules/d3-geo/src/projection/stereographic.js":
/*!*************************************************************!*\
  !*** ./node_modules/d3-geo/src/projection/stereographic.js ***!
  \*************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "stereographicRaw": () => (/* binding */ stereographicRaw),
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../math.js */ "./node_modules/d3-geo/src/math.js");
/* harmony import */ var _azimuthal_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./azimuthal.js */ "./node_modules/d3-geo/src/projection/azimuthal.js");
/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./index.js */ "./node_modules/d3-geo/src/projection/index.js");




function stereographicRaw(x, y) {
  var cy = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.cos)(y), k = 1 + (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.cos)(x) * cy;
  return [cy * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sin)(x) / k, (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sin)(y) / k];
}

stereographicRaw.invert = (0,_azimuthal_js__WEBPACK_IMPORTED_MODULE_1__.azimuthalInvert)(function(z) {
  return 2 * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.atan)(z);
});

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {
  return (0,_index_js__WEBPACK_IMPORTED_MODULE_2__["default"])(stereographicRaw)
      .scale(250)
      .clipAngle(142);
}


/***/ }),

/***/ "./node_modules/d3-geo/src/projection/transverseMercator.js":
/*!******************************************************************!*\
  !*** ./node_modules/d3-geo/src/projection/transverseMercator.js ***!
  \******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "transverseMercatorRaw": () => (/* binding */ transverseMercatorRaw),
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../math.js */ "./node_modules/d3-geo/src/math.js");
/* harmony import */ var _mercator_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./mercator.js */ "./node_modules/d3-geo/src/projection/mercator.js");



function transverseMercatorRaw(lambda, phi) {
  return [(0,_math_js__WEBPACK_IMPORTED_MODULE_0__.log)((0,_math_js__WEBPACK_IMPORTED_MODULE_0__.tan)((_math_js__WEBPACK_IMPORTED_MODULE_0__.halfPi + phi) / 2)), -lambda];
}

transverseMercatorRaw.invert = function(x, y) {
  return [-y, 2 * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.atan)((0,_math_js__WEBPACK_IMPORTED_MODULE_0__.exp)(x)) - _math_js__WEBPACK_IMPORTED_MODULE_0__.halfPi];
};

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {
  var m = (0,_mercator_js__WEBPACK_IMPORTED_MODULE_1__.mercatorProjection)(transverseMercatorRaw),
      center = m.center,
      rotate = m.rotate;

  m.center = function(_) {
    return arguments.length ? center([-_[1], _[0]]) : (_ = center(), [_[1], -_[0]]);
  };

  m.rotate = function(_) {
    return arguments.length ? rotate([_[0], _[1], _.length > 2 ? _[2] + 90 : 90]) : (_ = rotate(), [_[0], _[1], _[2] - 90]);
  };

  return rotate([0, 0, 90])
      .scale(159.155);
}


/***/ }),

/***/ "./node_modules/d3-geo/src/rotation.js":
/*!*********************************************!*\
  !*** ./node_modules/d3-geo/src/rotation.js ***!
  \*********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "rotateRadians": () => (/* binding */ rotateRadians),
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _compose_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./compose.js */ "./node_modules/d3-geo/src/compose.js");
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./math.js */ "./node_modules/d3-geo/src/math.js");



function rotationIdentity(lambda, phi) {
  return [(0,_math_js__WEBPACK_IMPORTED_MODULE_0__.abs)(lambda) > _math_js__WEBPACK_IMPORTED_MODULE_0__.pi ? lambda + Math.round(-lambda / _math_js__WEBPACK_IMPORTED_MODULE_0__.tau) * _math_js__WEBPACK_IMPORTED_MODULE_0__.tau : lambda, phi];
}

rotationIdentity.invert = rotationIdentity;

function rotateRadians(deltaLambda, deltaPhi, deltaGamma) {
  return (deltaLambda %= _math_js__WEBPACK_IMPORTED_MODULE_0__.tau) ? (deltaPhi || deltaGamma ? (0,_compose_js__WEBPACK_IMPORTED_MODULE_1__["default"])(rotationLambda(deltaLambda), rotationPhiGamma(deltaPhi, deltaGamma))
    : rotationLambda(deltaLambda))
    : (deltaPhi || deltaGamma ? rotationPhiGamma(deltaPhi, deltaGamma)
    : rotationIdentity);
}

function forwardRotationLambda(deltaLambda) {
  return function(lambda, phi) {
    return lambda += deltaLambda, [lambda > _math_js__WEBPACK_IMPORTED_MODULE_0__.pi ? lambda - _math_js__WEBPACK_IMPORTED_MODULE_0__.tau : lambda < -_math_js__WEBPACK_IMPORTED_MODULE_0__.pi ? lambda + _math_js__WEBPACK_IMPORTED_MODULE_0__.tau : lambda, phi];
  };
}

function rotationLambda(deltaLambda) {
  var rotation = forwardRotationLambda(deltaLambda);
  rotation.invert = forwardRotationLambda(-deltaLambda);
  return rotation;
}

function rotationPhiGamma(deltaPhi, deltaGamma) {
  var cosDeltaPhi = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.cos)(deltaPhi),
      sinDeltaPhi = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sin)(deltaPhi),
      cosDeltaGamma = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.cos)(deltaGamma),
      sinDeltaGamma = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sin)(deltaGamma);

  function rotation(lambda, phi) {
    var cosPhi = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.cos)(phi),
        x = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.cos)(lambda) * cosPhi,
        y = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sin)(lambda) * cosPhi,
        z = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sin)(phi),
        k = z * cosDeltaPhi + x * sinDeltaPhi;
    return [
      (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.atan2)(y * cosDeltaGamma - k * sinDeltaGamma, x * cosDeltaPhi - z * sinDeltaPhi),
      (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.asin)(k * cosDeltaGamma + y * sinDeltaGamma)
    ];
  }

  rotation.invert = function(lambda, phi) {
    var cosPhi = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.cos)(phi),
        x = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.cos)(lambda) * cosPhi,
        y = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sin)(lambda) * cosPhi,
        z = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sin)(phi),
        k = z * cosDeltaGamma - y * sinDeltaGamma;
    return [
      (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.atan2)(y * cosDeltaGamma + z * sinDeltaGamma, x * cosDeltaPhi + k * sinDeltaPhi),
      (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.asin)(k * cosDeltaPhi - x * sinDeltaPhi)
    ];
  };

  return rotation;
}

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(rotate) {
  rotate = rotateRadians(rotate[0] * _math_js__WEBPACK_IMPORTED_MODULE_0__.radians, rotate[1] * _math_js__WEBPACK_IMPORTED_MODULE_0__.radians, rotate.length > 2 ? rotate[2] * _math_js__WEBPACK_IMPORTED_MODULE_0__.radians : 0);

  function forward(coordinates) {
    coordinates = rotate(coordinates[0] * _math_js__WEBPACK_IMPORTED_MODULE_0__.radians, coordinates[1] * _math_js__WEBPACK_IMPORTED_MODULE_0__.radians);
    return coordinates[0] *= _math_js__WEBPACK_IMPORTED_MODULE_0__.degrees, coordinates[1] *= _math_js__WEBPACK_IMPORTED_MODULE_0__.degrees, coordinates;
  }

  forward.invert = function(coordinates) {
    coordinates = rotate.invert(coordinates[0] * _math_js__WEBPACK_IMPORTED_MODULE_0__.radians, coordinates[1] * _math_js__WEBPACK_IMPORTED_MODULE_0__.radians);
    return coordinates[0] *= _math_js__WEBPACK_IMPORTED_MODULE_0__.degrees, coordinates[1] *= _math_js__WEBPACK_IMPORTED_MODULE_0__.degrees, coordinates;
  };

  return forward;
}


/***/ }),

/***/ "./node_modules/d3-geo/src/stream.js":
/*!*******************************************!*\
  !*** ./node_modules/d3-geo/src/stream.js ***!
  \*******************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function streamGeometry(geometry, stream) {
  if (geometry && streamGeometryType.hasOwnProperty(geometry.type)) {
    streamGeometryType[geometry.type](geometry, stream);
  }
}

var streamObjectType = {
  Feature: function(object, stream) {
    streamGeometry(object.geometry, stream);
  },
  FeatureCollection: function(object, stream) {
    var features = object.features, i = -1, n = features.length;
    while (++i < n) streamGeometry(features[i].geometry, stream);
  }
};

var streamGeometryType = {
  Sphere: function(object, stream) {
    stream.sphere();
  },
  Point: function(object, stream) {
    object = object.coordinates;
    stream.point(object[0], object[1], object[2]);
  },
  MultiPoint: function(object, stream) {
    var coordinates = object.coordinates, i = -1, n = coordinates.length;
    while (++i < n) object = coordinates[i], stream.point(object[0], object[1], object[2]);
  },
  LineString: function(object, stream) {
    streamLine(object.coordinates, stream, 0);
  },
  MultiLineString: function(object, stream) {
    var coordinates = object.coordinates, i = -1, n = coordinates.length;
    while (++i < n) streamLine(coordinates[i], stream, 0);
  },
  Polygon: function(object, stream) {
    streamPolygon(object.coordinates, stream);
  },
  MultiPolygon: function(object, stream) {
    var coordinates = object.coordinates, i = -1, n = coordinates.length;
    while (++i < n) streamPolygon(coordinates[i], stream);
  },
  GeometryCollection: function(object, stream) {
    var geometries = object.geometries, i = -1, n = geometries.length;
    while (++i < n) streamGeometry(geometries[i], stream);
  }
};

function streamLine(coordinates, stream, closed) {
  var i = -1, n = coordinates.length - closed, coordinate;
  stream.lineStart();
  while (++i < n) coordinate = coordinates[i], stream.point(coordinate[0], coordinate[1], coordinate[2]);
  stream.lineEnd();
}

function streamPolygon(coordinates, stream) {
  var i = -1, n = coordinates.length;
  stream.polygonStart();
  while (++i < n) streamLine(coordinates[i], stream, 1);
  stream.polygonEnd();
}

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(object, stream) {
  if (object && streamObjectType.hasOwnProperty(object.type)) {
    streamObjectType[object.type](object, stream);
  } else {
    streamGeometry(object, stream);
  }
}


/***/ }),

/***/ "./node_modules/d3-geo/src/transform.js":
/*!**********************************************!*\
  !*** ./node_modules/d3-geo/src/transform.js ***!
  \**********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "transformer": () => (/* binding */ transformer)
/* harmony export */ });
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(methods) {
  return {
    stream: transformer(methods)
  };
}

function transformer(methods) {
  return function(stream) {
    var s = new TransformStream;
    for (var key in methods) s[key] = methods[key];
    s.stream = stream;
    return s;
  };
}

function TransformStream() {}

TransformStream.prototype = {
  constructor: TransformStream,
  point: function(x, y) { this.stream.point(x, y); },
  sphere: function() { this.stream.sphere(); },
  lineStart: function() { this.stream.lineStart(); },
  lineEnd: function() { this.stream.lineEnd(); },
  polygonStart: function() { this.stream.polygonStart(); },
  polygonEnd: function() { this.stream.polygonEnd(); }
};


/***/ }),

/***/ "./node_modules/d3-interpolate/src/basis.js":
/*!**************************************************!*\
  !*** ./node_modules/d3-interpolate/src/basis.js ***!
  \**************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "basis": () => (/* binding */ basis),
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function basis(t1, v0, v1, v2, v3) {
  var t2 = t1 * t1, t3 = t2 * t1;
  return ((1 - 3 * t1 + 3 * t2 - t3) * v0
      + (4 - 6 * t2 + 3 * t3) * v1
      + (1 + 3 * t1 + 3 * t2 - 3 * t3) * v2
      + t3 * v3) / 6;
}

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(values) {
  var n = values.length - 1;
  return function(t) {
    var i = t <= 0 ? (t = 0) : t >= 1 ? (t = 1, n - 1) : Math.floor(t * n),
        v1 = values[i],
        v2 = values[i + 1],
        v0 = i > 0 ? values[i - 1] : 2 * v1 - v2,
        v3 = i < n - 1 ? values[i + 2] : 2 * v2 - v1;
    return basis((t - i / n) * n, v0, v1, v2, v3);
  };
}


/***/ }),

/***/ "./node_modules/d3-interpolate/src/basisClosed.js":
/*!********************************************************!*\
  !*** ./node_modules/d3-interpolate/src/basisClosed.js ***!
  \********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _basis_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./basis.js */ "./node_modules/d3-interpolate/src/basis.js");


/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(values) {
  var n = values.length;
  return function(t) {
    var i = Math.floor(((t %= 1) < 0 ? ++t : t) * n),
        v0 = values[(i + n - 1) % n],
        v1 = values[i % n],
        v2 = values[(i + 1) % n],
        v3 = values[(i + 2) % n];
    return (0,_basis_js__WEBPACK_IMPORTED_MODULE_0__.basis)((t - i / n) * n, v0, v1, v2, v3);
  };
}


/***/ }),

/***/ "./node_modules/d3-interpolate/src/color.js":
/*!**************************************************!*\
  !*** ./node_modules/d3-interpolate/src/color.js ***!
  \**************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "hue": () => (/* binding */ hue),
/* harmony export */   "gamma": () => (/* binding */ gamma),
/* harmony export */   "default": () => (/* binding */ nogamma)
/* harmony export */ });
/* harmony import */ var _constant_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constant.js */ "./node_modules/d3-interpolate/src/constant.js");


function linear(a, d) {
  return function(t) {
    return a + t * d;
  };
}

function exponential(a, b, y) {
  return a = Math.pow(a, y), b = Math.pow(b, y) - a, y = 1 / y, function(t) {
    return Math.pow(a + t * b, y);
  };
}

function hue(a, b) {
  var d = b - a;
  return d ? linear(a, d > 180 || d < -180 ? d - 360 * Math.round(d / 360) : d) : (0,_constant_js__WEBPACK_IMPORTED_MODULE_0__["default"])(isNaN(a) ? b : a);
}

function gamma(y) {
  return (y = +y) === 1 ? nogamma : function(a, b) {
    return b - a ? exponential(a, b, y) : (0,_constant_js__WEBPACK_IMPORTED_MODULE_0__["default"])(isNaN(a) ? b : a);
  };
}

function nogamma(a, b) {
  var d = b - a;
  return d ? linear(a, d) : (0,_constant_js__WEBPACK_IMPORTED_MODULE_0__["default"])(isNaN(a) ? b : a);
}


/***/ }),

/***/ "./node_modules/d3-interpolate/src/constant.js":
/*!*****************************************************!*\
  !*** ./node_modules/d3-interpolate/src/constant.js ***!
  \*****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (x => () => x);


/***/ }),

/***/ "./node_modules/d3-interpolate/src/number.js":
/*!***************************************************!*\
  !*** ./node_modules/d3-interpolate/src/number.js ***!
  \***************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(a, b) {
  return a = +a, b = +b, function(t) {
    return a * (1 - t) + b * t;
  };
}


/***/ }),

/***/ "./node_modules/d3-interpolate/src/rgb.js":
/*!************************************************!*\
  !*** ./node_modules/d3-interpolate/src/rgb.js ***!
  \************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "rgbBasis": () => (/* binding */ rgbBasis),
/* harmony export */   "rgbBasisClosed": () => (/* binding */ rgbBasisClosed)
/* harmony export */ });
/* harmony import */ var d3_color__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! d3-color */ "./node_modules/d3-color/src/color.js");
/* harmony import */ var _basis_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./basis.js */ "./node_modules/d3-interpolate/src/basis.js");
/* harmony import */ var _basisClosed_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./basisClosed.js */ "./node_modules/d3-interpolate/src/basisClosed.js");
/* harmony import */ var _color_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./color.js */ "./node_modules/d3-interpolate/src/color.js");





/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((function rgbGamma(y) {
  var color = (0,_color_js__WEBPACK_IMPORTED_MODULE_0__.gamma)(y);

  function rgb(start, end) {
    var r = color((start = (0,d3_color__WEBPACK_IMPORTED_MODULE_1__.rgb)(start)).r, (end = (0,d3_color__WEBPACK_IMPORTED_MODULE_1__.rgb)(end)).r),
        g = color(start.g, end.g),
        b = color(start.b, end.b),
        opacity = (0,_color_js__WEBPACK_IMPORTED_MODULE_0__["default"])(start.opacity, end.opacity);
    return function(t) {
      start.r = r(t);
      start.g = g(t);
      start.b = b(t);
      start.opacity = opacity(t);
      return start + "";
    };
  }

  rgb.gamma = rgbGamma;

  return rgb;
})(1));

function rgbSpline(spline) {
  return function(colors) {
    var n = colors.length,
        r = new Array(n),
        g = new Array(n),
        b = new Array(n),
        i, color;
    for (i = 0; i < n; ++i) {
      color = (0,d3_color__WEBPACK_IMPORTED_MODULE_1__.rgb)(colors[i]);
      r[i] = color.r || 0;
      g[i] = color.g || 0;
      b[i] = color.b || 0;
    }
    r = spline(r);
    g = spline(g);
    b = spline(b);
    color.opacity = 1;
    return function(t) {
      color.r = r(t);
      color.g = g(t);
      color.b = b(t);
      return color + "";
    };
  };
}

var rgbBasis = rgbSpline(_basis_js__WEBPACK_IMPORTED_MODULE_2__["default"]);
var rgbBasisClosed = rgbSpline(_basisClosed_js__WEBPACK_IMPORTED_MODULE_3__["default"]);


/***/ }),

/***/ "./node_modules/d3-interpolate/src/string.js":
/*!***************************************************!*\
  !*** ./node_modules/d3-interpolate/src/string.js ***!
  \***************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _number_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./number.js */ "./node_modules/d3-interpolate/src/number.js");


var reA = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,
    reB = new RegExp(reA.source, "g");

function zero(b) {
  return function() {
    return b;
  };
}

function one(b) {
  return function(t) {
    return b(t) + "";
  };
}

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(a, b) {
  var bi = reA.lastIndex = reB.lastIndex = 0, // scan index for next number in b
      am, // current match in a
      bm, // current match in b
      bs, // string preceding current number in b, if any
      i = -1, // index in s
      s = [], // string constants and placeholders
      q = []; // number interpolators

  // Coerce inputs to strings.
  a = a + "", b = b + "";

  // Interpolate pairs of numbers in a & b.
  while ((am = reA.exec(a))
      && (bm = reB.exec(b))) {
    if ((bs = bm.index) > bi) { // a string precedes the next number in b
      bs = b.slice(bi, bs);
      if (s[i]) s[i] += bs; // coalesce with previous string
      else s[++i] = bs;
    }
    if ((am = am[0]) === (bm = bm[0])) { // numbers in a & b match
      if (s[i]) s[i] += bm; // coalesce with previous string
      else s[++i] = bm;
    } else { // interpolate non-matching numbers
      s[++i] = null;
      q.push({i: i, x: (0,_number_js__WEBPACK_IMPORTED_MODULE_0__["default"])(am, bm)});
    }
    bi = reB.lastIndex;
  }

  // Add remains of b.
  if (bi < b.length) {
    bs = b.slice(bi);
    if (s[i]) s[i] += bs; // coalesce with previous string
    else s[++i] = bs;
  }

  // Special optimization for only a single match.
  // Otherwise, interpolate each of the numbers and rejoin the string.
  return s.length < 2 ? (q[0]
      ? one(q[0].x)
      : zero(b))
      : (b = q.length, function(t) {
          for (var i = 0, o; i < b; ++i) s[(o = q[i]).i] = o.x(t);
          return s.join("");
        });
}


/***/ }),

/***/ "./node_modules/d3-interpolate/src/transform/decompose.js":
/*!****************************************************************!*\
  !*** ./node_modules/d3-interpolate/src/transform/decompose.js ***!
  \****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "identity": () => (/* binding */ identity),
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var degrees = 180 / Math.PI;

var identity = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(a, b, c, d, e, f) {
  var scaleX, scaleY, skewX;
  if (scaleX = Math.sqrt(a * a + b * b)) a /= scaleX, b /= scaleX;
  if (skewX = a * c + b * d) c -= a * skewX, d -= b * skewX;
  if (scaleY = Math.sqrt(c * c + d * d)) c /= scaleY, d /= scaleY, skewX /= scaleY;
  if (a * d < b * c) a = -a, b = -b, skewX = -skewX, scaleX = -scaleX;
  return {
    translateX: e,
    translateY: f,
    rotate: Math.atan2(b, a) * degrees,
    skewX: Math.atan(skewX) * degrees,
    scaleX: scaleX,
    scaleY: scaleY
  };
}


/***/ }),

/***/ "./node_modules/d3-interpolate/src/transform/index.js":
/*!************************************************************!*\
  !*** ./node_modules/d3-interpolate/src/transform/index.js ***!
  \************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "interpolateTransformCss": () => (/* binding */ interpolateTransformCss),
/* harmony export */   "interpolateTransformSvg": () => (/* binding */ interpolateTransformSvg)
/* harmony export */ });
/* harmony import */ var _number_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../number.js */ "./node_modules/d3-interpolate/src/number.js");
/* harmony import */ var _parse_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./parse.js */ "./node_modules/d3-interpolate/src/transform/parse.js");



function interpolateTransform(parse, pxComma, pxParen, degParen) {

  function pop(s) {
    return s.length ? s.pop() + " " : "";
  }

  function translate(xa, ya, xb, yb, s, q) {
    if (xa !== xb || ya !== yb) {
      var i = s.push("translate(", null, pxComma, null, pxParen);
      q.push({i: i - 4, x: (0,_number_js__WEBPACK_IMPORTED_MODULE_0__["default"])(xa, xb)}, {i: i - 2, x: (0,_number_js__WEBPACK_IMPORTED_MODULE_0__["default"])(ya, yb)});
    } else if (xb || yb) {
      s.push("translate(" + xb + pxComma + yb + pxParen);
    }
  }

  function rotate(a, b, s, q) {
    if (a !== b) {
      if (a - b > 180) b += 360; else if (b - a > 180) a += 360; // shortest path
      q.push({i: s.push(pop(s) + "rotate(", null, degParen) - 2, x: (0,_number_js__WEBPACK_IMPORTED_MODULE_0__["default"])(a, b)});
    } else if (b) {
      s.push(pop(s) + "rotate(" + b + degParen);
    }
  }

  function skewX(a, b, s, q) {
    if (a !== b) {
      q.push({i: s.push(pop(s) + "skewX(", null, degParen) - 2, x: (0,_number_js__WEBPACK_IMPORTED_MODULE_0__["default"])(a, b)});
    } else if (b) {
      s.push(pop(s) + "skewX(" + b + degParen);
    }
  }

  function scale(xa, ya, xb, yb, s, q) {
    if (xa !== xb || ya !== yb) {
      var i = s.push(pop(s) + "scale(", null, ",", null, ")");
      q.push({i: i - 4, x: (0,_number_js__WEBPACK_IMPORTED_MODULE_0__["default"])(xa, xb)}, {i: i - 2, x: (0,_number_js__WEBPACK_IMPORTED_MODULE_0__["default"])(ya, yb)});
    } else if (xb !== 1 || yb !== 1) {
      s.push(pop(s) + "scale(" + xb + "," + yb + ")");
    }
  }

  return function(a, b) {
    var s = [], // string constants and placeholders
        q = []; // number interpolators
    a = parse(a), b = parse(b);
    translate(a.translateX, a.translateY, b.translateX, b.translateY, s, q);
    rotate(a.rotate, b.rotate, s, q);
    skewX(a.skewX, b.skewX, s, q);
    scale(a.scaleX, a.scaleY, b.scaleX, b.scaleY, s, q);
    a = b = null; // gc
    return function(t) {
      var i = -1, n = q.length, o;
      while (++i < n) s[(o = q[i]).i] = o.x(t);
      return s.join("");
    };
  };
}

var interpolateTransformCss = interpolateTransform(_parse_js__WEBPACK_IMPORTED_MODULE_1__.parseCss, "px, ", "px)", "deg)");
var interpolateTransformSvg = interpolateTransform(_parse_js__WEBPACK_IMPORTED_MODULE_1__.parseSvg, ", ", ")", ")");


/***/ }),

/***/ "./node_modules/d3-interpolate/src/transform/parse.js":
/*!************************************************************!*\
  !*** ./node_modules/d3-interpolate/src/transform/parse.js ***!
  \************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "parseCss": () => (/* binding */ parseCss),
/* harmony export */   "parseSvg": () => (/* binding */ parseSvg)
/* harmony export */ });
/* harmony import */ var _decompose_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./decompose.js */ "./node_modules/d3-interpolate/src/transform/decompose.js");


var svgNode;

/* eslint-disable no-undef */
function parseCss(value) {
  const m = new (typeof DOMMatrix === "function" ? DOMMatrix : WebKitCSSMatrix)(value + "");
  return m.isIdentity ? _decompose_js__WEBPACK_IMPORTED_MODULE_0__.identity : (0,_decompose_js__WEBPACK_IMPORTED_MODULE_0__["default"])(m.a, m.b, m.c, m.d, m.e, m.f);
}

function parseSvg(value) {
  if (value == null) return _decompose_js__WEBPACK_IMPORTED_MODULE_0__.identity;
  if (!svgNode) svgNode = document.createElementNS("http://www.w3.org/2000/svg", "g");
  svgNode.setAttribute("transform", value);
  if (!(value = svgNode.transform.baseVal.consolidate())) return _decompose_js__WEBPACK_IMPORTED_MODULE_0__.identity;
  value = value.matrix;
  return (0,_decompose_js__WEBPACK_IMPORTED_MODULE_0__["default"])(value.a, value.b, value.c, value.d, value.e, value.f);
}


/***/ }),

/***/ "./node_modules/d3-selection/src/array.js":
/*!************************************************!*\
  !*** ./node_modules/d3-selection/src/array.js ***!
  \************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ array)
/* harmony export */ });
// Given something array like (or null), returns something that is strictly an
// array. This is used to ensure that array-like objects passed to d3.selectAll
// or selection.selectAll are converted into proper arrays when creating a
// selection; we don’t ever want to create a selection backed by a live
// HTMLCollection or NodeList. However, note that selection.selectAll will use a
// static NodeList as a group, since it safely derived from querySelectorAll.
function array(x) {
  return x == null ? [] : Array.isArray(x) ? x : Array.from(x);
}


/***/ }),

/***/ "./node_modules/d3-selection/src/constant.js":
/*!***************************************************!*\
  !*** ./node_modules/d3-selection/src/constant.js ***!
  \***************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(x) {
  return function() {
    return x;
  };
}


/***/ }),

/***/ "./node_modules/d3-selection/src/creator.js":
/*!**************************************************!*\
  !*** ./node_modules/d3-selection/src/creator.js ***!
  \**************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _namespace_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./namespace.js */ "./node_modules/d3-selection/src/namespace.js");
/* harmony import */ var _namespaces_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./namespaces.js */ "./node_modules/d3-selection/src/namespaces.js");



function creatorInherit(name) {
  return function() {
    var document = this.ownerDocument,
        uri = this.namespaceURI;
    return uri === _namespaces_js__WEBPACK_IMPORTED_MODULE_0__.xhtml && document.documentElement.namespaceURI === _namespaces_js__WEBPACK_IMPORTED_MODULE_0__.xhtml
        ? document.createElement(name)
        : document.createElementNS(uri, name);
  };
}

function creatorFixed(fullname) {
  return function() {
    return this.ownerDocument.createElementNS(fullname.space, fullname.local);
  };
}

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(name) {
  var fullname = (0,_namespace_js__WEBPACK_IMPORTED_MODULE_1__["default"])(name);
  return (fullname.local
      ? creatorFixed
      : creatorInherit)(fullname);
}


/***/ }),

/***/ "./node_modules/d3-selection/src/matcher.js":
/*!**************************************************!*\
  !*** ./node_modules/d3-selection/src/matcher.js ***!
  \**************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "childMatcher": () => (/* binding */ childMatcher)
/* harmony export */ });
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(selector) {
  return function() {
    return this.matches(selector);
  };
}

function childMatcher(selector) {
  return function(node) {
    return node.matches(selector);
  };
}



/***/ }),

/***/ "./node_modules/d3-selection/src/namespace.js":
/*!****************************************************!*\
  !*** ./node_modules/d3-selection/src/namespace.js ***!
  \****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _namespaces_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./namespaces.js */ "./node_modules/d3-selection/src/namespaces.js");


/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(name) {
  var prefix = name += "", i = prefix.indexOf(":");
  if (i >= 0 && (prefix = name.slice(0, i)) !== "xmlns") name = name.slice(i + 1);
  return _namespaces_js__WEBPACK_IMPORTED_MODULE_0__["default"].hasOwnProperty(prefix) ? {space: _namespaces_js__WEBPACK_IMPORTED_MODULE_0__["default"][prefix], local: name} : name; // eslint-disable-line no-prototype-builtins
}


/***/ }),

/***/ "./node_modules/d3-selection/src/namespaces.js":
/*!*****************************************************!*\
  !*** ./node_modules/d3-selection/src/namespaces.js ***!
  \*****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "xhtml": () => (/* binding */ xhtml),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var xhtml = "http://www.w3.org/1999/xhtml";

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  svg: "http://www.w3.org/2000/svg",
  xhtml: xhtml,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
});


/***/ }),

/***/ "./node_modules/d3-selection/src/pointer.js":
/*!**************************************************!*\
  !*** ./node_modules/d3-selection/src/pointer.js ***!
  \**************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _sourceEvent_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./sourceEvent.js */ "./node_modules/d3-selection/src/sourceEvent.js");


/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(event, node) {
  event = (0,_sourceEvent_js__WEBPACK_IMPORTED_MODULE_0__["default"])(event);
  if (node === undefined) node = event.currentTarget;
  if (node) {
    var svg = node.ownerSVGElement || node;
    if (svg.createSVGPoint) {
      var point = svg.createSVGPoint();
      point.x = event.clientX, point.y = event.clientY;
      point = point.matrixTransform(node.getScreenCTM().inverse());
      return [point.x, point.y];
    }
    if (node.getBoundingClientRect) {
      var rect = node.getBoundingClientRect();
      return [event.clientX - rect.left - node.clientLeft, event.clientY - rect.top - node.clientTop];
    }
  }
  return [event.pageX, event.pageY];
}


/***/ }),

/***/ "./node_modules/d3-selection/src/select.js":
/*!*************************************************!*\
  !*** ./node_modules/d3-selection/src/select.js ***!
  \*************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _selection_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./selection/index.js */ "./node_modules/d3-selection/src/selection/index.js");


/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(selector) {
  return typeof selector === "string"
      ? new _selection_index_js__WEBPACK_IMPORTED_MODULE_0__.Selection([[document.querySelector(selector)]], [document.documentElement])
      : new _selection_index_js__WEBPACK_IMPORTED_MODULE_0__.Selection([[selector]], _selection_index_js__WEBPACK_IMPORTED_MODULE_0__.root);
}


/***/ }),

/***/ "./node_modules/d3-selection/src/selection/append.js":
/*!***********************************************************!*\
  !*** ./node_modules/d3-selection/src/selection/append.js ***!
  \***********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _creator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../creator.js */ "./node_modules/d3-selection/src/creator.js");


/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(name) {
  var create = typeof name === "function" ? name : (0,_creator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(name);
  return this.select(function() {
    return this.appendChild(create.apply(this, arguments));
  });
}


/***/ }),

/***/ "./node_modules/d3-selection/src/selection/attr.js":
/*!*********************************************************!*\
  !*** ./node_modules/d3-selection/src/selection/attr.js ***!
  \*********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _namespace_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../namespace.js */ "./node_modules/d3-selection/src/namespace.js");


function attrRemove(name) {
  return function() {
    this.removeAttribute(name);
  };
}

function attrRemoveNS(fullname) {
  return function() {
    this.removeAttributeNS(fullname.space, fullname.local);
  };
}

function attrConstant(name, value) {
  return function() {
    this.setAttribute(name, value);
  };
}

function attrConstantNS(fullname, value) {
  return function() {
    this.setAttributeNS(fullname.space, fullname.local, value);
  };
}

function attrFunction(name, value) {
  return function() {
    var v = value.apply(this, arguments);
    if (v == null) this.removeAttribute(name);
    else this.setAttribute(name, v);
  };
}

function attrFunctionNS(fullname, value) {
  return function() {
    var v = value.apply(this, arguments);
    if (v == null) this.removeAttributeNS(fullname.space, fullname.local);
    else this.setAttributeNS(fullname.space, fullname.local, v);
  };
}

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(name, value) {
  var fullname = (0,_namespace_js__WEBPACK_IMPORTED_MODULE_0__["default"])(name);

  if (arguments.length < 2) {
    var node = this.node();
    return fullname.local
        ? node.getAttributeNS(fullname.space, fullname.local)
        : node.getAttribute(fullname);
  }

  return this.each((value == null
      ? (fullname.local ? attrRemoveNS : attrRemove) : (typeof value === "function"
      ? (fullname.local ? attrFunctionNS : attrFunction)
      : (fullname.local ? attrConstantNS : attrConstant)))(fullname, value));
}


/***/ }),

/***/ "./node_modules/d3-selection/src/selection/call.js":
/*!*********************************************************!*\
  !*** ./node_modules/d3-selection/src/selection/call.js ***!
  \*********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {
  var callback = arguments[0];
  arguments[0] = this;
  callback.apply(null, arguments);
  return this;
}


/***/ }),

/***/ "./node_modules/d3-selection/src/selection/classed.js":
/*!************************************************************!*\
  !*** ./node_modules/d3-selection/src/selection/classed.js ***!
  \************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function classArray(string) {
  return string.trim().split(/^|\s+/);
}

function classList(node) {
  return node.classList || new ClassList(node);
}

function ClassList(node) {
  this._node = node;
  this._names = classArray(node.getAttribute("class") || "");
}

ClassList.prototype = {
  add: function(name) {
    var i = this._names.indexOf(name);
    if (i < 0) {
      this._names.push(name);
      this._node.setAttribute("class", this._names.join(" "));
    }
  },
  remove: function(name) {
    var i = this._names.indexOf(name);
    if (i >= 0) {
      this._names.splice(i, 1);
      this._node.setAttribute("class", this._names.join(" "));
    }
  },
  contains: function(name) {
    return this._names.indexOf(name) >= 0;
  }
};

function classedAdd(node, names) {
  var list = classList(node), i = -1, n = names.length;
  while (++i < n) list.add(names[i]);
}

function classedRemove(node, names) {
  var list = classList(node), i = -1, n = names.length;
  while (++i < n) list.remove(names[i]);
}

function classedTrue(names) {
  return function() {
    classedAdd(this, names);
  };
}

function classedFalse(names) {
  return function() {
    classedRemove(this, names);
  };
}

function classedFunction(names, value) {
  return function() {
    (value.apply(this, arguments) ? classedAdd : classedRemove)(this, names);
  };
}

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(name, value) {
  var names = classArray(name + "");

  if (arguments.length < 2) {
    var list = classList(this.node()), i = -1, n = names.length;
    while (++i < n) if (!list.contains(names[i])) return false;
    return true;
  }

  return this.each((typeof value === "function"
      ? classedFunction : value
      ? classedTrue
      : classedFalse)(names, value));
}


/***/ }),

/***/ "./node_modules/d3-selection/src/selection/clone.js":
/*!**********************************************************!*\
  !*** ./node_modules/d3-selection/src/selection/clone.js ***!
  \**********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function selection_cloneShallow() {
  var clone = this.cloneNode(false), parent = this.parentNode;
  return parent ? parent.insertBefore(clone, this.nextSibling) : clone;
}

function selection_cloneDeep() {
  var clone = this.cloneNode(true), parent = this.parentNode;
  return parent ? parent.insertBefore(clone, this.nextSibling) : clone;
}

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(deep) {
  return this.select(deep ? selection_cloneDeep : selection_cloneShallow);
}


/***/ }),

/***/ "./node_modules/d3-selection/src/selection/data.js":
/*!*********************************************************!*\
  !*** ./node_modules/d3-selection/src/selection/data.js ***!
  \*********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./index.js */ "./node_modules/d3-selection/src/selection/index.js");
/* harmony import */ var _enter_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./enter.js */ "./node_modules/d3-selection/src/selection/enter.js");
/* harmony import */ var _constant_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../constant.js */ "./node_modules/d3-selection/src/constant.js");




function bindIndex(parent, group, enter, update, exit, data) {
  var i = 0,
      node,
      groupLength = group.length,
      dataLength = data.length;

  // Put any non-null nodes that fit into update.
  // Put any null nodes into enter.
  // Put any remaining data into enter.
  for (; i < dataLength; ++i) {
    if (node = group[i]) {
      node.__data__ = data[i];
      update[i] = node;
    } else {
      enter[i] = new _enter_js__WEBPACK_IMPORTED_MODULE_0__.EnterNode(parent, data[i]);
    }
  }

  // Put any non-null nodes that don’t fit into exit.
  for (; i < groupLength; ++i) {
    if (node = group[i]) {
      exit[i] = node;
    }
  }
}

function bindKey(parent, group, enter, update, exit, data, key) {
  var i,
      node,
      nodeByKeyValue = new Map,
      groupLength = group.length,
      dataLength = data.length,
      keyValues = new Array(groupLength),
      keyValue;

  // Compute the key for each node.
  // If multiple nodes have the same key, the duplicates are added to exit.
  for (i = 0; i < groupLength; ++i) {
    if (node = group[i]) {
      keyValues[i] = keyValue = key.call(node, node.__data__, i, group) + "";
      if (nodeByKeyValue.has(keyValue)) {
        exit[i] = node;
      } else {
        nodeByKeyValue.set(keyValue, node);
      }
    }
  }

  // Compute the key for each datum.
  // If there a node associated with this key, join and add it to update.
  // If there is not (or the key is a duplicate), add it to enter.
  for (i = 0; i < dataLength; ++i) {
    keyValue = key.call(parent, data[i], i, data) + "";
    if (node = nodeByKeyValue.get(keyValue)) {
      update[i] = node;
      node.__data__ = data[i];
      nodeByKeyValue.delete(keyValue);
    } else {
      enter[i] = new _enter_js__WEBPACK_IMPORTED_MODULE_0__.EnterNode(parent, data[i]);
    }
  }

  // Add any remaining nodes that were not bound to data to exit.
  for (i = 0; i < groupLength; ++i) {
    if ((node = group[i]) && (nodeByKeyValue.get(keyValues[i]) === node)) {
      exit[i] = node;
    }
  }
}

function datum(node) {
  return node.__data__;
}

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(value, key) {
  if (!arguments.length) return Array.from(this, datum);

  var bind = key ? bindKey : bindIndex,
      parents = this._parents,
      groups = this._groups;

  if (typeof value !== "function") value = (0,_constant_js__WEBPACK_IMPORTED_MODULE_1__["default"])(value);

  for (var m = groups.length, update = new Array(m), enter = new Array(m), exit = new Array(m), j = 0; j < m; ++j) {
    var parent = parents[j],
        group = groups[j],
        groupLength = group.length,
        data = arraylike(value.call(parent, parent && parent.__data__, j, parents)),
        dataLength = data.length,
        enterGroup = enter[j] = new Array(dataLength),
        updateGroup = update[j] = new Array(dataLength),
        exitGroup = exit[j] = new Array(groupLength);

    bind(parent, group, enterGroup, updateGroup, exitGroup, data, key);

    // Now connect the enter nodes to their following update node, such that
    // appendChild can insert the materialized enter node before this node,
    // rather than at the end of the parent node.
    for (var i0 = 0, i1 = 0, previous, next; i0 < dataLength; ++i0) {
      if (previous = enterGroup[i0]) {
        if (i0 >= i1) i1 = i0 + 1;
        while (!(next = updateGroup[i1]) && ++i1 < dataLength);
        previous._next = next || null;
      }
    }
  }

  update = new _index_js__WEBPACK_IMPORTED_MODULE_2__.Selection(update, parents);
  update._enter = enter;
  update._exit = exit;
  return update;
}

// Given some data, this returns an array-like view of it: an object that
// exposes a length property and allows numeric indexing. Note that unlike
// selectAll, this isn’t worried about “live” collections because the resulting
// array will only be used briefly while data is being bound. (It is possible to
// cause the data to change while iterating by using a key function, but please
// don’t; we’d rather avoid a gratuitous copy.)
function arraylike(data) {
  return typeof data === "object" && "length" in data
    ? data // Array, TypedArray, NodeList, array-like
    : Array.from(data); // Map, Set, iterable, string, or anything else
}


/***/ }),

/***/ "./node_modules/d3-selection/src/selection/datum.js":
/*!**********************************************************!*\
  !*** ./node_modules/d3-selection/src/selection/datum.js ***!
  \**********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(value) {
  return arguments.length
      ? this.property("__data__", value)
      : this.node().__data__;
}


/***/ }),

/***/ "./node_modules/d3-selection/src/selection/dispatch.js":
/*!*************************************************************!*\
  !*** ./node_modules/d3-selection/src/selection/dispatch.js ***!
  \*************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _window_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../window.js */ "./node_modules/d3-selection/src/window.js");


function dispatchEvent(node, type, params) {
  var window = (0,_window_js__WEBPACK_IMPORTED_MODULE_0__["default"])(node),
      event = window.CustomEvent;

  if (typeof event === "function") {
    event = new event(type, params);
  } else {
    event = window.document.createEvent("Event");
    if (params) event.initEvent(type, params.bubbles, params.cancelable), event.detail = params.detail;
    else event.initEvent(type, false, false);
  }

  node.dispatchEvent(event);
}

function dispatchConstant(type, params) {
  return function() {
    return dispatchEvent(this, type, params);
  };
}

function dispatchFunction(type, params) {
  return function() {
    return dispatchEvent(this, type, params.apply(this, arguments));
  };
}

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(type, params) {
  return this.each((typeof params === "function"
      ? dispatchFunction
      : dispatchConstant)(type, params));
}


/***/ }),

/***/ "./node_modules/d3-selection/src/selection/each.js":
/*!*********************************************************!*\
  !*** ./node_modules/d3-selection/src/selection/each.js ***!
  \*********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(callback) {

  for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {
    for (var group = groups[j], i = 0, n = group.length, node; i < n; ++i) {
      if (node = group[i]) callback.call(node, node.__data__, i, group);
    }
  }

  return this;
}


/***/ }),

/***/ "./node_modules/d3-selection/src/selection/empty.js":
/*!**********************************************************!*\
  !*** ./node_modules/d3-selection/src/selection/empty.js ***!
  \**********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {
  return !this.node();
}


/***/ }),

/***/ "./node_modules/d3-selection/src/selection/enter.js":
/*!**********************************************************!*\
  !*** ./node_modules/d3-selection/src/selection/enter.js ***!
  \**********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "EnterNode": () => (/* binding */ EnterNode)
/* harmony export */ });
/* harmony import */ var _sparse_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./sparse.js */ "./node_modules/d3-selection/src/selection/sparse.js");
/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.js */ "./node_modules/d3-selection/src/selection/index.js");



/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {
  return new _index_js__WEBPACK_IMPORTED_MODULE_0__.Selection(this._enter || this._groups.map(_sparse_js__WEBPACK_IMPORTED_MODULE_1__["default"]), this._parents);
}

function EnterNode(parent, datum) {
  this.ownerDocument = parent.ownerDocument;
  this.namespaceURI = parent.namespaceURI;
  this._next = null;
  this._parent = parent;
  this.__data__ = datum;
}

EnterNode.prototype = {
  constructor: EnterNode,
  appendChild: function(child) { return this._parent.insertBefore(child, this._next); },
  insertBefore: function(child, next) { return this._parent.insertBefore(child, next); },
  querySelector: function(selector) { return this._parent.querySelector(selector); },
  querySelectorAll: function(selector) { return this._parent.querySelectorAll(selector); }
};


/***/ }),

/***/ "./node_modules/d3-selection/src/selection/exit.js":
/*!*********************************************************!*\
  !*** ./node_modules/d3-selection/src/selection/exit.js ***!
  \*********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _sparse_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./sparse.js */ "./node_modules/d3-selection/src/selection/sparse.js");
/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.js */ "./node_modules/d3-selection/src/selection/index.js");



/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {
  return new _index_js__WEBPACK_IMPORTED_MODULE_0__.Selection(this._exit || this._groups.map(_sparse_js__WEBPACK_IMPORTED_MODULE_1__["default"]), this._parents);
}


/***/ }),

/***/ "./node_modules/d3-selection/src/selection/filter.js":
/*!***********************************************************!*\
  !*** ./node_modules/d3-selection/src/selection/filter.js ***!
  \***********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index.js */ "./node_modules/d3-selection/src/selection/index.js");
/* harmony import */ var _matcher_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../matcher.js */ "./node_modules/d3-selection/src/matcher.js");



/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(match) {
  if (typeof match !== "function") match = (0,_matcher_js__WEBPACK_IMPORTED_MODULE_0__["default"])(match);

  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = [], node, i = 0; i < n; ++i) {
      if ((node = group[i]) && match.call(node, node.__data__, i, group)) {
        subgroup.push(node);
      }
    }
  }

  return new _index_js__WEBPACK_IMPORTED_MODULE_1__.Selection(subgroups, this._parents);
}


/***/ }),

/***/ "./node_modules/d3-selection/src/selection/html.js":
/*!*********************************************************!*\
  !*** ./node_modules/d3-selection/src/selection/html.js ***!
  \*********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function htmlRemove() {
  this.innerHTML = "";
}

function htmlConstant(value) {
  return function() {
    this.innerHTML = value;
  };
}

function htmlFunction(value) {
  return function() {
    var v = value.apply(this, arguments);
    this.innerHTML = v == null ? "" : v;
  };
}

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(value) {
  return arguments.length
      ? this.each(value == null
          ? htmlRemove : (typeof value === "function"
          ? htmlFunction
          : htmlConstant)(value))
      : this.node().innerHTML;
}


/***/ }),

/***/ "./node_modules/d3-selection/src/selection/index.js":
/*!**********************************************************!*\
  !*** ./node_modules/d3-selection/src/selection/index.js ***!
  \**********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "root": () => (/* binding */ root),
/* harmony export */   "Selection": () => (/* binding */ Selection),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _select_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./select.js */ "./node_modules/d3-selection/src/selection/select.js");
/* harmony import */ var _selectAll_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./selectAll.js */ "./node_modules/d3-selection/src/selection/selectAll.js");
/* harmony import */ var _selectChild_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./selectChild.js */ "./node_modules/d3-selection/src/selection/selectChild.js");
/* harmony import */ var _selectChildren_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./selectChildren.js */ "./node_modules/d3-selection/src/selection/selectChildren.js");
/* harmony import */ var _filter_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./filter.js */ "./node_modules/d3-selection/src/selection/filter.js");
/* harmony import */ var _data_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./data.js */ "./node_modules/d3-selection/src/selection/data.js");
/* harmony import */ var _enter_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./enter.js */ "./node_modules/d3-selection/src/selection/enter.js");
/* harmony import */ var _exit_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./exit.js */ "./node_modules/d3-selection/src/selection/exit.js");
/* harmony import */ var _join_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./join.js */ "./node_modules/d3-selection/src/selection/join.js");
/* harmony import */ var _merge_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./merge.js */ "./node_modules/d3-selection/src/selection/merge.js");
/* harmony import */ var _order_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./order.js */ "./node_modules/d3-selection/src/selection/order.js");
/* harmony import */ var _sort_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./sort.js */ "./node_modules/d3-selection/src/selection/sort.js");
/* harmony import */ var _call_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./call.js */ "./node_modules/d3-selection/src/selection/call.js");
/* harmony import */ var _nodes_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./nodes.js */ "./node_modules/d3-selection/src/selection/nodes.js");
/* harmony import */ var _node_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./node.js */ "./node_modules/d3-selection/src/selection/node.js");
/* harmony import */ var _size_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./size.js */ "./node_modules/d3-selection/src/selection/size.js");
/* harmony import */ var _empty_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./empty.js */ "./node_modules/d3-selection/src/selection/empty.js");
/* harmony import */ var _each_js__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./each.js */ "./node_modules/d3-selection/src/selection/each.js");
/* harmony import */ var _attr_js__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./attr.js */ "./node_modules/d3-selection/src/selection/attr.js");
/* harmony import */ var _style_js__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./style.js */ "./node_modules/d3-selection/src/selection/style.js");
/* harmony import */ var _property_js__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./property.js */ "./node_modules/d3-selection/src/selection/property.js");
/* harmony import */ var _classed_js__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./classed.js */ "./node_modules/d3-selection/src/selection/classed.js");
/* harmony import */ var _text_js__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./text.js */ "./node_modules/d3-selection/src/selection/text.js");
/* harmony import */ var _html_js__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./html.js */ "./node_modules/d3-selection/src/selection/html.js");
/* harmony import */ var _raise_js__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./raise.js */ "./node_modules/d3-selection/src/selection/raise.js");
/* harmony import */ var _lower_js__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./lower.js */ "./node_modules/d3-selection/src/selection/lower.js");
/* harmony import */ var _append_js__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./append.js */ "./node_modules/d3-selection/src/selection/append.js");
/* harmony import */ var _insert_js__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./insert.js */ "./node_modules/d3-selection/src/selection/insert.js");
/* harmony import */ var _remove_js__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ./remove.js */ "./node_modules/d3-selection/src/selection/remove.js");
/* harmony import */ var _clone_js__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ./clone.js */ "./node_modules/d3-selection/src/selection/clone.js");
/* harmony import */ var _datum_js__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ./datum.js */ "./node_modules/d3-selection/src/selection/datum.js");
/* harmony import */ var _on_js__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! ./on.js */ "./node_modules/d3-selection/src/selection/on.js");
/* harmony import */ var _dispatch_js__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! ./dispatch.js */ "./node_modules/d3-selection/src/selection/dispatch.js");
/* harmony import */ var _iterator_js__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! ./iterator.js */ "./node_modules/d3-selection/src/selection/iterator.js");



































var root = [null];

function Selection(groups, parents) {
  this._groups = groups;
  this._parents = parents;
}

function selection() {
  return new Selection([[document.documentElement]], root);
}

function selection_selection() {
  return this;
}

Selection.prototype = selection.prototype = {
  constructor: Selection,
  select: _select_js__WEBPACK_IMPORTED_MODULE_0__["default"],
  selectAll: _selectAll_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  selectChild: _selectChild_js__WEBPACK_IMPORTED_MODULE_2__["default"],
  selectChildren: _selectChildren_js__WEBPACK_IMPORTED_MODULE_3__["default"],
  filter: _filter_js__WEBPACK_IMPORTED_MODULE_4__["default"],
  data: _data_js__WEBPACK_IMPORTED_MODULE_5__["default"],
  enter: _enter_js__WEBPACK_IMPORTED_MODULE_6__["default"],
  exit: _exit_js__WEBPACK_IMPORTED_MODULE_7__["default"],
  join: _join_js__WEBPACK_IMPORTED_MODULE_8__["default"],
  merge: _merge_js__WEBPACK_IMPORTED_MODULE_9__["default"],
  selection: selection_selection,
  order: _order_js__WEBPACK_IMPORTED_MODULE_10__["default"],
  sort: _sort_js__WEBPACK_IMPORTED_MODULE_11__["default"],
  call: _call_js__WEBPACK_IMPORTED_MODULE_12__["default"],
  nodes: _nodes_js__WEBPACK_IMPORTED_MODULE_13__["default"],
  node: _node_js__WEBPACK_IMPORTED_MODULE_14__["default"],
  size: _size_js__WEBPACK_IMPORTED_MODULE_15__["default"],
  empty: _empty_js__WEBPACK_IMPORTED_MODULE_16__["default"],
  each: _each_js__WEBPACK_IMPORTED_MODULE_17__["default"],
  attr: _attr_js__WEBPACK_IMPORTED_MODULE_18__["default"],
  style: _style_js__WEBPACK_IMPORTED_MODULE_19__["default"],
  property: _property_js__WEBPACK_IMPORTED_MODULE_20__["default"],
  classed: _classed_js__WEBPACK_IMPORTED_MODULE_21__["default"],
  text: _text_js__WEBPACK_IMPORTED_MODULE_22__["default"],
  html: _html_js__WEBPACK_IMPORTED_MODULE_23__["default"],
  raise: _raise_js__WEBPACK_IMPORTED_MODULE_24__["default"],
  lower: _lower_js__WEBPACK_IMPORTED_MODULE_25__["default"],
  append: _append_js__WEBPACK_IMPORTED_MODULE_26__["default"],
  insert: _insert_js__WEBPACK_IMPORTED_MODULE_27__["default"],
  remove: _remove_js__WEBPACK_IMPORTED_MODULE_28__["default"],
  clone: _clone_js__WEBPACK_IMPORTED_MODULE_29__["default"],
  datum: _datum_js__WEBPACK_IMPORTED_MODULE_30__["default"],
  on: _on_js__WEBPACK_IMPORTED_MODULE_31__["default"],
  dispatch: _dispatch_js__WEBPACK_IMPORTED_MODULE_32__["default"],
  [Symbol.iterator]: _iterator_js__WEBPACK_IMPORTED_MODULE_33__["default"]
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (selection);


/***/ }),

/***/ "./node_modules/d3-selection/src/selection/insert.js":
/*!***********************************************************!*\
  !*** ./node_modules/d3-selection/src/selection/insert.js ***!
  \***********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _creator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../creator.js */ "./node_modules/d3-selection/src/creator.js");
/* harmony import */ var _selector_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../selector.js */ "./node_modules/d3-selection/src/selector.js");



function constantNull() {
  return null;
}

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(name, before) {
  var create = typeof name === "function" ? name : (0,_creator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(name),
      select = before == null ? constantNull : typeof before === "function" ? before : (0,_selector_js__WEBPACK_IMPORTED_MODULE_1__["default"])(before);
  return this.select(function() {
    return this.insertBefore(create.apply(this, arguments), select.apply(this, arguments) || null);
  });
}


/***/ }),

/***/ "./node_modules/d3-selection/src/selection/iterator.js":
/*!*************************************************************!*\
  !*** ./node_modules/d3-selection/src/selection/iterator.js ***!
  \*************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ function* __WEBPACK_DEFAULT_EXPORT__() {
  for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {
    for (var group = groups[j], i = 0, n = group.length, node; i < n; ++i) {
      if (node = group[i]) yield node;
    }
  }
}


/***/ }),

/***/ "./node_modules/d3-selection/src/selection/join.js":
/*!*********************************************************!*\
  !*** ./node_modules/d3-selection/src/selection/join.js ***!
  \*********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(onenter, onupdate, onexit) {
  var enter = this.enter(), update = this, exit = this.exit();
  if (typeof onenter === "function") {
    enter = onenter(enter);
    if (enter) enter = enter.selection();
  } else {
    enter = enter.append(onenter + "");
  }
  if (onupdate != null) {
    update = onupdate(update);
    if (update) update = update.selection();
  }
  if (onexit == null) exit.remove(); else onexit(exit);
  return enter && update ? enter.merge(update).order() : update;
}


/***/ }),

/***/ "./node_modules/d3-selection/src/selection/lower.js":
/*!**********************************************************!*\
  !*** ./node_modules/d3-selection/src/selection/lower.js ***!
  \**********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function lower() {
  if (this.previousSibling) this.parentNode.insertBefore(this, this.parentNode.firstChild);
}

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {
  return this.each(lower);
}


/***/ }),

/***/ "./node_modules/d3-selection/src/selection/merge.js":
/*!**********************************************************!*\
  !*** ./node_modules/d3-selection/src/selection/merge.js ***!
  \**********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.js */ "./node_modules/d3-selection/src/selection/index.js");


/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(context) {
  var selection = context.selection ? context.selection() : context;

  for (var groups0 = this._groups, groups1 = selection._groups, m0 = groups0.length, m1 = groups1.length, m = Math.min(m0, m1), merges = new Array(m0), j = 0; j < m; ++j) {
    for (var group0 = groups0[j], group1 = groups1[j], n = group0.length, merge = merges[j] = new Array(n), node, i = 0; i < n; ++i) {
      if (node = group0[i] || group1[i]) {
        merge[i] = node;
      }
    }
  }

  for (; j < m0; ++j) {
    merges[j] = groups0[j];
  }

  return new _index_js__WEBPACK_IMPORTED_MODULE_0__.Selection(merges, this._parents);
}


/***/ }),

/***/ "./node_modules/d3-selection/src/selection/node.js":
/*!*********************************************************!*\
  !*** ./node_modules/d3-selection/src/selection/node.js ***!
  \*********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {

  for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {
    for (var group = groups[j], i = 0, n = group.length; i < n; ++i) {
      var node = group[i];
      if (node) return node;
    }
  }

  return null;
}


/***/ }),

/***/ "./node_modules/d3-selection/src/selection/nodes.js":
/*!**********************************************************!*\
  !*** ./node_modules/d3-selection/src/selection/nodes.js ***!
  \**********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {
  return Array.from(this);
}


/***/ }),

/***/ "./node_modules/d3-selection/src/selection/on.js":
/*!*******************************************************!*\
  !*** ./node_modules/d3-selection/src/selection/on.js ***!
  \*******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function contextListener(listener) {
  return function(event) {
    listener.call(this, event, this.__data__);
  };
}

function parseTypenames(typenames) {
  return typenames.trim().split(/^|\s+/).map(function(t) {
    var name = "", i = t.indexOf(".");
    if (i >= 0) name = t.slice(i + 1), t = t.slice(0, i);
    return {type: t, name: name};
  });
}

function onRemove(typename) {
  return function() {
    var on = this.__on;
    if (!on) return;
    for (var j = 0, i = -1, m = on.length, o; j < m; ++j) {
      if (o = on[j], (!typename.type || o.type === typename.type) && o.name === typename.name) {
        this.removeEventListener(o.type, o.listener, o.options);
      } else {
        on[++i] = o;
      }
    }
    if (++i) on.length = i;
    else delete this.__on;
  };
}

function onAdd(typename, value, options) {
  return function() {
    var on = this.__on, o, listener = contextListener(value);
    if (on) for (var j = 0, m = on.length; j < m; ++j) {
      if ((o = on[j]).type === typename.type && o.name === typename.name) {
        this.removeEventListener(o.type, o.listener, o.options);
        this.addEventListener(o.type, o.listener = listener, o.options = options);
        o.value = value;
        return;
      }
    }
    this.addEventListener(typename.type, listener, options);
    o = {type: typename.type, name: typename.name, value: value, listener: listener, options: options};
    if (!on) this.__on = [o];
    else on.push(o);
  };
}

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(typename, value, options) {
  var typenames = parseTypenames(typename + ""), i, n = typenames.length, t;

  if (arguments.length < 2) {
    var on = this.node().__on;
    if (on) for (var j = 0, m = on.length, o; j < m; ++j) {
      for (i = 0, o = on[j]; i < n; ++i) {
        if ((t = typenames[i]).type === o.type && t.name === o.name) {
          return o.value;
        }
      }
    }
    return;
  }

  on = value ? onAdd : onRemove;
  for (i = 0; i < n; ++i) this.each(on(typenames[i], value, options));
  return this;
}


/***/ }),

/***/ "./node_modules/d3-selection/src/selection/order.js":
/*!**********************************************************!*\
  !*** ./node_modules/d3-selection/src/selection/order.js ***!
  \**********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {

  for (var groups = this._groups, j = -1, m = groups.length; ++j < m;) {
    for (var group = groups[j], i = group.length - 1, next = group[i], node; --i >= 0;) {
      if (node = group[i]) {
        if (next && node.compareDocumentPosition(next) ^ 4) next.parentNode.insertBefore(node, next);
        next = node;
      }
    }
  }

  return this;
}


/***/ }),

/***/ "./node_modules/d3-selection/src/selection/property.js":
/*!*************************************************************!*\
  !*** ./node_modules/d3-selection/src/selection/property.js ***!
  \*************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function propertyRemove(name) {
  return function() {
    delete this[name];
  };
}

function propertyConstant(name, value) {
  return function() {
    this[name] = value;
  };
}

function propertyFunction(name, value) {
  return function() {
    var v = value.apply(this, arguments);
    if (v == null) delete this[name];
    else this[name] = v;
  };
}

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(name, value) {
  return arguments.length > 1
      ? this.each((value == null
          ? propertyRemove : typeof value === "function"
          ? propertyFunction
          : propertyConstant)(name, value))
      : this.node()[name];
}


/***/ }),

/***/ "./node_modules/d3-selection/src/selection/raise.js":
/*!**********************************************************!*\
  !*** ./node_modules/d3-selection/src/selection/raise.js ***!
  \**********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function raise() {
  if (this.nextSibling) this.parentNode.appendChild(this);
}

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {
  return this.each(raise);
}


/***/ }),

/***/ "./node_modules/d3-selection/src/selection/remove.js":
/*!***********************************************************!*\
  !*** ./node_modules/d3-selection/src/selection/remove.js ***!
  \***********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function remove() {
  var parent = this.parentNode;
  if (parent) parent.removeChild(this);
}

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {
  return this.each(remove);
}


/***/ }),

/***/ "./node_modules/d3-selection/src/selection/select.js":
/*!***********************************************************!*\
  !*** ./node_modules/d3-selection/src/selection/select.js ***!
  \***********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index.js */ "./node_modules/d3-selection/src/selection/index.js");
/* harmony import */ var _selector_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../selector.js */ "./node_modules/d3-selection/src/selector.js");



/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(select) {
  if (typeof select !== "function") select = (0,_selector_js__WEBPACK_IMPORTED_MODULE_0__["default"])(select);

  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = new Array(n), node, subnode, i = 0; i < n; ++i) {
      if ((node = group[i]) && (subnode = select.call(node, node.__data__, i, group))) {
        if ("__data__" in node) subnode.__data__ = node.__data__;
        subgroup[i] = subnode;
      }
    }
  }

  return new _index_js__WEBPACK_IMPORTED_MODULE_1__.Selection(subgroups, this._parents);
}


/***/ }),

/***/ "./node_modules/d3-selection/src/selection/selectAll.js":
/*!**************************************************************!*\
  !*** ./node_modules/d3-selection/src/selection/selectAll.js ***!
  \**************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./index.js */ "./node_modules/d3-selection/src/selection/index.js");
/* harmony import */ var _array_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../array.js */ "./node_modules/d3-selection/src/array.js");
/* harmony import */ var _selectorAll_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../selectorAll.js */ "./node_modules/d3-selection/src/selectorAll.js");




function arrayAll(select) {
  return function() {
    return (0,_array_js__WEBPACK_IMPORTED_MODULE_0__["default"])(select.apply(this, arguments));
  };
}

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(select) {
  if (typeof select === "function") select = arrayAll(select);
  else select = (0,_selectorAll_js__WEBPACK_IMPORTED_MODULE_1__["default"])(select);

  for (var groups = this._groups, m = groups.length, subgroups = [], parents = [], j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
      if (node = group[i]) {
        subgroups.push(select.call(node, node.__data__, i, group));
        parents.push(node);
      }
    }
  }

  return new _index_js__WEBPACK_IMPORTED_MODULE_2__.Selection(subgroups, parents);
}


/***/ }),

/***/ "./node_modules/d3-selection/src/selection/selectChild.js":
/*!****************************************************************!*\
  !*** ./node_modules/d3-selection/src/selection/selectChild.js ***!
  \****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _matcher_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../matcher.js */ "./node_modules/d3-selection/src/matcher.js");


var find = Array.prototype.find;

function childFind(match) {
  return function() {
    return find.call(this.children, match);
  };
}

function childFirst() {
  return this.firstElementChild;
}

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(match) {
  return this.select(match == null ? childFirst
      : childFind(typeof match === "function" ? match : (0,_matcher_js__WEBPACK_IMPORTED_MODULE_0__.childMatcher)(match)));
}


/***/ }),

/***/ "./node_modules/d3-selection/src/selection/selectChildren.js":
/*!*******************************************************************!*\
  !*** ./node_modules/d3-selection/src/selection/selectChildren.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _matcher_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../matcher.js */ "./node_modules/d3-selection/src/matcher.js");


var filter = Array.prototype.filter;

function children() {
  return Array.from(this.children);
}

function childrenFilter(match) {
  return function() {
    return filter.call(this.children, match);
  };
}

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(match) {
  return this.selectAll(match == null ? children
      : childrenFilter(typeof match === "function" ? match : (0,_matcher_js__WEBPACK_IMPORTED_MODULE_0__.childMatcher)(match)));
}


/***/ }),

/***/ "./node_modules/d3-selection/src/selection/size.js":
/*!*********************************************************!*\
  !*** ./node_modules/d3-selection/src/selection/size.js ***!
  \*********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {
  let size = 0;
  for (const node of this) ++size; // eslint-disable-line no-unused-vars
  return size;
}


/***/ }),

/***/ "./node_modules/d3-selection/src/selection/sort.js":
/*!*********************************************************!*\
  !*** ./node_modules/d3-selection/src/selection/sort.js ***!
  \*********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.js */ "./node_modules/d3-selection/src/selection/index.js");


/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(compare) {
  if (!compare) compare = ascending;

  function compareNode(a, b) {
    return a && b ? compare(a.__data__, b.__data__) : !a - !b;
  }

  for (var groups = this._groups, m = groups.length, sortgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, sortgroup = sortgroups[j] = new Array(n), node, i = 0; i < n; ++i) {
      if (node = group[i]) {
        sortgroup[i] = node;
      }
    }
    sortgroup.sort(compareNode);
  }

  return new _index_js__WEBPACK_IMPORTED_MODULE_0__.Selection(sortgroups, this._parents).order();
}

function ascending(a, b) {
  return a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
}


/***/ }),

/***/ "./node_modules/d3-selection/src/selection/sparse.js":
/*!***********************************************************!*\
  !*** ./node_modules/d3-selection/src/selection/sparse.js ***!
  \***********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(update) {
  return new Array(update.length);
}


/***/ }),

/***/ "./node_modules/d3-selection/src/selection/style.js":
/*!**********************************************************!*\
  !*** ./node_modules/d3-selection/src/selection/style.js ***!
  \**********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "styleValue": () => (/* binding */ styleValue)
/* harmony export */ });
/* harmony import */ var _window_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../window.js */ "./node_modules/d3-selection/src/window.js");


function styleRemove(name) {
  return function() {
    this.style.removeProperty(name);
  };
}

function styleConstant(name, value, priority) {
  return function() {
    this.style.setProperty(name, value, priority);
  };
}

function styleFunction(name, value, priority) {
  return function() {
    var v = value.apply(this, arguments);
    if (v == null) this.style.removeProperty(name);
    else this.style.setProperty(name, v, priority);
  };
}

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(name, value, priority) {
  return arguments.length > 1
      ? this.each((value == null
            ? styleRemove : typeof value === "function"
            ? styleFunction
            : styleConstant)(name, value, priority == null ? "" : priority))
      : styleValue(this.node(), name);
}

function styleValue(node, name) {
  return node.style.getPropertyValue(name)
      || (0,_window_js__WEBPACK_IMPORTED_MODULE_0__["default"])(node).getComputedStyle(node, null).getPropertyValue(name);
}


/***/ }),

/***/ "./node_modules/d3-selection/src/selection/text.js":
/*!*********************************************************!*\
  !*** ./node_modules/d3-selection/src/selection/text.js ***!
  \*********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function textRemove() {
  this.textContent = "";
}

function textConstant(value) {
  return function() {
    this.textContent = value;
  };
}

function textFunction(value) {
  return function() {
    var v = value.apply(this, arguments);
    this.textContent = v == null ? "" : v;
  };
}

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(value) {
  return arguments.length
      ? this.each(value == null
          ? textRemove : (typeof value === "function"
          ? textFunction
          : textConstant)(value))
      : this.node().textContent;
}


/***/ }),

/***/ "./node_modules/d3-selection/src/selector.js":
/*!***************************************************!*\
  !*** ./node_modules/d3-selection/src/selector.js ***!
  \***************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function none() {}

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(selector) {
  return selector == null ? none : function() {
    return this.querySelector(selector);
  };
}


/***/ }),

/***/ "./node_modules/d3-selection/src/selectorAll.js":
/*!******************************************************!*\
  !*** ./node_modules/d3-selection/src/selectorAll.js ***!
  \******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function empty() {
  return [];
}

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(selector) {
  return selector == null ? empty : function() {
    return this.querySelectorAll(selector);
  };
}


/***/ }),

/***/ "./node_modules/d3-selection/src/sourceEvent.js":
/*!******************************************************!*\
  !*** ./node_modules/d3-selection/src/sourceEvent.js ***!
  \******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(event) {
  let sourceEvent;
  while (sourceEvent = event.sourceEvent) event = sourceEvent;
  return event;
}


/***/ }),

/***/ "./node_modules/d3-selection/src/window.js":
/*!*************************************************!*\
  !*** ./node_modules/d3-selection/src/window.js ***!
  \*************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(node) {
  return (node.ownerDocument && node.ownerDocument.defaultView) // node is a Node
      || (node.document && node) // node is a Window
      || node.defaultView; // node is a Document
}


/***/ }),

/***/ "./node_modules/d3-timer/src/timeout.js":
/*!**********************************************!*\
  !*** ./node_modules/d3-timer/src/timeout.js ***!
  \**********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _timer_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./timer.js */ "./node_modules/d3-timer/src/timer.js");


/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(callback, delay, time) {
  var t = new _timer_js__WEBPACK_IMPORTED_MODULE_0__.Timer;
  delay = delay == null ? 0 : +delay;
  t.restart(elapsed => {
    t.stop();
    callback(elapsed + delay);
  }, delay, time);
  return t;
}


/***/ }),

/***/ "./node_modules/d3-timer/src/timer.js":
/*!********************************************!*\
  !*** ./node_modules/d3-timer/src/timer.js ***!
  \********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "now": () => (/* binding */ now),
/* harmony export */   "Timer": () => (/* binding */ Timer),
/* harmony export */   "timer": () => (/* binding */ timer),
/* harmony export */   "timerFlush": () => (/* binding */ timerFlush)
/* harmony export */ });
var frame = 0, // is an animation frame pending?
    timeout = 0, // is a timeout pending?
    interval = 0, // are any timers active?
    pokeDelay = 1000, // how frequently we check for clock skew
    taskHead,
    taskTail,
    clockLast = 0,
    clockNow = 0,
    clockSkew = 0,
    clock = typeof performance === "object" && performance.now ? performance : Date,
    setFrame = typeof window === "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(f) { setTimeout(f, 17); };

function now() {
  return clockNow || (setFrame(clearNow), clockNow = clock.now() + clockSkew);
}

function clearNow() {
  clockNow = 0;
}

function Timer() {
  this._call =
  this._time =
  this._next = null;
}

Timer.prototype = timer.prototype = {
  constructor: Timer,
  restart: function(callback, delay, time) {
    if (typeof callback !== "function") throw new TypeError("callback is not a function");
    time = (time == null ? now() : +time) + (delay == null ? 0 : +delay);
    if (!this._next && taskTail !== this) {
      if (taskTail) taskTail._next = this;
      else taskHead = this;
      taskTail = this;
    }
    this._call = callback;
    this._time = time;
    sleep();
  },
  stop: function() {
    if (this._call) {
      this._call = null;
      this._time = Infinity;
      sleep();
    }
  }
};

function timer(callback, delay, time) {
  var t = new Timer;
  t.restart(callback, delay, time);
  return t;
}

function timerFlush() {
  now(); // Get the current time, if not already set.
  ++frame; // Pretend we’ve set an alarm, if we haven’t already.
  var t = taskHead, e;
  while (t) {
    if ((e = clockNow - t._time) >= 0) t._call.call(undefined, e);
    t = t._next;
  }
  --frame;
}

function wake() {
  clockNow = (clockLast = clock.now()) + clockSkew;
  frame = timeout = 0;
  try {
    timerFlush();
  } finally {
    frame = 0;
    nap();
    clockNow = 0;
  }
}

function poke() {
  var now = clock.now(), delay = now - clockLast;
  if (delay > pokeDelay) clockSkew -= delay, clockLast = now;
}

function nap() {
  var t0, t1 = taskHead, t2, time = Infinity;
  while (t1) {
    if (t1._call) {
      if (time > t1._time) time = t1._time;
      t0 = t1, t1 = t1._next;
    } else {
      t2 = t1._next, t1._next = null;
      t1 = t0 ? t0._next = t2 : taskHead = t2;
    }
  }
  taskTail = t0;
  sleep(time);
}

function sleep(time) {
  if (frame) return; // Soonest alarm already set, or will be.
  if (timeout) timeout = clearTimeout(timeout);
  var delay = time - clockNow; // Strictly less than if we recomputed clockNow.
  if (delay > 24) {
    if (time < Infinity) timeout = setTimeout(wake, time - clock.now() - clockSkew);
    if (interval) interval = clearInterval(interval);
  } else {
    if (!interval) clockLast = clock.now(), interval = setInterval(poke, pokeDelay);
    frame = 1, setFrame(wake);
  }
}


/***/ }),

/***/ "./node_modules/d3-transition/src/active.js":
/*!**************************************************!*\
  !*** ./node_modules/d3-transition/src/active.js ***!
  \**************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _transition_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./transition/index.js */ "./node_modules/d3-transition/src/transition/index.js");
/* harmony import */ var _transition_schedule_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./transition/schedule.js */ "./node_modules/d3-transition/src/transition/schedule.js");



var root = [null];

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(node, name) {
  var schedules = node.__transition,
      schedule,
      i;

  if (schedules) {
    name = name == null ? null : name + "";
    for (i in schedules) {
      if ((schedule = schedules[i]).state > _transition_schedule_js__WEBPACK_IMPORTED_MODULE_0__.SCHEDULED && schedule.name === name) {
        return new _transition_index_js__WEBPACK_IMPORTED_MODULE_1__.Transition([[node]], root, name, +i);
      }
    }
  }

  return null;
}


/***/ }),

/***/ "./node_modules/d3-transition/src/index.js":
/*!*************************************************!*\
  !*** ./node_modules/d3-transition/src/index.js ***!
  \*************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "transition": () => (/* reexport safe */ _transition_index_js__WEBPACK_IMPORTED_MODULE_1__["default"]),
/* harmony export */   "active": () => (/* reexport safe */ _active_js__WEBPACK_IMPORTED_MODULE_2__["default"]),
/* harmony export */   "interrupt": () => (/* reexport safe */ _interrupt_js__WEBPACK_IMPORTED_MODULE_3__["default"])
/* harmony export */ });
/* harmony import */ var _selection_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./selection/index.js */ "./node_modules/d3-transition/src/selection/index.js");
/* harmony import */ var _transition_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./transition/index.js */ "./node_modules/d3-transition/src/transition/index.js");
/* harmony import */ var _active_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./active.js */ "./node_modules/d3-transition/src/active.js");
/* harmony import */ var _interrupt_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./interrupt.js */ "./node_modules/d3-transition/src/interrupt.js");






/***/ }),

/***/ "./node_modules/d3-transition/src/interrupt.js":
/*!*****************************************************!*\
  !*** ./node_modules/d3-transition/src/interrupt.js ***!
  \*****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _transition_schedule_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./transition/schedule.js */ "./node_modules/d3-transition/src/transition/schedule.js");


/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(node, name) {
  var schedules = node.__transition,
      schedule,
      active,
      empty = true,
      i;

  if (!schedules) return;

  name = name == null ? null : name + "";

  for (i in schedules) {
    if ((schedule = schedules[i]).name !== name) { empty = false; continue; }
    active = schedule.state > _transition_schedule_js__WEBPACK_IMPORTED_MODULE_0__.STARTING && schedule.state < _transition_schedule_js__WEBPACK_IMPORTED_MODULE_0__.ENDING;
    schedule.state = _transition_schedule_js__WEBPACK_IMPORTED_MODULE_0__.ENDED;
    schedule.timer.stop();
    schedule.on.call(active ? "interrupt" : "cancel", node, node.__data__, schedule.index, schedule.group);
    delete schedules[i];
  }

  if (empty) delete node.__transition;
}


/***/ }),

/***/ "./node_modules/d3-transition/src/selection/index.js":
/*!***********************************************************!*\
  !*** ./node_modules/d3-transition/src/selection/index.js ***!
  \***********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var d3_selection__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! d3-selection */ "./node_modules/d3-selection/src/selection/index.js");
/* harmony import */ var _interrupt_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./interrupt.js */ "./node_modules/d3-transition/src/selection/interrupt.js");
/* harmony import */ var _transition_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./transition.js */ "./node_modules/d3-transition/src/selection/transition.js");




d3_selection__WEBPACK_IMPORTED_MODULE_0__["default"].prototype.interrupt = _interrupt_js__WEBPACK_IMPORTED_MODULE_1__["default"];
d3_selection__WEBPACK_IMPORTED_MODULE_0__["default"].prototype.transition = _transition_js__WEBPACK_IMPORTED_MODULE_2__["default"];


/***/ }),

/***/ "./node_modules/d3-transition/src/selection/interrupt.js":
/*!***************************************************************!*\
  !*** ./node_modules/d3-transition/src/selection/interrupt.js ***!
  \***************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _interrupt_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../interrupt.js */ "./node_modules/d3-transition/src/interrupt.js");


/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(name) {
  return this.each(function() {
    (0,_interrupt_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, name);
  });
}


/***/ }),

/***/ "./node_modules/d3-transition/src/selection/transition.js":
/*!****************************************************************!*\
  !*** ./node_modules/d3-transition/src/selection/transition.js ***!
  \****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _transition_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../transition/index.js */ "./node_modules/d3-transition/src/transition/index.js");
/* harmony import */ var _transition_schedule_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../transition/schedule.js */ "./node_modules/d3-transition/src/transition/schedule.js");
/* harmony import */ var d3_ease__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! d3-ease */ "./node_modules/d3-ease/src/cubic.js");
/* harmony import */ var d3_timer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! d3-timer */ "./node_modules/d3-timer/src/timer.js");





var defaultTiming = {
  time: null, // Set on use.
  delay: 0,
  duration: 250,
  ease: d3_ease__WEBPACK_IMPORTED_MODULE_0__.cubicInOut
};

function inherit(node, id) {
  var timing;
  while (!(timing = node.__transition) || !(timing = timing[id])) {
    if (!(node = node.parentNode)) {
      throw new Error(`transition ${id} not found`);
    }
  }
  return timing;
}

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(name) {
  var id,
      timing;

  if (name instanceof _transition_index_js__WEBPACK_IMPORTED_MODULE_1__.Transition) {
    id = name._id, name = name._name;
  } else {
    id = (0,_transition_index_js__WEBPACK_IMPORTED_MODULE_1__.newId)(), (timing = defaultTiming).time = (0,d3_timer__WEBPACK_IMPORTED_MODULE_2__.now)(), name = name == null ? null : name + "";
  }

  for (var groups = this._groups, m = groups.length, j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
      if (node = group[i]) {
        (0,_transition_schedule_js__WEBPACK_IMPORTED_MODULE_3__["default"])(node, name, id, i, group, timing || inherit(node, id));
      }
    }
  }

  return new _transition_index_js__WEBPACK_IMPORTED_MODULE_1__.Transition(groups, this._parents, name, id);
}


/***/ }),

/***/ "./node_modules/d3-transition/src/transition/attr.js":
/*!***********************************************************!*\
  !*** ./node_modules/d3-transition/src/transition/attr.js ***!
  \***********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var d3_interpolate__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! d3-interpolate */ "./node_modules/d3-interpolate/src/transform/index.js");
/* harmony import */ var d3_selection__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! d3-selection */ "./node_modules/d3-selection/src/namespace.js");
/* harmony import */ var _tween_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./tween.js */ "./node_modules/d3-transition/src/transition/tween.js");
/* harmony import */ var _interpolate_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./interpolate.js */ "./node_modules/d3-transition/src/transition/interpolate.js");





function attrRemove(name) {
  return function() {
    this.removeAttribute(name);
  };
}

function attrRemoveNS(fullname) {
  return function() {
    this.removeAttributeNS(fullname.space, fullname.local);
  };
}

function attrConstant(name, interpolate, value1) {
  var string00,
      string1 = value1 + "",
      interpolate0;
  return function() {
    var string0 = this.getAttribute(name);
    return string0 === string1 ? null
        : string0 === string00 ? interpolate0
        : interpolate0 = interpolate(string00 = string0, value1);
  };
}

function attrConstantNS(fullname, interpolate, value1) {
  var string00,
      string1 = value1 + "",
      interpolate0;
  return function() {
    var string0 = this.getAttributeNS(fullname.space, fullname.local);
    return string0 === string1 ? null
        : string0 === string00 ? interpolate0
        : interpolate0 = interpolate(string00 = string0, value1);
  };
}

function attrFunction(name, interpolate, value) {
  var string00,
      string10,
      interpolate0;
  return function() {
    var string0, value1 = value(this), string1;
    if (value1 == null) return void this.removeAttribute(name);
    string0 = this.getAttribute(name);
    string1 = value1 + "";
    return string0 === string1 ? null
        : string0 === string00 && string1 === string10 ? interpolate0
        : (string10 = string1, interpolate0 = interpolate(string00 = string0, value1));
  };
}

function attrFunctionNS(fullname, interpolate, value) {
  var string00,
      string10,
      interpolate0;
  return function() {
    var string0, value1 = value(this), string1;
    if (value1 == null) return void this.removeAttributeNS(fullname.space, fullname.local);
    string0 = this.getAttributeNS(fullname.space, fullname.local);
    string1 = value1 + "";
    return string0 === string1 ? null
        : string0 === string00 && string1 === string10 ? interpolate0
        : (string10 = string1, interpolate0 = interpolate(string00 = string0, value1));
  };
}

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(name, value) {
  var fullname = (0,d3_selection__WEBPACK_IMPORTED_MODULE_0__["default"])(name), i = fullname === "transform" ? d3_interpolate__WEBPACK_IMPORTED_MODULE_1__.interpolateTransformSvg : _interpolate_js__WEBPACK_IMPORTED_MODULE_2__["default"];
  return this.attrTween(name, typeof value === "function"
      ? (fullname.local ? attrFunctionNS : attrFunction)(fullname, i, (0,_tween_js__WEBPACK_IMPORTED_MODULE_3__.tweenValue)(this, "attr." + name, value))
      : value == null ? (fullname.local ? attrRemoveNS : attrRemove)(fullname)
      : (fullname.local ? attrConstantNS : attrConstant)(fullname, i, value));
}


/***/ }),

/***/ "./node_modules/d3-transition/src/transition/attrTween.js":
/*!****************************************************************!*\
  !*** ./node_modules/d3-transition/src/transition/attrTween.js ***!
  \****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var d3_selection__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! d3-selection */ "./node_modules/d3-selection/src/namespace.js");


function attrInterpolate(name, i) {
  return function(t) {
    this.setAttribute(name, i.call(this, t));
  };
}

function attrInterpolateNS(fullname, i) {
  return function(t) {
    this.setAttributeNS(fullname.space, fullname.local, i.call(this, t));
  };
}

function attrTweenNS(fullname, value) {
  var t0, i0;
  function tween() {
    var i = value.apply(this, arguments);
    if (i !== i0) t0 = (i0 = i) && attrInterpolateNS(fullname, i);
    return t0;
  }
  tween._value = value;
  return tween;
}

function attrTween(name, value) {
  var t0, i0;
  function tween() {
    var i = value.apply(this, arguments);
    if (i !== i0) t0 = (i0 = i) && attrInterpolate(name, i);
    return t0;
  }
  tween._value = value;
  return tween;
}

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(name, value) {
  var key = "attr." + name;
  if (arguments.length < 2) return (key = this.tween(key)) && key._value;
  if (value == null) return this.tween(key, null);
  if (typeof value !== "function") throw new Error;
  var fullname = (0,d3_selection__WEBPACK_IMPORTED_MODULE_0__["default"])(name);
  return this.tween(key, (fullname.local ? attrTweenNS : attrTween)(fullname, value));
}


/***/ }),

/***/ "./node_modules/d3-transition/src/transition/delay.js":
/*!************************************************************!*\
  !*** ./node_modules/d3-transition/src/transition/delay.js ***!
  \************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _schedule_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./schedule.js */ "./node_modules/d3-transition/src/transition/schedule.js");


function delayFunction(id, value) {
  return function() {
    (0,_schedule_js__WEBPACK_IMPORTED_MODULE_0__.init)(this, id).delay = +value.apply(this, arguments);
  };
}

function delayConstant(id, value) {
  return value = +value, function() {
    (0,_schedule_js__WEBPACK_IMPORTED_MODULE_0__.init)(this, id).delay = value;
  };
}

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(value) {
  var id = this._id;

  return arguments.length
      ? this.each((typeof value === "function"
          ? delayFunction
          : delayConstant)(id, value))
      : (0,_schedule_js__WEBPACK_IMPORTED_MODULE_0__.get)(this.node(), id).delay;
}


/***/ }),

/***/ "./node_modules/d3-transition/src/transition/duration.js":
/*!***************************************************************!*\
  !*** ./node_modules/d3-transition/src/transition/duration.js ***!
  \***************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _schedule_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./schedule.js */ "./node_modules/d3-transition/src/transition/schedule.js");


function durationFunction(id, value) {
  return function() {
    (0,_schedule_js__WEBPACK_IMPORTED_MODULE_0__.set)(this, id).duration = +value.apply(this, arguments);
  };
}

function durationConstant(id, value) {
  return value = +value, function() {
    (0,_schedule_js__WEBPACK_IMPORTED_MODULE_0__.set)(this, id).duration = value;
  };
}

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(value) {
  var id = this._id;

  return arguments.length
      ? this.each((typeof value === "function"
          ? durationFunction
          : durationConstant)(id, value))
      : (0,_schedule_js__WEBPACK_IMPORTED_MODULE_0__.get)(this.node(), id).duration;
}


/***/ }),

/***/ "./node_modules/d3-transition/src/transition/ease.js":
/*!***********************************************************!*\
  !*** ./node_modules/d3-transition/src/transition/ease.js ***!
  \***********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _schedule_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./schedule.js */ "./node_modules/d3-transition/src/transition/schedule.js");


function easeConstant(id, value) {
  if (typeof value !== "function") throw new Error;
  return function() {
    (0,_schedule_js__WEBPACK_IMPORTED_MODULE_0__.set)(this, id).ease = value;
  };
}

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(value) {
  var id = this._id;

  return arguments.length
      ? this.each(easeConstant(id, value))
      : (0,_schedule_js__WEBPACK_IMPORTED_MODULE_0__.get)(this.node(), id).ease;
}


/***/ }),

/***/ "./node_modules/d3-transition/src/transition/easeVarying.js":
/*!******************************************************************!*\
  !*** ./node_modules/d3-transition/src/transition/easeVarying.js ***!
  \******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _schedule_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./schedule.js */ "./node_modules/d3-transition/src/transition/schedule.js");


function easeVarying(id, value) {
  return function() {
    var v = value.apply(this, arguments);
    if (typeof v !== "function") throw new Error;
    (0,_schedule_js__WEBPACK_IMPORTED_MODULE_0__.set)(this, id).ease = v;
  };
}

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(value) {
  if (typeof value !== "function") throw new Error;
  return this.each(easeVarying(this._id, value));
}


/***/ }),

/***/ "./node_modules/d3-transition/src/transition/end.js":
/*!**********************************************************!*\
  !*** ./node_modules/d3-transition/src/transition/end.js ***!
  \**********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _schedule_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./schedule.js */ "./node_modules/d3-transition/src/transition/schedule.js");


/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {
  var on0, on1, that = this, id = that._id, size = that.size();
  return new Promise(function(resolve, reject) {
    var cancel = {value: reject},
        end = {value: function() { if (--size === 0) resolve(); }};

    that.each(function() {
      var schedule = (0,_schedule_js__WEBPACK_IMPORTED_MODULE_0__.set)(this, id),
          on = schedule.on;

      // If this node shared a dispatch with the previous node,
      // just assign the updated shared dispatch and we’re done!
      // Otherwise, copy-on-write.
      if (on !== on0) {
        on1 = (on0 = on).copy();
        on1._.cancel.push(cancel);
        on1._.interrupt.push(cancel);
        on1._.end.push(end);
      }

      schedule.on = on1;
    });

    // The selection was empty, resolve end immediately
    if (size === 0) resolve();
  });
}


/***/ }),

/***/ "./node_modules/d3-transition/src/transition/filter.js":
/*!*************************************************************!*\
  !*** ./node_modules/d3-transition/src/transition/filter.js ***!
  \*************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var d3_selection__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! d3-selection */ "./node_modules/d3-selection/src/matcher.js");
/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index.js */ "./node_modules/d3-transition/src/transition/index.js");



/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(match) {
  if (typeof match !== "function") match = (0,d3_selection__WEBPACK_IMPORTED_MODULE_0__["default"])(match);

  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = [], node, i = 0; i < n; ++i) {
      if ((node = group[i]) && match.call(node, node.__data__, i, group)) {
        subgroup.push(node);
      }
    }
  }

  return new _index_js__WEBPACK_IMPORTED_MODULE_1__.Transition(subgroups, this._parents, this._name, this._id);
}


/***/ }),

/***/ "./node_modules/d3-transition/src/transition/index.js":
/*!************************************************************!*\
  !*** ./node_modules/d3-transition/src/transition/index.js ***!
  \************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Transition": () => (/* binding */ Transition),
/* harmony export */   "default": () => (/* binding */ transition),
/* harmony export */   "newId": () => (/* binding */ newId)
/* harmony export */ });
/* harmony import */ var d3_selection__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! d3-selection */ "./node_modules/d3-selection/src/selection/index.js");
/* harmony import */ var _attr_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./attr.js */ "./node_modules/d3-transition/src/transition/attr.js");
/* harmony import */ var _attrTween_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./attrTween.js */ "./node_modules/d3-transition/src/transition/attrTween.js");
/* harmony import */ var _delay_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./delay.js */ "./node_modules/d3-transition/src/transition/delay.js");
/* harmony import */ var _duration_js__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./duration.js */ "./node_modules/d3-transition/src/transition/duration.js");
/* harmony import */ var _ease_js__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./ease.js */ "./node_modules/d3-transition/src/transition/ease.js");
/* harmony import */ var _easeVarying_js__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./easeVarying.js */ "./node_modules/d3-transition/src/transition/easeVarying.js");
/* harmony import */ var _filter_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./filter.js */ "./node_modules/d3-transition/src/transition/filter.js");
/* harmony import */ var _merge_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./merge.js */ "./node_modules/d3-transition/src/transition/merge.js");
/* harmony import */ var _on_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./on.js */ "./node_modules/d3-transition/src/transition/on.js");
/* harmony import */ var _remove_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./remove.js */ "./node_modules/d3-transition/src/transition/remove.js");
/* harmony import */ var _select_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./select.js */ "./node_modules/d3-transition/src/transition/select.js");
/* harmony import */ var _selectAll_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./selectAll.js */ "./node_modules/d3-transition/src/transition/selectAll.js");
/* harmony import */ var _selection_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./selection.js */ "./node_modules/d3-transition/src/transition/selection.js");
/* harmony import */ var _style_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./style.js */ "./node_modules/d3-transition/src/transition/style.js");
/* harmony import */ var _styleTween_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./styleTween.js */ "./node_modules/d3-transition/src/transition/styleTween.js");
/* harmony import */ var _text_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./text.js */ "./node_modules/d3-transition/src/transition/text.js");
/* harmony import */ var _textTween_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./textTween.js */ "./node_modules/d3-transition/src/transition/textTween.js");
/* harmony import */ var _transition_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./transition.js */ "./node_modules/d3-transition/src/transition/transition.js");
/* harmony import */ var _tween_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./tween.js */ "./node_modules/d3-transition/src/transition/tween.js");
/* harmony import */ var _end_js__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./end.js */ "./node_modules/d3-transition/src/transition/end.js");






















var id = 0;

function Transition(groups, parents, name, id) {
  this._groups = groups;
  this._parents = parents;
  this._name = name;
  this._id = id;
}

function transition(name) {
  return (0,d3_selection__WEBPACK_IMPORTED_MODULE_0__["default"])().transition(name);
}

function newId() {
  return ++id;
}

var selection_prototype = d3_selection__WEBPACK_IMPORTED_MODULE_0__["default"].prototype;

Transition.prototype = transition.prototype = {
  constructor: Transition,
  select: _select_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  selectAll: _selectAll_js__WEBPACK_IMPORTED_MODULE_2__["default"],
  selectChild: selection_prototype.selectChild,
  selectChildren: selection_prototype.selectChildren,
  filter: _filter_js__WEBPACK_IMPORTED_MODULE_3__["default"],
  merge: _merge_js__WEBPACK_IMPORTED_MODULE_4__["default"],
  selection: _selection_js__WEBPACK_IMPORTED_MODULE_5__["default"],
  transition: _transition_js__WEBPACK_IMPORTED_MODULE_6__["default"],
  call: selection_prototype.call,
  nodes: selection_prototype.nodes,
  node: selection_prototype.node,
  size: selection_prototype.size,
  empty: selection_prototype.empty,
  each: selection_prototype.each,
  on: _on_js__WEBPACK_IMPORTED_MODULE_7__["default"],
  attr: _attr_js__WEBPACK_IMPORTED_MODULE_8__["default"],
  attrTween: _attrTween_js__WEBPACK_IMPORTED_MODULE_9__["default"],
  style: _style_js__WEBPACK_IMPORTED_MODULE_10__["default"],
  styleTween: _styleTween_js__WEBPACK_IMPORTED_MODULE_11__["default"],
  text: _text_js__WEBPACK_IMPORTED_MODULE_12__["default"],
  textTween: _textTween_js__WEBPACK_IMPORTED_MODULE_13__["default"],
  remove: _remove_js__WEBPACK_IMPORTED_MODULE_14__["default"],
  tween: _tween_js__WEBPACK_IMPORTED_MODULE_15__["default"],
  delay: _delay_js__WEBPACK_IMPORTED_MODULE_16__["default"],
  duration: _duration_js__WEBPACK_IMPORTED_MODULE_17__["default"],
  ease: _ease_js__WEBPACK_IMPORTED_MODULE_18__["default"],
  easeVarying: _easeVarying_js__WEBPACK_IMPORTED_MODULE_19__["default"],
  end: _end_js__WEBPACK_IMPORTED_MODULE_20__["default"],
  [Symbol.iterator]: selection_prototype[Symbol.iterator]
};


/***/ }),

/***/ "./node_modules/d3-transition/src/transition/interpolate.js":
/*!******************************************************************!*\
  !*** ./node_modules/d3-transition/src/transition/interpolate.js ***!
  \******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var d3_color__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! d3-color */ "./node_modules/d3-color/src/color.js");
/* harmony import */ var d3_interpolate__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! d3-interpolate */ "./node_modules/d3-interpolate/src/number.js");
/* harmony import */ var d3_interpolate__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! d3-interpolate */ "./node_modules/d3-interpolate/src/rgb.js");
/* harmony import */ var d3_interpolate__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! d3-interpolate */ "./node_modules/d3-interpolate/src/string.js");



/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(a, b) {
  var c;
  return (typeof b === "number" ? d3_interpolate__WEBPACK_IMPORTED_MODULE_0__["default"]
      : b instanceof d3_color__WEBPACK_IMPORTED_MODULE_1__["default"] ? d3_interpolate__WEBPACK_IMPORTED_MODULE_2__["default"]
      : (c = (0,d3_color__WEBPACK_IMPORTED_MODULE_1__["default"])(b)) ? (b = c, d3_interpolate__WEBPACK_IMPORTED_MODULE_2__["default"])
      : d3_interpolate__WEBPACK_IMPORTED_MODULE_3__["default"])(a, b);
}


/***/ }),

/***/ "./node_modules/d3-transition/src/transition/merge.js":
/*!************************************************************!*\
  !*** ./node_modules/d3-transition/src/transition/merge.js ***!
  \************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.js */ "./node_modules/d3-transition/src/transition/index.js");


/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(transition) {
  if (transition._id !== this._id) throw new Error;

  for (var groups0 = this._groups, groups1 = transition._groups, m0 = groups0.length, m1 = groups1.length, m = Math.min(m0, m1), merges = new Array(m0), j = 0; j < m; ++j) {
    for (var group0 = groups0[j], group1 = groups1[j], n = group0.length, merge = merges[j] = new Array(n), node, i = 0; i < n; ++i) {
      if (node = group0[i] || group1[i]) {
        merge[i] = node;
      }
    }
  }

  for (; j < m0; ++j) {
    merges[j] = groups0[j];
  }

  return new _index_js__WEBPACK_IMPORTED_MODULE_0__.Transition(merges, this._parents, this._name, this._id);
}


/***/ }),

/***/ "./node_modules/d3-transition/src/transition/on.js":
/*!*********************************************************!*\
  !*** ./node_modules/d3-transition/src/transition/on.js ***!
  \*********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _schedule_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./schedule.js */ "./node_modules/d3-transition/src/transition/schedule.js");


function start(name) {
  return (name + "").trim().split(/^|\s+/).every(function(t) {
    var i = t.indexOf(".");
    if (i >= 0) t = t.slice(0, i);
    return !t || t === "start";
  });
}

function onFunction(id, name, listener) {
  var on0, on1, sit = start(name) ? _schedule_js__WEBPACK_IMPORTED_MODULE_0__.init : _schedule_js__WEBPACK_IMPORTED_MODULE_0__.set;
  return function() {
    var schedule = sit(this, id),
        on = schedule.on;

    // If this node shared a dispatch with the previous node,
    // just assign the updated shared dispatch and we’re done!
    // Otherwise, copy-on-write.
    if (on !== on0) (on1 = (on0 = on).copy()).on(name, listener);

    schedule.on = on1;
  };
}

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(name, listener) {
  var id = this._id;

  return arguments.length < 2
      ? (0,_schedule_js__WEBPACK_IMPORTED_MODULE_0__.get)(this.node(), id).on.on(name)
      : this.each(onFunction(id, name, listener));
}


/***/ }),

/***/ "./node_modules/d3-transition/src/transition/remove.js":
/*!*************************************************************!*\
  !*** ./node_modules/d3-transition/src/transition/remove.js ***!
  \*************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function removeFunction(id) {
  return function() {
    var parent = this.parentNode;
    for (var i in this.__transition) if (+i !== id) return;
    if (parent) parent.removeChild(this);
  };
}

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {
  return this.on("end.remove", removeFunction(this._id));
}


/***/ }),

/***/ "./node_modules/d3-transition/src/transition/schedule.js":
/*!***************************************************************!*\
  !*** ./node_modules/d3-transition/src/transition/schedule.js ***!
  \***************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CREATED": () => (/* binding */ CREATED),
/* harmony export */   "SCHEDULED": () => (/* binding */ SCHEDULED),
/* harmony export */   "STARTING": () => (/* binding */ STARTING),
/* harmony export */   "STARTED": () => (/* binding */ STARTED),
/* harmony export */   "RUNNING": () => (/* binding */ RUNNING),
/* harmony export */   "ENDING": () => (/* binding */ ENDING),
/* harmony export */   "ENDED": () => (/* binding */ ENDED),
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "init": () => (/* binding */ init),
/* harmony export */   "set": () => (/* binding */ set),
/* harmony export */   "get": () => (/* binding */ get)
/* harmony export */ });
/* harmony import */ var d3_dispatch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! d3-dispatch */ "./node_modules/d3-dispatch/src/dispatch.js");
/* harmony import */ var d3_timer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! d3-timer */ "./node_modules/d3-timer/src/timer.js");
/* harmony import */ var d3_timer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! d3-timer */ "./node_modules/d3-timer/src/timeout.js");



var emptyOn = (0,d3_dispatch__WEBPACK_IMPORTED_MODULE_0__["default"])("start", "end", "cancel", "interrupt");
var emptyTween = [];

var CREATED = 0;
var SCHEDULED = 1;
var STARTING = 2;
var STARTED = 3;
var RUNNING = 4;
var ENDING = 5;
var ENDED = 6;

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(node, name, id, index, group, timing) {
  var schedules = node.__transition;
  if (!schedules) node.__transition = {};
  else if (id in schedules) return;
  create(node, id, {
    name: name,
    index: index, // For context during callback.
    group: group, // For context during callback.
    on: emptyOn,
    tween: emptyTween,
    time: timing.time,
    delay: timing.delay,
    duration: timing.duration,
    ease: timing.ease,
    timer: null,
    state: CREATED
  });
}

function init(node, id) {
  var schedule = get(node, id);
  if (schedule.state > CREATED) throw new Error("too late; already scheduled");
  return schedule;
}

function set(node, id) {
  var schedule = get(node, id);
  if (schedule.state > STARTED) throw new Error("too late; already running");
  return schedule;
}

function get(node, id) {
  var schedule = node.__transition;
  if (!schedule || !(schedule = schedule[id])) throw new Error("transition not found");
  return schedule;
}

function create(node, id, self) {
  var schedules = node.__transition,
      tween;

  // Initialize the self timer when the transition is created.
  // Note the actual delay is not known until the first callback!
  schedules[id] = self;
  self.timer = (0,d3_timer__WEBPACK_IMPORTED_MODULE_1__.timer)(schedule, 0, self.time);

  function schedule(elapsed) {
    self.state = SCHEDULED;
    self.timer.restart(start, self.delay, self.time);

    // If the elapsed delay is less than our first sleep, start immediately.
    if (self.delay <= elapsed) start(elapsed - self.delay);
  }

  function start(elapsed) {
    var i, j, n, o;

    // If the state is not SCHEDULED, then we previously errored on start.
    if (self.state !== SCHEDULED) return stop();

    for (i in schedules) {
      o = schedules[i];
      if (o.name !== self.name) continue;

      // While this element already has a starting transition during this frame,
      // defer starting an interrupting transition until that transition has a
      // chance to tick (and possibly end); see d3/d3-transition#54!
      if (o.state === STARTED) return (0,d3_timer__WEBPACK_IMPORTED_MODULE_2__["default"])(start);

      // Interrupt the active transition, if any.
      if (o.state === RUNNING) {
        o.state = ENDED;
        o.timer.stop();
        o.on.call("interrupt", node, node.__data__, o.index, o.group);
        delete schedules[i];
      }

      // Cancel any pre-empted transitions.
      else if (+i < id) {
        o.state = ENDED;
        o.timer.stop();
        o.on.call("cancel", node, node.__data__, o.index, o.group);
        delete schedules[i];
      }
    }

    // Defer the first tick to end of the current frame; see d3/d3#1576.
    // Note the transition may be canceled after start and before the first tick!
    // Note this must be scheduled before the start event; see d3/d3-transition#16!
    // Assuming this is successful, subsequent callbacks go straight to tick.
    (0,d3_timer__WEBPACK_IMPORTED_MODULE_2__["default"])(function() {
      if (self.state === STARTED) {
        self.state = RUNNING;
        self.timer.restart(tick, self.delay, self.time);
        tick(elapsed);
      }
    });

    // Dispatch the start event.
    // Note this must be done before the tween are initialized.
    self.state = STARTING;
    self.on.call("start", node, node.__data__, self.index, self.group);
    if (self.state !== STARTING) return; // interrupted
    self.state = STARTED;

    // Initialize the tween, deleting null tween.
    tween = new Array(n = self.tween.length);
    for (i = 0, j = -1; i < n; ++i) {
      if (o = self.tween[i].value.call(node, node.__data__, self.index, self.group)) {
        tween[++j] = o;
      }
    }
    tween.length = j + 1;
  }

  function tick(elapsed) {
    var t = elapsed < self.duration ? self.ease.call(null, elapsed / self.duration) : (self.timer.restart(stop), self.state = ENDING, 1),
        i = -1,
        n = tween.length;

    while (++i < n) {
      tween[i].call(node, t);
    }

    // Dispatch the end event.
    if (self.state === ENDING) {
      self.on.call("end", node, node.__data__, self.index, self.group);
      stop();
    }
  }

  function stop() {
    self.state = ENDED;
    self.timer.stop();
    delete schedules[id];
    for (var i in schedules) return; // eslint-disable-line no-unused-vars
    delete node.__transition;
  }
}


/***/ }),

/***/ "./node_modules/d3-transition/src/transition/select.js":
/*!*************************************************************!*\
  !*** ./node_modules/d3-transition/src/transition/select.js ***!
  \*************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var d3_selection__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! d3-selection */ "./node_modules/d3-selection/src/selector.js");
/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./index.js */ "./node_modules/d3-transition/src/transition/index.js");
/* harmony import */ var _schedule_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./schedule.js */ "./node_modules/d3-transition/src/transition/schedule.js");




/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(select) {
  var name = this._name,
      id = this._id;

  if (typeof select !== "function") select = (0,d3_selection__WEBPACK_IMPORTED_MODULE_0__["default"])(select);

  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = new Array(n), node, subnode, i = 0; i < n; ++i) {
      if ((node = group[i]) && (subnode = select.call(node, node.__data__, i, group))) {
        if ("__data__" in node) subnode.__data__ = node.__data__;
        subgroup[i] = subnode;
        (0,_schedule_js__WEBPACK_IMPORTED_MODULE_1__["default"])(subgroup[i], name, id, i, subgroup, (0,_schedule_js__WEBPACK_IMPORTED_MODULE_1__.get)(node, id));
      }
    }
  }

  return new _index_js__WEBPACK_IMPORTED_MODULE_2__.Transition(subgroups, this._parents, name, id);
}


/***/ }),

/***/ "./node_modules/d3-transition/src/transition/selectAll.js":
/*!****************************************************************!*\
  !*** ./node_modules/d3-transition/src/transition/selectAll.js ***!
  \****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var d3_selection__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! d3-selection */ "./node_modules/d3-selection/src/selectorAll.js");
/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./index.js */ "./node_modules/d3-transition/src/transition/index.js");
/* harmony import */ var _schedule_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./schedule.js */ "./node_modules/d3-transition/src/transition/schedule.js");




/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(select) {
  var name = this._name,
      id = this._id;

  if (typeof select !== "function") select = (0,d3_selection__WEBPACK_IMPORTED_MODULE_0__["default"])(select);

  for (var groups = this._groups, m = groups.length, subgroups = [], parents = [], j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
      if (node = group[i]) {
        for (var children = select.call(node, node.__data__, i, group), child, inherit = (0,_schedule_js__WEBPACK_IMPORTED_MODULE_1__.get)(node, id), k = 0, l = children.length; k < l; ++k) {
          if (child = children[k]) {
            (0,_schedule_js__WEBPACK_IMPORTED_MODULE_1__["default"])(child, name, id, k, children, inherit);
          }
        }
        subgroups.push(children);
        parents.push(node);
      }
    }
  }

  return new _index_js__WEBPACK_IMPORTED_MODULE_2__.Transition(subgroups, parents, name, id);
}


/***/ }),

/***/ "./node_modules/d3-transition/src/transition/selection.js":
/*!****************************************************************!*\
  !*** ./node_modules/d3-transition/src/transition/selection.js ***!
  \****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var d3_selection__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! d3-selection */ "./node_modules/d3-selection/src/selection/index.js");


var Selection = d3_selection__WEBPACK_IMPORTED_MODULE_0__["default"].prototype.constructor;

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {
  return new Selection(this._groups, this._parents);
}


/***/ }),

/***/ "./node_modules/d3-transition/src/transition/style.js":
/*!************************************************************!*\
  !*** ./node_modules/d3-transition/src/transition/style.js ***!
  \************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var d3_interpolate__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! d3-interpolate */ "./node_modules/d3-interpolate/src/transform/index.js");
/* harmony import */ var d3_selection__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! d3-selection */ "./node_modules/d3-selection/src/selection/style.js");
/* harmony import */ var _schedule_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./schedule.js */ "./node_modules/d3-transition/src/transition/schedule.js");
/* harmony import */ var _tween_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./tween.js */ "./node_modules/d3-transition/src/transition/tween.js");
/* harmony import */ var _interpolate_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./interpolate.js */ "./node_modules/d3-transition/src/transition/interpolate.js");






function styleNull(name, interpolate) {
  var string00,
      string10,
      interpolate0;
  return function() {
    var string0 = (0,d3_selection__WEBPACK_IMPORTED_MODULE_0__.styleValue)(this, name),
        string1 = (this.style.removeProperty(name), (0,d3_selection__WEBPACK_IMPORTED_MODULE_0__.styleValue)(this, name));
    return string0 === string1 ? null
        : string0 === string00 && string1 === string10 ? interpolate0
        : interpolate0 = interpolate(string00 = string0, string10 = string1);
  };
}

function styleRemove(name) {
  return function() {
    this.style.removeProperty(name);
  };
}

function styleConstant(name, interpolate, value1) {
  var string00,
      string1 = value1 + "",
      interpolate0;
  return function() {
    var string0 = (0,d3_selection__WEBPACK_IMPORTED_MODULE_0__.styleValue)(this, name);
    return string0 === string1 ? null
        : string0 === string00 ? interpolate0
        : interpolate0 = interpolate(string00 = string0, value1);
  };
}

function styleFunction(name, interpolate, value) {
  var string00,
      string10,
      interpolate0;
  return function() {
    var string0 = (0,d3_selection__WEBPACK_IMPORTED_MODULE_0__.styleValue)(this, name),
        value1 = value(this),
        string1 = value1 + "";
    if (value1 == null) string1 = value1 = (this.style.removeProperty(name), (0,d3_selection__WEBPACK_IMPORTED_MODULE_0__.styleValue)(this, name));
    return string0 === string1 ? null
        : string0 === string00 && string1 === string10 ? interpolate0
        : (string10 = string1, interpolate0 = interpolate(string00 = string0, value1));
  };
}

function styleMaybeRemove(id, name) {
  var on0, on1, listener0, key = "style." + name, event = "end." + key, remove;
  return function() {
    var schedule = (0,_schedule_js__WEBPACK_IMPORTED_MODULE_1__.set)(this, id),
        on = schedule.on,
        listener = schedule.value[key] == null ? remove || (remove = styleRemove(name)) : undefined;

    // If this node shared a dispatch with the previous node,
    // just assign the updated shared dispatch and we’re done!
    // Otherwise, copy-on-write.
    if (on !== on0 || listener0 !== listener) (on1 = (on0 = on).copy()).on(event, listener0 = listener);

    schedule.on = on1;
  };
}

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(name, value, priority) {
  var i = (name += "") === "transform" ? d3_interpolate__WEBPACK_IMPORTED_MODULE_2__.interpolateTransformCss : _interpolate_js__WEBPACK_IMPORTED_MODULE_3__["default"];
  return value == null ? this
      .styleTween(name, styleNull(name, i))
      .on("end.style." + name, styleRemove(name))
    : typeof value === "function" ? this
      .styleTween(name, styleFunction(name, i, (0,_tween_js__WEBPACK_IMPORTED_MODULE_4__.tweenValue)(this, "style." + name, value)))
      .each(styleMaybeRemove(this._id, name))
    : this
      .styleTween(name, styleConstant(name, i, value), priority)
      .on("end.style." + name, null);
}


/***/ }),

/***/ "./node_modules/d3-transition/src/transition/styleTween.js":
/*!*****************************************************************!*\
  !*** ./node_modules/d3-transition/src/transition/styleTween.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function styleInterpolate(name, i, priority) {
  return function(t) {
    this.style.setProperty(name, i.call(this, t), priority);
  };
}

function styleTween(name, value, priority) {
  var t, i0;
  function tween() {
    var i = value.apply(this, arguments);
    if (i !== i0) t = (i0 = i) && styleInterpolate(name, i, priority);
    return t;
  }
  tween._value = value;
  return tween;
}

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(name, value, priority) {
  var key = "style." + (name += "");
  if (arguments.length < 2) return (key = this.tween(key)) && key._value;
  if (value == null) return this.tween(key, null);
  if (typeof value !== "function") throw new Error;
  return this.tween(key, styleTween(name, value, priority == null ? "" : priority));
}


/***/ }),

/***/ "./node_modules/d3-transition/src/transition/text.js":
/*!***********************************************************!*\
  !*** ./node_modules/d3-transition/src/transition/text.js ***!
  \***********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _tween_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tween.js */ "./node_modules/d3-transition/src/transition/tween.js");


function textConstant(value) {
  return function() {
    this.textContent = value;
  };
}

function textFunction(value) {
  return function() {
    var value1 = value(this);
    this.textContent = value1 == null ? "" : value1;
  };
}

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(value) {
  return this.tween("text", typeof value === "function"
      ? textFunction((0,_tween_js__WEBPACK_IMPORTED_MODULE_0__.tweenValue)(this, "text", value))
      : textConstant(value == null ? "" : value + ""));
}


/***/ }),

/***/ "./node_modules/d3-transition/src/transition/textTween.js":
/*!****************************************************************!*\
  !*** ./node_modules/d3-transition/src/transition/textTween.js ***!
  \****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function textInterpolate(i) {
  return function(t) {
    this.textContent = i.call(this, t);
  };
}

function textTween(value) {
  var t0, i0;
  function tween() {
    var i = value.apply(this, arguments);
    if (i !== i0) t0 = (i0 = i) && textInterpolate(i);
    return t0;
  }
  tween._value = value;
  return tween;
}

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(value) {
  var key = "text";
  if (arguments.length < 1) return (key = this.tween(key)) && key._value;
  if (value == null) return this.tween(key, null);
  if (typeof value !== "function") throw new Error;
  return this.tween(key, textTween(value));
}


/***/ }),

/***/ "./node_modules/d3-transition/src/transition/transition.js":
/*!*****************************************************************!*\
  !*** ./node_modules/d3-transition/src/transition/transition.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.js */ "./node_modules/d3-transition/src/transition/index.js");
/* harmony import */ var _schedule_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./schedule.js */ "./node_modules/d3-transition/src/transition/schedule.js");



/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {
  var name = this._name,
      id0 = this._id,
      id1 = (0,_index_js__WEBPACK_IMPORTED_MODULE_0__.newId)();

  for (var groups = this._groups, m = groups.length, j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
      if (node = group[i]) {
        var inherit = (0,_schedule_js__WEBPACK_IMPORTED_MODULE_1__.get)(node, id0);
        (0,_schedule_js__WEBPACK_IMPORTED_MODULE_1__["default"])(node, name, id1, i, group, {
          time: inherit.time + inherit.delay + inherit.duration,
          delay: 0,
          duration: inherit.duration,
          ease: inherit.ease
        });
      }
    }
  }

  return new _index_js__WEBPACK_IMPORTED_MODULE_0__.Transition(groups, this._parents, name, id1);
}


/***/ }),

/***/ "./node_modules/d3-transition/src/transition/tween.js":
/*!************************************************************!*\
  !*** ./node_modules/d3-transition/src/transition/tween.js ***!
  \************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "tweenValue": () => (/* binding */ tweenValue)
/* harmony export */ });
/* harmony import */ var _schedule_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./schedule.js */ "./node_modules/d3-transition/src/transition/schedule.js");


function tweenRemove(id, name) {
  var tween0, tween1;
  return function() {
    var schedule = (0,_schedule_js__WEBPACK_IMPORTED_MODULE_0__.set)(this, id),
        tween = schedule.tween;

    // If this node shared tween with the previous node,
    // just assign the updated shared tween and we’re done!
    // Otherwise, copy-on-write.
    if (tween !== tween0) {
      tween1 = tween0 = tween;
      for (var i = 0, n = tween1.length; i < n; ++i) {
        if (tween1[i].name === name) {
          tween1 = tween1.slice();
          tween1.splice(i, 1);
          break;
        }
      }
    }

    schedule.tween = tween1;
  };
}

function tweenFunction(id, name, value) {
  var tween0, tween1;
  if (typeof value !== "function") throw new Error;
  return function() {
    var schedule = (0,_schedule_js__WEBPACK_IMPORTED_MODULE_0__.set)(this, id),
        tween = schedule.tween;

    // If this node shared tween with the previous node,
    // just assign the updated shared tween and we’re done!
    // Otherwise, copy-on-write.
    if (tween !== tween0) {
      tween1 = (tween0 = tween).slice();
      for (var t = {name: name, value: value}, i = 0, n = tween1.length; i < n; ++i) {
        if (tween1[i].name === name) {
          tween1[i] = t;
          break;
        }
      }
      if (i === n) tween1.push(t);
    }

    schedule.tween = tween1;
  };
}

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(name, value) {
  var id = this._id;

  name += "";

  if (arguments.length < 2) {
    var tween = (0,_schedule_js__WEBPACK_IMPORTED_MODULE_0__.get)(this.node(), id).tween;
    for (var i = 0, n = tween.length, t; i < n; ++i) {
      if ((t = tween[i]).name === name) {
        return t.value;
      }
    }
    return null;
  }

  return this.each((value == null ? tweenRemove : tweenFunction)(id, name, value));
}

function tweenValue(transition, name, value) {
  var id = transition._id;

  transition.each(function() {
    var schedule = (0,_schedule_js__WEBPACK_IMPORTED_MODULE_0__.set)(this, id);
    (schedule.value || (schedule.value = {}))[name] = value.apply(this, arguments);
  });

  return function(node) {
    return (0,_schedule_js__WEBPACK_IMPORTED_MODULE_0__.get)(node, id).value[name];
  };
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!***********************************!*\
  !*** ./srcjs/widgets/topogram.js ***!
  \***********************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var widgets__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! widgets */ "widgets");
/* harmony import */ var widgets__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(widgets__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var cartogram_chart__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! cartogram-chart */ "./node_modules/cartogram-chart/dist/cartogram-chart.module.js");
/* harmony import */ var topojson_client__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! topojson-client */ "./node_modules/topojson-client/src/index.js");
/* harmony import */ var d3_geo__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! d3-geo */ "./node_modules/d3-geo/src/index.js");
/* harmony import */ var d3_geo_projection__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! d3-geo-projection */ "./node_modules/d3-geo-projection/src/index.js");
/* harmony import */ var _modules_utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../modules/utils */ "./srcjs/modules/utils.js");
/* harmony import */ var _modules_proxy__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../modules/proxy */ "./srcjs/modules/proxy.js");





const proj = { ...d3_geo__WEBPACK_IMPORTED_MODULE_3__, ...d3_geo_projection__WEBPACK_IMPORTED_MODULE_4__ };



HTMLWidgets.widget({

  name: 'topogram',

  type: 'output',

  factory: function(el, width, height) {

    var carto,
      statesbbox,
      projection,
      topoWidth,
      topoHeight;

    var padding = 20;

    return {

      renderValue: function(x) {
        
        if (typeof carto !== "undefined") {
          document.getElementById(el.id + "-topogram").innerHTML = "";
        }

        // Set labs (title, subtitle, caption)
        _modules_utils__WEBPACK_IMPORTED_MODULE_5__.setLabs(el.id, x.labs, x.labsOpts);
        
        if (x.legend) {
          el.innerHTML += x.legendOpts.content;
        }

        // sizing
        topoWidth = el.clientWidth - padding;
        topoHeight = el.clientHeight - padding;

        projection = proj[x.projection]();
        statesbbox = topojson_client__WEBPACK_IMPORTED_MODULE_2__.feature(x.sfobj, x.sfobj.objects.states);
        projection.fitExtent(
          [[padding, padding], [topoWidth, topoHeight]],
          statesbbox
        );

        carto = (0,cartogram_chart__WEBPACK_IMPORTED_MODULE_1__["default"])()
          .width(el.clientWidth)
          .height(el.clientHeight)
          .topoJson(x.sfobj)
          .topoObjectName("states")
          .projection(projection)
          .iterations(x.n_iteration)
          .value(function(d) {
            var value = d.properties[x.value];
            if (value <= 0) {
              value = 0.001;
            }
            return value;
          })
          .color(function(d) {
            return d.properties.topogram_color;
          })
          .tooltipContent(function(d) {
            return d.properties.topogram_label;
          })
          .valFormatter(function() {
           return "";
          })(
          document.getElementById(el.id + "-topogram")
        );

        if (HTMLWidgets.shinyMode) {
          carto.onClick(function(d) {
            if (x.layerId === null) {
              Shiny.onInputChange(el.id + "_click", d.properties);
            } else {
              Shiny.onInputChange(
                el.id + "_click",
                x.layerId[d.properties.topogram_id]
              );
            }
          });
        }

      },

      getTopogram: function() {
        return carto;
      },

      resize: function(width, height) {
        topoWidth = width - padding;
        topoHeight = height - padding;
        projection.fitExtent(
          [[padding, padding], [topoWidth, topoHeight]],
          statesbbox
        );
        carto
          .width(width)
          .height(height)
          .projection(projection);
      }

    };
  }
});

if (HTMLWidgets.shinyMode) {
  Shiny.addCustomMessageHandler("proxy-topogram-variable", _modules_proxy__WEBPACK_IMPORTED_MODULE_6__.updateVariable);
}

})();

/******/ })()
;