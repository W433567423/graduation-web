<!--
* DONE
* @description: 充值记录 组件
* @author: tutu
* @time: 2024-03-24 19:12:48
-->
<template>
	<main class="main-contain-wrap">
		<a-spin :loading="loading" class="w100% h-100%">
			<a-scrollbar style="width: 100%; overflow: auto" outer-class="w-100%">
				<a-table
					:data="payRecordList"
					:columns="columns"
					row-key="id"
					:pagination="false"
					class="min-w-600px"></a-table>
			</a-scrollbar>
		</a-spin>
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

const loading = ref(false); // 加载状态

const payRecordList = ref<IPayMessageItem[]>([]); // 充值记录列表
let timer: NodeJS.Timeout; // 定时器
// 表格列 配置
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

// 刷新列表
const flashList = async () => {
	loading.value = true;
	const { data } = await getPayMessage();
	loading.value = false;
	if (data) {
		payRecordList.value = data;
	} else {
		userStore.user.peace = null;
		setLocalStorage('user', userStore.user);
		clearInterval(timer);
		router.replace('/peace-login');
	}
};

onMounted(async () => {
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
</style>
