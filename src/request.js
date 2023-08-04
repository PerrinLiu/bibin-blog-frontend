import axios from "axios";


axios.interceptors.request.use(config => {
    if (localStorage.getItem('token')) {
        // 在发送请求之前做些什么
        const token = JSON.parse(localStorage.getItem('token'));
        config.headers['x-token'] = token;
    }
    return config;
}, function (error) {
    // 对请求错误做些什么
    console.log("1")
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

};

