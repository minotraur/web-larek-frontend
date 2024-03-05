import { IOrder } from '../types';
import { ensureElement } from '../utils/utils';
import { EventEmitter } from './base/events';
import { Form } from './common/Form';

export class Order extends Form<IOrder> {
	protected _paymentCard: HTMLButtonElement;
	protected _paymentCash: HTMLButtonElement;

	constructor(container: HTMLFormElement, events: EventEmitter) {
		super(container, events);

		this._paymentCard = ensureElement<HTMLButtonElement>(
			'.button[name=card]',
			container
		);
		this._paymentCash = ensureElement<HTMLButtonElement>(
			'.button[name=cash]',
			container
		);

		this._paymentCard.addEventListener('click', () => {
			this.events.emit('cardPayment:select');
			console.log('card');
		});
		this._paymentCash.addEventListener('click', () => {
			this.events.emit('cashPayment:select');
		});
	}

	set payment(value: string) {
		(this.container.elements.namedItem(value) as HTMLButtonElement).value =
			value;
	}

	set address(value: string) {
		(this.container.elements.namedItem('address') as HTMLInputElement).value =
			value;
	}
}
