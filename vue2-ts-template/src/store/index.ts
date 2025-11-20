import Vue from 'vue';
import Vuex from 'vuex';
import { IProduct } from '@/types';
import { getProducts, deleteProduct, addProduct, updateProducts } from '@/api';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    products: [] as IProduct[]
  },
  mutations: {
   
  },
  actions: {
    async fetchProducts({ state }) {
      const data = await getProducts();

      state.products = data;
    },
    async deleteProduct({ state }, id: number) {
      state.products = state.products.filter(product => product.id !== id);

      await deleteProduct(id);
    },
    async addProduct({ state }, product: IProduct) {
      await addProduct(product);
      state.products.push(product);
    },
    async moveUp({ state }, id: number) {
      const elIndex = state.products.findIndex(product => product.id === id);

      if (elIndex > 0) {
        const item = state.products.splice(elIndex, 1)[0];
        state.products.splice(elIndex - 1, 0, item);

        await updateProducts(state.products);
      }
    },
    async moveDown({ state }, id: number) {
      const elIndex = state.products.findIndex(product => product.id === id);

      if (elIndex !== -1 && elIndex < state.products.length - 1) {
        const item = state.products.splice(elIndex, 1)[0];  
        state.products.splice(elIndex + 1, 0, item);

        await updateProducts(state.products);
      }
    },
  },
  getters: {
    
  }
});