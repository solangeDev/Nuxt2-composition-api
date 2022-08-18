import {
  getAccessorType,
  mutationTree,
  actionTree,
  getterTree
} from 'typed-vuex'
import { Post, State } from './models'
import { $axios } from '@/utils/api'
// import * as submodule from './submodule'

export const state = () => ({
  posts: [] as Post[],
  loading: false
})

export const getters = getterTree(state, {
  posts: (state: State) => state.posts,
  loading: (state: State) => state.loading
})

export const mutations = mutationTree(state, {
  LOAD_POST: (state, value: Post[]): void => {
    state.posts = value
  },
  SET_LOADING: (state, value: boolean): void => {
    state.loading = value
  },
  ADD_POST: (state, value: Post): void => {
    state.posts.unshift(value)
  },
  DELETE_POST: (state, value: Post): void => {
    state.posts = state.posts.filter((item: Post) => {
      return item.id !== value.id
    })
  },
  UPDATE_POST: (state, value: Post): void => {
    state.posts = state.posts.map((item: Post) => {
      let b = { ...item }
      if (item.id === value.id) {
        b = value
      }
      return b
    })
  }
})

export const actions = actionTree(
  { state, getters, mutations },
  {
    async ADD_POST ({ commit }, value: Post) {
      commit('SET_LOADING', false)
      try {
        await $axios.$post('/posts', value)
        commit('ADD_POST', value)
        commit('SET_LOADING', false)
      } catch (error) {
        commit('SET_LOADING', false)
      }
    },
    async DELETE_POST ({ commit }, value: Post) {
      commit('SET_LOADING', false)
      try {
        await $axios.$delete(`/posts/${value.id}`)
        commit('DELETE_POST', value)
        commit('SET_LOADING', false)
      } catch (error) {
        commit('SET_LOADING', false)
      }
    },
    async UPDATE_POST ({ commit }, value: Post) {
      commit('SET_LOADING', false)
      try {
        await $axios.$put(`/posts/${value.id}`, value)
        commit('UPDATE_POST', value)
        commit('SET_LOADING', false)
      } catch (error) {
        commit('SET_LOADING', false)
      }
    },
    async LOAD_POST ({ commit }) {
      commit('SET_LOADING', true)
      try {
        const data = await $axios.$get('/posts')
        commit('LOAD_POST', data)
        commit('SET_LOADING', false)
      } catch (error) {
        commit('SET_LOADING', false)
      }
    }
  }
)

export const accessorType = getAccessorType({
  actions,
  getters,
  mutations,
  state,
  modules: {}
})
