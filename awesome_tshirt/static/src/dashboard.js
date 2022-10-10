/** @odoo-module **/

import { registry } from "@web/core/registry";
import { Counter } from "@awesome_tshirt/counter/counter";
import { Todo } from "@awesome_tshirt/todo/todo";
import { Card } from "@awesome_tshirt/card/card";
import { Layout } from "@web/search/layout";
import { getDefaultConfig } from "@web/views/view";

const { Component, useState, onMounted, useRef, useSubEnv} = owl;

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
}

AwesomeDashboard.template = "awesome_tshirt.clientaction";
AwesomeDashboard.components = { Counter, Todo, Card, Layout};

registry.category("actions").add("awesome_tshirt.dashboard", AwesomeDashboard);
