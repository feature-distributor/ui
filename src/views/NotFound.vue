<template>
    <v-empty-state action-text="跳转到首页"
        image="https://cdn.vuetifyjs.com/docs/images/components/v-empty-state/connection.svg"
        text="您请求的页面似乎不存在，请检查您的链接或者点击下面的按钮返回首页。"
        title="Something Went Wrong" @click:action="onClickAction"></v-empty-state>
</template>

<script>
export default {
    methods: {
        onClickAction() {
            this.$router.push('/');
        }
    }
}
</script>