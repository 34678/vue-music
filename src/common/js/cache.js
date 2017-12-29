import storage from 'good-storage'

// 内部key 命名方式当值冲突
const SEARCH_KEY = '__search__'
// 最多存储这么多的数据 超过的话把最早的数据踢出去
const SEARCH_MAX_LEN = 15

export function clearSearch() {
  storage.remove(SEARCH_KEY)
  return []
}

export function deleteSearch(query) {
  let searches = storage.get(SEARCH_KEY, [])
  deleteFromArray(searches, (item) => {
    return item === query
  })
  storage.set(SEARCH_KEY, searches)
  return searches
}

function deleteFromArray(arr, compare) {
  const index = arr.findIndex(compare)
  if (index > -1) {
    arr.splice(index, 1)
  }
}

// 返回值是 放在浏览器里面的缓存的额数组
export function saveSearch(query) {
  // []是没有值的时候的默认值
  let searches = storage.get(SEARCH_KEY, [])
  // 如果出现了重复的数据 删掉他 然后把当前数据放在列表头
  insertArray(searches, query, (item) => {
    return item === query
  }, SEARCH_MAX_LEN)
  storage.set(SEARCH_KEY, searches)
  return searches
}

// 插入值得方法（包括去重之类的功能）
// findIndex es6 数据新的api
export function insertArray(arr, val, compare, maxLen) {
  const index = arr.findIndex(compare)
  // 第一条数据 不用插入
  if (index === 0) {
    return
  }
  // 删除这条数据
  if (index > 0) {
    arr.splice(index, 1)
  }
// 把最新的数据插入
  arr.unshift(val)
  // 如果超过了最大长度 把最后一个元素给移除
  if (maxLen && maxLen < arr.length) {
    arr.pop()
  }
}

export function loadSearch() {
  return storage.get(SEARCH_KEY, [])
}
