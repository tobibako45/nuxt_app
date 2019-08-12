<template>
  <sction class="container">
    <h1>{{title}}</h1>
    <p>{{message}}</p>

    <table>
      <tr>
        <th>UserID</th>
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


  </sction>

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
            }
        },
        async asyncData() {
            let id = 10; // id番号
            // await axios.getで、サイトの"https://jsonplaceholder.typicode.com/posts/10"とかにアクセスしてresultに代入。
            let result = await axios.get(url + id);
            // result.dataに、オブジェクトとしてマージされている。json_dataに入れてそのまま使える。
            return {json_data: result.data};
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
</style>
