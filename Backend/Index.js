require.config(
{
	'waitSeconds' : 30,
	'paths'		:
	{
		'babel'						:	'../Library/Babel/Babel-Standalone_6.26.0/babel.min',
		'jsx'						:	'../Library/RequireJS/RequireJS-Babel-JSX_1.0.0/jsx',
		'react'						:	'../Library/React/React_16.31.1/UMD/react.development',
		'react-dom'					:	'../Library/React/React-DOM_16.31.1/UMD/react-dom.development.min',
		'react-router-dom'			:	'../Library/React/React-Router-DOM_5.2.0/react-router-dom',
		'jquery'					:	'../Library/Server_Template/vendors/jquery/jquery.min',
		'popper'					:	'../Library/Server_Template/vendors/popper.js/popper.min',
		'bootstrap'					:	'../Library/Server_Template/vendors/bootstrap/js/bootstrap.min',
		'jquery.overlayScrollbars'	:	'../Library/Server_Template/vendors/overlay-scrollbars/jquery.overlayScrollbars.min',
		'autosize'					:	'../Library/Server_Template/vendors/autosize/autosize.min',
		'select2'					:	'../Library/Server_Template/vendors/select2/js/select2.full.min',
		'tokenize2'					:	'../Library/Tokenize2_1.3.2/tokenize2.min',
		'jquery.dataTables'			:	'../Library/Server_Template/vendors/datatables/jquery.dataTables.min',
		'dataTables.buttons'		:	'../Library/Server_Template/vendors/datatables/datatables-buttons/dataTables.buttons.min',
		'buttons.print'				:	'../Library/Server_Template/vendors/datatables/datatables-buttons/buttons.print.min',
		'buttons.html5'				:	'../Library/Server_Template/vendors/datatables/datatables-buttons/buttons.html5.min',
		'loader'					:	'../Library/Google_Chart_48.1/loader',
		'waves'						:	'../Library/Waves_0.7.6/waves.min',
		'universalCookie'			:	'../Library/Universal-Cookie_4.0.3/UMD/universalCookie.min',
		'flatpickr'					:	'../Library/Server_Template/vendors/flatpickr/flatpickr.min',
		'web3'						:	'../Library/Web3_1.2.9/web3',
		'ethereumjs-tx'				:	'../Library/EthereumJS/ethereumjs-tx/ethereumjs-tx-1.3.3.min'
	},

	'shim'		:
	{
		'jquery.overlayScrollbars'	:	{ 'deps'	:	['jquery'] },
		'tokenize2'					:	{ 'deps'	:	['jquery'] },
		'flatpickr'					:	{ 'deps'	:	['jquery'] }
	},

	'map'		:
	{
		'react-router-dom'		:
		{
			'history'			:	'react-router-dom',
			'react-router'		:	'react-router-dom'
		},

		'bootstrap'				:
		{
			'popper.js'			:	'popper'
		},

		'dataTables.buttons'	:
		{
			'datatables.net'	:	'jquery.dataTables'
		},

		'buttons.print'	:
		{
			'datatables.net'			:	'jquery.dataTables',
			'datatables.net-buttons'	:	'dataTables.buttons'
		},

		'buttons.html5'	:
		{
			'datatables.net'			:	'jquery.dataTables',
			'datatables.net-buttons'	:	'dataTables.buttons'
		},

		'flatpickr'		:
		{
			'exports'	:	'Flatpickr'
		},

		'flatpickr.confirmDate'	:
		{
			'deps'	:	['flatpickr'],
			'exports': 'confirmDatePlugin'
		},

		'flatpickr.labelPlugin'	:
		{
			'deps'	:	['flatpickr'],
			'exports': 'labelPlugin'
		},

		'flatpickr.weekSelect':
		{
			'deps'		:	['flatpickr'],
			'exports'	:	'weekSelectPlugin'
		},

		'flatpickr.nl'	:	['flatpickr'],
		'flatpickr.de'	:	['flatpickr'],
		'flatpickr.fr'	:	['flatpickr'],
		'flatpickr.es'	:	['flatpickr']
	}
})

require
(
	[
		'react',
		'react-dom',
		'react-router-dom',
		'jquery',
		'popper',
		'bootstrap',
		'jquery.overlayScrollbars',
		'autosize',
		'select2',
		'tokenize2',
		'jquery.dataTables',
		'dataTables.buttons',
		'buttons.print',
		'buttons.html5',
		'loader',
		'waves',
		'flatpickr',
		'universalCookie',
		'web3',
		'ethereumjs-tx'
	],
	(
		React,
		ReactDOM,
		ReactRouterDOM,
		jQuery,
		Popper,
		Bootstrap,
		jQueryOverlayScrollbars,
		Autosize,
		Select2,
		tokenize2,
		jQueryDataTables,
		DataTablesButtons,
		ButtonsPrint,
		ButtonsHTML5,
		Loader,
		Waves,
		Flatpickr,
		UniversalCookie,
		Web3,
		EthereumJS_TX
	) =>
{
	window.React					=	React
	window.Component				=	React.Component

	window.ReactDOM					=	ReactDOM
	window.findDOMNode				=	ReactDOM.findDOMNode

	window.ReactRouterDOM			=	ReactRouterDOM
	window.BrowserRouter			=	ReactRouterDOM.BrowserRouter
	window.NavLink					=	ReactRouterDOM.NavLink
	window.Redirect					=	ReactRouterDOM.Redirect
	window.Route					=	ReactRouterDOM.Route
	window.Switch					=	ReactRouterDOM.Switch

	window.$						=	jQuery
	window.jQuery					=	jQuery
	window.autosize					=	Autosize

	window.flatpickr				=	Flatpickr

	window.cookies					=	new UniversalCookie()

	window.Web3						=	Web3
	window.EthereumJS_TX			=	EthereumJS_TX

	require
	([
		'Function/ECIMS_Main_HTTP',
		'jsx!Interface/ECIMS_Sample',
		'jsx!Interface/ECIMS_Navigator',
		'jsx!Interface/ECIMS_Manipulator',
		'jsx!Interface/ECIMS_Preloader',
		'jsx!Interface/ECIMS_Header',
		'jsx!Interface/ECIMS_Sidebar',
		'jsx!Interface/ECIMS_Footer',
		'jsx!Interface/ECIMS_Dialog',
		'jsx!Interface/ECIMS_Authenticator',
		'jsx!Interface/ECIMS_Organogram',
		'jsx!Interface/ECIMS_Blockchain',
		'jsx!Interface/ECIMS_Cooperative',
		'jsx!Interface/ECIMS_Cooperative_Registration',
		'jsx!Interface/ECIMS_Cooperator',
		'jsx!Interface/ECIMS_Cooperator_Account'
	], () =>
	{
		require
		([
			'ECIMS_Main_HTTP',
			'ECIMS_Sample',
			'ECIMS_Navigator',
			'ECIMS_Manipulator',
			'ECIMS_Preloader',
			'ECIMS_Header',
			'ECIMS_Sidebar',
			'ECIMS_Footer',
			'ECIMS_Dialog',
			'ECIMS_Authenticator',
			'ECIMS_Organogram',
			'ECIMS_Blockchain',
			'ECIMS_Cooperative',
			'ECIMS_Cooperative_Registration',
			'ECIMS_Cooperator',
			'ECIMS_Cooperator_Account'
		], () =>
		{
			require(['jsx!Interface/ECIMS_Index'], () =>
			{
				require(['ECIMS_Index'], () => {})
			})
		})
	})
})