<template>
    <div class="excel-upload">
        <el-upload :action="actionUrl" :data="requestData" :on-success="handleAvatarScucess" :before-upload="beforeAvatarUpload" :show-file-list="false">
            <el-button type="warning" size="mini" style="vertical-align: text-top;">{{ text }}</el-button>
        </el-upload>
        <template v-if="fileUrl">
            <p>{{ fileUrl }}</p>
        </template>
    </div>
</template>

<script>
/**
 * 文件上传组件
 * @text 按钮文本
 * @url 上传接口／必填
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
            fileUrl: ''
        }
    },
    computed: {
        requestData() {
            return Object.assign({ token: this.$store.getters.getToken }, this.params)
        }
    },
    methods: {
        beforeAvatarUpload(file) {
            // 上传文件前的钩子
            const isLt2M = file.size / 1024 / 1024 < 50
            if (!isLt2M) {
                this.$message.error('上传的文件大小不能超过50MB!')
            } else {
                // 触发loading
                // this.$emit('loading')
            }
            return isLt2M
        },
        handleAvatarScucess(response, file) {
            // 上传成功钩子，使用自定义事件给父组件传数据
            this.fileUrl = response.data.filename
            console.log(response)
            this.$emit('increment',response)
        },
        handleAvatarError(err, file) {
            // 上传失败钩子
            this.$notify({ title: '系统通知', message: '上传失败，请确认文件格式大小正确后重试', type: 'error' })
        }
    }
}
</script>
<style>
    .excel-upload {
        display: inline-block;
    }
</style>
