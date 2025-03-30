import { Application } from "express";
import { SystemRouter, AuthRouter, AnnouncementsRouter, EventsRouter, ForumsRouter } from "./module-routers";
import { printRouterRoutes } from "@/utils";
import { SETTINGS } from "@/configs";
import { AppEnvironments } from "@/types";

const routesConfig = [
  {
    uri: "/system",
    router: new SystemRouter().routerRoutes,
  },
  {
    uri: "/auth",
    router: new AuthRouter().routerRoutes,
  },
  {
    uri: "/announcements",
    router: new AnnouncementsRouter().routerRoutes,
  },
  {
    uri: "/events",
    router: new EventsRouter().routerRoutes,
  },
  {
    uri: "/forums",
    router: new ForumsRouter().routerRoutes,
  },
];

export const initializeApiRoutes = (app: Application, apiPrefix: string = "/api/v1") => {
  routesConfig.forEach((route) => {
    const uri: string = apiPrefix.concat(route.uri);
    app.use(uri, route.router);

    if (SETTINGS.checkCurrentEnvironment(AppEnvironments.DEV)) {
      printRouterRoutes(route);
    }
  });
};
