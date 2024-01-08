<template>
 <div class="box column is-4 is-offset-4 box-login">
    <div class="columns">
      <div class="column has-text-centered">
        <img src="@/static/logo.png" />
      </div>
    </div>
    <div class="columns">
      <div class="column has-text-left">
        <input class="input" type="text" placeholder="email" v-model="email"/>
      </div>
    </div>
    <div class="columns">
      <div class="column has-text-left">
        <input class="input" type="text" placeholder="contraseña" v-model="password"/>
      </div>
    </div>
    <div class="columns">
      <div class="column has-text-centered">
        <nuxt-link to="/" class="button is-danger">Cancelar</nuxt-link>
        <button @click="onLogin" class="button is-primary">
          Login
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import { signInWithEmailAndPassword } from 'firebase/auth';
import {auth} from '~/plugins/firebase.js';
export default{
    //Definimos su propio layout, para que no tenga cabecera
    layout: 'Login',
    data(){
        return{
            email:'',
            password: ''
        }
    },
    methods:{
        onLogin(){
            const response = signInWithEmailAndPassword(auth, this.email, this.password);
            response.then((data)=>{
                this.$router.push('admin');
            });
        }
    }
}
</script>
<style>
</style>