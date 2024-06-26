import axios from "axios";
axios.defaults.baseURL = "/api"
import { Message } from 'element-ui'
import { Notification } from 'element-ui'
import { Loading } from 'element-ui';


//loading对象
let loading;

//当前正在请求的数量
let needLoadingRequestCount = 0;

//显示loading
function showLoading(target) {
    // 后面这个判断很重要，因为关闭时加了抖动，此时loading对象可能还存在，
    // 但needLoadingRequestCount已经变成0.避免这种情况下会重新创建个loading
    if (needLoadingRequestCount === 0) {
        loading = Loading.service({
            lock: true,
            text: "Loading...",
            background: 'rgba(255, 255, 255, 0.5)',
            target: target || "body"
        });
    }
    needLoadingRequestCount++;
}

//隐藏loading
function hideLoading() {
    needLoadingRequestCount--;
    if (needLoadingRequestCount <= 0) {
        //关闭loading
        loading.close();
    }
}

axios.interceptors.request.use(config => {
    //判断当前请求是否设置了不显示Loading
    if (config.headers.showLoading == undefined) {
        showLoading(config.headers.loadingTarget);
    }
    if (localStorage.getItem('token')) {
        // 在发送请求之前做些什么
        const token = JSON.parse(localStorage.getItem('token'));
        config.headers['x-token'] = token;
    }

    if (localStorage.getItem('emailToken') !== null && localStorage.getItem('emailToken') !== undefined) {
        const emailToken = JSON.parse(localStorage.getItem('emailToken'));
        config.headers['email-token'] = emailToken;
    }

    if (localStorage.getItem('captchaToken') !== null && localStorage.getItem('captchaToken') !== undefined) {
        const captchaToken = JSON.parse(localStorage.getItem('captchaToken'));
        config.headers['captchaToken'] = captchaToken;
    }
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});


axios.interceptors.response.use(
    response => {
        hideLoading();
        return response;
    },
    err => {
        hideLoading();
        const res = err.response
        if (err.response.status === 400) {
            Message.error(err.response.data.message)
            return
        } else if (err.response.data.retCode === 401) {
            Message.error('请先登录~')
            return
        }
        if (axios.isAxiosError(err)) {
            if (res.status == 404) {
                Notification.error({
                    title: '404 not fount',
                    dangerouslyUseHTMLString: true,
                    message: '<strong>请求路径:</strong>' + res.data.path +
                        '<br/><strong>错误信息:</strong>' + err.message
                })
                return Promise.reject(err)
            }
            Message.error("服务器错误,请稍后或联系管理员~")
            return Promise.reject(err)
        }
    })


export default {
    get(url, data = {}, config = {}) {
        return new Promise((resolve, reject) => {
            axios.get(url, data, config)
                .then((response) => {
                    resolve(response);
                })
                .catch((err) => {
                    reject(err);
                })
        })
    },
    post(url, data = {}, config = {}) {
        return new Promise((resolve, reject) => {
            axios.post(url, data, config)
                .then((response) => {
                    resolve(response);
                })
                .catch((err) => {
                    reject(err);
                })
        })
    },
    delete(url, data = {}, config = {}) {
        return new Promise((resolve, reject) => {
            axios.delete(url, data, config)
                .then((response) => {
                    resolve(response);
                })
                .catch((err) => {
                    reject(err);
                })
        })
    },
    put(url, data = {}, config = {}) {
        return new Promise((resolve, reject) => {
            axios.put(url, data, config)
                .then((response) => {
                    resolve(response);
                })
                .catch((err) => {
                    reject(err);
                })
        })
    },

};

