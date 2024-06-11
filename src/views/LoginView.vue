<template>
    <div class="position-absolute h-100 w-100">
        <v-img class="h-100 w-100" @dragstart.prevent
            src="https://cdn.vuetifyjs.com/images/parallax/material.jpg" cover></v-img>
    </div>
    <div class="content position-absolute h-100 d-flex align-center">
        <LoginForm />
    </div>
</template>

<style>
.background {
    width: 100%;
    height: 100%;
    position: absolute;
}

.content {
    z-index: 1;
    right: 176px;
}
</style>