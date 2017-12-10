<template>
    <div class="excel-upload">
        <el-upload :action="actionUrl" :data="requestData" :on-success="handleAvatarScucess" :before-upload="beforeAvatarUpload" :show-file-list="false">
            <el-button type="success" size="mini" class="bread-addbtn">{{ text }}</el-button>
        </el-upload>
    </div>
</template>

<script>
/**
 * 导入excle/按钮组件
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
            required: true
        },
        params: {
            type: Object,
            default: {}
        }
    },
    data() {
        return {
            actionUrl: basicConfig.API_HOST + this.url
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
            const isLt2M = file.size / 1024 / 1024 < 2
            if (!isLt2M) {
                this.$message.error('上传的文件大小不能超过2MB!')
            } else {
                // 触发loading
                // this.$emit('loading')
            }
            return isLt2M
        },
        handleAvatarScucess(response, file) {
            // 上传成功钩子，使用自定义事件给父组件传数据
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
