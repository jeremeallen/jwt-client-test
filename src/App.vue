<template>
  <div id="app">
    <router-view
      @loggedIn='loggedIn'
      @logout='logout'
      :config='config'
    >
    </router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      token: '',
    };
  },
  computed: {
    config() {
      return {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      };
    },
  },
  methods: {
    loggedIn(token) {
      this.token = token;
    },
    logout() {
      this.token = '';
      this.$router.push('/login');
    },
    forceLogin() {
      this.token = '';
      this.$router.push('/login');
    },
  },
  watch: {
    token() {
      if (this.token.length) {
        this.$axios.interceptors.request.use((config) => {
          const currentConfig = config;
          currentConfig.headers.Authorization = `Bearer ${this.token}`;
          return currentConfig;
        }, error => Promise.reject(error));
      }
    },
  },
  created() {
    this.$axios.interceptors.response.use((response) => {
      if (!response.data.token) {
        const headers = response.headers;
        if (headers.authorization) {
          this.token = headers.authorization.replace(/Bearer /i, '');
        }
      }

      if (response.data.status === 400 && response.data.data === 'token_not_provided') {
        this.forceLogin();
      }

      return response;
    }, (error) => {
      if (error.response.status === 400) {
        this.forceLogin();
      }

      if (error.response.status === 401 && error.response.data.error === 'token_expired') {
        this.forceLogin();
      }
      return Promise.reject(error);
    });
  },
};
</script>
