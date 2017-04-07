<template>
  <div>
    <div v-if='error.message'>
      {{ error.message }}
    </div>
    <form @submit.prevent="doLogin">
      <label>Email</label>
      <input type='text' v-model='user.email'/>

      <label>Password</label>
      <input type='password' v-model='user.password'/>

      <button>Login</button>
    </form>
  </div>
</template>
<script>
  export default {
    name: 'login',
    data() {
      return {
        user: {
          email: 'ubeier@example.net',
          password: 'secret',
        },
        error: {
          message: '',
        },
      };
    },
    methods: {
      doLogin() {
        this.error.message = '';
        this.$axios.post('http://jwt-test.app/api/authenticate', this.user)
          .then((response) => {
            this.$emit('loggedIn', response.data.token);
            this.$router.push({ name: 'users' });
          })
          .catch((error) => {
            if (error.response && error.response.status === 401 && error.response.data.error === 'invalid_credentials') {
              this.error.message = 'Invalid email or password';
            }
          });
      },
    },
  };
</script>
