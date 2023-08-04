import request from "@/request";

export default{
    login(data){
        return request.post('/user/login',data).then(response=> response ).catch(err=> err)
    },
    getUser(){
        return request.get('/user/getUser').then(response=> response ).catch(err=> err)
    },
    logout(){
        return request.get('/user/logout').then(response=> response ).catch(err=> err)
    }
}