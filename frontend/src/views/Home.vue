<template>
  <div class="home">
    <div>
      <b-jumbotron>
        <template #header>NodeChat</template>

        <template #lead>
          Seja bem vindo ao Chatzinho Node.js + Vue.js
        </template>

        <hr class="my-4" />

        <p>Este chat é em tempo real, desenvolvido com express e socket.io</p>

        <b-button variant="primary" href="/login">Entrar</b-button>&nbsp;
        <b-button variant="success" href="/register">Cadastre-se</b-button>
      </b-jumbotron>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  components: {},
};
</script>
