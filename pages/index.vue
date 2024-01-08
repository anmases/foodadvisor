<script>
import RestaurantCard from "~/components/RestaurantCard.vue";
import Hero from "~/components/Hero.vue";
import Banner from "~/components/Banner.vue";
import Slogan from "~/components/Slogan.vue";
import api from "~/services/api.js";
import {db} from "~/plugins/firebase.js";
import {collection, getDocs} from "firebase/firestore";
export default {
  components: {
    Banner,
    Slogan,
    Hero,
    RestaurantCard,
  },
  async asyncData(){
    //Esto solo funciona en pages.
    /*try{
      const {data} = await api.getRestaurants();
      console.log(data);
      return {restaurants : data};
    }catch{
      return {restaurants: []};
    }*/
  },
  created(){
    this.restaurants = [];
        const response = getDocs(collection(db, 'restaurants'));
        response.then((snapshot)=>{
            snapshot.forEach((doc)=>{
                const restaurant = {
                    id: doc.id,
                    ...doc.data()
                }
                this.restaurants.push(restaurant);
            })
        }).catch((err)=>{console.log(err)});
  },
 /* async created(){
    const response = await api.getRestaurants();
    if(response.status == 200){
      this.restaurants = response.data;
    }
  },*/
  data() {
    return {
      showBanner: true,
      restaurants: []
    };
  },
  methods: {
    async sumLikes(restaurant) {
      const payload = {
        id: restaurant.id,
        data: {
          likes: restaurant.likes + 1
        }
      };
      const response = await api.putSumRestaurantLikes(payload);
      if(response.status == 200)
         restaurant.likes++;
    },
  },
};


</script>

<template>
  <div>
    <Hero @onShowBanner="showBanner = !showBanner">
      <!--Inyectamos html al slot-->
      <Banner slot="header" style="width: 790px;" v-if="showBanner"/>
      <Slogan slot="header" style="width: 790px;" v-else/>
    </Hero>
  <div class="container">
    <section class="section">
      <div class="columns is-multiline">
      <RestaurantCard
        :name="restaurant.name"
        :description="restaurant.description"
        :category="restaurant.category"
        :slug="restaurant.slug"
        :likes="restaurant.likes"
        :image="restaurant.image"
        @onLikeButton="sumLikes(restaurant)"
        v-for="(restaurant, index) in restaurants"
        :key="index"
        class="restaurant-card"
      />
      </div>
    </section>
  </div>
</div>
</template>
<!--scoped significa que solo se aplicará a este componente-->
<style scoped>
.section{
  display: flex;
}
.restaurant-card{
  margin: 10px 10px;
  max-width: 300px;
}
</style>
