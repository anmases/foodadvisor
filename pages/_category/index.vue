<template>
  <div class="container">
    <section class="section">
      <h1 class="title is-1">{{ $route.params.category }}</h1>
      <nav class="breadcrumb" aria-label="breadcrumbs">
        <ul>
          <li>
            <nuxt-link to="/"> Home </nuxt-link>
          </li>
          <li class="is-active">
            <a href="#" aria-current="page">{{ $route.params.category }}</a>
          </li>
        </ul>
      </nav>
      <div class="container">
        <section class="section">
          <div class="columns">
            <RestaurantCard
              :name="restaurant.name"
              :description="restaurant.description"
              :slug="restaurant.slug"
              :category="restaurant.category"
              :likes="restaurant.likes"
              :image="restaurant.image"
              class="restaurant-card"
              v-for="(restaurant, index) in restaurants"
              :key="index"
            />
          </div>
        </section>
      </div>
    </section>
  </div>
</template>

<script>
import RestaurantCard from "~/components/RestaurantCard";
import api from "~/services/api";
import {db} from "~/plugins/firebase.js";
import { collection, where, getDocs, query } from 'firebase/firestore';
export default {
  components: {
    RestaurantCard,
  },
  head(){
    return{
      title: "FoodAdvisor "+this.$route.params.category,
      meta:[
        {hid:"description", name:"description", content: 'En este sitio encontraras información sobre los restaurantes mejor valorados en tu ciudad.'}
      ]
    }
  },
 /* async asyncData({ params }) {
    try {
      const { data } = await api.getRestaurantsByCategory(params.category);
      return { restaurants: data };
    } catch (error) {
      console.log({ statusCode: 404, message: "Category not found" });
    }
  },*/
  data() {
    return {
      restaurants: [],
    };
  },
  async created(){
    try{
      const q = query(collection(db, 'restaurants'), where('category', '==', this.$route.params.category));
      const snapshot = await getDocs(q);
      snapshot.forEach((doc)=>{
        this.restaurants.push({id:doc.id, ...doc.data()});
      })
    }catch(error){
      console.error("Error al obtener documentos: ", error);
    }
  }
};
</script>

<style scoped>
.restaurant-card {
  margin: 10px 20px;
  min-width: 300px;
}
</style>
