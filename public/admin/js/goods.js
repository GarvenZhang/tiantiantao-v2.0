const doc = document
const jsEditGoods = doc.getElementById('js-edit-goods')
const form = doc.getElementById('form')
//
jsEditGoods.onclick = function () {
  ajax({
    method: 'post',
    url: '/v1/goods',
    data: JSON.stringify({
      name: form['type'].value.trim()
    }),
    fn: function (data) {
      console.log(data)
    }
  })
}