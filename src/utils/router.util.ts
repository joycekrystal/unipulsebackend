export const printRouterRoutes = (route: any) => {
  const uriModule = route.uri.replace("/", "").toUpperCase();
  console.log("--------------------------------------------------------------------------------------");
  console.log(`${uriModule} ${route.uri} Routes \n---------------`);

  route.router.stack.forEach((stack: any) => {
    if (stack.route) {
      // @ts-ignore
      const methods = Object.keys(stack.route?.methods).join(", ").toUpperCase();
      console.log(`${methods} ${route.uri}${stack.route.path}`);
    }
  });
  console.log("--------------------------------------------------------------------------------------");
};
