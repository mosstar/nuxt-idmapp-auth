export const state = () => ({
  permissions: []
})

export const mutations = {
  SET_PERMISSIONS (state, permissions) {
    state.permissions = permissions
  }
}

export const actions = {
  clearPermissions ({ commit }) {
    commit('SET_PERMISSIONS', [])
    return true
  },
  setPermissions ({ commit }) {
    const { loggedIn, user } = this.$auth

    if (!loggedIn) { // if user is not logged in, return
      return
    }

    // set permissions
    const roles = user?.resource_access?.idmapp?.roles || []
    commit('SET_PERMISSIONS', roles)
  }
}

export const getters = {
  permissions: state => state.permissions || []
}
