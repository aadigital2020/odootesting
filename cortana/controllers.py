# -*- coding: utf-8 -*-
from odoo import http
import json

class Cortana(http.Controller):
    @http.route('/cortana/cortana/test', type='json', auth='user')
    def test(self, **kw):
        models = http.request.env['x_this_is_tour_123'].search([]) # Change model name

        # Print models
        raw_data = models.read()
        return raw_data
        json_data = json.dumps(raw_data, indent=4, sort_keys=True, default=str)
        return json_data
    
    @http.route('/cortana/cortana/export', type='http', auth='user')
    def export(self, **kw):
        data = json.dumps(
            {
                'name': 'John',
                'age': 30,
                'city': 'New York'
            }
        )
        return http.request.make_response(data, [
            ('Content-disposition', 'attachment; filename=export.json'),
            ('Content-Type', 'application/json'),
        ])

    @http.route('/cortana/cortana/example/ajax', type='json', auth='user')
    def ajax(self, **kw):
        return 'bbb'