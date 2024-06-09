<template>
    <v-responsive class="border rounded">
        <v-app>
            <Nav :rail="rail" @onLogout="onLogout" />

            <AppBar title="项目" @onHomeClick="changeRail(!rail)" />

            <v-main>
                <Breadcrumbs :subItems="breadcrumbs" />
                <v-item-group mandatory>
                    <v-container>
                        <v-row>
                            <v-col cols="12">
                                <v-item v-for="item in items" :key="item.id">
                                    <v-item-title>{{ item.title }}</v-item-title>
                                    <v-item-action>
                                        <v-btn @click="onProjectSelected(item)">查看</v-btn>
                                    </v-item-action>
                                </v-item>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-item-group>
            </v-main>
        </v-app>
    </v-responsive>
</template>

<script>
export default {
    data: () => ({
        rail: false,
        showProjectItem: null,
        breadcrumbs: [
            { title: '项目' },
        ],
        items: [
            { id: 1, title: '项目 1' },
            { id: 2, title: '项目 2' },
            { id: 3, title: '项目 3' },
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
            this.$router.push('/project/' + project.id)
        },
    },
}
</script>