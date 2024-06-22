<template>
    <v-dialog v-model="show" max-width="500" persistent>
        <template v-slot:default="">
            <v-card title="创建项目">
                <v-card-text>
                    <v-text-field v-model="projectName" variant="underlined" color="primary" density="comfortable"
                        :rules="projectNameRules" label="项目名称" placeholder="请输入项目名称"></v-text-field>

                    <v-text-field v-model="projectKey" variant="underlined" color="primary" density="comfortable"
                        :rules="projectKeyRules" label="项目唯一标识符" placeholder="请输入项目唯一标识符"></v-text-field>
                </v-card-text>

                <template v-slot:actions>
                    <v-spacer></v-spacer>
                    <v-btn @click="$emit('onDismiss')">
                        取消
                    </v-btn>
                    <v-btn @click="onSaveProject">
                        创建
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
    },
    data: () => ({
        projectName: '',
        projectKey: '',
        projectNameRules: [
            value => {
                if (value?.length > 0) return true
                return '项目名称不能为空'
            },
        ],
        projectKeyRules: [
            value => {
                if (/^[a-zA-Z0-9_\-\.]+$/.test(value)) return true
                return '项目唯一标识符只能包含字母、数字、下划线、中划线、点'
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
    },
    methods: {
        onSaveProject() {
            this.loading = true
            this.$emit('saveProject', {
                name: this.projectName,
                key: this.projectKey,
            });
        },
    },
};
</script>