import { ModuleState } from './VuexTyping';
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const modules = {

};

const rootStore = new Vuex.Store<RootState>({
  
});

export type RootStore = typeof rootStore;

export type RootState = {
  [P in keyof typeof modules]: ModuleState<(typeof modules)[P]>
};

export default rootStore;