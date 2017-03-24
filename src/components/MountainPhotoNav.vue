<template>
  <router-link v-if="mountain.photos" :to="mountain.id" class="earth-mtn-hover" :data-mountain="mountain.id">
    <img class="b-lazy"
      src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="
      :data-src="mountain.photos[0].src"
      width="150" height="150" :title="mountain.title">
  </router-link>
</template>

<script>

export default {
  name: 'mountain-photo-nav',
  props: ['mountain']
}
</script>
