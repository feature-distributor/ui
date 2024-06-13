<template>
    <v-breadcrumbs :items="breadcrumb">
        <template v-slot:divider>
            <v-icon size="xs-small" icon="fas fa-chevron-right"></v-icon>
        </template>
    </v-breadcrumbs>
</template>

<script>
export default {
    computed: {
        breadcrumb() {
            let matchedArr = this.$route.matched.filter((item) => {
                return item.meta.showInbreadcrumb
            });
            return matchedArr.map((item) => {
                return {
                    title: item.meta.title,
                    to: item.path,
                }
            });
        },
    },
}
</script>