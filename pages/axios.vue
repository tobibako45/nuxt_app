<template>
  <section class="container">
    <h1>{{title}}</h1>
    <p>{{message}}</p>
    <input v-model="find" />
    <button @click="getData">Click</button>
    <hr />
    <ul v-for="(data, key) in json_data">
      <li>
        <strong>{{key}}</strong>
        <br />
        {{data}}
      </li>
    </ul>
  </section>
</template>


<script>
const axios = require("axios");
// 一覧
// let url = "https://my-project-1541485512930.firebaseio.com/person.json";

// 詳細
// let url ="https://my-project-1541485512930.firebaseio.com/person/shogo@maeshiro.json";
// let url = "https://my-project-1541485512930.firebaseio.com/person/";

// インデックスによる検索
let url =
  "https://my-project-1541485512930.firebaseio.com/person.json?orderBy=%22age%22";

export default {
  data: function() {
    return {
      title: "Axios",
      message: "axios sample.",
      find: "",
      json_data: {}
    };
  },
  // 一覧 アクセスはasyncDataに用意してある。
  // asyncData: async function() {
  //
  //   let result = await axios.get(url);
  //   return { json_data: result.data };
  // }
  methods: {
    getData: function() {
      let range = this.find.split(",");
      let age_url = url + "&startAt=" + range[0] + "&endAt=" + range[1];

      // GET通信
      axios
        .get(age_url)
        // thenで成功した場合の処理をかける
        .then(response => {
          this.message = "get: " + range[0] + " < age < " + range[1];
          this.json_data = response.data;
        })
        // catchでエラー時の挙動を定義する
        .catch(error => {
          this.message = "ERROR!";
          // json_dataに空のオブジェクトを代入
          this.json_data = {};
        });
    }
  }
};
</script>

<style>
.container {
  padding: 5px 10px;
}
h1 {
  font-size: 60pt;
  color: #345980;
}
p {
  padding-top: 5px;
  font-size: 20pt;
}
div {
  font-size: 14pt;
}
pre {
  padding: 10px;
  font-size: 18pt;
  background-color: #efefef;
  white-space: pre-wrap;
}
hr {
  margin: 10px 0px;
}
tr th {
  width: 150px;
  background-color: darkblue;
  color: white;
  font-size: 16pt;
}
tr td {
  padding: 5px 10px;
  background-color: #eef;
  font-size: 14pt;
}
input {
  font-size: 14pt;
}
button {
  font-size: 14pt;
}
ul {
  margin: 0px 10px;
  background-color: aliceblue;
}
li {
  padding: 10px;
  font-size: 16pt;
}
</style>
