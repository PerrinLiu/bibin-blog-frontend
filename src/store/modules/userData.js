
const user = {
    state: {
        // 在这里定义状态
        user: null, // 这里存储用户信息
        isPhone: null,
        //用户图片列表
        userList: null
    },
    mutations: {
        SET_USER(state, user) {
            state.user = user; // 这里修改用户信息的方法
        },
        SET_ISPHONE(state, isPhone) {
            state.isPhone = isPhone;
        },
        CLEAT_USER(state) {
            state.user = null;
        },
        SET_USERLIST(state, userList) {
            state.userList = userList;
        },
    },
    actions: {
        // 在这里定义方法
        setUser({ commit }, user) {
            commit('SET_USER', user)
        },
        setIsPhone({ commit }, isPhone) {
            commit('SET_ISPHONE', isPhone)
        },
        cleatUser({ commit }) {
            commit('CLEAT_USER')
        },
        setUserList({ commit }, userList) {
            commit('SET_USERLIST', userList)
        }
    },
}


export default user