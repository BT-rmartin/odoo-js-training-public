/** @odoo-module **/

import { registry } from "@web/core/registry";
import { Counter } from "@awesome_tshirt/counter/counter";
import { Todo } from "@awesome_tshirt/todo/todo";

const { Component, useState } = owl;

class AwesomeDashboard extends Component {
      setup() {
          this.todo = [
              {id: 3, description: "buy milk", done: false},
              {id: 4, description: "buy eggs", done: true},
              {id: 5, description: "buy avocado", done: true},
          ];
      }
}

AwesomeDashboard.template = "awesome_tshirt.clientaction";
AwesomeDashboard.components = { Counter, Todo };

registry.category("actions").add("awesome_tshirt.dashboard", AwesomeDashboard);
