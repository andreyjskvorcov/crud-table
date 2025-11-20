## CRUD Table — Vue 2 + TypeScript

Небольшое SPA для управления товарами: список с удалением и перемещением строк, форма добавления с валидацией, мок‑API на `localStorage` с имитацией задержек.

## Стек
- Vue 2.6 + TypeScript (классы, декораторы: `vue-property-decorator`)
- Vuex 3 для состояния
- Vuetify 2 для UI
- Vue Router 3
- Мок‑API: `localStorage` (`src/api/index.ts`)

## Возможности
- Таблица товаров: ID, Название, Категория, Цена, Количество, Статус, Действия
- Удаление товара, перемещение вверх/вниз, отключённая пагинация
- Статус: «В наличии» (quantity > 0) / «Нет в наличии» (quantity = 0)
- Форма добавления: валидация полей (название ≥ 3, цена > 0, количество целое ≥ 0, категория из списка)
- Сохранение порядка и данных в `localStorage`
- Имитация API‑задержек для всех операций

## Архитектура
- `src/views/HomeView.vue` — собирает форму и таблицу
- `src/components/ProductsForm.vue` — форма добавления, правила валидации, диспатч `addProduct`
- `src/components/ProductsTable.vue` — таблица, кнопки удалить/вверх/вниз, лоадер
- `src/store/index.ts` — `state.products`, экшены `fetch/add/delete/moveUp/moveDown`
- `src/api/index.ts` — `getProducts`, `addProduct`, `deleteProduct`, `updateProducts` (работают с `localStorage`)
- `src/types/index.ts` — `IProduct`, `CATEGORY_OPTIONS`

## Модель данных
```ts
export interface IProduct {
  id: number
  name: string
  category: string
  price: number
  quantity: number
}
```

## Мок‑API (localStorage)
- Задержка: ~500 мс через `delay()`
- Хранение: ключ `products`
- Генерация `id`: на стороне API (по умолчанию `Date.now()`)
- Методы:
  - `getProducts(): Promise<IProduct[]>`
  - `addProduct(payload: Omit<IProduct, 'id'>): Promise<void | IProduct>`
  - `deleteProduct(id: number): Promise<void>`
  - `updateProducts(list: IProduct[]): Promise<void>` — сохраняет текущий порядок/состав

## Управление состоянием (Vuex)
- `fetchProducts` загружает список из API и кладёт в `state.products`
- `addProduct` вызывает API (генерация `id` внутри API), обновляет `state`
- `deleteProduct` удаляет в API и обновляет `state`
- `moveUp / moveDown` меняют порядок элементов в `state` и вызывают `updateProducts`

## Запуск и сборка
Установите зависимости и запустите дев‑сервер:
```bash
npm install
npm run serve
```

Сборка продакшн‑бандла:
```bash
npm run build
```

Линтинг:
```bash
npm run lint
```

## Примечания
- Не передавайте `id` из формы — его выставляет API (мок).
- Для числовых полей формы используйте `v-model.number`.
- Порядок строк сохраняется в `localStorage` после действий перемещения.

## Деплой
- Можно задеплоить на Netlify, GitHub Pages или иной статический хостинг. Результат сборки — каталог `dist/`.
