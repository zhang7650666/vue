<template>
  <div class="madal-container">
    <div class="md-modal modal-msg md-modal-transition" :class="{'md-show':mdshow}">
      <div class="md-modal-inner">
        <div class="md-top">
          <button class="md-close" @click="fnModalHide">Close</button>
        </div>
        <div class="md-content">
          <div class="confirm-tips">
            <slot name="message"></slot>
          </div>
          <div class="btn-wrap">
            <slot name="btnGroup"></slot>
          </div>
        </div>
      </div>
    </div>
    <div class="md-overlay" @click="fnModalHide"></div>
  </div>
</template>

<script>
export default {
  props:{
    mdshow:{
      type:Boolean
    }
  },
  data () {
    return {
    }
  },
  methods:{
    //关闭模态框
    fnModalHide(){
      this.$emit("modalHide")
    }
  }

}
</script>
<style scoped>
</style>
