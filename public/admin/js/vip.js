const doc = document

doc.onclick = function (e) {
  const target = e.target
  const id = target.id
  console.log(id)
  if (id.includes('js-seach')) {

  }
  else if (id.includes('js-cancel-vip')) {
    const idUser = id.split('-')[3]
    console.log(idUser)

    cancelOrReleaseVip(idUser, 0)
  }
  else if (id.includes('js-release-vip')) {
    const idUser = id.split('-')[3]
    cancelOrReleaseVip(idUser, 1)
  }

}

/**
 * 冻结/解冻 vip
 */
function cancelOrReleaseVip (id, isVip) {
  ajax({
    method: 'put',
    url: `/v1/user/${id}/vip`,
    data: JSON.stringify({
      isVip: isVip
    }),
    fn: function (data) {
      const result = JSON.parse(data)
      let str = isVip? '冻结': '解冻'
      if (result.status === 'success') {
        alert(`${str}成功`)
        updateTable(result.data)
      } else {
        alert(`${str}失败` + result.message)
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
