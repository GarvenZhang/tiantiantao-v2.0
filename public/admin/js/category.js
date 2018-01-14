const doc = document

// 增加类别
modal({
  modal: document.getElementById('addTypeModal'),
  target: document.getElementById('js-add-type'),
  draggable: true
})




doc.onclick = function (e) {
  const target = e.target
  const id = target.id
  console.log(id)
  if (id.includes('js-seach')) {

  }
  else if (id === 'js-add-sure') {
    addType()
  }
  else if (id === 'js-modify-sure') {
    const modifyModal = document.getElementById(`modifyTypeModal`)
    const id = modifyModal.getAttribute('data-id')
    modifyType(parseInt(id))
  }
  else if (id.includes('js-modify')) {
    const idCategory = id.split('-')[2]
    const modifyModal = document.getElementById(`modifyTypeModal`)
    modifyModal.classList.remove('hide')
    modifyModal.setAttribute('data-id', idCategory)
    modal({
      modal: modifyModal,
      target: document.getElementById(`js-modify-${idCategory}`),
      draggable: true
    })
  }
  else if (id.includes('js-del')) {
    const idCategory = id.split('-')[2]
    delType(parseInt(idCategory))
  }

}

/**
 * 添加类别
 */
function addType () {
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

/**
 * 修改类别
 */
function modifyType (id) {
  const modifyForm = doc.getElementById('modifyForm')

  ajax({
    method: 'put',
    url: '/v1/category',
    data: JSON.stringify({
      name: modifyForm['type'].value.trim(),
      id: id
    }),
    fn: function (data) {
      console.log(data)
    }
  })
}

/**
 * 删除类别
 */
function delType (id) {
  ajax({
    method: 'delete',
    url: `/v1/category/${id}`,
    fn: function (data) {
      console.log(data)
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
