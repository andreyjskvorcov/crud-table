<template>
  <v-container>
    <products-form />
    <products-table />
  </v-container>
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
