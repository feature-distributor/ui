<template>
    <v-responsive class="border rounded">
        <v-app>
            <Nav :rail="rail" @onLogout="onLogout" />

            <AppBar title="项目" @onHomeClick="changeRail(!rail)" />

            <v-main>
                <Breadcrumbs :subItems="breadcrumbs" />
                <v-card class="ma-2" elevated>
                    <v-card-text>
                        <h2>{{ project?.title }}</h2>
                        <p>这是项目ID: {{ project?.id }}</p>
                    </v-card-text>
                </v-card>
            </v-main>
        </v-app>
    </v-responsive>
</template>

<script>
export default {
    props: ['id'],
    computed: {
        project() {
            return {
                id: this.$route.params.id,
                title: '项目 ' + this.$route.params.id,
            }
        }
    },
    data: () => ({
        rail: false,
        breadcrumbs: [
            { title: '项目', href: '/projects' },
            { title: '项目详情' },
        ],
    }),
    methods: {
        onLogout() {
            this.$router.push('/login')
        },
        changeRail(newValue) {
            this.rail = newValue
        },
        onProjectSelected(project) {
            this.showProjectItem = project
        },
    },
}
</script>