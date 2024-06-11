import request from "@/request";


const article = '/text/article'

export default {
    addArticle(data) {
        return request.post(article + '/addArticle', data)
    },
    getGroupList() {
        return request.get(article + '/getGroupList')
    },
    listArticle(pageSize, pageNum, searchText) {
        return request.get(article + '/listArticle?pageSize=' + pageSize + '&pageNum=' + pageNum + '&searchText=' + searchText)
    }

}