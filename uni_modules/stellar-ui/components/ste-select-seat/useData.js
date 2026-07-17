import { getSafeGridSize, isInteger, isSeatInBounds } from './internals/gridUtils'

export function useData(props) {
  var seatMap = new Map()
  var warnedMessages = new Set()

  var getKey = function(row, col) { return '' + row + '-' + col }

  var warn = function(message) {
    if (warnedMessages.has(message)) return
    warnedMessages.add(message)
    console.warn('[ste-select-seat] ' + message)
  }

  var getGridSize = function() {
    var shouldWarn = props.rows !== 0 || props.cols !== 0 || (props.seats && props.seats.length > 0) || (props._localSelected && props._localSelected.length > 0)
    var _a = getSafeGridSize(props.rows, props.cols), rows = _a.rows, cols = _a.cols

    if (!rows && shouldWarn) {
      warn('rows 应为大于 0 的整数，当前值为 ' + String(props.rows))
    }
    if (!cols && shouldWarn) {
      warn('cols 应为大于 0 的整数，当前值为 ' + String(props.cols))
    }

    return { rows, cols }
  }

  var normalizeSeat = function(seat, index, rows, cols) {
    if (!isInteger(seat?.row) || !isInteger(seat?.col)) {
      warn('seats[' + index + '] 缺少合法的 row/col 整数，已忽略')
      return null
    }

    if (!isSeatInBounds(seat.row, seat.col, rows, cols)) {
      warn('seats[' + index + '] 的坐标 (' + seat.row + ', ' + seat.col + ') 超出范围 rows=' + rows + ', cols=' + cols + '，已忽略')
      return null
    }

    return Object.assign({}, seat)
  }

  var initSeats = function() {
    var _a = getGridSize(), rows = _a.rows, cols = _a.cols
    var map = new Map()

    if (!rows || !cols) {
      seatMap = map
      return
    }

    if (props.seats && props.seats.length > 0) {
      for (var index = 0; index < props.seats.length; index++) {
        var seat = normalizeSeat(props.seats[index], index, rows, cols)
        if (!seat) continue

        var key = getKey(seat.row, seat.col)
        if (map.has(key)) {
          warn('seats[' + index + '] 的坐标 (' + seat.row + ', ' + seat.col + ') 重复，后一个配置将覆盖前一个')
        }
        map.set(key, seat)
      }
    }

    for (var r = 0; r < rows; r++) {
      for (var c = 0; c < cols; c++) {
        var key = getKey(r, c)
        if (!map.has(key)) {
          map.set(key, { row: r, col: c })
        }
      }
    }
    seatMap = map
  }

  var getSeat = function(row, col) {
    return seatMap.get(getKey(row, col))
  }

  var setSeat = function(row, col, data) {
    var _a = getGridSize(), rows = _a.rows, cols = _a.cols
    if (!rows || !cols) {
      warn('当前 rows/cols 非法，setSeat 已忽略')
      return
    }
    if (!isInteger(row) || !isInteger(col)) {
      warn('setSeat 的 row/col 应为整数，当前值为 (' + String(row) + ', ' + String(col) + ')')
      return
    }
    if (!isSeatInBounds(row, col, rows, cols)) {
      warn('setSeat 的坐标 (' + row + ', ' + col + ') 超出范围 rows=' + rows + ', cols=' + cols)
      return
    }

    var key = getKey(row, col)
    var existing = seatMap.get(key)
    if (existing) {
      seatMap.set(key, Object.assign({}, existing, data))
    } else {
      seatMap.set(key, Object.assign({ row: row, col: col }, data))
    }
    seatMap = new Map(seatMap)
  }

  var getSeats = function() {
    return Array.from(seatMap.values())
  }

  var getSeatRows = function() {
    var _a = getGridSize(), totalRows = _a.rows, totalCols = _a.cols
    var rows = []
    for (var r = 0; r < totalRows; r++) {
      var row = []
      for (var c = 0; c < totalCols; c++) {
        var seat = seatMap.get(getKey(r, c))
        if (seat) {
          row.push(seat)
        } else {
          row.push({ row: r, col: c })
        }
      }
      rows.push(row)
    }
    return rows
  }

  var isSelected = function(row, col) {
    if (!props._localSelected) return false
    return props._localSelected.some(function(v) { return v.row === row && v.col === col })
  }

  var toggleSeat = function(row, col) {
    var seat = getSeat(row, col)
    if (!seat || seat.disabled || seat.empty) return props._localSelected ? props._localSelected.slice() : []

    var idx = props._localSelected.findIndex(function(v) { return v.row === row && v.col === col })
    var newValue = props._localSelected ? props._localSelected.slice() : []
    if (idx >= 0) {
      newValue.splice(idx, 1)
    } else {
      newValue.push({ row: row, col: col })
    }
    return newValue
  }

  return {
    seatMap: seatMap,
    seatRows: getSeatRows,
    getSeat: getSeat,
    setSeat: setSeat,
    getSeats: getSeats,
    isSelected: isSelected,
    toggleSeat: toggleSeat,
    initSeats: initSeats,
  }
}