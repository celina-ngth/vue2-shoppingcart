import axios from 'axios'
import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex);

const state = {
  products: {},
  cart: {},
  qty: 1,
  total: 0,
  nbItems: 0
}

const getters = {}

const actions = {
  getProducts({ commit }) {
    axios.get('http://localhost:3000/products')
      .then(response => {
        commit('GET_PRODUCTS', response.data)
      })
  },

  getCart({ commit }) {
    axios.get('http://localhost:3000/cart')
      .then(response => {
        commit('GET_CART', response.data)
        commit('total', response.data)
      })
  },

  addProductToCart({ commit }, product) {
    commit('ADD_TO_CART', product)
    axios.put('http://localhost:3000/cart/', state.cart)
      .then(response => {
        commit('GET_CART', response.data)
        commit('total', response.data)
        state.qty = 1
      })
  },

  removeFromCart({ commit }, reference) {
    commit('DELETE_FROM_CART', reference)
    axios.put('http://localhost:3000/cart/', state.cart)
      .then(response => {
        commit('GET_CART', response.data)
        commit('total', response.data)
      })
  },

  incrementQuantity({ commit }, productId) {
    commit("INCREMENT", productId);
    axios.put('http://localhost:3000/cart/', state.cart)
      .then(response => {
        commit('GET_CART', response.data)
        commit('total', response.data)
      })
  },

  decrementQuantity({ commit }, productId) {
    commit("DECREMENT", productId);
    axios.put('http://localhost:3000/cart/', state.cart)
      .then(response => {
        commit('GET_CART', response.data)
        commit('total', response.data)
      })
  }
}

const mutations = {
  // Init products
  GET_PRODUCTS(state, products) {
    state.products = products
  },

  // Init cart
  GET_CART(state, products) {
    state.cart = products
  },

  // Add product to cart
  ADD_TO_CART(state, product) {
    // Check if cart is empty
    if (Object.keys(state.cart).length != 0) {
      for (const [key, value] of Object.entries(state.cart)) {
        // Check if product already in cart, then change quantity 
        if (key === product.reference) {
          product.qty = value.qty + state.qty
          state.cart[key].qty = product.qty
        } else {
          state.cart[product.reference] = product
        }
      }
    } else {
      state.cart[product.reference] = product
    }
  },

  // Delete item from cart
  DELETE_FROM_CART(state, reference) {
    delete state.cart[reference];
  },

  // Increment quantity of a product
  INCREMENT(state, reference) {
    for (let key in state.cart) {
      if (key === reference) state.cart[key].qty += 1
    }
  },

  // Decrement quantity of a product
  DECREMENT(state, reference) {
    for (let key in state.cart) {
      if (key === reference && ((state.cart[key].qty - 1)) != 0) state.cart[key].qty -= 1
    }
  },

  // Calculate total
  total() {
    let totals = 0
    let nb = 0
    if (Object.keys(state.cart).length != 0) {
      for (let key in state.cart) {
        totals += state.cart[key].price.base.amount * state.cart[key].qty;
        nb += state.cart[key].qty;
        state.total = totals
        state.nbItems = nb
      }
    } else {
      state.total = 0
      state.nbItems = 0
    }
  },
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})