/**
 * Imports
 */

import test from 'tape'
import yoco from '../src'
import rlog from 'redux-log'

/**
 * Tests
 */

test('should work', (t) => {
  let l = []
  let log = yoco([rlog(l)])
  log(function * () {
    yield 'hello'
    yield 'world'
  })
  t.deepEqual(l, ['hello', 'world'])
  t.end()
})

test('should work as array', (t) => {
  let l = []
  let log = yoco([rlog(l)])
  log(function * () {
    yield 'hello'
    yield 'world'
  })
  t.deepEqual(l, ['hello', 'world'])
  t.end()
})
