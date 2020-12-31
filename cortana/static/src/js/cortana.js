var append_preview_container = function() {
    if ($('#cortana-preview-container').length === 0) {
        $('body').append('<div id="cortana-preview-container"></div>');
    }
}

var cortana_preview_button_event_handler = function(e) {
    e.preventDefault();
    e.stopPropagation();

    $('#cortana-preview-container').html(`
    <style>
    .lds-ring {
        display: block;
        position: relative;
        margin: 15px auto;
        width: 30px;
        height: 30px;
    }
    .lds-ring div {
        box-sizing: border-box;
        display: block;
        position: absolute;
        width: 30px;
        height: 30px;
        margin: 0;
        border: 3px solid #fff;
        border-radius: 50%;
        animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
        border-color: #875A7B transparent transparent transparent;
    }
    .lds-ring div:nth-child(1) {
        animation-delay: -0.45s;
    }
    .lds-ring div:nth-child(2) {
        animation-delay: -0.3s;
    }
    .lds-ring div:nth-child(3) {
        animation-delay: -0.15s;
    }
    @keyframes lds-ring {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
    }
    </style>
    <div class="lds-ring"><div></div><div></div><div></div><div></div></div>`);

    var id = $(this).closest('[data-model-id]').attr('data-model-id');
    $.get('https://uat.aa-testing.com/cortana/preview?id=' + id, function(data) {
        append_preview_container();
        $('#cortana-preview-container').html(data.html);
    })
}

odoo.define('cortana__export_button.listview_button', function (require) {
    'use strict';

    var core = require('web.core');
    var ListView = require('web.ListView');
    var ListRenderer = require('web.ListRenderer');
    var ListModel = require('web.ListModel');
    var ListController = require('web.ListController');
    
    // ListView.include({
    //     init: function() {
    //         this._super.apply(this, arguments);
    //         this.arch.children.forEach(function (child) {
    //             console.log(child);
    //         });
    //     }
    // })

    // ListRenderer.include({
    //     init: function() {
    //         this._super.apply(this, arguments);
    //         console.log('init');
    //         console.log(this.arch.children);
    //     },
    //     updateState: function() {
    //         console.log('updateState');
    //         console.log(this.arch.children);
    //         return this._super.apply(this, arguments);
    //     },
    // })

    ListModel.include({
        __get: function() {
            append_preview_container();
            var result = this._super.apply(this, arguments);
            if (result !== null && result.hasOwnProperty('data') && result.data.hasOwnProperty('id')) {
                $('[data-id="' + result.id + '"]').attr('data-model-id', result.data.id);
                var $parent = $('[data-id="' + result.id + '"]').find('.cortana-preview').parent();
                $parent.html('<button type="button" class="btn btn-primary cortana-preview-button">PREVIEW</button>');
                $('.cortana-preview-button').off('click', cortana_preview_button_event_handler);
                $('.cortana-preview-button').on('click', cortana_preview_button_event_handler)
            }
            return result;
        }
    })

    ListController.include({
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
            var queryString = '';
            $('.o_facet_value').each(function(index, el) {
                var text = $(el).html().trim();
                console.log(text);
                if (text.startsWith('到達日期 is equal to')) {
                    queryString = '?context=' + text.replace('到達日期 is equal to ', '').replaceAll('"', '');
                    return false;
                }
                if (text === 'Today') {
                    queryString = '?context=today';
                    return false;
                }
            })
            var url = 'https://uat.aa-testing.com/cortana/export' + queryString;
            var self = this;
            var action = {
                type: 'ir.actions.act_url',
                url: url,
                target: '_blank',
            };
            return this.do_action(action);
        }
    });
});
