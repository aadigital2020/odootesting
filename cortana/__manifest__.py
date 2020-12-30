# -*- coding: utf-8 -*-
{
    'name': "Cortana",

    'summary': """Cortana""",

    'description': """Cortana""",

    'author': "A&A Limited",
    'website': "http://www.aa-limited.com",

    'category': 'Test',
    'version': '1.2',

    'depends': ['base', 'web', 'sale'],

    'data': [
        'views/assets.xml',
    ],

    'external_dependencies': {
        'python' : [],
    },

    'qweb': [
        'qweb/export_button.xml',
        'qweb/today_search.xml',
    ],
}