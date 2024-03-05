import { AppData } from './components/AppData';
import { Card } from './components/Card';
import { Contacts } from './components/Contacts';
import { Order } from './components/Order';
import { Page } from './components/Page';
import { WebLarekAPI } from './components/WebLarekApi';
import { EventEmitter } from './components/base/events';
import { Basket } from './components/common/Basket';
import { Modal } from './components/common/Modal';
import './scss/styles.scss';
import { IProduct, OrderForm } from './types';
import { API_URL, CDN_URL } from './utils/constants';
import { cloneTemplate, createElement, ensureElement } from './utils/utils';

const events = new EventEmitter();
const api = new WebLarekAPI(CDN_URL, API_URL);

// Чтобы мониторить все события, для отладки
events.onAll(({ eventName, data }) => {
	console.log(eventName, data);
});

// Все шаблоны
const cardCatalogTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
const cardPreviewTemplate = ensureElement<HTMLTemplateElement>('#card-preview');
const cardBasketTemplate = ensureElement<HTMLTemplateElement>('#card-basket');
const basketTemplate = ensureElement<HTMLTemplateElement>('#basket');
const orderTemplate = ensureElement<HTMLTemplateElement>('#order');
const contactsTemplate = ensureElement<HTMLTemplateElement>('#contacts');

const modalTemplate = ensureElement<HTMLElement>('#modal-container');
// Модель данных приложения
const appData = new AppData(events);

// Глобальные контейнеры
const page = new Page(document.body, events);
const modal = new Modal(modalTemplate, events);
const basket = new Basket(cloneTemplate(basketTemplate), events);
const order = new Order(cloneTemplate(orderTemplate), events);
const contacts = new Contacts(cloneTemplate(contactsTemplate), events);

api
	.getProductList()
	.then(appData.setItems.bind(appData))
	.catch((err) => console.log(err));

events.on('modal:open', () => {
	page.locked = true;
});

events.on('modal:close', () => {
	page.locked = false;
});

events.on('items:change', (items: IProduct[]) => {
	page.catalog = items.map((item) => {
		const card = new Card(cloneTemplate(cardCatalogTemplate), {
			onClick: () => events.emit('card:select', item),
		});
		return card.render(item);
	});
});

events.on('card:select', (item: IProduct) => {
	appData.setPreview(item);
});

events.on('preview:change', (item: IProduct) => {
	const card = new Card(cloneTemplate(cardPreviewTemplate), {
		onClick: () => events.emit('card:buy', item),
	});
	modal.render({
		content: card.render(item),
	});
	modal.open();
});

events.on('basket:open', () => {
	modal.render({
		content: basket.render(),
	});
	modal.open();
});

events.on('order:open', () => {
	modal.render({
		content: order.render({
			payment: 'card',
			address: 'Moscow',
			valid: false,
			errors: [],
		}),
	});
});

events.on('card:buy', (item: IProduct) => {
	appData.addToBasket(item);
	page.counter += 1;
	basket.total += item.price;
});

events.on('basket:change', (item: IProduct) => {
	basket.items = appData.getBasketItems().map((item) => {
		const cardBasket = new Card(cloneTemplate(cardBasketTemplate), {
			onClick: () => events.emit('card:delete', item),
		});
		return cardBasket.render(item);
	});
});

events.on('card:delete', (item: IProduct) => {
	appData.removeFromBasket(item);
	basket.total -= item.price;
	page.counter -= 1;
});

// Изменилось состояние валидации формы
events.on('formErrors:change', (errors: Partial<OrderForm>) => {
	const { payment, address} = errors;
	order.valid = !payment && !address;
	order.errors = Object.values({ payment, address })
		.filter((i) => !!i)
		.join('; ');
});
