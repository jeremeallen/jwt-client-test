<template>
  <div id="app">
    <router-view
      @loggedIn='loggedIn'
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
      token2: '',
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
  },
  watch: {
    token() {
      if (this.token) {
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
      return response;
    }, error => Promise.reject(error));
  },
};
</script>
