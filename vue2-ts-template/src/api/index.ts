import { IProduct } from '../types'

const STORAGE_KEY = 'products'
const SEED: IProduct[] = [
  // { id: 1, name: 'Product 1', category: 'Electronics', price: 100, quantity: 0 },
  // { id: 2, name: 'Product 2', category: 'Clothing',    price: 200, quantity: 20 },
  // { id: 3, name: 'Product 3', category: 'Food',        price: 300, quantity: 30 },
]

const delay = (ms = 500) => new Promise(r => setTimeout(r, ms))

function safeRead(): IProduct[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const data = JSON.parse(raw)
    return Array.isArray(data) ? data : []
  } catch {
    return []
  }
}

function safeWrite(products: IProduct[]) {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products))
  } catch(error) {
    console.error('Error writing products to localStorage', error)
  }
}

function nextId(list: IProduct[]): number {
  return list.length ? Math.max(...list.map(p => Number(p.id) || 0)) + 1 : 1
}

export const getProducts = async (): Promise<IProduct[]> => {
  await delay()
  let products = safeRead()
  if (products.length === 0) {
    products = SEED
    safeWrite(products)
  }
  return products
}

export const deleteProduct = async (id: number): Promise<void> => {
  await delay()
  const products = safeRead().filter(p => p.id !== id)
  safeWrite(products)
}

export const addProduct = async (product: IProduct): Promise<void> => {
  await delay()
  const products = safeRead()
  const id = product.id ?? nextId(products)
  const item = { ...product, id }
  const idx = products.findIndex(p => p.id === id)
  if (idx >= 0) products[idx] = item
  else products.push(item)
  safeWrite(products)
}

export const updateProducts = async (products: IProduct[]): Promise<void> => {
  await delay()
  safeWrite(products)
}