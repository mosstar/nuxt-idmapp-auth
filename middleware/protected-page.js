export default async function ({ error, route, store, $checkPermission }) {
  // Firstly, fetch all permissions
  store.dispatch('role/setPermissions')

  // Find required permission
  const permissions = route.meta[0].permissions

  if (!permissions) {
    return
  }

  const checkPermission = await $checkPermission(permissions)
  if (!checkPermission) {
    return error({ statusCode: 403, message: 'You have no access to this page' })
  }
}
