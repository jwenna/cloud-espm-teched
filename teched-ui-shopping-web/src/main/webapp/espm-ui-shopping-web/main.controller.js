sap.ui.controller("espm-ui-shopping-web.main", {

	onInit : function() {
	},

	openSettingsDialog : function() {
		var oSettingsView = sap.app.viewCache.get("settings");
		var oSettingsDialog = sap.ui.getCore().byId("settings-dialog-id");

		if (oSettingsDialog == null) {
			oSettingsDialog = new sap.ui.commons.Dialog({
				id : "settings-dialog-id",
				showCloseButton : true,
				resizable : true,
				title : "{i18n>SETTINGS_DIALOG_TITLE}",
				buttons : [ new sap.ui.commons.Button({
					id : "settings-ok-button-id",
					text : "{i18n>SETTINGS_OK_BUTTON}",
					press : oSettingsView.getController().okButtonClicked
				}), new sap.ui.commons.Button({
					id : "settings-cancel-button-id",
					text : "{i18n>SETTINGS_CANCEL_BUTTON}",
					press : oSettingsView.getController().cancelButtonClicked
				}) ],
				content : [ oSettingsView ],
			});
		}
		oSettingsView.getController().initializeSettingsDialog();
		oSettingsDialog.open();
	},

	openWelcomeDialog : function() {
		var showWelcomeDialog = sap.app.localStorage.getPreference(sap.app.localStorage.PREF_DISPLAY_WELCOME_DIALOG);
		if (showWelcomeDialog) {
			var welcomeDialog = new sap.account.WelcomeDialog(this);
			welcomeDialog.open();
		}
	},

});
