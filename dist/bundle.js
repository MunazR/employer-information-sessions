/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = React;

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = moment;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var moment = __webpack_require__(1);
var Session_1 = __webpack_require__(4);
var App = (function (_super) {
    __extends(App, _super);
    function App() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.dataURL = 'https://api.uwaterloo.ca/v2/resources/infosessions.json?key=8ba5813a8da454869db638eec2845e0e';
        _this.state = {
            isLoading: true,
            sessions: []
        };
        return _this;
    }
    App.prototype.componentWillMount = function () {
        var _this = this;
        fetch(this.dataURL)
            .then(function (response) { return response.json(); })
            .then(function (responseJSON) {
            var sessions = [];
            responseJSON.data.forEach(function (session) {
                sessions.push(session);
            });
            _this.setState({
                isLoading: false,
                sessions: sessions
            });
        });
    };
    App.prototype.render = function () {
        var _a = this.state, isLoading = _a.isLoading, sessions = _a.sessions;
        var date = this.props.date;
        var todaySessions = sessions.filter(function (session) {
            var sessionDate = moment(session.date);
            var momentDate = moment(date);
            return sessionDate.dayOfYear() === momentDate.dayOfYear();
        });
        todaySessions.sort(function (a, b) {
            var aStartDate = Date.parse(a.date + ' ' + a.start_time);
            var bStartDate = Date.parse(b.date + ' ' + b.start_time);
            return aStartDate - bStartDate;
        });
        var sessionCards = todaySessions.map(function (session, index) {
            return React.createElement(Session_1.SessionCard, __assign({ key: index }, session));
        });
        return (React.createElement("div", { id: "content" },
            isLoading && React.createElement("div", { id: "p2", className: "mdl-progress mdl-js-progress mdl-progress__indeterminate" }),
            !isLoading && React.createElement("h4", { className: "align-center" }, moment(date).format('dddd MMMM Do')),
            !isLoading && todaySessions.length === 0 && React.createElement("h4", { className: "align-center" }, "No employer information sessions"),
            !isLoading && todaySessions.length !== 0 && React.createElement("div", { className: "mdl-grid" }, sessionCards)));
    };
    return App;
}(React.Component));
exports.App = App;


/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = ReactDOM;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var moment = __webpack_require__(1);
var SessionCard = (function (_super) {
    __extends(SessionCard, _super);
    function SessionCard() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.getImageURL = function () {
            var buildingCode = _this.props.building.code;
            switch (buildingCode) {
                case 'TC':
                    return './images/locations/TC.jpg';
                case 'DC':
                    return './images/locations/DC.jpg';
                case 'FED':
                    return './images/locations/FED.jpg';
                case 'SLC':
                    return './images/locations/SLC.jpg';
                case 'UC':
                    return './images/locations/UC.jpg';
                default:
                    return './images/locations/NA.jpg';
            }
        };
        _this.getStartTime = function () {
            return moment(_this.props.date + ' ' + _this.props.start_time).format('LT');
        };
        _this.getEndTime = function () {
            return moment(_this.props.date + ' ' + _this.props.end_time).format('LT');
        };
        return _this;
    }
    SessionCard.prototype.render = function () {
        var now = new Date();
        var end = new Date(this.props.date + ' ' + this.props.end_time);
        var register = null;
        if (now.valueOf() - end.valueOf() < 0) {
            register = React.createElement("a", { target: "_blank", href: this.props.link }, "Register");
        }
        else {
            register = React.createElement("a", { target: "_blank", className: "disabled", href: this.props.link }, "Register");
        }
        return (React.createElement("section", { className: "mdl-card section--center mdl-grid mdl-grid--no-spacing mdl-shadow--2dp" },
            React.createElement("div", { className: "mdl-card__title" },
                React.createElement("h2", { className: "mdl-card__title-text" }, this.props.employer)),
            React.createElement("div", { className: "mdl-card__media" },
                React.createElement("img", { className: 'employer-image', src: this.getImageURL(), alt: "" })),
            React.createElement("div", { className: "mdl-card__supporting-text" },
                React.createElement("div", null,
                    this.getStartTime(),
                    " - ",
                    this.getEndTime()),
                this.props.building.code && this.props.building.code.length &&
                    React.createElement("a", { href: this.props.building.map_url, target: "_blank" },
                        React.createElement("i", { className: "material-icons align-middle" }, "map"),
                        React.createElement("span", { className: "align-middle" },
                            this.props.building.code,
                            " ",
                            this.props.building.room))),
            React.createElement("div", { className: "mdl-card__actions" }, register)));
    };
    return SessionCard;
}(React.Component));
exports.SessionCard = SessionCard;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var ReactDOM = __webpack_require__(3);
var moment = __webpack_require__(1);
var App_1 = __webpack_require__(2);
var today = moment().toDate();
var tomorrow = moment().add(1, 'days').toDate();
ReactDOM.render(React.createElement(App_1.App, { date: today }), document.getElementById("today"));
ReactDOM.render(React.createElement(App_1.App, { date: tomorrow }), document.getElementById("tomorrow"));


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map