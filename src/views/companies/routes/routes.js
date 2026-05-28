import Table from "../parts/Table.vue";

const routes = [
     {
          path: "/companies/:client_id?",
          name: "companies",
          component: Table,
          props: (route) => ({
               client_id: route.params.client_id || null
          }),
     }
];

export default routes;
