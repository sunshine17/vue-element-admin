const Mock = require('mockjs')

const roleTpl = {
  id: '@increment',
  name: '@first'
}

const rCnt = 10
const totals = []
for (let i = 0; i <= rCnt; i++) {
  totals.push(Mock.mock(roleTpl))
}

module.exports = {
  total: () => {
    return totals
  },

  getSome: () => {
    const cnt = Mock.mock('@integer(3,7)')
    const ret = []
    for (let i = 0; i < cnt; i++) {
      ret.push(totals[i])
    }
    return ret
  } // getSome()
}

