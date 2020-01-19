import { AADAppParam, ResponseTypeEnum } from "@/aadApp/AadApp";

const defaultParams: AADAppParam = {
  apiVersion: 2,
  client_id: "eff64ce9-b445-4657-ac0b-378544e9d0bd",
  appType: "tenantOnly",
  response_type: [ResponseTypeEnum.CODE],
  scope: ["openid"],
  redirectUris: [
    {
      isDefault: true,
      uri: "https://watahani.github.io/aad-playapp/"
    }
  ],
  url_params: [],
  client_secret: "secret",
  tenant_id: "whdv.onmicrosoft.com",
  display_name: "App 1"
};

const testParam = () => Object.assign({}, defaultParams);

export default testParam;
