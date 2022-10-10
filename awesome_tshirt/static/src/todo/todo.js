/** @odoo-module **/

const { Component, useState } = owl;


export class Todo extends Component {

}

Todo.template = "awesome_tshirt.todo_view";
Todo.props = {
            id: Number,
            description: String,
            done: Boolean,

     };
