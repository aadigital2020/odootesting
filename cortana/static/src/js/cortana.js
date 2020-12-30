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
            // Call Ajax
            // var ajax = require('web.ajax');
            // ajax.jsonRpc('/cortana/cortana/export', 'call', {}).then(function(data) {
            //     console.log(data);
            // });

            // URL Actions
            var self = this;
            var action = {
                type: 'ir.actions.act_url',
                url: 'https://uat.aa-testing.com/cortana/export',
                target: '_blank',
            };
            return this.do_action(action);
        },
    };
    ListController.include(IncludeListView);
});
