<template>
<div>

  <div v-if="type === 'simple'">
    <div class="container" v-show="title">
      <div class="animated-background size2"></div>
    </div>
    <div class="container wrap">
      <div class="animated-background size12" v-for="x in number"></div>
    </div>
    <div class="container justify-content-end" v-show="button">
      <div class="animated-background size1"></div>
    </div>
  </div>


  <div v-if="type === 'table'">
    <div class="container justify-content-between" v-show="title">
      <div class="animated-background size2"></div>
      <div class="animated-background size1" v-show="buttonTitle"></div>
    </div>
    <div class="container">
      <div class="animated-background flex1 "></div>
    </div>
    <div class="container" v-for="x in number">
      <div class="animated-background size1"></div>
      <div class="animated-background size2 flex1"></div>
    </div>
    <div class="container justify-content-end" v-show="button">
      <div class="animated-background size1"></div>
    </div>
  </div>

  <div v-if="type === 'card'">
    <div class="container justify-content-center align-items-center" v-show="head">
      <div class="animated-background picture"></div>
      <div class="flex1 container wrap" v-show="title">
        <div class="animated-background size6"></div>
        <div class="animated-background size1"></div>
      </div>
    </div>
    <div class="container" v-show="photo" >
      <div class="animated-background photo flex1" v-bind:style="{ 'height': + imageSize + 'px!important' }"></div>
    </div>
    <div v-show="description">
      <div class="container" v-for="x in number">
        <div class="animated-background flex1"></div>
      </div>
      <div class="container">
        <div class="animated-background size1"></div>
      </div>
    </div>
    <div class="container" v-show="button">
      <div class="animated-background size1"></div>
    </div>
  </div>

</div>
</template>

<script>
export default {
  data () {
    return {}
  },
  props: {
    type: {
      type: String,
      required: true
    },
    title: {
      type: Boolean,
      required: false,
      default: true
    },
    button: {
      type: Boolean,
      required: false,
      default: true
    },
    number: {
      type: Number,
      required: false,
      default: 1
    },
    buttonTitle: {
      type: Boolean,
      required: false,
      default: true
    },
    photo: {
      type: Boolean,
      required: false,
      default: true
    },
    description: {
      type: Boolean,
      required: false,
      default: true
    },
    head: {
      type: Boolean,
      required: false,
      default: true
    },
    imageSize: {
      type: Number,
      required: false,
      default: 200
    }
  }
}
</script>

<style scoped>
.container {
  display: flex
}

.column {
  flex-direction: column
}

.wrap {
  flex-wrap: wrap
}

.justify-content-start {
  justify-content: flex-start
}

.justify-content-center {
  justify-content: center
}

.justify-content-end {
  justify-content: flex-end
}

.justify-content-between {
  justify-content: space-between
}

.justify-content-around {
  justify-content: space-around
}

.align-items-start {
  align-items: flex-start
}

.align-items-center {
  align-items: center
}

.align-items-end {
  align-items: flex-end
}

.align-items-baseline {
  align-items: baseline
}

.align-items-stretch {
  align-items: stretch
}

.size1 {
  flex-basis: 100px
}

.size2 {
  flex-basis: 200px
}

.size3 {
  flex-basis: 300px
}

.size4 {
  flex-basis: 400px
}

.size5 {
  flex-basis: 500px
}

.size6 {
  flex-basis: 600px
}

.size8 {
  flex-basis: 800px
}

.size8 {
  flex-basis: 800px
}

.size9 {
  flex-basis: 900px
}

.size10 {
  flex-basis: 1000px
}

.size11 {
  flex-basis: 1100px
}

.size12 {
  flex-basis: 1200px
}

.flex1 {
  flex-grow: 1
}

.flex2 {
  flex-grow: 2
}

.flex3 {
  flex-grow: 3
}

.flex4 {
  flex-grow: 4
}

.flex5 {
  flex-grow: 5
}

.flex6 {
  flex-grow: 6
}

.margin-top-10 {
  margin-top: 10px
}

.margin-top-20 {
  margin-top: 20px
}

.margin-top-30 {
  margin-top: 30px
}

.margin-top-40 {
  margin-top: 40px
}

.margin-top-50 {
  margin-top: 50px
}

.margin-bottom-10 {
  margin-bottom: 10px
}

.margin-bottom-20 {
  margin-bottom: 20px
}

.margin-bottom-30 {
  margin-bottom: 30px
}

.margin-bottom-40 {
  margin-bottom: 40px
}

.margin-bottom-50 {
  margin-bottom: 50px
}

@keyframes placeholder {
  0% {
    background-position: -600px 0
  }
  100% {
    background-position: 600px 0
  }
}

.animated-background {
  animation-duration: 1s;
  animation-fill-mode: forwards;
  animation-iteration-count: infinite;
  animation-name: placeholder;
  animation-timing-function: linear;
  background: #ddd;
  background: linear-gradient(to right, #ddd 8%, #ccc 18%, #ddd 33%);
  background-size: 1200px 100px;
  min-height: 20px;
  margin: 5px 5px 5px 0;
  border-radius: 3px;
  opacity: .5
}

.picture {
  height: 60px;
  width: 60px;
  border-radius: 50%;
  margin-right: 20px
}

.photo {
  height: 200px;
}
</style>
