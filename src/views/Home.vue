<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld :app="app" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src
import { AADApp } from "../aadApp/AadApp";

@Component({
  components: {
    HelloWorld
  },
  props: { app: AADApp }
})
export default class Home extends Vue {}
</script>
