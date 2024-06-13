<template>
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
</template>

<script>
export default {
    data: () => ({
        items: [
            { id: 1, title: '项目 1' },
            { id: 2, title: '项目 2' },
            { id: 3, title: '项目 3' },
        ],
    }),
    methods: {
        onProjectSelected(project) {
            this.$router.push('/projects/' + project.id)
        },
    },
}
</script>