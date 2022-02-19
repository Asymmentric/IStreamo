# API


## Register API Clients
>POST: baseURL/**create**

x-www-form-urlencoded expects following body:
```json
{
  "username": "Somename",
  "mobile": "9876543210"
}
```
on successful registration it returns
```json
{
    "msg": "User Somename  registered."
}
```

***

## Fetch all registered users
>GET:baseURL/**users**

Returns list of registered users
```javascript

[
  { name: 'Somename1' },
  { name: 'Somename2' },
  { name: 'Somename3' },
  { name: 'Somename4' },
  { name: 'Somename5' },
  .
  .
  .
]

```

