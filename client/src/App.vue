<template>
  <img alt="Vue logo" src="./assets/logo.png" />

  <HelloWorld msg="Hello Vue 3.0 + Vite" />
</template>

<script>
import { onMounted } from 'vue'
import io from 'socket.io-client'

import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld,
  },

  setup() {
    onMounted(() => {
      const socket = io('http://localhost:3030')

      socket.on('connect', () => {
        console.log('connect handler')
      })
      socket.on('event', (data) => {
        console.log('event handler', data)
      })
      socket.on('disconnect', () => {
        console.log('disconnect handler')
      })
    })
  },
}
</script>
