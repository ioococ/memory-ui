<template>
  <div id="Email-BigBox" :style="data.isFilter">
    <div class="Principal-left">
      <p class="text-p">从前的日色变得慢</p>
      <p class="text-p">车，马，邮件都慢</p>
      <p class="text-p">一生只够爱一个人</p>
      <p class="text-p">而今天的我们日行千里</p>
      <p class="text-p">却总是边走边忘</p>
      <p class="text-p">曾经稚嫩却充满勇气的自己</p>
      <p class="text-p">倔强又柔软的自己</p>
      <p class="text-p">你还记得多少?</p>
      <p class="text-p">用信件记录下此刻的心情与期盼</p>
      <p class="text-p">并寄给未来的自己或那个TA</p>
      <p class="text-p">一起见证时光交错，与未来相遇</p>

<!--      <div class="statistics-box">-->
<!--        <div class="statistics-text">-->
<!--          <img class="statistics-img" src="../../static/ico/youxiang.png" alt="ico"/>-->
<!--          <span class="statistics-desc">待发送</span>-->
<!--          <span class="statistics-number">{{ data.waitSend }}</span>-->
<!--          <span class="statistics-unit">封</span>-->
<!--        </div>-->
<!--        <div class="statistics-text">-->
<!--          <img class="statistics-img" src="../../static/ico/dianziyoujian.png" alt="ico"/>-->
<!--          <span class="statistics-desc">已发送</span>-->
<!--          <span class="statistics-number">{{ data.send }}</span>-->
<!--          <span class="statistics-unit">封</span>-->
<!--        </div>-->
<!--        <div class="statistics-text">-->
<!--          <img class="statistics-img" src="../../static/ico/shijian.png" alt="ico"/>-->
<!--          <span class="statistics-desc">已运营</span>-->
<!--          <span class="statistics-number">{{ data.operation }}</span>-->
<!--          <span class="statistics-unit">天</span>-->
<!--        </div>-->
<!--      </div>-->

    </div>
    <div class="Principal-right">
      <h2 class="right-title">云寄 • 时光邮局</h2>
      <p class="title-p">见证时光的交错，与未来相遇</p>

      <div class="from-email">
        <div class="email-info">
          <span class="span-desc">邮件标题：</span>
          <el-input class="title-el-input" v-model="data.form.title" placeholder="请输入标题" style="width: 100%"/>
        </div>

<!--        <div class="email-info">-->
<!--          <span class="span-desc">邮件类型：</span>-->
<!--          <el-select v-model="data.form.type" class="m-2" placeholder="选择类型">-->
<!--            <el-option v-for="item in emailOptions" :key="item.value" :label="item.label" :value="item.value"/>-->
<!--          </el-select>-->
<!--        </div>-->

        <div class="email-info email-vditor">
          <span class="span-desc">信件内容：</span>
          <div class="title-el-input" id="vditor"></div>
        </div>

        <div class="email-info">
          <span class="span-desc">约定时间：</span>
          <div class="demo-date-picker">
            <el-date-picker v-model="data.form.dataTime" type="date" placeholder="选择未来"
                            format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd">
              <template #default="cell">
                <div class="cell" :class="{ current: cell.isCurrent }">
                  <span class="text">{{ cell.text }}</span>
                </div>
              </template>
            </el-date-picker>
          </div>
        </div>

        <div class="email-but-action">
          <el-button color="#626aef" size="large" @click="deliveryEmail">投递信件</el-button>
          <el-button color="#F4F4F5" size="large" @click="discardEmail">舍弃信件</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {reactive, watch, onMounted, ref} from "vue";
import Vditor from "vditor";
import "vditor/dist/index.css";
import html2canvas from "html2canvas";
import { Loading } from "element-ui";

const emailOptions = [
  {value: 0, label: "电子邮件"},
  {value: 1, label: "线下邮寄"},
];

