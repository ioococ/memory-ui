<template>
  <div>
    <div class="handle-box">
      <el-select style="width: 140px" class="mrb10" v-model="pagination.category" placeholder="请选择分类">
        <el-option v-for="item in categories" :key="item.id" :label="item.name" :value="item.english"/>
      </el-select>
      <el-select style="width: 140px" class="mrb10" v-model="pagination.weather" placeholder="请选择天气">
        <el-option v-for="item in weather" :key="item.id" :label="item.name" :value="item.english"/>
      </el-select>
      <el-input v-model="pagination.searchKey" placeholder="日记标题" class="handle-input mrb10"></el-input>
      <el-button type="primary" icon="el-icon-search" @click="searchDiaries()">搜索</el-button>
      <el-button type="danger" @click="clearSearch()">清除参数</el-button>
      <el-button type="primary" @click="$router.push({path: '/diaryEdit'})">新增日记</el-button>
    </div>
    <el-table :data="diaries" border class="table" header-cell-class-name="table-header">
      <el-table-column prop="id" label="ID" width="55" align="center"/>
      <el-table-column prop="title" label="日记标题" align="center"/>
      <el-table-column prop="category" label="分类" align="center" :formatter="formatCategory"/>
      <el-table-column prop="date" label="时间" align="center"/>
      <el-table-column prop="weather" label="天气" align="center" :formatter="formatWeather"/>
      <el-table-column prop="temperature" label="温度" align="center"/>
      <el-table-column label="操作" width="180" align="center">
        <template slot-scope="scope">
          <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button type="text" icon="el-icon-delete" style="color: var(--orangeRed)" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination background layout="total, prev, pager, next"
                     :current-page="pagination.current"
                     :page-size="pagination.size"
                     :total="pagination.total"
                     @current-change="handlePageChange">
      </el-pagination>
    </div>
  </div>
</template>

<script>

import constant from "@/utils/constant";

export default {
  data() {
    return {
      isBoss: this.$store.state.currentAdmin.isBoss,
      pagination: {
        current: 1,
        size: 10,
        total: 0,
        searchKey: "",
        category: null,
        weather: null,
        temperature: null,
      },
      diaries: [],
      categories: [],
      weather: [],
    }
  },

  computed: {},

  watch: {},

  created() {
    this.init();
    this.getDiaries();
  },

  mounted() {
  },

  methods: {
    init() {
      this.categories = constant.diaryCategories;
      this.weather = constant.weather;
    },
    formatCategory(row, index) {
      return this.categories[row.category]["name"];
    },
    formatWeather(row, index) {
      return this.weather[row.weather]["name"];
    },
    clearSearch() {
      this.pagination = {
        current: 1,
        size: 10,
        total: 0,
        searchKey: "",
        recommendStatus: null,
        sortId: null,
        labelId: null
      }
      this.getDiaries();
    },
    getDiaries() {
      this.$http.post(this.$constant.baseURL + "/diary/listDiary", this.pagination, true).then((res) => {
        if (!this.$common.isEmpty(res.data)) {
          this.diaries = res.data.records;
          this.pagination.total = res.data.total;
        }
      }).catch((error) => {
        this.$message({message: error.message, type: "error"});
      });
    },
    handlePageChange(val) {
      this.pagination.current = val;
      this.getDiaries();
    },
    searchDiaries() {
      this.pagination.total = 0;
      this.pagination.current = 1;
      this.getDiaries();
    },
    handleDelete(item) {
      this.$confirm('确认删除？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'success',
        center: true
      }).then(() => {
        this.$http.get(this.$constant.baseURL + "/article/deleteDiary", {id: item.id}, true).then((res) => {
          this.pagination.current = 1;
          this.getDiaries();
          this.$message({type: "success", message: "删除成功！"});
        }).catch((error) => {
          this.$message({type: "error", message: error.message,});
        });
      }).catch(() => {
        this.$message({type: 'success', message: '已取消删除!'});
      });
    },
    handleEdit(item) {
      this.$router.push({path: '/diaryEdit', query: {id: item.id}});
    }
  }
}
</script>

<style scoped>

  .handle-box {
    margin-bottom: 20px;
  }

  .handle-input {
    width: 160px;
    display: inline-block;
  }

  .table {
    width: 100%;
    font-size: 14px;
  }

  .mrb10 {
    margin-right: 10px;
    margin-bottom: 10px;
  }

  .table-td-thumb {
    display: block;
    margin: auto;
    width: 40px;
    height: 40px;
  }

  .pagination {
    margin: 20px 0;
    text-align: right;
  }

  .el-switch {
    margin: 5px;
  }
</style>
