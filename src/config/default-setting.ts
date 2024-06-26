import type { LayoutSetting } from '~@/stores/app'

export default {
  'title': 'Feature Distributor',
  'theme': 'inverted',
  'logo': '/logo.svg',
  'collapsed': false,
  'drawerVisible': true,
  'colorPrimary': '#722ED1',
  'layout': 'side',
  'contentWidth': 'Fluid',
  'fixedHeader': false,
  'fixedSider': true,
  'splitMenus': false,
  'header': true,
  'menu': true,
  'watermark': false,
  'menuHeader': false,
  'footer': true,
  'colorWeak': false,
  'colorGray': false,
  'multiTab': false,
  'multiTabFixed': false,
  'keepAlive': true,
  'accordionMode': false,
  'leftCollapsed': false,
  'compactAlgorithm': false,
  'headerHeight': 48,
  'copyright': 'Antdv Pro Team 2023',
  'animationName': 'fadein',
} as LayoutSetting

export const animationNameList = [
  {
    label: 'None',
    value: 'none',
  },
  {
    label: 'Fadein Up',
    value: 'slide-fadein-up',
  },
  {
    label: 'Fadein Right',
    value: 'slide-fadein-right',
  },
  {
    label: 'Zoom Fadein',
    value: 'zoom-fadein',
  },
  {
    label: 'Fadein',
    value: 'fadein',
  },
]
export type AnimationNameValueType = 'none' | 'slide-fadein-up' | 'slide-fadein-right' | 'zoom-fadein' | 'fadein'
