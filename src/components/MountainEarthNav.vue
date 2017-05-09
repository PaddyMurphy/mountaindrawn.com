<template>
  <a href="#"
    class="earth-mtn"
    @click.prevent="navigate(1)"
    @mouseover="hoverMtnShortcut">
    <polygon data-index="1" id="nav-bugaboo" fill="#68498E" points="137 75.7246094 138.5625 63 144.035156 75.9667969"></polygon>
  </a>
</template>

<script>
export default {
  name: 'mountain-earth-nav',
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data () {
    return {

    }
  }
}
</script>
