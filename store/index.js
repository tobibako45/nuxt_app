// Vuexオブジェクトをインポート　これでVuexという名前でオブジェクトが作成される
import Vuex from "vuex";

// vuex-persistedstateから必要なオブジェクトをインポート
// createPersistedStateはvuex-persistedstateに用意されているオブジェクトです
import createPersistedState from "vuex-persistedstate";

// createStoreという関数を定義　この中でVuex.Storeオブジェクトを作成し、returnしている
// このVuex.Storeは「ストア」と呼ばれる、Vuexの情報をまとめて保管するオブジェクト
const createStore = () => {
  return new Vuex.Store({
    state: function() {
      return {
        message: "count number.",
        counter: 0
      };
    },
    mutations: {
      doit: function(state) {
        var n = Math.floor(Math.random() * 10);
        state.counter += n;
        state.message = "add " + n + ".";
      },
      reset: function(state) {
        state.counter = 0;
        state.message = "reset now.";
      }
    },

    // これによりstateが常に保持される。実際に組み込んでいる部分はこれ。
    // プラグインを設定するためのもので、ここでcreatePersistedStateを追加している。
    plugins: [createPersistedState()]
  });
};

// あとは作成した関数（createStore）をexport defaultでエクスポートします
export default createStore;
