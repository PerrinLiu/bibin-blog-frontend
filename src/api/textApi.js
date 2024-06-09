import request from "@/request";

export default {
    addDiary(data) {
        return request.post('/text/text/addDiary', data)
    },
    getDiaryAll() {
        return request.get('/text/text/getDiaryAll')
    },
    getDiaryByUser() {
        return request.get('/text/text/getDiaryByUser')
    },
    getDiaryBase(pageSize, pageNum) {
        return request.get('/text/text/getDiaryBase?pageSize=' + pageSize + '&pageNum=' + pageNum)
    },
    getDiaryBaseByUser(pageSize, pageNum) {
        return request.get('/text/text/getDiaryBaseByUser?pageSize=' + pageSize + '&pageNum=' + pageNum)
    },
    getDiaryOne(data) {
        return request.get('/text/text/getDiaryOne', data)
    },
    deleteDiaryOne(data) {
        return request.delete('/text/text/deleteDiaryOne', data)
    }

}