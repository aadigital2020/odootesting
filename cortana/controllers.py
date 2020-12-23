# -*- coding: utf-8 -*-
from odoo import http

class Cortana(http.Controller):
    @http.route('/cortana/export/', auth='public')
    def handler(self, **kw):
        return 'Hello, world'