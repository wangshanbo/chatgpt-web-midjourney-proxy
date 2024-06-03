import { ss } from '@/utils/storage'
import { t } from '@/locales'
const LOCAL_NAME = 'userStorage'

export interface UserInfo {
  avatar: string
  name: string
  description: string
}

export interface UserState {
  userInfo: UserInfo
}

export function defaultSetting(): UserState {
  return {
    userInfo: {
      avatar: 'https://previews.dropbox.com/p/thumb/ACTtOl1Os6fvr7NBpWhfbbuHd45l7etYT1p3YjF0Vnudsy40yh8KCYE1dB-4gxCPEdO2BGBX80arXoL1tRpF4i8YhG7692Nw5o1RuzbjLEDlrsnSkQP5RIO6VR7NXuBVIOtzQanPLvaILKd-pjuFjOCArtmjEaJh8GqnnLZFhkjqzs9E4uhK2fLV-KZEuRDaecHqdJg7OphmutX8d1CDt87H7ehzECLr_WErzl_CqckVBihXRubDNeGnWqyt1z30XlouTujCwOEberPtZU0o0n1ue1x0ZsbQVGnru7LytOI-SbNZAghMCxnKwQ6LysAOYR50pFyH9w_GVAequczotaQO/p.jpeg',
      name:  t('mjset.sysname'),//'AI绘图',
      description: 'Star on <a href="https://github.com/wangshanbo/chatgpt-web-midjourney-proxy" class="text-blue-500" target="_blank" >GitHub</a>',
    },
  }
}

export function getLocalState(): UserState {
  const localSetting: UserState | undefined = ss.get(LOCAL_NAME)
  return { ...defaultSetting(), ...localSetting }
}

export function setLocalState(setting: UserState): void {
  ss.set(LOCAL_NAME, setting)
}
