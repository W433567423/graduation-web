<script lang="ts" setup>
import { isMobile } from '@/utils';
import { onMounted } from 'vue';

// const router = useRouter();
// const userStore = useUserStore();
// userStore.init();
onMounted(() => {
	if (isMobile()) {
		console.log('手机端');
		// router.replace('/m-login');
	} else {
		console.log('pc端');
		alert('禁止PC端访问，请使用手机端访问');
		// router.replace('/pc-login');
	}
});
</script>

<template>
	<router-view />
</template>

<style lang="less" scoped></style>
