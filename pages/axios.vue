<template>
  <section class="container">
    <h1>{{title}}</h1>
    <p>{{message}}</p>
    <input v-model="find" />
    <button @click="getData">Click</button>
    <hr />

    <table>
      <tr>
        <th>Email</th>
        <td>
          <input v-model="email" />
        </td>
        <td>
          <button @click="delData">Click</button>
        </td>
      </tr>
    </table>

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
let url = "https://my-project-1541485512930.firebaseio.com/person";

export default {
  data: function() {
    return {
      title: "Axios",
      message: "axios sample.",
      email: "",
      json_data: {}
    };
  },
  methods: {
    delData: function() {
      // 削除するためのアドレス  https://プロジェクト名.firebaseio.com/person/キー.json
      let del_url = url + "/" + this.email + ".json";

      axios.delete(del_url).then(response => {
        this.message = this.email + "を削除しました。";
        this.email = "";
        this.getData();
      });
    },
    getData: function() {
      // GET通信
      axios
        .get(url + ".json")
        // thenで成功した場合の処理をかける
        .then(response => {
          this.message = "get All Data";
          this.json_data = response.data; // responseの中のdataに検索したデータが入ってる
        })
        // catchでエラー時の挙動を定義する
        .catch(error => {
          this.message = "ERROR!";
          // json_dataに空のオブジェクトを代入
          this.json_data = {};
        });
    }
  },
  // createdフックはインスタンスが生成された後にコードを実行したいときに使われます。
  created: function() {
    // これで初期画面に一覧を出してる
    this.getData();
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
