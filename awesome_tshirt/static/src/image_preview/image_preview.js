/** @odoo-module **/

const { Component, useState } = owl;
import { registry } from "@web/core/registry";
import { CharField } from "@web/views/fields/char/char_field";

export class ImagePreview extends Component {


}

ImagePreview.template = "awesome_tshirt.image_preview_view";
ImagePreview.components = { CharField };
ImagePreview.supportedTypes = ["char"];

registry.category("fields").add("image_preview", ImagePreview);