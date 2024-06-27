import request from "@/utils/request";


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
    listIndexArticle() {
        return request.get(articleCommon + '/listIndexArticle')
    },
    getArticleOne(id) {
        return request.get(articleCommon + '/getArticle?articleId=' + id)
    },
    getArticleAll() {
        return request.get('/text/article/getArticleAll')
    },
    likeOrStarArticle(data) {
        return request.post('/text/article/likeOrStarArticle?articleId=' + data.id + '&type=' + data.type, null, { headers: { 'showLoading': false } })
    },
    listComment(data) {
        return request.get('/text/article/listComment?articleId=' + data.articleId + '&pageSize=' + data.pageSize + '&pageNum=' + data.pageNum)
    },
    addComment(data) {
        return request.post('/text/article/addComment', data)
    },
    likeComment(data) {
        return request.post('/text/article/likeComment?commentId=' + data, null, { headers: { 'showLoading': false } })
    }

}