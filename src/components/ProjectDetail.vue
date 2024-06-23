<template>
    <Loading :loading="loading" />
    <v-data-iterator :items="items" :items-per-page="size">
        <template v-slot:header>
            <v-toolbar class="px-2">
                <Breadcrumbs />
                <v-spacer></v-spacer>
                <v-btn size="small" variant="tonal" color="primary" @click="showCreateDialog = true">新增开关</v-btn>
            </v-toolbar>
            <v-card class="ma-2" elevated>
                <v-card-text>
                    <h2>{{ project?.name }}</h2>
                    <p>项目ID: {{ project?.id }}</p>
                    <p>项目唯一标识符: {{ project?.key }}</p>
                    <p>服务端密钥: {{ project?.server_key }}</p>
                    <p>客户端密钥: {{ project?.client_key }}</p>
                </v-card-text>
            </v-card>
            <v-pagination v-model="index" :length="totalPages"></v-pagination>
        </template>
        <template v-slot:default>
            <v-data-table-server :headers="headers" :items="items" :loading="loading" :items-per-page="size"
                hover="true" hide-default-footer>
                <template v-slot:item.name="{ item }">
                    <div>
                        <span class="text-body-1">{{ item.title }}</span>
                        <v-chip rounded="lg" size="x-small" color="secondary" variant="flat">{{
                            item.key }}</v-chip>
                    </div>
                </template>
                <template v-slot:item.enabled="{ item }">
                    <v-chip rounded="lg" :color="getEnabledColor(item.enabled)">
                        <template v-slot:prepend>
                            <v-icon icon="fas fa-circle" size="xs-small" class="me-1"></v-icon>
                        </template>
                        <template v-slot:default>
                            <v-label :text="item.enabled ? '启用' : '禁用'"></v-label>
                        </template>
                    </v-chip>
                </template>
                <template v-slot:item.type="{ item }">
                    <v-chip rounded="lg" color="secondary">{{ item.valueType }}</v-chip>
                </template>
                <template v-slot:item.description="{ item }">
                    <v-tooltip :text="item.description" location="bottom" max-width="720px">
                        <template v-slot:activator="{ props }">
                            <p v-bind="props" style="max-width: 720px; width: 720px;" class="text-truncate">{{
                                item.description }}</p>
                        </template>
                    </v-tooltip>
                </template>
                <template v-slot:item.operation="{ item }">
                    <div>
                        <v-btn size="small" variant="text" color="primary">编辑</v-btn>
                        <v-btn size="small" variant="text" color="primary" @click="onDeleteToggle(item)">删除</v-btn>
                    </div>
                </template>
            </v-data-table-server>
        </template>
    </v-data-iterator>

    <CreateToggleDialog v-if="showCreateDialog" :initShow="showCreateDialog" @onDismiss="showCreateDialog = false" />
</template>

<script>
import { getProject } from "../api/project";
import { getToggleList } from "../api/toggle";

export default {
    props: {
        id: String,
    },
    data: () => ({
        loading: false,
        project: null,
        headers: [
            { title: '名称', key: 'name', sortable: false, align: 'start', width: '25%' },
            { title: '启用状态', key: 'enabled', sortable: false, align: 'center', width: '10%' },
            { title: '类型', key: 'type', sortable: false, align: 'center', width: '10%' },
            { title: '描述信息', key: 'description', sortable: false, align: 'start', width: '30%' },
            { title: '操作', key: 'operation', sortable: false, align: 'start', width: '15%' },
        ],
        items: [
        ],
        index: 1,
        size: 10,
        totalPages: 1,
        dialogLoading: false,
        editProject: null,
        showCreateDialog: false,
        showEditDialog: false,
    }),
    mounted() {
        getProject({
            id: this.id,
        }).then(data => {
            this.project = data;
        }).catch(error => {
            console.log(error);
        });
        this.loadData();
    },
    methods: {
        getEnabledColor(value) {
            return value ? 'green' : 'red';
        },
        loadData() {
            this.loading = true

            getToggleList({
                projectId: this.id,
                index: this.index,
                size: this.size,
            }).then(data => {
                this.items = data.list;
                this.totalPages = (data.total / data.size) + 1;
            }).catch(error => {
                console.log(error);
            }).finally(() => {
                this.loading = false
            });
        },
        onDeleteToggle(toggle) {
            this.$confirm({
                title: '删除开关',
                message: '确定要删除开关 ' + toggle.title + ' 吗？',
            }).then(() => {
                // deleteProject({ id: project.id }).then(() => {
                //     this.$toast.success('项目删除成功');
                //     this.loadData();
                // }).catch(error => {
                //     this.$toast.error(error.error);
                // });
            }).catch(() => {
            });
        },
    },
}
</script>