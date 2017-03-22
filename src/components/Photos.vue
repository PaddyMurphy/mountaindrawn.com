<template>
  <div class="data-photos">
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
