import { type RendererElement, type RendererNode, type VNode } from 'vue';

interface IMenuItem {
	id: number;
	title: string;
	link: string;
	icon: VNode<RendererNode, RendererElement, Record<string, any>>;
}

export type { IMenuItem };
