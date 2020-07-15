#! "F:/Python_3.8.3/python.exe"
print("Content-Type: text/html\n")

import os, collections, json, simplejson, pymysql, smtplib, ssl, requests, web3, random
from datetime import datetime
from pymysql.constants import CLIENT
from http import cookies
from flask import Flask, request, jsonify
from wsgiref.handlers import CGIHandler
from email.message import EmailMessage
from email.header import Header
from email.mime.text import MIMEText
from email.utils import formataddr
from hashids import Hashids

GLOBAL	=	{
				'REQUEST'											:	{},
				'PyMySQL_Connection'								:	None,
				'PyMySQL_Cursor'									:	None,
				'Flask'												:	None,
				'User_Counter_Code'									:	'USR',
				'User_Log_Counter_Code'								:	'USR-LG',
				'User_Gender_Counter_Code'							:	'USR-GNDR',
				'User_Confirmation_Counter_Code'					:	'USR-CFMTN',
				'Cooperative_Counter_Code'							:	'COOP',
				'Cooperative_Category_Counter_Code'					:	'COOP-CAT',
				'Cooperative_Type_Counter_Code'						:	'COOP-TYP',
				'Philippines_Region_Counter_Code'					:	'PH-RGN',
				'Philippines_Region_Province_Counter_Code'			:	'PH-RGN-PROV',
				'Philippines_Region_Province_Locality_Counter_Code'	:	'PH-RGN-PROV-LOC',
			}

class Main(object):

	def set_PyMySQL_Connection():

		GLOBAL['PyMySQL_Connection'] = pymysql.connect('localhost', 'root', '', 'UB_ECIMS', cursorclass = pymysql.cursors.DictCursor, client_flag = CLIENT.MULTI_STATEMENTS)
		GLOBAL['PyMySQL_Cursor'] = GLOBAL['PyMySQL_Connection'].cursor(pymysql.cursors.DictCursor)

	def set_Flask():

		GLOBAL['Flask'] = Flask(__name__)
		GLOBAL['Flask'].config['DEBUG'] = True
		GLOBAL['Flask'].config['SERVER_NAME'] = 'localhost'

	def run_Flask(set_Method):

		GLOBAL['Flask'].route('/', methods = ['POST', 'GET'])(set_Method)
		CGIHandler().run(GLOBAL['Flask'])

	def Select_Counter(set_Code):

		PyMySQL_Query = "SELECT Counter_Count FROM Counter WHERE Counter_Code = '" + set_Code + "'"
		PyMySQL_Row_Count = GLOBAL['PyMySQL_Cursor'].execute(PyMySQL_Query)
		PyMySQL_Data = GLOBAL['PyMySQL_Cursor'].fetchall()

		if PyMySQL_Row_Count > 0:
			return PyMySQL_Data[0]['Counter_Count']

		else:
			return 'No Data'

	def Update_Counter(set_Code):

		PyMySQL_Query = "UPDATE Counter SET Counter_Count = Counter_Count + 1 WHERE Counter_Code = '" + set_Code + "'"
		GLOBAL['PyMySQL_Cursor'].execute(PyMySQL_Query)
		GLOBAL['PyMySQL_Connection'].commit()

	def reset_Counter(set_Code):

		PyMySQL_Query = "UPDATE Counter SET Counter_Count = 1 WHERE Counter_Code = '" + set_Code + "'"
		GLOBAL['PyMySQL_Cursor'].execute(PyMySQL_Query)
		GLOBAL['PyMySQL_Connection'].commit()

	def get_Dictionary_FromList(set_Data_1, set_Dictionary):

		for set_Data_2 in set_Dictionary:
			if set_Data_2.get(set_Data_1) != None:
				return set_Data_2
				break

	def Image_Save(set_File, set_Folder, set_File_Name):

		if set_File.filename.endswith('.jpeg') or set_File.filename.endswith('.jpg'):
			get_File_Extension = '.jpeg'

		elif set_File.filename.endswith('.png'):
			get_File_Extension = '.png'

		elif set_File.filename.endswith('.gif'):
			get_File_Extension = '.gif'

		else:
			return None

		set_File.save('/'.join([os.path.join(os.path.dirname(os.path.abspath('../')), 'Data/' + set_Folder + '/Image'), set_File_Name + get_File_Extension]))

		return 'Data/' + set_Folder + '/Image/' + set_File_Name + get_File_Extension

	def set_Email_Message(set_Sender, set_Receiver, set_Subject, set_Message):

		get_Domain_Name = 'smtp.gmail.com'
		#get_Credential = ['UB.ECIMS.2020.06.06@gmail.com', 'UB_ECIMS_2020-06-06']

		#get_Domain_Name = 'smtp.mail.yahoo.com'
		#get_Credential = ['UB.ECIMS.2020.06.06@yahoo.com', 'UB_ECIMS_2020-06-06']

		get_EmailMessage = EmailMessage()
		get_EmailMessage.set_content(set_Message)

		get_EmailMessage['Subject']	=	set_Subject
		get_EmailMessage['From']	=	formataddr((str(Header('<' +set_Sender + '@STI_MALABON.com>', 'utf-8')), get_Credential[0]))
		get_EmailMessage['To']		=	set_Receiver

		with smtplib.SMTP_SSL(get_Domain_Name) as set_SMTP:

			set_SMTP.ehlo()
			set_SMTP.login(get_Credential[0], get_Credential[1])
			set_SMTP.send_message(get_EmailMessage)
			set_SMTP.quit()

	def set_ShortMessageService_Message(set_Sender, set_Receiver, set_Subject, set_Message):

		get_Object = {}
		get_Object['mocean-api-key'] = 'eaa02dc4'
		get_Object['mocean-api-secret'] = '3359d27a'
		get_Object['mocean-from'] = set_Sender
		get_Object['mocean-to'] = set_Receiver
		get_Object['mocean-text'] = set_Sender + u"\u000A" + set_Subject + u"\u000A" + set_Message
		get_Object['mocean-udh'] = set_Sender
		get_Object['mocean-coding'] = 'UTF-8'
		get_Object['mocean-charset'] = 'UTF-8'
		get_Object['mocean-resp-format'] = 'JSON'

		get_Output = requests.post('https://rest.moceanapi.com/rest/2/sms', data = get_Object).text

		print(get_Output)

Main.set_PyMySQL_Connection()
Main.set_Flask()