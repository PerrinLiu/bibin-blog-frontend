import request from "@/request";


const prefix = '/text/article'

export default {
    addDiary(data) {
        return request.post('/text/text/addDiary', data)
    },

}