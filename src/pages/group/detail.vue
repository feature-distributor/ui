<script lang="ts" setup>
import type { SelectProps } from 'ant-design-vue'
import { DeleteOutlined, DownCircleOutlined, PlusOutlined, UpCircleOutlined } from '@ant-design/icons-vue'
import OptionValue from './components/option-value.vue'
import type { ReqGroupResultModel } from '~@/api/group/get'
import { getReqGroup } from '~@/api/group/get'
import type { UpdateGroupOptionParams, UpdateReqGroupOptionParams } from '~@/api/group/update_option'
import { updateReqGroupOption } from '~@/api/group/update_option'

const messageApi = useMessage()
const route = useRoute()

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

const reqGroupId = shallowRef('')
const viewData = shallowRef<ReqGroupResultModel>()
const optionData = ref<OptionState[][]>([])

async function loadData() {
  try {
    const { data } = await getReqGroup(reqGroupId.value)
    viewData.value = data
    optionData.value = data?.options.map(item => item.map((it, index) => {
      return {
        label: index === 0 ? 'if' : 'and',
        attrType: it.attrType,
        attrName: it.attrName,
        operationType: it.operationType.slice(it.attrType.length + 1),
        attrValue: it.attrValue,
      }
    })) ?? []
  }
  catch (e) {
    console.log(e)
  }
}

function removeRule(index: number, i: number) {
  optionData.value[index].splice(i, 1)
  optionData.value[index].forEach((item, index) => {
    item.label = index === 0 ? 'if' : 'and'
  })
}

function addRuleGroup() {
  optionData.value.push([])
}

function upRuleGroup(index: number) {
  if (index === 0)
    return
  const temp = optionData.value[index]
  optionData.value[index] = optionData.value[index - 1]
  optionData.value[index - 1] = temp
}

function downRuleGroup(index: number) {
  if (index === optionData.value.length - 1)
    return
  const temp = optionData.value[index]
  optionData.value[index] = optionData.value[index + 1]
  optionData.value[index + 1] = temp
}

function deleteRuleGroup(index: number) {
  optionData.value.splice(index, 1)
}

function addRule(index: number, attrType: string) {
  optionData.value[index].push({
    label: optionData.value[index].length === 0 ? 'if' : 'and',
    attrType,
    attrName: '',
    operationType: '',
    attrValue: '',
  })
}

async function handleOk() {
  try {
    const options = []
    for (let index = 0; index < optionData.value.length; index++) {
      const element = optionData.value[index]
      for (const option of element) {
        options.push({
          index,
          attrType: option.attrType,
          attrName: option.attrName,
          operationType: `${option.attrType}_${option.operationType}`,
          attrValue: option.attrValue,
        } as UpdateGroupOptionParams)
      }
    }
    const groupId = reqGroupId.value
    const gId = +groupId
    const params = {
      groupId: gId,
      options,
    } as UpdateReqGroupOptionParams
    await updateReqGroupOption(params)
    messageApi.success('请求分组更新成功')
    await loadData()
  }
  catch (errorInfo: any) {
    console.log('Form Validate Failed:', errorInfo)
  }
}

onMounted(() => {
  reqGroupId.value = route.query.groupId as string
  loadData()
})
</script>

<template>
  <page-container>
    <a-card :bordered="false">
      <a-descriptions title="请求分组信息">
        <a-descriptions-item label="分组名称">
          {{ viewData?.title }}
        </a-descriptions-item>
        <a-descriptions-item label="标识">
          {{ viewData?.key }}
        </a-descriptions-item>
        <a-descriptions-item label="描述">
          {{ viewData?.description }}
        </a-descriptions-item>
      </a-descriptions>
      <a-divider style="margin-bottom: 32px" />
      <a-descriptions title="规则" :column="1">
        <a-descriptions-item v-for="(_, index) in optionData" :key="index">
          <a-card class="w-full">
            <a-form-item v-for="(__, i) in optionData[index]" :key="`${index}-${i}`" :span="24">
              <OptionValue v-model="optionData[index][i]" @delete-click="() => removeRule(index, i)" />
            </a-form-item>
            <a-row :guter="[8, 8]" justify="space-around" align="middle">
              <a-col :span="4">
                <a-select
                  value="添加" :options="attrTypes" class="w-full"
                  @change="(value) => addRule(index, value as string)"
                />
              </a-col>
              <a-col :span="17" />
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
        </a-descriptions-item>
        <a-descriptions-item>
          <a-button type="dashed" style="width: 100%" @click="addRuleGroup">
            <PlusOutlined />
            添加规则
          </a-button>
        </a-descriptions-item>
        <a-descriptions-item>
          <a-button type="primary" @click="handleOk">
            保存
          </a-button>
        </a-descriptions-item>
      </a-descriptions>
    </a-card>
  </page-container>
</template>

<style lang="less" scoped>
.title {
  color: rgba(0, 0, 0, 0.85);
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 16px;
}
</style>
