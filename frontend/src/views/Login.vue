<template>
  <div id="login">
    <b-container fluid>
      <b-form class="col-12 form-sing pt-5" @submit.prevent="login">
        <h1 class="h3 mb-3 font-weigth-normal">Login ChatNode</h1>
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
        <button>Entrar</button>&nbsp;
      </b-form>
    </b-container>
  </div>
</template>

<script>
import api from "../services/api";

export default {
  name: "Login",
  components: {},
  data: () => {
    return {
      email: "",
      senha: "",
    };
  },

  methods: {
    async login() {
      try {
        const user = await api.post("/authenticate", {
          email: this.email,
          password: this.senha,
        });
        if(user.status === 200){
            sessionStorage.user = JSON.stringify(user.dat);

            const response = user.data;
            sessionStorage.user = JSON.stringify(user.data);
            localStorage.setItem('chatToken', JSON.stringify(response.data.user.token));

            // setTimeout(()=>{
            //   this.$router.push('/login');
            // })
        
        
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
