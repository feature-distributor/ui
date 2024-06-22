<template>
    <Loading :loading="loading" />
    <v-data-iterator :items="items" :items-per-page="size">
        <template v-slot:header>
            <v-toolbar class="px-2">
                <Breadcrumbs />
                <v-spacer></v-spacer>
                <v-btn size="small" variant="tonal" color="primary" @click="createProject">创建项目</v-btn>
            </v-toolbar>
        </template>
        <template v-slot:default="{ items }">
            <v-container fluid>
                <v-row dense>
                    <v-col v-for="item in items" :key="item.id" cols="auto" md="4">
                        <ProjectListItem :item="item.raw" :ripple="false" @editProject="editProject(item.raw)"
                            @deleteProject="deleteProject(item.raw)" @click="onProjectSelected(item.raw)" />
                    </v-col>
                </v-row>
            </v-container>
        </template>
    </v-data-iterator>

    <v-dialog v-model="showCreateDialog" max-width="500" persistent>
        <template v-slot:default="{ isActive }">
            <v-card title="创建项目">
                <v-card-text>
                    <v-text-field v-model="saveProjectName" variant="underlined" :readonly="saveLoading" color="primary"
                        density="comfortable" :rules="projectNameRules" label="项目名称"
                        placeholder="请输入项目名称"></v-text-field>

                    <v-text-field v-model="saveProjectKey" variant="underlined" :readonly="saveLoading" color="primary"
                        density="comfortable" :rules="projectKeyRules" label="项目唯一标识符"
                        placeholder="请输入项目唯一标识符"></v-text-field>
                </v-card-text>

                <template v-slot:actions>
                    <v-spacer></v-spacer>
                    <v-btn @click="isActive.value = false">
                        取消
                    </v-btn>
                    <v-btn @click="onSaveProject(null)">
                        创建
                    </v-btn>
                </template>
            </v-card>
        </template>
    </v-dialog>
    <v-dialog v-model="showEditDialog" max-width="500" persistent>
        <template v-slot:default="{ isActive }">
            <v-card title="编辑项目">
                <v-card-text>
                    <v-text-field v-model="saveProjectName" variant="underlined" :readonly="saveLoading" color="primary"
                        density="comfortable" :rules="projectNameRules" label="项目名称"
                        placeholder="请输入项目名称"></v-text-field>

                    <v-text-field v-model="saveProjectKey" variant="underlined" color="primary" density="comfortable"
                        :rules="projectKeyRules" label="项目唯一标识符" readonly disabled></v-text-field>
                </v-card-text>

                <template v-slot:actions>
                    <v-spacer></v-spacer>
                    <v-btn @click="isActive.value = false">
                        取消
                    </v-btn>
                    <v-btn @click="onSaveProject(saveProjectId)">
                        保存
                    </v-btn>
                </template>
            </v-card>
        </template>
    </v-dialog>
    <v-dialog v-model="showDeleteDialog" max-width="500" persistent>
        <template v-slot:default="{ isActive }">
            <v-card>
                <v-card-text>
                    是否删除项目？
                </v-card-text>
                <template v-slot:actions>
                    <v-spacer></v-spacer>
                    <v-btn @click="isActive.value = false">
                        取消
                    </v-btn>
                    <v-btn @click="onDeleteProject(deleteProjectId)">
                        确认
                    </v-btn>
                </template>
            </v-card>
        </template>
    </v-dialog>
</template>

<script>
import { getProjectList, saveProject, deleteProject } from "../api/project";

export default {
    data: () => ({
        loading: false,
        items: [
        ],
        index: 1,
        size: 100,
        saveLoading: false,
        saveProjectName: '',
        projectNameRules: [
            value => {
                if (value?.length > 0) return true
                return '项目名称不能为空'
            },
        ],
        saveProjectKey: '',
        projectKeyRules: [
            value => {
                if (/^[a-zA-Z0-9_\-\.]+$/.test(value)) return true
                return '项目唯一标识符只能包含字母、数字、下划线、中划线、点'
            },
        ],
        saveProjectId: null,
        deleteProjectId: null,
        showCreateDialog: false,
        showEditDialog: false,
        showDeleteDialog: false,
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
        onSaveProject(projectId) {
            this.saveLoading = true

            saveProject({
                id: projectId,
                name: this.saveProjectName,
                key: this.saveProjectKey,
            }).then(data => {
                this.showCreateDialog = false;
                this.showEditDialog = false;
                this.$toast.success('项目保存成功');
                this.loadData();
            }).catch(error => {
                this.$toast.error(error.error);
            }).finally(() => {
                this.saveLoading = false
            });
        },
        onDeleteProject(projectId) {
            deleteProject({
                id: projectId,
            }).then(data => {
                this.showDeleteDialog = false;
                this.$toast.success('项目删除成功');
                this.loadData();
            }).catch(error => {
                this.$toast.error(error.error);
            });
        },
        createProject() {
            this.saveProjectId = null;
            this.saveProjectName = '';
            this.saveProjectKey = '';
            this.showCreateDialog = true;
        },
        editProject(project) {
            this.saveProjectId = project.id;
            this.saveProjectName = project.name;
            this.saveProjectKey = project.key;
            this.showEditDialog = true;
        },
        deleteProject(project) {
            this.deleteProjectId = project.id;
            this.showDeleteDialog = true;
        },
    },
}
</script>