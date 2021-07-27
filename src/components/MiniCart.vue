<template>
  <div class="minicart">
    <div v-if="Object.keys(cart).length === 0">Votre panier est vide</div>
    <div v-else>
      <h4>
        Panier, {{ nbItems }}
        <span v-if="nbItems === 1">produit</span>
        <span v-else>produits</span>
      </h4>
      <div class="card" v-for="item in cart" :key="item.reference">
        <div class="card-info item">
          <img
            :src="item.images[0].small"
            width="100px"
            height="auto"
            :alt="item.name"
          />
          <div>
            <h5>{{ item.name }}</h5>
            <div class="card-info">
              <div>
                <div>{{ item.price.base.formatted }}</div>
                Quantité : {{ item.qty }}
              </div>
              <button @click="remove(item.reference)">Supprimer</button>
            </div>
          </div>
        </div>
        <hr />
      </div>
      <h4>Sous-total : {{ total }} euros</h4>
    </div>
  </div>
</template>

<script>
export default {
  name: "Cart",
  props: {
    cart: { type: Object },
  },
  data() {
    return {};
  },
  computed: {
    total() {
      return this.$store.state.total;
    },
    nbItems() {
      return this.$store.state.nbItems;
    },
  },
  methods: {
    remove(reference) {
      this.$store.dispatch("removeFromCart", reference);
    },
  },
};
</script>

<style scoped lang="scss">
h3,
h5 {
  margin: 0;
}
.minicart {
  background-color: lightgray;
  min-width: 300px;
  padding: 10px;
  border-radius: 4px;
}
img {
  border-radius: 4px 4px 0 0;
  padding-right: 10px;
  width: 100px;
  height: 80px;
  object-fit: cover;
}
button {
  padding: 5px;
  margin: 5px 0;
}
.card-info {
  font-size: 0.9em;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white;
}
.item {
  padding: 10px;
}
</style>
