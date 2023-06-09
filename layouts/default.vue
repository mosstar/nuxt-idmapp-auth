<template>
  <div class="wrapper">
    <div class="header">
      <div class="header-menu">
        <nuxt-link v-for="menuItem in visibleMenuItems" :key="menuItem.link" :to="menuItem.link">
          {{ menuItem.title }}
        </nuxt-link>
      </div>

      <div v-if="loggedIn" class="header-profile">
        {{ $auth.user.name }} | {{ $auth.user.email }} | <button @click="logout">Logout</button>
      </div>
    </div>

    <div v-if="loggedIn" class="perms">
      <strong>Permissions:</strong> {{ perms }}
    </div>

    <div class="content">
      <nuxt />
    </div>

    <div class="footer">
      <p>
        This is an open source project.
        For more information, visit our <a href="https://github.com/mosstar/nuxt-idmapp-auth" target="_blank">GitHub</a> page.
      </p>
    </div>

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
    },
    menuItems () {
      const { userRead, userWrite } = this.$permissions

      return [
        {
          title: 'Home',
          link: '/',
          visible: true
        },
        {
          title: 'Public',
          link: '/public',
          visible: true
        },
        {
          title: 'Guest',
          link: '/guest',
          visible: !this.loggedIn
        },
        {
          title: 'List',
          link: '/list',
          visible: this.$checkPermission(userRead)
        },
        {
          title: 'Add',
          link: '/add',
          visible: this.$checkPermission(userWrite)
        }
      ]
    },
    visibleMenuItems () {
      return this.menuItems.filter(item => item.visible)
    }
  },
  methods: {
    logout () {
      this.$auth.logout()
        .then(() => {
          this.$store.dispatch('role/clearPermissions')
        })
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
  padding: 0 10px;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  padding: 10px 0;
  border-bottom: 1px solid #282828;
  gap: 10px;
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

.content {
  flex: 1;
}

.footer {
  border-top: 1px solid #282828;
  padding: 10px 0;
}

.footer p {
  margin: 0;
  padding: 0;
}
</style>
