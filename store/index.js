// Vuexオブジェクトをインポート　これでVuexという名前でオブジェクトが作成される
import Vuex from "vuex";

// createStoreという関数を定義　この中でVuex.Storeオブジェクトを作成し、returnしている
// このVuex.Storeは「ストア」と呼ばれる、Vuexの情報をまとめて保管するオブジェクト
const createStore = () => {
  return new Vuex.Store({
    state: function() {
      return {
        message: "これはstoreからのmessage",
        ore: "これはおれ"
      };
    }
  });
};

// あとは作成した関数（createStore）をexport defaultでエクスポートします
export default createStore;
