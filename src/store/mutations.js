import * as types from '@/store/mutation-types'

const mutations = {
    [types.ASIDE_SWITCH] (state, param) {
        state.navCollapse = param
    },
    [types.USER_INFO_GET] (state, param) {
        console.log(param)
        // state.userName = param
    },
    [types.USER_INFO_SAVE] (state, param) {
        state.userInfo = param
    },
    [types.ADD_MEETING_NUM_SAVE_DEL] (state, param) {
        state.addMeetingNum = param
    }
}

export default mutations
