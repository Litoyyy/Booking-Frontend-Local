import IMask from 'imask'

export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.provide('imask', IMask)
})