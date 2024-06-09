<template>
    <v-navigation-drawer :rail="rail" rail-width="72" permanent @click="onLogout()">
        <v-list-item class="ma-4" prepend-avatar="https://randomuser.me/api/portraits/men/85.jpg" title="Admin" nav>
            <template v-slot:append>
                <v-btn icon="fas fa-right-from-bracket" variant="tonal" size="x-small">
                </v-btn>
            </template>
        </v-list-item>

        <v-divider></v-divider>

        <v-list density="compact" nav>
            <v-list-item v-for="item in navItems" :key="item.value" :prepend-icon="item.icon" :title="item.title"
                :value="item.value" :href="item.href">
                <template v-slot:prepend>
                    <v-icon :icon="item.icon" size="x-small"></v-icon>
                </template>
            </v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>

<script>
export default {
    props: {
        rail: Boolean,
    },
    data: () => ({
        selected: null,
        navItems: [
            { title: '项目', icon: 'fas fa-diagram-project', value: 'projects', href: '/project' },
            { title: '人群组', icon: 'fas fa-users', value: 'people', href: '/people' },
            { title: '事件', icon: 'fas fa-calendar-check', value: 'events', href: '/events' },
            { title: '设置', icon: 'fas fa-cog', value: 'settings', href: '/settings' },
        ],
    }),
    methods: {
        onLogout() {
            this.$emit('onLogout')
        }
    }
}
</script>