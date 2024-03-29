<!--
* DONE
* @description: 取码列表 组件
* @author: tutu
* @time: 2024-03-24 19:12:48
-->
<template>
	<main class="main-contain-wrap">
		<a-spin :loading="loading" class="w100% h-100%">
			<a-scrollbar style="width: 100%; overflow: auto" outer-class="w-100%">
				<a-table
					:data="yardList"
					:columns="columns"
					row-key="id"
					:pagination="false"
					class="min-w-960px"></a-table>
			</a-scrollbar>
		</a-spin>
	</main>
</template>

<script lang="ts" setup>
import { type IYardItem } from '@/services/interfaces/peace';
import { getProducedYard } from '@/services/peace.api';
import useUserStore from '@/stores/user';
import { setLocalStorage } from '@/utils';
import { type TableColumnData, type TableData } from '@arco-design/web-vue';
import { h, onBeforeUnmount, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const userStore = useUserStore();
const router = useRouter();

const loading = ref(false); // 加载状态

const yardList = ref<IYardItem[]>([]); // 产码列表
let timer: NodeJS.Timeout; // 定时器
// 表格列 配置
const columns: TableColumnData[] = [
	// {
	// 	title: 'ID',
	// 	dataIndex: 'id'
	// },
	{
		title: '账号ID',
		dataIndex: 'land_id'
	},
	{
		title: '支付方式',
		dataIndex: 'pay_type',
		render: (data: { record: TableData; column: TableColumnData; rowIndex: number }) => {
			return data.record.pay_type === 0 ? 'QQ' : '未知';
		}
	},
	{
		title: '账号',
		dataIndex: 'account'
	},
	{
		title: '状态',
		dataIndex: 'status',
		render: (data: { record: TableData; column: TableColumnData; rowIndex: number }) => {
			return mapStatus(data.record.status);
		}
	},
	{
		title: '通道名称',
		dataIndex: 'channel_name'
	},
	{
		title: '大区',
		dataIndex: 'serverName'
	},
	{
		title: '游戏昵称',
		dataIndex: 'rolename'
	},
	{
		title: '产码金额(元)',
		dataIndex: 'money'
	},
	{
		title: '产码时间',
		dataIndex: 'quTime'
	}
];
// 状态映射
const mapStatus = (status: number) => {
	let text = '';
	switch (status) {
		case 0:
			text = '状态异常';
			break;
		case 1:
			text = '状态异常';
			break;
		case 2:
			text = '未取码';
			break;

		default:
			text = '未知状态';
			break;
	}
	return h('div', { class: ['text-center', status === 2 ? 'bg-red' : 'bg-green'] }, text);
};

//
const flashList = async () => {
	loading.value = true;
	const { data } = await getProducedYard();
	loading.value = false;
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
	const randomSecond = Math.floor(Math.random() * 7) + 3;
	// 随机调用函数f
	timer = setInterval(flashList, randomSecond * 1000);
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
