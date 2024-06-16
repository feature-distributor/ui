<template>
    <Loading :loading="loading" />
    <v-dialog v-model="createDialog" max-width="500" persistent>
        <template v-slot:activator="{ props: activatorProps }">
            <v-data-iterator :items="items" :items-per-page="size">
                <template v-slot:header>
                    <v-toolbar class="px-2">
                        <Breadcrumbs />
                        <v-spacer></v-spacer>
                        <v-btn size="x-large" variant="tonal" density="comfortable" color="primary"
                            v-bind="activatorProps">创建项目</v-btn>
                    </v-toolbar>
                </template>
                <template v-slot:default="{ items }">
                    <v-container fluid>
                        <v-row dense>
                            <v-col v-for="item in items" :key="item.id" cols="auto" md="4">
                                <ProjectListItem :item="item.raw" :ripple="false"
                                    @click="onProjectSelected(item.raw)" />
                            </v-col>
                        </v-row>
                    </v-container>
                </template>
            </v-data-iterator>
        </template>

        <template v-slot:default>
            <v-card title="创建项目">
                <v-card-text>
                    <v-text-field v-model="createProjectName" variant="underlined" :readonly="createLoading"
                        color="primary" density="comfortable" :rules="createProjectNameRules" label="项目名称"
                        placeholder="请输入项目名称"></v-text-field>

                    <v-text-field v-model="createProjectKey" variant="underlined" :readonly="createLoading"
                        color="primary" density="comfortable" :rules="createProjectKeyRules" label="项目唯一标识符"
                        placeholder="请输入项目唯一标识符"></v-text-field>
                </v-card-text>

                <template v-slot:actions>
                    <v-spacer></v-spacer>
                    <v-btn @click="createDialog = false">
                        取消
                    </v-btn>
                    <v-btn @click="onCreateProject">
                        创建
                    </v-btn>
                </template>
            </v-card>
        </template>
    </v-dialog>
</template>

<script>
import { getProjectList, createProject } from "../api/project";

export default {
    data: () => ({
        loading: false,
        items: [
        ],
        index: 1,
        size: 100,
        createDialog: false,
        createLoading: false,
        createProjectName: '',
        createProjectNameRules: [
            value => {
                if (value?.length > 0) return true
                return '项目名称不能为空'
            },
        ],
        createProjectKey: '',
        createProjectKeyRules: [
            value => {
                if (/^[a-zA-Z0-9_\-\.]+$/.test(value)) return true
                return '项目唯一标识符只能包含字母、数字、下划线、中划线、点'
            },
        ],
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
        onCreateProject() {
            this.createLoading = true

            createProject({
                name: this.createProjectName,
                key: this.createProjectKey,
            }).then(data => {
                this.createDialog = false
                this.$toast.success('项目创建成功');
                this.loadData();
            }).catch(error => {
                this.$toast.error(error.error);
            }).finally(() => {
                this.createLoading = false
            });
        },
    },
}
</script>