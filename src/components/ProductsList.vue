<template>
  <div>
    <h2>Liste de produits</h2>
    <div class="cards">
      <div class="card" v-for="product in products" :key="product.reference">
        <img
          :src="product.images[0].large"
          width="200px"
          height="auto"
          :alt="product.name"
        />
        <div class="card-info">
          <div>Réf. : {{ product.reference }}</div>
          <h3>{{ product.name }}</h3>
          <h4>{{ product.price.base.formatted }}</h4>
          <div>
            <button @click="addToCart(product)">Ajouter au panier</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductsList",
  props: {
    products: { type: Object },
  },
  computed: {
    qty() {
      return this.$store.state.qty;
    },
  },
  methods: {
    addToCart(product) {
      let newProduct = {};
      newProduct = product;
      newProduct.qty = this.$store.state.qty;
      this.$store.dispatch("addProductToCart", newProduct);
    },
  },
};
</script>

<style scoped lang="scss">
img {
  border-radius: 4px 4px 0 0;
  width: 100%;
  min-height: 250px;
  max-height: 300px;
  object-fit: cover;
}
input {
  padding: 10px;
  margin: 10px 0;
}
button {
  padding: 10px;
  margin: 10px 0;
}
.cards {
  display: flex;
  justify-content: center;
}
.card {
  border: 1px solid lightgray;
  border-radius: 4px;
  text-align: left;
  margin: 10px;
  width: 90%;
  min-width: 400px;
}
.card-info {
  padding: 20px;
}

@media (min-width: 360px) and (max-width: 1024px) {
  .cards {
    flex-direction: column;
  }
}
</style>
