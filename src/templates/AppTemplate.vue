<template>
    <v-responsive class="border rounded">
        <v-app>
            <AppBar :title="title" @onHomeClick="changeRail(!rail)" />

            <Nav :rail="rail" @onLogout="onLogout" />

            <v-main>
                <slot></slot>
            </v-main>
        </v-app>
    </v-responsive>
</template>

<script>
export default {
    props: {
        title: String,
        content: Object,
    },
    data: () => ({
        rail: false,
    }),
    methods: {
        onLogout() {
            this.$router.push('/login')
        },
        changeRail(newValue) {
            this.rail = newValue
        },
    },
}
</script>