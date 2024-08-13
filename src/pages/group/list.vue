<script lang="ts" setup>
import { Modal } from 'ant-design-vue'
import { ExclamationCircleOutlined, PlusOutlined } from '@ant-design/icons-vue'
import { createVNode } from 'vue'
import type { PaginationProps } from 'ant-design-vue'
import CreateGroupModal from './components/create-group-modal.vue'
import UpdateGroupModal from './components/update-group-modal.vue'
import type { GroupListResultModel, GroupListTableParams, GroupPageParams } from '~@/api/group/list'
import { getListApi } from '~@/api/group/list'
import { deleteReqGroup } from '~@/api/group/delete'

const messageApi = useMessage()
const router = useRouter()

const columns = shallowRef([
  {
    title: '分组名称',
    dataIndex: 'title',
    width: '20%',
  },
  {
    title: '标识',
    dataIndex: 'key',
    width: '20%',
  },
  {
    title: '描述信息',
    dataIndex: 'description',
    width: '50%',
  },
  {
    title: '操作',
    dataIndex: 'action',
    width: '10%',
  },
])

const loading = shallowRef(false)
const dataSource = shallowRef<GroupListResultModel[]>([])
const formModel = reactive<GroupListTableParams>({
  key: '',
  keywords: '',
})
const createGroupModal = ref<InstanceType<typeof CreateGroupModal>>()
const updateGroupModal = ref<InstanceType<typeof UpdateGroupModal>>()

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
      index: pagination.current,
      size: pagination.pageSize,
    } as GroupPageParams
    const { data } = await getListApi(params, formModel)
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

async function onReset() {
  // 清空所有参数重新请求
  formModel.key = ''
  formModel.keywords = ''
  await loadData()
}

function showCreateModal() {
  createGroupModal.value?.open()
}

function showUpdateModal(model: GroupListResultModel) {
  updateGroupModal.value?.open({
    groupId: model.groupId,
    title: model.title,
    key: model.key,
    description: model.description,
  })
}

function showDeleteConfirm(groupId: string) {
  Modal.confirm({
    title: '删除开关',
    icon: createVNode(ExclamationCircleOutlined),
    content: createVNode('div', {}, '确定要删除该请求分组吗?'),
    cancelText: '取消',
    okText: '确认',
    async onOk() {
      await deleteReqGroup(groupId)
      messageApi.success('请求分组删除成功')
      loadData()
    },
    class: 'test',
  })
}

async function onCreateReqGroupOk() {
  messageApi.success('请求分组创建成功')
  await loadData()
}

async function onUpdateReqGroupOk() {
  messageApi.success('请求分组更新成功')
  await loadData()
}

onMounted(() => {
  loadData()
})
</script>

<template>
  <page-container>
    <a-card mb-4>
      <a-form :label-col="{ span: 7 }" :model="formModel">
        <a-row :gutter="[15, 0]">
          <a-col :span="8">
            <a-form-item name="desc" label="标识">
              <a-input v-model:value="formModel.key" />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item name="name" label="分组名称">
              <a-input v-model:value="formModel.keywords" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :span="24" style="text-align: right">
          <a-col :span="24">
            <a-space flex justify-end w-full>
              <a-button :loading="loading" type="primary" @click="onSearch">
                查询
              </a-button>
              <a-button :loading="loading" @click="onReset">
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
          <template v-if="column?.dataIndex === 'title'">
            <a @click="router.push({ path: '/group/detail', query: { groupId: record.groupId } })">{{
              record.title }}</a>
          </template>
          <template v-if="column?.dataIndex === 'key'">
            <a-tag>{{ record.key }}</a-tag>
          </template>
          <template v-if="column?.dataIndex === 'description'">
            <a-tooltip placement="top" :title="record.description" arrow-point-at-center>
              <a-typography-paragraph :ellipsis="{ rows: 2 }" :content="record.description" />
            </a-tooltip>
          </template>
          <template v-if="column?.dataIndex === 'action'">
            <div flex gap-2>
              <a-button
                type="text" @click="() => showUpdateModal({
                  groupId: record.groupId,
                  title: record.title,
                  key: record.key,
                  description: record.description,
                }) "
              >
                编
                辑
              </a-button>
              <a-button type="text" c-error @click="() => showDeleteConfirm(record.groupId)">
                删除
              </a-button>
            </div>
          </template>
        </template>
      </a-table>
    </a-card>

    <CreateGroupModal ref="createGroupModal" @ok="onCreateReqGroupOk" />
    <UpdateGroupModal ref="updateGroupModal" @ok="onUpdateReqGroupOk" />
  </page-container>
</template>
