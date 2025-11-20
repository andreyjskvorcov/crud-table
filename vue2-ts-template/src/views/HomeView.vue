<template>
  <v-container>
    <products-table />
  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import ProductsTable from '@/components/ProductsTable.vue';

@Component({
  components: { ProductsTable }
})

export default class HomeView extends Vue {
  
}
</script>
