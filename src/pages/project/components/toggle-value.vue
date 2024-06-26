<script lang="ts" setup>
import { MinusCircleOutlined } from '@ant-design/icons-vue'
import { Form } from 'ant-design-vue'

const props = defineProps<{
  showDelete: boolean
}>()
const emit = defineEmits(['deleteClick'])

interface State {
  titleData: string
  valueData: string
  descriptionData: string
}

const state = defineModel<State>({ required: true })

const formItemContext = Form.useInjectFormItemContext()

function onChange() {
  formItemContext?.onFieldChange()
}
</script>

<template>
  <a-row :gutter="[8, 8]" justify="space-around" align="middle">
    <a-col :span="2">
      <a-flex class="h-1/1" justify="center" align="center">
        <div class="icon" />
      </a-flex>
    </a-col>
    <a-col :span="6">
      <a-input v-model:value="state.titleData" placeholder="名称" @change="onChange" />
    </a-col>
    <a-form-item-rest>
      <a-col :span="6">
        <a-input v-model:value="state.valueData" placeholder="值" @change="onChange" />
      </a-col>
      <a-col :span="8">
        <a-input v-model:value="state.descriptionData" placeholder="描述" @change="onChange" />
      </a-col>
    </a-form-item-rest>
    <a-col :span="2">
      <MinusCircleOutlined
        v-if="props.showDelete" class="dynamic-delete-button" @click="() =>
          emit('deleteClick')"
      />
    </a-col>
  </a-row>
</template>

<style scoped>
.icon {
  background-color: aqua;
  width: 20px;
  height: 20px;
  border-radius: 5px;
}

.dynamic-delete-button {
  cursor: pointer;
  position: relative;
  top: 4px;
  font-size: 24px;
  color: #999;
  transition: all 0.3s;
}

.dynamic-delete-button:hover {
  color: #777;
}

.dynamic-delete-button[disabled] {
  cursor: not-allowed;
  opacity: 0.5;
}
</style>
