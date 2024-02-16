export interface IAppState {
	catalog: IProduct[];
	basket: string[];
	preview: string;
	order: IOrder;
}

export interface IFormState {
	valid: boolean;
	errors: string[];
}

export interface IProduct {
	id: string;
	description: string;
	image: string;
	title: string;
	category: string;
	price: number;
}

export interface IOrderForm {
	payment: string;
	address: string;
	email: string;
	phone: string;
}

export interface IOrder {
	total: number;
	items: IOrderForm[];
}

export interface IOrderResult {
	id: string;
}

export interface IPageModel {
	counter: number;
	catalog: HTMLElement[];
	loadProdusts(): void;
	onClick(): void;
}

export interface ICardModel {
	description: string;
	image: string;
	title: string;
	category: string;
	price: number;
	onClick(): void;
}

export interface IBasketModel {
	products: HTMLElement[];
	total: number;
	deleteProduct(): void;
	onClick(): void;
}

export interface IModalModel {
	content: HTMLElement;
	open(): void;
	close(): void;
}
