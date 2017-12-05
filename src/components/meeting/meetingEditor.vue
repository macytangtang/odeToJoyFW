<template>
    <div>
        <h1 class="wrap-title mar-bottom15">会议列表 > 编辑会议</h1>
        <el-tabs v-model="activeName" type="border-card" v-if="nowMeeting != ''">
            <el-tab-pane label="基本信息" name="info">
                <meeting-info :nowMeeting="nowMeeting"></meeting-info>
            </el-tab-pane>
            <el-tab-pane label="会议议程" name="agenda">
                <meeting-agenda :nowMeeting="nowMeeting"></meeting-agenda>
            </el-tab-pane>
            <el-tab-pane label="会议文件" name="file">
                <meeting-file :nowMeeting="nowMeeting"></meeting-file>
            </el-tab-pane>
            <el-tab-pane label="会议表决" name="vote">
                <meeting-vote :nowMeeting="nowMeeting"></meeting-vote>
            </el-tab-pane>
            <el-tab-pane label="参会人" name="people">
                <meeting-people :nowMeeting="nowMeeting"></meeting-people>
            </el-tab-pane>
            <el-tab-pane label="签到情况" name="signIn">
                <meeting-signIn :nowMeeting="nowMeeting"></meeting-signIn>
            </el-tab-pane>
            <el-tab-pane label="投票结果" name="voteResult">
                <meeting-vote-result :nowMeeting="nowMeeting"></meeting-vote-result>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
// 会议列表 > 编辑会议
import meetingInfo from '@/components/meeting/props/nowMeeting/info.vue'
import meetingAgenda from '@/components/meeting/props/nowMeeting/agenda.vue'
import meetingFile from '@/components/meeting/props/nowMeeting/file.vue'
import meetingVote from '@/components/meeting/props/nowMeeting/vote.vue'
import meetingPeople from '@/components/meeting/props/nowMeeting/people.vue'
import meetingSignIn from '@/components/meeting/props/nowMeeting/signIn.vue'
import meetingVoteResult from '@/components/meeting/props/nowMeeting/voteResult.vue'
export default {
    data () {
        return {
            nowMeeting: '',
            activeName: 'info',
            moduleData: {
                list: []
            }
        }
    },
    created() {
        this.getMeetingList()
    },
    methods: {
        getMeetingList() {
            this.$api.apiCommunication('/Meeting/getMeetingList', {}, response => {
                if (response.status === 200) {
                    if(response.data !== []) {
                        this.moduleData.list = response.data.list
                    } else {
                        this.moduleData.list = []
                    }
                } else {
                    this.$alert(`获取数据失败，服务器返回信息：${response.data}`, '系统通知', { confirmButtonText: '确定', type: 'error' })
                }
            })
        },
        checkMeeting(val) {
            this.nowMeeting = val.row.conference_id
        },
        startMeeting(val) {

        }
    },
    components: {
        meetingInfo,
        meetingAgenda,
        meetingFile,
        meetingVote,
        meetingPeople,
        meetingSignIn,
        meetingVoteResult
    }
}
</script>
