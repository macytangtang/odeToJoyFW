<template>
    <div class="excel-upload">
        <el-upload :action="actionUrl" :data="requestData" :on-success="handleAvatarScucess" :before-upload="beforeAvatarUpload" :on-remove="handleRemove" :before-remove="beforeRemove" :on-exceed="handleExceed" :limit="limits">
            <el-button type="warning" size="mini" style="vertical-align: text-top;">{{ text }}</el-button>
        </el-upload>
    </div>
</template>

<script>
/**
 * 文件上传组件
 * @text 按钮文本
 * @url 上传接口／必填
 * @limits 上传文件个数
 * @fileSize 上传文件大小
 * @params 上传附带的参数
 */
import { basicConfig } from '@/config/'

export default {
    props: {
        text: {
            type: String,
            default: '上传'
        },
        url: {
            type: String,
            default: '/Upload/filesUpload'
        },
        limits: {
            type: Number,
            default: 1
        },
        fileSize: {
            type: Number,
            default: 5
        },
        params: {
            type: Object,
            default: function () {
                return {}
            }
        }
    },
    data() {
        return {
            actionUrl: basicConfig.API_HOST + this.url,
            fileUrlList: []
        }
    },
    computed: {
        requestData() {
            return Object.assign({ token: this.$store.getters.getToken }, this.params)
        }
    },
    methods: {
        handleRemove(file, fileList) {
            // 移除文件后钩子
            this.fileUrlList = fileList
            this.$emit('increment', this.fileUrlList)
        },
        beforeRemove(file, fileList) {
            // 询问是否删除钩子
            return this.$confirm(`确定删除 ${ file.name }？`)
        },
        handleExceed(files, fileList) {
            // 选择文件超出限制钩子
            this.$message.warning(`只能上传${this.limits}个文件！`)
        },
        beforeAvatarUpload(file) {
            // 上传文件前的钩子
            const isLt2M = file.size / 1024 / 1024 < this.fileSize
            if (!isLt2M) {
                this.$message.error(`上传的文件大小不能超过${this.fileSize}MB!`)
            } else {
                // 触发loading
                // this.$emit('loading')
            }
            return isLt2M
        },
        handleAvatarScucess(response, file) {
            this.fileUrlList.push(response.data.url)
            this.$emit('increment',this.fileUrlList)
        },
        handleAvatarError(err, file) {
            // 上传失败钩子
            this.$notify({ title: '系统通知', message: '上传失败，请确认文件格式大小正确后重试', type: 'error' })
        }
    }
}
</script>
<style scoped>
    .excel-upload {
        display: inline-block;
    }
</style>
