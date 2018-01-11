# 天天淘类别API V1

---
|api    |请求方法   |描述     |
|:------|:---------|:--------|
|/v1/category   |POST   |添加新类别  |
|/v1/category:id   |DELETE     |删除类别  |
|/v1/category:id    |PUT    |修改类别   |
|/v1/category/:id    |GET    |查询类别   |
---

## 类别完整信息 CategoryInfo

```json
{
  "length": 2,
  "data": [
    {
      "id": 1,
      "name": "shoes"
    },
    {
      "id": 2,
      "name": "bag"
    }
  ]
}
```

## 单个类别信息 Category

```json
{
  "id": 0,
  "category": "shoes"
}
```

## 添加新类别

```
POST /v1/category
```

`请求参数`

---
|参数    |含义   |备注     |
|:------|:---------|:--------|
|category   |类别名称   |必传  |
---

`返回`

201，新创建的Category

## 删除类别

```
DELETE /v1/category/:id
```

`返回`

204 无返回信息

## 修改类别

```
PUT /v1/category/:id
```

`请求参数`

---
|参数    |含义   |备注     |
|:------|:---------|:--------|
|category   |类别名称   |必传  |
---

`返回`

200

## 查询类别

```
GET /v1/category/:category
```

`请求参数`

:category 为具体类别名称，若是all则为查询全部

`返回`

200

---

[返回API目录](./api.md)