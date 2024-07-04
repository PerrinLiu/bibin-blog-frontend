import request from "@/utils/request";

export default {
    addDiary(data) {
        return request.post('/text/diary/addDiary', data)
    },
    getDiaryAll(pageSize, pageNum, userId, searchText, status) {
        return request.get('/text/diary/getDiaryAll?pageSize=' + pageSize + '&pageNum=' + pageNum + '&searchText=' + searchText + (userId !== null ? '&userId=' + userId : '') + (status !== null ? '&status=' + status : ''))
    },
    getDiaryByUser(id) {
        return request.get('/text/diary/getDiaryByUser?userId=' + id)
    },
    getDiaryBase(pageSize, pageNum) {
        return request.get('/text/diary/getDiaryBase?pageSize=' + pageSize + '&pageNum=' + pageNum)
    },
    getDiaryBaseByUser(pageSize, pageNum) {
        return request.get('/text/diary/getDiaryBaseByUser?pageSize=' + pageSize + '&pageNum=' + pageNum)
    },
    getDiaryOne(data) {
        return request.get('/text/diary/getDiaryOne?diaryId=' + data)
    },
    deleteDiaryOne(data) {
        return request.delete('/text/diary/deleteDiaryOne', data)
    },
    rejectDiary(data) {
        return request.put('/text/diary/rejectDiary', data)
    },
    passDiary(data) {
        return request.put('/text/diary/passDiary', data)
    }

}