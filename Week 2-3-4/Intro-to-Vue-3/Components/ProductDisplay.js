app.component('product-display', {
  props: {
    premium:{
      type: Boolean,
      required: true
    },
    cart: {
      type: Array,
      required: true
    }
  },
  template: 
  /*html*/
  `<div class="product-display">
    <div class="product-container">
      <div class="product-image">
        <img :src="image">
      </div> 
      <div class="product-info">
        <h1>{{ title }}</h1>

        <p v-if="inStock">In stock</p>
        <p v-else>Out of stock</p>

        <p>Shipping: {{shipping}}</p>

        <!-- Detail & Color-->
        <product-details :details="details"></product-details>
          
        <div v-for="(variant, index) in variants" :key="variant.id" @mouseover="updateVariant(index)" class="color-circle" :style="{ backgroundColor: variant.color }"></div>

        <!-- Add to cart button -->
        <button
          class="button"
          :class="{ disabledButton: !inStock }"
          :disabled="!inStock"
          @click="addToCart">
          Add to cart
        </button>

        <!-- Remove from cart button -->
        <button
          class="button"
          :class="{ disabledButton: cartCount === 0 }"
          :disabled="cartCount === 0"
          @click="removeFromCart">
          Remove from cart
        </button>
      </div>
    </div>
    <review-list v-if="reviews.length" :reviews="reviews"></review-list>
    <review-form @review-submitted="addReview"></review-form>
  </div>`,
  data(){
    return{
      product:'Socks',
      brand: 'Vue Mastery',
      selectedVariant: 0,
      onSale: true,
      details: ['50% cotton', '30% wool', '20% polyester'],
      variants: [
        { id: 2234, color: 'green', image: './assets/images/socks_green.jpg', quantity: 50 },
        { id: 2235, color: 'blue', image: './assets/images/socks_blue.jpg', quantity: 0 },
      ],
      reviews: []
    }
  },
  methods: {
    addToCart() {
    this.$emit('add-to-cart', this.variants[this.selectedVariant].id)
    },
    removeFromCart() {
      this.$emit('remove-from-cart', this.variants[this.selectedVariant].id)
    },        
    updateVariant(index) {
      this.selectedVariant = index
      console.log(index)
    },
    addReview(review) {
      this.reviews.push(review)
    }
  },
  computed: {
    title() {
      return this.brand + ' ' + this.product
    },
    image(){
      return this.variants[this.selectedVariant].image
    },
    inStock(){
      return this.variants[this.selectedVariant].quantity
    },
    cartCount() {
      return this.cart.filter(id => id === this.variants[this.selectedVariant].id).length
    },
    shipping(){
      if (this.premium){
        return 'Free'
      }
      return 2.99
    }
  }
})