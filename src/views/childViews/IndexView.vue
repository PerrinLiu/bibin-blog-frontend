<template>
    <div class="index-page" style="z-index: 10;margin-top: 50px;">
        index
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
    </div>
</template>

<script>
export default {
    data() {
        return {
            
        }
    },
}
</script>
