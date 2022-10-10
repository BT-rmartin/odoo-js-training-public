/** @odoo-module **/

import { registry } from "@web/core/registry";
import { Counter } from "@awesome_tshirt/counter/counter";
import { Todo } from "@awesome_tshirt/todo/todo";

const { Component, useState } = owl;

class AwesomeDashboard extends Component {
      setup() {
          this.nextId = 0;
          // We need to add useState to re-render the page when this changes its value, otherwise the value is added
          // but the page is not re-render
          this.todo = useState([])
      }

      addTodo(ev){
          if (ev.keyCode === 13 && ev.target.value != ""){
              this.todo.push({id: this.nextId++, description: ev.target.value, done: false});
              // Cleaning the input
              ev.target.value = "";
          }
      }
}

AwesomeDashboard.template = "awesome_tshirt.clientaction";
AwesomeDashboard.components = { Counter, Todo };

registry.category("actions").add("awesome_tshirt.dashboard", AwesomeDashboard);
