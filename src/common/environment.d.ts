/**
import.meta.env.MODE: {string} アプリが動作しているモード。
import.meta.env.BASE_URL: {string} アプリが配信されているベース URL。これは base 設定オプション によって決まります。
import.meta.env.PROD: {boolean} アプリがプロダクションで動作しているかどうか。
import.meta.env.DEV: {boolean} アプリが開発で動作しているかどうか（常に import.meta.env.PROD の逆）
import.meta.env.SSR: {boolean} アプリがサーバで動作しているかどうか
*/
export declare const environment: () => {
    env: {
        env: string;
        base_url: string;
        prod: boolean;
        dev: boolean;
        ssr: boolean;
        web_api_url: any;
        db_api_url: any;
    };
};
