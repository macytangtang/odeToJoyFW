import * as types from '@/store/mutation-types'

const mutations = {
    [types.ASIDE_SWITCH] (state, param) {
        state.navCollapse = param
    }
}

export default mutations
