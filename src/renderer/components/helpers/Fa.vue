<template>
    <i class="fa" :class="'fa-'+name">
    </i>
</template>

<script>
export default {
  name : 'fa',
  props : [ 'name' ]
}
</script>

