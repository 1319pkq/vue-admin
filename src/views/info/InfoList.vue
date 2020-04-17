<template>
  <div class="infoList">
    <!-- 头 -->
    <el-row :gutter="10">
      <el-col :span="4">
        <div class="label-warp category">
          <label for>类型:</label>
          <div class="warp-content">
            <el-select v-model="genreValue" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                style="width:100%"
              ></el-option>
            </el-select>
          </div>
        </div>
      </el-col>
      <el-col :span="7">
        <div class="label-warp date">
          <label for>日期:</label>
          <div class="warp-content">
            <el-date-picker
              v-model="dateValue"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              style="width:100%"
            ></el-date-picker>
          </div>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="label-warp key-word">
          <label for>关键字:</label>
          <div class="warp-content">
            <el-select v-model="keywordValue" placeholder="请选择">
              <el-option
                v-for="item in keyword"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                style="width:100%"
              ></el-option>
            </el-select>
          </div>
        </div>
      </el-col>
      <el-col :span="5">
        <el-input v-model="search_keyword" placeholder="请输入内容" style="width:100%"></el-input>
      </el-col>
      <el-col :span="2">
        <el-button type="danger" style="width:100%">搜索</el-button>
      </el-col>
      <el-col :span="2">
        <el-button type="danger" style="width:100%" @click="dialog = true">新增</el-button>
      </el-col>
    </el-row>

    <!-- 表格数据 -->
    <el-table :data="tableData" border style="width: 100%" class="margin-top-30">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="title" label="标题" width="500"></el-table-column>
      <el-table-column prop="category" label="类别" width="100"></el-table-column>
      <el-table-column prop="date" label="日期" width="200"></el-table-column>
      <el-table-column prop="user" label="管理员" width="100"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="danger">删除</el-button>
          <el-button size="mini" type="success" @click="dialog = true">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 底部分页 -->
    <el-row :gutter="10" class="margin-top-30">
      <el-col :span="8">
        <el-button size="mediu">批量删除</el-button>
      </el-col>
      <el-col :span="16">
        <el-pagination
          class="pull-right"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          background
          :page-sizes="[10, 20, 30, 40]"
          :total="1000"
          layout="total,sizes, prev, pager, next, jumper"
        ></el-pagination>
      </el-col>
    </el-row>

    <!-- 弹窗 -->
    <el-dialog title="新增" :visible.sync="dialog" width="30%">
      <el-form :model="form">
        <el-form-item label="类型:" :label-width="formLabelWidth">
          <el-select v-model="form.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="标题:" :label-width="formLabelWidth">
          <el-input v-model="form.name" placeholder="请输入标题..."></el-input>
        </el-form-item>
        <el-form-item label="概括:" :label-width="formLabelWidth">
          <!-- <el-input v-model="form.name" placeholder="请输入内容..."></el-input> -->
          <el-input type="textarea" :rows="2" placeholder="请输入内容..." v-model="textarea"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialog = false">取 消</el-button>
        <el-button type="danger" @click="dialog = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "infoList",
  data() {
    return {
      // ***头部数据
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        }
      ],
      genreValue: "",
      dateValue: "",
      // 关键字
      keyword: [
        {
          value: "1",
          label: "ID"
        },
        {
          value: "2",
          label: "标题"
        }
      ],
      keywordValue: "",
      search_keyword: "",
      // ***表格数据
      tableData: [
        {
          title: "纽约市长白思豪宣布退出总统竞选 特朗普发推回应",
          category: "国内信息",
          date: "2019-4-16 17:52:30",
          user: "pkq"
        },
        {
          title:
            "纽约市长白思豪宣布退出总统竞选 特朗普发推回应.纽约市长白思豪宣布退出总统竞选 特朗普发推回应.纽约市长白思豪宣布退出总统竞选 特朗普发推回应",
          category: "国内信息",
          date: "2019-4-16 17:52:30",
          user: "pkq"
        },
        {
          title: "纽约市长白思豪宣布退出总统竞选 特朗普发推回应",
          category: "国内信息",
          date: "2019-4-16 17:52:30",
          user: "pkq"
        }
      ],
      // ***弹窗
      dialog: false,
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      formLabelWidth: "80px",
       textarea: ''
    };
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../styles/config.scss";

.label-warp {
  &.category {
    @include labelDom(left, 60, 40);
  }
  &.date {
    @include labelDom(right, 50, 40);
  }
  &.key-word {
    @include labelDom(left, 60, 40);
  }
}
</style>