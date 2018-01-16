(function () {
  // 获取元素
  const doc =document
  const searchInput = doc .getElementById('searchInput')
  const jsSearch = doc .getElementById('js-search')


  if (jsSearch) {
    jsSearch.onclick = () => {
      const val = searchInput.value.trim()
      location.href = `/list?${val}?nextPage=1&perPage=16&min=0&max=0`
    }
  }
})()


