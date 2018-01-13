# 天天淘类别API V1

---
|api    |请求方法   |描述     |
|:------|:---------|:--------|
|/v1/category   |POST   |添加新类别  |
|/v1/category:id   |DELETE     |删除类别  |
|/v1/category:id    |PUT    |修改类别   |
|/v1/category    |GET    |查询类别   |
---

## 类别完整信息 CategoryInfo

```json
{
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

## 添加新类别

```
POST /v1/category
```

`请求参数`

---
|参数    |含义   |备注     |
|:------|:---------|:--------|
|name   |类别名称   |必传  |
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
PUT /v1/category
```

`请求参数`

---
|参数    |含义   |备注     |
|:------|:---------|:--------|
|id   |类别id   |必传  |
|name   |类别名称   |必传  |
---

`返回`

200

## 查询类别

```
GET /v1/category
```

`返回`

200

---

[返回API目录](./api.md)