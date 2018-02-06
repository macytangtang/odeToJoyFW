<template>
    <div>
        <el-upload :action="actionUrl" :show-file-list="false" :data="requestData" :on-success="handleAvatarScucess" :on-error="handleAvatarError" :before-upload="beforeAvatarUpload">
            <el-button size="mini" type="warning">点击上传</el-button>
            <!-- <div slot="tip" class="el-upload__tip" v-if="imageUrl">{{ imageUrl }}</div> -->
        </el-upload>
        <template v-if="imageUrl">
            <img style="width: 150px;" :src="imageUrl" alt="获取图片失败">
            <!--
            <el-popover ref="popoverimg" placement="right" width="350" trigger="click">
                <img width="100%" :src="imageUrl" alt="获取图片失败">
            </el-popover>
            <el-button size="mini" type="primary" v-popover:popoverimg>查看图片</el-button> -->
        </template>
    </div>
</template>

<script>
/**
 * 单图片[上传/显示]组件
 * @imageUrl 图片url
 */
import '@/static/style/fengModule/imageUpload.scss'
import { basicConfig } from '@/config/'

export default {
    props: {
        imageUrl: {
            type: String
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
            actionUrl: `${basicConfig.API_HOST}/Upload/imgUpload`,
            dialogVisible: false
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
            const isJPG = (file.type === 'image/jpeg' || file.type === 'image/png')
            const isLt2M = file.size / 1024 / 1024 < 2
            if (!isJPG) {
              this.$message.error('上传的图片只能是 JPG/PNG 格式!')
            }
            if (!isLt2M) {
              this.$message.error('上传的图片大小不能超过 2MB!')
            }
            return isJPG && isLt2M
        },
        handleAvatarScucess(response, file) {
            // 图片上传成功钩子，使用自定义事件给父组件传数据
            if(response.status === 404) {
                this.$alert(response.data, '系统通知', { confirmButtonText: '确定', type: 'error' })
                return false
            }
            this.$emit('increment',response.data)
        },
        handleAvatarError(err, file) {
            // 图片上传失败钩子
            this.$notify({ title: '系统通知', message: '图片上传失败，请确认图片格式大小正确后重试', type: 'error' })
        },
        showDialog() {
            // 查看大图
            this.dialogVisible = true
        }
    }
}
</script>
