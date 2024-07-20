<script setup lang="ts">
import type { Rule } from 'ant-design-vue/es/form'
import { ref } from 'vue'
import type { FormInstance, SelectProps } from 'ant-design-vue'
import { DeleteOutlined, DownCircleOutlined, UpCircleOutlined } from '@ant-design/icons-vue'
import OptionValue from './option-value.vue'
import type { CreateGroupOptionParams, CreateReqGroupParams } from '~@/api/group/create'
import { createReqGroup } from '~@/api/group/create'

const emit = defineEmits(['ok'])

interface CreateReqGroupState {
  title: string
  key: string
  description: string
  options: OptionState[][]
}

interface OptionState {
  label: string
  attrType: string
  attrName: string
  operationType: string
  attrValue: string
}

const attrTypes = ref<SelectProps['options']>([
  { label: '字符串', value: 'STRING' },
  { label: '数字', value: 'NUMBER' },
  { label: '时间', value: 'TIME' },
])

const visible = ref(false)
const formRef = ref<FormInstance>()
const formData = ref<CreateReqGroupState>({
  title: '',
  key: '',
  description: '',
  options: [],
})
const rules: Record<string, Rule[]> = {
  title: [{ required: true, message: '名称不能为空' }],
  key: [
    { required: true, message: '唯一标识符不能为空' },
    { pattern: /^[\w\-.]+$/, message: '只能包含字母、数字、下划线、中划线、点' },
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

function open() {
  visible.value = true
  formData.value = {
    title: '',
    key: '',
    description: '',
    options: [],
  }
}

async function handleOk() {
  try {
    await formRef.value?.validate()

    const options = []
    for (let index = 0; index < formData.value.options.length; index++) {
      const element = formData.value.options[index]
      for (const option of element) {
        options.push({
          index,
          attrType: option.attrType,
          attrName: option.attrName,
          operationType: `${option.attrType}_${option.operationType}`,
          attrValue: option.attrValue,
        } as CreateGroupOptionParams)
      }
    }
    const params = {
      title: formData.value.title,
      key: formData.value.key,
      description: formData.value.description,
      options,
    } as CreateReqGroupParams
    await createReqGroup(params)

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

function removeRule(index: number, i: number) {
  formData.value.options[index].splice(i, 1)
  formData.value.options[index].forEach((item, index) => {
    item.label = index === 0 ? 'if' : 'and'
  })
}

function addRuleGroup() {
  formData.value.options.push([])
}

function upRuleGroup(index: number) {
  if (index === 0)
    return
  const temp = formData.value.options[index]
  formData.value.options[index] = formData.value.options[index - 1]
  formData.value.options[index - 1] = temp
}

function downRuleGroup(index: number) {
  if (index === formData.value.options.length - 1)
    return
  const temp = formData.value.options[index]
  formData.value.options[index] = formData.value.options[index + 1]
  formData.value.options[index + 1] = temp
}

function deleteRuleGroup(index: number) {
  formData.value.options.splice(index, 1)
}

function addRule(index: number, attrType: string) {
  formData.value.options[index].push({
    label: formData.value.options[index].length === 0 ? 'if' : 'and',
    attrType,
    attrName: '',
    operationType: '',
    attrValue: '',
  })
}

defineExpose({
  open,
})
</script>

<template>
  <a-modal :open="visible" title="新建请求分组" width="980px" centered @ok="handleOk" @cancel="handleCancel">
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
        <a-form-item
          v-for="(_, index) in formData.options" :key="index" :label="index === 0 ? '规则' : ''"
          v-bind="index === 0 ? formItemLayout : formItemLayoutWithOutLabel"
        >
          <a-card v-bind="formItemLayoutWithOutLabel">
            <a-form-item v-for="(__, i) in formData.options[index]" :key="`${index}-${i}`" :span="24">
              <OptionValue v-model="formData.options[index][i]" @delete-click="() => removeRule(index, i)" />
            </a-form-item>
            <a-row :guter="[8, 8]" justify="space-around" align="middle">
              <a-col :span="21">
                <a-select value="添加" :options="attrTypes" @change="(value) => addRule(index, value as string)" />
              </a-col>
              <a-col :span="1" align="center">
                <UpCircleOutlined class="dynamic-button" @click="() => upRuleGroup(index)" />
              </a-col>
              <a-col :span="1" align="center">
                <DownCircleOutlined class="dynamic-button" @click="() => downRuleGroup(index)" />
              </a-col>
              <a-col :span="1" align="center">
                <DeleteOutlined class="dynamic-button" @click="() => deleteRuleGroup(index)" />
              </a-col>
            </a-row>
          </a-card>
        </a-form-item>
        <a-form-item v-bind="formItemLayoutWithOutLabel">
          <a-button type="dashed" style="width: 100%" @click="addRuleGroup">
            <PlusOutlined />
            添加规则
          </a-button>
        </a-form-item>
      </a-form>
    </a-space>
  </a-modal>
</template>

<style scoped>
.dynamic-button {
  cursor: pointer;
  position: relative;
  font-size: 18px;
  transition: all 0.3s;
}
</style>
