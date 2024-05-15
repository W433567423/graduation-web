import { type RendererElement, type RendererNode, type VNode } from 'vue';

interface IMenuItem {
	id: string;
	title: string;
	link: string;
	icon?: VNode<RendererNode, RendererElement, Record<string, any>>;
	children?: IMenuItem[];
	disabled?: boolean;
}

export type { IMenuItem };
