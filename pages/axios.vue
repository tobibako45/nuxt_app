<template>
  <section class="container">
    <h1>{{title}}</h1>
    <p>{{message}}</p>
    <div>
<!--      v-model="msgで、this.msgに保管-->
      <input type="text" v-model="msg" />
<!-- @clickでdoClickを呼び出す-->
      <button @click="doClick">Click</button>
    </div>
    <hr>
    <table>
      <tr>
        <th>User ID</th>
        <td>{{json_data.userId}}</td>
      </tr>
      <tr>
        <th>ID</th>
        <td>{{json_data.id}}</td>
      </tr>
      <tr>
        <th>Title</th>
        <td>{{json_data.title}}</td>
      </tr>
      <tr>
        <th>Body</th>
        <td>{{json_data.body}}</td>
      </tr>
    </table>
  </section>
</template>

<script>
    const axios = require('axios');
    // 一覧のURL
    let url = "https://jsonplaceholder.typicode.com/posts/";

    export default {
        data: function () {
            return {
                title: 'Axios',
                message: 'axios sample',
                msg: '',
                json_data: {}
            }
        },
        // async asyncData() {
        //     let id = 10; // id番号
        //     // await axios.getで、サイトの"https://jsonplaceholder.typicode.com/posts/10"とかにアクセスしてresultに代入。
        //     let result = await axios.get(url + id);
        //     // result.dataに、オブジェクトとしてマージされている。json_dataに入れてそのまま使える。
        //     return {json_data: result.data};
        // }

        methods: {
            doClick: function (event) {
                // v-modelで保管されたmsgをthis.msgで取り出して、変数urlにくっつけてアクセスしている。
                axios.get(url + this.msg).then((res) => {
                    this.message = 'get ID=' + this.msg;
                    // then内のアロー関数で、引数のresからdataを取り出し、this.json_dataに設定している
                    this.json_data = res.data;
                })
            }
        }
    }
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
    padding-top:5px;
    font-size: 20pt;
  }
  div {
    font-size:14pt;
  }
  pre {
    padding: 10px;
    font-size: 18pt;
    background-color: #efefef;
    white-space: pre-wrap ;
  }
  hr {
    margin:10px 0px;
  }
  tr th {
    width:150px;
    background-color: darkblue;
    color:white;
    font-size:16pt;
  }
  tr td {
    padding:5px 10px;
    background-color:#eef;
    font-size:14pt;
  }
  input {
    font-size:14pt;
  }
  button {
    font-size:14pt;
  }
</style>
