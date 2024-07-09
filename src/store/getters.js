// getters.js,获取vuex数据
const getters = {
    groupList: state => state.article.groupList,
    isPhone: state => state.userData.isPhone,
    user: state => state.userData.user,
    userList: state => state.userData.userList

}
export default getters
