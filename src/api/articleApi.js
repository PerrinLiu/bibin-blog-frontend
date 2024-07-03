import request from "@/utils/request";


const article = '/text/article'
const articleCommon = '/text/article/common'

export default {
    addArticle(data) {
        return request.post(article + '/addArticle', data)
    },
    deleteArticle(id) {
        return request.delete(article + '/deleteArticle?articleId=' + id)
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
        return request.get('/text/comment/common/listComment?articleId=' + data.articleId + '&pageSize=' + data.pageSize + '&pageNum=' + data.pageNum)
    },
    addComment(data) {
        return request.post('/text/comment/addComment', data)
    },
    likeComment(commentId, userId) {
        return request.post('/text/comment/likeComment?commentId=' + commentId + '&userId=' + userId, null, { headers: { 'showLoading': false } })
    },
    deleteComment(id) {
        return request.delete('/text/comment/deleteComment?commentId=' + id)
    },

}