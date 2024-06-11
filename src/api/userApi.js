import request from "@/request";

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
    sendEmail(email, bool) {
        return request.get('/user/user/sendEmail?email=' + email + '&bool=' + bool)
    },
    updateUserImg(data) {
        return request.post('/user/user/updateUserImg', data)
    },
    getAccess() {
        return request.get('/user/user/getAccess');
    },
    emailIsTrue(data) {
        return request.post('/user/user/emailIsTrue', data);
    },
    updatePassword(data) {
        return request.post('/user/user/updatePassword', data);
    }
}