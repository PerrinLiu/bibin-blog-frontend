const atricle = {
    state: {
        // 在这里定义状态
        groupList: null
    },
    mutations: {
        // 在这里定义变更函数
        SET_GROUPLIST(state, data) {
            state.groupList = data
        },
    },
    actions: {
        // 在这里定义动作
        setGroupList({ commit }, data) {
            commit('SET_GROUPLIST', data)
        }
    },
}


export default atricle