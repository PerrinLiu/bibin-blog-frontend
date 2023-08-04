import request from "@/request";
import axios from "axios";
axios.defaults.baseURL = "api/user/user"

export default{
    login(data){
        return request.post('/login',data).then(response=> response )
    },
    getUser(){
        return request.get('/getUser').then(response=> response )
    },
    logout(){
        return request.get('/logout').then(response=> response )
    }
}