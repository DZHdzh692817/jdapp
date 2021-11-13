//1.npm run build 打包代码
//2.把代码给后端
//3.后端把前端代码放入后端工程
//4.后端重启后端服务
// 容易出问题的就算下面的路径配置不对 比如'./' 可能改成 '/jingdong'文件名 我修改了dfdfd
module.exports = {
    publicPath: './jingdong' //'./'
}