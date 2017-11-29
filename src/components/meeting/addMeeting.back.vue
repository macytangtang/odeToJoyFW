<template>
    <div class="add-meeting-wrap">
        <h1 class="wrap-title mar-bottom15">会议信息录入</h1>
        <el-tabs v-model="activeName" type="border-card">
            <el-tab-pane label="基本信息" name="info">
                <meeting-info></meeting-info>
            </el-tab-pane>
            <el-tab-pane label="会议议程" name="agenda">
                <meeting-agenda></meeting-agenda>
            </el-tab-pane>
            <el-tab-pane label="会议文件" name="file">
                <meeting-file></meeting-file>
            </el-tab-pane>
            <el-tab-pane label="会议表决" name="vote">
                <meeting-vote></meeting-vote>
            </el-tab-pane>
            <el-tab-pane label="参会人" name="people">
                <meeting-people></meeting-people>
            </el-tab-pane>
            <el-tab-pane label="权限管理" name="purview">
                <meeting-purview></meeting-purview>
            </el-tab-pane>
            <el-tab-pane label="会议信息发布" name="release">
                <meeting-release></meeting-release>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
// 新增会议
import meetingInfo from '@/components/meeting/props/addMeeting/info.vue'
import meetingAgenda from '@/components/meeting/props/addMeeting/agenda.vue'
import meetingFile from '@/components/meeting/props/addMeeting/file.vue'
import meetingVote from '@/components/meeting/props/addMeeting/vote.vue'
import meetingPeople from '@/components/meeting/props/addMeeting/people.vue'
import meetingPurview from '@/components/meeting/props/addMeeting/purview.vue'
import meetingRelease from '@/components/meeting/props/addMeeting/release.vue'
export default {
    data () {
        return {
            activeName: 'info',
            checked: true
        }
    },
    components: {
        meetingInfo,
        meetingAgenda,
        meetingFile,
        meetingVote,
        meetingPeople,
        meetingPurview,
        meetingRelease
    }
}
</script>
