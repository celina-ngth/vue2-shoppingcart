<template>
  <div class="shopping-cart">
    <h1>Panier</h1>
    <div v-if="Object.keys(cart).length === 0">Votre panier est vide</div>
    <div v-else>
      <div class="flex">
        <h3>
          {{ nbItems }}
          <span v-if="nbItems === 1">produit</span>
          <span v-else>produits</span>
        </h3>
      </div>
      <div v-for="item in cart" :key="item.reference">
        <div class="card-info">
          <img
            :src="item.images[0].small"
            width="100px"
            height="auto"
            :alt="item.name"
          />
          <div>
            <h4>{{ item.name }}</h4>
            <p class="ref">Réf. : {{ item.reference }}</p>
          </div>
          <p>{{ item.price.base.formatted }}</p>
          <div class="quantity">
            Quantité :
            <button @click="decreaseQuantity(item.reference)">-</button>
            <p>{{ item.qty || 0 }}</p>
            <button @click="increaseQuantity(item.reference)">+</button>
          </div>
          <div>
            <button @click="openModal(item.reference)">Supprimer</button>
            <ConfirmModal
              v-if="confirmModal"
              @confirm="remove"
              @cancel="cancelRemove"
            />
          </div>
        </div>
        <hr />
      </div>
      <h3>Total : {{ total }} euros</h3>
    </div>
  </div>
</template>

<script>
import ConfirmModal from "./ConfirmModal.vue";
export default {
  name: "Cart",
  props: {},
  components: {
    ConfirmModal,
  },
  data() {
    return {
      confirmModal: false,
      itemToRemove: null,
    };
  },
  computed: {
    cart() {
      return this.$store.state.cart;
    },
    total() {
      return this.$store.state.total;
    },
    nbItems() {
      return this.$store.state.nbItems;
    },
  },
  methods: {
    openModal(reference) {
      this.confirmModal = true;
      this.itemToRemove = reference;
    },
    cancelRemove() {
      this.confirmModal = false;
    },
    remove() {
      this.$store.dispatch("removeFromCart", this.itemToRemove);
      this.confirmModal = false;
    },
    increaseQuantity(reference) {
      this.$store.dispatch("incrementQuantity", reference);
    },
    decreaseQuantity(reference) {
      this.$store.dispatch("decrementQuantity", reference);
    },
  },
};
</script>

<style scoped lang="scss">
h1,
h4,
p {
  margin: 5px;
}
.shopping-cart {
  background-color: lightgray;
  min-width: 250px;
  margin: 10px;
  padding: 20px;
  border-radius: 4px;
}
.ref {
  font-size: 0.8em;
}

img {
  border-radius: 4px 4px 0 0;
  width: 100px;
  height: 100px;
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
.card-info,
.quantity {
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  column-gap: 10px;
}
.flex {
  display: flex;
  justify-content: space-between;
  width: auto;
}

@media (min-width: 360px) and (max-width: 1024px) {
  .card-info {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
</style>
