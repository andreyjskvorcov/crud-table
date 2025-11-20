<template>
  <div>
     <v-card>
        <v-data-table
          item-key="id"
          class="elevation-1"
          :headers="headers"
          :items="products"
          :loading="isLoading"
          :items-per-page="-1"
          :disable-sort="true"
          hide-default-footer
        >
          <template v-slot:item="{ item }">
            <tr>
              <td>{{ item.id }}</td>

              <td>{{ item.name }}</td>

              <td>{{ item.category }}</td>

              <td>{{ item.price }}</td>

              <td>{{ item.quantity }}</td>

              <td>
                <v-chip :color="item.quantity > 0 ? 'green' : 'red'" dark>
                  {{ item.quantity > 0 ? 'В наличии' : 'Нет в наличии' }}
                </v-chip>
              </td>

              <td>
                <v-btn @click="deleteProduct(item.id)">Удалить</v-btn>
        
                <v-btn @click="moveUp(item.id)">Вверх</v-btn>

                <v-btn @click="moveDown(item.id)">Вниз</v-btn>
              </td>
            </tr>
          </template>
        </v-data-table>
     </v-card>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator';
import { IProduct } from '@/types';

type Header = {
  text: string;
  value: keyof IProduct | 'status' | 'actions';
};

@Component({ name: 'ProductsTable' })
export default class ProductsTable extends Vue {
  get products() {
    return this.$store.state.products;
  }

  isLoading = false;

  async deleteProduct(id: number) {
    this.isLoading = true;
    await this.$store.dispatch('deleteProduct', id);
    this.isLoading = false;
  }

  headers: Header[] = [
    { text: 'ID', value: 'id' },
    { text: 'Название', value: 'name' },
    { text: 'Категория', value: 'category' },
    { text: 'Цена', value: 'price' },
    { text: 'Количество', value: 'quantity' },
    { text: 'Статус', value: 'status' },
    { text: 'Действия', value: 'actions' },
  ];

  async created() {
    this.isLoading = true;
    await this.$store.dispatch('fetchProducts');
    this.isLoading = false;
  }

  async moveUp(id: number) {
    this.isLoading = true;
    await this.$store.dispatch('moveUp', id);
    this.isLoading = false;
  }

  async moveDown(id: number) {
    this.isLoading = true;
    await this.$store.dispatch('moveDown', id);
    this.isLoading = false;
  }
}
</script>