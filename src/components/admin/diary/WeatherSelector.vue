<template>
    <div class="weather-selector">
        <div class="weather" @click="chooseWeather(item.english)" v-for="item in weatherList" :key="item.english">
            <img :src="selected === item.english ?
             SVG_ICONS.weather_icons[item.english + '_filled'] : SVG_ICONS.weather_icons[item.english +'_lined']"
                :alt="item.name" :title="item.name">
        </div>
    </div>
</template>

<script>
import SVG_ICONS from "@/assets/icons/SVG_ICONS.js";
import constant from "@/utils/constant";

export default {
  data() {
    return {
      weatherList: [],
      selected: null
    }
  },

  computed: {
    SVG_ICONS() {
      return SVG_ICONS
    }
  },

  watch: {
  },

  created() {
  },


  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.weatherList = Object.values(constant.weather);
    },
    chooseWeather(weather) {
      this.selected = weather;
      this.$emit("weather", this.selected)
    }
  }
}
</script>

<style lang="scss" scoped>

$height-weather: 30px;

.weather-selector{
  border: 1px solid #ccc;
  border-radius: 5px;
  display: flex;
  justify-content: flex-start;
  flex-flow: row wrap;
  padding: 20px;
  background-color: white;
  .weather{
    border-radius: 50px;
    //@extend .unselectable;
    padding: 7px;
    display: block;
    font-weight: bold;
    cursor: pointer;
    flex-shrink: 0;
    &:hover{
      background-color: #1abc9c;
    }
    img{
      //@extend .unselectable;
      margin: 0 auto;
      height: 40px;
      width: 40px;
      display: block;
    }
  }
}

</style>
