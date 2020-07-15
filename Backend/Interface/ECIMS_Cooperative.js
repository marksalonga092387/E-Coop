define('ECIMS_Cooperative', () =>
{
	class ECIMS_Cooperative extends Component
	{
		constructor()
		{
			if (System_Mode == 'Development')
				console.log('Succesfully Loaded : ECIMS_Cooperative Class')

			super()

			this.state =
			{
				'Action'																:	'',
				'Interface'																:	<div></div>,
				'Card_State'															:	'Minimize',

				'Cooperative_Member_Composition'										:	[],
				'Cooperative_Member_Projected_Growth'									:	[],
				'Cooperative_Member_Projected_Growth_Key_Counter'						:	0,

				'EconomicAspect_Strategy'												:	[],
				'EconomicAspect_Strategy_Key_Counter'									:	0,
				'EconomicAspect_Activity'												:	[],
				'EconomicAspect_Activity_Key_Counter'									:	0,

				'FinancialAspect_Capitalization_Generate_Capital'						:	[],
				'FinancialAspect_Capitalization_Internal_Capital_Strategy'				:	[],
				'FinancialAspect_Capitalization_Internal_Capital_Strategy_Key_Counter'	:	0,
				'FinancialAspect_Revenue_Projected'										:	[],
				'FinancialAspect_Revenue_Projected_Key_Counter'							:	0,
				'FinancialAspect_Expense_Estimated'										:	[],
				'FinancialAspect_Expense_Estimated_Key_Counter'							:	0,
				'FinancialAspect_Organization_Investment'								:	[],

				'TechnicalAspect_Equipment'												:	[],
				'TechnicalAspect_Machinery'												:	[],
				'TechnicalAspect_Facility'												:	[],
				'TechnicalAspect_Procurement_Mode'										:	[],
				'TechnicalAspect_Operator_Background'									:	[],
				'TechnicalAspect_Operator_Background_Key_Counter'						:	0,

				'OrganizationalStructure_Member_Eligibility'							:	[],
				'OrganizationalStructure_Member_Eligibility_Key_Counter'				:	0,
				'OrganizationalStructure_Program'										:	[],
				'OrganizationalStructure_Program_Key_Counter'							:	0,

				'OrganizationalStructure_Member'										:	[],

				'OrganizationalStructure_Member_Position'								:	[],
				'OrganizationalStructure_Member_Position_Key_Counter'					:	0,

				'OrganizationalStructure_Member_Chart'									:	[],
				'OrganizationalStructure_Member_Chart_Key_Counter'						:	0,

				'OrganizationalStructure_Committee'										:	[],

				'OrganizationalStructure_Committee_Member'								:	[],
				'OrganizationalStructure_Committee_Member_Key_Counter'					:	0
			}

			this.Element =
			{
				'Cooperative_Name'									:	React.createRef(),
				'Cooperative_Background'							:	React.createRef(),
				'Cooperative_Rationale'								:	React.createRef(),
				'Cooperative_Type'									:	React.createRef(),
				'Cooperative_Category'								:	React.createRef(),
				'Cooperative_Region'								:	React.createRef(),
				'Cooperative_Province'								:	React.createRef(),
				'Cooperative_Locality'								:	React.createRef(),
				'Cooperative_Office_Address'						:	React.createRef(),
				'Cooperative_Operation_Area'						:	React.createRef(),
				'Cooperative_Common_Bond'							:	React.createRef(),
				'Cooperative_Member_Composition'					:	React.createRef(),
				'Cooperative_Founder'								:	React.createRef(),
				'Cooperative_Organization_Registration'				:	React.createRef(),
				'ShareCapital_Authorized'							:	React.createRef(),
				'ShareCapital_Issued'								:	React.createRef(),
				'ShareCapital_Unissued'								:	React.createRef(),
				'ShareCapital_Subscribed'							:	React.createRef(),
				'ShareCapital_Unsubscribed'							:	React.createRef(),
				'ShareCapital_Called-Up'							:	React.createRef(),
				'ShareCapital_Uncalled'								:	React.createRef(),
				'ShareCapital_Paid-Up'								:	React.createRef(),
				'ShareCapital_Unpaid'								:	React.createRef(),
				'ShareCapital_Reserve'								:	React.createRef(),
				'ShareCapital_Par_Value'							:	React.createRef(),
				'ShareCapital_Share_Sold'							:	React.createRef(),
				'ShareCapital_Authorized_Summary'					:	React.createRef(),
				'ShareCapital_Subscribed_Summary'					:	React.createRef(),
				'ShareCapital_Paid-Up_Summary'						:	React.createRef(),
				'ShareCapital_Par_Value_Summary'					:	React.createRef(),
				'EconomicAspect_Identical_Cooperative_Plan'			:	React.createRef(),
				'EconomicAspect_Target_Market'						:	React.createRef(),
				'FinancialAspect_Capitalization_Generate_Capital'	:	React.createRef(),
				'FinancialAspect_Capitalization_Initial_Capital'	:	React.createRef(),
				'FinancialAspect_Organization_Investment'			:	React.createRef(),
				'TechnicalAspect_Equipment'							:	React.createRef(),
				'TechnicalAspect_Machinery'							:	React.createRef(),
				'TechnicalAspect_Facility'							:	React.createRef(),
				'TechnicalAspect_Procurement_Mode'					:	React.createRef(),
				'OrganizationalStructure_Member_Chart'				:	React.createRef(),

				'Form_Cooperative_1'								:	React.createRef(),
				'Form_Cooperative_2'								:	React.createRef(),
				'Form_Cooperative_ShareCapital'						:	React.createRef(),
				'Form_Cooperative_EconomicAspect'					:	React.createRef(),
				'Form_Cooperative_FinancialAspect'					:	React.createRef(),
				'Form_Cooperative_TechnicalAspect'					:	React.createRef(),
				'Form_Cooperative_OrganizationalStructure'			:	React.createRef(),
				'Form_Cooperative_OrganizationalStructure_Remark'	:	React.createRef(),
				'Table_OrganizationalStructure_Member'				:	React.createRef(),
				'Table_OrganizationalStructure_Committee'			:	React.createRef(),
				'Table_Cooperative_OrganizationalStructure_Remark'	:	React.createRef()
			}
		}

		ShareCapital_Manage()
		{
			let
			get_Element_A = $(this.Element['ShareCapital_Authorized']),
			get_Element_B = $(this.Element['ShareCapital_Issued']),
			get_Element_C = $(this.Element['ShareCapital_Unissued']),
			get_Element_D = $(this.Element['ShareCapital_Subscribed']),
			get_Element_E = $(this.Element['ShareCapital_Unsubscribed']),
			get_Element_F = $(this.Element['ShareCapital_Called-Up']),
			get_Element_G = $(this.Element['ShareCapital_Uncalled']),
			get_Element_H = $(this.Element['ShareCapital_Paid-Up']),
			get_Element_I = $(this.Element['ShareCapital_Unpaid']),
			get_Element_J = $(this.Element['ShareCapital_Reserve']),
			get_Element_K = $(this.Element['ShareCapital_Par_Value']),
			get_Element_L = $(this.Element['ShareCapital_Share_Sold'])

			let
			A = get_Element_A.val(),
			B = get_Element_B.val(),
			C = get_Element_C.val(),
			D = get_Element_D.val(),
			E = get_Element_E.val(),
			F = get_Element_F.val(),
			G = get_Element_G.val(),
			H = get_Element_H.val(),
			I = get_Element_I.val(),
			J = get_Element_J.val(),
			K = get_Element_K.val(),
			L = get_Element_L.val()

			B = K * L
			C = A - B
			E = B - D
			G = D - F
			I = F - H
			J = D - F

			get_Element_B.val(B)
			get_Element_C.val(C)
			get_Element_E.val(E)
			get_Element_G.val(G)
			get_Element_I.val(I)
			get_Element_J.val(J)

			$(this.Element['ShareCapital_Authorized_Summary']).val(A)
			$(this.Element['ShareCapital_Subscribed_Summary']).val(D)
			$(this.Element['ShareCapital_Paid-Up_Summary']).val(H)
			$(this.Element['ShareCapital_Par_Value_Summary']).val(K)


			console.log(A), console.log(B), console.log(C), console.log(D),
			console.log(E), console.log(F), console.log(G), console.log(H),
			console.log(I), console.log(J), console.log(K), console.log(L)
		}

		componentDidMount()
		{
			if (System_Mode == 'Development')
				console.log('Succesfully Executed componentDidMount() : ECIMS_Cooperative Class')

			if (location.pathname == '/Cooperative/Add' || location.pathname == '/Cooperative/Create')
				System_Preloader.Load(1000, this, Cooperative_Registration.Cooperative_Registration_Interface(this), () =>
				{
					this.setState({ 'Action' : location.pathname.split('/').slice(-1) })
					Cooperative_Registration.Cooperative_Registration_Initialization(this)
					$('form').on('submit', set_Event => { set_Event.preventDefault() })
				})

			else
				System_Preloader.Load(1000, this, <ECIMS_Sample/>, () => {})
		}

		render()
		{
			if (System_Mode == 'Development')
				console.log('Succesfully Executed render() : ECIMS_Cooperative Class')

			return	this.state['Interface']
		}
	}

	window.ECIMS_Cooperative = ECIMS_Cooperative
})