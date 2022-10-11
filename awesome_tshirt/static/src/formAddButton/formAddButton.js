/** @odoo-module **/

import { registry } from "@web/core/registry";
import { FormController } from "@web/views/form/form_controller";
import { formView } from '@web/views/form/form_view';
import { useService } from "@web/core/utils/hooks";

export class FormAddButton extends FormController {
    async setup() {
        super.setup();
        this.orm = useService("orm");
    }

    printLabel(){
        return this.orm.call(this.model.root.resModel, "print_label", [this.model.root.resId])
    }

    onImport() {
        const context = this.props.context;
        const actionParams = { additionalContext: context };
        if (!context.default_mailing_list_ids && context.active_model === 'awesome_tshirt.order' && context.active_ids) {
            actionParams.additionalContext.default_mailing_list_ids = context.active_ids;
        }
        this.actionService.doAction('mass_mailing.mailing_contact_import_action', actionParams);
    }

}
FormAddButton.template = "form_add_button.FormView"

registry.category('views').add('form_add_button', {
    ...formView,
    Controller: FormAddButton
});