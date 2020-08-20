import request from '@/utils/request'

export function getLst(query) {
  return request({
    url: '/api/user/list',
    method: 'get',
    params: query
  })
}

export function getOne(id) {
  return request({
    url: '/api/user/detail',
    method: 'get',
    params: { id }
  })
}

export function addOne(data) {
  return request({
    url: '/api/user/add',
    method: 'post',
    data
  })
}

export function update(data) {
  return request({
    url: '/api/user/update',
    method: 'post',
    data
  })
}

export function del(data) {
  return request({
    url: '/api/user/del',
    method: 'post',
    data
  })
}
