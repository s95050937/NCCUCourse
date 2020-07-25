<template>
  <div class="home">
    <h1>HI!</h1>
    
  </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios'

export default {
  name: 'Home',
  components: {
  },
  data() {
    return {
      courseList: [],
      courseByDateList: {
        mon: [],
        tue: [],
        wed: [],
        thur: [],
        fri: [],
        sat: [],
        sun: []
      }
    }
  },
  created() {
    
  },
  mounted() {
    
    // 獲得課程data並分類
    axios.get('/data2.json').then(res => {
      for (let index = 0; index < res.data.length; index++) {
        this.courseList.push(res.data[index])        
      }
      let courseList = res.data
      console.log(courseList);
      // time有可能是undefined，則undefined沒有[0]這個方法
      for (let index = 0; index < this.courseList.length; index++) {
        if (!this.courseList[index].time) {
          // console.log(this.courseList[index]);
        } else {
          switch (this.courseList[index].time[0]) {
            case '一':
              this.courseByDateList.mon.push(this.courseList[index])
              break;
            case '二':
              this.courseByDateList.tue.push(this.courseList[index])
              break;
            case '三':
              this.courseByDateList.wed.push(this.courseList[index])
              break;
            case '四':
              this.courseByDateList.thur.push(this.courseList[index])
              break;
            case '五':
              this.courseByDateList.fri.push(this.courseList[index])
              break;
            case '六':
              this.courseByDateList.sat.push(this.courseList[index])
              break;
            case '日':
              this.courseByDateList.sun.push(this.courseList[index])
              break;
          }
        }
      }
    })
    console.log(this.courseList);
    console.log(this.courseByDateList);
    
    
    
  },
  
}
</script>
