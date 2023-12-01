import request from '@/utils/request.js'

// 注册接口
export const userRegisterService = ({ username, password, repassword }) =>
  request.post('/api/reg', { username, password, repassword })

export const userLoginService = ({ username, password }) => {
  return request.post('/api/login', { username, password })
}

export const userGetInfoService = () => {
  return request.get('/my/userinfo')
}

// // 获取用户基本信息
// export const userGetInfoService = () => request.get('/my/userinfo')
