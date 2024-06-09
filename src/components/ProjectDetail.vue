<template>
    <Breadcrumbs :subItems="breadcrumbs" />
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
        project: Object,
    },
data: () => ({
        breadcrumbs: [
            { title: '项目', href: '/projects' },
            { title: '项目详情' },
        ],
    }),
}
</script>