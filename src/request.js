import axios from "axios";
axios.defaults.baseURL = "api"

axios.interceptors.request.use(config => {
    if (localStorage.getItem('token')) {
        // 在发送请求之前做些什么
        const token = JSON.parse(localStorage.getItem('token'));
        config.headers['x-token'] = token;
    }
    
    if(localStorage.getItem('emailToken')){
        const emailToken = JSON.parse(localStorage.getItem('emailToken'));
        config.headers['email-token'] = emailToken;
    }

    if(localStorage.getItem('captchaToken')){
        const captchaToken = JSON.parse(localStorage.getItem('captchaToken'));
        config.headers['captchaToken'] = captchaToken;
    }
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});


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

