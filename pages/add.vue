<template>
  <div>
    <h1>Add Page</h1>

    <p>This page is accessable with <b>user-write</b> permission.</p>
  </div>
</template>

<script>
export default {
  name: 'AddPage',
  meta: {
    permissions: ['user-write']
  }
}
</script>
