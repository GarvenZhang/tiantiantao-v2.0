# 天天淘购物车API V1

---
|api    |请求方法   |描述     |
|:------|:---------|:--------|
|/v1/shoppingcart   |POST   |加入购物车  |
|/v1/shoppingcart/:id   |DELETE     |删除购物车商品  |
|/v1/shoppingcart    |GET    |查看购物车   |
|/v1/ShoppingCartInfo/:id    |PUT    |修改购物车   |
---

## 购物车完整信息 ShoppingCartInfo

```
{
  "length": 1
  "data": [
    {
      "name": "",
      "price": "",
      "count": 1,
      "bigImg": ""
    }
  ]
}
```

## 加入购物车

```
POST /v1/shoppingcart
```

`请求参数`

---
|参数    |含义   |备注     |
|:------|:---------|:--------|
|goods_id   |商品id   |必传  |
---

`返回`

201，新创建的ShoppingCartInfo

## 删除购物车

```
DELETE /v1/shoppingcart/:id
```

`请求参数`

id为购物车id

`返回`

204 无返回信息

## 修改购物车

> 目前只提供修改数量功能

```
PUT /v1/shoppingcart/:id
```

`请求参数`

---
|参数    |含义   |备注     |
|:------|:---------|:--------|
|id   |购物车id   |必传, 数值  |
|goods_id   |商品id   |必传，数值  |
|goods_num   |商品数量   |必传，数值  |
---

`示例`

```
{
  id: 1,
  data: [
    {
      goods_id: 2,
      goods_count: 2  
    }
  ]
}
```

`返回`

202 返新的ShoppingCartInfo

## 查询购物车

```
GET /v1/shoppingcart
```

`返回`

200

---

[返回API目录](./api.md)