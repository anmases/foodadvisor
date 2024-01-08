<template>
  <!--El $ es para acceder a propiedades globales del contexto de la aplicación-->
  <!-- En este caso sería el endpoint, son como las variables superglobales de php-->
  <!--debemos nobrar el componente con _-->
  <!--Con esto podemos crear páginas web dinámicas, cuyo contenido es diferente según el parámetro de entrada-->
  <div>
    <div class="container">
      <section class="section">
        <h1 class="title is-1">{{ restaurant.name }}</h1>
        <nav class="breadcrumb" aria-label="breadcrumbs">
          <ul>
            <li>
              <nuxt-link to="/"> Home </nuxt-link>
            </li>
            <li>
              <nuxt-link :to="`/${$route.params.category}`" aria-current="page">
                {{ $route.params.category }}
              </nuxt-link>
            </li>
            <li class="is-active">
              <a href="#" aria-current="page">{{ restaurant.name }}</a>
            </li>
          </ul>
        </nav>
        <div class="columns">
          <div class="column box">
            <div class="columns">
              <div class="column">
                <img :src="restaurant.image" alt="Imagen no disponible" class="image" />
              </div>
            </div>
            <div class="columns">
              <div class="column">
                <p>{{ restaurant.description }}</p>
              </div>
              <div class="column has-text-right">
                <div class="button">
                  <span>{{ restaurant.likes }}</span>
                </div>
              </div>
            </div>
            <div class="columns">
              <div class="column">
                <span class="tag">{{ restaurant.city }}</span>
              </div>
              <div class="column has-text-right">
                <span>{{ restaurant.address }}</span>
              </div>
            </div>
            <div class="columns">
              <div class="column">
                <p>Descripción:</p>
                <p>{{ restaurant.text }}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import api from "~/services/api";
import {db} from "~/plugins/firebase.js";
import { collection, where, getDocs, query } from 'firebase/firestore';
export default {
  head(){
    return{
      title: "FoodAdvisor "+this.restaurant.name,
      meta:[
        {hid:"description", name:"description", content: 'En este sitio encontraras información sobre los restaurantes mejor valorados en tu ciudad.'}
      ]
    }
  },
  data(){
    return {restaurant: {}};
  },
  async created() {
    try {
      const q = query(collection(db, 'restaurants'), where('slug', '==', this.$route.params.slug));
      const snapshot = await getDocs(q);
      this.restaurant = snapshot.docs.shift().data();
     /* const { data } = await api.getOneRestaurant(params.slug);
      return { restaurant: data.shift() };*/
    } catch (error) {
      console.log({ statusCode: 404, message: "Restaurant not found" });
    }
  }
};
</script>

<style scoped>
.image {
  width: 100%;
}
</style>
