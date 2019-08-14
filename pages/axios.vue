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
      </tr>
      <tr>
        <th>Name</th>
        <td>
          <input v-model="username" />
        </td>
      </tr>
      <tr>
        <th>Tel</th>
        <td>
          <input v-model="tel" />
        </td>
      </tr>
      <tr>
        <th>age</th>
        <td>
          <input v-model="age" />
        </td>
      </tr>
      <tr>
        <th></th>
        <td>
          <button @click="addData">Click</button>
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
      find: "",
      email: "",
      tel: "",
      age: 0,
      json_data: {}
    };
  },
  methods: {
    addData: function() {
      // 追加するためのアドレス   https://プロジェクト名.firebaseio.com/person/キー.json
      let add_url = url + "/" + this.email + ".json";

      let data = {
        name: this.username,
        age: this.age,
        tel: this.tel
      };

      // POST通信
      axios.put(add_url, data).then(responce => {
        // putに成功したら、各データを初期状態にもどして、
        this.email = "";
        this.username = "";
        this.age = 0;
        this.tel = "";
        // 一覧を表示する
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
