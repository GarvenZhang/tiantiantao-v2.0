# 天天淘商品API V1

---
|api    |请求方法   |描述     |
|:------|:---------|:--------|
|/v1/goods   |POST   |添加新商品  |
|/v1/goods/:id   |DELETE     |删除商品  |
|/v1/goods/:param?nextPage=:nextPage&perPage=:perPage&min=:min&max=:max    |GET    |查询商品   |
|/v1/goods/:id    |PUT    |修改商品   |
|/v1/goods/img    |POST    |图片上传   |
---

## 商品完整信息 GoodsInfo

```
{
  "status": "success"
  "data": [
    {
      "id": 1,
      "name": "shoes",
      "description": "",
      "date": "YYYY-MM-DD HH-MM-SS",
      "price": 150,
      "category": 1,
      "bigImg": "http://www.baidu.com/i.png",
      "smImg": [
        {
          "id": 1,
          "src": "http://www.baidu.com/n.png"
        }
      ]
    }
  ],
  curPage: 1,
  nextPage: 2,
  perPage: 8,
  allCount: 10
}
```

## 单个商品信息 Goods

```
{
  "status": "success"
  "id": 1,
  "name": "shoes",
  "description": "",
  "date": "YYYY-MM-DD HH-MM-SS",
  "price": 150,
  "category": 1,
  "bigImg": "http://www.baidu.com/i.png",
  "smImg": [
    {
      "id": 1,
      "src": "http://www.baidu.com/n.png"
    }
  ]
}
```

## 添加新商品

```
POST /v1/goods
```

`请求参数`

---
|参数    |含义   |备注     |
|:------|:---------|:--------|
|name   |商品名称   |必传  |
|description   |商品描述   |必传  |
|date   |上传日期   |必传  |
|price   |商品价格   |必传, 精确到2位数  |
|categoryId   |类别id   |必传，Number  |
---

`返回`

201，新创建的Good

## 删除商品

```
DELETE /v1/goods/:id
```

`返回`

204 无返回信息

## 查询商品

```
GET /v1/goods/:param?nextPage=:nextPage&perPage=:perPage&min=:min&max=:max
```

`请求参数`

---
|参数    |含义   |备注     |
|:------|:---------|:--------|
|param   |商品名称   |必传 |
|min   |价格下限   |必传  |
|max   |价格上限   |必传  |
|nextPage   |下一页数码   |可选  |
|perPage   |每一页商品数   |可选  |
---

`参数说明`

url必须完整，但是针对特定的情况只需修改特定的参数即可

`param`为`all`时不分类查询

`param`为`id_num`时为根据某个id查询商品详情, 如`/v1/goods/id_21432432?nextPage=1&perPage=16&min=0&max=0`

`param`为`type_num`时为查询某类商品，如`/v1/goods/type_12?nextPage=1&perPage=16&min=0&max=0`

`param`为商品名称时为根据名称查询商品, 如`/v1/goods/javascript高级程序设计?nextPage=1&perPage=16&min=0&max=0`

`min`和`max`都为0时为不需要根据价格查询

`返回`

200, 查询到的GoodsInfo

---

## 修改商品

```
PUT /v1/goods
```

`请求参数`

---
|参数    |含义   |备注     |
|:------|:---------|:--------|
|id   |商品id   |必传  |
|name   |商品名称   |必传  |
|description   |商品描述   |必选  |
|price   |商品价格   |必传  |
|categoryId   |类别   |必传  |
---

`返回`

200, 新的Goods

---

## 图片上传

```
POST /v1/goods/img
```

`请求参数`

---
|参数    |含义   |备注     |
|:------|:---------|:--------|
|id   |商品id   |必传  |
|type   |图片类型   |必传; 'smImg'/'bigImg'  |
|file   |图片FormData   |必传  |
---

`返回`

201

[返回API目录](./api.md)