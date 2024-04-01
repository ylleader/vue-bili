<template>
  <div class="nf-container">
    <div class="nf-content">
      <h1>
        找不到页面啦！
      </h1>
      <h2>
        小编可能还在玩命开发页面
      </h2>
      <div class="tip">
        你要访问的页面资源不存在，或者作者还在开发中，你现在可以：
      </div>
      <div class="btn-box">
        <div class="return-btn" @click="rt">
          返回首页
        </div>
        <div class="back-btn" @click="bk">
          返回上一页
        </div>
      </div>


    </div>

    <div>
      <img src="@/assets/images/error/401.gif" alt="404">
    </div>

  </div>
</template>

<script>
export default {
  name: 'NF',
  methods: {
    rt(){
      this.$router.push('/')
    },
    bk() {
      this.$router.back()
    }
  }

}
</script>

<style lang="scss" scoped>
.nf-container {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;

  .nf-content {
    margin-right: 60px;
    // display: flex;
    // flex-direction: column;

    h1 {
      font-size: 60px;
      margin-bottom: 20px;
      color: #484848;
    }

    h2 {
      font-weight: 500;
      margin-bottom: 10px;
    }

    .tip {
      font-size: 14px;
      color: gray;
    }

    .btn-box {
      display: flex;
      align-self: flex-end;
      margin-top: 20px;

      .return-btn,
      .back-btn {
        padding: 8px 18px;
        border-radius: 6px;
        font-weight: bold;
        font-size: 14px;
        cursor: pointer;
      }

      .return-btn {
        border: 1px solid rgb(227, 229, 231);
        margin-right: 20px;

        &:hover {
          background-color: rgb(227, 229, 231);
        }
      }

      .back-btn {
        background-color: #00a1d6;
        color: white;
        border: 1px solid #00a1d6;

        &:hover {
          background: #33b4de;
        }
      }

    }

  }

}
</style>