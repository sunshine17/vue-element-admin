## Environment settings


### VUE_APP_BASE_API

API server base URL(no path info), example value: 
VUE_APP_BASE_API=http://yourdomain/api/


## API Server things

### Remove client mock 
In ./vue.config.js, comment the "before" attribute in "devServer" section:

```
  devServer: {
    disableHostCheck: true,
    port: port,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    },
    before: require('./mock/mock-server.js')  // COMMENT THIS LINE TO DISABLE API MOCK
  },
```

### Auth setting

- use request header "X-Token" to authenticate client requests, it's value is a token issued by server when user login, the front-end js will store this token and append it to the request header in the subsequent api requests

- token is store in COOKIE in client


### API: response data structure

```
{
    code: 20000,  // 20000 for success
    message: 'error message'
    data: {}  // business data object if no error happens
}
```


### API: status code definition

- 20000: everythings' fine;

- 5xxxx: logic error;
  - 50008: Illegal token; 
  - 50012: Other clients logged in; 
  - 50014: Token expired;
  - 50008: Login failed, unable to get user details;

- 60204: usr name or pwd wrong

### APIs

- Auth module
  - /auth/login
  - /auth/logout
  - /auth/info

User Info object: 
```
{
    name: 'user name', 
    roles: ['role-1', 'role-2',], // TODO: need to refactor
    introduction: 'user introduction',
    avatar: 'img url',
}
```







