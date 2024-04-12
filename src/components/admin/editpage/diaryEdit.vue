<template>
  <el-container class="diary-edit-container" direction="horizontal">
    <section class="diary-edit-content">
      <!-- TITLE -->
      <div class="editor-title">
        <el-input type="textarea" class="title" v-model="diary.title" placeholder="一句话，概括你的一天"/>
      </div>
      <!-- CONTENT -->
      <div class="editor-content">
        <mavon-editor class="mavon-editor" ref="md" v-model="diary.content" subfield="false" defaultOpen="edit" :toolbars="toolbars" placeholder="日记详细内容，如果你有很多要写的"/>
      </div>
      <div class="separator"></div>
      <div class="myCenter" style="margin-bottom: 22px">
        <el-button type="primary" @click="submit()">保存</el-button>
        <el-button type="danger" @click="reset()">重置所有修改</el-button>
      </div>
    </section>
    <section class="diary-edit-meta">
      <!--  主参数区 -->
      <div class="editor-form">
        <!-- 日期选择-->
        <vc-calendar title-position="left" :value="diary.date" color="blue" :attributes='attrs' is-range/>
        <el-input-number v-model="diary.temperature" placeholder="今日温度"/>
      </div>

      <!-- 类别选择 -->
      <category-selector @category="setCategory" />
      <!-- 天气选择 -->
      <weather-selector @weather="setWeather"/>

    </section>
  </el-container>
</template>

<script>

import WeatherSelector from "@/components/admin/diary/WeatherSelector.vue";
import CategorySelector from "@/components/admin/diary/CategorySelector.vue";
import constant from "@/utils/constant";

export default {
  components: {WeatherSelector, CategorySelector},
  data() {
    return {
      diary: {
        id: this.$route.query.id,
        title: '',
        content: '',
        date: new Date(),
        weather: null,
        category: null,
        temperature: null
      },
      categories: [],
      weather: [],
      toolbars: {
        bold: true, // 粗体
        italic: true, // 斜体
        header: true, // 标题
        underline: true, // 下划线
        strikethrough: true, // 中划线
        mark: true, // 标记
        superscript: true, // 上角标
        subscript: true, // 下角标
        quote: true, // 引用
        ol: true, // 有序列表
        ul: true, // 无序列表
        // link: true, // 链接
        // imagelink: true, // 图片链接
        // code: true, // code
        // readmodel: true, // 沉浸式阅读
        // htmlcode: true, // 展示html源码
        // help: true, // 帮助
        /* 1.3.5 */
        undo: true, // 上一步
        redo: true, // 下一步
        // trash: true, // 清空
        /* 1.4.2 */
        // navigation: true, // 导航目录
        /* 2.1.8 */
        alignleft: true, // 左对齐
        aligncenter: true, // 居中
        alignright: true, // 右对齐
        /* 2.2.1 */
        // preview: true, // 预览
      },
      attrs: [{
          key: 'today',
          highlight: true,
          dates: new Date(),
        },
      ],
    }
  },

  computed: {},

  watch: {
  },

  created() {
  },

  mounted() {
    this.init();
  },

  methods: {
    init() {
      this.categories = constant.diaryCategories;
      this.weather = constant.weather;

      if (!this.$common.isEmpty(this.diary.id)) {
        this.getDiary();
      }
    },
    getDiary() {
      this.$http.get(this.$constant.baseURL + "/diary/getDiaryById", {id: this.diary.id}, true).then((res) => {
        if (!this.$common.isEmpty(res.data)) this.diary = res.data;
      }).catch((error) => {
        this.$message({message: error.message, type: "error"});
      });
    },
    setCategory(category) {
      this.diary.category = category;
    },
    setWeather(weather) {
      this.diary.weather = weather;
    },

    submit() {
      if (!/[-+]?\d+(?:\.\d+)?/.test(this.diary.temperature)){
        this.$message({type: 'warning', message: '温度填写错误，应为 23.45 这样'})
        return;
      } else if (this.diary.title.trim().length === 0 || this.diary.content.trim().length === 0) {
        // this.diary.title = '' // clear content
        this.$message({type:'warning', message: '内容未填写'})
        return;
      }

      if (this.$common.isEmpty(this.id)) {
        this.saveDiary(this.diary, "/diary/saveDiary")
      } else {
        this.diary.id = this.id;
        this.saveDiary(this.diary, "/diary/updateDiary")
      }
    },
    reset() {
      this.diary = {
        id: null,
        title: '',
        content: '',
        date: new Date(),
        weather: null,
        category: null,
        temperature: null
      }
    },

    saveDiary(value, url) {
      this.$confirm('确认保存？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'success',
        center: true
      }).then(() => {
        this.$http.post(this.$constant.baseURL + url, value, true).then((res) => {
          this.$message({message: "保存成功！", type: "success"});
          this.$router.push({path: '/diaryList'});
        }).catch((error) => {
          this.$message({message: error.message, type: "error"});
        });
      }).catch(() => {
        this.$message({type: 'success', message: '已取消保存!'});
      });
    }
  }
}

</script>

<style lang="scss">
section > div {
  margin: 10px;
}
.title {
  font-size: 18px;
}
//.separator {
//  margin: 0 100px;
//}
.diary-edit-content {
  width: 90vw;
}

.mavon-editor {
  height: 450px;
}
</style>
