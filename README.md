# pricing-module-web

Pricing Module v2 Web

##### Live example website - https://umangmahe.github.io/pricing-module-web/

## Prerequisites

Make sure to setup the server from - (`https://github.com/UmangMahe/pricing-module-server`)

1) Clone this repository - (`$ git clone https://github.com/UmangMahe/pricing-module-web.git`)
2) Head on to `src/config/EnvironmentConfig.js`
2) Change `API_ENDPOINT_URL` to the url of the port number of your server (`Default: http://localhost:3002/api/v2`) (Default: `3002`)
3) Make sure to change the endpoint url in the `prod` variable to an https:// hosted server. During the build the endpoint url in the prod variable will be considered as default so it is recommended to not use 'localhost' or 'http://' as endpoints.
4) In the terminal, type - `$ npm run build` This will generate a production build of the application ready for deployment.
5) To run the build, in the terminal, type - `$ npm run preview`
6) If you want to run without a build then type - `$ npm run dev` This will generate a live environment of the project.
7) Click on Network link on the terminal to open the browser




