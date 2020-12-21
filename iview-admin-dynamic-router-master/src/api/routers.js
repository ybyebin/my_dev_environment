import axios from '@/libs/api.request'

/**
 * 从后台拿动态路由的数据
 * @param access
 * @returns {*}
 */
export const getRouterReq = (access) => {
  return axios.request({
    url: '/sys/routers',
    params: {
      access
    },
    method: 'get'
  })
}

/**
 * 获取用户权限数组,组合路由和菜单
 * @returns {never}
 * @param params
 */
export const getUserPerms = (params) => {
  return axios.request({
    url: '/user/menus',
    method: 'post'
  })
}
