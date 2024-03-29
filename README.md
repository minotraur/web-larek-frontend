# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:

- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:

- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/styles/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск

Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```

## Сборка

```
npm run build
```

или

```
yarn build
```

## Описание данных

![Используемые интерфейсы в приложении](image.png)

### IProduct

Содержит поля приходящие с сервера.

### IBasket

Содержит список товаров и итоговую стоимость.

### IOrder

Содержит поля для составления валидного заказа.

### IOrderResult

Данный интерфейс содержит идентификатор созданного заказа и количество списанной валюты.

### OrderForm

Тип создан для валидации полей ввода.

### PaymentMethod

Тип в котором содержатся методы оплаты.

### IWebLarekAPI

Интерфейс описывающий методы получения данных с сервера.

### IEvents

Интерфейс созданный для брокера событий.

### Интерфейсы для отображения моделей данных

### IModalData

#### Интерфейс содержит:

- <code>content</code> - контент в виде DOM-разметки.

### IFormState

Интерфейс содержащий поля для отслеживания валидности введенных пользователем данных.

### IPage

#### Интерфейс содержит:

- <code>counter</code> - счетчик товаров в корзине.
- <code>catalog</code> - каталог товаров в виде DOM-разметки.
- <code>locked</code> - будет брокировать прокрутку страницы.

## Модели данных

[Архитектура приложения](architecture.drawio)
![Модели данных](image-1.png)

### Класс <code>WebLarekAPI</code>

Наследует класс <code>Api</code> и реализует интерфейс IWebLarekAPI. Предоставляет методы для взаимодействия с веб-API для работы с продуктами и заказами.
Конструктор класса, который принимает URL-адрес хоста cdn, базовый URL-адрес baseUrl и опции для запроса options.
В конструкторе вызывается конструктор родительского класса Api с переданными параметрами.

Содержит:

- <code>getProductList</code> - Выполняет запрос для получения списка продуктов и обрабатывает полученные данные, добавляя к каждому элементу ссылку на изображение.
- <code>getProductItem</code> - Выполняет запрос для получения информации о конкретном продукте по его идентификатору и обрабатывает полученные данные, добавляя ссылку на изображение.
- <code>orderProducts</code> - Выполняет запрос на оформление заказа и возвращает результат оформления.

### Класс <code>Component</code>

Базовый класс предназначен для управления компонентом.

Абстрактный класс который является базовым компонентом. Предоставляет ряд методов для работы с DOM элементами.<br> Конструктор принимает один параметр - контейнер типа HTMLElement, в котором компонент будет рендериться.

#### Методы

- <code>toggleClass</code> - Переключает класс у элемента.
- <code>setText</code> - Устанавливает текстовое содержимое элемента.
- <code>setDisabled</code> - Устанавливает или снимает блокировку элемента.
- <code>setImage</code> - Устанавливает изображение и альтернативный текст.
- <code>render</code> - Основной метод, который возвращает корневой DOM-элемент компонента.<br> Принимает необязательный параметр <code>data</code>, который можно использовать для обновления свойств компонента.

### Класс <code>View</code>

Класс наследуется от <code>Component</code> и добавляет поле <code>events</code> типа <code>IEvents</code>, которое используется для управления событиями компонента.
Конструктор принимает два параметра:<code>container</code> и <code>events</code>

### Компоненты представления

### Basket

Наследует класс <code>View\<IBasket></code>. Представляет компонент корзины с возможностью отображения списка товаров,<br> общей суммы и управления состоянием кнопки оформления заказа.\
Конструктор класса, который принимает объект events типа EventEmitter для управления событиями.<br> Внутри конструктора вызывается конструктор родительского класса View с клонированным HTML-шаблоном корзины.

Содержит:

- <code>template</code> - Статическое поле, которое содержит HTML-шаблон корзины.
- <code>\_list</code> - Приватное поле для хранения ссылки на элемент корзины.
- <code>\_total</code> - Приватное поле для хранения ссылки на элемент корзины.
- <code>\_button</code> - Приватное поле для хранения ссылки на элемент корзины.
- <code>items</code> - Метод для установки списка товаров в корзине. Если список не пустой, элементы списка заменяются внутри контейнера корзины. Если список пуст, вставляется элемент "Корзина пуста". Также обновляется состояние кнопки оформления заказа.
- <code>selected</code> - Метод для установки выбранных товаров. Если выбранные товары есть, кнопка оформления заказа активируется, иначе деактивируется.
- <code>total</code> - Метод для установки общей суммы товаров в корзине.

### Form

Наследует класс <code>View\<IFormState></code>. Представляет компонент формы с возможностью управления состоянием валидации и отображения ошибок. Конструктор класса принимает контейнер формы <code>container</code> типа <code>HTMLFormElement</code> и объект событий <code>events</code> типа <code>EventEmitter</code>. В конструкторе вызывается конструктор родительского класса View с переданным контейнером и объектом событий.

Содержит:

- <code>onInputChange</code> - Метод генерирует событие <code>change</code> с данными о поле формы, которое было изменено, и его значении.
- <code>valid</code> - Установка состояния валидации формы
- <code>errors</code> - Отображение ошибок.
- <code>render</code> - Метод принимает объект <code>state</code>, который содержит частичное состояние формы и обновляет состояние компонента.

### Modal

Наследует класс <code>View\<IModalData></code>. Представляет компонент модального окна с возможностью открытия и закрытия, а также управления содержимым.
Конструктор класса принимает контейнер модального окна <code>container</code> типа <code>HTMLElement</code> и объект событий <code>events</code> типа <code>IEvents</code>. В конструкторе вызывается конструктор родительского класса <code>View</code> с переданным контейнером и объектом событий.

Содержит:

- <code>content</code> - Устанавливает новое содержимое модального окна, заменяя предыдущее содержимое.
- <code>open</code> - Метод открывает модальное окно, добавляя ему класс <code>modal_active</code>, и генерирует событие <code>'modal:open'</code>.
- <code>close</code> - Метод закрывает модальное окно, удаляя класс <code>modal_active</code>, устанавливает содержимое модального окна в <code>null</code> и генерирует событие <code>'modal:close'</code>.

### Page

Наследует класс <code>View\<IPage></code>. Представляет компонент страницы с некоторыми элементами и функциональностью для управления ими.
Конструктор класса принимает контейнер страницы <code>container</code> типа <code>HTMLElement</code> и объект событий <code>events</code> типа <code>IEvents</code>.
В конструкторе вызывается конструктор родительского класса <code>View</code> с переданным контейнером и объектом событий.

Содержит:

- <code>counter</code> - устанавливает значения счетчика.
- <code>catalog</code> - устанавливает содержимого каталога.
- <code>locked</code> - устанавливает состояния блокировки страницы.

### Card

Наследует класс <code>Component\<IProduct></code>. Представляет компонент карточки товара с возможностью отображения<br> информации о товаре и выполнения действий при нажатии на кнопку или саму карточку. Конструктор класса принимает контейнер карточки <code>container</code> типа <code>HTMLElement</code> и опциональные действия <code>actions</code> типа <code>ICardActions</code>. В конструкторе вызывается конструктор родительского класса <code>Component</code> с переданным контейнером.

Содержит:

- <code>id</code> - Устанавливает и возвращает идентификатор карточки.
- <code>title</code> - Устанавливает и возвращает заголовок карточки.
- <code>image</code> - Устанавливает изображение карточки.
- <code>price</code> - Устанавливает и возвращает цену карточки, а также блокирует кнопку, если цена не указана.
- <code>category</code> - Устанавливает и возвращает категорию карточки, а также добавляет соответствующий класс для стилизации.
- <code>description</code> - Устанавливает описание карточки.
- <code>button</code> - Устанавливает надпись на кнопке карточки.

### Order

Наследует класс <code>Form\<OrderForm></code>. Представляет форму заказа с возможностью выбора способа оплаты.
Конструктор класса, который принимает контейнер формы заказа <code>container</code> типа <code>HTMLFormElement</code> и объект событий <code>events</code> типа <code>EventEmitter</code>. В конструкторе вызывается конструктор родительского класса <code>Form</code> с переданным контейнером и объектом событий.

Содержит:

- <code>address</code> - Устанавливает адрес для доставки заказа.
- <code>payment</code> - Устанавливает выбранный метод оплаты и активирует соответствующую кнопку.

### Contacts

Наследует класс <code>Form\<OrderForm></code>. Представляет форму для ввода контактной информации (электронной почты и номера телефона) при оформлении заказа.
Конструктор класса, который принимает контейнер формы контактной информации <code>container</code> типа <code>HTMLFormElement</code> и объект событий <code>events</code> типа <code>EventEmitter</code>. В конструкторе вызывается конструктор родительского класса <code>Form</code> с переданным контейнером и объектом событий.

Содержит:

- <code>email</code> - Устанавливает значение электронной почты в соответствующем поле формы.
- <code>phone</code> - Устанавливает значение номера телефона в соответствующем поле формы.

### Success

Наследует класс <code>Component\<IOrderResult></code>. Представляет компонент для отображения сообщения об успешном оформлении заказа.
Конструктор класса, который принимает контейнер элемента <code>container</code> типа <code>HTMLFormElement</code> и опциональные действия <code>actions</code> типа <code>ISuccessActions</code>. В конструкторе вызывается конструктор родительского класса <code>Component</code> с переданным контейнером.

### AppData

Класс представляет хранилище данных приложения. Он содержит информацию о продуктах, корзине, предпросмотре товара, заказе и ошибках формы заказа. Класс также обеспечивает методы для управления этими данными и взаимодействия с ними через события.
Конструктор класса, который принимает объект событий <code>events</code>. В конструкторе инициализируются поля <code>items</code>, <code>basket</code>, <code>preview</code> и <code>order</code>, а также <code>formErrors</code>.

Методы:

- <code>setItems(items: IProduct[])</code> - Устанавливает список продуктов и генерирует событие изменения списка.
- <code>setPreview(item: IProduct)</code> - Устанавливает предпросмотр товара и генерирует событие изменения предпросмотра.
- <code>inBasket(item: IProduct)</code> - Проверяет, содержится ли товар в корзине.
- <code>addToBasket(item: IProduct)</code> - Добавляет товар в корзину и генерирует событие изменения корзины.
- <code>removeFromBasket(item: IProduct)</code> - Удаляет товар из корзины и генерирует событие изменения корзины.
- <code>clearBasket()</code> - Очищает корзину и генерирует событие изменения корзины.
- <code>setPaymentMethod(method: PaymentMethod)</code> - Устанавливает метод оплаты для заказа.
- <code>setOrderField(field: keyof OrderForm, value: string)</code> - Устанавливает значения полей заказа и проверяет их валидность.
- <code>validateOrder()</code> - Проверяет валидность заказа и генерирует событие изменения ошибок формы заказа.

## Описание событий.

### Класс <code>EventEmmiter</code>

Является классом-посредником (Presenter) между классами отображения (View) и классом модели данных (Model)
Реализует интерфейс <code>IEvents</code>. В параметры конструктора класса ничего не передается.

Содержит:

- <code>events</code> - переменная к которую будут кэшироваться события.
- <code>on()</code> - функция установки обработчика на событие.
- <code>off()</code> - функция снятия обработчика с события.
- <code>emit()</code> - функция инициирования события с данными.
- <code>onAll</code> - функция прослушивания всех событий.
- <code>offAll</code> - функция сброса всех обработчиков.
- <code>trigger</code> - функция создающая коллбек триггер, генерирующий событие при вызове.

### События необходимые для работы приложения

- <code>modal:open</code> - Вызывается при открытии модального окна. Внутри обработчика устанавливается значение свойства 'locked' объекта 'page' в 'true'.

- <code>modal:close</code> - Вызывается при закрытии модального окна. Внутри обработчика устанавливается значение свойства 'locked' объекта 'page' в 'false'.

<hr>

- <code>card:select</code> - Вызывается при нажатии карточки товара. Внутри обработчика вызывается метод 'setPreview' объекта 'appData' с передачей выбранного товара.

- <code>items:change</code> - Вызывается при изменении списка товаров. Внутри обработчика каждый товар из списка преобразуется в карточку товара, используя шаблон 'cardCatalogTemplate'. Обработчик клика на карточке устанавливается для передачи события 'card:select' с данными о выбранном товаре. Полученные карточки товаров затем сохраняются в свойстве 'catalog' объекта 'page'.

- <code>preview:change</code> - Вызывается при изменении предварительного просмотра товара. Внутри обработчика создается карточка товара на основе шаблона предварительного просмотра. Обработчик клика на карточке устанавливается для добавления или удаления товара из корзины и соответствующего изменения текста кнопки. После этого карточка товара рендерится и передается для отображения в содержимом модального окна, которое затем открывается.

<hr>

- <code>basket:open</code> - Вызывается при открытии корзины. Внутри обработчика происходит рендеринг содержимого корзины и передача его для отображения в модальном окне, после чего модальное окно открывается.

- <code>basket:change</code> - Вызывается при изменении содержимого корзины. Внутри обработчика обновляется счетчик товаров на странице, список товаров в корзине и общая сумма товаров. Каждый товар в корзине представляется в виде карточки товара, для которой устанавливается обработчик клика для удаления товара из корзины.

<hr>

- <code>order:open</code> - Вызывается при открытии оформления заказа. Внутри обработчика происходит рендеринг содержимого формы оформления заказа с начальными значениями, такими как метод оплаты, адрес доставки, состояние валидности формы и список ошибок. После этого модальное окно открывается для отображения формы оформления заказа.

- <code>order.\*:change</code> - При срабатывании события вызывается функция, которая устанавливает новое значение для указанного поля в форме оформления заказа.

- <code>contacts.\*:change</code> - При срабатывании события вызывается функция, которая устанавливает новое значение для указанного поля в форме оформления заказа.

- <code>formErrors:change</code> - Вызывается при изменении ошибок в форме. Внутри обработчика извлекаются ошибки для различных полей формы, таких как оплата, адрес, электронная почта и телефон. Затем обновляются состояния валидности формы оформления заказа и контактной информации на основе наличия ошибок.

<hr>

- <code>order:submit</code> - Вызывается при нажатии кнопки продолжения заполнения заказа. Внутри обработчика происходит рендеринг содержимого формы контактной информации с начальными значениями, такими как номер телефона, электронная почта, состояние валидности формы и список ошибок. После этого модальное окно открывается для отображения формы контактной информации.

- <code>contacts:submit</code> - Вызывается при отправке контактной информации. Внутри обработчика отправляются данные заказа на сервер через API. При успешном оформлении заказа создается сообщение об успешном оформлении заказа, которое отображается в модальном окне. После закрытия модального окна происходит очистка корзины и обновление содержимого корзины. Если возникают ошибки при отправке заказа, они выводятся в консоль.
