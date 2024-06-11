<template>
    <div>
        <v-sheet class="mx-auto" width="300">
            <v-form fast-fail @submit.prevent>
                <v-text-field v-model="username" :rules="usernameRules" label="用户名" outlined></v-text-field>
                <v-text-field v-model="password" :rules="passwordRules" label="密码" outlined
                    type="password"></v-text-field>
                <v-btn @click="onSubmit" color="primary" dark>登录</v-btn>
            </v-form>
        </v-sheet>
        <v-overlay :model-value="loading" class="align-center justify-center">
            <v-progress-circular color="primary" size="64" indeterminate></v-progress-circular>
        </v-overlay>
    </div>
</template>

<script>
import { login } from "../api/login";

export default {
    data: () => ({
        loading: false,

        username: '',
        usernameRules: [
            value => {
                if (value?.length > 0) return true
                return '用户名不能为空'
            },
        ],
        password: '',
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
                this.$router.push('/projects')
            }).catch(error => {
                console.log(error)
            }).finally(() => {
                this.loading = false
            });
        }
    },
}
</script>