import { IBasket } from '../../types';
import { createElement, ensureElement } from '../../utils/utils';
import { View } from '../base/Component';
import { EventEmitter } from '../base/events';

export class Basket extends View<IBasket> {
	// template: HTMLTemplateElement;
	protected _list: HTMLElement;
	protected _total: HTMLElement;
	protected _button: HTMLElement;

	constructor(container: HTMLElement, protected events: EventEmitter) {
		super(container, events);

		// this.template = ensureElement<HTMLTemplateElement>('#basket');
		this._list = this.container.querySelector('.basket__list');

		this._total = this.container.querySelector('.basket__price');
		this._button = this.container.querySelector('.button');

		if (this._button) {
			this._button.addEventListener('click', () => {
				events.emit('order:open');
			});
		}

		this.items = [];
		this.total = 0;
	}

	set items(items: HTMLElement[]) {
		if (items.length) {
			this._list.replaceChildren(...items);
		} else {
			this._list.replaceChildren(
				createElement<HTMLParagraphElement>('p', {
					textContent: 'Корзина пуста',
				})
			);
		}
	}

	set total(total: number) {
		this.setText(this._total, total);
	}

	get total(): number {
		return +this._total.textContent;
	}
}
