import request from "@/request";


const article = '/text/article'
const articleCommon = '/text/article/common'

export default {
    addArticle(data) {
        return request.post(article + '/addArticle', data)
    },
    getGroupList() {
        return request.get(article + '/getGroupList')
    },
    listArticle(pageSize, pageNum, searchText) {
        return request.get(article + '/listArticle?pageSize=' + pageSize + '&pageNum=' + pageNum + '&searchText=' + searchText)
    },
    getArticleOne(id) {
        return request.get(articleCommon + '/getArticle?articleId=' + id)
    },
    getArticleAll() {
        return request.get('/text/article/getArticleAll')
    }

}