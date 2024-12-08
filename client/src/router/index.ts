interface IRouteConfig {
  path: string;
}

interface IRoutesConfig {
  Home: IRouteConfig;
  Cart: IRouteConfig;
  Footer: IRouteConfig;
}

export const routes: IRoutesConfig = {
  Home: {
    path: "/",
  },
  Cart: {
    path: "/cart",
  },
  Footer: {
    path: "/policy",
  },
};
