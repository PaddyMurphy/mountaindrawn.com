<template>
  <div
    v-if="JSON.parse(mountain.isMountain)"
    :class="'earth-mtn ' + 'earth-mtn-' + mountain.id"
    :data-mountain="mountain.id"
    :data-index="index"
    @mouseover="hoverMtnShortcut"
    @click="clickMtnShortcut"
  >
  </div>
</template>

<script>

export default {
  name: 'mountain-earth-nav',
  props: ['index', 'mountain', 'clickMtnShortcut', 'hoverMtnShortcut']
}
</script>
