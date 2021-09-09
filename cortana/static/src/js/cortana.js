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
    $('body').on('change', '[name="x_studio__12"], [name="x_studio__14"], [name="x_studio__15"], [name="x_studio__16"]', function() {
        var total = parseInt($('[name="x_studio__12"]').val()) + parseInt($('[name="x_studio__14"]').val()) + parseInt($('[name="x_studio__15"]').val()) + parseInt($('[name="x_studio__16"]').val());
        $('[name="x_studio__13"]').val(total);
        $('[name="x_studio__13"]').change();
    })
})

odoo.define('cortana__export_button.listview_button', function (require) {
    'use strict';  
    $(function() {
        $('body').append(`
        <style>
        html[data-app-model="x_this_is_tour_123"][data-app-view-type="list"][data-app-studio="ok"] th:nth-child(8),
        html[data-app-model="x_this_is_tour_123"][data-app-view-type="list"][data-app-studio="ok"] th:nth-child(9),
        html[data-app-model="x_this_is_tour_123"][data-app-view-type="list"][data-app-studio="ok"] th:nth-child(10),
        html[data-app-model="x_this_is_tour_123"][data-app-view-type="list"][data-app-studio="ok"] td:nth-child(8),
        html[data-app-model="x_this_is_tour_123"][data-app-view-type="list"][data-app-studio="ok"] td:nth-child(9),
        html[data-app-model="x_this_is_tour_123"][data-app-view-type="list"][data-app-studio="ok"] td:nth-child(10) {
            background-color: #c1d0fc;
        }
        html[data-app-model="x_this_is_tour_123"][data-app-view-type="list"][data-app-studio="ok"] th:nth-child(11),
        html[data-app-model="x_this_is_tour_123"][data-app-view-type="list"][data-app-studio="ok"] th:nth-child(12),
        html[data-app-model="x_this_is_tour_123"][data-app-view-type="list"][data-app-studio="ok"] th:nth-child(13),
        html[data-app-model="x_this_is_tour_123"][data-app-view-type="list"][data-app-studio="ok"] td:nth-child(11),
        html[data-app-model="x_this_is_tour_123"][data-app-view-type="list"][data-app-studio="ok"] td:nth-child(12),
        html[data-app-model="x_this_is_tour_123"][data-app-view-type="list"][data-app-studio="ok"] td:nth-child(13) {
            background-color: #fbc8d5;
        }
        html[data-app-model="x_this_is_tour_123"][data-app-view-type="list"][data-app-studio="ok"] th:nth-child(14),
        html[data-app-model="x_this_is_tour_123"][data-app-view-type="list"][data-app-studio="ok"] th:nth-child(15),
        html[data-app-model="x_this_is_tour_123"][data-app-view-type="list"][data-app-studio="ok"] td:nth-child(14),
        html[data-app-model="x_this_is_tour_123"][data-app-view-type="list"][data-app-studio="ok"] td:nth-child(15) {
            background-color: #c8e5c7;
        }
        html[data-app-model="x_in_bound_tour"][data-app-view-type="list"][data-app-studio="ok"] th:nth-child(9),
        html[data-app-model="x_in_bound_tour"][data-app-view-type="list"][data-app-studio="ok"] th:nth-child(10),
        html[data-app-model="x_in_bound_tour"][data-app-view-type="list"][data-app-studio="ok"] th:nth-child(11),
        html[data-app-model="x_in_bound_tour"][data-app-view-type="list"][data-app-studio="ok"] td:nth-child(9),
        html[data-app-model="x_in_bound_tour"][data-app-view-type="list"][data-app-studio="ok"] td:nth-child(10),
        html[data-app-model="x_in_bound_tour"][data-app-view-type="list"][data-app-studio="ok"] td:nth-child(11) {
            background-color: #c1d0fc;
        }
        html[data-app-model="x_in_bound_tour"][data-app-view-type="list"][data-app-studio="ok"] th:nth-child(12),
        html[data-app-model="x_in_bound_tour"][data-app-view-type="list"][data-app-studio="ok"] th:nth-child(13),
        html[data-app-model="x_in_bound_tour"][data-app-view-type="list"][data-app-studio="ok"] th:nth-child(14),
        html[data-app-model="x_in_bound_tour"][data-app-view-type="list"][data-app-studio="ok"] td:nth-child(12),
        html[data-app-model="x_in_bound_tour"][data-app-view-type="list"][data-app-studio="ok"] td:nth-child(13),
        html[data-app-model="x_in_bound_tour"][data-app-view-type="list"][data-app-studio="ok"] td:nth-child(14) {
            background-color: #fbc8d5;
        }
        html[data-app-model="x_in_bound_tour"][data-app-view-type="list"][data-app-studio="ok"] th:nth-child(16),
        html[data-app-model="x_in_bound_tour"][data-app-view-type="list"][data-app-studio="ok"] th:nth-child(17),
        html[data-app-model="x_in_bound_tour"][data-app-view-type="list"][data-app-studio="ok"] td:nth-child(16),
        html[data-app-model="x_in_bound_tour"][data-app-view-type="list"][data-app-studio="ok"] td:nth-child(17) {
            background-color: #c8e5c7;
        }
        </style>
        `);
        
    });
    $(document).on('click', '.cortana__export_l_button__button', function(e){
        e.preventDefault();
        var params = [], hash;
        var hashes = window.location.href.slice(window.location.href.indexOf('#') + 1).split('&');
        console.log(window.location.href);
        for (var i = 0; i < hashes.length; i++){
            hash = hashes[i].split('=');
            params.push(hash[0]);
            params[hash[0]] = hash[1];
        }
        console.log(params);
        var url = 'https://uat.aa-testing.com/cortana/export-l/' +  params['id'];
        window.location.href = url;

    });
    $(document).on('click', '.cortana__export_m_button__button', function(e){
        e.preventDefault();
        var params = [], hash;
        var hashes = window.location.href.slice(window.location.href.indexOf('#') + 1).split('&');
        console.log(window.location.href);

        for (var i = 0; i < hashes.length; i++){
            hash = hashes[i].split('=');
            params.push(hash[0]);
            params[hash[0]] = hash[1];
        }
        console.log(params);

        var url = 'https://uat.aa-testing.com/cortana/export-m/' +  params['id'];
        window.location.href = url;

    });
    $(document).on('click', '.cortana__export_1_button__button', function(e){
        e.preventDefault();
        var params = [], hash;
        var hashes = window.location.href.slice(window.location.href.indexOf('#') + 1).split('&');
        for (var i = 0; i < hashes.length; i++){
            hash = hashes[i].split('=');
            params.push(hash[0]);
            params[hash[0]] = hash[1];
        }
        console.log(params);

        var url = 'https://uat.aa-testing.com/cortana/export-1/' +  params['id'];
        window.location.href = url;
    });
    $(document).on('click', '.cortana__export_2_button__button', function(e){
        e.preventDefault();
        var params = [], hash;
        var hashes = window.location.href.slice(window.location.href.indexOf('#') + 1).split('&');
        for (var i = 0; i < hashes.length; i++){
            hash = hashes[i].split('=');
            params.push(hash[0]);
            params[hash[0]] = hash[1];
        }
        console.log(params);
        var category = $('[name="x_studio__3"]').attr('raw-value');
        if (category == '單訂房'){
            var url = 'https://uat.aa-testing.com/cortana/export-2/' +  params['id'];
        }
        if (category == '單機票'){
            var url = 'https://uat.aa-testing.com/cortana/export-3/' +  params['id'];
        }
        if (category == '單門票'){
            var url = 'https://uat.aa-testing.com/cortana/export-3/' +  params['id'];
        }
        
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
                $('body').append(`
                <style>
                    .popup-window{
                        display:none;
                        position: absolute;
                        z-index: 1000;
                        width: 100%;
                        height: 100%;
                        background-color: rgba(0,0,0,0.1);
                    }
                    .popup-inner{
                        max-width: 500px;
                        margin: 0 auto;
                        margin-top: 10%;
                        background:rgba(255,255,255, 0.9);
                        padding: 20px;
                    }
                    .popup-inner-2{
                        max-width: 500px;
                        margin: 0 auto;
                        margin-top: 10%;
                        background:rgba(255,255,255, 0.9);
                        padding: 20px;
                    }
                </style>
                <div class="popup-window">
                    <div class="popup-inner">
                        <input type="hidden" value="" id="hidden_form_id">
                        <div>
                            <div style="display:inline-block; width:29%">選擇日期</div>
                            <div style="display:inline-block; width:70%"><input type="date" name="context"></div>
                        </div>
                        <button type="button" class="btn btn-primary">Export</button>
                    </div>
                    <div class="popup-inner-2">
                        <div>
                            <div style="display:inline-block; width:29%">開始日期</div>
                            <div style="display:inline-block; width:70%"><input type="date" name="start_date"></div>
                        </div>
                        <div>
                            <div style="display:inline-block; width:29%">結束日期</div>
                            <div style="display:inline-block; width:70%"><input type="date" name="end_date"></div>
                        </div>
                        <button type="button" class="btn btn-primary">Export</button>
                    </div>
                </div>`
                );
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
                var button_p1 = this.$buttons.find('a.cortana__export_p1_button__button');
                var button_p2 = this.$buttons.find('a.cortana__export_p2_button__button');
                var button_p3 = this.$buttons.find('a.cortana__export_p3_button__button');
                var button_p4 = this.$buttons.find('a.cortana__export_p4_button__button');
                var button_n3_inbound = this.$buttons.find('button.cortana__export_n3_inbound_button__button');
                var button_n4_inbound = this.$buttons.find('button.cortana__export_n4_inbound_button__button');
                var button_n5_inbound = this.$buttons.find('button.cortana__export_n5_inbound_button__button');
                var button_inbound_check = this.$buttons.find('button.cortana__export_inbound_check_button__button');

                $('.popup-window').on('click', function(e){
                    if(e.target == this)
                    {
                        $('.popup-window').fadeOut();
                    }
                })
                $('.popup-inner button').on('click', function(e){
                    e.preventDefault();
                    var url = $('#hidden_form_id').val();
                    var date = $('[name="context"]').val();
                    if (date){
                        url = url + '?context=' + date;
                        console.log(url);
                        window.location.href = url;
                    }else{
                        window.location.href = url;
                    }
                })
                $('.popup-inner-2 button').on('click', function(e){
                    e.preventDefault();
                    var url = $('#hidden_form_id').val();
                    var start = $('[name="start_date"]').val();
                    var end = $('[name="end_date"]').val();

                    if (start && end){
                        url = url + '?inbound=true&from=' + start + '&to=' + end;
                        console.log(url);
                        window.location.href = url;
                    }
                })

                button_a.on('click', function(e){
                    e.preventDefault();
                    $('#hidden_form_id').val('https://uat.aa-testing.com/cortana/export');
                    $('.popup-inner button').text('每日日程表');
                    $('.popup-inner-2').hide();
                    $('.popup-inner').show();
                    $('.popup-window').fadeIn();
                    // window.location.href='https://uat.aa-testing.com/cortana/export';
                });
                button_b.on('click', function(e){
                    e.preventDefault();
                    $('#hidden_form_id').val('https://uat.aa-testing.com/cortana/export-b');
                    $('.popup-inner button').text('導遊日程表');
                    $('.popup-inner-2').hide();
                    $('.popup-inner').show();
                    $('.popup-window').fadeIn();
                    // window.location.href='https://uat.aa-testing.com/cortana/export-b';
                });

                button_c.on('click', function(e){
                    e.preventDefault();
                    $('#hidden_form_id').val('https://uat.aa-testing.com/cortana/export-c');
                    $('.popup-inner button').text('團隊日程表');
                    $('.popup-inner-2').hide();
                    $('.popup-inner').show();
                    $('.popup-window').fadeIn();
                    // window.location.href='https://uat.aa-testing.com/cortana/export-c';
                    
                });

                button_d.on('click', function(e){
                    e.preventDefault();
                    $('#hidden_form_id').val('https://uat.aa-testing.com/cortana/export-d');
                    $('.popup-inner button').text('簡易日程表');
                    $('.popup-inner-2').hide();
                    $('.popup-inner').show();
                    $('.popup-window').fadeIn();
                    // window.location.href='https://uat.aa-testing.com/cortana/export-d';
                });

                button_e.on('click', function(e){
                    e.preventDefault();
                    var select_id = [];
                    var str_arr = '';
                    $('tbody input:checked').each(function(){
                        select_id.push($(this).closest('tr').attr('data-model-id'));
                    });
                    var url = 'https://uat.aa-testing.com/cortana/export-e?id_array=[';
                    if(select_id && select_id.length > 0)
                    {
                        // str_arr = JSON.stringify(select_id);
                        // window.location.href = url + str_arr;
                        var new_url = '';
                        for(var i = 0; i < select_id.length; i++){
                            
                            new_url = url+select_id[i]+']';
                            window.open(new_url);
                        }
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
                    $('#hidden_form_id').val('https://uat.aa-testing.com/cortana/export-g');
                    $('.popup-inner button').text('送團列表');
                    $('.popup-inner-2').hide();
                    $('.popup-inner').show();
                    $('.popup-window').fadeIn();
                    // var queryString = '';
                    // var date = null;
                    // $('.o_facet_value').each(function(index, el) {
                    //     var text = $(el).html().trim();
                    //     console.log(text);
                    //     if (text.startsWith('離開日期 is equal to')) {
                    //         var raw_date = text.replace('離開日期 is equal to ', '').replaceAll('"', '');
                    //         var date_array = raw_date.split('/');
                    //         date = date_array[2] + '-' + date_array[0] + '-' + date_array[1]; 
                    //         queryString = '?date=' + date;
                    //         return false;
                    //     }
                    // });
                    // if (date != null){
                    // var url = 'https://uat.aa-testing.com/cortana/export-g' +  queryString;
                    //     window.location.href = url;
                    // }
                });

                button_h.on('click', function(e){
                    e.preventDefault();
                    $('#hidden_form_id').val('https://uat.aa-testing.com/cortana/export-h');
                    $('.popup-inner button').text('接團列表');
                    $('.popup-inner-2').hide();
                    $('.popup-inner').show();
                    $('.popup-window').fadeIn();
                    // var queryString = '';
                    // var date = null;
                    // $('.o_facet_value').each(function(index, el) {
                    //     var text = $(el).html().trim();
                    //     console.log(text);
                    //     if (text.startsWith('到達日期 is equal to')) {
                    //         var raw_date = text.replace('到達日期 is equal to ', '').replaceAll('"', '');
                    //         var date_array = raw_date.split('/');
                    //         date = date_array[2] + '-' + date_array[0] + '-' + date_array[1]; 
                    //         queryString = '?date=' + date;
                    //         return false;
                    //     }
                    // });
                    // if (date != null){
                    // var url = 'https://uat.aa-testing.com/cortana/export-h' +  queryString;
                    //     window.location.href = url;
                    // }
                });
                button_i.on('click', function(e){
                    e.preventDefault();
                    var select_id = [];
                    var str_arr = '';
                    $('tbody input:checked').each(function(){
                        select_id.push($(this).closest('tr').attr('data-model-id'));
                    });
                    var url = 'https://uat.aa-testing.com/cortana/export-i?id_array=[';
                    if(select_id && select_id.length > 0)
                    {
                        var new_url = '';
                        for(var i = 0; i < select_id.length; i++){
                            
                            new_url = url+select_id[i]+']';
                            window.open(new_url);
                        }
                    }
                });
                button_j.on('click', function(e){
                    e.preventDefault();
                    var select_id = [];
                    var str_arr = '';
                    $('tbody input:checked').each(function(){
                        select_id.push($(this).closest('tr').attr('data-model-id'));
                    });
                    var url = 'https://uat.aa-testing.com/cortana/export-j?id_array=[';
                    if(select_id && select_id.length > 0)
                    {
                        // str_arr = JSON.stringify(select_id);
                        // window.location.href = url + str_arr;
                        var new_url = '';
                        for(var i = 0; i < select_id.length; i++){
                            
                            new_url = url+select_id[i]+']';
                            window.open(new_url);
                        }
                    }
                });
                button_k.on('click', function(e){
                    e.preventDefault();
                    var select_id = [];
                    var str_arr = '';
                    $('tbody input:checked').each(function(){
                        select_id.push($(this).closest('tr').attr('data-model-id'));
                    });
                    var url = 'https://uat.aa-testing.com/cortana/export-k?id_array=[';
                    if(select_id && select_id.length > 0)
                    {
                        // str_arr = JSON.stringify(select_id);
                        // window.location.href = url + str_arr;
                        var new_url = '';
                        for(var i = 0; i < select_id.length; i++){
                            
                            new_url = url+select_id[i]+']';
                            window.open(new_url);
                        }
                    }
                });
                button_p1.on('click', function(e){
                    e.preventDefault();
                    var select_id = [];
                    var str_arr = '';
                    $('tbody input:checked').each(function(){
                        select_id.push($(this).closest('tr').attr('data-model-id'));
                    });
                    var url = 'https://uat.aa-testing.com/cortana/demo2?id_array=[';
                    if(select_id && select_id.length > 0)
                    {
                        // str_arr = JSON.stringify(select_id);
                        // window.location.href = url + str_arr;
                        var new_url = '';
                        for(var i = 0; i < select_id.length; i++){
                            
                            new_url = url+select_id[i]+']';
                            window.open(new_url);
                        }
                    }
                });
                button_p2.on('click', function(e){
                    e.preventDefault();
                    var select_id = [];
                    var str_arr = '';
                    $('tbody input:checked').each(function(){
                        select_id.push($(this).closest('tr').attr('data-model-id'));
                    });
                    var url = 'https://uat.aa-testing.com/cortana/demo3?id_array=[';
                    if(select_id && select_id.length > 0)
                    {
                        // str_arr = JSON.stringify(select_id);
                        // window.location.href = url + str_arr;
                        var new_url = '';
                        for(var i = 0; i < select_id.length; i++){
                            
                            new_url = url+select_id[i]+']';
                            window.open(new_url);
                        }
                    }
                });
                button_p3.on('click', function(e){
                    e.preventDefault();
                    var select_id = [];
                    var str_arr = '';
                    $('tbody input:checked').each(function(){
                        select_id.push($(this).closest('tr').attr('data-model-id'));
                    });
                    var url = 'https://uat.aa-testing.com/cortana/demo4?id_array=[';
                    if(select_id && select_id.length > 0)
                    {
                        // str_arr = JSON.stringify(select_id);
                        // window.location.href = url + str_arr;
                        var new_url = '';
                        for(var i = 0; i < select_id.length; i++){
                            
                            new_url = url+select_id[i]+']';
                            window.open(new_url);
                        }
                    }
                });
                button_p4.on('click', function(e){
                    e.preventDefault();
                    var select_id = [];
                    var str_arr = '';
                    $('tbody input:checked').each(function(){
                        select_id.push($(this).closest('tr').attr('data-model-id'));
                    });
                    var url = 'https://uat.aa-testing.com/cortana/demo5?id_array=[';
                    if(select_id && select_id.length > 0)
                    {
                        // str_arr = JSON.stringify(select_id);
                        // window.location.href = url + str_arr;
                        var new_url = '';
                        for(var i = 0; i < select_id.length; i++){
                            
                            new_url = url+select_id[i]+']';
                            window.open(new_url);
                        }
                    }
                });

                button_n3_inbound.on('click', function(e){
                    e.preventDefault();
                    $('#hidden_form_id').val('https://uat.aa-testing.com/cortana/export-n3');
                    $('.popup-inner').hide();
                    $('.popup-inner-2').show();
                    $('.popup-inner-2 button').text('團隊人數列表');
                    $('.popup-window').fadeIn();
                    // var queryString = '';
                    // var from = null;
                    // var to = null;
                    // $('.o_facet_value').each(function(index, el) {
                    //     var text = $(el).html().trim();
                    //     console.log(text);
                    //     if (text.startsWith('到達日期 is between')) {
                    //         var raw_date = text.replace('到達日期 is between', '').replace('and', '-').replaceAll('"', '').replaceAll(' ', '');
                    //         var date_array = raw_date.split('-');
                    //         from = date_array[0];
                    //         to = date_array[1]
                    //         queryString = '?from=' + from + '&to=' + to + '&inbound=true';
                    //         return false;
                    //     }
                    // });
                    // if (from != null && to != null){
                    // var url = 'https://uat.aa-testing.com/cortana/export-n3' +  queryString;
                    //     window.location.href = url;
                    // }
                });
                button_n4_inbound.on('click', function(e){
                    e.preventDefault();
                    $('#hidden_form_id').val('https://uat.aa-testing.com/cortana/export-n4');
                    $('.popup-inner').hide();
                    $('.popup-inner-2').show();
                    $('.popup-inner-2 button').text('代理人數列表');
                    $('.popup-window').fadeIn();
                    // var queryString = '';
                    // var from = null;
                    // var to = null;
                    // $('.o_facet_value').each(function(index, el) {
                    //     var text = $(el).html().trim();
                    //     console.log(text);
                    //     if (text.startsWith('到達日期 is between')) {
                    //         var raw_date = text.replace('到達日期 is between', '').replace('and', '-').replaceAll('"', '').replaceAll(' ', '');
                    //         var date_array = raw_date.split('-');
                    //         from = date_array[0];
                    //         to = date_array[1]
                    //         queryString = '?from=' + from + '&to=' + to + '&inbound=true';
                    //         return false;
                    //     }
                    // });
                    // if (from != null && to != null){
                    // var url = 'https://uat.aa-testing.com/cortana/export-n4' +  queryString;
                    //     window.location.href = url;
                    // }
                });
                button_n5_inbound.on('click', function(e){
                    e.preventDefault();
                    $('#hidden_form_id').val('https://uat.aa-testing.com/cortana/export-n5');
                    $('.popup-inner').hide();
                    $('.popup-inner-2').show();
                    $('.popup-inner-2 button').text('代理摘要統計');
                    $('.popup-window').fadeIn();
                    // var queryString = '';
                    // var from = null;
                    // var to = null;
                    // $('.o_facet_value').each(function(index, el) {
                    //     var text = $(el).html().trim();
                    //     console.log(text);
                    //     if (text.startsWith('到達日期 is between')) {
                    //         var raw_date = text.replace('到達日期 is between', '').replace('and', '-').replaceAll('"', '').replaceAll(' ', '');
                    //         var date_array = raw_date.split('-');
                    //         from = date_array[0];
                    //         to = date_array[1]
                    //         queryString = '?from=' + from + '&to=' + to + '&inbound=true';
                    //         return false;
                    //     }
                    // });
                    // if (from != null && to != null){
                    // var url = 'https://uat.aa-testing.com/cortana/export-n5' +  queryString;
                    //     window.location.href = url;
                    // }
                });
                button_inbound_check.on('click', function(e){
                    e.preventDefault();
                    var select_id = [];
                    $('tbody input:checked').each(function(){
                        select_id.push($(this).closest('tr').attr('data-model-id'));
                    });
                    var url = 'https://uat.aa-testing.com/cortana/export-inbound-check/';
                    if(select_id && select_id.length > 0)
                    {
                        window.location.href = url + select_id[0];
                    }
                });

                
            }
            if (this.modelName === 'x_report') { // Change model name
                $('body').append(`<style>
                    .popup-window{
                        display:none;
                        position: absolute;
                        z-index: 1000;
                        width: 100%;
                        height: 100%;
                        background-color: rgba(0,0,0,0.1);
                    }
                    .popup-inner{
                        max-width: 500px;
                        margin: 0 auto;
                        margin-top: 10%;
                        background:rgba(255,255,255, 0.9);
                        padding: 20px;
                    }
 
                </style>
                <div class="popup-window">
                    <div class="popup-inner">
                        <input type="hidden" value="" id="hidden_form_id">
                        <div>
                            <div style="display:inline-block; width:29%">開始日期</div>
                            <div style="display:inline-block; width:70%"><input type="date" name="start_date"></div>
                        </div>
                        <div>
                            <div style="display:inline-block; width:29%">結束日期</div>
                            <div style="display:inline-block; width:70%"><input type="date" name="end_date"></div>
                        </div>
                        <button type="button" class="btn btn-primary">Export</button>
                    </div>
                </div>`);
                $('.popup-window').on('click', function(e){
                    if(e.target == this)
                    {
                        $('.popup-window').fadeOut();
                    }
                })
                $('.popup-inner button').on('click', function(e){
                    e.preventDefault();
                    var url = $('#hidden_form_id').val();
                    var start = $('[name="start_date"]').val();
                    var end = $('[name="end_date"]').val();

                    if (start && end){
                        url = url + '?from=' + start + '&to=' + end;
                        console.log(url);
                        window.location.href = url;
                    }
                })
                var button_n1 = this.$buttons.find('button.cortana__export_n1_button__button');
                var button_n2 = this.$buttons.find('button.cortana__export_n2_button__button');
                button_n1.on('click', function(e){
                    e.preventDefault();
                    $('#hidden_form_id').val('https://uat.aa-testing.com/cortana/export-n1');
                    $('.popup-inner button').text('摘要人數列表');
                    $('.popup-window').fadeIn();
                    // var queryString = '';
                    // var from = null;
                    // var to = null;
                    // $('.o_facet_value').each(function(index, el) {
                    //     var text = $(el).html().trim();
                    //     console.log(text);
                    //     if (text.startsWith('Last Updated on is between')) {
                    //         var raw_date = text.replace('Last Updated on is between ', '').replace('and', '-').replace('00:00:00', '').replace('23:59:59', '').replaceAll('"', '').replaceAll(' ', '');
                    //         var date_array = raw_date.split('-');
                    //         from = date_array[0];
                    //         to = date_array[1]
                    //         queryString = '?from=' + from + '&to=' + to;
                    //         return false;
                    //     }
                    // });
                    // if (from != null && to != null){
                    // var url = 'https://uat.aa-testing.com/cortana/export-n1' +  queryString;
                    //     window.location.href = url;
                    // }
                });

                button_n2.on('click', function(e){
                    e.preventDefault();
                    $('#hidden_form_id').val('https://uat.aa-testing.com/cortana/export-n2');
                    $('.popup-inner button').text('明細人數列表');
                    $('.popup-window').fadeIn();
                    // var queryString = '';
                    // var from = null;
                    // var to = null;
                    // $('.o_facet_value').each(function(index, el) {
                    //     var text = $(el).html().trim();
                    //     console.log(text);
                    //     if (text.startsWith('Last Updated on is between')) {
                    //         var raw_date = text.replace('Last Updated on is between ', '').replace('and', '-').replace('00:00:00', '').replace('23:59:59', '').replaceAll('"', '').replaceAll(' ', '');
                    //         var date_array = raw_date.split('-');
                    //         from = date_array[0];
                    //         to = date_array[1]
                    //         queryString = '?from=' + from + '&to=' + to;
                    //         return false;
                    //     }
                    // });
                    // if (from != null && to != null){
                    //     var url = 'https://uat.aa-testing.com/cortana/export-n2' +  queryString;
                    //     window.location.href = url;
                    // }
                })
            }
            if(this.modelName === 'x_in_bound_tour' )
            {
                $('body').append(`<style>
                    .popup-window{
                        display:none;
                        position: absolute;
                        z-index: 1000;
                        width: 100%;
                        height: 100%;
                        background-color: rgba(0,0,0,0.1);
                    }
                    .popup-inner{
                        max-width: 500px;
                        margin: 0 auto;
                        margin-top: 10%;
                        background:rgba(255,255,255, 0.9);
                        padding: 20px;
                    }
 
                </style>
                <div class="popup-window">
                    <div class="popup-inner">
                        <input type="hidden" value="" id="hidden_form_id">
                        <div>
                            <div style="display:inline-block; width:29%">開始日期</div>
                            <div style="display:inline-block; width:70%"><input type="date" name="start_date"></div>
                        </div>
                        <div>
                            <div style="display:inline-block; width:29%">結束日期</div>
                            <div style="display:inline-block; width:70%"><input type="date" name="end_date"></div>
                        </div>
                        <button type="button" class="btn btn-primary">Export</button>
                    </div>
                </div>`);
                $('.popup-window').on('click', function(e){
                    if(e.target == this)
                    {
                        $('.popup-window').fadeOut();
                    }
                })
                $('.popup-inner button').on('click', function(e){
                    e.preventDefault();
                    var url = $('#hidden_form_id').val();
                    var start = $('[name="start_date"]').val();
                    var end = $('[name="end_date"]').val();

                    if (start && end){
                        url = url + '?outbound=true&from=' + start + '&to=' + end;
                        console.log(url);
                        window.location.href = url;
                    }
                })
                var button_n3_outbound = this.$buttons.find('button.cortana__export_n3_outbound_button__button');
                var button_n4_outbound = this.$buttons.find('button.cortana__export_n4_outbound_button__button');
                var button_n5_outbound = this.$buttons.find('button.cortana__export_n5_outbound_button__button');
                var button_outbound_check = this.$buttons.find('button.cortana__export_outbound_check_button__button');

                button_n3_outbound.on('click', function(e){
                    e.preventDefault();
                    $('#hidden_form_id').val('https://uat.aa-testing.com/cortana/export-n3');
                    $('.popup-inner button').text('團隊人數列表');
                    $('.popup-window').fadeIn();
                    // var queryString = '';
                    // var from = null;
                    // var to = null;
                    // $('.o_facet_value').each(function(index, el) {
                    //     var text = $(el).html().trim();
                    //     console.log(text);
                    //     if (text.startsWith('出發日期 is between')) {
                    //         var raw_date = text.replace('出發日期 is between', '').replace('and', '-').replaceAll('"', '').replaceAll(' ', '');
                    //         var date_array = raw_date.split('-');
                    //         from = date_array[0];
                    //         to = date_array[1]
                    //         queryString = '?from=' + from + '&to=' + to + '&outbound=true';
                    //         return false;
                    //     }
                    // });
                    // if (from != null && to != null){
                    // var url = 'https://uat.aa-testing.com/cortana/export-n3' +  queryString;
                    //     window.location.href = url;
                    // }
                });
                button_n4_outbound.on('click', function(e){
                    e.preventDefault();
                    $('#hidden_form_id').val('https://uat.aa-testing.com/cortana/export-n4');
                    $('.popup-inner button').text('代理人數列表');
                    $('.popup-window').fadeIn();
                    // var queryString = '';
                    // var from = null;
                    // var to = null;
                    // $('.o_facet_value').each(function(index, el) {
                    //     var text = $(el).html().trim();
                    //     console.log(text);
                    //     if (text.startsWith('出發日期 is between')) {
                    //         var raw_date = text.replace('出發日期 is between', '').replace('and', '-').replaceAll('"', '').replaceAll(' ', '');
                    //         var date_array = raw_date.split('-');
                    //         from = date_array[0];
                    //         to = date_array[1]
                    //         queryString = '?from=' + from + '&to=' + to + '&outbound=true';
                    //         return false;
                    //     }
                    // });
                    // if (from != null && to != null){
                    // var url = 'https://uat.aa-testing.com/cortana/export-n4' +  queryString;
                    //     window.location.href = url;
                    // }
                });
                button_n5_outbound.on('click', function(e){
                    e.preventDefault();
                    $('#hidden_form_id').val('https://uat.aa-testing.com/cortana/export-n5');
                    $('.popup-inner button').text('代理摘要統計');
                    $('.popup-window').fadeIn();
                    // var queryString = '';
                    // var from = null;
                    // var to = null;
                    // $('.o_facet_value').each(function(index, el) {
                    //     var text = $(el).html().trim();
                    //     console.log(text);
                    //     if (text.startsWith('出發日期 is between')) {
                    //         var raw_date = text.replace('出發日期 is between', '').replace('and', '-').replaceAll('"', '').replaceAll(' ', '');
                    //         var date_array = raw_date.split('-');
                    //         from = date_array[0];
                    //         to = date_array[1]
                    //         queryString = '?from=' + from + '&to=' + to + '&outbound=true';
                    //         return false;
                    //     }
                    // });
                    // if (from != null && to != null){
                    // var url = 'https://uat.aa-testing.com/cortana/export-n5' +  queryString;
                    //     window.location.href = url;
                    // }
                });
                button_outbound_check.on('click', function(e){
                    e.preventDefault();
                    var select_id = [];
                    $('tbody input:checked').each(function(){
                        select_id.push($(this).closest('tr').attr('data-model-id'));
                    });
                    var url = 'https://uat.aa-testing.com/cortana/export-outbound-check/';
                    if(select_id && select_id.length > 0)
                    {
                        window.location.href = url + select_id[0];
                    }
                })
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

    var hotelDashboardIsShown = false;

    setInterval(function() {
        var hash = window.location.hash.substr(1);
        var result = hash.split('&').reduce(function (res, item) {
            var parts = item.split('=');
            res[parts[0]] = parts[1];
            return res;
        }, {});

        var urlSearchParams = new URLSearchParams(window.location.search);
        var params = Object.fromEntries(urlSearchParams.entries());

        $('html').attr('data-app-model', result.model).attr('data-app-view-type', result.view_type).attr('data-app-studio', params.studio == undefined ? 'ok' : params.studio);
    }, 1);
});

$(function() {
    console.log('aaa');
    setInterval(function() {
        var hash = window.location.hash.substr(1);
        var result = hash.split('&').reduce(function (res, item) {
            var parts = item.split('=');
            res[parts[0]] = parts[1];
            return res;
        }, {});

        var urlSearchParams = new URLSearchParams(window.location.search);
        var params = Object.fromEntries(urlSearchParams.entries());

        if (result.model === 'x_hotel01' && result.view_type === 'list' && params.studio == undefined) {
            if (!hotelDashboardIsShown) {
                hotelDashboardIsShown = true;
                $('.hotel-dashboard-container').remove();
                if ($('.hotel-dashboard-container').length === 0) {
                    $('<div class="hotel-dashboard-container"></div>').insertAfter('.o_action_manager');
                    var base_url = 'https://uat.aa-testing.com/cortana/hotel-dashboard';
                    $.get(base_url, function(data) {
                        $('.hotel-dashboard-container').html(data.html);
                    })
                }
            }
        } else {
            $('.hotel-dashboard-container').remove();
            hotelDashboardIsShown = false;
        }
    }, 1);
})