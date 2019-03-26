<template>
    <v-content class="background-image">
        <router-view></router-view>
    </v-content>
</template>

<script>
export default {
    components: {}
};
</script>

<style>
.background-image {
    background: url('https://images.unsplash.com/photo-1530841377377-3ff06c0ca713?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80');
    background-size: cover;
    width: 100%;
    height: 100%;
}
</style>
