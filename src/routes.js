/*!

=========================================================
* Black Dashboard React v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Dashboard from "views/Dashboard.js";
import Admins from "./views/Admins";
import Practices from "./views/Practices";
import Providers from "./views/Providers";
import Icons from "./views/Icons";
import Provider from "./views/Provider";
import ProviderPayouts from "./views/ProviderPayouts";
import Customers from "./views/Customers";
import Customer from "./views/Customer";
import Wallet from "./views/Wallet";
import WalletOperations from "./views/WalletOperations";
import Messages from "./views/Messages";
import Banners from "./views/Banners";
import Archive from "./views/Archive";
import Packages from "./views/Packages";
import FrequentQuestions from "./views/FrequentQuestions";
import Invoices from "./views/Invoices";
import Invoice from "./views/Invoice";

const routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "tim-icons icon-chart-pie-36",
    component: Dashboard,
    layout: "/admin",
    roles: ['ADMIN', 'GOD']
  },
  {
    path: "/packages",
    name: "Paquetes",
    icon: "zmdi zmdi-dropbox",
    component: Packages,
    layout: "/admin",
    roles: ['GOD']
  },
  {
    path: "/admins",
    name: "Admins",
    icon: "zmdi zmdi-accounts-outline",
    component: Admins,
    layout: "/admin",
    roles: ['GOD']
  },
  {
    path: "/providers/:username/payouts",
    component: ProviderPayouts,
    layout: "/admin",
    roles: ['GOD', 'ADMIN']
  },
  {
    path: "/providers/:username",
    component: Provider,
    layout: "/admin",
    roles: ['GOD', 'ADMIN']
  },
  {
    path: "/providers",
    name: "Prestadores",
    icon: "tim-icons icon-badge",
    component: Providers,
    layout: "/admin",
    roles: ['GOD', 'ADMIN']
  },
  {
    path: "/invoices/:invoiceName",
    component: Invoice,
    layout: "/admin",
    roles: ['GOD', 'ADMIN']
  },
  {
    path: "/invoices",
    name: "Facturas Pendientes",
    icon: "zmdi zmdi-file-text",
    component: Invoices,
    layout: "/admin",
    roles: ['GOD', 'ADMIN']
  },
  {
    path: "/customers/:username/wallet/operations",
    component: WalletOperations,
    layout: "/admin",
    roles: ['GOD', 'ADMIN']
  },
  {
    path: "/customers/:username/wallet",
    component: Wallet,
    layout: "/admin",
    roles: ['GOD', 'ADMIN']
  },
  {
    path: "/customers/:username/wallet/operations",
    component: WalletOperations,
    layout: "/admin",
    roles: ['GOD', 'ADMIN']
  },
  {
    path: "/customers/:username",
    component: Customer,
    layout: "/admin",
    roles: ['GOD', 'ADMIN']
  },
  {
    path: "/customers",
    name: "Clientes",
    icon: "tim-icons icon-single-02",
    component: Customers,
    layout: "/admin",
    roles: ['GOD', 'ADMIN']
  },
  {
    path: "/practices",
    name: "Practicas Medicas",
    icon: "zmdi zmdi-assignment-o",
    component: Practices,
    layout: "/admin",
    roles: ['GOD', 'ADMIN']
  },
  {
    path: "/messages",
    name: "Mensajes Masivos",
    icon: "zmdi zmdi-email",
    component: Messages,
    layout: "/admin",
    roles: ['GOD', 'ADMIN']
  },
  {
    path: "/banner",
    name: "Banners",
    icon: "zmdi zmdi-view-carousel",
    component: Banners,
    layout: "/admin",
    roles: ['GOD', 'ADMIN']
  },
  {
    path: "/archive",
    name: "Registros",
    icon: "zmdi zmdi-archive",
    component: Archive,
    layout: "/admin",
    roles: ['GOD', 'ADMIN']
  },
  {
    path: "/questions",
    name: "Preguntas Frecuentes",
    icon: "zmdi zmdi-help",
    component: FrequentQuestions,
    layout: "/admin",
    roles: ['GOD', 'ADMIN']
  }

];
export default routes;
