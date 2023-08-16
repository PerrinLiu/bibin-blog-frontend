import request from "@/request";

export default{
    addDiary(data){
        return request.post('/text/addDiary',data)
    },
    getDiary(){
        return request.get('/text/getDiary')
    },
}