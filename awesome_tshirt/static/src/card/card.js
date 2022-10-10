/** @odoo-module **/

const { Component, useState } = owl;


export class Card extends Component {

}

Card.template = "awesome_tshirt.card_view";
Card.props = {
    slots: {
        type: Object,
        shape: {
            default: Object,
            title: {type: Object, optional: true}
        },
    },
};