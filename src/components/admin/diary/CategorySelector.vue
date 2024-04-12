<template>
  <div class="edit-category-selector">
    <div class="category-wrapper" @click="chooseCategory(category.english)"
      v-for="category in categoryList" :key="category.english">
      <div class="category" :style="itemStyle(selected === category.english, category)">{{ category.name }}</div>
    </div>
  </div>
</template>

<script>

import constant from "@/utils/constant";

export default {
  data() {
    return {
      categoryList: [],
      selected: null
    }
  },

  computed: {},

  watch: {
  },

  created() {
  },

  mounted() {
    this.init()
  },

  methods: {
    init() {
      this.categoryList = Object.values(constant.diaryCategories);
    },
    itemStyle(active, category) {
      if (active) {
        return `color: white; background-color: ${category.color}`
      } else {
        return `color: ${category.color}`
      }
    },
    chooseCategory(categoryName) {
      this.selected = categoryName;
      this.$emit("category", categoryName)
    }

  }
}
</script>

<style lang="scss" scoped>

.edit-category-selector{
  padding: 20px;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 5px;
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: flex-start;
  .category-wrapper{
    width: 20%;
    padding: 4px 2px;
    &:hover{
      .category{
        background-color: #fff;
      }
    }
    transition: background-color  0.2s;

    .category{
      transition: background-color  0.1s;
      white-space: nowrap;
      border-radius: 5px;
      padding: 5px;
      flex-shrink: 0;
      display: block;
      font-weight: bold;
      cursor: pointer;
      text-align: center;
    }
  }
}

</style>
