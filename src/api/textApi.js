import request from "@/request";

export default {
    addDiary(data) {
        return request.post('/text/addDiary', data)
    },
    getDiaryAll() {
        return request.get('/text/getDiaryAll')
    },
    getDiaryByUser() {
        return request.get('/text/getDiaryByUser')
    },
    getDiaryBase(pageSize, pageNum) {
        return request.get('/text/getDiaryBase?pageSize=' + pageSize + '&pageNum=' + pageNum)
    },
    getDiaryBaseByUser(pageSize, pageNum) {
        return request.get('/text/getDiaryBaseByUser?pageSize=' + pageSize + '&pageNum=' + pageNum)
    },
    getDiaryOne(data) {
        return request.get('/text/getDiaryOne', data)
    },
    deleteDiaryOne(data) {
        return request.delete('/text/deleteDiaryOne', data)
    }

}