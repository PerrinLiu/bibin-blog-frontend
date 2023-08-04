<template>
    <div class="login-page" style="margin-top: 50px;">
        <span style="margin-top: 100px;" v-if="user">
            {{ user }}
        </span>
        <span v-else>
            <form @submit.prevent="login">
                <div class="form-group" style="margin-top: 50px;">
                    <label>用户名</label>
                    <input type="text" v-model="userQuery.username" required />
                </div>
                <div class="form-group">
                    <label>密码</label>
                    <input type="password" v-model="userQuery.password" required />
                </div>
                <button type="submit">登录</button>
            </form>
        </span>
    </div>
</template>

<script>
import userApi from '@/api/userApi';
export default {
    data() {
        return {
            userQuery: {
                username: "",
                password: "",
            }
        }
    },
    computed: {
        user() {
            return this.$store.state.user; // 通过 this.$store.state 访问用户信息
        },
    },
    methods: {
        login() {
            userApi.login(this.userQuery).then(response => {
                const retCode = response.data.retCode;
                if (retCode == 200) {
                    localStorage.setItem('token', JSON.stringify(response.data.data.token));
                    this.getUser();
                    this.$message({
                        message: "登录成功",
                        type: 'success'
                    });
                    this.$router.push('/');
                } else {
                    this.$message({
                        message: response.data.message,
                        type: 'warning'
                    });
                }

            })
        },
        getUser() {
            userApi.getUser().then(response => {
                this.userInfo = response.data.data;
                // 假设登录成功后得到用户信息 user
                this.$store.commit('setUser', this.userInfo);
            })
        }
    }
}
</script>
