import { OrderForm } from '../types';
import { EventEmitter } from './base/events';
import { Form } from './common/Form';

export class Contacts extends Form<OrderForm> {
	constructor(container: HTMLFormElement, events: EventEmitter) {
		super(container, events);
	}

	set email(value: string) {
		(this.container.elements.namedItem('email') as HTMLInputElement).value =
			value;
	}

	set phone(value: string) {
		(this.container.elements.namedItem('phone') as HTMLInputElement).value =
			value;
	}
}
