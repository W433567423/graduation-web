<!--
* DONE
* @description: 全部通道 组件
* @author: tutu
* @time: 2024-03-25 15:09:01
-->
<template>
	<main class="main-contain-wrap">
		<a-scrollbar style="height: 100%; overflow: auto" outer-class="h-100%">
			<div class="flex flex-wrap gap-20px">
				<a-card v-for="(e, i) in channelList" :key="i" class="h-240px w-240px">
					<div class="w-100% h-152px">
						<div class="text-20px pt-20px">今日成功率 {{ e.jr_bfb }}%</div>
						<div class="flex justify-around mt-20px">
							<div class="flex flex-col">
								<span class="text-16px text-gray">今日收入</span>
								<span class="text-24px mt-12px">{{ e.jr_pay }}元</span>
							</div>
							<div class="flex flex-col">
								<span class="text-16px text-gray">昨日收入</span>
								<span class="text-24px mt-12px">{{ e.zr_pay }}元</span>
							</div>
						</div>
					</div>

					<template #actions>
						<a-tooltip content="添加账号">
							<span class="icon-hover" @click="handleClickCard('addAccount', e.id)"><icon-plus /></span>
						</a-tooltip>
						<a-tooltip content="账号管理">
							<span class="icon-hover" @click="handleClickCard('manageAccount', e.id)">
								<IconShareInternal />
							</span>
						</a-tooltip>

						<a-tooltip content="添加常用">
							<span class="icon-hover" @click="handleClickCard('addUsual', e.id)"><IconMore /></span>
						</a-tooltip>
					</template>
					<a-card-meta>
						<template #avatar>
							<div :style="{ display: 'flex', alignItems: 'center', color: '#1D2129' }">
								<a-avatar :size="24" :style="{ marginRight: '8px' }" v-if="e.img">
									<img alt="avatar" :src="`https://g63a2.danimmp.net${e.img}`" />
								</a-avatar>
								<a-typography-text :ellipsis="true" class="mb-0!">{{ e.name }}</a-typography-text>
							</div>
						</template>
					</a-card-meta>
				</a-card>
			</div>
		</a-scrollbar>
	</main>
</template>

<script lang="ts" setup>
import { type IPeaceChannelItem } from '@/services/interfaces/peace';
import { getChannelList } from '@/services/peace.api';
import useUserStore from '@/stores/user';
import { setLocalStorage } from '@/utils';
import { onBeforeUnmount, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const userStore = useUserStore();
const router = useRouter();
const channelList = ref<IPeaceChannelItem[]>([]);
let timer: NodeJS.Timeout; // 定时器

// 获取通道列表
const flashList = async () => {
	const { data } = await getChannelList();
	if (data) {
		channelList.value = data;
	} else {
		userStore.user.peace = null;
		setLocalStorage('user', userStore.user);
		clearInterval(timer);
		router.replace('/peace-login');
	}
};

// TODO 点击卡片
const handleClickCard = (type: string, id: number) => {
	console.log('🚀 ~ handleClickCard ~ type:', type, id);
};

onMounted(() => {
	flashList();
});
onBeforeUnmount(() => {
	console.log('定时器被清除');
	clearInterval(timer);
});
</script>

<style lang="less" scoped>
.a-menu-vertical-demo:not(.a-menu--collapse) {
	height: calc(100vh - 64px);
}
.main-contain-wrap {
	width: 100%;
	box-sizing: border-box;
	padding: 20px;
	height: calc(100vh - 64px);
}
</style>
