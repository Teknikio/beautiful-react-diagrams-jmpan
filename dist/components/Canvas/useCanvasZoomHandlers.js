/* beautiful-react-diagrams version: 0.6.0 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var Constants = require('../../shared/Constants.js');

var useEvent = function useEvent(ref, event, callback, options) {
  React.useEffect(function () {
    if (ref.current) {
      ref.current.addEventListener(event, callback, options);
    }
    return function () {
      if (ref.current) {
        ref.current.removeEventListener(event, callback, options);
      }
    };
  }, [ref.current]);
};
var defaultOptions = {
  zoom: 1,
  maxZoom: 5,
  minZoom: 0.4
};
var wheelOffset = 0.01;
var useCanvasZoomHandlers = function useCanvasZoomHandlers(ref) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultOptions;
  var onZoomChange = options.onZoomChange,
    maxZoom = options.maxZoom,
    minZoom = options.minZoom,
    zoomOnWheel = options.zoomOnWheel,
    zoomResetOnDblClick = options.zoomResetOnDblClick;
  var scaleOnWheel = React.useCallback(function (event) {
    if (onZoomChange && zoomOnWheel) {
      event.preventDefault();
      onZoomChange(function (currentScale) {
        if (event.deltaY > 0) {
          return currentScale + wheelOffset < maxZoom ? currentScale + wheelOffset : maxZoom;
        }
        return currentScale - wheelOffset > minZoom ? currentScale - wheelOffset : minZoom;
      });
    }
  }, [onZoomChange, maxZoom, minZoom]);
  var resetZoom = React.useCallback(function (event) {
    if (onZoomChange && zoomResetOnDblClick) {
      event.preventDefault();
      onZoomChange(1);
    }
  }, []);
  useEvent(ref, Constants.Events.WHEEL, scaleOnWheel, {
    passive: false
  });
  useEvent(ref, Constants.Events.DOUBLE_CLICK, resetZoom, {
    passive: false
  });
};

exports.default = useCanvasZoomHandlers;
