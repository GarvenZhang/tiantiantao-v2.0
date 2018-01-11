# 天天淘商品API V1

---
|api    |请求方法   |描述     |
|:------|:---------|:--------|
|/v1/goods   |POST   |添加新商品  |
|/v1/goods/:id   |DELETE     |删除商品  |
|/v1/goods/:name?curPage=:curPage&nextPage=:nextPage&perPage=:perPage&min=:min&max=:max    |GET    |查询商品   |
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
|category_id   |类别id   |必传，Number  |
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
GET /v1/goods/:name?curPage=:curPage&nextPage=:nextPage&perPage=:perPage&min=:min&max=:max
```

`请求参数`

---
|参数    |含义   |备注     |
|:------|:---------|:--------|
|name   |商品名称   |必传, 当id为all则查全部，为数字则查具体商品, 当id为all_category则为查某种类型   |
|min   |价格下限   |必传  |
|max   |价格上限   |必传  |
|curPage   |当前页数码   |可选  |
|nextPage   |下一页数码   |可选  |
|perPage   |每一页商品数   |可选  |
---

*若min为1， max为1，则为不进行区间查询*

`返回`

200, 查询到的GoodsInfo

---

## 修改商品

```
PUT /v1/goods/:id
```

`请求参数`

---
|参数    |含义   |备注     |
|:------|:---------|:--------|
|id   |商品id   |必传  |
|name   |商品名称   |必传  |
|description   |商品描述   |必选  |
|price   |商品价格   |必传  |
|category_id   |类别   |必传  |
|bigImg   |大图src   |可选  |
|smImg   |小图src数组   |可选  |
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