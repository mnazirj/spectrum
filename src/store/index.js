import { createStore } from "vuex";

export default createStore({
  state: {
    cart: JSON.parse(localStorage.getItem("cart") || "[]"),
    total: parseFloat(localStorage.getItem("total")),
    wishlist: JSON.parse(localStorage.getItem("wishlist") || "[]"),
  },

  getters: {
    total(state) {
      return state.cart.reduce((sum, item) => sum + item.price * item.qty, 0);
    },
  },

  mutations: {
    ADD_TO_CART(state, item) {
      state.cart.push(item);
    },
    INCREMENT_QTY(state, index) {
      state.cart[index].qty += 1;
    },
    DECREMENT_QTY(state, index) {
      const item = state.cart[index];
      if (item.qty > 1) {
        item.qty -= 1;
      } else {
        state.cart.splice(index, 1);
      }
    },
    SET_CART(state, cart) {
      state.cart = cart;
    },
    STORE_CART(state, subtotal) {
      localStorage.setItem("cart", JSON.stringify(state.cart));
      localStorage.setItem("total", subtotal);
    },

    ADD_TO_WISHLIST(state, item) {
      state.wishlist.push(item);
    },
    REMOVE_FROM_WISHLIST(state, item) {
      state.wishlist = state.wishlist.filter((p) => p.name !== item.name);
    },
    SET_WISHLIST(state, wishlist) {
      state.wishlist = wishlist;
    },
    STORE_WISHLIST(state) {
      localStorage.setItem("wishlist", JSON.stringify(state.wishlist));
    },
  },

  actions: {
    addToCart({ state, commit, getters }, { product, selectedProp }) {
      const prop = selectedProp > -1 ? product.propreties[selectedProp] : null;

      const size = prop && prop.type === "size" ? prop.value : null;
      const color = prop && prop.type === "color" ? prop.value : null;

      const hasDiscount = product.discountPrice || (prop && prop.discountPrice);
      const unitPrice = prop ? (hasDiscount ? prop.discountPrice : prop.price) : hasDiscount ? product.discountPrice : product.price;

      const existingIndex = state.cart.findIndex((item) => item.name === product.name && item.size === size && item.color === color);

      if (existingIndex === -1) {
        commit("ADD_TO_CART", {
          id: product.id,
          name: product.name,
          qty: 1,
          size,
          color,
          price: parseFloat(unitPrice),
          image: product.images[0]?.image || "",
        });
      } else {
        commit("INCREMENT_QTY", existingIndex);
      }

      commit("SET_CART", state.cart);
      commit("STORE_CART", getters.total);
    },

    addToWishlist({ state, commit }, { item }) {
      const existingIndex = state.wishlist.findIndex((p) => p.name == item.name);
      console.log(existingIndex);

      if (existingIndex !== -1) {
        return;
      }
      console.log(item);
      commit("ADD_TO_WISHLIST", {
        id: item.id,
        name: item.name,
        image: item.images?.[0].image || item.image || "",
      });
      commit("SET_WISHLIST", state.wishlist);
      commit("STORE_WISHLIST", state);
    },

    removeFromWishlist({ state, commit }, { item }) {
      commit("REMOVE_FROM_WISHLIST", item);
      commit("SET_WISHLIST", state.wishlist);
      commit("STORE_WISHLIST", state);
    },
  },
});
