<!--
* DONE
* @description: New Project 组件
* @author: tutu
* @time: 2024/1/13 16:20
-->
<template>
	<bread-nav />
	<main class="main-contain-wrap">
		<a-card hoverable>
			<header class="header-title-wrap">新建项目</header>
			<a-form :model="form" layout="vertical" @submit="handleCreate">
				<a-form-item required label="项目名称">
					<a-input v-model="form.projectName" placeholder="请输入项目名称" class="w-400px!"></a-input>
				</a-form-item>

				<a-form-item required label="项目类型" tooltip="创建后不可更改">
					<a-radio-group v-model="form.projectType">
						<a-radio value="simple">简单项目</a-radio>
						<a-radio value="complex">复杂项目</a-radio>
					</a-radio-group>
				</a-form-item>

				<a-form-item label="项目语言" v-if="form.projectType === 'simple'">
					<a-select class="w-400px!" placeholder="请选择项目语言" v-model="form.projectLanguage">
						<a-option>JavaScript</a-option>
						<a-option>Python</a-option>
						<a-option>Json</a-option>
						<a-option disabled>其他语言待开通</a-option>
					</a-select>
				</a-form-item>

				<a-form-item label="项目初始源码" v-if="form.projectType === 'simple'">
					<a-textarea v-model="form.projectCode"></a-textarea>
				</a-form-item>

				<a-button html-type="submit">创建</a-button>
			</a-form>
		</a-card>
	</main>
</template>

<script lang="ts" setup>
import { type ICreateProject } from '@/services/interfaces/projects';
import { postCreateProject } from '@/services/projects.api';
import { Notification } from '@arco-design/web-vue';
import breadNav from '@pc/components/BreadNav/index.vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const form = ref<ICreateProject>({
	projectName: '',
	projectType: 'simple',
	projectCode: '',
	projectLanguage: ''
});

const handleCreate = async () => {
	const res = await postCreateProject(form.value);
	console.log('🚀 ~ handleCreate ~ res:', res);
	if (res.projectId) {
		// 创建成功
		Notification.success({
			title: '创建成功',
			content: '项目创建成功,即将自动跳转到代码编辑页',
			// 跳转到项目详情页
			onClose: async () => await router.push({ path: `/pc/code`, query: { id: res.projectId } })
		});
	}
};
</script>

<style lang="less" scoped>
.main-contain-wrap {
	width: 100%;
	box-sizing: border-box;
	padding: 20px;
	height: calc(100vh - 112px);
	.header-title-wrap {
		border-bottom: 1px solid #f0f0f0;
		font-size: 20px;
		font-weight: 600;
		padding-bottom: 12px;
	}
}
</style>
