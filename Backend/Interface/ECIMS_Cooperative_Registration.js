define('ECIMS_Cooperative_Registration', () =>
{
	class ECIMS_Cooperative_Registration extends ECIMS_Cooperative
	{
		constructor()
		{
			if (System_Mode == 'Development')
				console.log('Succesfully Loaded : ECIMS_Cooperative_Registration Class')

			super()
		}

		Manage_Cooperative_Registration(set_Action, set_Data)
		{
			let get_Promise = new Promise(System_Manipulator.System_Dialog_Promise)

			System_Dialog.Title = 'Are You sure?'
			System_Dialog.Size = 'Small'
			System_Dialog.Mode = 'Choice'

			System_Dialog.Alert_Interface = 'Warning'

			if (set_Action == 'Update : Specific : [ User_State ]')
				System_Dialog.Alert_Text = 'This Cooperative will be deleted.'

			else
			{
				System_Dialog.Alert_Text = 'This Cooperative will be saved.'

				if (set_Action == 'Insert : Specific')
					set_Data.append('Action', 'Insert_Cooperative_EconomicSurvey')

				else if (set_Action == 'Insert : Specific')
					set_Data.append('Action', 'Update_Cooperative_EconomicSurvey')
			}

			get_Promise.then((set_Resolve_Data) =>
			{
				if (set_Resolve_Data == 'Yes')
				{
					System_Dialog.Title = 'Loading...'
					System_Dialog.Mode = 'Wait'
					System_Dialog.Hide_Button()

					ECIMS_Main_HTTP.Manage(set_Data, set_Callback_Data =>
					{
						setTimeout(() => System_Dialog.Hide(), 1000)
					})
				}

				else if (set_Resolve_Data == 'No')
					System_Dialog.Hide()
				
				else
					console.log('No Resolve Data')
			})
		}

		get_Cooperative_Registration_Data()
		{
			let get_Form_Cooperative_1_Validation								=	System_Manipulator.set_Form_Validation(this.Form_Cooperative_1)
			let get_Form_Cooperative_2_Validation								=	System_Manipulator.set_Form_Validation(this.Form_Cooperative_2)
			let get_Form_Cooperative_ShareCapital_Validation					=	System_Manipulator.set_Form_Validation(this.Form_Cooperative_ShareCapital)
			let get_Form_Cooperative_EconomicAspect_Validation					=	System_Manipulator.set_Form_Validation(this.Form_Cooperative_EconomicAspect)
			let get_Form_Cooperative_FinancialAspect_Validation					=	System_Manipulator.set_Form_Validation(this.Form_Cooperative_FinancialAspect)
			let get_Form_Cooperative_TechnicalAspect_Validation					=	System_Manipulator.set_Form_Validation(this.Form_Cooperative_TechnicalAspect)
			let get_Form_Cooperative_OrganizationalStructure_Validation			=	System_Manipulator.set_Form_Validation(this.Form_Cooperative_OrganizationalStructure)
			let get_Form_Cooperative_OrganizationalStructure_Remark_Validation	=	System_Manipulator.set_Form_Validation(this.Form_Cooperative_OrganizationalStructure_Remark)

			let get_Form_Cooperative_1_Data										=	System_Manipulator.get_Form_Data([new FormData(this.Form_Cooperative_1[0])], 'JSON')
			let get_Form_Cooperative_2_Data										=	System_Manipulator.get_Form_Data([new FormData(this.Form_Cooperative_2[0])], 'JSON')
			let get_Form_Cooperative_ShareCapital_Data							=	System_Manipulator.get_Form_Data([new FormData(this.Form_Cooperative_ShareCapital[0])], 'JSON')
			let get_Form_Cooperative_EconomicAspect_Data						=	System_Manipulator.get_Form_Data([new FormData(this.Form_Cooperative_EconomicAspect[0])], 'JSON')
			let get_Form_Cooperative_FinancialAspect_Data						=	System_Manipulator.get_Form_Data([new FormData(this.Form_Cooperative_FinancialAspect[0])], 'JSON')
			let get_Form_Cooperative_TechnicalAspect_Data						=	System_Manipulator.get_Form_Data([new FormData(this.Form_Cooperative_TechnicalAspect[0])], 'JSON')
			let get_Form_Cooperative_OrganizationalStructure_Data				=	System_Manipulator.get_Form_Data([new FormData(this.Form_Cooperative_OrganizationalStructure[0])], 'JSON')
			let get_Cooperative_OrganizationalStructure_Member_Chart_Data		=	this.Element['OrganizationalStructure_Member_Chart'].current.Data
			let get_Form_Cooperative_OrganizationalStructure_Remark_Data		=	System_Manipulator.get_Form_Data([new FormData(this.Form_Cooperative_OrganizationalStructure_Remark[0])], 'JSON')

			delete get_Form_Cooperative_2_Data['Cooperative_Member_Composition']
			delete get_Form_Cooperative_2_Data['Cooperative_Organization_Registration']
			delete get_Form_Cooperative_2_Data['Cooperative_Member_Projected_Growth_Value']
			delete get_Form_Cooperative_2_Data['Cooperative_Member_Projected_Growth_Year']

			get_Form_Cooperative_2_Data['Cooperative_Member_Composition']			=	$(this.Element['Cooperative_Member_Composition'].current).val()
			get_Form_Cooperative_2_Data['Cooperative_Organization_Registration']	=	$(this.Element['Cooperative_Organization_Registration'].current).val()
			get_Form_Cooperative_2_Data['Cooperative_Member_Projected_Growth']		=	this.state.Cooperative_Member_Projected_Growth

			delete get_Form_Cooperative_EconomicAspect_Data['EconomicAspect_Identical_Cooperative_Plan']
			delete get_Form_Cooperative_EconomicAspect_Data['EconomicAspect_Target_Market']
			delete get_Form_Cooperative_EconomicAspect_Data['EconomicAspect_Strategy_Description']
			delete get_Form_Cooperative_EconomicAspect_Data['EconomicAspect_Activity_Year']
			delete get_Form_Cooperative_EconomicAspect_Data['EconomicAspect_Activity_Description']

			get_Form_Cooperative_EconomicAspect_Data['EconomicAspect_Identical_Cooperative_Plan']	=	$(this.Element['EconomicAspect_Identical_Cooperative_Plan'].current).val()
			get_Form_Cooperative_EconomicAspect_Data['EconomicAspect_Target_Market']				=	$(this.Element['EconomicAspect_Target_Market'].current).val()
			get_Form_Cooperative_EconomicAspect_Data['EconomicAspect_Strategy']						=	this.state.EconomicAspect_Strategy
			get_Form_Cooperative_EconomicAspect_Data['EconomicAspect_Activity']						=	this.state.EconomicAspect_Activity

			delete get_Form_Cooperative_ShareCapital_Data['ShareCapital_Authorized_Summary']
			delete get_Form_Cooperative_ShareCapital_Data['ShareCapital_Subscribed_Summary']
			delete get_Form_Cooperative_ShareCapital_Data['ShareCapital_Paid-Up_Summary']
			delete get_Form_Cooperative_ShareCapital_Data['ShareCapital_Par_Value_Summary']

			delete get_Form_Cooperative_ShareCapital_Data['ShareCapital_Authorized_Summary_Example']
			delete get_Form_Cooperative_ShareCapital_Data['ShareCapital_Subscribed_Summary_Example']
			delete get_Form_Cooperative_ShareCapital_Data['ShareCapital_Paid-Up_Summary_Example']
			delete get_Form_Cooperative_ShareCapital_Data['ShareCapital_Par_Value_Summary_Example']

			delete get_Form_Cooperative_FinancialAspect_Data['FinancialAspect_Capitalization_Internal_Capital_Strategy_Description']
			delete get_Form_Cooperative_FinancialAspect_Data['FinancialAspect_Revenue_Projected_Year']
			delete get_Form_Cooperative_FinancialAspect_Data['FinancialAspect_Revenue_Projected_Value']
			delete get_Form_Cooperative_FinancialAspect_Data['FinancialAspect_Expense_Estimated_Year']
			delete get_Form_Cooperative_FinancialAspect_Data['FinancialAspect_Expense_Estimated_Value']

			get_Form_Cooperative_FinancialAspect_Data['FinancialAspect_Capitalization_Generate_Capital']			=	$(this.Element['FinancialAspect_Capitalization_Generate_Capital'].current).val()
			get_Form_Cooperative_FinancialAspect_Data['FinancialAspect_Organization_Investment']					=	$(this.Element['FinancialAspect_Organization_Investment'].current).val()
			get_Form_Cooperative_FinancialAspect_Data['FinancialAspect_Capitalization_Internal_Capital_Strategy']	=	this.state.FinancialAspect_Capitalization_Internal_Capital_Strategy
			get_Form_Cooperative_FinancialAspect_Data['FinancialAspect_Revenue_Projected']							=	this.state.FinancialAspect_Revenue_Projected
			get_Form_Cooperative_FinancialAspect_Data['FinancialAspect_Expense_Estimated']							=	this.state.FinancialAspect_Expense_Estimated

			delete get_Form_Cooperative_TechnicalAspect_Data['TechnicalAspect_Operator_Background_Description']

			get_Form_Cooperative_TechnicalAspect_Data['TechnicalAspect_Equipment']				=	$(this.Element['TechnicalAspect_Equipment'].current).val()
			get_Form_Cooperative_TechnicalAspect_Data['TechnicalAspect_Machinery']				=	$(this.Element['TechnicalAspect_Machinery'].current).val()
			get_Form_Cooperative_TechnicalAspect_Data['TechnicalAspect_Facility']				=	$(this.Element['TechnicalAspect_Facility'].current).val()
			get_Form_Cooperative_TechnicalAspect_Data['TechnicalAspect_Procurement_Mode']		=	$(this.Element['TechnicalAspect_Procurement_Mode'].current).val()
			get_Form_Cooperative_TechnicalAspect_Data['TechnicalAspect_Operator_Background']	=	this.state.TechnicalAspect_Operator_Background

			get_Form_Cooperative_OrganizationalStructure_Data = {}

			let get_Table_OrganizationalStructure_Member_Data = []

			this.Table_OrganizationalStructure_Member.DataTable().rows().every((set_RowIndex, set_TableLoop, set_RowLoop) =>
			{
				let get_Row = {}

				$(this.Table_OrganizationalStructure_Member.DataTable().row(set_RowLoop).node()).children('td').each((set_Index, set_Element) =>
				{
					let get_Element = $(set_Element).find('p').next()

					if (get_Element.attr('name') == 'Position_Name')
						get_Row['Position_Name'] = get_Element.val()

					else if (get_Element.attr('name') == 'Member_Fullname')
						get_Row['Member_Fullname'] = get_Element.val()

					else if (get_Element.attr('name') == 'Member_Appointment_Status')
						get_Row['Member_Appointment_Status'] = get_Element.val()

					else if (get_Element.attr('name') == 'Member_Eligibility')
						get_Row['Member_Eligibility'] = get_Element.val()

					else if (get_Element.attr('name') == 'Member_Compensation')
						get_Row['Member_Compensation'] = get_Element.val()

				})

				get_Table_OrganizationalStructure_Member_Data.push(get_Row)
			})

			let get_Table_OrganizationalStructure_Committee_Data = []

			this.Table_OrganizationalStructure_Committee.DataTable().rows().every((set_RowIndex, set_TableLoop, set_RowLoop) =>
			{
				let get_Row = {}

				$(this.Table_OrganizationalStructure_Committee.DataTable().row(set_RowLoop).node()).children('td').each((set_Index, set_Element) =>
				{
					let get_Element = $(set_Element).find('p').next()

					if (get_Element.attr('name') == 'Committee_Name')
						get_Row['Committee_Name'] = get_Element.val()

					else if (get_Element.attr('name') == 'Committee_Chairman')
						get_Row['Committee_Chairman'] = get_Element.val()

					else if (get_Element.attr('name') == 'Committee_Member')
						get_Row['Committee_Member'] = get_Element.val()

					else if (get_Element.attr('name') == 'Committee_Description')
						get_Row['Committee_Description'] = get_Element.val()

				})

				get_Table_OrganizationalStructure_Committee_Data.push(get_Row)
			})

			get_Form_Cooperative_OrganizationalStructure_Data['OrganizationalStructure_Member_Eligibility']	=	this.state.OrganizationalStructure_Member_Eligibility
			get_Form_Cooperative_OrganizationalStructure_Data['OrganizationalStructure_Program']			=	this.state.OrganizationalStructure_Program
			get_Form_Cooperative_OrganizationalStructure_Data['OrganizationalStructure_Member']				=	get_Table_OrganizationalStructure_Member_Data
			get_Form_Cooperative_OrganizationalStructure_Data['OrganizationalStructure_Committee']			=	get_Table_OrganizationalStructure_Committee_Data

			let get_Cooperative_OrganizationalStructure_Remark_Member_Data = []

			$(this.Element['Table_Cooperative_OrganizationalStructure_Remark'].current).children('tbody').children('tr').each((set_Index, set_Element) =>
			{
				let get_Row = {}

				$($(set_Element).children('td')).each((set_Index, set_Element) =>
				{
					let get_Element = $(set_Element).children('input')

					if (get_Element.attr('name') == 'OrganizationalStructure_Remark_Member')
						get_Row['OrganizationalStructure_Remark_Member'] = get_Element.val()

					else if (get_Element.attr('name') == 'OrganizationalStructure_Remark_Proof')
						get_Row['OrganizationalStructure_Remark_Proof'] = get_Element.val()

					else if (get_Element.attr('name') == 'OrganizationalStructure_Remark_Address')
						get_Row['OrganizationalStructure_Remark_Address'] = get_Element.val()
					
				})

				get_Cooperative_OrganizationalStructure_Remark_Member_Data.push(get_Row)

			})

			get_Form_Cooperative_OrganizationalStructure_Remark_Data = {}

			get_Form_Cooperative_OrganizationalStructure_Remark_Data['Cooperative_OrganizationalStructure_Remark_Member'] = get_Cooperative_OrganizationalStructure_Remark_Member_Data
			get_Form_Cooperative_OrganizationalStructure_Remark_Data['OrganizationalStructure_Remark_Day'] = $('input[name = "OrganizationalStructure_Remark_Day"]').val()
			get_Form_Cooperative_OrganizationalStructure_Remark_Data['OrganizationalStructure_Remark_Month'] = $('input[name = "OrganizationalStructure_Remark_Month"]').val()
			get_Form_Cooperative_OrganizationalStructure_Remark_Data['OrganizationalStructure_Remark_Year'] = $('input[name = "OrganizationalStructure_Remark_Year"]').val()
			get_Form_Cooperative_OrganizationalStructure_Remark_Data['OrganizationalStructure_Remark_Address'] = $('input[name = "OrganizationalStructure_Remark_Address"]').val()

			//programming

			$('.Data_1').text(JSON.stringify(get_Form_Cooperative_1_Data))
			$('.Data_2').text(JSON.stringify(get_Form_Cooperative_2_Data))
			$('.Data_3').text(JSON.stringify(get_Form_Cooperative_ShareCapital_Data))
			$('.Data_4').text(JSON.stringify(get_Form_Cooperative_EconomicAspect_Data))
			$('.Data_5').text(JSON.stringify(get_Form_Cooperative_FinancialAspect_Data))
			$('.Data_6').text(JSON.stringify(get_Form_Cooperative_TechnicalAspect_Data))
			$('.Data_7').text(JSON.stringify(get_Form_Cooperative_OrganizationalStructure_Data))
			$('.Data_8').text(JSON.stringify(get_Cooperative_OrganizationalStructure_Member_Chart_Data))
			$('.Data_9').text(JSON.stringify(get_Form_Cooperative_OrganizationalStructure_Remark_Data))

			let get_Data =
			{
				'Cooperative_1' : get_Form_Cooperative_1_Data,
				'Cooperative_2' : get_Form_Cooperative_2_Data,
				'Cooperative_ShareCapital' : get_Form_Cooperative_ShareCapital_Data,
				'Cooperative_EconomicAspect' : get_Form_Cooperative_EconomicAspect_Data,
				'Cooperative_FinancialAspect' : get_Form_Cooperative_FinancialAspect_Data,
				'Cooperative_TechnicalAspect' : get_Form_Cooperative_TechnicalAspect_Data,
				'Cooperative_OrganizationalStructure' : get_Form_Cooperative_OrganizationalStructure_Data,
				'Cooperative_OrganizationalStructure_Member_Chart' : get_Cooperative_OrganizationalStructure_Member_Chart_Data,
				'Cooperative_OrganizationalStructure_Remark' : get_Form_Cooperative_OrganizationalStructure_Remark_Data
			}

			let get_FormData = new FormData()
			get_FormData.append('Cooperative_EconomicSurvey', JSON.stringify(get_Data))

			return get_FormData
		}

		Cooperative_Registration_Initialization()
		{
			const Initialize_Cooperative_1 = (() =>
			{
				this.Form_Cooperative_1 = $(this.Element['Form_Cooperative_1'].current)

				System_Manipulator.set_Textarea_Autosize({ 'Element' : $(this.Element['Cooperative_Background'].current) })
				System_Manipulator.set_Textarea_Autosize({ 'Element' : $(this.Element['Cooperative_Rationale'].current) })
			})()

			const Initialize_Cooperative_2 = (() =>
			{
				this.Form_Cooperative_2 = $(this.Element['Form_Cooperative_2'].current)

				System_Manipulator.set_Select({ 'Element' : $(this.Element['Cooperative_Type'].current)})
				System_Manipulator.set_Select({ 'Element' : $(this.Element['Cooperative_Category'].current)})
				System_Manipulator.set_Select({ 'Element' : $(this.Element['Cooperative_Region'].current)})
				System_Manipulator.set_Select({ 'Element' : $(this.Element['Cooperative_Province'].current)})
				System_Manipulator.set_Select({ 'Element' : $(this.Element['Cooperative_Locality'].current)})
				System_Manipulator.set_Select({ 'Element' : $(this.Element['Cooperative_Operation_Area'].current)})
				System_Manipulator.set_Select({ 'Element' : $(this.Element['Cooperative_Common_Bond'].current)})
				System_Manipulator.set_Select({ 'Element' : $(this.Element['Cooperative_Organization_Registration'].current)})

				this.state.Cooperative_Member_Composition.push('Men')
				this.state.Cooperative_Member_Composition.push('Women')
				this.state.Cooperative_Member_Composition.push('Students')
				this.state.Cooperative_Member_Composition.push('Teachers')
				this.state.Cooperative_Member_Composition.push('Farmer')
				this.state.Cooperative_Member_Composition.push('Worker')
				this.state.Cooperative_Member_Composition.push('Single Parents')
				this.state.Cooperative_Member_Composition.push('Over Age People')

				System_Manipulator.set_Input_Multiple
				({
					'Element'	:	$(this.Element['Cooperative_Member_Composition'].current),
					'Array'		:	this.state.Cooperative_Member_Composition
				})

				this.state.Cooperative_Member_Projected_Growth.push
				({
					'Growth_Key'	:	'Growth-' + this.state.Cooperative_Member_Projected_Growth_Key_Counter ++,
					'Growth_Year'	:	2020,
					'Growth_Value'	:	0
				})

				this.state.Cooperative_Member_Projected_Growth.push
				({
					'Growth_Key'	:	'Growth-' + this.state.Cooperative_Member_Projected_Growth_Key_Counter ++,
					'Growth_Year'	:	2021,
					'Growth_Value'	:	0
				})

				this.state.Cooperative_Member_Projected_Growth.push
				({
					'Growth_Key'	:	'Growth-' + this.state.Cooperative_Member_Projected_Growth_Key_Counter ++,
					'Growth_Year'	:	2022,
					'Growth_Value'	:	0
				})

				this.forceUpdate()
			})()

			const Initialize_Cooperative_ShareCapital = (() =>
			{
				this.Form_Cooperative_ShareCapital = $(this.Element['Form_Cooperative_ShareCapital'].current)
			})()

			const Initialize_Cooperative_EconomicAspect = (() =>
			{
				this.Form_Cooperative_EconomicAspect = $(this.Element['Form_Cooperative_EconomicAspect'].current)

				System_Manipulator.set_Select({ 'Element' : $(this.Element['EconomicAspect_Identical_Cooperative_Plan'].current)})
				System_Manipulator.set_Select({ 'Element' : $(this.Element['EconomicAspect_Target_Market'].current)})

				let get_EconomicAspect_Strategy = this.state.EconomicAspect_Strategy

				get_EconomicAspect_Strategy.push
				({
					'Strategy_Key'			:	'Strategy-' + this.state.EconomicAspect_Strategy_Key_Counter ++,
					'Strategy_Description'	:	'Collective purchases'
				})

				get_EconomicAspect_Strategy.push
				({
					'Strategy_Key'			:	'Strategy-' + this.state.EconomicAspect_Strategy_Key_Counter ++,
					'Strategy_Description'	:	'Commitment on lending policies'
				})

				get_EconomicAspect_Strategy.push
				({
					'Strategy_Key'			:	'Strategy-' + this.state.EconomicAspect_Strategy_Key_Counter ++,
					'Strategy_Description'	:	'Active participation in cooperative affairs'
				})

				this.setState({ 'EconomicAspect_Strategy' : get_EconomicAspect_Strategy }, () =>
				{
					System_Manipulator.set_Textarea_Autosize
					({
						'Element' : $('textarea[name = "EconomicAspect_Strategy_Description"]')
					})
				})

				let get_EconomicAspect_Activity = this.state.EconomicAspect_Activity

				get_EconomicAspect_Activity.push
				({
					'Activity_Key'			:	'Activity-' + this.state.EconomicAspect_Activity_Key_Counter ++,
					'Activity_Year'			:	2020,
					'Activity_Description'	:	'Recruit'
				})

				get_EconomicAspect_Activity.push
				({
					'Activity_Key'			:	'Activity-' + this.state.EconomicAspect_Activity_Key_Counter ++,
					'Activity_Year'			:	2021,
					'Activity_Description'	:	'Free Education'
				})

				get_EconomicAspect_Activity.push
				({
					'Activity_Key'			:	'Activity-' + this.state.EconomicAspect_Activity_Key_Counter ++,
					'Activity_Year'			:	2022,
					'Activity_Description'	:	'Accumulate Donations'
				})

				this.setState({ 'EconomicAspect_Activity' : get_EconomicAspect_Activity }, () =>
				{
					System_Manipulator.set_Textarea_Autosize
					({
						'Element' : $('textarea[name = "EconomicAspect_Activity_Description"]')
					})
				})
			})()

			const Initialize_Cooperative_FinancialAspect = (() =>
			{
				this.Form_Cooperative_FinancialAspect = $(this.Element['Form_Cooperative_FinancialAspect'].current)

				System_Manipulator.set_Select({ 'Element' : $(this.Element['FinancialAspect_Capitalization_Generate_Capital'].current)})

				let get_FinancialAspect_Capitalization_Internal_Capital_Strategy = this.state.FinancialAspect_Capitalization_Internal_Capital_Strategy

				get_FinancialAspect_Capitalization_Internal_Capital_Strategy.push
				({
					'Strategy_Key'			:	'Strategy-' + this.state.FinancialAspect_Capitalization_Internal_Capital_Strategy_Key_Counter ++,
					'Strategy_Description'	:	'Member Capitalization'
				})

				get_FinancialAspect_Capitalization_Internal_Capital_Strategy.push
				({
					'Strategy_Key'			:	'Strategy-' + this.state.FinancialAspect_Capitalization_Internal_Capital_Strategy_Key_Counter ++,
					'Strategy_Description'	:	'Member Loans'
				})

				get_FinancialAspect_Capitalization_Internal_Capital_Strategy.push
				({
					'Strategy_Key'			:	'Strategy-' + this.state.FinancialAspect_Capitalization_Internal_Capital_Strategy_Key_Counter ++,
					'Strategy_Description'	:	'Bank debt'
				})

				get_FinancialAspect_Capitalization_Internal_Capital_Strategy.push
				({
					'Strategy_Key'			:	'Strategy-' + this.state.FinancialAspect_Capitalization_Internal_Capital_Strategy_Key_Counter ++,
					'Strategy_Description'	:	'Expansion'
				})

				get_FinancialAspect_Capitalization_Internal_Capital_Strategy.push
				({
					'Strategy_Key'			:	'Strategy-' + this.state.FinancialAspect_Capitalization_Internal_Capital_Strategy_Key_Counter ++,
					'Strategy_Description'	:	'Start-ups'
				})

				get_FinancialAspect_Capitalization_Internal_Capital_Strategy.push
				({
					'Strategy_Key'			:	'Strategy-' + this.state.FinancialAspect_Capitalization_Internal_Capital_Strategy_Key_Counter ++,
					'Strategy_Description'	:	'Summing up the grubstake'
				})

				this.setState({ 'FinancialAspect_Capitalization_Internal_Capital_Strategy' : get_FinancialAspect_Capitalization_Internal_Capital_Strategy }, () =>
				{
					System_Manipulator.set_Textarea_Autosize
					({
						'Element' : $('textarea[name = "FinancialAspect_Capitalization_Internal_Capital_Strategy_Description"]')
					})
				})

				let get_FinancialAspect_Revenue_Projected = this.state.FinancialAspect_Revenue_Projected

				get_FinancialAspect_Revenue_Projected.push
				({
					'Revenue_Key'			:	'Revenue-' + this.state.FinancialAspect_Revenue_Projected_Key_Counter ++,
					'Revenue_Year'			:	2021,
					'Revenue_Value'			:	0
				})

				get_FinancialAspect_Revenue_Projected.push
				({
					'Revenue_Key'			:	'Revenue-' + this.state.FinancialAspect_Revenue_Projected_Key_Counter ++,
					'Revenue_Year'			:	2022,
					'Revenue_Value'			:	0
				})

				get_FinancialAspect_Revenue_Projected.push
				({
					'Revenue_Key'			:	'Revenue-' + this.state.FinancialAspect_Revenue_Projected_Key_Counter ++,
					'Revenue_Year'			:	2023,
					'Revenue_Value'			:	0
				})

				this.forceUpdate()

				let get_FinancialAspect_Expense_Estimated = this.state.FinancialAspect_Expense_Estimated

				get_FinancialAspect_Expense_Estimated.push
				({
					'Expense_Key'			:	'Expense-' + this.state.FinancialAspect_Expense_Estimated_Key_Counter ++,
					'Expense_Year'			:	2021,
					'Expense_Value'			:	0
				})

				get_FinancialAspect_Expense_Estimated.push
				({
					'Expense_Key'			:	'Expense-' + this.state.FinancialAspect_Expense_Estimated_Key_Counter ++,
					'Expense_Year'			:	2022,
					'Expense_Value'			:	0
				})

				get_FinancialAspect_Expense_Estimated.push
				({
					'Expense_Key'			:	'Expense-' + this.state.FinancialAspect_Expense_Estimated_Key_Counter ++,
					'Expense_Year'			:	2023,
					'Expense_Value'			:	0
				})

				this.forceUpdate()

				this.state.FinancialAspect_Organization_Investment.push('Cooperative Bank')
				this.state.FinancialAspect_Organization_Investment.push('Federation')
				this.state.FinancialAspect_Organization_Investment.push('Joint Ventures')
				this.state.FinancialAspect_Organization_Investment.push('Mutual')
				this.state.FinancialAspect_Organization_Investment.push('Insurance')

				System_Manipulator.set_Input_Multiple
				({
					'Element'	:	$(this.Element['FinancialAspect_Organization_Investment'].current),
					'Array'		:	this.state.FinancialAspect_Organization_Investment
				})
			})()

			const Initialize_Cooperative_TechnicalAspect = (() =>
			{
				this.Form_Cooperative_TechnicalAspect = $(this.Element['Form_Cooperative_TechnicalAspect'].current)

				this.state.TechnicalAspect_Equipment.push('Typewriter')
				this.state.TechnicalAspect_Equipment.push('Computer')
				this.state.TechnicalAspect_Equipment.push('Table')
				this.state.TechnicalAspect_Equipment.push('Chair')
				this.state.TechnicalAspect_Equipment.push('Calculator')
				this.state.TechnicalAspect_Equipment.push('Vault/Safe')
				this.state.TechnicalAspect_Equipment.push('Filing Cabinet')
				this.state.TechnicalAspect_Equipment.push('Medical Instrument')
				this.state.TechnicalAspect_Equipment.push('Farm Equipment')
				this.state.TechnicalAspect_Equipment.push('Post Harvest Equipment')
				this.state.TechnicalAspect_Equipment.push('Solar Dryer')
				this.state.TechnicalAspect_Equipment.push('Fishing Equipment')
				this.state.TechnicalAspect_Equipment.push('Printer')
				this.state.TechnicalAspect_Equipment.push('Desk')
				this.state.TechnicalAspect_Equipment.push('Telephone')

				System_Manipulator.set_Input_Multiple
				({
					'Element'	:	$(this.Element['TechnicalAspect_Equipment'].current),
					'Array'		:	this.state.TechnicalAspect_Equipment
				})

				this.state.TechnicalAspect_Machinery.push('Milling')
				this.state.TechnicalAspect_Machinery.push('Xerox Machine')
				this.state.TechnicalAspect_Machinery.push('Bulldozer')
				this.state.TechnicalAspect_Machinery.push('Backhoe')
				this.state.TechnicalAspect_Machinery.push('Road Grader')
				this.state.TechnicalAspect_Machinery.push('Textile')
				this.state.TechnicalAspect_Machinery.push('Semiconductor')
				this.state.TechnicalAspect_Machinery.push('Plastic')
				this.state.TechnicalAspect_Machinery.push('Elevator')
				this.state.TechnicalAspect_Machinery.push('Escalator')
				this.state.TechnicalAspect_Machinery.push('Conveyor')
				this.state.TechnicalAspect_Machinery.push('Stacker')
				this.state.TechnicalAspect_Machinery.push('Tractor')
				this.state.TechnicalAspect_Machinery.push('Combine')
				this.state.TechnicalAspect_Machinery.push('Plow')

				System_Manipulator.set_Input_Multiple
				({
					'Element'	:	$(this.Element['TechnicalAspect_Machinery'].current),
					'Array'		:	this.state.TechnicalAspect_Machinery
				})

				this.state.TechnicalAspect_Facility.push('Warehouse')
				this.state.TechnicalAspect_Facility.push('Manufacturing Facility')
				this.state.TechnicalAspect_Facility.push('Conference Centre')
				this.state.TechnicalAspect_Facility.push('Meeting Room')

				System_Manipulator.set_Input_Multiple
				({
					'Element'	:	$(this.Element['TechnicalAspect_Facility'].current),
					'Array'		:	this.state.TechnicalAspect_Facility
				})

				this.state.TechnicalAspect_Procurement_Mode.push('Cash Purchase')
				this.state.TechnicalAspect_Procurement_Mode.push('Loans')
				this.state.TechnicalAspect_Procurement_Mode.push('Donations')

				System_Manipulator.set_Input_Multiple
				({
					'Element'	:	$(this.Element['TechnicalAspect_Procurement_Mode'].current),
					'Array'		:	this.state.TechnicalAspect_Procurement_Mode
				})
			})()

			const Initialize_Cooperative_OrganizationalStructure = (() =>
			{
				this.Form_Cooperative_OrganizationalStructure = $(this.Element['Form_Cooperative_OrganizationalStructure'].current)

				let get_OrganizationalStructure_Member_Eligibility = this.state.OrganizationalStructure_Member_Eligibility

				get_OrganizationalStructure_Member_Eligibility.push
				({
					'Eligibility_Key'			:	'Eligibility-' + this.state.OrganizationalStructure_Member_Eligibility_Key_Counter ++,
					'Eligibility_Description'	:	'Honesty and integrity.'
				})

				get_OrganizationalStructure_Member_Eligibility.push
				({
					'Eligibility_Key'			:	'Eligibility-' + this.state.OrganizationalStructure_Member_Eligibility_Key_Counter ++,
					'Eligibility_Description'	:	'Confidence.'
				})

				get_OrganizationalStructure_Member_Eligibility.push
				({
					'Eligibility_Key'			:	'Eligibility-' + this.state.OrganizationalStructure_Member_Eligibility_Key_Counter ++,
					'Eligibility_Description'	:	'Inspire Others.'
				})

				get_OrganizationalStructure_Member_Eligibility.push
				({
					'Eligibility_Key'			:	'Eligibility-' + this.state.OrganizationalStructure_Member_Eligibility_Key_Counter ++,
					'Eligibility_Description'	:	'Commitment and Passion.'
				})

				get_OrganizationalStructure_Member_Eligibility.push
				({
					'Eligibility_Key'			:	'Eligibility-' + this.state.OrganizationalStructure_Member_Eligibility_Key_Counter ++,
					'Eligibility_Description'	:	'Good Communicator.'
				})

				this.setState({ 'OrganizationalStructure_Member_Eligibility' : get_OrganizationalStructure_Member_Eligibility }, () =>
				{
					System_Manipulator.set_Textarea_Autosize
					({
						'Element' : $('textarea[name = "OrganizationalStructure_Member_Eligibility_Description"]')
					})
				})

				let get_OrganizationalStructure_Program = this.state.OrganizationalStructure_Program

				get_OrganizationalStructure_Program.push
				({
					'Program_Key'				:	'Program-' + this.state.OrganizationalStructure_Program_Key_Counter ++,
					'Program_Educatee'			:	'Members',
					'Program_Description'		:	''
				})

				get_OrganizationalStructure_Program.push
				({
					'Program_Key'				:	'Program-' + this.state.OrganizationalStructure_Program_Key_Counter ++,
					'Program_Educatee'			:	'Officers',
					'Program_Description'		:	''
				})

				get_OrganizationalStructure_Program.push
				({
					'Program_Key'				:	'Program-' + this.state.OrganizationalStructure_Program_Key_Counter ++,
					'Program_Educatee'			:	'Staffs',
					'Program_Description'		:	''
				})

				this.setState({ 'OrganizationalStructure_Program' : get_OrganizationalStructure_Program }, () =>
				{
					System_Manipulator.set_Textarea_Autosize
					({
						'Element' : $('textarea[name = "OrganizationalStructure_Program_Description"]')
					})
				})

				this.Table_OrganizationalStructure_Member = $(this.Element['Table_OrganizationalStructure_Member'].current)

				const get_Table_OrganizationalStructure_Member_Element = []

				get_Table_OrganizationalStructure_Member_Element.push
				(
					set_Data =>
					{
						return	<div>
									<p className = 'd-none'></p>
									<input name = 'Position_Name' className = 'form-control' type = 'text' defaultValue = { set_Data.data[0] } required/>
									<div className = 'valid-feedback'>Position is valid</div>
									<div className = 'invalid-feedback'>Please provide a Position</div>
								</div>
					}
				)

				get_Table_OrganizationalStructure_Member_Element.push
				(
					set_Data =>
					{
						return	<div>
									<p className = 'd-none'></p>
									<input name = 'Member_Fullname' className = 'form-control' type = 'text' defaultValue = '' required/>
									<div className = 'valid-feedback'>Fullname is valid</div>
									<div className = 'invalid-feedback'>Please provide a Fullname</div>
								</div>
					}
				)

				get_Table_OrganizationalStructure_Member_Element.push
				(
					set_Data =>
					{
						return	<div>
									<p className = 'd-none'></p>
									<select name = 'Member_Appointment_Status' className = 'form-control' data-placeholder = 'Select an Appointment Status' required>
										<option></option>
										<optgroup label = 'Select a Status of Appointment'>
											<option value = 'Continuing (Full-time)'>Continuing (Full-time)</option>
											<option value = 'Continuing (Part-time)'>Continuing (Part-time)</option>
											<option value = 'Term (Full-time)'>Term (Full-time)</option>
											<option value = 'Term (Part-time)'>Term (Part-time)</option>
											<option value = 'Contract (Full-time)'>Contract (Full-time)</option>
											<option value = 'Contract (Part-time)'>Contract (Part-time)</option>
										</optgroup>
									</select>
									<div className = 'valid-feedback'>Appointment Status is valid</div>
									<div className = 'invalid-feedback'>Please select an Appointment Status</div>
								</div>
					}
				)

				get_Table_OrganizationalStructure_Member_Element.push
				(
					set_Data =>
					{
						return	<div>
									<p className = 'd-none'></p>
									<input name = 'Member_Eligibility' className = 'form-control' type = 'text' defaultValue = '' required/>
									<div className = 'valid-feedback'>Eligibility is valid</div>
									<div className = 'invalid-feedback'>Please provide an Eligibility</div>
								</div>
					}
				)

				get_Table_OrganizationalStructure_Member_Element.push
				(
					set_Data =>
					{
						return	<div>
									<p className = 'd-none'></p>
									<input name = 'Member_Compensation' className = 'form-control' type = 'number' defaultValue = '0' required/>
									<div className = 'valid-feedback'>Compensation is valid</div>
									<div className = 'invalid-feedback'>Please provide a Compensation</div>
								</div>
					}
				)

				get_Table_OrganizationalStructure_Member_Element.push
				(
					set_Data =>
					{
						return	<div>
									<p className = 'd-none'>Delete</p>
									<button className = 'btn btn-theme waves-effect' type = 'button'>
										Delete
									</button>
								</div>
					}
				)

				this.Table_OrganizationalStructure_Member.DataTable
				({
					'lengthMenu'	:
					[
						[15, 30, 45, -1],
						['15 Rows', '30 Rows', '45 Rows', 'Everything']
					],

					'language'		:	{ 'searchPlaceholder' : 'Search for records...' },

					'sDom'			:	'<"dataTables__top"flB<"dataTables_actions">>rt<"dataTables__bottom"ip><"clear">',

					'buttons'		:
					[
						{
							extend	:	'excelHtml5',
							title	:	'Export Data'
						},

						{
							extend	:	'csvHtml5',
							title	:	'Export Data'
						},

						{
							extend	:	'print',
							title	:	'Officer/s and Employee/s'
						}
					],

					'columnDefs'	:
					[
						{
							"render": function (set_Data, set_Type, set_Row)
							{
								if (set_Type == 'filter')
								{	
									let get_Element = $($.parseHTML(set_Data)[0]).children('p')
									return get_Element.text()
								}

								return set_Data
							},

							"targets": 2
						}
					],

					'initComplete'	:	() =>
					{
						setTimeout(() =>
						{
							this.Table_OrganizationalStructure_Member.DataTable().row.add(['Manager', '', '', '', '', ''])
							this.Table_OrganizationalStructure_Member.DataTable().row.add(['Accountant', '', '', '', '', ''])
							this.Table_OrganizationalStructure_Member.DataTable().row.add(['Bookkeeper', '', '', '', '', ''])
							this.Table_OrganizationalStructure_Member.DataTable().row.add(['Cashier', '', '', '', '', ''])
							this.Table_OrganizationalStructure_Member.DataTable().row.add(['Collector', '', '', '', '', ''])
							this.Table_OrganizationalStructure_Member.DataTable().row.add(['Sales Clerk', '', '', '', '', ''])
						}, 0)

						ReactDOM.render
						(
							<div>
								<i className = 'zwicon-more-h' data-toggle = 'dropdown'></i>
								<div className = 'dropdown-menu dropdown-menu-right'>
									<a onClick =
									{
										set_Event =>
										{
											this.Table_OrganizationalStructure_Member.DataTable().row.add(['', '', '', '', '', ''])
										}
									}
									className = 'dropdown-item'>Add</a>
									<a onClick =
									{
										set_Event =>
										{
											$(set_Event.target).parent().parent().parent().prev().children('.buttons-print').click()
										}
									}
									className = 'dropdown-item'>Print</a>
									<div className = 'dropdown-divider'></div>
									<div className = 'dropdown-header border-bottom-0 pt-0'>
										<small>Download as</small>
									</div>
									<a onClick =
									{
										set_Event =>
										{
											$(set_Event.target).parent().parent().parent().prev().children('.buttons-excel').click()
										}
									}
									className = 'dropdown-item'>Excel (.xlsx)</a>
									<a onClick =
									{
										set_Event =>
										{
											$(set_Event.target).parent().parent().parent().prev().children('.buttons-csv').click()
										}
									}
									className = 'dropdown-item'>CSV (.csv)</a>
								</div>
							</div>,
							$(this.Table_OrganizationalStructure_Member.parent().find('.dataTables_actions'))[0]
						)

						System_Manipulator.set_Select({ 'Element' : $('select[name = "Member_Appointment_Status"]')})
					},

					'createdRow'	:	(set_Row, set_Data, set_Index) =>
					{
						let get_Event = set_Event =>
						{
							let get_Cell = this.Table_OrganizationalStructure_Member.DataTable().cell($(set_Event.target).parent().parent())
							let get_Node = $(get_Cell.node())

							get_Node.find('p').text(set_Event.target.value)

							if (get_Node.find('p').next().prop('tagName') == 'INPUT')
							{
								get_Node.find('input').attr('value', set_Event.target.value)
								get_Cell.data(get_Node.html()).draw()
								get_Node.find('input').on('change', get_Event)
							}

							else
							{
								setTimeout(() =>
								{
									get_Node.find('select').select2('destroy')
									$(get_Cell.data(get_Node.html()).draw())

									System_Manipulator.set_Select({ 'Element' : get_Node.find('select') })

									get_Node.find('select').val(set_Event.target.value)
									get_Node.find('.select2').find('.selection .select2-selection .select2-selection__rendered .select2-selection__placeholder').removeClass().text(set_Event.target.value)
									
									get_Node.find('select').on('change', get_Event)
								}, 0)
							}
						}

						$(set_Row).children('td').each((set_Index, set_Element) =>
						{
							let Component = get_Table_OrganizationalStructure_Member_Element[set_Index]

							ReactDOM.render(<Component data = { set_Data }/>, set_Element)
						})

						this.Table_OrganizationalStructure_Member.DataTable().page('last').draw(false)

						$(set_Row).children('td').each((set_Index, set_Element) =>
						{
							let get_Element = $(set_Element).find('p').next()

							if (get_Element.prop('tagName') == 'INPUT')
								get_Element.on('change', get_Event)

							else if (get_Element.prop('tagName') == 'SELECT')
							{
								get_Element.on('change', get_Event)
								System_Manipulator.set_Select({ 'Element' : get_Element })
							}

							else
							{
								get_Element.on('click', set_Event =>
								{
									this.Table_OrganizationalStructure_Member.DataTable().row($(set_Event.target).parents('tr')).remove().draw()
								})
							}

						})

						//this.Table_OrganizationalStructure_Member.DataTable().order([1, 'desc']).draw()

						//this.Table_OrganizationalStructure_Member.DataTable().page('last').draw(false)					
					}
				})

				this.Table_OrganizationalStructure_Committee = $(this.Element['Table_OrganizationalStructure_Committee'].current)

				const get_Table_OrganizationalStructure_Committee_Element = []

				get_Table_OrganizationalStructure_Committee_Element.push
				(
					set_Data =>
					{
						return	<div>
									<p className = 'd-none'></p>
									<input name = 'Committee_Name' className = 'form-control' type = 'text' defaultValue = { set_Data.data[0] } required/>
									<div className = 'valid-feedback'>Name is valid</div>
									<div className = 'invalid-feedback'>Please provide a Name</div>
								</div>
					}
				)

				get_Table_OrganizationalStructure_Committee_Element.push
				(
					set_Data =>
					{
						return	<div>
									<p className = 'd-none'></p>
									<select name = 'Committee_Chairman' className = 'form-control' multiple required></select>
									<div className = 'valid-feedback'>Chairman/men is valid</div>
									<div className = 'invalid-feedback'>Please provide a Chairman/men</div>
								</div>
					}
				)

				get_Table_OrganizationalStructure_Committee_Element.push
				(
					set_Data =>
					{
						return	<div>
									<p className = 'd-none'></p>
									<select name = 'Committee_Member' className = 'form-control' multiple required></select>
									<div className = 'valid-feedback'>Member/s is valid</div>
									<div className = 'invalid-feedback'>Please provide a Member/s</div>
								</div>
					}
				)

				get_Table_OrganizationalStructure_Committee_Element.push
				(
					set_Data =>
					{
						return	<div>
									<p className = 'd-none'></p>
									<textarea name = 'Committee_Description' className = 'form-control' type = 'text' required></textarea>
									<div className = 'valid-feedback'>Description is valid</div>
									<div className = 'invalid-feedback'>Please provide a Description</div>
								</div>
					}
				)

				get_Table_OrganizationalStructure_Committee_Element.push
				(
					set_Data =>
					{
						return	<div>
									<p className = 'd-none'>Delete</p>
									<button className = 'btn btn-theme waves-effect' type = 'button'>
										Delete
									</button>
								</div>
					}
				)

				this.Table_OrganizationalStructure_Committee.DataTable
				({
					'lengthMenu'	:
					[
						[15, 30, 45, -1],
						['15 Rows', '30 Rows', '45 Rows', 'Everything']
					],

					'language'		:	{ 'searchPlaceholder' : 'Search for records...' },

					'sDom'			:	'<"dataTables__top"flB<"dataTables_actions">>rt<"dataTables__bottom"ip><"clear">',

					'buttons'		:
					[
						{
							extend	:	'excelHtml5',
							title	:	'Export Data'
						},

						{
							extend	:	'csvHtml5',
							title	:	'Export Data'
						},

						{
							extend	:	'print',
							title	:	'Committee'
						}
					],

					'columnDefs'	:
					[

					],

					'initComplete'	:	() =>
					{
						setTimeout(() =>
						{
							this.Table_OrganizationalStructure_Committee.DataTable().row.add(['Audit', '', '', '', ''])
							this.Table_OrganizationalStructure_Committee.DataTable().row.add(['Credit', '', '', '', ''])
							this.Table_OrganizationalStructure_Committee.DataTable().row.add(['Election', '', '', '', ''])
							this.Table_OrganizationalStructure_Committee.DataTable().row.add(['Education & Training', '', '', '', ''])
							this.Table_OrganizationalStructure_Committee.DataTable().row.add(['Mediation/Conciliation', '', '', '', ''])
						}, 0)

						ReactDOM.render
						(
							<div>
								<i className = 'zwicon-more-h' data-toggle = 'dropdown'></i>
								<div className = 'dropdown-menu dropdown-menu-right'>
									<a onClick =
									{
										set_Event =>
										{
											this.Table_OrganizationalStructure_Committee.DataTable().row.add(['Audit', '', '', '', ''])
										}
									}
									className = 'dropdown-item'>Add</a>
									<a onClick =
									{
										set_Event =>
										{
											$(set_Event.target).parent().parent().parent().prev().children('.buttons-print').click()
										}
									}
									className = 'dropdown-item'>Print</a>
									<div className = 'dropdown-divider'></div>
									<div className = 'dropdown-header border-bottom-0 pt-0'>
										<small>Download as</small>
									</div>
									<a onClick =
									{
										set_Event =>
										{
											$(set_Event.target).parent().parent().parent().prev().children('.buttons-excel').click()
										}
									}
									className = 'dropdown-item'>Excel (.xlsx)</a>
									<a onClick =
									{
										set_Event =>
										{
											$(set_Event.target).parent().parent().parent().prev().children('.buttons-csv').click()
										}
									}
									className = 'dropdown-item'>CSV (.csv)</a>
								</div>
							</div>,
							$(this.Table_OrganizationalStructure_Committee.parent().find('.dataTables_actions'))[0]
						)

						System_Manipulator.set_Select({ 'Element' : $('select[name = "Member_Appointment_Status"]')})
					},

					'createdRow'	:	(set_Row, set_Data, set_Index) =>
					{
						let get_Event = set_Event =>
						{
							let get_Cell = this.Table_OrganizationalStructure_Committee.DataTable().cell($(set_Event.target).parent().parent())
							let get_Node = $(get_Cell.node())

							if (get_Node.find('p').next().prop('tagName') == 'INPUT')
							{
								get_Node.find('p').text(set_Event.target.value)
								get_Node.find('input').attr('value', set_Event.target.value)

								get_Cell.data(get_Node.html()).draw()

								get_Node.find('input').on('change', get_Event)
							}

							else if (get_Node.find('p').next().prop('tagName') == 'TEXTAREA')
							{
								get_Node.find('p').text(set_Event.target.value)
								get_Node.find('textarea').text(set_Event.target.value)

								get_Cell.data(get_Node.html()).draw()

								System_Manipulator.set_Textarea_Autosize({ 'Element' : get_Node.find('textarea') })
								get_Node.find('textarea').on('change', get_Event)
							}

							else
							{
								setTimeout(() =>
								{
									get_Node.find('p').text(System_Manipulator.get_Input_Multiple_Value($(set_Event.target)))
									get_Node.find('select').next().remove()

									get_Cell.data(get_Node.html()).draw()

									System_Manipulator.set_Input_Multiple
									({
										'Element'	:	get_Node.find('select'),
										'Array'		:	[]
									})

									get_Node.find('select').on('tokenize:tokens:added tokenize:tokens:remove tokenize:tokens:reorder', get_Event)
									get_Node.find('select').next().find('input').focus()
								}, 0)
							}
						}

						$(set_Row).children('td').each((set_Index, set_Element) =>
						{
							let Component = get_Table_OrganizationalStructure_Committee_Element[set_Index]

							ReactDOM.render(<Component data = { set_Data }/>, set_Element)
						})

						this.Table_OrganizationalStructure_Committee.DataTable().page('last').draw(false)

						$(set_Row).children('td').each((set_Index, set_Element) =>
						{
							let get_Element = $(set_Element).find('p').next()

							if (get_Element.prop('tagName') == 'INPUT')
								get_Element.on('change', get_Event)

							else if (get_Element.prop('tagName') == 'SELECT')
							{
								System_Manipulator.set_Input_Multiple
								({
									'Element'	:	get_Element,
									'Array'		:	[]
								})

								get_Element.on('tokenize:tokens:added tokenize:tokens:remove tokenize:tokens:reorder', get_Event)
							}

							else if (get_Element.prop('tagName') == 'TEXTAREA')
							{
								System_Manipulator.set_Textarea_Autosize({ 'Element' : get_Element })
								get_Element.on('change', get_Event)
							}

							else
							{
								get_Element.on('click', set_Event =>
								{
									this.Table_OrganizationalStructure_Committee.DataTable().row($(set_Event.target).parents('tr')).remove().draw()
								})
							}
						})
					}
				})

			})()

			const Initialize_Cooperative_OrganizationalStructure_Member_Chart = (() =>
			{

			})()

			const Initialize_Cooperative_OrganizationalStructure_Remark = (() =>
			{
				this.Form_Cooperative_OrganizationalStructure_Remark = $(this.Element['Form_Cooperative_OrganizationalStructure_Remark'].current)
			})()

			const X = (() =>
			{

			})()
		}

		Cooperative_Registration_Interface()
		{
			return	<div>
						<section className = 'content'>
							<div className = 'content__inner'>
								<div className = 'content__title'>
									<h1>Cooperative Management ({ this.state.Action })</h1>
								</div>

								<div className = 'card'>
									<div className = 'card-body'>
										<div id = 'Carousel_Cooperative_Registration' className = 'carousel slide' data-ride = 'carousel' data-interval = 'false'>
											<ol className = 'carousel-indicators'>
												<li data-target = '#Carousel_Cooperative_Registration' data-slide-to = '0' className = 'active'></li>
												<li data-target = '#Carousel_Cooperative_Registration' data-slide-to = '1'></li>
												<li data-target = '#Carousel_Cooperative_Registration' data-slide-to = '2'></li>
												<li data-target = '#Carousel_Cooperative_Registration' data-slide-to = '3'></li>
												<li data-target = '#Carousel_Cooperative_Registration' data-slide-to = '4'></li>
												<li data-target = '#Carousel_Cooperative_Registration' data-slide-to = '5'></li>
												<li data-target = '#Carousel_Cooperative_Registration' data-slide-to = '6'></li>
												<li data-target = '#Carousel_Cooperative_Registration' data-slide-to = '7'></li>
												<li data-target = '#Carousel_Cooperative_Registration' data-slide-to = '8'></li>
												<li data-target = '#Carousel_Cooperative_Registration' data-slide-to = '9'></li>
											</ol>

											<div className = 'carousel-inner' role = 'listbox'>
												<div className = 'carousel-item active'>

													<a onClick = { set_Event => System_Manipulator.set_Card_Size(set_Event, this) } className = 'page-link Card_Resizer float-right'><i className = { this.state.Card_State == 'Minimize' ? 'zwicon-expand-alt' : 'zwicon-collapse-alt' }></i></a>
													<h4 className = 'card-title'>I. Cooperative General Information</h4>
													<h6 className = 'card-subtitle'>Please provide a <span className = 'Highlight_Text'>Legitimate Background</span>&nbsp;and&nbsp;<span className = 'Highlight_Text'>Reasonable Rationale</span>&nbsp;for a proposed Cooperative</h6>

													<hr/>

													<form ref = { this.Element['Form_Cooperative_1'] }>
														<div className = 'form-row'>
															<div className = 'form-group col-md-12'>
																<a className = 'page-link Carousel_Navigator float-left' href = '#Carousel_Cooperative_Registration' role = 'button' data-slide = 'prev'>
																	<i className = 'zwicon-arrow-left'></i>
																</a>

																<a className = 'page-link Carousel_Navigator float-right' href = '#Carousel_Cooperative_Registration' role = 'button' data-slide = 'next'>
																	<i className = 'zwicon-arrow-right'></i>
																</a>
															</div>

															<div className = 'form-group col-md-12 pb-2'>
																<input ref = { this.Element['Cooperative_Name'] } name = 'Cooperative_Name' className = 'form-control' type = 'text' required/>
																<label className = 'form-control-placeholder' htmlFor = 'Cooperative_Name'>Name</label>
																<div className = 'valid-feedback'>Name is valid</div>
																<div className = 'invalid-feedback'>Please provide a Name</div>
															</div>

															<div className = 'form-group col-md-12 pb-2'>
																<textarea ref = { this.Element['Cooperative_Background'] } name = 'Cooperative_Background' className = 'form-control Textarea_Custom' type = 'text' required></textarea>
																<label className = 'form-control-placeholder' htmlFor = 'Cooperative_Background'>Background</label>
																<div className = 'valid-feedback'>Background is valid</div>
																<div className = 'invalid-feedback'>Please provide a Background</div>
															</div>

															<div className = 'form-group col-md-12 pb-2'>
																<textarea ref = { this.Element['Cooperative_Rationale'] } name = 'Cooperative_Rationale' className = 'form-control Textarea_Custom' type = 'text' required></textarea>
																<label className = 'form-control-placeholder' htmlFor = 'Cooperative_Rationale'>Rationale</label>
																<div className = 'valid-feedback'>Rationale is valid</div>
																<div className = 'invalid-feedback'>Please provide a Rationale</div>
															</div>
														</div>
													</form>
												</div>

												<div className = 'carousel-item'>

													<a onClick = { set_Event => System_Manipulator.set_Card_Size(set_Event, this) } className = 'page-link Card_Resizer float-right'><i className = { this.state.Card_State == 'Minimize' ? 'zwicon-expand-alt' : 'zwicon-collapse-alt' }></i></a>
													<h4 className = 'card-title'>II. Cooperative General Information</h4>
													<h6 className = 'card-subtitle'>Please provide a valid <span className = 'Highlight_Text'>Basic Information</span>&nbsp;for a proposed Cooperative</h6>

													<hr/>

													<form ref = { this.Element['Form_Cooperative_2'] }>
														<div className = 'form-row'>
															<div className = 'form-group col-md-12'>
																<a className = 'page-link Carousel_Navigator float-left' href = '#Carousel_Cooperative_Registration' role = 'button' data-slide = 'prev'>
																	<i className = 'zwicon-arrow-left'></i>
																</a>

																<a className = 'page-link Carousel_Navigator float-right' href = '#Carousel_Cooperative_Registration' role = 'button' data-slide = 'next'>
																	<i className = 'zwicon-arrow-right'></i>
																</a>
															</div>

															<div className = 'form-group col-md-4 pb-2'>
																<select ref = { this.Element['Cooperative_Type'] } name = 'Cooperative_Type' className = 'form-control' data-placeholder = 'Select a Type' required>
																	<option></option>
																	<optgroup label = 'Select a Type'>
																		<option id = 'Credit' value = 'Credit'>Credit</option>
																		<option id = 'Education' value = 'Education'>Education</option>
																		<option>Type 3</option>
																		<option>Type 4</option>
																		<option>Type 5</option>
																	</optgroup>
																</select>
																<div className = 'valid-feedback'>Type is valid</div>
																<div className = 'invalid-feedback'>Please select a Type</div>
															</div>

															<hr/>

															<div className = 'form-group col-md-4 pb-2'>
																<select ref = { this.Element['Cooperative_Category'] } name = 'Cooperative_Category' className = 'form-control' data-placeholder = 'Select a Category' required>
																	<option></option>
																	<optgroup label = 'Select a Category'>
																		<option id = 'Primary' value = 'Primary'>Primary</option>
																		<option id = 'Secondary' value = 'Secondary'>Secondary</option>
																		<option id = 'Tertiary' value = 'Tertiary'>Tertiary</option>
																	</optgroup>
																</select>
																<div className = 'valid-feedback'>Category is valid</div>
																<div className = 'invalid-feedback'>Please select a Category</div>
															</div>

															<div className = 'form-group col-md-4 pb-2'></div>

															<div className = 'form-group col-md-4 pb-2'>
																<select ref = { this.Element['Cooperative_Region'] } name = 'Cooperative_Region' className = 'form-control' data-placeholder = 'Select a Region' required>
																	<option></option>
																	<optgroup label = 'Select a Region'>
																		<option>NCR</option>
																		<option>Region 1</option>
																		<option>Region 2</option>
																		<option>Region 3</option>
																	</optgroup>
																</select>
																<div className = 'valid-feedback'>Region is valid</div>
																<div className = 'invalid-feedback'>Please select a Region</div>
															</div>

															<div className = 'form-group col-md-4 pb-2'>
																<select ref = { this.Element['Cooperative_Province'] } name = 'Cooperative_Province' className = 'form-control' data-placeholder = 'Select a Province' required>
																	<option></option>
																	<optgroup label = 'Select a Province'>
																		<option>Central Luzon</option>
																		<option>Cebu</option>
																	</optgroup>
																</select>
																<div className = 'valid-feedback'>Province is valid</div>
																<div className = 'invalid-feedback'>Please select a Province</div>
															</div>

															<div className = 'form-group col-md-4 pb-2'>
																<select ref = { this.Element['Cooperative_Locality'] } name = 'Cooperative_Locality' className = 'form-control' data-placeholder = 'Select a Locality' required>
																	<option></option>
																	<optgroup label = 'Select a Locality'>
																		<option>Caloocan</option>
																		<option>Malabon</option>
																	</optgroup>
																</select>
																<div className = 'valid-feedback'>Locality is valid</div>
																<div className = 'invalid-feedback'>Please select a Locality</div>
															</div>

															<hr/>

															<div className = 'form-group col-md-4 pb-2'>
																<input ref = { this.Element['Cooperative_Office_Address'] } name = 'Cooperative_Office_Address' className = 'form-control' type = 'text' required/>
																<label className = 'form-control-placeholder' htmlFor = 'Cooperative_Office_Address'>Office Address of Cooperative</label>
																<div className = 'valid-feedback'>Office Address of Cooperative is valid</div>
																<div className = 'invalid-feedback'>Please provide an Office Address of Cooperative</div>
															</div>

															<div className = 'form-group col-md-4 pb-2'>
																<select ref = { this.Element['Cooperative_Operation_Area'] } name = 'Cooperative_Operation_Area' className = 'form-control' data-placeholder = 'Select an Area of Operation' required>
																	<option></option>
																	<optgroup label = 'Select an Area of Operation'>
																		<option>Barangay</option>
																		<option>Municipal/City</option>
																		<option>Provincial</option>
																		<option>Regional</option>
																		<option>National</option>
																	</optgroup>
																</select>
																<div className = 'valid-feedback'>Area of Operation is valid</div>
																<div className = 'invalid-feedback'>Please select an Area of Operation</div>
															</div>

															<div className = 'form-group col-md-4 pb-2'>
																<select ref = { this.Element['Cooperative_Common_Bond'] } name = 'Cooperative_Common_Bond' className = 'form-control' data-placeholder = 'Select a Common Bond' required>
																	<option></option>
																	<optgroup label = 'Select a Common Bond'>
																		<option>Residential</option>
																		<option>Institutional</option>
																		<option>Occupational</option>
																		<option>Associational</option>
																	</optgroup>
																</select>
																<div className = 'valid-feedback'>Common Bond is valid</div>
																<div className = 'invalid-feedback'>Please select a Common Bond</div>
															</div>

															<div className = 'form-group col-md-4 pb-2'>
																<select ref = { this.Element['Cooperative_Member_Composition'] } name = 'Cooperative_Member_Composition' className = 'form-control' multiple required></select>
																<label className = 'form-control-placeholder' htmlFor = 'Cooperative_Member_Composition'>Composition of Members</label>
																<div className = 'valid-feedback'>Composition of Members is valid</div>
																<div className = 'invalid-feedback'>Please provide a Composition of Members</div>
															</div>

															<div className = 'form-group col-md-4 pb-2'>
																<input ref = { this.Element['Cooperative_Founder'] } name = 'Cooperative_Founder' className = 'form-control' type = 'number' required/>
																<label className = 'form-control-placeholder' htmlFor = 'Cooperative_Founder'>No. of Founding/Organizing Members</label>
																<div className = 'valid-feedback'>No. of Founding/Organizing Members is valid</div>
																<div className = 'invalid-feedback'>Please provide a No. of Founding/Organizing Members</div>
															</div>

															<div className = 'form-group col-md-4 pb-2'>
																<select ref = { this.Element['Cooperative_Organization_Registration'] } name = 'Cooperative_Organization_Registration' className = 'form-control' data-placeholder = 'Select a Government Organization' multiple required>
																	<optgroup label = 'Select a Government Organization that the proposed Cooperative previously registered'>
																		<option>Securities and Exchange Commission</option>
																		<option>Department of Labor and Employment</option>
																		<option>Department of Trade and Industry</option>
																	</optgroup>
																</select>
																<div className = 'valid-feedback'>Organization is valid</div>
																<div className = 'invalid-feedback'>Please select a Organization</div>
															</div>

															<div className = 'form-group col-md-12 pb-2'>
																<button className = 'btn btn-theme btn--icon-text waves-effect' type = 'button' data-toggle = 'collapse' data-target = '#Collapse_Cooperative_Member_Projected_Growth'>
																	<i className = 'zwicon-eye'></i>Projected&nbsp;<span className = 'Highlight_Text'>Increase of Membership</span>
																</button>
															</div>

															<div className = 'form-group col-md-12 collapse' id = 'Collapse_Cooperative_Member_Projected_Growth'>
																<div className = 'form-group col-md pb-2 Remove_Padding_Left Remove_Padding_Right'>
																	<button
																		onClick =
																		{
																			() =>
																			{
																				this.state.Cooperative_Member_Projected_Growth.push
																				({
																					'Growth_Key'	:	'Growth-' + this.state.Cooperative_Member_Projected_Growth_Key_Counter ++,
																					'Growth_Year'	:	2020,
																					'Growth_Value'	:	0
																				})

																				this.forceUpdate()
																			}
																		}
																		className = 'btn btn-outline-theme btn--icon-text waves-effect'
																		type = 'button'>
																		<i className = 'zwicon-plus-circle'></i>Add Projection
																	</button>
																	<p className = 'd-none'>{ JSON.stringify(this.state.Cooperative_Member_Projected_Growth) }</p>
																</div>
																
																<div className = 'row'>
																{
																	this.state.Cooperative_Member_Projected_Growth.map(set_Data =>
																	{
																		return	<div key = { set_Data.Growth_Key } className = 'form-group col-md-2'>
																					<div className = 'form-group col-md pb-3 Remove_Padding_Left Remove_Padding_Right'>
																						<a
																							onClick =
																							{
																								set_Event =>
																								{
																									let get_Element = set_Event.target

																									if (set_Event.target.tagName == 'I')
																										get_Element = set_Event.target.closest('a')

																									for (let set_Counter = 0; set_Counter < this.state.Cooperative_Member_Projected_Growth.length; set_Counter ++)
																									{
																										if (this.state.Cooperative_Member_Projected_Growth[set_Counter].Growth_Key == get_Element.getAttribute('growth_key'))
																										{
																											this.state.Cooperative_Member_Projected_Growth.splice(set_Counter, 1)
																											this.forceUpdate()
																											break
																										}
																									}
																								}
																							}
																							growth_key = { set_Data.Growth_Key }
																							className = 'page-link float-right'>
																							<i className = 'zwicon-close'></i>
																						</a>
																					</div>

																					<div className = 'form-group col-md pb-2 Remove_Padding_Left Remove_Padding_Right'>
																						<input
																							onChange =
																							{
																								set_Event =>
																								{
																									for (let set_Counter = 0; set_Counter < this.state.Cooperative_Member_Projected_Growth.length; set_Counter ++)
																									{
																										if (this.state.Cooperative_Member_Projected_Growth[set_Counter].Growth_Key == set_Event.target.getAttribute('growth_key'))
																										{
																											this.state.Cooperative_Member_Projected_Growth[set_Counter].Growth_Year = set_Event.target.value
																											this.forceUpdate()
																											break
																										}
																									}
																								}
																							}
																							growth_key = { set_Data.Growth_Key }
																							name = 'Cooperative_Member_Projected_Growth_Year'
																							className = 'form-control'
																							type = 'number'
																							defaultValue = { set_Data.Growth_Year }
																							required/>
																						<label className = 'form-control-placeholder' htmlFor = 'Cooperative_Member_Projected_Growth_Year'>Year</label>
																						<div className = 'valid-feedback'>Year is valid</div>
																						<div className = 'invalid-feedback'>Please provide a Year</div>
																					</div>

																					<div className = 'form-group col-md pb-2 Remove_Padding_Left Remove_Padding_Right'>
																						<input
																							onChange =
																							{
																								set_Event =>
																								{
																									for (let set_Counter = 0; set_Counter < this.state.Cooperative_Member_Projected_Growth.length; set_Counter ++)
																									{
																										if (this.state.Cooperative_Member_Projected_Growth[set_Counter].Growth_Key == set_Event.target.getAttribute('growth_key'))
																										{
																											this.state.Cooperative_Member_Projected_Growth[set_Counter].Growth_Value = set_Event.target.value
																											this.forceUpdate()
																											break
																										}
																									}
																								}
																							}
																							growth_key = { set_Data.Growth_Key }
																							name = 'Cooperative_Member_Projected_Growth_Value'
																							className = 'form-control'
																							type = 'number'
																							defaultValue = { set_Data.Growth_Value }
																							required/>
																						<label className = 'form-control-placeholder' htmlFor = 'Cooperative_Member_Projected_Growth_Value'>Value</label>
																						<div className = 'valid-feedback'>Value is valid</div>
																						<div className = 'invalid-feedback'>Please provide a Value</div>
																					</div>
																				</div>
																	})
																}
																</div>
															</div>
														</div>
													</form>
												</div>

												<div className = 'carousel-item'>

													<a onClick = { set_Event => System_Manipulator.set_Card_Size(set_Event, this) } className = 'page-link Card_Resizer float-right'><i className = { this.state.Card_State == 'Minimize' ? 'zwicon-expand-alt' : 'zwicon-collapse-alt' }></i></a>
													<h4 className = 'card-title'>III. Cooperative General Information</h4>
													<h6 className = 'card-subtitle'>Please provide a valid <span className = 'Highlight_Text'>Share Capital</span>&nbsp;information for a proposed Cooperative</h6>

													<hr/>

													<form ref = { this.Element['Form_Cooperative_ShareCapital'] }>
														<div className = 'form-row'>
															<div className = 'form-group col-md-12'>
																<a className = 'page-link Carousel_Navigator float-left' href = '#Carousel_Cooperative_Registration' role = 'button' data-slide = 'prev'>
																	<i className = 'zwicon-arrow-left'></i>
																</a>

																<a className = 'page-link Carousel_Navigator float-right' href = '#Carousel_Cooperative_Registration' role = 'button' data-slide = 'next'>
																	<i className = 'zwicon-arrow-right'></i>
																</a>
															</div>

															<div className = 'form-group col-md-12 pb-2'>
																<button className = 'btn btn-theme btn--icon-text waves-effect' type = 'button' data-toggle = 'collapse' data-target = '#Collapse_ShareCapital_Formula'>
																	<i className = 'zwicon-eye'></i><span className = 'Highlight_Text'>View Formula</span>&nbsp;with example
																</button>
															</div>

															<div className = 'form-group col-md-12 pb-2'>
																<div className = 'collapse' id = 'Collapse_ShareCapital_Formula'>
																	<div className = 'row'>
																		<div className = 'col-md-6'>
																			<table className = 'table table-bordered table-hover'>
																				<thead>
																					<tr>
																						<th>Variable</th>
																						<th>Share Capital</th>
																						<th>Value</th>
																					</tr>
																				</thead>
																				<tbody>
																					<tr>
																						<td>A</td>
																						<td>Authorized</td>
																						<td>100</td>
																					</tr>

																					<tr>
																						<td>B</td>
																						<td>Issued</td>
																						<td>K * L = 75</td>
																					</tr>

																					<tr>
																						<td>C</td>
																						<td>Unissued</td>
																						<td>A - B = 25</td>
																					</tr>

																					<tr>
																						<td>D</td>
																						<td>Subscribed</td>
																						<td>50</td>
																					</tr>

																					<tr>
																						<td>E</td>
																						<td>Unsubscribed</td>
																						<td>B - D = 25</td>
																					</tr>

																					<tr>
																						<td>F</td>
																						<td>Called-Up</td>
																						<td>30 = 10Da + 10Db + 10Dc = 30Dabc</td>
																					</tr>

																					<tr>
																						<td>G</td>
																						<td>Uncalled</td>
																						<td>D - F = 20</td>
																					</tr>
																				</tbody>
																			</table>
																		</div>

																		<div className = 'col-md-6'>
																			<div className = 'row'>
																				<div className = 'col-md-auto pb-4'>
																					<table className = 'table table-bordered table-hover'>
																						<thead>
																							<tr>
																								<th>Variable</th>
																								<th>Share Capital</th>
																								<th>Value</th>
																							</tr>
																						</thead>
																						<tbody>
																							<tr>
																								<td>H</td>
																								<td>Paid-Up</td>
																								<td>20 = 10Fa + 10Fb = 20Fab</td>
																							</tr>

																							<tr>
																								<td>I</td>
																								<td>Unpaid</td>
																								<td>10 = F - H = 10Fc</td>
																							</tr>

																							<tr>
																								<td>J</td>
																								<td>Reserve</td>
																								<td>20 = Ga + Gb = 20Gab</td>
																							</tr>

																							<tr>
																								<td>K</td>
																								<td>Par Value</td>
																								<td>1</td>
																							</tr>

																							<tr>
																								<td>L</td>
																								<td>Shares Sold</td>
																								<td>75</td>
																							</tr>
																						</tbody>
																					</table>
																				</div>

																				<div className = 'col-md-auto'>
																					<div className = 'form-row'>
																						<div className = 'form-group col-md-auto pb-4'>
																							<input name = 'ShareCapital_Authorized_Summary_Example' className = 'form-control' type = 'number' defaultValue = '100' readOnly/>
																							<label className = 'form-control-placeholder' htmlFor = 'ShareCapital_Authorized_Summary_Example'>Authorized</label>
																						</div>

																						<div className = 'form-group col-md-auto pb-4'>
																							<input name = 'ShareCapital_Subscribed_Summary_Example' className = 'form-control' type = 'number' defaultValue = '50' readOnly/>
																							<label className = 'form-control-placeholder' htmlFor = 'ShareCapital_Subscribed_Summary_Example'>Subscribed</label>
																						</div>

																						<div className = 'form-group col-md-auto pb-4'>
																							<input name = 'ShareCapital_Paid-Up_Summary_Example' className = 'form-control' type = 'number' defaultValue = '20' readOnly/>
																							<label className = 'form-control-placeholder' htmlFor = 'ShareCapital_Paid-Up_Summary_Example'>ShareCapital_Paid-Up</label>
																						</div>

																						<div className = 'form-group col-md-auto pb-4'>
																							<input name = 'ShareCapital_Par_Value_Summary_Example' className = 'form-control' type = 'number' defaultValue = '1' readOnly/>
																							<label className = 'form-control-placeholder' htmlFor = 'ShareCapital_Par_Value_Summary_Example'>Par Value</label>
																						</div>
																					</div>
																				</div>
																			</div>
																		</div>
																	</div>
																</div>

																<div className = 'row'>
																	<div className = 'col-md-6'>
																		<table className = 'table table-bordered table-hover'>
																			<thead>
																				<tr>
																					<th>Variable</th>
																					<th>Share Capital</th>
																					<th>Value</th>
																				</tr>
																			</thead>
																			<tbody>
																				<tr>
																					<td>A</td>
																					<td>Authorized</td>
																					<td>
																						<input onChange = { () => this.ShareCapital_Manage() } ref = { this.Element['ShareCapital_Authorized'] } name = 'ShareCapital_Authorized' className = 'form-control' type = 'number' defaultValue = '0' required/>
																						<div className = 'valid-feedback'>Authorized Capital is valid</div>
																						<div className = 'invalid-feedback'>Please provide an Authorized Capital</div>
																					</td>
																				</tr>

																				<tr>
																					<td>B</td>
																					<td>Issued</td>
																					<td>
																						<input ref = { this.Element['ShareCapital_Issued'] } name = 'ShareCapital_Issued' className = 'form-control' type = 'number' defaultValue = '0' readOnly required/>
																						<div className = 'valid-feedback'>Issued Capital is valid</div>
																						<div className = 'invalid-feedback'>Please provide an Issued Capital</div>
																					</td>
																				</tr>

																				<tr>
																					<td>C</td>
																					<td>Unissued</td>
																					<td>
																						<input ref = { this.Element['ShareCapital_Unissued'] } name = 'ShareCapital_Unissued' className = 'form-control' type = 'number' defaultValue = '0' readOnly required/>
																						<div className = 'valid-feedback'>Unissued Capital is valid</div>
																						<div className = 'invalid-feedback'>Please provide an Unissued Capital</div>
																					</td>
																				</tr>

																				<tr>
																					<td>D</td>
																					<td>Subscribed</td>
																					<td>
																						<input onChange = { () => this.ShareCapital_Manage() } ref = { this.Element['ShareCapital_Subscribed'] } name = 'ShareCapital_Subscribed' className = 'form-control' type = 'number' defaultValue = '0' required/>
																						<div className = 'valid-feedback'>Subscribed Capital is valid</div>
																						<div className = 'invalid-feedback'>Please provide a Subscribed Capital</div>
																					</td>
																				</tr>

																				<tr>
																					<td>E</td>
																					<td>Unsubscribed</td>
																					<td>
																						<input ref = { this.Element['ShareCapital_Unsubscribed'] } name = 'ShareCapital_Unsubscribed' className = 'form-control' type = 'number' defaultValue = '0' readOnly required/>
																						<div className = 'valid-feedback'>Unsubscribed Capital is valid</div>
																						<div className = 'invalid-feedback'>Please provide an Unsubscribed Capital</div>
																					</td>
																				</tr>

																				<tr>
																					<td>F</td>
																					<td>Called-Up</td>
																					<td>
																						<input onChange = { () => this.ShareCapital_Manage() } ref = { this.Element['ShareCapital_Called-Up'] } name = 'ShareCapital_Called-Up' className = 'form-control' type = 'number' defaultValue = '0' required/>
																						<div className = 'valid-feedback'>Called-Up Capital is valid</div>
																						<div className = 'invalid-feedback'>Please provide a Called-Up Capital</div>
																					</td>
																				</tr>

																				<tr>
																					<td>G</td>
																					<td>Uncalled</td>
																					<td>
																						<input ref = { this.Element['ShareCapital_Uncalled'] } name = 'ShareCapital_Uncalled' className = 'form-control' type = 'number' defaultValue = '0' readOnly required/>
																						<div className = 'valid-feedback'>Uncalled Capital is valid</div>
																						<div className = 'invalid-feedback'>Please provide an Uncalled Capital</div>
																					</td>
																				</tr>
																			</tbody>
																		</table>
																	</div>

																	<div className = 'col-md-6'>
																		<div className = 'row'>
																			<div className = 'col-md-auto pb-4'>
																				<table className = 'table table-bordered table-hover'>
																					<thead>
																						<tr>
																							<th>Variable</th>
																							<th>Share Capital</th>
																							<th>Value</th>
																						</tr>
																					</thead>
																					<tbody>
																						<tr>
																							<td>H</td>
																							<td>Paid-Up</td>
																							<td>
																								<input onChange = { () => this.ShareCapital_Manage() } ref = { this.Element['ShareCapital_Paid-Up'] } name = 'ShareCapital_Paid-Up' className = 'form-control' type = 'number' defaultValue = '0' required/>
																								<div className = 'valid-feedback'>Paid-Up Capital is valid</div>
																								<div className = 'invalid-feedback'>Please provide a Paid-Up Capital</div>
																							</td>
																						</tr>

																						<tr>
																							<td>I</td>
																							<td>Unpaid</td>
																							<td>
																								<input ref = { this.Element['ShareCapital_Unpaid'] } name = 'ShareCapital_Unpaid' className = 'form-control' type = 'number' defaultValue = '0' readOnly required/>
																								<div className = 'valid-feedback'>Unpaid Capital is valid</div>
																								<div className = 'invalid-feedback'>Please provide an Unpaid Capital</div>
																							</td>
																						</tr>

																						<tr>
																							<td>J</td>
																							<td>Reserve</td>
																							<td>
																								<input ref = { this.Element['ShareCapital_Reserve'] } name = 'ShareCapital_Reserve' className = 'form-control' type = 'number' defaultValue = '0' readOnly required/>
																								<div className = 'valid-feedback'>Reserve Capital is valid</div>
																								<div className = 'invalid-feedback'>Please provide a Reserve Capital</div>
																							</td>
																						</tr>

																						<tr>
																							<td>K</td>
																							<td>Par Value</td>
																							<td>
																								<input onChange = { () => this.ShareCapital_Manage() } ref = { this.Element['ShareCapital_Par_Value'] } name = 'ShareCapital_Par_Value' className = 'form-control' type = 'number' defaultValue = '0' required/>
																								<div className = 'valid-feedback'>Par Value is valid</div>
																								<div className = 'invalid-feedback'>Please provide a Par Value</div>
																							</td>
																						</tr>

																						<tr>
																							<td>L</td>
																							<td>Shares Sold</td>
																							<td>
																								<input onChange = { () => this.ShareCapital_Manage() } ref = { this.Element['ShareCapital_Share_Sold'] } name = 'ShareCapital_Share_Sold' className = 'form-control' type = 'number' defaultValue = '0' required/>
																								<div className = 'valid-feedback'>Shares Sold is valid</div>
																								<div className = 'invalid-feedback'>Please provide a Shares Sold</div>
																							</td>
																						</tr>
																					</tbody>
																				</table>
																			</div>

																			<div className = 'col-md-auto'>
																				<div className = 'form-row'>
																					<div className = 'form-group col-md-auto pb-4'>
																						<input ref = { this.Element['ShareCapital_Authorized_Summary'] } name = 'ShareCapital_Authorized_Summary' className = 'form-control' type = 'number' defaultValue = '0' readOnly/>
																						<label className = 'form-control-placeholder' htmlFor = 'ShareCapital_Authorized_Summary'>Authorized</label>
																					</div>

																					<div className = 'form-group col-md-auto pb-4'>
																						<input ref = { this.Element['ShareCapital_Subscribed_Summary'] } name = 'ShareCapital_Subscribed_Summary' className = 'form-control' type = 'number' defaultValue = '0' readOnly/>
																						<label className = 'form-control-placeholder' htmlFor = 'ShareCapital_Subscribed_Summary'>Subscribed</label>
																					</div>

																					<div className = 'form-group col-md-auto pb-4'>
																						<input ref = { this.Element['ShareCapital_Paid-Up_Summary'] } name = 'ShareCapital_Paid-Up_Summary' className = 'form-control' type = 'number' defaultValue = '0' readOnly/>
																						<label className = 'form-control-placeholder' htmlFor = 'ShareCapital_Paid-Up_Summary'>ShareCapital_Paid-Up</label>
																					</div>

																					<div className = 'form-group col-md-auto pb-4'>
																						<input ref = { this.Element['ShareCapital_Par_Value_Summary'] } name = 'ShareCapital_Par_Value_Summary' className = 'form-control' type = 'number' defaultValue = '0' readOnly/>
																						<label className = 'form-control-placeholder' htmlFor = 'ShareCapital_Par_Value_Summary'>Par Value</label>
																					</div>
																				</div>
																			</div>
																		</div>
																	</div>
																</div>
															</div>
														</div>
													</form>
												</div>

												<div className = 'carousel-item'>

													<a onClick = { set_Event => System_Manipulator.set_Card_Size(set_Event, this) } className = 'page-link Card_Resizer float-right'><i className = { this.state.Card_State == 'Minimize' ? 'zwicon-expand-alt' : 'zwicon-collapse-alt' }></i></a>
													<h4 className = 'card-title'>IV. Cooperative Strategic Operational Studies  <span className = 'Highlight_Text'>(Economic Aspect)</span></h4>
													<h6 className = 'card-subtitle'>Please provide a valid &nbsp;<span className = 'Highlight_Text'>Economic</span>&nbsp; information for a proposed Cooperative</h6>

													<hr/>

													<form ref = { this.Element['Form_Cooperative_EconomicAspect'] }>
														<div className = 'form-row'>
															<div className = 'form-group col-md-12'>
																<a className = 'page-link Carousel_Navigator float-left' href = '#Carousel_Cooperative_Registration' role = 'button' data-slide = 'prev'>
																	<i className = 'zwicon-arrow-left'></i>
																</a>

																<a className = 'page-link Carousel_Navigator float-right' href = '#Carousel_Cooperative_Registration' role = 'button' data-slide = 'next'>
																	<i className = 'zwicon-arrow-right'></i>
																</a>
															</div>

															<div className = 'form-group col-md-4 pb-2'>
																<select ref = { this.Element['EconomicAspect_Identical_Cooperative_Plan'] } name = 'EconomicAspect_Identical_Cooperative_Plan' className = 'form-control' data-placeholder = 'Select an identical Cooperative' multiple>
																	<optgroup label = 'Select an existing Cooperative that identical to the proposed Cooperative'>
																		<option>(ARC) MAT-I FARMERS MULTI-PURPOSE COOPERATIVE (ARC-MAFAMPCO)</option>
																		<option>(DOLPHIN) Development Organization on Livelihood Program & Harbor Investment Network Multi-Purpose Cooperative</option>
																		<option>(F.E.S.) Fortune Elementary School Teachers Multi-Purpose Cooperative</option>
																		<option>(GODWINO) Canahay Multi-Purpose Cooperative</option>
																	</optgroup>
																</select>
																<div className = 'valid-feedback'>Cooperative is valid</div>
																<div className = 'invalid-feedback'>Please select a Cooperative</div>
															</div>

															<div className = 'form-group col-md-4 pb-2'>
																<select ref = { this.Element['EconomicAspect_Target_Market'] } name = 'EconomicAspect_Target_Market' className = 'form-control' data-placeholder = 'Select a Target Market' multiple required>
																	<option></option>
																	<optgroup label = 'Select a Target Market'>
																		<option value = 'Member'>Member</option>
																		<option value = 'Non-Member'>Non-Member</option>
																	</optgroup>
																</select>
																<div className = 'valid-feedback'>Cooperative is valid</div>
																<div className = 'invalid-feedback'>Please select a Cooperative</div>
															</div>

															<div className = 'form-group col-md-12'>
																<hr/>
															</div>

															<div className = 'form-group col-md-6 pb-2'>
																<div className = 'row'>
																	<div className = 'form-group col-md Remove_Padding_Left Remove_Padding_Right'>
																		<div className = 'form-group col-md pb-2'>
																			<button className = 'btn btn-outline-theme btn--icon-text waves-effect' type = 'button' data-toggle = 'collapse' data-target = '#Collapse_EconomicAspect_Strategy'>
																				<i className = 'zwicon-eye'></i>What&nbsp;<span className = 'Highlight_Text'>Strategies</span>&nbsp;the Cooperative shall implement to ensure the support of the Members?
																			</button>
																		</div>

																		<div className = 'collapse' id = 'Collapse_EconomicAspect_Strategy'>
																			<div className = 'form-group col-md pb-2'>
																				<button
																					onClick =
																					{
																						() =>
																						{
																							let get_EconomicAspect_Strategy = this.state.EconomicAspect_Strategy

																							get_EconomicAspect_Strategy.push
																							({
																								'Strategy_Key'			:	'Strategy-' + this.state.EconomicAspect_Strategy_Key_Counter ++,
																								'Strategy_Description'	:	''
																							})
																							
																							this.setState({ 'EconomicAspect_Strategy' : get_EconomicAspect_Strategy }, () =>
																							{
																								System_Manipulator.set_Textarea_Autosize
																								({
																									'Element' : $('textarea[name = "EconomicAspect_Strategy_Description"]')
																								})
																							})
																						}
																					}
																					className = 'btn btn-outline-theme btn--icon-text waves-effect'
																					type = 'button'>
																					<i className = 'zwicon-plus-circle'></i>Add Strategy
																				</button>
																				<p className = 'd-none'>{ JSON.stringify(this.state.EconomicAspect_Strategy) }</p>
																			</div>
																			{
																				this.state.EconomicAspect_Strategy.map(set_Data =>
																				{
																					return	<div key = { set_Data.Strategy_Key } className = 'form-group col-md'>
																								<div className = 'form-group col-md pb-3 Remove_Padding_Left Remove_Padding_Right'>
																									<a
																										onClick =
																										{
																											set_Event =>
																											{
																												let get_Element = set_Event.target

																												if (set_Event.target.tagName == 'I')
																													get_Element = set_Event.target.closest('a')

																												for (let set_Counter = 0; set_Counter < this.state.EconomicAspect_Strategy.length; set_Counter ++)
																												{
																													if (this.state.EconomicAspect_Strategy[set_Counter].Strategy_Key == get_Element.getAttribute('strategy_key'))
																													{
																														this.state.EconomicAspect_Strategy.splice(set_Counter, 1)
																														this.forceUpdate()
																														break
																													}
																												}
																											}
																										}
																										strategy_key = { set_Data.Strategy_Key }
																										className = 'page-link float-right'>
																										<i className = 'zwicon-close'></i>
																									</a>
																								</div>

																								<div className = 'form-group col-md pb-2 Remove_Padding_Left Remove_Padding_Right'>
																									<textarea
																										onChange =
																										{
																											set_Event =>
																											{
																												for (let set_Counter = 0; set_Counter < this.state.EconomicAspect_Strategy.length; set_Counter ++)
																												{
																													if (this.state.EconomicAspect_Strategy[set_Counter].Strategy_Key == set_Event.target.getAttribute('strategy_key'))
																													{
																														this.state.EconomicAspect_Strategy[set_Counter].Strategy_Description = set_Event.target.value
																														this.forceUpdate()
																														break
																													}
																												}
																											}
																										}
																										strategy_key = { set_Data.Strategy_Key }
																										name = 'EconomicAspect_Strategy_Description'
																										className = 'form-control'
																										type = 'text'
																										defaultValue = { set_Data.Strategy_Description }
																										required></textarea>
																									<label className = 'form-control-placeholder' htmlFor = 'EconomicAspect_Strategy_Description'>Description of Strategy</label>
																									<div className = 'valid-feedback'>Strategy is valid</div>
																									<div className = 'invalid-feedback'>Please provide a Strategy</div>
																								</div>
																							</div>
																				})
																			}
																		</div>
																	</div>																	
																</div>
															</div>

															<div className = 'form-group col-md-6 pb-2'>
																<div className = 'row'>
																	<div className = 'form-group col-md Remove_Padding_Left Remove_Padding_Right'>
																		<div className = 'form-group col-md pb-2'>
																			<button className = 'btn btn-outline-theme btn--icon-text waves-effect' type = 'button' data-toggle = 'collapse' data-target = '#Collapse_EconomicAspect_Activity'>
																				<i className = 'zwicon-eye'></i>What&nbsp;<span className = 'Highlight_Text'>Business Activities</span>&nbsp;the Cooperative plans to undertake during the following years of its operation?
																			</button>
																		</div>

																		<div className = 'collapse' id = 'Collapse_EconomicAspect_Activity'>
																			<div className = 'form-group col-md pb-2'>
																				<button
																					onClick =
																					{
																						() =>
																						{
																							let get_EconomicAspect_Activity = this.state.EconomicAspect_Activity

																							get_EconomicAspect_Activity.push
																							({
																								'Activity_Key'			:	'Activity-' + this.state.EconomicAspect_Activity_Key_Counter ++,
																								'Activity_Year'			:	2020,
																								'Activity_Description'	:	''
																							})
																							
																							this.setState({ 'EconomicAspect_Activity' : get_EconomicAspect_Activity }, () =>
																							{
																								System_Manipulator.set_Textarea_Autosize
																								({
																									'Element' : $('textarea[name = "EconomicAspect_Activity_Description"]')
																								})
																							})
																						}
																					}
																					className = 'btn btn-outline-theme btn--icon-text waves-effect'
																					type = 'button'>
																					<i className = 'zwicon-plus-circle'></i>Add Activity
																				</button>
																				<p className = 'd-none'>{ JSON.stringify(this.state.EconomicAspect_Activity) }</p>
																			</div>
																			{
																				this.state.EconomicAspect_Activity.map(set_Data =>
																				{
																					return	<div key = { set_Data.Activity_Key } className = 'form-group col-md'>
																								<div className = 'form-group col-md pb-3 Remove_Padding_Left Remove_Padding_Right'>
																									<a
																										onClick =
																										{
																											set_Event =>
																											{
																												let get_Element = set_Event.target

																												if (set_Event.target.tagName == 'I')
																													get_Element = set_Event.target.closest('a')

																												for (let set_Counter = 0; set_Counter < this.state.EconomicAspect_Activity.length; set_Counter ++)
																												{
																													if (this.state.EconomicAspect_Activity[set_Counter].Activity_Key == get_Element.getAttribute('activity_key'))
																													{
																														this.state.EconomicAspect_Activity.splice(set_Counter, 1)
																														this.forceUpdate()
																														break
																													}
																												}
																											}
																										}
																										activity_key = { set_Data.Activity_Key }
																										className = 'page-link float-right'>
																										<i className = 'zwicon-close'></i>
																									</a>
																								</div>

																								<div className = 'form-group col-md pb-2 Remove_Padding_Left Remove_Padding_Right'>
																									<input
																										onChange =
																										{
																											set_Event =>
																											{
																												for (let set_Counter = 0; set_Counter < this.state.EconomicAspect_Activity.length; set_Counter ++)
																												{
																													if (this.state.EconomicAspect_Activity[set_Counter].Activity_Key == set_Event.target.getAttribute('activity_key'))
																													{
																														this.state.EconomicAspect_Activity[set_Counter].Activity_Year = set_Event.target.value
																														this.forceUpdate()
																														break
																													}
																												}
																											}
																										}
																										activity_key = { set_Data.Activity_Key }
																										name = 'EconomicAspect_Activity_Year'
																										className = 'form-control'
																										type = 'number'
																										defaultValue = { set_Data.Activity_Year }
																										required/>
																									<label className = 'form-control-placeholder' htmlFor = 'EconomicAspect_Activity_Year'>Year</label>
																									<div className = 'valid-feedback'>Year is valid</div>
																									<div className = 'invalid-feedback'>Please provide a Year</div>
																								</div>

																								<div className = 'form-group col-md pb-2 Remove_Padding_Left Remove_Padding_Right'>
																									<textarea
																										onChange =
																										{
																											set_Event =>
																											{
																												for (let set_Counter = 0; set_Counter < this.state.EconomicAspect_Activity.length; set_Counter ++)
																												{
																													if (this.state.EconomicAspect_Activity[set_Counter].Activity_Key == set_Event.target.getAttribute('activity_key'))
																													{
																														this.state.EconomicAspect_Activity[set_Counter].Activity_Description = set_Event.target.value
																														this.forceUpdate()
																														break
																													}
																												}
																											}
																										}
																										activity_key = { set_Data.Activity_Key }
																										name = 'EconomicAspect_Activity_Description'
																										className = 'form-control'
																										type = 'text'
																										defaultValue = { set_Data.Activity_Description }
																										required/>
																									<label className = 'form-control-placeholder' htmlFor = 'EconomicAspect_Activity_Description'>Description</label>
																									<div className = 'valid-feedback'>Description is valid</div>
																									<div className = 'invalid-feedback'>Please provide a Description</div>
																								</div>
																							</div>
																				})
																			}
																		</div>
																	</div>
																</div>
															</div>
														</div>
													</form>
												</div>

												<div className = 'carousel-item'>

													<a onClick = { set_Event => System_Manipulator.set_Card_Size(set_Event, this) } className = 'page-link Card_Resizer float-right'><i className = { this.state.Card_State == 'Minimize' ? 'zwicon-expand-alt' : 'zwicon-collapse-alt' }></i></a>
													<h4 className = 'card-title'>V. Cooperative Strategic Operational Studies  <span className = 'Highlight_Text'>(Financial Aspect)</span></h4>
													<h6 className = 'card-subtitle'>Please provide a valid&nbsp;<span className = 'Highlight_Text'>Financial</span>&nbsp;information for a proposed Cooperative</h6>

													<hr/>

													<form ref = { this.Element['Form_Cooperative_FinancialAspect'] }>
														<div className = 'form-row'>
															<div className = 'form-group col-md-12'>
																<a className = 'page-link Carousel_Navigator float-left' href = '#Carousel_Cooperative_Registration' role = 'button' data-slide = 'prev'>
																	<i className = 'zwicon-arrow-left'></i>
																</a>

																<a className = 'page-link Carousel_Navigator float-right' href = '#Carousel_Cooperative_Registration' role = 'button' data-slide = 'next'>
																	<i className = 'zwicon-arrow-right'></i>
																</a>
															</div>

															<div className = 'form-group col-md-4 pb-2'>
																<select ref = { this.Element['FinancialAspect_Capitalization_Generate_Capital'] } name = 'FinancialAspect_Capitalization_Generate_Capital' className = 'form-control' data-placeholder = 'Select Capitalization' multiple required>
																	<option></option>
																	<optgroup label = 'In pursuing its economic activities, how shall the Cooperative generate its capital?'>
																		<option value = 'COOP-CPTLZTN-1'>Share Capital Subscription</option>
																		<option value = 'COOP-CPTLZTN-2'>Deferred payment of patronage refund/interest on share capital (Revolving Capital)</option>
																		<option value = 'COOP-CPTLZTN-3'>Acquisition of Loans/borrowings</option>
																		<option value = 'COOP-CPTLZTN-4'>Solicitation/acceptance of donations, subsidies, grants, etc.</option>
																		<option value = 'COOP-CPTLZTN-5'>Fund raising activities</option>
																	</optgroup>
																</select>
																<div className = 'valid-feedback'>Capitalization is valid</div>
																<div className = 'invalid-feedback'>Please select a Capitalization</div>
															</div>

															<div className = 'form-group col-md-4 pb-2'>
																<input ref = { this.Element['FinancialAspect_Capitalization_Initial_Capital'] } name = 'FinancialAspect_Capitalization_Initial_Capital' className = 'form-control' type = 'number' required/>
																<label className = 'form-control-placeholder' htmlFor = 'FinancialAspect_Capitalization_Initial_Capital'>How much is the Initial Operating Capital?</label>
																<div className = 'valid-feedback'>Initial Operating Capital is valid</div>
																<div className = 'invalid-feedback'>Please provide an Initial Operating Capital</div>
															</div>

															<div className = 'form-group col-md-4 pb-2'>
																<select ref = { this.Element['FinancialAspect_Organization_Investment'] } name = 'FinancialAspect_Organization_Investment' className = 'form-control' multiple required></select>
																<label className = 'form-control-placeholder' htmlFor = 'FinancialAspect_Organization_Investment'>Intend Investment</label>
																<div className = 'valid-feedback'>Intend Investment is valid</div>
																<div className = 'invalid-feedback'>Please provide a Intend Investment</div>
															</div>

															<div className = 'form-group col-md-4 pb-2'>
																<div className = 'row col-md'>
																	<div className = 'form-group col-md-12 pb-2 Remove_Padding_Left Remove_Padding_Right'>
																		<button className = 'btn btn-outline-theme btn--icon-text waves-effect' type = 'button' data-toggle = 'collapse' data-target = '#Collapse_FinancialAspect_Capitalization_Internal_Capital'>
																			<i className = 'zwicon-eye'></i>What are the&nbsp;<span className = 'Highlight_Text'>Capitalization Strategies</span>&nbsp;for Internal Capital build-up?
																		</button>
																	</div>

																	<div className = 'form-group col-md-12 collapse Remove_Padding_Left Remove_Padding_Right' id = 'Collapse_FinancialAspect_Capitalization_Internal_Capital'>
																		<div className = 'form-group col-md pb-2 Remove_Padding_Left Remove_Padding_Right'>
																			<button
																				onClick =
																				{
																					() =>
																					{
																						let get_FinancialAspect_Capitalization_Internal_Capital_Strategy = this.state.FinancialAspect_Capitalization_Internal_Capital_Strategy

																						get_FinancialAspect_Capitalization_Internal_Capital_Strategy.push
																						({
																							'Strategy_Key'			:	'Strategy-' + this.state.FinancialAspect_Capitalization_Internal_Capital_Strategy_Key_Counter ++,
																							'Strategy_Description'	:	''
																						})

																						this.setState({ 'FinancialAspect_Capitalization_Internal_Capital_Strategy' : get_FinancialAspect_Capitalization_Internal_Capital_Strategy }, () =>
																						{
																							System_Manipulator.set_Textarea_Autosize
																							({
																								'Element' : $('textarea[name = "FinancialAspect_Capitalization_Internal_Capital_Strategy_Description"]')
																							})
																						})
																					}
																				}
																				className = 'btn btn-outline-theme btn--icon-text waves-effect'
																				type = 'button'>
																				<i className = 'zwicon-plus-circle'></i>Add Strategy
																			</button>
																			<p className = 'd-none'>{ JSON.stringify(this.state.FinancialAspect_Capitalization_Internal_Capital_Strategy) }</p>
																		</div>
																		{
																			this.state.FinancialAspect_Capitalization_Internal_Capital_Strategy.map(set_Data =>
																			{
																				return	<div key = { set_Data.Strategy_Key } className = 'form-group col-md Remove_Padding_Left Remove_Padding_Right'>
																							<div className = 'form-group col-md pb-3 Remove_Padding_Left Remove_Padding_Right'>
																								<a
																									onClick =
																									{
																										set_Event =>
																										{
																											let get_Element = set_Event.target

																											if (set_Event.target.tagName == 'I')
																												get_Element = set_Event.target.closest('a')

																											for (let set_Counter = 0; set_Counter < this.state.FinancialAspect_Capitalization_Internal_Capital_Strategy.length; set_Counter ++)
																											{
																												if (this.state.FinancialAspect_Capitalization_Internal_Capital_Strategy[set_Counter].Strategy_Key == get_Element.getAttribute('strategy_key'))
																												{
																													this.state.FinancialAspect_Capitalization_Internal_Capital_Strategy.splice(set_Counter, 1)
																													this.forceUpdate()
																													break
																												}
																											}
																										}
																									}
																									strategy_key = { set_Data.Strategy_Key }
																									className = 'page-link float-right'>
																									<i className = 'zwicon-close'></i>
																								</a>
																							</div>

																							<div className = 'form-group col-md pb-2 Remove_Padding_Left Remove_Padding_Right'>
																								<textarea
																									onChange =
																									{
																										set_Event =>
																										{
																											for (let set_Counter = 0; set_Counter < this.state.FinancialAspect_Capitalization_Internal_Capital_Strategy.length; set_Counter ++)
																											{
																												if (this.state.FinancialAspect_Capitalization_Internal_Capital_Strategy[set_Counter].Strategy_Key == set_Event.target.getAttribute('strategy_key'))
																												{
																													this.state.FinancialAspect_Capitalization_Internal_Capital_Strategy[set_Counter].Strategy_Description = set_Event.target.value
																													this.forceUpdate()
																													break
																												}
																											}
																										}
																									}
																									strategy_key = { set_Data.Strategy_Key }
																									name = 'FinancialAspect_Capitalization_Internal_Capital_Strategy_Description'
																									className = 'form-control'
																									type = 'text'
																									defaultValue = { set_Data.Strategy_Description }
																									required></textarea>
																								<label className = 'form-control-placeholder' htmlFor = 'FinancialAspect_Capitalization_Internal_Capital_Strategy_Description'>Description of Strategy</label>
																								<div className = 'valid-feedback'>Strategy is valid</div>
																								<div className = 'invalid-feedback'>Please provide a Strategy</div>
																							</div>
																						</div>
																			})
																		}
																	</div>
																</div>
															</div>

															<div className = 'form-group col-md-4 pb-2'>
																<div className = 'row col-md'>
																	<div className = 'form-group col-md-12 pb-2 Remove_Padding_Left Remove_Padding_Right'>
																		<button className = 'btn btn-outline-theme btn--icon-text waves-effect' type = 'button' data-toggle = 'collapse' data-target = '#Collapse_FinancialAspect_Revenue_Projected'>
																			<i className = 'zwicon-eye'></i>What are the&nbsp;<span className = 'Highlight_Text'>Projected Revenue</span>&nbsp;based on the initial operating capital.
																		</button>
																	</div>

																	<div className = 'form-group col-md-12 collapse Remove_Padding_Left Remove_Padding_Right' id = 'Collapse_FinancialAspect_Revenue_Projected'>
																		<div className = 'form-group col-md pb-2 Remove_Padding_Left Remove_Padding_Right'>
																			<button
																				onClick =
																				{
																					() =>
																					{
																						let get_FinancialAspect_Revenue_Projected = this.state.FinancialAspect_Revenue_Projected

																						get_FinancialAspect_Revenue_Projected.push
																						({
																							'Revenue_Key'			:	'Revenue-' + this.state.FinancialAspect_Revenue_Projected_Key_Counter ++,
																							'Revenue_Year'			:	2020,
																							'Revenue_Value'			:	0
																						})

																						this.forceUpdate()
																					}
																				}
																				className = 'btn btn-outline-theme btn--icon-text waves-effect'
																				type = 'button'>
																				<i className = 'zwicon-plus-circle'></i>Add Projection
																			</button>
																			<p className = 'd-none'>{ JSON.stringify(this.state.FinancialAspect_Revenue_Projected) }</p>
																		</div>
																		{
																			this.state.FinancialAspect_Revenue_Projected.map(set_Data =>
																			{
																				return	<div key = { set_Data.Revenue_Key } className = 'form-group col-md Remove_Padding_Left Remove_Padding_Right'>
																							<div className = 'form-group col-md pb-3 Remove_Padding_Left Remove_Padding_Right'>
																								<a
																									onClick =
																									{
																										set_Event =>
																										{
																											let get_Element = set_Event.target

																											if (set_Event.target.tagName == 'I')
																												get_Element = set_Event.target.closest('a')

																											for (let set_Counter = 0; set_Counter < this.state.FinancialAspect_Revenue_Projected.length; set_Counter ++)
																											{
																												if (this.state.FinancialAspect_Revenue_Projected[set_Counter].Revenue_Key == get_Element.getAttribute('revenue_key'))
																												{
																													this.state.FinancialAspect_Revenue_Projected.splice(set_Counter, 1)
																													this.forceUpdate()
																													break
																												}
																											}
																										}
																									}
																									revenue_key = { set_Data.Revenue_Key }
																									className = 'page-link float-right'>
																									<i className = 'zwicon-close'></i>
																								</a>
																							</div>

																							<div className = 'form-group col-md pb-2 Remove_Padding_Left Remove_Padding_Right'>
																								<input
																									onChange =
																									{
																										set_Event =>
																										{
																											for (let set_Counter = 0; set_Counter < this.state.FinancialAspect_Revenue_Projected.length; set_Counter ++)
																											{
																												if (this.state.FinancialAspect_Revenue_Projected[set_Counter].Revenue_Key == set_Event.target.getAttribute('revenue_key'))
																												{
																													this.state.FinancialAspect_Revenue_Projected[set_Counter].Revenue_Year = set_Event.target.value
																													this.forceUpdate()
																													break
																												}
																											}
																										}
																									}
																									revenue_key = { set_Data.Revenue_Key }
																									name = 'FinancialAspect_Revenue_Projected_Year'
																									className = 'form-control'
																									type = 'number'
																									defaultValue = { set_Data.Revenue_Year }
																									required/>
																								<label className = 'form-control-placeholder' htmlFor = 'FinancialAspect_Revenue_Projected_Year'>Year</label>
																								<div className = 'valid-feedback'>Year is valid</div>
																								<div className = 'invalid-feedback'>Please provide a Year</div>
																							</div>

																							<div className = 'form-group col-md pb-2 Remove_Padding_Left Remove_Padding_Right'>
																								<input
																									onChange =
																									{
																										set_Event =>
																										{
																											for (let set_Counter = 0; set_Counter < this.state.FinancialAspect_Revenue_Projected.length; set_Counter ++)
																											{
																												if (this.state.FinancialAspect_Revenue_Projected[set_Counter].Revenue_Key == set_Event.target.getAttribute('revenue_key'))
																												{
																													this.state.FinancialAspect_Revenue_Projected[set_Counter].Revenue_Value = set_Event.target.value
																													this.forceUpdate()
																													break
																												}
																											}
																										}
																									}
																									revenue_key = { set_Data.Revenue_Key }
																									name = 'FinancialAspect_Revenue_Projected_Value'
																									className = 'form-control'
																									type = 'number'
																									defaultValue = { set_Data.Revenue_Value }
																									required/>
																								<label className = 'form-control-placeholder' htmlFor = 'FinancialAspect_Revenue_Projected_Value'>Value</label>
																								<div className = 'valid-feedback'>Value is valid</div>
																								<div className = 'invalid-feedback'>Please provide a Value</div>
																							</div>
																						</div>
																			})
																		}
																	</div>
																</div>
															</div>

															<div className = 'form-group col-md-4 pb-2'>
																<div className = 'row col-md'>
																	<div className = 'form-group col-md-12 pb-2 Remove_Padding_Left Remove_Padding_Right'>
																		<button className = 'btn btn-outline-theme btn--icon-text waves-effect' type = 'button' data-toggle = 'collapse' data-target = '#Collapse_FinancialAspect_Expense_Estimated'>
																			<i className = 'zwicon-eye'></i>How much is the&nbsp;<span className = 'Highlight_Text'>Estimated Expenses</span>&nbsp;for the following Year?
																		</button>
																	</div>

																	<div className = 'form-group col-md-12 collapse Remove_Padding_Left Remove_Padding_Right' id = 'Collapse_FinancialAspect_Expense_Estimated'>
																		<div className = 'form-group col-md pb-2 Remove_Padding_Left Remove_Padding_Right'>
																			<button
																				onClick =
																				{
																					() =>
																					{
																						let get_FinancialAspect_Expense_Estimated = this.state.FinancialAspect_Expense_Estimated

																						get_FinancialAspect_Expense_Estimated.push
																						({
																							'Expense_Key'			:	'Expense-' + this.state.FinancialAspect_Expense_Estimated_Key_Counter ++,
																							'Expense_Year'			:	2020,
																							'Expense_Value'			:	0
																						})

																						this.forceUpdate()
																					}
																				}
																				className = 'btn btn-outline-theme btn--icon-text waves-effect'
																				type = 'button'>
																				<i className = 'zwicon-plus-circle'></i>Add Estimation
																			</button>
																			<p className = 'd-none'>{ JSON.stringify(this.state.FinancialAspect_Expense_Estimated) }</p>
																		</div>
																		{
																			this.state.FinancialAspect_Expense_Estimated.map(set_Data =>
																			{
																				return	<div key = { set_Data.Expense_Key } className = 'form-group col-md Remove_Padding_Left Remove_Padding_Right'>
																							<div className = 'form-group col-md pb-3 Remove_Padding_Left Remove_Padding_Right'>
																								<a
																									onClick =
																									{
																										set_Event =>
																										{
																											let get_Element = set_Event.target

																											if (set_Event.target.tagName == 'I')
																												get_Element = set_Event.target.closest('a')

																											for (let set_Counter = 0; set_Counter < this.state.FinancialAspect_Expense_Estimated.length; set_Counter ++)
																											{
																												if (this.state.FinancialAspect_Expense_Estimated[set_Counter].Expense_Key == get_Element.getAttribute('expense_key'))
																												{
																													this.state.FinancialAspect_Expense_Estimated.splice(set_Counter, 1)
																													this.forceUpdate()
																													break
																												}
																											}
																										}
																									}
																									expense_key = { set_Data.Expense_Key }
																									className = 'page-link float-right'>
																									<i className = 'zwicon-close'></i>
																								</a>
																							</div>

																							<div className = 'form-group col-md pb-2 Remove_Padding_Left Remove_Padding_Right'>
																								<input
																									onChange =
																									{
																										set_Event =>
																										{
																											for (let set_Counter = 0; set_Counter < this.state.FinancialAspect_Expense_Estimated.length; set_Counter ++)
																											{
																												if (this.state.FinancialAspect_Expense_Estimated[set_Counter].Expense_Key == set_Event.target.getAttribute('expense_key'))
																												{
																													this.state.FinancialAspect_Expense_Estimated[set_Counter].Expense_Year = set_Event.target.value
																													this.forceUpdate()
																													break
																												}
																											}
																										}
																									}
																									expense_key = { set_Data.Expense_Key }
																									name = 'FinancialAspect_Expense_Estimated_Year'
																									className = 'form-control'
																									type = 'number'
																									defaultValue = { set_Data.Expense_Year }
																									required/>
																								<label className = 'form-control-placeholder' htmlFor = 'FinancialAspect_Expense_Estimated_Year'>Year</label>
																								<div className = 'valid-feedback'>Year is valid</div>
																								<div className = 'invalid-feedback'>Please provide a Year</div>
																							</div>

																							<div className = 'form-group col-md pb-2 Remove_Padding_Left Remove_Padding_Right'>
																								<input
																									onChange =
																									{
																										set_Event =>
																										{
																											for (let set_Counter = 0; set_Counter < this.state.FinancialAspect_Expense_Estimated.length; set_Counter ++)
																											{
																												if (this.state.FinancialAspect_Expense_Estimated[set_Counter].Expense_Key == set_Event.target.getAttribute('expense_key'))
																												{
																													this.state.FinancialAspect_Expense_Estimated[set_Counter].Expense_Value = set_Event.target.value
																													this.forceUpdate()
																													break
																												}
																											}
																										}
																									}
																									expense_key = { set_Data.Expense_Key }
																									name = 'FinancialAspect_Expense_Estimated_Value'
																									className = 'form-control'
																									type = 'number'
																									defaultValue = { set_Data.Expense_Value }
																									required/>
																								<label className = 'form-control-placeholder' htmlFor = 'FinancialAspect_Expense_Estimated_Value'>Value</label>
																								<div className = 'valid-feedback'>Value is valid</div>
																								<div className = 'invalid-feedback'>Please provide a Value</div>
																							</div>
																						</div>
																			})
																		}
																	</div>
																</div>
															</div>
														</div>
													</form>
												</div>

												<div className = 'carousel-item'>
													
													<a onClick = { set_Event => System_Manipulator.set_Card_Size(set_Event, this) } className = 'page-link Card_Resizer float-right'><i className = { this.state.Card_State == 'Minimize' ? 'zwicon-expand-alt' : 'zwicon-collapse-alt' }></i></a>
													<h4 className = 'card-title'>VI. Cooperative Strategic Operational Studies  <span className = 'Highlight_Text'>(Technical Aspect)</span></h4>
													<h6 className = 'card-subtitle'>Please provide a valid&nbsp;<span className = 'Highlight_Text'>Equipment/s, Machinery/ies and Facility/ies</span>&nbsp;are deemed necessary for the effective and efficient operation of the propsed Cooperative.</h6>

													<hr/>

													<form ref = { this.Element['Form_Cooperative_TechnicalAspect'] }>
														<div className = 'form-row'>
															<div className = 'form-group col-md-12'>
																<a className = 'page-link Carousel_Navigator float-left' href = '#Carousel_Cooperative_Registration' role = 'button' data-slide = 'prev'>
																	<i className = 'zwicon-arrow-left'></i>
																</a>

																<a className = 'page-link Carousel_Navigator float-right' href = '#Carousel_Cooperative_Registration' role = 'button' data-slide = 'next'>
																	<i className = 'zwicon-arrow-right'></i>
																</a>
															</div>

															<div className = 'form-group col-md-4 pb-2'>
																<select ref = { this.Element['TechnicalAspect_Equipment'] } name = 'TechnicalAspect_Equipment' className = 'form-control' multiple required></select>
																<label className = 'form-control-placeholder' htmlFor = 'TechnicalAspect_Equipment'>Equipment/s</label>
																<div className = 'valid-feedback'>Equipment/s is valid</div>
																<div className = 'invalid-feedback'>Please provide an Equipment/s</div>
															</div>

															<div className = 'form-group col-md-4 pb-2'>
																<select ref = { this.Element['TechnicalAspect_Machinery'] } name = 'TechnicalAspect_Machinery' className = 'form-control' multiple required></select>
																<label className = 'form-control-placeholder' htmlFor = 'TechnicalAspect_Machinery'>Machinery/ies</label>
																<div className = 'valid-feedback'>Machinery/ies is valid</div>
																<div className = 'invalid-feedback'>Please provide a Machinery/ies</div>
															</div>

															<div className = 'form-group col-md-4 pb-2'>
																<select ref = { this.Element['TechnicalAspect_Facility'] } name = 'TechnicalAspect_Facility' className = 'form-control' multiple required></select>
																<label className = 'form-control-placeholder' htmlFor = 'TechnicalAspect_Facility'>Facility/ies</label>
																<div className = 'valid-feedback'>Facility/ies is valid</div>
																<div className = 'invalid-feedback'>Please provide a Facility/s</div>
															</div>

															<div className = 'form-group col-md-4 pb-2'>
																<select ref = { this.Element['TechnicalAspect_Procurement_Mode'] } name = 'TechnicalAspect_Procurement_Mode' className = 'form-control' multiple required></select>
																<label className = 'form-control-placeholder' htmlFor = 'TechnicalAspect_Procurement_Mode'>Pocurement Mode</label>
																<div className = 'valid-feedback'>Pocurement Mode is valid</div>
																<div className = 'invalid-feedback'>Please provide a Pocurement Mode</div>
															</div>

															<div className = 'form-group col-md-8 pb-2'>
															</div>

															<div className = 'form-group col-md-12 pb-2'>
																<div className = 'row col-md'>
																	<div className = 'form-group col-md-4 pb-2 Remove_Padding_Left Remove_Padding_Right'>
																		<button className = 'btn btn-outline-theme btn--icon-text waves-effect' type = 'button' data-toggle = 'collapse' data-target = '#Collapse_TechnicalAspect_Operator_Background'>
																			<i className = 'zwicon-eye'></i>What are the&nbsp;<span className = 'Highlight_Text'>Skill/s, Experience/s and Training/s</span>&nbsp;are deemed necessary for the operation of its Equipment/s, Machinery/ies and Facility/ies?
																		</button>
																	</div>

																	<div className = 'form-group col-md-12 collapse Remove_Padding_Left Remove_Padding_Right' id = 'Collapse_TechnicalAspect_Operator_Background'>
																		<div className = 'form-group col-md pb-2 Remove_Padding_Left Remove_Padding_Right'>
																			<button
																				onClick =
																				{
																					() =>
																					{
																						let get_TechnicalAspect_Operator_Background = this.state.TechnicalAspect_Operator_Background

																						get_TechnicalAspect_Operator_Background.push
																						({
																							'Background_Key'			:	'Background-' + this.state.TechnicalAspect_Operator_Background_Key_Counter ++,
																							'Background_Description'	:	''
																						})

																						this.setState({ 'TechnicalAspect_Operator_Background' : get_TechnicalAspect_Operator_Background }, () =>
																						{
																							System_Manipulator.set_Textarea_Autosize
																							({
																								'Element' : $('textarea[name = "TechnicalAspect_Operator_Background_Description"]')
																							})
																						})
																					}
																				}
																				className = 'btn btn-outline-theme btn--icon-text waves-effect'
																				type = 'button'>
																				<i className = 'zwicon-plus-circle'></i>Add Background
																			</button>
																			<p className = 'd-none'>{ JSON.stringify(this.state.TechnicalAspect_Operator_Background) }</p>
																		</div>
																		{
																			this.state.TechnicalAspect_Operator_Background.map(set_Data =>
																			{
																				return	<div key = { set_Data.Background_Key } className = 'form-group col-md Remove_Padding_Left Remove_Padding_Right'>
																							<div className = 'form-group col-md pb-3 Remove_Padding_Left Remove_Padding_Right'>
																								<a
																									onClick =
																									{
																										set_Event =>
																										{
																											let get_Element = set_Event.target

																											if (set_Event.target.tagName == 'I')
																												get_Element = set_Event.target.closest('a')

																											for (let set_Counter = 0; set_Counter < this.state.TechnicalAspect_Operator_Background.length; set_Counter ++)
																											{
																												if (this.state.TechnicalAspect_Operator_Background[set_Counter].Background_Key == get_Element.getAttribute('background_key'))
																												{
																													this.state.TechnicalAspect_Operator_Background.splice(set_Counter, 1)
																													this.forceUpdate()
																													break
																												}
																											}
																										}
																									}
																									background_key = { set_Data.Background_Key }
																									className = 'page-link float-right'>
																									<i className = 'zwicon-close'></i>
																								</a>
																							</div>

																							<div className = 'form-group col-md pb-2 Remove_Padding_Left Remove_Padding_Right'>
																								<textarea
																									onChange =
																									{
																										set_Event =>
																										{
																											for (let set_Counter = 0; set_Counter < this.state.TechnicalAspect_Operator_Background.length; set_Counter ++)
																											{
																												if (this.state.TechnicalAspect_Operator_Background[set_Counter].Background_Key == set_Event.target.getAttribute('background_key'))
																												{
																													this.state.TechnicalAspect_Operator_Background[set_Counter].Background_Description = set_Event.target.value
																													this.forceUpdate()
																													break
																												}
																											}
																										}
																									}
																									background_key = { set_Data.Background_Key }
																									name = 'TechnicalAspect_Operator_Background_Description'
																									className = 'form-control'
																									type = 'text'
																									defaultValue = { set_Data.Background_Description }
																									required></textarea>
																								<label className = 'form-control-placeholder' htmlFor = 'TechnicalAspect_Operator_Background_Description'>Description of Background</label>
																								<div className = 'valid-feedback'>Background is valid</div>
																								<div className = 'invalid-feedback'>Please provide a Background</div>
																							</div>
																						</div>
																			})
																		}
																	</div>
																</div>
															</div>
														</div>
													</form>
												</div>

												<div className = 'carousel-item'>
													
													<a onClick = { set_Event => System_Manipulator.set_Card_Size(set_Event, this) } className = 'page-link Card_Resizer float-right'><i className = { this.state.Card_State == 'Minimize' ? 'zwicon-expand-alt' : 'zwicon-collapse-alt' }></i></a>
													<h4 className = 'card-title'>VII. Cooperative Strategic Operational Studies&nbsp;<span className = 'Highlight_Text'>(Organizational Structure)</span></h4>
													<h6 className = 'card-subtitle'>Please provide a valid&nbsp;<span className = 'Highlight_Text'>Organization</span>&nbsp;information and create an&nbsp;<span className = 'Highlight_Text'>Organizational Chart</span>&nbsp;for a proposed Cooperative</h6>

													<hr/>

													<form ref = { this.Element['Form_Cooperative_OrganizationalStructure'] }>
														<div className = 'form-row'>
															<div className = 'form-group col-md-12'>
																<a className = 'page-link Carousel_Navigator float-left' href = '#Carousel_Cooperative_Registration' role = 'button' data-slide = 'prev'>
																	<i className = 'zwicon-arrow-left'></i>
																</a>

																<a className = 'page-link Carousel_Navigator float-right' href = '#Carousel_Cooperative_Registration' role = 'button' data-slide = 'next'>
																	<i className = 'zwicon-arrow-right'></i>
																</a>
															</div>

															<div className = 'form-group col-md-4 pb-2'>
																<div className = 'row col-md'>
																	<div className = 'form-group col-md-12 pb-2 Remove_Padding_Left Remove_Padding_Right'>
																		<button className = 'btn btn-outline-theme btn--icon-text waves-effect' type = 'button' data-toggle = 'collapse' data-target = '#Collapse_OrganizationalStructure_Member_Eligibility'>
																			<i className = 'zwicon-eye'></i>What &nbsp;<span className = 'Highlight_Text'>Qualification/s and Skill/s</span>&nbsp;the&nbsp;<span className = 'Highlight_Text'>Board of Directors</span>&nbsp;should possess to enable them to formulate sound policies, strategies and guidelines which would ensure the success of the Cooperative?
																		</button>
																	</div>

																	<div className = 'form-group col-md-12 collapse Remove_Padding_Left Remove_Padding_Right' id = 'Collapse_OrganizationalStructure_Member_Eligibility'>
																		<div className = 'form-group col-md pb-2 Remove_Padding_Left Remove_Padding_Right'>
																			<button
																				onClick =
																				{
																					() =>
																					{
																						let get_OrganizationalStructure_Member_Eligibility = this.state.OrganizationalStructure_Member_Eligibility

																						get_OrganizationalStructure_Member_Eligibility.push
																						({
																							'Eligibility_Key'			:	'Eligibility-' + this.state.OrganizationalStructure_Member_Eligibility_Key_Counter ++,
																							'Eligibility_Description'	:	''
																						})

																						this.setState({ 'OrganizationalStructure_Member_Eligibility' : get_OrganizationalStructure_Member_Eligibility }, () =>
																						{
																							System_Manipulator.set_Textarea_Autosize
																							({
																								'Element' : $('textarea[name = "OrganizationalStructure_Member_Eligibility_Description"]')
																							})
																						})
																					}
																				}
																				className = 'btn btn-outline-theme btn--icon-text waves-effect'
																				type = 'button'>
																				<i className = 'zwicon-plus-circle'></i>Add Background
																			</button>
																			<p className = 'd-none'>{ JSON.stringify(this.state.OrganizationalStructure_Member_Eligibility) }</p>
																		</div>
																		{
																			this.state.OrganizationalStructure_Member_Eligibility.map(set_Data =>
																			{
																				return	<div key = { set_Data.Eligibility_Key } className = 'form-group col-md Remove_Padding_Left Remove_Padding_Right'>
																							<div className = 'form-group col-md pb-3 Remove_Padding_Left Remove_Padding_Right'>
																								<a
																									onClick =
																									{
																										set_Event =>
																										{
																											let get_Element = set_Event.target

																											if (set_Event.target.tagName == 'I')
																												get_Element = set_Event.target.closest('a')

																											for (let set_Counter = 0; set_Counter < this.state.OrganizationalStructure_Member_Eligibility.length; set_Counter ++)
																											{
																												if (this.state.OrganizationalStructure_Member_Eligibility[set_Counter].Eligibility_Key == get_Element.getAttribute('eligibility_key'))
																												{
																													this.state.OrganizationalStructure_Member_Eligibility.splice(set_Counter, 1)
																													this.forceUpdate()
																													break
																												}
																											}
																										}
																									}
																									eligibility_key = { set_Data.Eligibility_Key }
																									className = 'page-link float-right'>
																									<i className = 'zwicon-close'></i>
																								</a>
																							</div>

																							<div className = 'form-group col-md pb-2 Remove_Padding_Left Remove_Padding_Right'>
																								<textarea
																									onChange =
																									{
																										set_Event =>
																										{
																											for (let set_Counter = 0; set_Counter < this.state.OrganizationalStructure_Member_Eligibility.length; set_Counter ++)
																											{
																												if (this.state.OrganizationalStructure_Member_Eligibility[set_Counter].Eligibility_Key == set_Event.target.getAttribute('eligibility_key'))
																												{
																													this.state.OrganizationalStructure_Member_Eligibility[set_Counter].Eligibility_Description = set_Event.target.value
																													this.forceUpdate()
																													break
																												}
																											}
																										}
																									}
																									eligibility_key = { set_Data.Eligibility_Key }
																									name = 'OrganizationalStructure_Member_Eligibility_Description'
																									className = 'form-control'
																									type = 'text'
																									defaultValue = { set_Data.Eligibility_Description }
																									required></textarea>
																								<label className = 'form-control-placeholder' htmlFor = 'OrganizationalStructure_Member_Eligibility_Description'>Qualification/Skill</label>
																								<div className = 'valid-feedback'>Qualification/Skill is valid</div>
																								<div className = 'invalid-feedback'>Please provide a Qualification/Skill</div>
																							</div>
																						</div>
																			})
																		}
																	</div>
																</div>
															</div>

															<div className = 'form-group col-md-4 pb-2'>
																<div className = 'row col-md'>
																	<div className = 'form-group col-md-12 pb-2 Remove_Padding_Left Remove_Padding_Right'>
																		<button className = 'btn btn-outline-theme btn--icon-text waves-effect' type = 'button' data-toggle = 'collapse' data-target = '#Collapse_OrganizationalStructure_Program'>
																			<i className = 'zwicon-eye'></i>What are the Cooperative`s&nbsp;<span className = 'Highlight_Text'>Education Program/s</span>&nbsp;for the following?
																		</button>
																	</div>

																	<div className = 'form-group col-md-12 collapse Remove_Padding_Left Remove_Padding_Right' id = 'Collapse_OrganizationalStructure_Program'>
																		<div className = 'form-group col-md pb-2 Remove_Padding_Left Remove_Padding_Right'>
																			<button
																				onClick =
																				{
																					() =>
																					{
																						let get_OrganizationalStructure_Program = this.state.OrganizationalStructure_Program

																						get_OrganizationalStructure_Program.push
																						({
																							'Program_Key'				:	'Program-' + this.state.OrganizationalStructure_Program_Key_Counter ++,
																							'Program_Educatee'			:	'',
																							'Program_Description'		:	''
																						})

																						this.setState({ 'OrganizationalStructure_Program' : get_OrganizationalStructure_Program }, () =>
																						{
																							System_Manipulator.set_Textarea_Autosize
																							({
																								'Element' : $('textarea[name = "OrganizationalStructure_Program_Description"]')
																							})
																						})
																					}
																				}
																				className = 'btn btn-outline-theme btn--icon-text waves-effect'
																				type = 'button'>
																				<i className = 'zwicon-plus-circle'></i>Add Program
																			</button>
																			<p className = 'd-none'>{ JSON.stringify(this.state.OrganizationalStructure_Program) }</p>
																		</div>
																		{
																			this.state.OrganizationalStructure_Program.map(set_Data =>
																			{
																				return	<div key = { set_Data.Program_Key } className = 'form-group col-md Remove_Padding_Left Remove_Padding_Right'>
																							<div className = 'form-group col-md pb-3 Remove_Padding_Left Remove_Padding_Right'>
																								<a
																									onClick =
																									{
																										set_Event =>
																										{
																											let get_Element = set_Event.target

																											if (set_Event.target.tagName == 'I')
																												get_Element = set_Event.target.closest('a')

																											for (let set_Counter = 0; set_Counter < this.state.OrganizationalStructure_Program.length; set_Counter ++)
																											{
																												if (this.state.OrganizationalStructure_Program[set_Counter].Program_Key == get_Element.getAttribute('program_key'))
																												{
																													this.state.OrganizationalStructure_Program.splice(set_Counter, 1)
																													this.forceUpdate()
																													break
																												}
																											}
																										}
																									}
																									program_key = { set_Data.Program_Key }
																									className = 'page-link float-right'>
																									<i className = 'zwicon-close'></i>
																								</a>
																							</div>

																							<div className = 'form-group col-md pb-2 Remove_Padding_Left Remove_Padding_Right'>
																								<input
																									onChange =
																									{
																										set_Event =>
																										{
																											for (let set_Counter = 0; set_Counter < this.state.OrganizationalStructure_Program.length; set_Counter ++)
																											{
																												if (this.state.OrganizationalStructure_Program[set_Counter].Program_Key == set_Event.target.getAttribute('program_key'))
																												{
																													this.state.OrganizationalStructure_Program[set_Counter].Program_Educatee = set_Event.target.value
																													this.forceUpdate()
																													break
																												}
																											}
																										}
																									}
																									program_key = { set_Data.Program_Key }
																									name = 'OrganizationalStructure_Program_Educatee'
																									className = 'form-control'
																									type = 'text'
																									defaultValue = { set_Data.Program_Educatee }
																									required/>
																								<label className = 'form-control-placeholder' htmlFor = 'OrganizationalStructure_Program_Educatee'>Educatee</label>
																								<div className = 'valid-feedback'>Educatee is valid</div>
																								<div className = 'invalid-feedback'>Please provide an Educatee</div>
																							</div>

																							<div className = 'form-group col-md pb-2 Remove_Padding_Left Remove_Padding_Right'>
																								<textarea
																									onChange =
																									{
																										set_Event =>
																										{
																											for (let set_Counter = 0; set_Counter < this.state.OrganizationalStructure_Program.length; set_Counter ++)
																											{
																												if (this.state.OrganizationalStructure_Program[set_Counter].Program_Key == set_Event.target.getAttribute('program_key'))
																												{
																													this.state.OrganizationalStructure_Program[set_Counter].Program_Description = set_Event.target.value
																													this.forceUpdate()
																													break
																												}
																											}
																										}
																									}
																									program_key = { set_Data.Program_Key }
																									name = 'OrganizationalStructure_Program_Description'
																									className = 'form-control'
																									type = 'text'
																									defaultValue = { set_Data.Program_Description }
																									required/>
																								<label className = 'form-control-placeholder' htmlFor = 'OrganizationalStructure_Program_Description'>Description</label>
																								<div className = 'valid-feedback'>Description is valid</div>
																								<div className = 'invalid-feedback'>Please provide a Description</div>
																							</div>
																						</div>
																			})
																		}
																	</div>
																</div>
															</div>

															<div className = 'form-group col-md-4'>
																<div className = 'form-group col-md-12 pb-2 Remove_Padding_Left Remove_Padding_Right'>
																	<button className = 'btn btn-outline-theme btn--icon-text waves-effect' type = 'button' data-toggle = 'collapse' data-target = '#Collapse_Table_OrganizationalStructure_Member'>
																		<i className = 'zwicon-eye'></i>For its initial operations, who among the following&nbsp;<span className = 'Highlight_Text'>Officer/s or Employee/s</span>&nbsp;should be hired by the Cooperative.
																	</button>
																</div>
															</div>

															<div className = 'form-group col-md-12 collapse' id = 'Collapse_Table_OrganizationalStructure_Member'>
																<table ref = { this.Element['Table_OrganizationalStructure_Member'] } className = 'table table-bordered table-hover'>
																	<thead>
																		<tr>
																			<th>Position</th>
																			<th>Fullname</th>
																			<th>Status of Appointment</th>
																			<th>Minimum Education/Experience/Training</th>
																			<th>Compensation</th>
																			<th>Action</th>
																		</tr>
																	</thead>
																	<tbody></tbody>
																</table>
															</div>

															<div className = 'form-group col-md-4 pb-2 Remove_Padding_Left Remove_Padding_Right'>
																<button className = 'btn btn-outline-theme btn--icon-text waves-effect' type = 'button' data-toggle = 'collapse' data-target = '#Collapse_Table_OrganizationalStructure_Committee'>
																	<i className = 'zwicon-eye'></i>Who are the&nbsp;<span className = 'Highlight_Text'>Chairmen and Members</span>&nbsp;of the following Committee/s?
																</button>
															</div>

															<div className = 'form-group col-md-12 collapse' id = 'Collapse_Table_OrganizationalStructure_Committee'>
																<table ref = { this.Element['Table_OrganizationalStructure_Committee'] } className = 'table table-bordered table-hover'>
																	<thead>
																		<tr>
																			<th>Committee Name</th>
																			<th>Chairmen</th>
																			<th>Members</th>
																			<th>Description</th>
																			<th>Action</th>
																		</tr>
																	</thead>
																	<tbody>
																	</tbody>
																</table>
															</div>
														</div>
													</form>
												</div>

												<div className = 'carousel-item'>

													<a onClick = { set_Event => System_Manipulator.set_Card_Size(set_Event, this) } className = 'page-link Card_Resizer float-right'><i className = { this.state.Card_State == 'Minimize' ? 'zwicon-expand-alt' : 'zwicon-collapse-alt' }></i></a>
													<h4 className = 'card-title'>VIII. Cooperative Strategic Operational Studies&nbsp;<span className = 'Highlight_Text'>(Organizational Structure - Chart)</span></h4>
													<h6 className = 'card-subtitle'>Please provide a valid&nbsp;<span className = 'Highlight_Text'>Organizational Chart</span>&nbsp;Information</h6>

													<hr/>

													<form>
														<div className = 'form-row'>
															<div className = 'form-group col-md-12'>
																<a className = 'page-link Carousel_Navigator float-left' href = '#Carousel_Cooperative_Registration' role = 'button' data-slide = 'prev'>
																	<i className = 'zwicon-arrow-left'></i>
																</a>

																<a className = 'page-link Carousel_Navigator float-right' href = '#Carousel_Cooperative_Registration' role = 'button' data-slide = 'next'>
																	<i className = 'zwicon-arrow-right'></i>
																</a>
															</div>

															<div className = 'form-group col-md-12 pb-2 Remove_Padding_Left Remove_Padding_Right'>
																<button
																	onClick =
																	{
																		() =>
																		{
																			this.Element.OrganizationalStructure_Member_Chart.Insert
																			({
																				'Identity'			:	'USR-' + this.Element.OrganizationalStructure_Member_Chart.Counter,
																				'Identity_Parent'	:	'',
																				'Title'				:	'Member',
																				'Description'		:	'Name ' + this.Element.OrganizationalStructure_Member_Chart.Counter,
																				'Image'				:	URL_Person_Image
																			})

																			this.Element.OrganizationalStructure_Member_Chart.Counter ++

																			this.Element.OrganizationalStructure_Member_Chart.Initialize_Chart()
																		}
																	}
																	className = 'btn btn-outline-theme btn--icon-text waves-effect'
																	type = 'button'>
																	<i className = 'zwicon-user-plus'></i>Add&nbsp;<span className = 'Highlight_Text'>Member</span>&nbsp;
																</button>
															</div>

															<div className = 'form-group col-md-12'>
																<div className = 'row'>
																	<div className = 'col-md-12'>
																		<System_Organogram ref = { this.Element['OrganizationalStructure_Member_Chart'] }/>
																	</div>
																</div>
															</div>
														</div>
													</form>
												</div>

												<div className = 'carousel-item'>

													<a onClick = { set_Event => System_Manipulator.set_Card_Size(set_Event, this) } className = 'page-link Card_Resizer float-right'><i className = { this.state.Card_State == 'Minimize' ? 'zwicon-expand-alt' : 'zwicon-collapse-alt' }></i></a>
													<h4 className = 'card-title'>IX. Cooperative Strategic Operational Studies&nbsp;<span className = 'Highlight_Text'>(Remarks)</span></h4>
													<h6 className = 'card-subtitle'>Please provide a valid&nbsp;<span className = 'Highlight_Text'>Remarks</span>&nbsp;</h6>

													<hr/>

													<form ref = { this.Element['Form_Cooperative_OrganizationalStructure_Remark'] }>
														<div className = 'form-row'>
															<div className = 'form-group col-md-12'>
																<a className = 'page-link Carousel_Navigator float-left' href = '#Carousel_Cooperative_Registration' role = 'button' data-slide = 'prev'>
																	<i className = 'zwicon-arrow-left'></i>
																</a>
																<a className = 'page-link Carousel_Navigator float-right' href = '#Carousel_Cooperative_Registration' role = 'button' data-slide = 'next'>
																	<i className = 'zwicon-arrow-right'></i>
																</a>
															</div>

															<div className = 'form-group col-md-12 text-center'>
																<p>
																	We, the Founding Board of Directors,
																	hereby certify that the foregoing Economic Survey was prepared in accordance with the facts,
																	information and other data we believed vital to the success of the initial operations of the Cooperative.
																</p>
															</div>

															<div className = 'form-group col-md-4 pb-2'></div>

															<div className = 'form-group col-md-4 pb-2'>
																<input
																onChange =
																{
																	set_Event =>
																	{
																		$($('input[name = "OrganizationalStructure_Remark_Member"]')[5]).attr('value', set_Event.target.value)
																	}
																}
																name = 'OrganizationalStructure_Remark_Member'
																className = 'form-control form-control-input-text-center'
																type = 'text'
																required/>
																<label className = 'form-control-placeholder form-control-label-text-center' htmlFor = 'OrganizationalStructure_Remark_Member'>Chairman</label>
																<div className = 'valid-feedback'>Chairman is valid</div>
																<div className = 'invalid-feedback'>Please provide a Chairman</div>
															</div>

															<div className = 'form-group col-md-4 pb-2'></div>

															<div className = 'form-group col-md-2 pb-2'></div>

															<div className = 'form-group col-md-4 pb-2'>
																<input
																onChange =
																{
																	set_Event =>
																	{
																		$($('input[name = "OrganizationalStructure_Remark_Member"]')[6]).attr('value', set_Event.target.value)
																	}
																}
																name = 'OrganizationalStructure_Remark_Member'
																className = 'form-control form-control-input-text-center'
																type = 'text'
																required/><label className = 'form-control-placeholder form-control-label-text-center' htmlFor = 'OrganizationalStructure_Remark_Member'>Member</label>
																<div className = 'valid-feedback'>Member is valid</div>
																<div className = 'invalid-feedback'>Please provide a Member</div>
															</div>

															<div className = 'form-group col-md-4 pb-2'>
																<input
																onChange =
																{
																	set_Event =>
																	{
																		$($('input[name = "OrganizationalStructure_Remark_Member"]')[7]).attr('value', set_Event.target.value)
																	}
																}
																name = 'OrganizationalStructure_Remark_Member'
																className = 'form-control form-control-input-text-center'
																type = 'text'
																required/>
																<label className = 'form-control-placeholder form-control-label-text-center' htmlFor = 'OrganizationalStructure_Remark_Member'>Member</label>
																<div className = 'valid-feedback'>Member is valid</div>
																<div className = 'invalid-feedback'>Please provide a Member</div>
															</div>

															<div className = 'form-group col-md-2 pb-2'></div>

															<div className = 'form-group col-md-2 pb-2'></div>

															<div className = 'form-group col-md-4 pb-2'>
																<input
																onChange =
																{
																	set_Event =>
																	{
																		$($('input[name = "OrganizationalStructure_Remark_Member"]')[8]).attr('value', set_Event.target.value)
																	}
																}
																name = 'OrganizationalStructure_Remark_Member'
																className = 'form-control form-control-input-text-center'
																type = 'text'
																required/><label className = 'form-control-placeholder form-control-label-text-center' htmlFor = 'OrganizationalStructure_Remark_Member'>Member</label>
																<div className = 'valid-feedback'>Member is valid</div>
																<div className = 'invalid-feedback'>Please provide a Member</div>
															</div>

															<div className = 'form-group col-md-4 pb-2'>
																<input
																onChange =
																{
																	set_Event =>
																	{
																		$($('input[name = "OrganizationalStructure_Remark_Member"]')[9]).attr('value', set_Event.target.value)
																	}
																}
																name = 'OrganizationalStructure_Remark_Member'
																className = 'form-control form-control-input-text-center'
																type = 'text'
																required/><label className = 'form-control-placeholder form-control-label-text-center' htmlFor = 'OrganizationalStructure_Remark_Member'>Member</label>
																<div className = 'valid-feedback'>Member is valid</div>
																<div className = 'invalid-feedback'>Please provide a Member</div>
															</div>

															<div className = 'form-group col-md-2 pb-2'></div>

															<div className = 'form-group col-md-12 text-center'>
																<p>
																	Subscribed and sworn to before me this
																	<input
																	onChange =
																	{
																		set_Event =>
																		{
																			$(set_Event.target).width($(set_Event.target).val().length * 10)
																		} 
																	}
																	name = 'OrganizationalStructure_Remark_Day'
																	className = 'form-control-input-text-center'
																	type = 'text'
																	required/>
																	day of
																	<input
																	onChange =
																	{
																		set_Event =>
																		{
																			$(set_Event.target).width($(set_Event.target).val().length * 10)
																		} 
																	}
																	name = 'OrganizationalStructure_Remark_Month'
																	className = 'form-control-input-text-center'
																	type = 'text'
																	required/>,
																	<input
																	onChange =
																	{
																		set_Event =>
																		{
																			$(set_Event.target).width($(set_Event.target).val().length * 10)
																		} 
																	}
																	name = 'OrganizationalStructure_Remark_Year'
																	className = 'form-control-input-text-center'
																	type = 'text'
																	required/>
																	in
																	<input
																	onChange =
																	{
																		set_Event =>
																		{
																			$(set_Event.target).width($(set_Event.target).val().length * 10)
																		} 
																	}
																	name = 'OrganizationalStructure_Remark_Address'
																	className = 'form-control-input-text-center'
																	type = 'text'
																	required/>,
																	Philippines above affiants exhibiting to me their valid proof of identity:
										
																</p>
															</div>

															<div className = 'form-group col-md-12'>
																<table ref = { this.Element['Table_Cooperative_OrganizationalStructure_Remark'] } className = 'table table-bordered table-hover'>
																	<thead>
																		<tr>
																			<th>Name</th>
																			<th>Proof of Valid Identity</th>
																			<th>Office & Place of Issue</th>
																		</tr>
																	</thead>
																	<tbody>
																		<tr>
																			<td>
																				<input name = 'OrganizationalStructure_Remark_Member' className = 'form-control form-control-input-text-center' type = 'text' readOnly/>
																				<div className = 'valid-feedback'>Member is valid</div>
																				<div className = 'invalid-feedback'>Please provide a Member</div>
																			</td>

																			<td>
																				<input name = 'OrganizationalStructure_Remark_Proof' className = 'form-control form-control-input-text-center' type = 'text' required/>
																				<div className = 'valid-feedback'>Member is valid</div>
																				<div className = 'invalid-feedback'>Please provide a Member</div>
																			</td>

																			<td>
																				<input name = 'OrganizationalStructure_Remark_Address' className = 'form-control form-control-input-text-center' type = 'text' required/>
																				<div className = 'valid-feedback'>Member is valid</div>
																				<div className = 'invalid-feedback'>Please provide a Member</div>
																			</td>
																		</tr>

																		<tr>
																			<td>
																				<input name = 'OrganizationalStructure_Remark_Member' className = 'form-control form-control-input-text-center' type = 'text' readOnly/>
																				<div className = 'valid-feedback'>Member is valid</div>
																				<div className = 'invalid-feedback'>Please provide a Member</div>
																			</td>

																			<td>
																				<input name = 'OrganizationalStructure_Remark_Proof' className = 'form-control form-control-input-text-center' type = 'text' required/>
																				<div className = 'valid-feedback'>Member is valid</div>
																				<div className = 'invalid-feedback'>Please provide a Member</div>
																			</td>

																			<td>
																				<input name = 'OrganizationalStructure_Remark_Address' className = 'form-control form-control-input-text-center' type = 'text' required/>
																				<div className = 'valid-feedback'>Member is valid</div>
																				<div className = 'invalid-feedback'>Please provide a Member</div>
																			</td>
																		</tr>

																		<tr>
																			<td>
																				<input name = 'OrganizationalStructure_Remark_Member' className = 'form-control form-control-input-text-center' type = 'text' readOnly/>
																				<div className = 'valid-feedback'>Member is valid</div>
																				<div className = 'invalid-feedback'>Please provide a Member</div>
																			</td>

																			<td>
																				<input name = 'OrganizationalStructure_Remark_Proof' className = 'form-control form-control-input-text-center' type = 'text' required/>
																				<div className = 'valid-feedback'>Member is valid</div>
																				<div className = 'invalid-feedback'>Please provide a Member</div>
																			</td>

																			<td>
																				<input name = 'OrganizationalStructure_Remark_Address' className = 'form-control form-control-input-text-center' type = 'text' required/>
																				<div className = 'valid-feedback'>Member is valid</div>
																				<div className = 'invalid-feedback'>Please provide a Member</div>
																			</td>
																		</tr>

																		<tr>
																			<td>
																				<input name = 'OrganizationalStructure_Remark_Member' className = 'form-control form-control-input-text-center' type = 'text' readOnly/>
																				<div className = 'valid-feedback'>Member is valid</div>
																				<div className = 'invalid-feedback'>Please provide a Member</div>
																			</td>

																			<td>
																				<input name = 'OrganizationalStructure_Remark_Proof' className = 'form-control form-control-input-text-center' type = 'text' required/>
																				<div className = 'valid-feedback'>Member is valid</div>
																				<div className = 'invalid-feedback'>Please provide a Member</div>
																			</td>

																			<td>
																				<input name = 'OrganizationalStructure_Remark_Address' className = 'form-control form-control-input-text-center' type = 'text' required/>
																				<div className = 'valid-feedback'>Member is valid</div>
																				<div className = 'invalid-feedback'>Please provide a Member</div>
																			</td>
																		</tr>

																		<tr>
																			<td>
																				<input name = 'OrganizationalStructure_Remark_Member' className = 'form-control form-control-input-text-center' type = 'text' readOnly/>
																				<div className = 'valid-feedback'>Member is valid</div>
																				<div className = 'invalid-feedback'>Please provide a Member</div>
																			</td>

																			<td>
																				<input name = 'OrganizationalStructure_Remark_Proof' className = 'form-control form-control-input-text-center' type = 'text' required/>
																				<div className = 'valid-feedback'>Member is valid</div>
																				<div className = 'invalid-feedback'>Please provide a Member</div>
																			</td>

																			<td>
																				<input name = 'OrganizationalStructure_Remark_Address' className = 'form-control form-control-input-text-center' type = 'text' required/>
																				<div className = 'valid-feedback'>Member is valid</div>
																				<div className = 'invalid-feedback'>Please provide a Member</div>
																			</td>
																		</tr>


																	</tbody>
																</table>
															</div>

															<div className = 'form-group col-md-12 text-center'>
																<h4>NOTARY PUBLIC</h4>
																<p>
																	NOTE: The CDA reserves the right to review/verify the authenticity/viability of the information
																	provided in this survey and may require the proponent to modify, revise or amend the whole or any
																	part thereof if necessary, or, if found to be economically unfeasible, deny the registration of the
																	Cooperative.
																</p>
															</div>

															<div className = 'form-group col-md-12 pb-2'>
																<button
																	onClick =
																	{
																		() =>
																		{
																			this.Manage_Cooperative_Registration('Insert : Specific', this.get_Cooperative_Registration_Data(this))
																		}
																	}
																	className = 'btn btn-theme btn--icon-text col-md waves-effect'
																	type = 'button'>
																	<i className = 'zwicon-checkmark-circle'></i>Save
																</button>
															</div>
														</div>
													</form>
												</div>

												<div className = 'carousel-item'>

													<a onClick = { set_Event => System_Manipulator.set_Card_Size(set_Event, this) } className = 'page-link Card_Resizer float-right'><i className = { this.state.Card_State == 'Minimize' ? 'zwicon-expand-alt' : 'zwicon-collapse-alt' }></i></a>
													<h4 className = 'card-title'>X. Data</h4>
													<h6 className = 'card-subtitle'><span className = 'Highlight_Text'>X. Data</span></h6>

													<hr/>

													<form>
														<div className = 'form-row'>
															<div className = 'form-group col-md-12'>
																<a className = 'page-link Carousel_Navigator float-left' href = '#Carousel_Cooperative_Registration' role = 'button' data-slide = 'prev'>
																	<i className = 'zwicon-arrow-left'></i>
																</a>

																<a className = 'page-link Carousel_Navigator float-right' href = '#Carousel_Cooperative_Registration' role = 'button' data-slide = 'next'>
																	<i className = 'zwicon-arrow-right'></i>
																</a>
															</div>

															<div className = 'form-group col-md-12'><h1>Data - 1:</h1>
																<div className = 'Data_1'></div>
															</div>

															<div className = 'form-group col-md-12'><h1>Data - 2:</h1>
																<div className = 'Data_2'></div>
															</div>

															<div className = 'form-group col-md-12'><h1>Data - 3:</h1>
																<div className = 'Data_3'></div>
															</div>

															<div className = 'form-group col-md-12'><h1>Data - 4:</h1>
																<div className = 'Data_4'></div>
															</div>

															<div className = 'form-group col-md-12'><h1>Data - 5:</h1>
																<div className = 'Data_5'></div>
															</div>

															<div className = 'form-group col-md-12'><h1>Data - 6:</h1>
																<div className = 'Data_6'></div>
															</div>

															<div className = 'form-group col-md-12'><h1>Data - 7:</h1>
																<div className = 'Data_7'></div>
															</div>

															<div className = 'form-group col-md-12'><h1>Data - 8:</h1>
																<div className = 'Data_8'></div>
															</div>

															<div className = 'form-group col-md-12'><h1>Data - 9:</h1>
																<div className = 'Data_9'></div>
															</div>

														</div>
													</form>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</section>
					</div>
		}
	}

	window.ECIMS_Cooperative_Registration = ECIMS_Cooperative_Registration
})