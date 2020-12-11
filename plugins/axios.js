import { Toast } from 'vant'

export default ({ redirect, $axios }) => {
    $axios.onRequest(config => {
        console.log('test onRequest', config)
        // 向请求头中塞入 token
        config.headers.token = 'xxx'
        console.log('test onRequest2', config)
    })

    $axios.onResponse(res => {
        // 返回数据逻辑处理
        console.log('test onResponse', res)
        if (res.data.code === 1001) {
            // 重定向到 login 页
            redirect('/login')
        }
        if (res.data.code != 200) {
            Toast.fail(res.data.message)
            throw new Error(res.data.message)
        }
    })

    $axios.onError(err => {
        Toast.fail(err)
        console.log('Making request to ' + err.response.config.url)
        switch (err.response.status) {
        case 403:
            // 重定向到 403 页
            redirect('/error/403')
            break;
        case 404:
            // 重定向到 404 页
            redirect('/error/404')
            break;
        case 500:
            // 重定向到 500 页
            redirect('/error/500')
            break;
        default:
            break;
        }
    })
}