<template>
  <div class="createPost-container" :is-edit="false">
    <el-form ref="postForm" :model="postForm" :rules="rules" class="form-container">
      <el-row>
        <sticky :class-name="'sub-navbar '" style="background: #eef1f6;">
          <el-col :span="12" align="left" style="padding-left: 60px;"> {{ pageName }} </el-col>
          <el-col :span="12" style="padding-right:40px;">
            <el-button v-if="!readonly" v-loading="loading" style="margin-left: 10px;" type="success" size="small" @click="onSave"> 保存 </el-button>
            <el-button v-if="!readonly" v-loading="loading" style="margin-left: 10px;" type="warning" size="small" @click="onCancel"> 返回 </el-button>
            <el-button v-if="readonly" v-loading="loading" style="margin-left: 10px;" type="primary" size="small" @click="onEdit"> 编辑 </el-button>
          </el-col>
        </sticky>
      </el-row>
      <div class="createPost-main-container">
        <div class="postInfo-container">
          <el-row>
            <el-col :span="12">
              <el-form-item prop="name" class="form-items" label="用户名">
                <el-input v-model="postForm.name" :maxlength="80" name="name" required :disabled="isReadonly"> Name </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item prop="email" class="form-items" label="Email">
                <el-input v-model="postForm.email" :maxlength="80" name="email" required :disabled="isReadonly"> Email </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item prop="passwd" class="form-items" label="密码">
                <el-input v-model="postForm.passwd" :maxlength="80" name="passwd" required :disabled="isReadonly" show-password />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item prop="mobile" class="form-items" label="手机号">
                <el-input v-model="postForm.mobile" :maxlength="80" name="mobile" required :disabled="isReadonly" />
              </el-form-item>
            </el-col>
          </el-row>
        </div>
      </div>
    </el-form>
  </div>
</template>

<script>
// import MDinput from '@/components/MDinput'
import Sticky from '@/components/Sticky' // 粘性header组件

// import { getOne, addOne, update } from '@/api/user'
import { getOne } from '@/api/user'

const defaultForm = {
  passwd: '',
  enabled: 1,
  name: '',
  email: '',
  id: undefined,
  mobile: undefined,
  platforms: ['a-platform'],
  comment_disabled: false,
  importance: 0
}

export default {
  name: 'ArticleDetail',
  // components: { MDinput, Sticky },
  components: { Sticky },
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
    }
    return {
      readonly: true,
      pageName: '用户详情',
      postForm: Object.assign({}, defaultForm),
      loading: false,
      rules: {
        name: [{ validator: validateRequire }],
        email: [{ validator: validateRequire }]
      },
      tempRoute: {}
    }
  },
  computed: {
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
      this.fetchData(id)
    }

    // Why need to make a copy of this.$route here?
    // Because if you enter this page and quickly switch tag, may be in the execution of the setTagsViewname function, this.$route is no longer pointing to the current page
    // https://github.com/PanJiaChen/vue-element-admin/issues/1221
    this.tempRoute = Object.assign({}, this.$route)
  }, // created()

  methods: {
    fetchData(id) {
      getOne(id).then(response => {
        this.postForm = response.data
        this.pageName += ` - ${id}`
      }).catch(err => {
        console.log(err)
      })
    }, // fetchData()

    onEdit() {
      this.readonly = false
    },

    onCancel() {
      this.readonly = true
    },

    onSave() {
      console.log(this.postForm)
      this.$refs.postForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$notify({
            name: '成功',
            message: '保存成功',
            type: 'success',
            duration: 2000
          })
          this.postForm.status = 'saved'
          this.loading = false
        } else {
          console.log('error submit!!')
          return false
        }
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
