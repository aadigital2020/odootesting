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
    console.log('hi list');
   
    $(document).on('click', '.cortana__export_l_button__button', function(e){
        e.preventDefault();
        var params = [], hash;
        var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
        for (var i = 0; i < hashes.length; i++){
            hash = hashes[i].split('=');
            params.push(hash[0]);
            params[hash[0]] = hash[1];
        }
        var url = 'https://uat.aa-testing.com/cortana/export-l/' +  params['id'];
        window.location.href = url;
    });
    $(document).on('click', '.cortana__export_m_button__button', function(e){
        e.preventDefault();
        var params = [], hash;
        var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
        for (var i = 0; i < hashes.length; i++){
            hash = hashes[i].split('=');
            params.push(hash[0]);
            params[hash[0]] = hash[1];
        }
        var url = 'https://uat.aa-testing.com/cortana/export-m/' +  params['id'];
        window.location.href = url;
    });
    $(document).on('click', '.cortana__export_1_button__button', function(e){
        e.preventDefault();
        var params = [], hash;
        var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
        for (var i = 0; i < hashes.length; i++){
            hash = hashes[i].split('=');
            params.push(hash[0]);
            params[hash[0]] = hash[1];
        }
        var url = 'https://uat.aa-testing.com/cortana/export-1/' +  params['id'];
        window.location.href = url;
    });
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
        renderButtons: function() {
            this._super.apply(this, arguments);
            if (this.modelName === 'x_this_is_tour_123') { // Change model name
                console.log('still work!');
                var button = this.$buttons.find('button.cortana__export_button__button'); // Change button class
                button.on('click', this.proxy('action'));
                var button_a = this.$buttons.find('a.cortana__export_a_button__button');
                var button_b = this.$buttons.find('a.cortana__export_b_button__button');
                var button_c = this.$buttons.find('a.cortana__export_c_button__button');
                var button_d = this.$buttons.find('a.cortana__export_d_button__button');
                var button_e = this.$buttons.find('a.cortana__export_e_button__button');
                var button_f = this.$buttons.find('a.cortana__export_f_button__button');
                var button_g = this.$buttons.find('a.cortana__export_g_button__button');
                var button_h = this.$buttons.find('a.cortana__export_h_button__button');
                var button_i = this.$buttons.find('button.cortana__export_i_button__button');
                var button_j = this.$buttons.find('a.cortana__export_j_button__button');
                var button_k = this.$buttons.find('a.cortana__export_k_button__button');

                button_a.on('click', function(e){
                    e.preventDefault();
                    window.location.href='https://uat.aa-testing.com/cortana/export';
                });
                button_b.on('click', function(e){
                    e.preventDefault();
                    window.location.href='https://uat.aa-testing.com/cortana/export-b';
                });

                button_c.on('click', function(e){
                    e.preventDefault();
                    window.location.href='https://uat.aa-testing.com/cortana/export-c';
                    
                });

                button_d.on('click', function(e){
                    e.preventDefault();
                    window.location.href='https://uat.aa-testing.com/cortana/export-d';
                });

                button_e.on('click', function(e){
                    e.preventDefault();
                    var select_id = [];
                    var str_arr = '';
                    $('tbody input:checked').each(function(){
                        select_id.push($(this).closest('tr').attr('data-model-id'));
                    });
                    var url = 'https://uat.aa-testing.com/cortana/export-e?id_array=';
                    if(select_id && select_id.length > 0)
                    {
                        str_arr = JSON.stringify(select_id);
                        window.location.href = url + str_arr;
                    }
                });

                button_f.on('click', function(e){
                    e.preventDefault();
                    var select_id = [];
                    var str_arr = '';
                    $('tbody input:checked').each(function(){
                        select_id.push($(this).closest('tr').attr('data-model-id'));
                    });
                    var url = 'https://uat.aa-testing.com/cortana/export-f?id_array=';
                    if(select_id && select_id.length > 0)
                    {
                        str_arr = JSON.stringify(select_id);
                        window.location.href = url + str_arr;
                    }
                });

                button_g.on('click', function(e){
                    e.preventDefault();
                    var queryString = '';
                    var date = null;
                    $('.o_facet_value').each(function(index, el) {
                        var text = $(el).html().trim();
                        console.log(text);
                        if (text.startsWith('離開日期 is equal to')) {
                            var raw_date = text.replace('離開日期 is equal to ', '').replaceAll('"', '');
                            var date_array = raw_date.split('/');
                            date = date_array[2] + '-' + date_array[0] + '-' + date_array[1]; 
                            queryString = '?date=' + date;
                            return false;
                        }
                    });
                    if (date != null){
                    var url = 'https://uat.aa-testing.com/cortana/export-g' +  queryString;
                        window.location.href = url;
                    }
                });

                button_h.on('click', function(e){
                    e.preventDefault();
                    var queryString = '';
                    var date = null;
                    $('.o_facet_value').each(function(index, el) {
                        var text = $(el).html().trim();
                        console.log(text);
                        if (text.startsWith('到達日期 is equal to')) {
                            var raw_date = text.replace('到達日期 is equal to ', '').replaceAll('"', '');
                            var date_array = raw_date.split('/');
                            date = date_array[2] + '-' + date_array[0] + '-' + date_array[1]; 
                            queryString = '?date=' + date;
                            return false;
                        }
                    });
                    if (date != null){
                    var url = 'https://uat.aa-testing.com/cortana/export-h' +  queryString;
                        window.location.href = url;
                    }
                });
                button_i.on('click', function(e){
                    e.preventDefault();
                    var select_id = [];
                    var str_arr = '';
                    $('tbody input:checked').each(function(){
                        select_id.push($(this).closest('tr').attr('data-model-id'));
                    });
                    var url = 'https://uat.aa-testing.com/cortana/export-i?id_array=';
                    if(select_id && select_id.length > 0)
                    {
                        str_arr = JSON.stringify(select_id);
                        window.location.href = url + str_arr;
                    }
                });
                button_j.on('click', function(e){
                    e.preventDefault();
                    var select_id = [];
                    var str_arr = '';
                    $('tbody input:checked').each(function(){
                        select_id.push($(this).closest('tr').attr('data-model-id'));
                    });
                    var url = 'https://uat.aa-testing.com/cortana/export-j?id_array=';
                    if(select_id && select_id.length > 0)
                    {
                        str_arr = JSON.stringify(select_id);
                        window.location.href = url + str_arr;
                    }
                });
                button_k.on('click', function(e){
                    e.preventDefault();
                    var select_id = [];
                    var str_arr = '';
                    $('tbody input:checked').each(function(){
                        select_id.push($(this).closest('tr').attr('data-model-id'));
                    });
                    var url = 'https://uat.aa-testing.com/cortana/export-k?id_array=';
                    if(select_id && select_id.length > 0)
                    {
                        str_arr = JSON.stringify(select_id);
                        window.location.href = url + str_arr;
                    }
                });
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
