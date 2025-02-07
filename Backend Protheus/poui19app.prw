#Include "Protheus.ch"

/*/{Protheus.doc} Pou19app
  Função para ser chamada no menu
  @type  Function
  @author Miquéias Dernier
  @since 05/02/2025
  @version version
  /*/
User Function Pou19app()
	FwCallApp('poui19-app')
Return

/*/{Protheus.doc} JsToAdvpl
  Função é chamada todas as vezes que uma mensagem é enviada ao advpl
  @type  Static Function
  @author Miquéias Dernier
  @since 06/02/2025
  @see https://tdn.totvs.com/display/public/framework/Protheus-lib-core
/*/
Static Function JsToAdvpl(oWebChannel,cType,cContent)
	Local oSend
	Conout('JsToAdvpl')
	Conout(cType)
	Conout(cContent)
	Do Case
	Case cType == 'canalUnico'
		oSend := CanalUnico(cContent)
		oWebChannel:AdvPLToJS(oSend['sendId'], oSend['content'])
	End Case

Return .T.


Static Function CanalUnico(cContent)
	Local oContent := JsonObject():new()
	Local oSend := JsonObject():new()

	oContent:FromJson(cContent)

	Do Case
	Case oContent['sendId'] == 'usuarioLogado'
		Conout('usuarioLogado')
		oSend['sendId'] := oContent['receiveId']
		oSend['content'] := Proc01(oContent['content'])
		return oSend
	End Case
Return

Static Function Proc01(cTipo)
	Conout('Proc01')
	Conout(cTipo)
	If (cTipo == 'nome')
		Return FwGetUserName(RetCodUsr())
	ElseIf (cTipo == 'email')
		Return UsrRetMail(RetCodUsr())
	EndIf

Return ''
