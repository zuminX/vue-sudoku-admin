<template>
  <div class="ui left icon input">
    <i class="shield alternate icon" />
    <input
      ref="captchaInput"
      v-model="input"
      name="code"
      placeholder="验证码"
      type="text"
      @input="$emit('input', $event.target.value)"
    >
    <img :src="captchaBaseUrl" class="m-margin-l captcha" @click="getCaptchaImage">
  </div>
</template>

<script>
import { captchaImage } from '@/api/securityApi'

export default {
  name: 'CaptchaInput',
  props: {
    uuid: {
      type: String,
      required: true
    },
    name: {
      default: 'code',
      type: String
    }
  },
  data() {
    return {
      captchaBaseUrl: '',
      input: ''
    }
  },
  methods: {
    async getCaptchaImage() {
      this.focusIfRefreshOldCaptcha()
      this.clearInput()

      const { success, data } = await captchaImage()
      if (success) {
        this.captchaBaseUrl = `data:image/gif;base64,${data.captchaBase64}`
        this.$emit('update:uuid', data.uuid)
      }
    },
    focusIfRefreshOldCaptcha() {
      if (this.uuid !== '') {
        this.$refs.captchaInput.focus()
      }
    },
    clearInput() {
      this.$emit('update:uuid', '')
      this.input = ''
    }
  }
}
</script>

<style scoped>
.captcha {
  width: 111px;
  height: 36px;
  cursor: pointer;
}
</style>
