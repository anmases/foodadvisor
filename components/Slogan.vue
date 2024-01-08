
<script>
    import api from '~/services/api.js'
    export default {
        data(){
            return {
                email: '',
                isSuscribed: false
            }
        },
        methods:{
            async suscribe(){
                const payload = {
                    email: this.email
                };
                const response = await api.postSuscribedUser(payload);
                if(response.status == 201){
                    this.isSuscribed = true;
                }
            }
        }
    }
</script>

<template>
    <div>
        <h2 class="title is-2">Food Advisor, tu web de restaurantes</h2>
        <div class="suscribe" v-if="!isSuscribed">
            <input v-model="email" type="email" class="input email" placeholder="email"/>
            <button class="button is-info" @click="suscribe">Suscribirse</button>
        </div>
    </div>
</template>

<style scoped>
.email{
    width: 80%;
}
.suscribe{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}
</style>