import http from './http'

// 轮播图数据
export function getBanner(params) {
  return http.get('/home/banner', params)
}

// 首页的推荐
export function getRecommend(data) {
  return http.post('/home/recommend', data)
}

// 分类的数据
export function getClassify(data) {
  return http.post('/classify', data)
}

// 商品详情页的数据
export function getDetail(data) {
  return http.post('/detail', data)
}

// 获取短信验证码
export function getCode(data) {
  return http.post('/register/getCode', data)
}

// 登录
export function login(data) {
  return http.post('/register', data)
}

// 获取个人信息
export function userInfo(data) {
  return http.post('/userinfo/get',  data)
}
// 修改个人信息
export function updateUser(data) {
  return http.post('/userinfo/update', data)
}

// 获取收货地址
export function getAddress(data) {
  return http.post('/address/get', data)
}

// 新增收货地址
export function addAddress(data) {
  return http.post('/address/add', data)
}

// 修改收货地址
export function updateAddress(data) {
  return http.post('/address/update', data)
}