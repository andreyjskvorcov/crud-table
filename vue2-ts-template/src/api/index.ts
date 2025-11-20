import { IProduct } from '../types'



export const getProducts = (): Promise<IProduct[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, name: 'Product 1', category: 'Electronics', price: 100, quantity: 0 },
        { id: 2, name: 'Product 2', category: 'Clothing', price: 200, quantity: 20 },
        { id: 3, name: 'Product 3', category: 'Food', price: 300, quantity: 30 }
      ])
    }, 500)
  })
}

export const deleteProduct = (id: number): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, 500)
  })
}

export const addProduct = (product: IProduct): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, 500)
  })
}

export const updateProducts = (products: IProduct[]): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, 500)
  })
}