let vditor;
let editor;
onMounted(() => {
  vditor = ref(
      editor = new Vditor("vditor", {
        height: 360,
        toolbar: [
          "emoji", "headings", "bold", "italic", "strike", "link", "upload", "list", "ordered-list",
          "check", "outdent", "indent", "quote", "line", "insert-before", "insert-after", "table", "fullscreen",
           {
            name: "more",
            toolbar: ["both", "code-theme", "content-theme", "export"],
          },
        ],
        upload: {
          accept: 'image/*',
          // token: this.token,
          // url: ToTimeConfig.uploadURL,
          // linkToImgUrl: ToTimeConfig.linkURL,
          filename(byte) {
            return byte.replace(/[^(a-zA-Z0-9\u4e00-\u9fa5.)]/g, '').replace(/[?\\/:|<>*\[\]()$%{}@~]/g, '').replace('/\\s/g', '')
          },
          fieldName: 'file',
          multiple: false,
          // 文件最大上传byte
          max: 1024 * 1024 * 5,
          success(_, msg) {
            let info = JSON.parse(msg);
            if (info.code === 200) {
              //编辑器回显
              editor.insertValue(`![](${info.imgUrl})`)
            } else {
              this.$message.error(info.msg);
              return false;
            }
          }
        },
      })
  );
});

const data = reactive({
  isMasking: false,
  isDisabled: true,
  showCode: false,
  waitSend: 52,
  send: 15,
  operation: 15,
  isAgreeTerms: false,
  addressDetailed: "",
  addressSpecific: "",
  loadingText: "正在保存快照...",
  getCode: "获取验证",
  isFilter: "",
  form: {
    title: "",
    // 类型
    type: 0,
    //获取现在时间
    dataTime: new Date(),
    isTa: 1,
    toEmail: "",
    addressee: "",
    phone: "",
    content: "",
    contentHtml: "",
    isHtml: 0,
    isPublic: 1,
    isAbandon: 1,
    address: "",
    code: "",
    codeMail: "",
  },
});

watch(
    () => data.form.type,
    (val) => {data.isDisabled = val !== 1;},
    {deep: true}
);
watch(
    () => [data.addressSpecific, data.addressDetailed],
    (val) => {data.form.address = val[0] + val[1];},
    {deep: true}
);

watch(
    () => data.form.toEmail,
    (val) => {
      if (val) {
        if (!/^([.a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+$/.test(data.form.toEmail)) {
          data.showCode = false;
        } else {
          data.showCode = true;
        }
      }
    },
    {deep: true}
);

//TODO：快照上传
const getSnapshot = () => {
  setTimeout(() => {
    //获取dom
    const vditor_dom = document.getElementById("Article");
    //使用html2canvas插件截图（在>1500px左右的情况，存在生成白边遮挡）
    html2canvas(vditor_dom, {
      allowTaint: true,
      useCORS: true,
      height: vditor_dom.scrollHeight + 100,
      windowHeight: vditor_dom.scrollHeight + 100,
    }).then((canvas) => {
      //将截图转换为base64
      let base64 = canvas.toDataURL("image/png");
    });
  }, 2000);
};
// 投递信件
const deliveryEmail = async () => {
  //获取撰写内容
  data.form.content = vditor.value.getValue();
  data.form.contentHtml = vditor.value.getHTML();

  if (data.form.title == null) {
    this.$message.error("请输入标题");
    return;
  }
  if (data.form.content == null) {
    this.$message.error("请输入内容");
    return;
  }

  //渲染
  await Vditor.preview(document.getElementById("Article"), vditor.value.getValue(), {
  mode: "dark", hljs: {style: "github-dark",},
});

  data.isMasking = true;
  //高斯模糊
  data.isFilter = "Filter: blur(6px)";

  // 加载动画
  const loading = Loading.service({
    lock: true,
    text: data.loadingText,
    background: "rgba(255, 255, 255, 0.7)",
  });

  loading.setText("正在投递时空信件，穿梭中...");

  getSnapshot();

  await this.$http.post("/timeMail/add", data.form).then((res) => {
    if (res.data.code === 200) {
      setTimeout(() => {
        data.isMasking = false;
        data.isFilter = '';
        loading.close();
        this.$notify({
          title: '成功',
          message: '投递成功',
          type: 'success'
        });
      }, 2000);
    } else {
      setTimeout(() => {
        data.isMasking = false;
        data.isFilter = '';
        loading.close();
        this.$notify.error({
          title: '失败',
          message: res.data.msg,
          duration: 3000,
          type: "error"
        });
      }, 2000);
    }
  });
};

// 舍弃信件
const discardEmail = () => {
  //刷新页面 TODO: 优化，使用弹出提示,存储快照
  window.location.reload();
};
</script>

<style scoped>
body {
  background-color: #EBF5FF !important;
}

#Email-BigBox {
  min-width: 600px;
  margin: 20px auto 0 auto;
  background-color: #FFFFFF;
  /* 圆角 */
  border-radius: 15px;
  display: flex;
}

#Email-BigBox .Principal-left {
  width: 25%;
  background-color: #F5FCFA;
  border-radius: 15px;
  padding: 10px;
}

