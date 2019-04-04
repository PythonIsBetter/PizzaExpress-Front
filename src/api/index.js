import http from './public'
// 登陆
export const userLogin = (params) => {
  // return http.fetchPost('/member/login', params)
  return http.fetchPost('/login/login', params)
}
// idCode
export const idCode = (params) => {
  // return http.fetchPost('/member/login', params)
  return http.fetchPost('/login/IDcode', params)
}
// 退出登陆
export const loginOut = (params) => {
  return http.fetchGet('/member/loginOut', params)
}
// 获取用户信息！
export const getUserInfo = (params) => {
  return http.fetchPost('/user/getUserInfo', params)
}
// 设置用户信息！
export const setUserInfo = (params) => {
  return http.fetchPost('/user/setUserInfo', params)
}
// 注册账号
export const register = (params) => {
  return http.fetchPost('/register/register', params)
}
// 上传图片
export const upload = (params) => {
  return http.fetchPost('/member/imgaeUpload', params)
}
// 修改头像
export const updateheadimage = (params) => {
  return http.fetchPost('/member/updateheadimage', params)
}
// 捐赠列表
export const thanksList = (params) => {
  return http.fetchGet('/member/thanks', params)
}
// 首页接口
export const productHome = (params) => {
  return http.fetchGet('/goods/home', params)
}
// 首页接口
export const navList = (params) => {
  return http.fetchGet('/goods/navList', params)
}
// 推荐板块
export const recommend = (params) => {
  return http.fetchGet('/goods/recommend', params)
}
// 捐赠板块
export const thank = (params) => {
  return http.fetchGet('/goods/thank', params)
}
// 极验验证码
export const geetest = (params) => {
  return http.fetchGet('/member/geetestInit?t=' + (new Date()).getTime(), params)
}
// 用戶請求訂單
export const orderList = (params) => {
  return http.fetchGet('/user/orderList' + (new Date()).getTime(), params)
}
// 用户确认收货
export const orderComplete = (params) => {
  return http.fetchPost('/user/accept', params)
}
// 从低到高查询
export const lowHighPrize = (params) => {
  return http.fetchPost('/Home/orderedMenu', params)
}
// 注册账号
export const changePassword = (params) => {
  return http.fetchPost('/user/changePwd', params)
}
