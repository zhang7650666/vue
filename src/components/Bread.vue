<template>
  <div class="bread-container">
      <div class="nav-breadcrumb-wrap">
        <div class="container">
          <nav class="nav-breadcrumb">
            <a href="/">Home</a>
            <slot name="bread"></slot>
          </nav>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'bread-info',
  data () {
    return {
      
    }
  }
}
</script>
