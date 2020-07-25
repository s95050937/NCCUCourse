<template>
  <div>
    <el-calendar 
      v-model="today"
      first-day-of-week="7"
    >
      <template
        slot="dateCell"
        slot-scope="{date, data}">
        <!-- <p @click="dateClick(date, data)">
          {{ data.day.split('-').slice(1).join('-') }} 
        </p> -->
        <div>
          <span>{{ data.day.split('-').slice(2).join('-') }}</span>
          <p class="journey-text">{{ journey[data.day] }}</p>
        </div>
      </template>
    </el-calendar>
  </div>
</template>

<script>
export default {
  name: 'Calendar',
  data() {
    return {
      today: new Date(),
      journey: {
        '2020-07-25': '跑步123456456456',
        '2020-07-26': '跑步'
      }
    }
  },
  methods: {
    dateClick(date, data) {
      console.log(date);
      console.log(data);
      console.log(data.day.split('-').slice(1));
    }
  },
  computed: {
    journeyShow(day) {
      return this.journey[day].slice(0, 5) 
    }
  }
}
</script>

<style lang="less" scoped>
.journey-text {
  overflow:hidden;
  text-overflow:ellipsis;
  white-space:nowrap;
}
</style>

