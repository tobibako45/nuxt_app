<template>
  <section class="container">
    <h1>{{title}}</h1>
    <p>{{message}}</p>
    <hr />
  </section>
</template>


<script>
// firebaseをインポート  Firebaseパッケージから、アクセスのためのオブジェクトをインポート
// これでfirebaseオブジェクトが使えるようになる
import firebase from "firebase";

export default {
  data: function() {
    return {
      title: "Auth",
      message: "this is message"
    };
  },
  created: function() {
    // 設定を記述
    // アプリを作ったときにコピーしたスクリプトの設定情報を記入
    // APIキーとかは.envで管理 呼び出すときは「process.env.◯◯」
    var config = {
      apiKey: process.env.API_KEY,
      authDomain: process.env.PROJECT_ID + ".firebaseapp.com",
      databaseURL: "https://" + process.env.PROJECT_ID + ".firebaseio.com",
      projectId: process.env.PROJECT_ID,
      storageBucket: "",
      messagingSenderId: "851472385234",
      appId: "1:851472385234:web:cb2878e9b9d08036"
    };

    // Firebaseを初期化  設定情報を渡して初期化する
    firebase.initializeApp(config);

    // AuthProviderの作成  firebaseからGoolgeAuthProviderオブジェクトを作成する
    // これはOAuthと呼ばれるものの１つで、認証の処理を行うための機能を提供するもの。
    // GoolgeAuthProviderは、Googleアカウントによる認証のための機能を提供する
    var provider = new firebase.auth.GoogleAuthProvider();

    // thisを変数selfに代入してから、
    var self = this;

    // firebase.authで、認証のためのオブジェクトを取り出す。
    // signInWithPopupは、ボップアップウィンドウを開いてGoogle認証を行うためのもの。
    // これは非同期で実行されます。
    // 現れたウィンドウでユーザーが認証を行うと、その後のthenに用意した関数が実行される。
    firebase
      .auth()
      // signInWithPopupを呼び出す。
      .signInWithPopup(provider)
      // thenの関数で、messageにログインしたユーザー名やメールアドレスといった情報を表示している
      // ログインしたユーザー情報は、result.userで得ることができる
      // この値はオブジェクトになっており、「user」という値に認証したユーザーに関する値が用意されます。
      // このresult.userの中に、認証したユーザーに関する情報が入ってる
      .then(function(result) {
        self.message = result.user.displayName + ", " + result.user.email;
      });
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
