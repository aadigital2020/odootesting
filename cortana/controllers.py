# -*- coding: utf-8 -*-
from odoo import http

class Cortana(http.Controller):
    @http.route('/cortana/export', type='http', auth='public')
    def handler(self, **kw):
        return 'aaa'

    @http.route('/cortana/example/ajax', type='http', auth='user')
    def handler(self, **kw):
        return 'bbb'