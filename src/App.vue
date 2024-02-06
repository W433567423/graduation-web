<script lang="ts" setup>
import useUserStore from '@/stores/user.ts';

const userStore = useUserStore();
userStore.init();
</script>

<template>
	<router-view />
</template>

<style lang="less" scoped></style>
