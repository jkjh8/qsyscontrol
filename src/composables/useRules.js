import { ref } from 'vue'
import { api } from 'boot/axios'

export const children = ref([])
export const required = (v) => !!v || '필수 입력 항목 입니다.'
export const chkEmail = (v) => /.+@.+\..+/.test(v) || '올바른 형식이 아닙니다'
export const chkLength = (v) => v.length >= 8 || '최소 8자 이상 입력하세요'
export const chkEmailUsed = async (v) => {
  const r = await api.get(`/auth/checkEmail?email=${v}`)
  if (r && r.data.status) {
    return '이미 사용중인 이메일 입니다.'
  }
  return true
}
export const chkIpaddr = (v) =>
  /^(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}$/gm.test(
    v
  ) || 'IPv4 형식이 아닙니다'

export const chkIpExists = async (v) => {
  const r = await api.get(`/device/ipexists?ipaddr=${v}`)
  if (r && r.data.result) {
    return '이미 사용중인 아이피 입니다.'
  }
  return true
}
export const chkInt = (v) => v > 0 || '0 보다 큰 숫자를 입력하세요'

export const chkDeviceIndex = async (v) => {
  const r = await api.get(`/device/exists?index=${v}`)
  if (r && r.data.result) {
    return '이미 사용중인 인덱스 입니다.'
  }
  return true
}

export const chkZoneIndex = async (v) => {
  const r = await api.get(`/zones/exists?index=${v}`)
  if (r && r.data.result) {
    return '이미 사용중인 인덱스 입니다.'
  }
  return true
}

export const chkZoneDebLocal = async (v) => {
  if (v === null) {
    return true
  }
  const dub = []
  for (let i = 0; i < children.value.length; i++) {
    if (children.value[i] === v) {
      dub.push(v)
    }
  }
  if (dub.length > 1) {
    return '방송구간 내 중복된 지역이 있습니다.'
  }
  return true
}

export const chkZoneDub = async (v) => {
  if (v === null) {
    return true
  }
  try {
    const r = await api.get(`/zones/existsChildren?id=${v}`)
    if (r && r.data.result.length) {
      return '방송구간 내 중복된 지역이 있습니다.'
    }
  } catch (err) {
    console.error(err)
    return '방송구간 확인중 문제가 발생하였습니다.'
  }
  return true
}
