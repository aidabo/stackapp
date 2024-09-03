// @ts-ignore
import env from "../includes/environment"

const baseDbApiUrl = env().db_api_url;

const webApiUrl = env().web_api_url;

const apiJsonHeaders = {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
};

const csvHeaders = { 
  "content-type": 
  "text/csv;charset=utf-8" 
};

export { baseDbApiUrl, apiJsonHeaders, csvHeaders, webApiUrl}
