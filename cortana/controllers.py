# -*- coding: utf-8 -*-
from odoo import http
import json

class Cortana(http.Controller):
    @http.route('/cortana/cortana/export', type='http', auth='user')
    def export(self, **kw):
        return http.request.make_response(
            json.dumps({
                'name': 'John',
                'age': 30,
                'city': 'New York'
            }),
            [('Content-Type', 'application/json'),
        ])

    @http.route('/cortana/cortana/example/ajax', type='json', auth='user')
    def ajax(self, **kw):
        return 'bbb'