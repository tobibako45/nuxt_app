<template>
  <section class="container">
    <h1>{{title}}</h1>
    <p>{{mmessage}}</p>
    <p>{{$store.state.message}}</p>
    <p>{{$store.state.ore}}</p>
    <hr />
    <router-link to="/other">Go to Other</router-link>
  </section>
</template>

<script>
export default {
  data: function() {
    return {
      title: "Hello",
      mmessage: "this is message."
      // now: "wait..."
    };
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
pre {
  padding: 10px;
  font-size: 18pt;
  background-color: #efefef;
}
hr {
  margin: 10px 0px;
}
</style>
