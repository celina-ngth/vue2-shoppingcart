<template>
  <div id="app">
    <div class="flex row">
      <div class="logo" @click="closeMinicart">
        <img
          alt="Vue logo"
          src="./assets/logo.png"
          width="60px"
          height="60px"
        />
        <h1>Logo</h1>
      </div>
      <div class="dropdown">
        <button v-on:click="showMinicart = !showMinicart">
          Panier ({{ nbItems }})
        </button>
        <div class="minicart">
          <MiniCart :cart="cart" v-show="showMinicart" />
        </div>
      </div>
    </div>
    <div class="flex column" @click="closeMinicart">
      <ProductsList :products="products" />
      <Cart :cart="cart" />
    </div>
  </div>
</template>

<script>
import MiniCart from "./components/MiniCart.vue";
import ProductsList from "./components/ProductsList.vue";
import Cart from "./components/Cart.vue";

export default {
  name: "App",
  components: {
    MiniCart,
    ProductsList,
    Cart,
  },
  data() {
    return {
      showMinicart: false,
    };
  },
  methods: {
    closeMinicart(event) {
      if (event.target) this.showMinicart = false;
    },
  },
  computed: {
    products() {
      return this.$store.state.products;
    },
    cart() {
      return this.$store.state.cart;
    },
    nbItems() {
      return this.$store.state.nbItems;
    },
  },
  mounted() {
    this.$store.dispatch("getProducts");
    this.$store.dispatch("getCart");
  },
};
</script>

<style lang="scss">
#app {
  font-family: Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  color: #2c3e50;
  display: flex;
  flex-direction: column;
  align-self: center;
  margin-top: 30px;
}
.flex {
  display: flex;
  place-self: center;
  width: 80%;
}
.row {
  flex-direction: row;
  justify-content: space-between;
}
button {
  width: fit-content;
  padding: 10px;
  margin: 10px 0;
}
.column {
  flex-direction: column;
  justify-content: center;
}
.logo {
  display: flex;
  align-items: center;
  column-gap: 10px;
}
.dropdown {
  position: relative;
}
.minicart {
  display: flex;
  flex-direction: column;
  position: absolute;
  right: 0;
  top: 30px;
}

@media (min-width: 360px) and (max-width: 1024px) {
  .flex {
    width: 100%;
  }
  #app {
    width: fit-content;
  }
}
</style>
