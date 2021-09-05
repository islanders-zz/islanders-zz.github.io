var islanders_zz = function () {
  /* Util */
  
  function iteratee(predicate) {
    if (typeof predicate === 'function') {
      return predicate
    }
    if (typeof predicate === 'string') {
      return property(predicate)
    }
    if (Array.isArray(predicate)) {
      return matchesProperty(...predicate)
    }
    if (typeof predicate === 'object') {
      return matches(predicate)
    }
  }

  function toPath(value) {
    if (Array.isArray(value)) return value
    else return value.split(/]\[|]\.|\[|\./)
  }

  function property(path) {
    return function (object) {
      return get(object, path)
    }
  }

  function matches(source) {
    return function (object) {
      return isMatch(object, source)
    }
  }

  function matchesProperty(path, srcValue) {
    return function (object) {
      return isEqual(get(object, path), srcValue)
    }
  }
  
  function identity(value) {
    return value
  }

  /* Array */

  function head(array) {
    return array[0]
  }

  function last(array) {
    return array[array.length - 1]
  }

  function fill(array, value, start = 0, end = array.length) {
    for (let i = start; i < end; i++) {
      array[i] = value
    }
    return array
  }

  function indexOf(array, value, fromIndex = 0) {
    for (let i = fromIndex; i < array.length; i++) {
      if (array[i] === value) return i
    }
    return -1 
  }

  function join(array, separator = ',') {
    if (array.length <= 0) return ""
    return array.reduce((acc, item, index, array) => String(acc) + String(separator) + String(item))
  }

  function drop(array, n = 1) {
    if (n <= 0) return array
    if (n >= array.length) return []
    return array.slice(n - 1, array.length)
  }

  function dropRight(array, n = 1) {
    if (n <= 0) return array
    if (n >= array.length) return []
    return array.slice(0, array.length - n)
  }

  function dropWhile(array, predicate) {
    predicate = iteratee(predicate)
    let res = []
    array.forEach((item, index, array) => { if (!predicate(item) || predicate(item) !== undefined) { res.push(item) } })
    return res
  }
  /* Lang */

  function isEqual(value, other) {
    if (value === other) return true

    let typeofvalue = typeof value
    let typeofother = typeof other

    if (typeofvalue !== typeofother) return false
    else {
      if (typeofvalue === 'object') {
        if (Array.isArray(value) && !Array.isArray(other) || !Array.isArray(value) && Array.isArray(other)) return false

        if (Array.isArray(value)) {
          if (value.length !== other.length) return false
        }
        else {
          let keysvalue = Object.keys(value)
          let keysother = Object.keys(other)
          if (keysvalue.length !== keysother.length) return false
        }
        for (let key in value) {
          if (!(key in other)) return false
          else {
            if (!isEqual(value[key], other[key])) return false
          }
        }
        return true
      }
      else {
        return value === other
      }
    }
  }

  function isMatch(object, source) {
    if (object == source) return true
    if (typeof object !== 'object' || typeof source !== 'object') return false

    for (let key in source) {
      if (source[key] && typeof source[key] !== 'object') {
        if (object[key] !== source[key]) return false
      }
      else {
        if (!isMatch(object[key], source[key])) return false
      }
    }
    return true
  }

  function gt(value, other) {
    return value > other ? true : false
  }

  function gte(value, other) {
    return value >= other ? true : false
  }

  function lt(value, other) {
    return value < other ? true : false
  }

  function lte(value, other) {
    return value <= other ? true : false
  }

  function isArray(value) {
    return  value instanceof Array
  }

  function isArrayBuffer(value) {
    return value instanceof ArrayBuffer
  }

  function isBoolean(value) {
    return value instanceof Boolean || value === true || value === false
  }

  function isDate(value) {
    return value instanceof Date
  }

  function isMap(value) {
    return value instanceof Map
  }

  function isNil(value) {
    return value === undefined || value === null
  }

  function isNull(value) {
    return value === null
  }

  function isRegExp(value) {
    return value instanceof RegExp
  }

  function isSet(value) {
    return value instanceof Set
  }

  function isString(value) {
    return value instanceof String || typeof value === 'string'
  }

  function isUndefined(value) {
    return value === undefined
  }

  function isWeakMap(value) {
    return value instanceof WeakMap
  }

  function isWeakSet(value) {
    return value instanceof WeakSet
  }

  /* Object */

  function get(object, path, defaultValue) {
    path = toPath(path)
    for (let i = 0; i < path.length; i++) {
      if (object[path[i]] == undefined) return defaultValue
      else object = object[path[i]]
    }
    return object
  }

  /* Math */

  function add(augend, addend) {
    return augend + addend
  }

  function divide(dividend, divisor) {
    return dividend / divisor
  }

  function max(array) {
    if (array.length <= 0 || !Array.isArray(array)) return undefined
    return Math.max(...array)
  }

  function maxBy(array, predicate) {
    predicate = iteratee(predicate)
    let temp = array.map((item, index, array) => predicate(item))
    let index = temp.indexOf(max(temp))
    return array[index]
  }

  function min(array) {
    if (array.length <= 0 || !Array.isArray(array)) return undefined
    return Math.min(...array)
  }

  function minBy(array, predicate) {
    predicate = iteratee(predicate)
    let temp = array.map((item, index, array) => predicate(item))
    let index = temp.indexOf(min(temp))
    return array[index]
  }

  function multiply(multiplier, multiplicand) {
    return multiplier * multiplicand
  }

  function subtract(minuend, subtrahend) {
    return minuend - subtrahend
  }

  function sum(array) {
    return array.reduce((acc, item, index, array) => acc + item, 0)
  }

  function sumBy(array, predicate) {
    predicate = iteratee(predicate)
    return array.reduce((acc, item, index, array) => acc + predicate(item), 0)
  }

  function mean(array) {
    return sum(array) / array.length
  }

  function meanBy(array, predicate) {
    return sumBy(array, predicate) / array.length
  }
  

  return {
    isEqual: isEqual,
    toPath: toPath,
    get: get,
    property: property,
    isMatch: isMatch,
    matches: matches,
    matchesProperty: matchesProperty,
    iteratee: iteratee,
    identity: identity,
    add: add,
    divide: divide,
    max: max,
    min: min,
    multiply: multiply,
    subtract: subtract,
    sum: sum,
    sumBy: sumBy,
    maxBy: maxBy,
    mean: mean,
    meanBy: meanBy,
    minBy: minBy,
    gt: gt,
    gte: gte,
    lt: lt,
    lte: lte,
    isArray: isArray,
    isArrayBuffer: isArrayBuffer,
    isBoolean: isBoolean,
    isDate: isDate,
    isNil: isNil,
    isMap: isMap,
    isNull: isNull,
    isRegExp: isRegExp,
    isSet: isSet,
    isString: isString,
    isUndefined: isUndefined,
    isWeakMap: isWeakMap,
    isWeakSet: isWeakSet,
    head: head,
    last: last,
    fill: fill,
    indexOf: indexOf,
    join: join,
    drop: drop,
    dropRight: dropRight,
  }
}()