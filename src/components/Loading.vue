<template>
    <v-overlay :model-value="loading" class="align-center justify-center">
        <v-container>
            <v-row justify="center">
                <v-progress-circular color="primary" indeterminate></v-progress-circular>
            </v-row>
            <v-row justify="center">
                数据加载中...
            </v-row>
        </v-container>
    </v-overlay>
</template>

<script>
export default {
    props: {
        loading: Boolean,
    },
}
</script>