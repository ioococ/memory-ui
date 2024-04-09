<template>
  <div class="diary-list">
    <div class="diary" v-for="(diary, index) in diaryList" :key="index + 'diary'">
      <div class="diary-date">{{ diary.year }}</div>
      <template v-for="(month, monthind) in diary.monthList">
        <template v-if="month.length > 0">
          <div class="diary-month" :key="monthind + 'month'" :id="diary.year + '-' + (monthind + 1)">{{ monthind + 1 }}月</div>
          <div class="diary-item" v-for="(item, ind) in month" :key="monthind + '-' + ind">
            <span class="diary-item-time">{{ item.time }}</span>
            <span class="diary-item-title" @click="toDetail(item.id)">{{ item.title }}</span>
            <div class="diary-item-line"></div>
          </div>
        </template>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: "diaryList",
  props: {
    diaryList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {
    toDetail(id) {
      this.$router.push({ name: "diaryDetail", query: { id: id } });
    }
  }
};
</script>

<style lang="scss" scoped>
.diary-list {
  background-color: white;
  // width: 60vw;
  // margin: auto;
  // margin-top: 1rem;
  // margin-left: 10vw;
  box-shadow: 10px 10px 5px #888888;
  padding: 2rem 2rem 3rem;
  font-family: cursive;
  border-radius: 5px;
  text-align: left;
  .diary {
    margin-top: 2rem;
    .diary-date {
      font-size: xx-large;
      font-weight: bold;
    }
    .diary-month {
      font-size: x-large;
      font-weight: bold;
      margin-left: 0.5em;
      color: orange;
      // border-bottom: orange 1px solid;
    }
    .diary-item {
      margin-top: 1rem;
      text-indent: 1em;
      font-size: large;
      cursor: pointer;
      &:hover {
        transform: translateX(4px);
        transition: all 0.2s ease-out 0s;
      }
      .diary-item-time {
        color: gray;
      }
      .diary-item-title {
        color: rgb(192, 91, 77);
        margin-left: 1rem;
        word-break: break-all;
      }
      .diary-item-line {
        height: 1px;
        background: rgb(199, 196, 196);
        width: 100%;
        margin-top: 0.5rem;
      }
    }
  }
}
</style>
