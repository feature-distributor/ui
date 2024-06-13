<template>
    <Loading :loading="loading" />
    <v-item-group mandatory>
        <v-container>
            <v-row>
                <v-col cols="12">
                    <v-item v-for="item in items" :key="item.id">
                        <v-item-title>{{ item.name }}</v-item-title>
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
import { getProjectList } from "../api/project";

export default {
    data: () => ({
        loading: false,
        items: [
        ],
    }),
    mounted() {
        this.loading = true

        getProjectList().then(data => {
            this.items = data.data;
        }).catch(error => {
            console.log(error)
        }).finally(() => {
            this.loading = false
        });
    },
    methods: {
        onProjectSelected(project) {
            this.$router.push('/projects/' + project.id)
        },
    },
}
</script>