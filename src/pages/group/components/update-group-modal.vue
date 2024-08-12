<script setup lang="ts">
import type { Rule } from 'ant-design-vue/es/form'
import { ref } from 'vue'
import type { FormInstance } from 'ant-design-vue'
import type { UpdateReqGroupParams } from '~@/api/group/update'
import { updateReqGroup } from '~@/api/group/update'

const emit = defineEmits(['ok'])

interface UpdateReqGroupState {
  groupId: string
  title: string
  key: string
  description: string
}

const visible = ref(false)
const formRef = ref<FormInstance>()
const formData = ref<UpdateReqGroupState>({
  groupId: '',
  title: '',
  key: '',
  description: '',
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

function open(data: UpdateReqGroupState) {
  visible.value = true
  formData.value = data
}

async function handleOk() {
  try {
    await formRef.value?.validate()

    const params = {
      groupId: formData.value.groupId,
      title: formData.value.title,
      description: formData.value.description,
    } as UpdateReqGroupParams
    await updateReqGroup(params)

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

defineExpose({
  open,
})
</script>

<template>
  <a-modal :open="visible" title="编辑请求分组" width="980px" centered @ok="handleOk" @cancel="handleCancel">
    <a-space direction="vertical" size="large" class="w-full">
      <a-form ref="formRef" :model="formData" :rules="rules" v-bind="formItemLayout">
        <a-form-item label="名称" name="title">
          <a-input v-model:value="formData.title" />
        </a-form-item>
        <a-form-item label="唯一标识符" name="key">
          <a-input v-model:value="formData.key" disabled/>
        </a-form-item>
        <a-form-item label="描述" name="description">
          <a-textarea v-model:value="formData.description" show-count :maxlength="200" placeholder="请输入描述信息" />
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