#Email-BigBox .Principal-right {
  width: 70%;
  height: 100%;
  background-color: #FFFFFF;
  padding: 20px 0;
  border-radius: 0 15px 15px 0;
}

.Principal-right .right-title {
  font-size: 25px;
  color: #000000 !important;
  font-family: "幼圆";
  /* 居中 */
  text-align: center;
  margin-top: 10px;
}

.Principal-right .title-p {
  color: #000000 !important;
  /* 居中 */
  text-align: center;
  margin-top: 10px;
}

.Principal-left .text-p {
  text-align: center;
  margin-top: 15px;
  /*font-size: 0.5rem;*/
  font-weight: bold;
  color: #000000 !important;
}

.Principal-left .logo-box img {
  width: 225px;
  margin: 25px auto;
}

.statistics-box {
  margin-top: 110px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.statistics-box .statistics-img {
  width: 25px;
  display: inline-block;
}

.statistics-box .statistics-text {
  display: flex;
  align-items: center;
  /*font-size: 0.5rem;*/
  font-weight: bold;
  margin: 15px 0;
  color: #000000 !important;
}

.statistics-box .statistics-desc {
  margin: 0 0 0 0.8rem;
  color: #5B9CFC;
}

.statistics-box .statistics-number {
  margin: 0 0.8rem;
  color: #F46317;
}

.statistics-box .statistics-unit {
  color: #5B9CFC;
}

.gzh-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 128px;
}

.gzh-box .gzh-img {
  width: 130px;
  margin: 10px 0;
}

.gzh-box p {
  /*font-size: 0.5rem;*/
  font-weight: bold;
  color: #000000 !important;
}

.from-email {
  margin-top: 30px;
}

.from-email .email-info {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 0 auto;
  max-width: 80%;
}

.email-info .span-desc {
  min-width: 100px;
  color: #000000 !important;

}

.email-info{
  margin-top: 30px !important;
}

.email-but-action{
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 45px 0 30px 0 !important;
}

.email-but-action .el-button{
  margin: 0 30px !important;
  width: 200px !important;
}

.treaty-text{
  margin-left: 10px;
  color: #000000;
}

.treaty-text a{
  color: #5B9CFC;
}

.email-vditor{
  align-items: flex-start !important;
}

#ArticleMasking{
  background-color: rgba(0, 0, 0, 0.3);
  /* 覆盖整个页面 */
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 999;
  display: flex;
  justify-content: space-around;
  width: 100%;
}

#ArticleMasking #Article{
  max-width: 700px;
  min-width: 500px;
  background-color: #ffffff;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.3);
  margin: 20px 20px;
}

/* Vditor样式覆盖 */
.vditor-toolbar{
  padding: 0 9px !important;
}

/* element-plus css覆盖 */
:root {
  --el-border-color: transparent !important;
}

.el-input__wrapper:hover,.el-textarea__inner:hover {
  box-shadow: 0 0 0 0 !important;
}

.el-input,.el-textarea {
  --el-input-focus-border-color: transparent !important;
  --el-input-bg-color: #F6F6F6 !important;
}

/* 全局美化滚动条 */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  width: 6px;
  background: rgba(#101F1C, 0.1);
  -webkit-border-radius: 2em;
  -moz-border-radius: 2em;
  border-radius: 2em;
}

::-webkit-scrollbar-thumb {
  background-color: rgba(144, 147, 153, .5);
  background-clip: padding-box;
  min-height: 28px;
  -webkit-border-radius: 2em;
  -moz-border-radius: 2em;
  border-radius: 2em;
  transition: background-color .3s;
  cursor: pointer;
}

::-webkit-scrollbar-thumb:hover {
  background-color: rgba(144, 147, 153, .3);
}
</style>
