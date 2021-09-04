var islanders_zz = function () {
  /* Util */
  
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

  /* Object */

  function get(object, path, defaultValue) {
    path = toPath(path)
    for (let i = 0; i < path.length; i++) {
      if (object == undefined || object[path[i]] == undefined) return defaultValue
      else object = object[path[i]]
    }
    return object
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
  }
}()