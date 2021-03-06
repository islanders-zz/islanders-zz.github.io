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
    else {
      let res = value.split(/]\[|]\.|\[|\.|\]/)     // 要2] => [2, '']
      if (res[0] === '') res.shift()      
      if (res[res.length - 1] == '') res.pop()    // 处理空的情况
      return res
    }
  }

  function property(path) {
    return function (object) {
      // return object[path]
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
    return array.slice(n)
  }

  function dropRight(array, n = 1) {
    if (n <= 0) return array
    if (n >= array.length) return []
    return array.slice(0, array.length - n)
  }

  function dropWhile(array, predicate) {
    predicate = iteratee(predicate)
    let index = 0
    for (let i = 0; i < array.length; i++) {
      if (!predicate(array[i])) {
        index = i
        break
      }
    }
    return array.slice(index)
  }

  function dropRightWhile(array, predicate) {
    predicate = iteratee(predicate)
    let index = 0
    for (let i = array.length - 1 ; i >= 0; i--) {
      if (!predicate(array[i])) {
        index = i
        break
      }
    }
    return array.slice(0, index + 1)
  }

  function initial(array) {
    return array.slice(0, array.length - 1)
  }

  function tail(array) {
    return array.slice(1)
  }

  function take(array, n = 1) {
    return array.slice(0, n)
  }

  function takeRight(array, n = 1) {
    if (n >= array.length) return array.slice()
    return array.slice(array.length - n, array.length)
  }

  function findIndex(array, predicate, fromIndex = 0) {
    predicate = iteratee(predicate)
    for (let i = fromIndex; i < array.length; i++) {
      if (predicate(array[i])) return i
    }
    return -1 
  }

  function findLastIndex(array, predicate, fromIndex = array.length - 1) {
    predicate = iteratee(predicate)
    for (let i = fromIndex; i >= 0; i--) {
      if (predicate(array[i])) return i
    }
    return -1
  }

  function fromPairs(pairs) {
    let res = {}
    pairs.forEach((item, index, pairs) => {
      let key = item[0]
      let value = item[1]
      res[key] = value
    })
    return res
  }

  function lastIndexOf(array, value, fromIndex = array.length - 1) {
    for (let i = fromIndex; i >= 0; i--) {
      if (array[i] === value) return i
    }
    return -1
  }

  function nth(array, n = 0) {
    if (Math.abs(n) >= array.length) return undefined
    while(n < 0) n = n + array.length
    n = n % array.length
    return array[n]
  }

  function reverse(array) {
    return array.reverse()
  }

  function uniq(array) {
    return Array.from(new Set(array))
  }

  function uniqBy(array, predicate) {
    predicate = iteratee(predicate)
    let res = []
    let seen = []
    array.forEach((item) => {
      if (res.length === 0) {
        res.push(item)
        seen.push(predicate(item))
      }
      else {
        if (!seen.includes(predicate(item))) {
          res.push(item)
          seen.push(predicate(item))
        } 
      }
    })
    return res
  }

  function uniqWith(array, predicate) {
    predicate = iteratee(predicate)
    let res = []
    array.forEach((item) => {
      if (!res.some((it) => {               // 非some 就是都不满足条件
          return predicate(it, item)        // some是有一项满足 为true
        })) res.push(item)
    })
    return res
  }

  function chunk(array, size = 1) {
    let len = Math.ceil(array.length / size)
    let res = new Array(len)
    let k = 0
    for (let i = 0; i < len; i++) {
      res[i] = new Array()
      for (let j = 0; j < size && k < array.length; j++) {
        res[i].push(array[k++])
      }
    }
    return res
  }

  function compact(array) {
    let temp = new Set([false, null, 0, '', undefined, NaN])
    let res = []
    array.forEach((item) => {
      if (!temp.has(item)) res.push(item)
    })
    return res
  }

  function difference(array, ...values) {
    let temp = [].concat(...values)
    let res = []
    array.forEach((item) => {
      if (!temp.includes(item)) res.push(item)
    })
    return res
  }

  function differenceBy(array, ...values) { // 注意这个的传入参数的过程
    let predicate = values[values.length - 1]
    if (Array.isArray(predicate)) {
      return difference(array, ...values)
    }
    else {
      values.pop()
      predicate = iteratee(predicate)
      let temp = values.flat().map(item => predicate(item)) //要去扁平化数组
      let res = []
      array.forEach((item) => {
        if (!temp.includes(predicate(item))) res.push(item)
      })
      return res
    }
  }


  function differenceWith(array, values, comparator) {
    let res = []
    for (let i = 0; i < array.length; i++) {
      let flag = true
      let item = array[i]
      for (let j = 0; j < values.length; j++) {
        if (comparator(item, values[j])) {
          flag = false
          break
        }
      }
      if (flag) res.push(item)
    }
    return res
  }

  function concat(array, ...values) {
    return array.concat(...values)  // 重新写一下
  }


  function without(array, ...values) {
    let temp = [].concat(...values)
    let res = []
    array.forEach((item, index, array) => {
      if (!temp.includes(item)) res.push(item)
    })
    return res
  }

  function flatten(array) {
    let res = []
    array.forEach((item, index, array) => {
      if (!Array.isArray(item)) {
        res.push(item)
      } else {
        for (let it of item) {
          res.push(it)
        }
      }
    })
    return res
  }

  
  function flattenDeep(array) { // 递归写法
    let res = []
    array.forEach((item, index, array) => {
      if (!Array.isArray(item)) {
        res.push(item)
      } else {
        let temp = flattenDeep(item)
        temp.forEach((it, index, temp) => {
          res.push(it)
        })
      }
    })
    return res
  }

  function flattenDepth(array, depth = 1) {
    let res = array
    while (depth--) {
      res = flatten(res)
    }
    return res
  }

  function intersection(...arrays) {
    let array = arrays.shift()
    let res = []
    for (let i = 0; i < array.length; i++){
      let item = array[i]
      let flag = true
      for (let j = 0; j < arrays.length; j++){
        if (!arrays[j].includes(item)) {
          flag = false
          break
        }
      }
      if (flag) res.push(item)
    }
    return res
  }

  function intersectionBy(...arrays) {
    let predicate = iteratee(arrays.pop())
    let array = arrays.shift()
    let res = []
    let temp = arrays.map(item => item.map(it => predicate(it)))
    for (let i = 0; i < array.length; i++) {
      let item = array[i]
      let flag = true
      for (let j = 0; j < temp.length; j++) {
        if (!temp[j].includes(predicate(item))) {
          flag = false
          break
        }
      }
      if (flag) res.push(item)
    }
    return res
  }

  function intersectionWith(...arrays) {
    let predicate = iteratee(arrays.pop())
    let array = arrays.shift()
    let other = arrays.shift()
    let res = []
    array.forEach((item) => {
      other.forEach((it) => {
        if (predicate(item, it)) res.push(item)
      })
    })
    return res
  }

  function pull(array, ...values) {
    let value = [].concat(...values)
    let len = array.length
    for (let i = 0; i < len; i++) {
      let item = array.shift()
      if (!value.includes(item)) {
        array.push(item)
      }
    }
    return array
  }

  function pullAll(array, values) {
    return pull(array, values)
  }

  function pullAllBy(array, values, predicate) {
    predicate = iteratee(predicate)
    let len = array.length
    let temp = values.map(predicate)
    for (let i = 0; i < len; i++){
      let item = array.shift()
      if (!temp.includes(predicate(item))) array.push(item) 
    }
    return array
  }

  function pullAllWith(array, values, predicate) {
    predicate = iteratee(predicate)
    let len = array.length
    for (let i = 0; i < len; i++){
      let item = array.shift()
      let flag = true
      for (let j = 0; j < values.length; j++) {
        if (predicate(item, values[j])) {
          flag = false
          break
        }
      }
      if (flag) array.push(item)
    }
    return array
  }

  function pullAt(array, ...index) {
    let indexes = [].concat(...index)
    let res = []
    let len = array.length
    for (let i = 0; i < len; i++) {
      let item = array.shift()
      if (indexes.includes(i)) {
        res.push(item)
      } else {
        array.push(item)
      }
    }
    return res
  }

  function union(...arrays) {
    let temp = [].concat(...arrays)
    let res = []
    temp.forEach((item) => {
      if (!res.includes(item)) res.push(item)
    })
    return res
  }

  function unionBy(...arrays) {
    let predicate = iteratee(arrays.pop())
    let temp = [].concat(...arrays)
    let res = []
    temp.forEach((item) => {
      if(!res.map(predicate).includes(predicate(item))) res.push(item)
    })
    return res
  }

  function unionWith(...arrays) {
    let predicate = iteratee(arrays.pop())
    let temp = [].concat(...arrays)
    let res = []
    temp.forEach((item) => {
      if (res.length === 0) {
        res.push(item)
      }
      else {
        let cnt = 0
        for (let i = 0; i < res.length; i++){
          if (!predicate(item,res[i])) cnt++
        }
        if (cnt === res.length) res.push(item)
      }
    })
    return res
  }

  function zip(...arrays) {
    let itemlen = arguments.length
    let cnt = arguments[0].length
    let res = []
    for (let i = 0; i < cnt; i++){
      res[i] = new Array(itemlen)
      for (let j = 0; j < itemlen; j++){
        res[i][j] = arguments[j][i] 
      }
    }
    return res
  }

  function zipObject(props, values) {
    let res = {}
    let len = props.length
    for (let i = 0; i < len; i++){
      res[props[i]] = values[i]
    }
    return res
  }

  /* String */

  function repeat(string = '', n = 1) {
    let res = ''
    for (let i = 0; i < n; i++) {
      res += string
    }
    return res
  }

  function escape(string = '') {
    let res = ''
    for (let i = 0; i < string.length; i++) {
      if (string[i] === '<') res += '&lt;'
      else if (string[i] === '>') res += '&gt;'
      else if (string[i] === '&') res += '&amp;'
      else if (string[i] === `'`) res += '&apos'
      else if (string[i] === `"`) res += '&quot;'
      else res += string[i]
    }
    return res
  }

  function startsWith(string, target, positon = 0) {
    return string.substr(positon, target.length) === target
  }


  function endsWith(string, target, positon = string.length) {
    return string.substr(positon - target.length ,target.length) === target
  }

  /* Number */

  function clamp(number, lower, upper) {
    if (number < lower) return lower
    else if (number > upper) return upper
    else return number
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

  function isFunction(value) {
    return value instanceof Function
  }

  /* Object */

  function get(object, path, defaultValue = undefined) {
    path = toPath(path)
    if (object == undefined) return defaultValue
    for (let i = 0; i < path.length; i++) {
      if (object[path[i]] == undefined) {
       return defaultValue
      }
      else {
        object = object[path[i]] 
      }
    }
    return object
  }

  function keys(object) {
    let res = []
    for (let key in object) {
      if (object.hasOwnProperty(key)) res.push(key)
    }
    return res
  }

  function keysIn(object) {
    let res = []
    for (let key in object) res.push(key)
    return res
  }

  /* Collection */

  function map(collection, predicate) {
    predicate = iteratee(predicate)
    let res = []
    for (let key in collection) {
      res.push(predicate(collection[key], Number(key), collection))
    }
    return res
  }

  function filter(collection, predicate) {
    predicate = iteratee(predicate)
    let res = []
    for (let key in collection) {
      if (predicate(collection[key], key, collection)) res.push(collection[key])
    }
    return res
  }
  
  function forEach(collection, predicate) {
    predicate = iteratee(predicate)
    for (let key in collection) {
      predicate(collection[key], key, collection)
    }
    return collection
  }
  
  function forEachRight(collection, predicate) {
    predicate = iteratee(predicate)
    for (let i = collection.length - 1; i >= 0; i--) {
      predicate(collection[i], i, collection)
    }
    return collection
  }
  
  function size(collection) {
    if (Array.isArray(collection) || typeof collection === 'string') return collection.length
    else {
      let cnt = 0
      for (let key in collection) cnt++
      return cnt
    }
  }

  function some(collection, predicate) {
    predicate = iteratee(predicate)
    for (let value of collection) {     // 注意for of遍历的是值 而不是key
      if (predicate(value)) return true
    }
    return false
  }

  function every(collection, predicate) {
    predicate = iteratee(predicate)
    for (let key in collection) {
      if (!predicate(collection[key], key, collection)) return false
    }
    return true
  }

  function find(collection, predicate, fromIndex = 0) {
    predicate = iteratee(predicate)
    for (let i = fromIndex; i < collection.length; i++) {
      if (predicate(collection[i])) return collection[i]
    }
  }

  function findLast(collection, predicate, fromIndex = collection.length - 1) {
    predicate = iteratee(predicate)
    for (let i = fromIndex; i >= 0; i--) {
      if (predicate(collection[i])) return collection[i]
    }
  }

  function reject(collection, predicate) {
    let res = []
    predicate = iteratee(predicate)
    for (let item of collection) {
      if (!predicate(item)) res.push(item)
    }
    return res
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
    dropWhile: dropWhile,
    dropRightWhile: dropRightWhile,
    initial: initial,
    tail: tail,
    take: take,
    takeRight: takeRight,
    findIndex: findIndex,
    findLastIndex: findLastIndex,
    fromPairs: fromPairs,
    lastIndexOf: lastIndexOf,
    nth: nth,
    reverse: reverse,
    uniq: uniq,
    map: map,
    filter: filter,
    forEach: forEach,
    forEachRight: forEachRight,
    isFunction: isFunction,
    size: size,
    every: every,
    some: some,
    compact: compact,
    chunk: chunk,
    difference: difference,
    concat: concat,
    repeat: repeat,
    clamp: clamp,
    keys: keys,
    keysIn: keysIn,
    escape: escape,
    differenceBy: differenceBy,
    differenceWith: differenceWith,
    startsWith: startsWith,
    endsWith: endsWith,
    without: without,
    find: find,
    findLast: findLast,
    reject: reject,
    flatten: flatten,
    flattenDeep: flattenDeep,
    flattenDepth: flattenDepth,
    intersection: intersection,
    intersectionBy: intersectionBy,
    intersectionWith: intersectionWith,
    pull: pull,
    pullAll: pullAll,
    pullAllBy: pullAllBy,
    pullAllWith: pullAllWith,
    pullAt: pullAt,
    union: union,
    unionBy: unionBy,
    unionWith: unionWith,
    uniqWith: uniqWith,
    uniqBy: uniqBy,
    zip: zip,
    zipObject: zipObject,
  }
}()