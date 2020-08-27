import request from '@/utils/request'

export function getLst(query) {
  return request({
    url: '/user/list',
    method: 'get',
    params: query
  })
}

export function getOne(id) {
  return request({
    url: '/user/detail',
    method: 'get',
    params: { id }
  })
}

export function create(data) {
  return request({
    url: '/user/add',
    method: 'post',
    data
  })
}

export function update(data) {
  return request({
    url: '/user/update',
    method: 'post',
    data
  })
}

export function del(data) {
  return request({
    url: '/user/del',
    method: 'post',
    data
  })
}
