<template>
  <div class="diary-container">
    <div class="page-header">
        <el-image style="animation: header-effect 2s" class="background-image" v-once lazy
                  :src="$constant.random_image+new Date()+Math.floor(Math.random()*10)" fit="cover">
            <div slot="error" class="image-slot background-image-error"></div>
        </el-image>
        <span class="diary-title">日记本</span>
    </div>
        <el-container class="diary-main" direction="horizontal">
            <div class="time-line">
                <div><span class="page-title"> 归档存记忆，留史鉴未来！ </span></div>
                <section>
                    <!-- 文章信息 -->
                    <el-row v-for="(item, index) in diaryList" :key="item.id" class="diary-list" :id="index" @click.native="setElement(index)">
                      <span>{{ item.title }}</span>
                      <div style="display: inline-block; height: 10px; width: 60px;"></div>
                      <span class="date-span">{{ item.date }} </span>
                    </el-row>
                </section>
            </div>
            <div class="right-column">
              <el-container class="column-body" direction="vertical">
                <section class="diary-header">
                  <h1 v-html="title"/>
                  <div>
                    <div v-html="date" class="diary-date"></div>
                    <div v-html="weather" class="diary-date"></div>
                    <div v-html="temperature" class="diary-date"></div>
                  </div>
                </section>
                <hr/>
                <section class="diary-content">
                  <div v-html="content"/>
                </section>

              </el-container>
            </div>
        </el-container>

  </div>

</template>

<script>

export default {
  name: "Diary",
  components: {

  },
  data() {
    return {
      // 文章归档数据
      diaryList: [],
      title: '',
      content: '',
      date: null,
      weather: null,
      temperature: null
    };
  },
  computed: {
  },
  mounted() {
    this.getDiaryInfo();
  },

  methods: {
    // 获取文章归档信息
    getDiaryInfo() {
      this.$http.get(this.$constant.baseURL + "/diary/listDiary",{curPage: this.curPage, size: this.size,}).then((result) => {
        this.diaryList = result.data;
      });
    },
    setElement(index) {
      this.title = this.diaryList[index].title
      this.content = this.diaryList[index].content
      this.date = this.diaryList[index].date
      this.weather = this.diaryList[index].weather
      this.temperature = this.diaryList[index].temperature
    }
  },
};
</script>

<style lang="scss" scoped>
.diary-container {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.page-header {
  width: 100%;
  height: calc(20vh);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.diary-title {
  color: #fff;
  font-size: 50px;
  font-weight: 500;
}
.diary-main {
  width: 90%;
  height: 80vh;
  border-radius: 10px;
  box-shadow: 0 1px 20px -6px rgb(0 0 0 / 50%);
  background-color: #fff;
  padding: 20px;
  min-height: calc(30vh);
  overflow: hidden;
}
.time-line {
  margin-top: 10px;
  overflow: scroll;
}
.diary-list {
  margin-left: 20px;
  padding: 12px 40px 12px 20px;
  border-top: 1px #ccc dotted;
  border-bottom: 1px #ccc dotted;
}
.date-span {
  font-size: 10px;
  color: #606266;
  font-weight: 600;
}
.title-span {
  cursor: pointer;
  font-size: 16px;
  color: #303133;
  font-weight: 600;
  text-decoration: none;
}
.title-span:hover {
  transition: 0.8s;
  color: #409eff;
}
.page-title {
  font-size: 16px;
  color: #606266;
  font-weight: 600;
}
h1{
  margin-left: 20px;
  font-size: 2em;
}
.right-column {
  width: 70vw;
  overflow: hidden;

  .column-body {
    margin: 10px;
    border: 1px #000 solid;
  }
}
.diary-header{
  display: flex;
  justify-content: space-between;
}
</style>
