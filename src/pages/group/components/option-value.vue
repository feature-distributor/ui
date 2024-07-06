<script lang="ts" setup>
import { MinusSquareOutlined } from '@ant-design/icons-vue'
import { Form } from 'ant-design-vue'

const emit = defineEmits(['deleteClick'])

interface State {
  label: string
  attrType: string
  attrName: string
  operationType: string
  attrValue: string
}

interface LabelValue {
  label: string
  value: string
}

const attrTypeLabelMap = new Map<string, string>([
  ['STRING', '字符串'],
  ['NUMBER', '数字'],
  ['TIME', '时间'],
])
const attrValueBindMap = new Map<string, any>([
  ['STRING', {
    type: 'text',
    placeholder: '输入匹配值',
  }],
  ['NUMBER', {
    type: 'number',
    placeholder: '输入匹配值',
  }],
  ['TIME', {
    type: 'text',
    placeholder: '输入匹配值',
  }],
])
const operationTypeMap = new Map<string, LabelValue[]>([
  ['STRING', [
    {
      label: '在列表中',
      value: 'IN',
    },
    {
      label: '不在列表中',
      value: 'OUT',
    },
    {
      label: '包含前缀',
      value: 'START',
    },
    {
      label: '不包含前缀',
      value: 'NOT_START',
    },
    {
      label: '包含后缀',
      value: 'END',
    },
    {
      label: '不包含后缀',
      value: 'NOT_END',
    },
    {
      label: '包含',
      value: 'CONTAIN',
    },
    {
      label: '不包含',
      value: 'NOT_CONTAIN',
    },
    {
      label: '匹配正则',
      value: 'REGEX',
    },
    {
      label: '不匹配正则',
      value: 'NOT_REGEX',
    },
  ]],
  ['NUMBER', [
    {
      label: '等于',
      value: 'EQ',
    },
    {
      label: '不等于',
      value: 'NOT_EQ',
    },
    {
      label: '大于',
      value: 'GT',
    },
    {
      label: '大于等于',
      value: 'GTE',
    },
    {
      label: '小于',
      value: 'LT',
    },
    {
      label: '小于等于',
      value: 'LTE',
    },
    {
      label: '在区间中',
      value: 'BETWEEN',
    },
  ]],
  ['TIME', [
    {
      label: '早于',
      value: 'BEFORE',
    },
    {
      label: '晚于',
      value: 'AFTER',
    },
  ]],
])

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
        <span :class="state.label === 'if' ? 'label-icon-first' : 'label-icon'" align="center">
          {{ state.label }}
        </span>
      </a-flex>
    </a-col>
    <a-col :span="2">
      <span>{{ attrTypeLabelMap.get(state.attrType) }}</span>
    </a-col>
    <a-col :span="5">
      <a-input v-model:value="state.attrName" placeholder="输入属性名" @change="onChange" />
    </a-col>
    <a-form-item-rest>
      <a-col :span="4">
        <a-select
          v-model:value="state.operationType" :options="operationTypeMap.get(state.attrType)"
          placeholder="选择匹配规则"
        />
      </a-col>
      <a-col :span="10">
        <a-input v-model:value="state.attrValue" v-bind="attrValueBindMap.get(state.attrType)" @change="onChange" />
      </a-col>
    </a-form-item-rest>
    <a-col :span="1">
      <MinusSquareOutlined
        class="dynamic-delete-button" @click="() =>
          emit('deleteClick')"
      />
    </a-col>
  </a-row>
</template>

<style scoped>
.label-icon-first {
  background-color: var(--pro-ant-color-info);
  width: 36px;
  height: 36px;
  border-radius: 20px;
  line-height: 36px;
}

.label-icon {
  background-color: var(--pro-ant-color-success);
  width: 36px;
  height: 36px;
  border-radius: 20px;
  line-height: 36px;
}

.dynamic-delete-button {
  cursor: pointer;
  position: relative;
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
