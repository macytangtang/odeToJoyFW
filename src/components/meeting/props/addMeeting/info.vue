<template>
    <el-form ref="form" :model="form" label-width="95px" class="content-form">
        <el-form-item label="会议名称">
            <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label=" ">
            <el-checkbox v-model="form.is_secrecy">保密会议</el-checkbox>（会议结束后自动系统将删除会议相关材料）
        </el-form-item>
        <el-form-item label="会议室">
            <el-select v-model="form.brooms" placeholder="选择会议室" filterable>
                <el-option label="管理员" :value="0"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="开始时间">
            <el-input v-model="form.start_time"></el-input>
        </el-form-item>
        <el-form-item label="结束时间">
            <el-input v-model="form.end_time"></el-input>
        </el-form-item>
        <el-form-item label="参会人数">
            <el-input v-model="form.conferee_num"></el-input>
        </el-form-item>
        <el-form-item label="会议秘书">
            <el-input v-model="form.clerk_id"></el-input>
        </el-form-item>
        <el-form-item label="申请部门">
            <el-input v-model="form.department"></el-input>
        </el-form-item>
        <el-form-item label="服务提供">
            <el-checkbox-group v-model="form.f">
                <el-checkbox label="茶水"></el-checkbox>
                <el-checkbox label="咖啡"></el-checkbox>
                <el-checkbox label="保洁"></el-checkbox>
                <el-checkbox label="纸笔"></el-checkbox>
            </el-checkbox-group>
        </el-form-item>
        <el-form-item label="功能需求">
            <el-checkbox-group v-model="form.f">
                <el-checkbox label="议程查看"></el-checkbox>
                <el-checkbox label="文件浏览"></el-checkbox>
                <el-checkbox label="批注文件"></el-checkbox>
                <el-checkbox label="投票表决"></el-checkbox>
                <el-checkbox label="服务呼叫"></el-checkbox>
                <el-checkbox label="同屏请求"></el-checkbox>
                <el-checkbox label="电子白板"></el-checkbox>
                <el-checkbox label="投影请求"></el-checkbox>
                <el-checkbox label="聊天室"></el-checkbox>
                <el-checkbox label="视频录播"></el-checkbox>
            </el-checkbox-group>
        </el-form-item>
        <el-form-item label="备注">
            <el-input v-model="form.f"></el-input>
        </el-form-item>
        <el-form-item label=" ">
            <el-button type="primary" size="small" @click="submit('form')">提交信息</el-button>
        </el-form-item>
    </el-form>
</template>
<script>
// 添加会议 => 基本信息
export default {
    data() {
        return {
            checked: false,

            form: {

                a: '',
                b: 0,
                c: '',
                d: '',
                e: '',
                f: ''
            }
        }
    },
    methods: {
        submit(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let param = {},
                        apiname = this.marked === 'add' ? '/User/createUser' : '/User/updateUser'
                    Object.assign(param, this.form)
                    this.$api.apiCommunication(apiname, param, response => {
                        this.dialogVisible = false
                        if (response.status === 200) {
                            this.getModuleData()
                        } else {
                            this.$alert(`获取数据失败，服务器返回信息：${response.data}`, '系统通知', { confirmButtonText: '确定', type: 'error' })
                        }
                    })
                } else {
                    this.$notify({ title: '系统通知', message: '必填的字段不能为空或数据格式错误，请检查填写后重新提交', type: 'error' })
                }
            })
        },
    }
}
</script>
