<template>
   <div class="container">
      <p>{{newsDetails.title}}</p>
      <p><img class="image-fit" v-bind:src="newsDetails.urlToImage" /></p>
      <p>{{newsDetails.content}}</p>
   </div>
</template>
<script>

export default {
  name: 'NewsDetail',
  data() {
    return {
      newsDetails: this.$store.getters.newsDetails
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
  background-image: url('../assets/bgrd.jpg')
}
.image-fit{
  height: 50%;
  width: 50%;
  object-fit: cover;
}
</style>
