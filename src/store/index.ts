import { ModuleState } from './VuexTyping';
import Vue from 'vue';
import Vuex from 'vuex';
import situation from './modules/situation';

Vue.use(Vuex);

const modules = {
  situation,
};

const rootStore = new Vuex.Store({
  // modules: modules,
});

// export type RootStore = typeof rootStore;

// export type RootState = {
//   [P in keyof typeof modules]: ModuleState<(typeof modules)[P]>
// };

// export default rootStore;
