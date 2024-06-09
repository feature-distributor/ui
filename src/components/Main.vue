<template>
    <v-responsive class="border rounded" max-height="300">
        <v-app>
            <Nav :rail="rail" @changeRail="changeRail" />

            <AppBar :tab="tab" :tabs="tabs" @onHomeClick="onHomeClick" />

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
        tab: '1',
        projects: [
            { id: 1, title: 'Project 1', href: '#project-1' },
            { id: 2, title: 'Project 2', href: '#project-2' },
            { id: 3, title: 'Project 3', href: '#project-3' },
        ],
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