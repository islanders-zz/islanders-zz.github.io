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
      isEqual(get(object, path), srcValue)
    }
  }
  
  function identity(value) {
    return value
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
    chunk: chunk,
    compact: compact,
    concat: concat,
    difference: difference,
    differenceBy: differenceBy,
    differenceWith: differenceWith,
    drop: drop,
    dropRight: dropRight,
    dropRightWhile: dropRightWhile,
    dropWhile: dropWhile,
    fill: fill,
    findIndex: findIndex,
    findLastIndex: findLastIndex,
    flatten: flatten,
    flattenDeep: flattenDeep,
    flattenDepth: flattenDepth,
    fromPairs: fromPairs,
    head: head,
    indexOf: indexOf,
    initial: initial,
    intersection: intersection,
    intersectionBy: intersectionBy,
    intersectionWith: intersectionWith,
    join: join,
    last: last,
    lastIndexOf: lastIndexOf,
    nth: nth,
    pull: pull,
    pullAll: pullAll,
    pullAllBy: pullAllBy,
    pullAllWith: pullAllWith,
    reverse: reverse,
    sortedIndex: sortedIndex,
    sortedIndexBy: sortedIndexBy,
    sortedIndexOf: sortedIndexOf,
    sortedLastIndex: sortedLastIndex,
    sortedLastIndexOf: sortedLastIndexOf,
    sortedLastIndexBy: sortedLastIndexBy,
    sortedUniq: sortedUniq,
    sortedUniqBy: sortedUniqBy,
    tail: tail,
    take: take,
    takeRight: takeRight,
    takeRightWhile: takeRightWhile,
    takeWhile: takeWhile,
    union: union,
    unionBy: unionBy,
    unionWith: unionWith,
    uniq: uniq,
    uniqBy: uniqBy,
    uniqWith: uniqWith,
    unzip: unzip,
    unzipWith: unzipWith,
    without: without,
    xor: xor,
    xorBy: xorBy,
    xorWith: xorWith,
    zip: zip,
    zipObject: zipObject,
    zipObjectDeep: zipObjectDeep,
    zipWith: zipWith,
    countBy: countBy,
    every: every,
    filter: filter,
    find: find,
    findLast: findLast,
    flatMap: flatMap,
    flatMapDeep: flatMapDeep,
    flatMapDepth: flatMapDepth,
    forEach: forEach,
    forEachRight: forEachRight,
    groupBy: groupBy,
    includes: includes,
    invokeMap: invokeMap,
    keyBy: keyBy,
    map: map,
    orderBy: orderBy,
    partition: partition,
    reduce: reduce,
    reduceRight: reduceRight,
    reject: reject,
    sample: sample,
    sampleSize: sampleSize,
    shuffle: shuffle,
    size: size,
    some: some,
    sortBy: sortBy,
    defer: defer,
    delay: delay,
    castArray: castArray,
    conformsTo: conformsTo,
    eq: eq,
    gt: gt,
    gte: gte,
    isArguments: isArguments,
    isArray: isArray,
    isArrayBuffer: isArrayBuffer,
    isArrayLike: isArrayLike,
    isArrayLikeObject: isArrayLikeObject,
    isBoolean: isBoolean,
    isDate: isDate,
    isElement: isElement,
    isEmpty: isEmpty,
    isEqual: isEqual,
    isEqualWith: isEqualWith,
    isError: isError,
    isFinite: isFinite,
    isFunction: isFunction,
    isInteger: isInteger,
    isLength: isLength,
    isMap: isMap,
    isMatch: isMatch,
    isMatchWith: isMatchWith,
    isNaN: isNaN,
    isNative: isNative,
    isNil: isNil,
    isNull: isNull,
    isNumber: isNumber,
    isObject: isObject,
    isObjectLike: isObjectLike,
    isPlainObject: isPlainObject,
    isRegExp: isRegExp,
    isSafeInteger: isSafeInteger,
    isSet: isSet,
    isString: isString,
    isSymbol: isSymbol,
    isTypedArray: isTypedArray,
    isUndefined: isUndefined,
    isWeakMap: isWeakMap,
    isWeakSet: isWeakSet,
    lt: lt,
    lte: lte,
    toArray: toArray,
    toFinite: toFinite,
    toInteger: toInteger,
    toLength: toLength,
    toNumber: toNumber,
    assign: assign,
    toSafeInteger: toSafeInteger,
    add: add,
    ceil: ceil,
    divide: divide,
    floor: floor,
    max: max,
    maxBy: maxBy,
    mean: mean,
    meanBy: meanBy,
    min: min,
    minBy: minBy,
    multiply: multiply,
    round: round,
    subtract: subtract,
    sum: sum,
    sumBy: sumBy,
    clamp: clamp,
    inRange: inRange,
    random: random,
    assignIn: assignIn,
    at: at,
    defaults: defaults,
    defaultsDeep: defaultsDeep,
    findKey: findKey,
    findLastKey: findLastKey,
    forIn: forIn,
    forInRight: forInRight,
    forOwn: forOwn,
    forOwnRight: forOwnRight,
    functions: functions,
    functionsIn: functionsIn,
    get: get,
    has: has,
    hasIn: hasIn,
    invert: invert,
    invertBy: invertBy,
    invoke: invoke,
    keys: keys,
    keysIn: keysIn,
    mapKeys: mapKeys,
    mapValues: mapValues,
    merge: merge,
    mergeWith: mergeWith,
    omit: omit,
    omitBy: omitBy,
    pick: pick,
    pickBy: pickBy,
    result: result,
    set: set,
    setWith: setWith,
    toPairs: toPairs,
    toPairsIn: toPairsIn,
    transform: transform,
    unset: unset,
    update: update,
    updateWith: updateWith,
    values: values,
    valuesIn: valuesIn,
    camelCase: camelCase,
    capitalize: capitalize,
    deburr: deburr,
    endsWith: endsWith,
    escape: escape,
    escapeRegExp: escapeRegExp,
    kebabCase: kebabCase,
    lowerCase: lowerCase,
    lowerFirst: lowerFirst,
    pad: pad,
    padEnd: padEnd,
    padStart: padStart,
    parseInt: parseInt,
    repeat: repeat,
    replace: replace,
    snakeCase: snakeCase,
    split: split,
    startCase: startCase,
    startsWith: startsWith,
    toLower: toLower,
    toUpper: toUpper,
    trim: trim,
    trimEnd: trimEnd,
    trimStart: trimStart,
    truncate: truncate,
    unescape: unescape,
    upperCase: upperCase,
    upperFirst: upperFirst,
    words: words,
    bindAll: bindAll,
    defaultTo: defaultTo,
    range: range,
    rangeRight: rangeRight,
    mixin: mixin,
    times: times,
    toPath: toPath,
    uniqueId: uniqueId,
    cloneDeep: cloneDeep,
    identity: identity,
    pullAt: pullAt,
    matches: matches,
    property: property,
    ary: ary,
    unary: unary,
    negate: negate,
    once: once,
    spread: spread,
    curry: curry,
    memoize: memoize,
    flip: flip,
    conforms: conforms,
    constant: constant,
    flow: flow,
    method: method,
    methodOf: methodOf,
    nthArg: nthArg,
    propertyOf: propertyOf,
    parseJson: parseJson,
    stringifyJson: stringifyJson,
  }
}()