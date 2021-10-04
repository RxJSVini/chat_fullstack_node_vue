<template>
  <div id="register">
    <b-container fluid>
      <b-form class="col-12 form-sing pt-5" @submit.prevent="register">
        <h1 class="h3 mb-3 font-weigth-normal">Registrar no ChatNode</h1>
        <b-form-input
          class="h3 mb-3 font-weigth-normal"
          type="text"
          v-model="nome"
          placeholder="Digite seu nome aqui"
          id="input-small"
          size="sm"
          required
        ></b-form-input>
        <b-form-input
          class="h3 mb-3 font-weigth-normal"
          type="email"
          v-model="email"
          placeholder="Digite seu email"
          id="input-small"
          size="sm"
          required
        ></b-form-input>
        <b-form-input
          class="h3 mb-3 font-weigth-normal"
          type="password"
          v-model="senha"
          placeholder="*******"
          id="input-small"
          size="sm"
          required
        ></b-form-input>
        <button>Cadastrar</button>&nbsp;
      </b-form>
    </b-container>
  </div>
</template>

<script>
import api from "../services/api";

export default {
  name: "Register",
  components: {},
  data: () => {
    return {
      nome: "",
      email: "",
      senha: "",
    };
  },

  methods: {
    async register() {

      // const token = JSON.parse(localStorage.getItem('chatToken'));
      // const headers = {
      //   authorization:`Baerer ${token}`
      // }

      try {
        
        const user = await api.post("/register", {
          name: this.nome,
          email: this.email,
          password: this.senha,
        }, {headers});
        if (user.status === 200) {
          alert("Cadastrado com sucesso!!");
          sessionStorage.user = user.data;
           setTimeout(()=>{
              this.$router.push({name:'login'});
            }, 300)
        
        } else if (user.status != 200) {

          alert(user.status);

  
        }
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>

<style>
.form-sing {
  margin: 0 auto;
  width: 100vw;
  max-width: 330px;
  text-align: center;
}
.form-sing input[type="email"] {
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}
button {
  color: #fff;
  background-color: rgb(122, 74, 253);
  border-radius: 5px;
  border: 0.1px 1px;
}

.form-sing input[type="password"] {
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>
