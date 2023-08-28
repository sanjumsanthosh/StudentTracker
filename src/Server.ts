import {join} from "path";
import {Configuration, Inject} from "@tsed/di";
import {PlatformApplication} from "@tsed/common";
import "@tsed/platform-express"; // /!\ keep this import
import "@tsed/ajv";
import "@tsed/swagger";
import {config} from "./config/index";
import * as rest from "./controllers/rest/index";
import * as pages from "./controllers/pages/index";

import { BasicAuthProtocol } from "./protocol/BasicAuthProtocol";
@Configuration({
  ...config,
  acceptMimes: ["application/json"],
  httpPort: process.env.PORT || 8083,
  httpsPort: false, // CHANGE
  disableComponentsScan: true,
  mount: {
    "/rest": [
      ...Object.values(rest)
    ],
    "/": [
      ...Object.values(pages)
    ]
  },
  passport:{
    disableSession: true
  },
  swagger: [
    {
      path: "/doc",
      specVersion: "3.0.1",
      spec:{
        components: {
          securitySchemes: {
            basic: {
              type: "http",
              scheme: "basic",
              bearerFormat: ""
            }
          }
        }
      }
    }
  ],
  imports: [BasicAuthProtocol],
  middlewares: [
    "cors",
    "cookie-parser",
    "compression",
    "method-override",
    "json-parser",
    { use: "urlencoded-parser", options: { extended: true }},
    { use: "express-session", options: {
      secret: "mysecretkey",
      resave: true,
      saveUninitialized: true,
      // maxAge: 36000,
      cookie: {
        path: "/",
        httpOnly: true,
        secure: false
      }
    } }
  ],
  views: {
    root: join(process.cwd(), "../views"),
    extensions: {
      ejs: "ejs"
    }
  },
  exclude: [
    "**/*.spec.ts"
  ]
})
export class Server {
  @Inject()
  protected app: PlatformApplication;

  @Configuration()
  protected settings: Configuration;
}
