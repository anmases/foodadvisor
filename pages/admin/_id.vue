<template>
 <div class="section" v-if="restaurant">
      <div class="columns">
        <div class="column is-6 is-offset-3">
          <div class="columns">
            <div class="column">
              <h2 class="title is-2">Restaurant:</h2>
            </div>
          </div>
          <div class="columns box">
            <div class="column">
              <div class="field">
                <label class="label">Name</label>
                <div class="control">
                  <input
                    class="input"
                    type="text"
                    v-model="restaurant.name"
                    placeholder="restaurant name"
                  />
                </div>
              </div>
              <div class="field">
                <label class="label">Slug</label>
                <div class="control">
                  <input class="input" type="text" :placeholder="slug" disabled />
                </div>
              </div>
              <div class="field">
                <label class="label">Image</label>
                <div class="control">
                  <input
                    v-model="restaurant.image"
                    class="input"
                    type="text"
                    placeholder="https://...."
                  />
                </div>
              </div>
              <div class="field">
                <label class="label">Description</label>
                <div class="control">
                  <input
                    v-model="restaurant.description"
                    class="input"
                    type="text"
                    placeholder="description"
                  />
                </div>
              </div>
              <div class="field">
                <label class="label">Address</label>
                <div class="control">
                  <input
                    v-model="restaurant.address"
                    class="input"
                    type="text"
                    placeholder="address"
                  />
                </div>
              </div>
              <div class="field">
                <label class="label">Cities</label>
                <div class="control">
                  <div class="select">
                    <select v-model="restaurant.city">
                      <option>Select dropdown</option>
                      <option value="Madrid">Madrid</option>
                      <option value="Barcelona">Barcelona</option>
                      <option value="Valencia">Valencia</option>
                    </select>
                  </div>
                </div>
              </div>
              <div class="field">
                <label class="label">Category</label>
                <div class="control">
                  <div class="select">
                    <select v-model="restaurant.category">
                      <option>Select dropdown</option>
                      <option value="brunch">Brunch</option>
                      <option value="burgers">Burgers</option>
                      <option value="mediterranean">Mediterranean</option>
                      <option value="italian">Italian</option>
                    </select>
                  </div>
                </div>
              </div>
              <div class="field">
                <label class="label">Text</label>
                <div class="control">
                  <textarea
                    v-model="restaurant.text"
                    class="textarea"
                    type="textarea"
                    rows="10"
                    placeholder="text"
                  />
                </div>
              </div>
              <div class="field">
                <div class="control has-text-centered">
                  <button
                    class="button is-danger"
                    type="button"
                    @click="$router.back()"
                  >
                    Cancel
                  </button>
                  <button
                    class="button is-link"
                    type="button"
                    @click.prevent="update"
                  >
                    Update
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import {db} from "~/plugins/firebase.js";
import {doc, getDoc, updateDoc} from 'firebase/firestore';
export default{
    middleware: 'auth',
    data(){
        return {
            restaurant: null
        }
    },
    async asyncData({params}){
        try{
        const snapshot = await getDoc(doc(db, 'restaurants', params.id));
        if(snapshot.exists()){
            return {restaurant : { id: snapshot.id, ...snapshot.data() }};
        }else {
            console.log("No se encontró ningún documento con ese ID");
            return null;
        }
        }catch(err){
            console.error(err);
        }
    },
    methods:{
        update(){
            const document = doc(db, 'restaurants', this.$route.params.id);
            updateDoc(document, this.restaurant).then(()=>this.$router.back()).catch(err=>console.log(err));
        }
    }
}
</script>

<style>
</style>