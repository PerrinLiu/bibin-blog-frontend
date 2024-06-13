
const user = {
    state: {
        // 在这里定义状态
        user: null, // 这里存储用户信息
        isPhone: null,
    },
    mutations: {
        SET_USER(state, user) {
            console.log(user, state.user);
            state.user = user; // 这里修改用户信息的方法
        },
        SET_ISPHONE(state, isPhone) {
            console.log(isPhone, state.isPhone);
            state.isPhone = isPhone;
        },
        CLAET_USER(state) {
            state.user = null;
        },
    },
    actions: {
        // 在这里定义方法
        setUser({ commit }, user) {
            commit('SET_USER', user)
        },
        setIsPhone({ commit }, isPhone) {
            console.log(isPhone);
            commit('SET_ISPHONE', isPhone)
        },
        claetUser({ commit }) {
            commit('CLAET_USER')
        }
    },
}


export default user