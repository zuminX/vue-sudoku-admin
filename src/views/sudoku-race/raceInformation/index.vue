<template>
  <Form ref="raceInformationForm" form-id="raceInformationForm" :validate-rule="validateRule()">
    <LeftLabeledInputField :data.sync="form.title" label="标题" name="title" />
    <BasicField>
      <div class="ui left corner labeled input">
        <div class="ui left corner label">
          <i class="asterisk icon" />
        </div>
        <textarea v-model="form.description" placeholder="竞赛的描述" name="description" />
      </div>
    </BasicField>
    <LeftLabeledField label="竞赛时间">
      <el-date-picker
        v-model="form.raceTimeRange"
        type="datetimerange"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      />
    </LeftLabeledField>
  </Form>
</template>

<script>
import Form from '@/components/Form'
import LeftLabeledInputField from '@/components/Form/field/LeftLabeledInputField'
import BasicField from '@/components/Form/field/BasicField'
import { FormValidation } from '@/model/FormValidation'
import LeftLabeledField from '@/components/Form/field/LeftLabeledField'

export default {
  name: 'RaceInformation',
  components: { LeftLabeledField, BasicField, LeftLabeledInputField, Form },
  data() {
    return {
      form: {
        title: '',
        description: '',
        raceTimeRange: [new Date(), new Date()]
      }
    }
  },
  methods: {
    /**
     * 校验竞赛信息表单
     */
    validaForm() {
      return this.$refs.raceInformationForm.validaForm()
    },
    /**
     * 设置竞赛信息表单验证规则
     */
    validateRule() {
      return {
        title: FormValidation.raceTitleRules,
        description: FormValidation.raceDescriptionRules
      }
    }
  }
}
</script>
