<template>
    <div>
        <h1 class="wrap-title mar-bottom15">已结束会议</h1>
        <el-row class="mar-bottom10">
            <el-col :span="24" class="el-item pdd-10">
                <el-form ref="form" :model="form" label-width="95px" class="content-form">
                    <el-form-item label="已结束会议" class="mar-bottom0">
                        <el-select v-model="form.a" placeholder="选择已结束会议" filterable>
                            <el-option label="已结束会议1" :value="0"></el-option>
                            <el-option label="已结束会议2" :value="1"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
        <el-tabs :value="activeName" type="border-card">
            <el-tab-pane label="基本信息" name="info">
                <meeting-info></meeting-info>
            </el-tab-pane>
            <el-tab-pane label="会议议程" name="agenda">
                <meeting-agenda></meeting-agenda>
            </el-tab-pane>
            <el-tab-pane label="会议文件" name="file">
                <meeting-file></meeting-file>
            </el-tab-pane>
            <el-tab-pane label="参会人" name="people">
                <meeting-people></meeting-people>
            </el-tab-pane>
            <el-tab-pane label="签到情况" name="signIn">
                <meeting-signIn></meeting-signIn>
            </el-tab-pane>
            <el-tab-pane label="投票结果" name="voteResult">
                <meeting-vote-result></meeting-vote-result>
            </el-tab-pane>
            <el-tab-pane label="批注文件" name="annotation">
                <meeting-annotation></meeting-annotation>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
// 已结束会议
import meetingInfo from '@/components/meeting/props/endMeeting/info.vue'
import meetingAgenda from '@/components/meeting/props/endMeeting/agenda.vue'
import meetingFile from '@/components/meeting/props/endMeeting/file.vue'
import meetingPeople from '@/components/meeting/props/endMeeting/people.vue'
import meetingSignIn from '@/components/meeting/props/endMeeting/signIn.vue'
import meetingVoteResult from '@/components/meeting/props/endMeeting/voteResult.vue'
import meetingAnnotation from '@/components/meeting/props/endMeeting/annotation.vue'
export default {
    data () {
        return {
            form: {
                a: ''
            },
            activeName: 'info'
        }
    },
    components: {
        meetingInfo,
        meetingAgenda,
        meetingFile,
        meetingPeople,
        meetingSignIn,
        meetingVoteResult,
        meetingAnnotation
    }
}
</script>
