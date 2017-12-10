<template>
    <el-form ref="form" :model="form" label-width="80px" class="content-form" style="width: 100%;">
        <el-form-item label="收件人:">
            <el-input v-model="form.emailUser" placeholder="输入收件人邮箱地址，多个地址用英文逗号隔开" style="width: 100%;"></el-input>
        </el-form-item>
        <el-form-item label="主题:">
            <el-input v-model="form.title" placeholder="输入邮件主题" style="width: 100%;"></el-input>
        </el-form-item>
        <el-form-item label="内容:">
            <el-input v-model="form.content" type="textarea" placeholder="输入邮件内容" :rows="8"></el-input>
        </el-form-item>
        <el-form-item label="选择附件">
            <feng-file-upload text="点击上传" url="/Upload/filesUpload" @increment="handleAvatarScucess"></feng-file-upload>
        </el-form-item>
        <el-form-item label=" ">
            <el-button type="primary" size="small" @click="submit('form')">提交保存</el-button>
        </el-form-item>
    </el-form>
</template>
<script>
// 新增会议 => 会议信息发布
import fengFileUpload from '@/components/fengModule/fileUpload.vue'

export default {
    data() {
        return {
            form: {
                emailUser: '',
                title: '',
                content: '',
                file_url: ''
            }
        }
    },
    methods: {
        handleAvatarScucess(val) {
            this.form.file_url = val.data.url
        },
        submit(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let param = {}
                    Object.assign(param, this.form)
                    this.$api.apiCommunication('/Meeting/sendEmail', param, response => {
                        this.dialogVisible = false
                        if (response.status === 200) {
                            this.$notify({ title: '系统通知', message: '发布成功', type: 'success' })
                        } else {
                            this.$alert(`发布失败，服务器返回信息：${response.data}`, '系统通知', { confirmButtonText: '确定', type: 'error' })
                        }
                    })
                } else {
                    this.$notify({ title: '系统通知', message: '必填的字段不能为空或数据格式错误，请检查填写后重新提交', type: 'error' })
                }
            })
        },
    },
    components: {
        fengFileUpload
    }
}
</script>
