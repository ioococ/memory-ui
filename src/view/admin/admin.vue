<template>
  <div>
    <myHeader></myHeader>
    <sidebar></sidebar>
    <div class="content-box">
      <div class="content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
  import myHeader from "@/components/admin/common/myHeader.vue";
  import sidebar from "@/components/admin/common/sidebar.vue";

  export default {
    components: {
      myHeader,
      sidebar
    },

    data() {
      return {}
    },

    computed: {},

    watch: {},

    created() {

    },

    mounted() {

    },

    methods: {}
  }
</script>

<style scoped>

  .content-box {
    position: absolute;
    left: 200px;
    right: 0;
    top: 70px;
    bottom: 0;
    transition: left .3s ease-in-out;
  }

  .content {
    width: auto;
    height: 100%;
    padding: 30px;
    overflow-y: scroll;
  }

</style>
