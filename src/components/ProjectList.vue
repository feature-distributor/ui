<template>
    <Loading :loading="loading" />
    <v-data-iterator :items="items" :items-per-page="size">
        <template v-slot:header>
            <v-toolbar class="px-2">
                <Breadcrumbs />
                <v-spacer></v-spacer>
                <v-btn size="small" variant="tonal" color="primary" @click="showCreateDialog = true">创建项目</v-btn>
            </v-toolbar>
        </template>
        <template v-slot:default="{ items }">
            <v-container fluid>
                <v-row dense>
                    <v-col v-for="item in items" :key="item.id" cols="auto" md="4">
                        <ProjectListItem :item="item.raw" :ripple="false"
                            @editProject="editProject = item.raw; showEditDialog = true"
                            @deleteProject="onDeleteProject(item.raw)" @click="onProjectSelected(item.raw)" />
                    </v-col>
                </v-row>
            </v-container>
        </template>
    </v-data-iterator>

    <CreateProjectDialog v-if="showCreateDialog" :initShow="showCreateDialog" @saveProject="onSaveProject"
        @onDismiss="showCreateDialog = false" />

    <EditProjectDialog v-if="showEditDialog" :initShow="showEditDialog" :initProject="editProject"
        @saveProject="onSaveProject" @onDismiss="showEditDialog = false" />
</template>

<script>
import { getProjectList, saveProject, deleteProject } from "../api/project";

export default {
    data: () => ({
        loading: false,
        items: [],
        index: 1,
        size: 100,
        dialogLoading: false,
        editProject: null,
        showCreateDialog: false,
        showEditDialog: false,
    }),
    mounted() {
        this.loadData();
    },
    methods: {
        loadData() {
            this.loading = true

            getProjectList({
                index: this.index,
                size: this.size,
            }).then(data => {
                this.items = data.list;
            }).catch(error => {
                console.log(error);
            }).finally(() => {
                this.loading = false
            });
        },
        onProjectSelected(project) {
            this.$router.push('/projects/' + project.id)
        },
        onSaveProject({ id, name, key }) {
            saveProject({
                id: id,
                name: name,
                key: key,
            }).then(() => {
                this.showCreateDialog = false;
                this.showEditDialog = false;
                this.$toast.success('项目保存成功');
                this.loadData();
            }).catch(error => {
                this.$toast.error(error.error);
            }).finally(() => {
                this.dialogLoading = false;
            });
        },
        onDeleteProject(project) {
            this.$confirm({
                title: '删除项目',
                message: '确定要删除项目 ' + project.name + ' 吗？',
            }).then(() => {
                deleteProject({ id: project.id }).then(() => {
                    this.$toast.success('项目删除成功');
                    this.loadData();
                }).catch(error => {
                    this.$toast.error(error.error);
                });
            }).catch(() => {
            });
        },
    },
}
</script>