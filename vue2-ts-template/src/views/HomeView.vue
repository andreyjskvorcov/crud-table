<template>
  <div class="home-view">
    <v-app-bar>
      <v-app-bar-title>
        <v-icon>mdi-store</v-icon>
        <span>CRUD Table</span>
      </v-app-bar-title>
    </v-app-bar>

    <v-container class="home-vie__container">
      <products-form />

      <products-table />
    </v-container>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import ProductsTable from '@/components/ProductsTable.vue';
import ProductsForm from '@/components/ProductsForm.vue';

@Component({
  components: { ProductsTable, ProductsForm }
})

export default class HomeView extends Vue {
  
}
</script>

<style lang="scss">
.home-vie__container {
  display: flex;
  flex-direction: column;
  gap: 24px;
}
</style>