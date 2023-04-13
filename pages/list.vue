<template>
  <div>
    <h1>List Page</h1>

    <p>This page is accessible with <b>user-read</b> permission.</p>
  </div>
</template>

<script>
export default {
  name: 'ListPage',
  meta: {
    permissions: ['user-read']
  }
}
</script>
