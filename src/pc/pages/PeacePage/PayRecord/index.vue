<!--
* DONE
* @description: 充值记录 组件
* @author: tutu
* @time: 2024-03-24 19:12:48
-->
<template>
	<main class="main-contain-wrap">
		<a-table :data="yardList" :columns="columns" row-key="id" :pagination="false"></a-table>
	</main>
</template>

<script lang="ts" setup>
import { type IPayMessageItem } from '@/services/interfaces/peace';
import { getPayMessage } from '@/services/peace.api';
import useUserStore from '@/stores/user';
import { setLocalStorage } from '@/utils';
import { type TableColumnData, type TableData } from '@arco-design/web-vue';
import { onBeforeUnmount, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const userStore = useUserStore();
const router = useRouter();
const yardList = ref<IPayMessageItem[]>([]);
let timer: NodeJS.Timeout; // 定时器
const columns: TableColumnData[] = [
	{
		title: '操作人员',
		dataIndex: 'username'
	},
	{
		title: '码商账号',
		dataIndex: 'objusername'
	},
	{
		title: '码商昵称',
		dataIndex: 'objnickname'
	},
	{
		title: '操作时间',
		dataIndex: 'cjTime'
	},
	{
		title: '变动金额',
		dataIndex: 'setmoney',
		render: (data: { record: TableData; column: TableColumnData; rowIndex: number }) => {
			return `+${data.record.setmoney}元`;
		}
	}
];
//
const flashList = async () => {
	const { data } = await getPayMessage();
	console.log('🚀 ~ flashList ~ data:', data);
	if (data) {
		yardList.value = data;
	} else {
		userStore.user.peace = null;
		setLocalStorage('user', userStore.user);
		clearInterval(timer);
		router.replace('/peace-login');
	}
};

onMounted(async () => {
	flashList();
	// 创建随机秒数(3-10)
	// const randomSecond = Math.floor(Math.random() * 7) + 3;
	// // 随机调用函数f
	// timer = setInterval(flashList, randomSecond * 1000);
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
