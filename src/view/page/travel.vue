<template>
  <div>
    <!-- 封面 -->
    <div class="bg-wrap my-animation-slide-top">
      <!-- 背景图片 -->
      <el-image style="animation: header-effect 2s" class="background-image" v-once lazy
                :src="$constant.random_image+new Date()+Math.floor(Math.random()*10)" fit="cover">
        <div slot="error" class="image-slot background-image-error"></div>
      </el-image>
    </div>

    <!-- 内容 -->
    <div class="album-container">
        <div class="card-container">
          <div v-show="!$common.isEmpty(photoTitleList)">
            <!-- 标签 -->
            <div class="photo-title-warp" v-if="!$common.isEmpty(photoTitleList)">
              <div v-for="(item, index) in photoTitleList" :key="index"
                   :class="{isActive: photoPagination.classify === item.classify}"
                   @click="changePhotoTitle(item.classify)">
                <proTag :info="item.classify+' '+item.count"
                        :color="$constant.before_color_list[Math.floor(Math.random() * 6)]"
                        style="margin: 12px">
                </proTag>
              </div>
            </div>

            <div class="photo-title"> {{photoPagination.classify}}</div>

            <photo :resourcePathList="photoList"></photo>
            <div class="pagination-wrap">
              <div @click="pagePhotos()" class="pagination" v-if="photoPagination.total !== photoList.length">下一页</div>
              <div v-else style="user-select: none">~~到底啦~~</div>
            </div>
          </div>
        </div>
      </div>

      <el-dialog title="图片" :visible.sync="addPictureDialog" width="25%" :append-to-body="true" :close-on-click-modal="false" destroy-on-close center>
        <div>
          <uploadPicture :prefix="'love/' + pictureType" @addPicture="addPicture" :maxSize="10" :maxNumber="1"/>
        </div>
      </el-dialog>

      <div>
        <!-- 页脚 -->
        <myFooter></myFooter>
      </div>
    </div>
  </div>
</template>

<script>

  const myFooter = () => import( "@/components/skeleton/myFooter");
  const photo = () => import( "@/components/funny/photo");
  const proTag = () => import( "@/components/common/proTag.vue");
  const proButton = () => import( "@/components/common/proButton.vue");
  const uploadPicture = () => import( "@/components/common/uploadPicture.vue");

  export default {
    components: {
      photo,
      myFooter,
      proTag,
      proButton,
      uploadPicture
    },

    data() {
      return {
        addPictureDialog: false,
        pictureType: "",
        photoPagination: {
          current: 1,
          size: 10,
          total: 0,
          resourceType: "albums",
          classify: ""
        },
        photoTitleList: [],
        photoList: [],
        countdownChange: ""
      }
    },

    computed: {},

    watch: {},

    created() {
      this.getPhotoTitles();
    },

    mounted() {},

    methods: {
      openPicture(type) {
        this.pictureType = type;
        this.addPictureDialog = true;
      },
      addPicture(res) {
        this.pictureType = "";
        this.addPictureDialog = false;
      },

      getPhotoTitles() {
        this.$http.get(this.$constant.baseURL + "/webInfo/listAlbums").then((res) => {
            if (!this.$common.isEmpty(res.data)) {
              this.photoTitleList = res.data;
              this.photoPagination = {
                current: 1,
                size: 10,
                total: 0,
                resourceType: "albums",
                classify: this.photoTitleList[0].classify
              };
              this.changePhoto();
            }
          }).catch((error) => {
            this.$message({
              message: error.message,
              type: "error"
            });
          });
      },
      changePhotoTitle(classify) {
        if (classify !== this.photoPagination.classify) {
          this.photoPagination = {
            current: 1,
            size: 10,
            total: 0,
            resourceType: "albums",
            classify: classify
          };
          this.photoList = [];
          this.changePhoto();
        }
      },
      pagePhotos() {
        this.photoPagination.current = this.photoPagination.current + 1;
        this.changePhoto();
      },
      changePhoto() {
        this.$http.post(this.$constant.baseURL + "/webInfo/listResourcePath", this.photoPagination).then((res) => {
            if (!this.$common.isEmpty(res.data)) {
              this.photoList = this.photoList.concat(res.data.records);
              this.photoPagination.total = res.data.total;
            }
          }).catch((error) => {
            this.$message({
              message: error.message,
              type: "error"
            });
          });
      }
    }
  }
</script>

<style scoped>

  .album-container {
    background-image: linear-gradient(to right, rgba(37, 82, 110, 0.1) 1px, var(--background) 1px), linear-gradient(to bottom, rgba(37, 82, 110, 0.1) 1px, var(--background) 1px);
    background-size: 3rem 3rem;
    /*background: var(--background);*/
  }

  .bg-wrap {
    height: 55vh;
    position: relative;
    overflow: hidden;
  }

  .album-image::before {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: var(--miniMask);
  }

  .card-wrap {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    padding: 20px 0;
  }

  .card-content {
    display: flex;
    padding: 25px;
    margin: 25px auto;
    border-radius: 20px;
    max-width: 780px;
    cursor: pointer;
    transition: all 0.3s;
    background: var(--background);
  }

  .card-content:hover {
    transform: translateY(-6px);
  }

  .card-right {
    margin-left: 20px;
  }

  .card-title {
    font-size: 1.6rem;
    letter-spacing: 0.2rem;
    line-height: 3.5rem;
    font-weight: 700;
  }

  .card-desc {
    font-size: 1.1rem;
    letter-spacing: 0.2rem;
    color: #777777;
  }

  .card-container {
    max-width: 1500px;
    margin: 20px auto 40px;
  }

  .pagination-wrap {
    display: flex;
    justify-content: center;
    margin-top: 40px;
  }

  .pagination {
    padding: 13px 15px;
    border: 1px solid var(--lightGray);
    border-radius: 3rem;
    color: var(--greyFont);
    width: 100px;
    user-select: none;
    cursor: pointer;
    text-align: center;
  }

  .pagination:hover {
    border: 1px solid var(--themeBackground);
    color: var(--themeBackground);
    box-shadow: 0 0 5px var(--themeBackground);
  }

  .comment-content {
    max-width: 1000px;
    margin: 0 auto;
  }

  .photo-title {
    text-align: center;
    font-size: 30px;
    font-weight: 700;
    line-height: 80px;
    letter-spacing: 2px;
  }

  .photo-title-warp {
    max-width: 1150px;
    margin: 50px auto;
    padding: 20px;
    border-radius: 10px;
    display: flex;
    flex-wrap: wrap;
  }

  .isActive {
    animation: scale 2.5s ease-in-out infinite;
  }

  .user-content > div {
    height: 65px;
    display: flex;
    align-items: center;
  }

  @media screen and (max-width: 1200px) {
    .user-content > div {
      display: unset;
      align-items: unset;
    }
  }


  @media screen and (max-width: 1150px) {
    .card-wrap {
      display: unset;
      justify-content: unset;
    }

    .photo-title-warp {
      max-width: 780px;
    }
  }

</style>
