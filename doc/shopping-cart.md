# 天天淘购物车API V1

---
|api    |请求方法   |描述     |
|:------|:---------|:--------|
|/v1/shoppingcart   |POST   |加入购物车  |
|/v1/shoppingcart   |DELETE     |清空购物车  |
|/v1/shoppingcart/:idGoods    |DELETE    |删除购物车中的商品   |
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
|goodsId   |商品id   |必传  |
---

`返回`

201，新创建的ShoppingCartInfo

## 清空购物车

```
DELETE /v1/shoppingcart
```

`返回`

204 无返回信息

## 删除购物车中的商品

```
DELETE /v1/shoppingcart/:idGoods
```

`请求参数`

idGoods为商品id

`返回`

204 无返回信息

[返回API目录](./api.md)