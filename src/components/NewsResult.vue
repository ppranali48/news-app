<template>
   <div class="main-container">
      <div class="table-container">
         <h3>News Data</h3>
         <div class="form-group">
            <input v-model="searchInput" placeholder="Enter Keyword" />
            Country: 
            <select v-model="countrySelected">
               <option v-for="country in countries" :key="country.code" :value="country.code">
                  {{ country.name }}
               </option>
            </select>
            Category:
            <select v-model="categorySelected">
               <option v-for="category in categories" :key="category.name">
                  {{ category.name }}
               </option>
            </select>
            <button  @click="search">
            Search
            </button>
         </div>
         <div class="table-row heading">
            <div class="row-item">Title</div>
            <div class="row-item">Author</div>
            <div class="row-item">Published Date</div>
         </div>
         <div  class="table-row" v-for="item in articles" :key="item.title">
            <div class="row-item" @click="newsDetails(item)">{{item.title}} 1</div>
            <div class="row-item">{{item.author}} 1</div>
            <div class="row-item">{{item.publishedAt}} 1</div>
         </div>
      </div>
   </div>
   <button class="button1" :disabled="pageNumber==1" @click="prevPage">
   Previous
   </button>
   <button class="button1" @click="nextPage">
   Next
   </button>
</template>

<script>

import axios from "axios"; //importing the axios a HTTP library to connects the app with the API
export default {
  name: "NewsResult",
  data() {
    return {
      api_key: "c5f4c5bfe69f4b8298780b6e24eddd77",
      articles: [],
      errors: [],
      pageNumber: 1,
      searchInput: "",
      countrySelected: "",
      categorySelected: "",
      searchEnable: false,
      countries: [
        { name: "Argentina", code: "ae" },
        { name: "Austria", code: "at" },
        { name: "	Australia", code: "au" },
        { name: "	Belgium", code: "be" },
        { name: "Bulgaria", code: "bg" },
        { name: "India", code: "in" },
        { name: "Germany", code: "de" },
        { name: "United States of America", code: "us" },
      ],
      categories: [
        { name: "business" },
        { name: "entertainment" },
        { name: "general" },
        { name: "health" },
        { name: "science" },
        { name: "sports" },
        { name: "technology" },
      ],
    };
  },
  created() {
    this.getNewsData();
  },
  methods: {
    newsDetails(item) {
      this.$router.push({ path: "detail" });
      this.$store.commit("addnewsDetails", item);
    },
    nextPage() {
      this.pageNumber++;
      this.searchEnable ? this.getSearchResult() : this.getNewsData();
    },
    prevPage() {
      this.pageNumber--;
      this.searchEnable ? this.getSearchResult() : this.getNewsData();
    },
    getNewsData() {
      axios
        .get(
          "https://newsapi.org/v2/top-headlines?country=us&page=" +
            this.pageNumber +
            "&pageSize=10&apiKey=" +
            this.api_key
        )
        .then((response) => {
          this.articles = response.data.articles;
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
    search() {
      this.searchEnable = true;
      this.getSearchResult();
    },
    getSearchResult() {
      axios
        .get(
          "https://newsapi.org/v2/top-headlines?q=" +
            this.searchInput +
            "&country=" +
            this.countrySelected +
            "&category=" +
            this.categorySelected +
            "&page=" +
            this.pageNumber +
            "&pageSize=10&apiKey=" +
            this.api_key
        )
        .then((response) => {
          this.articles = response.data.articles;
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
  },
};

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.main-container {
  background-image: url('../assets/news.jpg');
  width: 100%;
  height: 100%;
  display: flex;
  margin: 0;
  justify-content: center;
  align-items: center;
  background-color: #fafafa;
}
.table-container {
  background-image: url('../assets/news2.jpg');
  display: flex;
  flex-flow: column nowrap;
  background-color: white;
  width: 80%;
  margin: 0 auto;
  border-radius: 4px;
  border: 1px solid #DADADA;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, .08);
}

.table-row {
  display: flex;
  flex-flow: row nowrap;
  width: 100%;
  border-bottom: 1px solid #dadada;
}

.heading {
  background-color: #ececec;
  color: #3e3e3e;
  font-weight: bold;
}

.row-item {
  display: flex;
  flex: 1;
  font-size: 14px;
  padding: 8px 0;
  justify-content: center;
  align-items: center;
  transition: all 0.15s ease-in-out;
}

.row-item:hover {
  cursor: pointer;
  background-color: #F0F0F0;
/*   box-shadow: 0px 1px 4px rgba(0, 0, 0, .08); */
}
.form-group {
   display: flex;
   flex-direction: row;
   margin-top: 20px;
   justify-content: space-evenly;
   margin-bottom: 20px;
   height:30px;
 }
 .form-group:button {
  width: 100px;
  height: 30px;
  background-color: #eef;
 }

.table-row:last-child,
.row-sub-container .row-item:last-child {
  border-bottom: 0;
}
.button1{
  width:100px;
  height:40px;
  background-color:#eef;
  margin-right: 20px;
  margin-top: 20px;
}

button:hover{
  cursor:pointer;
}
button:hover:disabled{
  cursor:not-allowed;
}
</style>
