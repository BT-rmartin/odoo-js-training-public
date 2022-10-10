/** @odoo-module **/

import { registry } from "@web/core/registry";
import { Counter } from "@awesome_tshirt/counter/counter";

const { Component, useState } = owl;

class AwesomeDashboard extends Component {
}

AwesomeDashboard.template = "awesome_tshirt.clientaction";
AwesomeDashboard.components = { Counter };

registry.category("actions").add("awesome_tshirt.dashboard", AwesomeDashboard);
