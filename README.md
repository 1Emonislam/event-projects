# millenivision-server-side

## live server api url: https://safe-journey-75946.herokuapp.com

## npm install

#### Join Event api url link: https://safe-journey-75946.herokuapp.com/api/community-events/join-people/:_id

```fetch(`https://safe-journey-75946.herokuapp.com/api/community-events/join-people/:_id`,{
method: 'PUT',
headers: {
'Content-Type': 'application/json',
'authorization': `Bearer ${token}` //requerd
}
body: JSON.stringify({
"join_people":"61d6e37705beb647e1399e2f" //ei jaiga user er id jabe ex: user:'ahfe23423'
})

```
#### Join Event api url link: https://safe-journey-75946.herokuapp.com/api/community-events/get-join-people/:_id
```

fetch(`https://safe-journey-75946.herokuapp.com/api/community-events/get-join-people/:_id`,{
method: 'GET',
headers: {
'Content-Type': 'application/json',
'authorization': `Bearer ${token}` //requerd
}

```
#### Join Event api url link: https://safe-journey-75946.herokuapp.com/api/events/join-people/:_id
```

fetch(`https://safe-journey-75946.herokuapp.com/api/events/join-people/:_id`,{
method: 'PUT',
headers: {
'Content-Type': 'application/json',
'authorization': `Bearer ${token}` //requerd
}
body: JSON.stringify({
"join_people":"61d6e37705beb647e1399e2f" //ei jaiga user er id jabe Ex: user:'ahfe23423'
})

```
#### Join Event api url link: https://safe-journey-75946.herokuapp.com/api/events/get-join-people/:_id
```

fetch(`https://safe-journey-75946.herokuapp.com/api/events/get-join-people/:_id`,{
method: 'GET',
headers: {
'Content-Type': 'application/json',
'authorization': `Bearer ${token}` //requerd
}

````
#### create register user Api url link: https://safe-journey-75946.herokuapp.com/users

```body pass Data example:
fetch(`https://safe-journey-75946.herokuapp.com/users`,{
    method: 'POST',
    headers: {
    'Content-Type': 'application/json',
    }
   body: JSON.stringify({
    "first_name": "Emon",//requerd
    "last_name": "Islam",//requerd
    "phone": 23223423,//requerd
    "email": "emon@example.com",//requerd
    "password": "12345678",//requerd
    "pic": "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",//by default creating
}),

 })
    .then(res => res.json())
    .then(data => console.log(data))

````

#### otp verification Api url link: https://safe-journey-75946.herokuapp.com/users/otp-verification/

## user already create hoye jabe register korar sumai tarpor user er je response paben oi ta local storage e set korben, token: name e ekti property paben oi property ta headers autorization a diye diben

```body pass Data example:
fetch(`https://safe-journey-75946.herokuapp.com/users/otp-verification/`,{
    method: 'PUT',
    headers: {
    'Content-Type': 'application/json',
    'authorization': `Bearer ${token}` //requerd
    }
   body: JSON.stringify({
    "first_name": "Emon",//requerd
    "last_name": "Islam",//requerd
    "phone": 23223423,//requerd
    "email": "emon@example.com",//requerd
    "password": "12345678",//requerd
    "pic": "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",//by default creating
}),

 })
    .then(res => res.json())
    .then(data => console.log(data))

```

#### login user Api url link: https://safe-journey-75946.herokuapp.com/users/login

```body pass Data example:

 fetch('https://safe-journey-75946.herokuapp.com/users/login',{
     method:'POST',
     headers: {
    'Content-Type': 'application/json'},
    body:JSON.stringify({
        "email":"example.com", //requerd
        "password":"21324" //requerd
    })
 })
    .then(res => res.json())
    .then(data => console.log(data))
```

#### current user update api url link https://safe-journey-75946.herokuapp.com/users/

```example:
fetch('https://safe-journey-75946.herokuapp.com/users/',{
method:'PUT',
headers: {
    'Content-Type': 'application/json'
    'authorization': `Bearer ${token}` //requerd
    },
    body:JSON.stringify({
    "first_name": "Emon edit", //optional update
    "last_name": "Islam edit", //optional update
    "pic": "url", //optional update
    "interest_list":"[]" //optional update
    })
})
.then(res => res.json())
.then(data => console.log(data))
```

#### event create current user Api url link: https://safe-journey-75946.herokuapp.com/api/events/create

```Creating event Example :
fetch(`https://safe-journey-75946.herokuapp.com/api/events/create`,{
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
        'authorization': `Bearer ${token}` //requerd
    },
    body: JSON.stringify({
    "event_Image": "test image", //requerd
    "list_of_communities": [], //optional
    "event_name": "sumon", //requerd
    "is_event_virtual": false, //requerd by default created false
    "list_of_interest": [], //optional
    "event_description": "event event_description", //requerd
    "notify_members": false, //requerd by default created false
    "preset": "any thing", //optional
    "user": "61d561c8f53b79810115013e",
}),

 })
.then(res => res.json())
    .then(data => console.log(data))
```

#### event geting current user data Api url link: https://safe-journey-75946.herokuapp.com/api/events/:id

### make sure user id pass

### Geting current user Events Example: user="23423423darrarw3a32":

```
fetch(`https://safe-journey-75946.herokuapp.com/api/events/:id`,{
    method:'GET',
    headers:{
        'Content-Type': 'application/json'
        'authorization': `Bearer ${token}`  //requerd
    }
})
 .then(res => res.json())
    .then(data => console.log(data))
```

#### event update current user data Api url link: https://safe-journey-75946.herokuapp.com/api/events/update/:id

### make sure \_id pass

#### update Event Example: \_id:objectId(234234dfiherhi432) :

```
fetch(`https://safe-journey-75946.herokuapp.com/api/events/update/:id`,{
    method:'PUT',
    headers:{
        'Content-Type': 'application/json'
        'authorization': `Bearer ${token}`  //requerd
    },
    body: JSON.stringify(data) //need edit data change to updated

})
 .then(res => res.json())
 .then(data => console.log(data))
```

#### event delete current user data Api url link: https://safe-journey-75946.herokuapp.com/api/events/delete/:id

### make sure \_id pass

#### delete Event Example: \_id:objectId(234234dfiherhi432) :

```
fetch(`https://safe-journey-75946.herokuapp.com/api/events/delete/:id`,{
    method:'DELETE',
    headers:{
        'Content-Type': 'application/json'
        'authorization': `Bearer ${token}`  //requerd
    },
})
  .then(res => res.json())
    .then(data => console.log(data))
```

### GET Single USERS API link: https://safe-journey-75946.herokuapp.com/users/:id

```
fetch(`https://safe-journey-75946.herokuapp.com/users/:id`,{
    method:'GET',
    headers:{
        'Content-Type': 'application/json'
    },

})
.then(res => res.json())
.then(data => console.log(data))
```

### GET All USERS API link: https://safe-journey-75946.herokuapp.com/users/

```
fetch(`https://safe-journey-75946.herokuapp.com/users/`,{
    method:'GET',
    headers:{
        'Content-Type': 'application/json'
        'authorization': `Bearer ${token}`  //requerd
    },

})
.then(res => res.json())
.then(data => console.log(data))
```

### Geting All Admins API link: https://safe-journey-75946.herokuapp.com/users/administrators

```
fetch(`https://safe-journey-75946.herokuapp.com/users/administrators`,{
    method:'GET',
    headers:{
        'Content-Type': 'application/json'
        'authorization': `Bearer ${token}`  //requerd
    },

})
 .then(res => res.json())
.then(data => console.log(data))
```

### Geting All Events API link: https://safe-journey-75946.herokuapp.com/api/events/

```
fetch(`https://safe-journey-75946.herokuapp.com/api/events/`,{
    method:'GET',
    headers:{
        'Content-Type': 'application/json'
        'authorization': `Bearer ${token}`  //requerd
    },

})
 .then(res => res.json())
.then(data => console.log(data))
```

### Make Admin USERS API link: https://safe-journey-75946.herokuapp.com/users/makeAdmin/:email

```
fetch(`https://safe-journey-75946.herokuapp.com/users/makeAdmin/:email`,{
    method:'PUT',
    headers:{
        'Content-Type': 'application/json'
        'authorization': `Bearer ${token}`  //requerd
    },

})
 .then(res => res.json())
.then(data => console.log(data))
```

### Community events create API link: https://safe-journey-75946.herokuapp.com/api/community-events/create

```
fetch(`https://safe-journey-75946.herokuapp.com/api/community-events/create`,{
    method:'POST',
    headers:{
        'Content-Type': 'application/json'
        'authorization': `Bearer ${token}`  //requerd
    },
    body:JSON.stringify({
        "event_image":"232", "event_name":"1123", "is_event_virtual":false, "event_date":"2342423", "list_of_communities":"aw32423", "list_of_interest":"234232", "event_description":"2342342", "notify_members":false, "preset":"23423423"
        })

})
   .then(res => res.json())
.then(data => console.log(data))
```

### Community events Geting API link: https://safe-journey-75946.herokuapp.com/api/community-events/

```
fetch(`https://safe-journey-75946.herokuapp.com/api/community-events`,{
    method:'GET',
    headers:{
        'Content-Type': 'application/json'
        'authorization': `Bearer ${token}`  //requerd
    },
    body:JSON.stringify({
        "event_image":"232", "event_name":"1123", "is_event_virtual":false, "event_date":"2342423", "list_of_communities":"aw32423", "list_of_interest":"234232", "event_description":"2342342", "notify_members":false, "preset":"23423423"
        })
})
 .then(res => res.json())
 .then(data => console.log(data))
```

### Community Single events Geting API link:https://safe-journey-75946.herokuapp.com/api/community-events/:id

```
fetch(`https://safe-journey-75946.herokuapp.com/api/community-events/:id`,{
    method:'GET',
    headers:{
        'Content-Type': 'application/json'
        'authorization': `Bearer ${token}`  //requerd
    }
})
 .then(res => res.json())
.then(data => console.log(data))
```

### Community Update events Geting API link:https://safe-journey-75946.herokuapp.com/api/community-events/:id

```
fetch(`https://safe-journey-75946.herokuapp.com/api/community-events/:id`,{
    method:'PUT',
    headers:{
        'Content-Type': 'application/json'
        'authorization': `Bearer ${token}`  //requerd
    },
    body: JSON.stringify({
    "_id": "61dc4206664da43cfe6ff6a45a2f",
    "event_image": "aebaerw2a66aaaaaaa",
    "event_name": "eventnam2323e",
    "is_event_virtual": true,
    "list_of_communities": [
        "iist of communities"
    ],
    "list_of_interest": [
        "list of interest"
    ],
    "event_description": "event description",
    "notify_members": false,
    "user": "61d6e37705beb647e1399e2f",
    "createdAt": "2022-01-10T14:26:13.096Z",
    "updatedAt": "2022-01-10T18:07:23.899Z",
    "__v": 0
})
})
 .then(res => res.json())
.then(data => console.log(data))
```

### geting all Community events Geting API link:https://safe-journey-75946.herokuapp.com/api/community-events/

```
fetch(`https://safe-journey-75946.herokuapp.com/api/community-events/`,{
    method:'GET',
    headers:{
        'Content-Type': 'application/json'
        'authorization': `Bearer ${token}`  //requerd
    }
})
.then(res => res.json())
.then(data => console.log(data))
```

### Delete Community events Geting API link:https://safe-journey-75946.herokuapp.com/api/community-events/

```
fetch(`https://safe-journey-75946.herokuapp.com/api/community-events/:id`,{
    method:'DELETE',
    headers:{
        'Content-Type': 'application/json'
        'authorization': `Bearer ${token}`  //requerd
    }
})
.then(res => res.json())
.then(data => console.log(data))
```

# millenivision-server-side
