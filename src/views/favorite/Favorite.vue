<template>
  <div ref="favor">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>我的最愛</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-table
        :data="favorCourseList"
        border
        stripe
        height="450"  
        
        row-key="course"
      >
      <!-- v-loading="loading" -->
        <el-table-column
          type="index"
        >
        </el-table-column>
        <el-table-column
          prop="course"
          label="科目代碼"
          header-align="center"  
          align="center"
        >
          <template slot-scope="scope">
            <div>
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
          width="80px"
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
          <template slot-scope="scope">
            <div @click="copyContent(scope.row.realTime)">
              {{scope.row.realTime}}
              <el-button  type="text" size="medium"
                v-clipboard:copy="scope.row.realTime"     
                v-clipboard:success="CopyIdSuccess"
                v-clipboard:error="CopyIdWrong"
              >
                <i class="el-icon-copy-document"></i>
              </el-button>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="Classroom"
          label="上課地點"
          header-align="center"  
          align="center"
        >
          <template slot-scope="scope">
            <div class="course-building" @click="schoolMapShow(scope.row.Classroom)">
              {{scope.row.Classroom}}
            </div>
          </template>
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
        <el-table-column
          label="移除最愛"
          header-align="center"  
          align="center"
          width="80px"
        >
          <template slot-scope="scope">
            <div>
              <el-button size="mini" type="danger" icon="el-icon-delete-solid" @click="delFavor(scope.row.course)" 
              
              >

              </el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 對話框 -->
    <!-- 教學大綱 -->
    <el-dialog
      title="教學大綱"
      :visible.sync="outlineDialogVisible"
      width="65%"
      center
      top='15px'
    >
      <iframe :src="NCCUCourseURL" frameborder="0" class="dialogue-content"></iframe>
    </el-dialog>
    <!-- 學校地圖 -->
    <el-dialog
      title="校內地圖"
      :visible.sync="schoolMapDialogVisible"
      width="65%"
      center
      top='15px'
    >
      <iframe :src="NCCUMapURL" frameborder="0" class="dialogue-content"></iframe>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 這樣寫會出問題
      // favorCourseList: this.$store.state.favorCourseList,
      list: [],
      outlineDialogVisible: false,
      currentCourseIdObj: {
        num: '202003',
        gop: '',
        s: ''
      },
      schoolMapDialogVisible: false,
      currentBuildingId: 0
    }
  },
  computed: {
    favorCourseList() {
      return this.$store.state.favorCourseList
    },
    NCCUCourseURL() {
      // return 'https://newdoc.nccu.edu.tw/teaschm/1091/schmPrv.jsp-yy=109&smt=1&num=202003&gop=00&s=1.html'
      return 'https://newdoc.nccu.edu.tw/teaschm/1091/schmPrv.jsp-yy=109&smt=1&num='+ this.currentCourseIdObj.num +'&gop='+ this.currentCourseIdObj.gop + '&s='+ this.currentCourseIdObj.s +'.html'
    },
    NCCUMapURL() {
      return 'https://sgnweb.nccu.edu.tw/mnccuqa/NCCU_MAP-gh-pages/NCCU_MAP-gh-pages/index.html?blid=' + this.currentBuildingId
    },
  },
  methods: {
    CopyIdSuccess() {
      this.$message.success('複製成功')
    },
    CopyIdWrong() {
      this.$message.error('複製成功')
    },
    schoolMapShow(classroom) {
      this.currentBuildingId = classroom.slice(-6, -4)
      console.log(classroom.slice(-6, -4));
      this.schoolMapDialogVisible = true
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
    delFavor(id) {
      this.$store.commit('delFavorCourse', id)
      
    }
  }
}
</script>

<style>

</style>