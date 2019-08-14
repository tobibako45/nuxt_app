<template>
  <section class="container">
    <div class="login" @click="doLogin">[login:{{user_name}}]</div>
    <h1>{{title}}</h1>
    <p class="message">{{message}}</p>
    <div v-if="logined">
      <table>
        <tr>
          <th>Message</th>
          <td>
            <input v-model="msg" size="50" />
          </td>
          <td>
            <button @click="add">投稿</button>
          </td>
        </tr>
      </table>
      <hr />
      <ul v-for="(data, key) in json_data">
        <li>
          <div class="list1">{{data.msg}}</div>
          <div class="list2">{{data.user}} ({{data.posted}})</div>
        </li>
      </ul>
    </div>
  </section>
</template>


<script>
import firebase from "firebase";

const axios = require("axios");

// ※configの内容は、それぞれの環境に合わせて設定
// （FirebaseのAuthenticationの「ウェブ設定」からコピー＆ペースト）
let firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.PROJECT_ID + ".firebaseapp.com",
  databaseURL: "https://" + process.env.PROJECT_ID + ".firebaseio.com",
  projectId: process.env.PROJECT_ID,
  storageBucket: "",
  messagingSenderId: "734054541490",
  appId: "1:734054541490:web:403d82d1309f6a8e"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default {
  data: function() {
    return {
      title: "Board",
      message: "ミニ伝言板。最新の投稿を表示します。",
      user_name: "",
      logined: true,
      msg: "",
      page: 0,
      num_per_page: 10, //●取り出すデータ数
      json_data: {}
    };
  },
  methods: {
    login: function() {
      let provider = new firebase.auth.GoogleAuthProvider();
      let self = this;
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(function(result) {
          // データ取得の処理
          console.log(result.user);
          self.user = result.user;
          self.user_name = result.user.displayName;
          self.message = "ログインしました。";

          // データベースのオブジェクトを取得
          let db = firebase.database();
          // dbから、利用するデータの「参照」オブジェクト(Referenceオブジェクト)を取り出す。
          // これは利用するデータを指すもの。データから値を取り出すのではなく、Firebaseサーバーのあるデータを指し示すもの。
          let ref = db.ref("board");
          // 取り出すデータの設定は「フィルター」と呼ばれる。ここでは「データの並べ替え」「取り出すデータ数」を設定している
          ref
            .orderByKey()
            .limitToLast(self.num_per_page)
            // 「on」は第１引数で指定した項目に対し、第２引数の処理を設定するもの。
            // ここではvalueという項目を指定していますが、これは参照オブジェクトで参照するデータベースの「値」を示します。
            // この値が更新されると、このonの第２引数に設定した関数が実行されます。
            // この関数は、最初にonが実行されたときだけでなく、参照しているデータの内容が書き換わったとき（データの追加や更新、削除などが行われたとき）にも自動的に呼び出されます。
            .on("value", function(snapshot) {
              // このonで実行される関数では、まずログインされているかをチェックし、
              // ログインしていればデータを取り出してjson_dataに設定しています。
              if (firebase.auth().currentUser != null) {
                let arr = [];
                let data = snapshot.val();
                for (let item in data) {
                  arr.unshift(data[item]);
                }
                console.log(arr);
                self.json_data = arr;
              } else {
                self.json_data = {};
              }
            });
        });
    },
    logout: function() {
      // firebase.auth().signOut()で、currentUserの値がnullになる
      firebase.auth().signOut();
      this.user_name = "";
      this.json_data = {};
      this.message = "ログアウトしました。";
    },
    // ログイン
    doLogin: function() {
      // firebase.auth().currentUserの値でログインしているかのチェック
      if (firebase.auth().currentUser == null) {
        this.login();
      } else {
        this.logout();
      }
    },
    add: function() {
      // firebase.auth().currentUserの値でログインしているかのチェック
      if (firebase.auth().currentUser == null) {
        alert("ログインしないと投稿できません。");
        return;
      }
      let db = firebase.database();
      let user = firebase.auth().currentUser;
      console.log(user);
      let ref = db.ref("board");
      let self = this;
      let d = new Date();
      let dstr =
        d.getFullYear() +
        "-" +
        (d.getMonth() + 1) +
        "-" +
        d.getDate() +
        " " +
        d.getHours() +
        ":" +
        d.getMinutes() +
        ":" +
        d.getSeconds();
      let id = d.getTime();
      let data = {
        msg: this.msg,
        user: user.displayName,
        posted: dstr
      };
      firebase
        .database()
        .ref("board/" + id)
        .set(data);
      this.msg = "";
      this.message = "投稿しました。";
    }
  },
  created: function() {
    if (firebase.auth().currentUser == null) {
      this.login();
    }
    console.log(firebase.auth().currentUser);
  }
};
</script>


<style>
.login {
  font-weight: bold;
  font-size: 12pt;
  cursor: pointer;
}
.list1 {
  text-align: left;
  font-size: 16pt;
}
.list2 {
  text-align: right;
  font-size: 10pt;
}
.container {
  padding: 5px 10px;
}
h1 {
  font-size: 60pt;
  color: #345980;
}
p {
  padding-top: 5px;
  margin: 10px 0px;
  font-size: 20pt;
}
.message {
  font-size: 16pt;
}
div {
  font-size: 14pt;
}
ul {
  margin: 0px 10px;
  background-color: aliceblue;
}
li {
  padding: 10px;
  font-size: 14pt;
}
tr th {
  width: 120px;
  background-color: darkblue;
  color: white;
  font-size: 16pt;
}
tr td {
  padding: 5px 10px;
  background-color: #eef;
  font-size: 14pt;
}
hr {
  margin: 10px 0px;
}
input {
  font-size: 14pt;
}
button {
  font-size: 14pt;
}
</style>
