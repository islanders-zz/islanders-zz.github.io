var islanders_zz = function () {

  function chunk(array, size = 1) {
    let len = Math.ceil(array.length / size)
    let res = new Array()
    let k = 0
    for (let i = 0; i < len; i++) {
      res[i] = new Array()
      for (let j = 0; j < size && k < array.length; j++) res[i].push(array[k++])
    }
    return res
  }

  function compact(array) {
    let res = new Array()
    for (let i = 0; i < array.length; i++) {
      if (array[i] != false && array[i] != 0 && array[i] != null && array[i] != "" && !isNaN(array[i]) && array[i] != undefined) {
        res.push(array[i])
      }
    }
    return res
  }

  function drop(array, n = 1) {
    let res = new Array()
    if (n >= array.length) return res
    for (let i = n; i < array.length; i++) res.push(array[i])
    return res
  }

  function dropRight(array, n = 1) {
    let res = new Array()
    if (n >= array.length) return res
    for (let i = 0; i < array.length - n; i++) res.push(array[i])
    return res
  }

  function last(array) {
    if (!array.length) return undefined
    return array[array.length - 1]
  }

  function head(array) {
    if (!array.length) return undefined
    return array[0]
  }

  function reverse(array) {
    let res = new Array()
    if (!array.length) return res
    for (let i = 0; i < array.length; i++) res.unshift(array[i])
    return res
  }

  function fill(array, value, start = 0, end = array.length) {
    for (let i = start; i < end; i++) {
      array[i] = value
    }
    return array
  }

  function add(augend, addend) {
    return augend + addend
  }

  function subtract(minuend, subtrahend) {
    return minuend - subtrahend
  }

  function multiply(multiplier, multiplicand) {
    return multiplier * multiplicand
  }

  function divide(dividend, divisor) {
    return dividend / divisor
  }

  function sum(array) {
    let res = 0
    for (let i = 0; i < array.length; i++) res += array[i]
    return res
  }

  function mean(array) {
    return sum(array) / array.length
  }

  function max(array) {
    if (!array.length) return undefined
    let res = array[0]
    for (let i = 0; i < array.length; i++) {
      if (array[i] > res) res = array[i]
    }
    return res
  }

  function min(array) {
    if (!array.length) return undefined
    let res = array[0]
    for (let i = 0; i < array.length; i++) {
      if (array[i] < res) res = array[i]
    }
    return res
  }

  function fill(array, value, start = 0, end = array.length) {
    for (let i = start; i < end; i++) array[i] = value
    return array
  }

  function indexOf(array, value, fromIndex = 0) {
    let res = -1
    for (let i = fromIndex; i < array.length; i++) {
      if (array[i] === value) {
        res = i
        break
      }
    }
    return res
  }

  function lastIndexOf(array, value, fromIndex = array.length - 1) {
    let res = -1
    for (let i = fromIndex; i >= 0; i--) {
      if (array[i] === value) {
        res = i
        break
      }
    }
    return res
  }

  function initial(array) {
    let res = new Array()
    if (array.length <= 1) return res
    for (let i = 0; i < array.length - 1; i++) res.push(array[i])
    return res
  }

  function nth(array, n = 0) {
    let res
    if (n >= 0) res = array[n]
    else res = array[array.length + n]
    return res
  }

  function tail(array) {
    let res = new Array()
    if (array.length <= 1) return res
    for (let i = 1; i < array.length; i++) res.push(array[i])
    return res
  }

  function take(array, n = 1) {
    let res = new Array()
    if (n > array.length) {
      for (let i = 0; i < array.length; i++) res.push(array[i])
    }
    else {
      for (let i = 0; i < n; i++) res.push(array[i])
    }
    return res
  }

  function takeRight(array, n = 1) {
    let res = new Array()
    if (n > array.length) {
      for (let i = 0; i < array.length; i++) res.push(array[i])
    }
    else {
      for (let i = 1; i <= n; i++) res.unshift(array[array.length - i])
    }
    return res
  }

  function sortedIndex(array, value) {
    let l = 0, r = array.length - 1
    while (l < r) {
      let mid = l + r >> 1
      if (array[mid] >= value) r = mid
      else l = mid + 1
    }
    return l
  }

  function join(array, separator = `,`) {
    let res = String("")
    for (let i = 0; i < array.length - 1; i++) {
      res = res + String(array[i]) + separator
    }
    res += array[array.length - 1]
    return res
  }

  function slice(array, start = 0, end = array.length) {
    let res = []
    for (let i = start; i < end; i++) res.push(array[i])
    return res
  }

  function difference(array, values) {
    let res = []
    for (let i = 0; i < array.length; i++) {
      let flag = true
      for (let j = 0; j < values.length; j++) {
        if (array[i] == values[j]) {
          flag = false
          break
        }
      }
      if (flag) res.push(array[i])
    }
    return res
  }

  function inRange(number, start = 0, end) {
    if (end === undefined) {
      end = start
      start = 0
    }
    if (start > end) {
      let temp = start
      start = end
      end = temp
    }
    if (number >= start && number < end) return true
    else return false
  }

  function lowerFirst(string = '') {
    if (string.length == 0) return string
    let res = string[0].toLowerCase() + string.slice(1)
    return res
  }

  function capitalize(string = '') {
    if (string.length == 0) return string
    let res = string[0].toUpperCase() + string.slice(1).toLowerCase()
    return res
  }

  function isNil(value) {
    if (value == null || undefined) return true
    else return false
  }

  function isNull(value) {
    if (value === null) return true
    else return false
  }

  function isUndefined(value) {
    if (value === undefined) return true
    else return false
  }

  function uniq(array) {
    let temp = new Set()
    for (let i = 0; i < array.length; i++) {
      temp.add(array[i])
    }
    let res = []
    for (let key of temp) {
      res.push(key)
    }
    return res
  }

  function forEach(collection, iteratee) {
    for (let i = 0; i < collection.length; i++) {
      if (iteratee(collection[i], i, collection) === false) break
      iteratee(collection[i], i, collection)
    }
    return collection
  }

  function map(collection, iteratee) {
    let res = []
    if (Array.isArray(collection)) {
      for (let i = 0; i < collection.length; i++) {
        res.push(iteratee(collection[i], i, collection))
      }
    }
    else {
      for (let key in collection) {
        res.push(iteratee(collection[key], key, collection))
      }
    }
    return res
  }

  function findIndex(array, predicate, fromIndex = 0) {
    for (let i = fromIndex; i < array.length; i++) {
      if (predicate(array[i]))  return i
    }
    return -1
  }

  function sortedIndexOf(array, value) {
    let l = 0, r = array.length - 1
    while (l < r) {
      let mid = l + r >> 1
      if (array[mid] >= value) r = mid
      else l =  mid + 1
    }
    if (array[l] == value) return l
    else return -1
  }

  function sortedLastIndexOf(array, value) {
    let l = 0, r = array.length - 1
    while (l < r) {
      let mid = l + r + 1>> 1
      if (array[mid] <= value) l = mid
      else r = mid - 1 
    }
    if (array[l] == value) return l
    else return -1 
  }


  function sortedLastIndex(array, value) {
    if (value >= array[array.length - 1]) return array.length
    if (value < array[0]) return 0
    let l = 0, r = array.length - 1
    while (l < r) {
      let mid = l + r >> 1
      if (array[mid] > value) r = mid
      else l = mid + 1
    }
    return l 
  }
    
  function size(collection) {
    if (Array.isArray(collection)) return collection.length
    if (typeof collection == `string`) return collection.length
    if (typeof collection == "object") {
      let res = 0
      for (let key in collection) res++
      return res
    }
  }

  function pullAll(array, values) {
    let len = array.length
    for (let i = 1; i <= len; i++) {
      let item = array.shift()
      if (!values.includes(item)) array.push(item)
    }
    return array
  }

  function fromPairs(pairs) {
    let res = {}
    for (let i = 0; i < pairs.length; i++) {
      let key = String(pairs[i][0])
      let val = pairs[i][1]
      res[key] = val
    }
    return res
  }

  function lt(value, other) {
    return value < other ? true : false
  }

  function lte(value, other) {
    return value <= other ? true : false
  }

  function gt(value, other) {
    return value > other ? true : false 
  }

  function gte(value, other) {
    return value >= other ? true : false
  }

  function repeat(string = ``, n = 1) {
    let res = ""
    for (let i = 1; i <= n; i++) res += string
    return res  
  }

  return {
    chunk: chunk,
    compact: compact,
    drop: drop,
    dropRight: dropRight,
    last: last,
    reverse: reverse,
    head: head,
    fill: fill,
    add: add,
    subtract: subtract,
    multiply: multiply,
    divide: divide,
    sum: sum,
    mean: mean,
    max: max,
    min: min,
    fill: fill,
    indexOf: indexOf,
    lastIndexOf: lastIndexOf,
    initial: initial,
    nth: nth,
    tail: tail,
    take: take,
    takeRight: takeRight,
    sortedIndex: sortedIndex,
    join: join,
    slice: slice,
    difference: difference,
    inRange: inRange,
    lowerFirst: lowerFirst,
    capitalize: capitalize,
    isNil: isNil,
    isNull: isNull,
    isUndefined: isUndefined,
    uniq: uniq,
    forEach: forEach,
    map: map,
    findIndex: findIndex,
    sortedIndexOf: sortedIndexOf,
    sortedLastIndex: sortedLastIndex,
    sortedLastIndexOf: sortedLastIndexOf,
    size: size,
    pullAll: pullAll,
    fromPairs: fromPairs,
    lt: lt,
    lte: lte,
    gt: gt,
    gte: gte,
    repeat: repeat,
  }

}()