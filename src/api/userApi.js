import request from "@/request";

export default{
    login(data){
        return request.post('/user/login',data)
    },
    getUser(){
        return request.get('/user/getUser')
    },
    logout(){
        return request.get('/user/logout')
    },
    updateUser(data){
        return request.put('/user/updateUser',data)
    },
    register(data){
        return request.post('/user/register',data)
    },
    sendEmail(data){
        return request.get('/user/sendEmail',data)
    },
    updateUserImg(data){
        return request.post('/user/updateUserImg',data)
    }
}