<template>
  <div>
    <section class="section" >
      <div class="columns">
        <div class="column">
          <h2 class="title is-2">Resturantes</h2>
        </div>
      </div>
      <div class="table-container">
        <button class="button" @click="onLogout">
          Logout
        </button>
        <nuxt-link to="admin/create" class="button is-success">
          Crear Restaurante
        </nuxt-link>
        <table class="table is-fullwidth is-bordered">
          <thead>
            <tr>
              <th>Id</th>
              <th>Restaurant name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in restaurants" :key="index">
              <td>{{ item.id }}</td>
              <td>{{ item.name }}</td>
              <td>
                <nuxt-link class="button" :to="'admin/' + item.id">
                  Edit
                </nuxt-link>
                <button class="button is-danger" @click="deleteItem(item.id)">
                Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>

<script>
import {db} from "~/plugins/firebase.js";
import { auth } from '~/plugins/firebase';
import { signOut } from 'firebase/auth';
import {collection, getDocs, doc, deleteDoc} from "firebase/firestore";
export default{
    middleware:'auth',
    data(){
        return {
            restaurants: []
        }
    },
    async asyncData(){
        //otra forma de hacerlo
        try{
        const snapshot = await getDocs(collection(db, 'restaurants'));
        const restaurantes = [];
        snapshot.forEach((doc) => {
             restaurantes.push({ id: doc.id, ...doc.data() });
        });
        return restaurantes;
        }catch(error){
            console.error(error);
        }
    },
    created(){
        //hook de una vez creado el componente, que haga la petición.
        this.getRestaurantes();
    },
    methods:{
      deleteItem(id){
        const ref = doc(db, 'restaurants', id);
        deleteDoc(ref).then(this.getRestaurantes()).catch(err=>console.error(err));
      },
      getRestaurantes(){
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
      onLogout(){
        signOut(auth).then(this.$router.push('/')).catch(err=>console.error(err));
      }
    }
}
</script>
<style>
</style>