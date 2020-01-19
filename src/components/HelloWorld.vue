<template>
  <div class="hello">
    <h1>App</h1>
    <div>
      <ol>
        <li v-for="a in app.appList" v-bind:key="a.client_id">
          <h2>{{ a.appParam.display_name }}</h2>
          <h3>??? {{ a.authorizeUri }}</h3>
        </li>
      </ol>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { PlayApp } from "@/PlayApp";

@Component
export default class HelloWorld extends Vue {
  @Prop() private app!: PlayApp;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
