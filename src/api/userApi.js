import request from "@/request";

export default {
    getGenerateBase64() {
        return request.get("/user/generate-base64");
    },
    login(data) {
        return request.post('/user/login', data)
    },
    getUser() {
        return request.get('/user/getUser')
    },
    logout() {
        return request.get('/user/logout')
    },
    updateUser(data) {
        return request.put('/user/updateUser', data)
    },
    register(data) {
        return request.post('/user/register', data)
    },
    sendEmail(email, bool) {
        return request.get('/user/sendEmail?email=' + email + '&bool=' + bool)
    },
    updateUserImg(data) {
        return request.post('/user/updateUserImg', data)
    },
    getAccess() {
        return request.get('/user/getAccess');
    },
    emailIsTrue(data) {
        return request.post('/user/emailIsTrue', data);
    },
    updatePassword(data) {
        return request.post('/user/updatePassword', data);
    }
}