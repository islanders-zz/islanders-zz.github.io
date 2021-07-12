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
    for (let i = 0; i < array.length - n; i++) res.push(array[i])
    return res
  }
  
  return {
    chunk: chunk,
    compact: compact,
    drop: drop
  }
} ()