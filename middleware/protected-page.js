export default async function ({ error, route, $checkPermission }) {
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
