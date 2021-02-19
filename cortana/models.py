# -*- coding: utf-8 -*-

from odoo import models, fields, api

class InBoundTourExtend(models.Model):
    _inherit = 'x_in_bound_tours'

    field_1 = fields.Char(required=True,string="Field One")
    
    @api.model
    def create(self, vals):
        ## Definition
        return super(models.Model, self).create(vals)