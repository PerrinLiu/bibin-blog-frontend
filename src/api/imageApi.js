import request from "@/utils/request";


const image = '/text/image/'
const imageCommon = '/text/image/common/'


export default {

    uploadFile(file) {
        return request.post(image + 'uploadFile', file)
    },


    groupCountByUser(pageNum, pageSize, searchText) {
        return request.get(imageCommon + 'groupCountByUser?pageNum=' + pageNum + '&pageSize=' + pageSize + '&searchText=' + searchText)
    },


    listImgByUserId(userId) {
        return request.get(imageCommon + 'listImgByUserId?userId=' + userId)
    },
    listImgMy() {
        return request.get(image + 'listImgByUser')
    },
    deleteImg(id) {
        return request.delete(image + 'deleteImg?imgId=' + id)
    },
    openOrClose(id) {
        return request.put(image + 'openOrCloseImg?imgId=' + id)
    }
}