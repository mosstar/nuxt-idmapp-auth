<template>
  <div>
    <h1>Login Page</h1>

    <button @click="login">
      Login
    </button>
  </div>
</template>

<script>
export default {
  name: 'LoginPage',
  methods: {
    login () {
      this.$auth.loginWith('idmapp')
    }
  }
}
</script>
