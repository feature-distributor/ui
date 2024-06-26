<script lang="ts" setup>
import { CheckCircleOutlined, ClockCircleOutlined, PlusOutlined } from '@ant-design/icons-vue'
import type { PaginationProps } from 'ant-design-vue'
import CreateToggleModal from './components/create-toggle-modal.vue'
import type { ToggleListResultModel, TogglePageParams } from '~@/api/toggle/list'
import { getListApi } from '~@/api/toggle/list'

const messageApi = useMessage()
const route = useRoute()

const columns = shallowRef([
  {
    title: '开关名称',
    dataIndex: 'name',
    width: '25%',
  },
  {
    title: '启用状态',
    dataIndex: 'enabled',
    width: '10%',
  },
  {
    title: '类型',
    dataIndex: 'type',
    width: '10%',
  },
  {
    title: '描述信息',
    dataIndex: 'description',
    width: '30%',
  },
  {
    title: '操作',
    dataIndex: 'action',
    width: '15%',
  },
])

const loading = shallowRef(false)
const dataSource = shallowRef<ToggleListResultModel[]>([])
const projectId = shallowRef('')
const createToggleModal = ref<InstanceType<typeof CreateToggleModal>>()

const pagination = reactive<PaginationProps>({
  pageSize: 10,
  pageSizeOptions: ['10', '20', '30', '40'],
  current: 1,
  total: 0,
  showSizeChanger: true,
  showQuickJumper: true,
  showTotal: total => `总数据位：${total}`,
  onChange(current, pageSize) {
    pagination.pageSize = pageSize
    pagination.current = current
    loadData()
  },
})

async function loadData() {
  if (loading.value)
    return
  loading.value = true
  try {
    const params = {
      projectId: projectId.value,
      index: pagination.current,
      size: pagination.pageSize,
    } as TogglePageParams
    const { data } = await getListApi(params)
    pagination.total = data?.total
    dataSource.value = data?.list ?? []
  }
  catch (e) {
    console.log(e)
  }
  finally {
    loading.value = false
  }
}

async function onSearch() {
  pagination.current = 1
  await loadData()
}

function showCreateModal() {
  createToggleModal.value?.open(projectId.value)
}

async function onCreateToggleOk() {
  messageApi.success('开关创建成功')
  await loadData()
}

onMounted(() => {
  projectId.value = route.params.projectId as string
  loadData()
})
</script>

<template>
  <page-container>
    <a-card mb-4>
      <a-form :label-col="{ span: 7 }">
        <a-row :span="24" style="text-align: right">
          <a-col :span="24">
            <a-space flex justify-end w-full>
              <a-button :loading="loading" type="primary" @click="onSearch">
                查询
              </a-button>
              <a-button :loading="loading">
                重置
              </a-button>
            </a-space>
          </a-col>
        </a-row>
      </a-form>
    </a-card>

    <a-card title="查询表格">
      <template #extra>
        <a-space size="middle">
          <a-button type="primary" @click="showCreateModal">
            <template #icon>
              <PlusOutlined />
            </template>
            新增
          </a-button>
        </a-space>
      </template>
      <a-table :loading="loading" :columns="columns" :data-source="dataSource" :pagination="pagination">
        <template #bodyCell="{ column, record }">
          <template v-if="column?.dataIndex === 'name'">
            {{ record.title }}
          </template>
          <template v-if="column?.dataIndex === 'enabled'">
            <a-tag :color="record.enabled ? 'green' : 'red'">
              <template #icon>
                <CheckCircleOutlined v-if="record.enabled" />
                <ClockCircleOutlined v-if="!record.enabled" />
              </template>
              {{ record.enabled ? '启用' : '禁用' }}
            </a-tag>
          </template>
          <template v-if="column?.dataIndex === 'type'">
            <a-tag>
              {{ record.valueType }}
            </a-tag>
          </template>
          <template v-if="column?.dataIndex === 'description'">
            <a-tooltip placement="top" :title="record.description" arrow-point-at-center>
              <a-typography-paragraph :ellipsis="{ rows: 2 }" :content="record.description" />
            </a-tooltip>
          </template>
          <template v-if="column?.dataIndex === 'action'">
            <div flex gap-2>
              <a c-error>
                删除
              </a>
            </div>
          </template>
        </template>
      </a-table>
    </a-card>

    <CreateToggleModal ref="createToggleModal" @ok="onCreateToggleOk" />
  </page-container>
</template>
