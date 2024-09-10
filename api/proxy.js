const {
    createProxyMiddleware
} = require('http-proxy-middleware')
const apiKey = localStorage.getItem('apiKey')
module.exports = (req, res) => {
    let target = ''
    let headers = {}
    // 代理目标地址
    if (req.url.startsWith('/mjapi')) { //这里使用/api可能会与vercel serverless 的 api 路径冲突，根据接口进行调整
        target = process.env.MJ_SERVER ?? 'https://api.openai-hk.com';
        headers = {
            'Mj-Api-Secret': process.env.MJ_API_SECRET // 添加自定义请求头
        }
    } else if (req.url.startsWith('/openapi')) {
        console.log(apiKey);
        target = process.env.OPENAI_API_BASE_URL ?? 'https://api.openai-hk.com';
        headers = {
            'Authorization': 'Bearer ' + apiKey // 添加自定义请求头
        }
    }
    // 创建代理对象并转发请求
    createProxyMiddleware({
        target,
        changeOrigin: true,
        headers,
        pathRewrite: {
            // 通过路径重写，去除请求路径中的 `/api`
            '^/mjapi/': '/'
            , '^/openapi/': '/'
        }
    })(req, res)
}
