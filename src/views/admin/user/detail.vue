<template>
  <div class="createPost-container" :is-edit="false">
    <el-form ref="postForm" :model="postForm" :rules="rules" class="form-container">
      <el-row>
        <sticky :class-name="'sub-navbar '" style="background: #eef1f6;">
          <el-col :span="12" align="left" style="padding-left: 60px;"> {{ pageName }} </el-col>
          <el-col :span="12" style="padding-right:72px;">
            <el-button v-if="!isReadonly" v-loading="loading" class="pan-btn-min light-blue-btn" style="margin-left: 10px;" type="success" size="small" @click="onSave"> 保存 </el-button>
            <el-button v-if="!isReadonly && !isNew" v-loading="loading" class="pan-btn-min yellow-btn" style="margin-left: 10px;" type="warning" size="small" @click="onCancel"> 返回 </el-button>
            <el-button v-if="isNew && !isReadonly" v-loading="loading" class="pan-btn-min yellow-btn" style="margin-left: 10px;" type="warning" size="small" @click="onReset"> 重置 </el-button>
            <el-button v-if="!isNew && isReadonly" v-loading="loading" class="pan-btn-min green-btn" style="margin-left: 10px;" type="primary" size="small" @click="onEdit"> 编辑 </el-button>
          </el-col>
        </sticky>
      </el-row>
      <div class="createPost-main-container">
        <div class="postInfo-container">
          <el-row>
            <el-col :span="12">
              <el-form-item prop="name" class="form-items" required>
                <MDinput v-model="postForm.name" :maxlength="80" name="name" :disabled="isReadonly"> 用户名 </MDinput>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                prop="email"
                class="form-items"
                :rules="[
                  { required: true, trigger: 'blur' },
                  { type: 'email', message: '请输入合法Email地址', trigger: ['blur', 'change'] }
                ]"
              >
                <!--
                <el-input v-model="postForm.email" :maxlength="80" name="email" :disabled="isReadonly"> Email </el-input>
                -->
                <MDinput v-model="postForm.email" icon="el-icon-search" name="email" placeholder="输入Email" :disabled="isReadonly">
                  Email
                </MDinput>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item prop="passwd" class="form-items" required>
                <MDinput v-model="postForm.passwd" :maxlength="80" name="passwd" :disabled="isReadonly" show-password type="password">
                  密码
                </MDinput>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item prop="mobile" class="form-items" required>
                <MDinput v-model="postForm.mobile" :maxlength="80" name="mobile" :disabled="isReadonly">
                  手机号
                </MDinput>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item prop="roles" class="form-items" label="所属角色">
                <el-select v-model="postForm.roles" multiple>
                  <el-option
                    v-for="(item) in roleOpts"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item prop="enabled" class="form-items" label="状态">
                <el-switch
                  v-model="postForm.enabled"
                  :active-value="1"
                  :inactive-value="0"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  :disabled="isReadonly"
                />
              </el-form-item>
            </el-col>
          </el-row>
        </div>
      </div>
    </el-form>
  </div>
</template>

<script>
import MDinput from '@/components/MDinput'
import Sticky from '@/components/Sticky' // 粘性header组件

import { getOne, update, create } from '@/api/user'
import store from '@/store'
import { hex_md5 } from '@/utils/md5'

const defaultForm = {
  passwd: '',
  enabled: 1,
  name: '',
  email: '',
  id: undefined,
  mobile: undefined
}

export default {
  name: 'ArticleDetail',
  components: { MDinput, Sticky },
  filters: { },
  props: { },

  data() {
    const validateRequire = (rule, value, callback) => {
      if (value === '') {
        this.$message({
          message: rule.field + '为必传项',
          type: 'error'
        })
        callback(new Error(rule.field + '为必传项'))
      } else {
        callback()
      }
    } // validateRequire()

    let readonly = true
    let isNew = false
    if (this.$route.meta.crud && this.$route.meta.crud === 'c') {
      readonly = false
      isNew = true
    }

    return {
      roleOpts: store.getters.usr.roleToSel,
      id: undefined,
      isNew: isNew,
      readonly: readonly,
      postForm: Object.assign({}, defaultForm),
      loading: false,
      rules: {
        name: [{ validator: validateRequire }],
        passwd: [{ validator: validateRequire }],
        mobile: [{ validator: validateRequire }],
        roles: [{ validator: validateRequire }],
        email: [{ validator: validateRequire }]
      },
      tempRoute: {}
    }
  },
  computed: {
    pageName() {
      let name = this.$route.meta.module + '详情'
      if (this.id) {
        name += ` - ${this.id}`
      }
      if (this.isNew) {
        // return '添加-' + this.$route.meta.module
        return name + ' - 创建'
      }
      return name
    },

    isReadonly() {
      return this.readonly
    },
    contentShortLength() {
      return this.postForm.content_short.length
    },
    lang() {
      return this.$store.getters.language
    }
  }, // computed()

  created() {
    const id = this.$route.params && this.$route.params.id
    if (id) {
      this.id = id
      this.fetchData()
    }
    // Why need to make a copy of this.$route here?
    // Because if you enter this page and quickly switch tag, may be in the execution of the setTagsViewname function, this.$route is no longer pointing to the current page
    // https://github.com/PanJiaChen/vue-element-admin/issues/1221
    this.tempRoute = Object.assign({}, this.$route)
  }, // created()

  methods: {
    onReset() {
      if (this.readonly) {
        return
      }
      this.postForm = Object.assign({}, defaultForm)
    }, // onReset()

    toast(succ, msg = '未知错误') {
      const name = succ ? '成功' : '出错'
      this.$notify({
        name: name,
        message: succ ? '保存成功' : `保存失败：${msg}`,
        type: succ ? 'success' : 'error',
        duration: 1000
      })
    },

    fetchData() {
      if (!this.id) {
        return
      }
      this.loading = true
      getOne(this.id).then(response => {
        this.postForm = response.data
        this.postForm.roles = this.postForm.roles.map(x => x.id)
        console.log('>>> postForm: ' + JSON.stringify(this.postForm))
      }).catch(err => {
        console.log(err)
      }).finally(() => {
        this.loading = false
      })
    }, // fetchData()

    onEdit() {
      this.readonly = false
    },

    onCancel() {
      this.readonly = true
    },

    onSave() {
      this.$refs.postForm.validate(valid => {
        if (!valid) {
          console.log('error submit!!')
          return false
        }
        this.loading = true
        const form = { ...this.postForm }
        const saveFunc = this.isNew ? create : update
        if (form.passwd.length !== 32) {
          form.passwd = hex_md5(form.passwd)
        }
        saveFunc(form).then(res => {
          this.toast(true, res.msg)
          this.readonly = true
          if (this.isNew) {
            this.id = res.data.id
          } else {
            this.fetchData()
          }
        }).catch(() => {
          this.readonly = false
        }).finally(() => {
          this.loading = false
        })
      })
    } // onSave()
  } // methods()
}
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";

.form-items {
  margin-right: 40px;
  padding-left: 10px;
  padding-right: 10px;
}

.createPost-container {
  position: relative;

  .createPost-main-container {
    padding: 10px 45px 10px 50px;

    .postInfo-container {
      position: relative;
      @include clearfix;
      margin-bottom: 10px;

      .postInfo-container-item {
        float: left;
      }
    }
  }

  .word-counter {
    width: 40px;
    position: absolute;
    right: 10px;
    top: 0px;
  }
}

.article-textarea ::v-deep {
  textarea {
    padding-right: 40px;
    resize: none;
    border: none;
    border-radius: 0px;
    border-bottom: 1px solid #bfcbd9;
  }
}
</style>
