export default (context, inject) => {
  inject('permissions', {
    userRead: 'user-read',
    userWrite: 'user-write'
  })

  inject('checkPermission', (permission) => {
    const { permissions } = context.store.state.role

    if (typeof permission === 'string') {
      const perm = permissions.includes(permission)
      return !!perm
    } else if (Array.isArray(permission)) {
      const perm = permissions.find(p => permission.includes(p))
      return !!perm
    } else {
      return false
    }
  })
}
