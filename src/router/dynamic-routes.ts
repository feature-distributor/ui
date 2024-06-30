import type { RouteRecordRaw } from 'vue-router'
import { basicRouteMap } from './router-modules'
import { AccessEnum } from '~@/utils/constant'

export default [
  {
    path: '/dashboard',
    redirect: '/dashboard/analysis',
    name: 'Dashboard',
    meta: {
      title: '仪表盘',
      icon: 'DashboardOutlined',
    },
    component: basicRouteMap.RouteView,
    children: [
      {
        path: '/dashboard/analysis',
        name: 'DashboardAnalysis',
        component: () => import('~/pages/dashboard/analysis/index.vue'),
        meta: {
          title: '分析页',
        },
      },
      {
        path: '/dashboard/monitor',
        name: 'DashboardMonitor',
        component: () => import('~/pages/dashboard/monitor/index.vue'),
        meta: {
          title: '监控页',
        },
      },
      {
        path: '/dashboard/workplace',
        name: 'DashboardWorkplace',
        component: () => import('~/pages/dashboard/workplace/index.vue'),
        meta: {
          title: '监控页',
        },
      },
    ],
  },
  {
    path: '/project',
    redirect: '/project/list',
    name: 'Project',
    meta: {
      title: '项目',
      icon: 'ProjectOutlined',
    },
    component: basicRouteMap.RouteView,
    children: [
      {
        path: '/project/list',
        name: 'ProjectList',
        component: () => import('~/pages/project/list.vue'),
        meta: {
          title: '项目列表',
        },
      },
      {
        path: '/project/detail',
        name: 'ProjectDetail',
        component: () => import('~/pages/project/detail.vue'),
        meta: {
          title: '项目详情',
          hideInMenu: true,
          parentKeys: ['/project/list'],
        },
      },
    ],
  },
  {
    path: '/group',
    redirect: '/group/list',
    name: 'Group',
    meta: {
      title: '请求分组',
      icon: 'ClusterOutlined',
    },
    component: basicRouteMap.RouteView,
    children: [
      {
        path: '/group/list',
        name: 'GroupList',
        component: () => import('~/pages/group/list.vue'),
        meta: {
          title: '分组列表',
        },
      },
    ],
  },
  {
    path: '/form',
    redirect: '/form/basic-form',
    name: 'Form',
    meta: {
      title: '表单页',
      icon: 'FormOutlined',
    },
    component: basicRouteMap.RouteView,
    children: [
      {
        path: '/form/basic-form',
        name: 'FormBasic',
        component: () => import('~/pages/form/basic-form/index.vue'),
        meta: {
          title: '基础表单',
          locale: 'menu.form.basic-form',
        },
      },
      {
        path: '/form/step-form',
        name: 'FormStep',
        component: () => import('~/pages/form/step-form/index.vue'),
        meta: {
          title: '分步表单',
          locale: 'menu.form.step-form',
        },
      },
      {
        path: '/form/advanced-form',
        name: 'FormAdvanced',
        component: () => import('~/pages/form/advanced-form/index.vue'),
        meta: {
          title: '高级表单',
          locale: 'menu.form.advanced-form',
        },
      },
    ],
  },
  {
    path: '/profile',
    name: 'profile',
    redirect: '/profile/basic',
    meta: {
      title: 'menu.profile',
      icon: 'ProfileOutlined',
      locale: 'menu.profile',
    },
    component: basicRouteMap.RouteView,
    children: [
      {
        path: '/profile/basic',
        name: 'ProfileBasic',
        component: () => import('~/pages/profile/basic/index.vue'),
        meta: {
          title: 'menu.profile.basic',
          locale: 'menu.profile.basic',
        },
      },
    ],
  },
  {
    path: '/access',
    redirect: '/access/common',
    name: 'Access',
    meta: {
      title: '权限模块',
      icon: 'ClusterOutlined',
    },
    children: [
      {
        path: '/access/common',
        name: 'AccessCommon',
        component: () => import('~/pages/access/common.vue'),
        meta: {
          title: '通用权限',
        },
      },
      {
        path: '/access/user',
        name: 'AccessUser',
        component: () => import('~/pages/access/user.vue'),
        meta: {
          title: '普通用户',
          access: [AccessEnum.USER, AccessEnum.ADMIN],
        },
      },
      {
        path: '/access/admin',
        name: 'AccessAdmin',
        component: () => import('~/pages/access/admin.vue'),
        meta: {
          title: '管理员',
          access: [AccessEnum.ADMIN],
        },
      },
    ],
  },
  // 结果页
  {
    path: '/result',
    redirect: '/result/success',
    name: 'Result',
    meta: {
      title: '结果页',
      icon: 'CheckCircleOutlined',
      locale: 'menu.result',
    },
    component: basicRouteMap.RouteView,
    children: [
      {
        path: '/result/success',
        name: 'ResultSuccess',
        component: () => import('~/pages/result/success.vue'),
        meta: {
          title: '成功页',
          locale: 'menu.result.success',
        },
      },
      {
        path: '/result/fail',
        name: 'ResultFail',
        component: () => import('~/pages/result/fail.vue'),
        meta: {
          title: '失败页',
          locale: 'menu.result.fail',
        },
      },
    ],
  },
  {
    path: '/list',
    redirect: '/list/card-list',
    name: 'List',
    meta: {
      title: '列表页',
      icon: 'TableOutlined',
      locale: 'menu.list',
    },
    component: basicRouteMap.RouteView,
    children: [
      {
        path: '/list/card-list',
        name: 'CardList',
        component: () => import('~/pages/list/card-list.vue'),
        meta: {
          title: '卡片列表',
          locale: 'menu.list.card-list',
        },
      },
      {
        path: '/list/table-list',
        name: 'ConsultTable',
        component: () => import('~/pages/list/table-list.vue'),
        meta: {
          title: '查询表格',
          locale: 'menu.list.consult-table',
        },
      },
      {
        path: '/list/crud-table',
        name: 'CrudTable',
        component: () => import('~/pages/list/crud-table.vue'),
        meta: {
          title: '增删改查表格',
          locale: 'menu.list.crud-table',
        },
      },
      {
        path: '/list/basic-list',
        name: 'BasicList',
        component: () => import('~/pages/list/basic-list.vue'),
        meta: {
          title: '标准列表',
          locale: 'menu.list.basic-list',
        },
      },
      {
        path: '/list/search-list',
        name: 'SearchList',
        component: () => import('~/pages/list/search-list/index.vue'),
        meta: {
          title: '搜索列表',
          locale: 'menu.list.search-list',
        },
        redirect: '/list/search-list/articles',
        children: [
          {
            path: '/list/search-list/articles',
            name: 'SearchListArticles',
            component: () => import('~/pages/list/search-list/articles.vue'),
            meta: {
              title: '搜索列表（文章）',
              locale: 'menu.list.search-list.articles',
            },
          },
          {
            path: '/list/search-list/projects',
            name: 'SearchListProjects',
            component: () => import('~/pages/list/search-list/projects.vue'),
            meta: {
              title: '搜索列表（项目）',
              locale: 'menu.list.search-list.projects',
            },
          },
          {
            path: '/list/search-list/applications',
            name: 'SearchListApplications',
            component: () => import('~/pages/list/search-list/applications.vue'),
            meta: {
              title: '搜索列表（应用）',
              locale: 'menu.list.search-list.applications',
            },
          },
        ],
      },
    ],
  },
  {
    path: '/account',
    redirect: '/account/center',
    name: 'Account',
    meta: {
      title: '个人页',
      icon: 'UserOutlined',
      locale: 'menu.account',
    },
    component: basicRouteMap.RouteView,
    children: [
      {
        path: '/account/center',
        name: 'AccountCenter',
        component: () => import('~/pages/account/center.vue'),
        meta: {
          title: '个人主页',
          locale: 'menu.account.center',
        },
      },
      {
        path: '/account/settings',
        name: 'AccountSettings',
        component: () => import('~/pages/account/settings.vue'),
        meta: {
          title: '个人设置',
          locale: 'menu.account.settings',
        },
      },
      {
        path: '/account/settings/:id',
        name: 'AccountSettings1',
        component: () => import('~/pages/account/settings.vue'),
        meta: {
          title: '个人设置1',
          locale: 'menu.account.settings',
          hideInMenu: true,
          parentKeys: ['/account/settings'],
        },
      },
    ],
  },
] as RouteRecordRaw[]
