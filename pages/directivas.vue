<template>
    <div>
        <p>{{ message }}</p>
        <p v-show="true">Hola</p>
        <p v-if="num > 10">Texto condicional</p>
        <label for="name">Nombre:</label>
        <input type="text" name="name" v-model="name"/>
        {{ name }}
        {{ nameReverser }}
        <span tag="tag is-warning">{{ error }}</span>
        <button v-on:click="saludo" class="button is-info">Saluda</button>
    </div>
</template>
<script>
export default {
    data(){
        return {
            message: 'hola oppen webinars',
            num: 5,
            name:'',
            error:''
        }
    },
    computed:{
      nameReverser(){
        return this.name.split('').reverse().join('');
      }
    },
    watch:{
        name(){
            if(this.name.length > 5){
                this.error ="Nombre demasiado largo";
            }else{
                this.error = '';
            }
        }
    },
    methods:{
        saludo(){
            console.log("Esto es un saludo");
        }
    }
}
</script>