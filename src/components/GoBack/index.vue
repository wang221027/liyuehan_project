<template>
    <div :style="{ width: width, margin: '20px auto' }" class="container" style="">
        <el-page-header @back="goBack" :content="content"></el-page-header>
    </div>
</template>
<script setup lang="ts">
import { defineEmits } from 'vue';
defineProps({ content: String, width: String });
const emit = defineEmits(['back']);
const goBack = () => { window.history.go(-1); }
</script>
<style scoped lang="scss">
::v-deep .el-page-header__content {
    font-size: 16px;
}

::v-deep .el-page-header__content {
    font-weight: bold;
}

::v-deep .el-page-header__back {
    padding: 8px;
    background-image: linear-gradient(120deg, #89f7fe 0%, #66a6ff 100%);
    color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    transition: all .3s;
}

::v-deep .el-page-header__back:hover {
    box-shadow: 0 6px 4px rgba(0, 0, 0, .22), 0 0 6px rgba(0, 0, 0, .04);
}
</style>