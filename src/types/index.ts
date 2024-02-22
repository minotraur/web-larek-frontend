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
	price: number | null;
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

export interface IPageView {
	counter: number;
	catalog: HTMLElement[];
}

export interface ICardView {
	description: string;
	image: string;
	title: string;
	category: string;
	price: number;
}

export interface IBasketView {
	products: HTMLElement[];
	total: number;
}

export interface IModalView {
	content: HTMLElement;
	open(): void;
	close(): void;
}
