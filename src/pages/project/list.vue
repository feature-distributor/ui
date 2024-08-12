<script setup lang="ts">
import { Modal } from 'ant-design-vue'
import { DeleteOutlined, EditOutlined, ExclamationCircleOutlined } from '@ant-design/icons-vue'
import { createVNode } from 'vue'
import type { Rule } from 'ant-design-vue/es/form'
import type { FormInstance } from 'ant-design-vue'
import { getListApi } from '~@/api/project/list'
import type { SaveProjectParams } from '~@/api/project/save'
import { saveProject } from '~@/api/project/save'
import { deleteProject } from '~@/api/project/delete'

interface ProjectState {
  id: string | null
  name: string
  key: string
  editMode: boolean
}

const messageApi = useMessage()
const router = useRouter()

const createModal = ref(false)
const tooltipText = ref('点击复制')
const dataSource = ref<any[]>([])
const labelCol = { span: 5 }
const wrapperCol = { span: 13 }
const formRef = ref<FormInstance>()
const projectState = ref<ProjectState>({
  id: null,
  name: '',
  key: '',
  editMode: false,
})
const rules: Record<string, Rule[]> = {
  name: [
    { required: true, message: '项目名称不能为空' },
  ],
  key: [
    { required: true, message: '项目唯一标识符不能为空' },
    { pattern: /^[\w\-.]+$/, message: '只能包含字母、数字、下划线、中划线、点' },
  ],
}
async function onSubmit() {
  try {
    await formRef.value?.validate()

    const params = {
      id: projectState.value.id,
      name: projectState.value.name,
      key: projectState.value.key,
    } as SaveProjectParams
    await saveProject(params)
    messageApi.success('项目创建成功')
    createModal.value = false
    loadData()
  }
  catch (errorInfo: any) {
    console.log('Form Validate Failed:', errorInfo)
  }
}

function doCopy(message: string) {
  navigator.clipboard.writeText(message)
  tooltipText.value = '复制成功'
}

function resetTooltip() {
  tooltipText.value = '点击复制'
}

async function loadData() {
  const data = await getListApi()
  dataSource.value = data.data!
  dataSource.value.unshift({ add: true }) // 添加一个空数据，用于新增
}

function showCreateModal() {
  projectState.value.id = null
  projectState.value.name = ''
  projectState.value.key = ''
  projectState.value.editMode = false
  createModal.value = true
}

function showEditModal(item: any) {
  projectState.value.id = item.id
  projectState.value.name = item.name
  projectState.value.key = item.key
  projectState.value.editMode = true
  createModal.value = true
}

function showDeleteConfirm(projectId: string) {
  Modal.confirm({
    title: '删除项目',
    icon: createVNode(ExclamationCircleOutlined),
    content: createVNode('div', {}, '确定要删除该项目吗?'),
    cancelText: '取消',
    okText: '确认',
    async onOk() {
      await deleteProject(projectId)
      messageApi.success('项目删除成功')
      loadData()
    },
    class: 'test',
  })
}

onMounted(() => {
  loadData()
})
</script>

<template>
  <page-container>
    <div class="mt-2">
      <a-list :data-source="dataSource" :grid="{ gutter: 16, xs: 1, sm: 2, md: 4, lg: 4, xl: 4, xxl: 4 }" class="mt-4">
        <template #renderItem="{ item }">
          <a-list-item style="padding: 0">
            <a-button v-if="item.add" class="w-1/1 h-243px" type="dashed" @click="showCreateModal">
              +新增项目
            </a-button>
            <a-card
              v-if="!item.add" class="w-1/1 h-243px" :title="item.name" hoverable
              @click="router.push({ path: '/project/detail', query: { projectId: item.id } })"
            >
              <div>
                <span>服务端密钥</span>
                <a-tooltip placement="top" :title="tooltipText" arrow-point-at-center>
                  <a-tag class="overflow" @click.stop="doCopy(item.serverKey)" @mouseout="resetTooltip">
                    <a-typography-text ellipsis>
                      {{ item.serverKey }}
                    </a-typography-text>
                  </a-tag>
                </a-tooltip>
              </div>
              <div>
                <span>客户端密钥</span>
                <a-tooltip placement="top" :title="tooltipText" arrow-point-at-center>
                  <a-tag class="overflow" @click.stop="doCopy(item.serverKey)" @mouseout="resetTooltip">
                    <a-typography-text ellipsis>
                      {{ item.clientKey }}
                    </a-typography-text>
                  </a-tag>
                </a-tooltip>
              </div>
              <template #actions>
                <EditOutlined @click.stop="() => showEditModal(item)" />
                <DeleteOutlined @click.stop="() => showDeleteConfirm(item.id)" />
              </template>
            </a-card>
          </a-list-item>
        </template>
      </a-list>
    </div>

    <a-modal :open="createModal" title="新建项目" width="720px" centered @ok="onSubmit" @cancel="() => createModal = false">
      <a-space direction="vertical" size="large" class="w-full">
        <a-form
          ref="formRef" :model="projectState" class="w-full" :rules="rules" :label-col="labelCol"
          :wrapper-col="wrapperCol"
        >
          <a-form-item label="项目名称" name="name">
            <a-input v-model:value="projectState.name" />
          </a-form-item>
          <a-form-item label="项目唯一标识符" name="key">
            <a-input v-model:value="projectState.key" :disabled="projectState.editMode" />
          </a-form-item>
        </a-form>
      </a-space>
    </a-modal>
  </page-container>
</template>

<style scoped>
.overflow {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
}
</style>
