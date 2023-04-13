<template>
  <div class="wrapper">
    <div class="header">
      <div class="header-menu">
        <nuxt-link to="/">
          HOME
        </nuxt-link>
        <nuxt-link to="/public">
          PUBLIC
        </nuxt-link>
        <nuxt-link v-if="!loggedIn" to="/guest">
          GUEST
        </nuxt-link>
        <nuxt-link v-if="$checkPermission($permissions.userRead)" to="/list">
          LIST
        </nuxt-link>
        <nuxt-link v-if="$checkPermission($permissions.userWrite)" to="/add">
          ADD
        </nuxt-link>
      </div>

      <div v-if="loggedIn" class="header-profile">
        {{ $auth.user.name }} | {{ $auth.user.email }} | <button @click="$auth.logout()">Çıkış Yap</button>
      </div>
    </div>

    <div v-if="loggedIn" class="perms" v-text="perms" />

    <nuxt />

  </div>
</template>

<script>
export default {
  name: 'DefaultLayout',
  computed: {
    loggedIn () {
      return this.$auth.loggedIn
    },
    perms () {
      return this.$store.state.role.permissions.join(', ') || 'You have no permissions'
    }
  }
}
</script>

<style>
html, body {
  margin: 0;
  padding: 0;
}

.wrapper {
  max-width: 1000px;
  margin: 0 auto;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #282828;
}

.header-menu {
  display: flex;
  align-items: center;
  gap: 5px;
}

.header-menu a {
  display: inline-block;
  padding: 8px 12px;
  background: #e6e6e6;
  border-radius: 3px;
  text-decoration: none;
  color: #282828;
}

.header-menu a:hover {
  text-decoration: underline;
}

.header-profile {
  padding: 8px 12px;
  background: #e6e6e6;
  border-radius: 3px;
}

.perms {
  padding: 10px 0;
  border-bottom: 1px solid #282828;
}
</style>
