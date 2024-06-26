<script setup lang="ts">
import type { Rule } from 'ant-design-vue/es/form'
import { ref } from 'vue'
import { PlusOutlined } from '@ant-design/icons-vue'
import type { FormInstance } from 'ant-design-vue'
import ToggleValue from './toggle-value.vue'
import type { SaveToggleParams, ValueParams } from '~@/api/toggle/save'
import { saveToggle } from '~@/api/toggle/save'

const emit = defineEmits(['ok'])

interface CreateToggleState {
  toggleId: string | null
  title: string
  key: string
  description: string
  valueType: string
  values: ToggleValueState[]
  disabledValue: number
}

interface ToggleValueState {
  titleData: string
  valueData: string
  descriptionData: string
}

const valueTypes = ['BOOL', 'STRING', 'FLOAT', 'INT', 'JSON']

const projectId = ref('')

const visible = ref(false)
const formRef = ref<FormInstance>()
const formData = ref<CreateToggleState>({
  toggleId: null,
  title: '',
  key: '',
  description: '',
  valueType: '',
  values: [{ titleData: '选项', valueData: '', descriptionData: '' }],
  disabledValue: 0,
})
const rules: Record<string, Rule[]> = {
  title: [{ required: true, message: '名称不能为空' }],
  key: [
    { required: true, message: '唯一标识符不能为空' },
    { pattern: /^[\w\-.]+$/, message: '只能包含字母、数字、下划线、中划线、点' },
  ],
  valueType: [
    { required: true, message: '返回值类型不能为空' },
  ],
  disabledValue: [
    { required: true, message: '' },
  ],
}

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 },
  },
}
const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 20, offset: 4 },
  },
}

function open(pId: string) {
  projectId.value = pId
  visible.value = true
  formData.value = {
    toggleId: null,
    title: '',
    key: '',
    description: '',
    valueType: '',
    values: [{ titleData: '选项', valueData: '', descriptionData: '' }],
    disabledValue: 0,
  }
}

async function handleOk() {
  try {
    await formRef.value?.validate()

    const params = {
      projectId: Number(projectId.value),
      key: formData.value.key,
      enabled: false,
      title: formData.value.title,
      description: formData.value.description,
      valueType: formData.value.valueType,
      values: formData.value.values.map((v, index) => ({
        title: v.titleData,
        value: v.valueData,
        description: v.descriptionData,
        default: false,
        disabledValue: formData.value.disabledValue === index,
      } as ValueParams)),
    } as SaveToggleParams
    await saveToggle(params)

    emit('ok')
    visible.value = false
  }
  catch (errorInfo: any) {
    console.log('Form Validate Failed:', errorInfo)
  }
}

function handleCancel() {
  visible.value = false
}

function removeValue(item: ToggleValueState) {
  const index = formData.value.values.indexOf(item)
  if (index !== -1) {
    formData.value.values.splice(index, 1)
  }
}

function addValue() {
  formData.value.values.push({
    titleData: '',
    valueData: '',
    descriptionData: '',
  })
}

defineExpose({
  open,
})
</script>

<template>
  <a-modal :open="visible" title="新建项目" width="980px" centered @ok="handleOk" @cancel="handleCancel">
    <a-space direction="vertical" size="large" class="w-full">
      <a-form ref="formRef" :model="formData" :rules="rules" v-bind="formItemLayout">
        <a-form-item label="名称" name="title">
          <a-input v-model:value="formData.title" />
        </a-form-item>
        <a-form-item label="唯一标识符" name="key">
          <a-input v-model:value="formData.key" />
        </a-form-item>
        <a-form-item label="描述" name="description">
          <a-textarea v-model:value="formData.description" show-count :maxlength="200" placeholder="请输入描述信息" />
        </a-form-item>
        <a-form-item label="返回值类型" name="valueType">
          <a-select v-model:value="formData.valueType" :options="valueTypes.map(v => ({ value: v }))" />
        </a-form-item>
        <a-form-item
          v-for="(item, index) in formData.values" :key="index" :label="index === 0 ? '返回值分组' : ''"
          :name="['values', index, 'valueData']" v-bind="index === 0 ? formItemLayout : formItemLayoutWithOutLabel"
        >
          <ToggleValue
            v-model="formData.values[index]" :show-delete="formData.values.length > 1"
            @delete-click="() => removeValue(item)"
          />
        </a-form-item>
        <a-form-item v-bind="formItemLayoutWithOutLabel">
          <a-button type="dashed" style="width: 60%" @click="addValue">
            <PlusOutlined />
            Add field
          </a-button>
        </a-form-item>
        <a-form-item label="禁用时返回" name="disabledValue">
          <a-select
            v-model:value="formData.disabledValue"
            :options="formData.values.map((v, index) => ({ value: index, label: v.titleData }))"
          />
        </a-form-item>
      </a-form>
    </a-space>
  </a-modal>
</template>
