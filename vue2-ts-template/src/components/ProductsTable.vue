<template>
  <div>
     <v-card>
        <v-data-table
          item-key="id"
          class="elevation-1"
          :headers="headers"
          :items="$store.state.products"
          :loading="$store.state.loading"
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
                <v-btn @click="deleteProduct(item.id)" :disabled="$store.state.loading">Удалить</v-btn>
        
                <v-btn @click="moveUp(item.id)" :disabled="$store.state.loading">Вверх</v-btn>

                <v-btn @click="moveDown(item.id)" :disabled="$store.state.loading">Вниз</v-btn>
              </td>
            </tr>
          </template>
        </v-data-table>
     </v-card>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { IProduct } from '@/types';

type Header = {
  text: string;
  value: keyof IProduct | 'status' | 'actions';
};

@Component({ name: 'ProductsTable' })
export default class ProductsTable extends Vue {
  async deleteProduct(id: number) {
    await this.$store.dispatch('deleteProduct', id);
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
    await this.$store.dispatch('fetchProducts');
  }

  async moveUp(id: number) {
    await this.$store.dispatch('moveUp', id);
  }

  async moveDown(id: number) {
    await this.$store.dispatch('moveDown', id);
  }
}
</script>