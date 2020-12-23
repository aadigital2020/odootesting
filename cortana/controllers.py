# -*- coding: utf-8 -*-
from odoo import http
import json

class Cortana(http.Controller):
    @http.route('/cortana/cortana/test', type='json', auth='user')
    def test(self, **kw):
        results = http.request.env['x_this_is_tour_123'].search([]) # Change model name
        data = json.dumps(results)
        return data

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