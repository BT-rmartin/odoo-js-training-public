/** @odoo-module **/

const { Component, useState } = owl;
import { registry } from "@web/core/registry";
import { CharField } from "@web/views/fields/char/char_field";

export class MessageWidget extends Component {


}

MessageWidget.template = "awesome_tshirt.message_widget_view";
MessageWidget.components = { CharField };

registry.category("view_widgets").add("message_widget", MessageWidget);