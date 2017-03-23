<template>
  <div class="data-photos">
    <!-- NOTE: error on require(photo.src) -->
    <a href="#" v-for="photo in photos">
      <img :src="photo.src">
    </a>
  </div>
</template>
<script>

export default {
  name: 'photos',
  props: ['earthMtnActive', 'photos']
}
</script>
