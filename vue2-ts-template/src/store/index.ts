import Vue from 'vue';
import Vuex from 'vuex';
import { IProduct } from '@/types';
import { getProducts, deleteProduct, addProduct, updateProducts } from '@/api';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    products: [] as IProduct[],
    loading: false
  },
  mutations: {
   
  },
  actions: {
    async fetchProducts({ state }) {
      state.loading = true;
      const data = await getProducts();

      state.products = data;
      state.loading = false;
    },
    async deleteProduct({ dispatch }, id: number) {
      await deleteProduct(id);
      await dispatch('fetchProducts');
    },
    async addProduct({ dispatch }, product: IProduct) {
      await addProduct(product); // что бы не было fetchProducts
      await dispatch('fetchProducts');
    },
    async moveUp({ state }, id: number) {
      state.loading = true;
      const elIndex = state.products.findIndex(product => product.id === id);

      if (elIndex > 0) {
        const item = state.products.splice(elIndex, 1)[0];
        state.products.splice(elIndex - 1, 0, item);

        await updateProducts(state.products);
      }
      state.loading = false;
    },
    async moveDown({ state }, id: number) {
      state.loading = true;
      const elIndex = state.products.findIndex(product => product.id === id);

      if (elIndex !== -1 && elIndex < state.products.length - 1) {
        const item = state.products.splice(elIndex, 1)[0];  
        state.products.splice(elIndex + 1, 0, item);

        await updateProducts(state.products);
      }
      state.loading = false;
    },
  },
});