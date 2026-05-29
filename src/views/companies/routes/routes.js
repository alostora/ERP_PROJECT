import Table from "../parts/Table.vue";
import Show from "../parts/Show.vue";

const routes = [
     {
          path: "/companies/:client_id?",
          name: "companies",
          component: Table,
          props: (route) => ({
               client_id: route.params.client_id || null
          }),
     },
     {
          path: 'company/:company_id',
          name: 'company-show',
          component: Show,
          props: (route) => ({
               company_id: route.params.company_id || null
          }),
     }
];

export default routes;
