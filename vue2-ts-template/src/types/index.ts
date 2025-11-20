
export interface IProduct {
  id?: number;
  name: string;
  category: string;
  price: number;
  quantity: number;
}

export const CATEGORY_OPTIONS: ReadonlyArray<{ text: string; value: IProduct['category'] }> = [
  { text: 'Электроника', value: 'electronics' },
  { text: 'Одежда', value: 'clothing' },
  { text: 'Еда', value: 'food' },
];