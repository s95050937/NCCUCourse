<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首頁</el-breadcrumb-item>
      <el-breadcrumb-item>星期制</el-breadcrumb-item>
      <el-breadcrumb-item>{{currentTWDate}}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <el-input placeholder="請輸入內容" v-model="searchData" class="input-with-select" @change="searchFinalChange" clearable @input="searchChange">
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>

      <el-table
        :data="currentList"
        border
        stripe
        height="450"  
        v-loading="loading"
      >
        <el-table-column
          type="selection"
          width="55"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="course"
          label="科目代碼"
          header-align="center"  
          align="center"
        >
          <template slot-scope="scope">
            <div @click="copyContent(scope.row.course)">
              {{scope.row.course}}
              <el-button  type="text" size="medium"
                v-clipboard:copy="scope.row.course"     
                v-clipboard:success="CopyIdSuccess"
                v-clipboard:error="CopyIdWrong"
              >
                <i class="el-icon-copy-document"></i>
              </el-button>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="科目名稱"
          header-align="center" 
        >
        <template slot-scope="scope">
          <div class="course-name" @click="outlineShow(scope.row.course)">
            {{scope.row.name}}
          </div>
        </template>
        </el-table-column>
        <el-table-column
          prop="instructor"
          label="教師姓名"
          header-align="center"  
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="point"
          label="學分"
          header-align="center"  
          align="center"
        >
          <template slot-scope="scope">
            <el-tag type="success" size="mini" v-if="scope.row.point == 3">3</el-tag>
            <el-tag type="warning" size="mini" v-else-if="scope.row.point == 2">2</el-tag>
            <el-tag type="danger" size="mini" v-else-if="scope.row.point == 1">1</el-tag>    
            <el-tag type="info" size="mini" v-else>0</el-tag>    
          </template>
        </el-table-column>
        <el-table-column
          prop="realTime"
          label="上課時間"
          header-align="center"  
          align="center"
          sortable
          :sort-by="['realTime', 'Department']"
        >

        </el-table-column>
        <el-table-column
          prop="Classroom"
          label="上課地點"
          header-align="center"  
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="Department"
          label="開課單位"
          header-align="center"  
          align="center"
          sortable
          :sort-by="['Department', 'realTime']"
        >
        </el-table-column>
      </el-table>
      
    </el-card>

    <!-- 對話框 -->
    <el-dialog
      title="教學大綱"
      :visible.sync="outlineDialogVisible"
      width="65%"
      center
      top='15px'
    >
      <iframe :src="NCCUCourseURL" frameborder="0" class="nccu-content"></iframe>
    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: "date",
  data() {
    return {
      courseByDateList: {
        mon: [],
        tue: [],
        wed: [],
        thur: [],
        fri: [],
        sat: [],
        sun: []
      },
      currentDate: this.$route.params.time,
      currentList: [],
      searchData: '',
      dateObj: {
        mon: '星期一',
        tue:'星期二',
        wed:'星期三',
        thur:'星期四',
        fri:'星期五',
        sat:'星期六',
        sun:'星期日',
      },
      outlineDialogVisible: false,
      currentCourseIdObj: {
        num: '202003',
        gop: '',
        s: ''
      }
    }
  },
  computed: {
    loading() {
      if (this.currentList.length == 0) {
        return true
      } else {
        return false
      }
    },
    // 星期名
    currentTWDate() {
      return this.dateObj[this.currentDate]
    },
    NCCUCourseURL() {
      // return 'https://newdoc.nccu.edu.tw/teaschm/1091/schmPrv.jsp-yy=109&smt=1&num=202003&gop=00&s=1.html'
      return 'https://newdoc.nccu.edu.tw/teaschm/1091/schmPrv.jsp-yy=109&smt=1&num='+ this.currentCourseIdObj.num +'&gop='+ this.currentCourseIdObj.gop + '&s='+ this.currentCourseIdObj.s +'.html'
    }
    
  },
  // beforeUpdate() {
  //   this.loading = true
  // },
  // updated() {
  //   this.loading = false
  // },
  created() {
    console.log(this.$route.params.time);
  },
  mounted() {
    axios.get('/data4.json').then(res => {
      let courseList = res.data
      this.courseList = courseList
      // time有可能是undefined，則undefined沒有[0]這個方法
      for (let index = 0; index < courseList.length; index++) {
        if (!courseList[index].time) {
          // console.log(this.courseList[index]);
        } else {
          switch (courseList[index].time[0]) {
            case '一':
              this.courseByDateList.mon.push(courseList[index])
              break;
            case '二':
              this.courseByDateList.tue.push(courseList[index])
              break;
            case '三':
              this.courseByDateList.wed.push(courseList[index])
              break;
            case '四':
              this.courseByDateList.thur.push(courseList[index])
              break;
            case '五':
              this.courseByDateList.fri.push(courseList[index])
              break;
            case '六':
              this.courseByDateList.sat.push(courseList[index])
              break;
            case '日':
              this.courseByDateList.sun.push(courseList[index])
              break;
          }
        }
      }
    })

    // 現在畫面星期幾
    let currentDate = this.currentDate
    this.currentList = this.courseByDateList[currentDate]
    // }
    console.log(this.currentDate);
  },
  methods: {
    intoPagination(pageSize, currentPage, arr) {
      let skipNum = (currentPage - 1) * pageSize;
      let newArr = (skipNum + pageSize >= arr.length) ? arr.slice(skipNum, arr.length) : arr.slice(skipNum, skipNum + pageSize);
      return newArr;
    },
    searchFinalChange() {
      let searchData = this.searchData
      this.currentList = this.courseByDateList[this.currentDate]
      if (searchData) {
        this.currentList = this.currentList.filter(course => {
          return Object.keys(course).some( key => {
            return String(course[key]).toLowerCase().indexOf(searchData) > -1
          })
        })
      } else {
        this.currentList = this.courseByDateList[this.currentDate]
      }
    },
    searchChange() {
      if (!this.searchData) {
        this.currentList = this.courseByDateList[this.currentDate]
      }
    },
    outlineShow(courseId) {
      this.currentCourseIdObj.num = courseId.slice(0, 6)
      this.currentCourseIdObj.gop = courseId.slice(6, 8)
      this.currentCourseIdObj.s = courseId.slice(8, 10)
      // console.log(courseId.slice(0, 6));
      // console.log(courseId.slice(6, 8));
      // console.log(courseId.slice(8, 10));
      this.outlineDialogVisible = true
    },
    copyContent(row) {
      console.log(row);
    },
    CopyIdSuccess() {
      this.$message.success('複製成功')
    },
    CopyIdWrong() {
      this.$message.error('複製成功')
    },
  },
}
</script>

<style>
.el-input {
  max-width: 600px;
  margin-bottom: 30px;
}
.course-name:hover {
  cursor: pointer;
  color: brown;
}
.nccu-content {
  width: 100%;
  height: 500px;
}

</style>