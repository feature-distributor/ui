<template>
    <Loading :loading="loading" />
    <v-data-iterator :items="items" :items-per-page="size">
        <template v-slot:header>
            <v-toolbar class="px-2">
                <Breadcrumbs />
                <v-spacer></v-spacer>
                <v-btn id="activator-create" size="small" variant="tonal" color="primary">新增开关</v-btn>
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
                <template v-slot:item.operation>
                    <div>
                        <v-btn id="activator-edit" size="small" variant="text" color="primary">编辑</v-btn>
                        <v-btn id="activator-delete" size="small" variant="text" color="primary">删除</v-btn>
                    </div>
                </template>
            </v-data-table-server>
        </template>
    </v-data-iterator>

    <v-dialog activator="#activator-create" max-width="500" persistent>
        <template v-slot:default="{ isActive }">
            <v-card title="新增开关">
                <v-card-text>
                    <v-text-field v-model="createProjectName" variant="underlined" :readonly="createLoading"
                        color="primary" density="comfortable" :rules="createProjectNameRules" label="项目名称"
                        placeholder="请输入开关标识"></v-text-field>

                    <v-text-field v-model="createProjectKey" variant="underlined" :readonly="createLoading"
                        color="primary" density="comfortable" :rules="createProjectKeyRules" label="项目唯一标识符"
                        placeholder="请输入项目唯一标识符"></v-text-field>
                </v-card-text>

                <template v-slot:actions>
                    <v-spacer></v-spacer>
                    <v-btn @click="isActive.value = false">
                        取消
                    </v-btn>
                    <v-btn @click="isActive.value = !onCreateToggle()">
                        创建
                    </v-btn>
                </template>
            </v-card>
        </template>
    </v-dialog>
    <v-dialog activator="#activator-edit" max-width="500" persistent>
        <template v-slot:default="{ isActive }">
            <v-card title="编辑开关">
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
                    <v-btn @click="isActive.value = false">
                        取消
                    </v-btn>
                    <v-btn @click="isActive.value = !onEditToggle()">
                        保存
                    </v-btn>
                </template>
            </v-card>
        </template>
    </v-dialog>
    <v-dialog activator="#activator-delete" max-width="500" persistent>
        <template v-slot:default="{ isActive }">
            <v-card title="是否删除开关？">
                <v-card-text>
                    开关删除之后无法恢复，请确认是否删除？
                </v-card-text>

                <template v-slot:actions>
                    <v-spacer></v-spacer>
                    <v-btn @click="isActive.value = false">
                        取消
                    </v-btn>
                    <v-btn @click="isActive.value = !onDeleteToggle()">
                        确认
                    </v-btn>
                </template>
            </v-card>
        </template>
    </v-dialog>
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
        createDialog: false,
        createLoading: false,
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
        onCreateToggle() {
            return true;
        },
        onEditToggle() {
            return true;
        },
        onDeleteToggle() {
            return true;
        },
    },
}
</script>