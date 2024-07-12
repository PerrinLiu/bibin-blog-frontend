import request from "@/utils/request";


const comment = '/text/comment/'
const commentCommon = '/text/comment/common/'


export default {
    addDanmu(data) {
        return request.post(comment + 'addDanMu', data)
    },

    getDanmu() {
        return request.get(commentCommon + 'getDanMu')
    }
}