Liferay.Loader.define("easyfirstreportclient@0.0.0/index", ['module', 'exports', 'require', './easyFirstReportClient/polyfills', './easyFirstReportClient/runtime', './easyFirstReportClient/main', './adapt-rt'], function (module, exports, require) {
  var define = undefined;
  var global = window;
  {
    /**
     * This file has been generated by the liferay-js:adapt Yeoman generator. It is
     * the main entry point of the adapted portlet and its responsibility is to load
     * and bootstrap the Angular application in a way that fits Liferay portlet
     * architecture.
     *
     * This file should be deleted after each `npm run build:liferay` but it isn't 
     * you may delete it safely as it will be recreated and deleted on the next 
     * build.
     */

    // Require webpack bundles generated by Angular CLI build.
    const polyfills = require("./easyFirstReportClient/polyfills");
    const runtime = require("./easyFirstReportClient/runtime");
    const main = require("./easyFirstReportClient/main");

    // Load Angular polyfills and runtime engine modules.
    polyfills();
    runtime();

    // Require our adapt runtime support module
    var _ADAPT_RT_ = require("./adapt-rt");

    // Invoke Angular main module passing Liferay's standard entry point arguments.
    module.exports = function (_LIFERAY_PARAMS_) {
      main(_LIFERAY_PARAMS_, _ADAPT_RT_);
    };
  }
});