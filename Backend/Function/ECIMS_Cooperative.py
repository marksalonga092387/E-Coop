#! "F:/Python_3.8.3/python.exe"

from ECIMS_Main import *

class Cooperative:

	def Select_Cooperative():

		if GLOBAL['REQUEST']['Action'] == 'Select : Specific':
			Query_Select = f"""
							SELECT * FROM Cooperative INNER JOIN Cooperative_EconomicSurvey
							ON Cooperative.Cooperative_Identity = Cooperative_EconomicSurvey.Cooperative_Identity
							WHERE Cooperative_EconomicSurvey.Cooperative_Identity = '{ GLOBAL['REQUEST']['Cooperative_Identity'] }'
							"""

		PyMySQL_Row_Count = GLOBAL['PyMySQL_Cursor'].execute(Query_Select)

		PyMySQL_Data = GLOBAL['PyMySQL_Cursor'].fetchall()

		if PyMySQL_Row_Count > 0:
			return simplejson.dumps(PyMySQL_Data, indent = 4, sort_keys = True, default = str)

		else:
			return 'No Data'

	def Delete_Cooperative():

		if GLOBAL['REQUEST']['Action'] == 'Delete : All':
			Query_Delete =	f"""
								DELETE FROM Cooperative;
								DELETE FROM Cooperative_EconomicSurvey;
								DELETE FROM Cooperative_ShareCapital;
								DELETE FROM Cooperative_EconomicAspect;
								DELETE FROM Cooperative_FinancialAspect;
								DELETE FROM Cooperative_TechnicalAspect;
								DELETE FROM Cooperative_OrganizationalStructure;
								DELETE FROM Cooperative_OrganizationalStructure_Member;
								DELETE FROM Cooperative_OrganizationalStructure_Member_Position;
								DELETE FROM Cooperative_OrganizationalStructure_Member_Chart;
								DELETE FROM Cooperative_OrganizationalStructure_Committee;
								DELETE FROM Cooperative_OrganizationalStructure_Committee_Member;
							"""

		elif GLOBAL['REQUEST']['Action'] == 'Delete : Specific':
			Query_Delete =	f"""
								DELETE FROM Cooperative												WHERE Cooperative_Identity = '{ GLOBAL['REQUEST']['Cooperative_Identity'] }';
								DELETE FROM Cooperative_EconomicSurvey								WHERE Cooperative_Identity = '{ GLOBAL['REQUEST']['Cooperative_Identity'] }';
								DELETE FROM Cooperative_ShareCapital								WHERE Cooperative_Identity = '{ GLOBAL['REQUEST']['Cooperative_Identity'] }';
								DELETE FROM Cooperative_EconomicAspect								WHERE Cooperative_Identity = '{ GLOBAL['REQUEST']['Cooperative_Identity'] }';
								DELETE FROM Cooperative_FinancialAspect								WHERE Cooperative_Identity = '{ GLOBAL['REQUEST']['Cooperative_Identity'] }';
								DELETE FROM Cooperative_TechnicalAspect								WHERE Cooperative_Identity = '{ GLOBAL['REQUEST']['Cooperative_Identity'] }';
								DELETE FROM Cooperative_OrganizationalStructure 					WHERE Cooperative_Identity = '{ GLOBAL['REQUEST']['Cooperative_Identity'] }';
								DELETE FROM Cooperative_OrganizationalStructure_Member				WHERE Cooperative_Identity = '{ GLOBAL['REQUEST']['Cooperative_Identity'] }';
								DELETE FROM Cooperative_OrganizationalStructure_Member_Position		WHERE Cooperative_Identity = '{ GLOBAL['REQUEST']['Cooperative_Identity'] }';
								DELETE FROM Cooperative_OrganizationalStructure_Member_Chart		WHERE Cooperative_Identity = '{ GLOBAL['REQUEST']['Cooperative_Identity'] }';
								DELETE FROM Cooperative_OrganizationalStructure_Committee			WHERE Cooperative_Identity = '{ GLOBAL['REQUEST']['Cooperative_Identity'] }';
								DELETE FROM Cooperative_OrganizationalStructure_Committee_Member	WHERE Cooperative_Identity = '{ GLOBAL['REQUEST']['Cooperative_Identity'] }';
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
		return True

	def Insert_Cooperative_EconomicSurvey():

		get_Cooperative_Identity = 'COOP-' + str(Main.Select_Counter(GLOBAL['Cooperative_Counter_Code']))

		get_Cooperative_1 = json.loads(GLOBAL['REQUEST']['Cooperative_EconomicSurvey'])['Cooperative_1']
		get_Cooperative_2 = json.loads(GLOBAL['REQUEST']['Cooperative_EconomicSurvey'])['Cooperative_2']
		get_Cooperative_Name = get_Cooperative_1['Cooperative_Name']
		get_Cooperative_Type = get_Cooperative_2['Cooperative_Type']
		get_Cooperative_Category = get_Cooperative_2['Cooperative_Category']

		Query_Insert =	f"""
							INSERT INTO
							Cooperative_EconomicSurvey
							(
								Cooperative_Identity,
								EconomicSurvey_Description
							)
							VALUES
							(
								'{ get_Cooperative_Identity }',
								'{ GLOBAL['REQUEST']['Cooperative_EconomicSurvey'] }'
							);

							INSERT INTO Cooperative
							(
								Cooperative_Identity,
								Cooperative_Name,
								Cooperative_Type,
								Cooperative_Category
							)
							VALUES
							(
								'{ get_Cooperative_Identity }',
								'{ get_Cooperative_Name }',
								'{ get_Cooperative_Type }',
								'{ get_Cooperative_Category }'
							);
							INSERT INTO Cooperative_ShareCapital							(Cooperative_Identity) VALUES ('{ get_Cooperative_Identity }');
							INSERT INTO Cooperative_EconomicAspect							(Cooperative_Identity) VALUES ('{ get_Cooperative_Identity }');
							INSERT INTO Cooperative_FinancialAspect							(Cooperative_Identity) VALUES ('{ get_Cooperative_Identity }');
							INSERT INTO Cooperative_TechnicalAspect							(Cooperative_Identity) VALUES ('{ get_Cooperative_Identity }');
							INSERT INTO Cooperative_OrganizationalStructure					(Cooperative_Identity) VALUES ('{ get_Cooperative_Identity }');
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

	def Insert_Cooperative_Category():

		get_Category_Identity = 'COOP-CAT-' + str(Main.Select_Counter(GLOBAL['Cooperative_Category_Counter_Code']))

		Query_Insert = f"""
							INSERT INTO Cooperative_Category
							(
								Category_Identity,
								Category_Name,
								Category_Description
							)
							VALUES
							(
								'{ get_Category_Identity }',
								'{ GLOBAL['REQUEST']['Category_Name'] }',
								'{ GLOBAL['REQUEST']['Category_Description'] }'
							)
						"""
		try:
			PyMySQL_Row_Count = GLOBAL['PyMySQL_Cursor'].execute(Query_Insert)
			GLOBAL['PyMySQL_Connection'].commit()

		except Exception as set_Exception:
			return str(set_Exception)

		if PyMySQL_Row_Count > 0:
			Main.Update_Counter(GLOBAL['Cooperative_Category_Counter_Code'])
			return True

		else:
			return False

	def Delete_Cooperative_Category():

		Query_Delete = "DELETE FROM Cooperative_Category"

		try:
			PyMySQL_Row_Count = GLOBAL['PyMySQL_Cursor'].execute(Query_Delete)
			GLOBAL['PyMySQL_Connection'].commit()

		except Exception as set_Exception:
			return str(set_Exception)

		if PyMySQL_Row_Count > 0:
			return True

		else:
			return False

	def Insert_Cooperative_Type():

		get_Type_Identity = 'COOP-TYP-' + str(Main.Select_Counter(GLOBAL['Cooperative_Type_Counter_Code']))

		Query_Insert = f"""
							INSERT INTO Cooperative_Type
							(
								Type_Identity,
								Type_Name,
								Type_Description
							)
							VALUES
							(
								'{ get_Type_Identity }',
								'{ GLOBAL['REQUEST']['Type_Name'] }',
								'{ GLOBAL['REQUEST']['Type_Description'] }'
							)
						"""
		try:
			PyMySQL_Row_Count = GLOBAL['PyMySQL_Cursor'].execute(Query_Insert)
			GLOBAL['PyMySQL_Connection'].commit()

		except Exception as set_Exception:
			return str(set_Exception)

		if PyMySQL_Row_Count > 0:
			Main.Update_Counter(GLOBAL['Cooperative_Type_Counter_Code'])
			return True

		else:
			return False

	def Delete_Cooperative_Type():

		Query_Delete = "DELETE FROM Cooperative_Type"

		try:
			PyMySQL_Row_Count = GLOBAL['PyMySQL_Cursor'].execute(Query_Delete)
			GLOBAL['PyMySQL_Connection'].commit()

		except Exception as set_Exception:
			return str(set_Exception)

		if PyMySQL_Row_Count > 0:
			return True

		else:
			return False