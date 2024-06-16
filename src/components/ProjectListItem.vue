<template>
    <v-card variant="tonal" hover>
        <v-card-item>
            <v-card-title class="font-weight-bold">{{ item.name }}</v-card-title>
            <v-card-subtitle class="text-subtitle-2">
                项目唯一标识符: {{ item.key }}
            </v-card-subtitle>
            <v-card-text>
                <v-sheet :elevation="1" class="mx-auto rounded-lg pa-2" color="cyan-lighten-5">
                    <p class="text-caption">
                        服务端密钥
                    </p>
                    <p>
                        <v-tooltip :text="tooltipText" location="top" activator="parent"
                            @update:model-value="resetTooltip">
                        </v-tooltip>
                        <v-chip size="small" density="comfortable" color="primary" @click.stop="doCopy(item.server_key)">
                            <span style="max-width: 400px;" class="d-inline-block text-truncate text-caption"> {{
                                item.server_key
                            }}</span>
                        </v-chip>
                    </p>
                    <div style="height: 16px;"></div>
                    <p class="text-caption">
                        客户端密钥
                    </p>
                    <p>
                        <v-tooltip :text="tooltipText" location="top" activator="parent"
                            @update:model-value="resetTooltip">
                        </v-tooltip>
                        <v-chip size="small" density="comfortable" color="primary" @click.stop="doCopy(item.client_key)">
                            <span style="max-width: 400px;" class="d-inline-block text-truncate text-caption"> {{
                                item.client_key
                            }}</span>
                        </v-chip>
                    </p>
                </v-sheet>
            </v-card-text>
        </v-card-item>
    </v-card>
</template>

<script>
export default {
    props: {
        item: {
            type: Object,
            required: true,
        }
    },
    data: () => ({
        tooltipText: '点击复制',
    }),
    methods: {
        doCopy(message) {
            this.$copyText(message).then(() => {
                this.tooltipText = '复制成功';
            }, function () {
                this.tooltipText = '复制失败';
            });
        },
        resetTooltip(b) {
            if (b) {
                this.tooltipText = '点击复制';
            }
        }
    }
}
</script>