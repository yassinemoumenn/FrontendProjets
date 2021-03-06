// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  appVersion: 'v1.1',
  USERDATA_KEY: 'authf649fc9a5f55',
  apiUrl: '//localhost:8080/api/v1',
  truffleApi: 'https://public.next.doccerts.com/api/v1' /* truffle Dev server */,
  hyperledgerApi: 'https://private.next.doccerts.com/api',
  isMockEnabled: true // You have to switch this, when your real back-end is done
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
