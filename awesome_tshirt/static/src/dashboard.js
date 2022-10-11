/** @odoo-module **/

import { registry } from "@web/core/registry";
import { Counter } from "@awesome_tshirt/counter/counter";
import { Todo } from "@awesome_tshirt/todo/todo";
import { Card } from "@awesome_tshirt/card/card";
import { Layout } from "@web/search/layout";
import { getDefaultConfig } from "@web/views/view";
import { useService } from "@web/core/utils/hooks";
import { Domain } from "@web/core/domain";

const { Component, useState, onMounted, useRef, useSubEnv, onWillStart} = owl;

class AwesomeDashboard extends Component {
      setup() {
          this.nextId = 0;
          // We need to add useState to re-render the page when this changes its value, otherwise the value is added
          // but the page is not re-render
          this.todo = useState([])
          // Get reference of the input and once it is mounted it puts the focus there
          // so as soon as the page is reloaded the focus is there
          const ref = useRef('todoInput')
          onMounted(() => ref.el && ref.el.focus());

          useSubEnv({
                config: {
                    ...getDefaultConfig(),
                    ...this.env.config,
                },
            });
            this.display = {
                controlPanel: { "top-right": false, "bottom-right": false },
            };

            this.action = useService("action");

            this.rpc = useService('rpc');
            this.keyToString = {
                average_quantity: "Average amount of t-shirt by order this month",
                average_time: "Average time for an order to go from 'new' to 'sent' or 'cancelled'",
                nb_cancelled_orders: "Number of cancelled orders this month",
                nb_new_orders: "Number of new orders this month",
                total_amount: "Total amount of new orders this month",
            };
            onWillStart(async () => {
                this.statistics = await this.rpc('/awesome_tshirt/statistics', {});

            });
      }

      addTodo(ev){
          if (ev.keyCode === 13 && ev.target.value != ""){
              this.todo.push({id: this.nextId++, description: ev.target.value, done: false});
              // Cleaning the input
              ev.target.value = "";
          }
      }

      toggleState(id){
          const item = this.todo.find(el => el.id === id);
          item.done = !item.done;
      }

      removeTodo(id){
          const item = this.todo.find(el => el.id === id);
          let index = this.todo.indexOf(item)
          this.todo.splice(index, 1);
      }

      openCustomerView() {
        this.action.doAction("base.action_partner_form");
    }

    openOrders(title, domain) {
        this.action.doAction({
            type: "ir.actions.act_window",
            name: title,
            res_model: "awesome_tshirt.order",
            domain: new Domain(domain).toList(),
            views: [
                [false, "list"],
                [false, "form"],
            ],
        });
    }
    openLast7DaysOrders() {
        const domain =
            "[('create_date','>=', (context_today() - datetime.timedelta(days=7)).strftime('%Y-%m-%d'))]";
        this.openOrders("Last 7 days orders", domain);
    }

    openLast7DaysCancelledOrders() {
        const domain =
            "[('create_date','>=', (context_today() - datetime.timedelta(days=7)).strftime('%Y-%m-%d')), ('state','=', 'cancelled')]";
        this.openOrders("Last 7 days cancelled orders", domain);
    }

}

AwesomeDashboard.template = "awesome_tshirt.clientaction";
AwesomeDashboard.components = { Counter, Todo, Card, Layout};

registry.category("actions").add("awesome_tshirt.dashboard", AwesomeDashboard);
