<template>
    <v-dialog v-model="show" max-width="500" persistent>
        <template v-slot:default="">
            <v-card title="编辑项目">
                <v-card-text>
                    <v-text-field v-model="projectName" variant="solo-filled" color="primary" density="comfortable"
                        :rules="projectNameRules" label="项目名称" placeholder="请输入项目名称" flat></v-text-field>

                    <v-text-field v-model="projectKey" variant="solo-filled" color="primary" density="comfortable"
                        label="项目唯一标识符" readonly disabled flat></v-text-field>
                </v-card-text>

                <template v-slot:actions>
                    <v-spacer></v-spacer>
                    <v-btn @click="$emit('onDismiss')">
                        取消
                    </v-btn>
                    <v-btn @click="onSaveProject">
                        保存
                    </v-btn>
                </template>
            </v-card>
        </template>
    </v-dialog>
</template>

<script>
export default {
    props: {
        initShow: {
            type: Boolean,
            required: true,
        },
        initProject: {
            type: Object,
            default: null,
        }
    },
    data: () => ({
        projectId: '',
        projectName: '',
        projectKey: '',
        projectNameRules: [
            value => {
                if (value?.length > 0) return true
                return '项目名称不能为空'
            },
        ],
    }),
    watch: {
        initShow: {
            immediate: true,
            handler(val) {
                this.show = val
            }
        },
        initProject: {
            immediate: true,
            handler(val) {
                if (val) {
                    this.projectId = val.id
                    this.projectName = val.name
                    this.projectKey = val.key
                }
            },
        },
    },
    methods: {
        onSaveProject() {
            this.loading = true
            this.$emit('saveProject', {
                id: this.projectId,
                name: this.projectName,
                key: this.projectKey,
            });
        },
    },
};
</script>