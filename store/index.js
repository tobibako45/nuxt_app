// Vuexオブジェクトをインポート　これでVuexという名前でオブジェクトが作成される
import Vuex from "vuex";

// createStoreという関数を定義　この中でVuex.Storeオブジェクトを作成し、returnしている
// このVuex.Storeは「ストア」と呼ばれる、Vuexの情報をまとめて保管するオブジェクト
const createStore = () => {
  return new Vuex.Store({
    // ステート データを保管
    state: function() {
      return {
        message: "count number.",
        ore: "これはおれ",
        counter: 0
      };
    },

    // ミューテーションは、関数の定義として値が取り出される。引数は最低でも１つ用意されますが、
    // これにはstateの値をまとめたオブジェクト($store.stateに相当するもの)が渡されます。
    // このオブジェクトから必要な値を取り出し操作します。

    // ミューテーション コンポーネント側でなくて、こっちでstateの値を操作する処理を用意する
    mutations: {
      // 引数にオブジェクトを渡したい時
      count: function(state, obj) {
        state.message = obj.message;
        state.counter += obj.add;
      },
      reset: function(state) {
        state.counter = 0;
      }
    }
  });
};

// あとは作成した関数（createStore）をexport defaultでエクスポートします
export default createStore;
