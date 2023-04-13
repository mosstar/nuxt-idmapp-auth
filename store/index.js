export const state = () => {}

export const actions = {
  nuxtServerInit ({ dispatch }) {
    dispatch('role/setPermissions')
  }
}
