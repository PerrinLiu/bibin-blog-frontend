import request from "@/utils/request";

export default {
    getGenerateBase64() {
        return request.get("/user/user/generate-base64");
    },
    login(data) {
        return request.post('/user/user/login', data)
    },
    getUser() {
        return request.get('/user/user/getUser')
    },
    logout() {
        return request.get('/user/user/logout')
    },
    updateUser(data) {
        return request.put('/user/user/updateUser', data)
    },
    register(data) {
        return request.post('/user/user/register', data)
    },
    sendEmail(email, type) {
        return request.get('/user/user/sendEmail?email=' + email + '&type=' + type)
    },
    updateUserImg(data) {
        return request.post('/user/user/updateUserImg', data)
    },
    getAccess() {
        return request.get('/user/user/getAccess');
    },
    getCountData() {
        return request.get('/user/user/common/getCountData');
    },
    emailIsTrue(data) {
        return request.post('/user/user/emailIsTrue', data);
    },
    updatePassword(data) {
        return request.post('/user/user/updatePassword', data);
    }
}