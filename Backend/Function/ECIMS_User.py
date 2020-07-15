#! "F:/Python_3.8.3/python.exe"

from ECIMS_Main import *

class User:

	def Select_User():

		Query_Select = ''

		if GLOBAL['REQUEST']['Select_Action'] == 'Select : All':
			Query_Select = f"""
								SELECT * FROM User_Credential

								INNER JOIN User_Personal ON
								User_Personal.User_Identity = User_Credential.User_Identity

								INNER JOIN User_Personal_Employment ON
								User_Personal_Employment.User_Identity = User_Credential.User_Identity
							"""

		elif GLOBAL['REQUEST']['Select_Action'] == 'Select : Specific':
			Query_Select = f"""
								SELECT * FROM User_Credential

								INNER JOIN User_Personal ON
								User_Personal.User_Identity = User_Credential.User_Identity

								INNER JOIN User_Personal_Employment ON
								User_Personal_Employment.User_Identity = User_Credential.User_Identity

								WHERE
								User_Credential.User_Identity = '{ GLOBAL['REQUEST']['User_Identity'] }'

							"""

		elif GLOBAL['REQUEST']['Select_Action'] == 'Select : Specific : { User_Name, User_Password }':
			Query_Select = f"""
								SELECT * FROM User_Credential

								INNER JOIN User_Personal ON
								User_Personal.User_Identity = User_Credential.User_Identity

								INNER JOIN User_Personal_Employment ON
								User_Personal_Employment.User_Identity = User_Credential.User_Identity

								WHERE
								User_Credential.User_Name = '{ GLOBAL['REQUEST']['User_Name'] }'
								AND
								User_Credential.User_Password = '{ GLOBAL['REQUEST']['User_Password'] }'

							"""
		try:
			PyMySQL_Row_Count = GLOBAL['PyMySQL_Cursor'].execute(Query_Select)
			PyMySQL_Data = GLOBAL['PyMySQL_Cursor'].fetchall()

		except Exception as set_Exception:
			return str(set_Exception)

		if PyMySQL_Row_Count > 0:
			return simplejson.dumps(PyMySQL_Data, indent = 4, sort_keys = True, default = str)

		else:
			return '[]'

	def Insert_User_Credential():

		Query_Insert = f"""
							INSERT INTO User_Credential
							(
								User_Identity,
								User_Name,
								User_Password,
								User_Type,
								User_Privilege,
								User_State,
								User_Ethereum_Address,
								User_Ethereum_Key,
								User_Inserted_By,
								User_Inserted_DateTime
							)
							VALUES
							(
								'{ GLOBAL['REQUEST']['User_Identity'] }',
								'{ GLOBAL['REQUEST']['User_Name'] }',
								'{ GLOBAL['REQUEST']['User_Password'] }',
								'{ GLOBAL['REQUEST']['User_Type'] }',
								'{ GLOBAL['REQUEST']['User_Privilege'] }',
								'{ GLOBAL['REQUEST']['User_State'] }',
								'{ GLOBAL['REQUEST']['User_Ethereum_Address'] }',
								'{ GLOBAL['REQUEST']['User_Ethereum_Key'] }',
								'{ GLOBAL['REQUEST']['User_Inserted_By'] }',
								'{ GLOBAL['REQUEST']['User_Inserted_DateTime'] }'
							)
						"""
		try:
			PyMySQL_Row_Count = GLOBAL['PyMySQL_Cursor'].execute(Query_Insert)
			GLOBAL['PyMySQL_Connection'].commit()

		except Exception as set_Exception:
			return str(set_Exception)

		if PyMySQL_Row_Count > 0:
			return True

		else:
			return False

	def Update_User_Credential():

		if GLOBAL['REQUEST']['Update_Action'] == 'Update : Specific':
			Query_Update = f"""
								UPDATE User_Credential

								SET

								User_Name = '{ GLOBAL['REQUEST']['User_Name'] }',
								User_Password = '{ GLOBAL['REQUEST']['User_Password'] }',
								User_Type = '{ GLOBAL['REQUEST']['User_Type'] }',
								User_Privilege = '{ GLOBAL['REQUEST']['User_Privilege'] }',
								User_State = '{ GLOBAL['REQUEST']['User_State'] }',
								User_Updated_By = '{ GLOBAL['REQUEST']['User_Updated_By'] }',
								User_Updated_DateTime = '{ GLOBAL['REQUEST']['User_Updated_DateTime'] }'

								WHERE User_Identity = '{ GLOBAL['REQUEST']['User_Identity'] }'
							"""

		elif GLOBAL['REQUEST']['Update_Action'] == 'Update : Specific : [ User_State ]':
			Query_Update = f"""
								UPDATE User_Credential

								SET

								User_State = '{ GLOBAL['REQUEST']['User_State'] }',
								User_Updated_By = '{ GLOBAL['REQUEST']['User_Updated_By'] }',
								User_Updated_DateTime = '{ GLOBAL['REQUEST']['User_Updated_DateTime'] }'

								WHERE User_Identity = '{ GLOBAL['REQUEST']['User_Identity'] }'
							"""

		elif GLOBAL['REQUEST']['Update_Action'] == 'Update : Specific : [ User_Updated_By, User_Updated_DateTime ]':
			Query_Update = f"""
								UPDATE User_Credential

								SET

								User_Updated_By = '{ GLOBAL['REQUEST']['User_Updated_By'] }',
								User_Updated_DateTime = '{ GLOBAL['REQUEST']['User_Updated_DateTime'] }'

								WHERE User_Identity = '{ GLOBAL['REQUEST']['User_Identity'] }'
							"""

		try:
			PyMySQL_Row_Count = GLOBAL['PyMySQL_Cursor'].execute(Query_Update)
			GLOBAL['PyMySQL_Connection'].commit()

		except Exception as set_Exception:
			return str(set_Exception)

		if PyMySQL_Row_Count > 0:
			return True

		else:
			return False

	def Insert_User_Personal():

		Query_Insert = f"""
							INSERT INTO User_Personal
							(
								User_Identity,
								User_Firstname,
								User_Middlename,
								User_Lastname,
								User_Gender,
								User_Citizenship,
								User_Birth_Place,
								User_Birth_DateTime,
								User_Address_Email,
								User_Address_Home,
								User_Contact_TelephoneNumber_Mobile,
								User_Contact_TelephoneNumber_Landline,
								User_Image_Path
							)
							VALUES
							(
								'{ GLOBAL['REQUEST']['User_Identity'] }',
								'{ GLOBAL['REQUEST']['User_Firstname'] }',
								'{ GLOBAL['REQUEST']['User_Middlename'] }',
								'{ GLOBAL['REQUEST']['User_Lastname'] }',
								'{ GLOBAL['REQUEST']['User_Gender'] }',
								'{ GLOBAL['REQUEST']['User_Citizenship'] }',
								'{ GLOBAL['REQUEST']['User_Birth_Place'] }',
								'{ GLOBAL['REQUEST']['User_Birth_DateTime'] }',
								'{ GLOBAL['REQUEST']['User_Address_Email'] }',
								'{ GLOBAL['REQUEST']['User_Address_Home'] }',
								'{ GLOBAL['REQUEST']['User_Contact_TelephoneNumber_Mobile'] }',
								'{ GLOBAL['REQUEST']['User_Contact_TelephoneNumber_Landline'] }',
								'{ GLOBAL['REQUEST']['User_Image_Path'] }'
							)
						"""
		try:
			PyMySQL_Row_Count = GLOBAL['PyMySQL_Cursor'].execute(Query_Insert)
			GLOBAL['PyMySQL_Connection'].commit()

		except Exception as set_Exception:
			return str(set_Exception)

		if PyMySQL_Row_Count > 0:
			return True

		else:
			return False

	def Update_User_Personal():

		if GLOBAL['REQUEST']['Update_Action'] == 'Update : Specific':
			Query_Update = f"""
								UPDATE User_Personal

								SET

								User_Firstname = '{ GLOBAL['REQUEST']['User_Firstname'] }',
								User_Middlename = '{ GLOBAL['REQUEST']['User_Middlename'] }',
								User_Lastname = '{ GLOBAL['REQUEST']['User_Lastname'] }',
								User_Gender = '{ GLOBAL['REQUEST']['User_Gender'] }',
								User_Citizenship = '{ GLOBAL['REQUEST']['User_Citizenship'] }',
								User_Birth_Place = '{ GLOBAL['REQUEST']['User_Birth_Place'] }',
								User_Birth_DateTime = '{ GLOBAL['REQUEST']['User_Birth_DateTime'] }',
								User_Address_Email = '{ GLOBAL['REQUEST']['User_Address_Email'] }',
								User_Address_Home = '{ GLOBAL['REQUEST']['User_Address_Home'] }',
								User_Contact_TelephoneNumber_Mobile = '{ GLOBAL['REQUEST']['User_Contact_TelephoneNumber_Mobile'] }',
								User_Contact_TelephoneNumber_Landline = '{ GLOBAL['REQUEST']['User_Contact_TelephoneNumber_Landline'] }',
								User_Image_Path = '{ GLOBAL['REQUEST']['User_Image_Path'] }'

								WHERE User_Identity = '{ GLOBAL['REQUEST']['User_Identity'] }'
							"""

		elif GLOBAL['REQUEST']['Update_Action'] == 'Update : Specific : < User_Image_Path >':
			Query_Update = f"""
								UPDATE User_Personal

								SET

								User_Firstname = '{ GLOBAL['REQUEST']['User_Firstname'] }',
								User_Middlename = '{ GLOBAL['REQUEST']['User_Middlename'] }',
								User_Lastname = '{ GLOBAL['REQUEST']['User_Lastname'] }',
								User_Gender = '{ GLOBAL['REQUEST']['User_Gender'] }',
								User_Citizenship = '{ GLOBAL['REQUEST']['User_Citizenship'] }',
								User_Birth_Place = '{ GLOBAL['REQUEST']['User_Birth_Place'] }',
								User_Birth_DateTime = '{ GLOBAL['REQUEST']['User_Birth_DateTime'] }',
								User_Address_Email = '{ GLOBAL['REQUEST']['User_Address_Email'] }',
								User_Address_Home = '{ GLOBAL['REQUEST']['User_Address_Home'] }',
								User_Contact_TelephoneNumber_Mobile = '{ GLOBAL['REQUEST']['User_Contact_TelephoneNumber_Mobile'] }',
								User_Contact_TelephoneNumber_Landline = '{ GLOBAL['REQUEST']['User_Contact_TelephoneNumber_Landline'] }'

								WHERE User_Identity = '{ GLOBAL['REQUEST']['User_Identity'] }'
							"""

	
		try:
			PyMySQL_Row_Count = GLOBAL['PyMySQL_Cursor'].execute(Query_Update)
			GLOBAL['PyMySQL_Connection'].commit()

		except Exception as set_Exception:
			return str(set_Exception)

		if PyMySQL_Row_Count > 0:
			return True

		else:
			return False

	def Insert_User_Personal_Employment():

		Query_Insert = f"""
							INSERT INTO User_Personal_Employment
							(
								User_Identity,
								Employment_Company_Name,
								Employment_Business_Type,
								Employment_Business_Form,
								Employment_Business_Address,
								Employment_Employer_Firstname,
								Employment_Employer_Middlename,
								Employment_Employer_Lastname,
								Employment_Business_Contact_Number,
								Employment_Business_Contact_Number_Local,
								Employment_Tenure_Year,
								Employment_Appointment_Status,
								Employment_Position_Title,
								Employment_Position_Level,
								Employment_Pay_Period,
								Employment_Hired_DateTime
							)
							VALUES
							(
								'{ GLOBAL['REQUEST']['User_Identity'] }',
								'{ GLOBAL['REQUEST']['Employment_Company_Name'] }',
								'{ GLOBAL['REQUEST']['Employment_Business_Type'] }',
								'{ GLOBAL['REQUEST']['Employment_Business_Form'] }',
								'{ GLOBAL['REQUEST']['Employment_Business_Address'] }',
								'{ GLOBAL['REQUEST']['Employment_Employer_Firstname'] }',
								'{ GLOBAL['REQUEST']['Employment_Employer_Middlename'] }',
								'{ GLOBAL['REQUEST']['Employment_Employer_Lastname'] }',
								'{ GLOBAL['REQUEST']['Employment_Business_Contact_Number'] }',
								'{ GLOBAL['REQUEST']['Employment_Business_Contact_Number_Local'] }',
								'{ GLOBAL['REQUEST']['Employment_Tenure_Year'] }',
								'{ GLOBAL['REQUEST']['Employment_Appointment_Status'] }',
								'{ GLOBAL['REQUEST']['Employment_Position_Title'] }',
								'{ GLOBAL['REQUEST']['Employment_Position_Level'] }',
								'{ GLOBAL['REQUEST']['Employment_Pay_Period'] }',
								'{ GLOBAL['REQUEST']['Employment_Hired_DateTime'] }'
							)
						"""
		try:
			PyMySQL_Row_Count = GLOBAL['PyMySQL_Cursor'].execute(Query_Insert)
			GLOBAL['PyMySQL_Connection'].commit()

		except Exception as set_Exception:
			return str(set_Exception)

		if PyMySQL_Row_Count > 0:
			return True

		else:
			return False

	def Update_User_Personal_Employment():

		if GLOBAL['REQUEST']['Update_Action'] == 'Update : Specific':
			Query_Update = f"""
								UPDATE User_Personal_Employment

								SET

								Employment_Company_Name = '{ GLOBAL['REQUEST']['Employment_Company_Name'] }',
								Employment_Business_Type = '{ GLOBAL['REQUEST']['Employment_Business_Type'] }',
								Employment_Business_Form = '{ GLOBAL['REQUEST']['Employment_Business_Form'] }',
								Employment_Business_Address = '{ GLOBAL['REQUEST']['Employment_Business_Address'] }',
								Employment_Employer_Firstname = '{ GLOBAL['REQUEST']['Employment_Employer_Firstname'] }',
								Employment_Employer_Middlename = '{ GLOBAL['REQUEST']['Employment_Employer_Middlename'] }',
								Employment_Employer_Lastname = '{ GLOBAL['REQUEST']['Employment_Employer_Lastname'] }',
								Employment_Business_Contact_Number = '{ GLOBAL['REQUEST']['Employment_Business_Contact_Number'] }',
								Employment_Business_Contact_Number_Local = '{ GLOBAL['REQUEST']['Employment_Business_Contact_Number_Local'] }',
								Employment_Tenure_Year = '{ GLOBAL['REQUEST']['Employment_Tenure_Year'] }',
								Employment_Appointment_Status = '{ GLOBAL['REQUEST']['Employment_Appointment_Status'] }',
								Employment_Position_Title = '{ GLOBAL['REQUEST']['Employment_Position_Title'] }',
								Employment_Position_Level = '{ GLOBAL['REQUEST']['Employment_Position_Level'] }',
								Employment_Pay_Period = '{ GLOBAL['REQUEST']['Employment_Pay_Period'] }',
								Employment_Hired_DateTime = '{ GLOBAL['REQUEST']['Employment_Hired_DateTime'] }',

								WHERE User_Identity = '{ GLOBAL['REQUEST']['User_Identity'] }'
							"""

		try:
			PyMySQL_Row_Count = GLOBAL['PyMySQL_Cursor'].execute(Query_Update)
			GLOBAL['PyMySQL_Connection'].commit()

		except Exception as set_Exception:
			return str(set_Exception)

		if PyMySQL_Row_Count > 0:
			return True

		else:
			return False

	def Delete_User():

		Query_Delete = f"""
							DELETE FROM User_Confirmation;
							DELETE FROM User_Credential;
							DELETE FROM User_Personal;
							DELETE FROM User_Personal_Employment;
						"""

		try:
			PyMySQL_Row_Count = GLOBAL['PyMySQL_Cursor'].execute(Query_Delete)
			GLOBAL['PyMySQL_Connection'].commit()

		except Exception as set_Exception:
			return str(set_Exception)

		if PyMySQL_Row_Count > 0:
			return True

		else:
			return False


	def Select_User_Confirmation():

		if GLOBAL['REQUEST']['Select_Action'] == 'Select : Specific : { User_Identity, Confirmation_Code, Confirmation_Status }':
			Query_Select = f"""
							SELECT * FROM User_Confirmation

							WHERE
							User_Identity = '{ GLOBAL['REQUEST']['User_Identity'] }'
							AND
							Confirmation_Code = '{ GLOBAL['REQUEST']['Confirmation_Code'] }'
							"""

		PyMySQL_Row_Count = GLOBAL['PyMySQL_Cursor'].execute(Query_Select)

		PyMySQL_Data = GLOBAL['PyMySQL_Cursor'].fetchall()

		if PyMySQL_Row_Count > 0:
			return simplejson.dumps(PyMySQL_Data, indent = 4, sort_keys = True, default = str)

		else:
			return 'No Data'

	def Insert_User_Confirmation():

		Query_Insert = f"""
							INSERT INTO User_Confirmation
							(
								User_Identity,
								Confirmation_Identity,
								Confirmation_Code,
								Confirmation_Status,
								Confirmation_Inserted_DateTime
							)
							VALUES
							(
								'{ GLOBAL['REQUEST']['User_Identity'] }',
								'{ GLOBAL['REQUEST']['Confirmation_Identity'] }',
								'{ GLOBAL['REQUEST']['Confirmation_Code'] }',
								'{ GLOBAL['REQUEST']['Confirmation_Status'] }',
								'{ GLOBAL['REQUEST']['Confirmation_Inserted_DateTime'] }'
							)
						"""
		try:
			PyMySQL_Row_Count = GLOBAL['PyMySQL_Cursor'].execute(Query_Insert)
			GLOBAL['PyMySQL_Connection'].commit()

		except Exception as set_Exception:
			return str(set_Exception)

		if PyMySQL_Row_Count > 0:
			return True

		else:
			return False

	def Update_User_Confirmation():

		Query_Update = f"""
							UPDATE User_Confirmation
							SET
							Confirmation_Status = '{ GLOBAL['REQUEST']['Confirmation_Status'] }'
							WHERE
							Confirmation_Identity = '{ GLOBAL['REQUEST']['Confirmation_Identity'] }'
						"""

		try:
			PyMySQL_Row_Count = GLOBAL['PyMySQL_Cursor'].execute(Query_Update)
			GLOBAL['PyMySQL_Connection'].commit()

		except Exception as set_Exception:
			return str(set_Exception)

		if PyMySQL_Row_Count > 0:
			return True

		else:
			return False

	def Select_User_Personal_Gender():

		if GLOBAL['REQUEST']['Select_Action'] == 'Select : All':
			Query_Select = f"""
								SELECT * FROM User_Personal_Gender
							"""

		elif GLOBAL['REQUEST']['Select_Action'] == 'Select : Specific':
			Query_Select = f"""
								SELECT * FROM User_Personal_Gender
								WHERE
								Gender_Identity = '{ GLOBAL['REQUEST']['Gender_Identity'] }'
							"""

		PyMySQL_Row_Count = GLOBAL['PyMySQL_Cursor'].execute(Query_Select)

		PyMySQL_Data = GLOBAL['PyMySQL_Cursor'].fetchall()

		if PyMySQL_Row_Count > 0:
			return simplejson.dumps(PyMySQL_Data, indent = 4, sort_keys = True, default = str)

		else:
			return 'No Data'

	def Insert_User_Personal_Gender():

		Query_Insert = f"""
							INSERT INTO User_Personal_Gender
							(
								Gender_Identity,
								Gender_Name,
								Gender_Description
							)
							VALUES
							(
								'{ GLOBAL['REQUEST']['Gender_Identity'] }',
								'{ GLOBAL['REQUEST']['Gender_Name'] }',
								'{ GLOBAL['REQUEST']['Gender_Description'] }'
							)
						"""
		try:
			PyMySQL_Row_Count = GLOBAL['PyMySQL_Cursor'].execute(Query_Insert)
			GLOBAL['PyMySQL_Connection'].commit()

		except Exception as set_Exception:
			return str(set_Exception)

		if PyMySQL_Row_Count > 0:
			return True

		else:
			return False

	def Delete_User_Personal_Gender():

		Query_Delete = f"""
							DELETE FROM User_Personal_Gender
						"""

		try:
			PyMySQL_Row_Count = GLOBAL['PyMySQL_Cursor'].execute(Query_Delete)
			GLOBAL['PyMySQL_Connection'].commit()

		except Exception as set_Exception:
			return str(set_Exception)

		if PyMySQL_Row_Count > 0:
			return True

		else:
			return False

	def Select_User_Log():

		if GLOBAL['REQUEST']['Select_Action'] == 'Select : All':
			Query_Select = f"""
								SELECT * FROM User_Log
							"""

		elif GLOBAL['REQUEST']['Select_Action'] == 'Select : Specific':
			Query_Select = f"""
								SELECT * FROM User_Log
								WHERE
								Log_Identity = '{ GLOBAL['REQUEST']['Log_Identity'] }'
							"""

		elif GLOBAL['REQUEST']['Select_Action'] == 'Select : Specific : { User_Identity }':
			Query_Select = f"""
								SELECT * FROM User_Log
								WHERE
								User_Identity = '{ GLOBAL['REQUEST']['User_Identity'] }'
							"""

		PyMySQL_Row_Count = GLOBAL['PyMySQL_Cursor'].execute(Query_Select)

		PyMySQL_Data = GLOBAL['PyMySQL_Cursor'].fetchall()

		if PyMySQL_Row_Count > 0:
			return simplejson.dumps(PyMySQL_Data, indent = 4, sort_keys = True, default = str)

		else:
			return 'No Data'

	def Insert_User_Log():

		Query_Insert = f"""
							INSERT INTO User_Log
							(
								User_Identity,
								Log_Identity,
								Log_Name,
								Log_Type,
								Log_Information
							)
							VALUES
							(
								'{ GLOBAL['REQUEST']['User_Identity'] }',
								'{ GLOBAL['REQUEST']['Log_Identity'] }',
								'{ GLOBAL['REQUEST']['Log_Name'] }',
								'{ GLOBAL['REQUEST']['Log_Type'] }',
								'{ GLOBAL['REQUEST']['Log_Information'] }'
							)
						"""
		try:
			PyMySQL_Row_Count = GLOBAL['PyMySQL_Cursor'].execute(Query_Insert)
			GLOBAL['PyMySQL_Connection'].commit()

		except Exception as set_Exception:
			return str(set_Exception)

		if PyMySQL_Row_Count > 0:
			return True

		else:
			return False

	def Delete_User_Log():

		Query_Delete = f"""
							DELETE FROM User_Log
						"""

		try:
			PyMySQL_Row_Count = GLOBAL['PyMySQL_Cursor'].execute(Query_Delete)
			GLOBAL['PyMySQL_Connection'].commit()

		except Exception as set_Exception:
			return str(set_Exception)

		if PyMySQL_Row_Count > 0:
			return True

		else:
			return False