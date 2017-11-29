// import api from '@/api'
import * as types from '@/store/mutation-types'
// import cookie from 'react-cookie'

/* 切换loading状态 */
export const switchAside = ({ commit }, param) => {
    commit(types.ASIDE_SWITCH, param)
}
