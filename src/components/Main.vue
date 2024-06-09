<template>
    <v-responsive class="border rounded" max-height="300">
        <v-app>
            <AppBar :rail="rail" @onHomeClick="onHomeClick" />

            <Nav :rail="rail" @changeRail="changeRail" />

            <v-main>
                <v-container>
                    <h1>Main Content</h1>
                </v-container>
            </v-main>
        </v-app>
    </v-responsive>
</template>

<script>
export default {
    data: () => ({
        rail: true,
    }),
    methods: {
        onHomeClick() {
            this.rail = !this.rail
        },

        changeRail(newValue) {
            this.rail = newValue
        }
    }
}
</script>