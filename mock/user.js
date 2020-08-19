const Mock = require('mockjs')

const uLst = []
const count = 100

for (let i = 0; i < count; i++) {
  uLst.push(Mock.mock({
    id: '@increment',
    name: '@first',
    email: '@email',
    enabled: '@integer(0, 1)',
    passwd: '@string(8, 12)',
    createdAt: '@datetime',
    roles: [
      {
        'createdAt': 1596021817262,
        'updatedAt': 1596451594975,
        'id': 2,
        'name': 'T1',
        'desc': 'T1'
      }
    ],
    mobile: '13323445343',
    channel: 0
  }))
}

module.exports = [{
  url: '/api/user/list',
  type: 'get',
  response: config => {
    const { email, enabled, name, page = 1, limit = 20, sort } = config.query
    const intEnabled = parseInt(enabled)

    let mockList = uLst.filter(item => {
      if (enabled && item.enabled !== intEnabled) return false
      if (email && item.email.indexOf(email) < 0) return false
      if (name && item.name.indexOf(name) < 0) return false
      return true
    })

    if (sort === '-id') {
      mockList = mockList.reverse()
    }

    const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

    return {
      code: 0,
      data: { total: mockList.length, items: pageList }
    }
  }
},{
  url: '/api/user/detail',
  type: 'get',
  response: config => {
    const { id } = config.query
    for (const usr of uLst) {
      if (usr.id === +id) {
        return { code: 0, data: usr }
      }
    }
  }
},{
  url: '/api/user/create',
  type: 'post',
  response: _ => {
    return {
      code: 0,
      data: 'success'
    }
  }
},{
  url: '/api/user/update',
  type: 'post',
  response: _ => {
    return {
      code: 0,
      data: 'success'
    }
  }
}]

