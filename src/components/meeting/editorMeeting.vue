<template>
    <div>
        <h1 class="wrap-title mar-bottom15">会议列表 > 查看会议</h1>
        <el-tabs :value="activeName" type="border-card">
            <el-tab-pane label="基本信息" name="info">
                <meeting-info :meetingId="id"></meeting-info>
            </el-tab-pane>
            <el-tab-pane label="会议议程" name="agenda">
                <meeting-agenda :meetingId="id"></meeting-agenda>
            </el-tab-pane>
            <el-tab-pane label="会议文件" name="file">
                <meeting-file :meetingId="id"></meeting-file>
            </el-tab-pane>
            <el-tab-pane label="会议表决" name="vote">
                <meeting-vote :meetingId="id"></meeting-vote>
            </el-tab-pane>
            <el-tab-pane label="参会人" name="people">
                <meeting-people :meetingId="id"></meeting-people>
            </el-tab-pane>
            <el-tab-pane label="签到情况" name="signIn">
                <meeting-signIn :meetingId="id"></meeting-signIn>
            </el-tab-pane>
            <el-tab-pane label="投票结果" name="voteResult">
                <meeting-vote-result :meetingId="id"></meeting-vote-result>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
// 会议列表 => 查看会议
import meetingInfo from '@/components/meeting/props/nowMeeting/info.vue'
import meetingAgenda from '@/components/meeting/props/nowMeeting/agenda.vue'
import meetingFile from '@/components/meeting/props/nowMeeting/file.vue'
import meetingVote from '@/components/meeting/props/nowMeeting/vote.vue'
import meetingPeople from '@/components/meeting/props/nowMeeting/people.vue'
import meetingSignIn from '@/components/meeting/props/nowMeeting/signIn.vue'
import meetingVoteResult from '@/components/meeting/props/nowMeeting/voteResult.vue'
export default {
    props: ['id'],
    data () {
        return {
            nowMeeting: '',
            activeName: 'info',
            moduleData: {
                list: []
            }
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
