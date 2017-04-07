<template>
  <div>
    <ul>
      <li v-for='user in users'>
        {{ user.email }}
      </li>
    </ul>
    <button @click='getUsers'>Get users</button>
    <button @click="$router.push('/login')">Login</button>
    <button @click="$emit('logout')">Logout</button>
  </div>
</template>
<script>
  export default {
    name: 'users',
    data() {
      return {
        users: [],
      };
    },
    methods: {
      getUsers() {
        this.$axios.get('http://jwt-test.app/api/users', this.config)
          .then((response) => {
            this.users = response.data;
          });
      },
    },
    created() {
      this.getUsers();
    },
    props: [
      'config',
    ],
  };
</script>
