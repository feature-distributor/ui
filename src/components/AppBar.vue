<template>
    <v-app-bar color="primary" prominent>
        <v-app-bar-nav-icon size="small" icon="fas fa-bars" variant="text"
            @click.stop="onHomeClick()"></v-app-bar-nav-icon>
        <v-toolbar-title>{{ title }}</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn icon="fas fa-ellipsis-vertical" variant="text"></v-btn>
    </v-app-bar>
</template>

<script>
export default {
    props: {
        title: String,
    },
    methods: {
        onHomeClick() {
            this.$emit('onHomeClick')
        },
    }
}
</script>