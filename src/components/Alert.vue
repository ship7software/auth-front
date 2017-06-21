<template>
  <div class="alert" :class="['alert-' + type]" role="alert" style="text-align: left">
    <i v-if="icon" :class="['fa', 'fa-' + icon]"></i>
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'alert',
  props: {
    type: { type: String, default: 'danger' },
    icon: String,
  },
};
</script>
