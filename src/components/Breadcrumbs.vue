<template>
    <v-breadcrumbs :items="items"></v-breadcrumbs>
</template>

<script>
export default {
    props: {
        subItems: Array,
    },
    computed: {
        items() {
            const homeItem = {
                title: '首页',
                disabled: false,
                to: '/',
            }
            const result = [
                homeItem,
                ...this.subItems.map(item => ({
                    title: item.title,
                    disabled: false,
                    to: item.href ? item.href : '/',
                })),
            ]
            result[result.length - 1].disabled = true
            return result
        },
    },
    methods: {
        onClick(item) {
            if (item.href) {
                this.$router.push(item.href)
            }
        },
    },
}
</script>