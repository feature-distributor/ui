<template>
    <v-dialog v-model="show" max-width="720" scrollable persistent>
        <template v-slot:default="">
            <v-card title="创建开关">
                <v-card-text>
                    <v-container fluid>
                        <v-row>
                            <v-text-field v-model="title" variant="solo-filled" density="comfortable"
                                :rules="titleRules" label="名称" placeholder="请输入名称" flat></v-text-field>
                        </v-row>
                        <v-row>
                            <v-text-field v-model="key" variant="solo-filled" density="comfortable" :rules="keyRules"
                                label="标识" placeholder="请输入标识" flat></v-text-field>
                        </v-row>
                        <v-row>
                            <v-textarea :model-value="description" variant="solo-filled" density="comfortable"
                                :rules="rules" label="描述" counter flat></v-textarea>
                        </v-row>
                        <v-row>
                            <v-select label="返回类型" variant="solo-filled" density="compact"
                                :items="['BOOL', 'STRING', 'FLOAT', 'INT', 'JSON']" flat></v-select>
                        </v-row>
                        <v-row>
                            <span>分组</span>
                        </v-row>
                        <ToggleValue />
                        <ToggleValue />
                    </v-container>
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
        show: false,
        titleRules: [
            value => {
                if (value?.length > 0) return true
                return '名称不能为空'
            },
        ],
        keyRules: [
            value => {
                if (value?.length > 0) return true
                return '标识不能为空'
            },
        ],
        title: '',
        key: '',
        description: '',
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
}
</script>