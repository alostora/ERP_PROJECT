import Table from "../parts/Table.vue";

const routes = [
     {
          path: "/governorates/:country_id?",
          name: "governorates",
          component: Table,
          props: (route) => ({
               country_id: route.params.country_id || null
          }),
     }
];

export default routes;
