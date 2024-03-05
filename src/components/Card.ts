import { IProduct } from '../types';
import { ensureElement } from '../utils/utils';
import { Component } from './base/Component';

interface ICardActions {
	onClick: (event: MouseEvent) => void;
}

export class Card extends Component<IProduct> {
	protected _category?: HTMLElement;
	protected _title: HTMLElement;
	protected _image?: HTMLImageElement;
	protected _description?: HTMLElement;
	protected _price: HTMLElement;
	protected _button?: HTMLButtonElement;

	constructor(container: HTMLElement, actions?: ICardActions) {
		super(container);

		this._category = container.querySelector(`.card__category`);

		this._title = ensureElement<HTMLElement>('.card__title', container);
		this._image = container.querySelector(`.card__image`);

		this._description = container.querySelector(`.card__description`);
		this._price = ensureElement<HTMLElement>('.card__price', container);
		this._button = container.querySelector(`.card__button`);

		if (actions?.onClick) {
			if (this._button) {
				this._button.addEventListener('click', actions.onClick);
			} else {
				container.addEventListener('click', actions.onClick);
			}
		}
	}

	set id(value: string) {
		this.container.dataset.id = value;
	}

	get id(): string {
		return this.container.dataset.id || '';
	}

	set title(value: string) {
		this.setText(this._title, value);
	}

	get title(): string {
		return this._title.textContent || '';
	}

	set image(value: string) {
		this.setImage(this._image, value, this.title);
	}

	get price(): string {
		return this._price.textContent || '';
	}

	set price(value: string) {
		if (value) {
			this.setText(this._price, value + ' синапсов');
		} else {
			this.setText(this._price, 'Бесценно');
		}
	}

	get category(): string {
		return this._category.textContent || '';
	}

	set category(value: string) {
		this.setText(this._category, value);
	}

	set description(value: string) {
		this.setText(this._description, value);
	}
}
