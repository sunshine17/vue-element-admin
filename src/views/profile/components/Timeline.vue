<template>
  <div class="block">
    <el-timeline>
      <el-timeline-item v-for="(item,index) of timeline" :key="index" :timestamp="item.timestamp" placement="top">
        <el-card>
          <h4>{{ item.title }}</h4>
          <p>{{ item.content }}</p>
        </el-card>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<script>
export default {
  data() {
    return {
      timeline: [
        {
          timestamp: '2020/08/06',
          title: 'Initialized.',
          content: '1. Auto detect environment(API mode or front-end dev mode) is ok. 2. Login and some pages is ok.'
        },
        {
          timestamp: '2020/08/01',
          title: 'adjust env',
          content: 'adjust env'
        },
        {
          timestamp: '2020/07/20',
          title: 'Add Getting Started doc.',
          content: 'Add Getting Started doc.'
        },
        {
          timestamp: '2020/07/15',
          title: 'Start project',
          content: 'Start project'
        }
      ]
    }
  }
}
</script>
