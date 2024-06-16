<template>
    <v-app-bar color="primary" prominent elevate>
        <v-img max-height="36" max-width="256" src="/logo.svg"></v-img>
        <v-app-bar-nav-icon size="small" icon="fas fa-bars" variant="text"
            @click.stop="onHomeClick()"></v-app-bar-nav-icon>
        <v-toolbar-title>{{ title }}</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-switch @click="toggleTheme" hide-details inset></v-switch>
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
<script setup>
import { useTheme } from 'vuetify'

const theme = useTheme()

function toggleTheme() {
    theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
}
</script>