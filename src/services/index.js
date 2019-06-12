import request from 'utils/request'

export const getAppConfig = (data) => {
  return request({
    url: '/api/appconfig',
    data,
  })
}

export const getAuthData = (data) => {
  return request({
    url: '/auth-ms/user/loadUserAuth/hlj',
    data,
  })
}

