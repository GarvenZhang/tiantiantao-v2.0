const doc = document
const modifyModal = document.getElementById(`modifyTypeModal`)
const addModal = document.getElementById(`addTypeModal`)

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

  if (id === 'js-add-sure') {
    addType(addModal)
  }
  else if (id === 'js-modify-sure') {
    const id = modifyModal.getAttribute('data-id')
    modifyType(parseInt(id), modifyModal)
  }
  else if (id.includes('js-modify')) {
    const idCategory = id.split('-')[2]
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
function addType (modal) {
  const addForm = doc.getElementById('addForm')
  ajax({
    method: 'post',
    url: '/v1/category',
    data: JSON.stringify({
      name: addForm['type'].value.trim()
    }),
    fn: function (data) {
      const result = JSON.parse(data)
      if (result.status === 'success') {
        alert('添加类别成功')
        modal.classList.add('hide')
        updateTable(result.data)
      } else {
        alert('添加类别失败' + result.message)
      }
    }
  })
}

/**
 * 修改类别
 */
function modifyType (id, modal) {
  const modifyForm = doc.getElementById('modifyForm')

  ajax({
    method: 'put',
    url: '/v1/category',
    data: JSON.stringify({
      name: modifyForm['type'].value.trim(),
      id: id
    }),
    fn: function (data) {
      const result = JSON.parse(data)
      if (result.status === 'success') {
        alert('修改类别成功')
        modal.classList.add('hide')
        updateTable(result.data)
      } else {
        alert('修改类别失败' + result.message)
      }
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
      const result = JSON.parse(data)
      if (result.status === 'success') {
        alert('删除类别成功')
        updateTable(result.data)
      } else {
        alert('删除类别失败' + result.message)
      }
    }
  })
}

function updateTable (data) {
  const tBody = document.getElementById('tBody')

  let str = ''

  for (let item of data) {
    str += `
    <tr>
        <td>${item.name}</td>
        <td>
            <a href="javascript:;" class="operation" data-target="#modifyTypeModal" id="js-modify-${item.idCategory}">修改</a>
            <a href="javascript:;" class="operation" id="js-del-${item.idCategory}">删除</a>
        </td>
    </tr>
  `
  }

  tBody.innerHTML = str
}
