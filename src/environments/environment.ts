// import { device, platformNames } from "tns-core-modules/platform/platform";

// import { platformNames, device } from 'tns-core-modules/platform';

// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

// local server url for development
const serverUrl = 'http://localhost';

// Check to see if the device currently building for
// is either ios or android
// The ios emulator had configure the localhost of the device
// to point to the machine hosting it
// The Android emulator has mapped 10.0.2.2 to the host device ip
// if (device.os === platformNames.ios) {
//   /*localhost for ios*/
//   serverUrl = 'http://localhost';
// } else if (device.os === platformNames.android) {
//   /*localhost for android*/
//   serverUrl = 'http://10.0.2.2';
// }

export const environment = {
  production: false,
  serverUrl: `${serverUrl}:3000`,
  apiBaseUrl: `${serverUrl}:3000/api`,
  graphQLUrl: `${serverUrl}:3000/graphql`
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
