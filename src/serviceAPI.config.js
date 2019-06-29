const BASEURL = "https://www.easy-mock.com/mock/5d0555b99a97296cbe211e83/SmileVue/"
const LOCALURL = "http://192.168.0.105:3000/"
const URL ={
    getShoppingMallInfo : BASEURL+'index',    //商城首页所有信息
    getGoodsInfo : BASEURL+'getGoodsInfo',
    registerUser : LOCALURL+'user/register',   //用户注册接口
    login : LOCALURL+'user/login',   //用户注册接口
    getDetailGoodsInfo : LOCALURL+'goods/getDetailGoodsInfo',   //获取商品详情
    getCateGoryList : LOCALURL+'goods/getCateGoryList',   //获取一级分类
    getCategorySubList : LOCALURL+'goods/getCategorySubList',   //获取二级分类
    getGoodsListByCategorySubID : LOCALURL+'goods/getGoodsListByCategorySubID',   //获取二级分类下的商品信息
}
module.exports = URL