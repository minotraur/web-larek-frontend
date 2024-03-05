import { IOrderResult } from '../types';
import { Component } from './base/Component';

interface ISuccessActions {
	onClick: (event: MouseEvent) => void;
}

export class Success extends Component<IOrderResult> {
	protected total: HTMLElement;
	protected close: HTMLElement;

	constructor(protected container: HTMLFormElement, actions?: ISuccessActions) {
		super(container);
	}
}
