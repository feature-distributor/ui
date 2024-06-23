<template>
    <v-row align="center">
        <v-col cols="1" class="d-flex justify-center">
            <v-sheet :color="color" width="16" height="16" rounded></v-sheet>
        </v-col>
        <v-col cols="3">
            <v-text-field v-model="title" variant="outlined" :color="color" density="compact" label="名称"
                hide-details="auto"></v-text-field>
        </v-col>
        <v-col cols="3">
            <v-text-field v-model="value" variant="outlined" :color="color" density="compact" label="值"
                hide-details="auto"></v-text-field>
        </v-col>
        <v-col cols="4">
            <v-text-field v-model="description" variant="outlined" :color="color" density="compact" label="描述"
                hide-details="auto"></v-text-field>
        </v-col>
        <v-col cols="1">
            <v-sheet :color="color" width="16" height="16" rounded></v-sheet>
        </v-col>
    </v-row>
</template>
<script>
export default {
    data: () => ({
        color: 'green',
        title: '',
        value: '',
        description: '',
    }),
}
</script>