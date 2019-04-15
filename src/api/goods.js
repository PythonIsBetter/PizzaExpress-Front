import http from './public'
// 商品列表
export const getAllGoods = (params) => {
  return http.fetchGet('http://3.80.255.90:8081/foreground/Home/menu', params)
}
// 获取购物车列表
export const getCartList = (params) => {
  return http.fetchPost('http://3.80.255.90:8081/foreground/member/cartList', params)
}
// 加入购物车
export const addCart = (params) => {
  return http.fetchPost('http://3.80.255.90:8081/foreground/member/addCart', params)
}
// 删除购物车
export const delCart = (params) => {
  return http.fetchPost('http://3.80.255.90:8081/foreground/member/delCart', params)
}
// 删除购物车勾选商品
export const delCartChecked = (params) => {
  return http.fetchPost('http://3.80.255.90:8081/foreground/member/delCartChecked', params)
}
// 编辑购物车
export const cartEdit = (params) => {
  return http.fetchPost('http://3.80.255.90:8081/foreground/member/cartEdit', params)
}
// 全选
export const editCheckAll = (params) => {
  return http.fetchPost('http://3.80.255.90:8081/foreground/member/editCheckAll', params)
}
// 删除整条购物车
export const cartDel = (params) => {
  return http.fetchPost('http://3.80.255.90:8081/foreground/member/cartDel', params)
}
// 获取用户地址
export const addressList = (params) => {
  return http.fetchPost('http://3.80.255.90:8081/foreground/user/addressList', params)
}
// 通过id获取地址
export const getAddress = (params) => {
  return http.fetchPost('http://3.80.255.90:8081/foreground/member/address', params)
}
// 修改收货地址
export const addressUpdate = (params) => {
  return http.fetchPost('http://3.80.255.90:8081/foreground/user/addressChange', params)
}
// 添加收货地址
export const addressAdd = (params) => {
  return http.fetchPost('http://3.80.255.90:8081/foreground/user/addressListCommit', params)
}
// 删除收货地址
export const addressDel = (params) => {
  return http.fetchPost('http://3.80.255.90:8081/foreground/user/addressDelete', params)
}
// 生成订单
export const submitOrder = (params) => {
  return http.fetchPost('http://3.80.255.90:8081/foreground/Home/orderCommit', params)
}
// 支付
export const payMent = (params) => {
  return http.fetchPost('http://3.80.255.90:8081/foreground/member/payOrder', params)
}
// 获取用户订单
export const orderList = (params) => {
  return http.fetchPost('http://3.80.255.90:8081/foreground/user/orderList', params)
}
// 获取单个订单详情
export const getOrderDet = (params) => {
  return http.fetchPost('http://3.80.255.90:8081/foreground/user/goodsDetails', params)
}
// 取消订单
export const cancelOrder = (params) => {
  return http.fetchPost('http://3.80.255.90:8081/foreground/member/cancelOrder', params)
}
// 商品详情|
export const productDet = (params) => {
  return http.fetchPost('http://3.80.255.90:8081/foreground/Home/itemInfo', params)
}
// 删除订单
export const delOrder = (params) => {
  return http.fetchPost('http://3.80.255.90:8081/foreground/user/delOrder', params)
}
// 商品列表
export const getSearch = (params) => {
  return http.fetchGet('http://3.80.255.90:8081/foreground/goods/search', params)
}
// 快速搜索
export const getQuickSearch = (params) => {
  return http.fetchGet('http://3.80.255.90:8081/foreground/goods/quickSearch', params)
}
// 主页图片
export const getHomePic = (params) => {
  return http.fetchGet('http://3.80.255.90:8081/foreground/goods/quickSearch', params)
}
// 支付页面跳转订单页面
export const tiaoZhuan = (params) => {
  return http.fetchPost('http://3.80.255.90:8081/foreground/Home/payment', params)
}
