<template>
    <v-card class="ma-2" elevated>
        <v-card-text>
            <h2>{{ project?.title }}</h2>
            <p>这是项目ID: {{ project?.id }}</p>
        </v-card-text>
    </v-card>
</template>

<script>
export default {
    props: {
        id: String,
    },
    computed: {
        project() {
            return {
                id: this.$route.params.id,
                title: '项目 ' + this.$route.params.id,
            }
        }
    },
}
</script>