const atricle = {
    state: {
        // 在这里定义状态
        group: null
    },
    mutations: {
        // 在这里定义变更函数
        SET_GROUP(state, data) {
            state.atricle = data
        },
    },
    actions: {
        // 在这里定义动作
        setGroup({ commit }, data) {
            commit('SET_GROUP', data)
        }
    },
}


export default atricle