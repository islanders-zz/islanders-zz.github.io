var islanders_zz = function () {
  
  function chunk(array, size = 1) {
    let len = Math.ceil(array.length / size)
    let res = new Array()
    let k = 0
    for (let i = 0; i < len; i++) {
      res[i] = new Array(size)
      for (let j = 0; j < size && k < array.length; j++, k++) res[i][j] = array[k]
    }
    return res
  }

  return {
    chunk: chunk,
  }
} ()