import request from "@/request";

export default{
    addDiary(data){
        return request.post('/text/addDiary',data)
    },
    getDiaryAll(){
        return request.get('/text/getDiaryAll')
    },
    getDiaryByUser(){
        return request.get('/text/getDiaryByUser')
    },
    getDiaryBase(){
        return request.get('/text/getDiaryBase')
    },
    getDiaryBaseByUser(){
        return request.get('/text/getDiaryBaseByUser')
    },
    getDiaryOne(data){
        return request.get('/text/getDiaryOne',data)
    },
    deleteDiaryOne(data){
        return request.delete('/text/deleteDiaryOne',data)
    }
    
}