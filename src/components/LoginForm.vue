<template>
    <v-card class="mx-auto pa-12 pb-8" elevation="8" width="448" rounded="lg">
        <v-img height="76" @dragstart.prevent src="/logo.svg"></v-img>
        <br>
        <v-form @submit.prevent="onSubmit">
            <v-text-field v-model="username" color="primary" density="comfortable"
                prepend-inner-icon="fas fa-circle-user" variant="outlined" :readonly="loading" :rules="usernameRules"
                label="用户名" placeholder="请输入用户名" clearable></v-text-field>

            <br>

            <v-text-field v-model="password" color="primary" density="comfortable" prepend-inner-icon="fas fa-lock"
                variant="outlined" :readonly="loading" :rules="passwordRules" label="密码" placeholder="请输入密码"
                :append-inner-icon="visible ? 'fas fa-eye-slash' : 'fas fa-eye'" :type="visible ? 'text' : 'password'"
                @click:append-inner="visible = !visible" clearable></v-text-field>

            <br>

            <v-btn :loading="loading" color="blue" size="large" type="submit" variant="flat" block>
                登录
            </v-btn>
        </v-form>
    </v-card>
</template>

<script>
import { login } from "../api/login";

export default {
    data: () => ({
        visible: false,
        loading: false,
        username: null,
        usernameRules: [
            value => {
                if (value?.length > 0) return true
                return '用户名不能为空'
            },
        ],
        password: null,
        passwordRules: [
            value => {
                if (value?.length > 0) return true
                return '密码不能为空'
            },
        ],
    }),

    methods: {
        onSubmit() {
            this.loading = true

            login({
                username: this.username,
                password: this.password,
            }).then(data => {
                this.$router.push('/')
            }).catch(error => {
                console.log(error)
            }).finally(() => {
                this.loading = false
            });
        },
    },
}
</script>