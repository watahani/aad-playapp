<template>
  <div class="hello">
    <h1>App</h1>
    <div>
      <h2>{{ app.appParam.display_name }}</h2>
      <ol>
        <li>
          <input type="text" name="" id="" />
        </li>
      </ol>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { AADApp } from "../aadApp/AadApp";

/**
 * interface AADAppParam {
  display_name?: string;
  tenant_id?: string;
  client_id: string;
  client_secret?: string;
  appType: "common" | "organizations" | "consumers" | "tenantOnly";
  response_type: ResponseTypeEnum[];
  scope: string[];
  redirectUris: Array<{
    isDefault: boolean;
    uri: string;
  }>;
  tokenRequestParam?: { [key: string]: string }[];
  apiVersion: 1 | 2;
  nonce?: string;
  state?: string;
  code_verifier?: string;
  response_mode?: "fragment" | "query" | "form_post";
  prompt?: "login" | "select_account" | "consent" | "admin_consent";
  code_challenge_method?: CODE_CHALLENGE_METHOD;
  [key: string]: any;
}

 */

const stringParams: string[] = ["display"];

@Component
export default class HelloWorld extends Vue {
  @Prop()
  private app!: AADApp;

  data() {
    return {
      currentApp: Object.assign({}, this.app),
      message: "hello"
    };
  }
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
