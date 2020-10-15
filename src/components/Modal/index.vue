<template>
  <div :id="modalId" class="ui modal">
    <slot name="header" />
    <slot />
    <slot name="actions" />
  </div>
</template>

<script>
import { FormValidation } from '@/model/FormValidation'

export default {
  name: 'Modal',
  props: {
    modalId: {
      type: String,
      required: true
    },
    formId: {
      type: String,
      default: ''
    }
  },
  mounted() {
    if (this.formId !== '') {
      $(`#${this.modalId}`).modal({
        closable: false,
        onApprove: () => {
          return FormValidation.validateForm(this.formId)
        }
      })
    }
  }
}
</script>

