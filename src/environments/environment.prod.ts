import {name, version} from '../../package.json';

//import { version } from "process";

export const environment = {
  production: true,
  name: name,
  version: version,
  API_BASE_URL:"http://192.168.11.75:9001/easyfirstreport-service/rest/api/easyfirstreport"
};
