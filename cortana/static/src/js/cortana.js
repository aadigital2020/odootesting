var append_preview_container = function() {
    $('.cortana-preview-container').remove();
    if ($('.cortana-preview-container').length === 0) {
        $('body').append('<div class="cortana-preview-container"></div>');
    }
}

var cortana_preview_button_event_handler = function(e) {
    e.preventDefault();
    e.stopPropagation();

    append_preview_container();
    $('.cortana-preview-container').html(`
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
    var base_url = $(this).closest('[data-cortana-preview-base-url]').attr('data-cortana-preview-base-url');
    $.get(base_url + '?id=' + id, function(data) {
        $('.cortana-preview-container').html(data.html);
    })
}

$(function() {
    $('body').on('change', '[name="x_studio__12"], [name="x_studio__14"], [name="x_studio__15"]', function() {
        var total = parseInt($('[name="x_studio__12"]').val()) + parseInt($('[name="x_studio__14"]').val()) + parseInt($('[name="x_studio__15"]').val());
        $('[name="x_studio__13"]').val(total);
        $('[name="x_studio__13"]').change();
    })
})

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

                var $button = $('[data-id="' + result.id + '"]').find('.cortana-preview');

                if ($button.length) {
                    console.log($button);
                    if ($button.hasClass('cortana-preview-outbound')) {
                        $('[data-id="' + result.id + '"]').attr('data-cortana-preview-base-url', 'https://uat.aa-testing.com/cortana/preview-outbound');
                    } else {
                        $('[data-id="' + result.id + '"]').attr('data-cortana-preview-base-url', 'https://uat.aa-testing.com/cortana/preview');
                    }
    
                    var $parent = $button.parent();
                    $parent.html('<button type="button" class="btn btn-primary cortana-preview-button">PREVIEW</button>');
                    $('.cortana-preview-button').off('click', cortana_preview_button_event_handler);
                    $('.cortana-preview-button').on('click', cortana_preview_button_event_handler)
                }
            }
            return result;
        }
    })

    ListController.include({
     
    });
});
