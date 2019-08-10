<template>
  <section class="container">
    <h1>{{title}}</h1>
    <p>{{mmessage}}</p>
    <hr />

    <!-- @click="$store.dispatch('doit')"が実行され、そこからcountとsayaミューテーションが呼び出される -->
    <div class="link" @click="$store.dispatch('doit')">
      <a @click.stop="$store.commit('reset')">clicked: {{ $store.state.counter }}</a>
    </div>

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
  },
  methods: {
    doAction: function() {
      // $store.state.counterの値を直接書き換えて、counterの値が1増える
      this.$store.state.counter++;
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
pre {
  padding: 10px;
  font-size: 18pt;
  background-color: #efefef;
}
hr {
  margin: 10px 0px;
}

a {
  font-size: 16pt;
}

.link {
  background-color: #def;
  padding: 10px;
}
</style>
