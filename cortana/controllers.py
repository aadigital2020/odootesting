# -*- coding: utf-8 -*-
from odoo import http

class Cortana(http.Controller):
    @http.route('/cortana/cortana/check', type='http', auth='user')
    def handler(self, **kw):
        return {
            'test' : 'test'
        }

    @http.route('/cortana/cortana/example/ajax', type='json', auth='user')
    def handler(self, **kw):
        return 'bbb'