# -*- coding: utf-8 -*-
{
    'name': "Cortana",

    'summary': """Cortana""",

    'description': """Cortana""",

    'author': "A&A Limited",
    'website': "http://www.aa-limited.com",

    'category': 'Test',
    'version': '1.54',

    'depends': ['base', 'web', 'web_studio'],

    'data': [
        'views/assets.xml',
        # 'views/today_search.xml',
    ],

    'external_dependencies': {
        'python' : [],
    },

    'qweb': [
        'qweb/export_button.xml',
    ],
}