<template>
    <v-navigation-drawer :rail="rail" rail-width="72" permanent>
        <v-list-item class="ma-4" prepend-avatar="https://randomuser.me/api/portraits/men/85.jpg" :title="username" nav>
            <template v-slot:append>
                <v-btn icon="fas fa-right-from-bracket" variant="tonal" size="x-small" @click="onLogout()">
                </v-btn>
            </template>
        </v-list-item>

        <v-divider></v-divider>

        <v-list density="compact" nav>
            <v-list-item v-for="item in navItems" :key="item.value" :value="item.value" @click="onSelectNav(item)"
                :active="selected == item.route">
                <template v-slot:prepend>
                    <v-icon :icon="item.icon" size="x-small"></v-icon>
                </template>
                <v-list-item-title v-text="item.title"></v-list-item-title>
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
        username: '',
        selected: '',
        navItems: [
            { title: '项目', icon: 'fas fa-diagram-project', route: '/projects' },
            { title: '人群组', icon: 'fas fa-users', route: '/people' },
            { title: '事件', icon: 'fas fa-calendar-check', route: '/events' },
            { title: '设置', icon: 'fas fa-cog', route: '/settings' },
        ],
    }),
    mounted() {
        let sessionUser = localStorage.getItem("sessionUser");
        if (sessionUser) {
            this.username = JSON.parse(sessionUser).username;
        }
        let matchedArr = this.$route.matched.filter((item) => {
            return item.children.length > 0;
        }).map((item) => {
            return item.path;
        }).flat();
        this.selected = matchedArr[0];
    },
    methods: {
        onLogout() {
            this.$emit('onLogout');
        },
        onSelectNav(navItem) {
            if (this.selected === navItem.route) {
                return;
            }
            this.selected = navItem.route;
            this.$router.push(navItem.route);
        }
    }
}
</script>