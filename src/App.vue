<script lang="ts" setup>
import useUserStore from '@/stores/user.ts';
import { isMobile } from '@/utils';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const userStore = useUserStore();
userStore.init();
onMounted(() => {
	if (isMobile()) {
		console.log('手机端');
		router.replace('/m-login');
	} else {
		console.log('pc端');
		router.replace('/pc-login');
	}
});
</script>

<template>
	<router-view />
</template>

<style lang="less" scoped></style>
