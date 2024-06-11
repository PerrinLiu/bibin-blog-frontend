import request from "@/request";

export default {
    addDiary(data) {
        return request.post('/text/diary/addDiary', data)
    },
    getDiaryAll() {
        return request.get('/text/diary/getDiaryAll')
    },
    getDiaryByUser() {
        return request.get('/text/diary/getDiaryByUser')
    },
    getDiaryBase(pageSize, pageNum) {
        return request.get('/text/diary/getDiaryBase?pageSize=' + pageSize + '&pageNum=' + pageNum)
    },
    getDiaryBaseByUser(pageSize, pageNum) {
        return request.get('/text/diary/getDiaryBaseByUser?pageSize=' + pageSize + '&pageNum=' + pageNum)
    },
    getDiaryOne(data) {
        return request.get('/text/diary/getDiaryOne', data)
    },
    deleteDiaryOne(data) {
        return request.delete('/text/diary/deleteDiaryOne', data)
    }

}