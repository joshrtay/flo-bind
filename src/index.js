/**
 * Imports
 */

import flow from 'redux-flo'
import bind from '@f/bind-middleware'
import isArray from '@f/is-array'
import toMiddleware from '@f/to-middleware'
import mapArray from '@f/map-array'
import logError from '@f/log-error'

/**
 * yoco
 * @param  {Array} mw redux style middleware
 * @return {Function} dispatch function to middleware
 */

function yoco (mw) {
  if (!isArray(mw)) mw = [mw]
  let dispatch = bind([flow(errorHandler), ...mw])
  dispatch.wrap = wrap
  dispatch.onError = logError
  return dispatch

  function errorHandler(err) {
    return dispatch.onError(err)
  }

  function wrap (fn) {
    return function () {
      var args = new Array(arguments.length)
      for (var i = 0; i < arguments.length; ++i) {
        args[i] = arguments[i]
      }
      return dispatch(fn.apply(this, args))
    }
  }
}

/**
 * crate a co from functions
 * @param {Array} fns mapping functions
 * @returm {Function}
 */

function map (fns) {
  if (!isArray(fns)) fns = [fns]
  return yoco(mapArray(toMiddleware, fns))
}

/**
 * Exports
 */

export default yoco
export {
  map
}
