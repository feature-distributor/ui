<template>
    <v-navigation-drawer :rail="rail" permanent @click="changeRail(false)">
        <v-list-item prepend-avatar="https://randomuser.me/api/portraits/men/85.jpg" title="John Leider" nav>
            <template v-slot:append>
                <v-btn icon="mdi-chevron-left" variant="text" @click.stop="changeRail(!rail)"></v-btn>
            </template>
        </v-list-item>

        <v-divider></v-divider>

        <v-list density="compact" nav>
            <v-list-item prepend-icon="mdi-home-city" title="Home" value="home"></v-list-item>
            <v-list-item prepend-icon="mdi-account" title="My Account" value="account"></v-list-item>
            <v-list-item prepend-icon="mdi-account-group-outline" title="Users" value="users"></v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>

<script>
export default {
    props: {
        rail: Boolean,
    },
    data: () => ({
    }),
    methods: {
        changeRail(newValue) {
            this.$emit('changeRail', newValue)
        }
    }
}
</script>