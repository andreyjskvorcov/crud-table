<template>
  <v-card>
    <v-form v-model="validForm" ref="form">
      <v-container>
        <v-row>
          <v-col
            cols="12"
            md="4"
          >
            <v-text-field
              v-model="name"
              :rules="nameRules"
              label="Название"
              required
            />
          </v-col>

          <v-col
            cols="12"
            md="4"
          >
            <v-select
              v-model="category"
              :items="categories"
              :rules="categoryRules"
              label="Категория"
              required
            />
          </v-col>

          <v-col
            cols="12"
            md="4"
          >
            <v-text-field
              v-model.number="price"
              :rules="priceRules"
              type="number"
              label="Цена"
              required
            />
          </v-col>
          
          <v-col
            cols="12"
            md="4"
          >
            <v-text-field
              v-model.number.trim="quantity"
              :rules="quantityRules"
              type="number"
              label="Количество"
              required
            />
          </v-col>

          <v-col
            cols="12"
            md="4"
          >
            <v-btn
              @click="submit"
              color="primary"
              :disabled="!validForm"
              block
            >
              Добавить
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </v-card>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { IProduct, CATEGORY_OPTIONS } from '@/types';

const nameRules: Array<(v: string) => true | string> = [
  v => !!v || 'Название товара обязательно',
  v => (v && v.length >= 3) || 'Минимальная длина 3 символа',
];

const categoryRules: Array<(v: string) => true | string> = [
  v => !!v || 'Категория обязательна',
];

const numberRules: Array<(v: number | string) => true | string> = [
  v => v !== '' && v !== null && v !== undefined || 'Поле обязательно',
  v => Number(v) > 0 || 'Должно быть больше 0',
];

@Component
export default class ProductsForm extends Vue {
  $refs!: {
    form: Vue & { reset: () => void };
  };

  validForm = false;

  name = '';
  category: IProduct['category'] = '';
  price = 0;
  quantity = 0;

  // если хотите держать внутри — хотя бы типизируйте
  nameRules = nameRules;
  categoryRules = categoryRules;
  priceRules = numberRules;
  quantityRules = numberRules;

  get categories() {
    return CATEGORY_OPTIONS;
  }

  submit() {
    if (!this.validForm) return;

    this.$store.dispatch('addProduct', {
      name: this.name,
      category: this.category,
      price: this.price,
      quantity: this.quantity,
    });

    this.$refs.form.reset();
  }
}
</script>