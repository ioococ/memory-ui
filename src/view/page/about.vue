<template>
  <div>
    <!-- 两句诗 -->
    <div class="my-animation-slide-top">
      <twoPoem :isHitokoto="false"></twoPoem>
    </div>

    <div style="background: var(--background)" class="my-animation-slide-bottom">
      <div class="about-wrap">
        <h1 style="font-size: 40px;font-weight: 500;letter-spacing: 5px;">今天的心情如何呢</h1>
        <!-- 对话框 -->
        <div class="about-box">
          <h4>与小忆对话中...</h4>
          <div v-if="sayShow" id="say-container"></div>
        </div>
      </div>

      <!-- 页脚 -->
      <myFooter></myFooter>
    </div>
  </div>
</template>

<script>
  const twoPoem = () => import( "../../components/funny/twoPoem.vue");
  const myFooter = () => import( "../../components/skeleton/myFooter.vue");

  export default {
    components: {
      twoPoem,
      myFooter
    },
    data() {
      return {
        sayShow: false,
        sayContent: [{
            "talk": ["Hi！👋", "今天的心情如何呢~", "赶紧记录下来吧！"],
            "reply": ["元气满满！😎", "还不错！😃", "平静 😐", "低迷 😌", "很难说 😶", "怒火中烧！😡"]
          }
        ],
        sayIndex: 0
      }
    },

    computed: {},

    watch: {},

    created() {
      setTimeout(() => {
        this.sayShow = true;
        this.say();
      }, 2000);
    },

    mounted() {},

    methods: {
      answer(index, value) {
        $(".say-select").remove();

        let htmlStr = `<div class="say-right my-animation-slide-bottom"><span class="say-item-right">${value}</span></div>`;
        let frag = document.createRange().createContextualFragment(htmlStr);
        document.getElementById("say-container").appendChild(frag);
        if (index === 0) {
          setTimeout(() => {this.say();}, 500);
        } else {
          let htmlStr = `<div class="say-left my-animation-slide-bottom">
                            <span class="say-item-left">加油噢！</span>
                        </div>`;
          let frag = document.createRange().createContextualFragment(htmlStr);
          document.getElementById("say-container").appendChild(frag);
        }
      },
      say() {
        if (!this.$common.isEmpty(this.sayContent[this.sayIndex]) && !this.$common.isEmpty(this.sayContent[this.sayIndex].talk)) {
          this.sayContent[this.sayIndex].talk.forEach((value, index, talk) => {
            setTimeout(() => {
              let htmlStr = `<div class="say-left my-animation-slide-bottom"><span class="say-item-left">${value}</span></div>`;
              let frag = document.createRange().createContextualFragment(htmlStr);
              document.getElementById("say-container").appendChild(frag);
              if (talk.length === index + 1) {
                if (!this.$common.isEmpty(this.sayContent[this.sayIndex].reply)) {
                  setTimeout(() => {
                    if (this.sayContent[this.sayIndex].reply.length === 6) {
                      let reply0 = this.sayContent[this.sayIndex].reply[0];
                      let reply1 = this.sayContent[this.sayIndex].reply[1];
                      let reply2 = this.sayContent[this.sayIndex].reply[2];
                      let reply3 = this.sayContent[this.sayIndex].reply[3];
                      let reply4 = this.sayContent[this.sayIndex].reply[4];
                      let reply5 = this.sayContent[this.sayIndex].reply[5];
                      let htmlStr = `<div class="say-left my-animation-slide-bottom">
                                    <span class="say-select">${reply0}</span>
                                    <span class="say-select">${reply1}</span>
                                    <span class="say-select">${reply2}</span>
                                    <span class="say-select">${reply3}</span>
                                    <span class="say-select">${reply4}</span>
                                    <span class="say-select">${reply5}</span>
                                    </div>`;
                      let frag = document.createRange().createContextualFragment(htmlStr);
                      document.getElementById("say-container").appendChild(frag);
                      document.getElementsByClassName("say-select")[0].onclick = () => {this.answer(0, reply0);}
                      document.getElementsByClassName("say-select")[1].onclick = () => {this.answer(1, reply1);}
                      document.getElementsByClassName("say-select")[2].onclick = () => {this.answer(2, reply2);}
                      document.getElementsByClassName("say-select")[3].onclick = () => {this.answer(3, reply3);}
                      document.getElementsByClassName("say-select")[4].onclick = () => {this.answer(4, reply4);}
                      document.getElementsByClassName("say-select")[5].onclick = () => {this.answer(5, reply5);}
                    } else if (this.sayContent[this.sayIndex].reply.length === 1) {
                      let reply0 = this.sayContent[this.sayIndex].reply[0];
                      let htmlStr = `<div class="say-left my-animation-slide-bottom"><span class="say-select">${reply0}</span></div>`;
                      let frag = document.createRange().createContextualFragment(htmlStr);
                      document.getElementById("say-container").appendChild(frag);
                      document.getElementsByClassName("say-select")[0].onclick = () => {
                        this.answer(0, reply0);
                      }
                    }
                    this.sayIndex += 1;
                  }, 500);
                }
              }
            }, index * 500);
          });
        }
      }
    }
  }
</script>

<style>

  .about-wrap {
    text-align: center;
    width: 95%;
    max-width: 800px;
    margin: 0 auto;
    padding: 40px 20px 80px;
  }

  .about-box {
    min-height: 450px;
    padding: 5px;
    background-color: var(--maxMaxLightGray);
    border-radius: 10px;
  }

  .say-item-left {
    padding: 5px 12px;
    border-radius: 1rem;
    color: var(--maxGreyFont);
    background-color: var(--lightGray);
  }

  .say-item-right {
    padding: 5px 12px;
    border-radius: 1rem;
    color: var(--white);
    background-color: var(--translucent);
  }

  .say-left {
    display: flex;
    justify-content: left;
    margin: 15px;
  }

  .say-right {
    display: flex;
    justify-content: right;
    margin: 15px;
  }

  .say-select {
    cursor: pointer;
    background: var(--black);
    border-radius: 5px;
    padding: 5px 10px;
    margin-right: 12px;
    margin-top: 20px;
    color: var(--white);
    border: 1px solid var(--black);
  }

  .say-select:hover {
    border: 1px solid var(--themeBackground);
    color: var(--themeBackground);
    box-shadow: 0 0 5px var(--themeBackground);
  }
</style>
