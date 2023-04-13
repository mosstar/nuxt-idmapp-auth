<template>
  <div>
    <h1>Guest Page</h1>

    <p>Only guests can see this page.</p>
  </div>
</template>

<script>
export default {
  name: 'GuestPage',
  auth: 'guest'
}
</script>
