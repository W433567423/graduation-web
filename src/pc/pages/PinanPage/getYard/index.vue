<!--
* DONE
* @description: 取码列表 组件
* @author: tutu
* @time: 2024-03-24 19:12:48
-->
<template>
	<main class="main-contain-wrap">
		<a-table :data="list" :columns="columns" row-key="id"></a-table>
	</main>
</template>

<script lang="ts" setup>
import { getProducedYard } from '@/services/pinan.api';
import { type TableColumnData, type TableData } from '@arco-design/web-vue';
import { h, onBeforeUnmount, onMounted, ref } from 'vue';
const list = ref([
	{
		account: '227384408',
		code: null,
		id: '5191638463266484806',
		land_id: 826171,
		userid: 5732,
		userPid: 4918,
		syorder: '492BEBD87048687BEDC18E3B27A1839E13181',
		orderid: null,
		tdorder: '492BEBD87048687BEDC18E3B27A1839E13181',
		money: 100,
		order_url:
			"top.location.href='mqqapi://forward/url?src_type=web&version=1&url_prefix=aHR0cHM6Ly9wYXkucXEuY29tL20vYWN0aXZlL2ZyaWVuZHBheS5waHA/c2FuZGJveD0mb2ZmZXJJZD0xNDUwMDAyMjU4JmZyaWVuZHNfcGF5X21zZz00OTJCRUJEODcwNDg2ODdCRURDMThFM0IyN0ExODM5RTEzMTgxJnBmPW1kc19zdG9yZW9wZW5fcWItMjE5OV92MV8wXzAuY29tbW9uMV92MS1hbmRyb2lk'",
		cjTime: '2024-03-24 16:49:47',
		status: 2,
		channelid: 54,
		upTime: '2024-03-24 16:49:47',
		channel_name: '王者安卓区点券',
		dm: 'Tx_qwzdjazvq',
		quTime: '2024-03-24 16:49:47',
		api_id: 'g638181073',
		username: 'W433567423',
		uspidStr: '(0)(1)(4797)(4918)',
		pay_type: 0,
		leanerid: false,
		serverName: '295区',
		rolename: '矮油,你干嘛?',
		topid: null,
		pay_mode: 0,
		paySelect: 0,
		testingTime: '2024-03-24 16:49:47',
		rechargeSun: 0,
		validTime: 1380,
		rail_id: null,
		openkey: null,
		offerid: null,
		url_params: null,
		tgp_id: null
	}
]);
let timer: NodeJS.Timeout; // 定时器
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
		title: '大区名称',
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

const flashList = async () => {
	list.value = await getProducedYard();
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
.main-contain-wrap {
	width: 100%;
	box-sizing: border-box;
	padding: 20px;
	height: calc(100vh - 112px);
}
</style>
