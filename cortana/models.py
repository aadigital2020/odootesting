# -*- coding: utf-8 -*-

from odoo import models, fields, api

import logging
_logger = logging.getLogger(__name__)

# class InBoundTourExtend(models.Model):
#     _inherit = 'x_in_bound_tour'

#     field_1 = fields.Char(required=True,string="Field One")
    
#     @api.model
#     def create(self, vals):
#         ## Definition
#         _logger.debug('Create a %s with vals %s', self._name, vals)
#         return super(models.Model, self).create(vals)