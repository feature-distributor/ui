<template>
    <v-dialog eager :model-value="true" width="auto" persistent>
        <v-card max-width="400" prepend-icon="fas fa-triangle-exclamation" :text="message" :title="title">
            <template v-slot:actions>
                <v-spacer />
                <v-btn class="ms-auto" :text="cancelButtonText" @click="choose(false)"></v-btn>
                <v-btn class="ms-auto" :text="confirmButtonText" @click="choose(true)"></v-btn>
            </template>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    props: {
        confirmButtonText: {
            type: String,
            default: '确认'
        },
        cancelButtonText: {
            type: String,
            default: '取消'
        },
        title: {
            type: String
        },
        message: {
            type: String,
            required: true
        },
        submitCallback: {
            type: Function
        },
        cancelCallback: {
            type: Function
        }
    },
    data: () => ({
        value: false,
    }),
    methods: {
        choose(value) {
            this.value = value
            if (value) {
                this.submitCallback();
            } else {
                this.cancelCallback();
            }
        },
    }
}
</script>