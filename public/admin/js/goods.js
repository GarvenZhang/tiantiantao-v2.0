const doc = document
const modifyModal = document.getElementById(`modifyGoodsModal`)
const addModal = document.getElementById(`addGoodsModal`)

// 增加类别
modal({
  modal: document.getElementById('addGoodsModal'),
  target: document.getElementById('js-add-goods'),
  draggable: true
})




doc.onclick = function (e) {
  const target = e.target
  const id = target.id
  console.log(id)
  if (id.includes('js-seach')) {

  }
  else if (id === 'js-add-sure') {
    addGoods(addModal)
  }
  else if (id === 'js-modify-sure') {
    const idGoods = modifyModal.getAttribute('data-id')
    modifyGoods(parseInt(idGoods), modifyModal)
  }
  else if (id.includes('js-modify')) {
    const idGoods = id.split('-')[2]
    modifyModal.classList.remove('hide')
    modifyModal.setAttribute('data-id', idGoods)
    modal({
      modal: modifyModal,
      target: document.getElementById(`js-modify-${idGoods}`),
      draggable: true
    })
  }
  else if (id.includes('js-del')) {
    const idGoods = id.split('-')[2]
    delGoods(parseInt(idGoods))
  }

}

/**
 * 添加商品
 */
function addGoods (modal) {
  const addForm = doc.getElementById('addForm')
  const date = new Date()

  ajax({
    method: 'post',
    url: '/v1/goods',
    data: JSON.stringify({
      name: addForm['name'].value.trim(),
      description: addForm['description'].value.trim(),
      date: `${date.toISOString().slice(0, 10)} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`,
      price: parseInt(addForm['price'].value.trim()),
      categoryId: parseInt(addForm['categoryId'].value.trim())
    }),
    fn: function (data) {
      const result = JSON.parse(data)
      if (result.status === 'success') {
        alert('添加商品成功')
        modal.classList.add('hide')
        addForm.reset()
        updateGoods(result.data)
      } else {
        alert('添加商品失败' + result.message)
      }
    }
  })
}

/**
 * 修改商品
 */
function modifyGoods (id, modal) {
  const modifyForm = doc.getElementById('modifyForm')
  ajax({
    method: 'put',
    url: '/v1/goods',
    data: JSON.stringify({
      id: id,
      name: modifyForm['name'].value.trim(),
      description: modifyForm['description'].value.trim(),
      price: parseInt(modifyForm['price'].value.trim()),
      categoryId: parseInt(modifyForm['categoryId'].value.trim())
    }),
    fn: function (data) {
      const result = JSON.parse(data)
      if (result.status === 'success') {
        alert('修改商品成功')
        modal.classList.add('hide')
        modifyModal.reset()
        updateGoods(result.data)
      } else {
        alert('修改商品失败' + result.message)
      }
    }
  })
}

/**
 * 删除商品
 */
function delGoods (id) {
  ajax({
    method: 'delete',
    url: `/v1/goods/${id}`,
    fn: function (data) {
      const result = JSON.parse(data)
      if (result.status === 'success') {
        alert('删除商品成功')
        updateGoods(result.data)
      } else {
        alert('删除商品失败' + result.message)
      }
    }
  })
}

/**
 * 查询类别
 */
function checkType () {
  const addForm = doc.getElementById('addForm')
  ajax({
    method: 'post',
    url: '/v1/category',
    data: JSON.stringify({
      name: addForm['type'].value.trim()
    }),
    fn: function (data) {
      console.log(data)
    }
  })
}

function updateGoods (data) {
  const goodsWrapper = document.getElementById('goodsWrapper')

  let str = ''

  for (let item of data) {
    str += `
    <div class="goods-item" data-id="${item.idGoods}">
        <div class="item-inner">
            <img src="${item.bigImg}" class="item-img">
            <p class="item-des">${item.description}</p>
            <p class="item-price">￥ ${item.price}</p>
            <span class="del" id="js-del-${item.idGoods}">x</span>
        </div>
    </div>
  `
  }

  goodsWrapper.innerHTML = str
}
