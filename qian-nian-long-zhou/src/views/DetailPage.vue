<template>
  <Header />
  <DetailInfo />
</template>

<script>
import Header from '../components/DetailHeader.vue'
import DetailInfo from '../components/DetailInfo.vue'

export default {
  name: 'DetailPage',
  components: {
    Header,
    DetailInfo
  }
}
</script>
