<template>
  <div id="app">
          <MusicHeader></MusicHeader>
      <router-view></router-view>
      <player></player>
  </div>
</template>
<script>
import MusicHeader from "./components/header"
import player from './views/player'
export default {
  name: 'App',
  components:{
    MusicHeader,
    player
  },
}
</script>

