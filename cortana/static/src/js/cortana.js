$(function() {
    $(document).ajaxComplete(function() {
        console.log('Ajax call completed');
    });
});

odoo.define('cortana__export_button.listview_button', function (require) {
    'use strict';

    var core = require('web.core');
    var ListView = require('web.ListView');
    var ListController = require('web.ListController');

    var IncludeListView = {
        renderButtons: function() {
            this._super.apply(this, arguments);
            if (this.modelName === 'x_this_is_tour_123') { // Change model name
                var button = this.$buttons.find('button.cortana__export_button__button'); // Change button class
                button.on('click', this.proxy('action'))
            }
        },
        action: function() {
            // var self = this;
            // var action = {
            //     type: 'ir.actions.act_window',
            //     name: 'Leave',
            //     res_model: 'x_this_is_tour_123',
            //     views: [[false,'form']],
            //     target: 'new',
            //     views: [[false, 'form']], 
            //     view_type : 'form',
            //     view_mode : 'form',
            //     flags: {'form': {'action_buttons': true, 'options': {'mode': 'edit'}}}
            // };
            // return this.do_action(action);
            var self = this;
            var action = {
                type: 'ir.actions.server',
                name: 'AA Export Button',
                condition: true,
                model_id: 'model_cortana_export_button',
                state: {
                    code: `self.export()`
                }
            };
            return this.do_action(action);
        },
    };
    ListController.include(IncludeListView);
});