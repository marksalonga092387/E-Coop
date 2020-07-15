#! "F:/Python_3.8.3/python.exe"

from ECIMS_Main import *
from ECIMS_Cooperative import *
from ECIMS_User import *
from ECIMS_Blockchain import *

def Main_Method():

	try:
		GLOBAL['REQUEST'] = request.form.to_dict()

		if GLOBAL['REQUEST']['Action'] == 'User : Registration':

			GLOBAL['REQUEST']['User_Identity']			=	'USR-' + str(Main.Select_Counter(GLOBAL['User_Counter_Code']))
			GLOBAL['REQUEST']['User_Type']				=	'Cooperator'
			GLOBAL['REQUEST']['User_Privilege']			=	'["Cooperator"]'
			GLOBAL['REQUEST']['User_State']				=	'Unconfirmed'

			get_Ethereum_Account = Blockchain.Create_Account()

			GLOBAL['REQUEST']['User_Ethereum_Address']	=	get_Ethereum_Account['Address']
			GLOBAL['REQUEST']['User_Ethereum_Key']		=	get_Ethereum_Account['Private_Key']
			GLOBAL['REQUEST']['User_Inserted_By']		=	GLOBAL['REQUEST']['User_Identity']
			GLOBAL['REQUEST']['User_Inserted_DateTime']	=	str(datetime.now())

			GLOBAL['REQUEST']['User_Gender']			=	''
			GLOBAL['REQUEST']['User_Citizenship']		=	''
			GLOBAL['REQUEST']['User_Birth_Place']		=	''
			GLOBAL['REQUEST']['User_Birth_DateTime']	=	''
			GLOBAL['REQUEST']['User_Address_Home']		=	''
			GLOBAL['REQUEST']['User_Image_Path']		=	request.files['User_Image_Path']

			if GLOBAL['REQUEST']['User_Image_Path'].filename != '':
				GLOBAL['REQUEST']['User_Image_Path'] = Main.Image_Save(GLOBAL['REQUEST']['User_Image_Path'], 'User', GLOBAL['REQUEST']['User_Identity'])

			else:
				GLOBAL['REQUEST']['User_Image_Path'] = ''

			GLOBAL['REQUEST']['Employment_Company_Name']					=	''
			GLOBAL['REQUEST']['Employment_Business_Type']					=	''
			GLOBAL['REQUEST']['Employment_Business_Form']					=	''
			GLOBAL['REQUEST']['Employment_Business_Address']				=	''
			GLOBAL['REQUEST']['Employment_Employer_Firstname']				=	''
			GLOBAL['REQUEST']['Employment_Employer_Middlename']				=	''
			GLOBAL['REQUEST']['Employment_Employer_Lastname']				=	''
			GLOBAL['REQUEST']['Employment_Business_Contact_Number']			=	''
			GLOBAL['REQUEST']['Employment_Business_Contact_Number_Local']	=	''
			GLOBAL['REQUEST']['Employment_Tenure_Year']						=	''
			GLOBAL['REQUEST']['Employment_Appointment_Status']				=	''
			GLOBAL['REQUEST']['Employment_Position_Title']					=	''
			GLOBAL['REQUEST']['Employment_Position_Level']					=	''
			GLOBAL['REQUEST']['Employment_Pay_Period']						=	''
			GLOBAL['REQUEST']['Employment_Hired_DateTime']					=	''

			if User.Insert_User_Credential() == True & User.Insert_User_Personal() == True & User.Insert_User_Personal_Employment() == True:
				Main.Update_Counter(GLOBAL['User_Counter_Code'])
				return 'Insert Succeeded'

			else:
				return 'Insert Failed'

		elif GLOBAL['REQUEST']['Action'] == 'User : Login':
			return str(User.Select_User())

		elif GLOBAL['REQUEST']['Action'] == 'User : Send Account Confirmation Code':

			GLOBAL['REQUEST']['Confirmation_Identity']			=	'USR-CFMTN-' + str(Main.Select_Counter(GLOBAL['User_Confirmation_Counter_Code']))
			GLOBAL['REQUEST']['Confirmation_Code']				=	Hashids(salt = str(datetime.now()), min_length=10).encrypt(random.randrange(0, 999)).upper()
			GLOBAL['REQUEST']['Confirmation_Status']			=	'Pending'
			GLOBAL['REQUEST']['Confirmation_Inserted_DateTime']	=	str(datetime.now())

			if User.Insert_User_Confirmation() == True:
				Main.Update_Counter(GLOBAL['User_Confirmation_Counter_Code'])
				Main.set_Email_Message('UB_ECIMS', GLOBAL['REQUEST']['User_Address_Email'], 'Account Confirmation', 'Your Confirmation Code is: ' + GLOBAL['REQUEST']['Confirmation_Code'])
				#Main.set_ShortMessageService_Message('UB_ECIMS', '63' + GLOBAL['REQUEST']['User_Contact_TelephoneNumber_Mobile'], 'Account Confirmation', 'Your Confirmation Code is: ' + GLOBAL['REQUEST']['Confirmation_Code'])
				return 'Insert Succeeded'

			else:
				return 'Insert Failed'

		elif GLOBAL['REQUEST']['Action'] == 'User : Confirm Account':

			get_Data = User.Select_User_Confirmation()

			if get_Data == 'No Data':
				return get_Data

			else:

				GLOBAL['REQUEST']['Update_Action'] = 'Update : Specific : [ User_State ]'
				GLOBAL['REQUEST']['User_State'] = 'Confirmed'
				GLOBAL['REQUEST']['User_Updated_By'] = GLOBAL['REQUEST']['User_Identity']
				GLOBAL['REQUEST']['User_Updated_DateTime'] = str(datetime.now())

				if User.Update_User_Credential() == True:

					GLOBAL['REQUEST']['Confirmation_Identity'] = json.loads(get_Data)[0]['Confirmation_Identity']
					GLOBAL['REQUEST']['Confirmation_Status'] = 'Used'
					User.Update_User_Confirmation()

					return 'Update Succeeded'

				else:
					return 'Update Failed'

		elif GLOBAL['REQUEST']['Action'] == 'Select_User':
			return str(User.Select_User())

		elif GLOBAL['REQUEST']['Action'] == 'Update_User_Credential':

			GLOBAL['REQUEST']['User_Updated_DateTime'] = str(datetime.now())

			if User.Update_User_Credential() == True:
				return 'Update Succeeded'

			else:
				return 'Update Failed'


		elif GLOBAL['REQUEST']['Action'] == 'Update_User_Personal':

			if request.files['User_Image_Path'].filename != '':
				GLOBAL['REQUEST']['User_Image_Path'] = Main.Image_Save(request.files['User_Image_Path'], 'User', GLOBAL['REQUEST']['User_Identity'])
				GLOBAL['REQUEST']['Update_Action'] = 'Update : Specific'

			else:
				GLOBAL['REQUEST']['Update_Action'] = 'Update : Specific : < User_Image_Path >'

			get_Boolean_1 = User.Update_User_Personal()

			GLOBAL['REQUEST']['Update_Action'] = 'Update : Specific : [ User_Updated_By, User_Updated_DateTime ]'
			GLOBAL['REQUEST']['User_Updated_DateTime'] = str(datetime.now())
			get_Boolean_2 = User.Update_User_Credential()

			if get_Boolean_1 and get_Boolean_2:
				return 'Update Succeeded'

			else:
				return 'Update Failed'

		elif GLOBAL['REQUEST']['Action'] == 'Update_User_Personal_Employment':

			GLOBAL['REQUEST']['Update_Action'] = 'Update : Specific'
			get_Boolean_1 = User.Update_User_Personal_Employment()

			GLOBAL['REQUEST']['Update_Action'] = 'Update : Specific : [ User_Updated_By, User_Updated_DateTime ]'
			GLOBAL['REQUEST']['User_Updated_DateTime'] = str(datetime.now())
			get_Boolean_2 = User.Update_User_Credential()

			if get_Boolean_1 and get_Boolean_2:
				return 'Update Succeeded'

			else:
				return 'Update Failed'

		elif GLOBAL['REQUEST']['Action'] == 'Insert_Cooperative_EconomicSurvey':
			if Cooperative.Insert_Cooperative_EconomicSurvey() == True:
				Main.Update_Counter(GLOBAL['Cooperative_Counter_Code'])
				return 'Insert Succeeded'

			else:
				return 'Insert Failed'

		elif GLOBAL['REQUEST']['Action'] == 'Select_User_Personal_Gender':
			return str(User.Select_User_Personal_Gender())

		elif GLOBAL['REQUEST']['Action'] == 'Insert_User_Log':
			GLOBAL['REQUEST']['Log_Identity'] = 'USR-LG-' + str(Main.Select_Counter(GLOBAL['User_Log_Counter_Code']))
			
			if User.Insert_User_Log() == True:
				Main.Update_Counter(GLOBAL['User_Log_Counter_Code'])
				return 'Insert Succeeded'

			else:
				return 'Insert Failed'

		else:
			return 'No Action'

	except Exception as set_Exception:
		return str(set_Exception)

Main.run_Flask(Main_Method)