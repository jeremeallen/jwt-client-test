<template>
  <form @submit.prevent="doLogin">
    <label>Email</label>
    <input type='text' v-model='user.email'/>

    <label>Password</label>
    <input type='password' v-model='user.password'/>

    <button>Login</button>
  </form>
</template>
<script>
  export default {
    name: 'login',
    data() {
      return {
        user: {
          email: '',
          password: '',
        },
      };
    },
  };
</script>
