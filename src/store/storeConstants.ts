// @ts-ignore
import { environment } from "@/common/environment";

const { env } = environment();

const webApiUrl = env.web_api_url;

const apiJsonHeaders = {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
};

const csvHeaders = { 
  "content-type": 
  "text/csv;charset=utf-8" 
};

export { apiJsonHeaders, csvHeaders, webApiUrl}
