"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("pages/_app",{

/***/ "./src/Components/List.jsx":
/*!*********************************!*\
  !*** ./src/Components/List.jsx ***!
  \*********************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ List; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _web3uikit_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @web3uikit/core */ \"./node_modules/@web3uikit/core/dist/index.es.js\");\n\n\n\n\nfunction List() {\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: \"user--list\",\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_web3uikit_core__WEBPACK_IMPORTED_MODULE_1__.Table, {\n            columnsConfig: \"80px 3fr 2fr 2fr 80px\",\n            data: [\n                [\n                    \"hello\",\n                    f\n                ]\n            ],\n            header: [\n                \"\",\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"span\", {\n                    children: \"Name\"\n                }, void 0, false, {\n                    fileName: \"/workspaces/graph/src/Components/List.jsx\",\n                    lineNumber: 17,\n                    columnNumber: 21\n                }, void 0),\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"span\", {\n                    children: \"Type\"\n                }, void 0, false, {\n                    fileName: \"/workspaces/graph/src/Components/List.jsx\",\n                    lineNumber: 18,\n                    columnNumber: 21\n                }, void 0),\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"span\", {\n                    children: \"Module\"\n                }, void 0, false, {\n                    fileName: \"/workspaces/graph/src/Components/List.jsx\",\n                    lineNumber: 19,\n                    columnNumber: 21\n                }, void 0),\n                \"\"\n            ],\n            isColumnSortable: [\n                false,\n                true,\n                false,\n                false\n            ],\n            maxPages: 3,\n            onPageNumberChanged: function noRefCheck() {},\n            onRowClick: function noRefCheck() {},\n            pageSize: 5\n        }, void 0, false, {\n            fileName: \"/workspaces/graph/src/Components/List.jsx\",\n            lineNumber: 8,\n            columnNumber: 13\n        }, this)\n    }, void 0, false, {\n        fileName: \"/workspaces/graph/src/Components/List.jsx\",\n        lineNumber: 7,\n        columnNumber: 9\n    }, this);\n}\n_c = List;\nvar _c;\n$RefreshReg$(_c, \"List\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvQ29tcG9uZW50cy9MaXN0LmpzeCIsIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUF3QztBQUNIO0FBQ0g7QUFFbkIsU0FBU0c7SUFDcEIscUJBQ0ksOERBQUNDO1FBQUlDLFdBQVU7a0JBQ1gsNEVBQUNMLGtEQUFLQTtZQUNGTSxlQUFjO1lBQ2RDLE1BQU07Z0JBQ0Y7b0JBQ0k7b0JBQVNDO2lCQUNaO2FBQ0o7WUFDREMsUUFBUTtnQkFDSjs4QkFDQSw4REFBQ0M7OEJBQUs7Ozs7Ozs4QkFDTiw4REFBQ0E7OEJBQUs7Ozs7Ozs4QkFDTiw4REFBQ0E7OEJBQUs7Ozs7OztnQkFDTjthQUNIO1lBQ0RDLGtCQUFrQjtnQkFDZDtnQkFDQTtnQkFDQTtnQkFDQTthQUNIO1lBQ0RDLFVBQVU7WUFDVkMscUJBQXFCLFNBQVNDLGNBQWU7WUFDN0NDLFlBQVksU0FBU0QsY0FBZTtZQUNwQ0UsVUFBVTs7Ozs7Ozs7Ozs7QUFJMUI7S0E5QndCYiIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9zcmMvQ29tcG9uZW50cy9MaXN0LmpzeD9kMGZmIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFRhYmxlIH0gZnJvbSBcIkB3ZWIzdWlraXQvY29yZVwiO1xuaW1wb3J0IEF2YXRhciBmcm9tIFwiQHdlYjN1aWtpdC9jb3JlXCI7XG5pbXBvcnQgVGFnIGZyb20gXCJAd2ViM3Vpa2l0L2NvcmVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gTGlzdCgpIHtcbiAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInVzZXItLWxpc3RcIj5cbiAgICAgICAgICAgIDxUYWJsZVxuICAgICAgICAgICAgICAgIGNvbHVtbnNDb25maWc9XCI4MHB4IDNmciAyZnIgMmZyIDgwcHhcIlxuICAgICAgICAgICAgICAgIGRhdGE9e1tcbiAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJoZWxsb1wiLCBmXG4gICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICBdfVxuICAgICAgICAgICAgICAgIGhlYWRlcj17W1xuICAgICAgICAgICAgICAgICAgICAnJyxcbiAgICAgICAgICAgICAgICAgICAgPHNwYW4+TmFtZTwvc3Bhbj4sXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuPlR5cGU8L3NwYW4+LFxuICAgICAgICAgICAgICAgICAgICA8c3Bhbj5Nb2R1bGU8L3NwYW4+LFxuICAgICAgICAgICAgICAgICAgICAnJ1xuICAgICAgICAgICAgICAgIF19XG4gICAgICAgICAgICAgICAgaXNDb2x1bW5Tb3J0YWJsZT17W1xuICAgICAgICAgICAgICAgICAgICBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgIGZhbHNlXG4gICAgICAgICAgICAgICAgXX1cbiAgICAgICAgICAgICAgICBtYXhQYWdlcz17M31cbiAgICAgICAgICAgICAgICBvblBhZ2VOdW1iZXJDaGFuZ2VkPXtmdW5jdGlvbiBub1JlZkNoZWNrKCkgeyB9fVxuICAgICAgICAgICAgICAgIG9uUm93Q2xpY2s9e2Z1bmN0aW9uIG5vUmVmQ2hlY2soKSB7IH19XG4gICAgICAgICAgICAgICAgcGFnZVNpemU9ezV9XG4gICAgICAgICAgICAvPlxuICAgICAgICA8L2Rpdj5cbiAgICApO1xufSJdLCJuYW1lcyI6WyJUYWJsZSIsIkF2YXRhciIsIlRhZyIsIkxpc3QiLCJkaXYiLCJjbGFzc05hbWUiLCJjb2x1bW5zQ29uZmlnIiwiZGF0YSIsImYiLCJoZWFkZXIiLCJzcGFuIiwiaXNDb2x1bW5Tb3J0YWJsZSIsIm1heFBhZ2VzIiwib25QYWdlTnVtYmVyQ2hhbmdlZCIsIm5vUmVmQ2hlY2siLCJvblJvd0NsaWNrIiwicGFnZVNpemUiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/Components/List.jsx\n"));

/***/ })

});