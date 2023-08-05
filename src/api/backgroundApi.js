import request from "@/request";

export default{
    getImg(){
        return request.post('/imageApi?home=home&type=urls&itype=user&id=takagi').then(response=> response ).catch(err=> err)
    },
}