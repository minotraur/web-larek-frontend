import { IBasket, IOrder, IProduct, OrderForm } from '../types';
import { IEvents } from './base/events';

export class AppData {
	items: IProduct[] = [];
	basket: IBasket = {
		items: [],
		total: 0,
	};
	preview: IProduct = null;
	order: IOrder = {
		email: '',
		phone: '',
		address: '',
		payment: 'card',
		total: 0,
		items: [],
	};

	formErrors: Partial<Record<keyof OrderForm, string>> = {};

	constructor(protected events: IEvents) {}

	setItems(items: IProduct[]) {
		this.items = items;
		this.events.emit('items:change', this.items);
	}

	setPreview(item: IProduct) {
		this.preview = item;
		this.events.emit('preview:change', item);
	}

	inBasket(item: IProduct): boolean {
		return this.items.includes(item);
	}

	addToBasket(item: IProduct) {
		this.basket.items.push(item);
		this.basket.total += item.price;
		this.events.emit('basket:change', item);
	}

	getBasketItems(): IProduct[] {
		return this.basket.items;
	}

	removeFromBasket(item: IProduct) {
		this.basket.items = this.basket.items.filter(
			(basketItem: IProduct) => basketItem !== item
		);
		this.events.emit('basket:change', item);
	}

	clearBasket() {
		this.basket.items = [];
		this.basket.total = 0;
		this.events.emit('basket:change');
	}

	setPaymentMethod(method: string) {}

	setOrderField(field: keyof OrderForm, value: string) {}

	validateOrder() {}
}
