import { Tag } from './tags';

export interface Book {
	id?: number;
	title: string;
	author: string;
	tags: Tag[];
	price: number;
	discount: number;
};
