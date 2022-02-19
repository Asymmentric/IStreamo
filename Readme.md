# API
***

##POST ###Register API Clients
>baseURL/**create**
x-www-form-urlencoded expects following body:
```javascript
{
  username: Somename
  mobile: 9876543210
}
```
and it returns
```json
{
    "msg": "User Somename  registered."
}
```
on successful registration.
***

##GET ###Fetch all registered users
>baseURL/**users**

