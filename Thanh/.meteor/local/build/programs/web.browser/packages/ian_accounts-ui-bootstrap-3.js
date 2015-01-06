//////////////////////////////////////////////////////////////////////////
//                                                                      //
// This is a generated file. You can view the original                  //
// source in your browser if your browser supports source maps.         //
//                                                                      //
// If you are using Chrome, open the Developer Tools and click the gear //
// icon in its lower right corner. In the General Settings panel, turn  //
// on 'Enable source maps'.                                             //
//                                                                      //
// If you are using Firefox 23, go to `about:config` and set the        //
// `devtools.debugger.source-maps-enabled` preference to true.          //
// (The preference should be on by default in Firefox 24; versions      //
// older than 23 do not support source maps.)                           //
//                                                                      //
//////////////////////////////////////////////////////////////////////////


(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var Session = Package.session.Session;
var Accounts = Package['accounts-base'].Accounts;
var _ = Package.underscore._;
var Template = Package.templating.Template;
var i18n = Package['anti:i18n'].i18n;
var Blaze = Package.blaze.Blaze;
var UI = Package.blaze.UI;
var Handlebars = Package.blaze.Handlebars;
var HTML = Package.htmljs.HTML;

/* Package-scope variables */
var accountsUIBootstrap3, $modal;

(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/ian:accounts-ui-bootstrap-3/accounts_ui.js                                                                 //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
if (!Accounts.ui)                                                                                                      // 1
	Accounts.ui = {};                                                                                                     // 2
                                                                                                                       // 3
if (!Accounts.ui._options) {                                                                                           // 4
	Accounts.ui._options = {                                                                                              // 5
		extraSignupFields: [],                                                                                               // 6
		requestPermissions: {},                                                                                              // 7
		requestOfflineToken: {},                                                                                             // 8
		forceApprovalPrompt: {}                                                                                              // 9
	};                                                                                                                    // 10
}                                                                                                                      // 11
                                                                                                                       // 12
Accounts.ui.navigate = function (route, hash) {                                                                        // 13
	// if router is iron-router                                                                                           // 14
	if(window.Router && _.isFunction(Router.go)) {                                                                        // 15
		Router.go(route, hash);                                                                                              // 16
	}                                                                                                                     // 17
}                                                                                                                      // 18
                                                                                                                       // 19
Accounts.ui.config = function(options) {                                                                               // 20
	// validate options keys                                                                                              // 21
	var VALID_KEYS = ['passwordSignupFields', 'requestPermissions', 'extraSignupFields', 'requestOfflineToken'];          // 22
	_.each(_.keys(options), function(key) {                                                                               // 23
		if (!_.contains(VALID_KEYS, key))                                                                                    // 24
			throw new Error("Accounts.ui.config: Invalid key: " + key);                                                         // 25
	});                                                                                                                   // 26
	                                                                                                                      // 27
	options.extraSignupFields = options.extraSignupFields || []                                                           // 28
	// deal with `passwordSignupFields`                                                                                   // 29
	if (options.passwordSignupFields) {                                                                                   // 30
		if (_.contains([                                                                                                     // 31
			"USERNAME_AND_EMAIL_CONFIRM",                                                                                       // 32
			"USERNAME_AND_EMAIL",                                                                                               // 33
			"USERNAME_AND_OPTIONAL_EMAIL",                                                                                      // 34
			"USERNAME_ONLY",                                                                                                    // 35
			"EMAIL_ONLY"                                                                                                        // 36
		], options.passwordSignupFields)) {                                                                                  // 37
			if (Accounts.ui._options.passwordSignupFields)                                                                      // 38
				throw new Error("Accounts.ui.config: Can't set `passwordSignupFields` more than once");                            // 39
			else                                                                                                                // 40
				Accounts.ui._options.passwordSignupFields = options.passwordSignupFields;                                          // 41
		} else {                                                                                                             // 42
			throw new Error("Accounts.ui.config: Invalid option for `passwordSignupFields`: " + options.passwordSignupFields);  // 43
		}                                                                                                                    // 44
	}                                                                                                                     // 45
                                                                                                                       // 46
	// deal with `requestPermissions`                                                                                     // 47
	if (options.requestPermissions) {                                                                                     // 48
		_.each(options.requestPermissions, function(scope, service) {                                                        // 49
			if (Accounts.ui._options.requestPermissions[service]) {                                                             // 50
				throw new Error("Accounts.ui.config: Can't set `requestPermissions` more than once for " + service);               // 51
			} else if (!(scope instanceof Array)) {                                                                             // 52
				throw new Error("Accounts.ui.config: Value for `requestPermissions` must be an array");                            // 53
			} else {                                                                                                            // 54
				Accounts.ui._options.requestPermissions[service] = scope;                                                          // 55
			}                                                                                                                   // 56
		});                                                                                                                  // 57
		if (typeof options.extraSignupFields !== 'object' || !options.extraSignupFields instanceof Array) {                  // 58
			throw new Error("Accounts.ui.config: `extraSignupFields` must be an array.");                                       // 59
		} else {                                                                                                             // 60
			if (options.extraSignupFields) {                                                                                    // 61
				_.each(options.extraSignupFields, function(field, index) {                                                         // 62
					if (!field.fieldName || !field.fieldLabel)                                                                        // 63
						throw new Error("Accounts.ui.config: `extraSignupFields` objects must have `fieldName` and `fieldLabel` attributes.");
					if (typeof field.visible === 'undefined')                                                                         // 65
						field.visible = true;                                                                                            // 66
					Accounts.ui._options.extraSignupFields[index] = field;                                                            // 67
				});                                                                                                                // 68
			}                                                                                                                   // 69
		}                                                                                                                    // 70
	}                                                                                                                     // 71
                                                                                                                       // 72
	                                                                                                                      // 73
	// deal with `requestOfflineToken`                                                                                    // 74
	if (options.requestOfflineToken) {                                                                                    // 75
		_.each(options.requestOfflineToken, function (value, service) {                                                      // 76
			if (service !== 'google')                                                                                           // 77
				throw new Error("Accounts.ui.config: `requestOfflineToken` only supported for Google login at the moment.");       // 78
                                                                                                                       // 79
			if (Accounts.ui._options.requestOfflineToken[service]) {                                                            // 80
				throw new Error("Accounts.ui.config: Can't set `requestOfflineToken` more than once for " + service);              // 81
			} else {                                                                                                            // 82
				Accounts.ui._options.requestOfflineToken[service] = value;                                                         // 83
			}                                                                                                                   // 84
		});                                                                                                                  // 85
	}                                                                                                                     // 86
                                                                                                                       // 87
	// deal with `forceApprovalPrompt`                                                                                    // 88
	if (options.forceApprovalPrompt) {                                                                                    // 89
		_.each(options.forceApprovalPrompt, function (value, service) {                                                      // 90
			if (service !== 'google')                                                                                           // 91
				throw new Error("Accounts.ui.config: `forceApprovalPrompt` only supported for Google login at the moment.");       // 92
                                                                                                                       // 93
			if (Accounts.ui._options.forceApprovalPrompt[service]) {                                                            // 94
				throw new Error("Accounts.ui.config: Can't set `forceApprovalPrompt` more than once for " + service);              // 95
			} else {                                                                                                            // 96
				Accounts.ui._options.forceApprovalPrompt[service] = value;                                                         // 97
			}                                                                                                                   // 98
		});                                                                                                                  // 99
	}                                                                                                                     // 100
};                                                                                                                     // 101
                                                                                                                       // 102
Accounts.ui._passwordSignupFields = function() {                                                                       // 103
	return Accounts.ui._options.passwordSignupFields || "EMAIL_ONLY";                                                     // 104
};                                                                                                                     // 105
                                                                                                                       // 106
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/ian:accounts-ui-bootstrap-3/i18n/en.i18n.js                                                                //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
i18n.map("en", {                                                                                                       // 1
	resetPasswordDialog: {                                                                                                // 2
		title: "Reset your password",                                                                                        // 3
		newPassword: "New password",                                                                                         // 4
		cancel: "Cancel",                                                                                                    // 5
		submit: "Set password"                                                                                               // 6
	},                                                                                                                    // 7
	enrollAccountDialog: {                                                                                                // 8
		title: "Choose a password",                                                                                          // 9
		newPassword: "New password",                                                                                         // 10
		cancel: "Close",                                                                                                     // 11
		submit: "Set password"                                                                                               // 12
	},                                                                                                                    // 13
	justVerifiedEmailDialog: {                                                                                            // 14
		verified: "Email address verified",                                                                                  // 15
		dismiss: "Dismiss"                                                                                                   // 16
	},                                                                                                                    // 17
	loginButtonsMessagesDialog: {                                                                                         // 18
		dismiss: "Dismiss",                                                                                                  // 19
	},                                                                                                                    // 20
	loginButtonsLoggedInDropdownActions: {                                                                                // 21
		password: "Change password",                                                                                         // 22
		signOut: "Sign out"                                                                                                  // 23
	},                                                                                                                    // 24
	loginButtonsLoggedOutDropdown: {                                                                                      // 25
		signIn: "Sign in",                                                                                                   // 26
		up: "up"                                                                                                             // 27
	},                                                                                                                    // 28
	loginButtonsLoggedOutPasswordServiceSeparator: {                                                                      // 29
		or: "or"                                                                                                             // 30
	},                                                                                                                    // 31
	loginButtonsLoggedOutPasswordService: {                                                                               // 32
		create: "Create",                                                                                                    // 33
		signIn: "Sign in",                                                                                                   // 34
		forgot: "Forgot password?",                                                                                          // 35
		createAcc: "Create account"                                                                                          // 36
	},                                                                                                                    // 37
	forgotPasswordForm: {                                                                                                 // 38
		email: "Email",                                                                                                      // 39
		reset: "Reset password",                                                                                             // 40
		sent: "Email sent",                                                                                                  // 41
		invalidEmail: "Invalid email"                                                                                        // 42
	},                                                                                                                    // 43
	loginButtonsBackToLoginLink: {                                                                                        // 44
		back: "Cancel"                                                                                                       // 45
	},                                                                                                                    // 46
	loginButtonsChangePassword: {                                                                                         // 47
		submit: "Change password",                                                                                           // 48
		cancel: "Cancel"                                                                                                     // 49
	},                                                                                                                    // 50
	loginButtonsLoggedOutSingleLoginButton: {                                                                             // 51
		signInWith: "Sign in with",                                                                                          // 52
		configure: "Configure",                                                                                              // 53
	},                                                                                                                    // 54
	loginButtonsLoggedInSingleLogoutButton: {                                                                             // 55
		signOut: "Sign out"                                                                                                  // 56
	},                                                                                                                    // 57
	loginButtonsLoggedOut: {                                                                                              // 58
		noLoginServices: "No login services configured"                                                                      // 59
	},                                                                                                                    // 60
	loginFields: {                                                                                                        // 61
		usernameOrEmail: "Username or Email",                                                                                // 62
		username: "Username",                                                                                                // 63
		email: "Email",                                                                                                      // 64
		password: "Password"                                                                                                 // 65
	},                                                                                                                    // 66
	signupFields: {                                                                                                       // 67
		username: "Username",                                                                                                // 68
		email: "Email",                                                                                                      // 69
		emailOpt: "Email (optional)",                                                                                        // 70
		password: "Password",                                                                                                // 71
		passwordAgain: "Password (again)"                                                                                    // 72
	},                                                                                                                    // 73
	changePasswordFields: {                                                                                               // 74
		currentPassword: "Current Password",                                                                                 // 75
		newPassword: "New Password",                                                                                         // 76
		newPasswordAgain: "New Password (again)"                                                                             // 77
	},                                                                                                                    // 78
	errorMessages: {                                                                                                      // 79
		usernameTooShort: "Username must be at least 3 characters long",                                                     // 80
		invalidEmail: "Invalid email",                                                                                       // 81
		passwordTooShort: "Password must be at least 6 characters long",                                                     // 82
		passwordsDontMatch: "Passwords don't match"                                                                          // 83
	}                                                                                                                     // 84
})                                                                                                                     // 85
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/ian:accounts-ui-bootstrap-3/i18n/es.i18n.js                                                                //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
i18n.map("es", {                                                                                                       // 1
	resetPasswordDialog: {                                                                                                // 2
		title: "Restablece tu contraseña",                                                                                   // 3
		newPassword: "Nueva contraseña",                                                                                     // 4
		cancel: "Cancelar",                                                                                                  // 5
		submit: "Guardar"                                                                                                    // 6
	},                                                                                                                    // 7
	enrollAccountDialog: {                                                                                                // 8
		title: "Escribe una contraseña",                                                                                     // 9
		newPassword: "Nueva contraseña",                                                                                     // 10
		cancel: "Cerrar",                                                                                                    // 11
		submit: "Guardar contraseña"                                                                                         // 12
	},                                                                                                                    // 13
	justVerifiedEmailDialog: {                                                                                            // 14
		verified: "Correo electrónico verificado",                                                                           // 15
		dismiss: "Cerrar"                                                                                                    // 16
	},                                                                                                                    // 17
	loginButtonsMessagesDialog: {                                                                                         // 18
		dismiss: "Cerrar",                                                                                                   // 19
	},                                                                                                                    // 20
	loginButtonsLoggedInDropdownActions: {                                                                                // 21
		password: "Cambiar contraseña",                                                                                      // 22
		signOut: "Cerrar sesión"                                                                                             // 23
	},                                                                                                                    // 24
	loginButtonsLoggedOutDropdown: {                                                                                      // 25
		signIn: "Iniciar sesión",                                                                                            // 26
		up: "registrarse"                                                                                                    // 27
	},                                                                                                                    // 28
	loginButtonsLoggedOutPasswordServiceSeparator: {                                                                      // 29
		or: "o"                                                                                                              // 30
	},                                                                                                                    // 31
	loginButtonsLoggedOutPasswordService: {                                                                               // 32
		create: "Crear",                                                                                                     // 33
		signIn: "Iniciar sesión",                                                                                            // 34
		forgot: "Ha olvidado su contraseña?",                                                                                // 35
		createAcc: "Registrarse"                                                                                             // 36
	},                                                                                                                    // 37
	forgotPasswordForm: {                                                                                                 // 38
		email: "Correo electrónico",                                                                                         // 39
		reset: "Restablecer contraseña",                                                                                     // 40
		sent: "Email enviado",                                                                                               // 41
		invalidEmail: "Correo electrónico inválido"                                                                          // 42
	},                                                                                                                    // 43
	loginButtonsBackToLoginLink: {                                                                                        // 44
		back: "Cancelar"                                                                                                     // 45
	},                                                                                                                    // 46
	loginButtonsChangePassword: {                                                                                         // 47
		submit: "Cambiar contraseña",                                                                                        // 48
		cancel: "Cancelar"                                                                                                   // 49
	},                                                                                                                    // 50
	loginButtonsLoggedOutSingleLoginButton: {                                                                             // 51
		signInWith: "Inicia sesión con",                                                                                     // 52
		configure: "Configurar",                                                                                             // 53
	},                                                                                                                    // 54
	loginButtonsLoggedInSingleLogoutButton: {                                                                             // 55
		signOut: "Cerrar sesión"                                                                                             // 56
	},                                                                                                                    // 57
	loginButtonsLoggedOut: {                                                                                              // 58
		noLoginServices: "No hay ningún servicio configurado"                                                                // 59
	},                                                                                                                    // 60
	loginFields: {                                                                                                        // 61
		usernameOrEmail: "Usuario o contraseña",                                                                             // 62
		username: "Usuario",                                                                                                 // 63
		email: "Correo electrónico",                                                                                         // 64
		password: "Contraseña"                                                                                               // 65
	},                                                                                                                    // 66
	signupFields: {                                                                                                       // 67
		username: "Usuario",                                                                                                 // 68
		email: "Correo electrónico",                                                                                         // 69
		emailOpt: "Correo elect. (opcional)",                                                                                // 70
		password: "Contraseña",                                                                                              // 71
		passwordAgain: "Contraseña (otra vez)"                                                                               // 72
	},                                                                                                                    // 73
	changePasswordFields: {                                                                                               // 74
		currentPassword: "Contraseña Actual",                                                                                // 75
		newPassword: "Nueva Contraseña",                                                                                     // 76
		newPasswordAgain: "Nueva Contraseña (otra vez)"                                                                      // 77
	},                                                                                                                    // 78
	errorMessages: {                                                                                                      // 79
		usernameTooShort: "El nombre de usuario tiene que tener 3 caracteres como mínimo",                                   // 80
		invalidEmail: "Correo electrónico inválido",                                                                         // 81
		passwordTooShort: "La contraseña tiene que tener 3 caracteres como mínimo",                                          // 82
		passwordsDontMatch: "Las contraseñas no son iguales"                                                                 // 83
	}                                                                                                                     // 84
})                                                                                                                     // 85
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/ian:accounts-ui-bootstrap-3/i18n/ca.i18n.js                                                                //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
i18n.map("ca", {                                                                                                       // 1
	resetPasswordDialog: {                                                                                                // 2
		title: "Restablir la contrasenya",                                                                                   // 3
		newPassword: "Nova contrasenya",                                                                                     // 4
		cancel: "Cancel·lar",                                                                                                // 5
		submit: "Guardar"                                                                                                    // 6
	},                                                                                                                    // 7
	enrollAccountDialog: {                                                                                                // 8
		title: "Escriu una contrasenya",                                                                                     // 9
		newPassword: "Nova contrasenya",                                                                                     // 10
		cancel: "Tancar",                                                                                                    // 11
		submit: "Guardar contrasenya"                                                                                        // 12
	},                                                                                                                    // 13
	justVerifiedEmailDialog: {                                                                                            // 14
		verified: "Adreça electrònica verificada",                                                                           // 15
		dismiss: "Tancar"                                                                                                    // 16
	},                                                                                                                    // 17
	loginButtonsMessagesDialog: {                                                                                         // 18
		dismiss: "Tancar",                                                                                                   // 19
	},                                                                                                                    // 20
	loginButtonsLoggedInDropdownActions: {                                                                                // 21
		password: "Canviar contrasenya",                                                                                     // 22
		signOut: "Tancar sessió"                                                                                             // 23
	},                                                                                                                    // 24
	loginButtonsLoggedOutDropdown: {                                                                                      // 25
		signIn: "Iniciar sessió",                                                                                            // 26
		up: "Registrar-se"                                                                                                   // 27
	},                                                                                                                    // 28
	loginButtonsLoggedOutPasswordServiceSeparator: {                                                                      // 29
		or: "o bé"                                                                                                           // 30
	},                                                                                                                    // 31
	loginButtonsLoggedOutPasswordService: {                                                                               // 32
		create: "Crear",                                                                                                     // 33
		signIn: "Iniciar sessió",                                                                                            // 34
		forgot: "Ha oblidat la contrasenya?",                                                                                // 35
		createAcc: "Registrar-se"                                                                                            // 36
	},                                                                                                                    // 37
	forgotPasswordForm: {                                                                                                 // 38
		email: "Adreça electrònica",                                                                                         // 39
		reset: "Restablir contrasenya",                                                                                      // 40
		sent: "Email enviat",                                                                                                // 41
		invalidEmail: "Adreça invàlida"                                                                                      // 42
	},                                                                                                                    // 43
	loginButtonsBackToLoginLink: {                                                                                        // 44
		back: "Cancel·lar"                                                                                                   // 45
	},                                                                                                                    // 46
	loginButtonsChangePassword: {                                                                                         // 47
		submit: "Canviar contrasenya",                                                                                       // 48
		cancel: "Cancel·lar"                                                                                                 // 49
	},                                                                                                                    // 50
	loginButtonsLoggedOutSingleLoginButton: {                                                                             // 51
		signInWith: "Inicia sessió amb",                                                                                     // 52
		configure: "Configurar"                                                                                              // 53
	},                                                                                                                    // 54
	loginButtonsLoggedInSingleLogoutButton: {                                                                             // 55
		signOut: "Tancar sessió"                                                                                             // 56
	},                                                                                                                    // 57
	loginButtonsLoggedOut: {                                                                                              // 58
		noLoginServices: "No hi ha cap servei configurat"                                                                    // 59
	},                                                                                                                    // 60
	loginFields: {                                                                                                        // 61
		usernameOrEmail: "Usuari o contrasenya",                                                                             // 62
		username: "Usuari",                                                                                                  // 63
		email: "Adreça electrònica",                                                                                         // 64
		password: "Contrasenya"                                                                                              // 65
	},                                                                                                                    // 66
	signupFields: {                                                                                                       // 67
		username: "Usuari",                                                                                                  // 68
		email: "Adreça electrònica",                                                                                         // 69
		emailOpt: "Adreça elect. (opcional)",                                                                                // 70
		password: "Contrasenya",                                                                                             // 71
		passwordAgain: "Contrasenya (un altre cop)"                                                                          // 72
	},                                                                                                                    // 73
	changePasswordFields: {                                                                                               // 74
		currentPassword: "Contrasenya Actual",                                                                               // 75
		newPassword: "Nova Contrasenya",                                                                                     // 76
		newPasswordAgain: "Nova Contrasenya (un altre cop)"                                                                  // 77
	},                                                                                                                    // 78
	errorMessages: {                                                                                                      // 79
		usernameTooShort: "El nom d'usuari ha de tenir 3 caracters com a mínim",                                             // 80
		invalidEmail: "Adreça invàlida",                                                                                     // 81
		passwordTooShort: "La contrasenya ha de tenir 3 caracters como a mínim",                                             // 82
		passwordsDontMatch: "Les contrasenyes no són iguals"                                                                 // 83
	}                                                                                                                     // 84
})                                                                                                                     // 85
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/ian:accounts-ui-bootstrap-3/i18n/fr.i18n.js                                                                //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
i18n.map("fr", {                                                                                                       // 1
	resetPasswordDialog: {                                                                                                // 2
		title: "Réinitialiser mon mot de passe",                                                                             // 3
		newPassword: "Nouveau mot de passe",                                                                                 // 4
		cancel: "Annuler",                                                                                                   // 5
		submit: "Définir le mot de passe"                                                                                    // 6
	},                                                                                                                    // 7
	enrollAccountDialog: {                                                                                                // 8
		title: "Choisir un mot de passe",                                                                                    // 9
		newPassword: "Nouveau mot de passe",                                                                                 // 10
		cancel: "Fermer",                                                                                                    // 11
		submit: "Définir le mot de passe"                                                                                    // 12
	},                                                                                                                    // 13
	justVerifiedEmailDialog: {                                                                                            // 14
		verified: "L'adresse email a été vérifiée",                                                                          // 15
		dismiss: "Fermer"                                                                                                    // 16
	},                                                                                                                    // 17
	loginButtonsMessagesDialog: {                                                                                         // 18
		dismiss: "Fermer",                                                                                                   // 19
	},                                                                                                                    // 20
	loginButtonsLoggedInDropdownActions: {                                                                                // 21
		password: "Changer le mot de passe",                                                                                 // 22
		signOut: "Déconnexion"                                                                                               // 23
	},                                                                                                                    // 24
	loginButtonsLoggedOutDropdown: {                                                                                      // 25
		signIn: "Connexion",                                                                                                 // 26
		up: "Inscription"                                                                                                    // 27
	},                                                                                                                    // 28
	loginButtonsLoggedOutPasswordServiceSeparator: {                                                                      // 29
		or: "ou"                                                                                                             // 30
	},                                                                                                                    // 31
	loginButtonsLoggedOutPasswordService: {                                                                               // 32
		create: "Créer",                                                                                                     // 33
		signIn: "Connexion",                                                                                                 // 34
		forgot: "Mot de passe oublié ?",                                                                                     // 35
		createAcc: "Inscription"                                                                                             // 36
	},                                                                                                                    // 37
	forgotPasswordForm: {                                                                                                 // 38
		email: "Email",                                                                                                      // 39
		reset: "Réinitialiser le mot de passe",                                                                              // 40
		sent: "Email envoyé",                                                                                                // 41
		invalidEmail: "L'adresse email est invalide"                                                                         // 42
	},                                                                                                                    // 43
	loginButtonsBackToLoginLink: {                                                                                        // 44
		back: "Annuler"                                                                                                      // 45
	},                                                                                                                    // 46
	loginButtonsChangePassword: {                                                                                         // 47
		submit: "Changer le mot de passe",                                                                                   // 48
		cancel: "Annuler"                                                                                                    // 49
	},                                                                                                                    // 50
	loginButtonsLoggedOutSingleLoginButton: {                                                                             // 51
		signInWith: "Se connecter avec",                                                                                     // 52
		configure: "Configurer",                                                                                             // 53
	},                                                                                                                    // 54
	loginButtonsLoggedInSingleLogoutButton: {                                                                             // 55
		signOut: "Déconnexion"                                                                                               // 56
	},                                                                                                                    // 57
	loginButtonsLoggedOut: {                                                                                              // 58
		noLoginServices: "Aucun service d'authentification n'est configuré"                                                  // 59
	},                                                                                                                    // 60
	loginFields: {                                                                                                        // 61
		usernameOrEmail: "Nom d'utilisateur ou email",                                                                       // 62
		username: "Nom d'utilisateur",                                                                                       // 63
		email: "Email",                                                                                                      // 64
		password: "Mot de passe"                                                                                             // 65
	},                                                                                                                    // 66
	signupFields: {                                                                                                       // 67
		username: "Nom d'utilisateur",                                                                                       // 68
		email: "Email",                                                                                                      // 69
		emailOpt: "Email (optionnel)",                                                                                       // 70
		password: "Mot de passe",                                                                                            // 71
		passwordAgain: "Mot de passe (confirmation)"                                                                         // 72
	},                                                                                                                    // 73
	changePasswordFields: {                                                                                               // 74
		currentPassword: "Mot de passe actuel",                                                                              // 75
		newPassword: "Nouveau mot de passe",                                                                                 // 76
		newPasswordAgain: "Nouveau mot de passe (confirmation)"                                                              // 77
	},                                                                                                                    // 78
	errorMessages: {                                                                                                      // 79
		usernameTooShort: "Le nom d'utilisateur doit comporter au moins 3 caractères",                                       // 80
		invalidEmail: "L'adresse email est invalide",                                                                        // 81
		passwordTooShort: "Le mot de passe doit comporter au moins 6 caractères",                                            // 82
		passwordsDontMatch: "Les mots de passe ne sont pas identiques"                                                       // 83
	}                                                                                                                     // 84
})                                                                                                                     // 85
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/ian:accounts-ui-bootstrap-3/i18n/de.i18n.js                                                                //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
i18n.map("de", {                                                                                                       // 1
	resetPasswordDialog: {                                                                                                // 2
		title: "Passwort zurücksetzen",                                                                                      // 3
		newPassword: "Neues Passwort",                                                                                       // 4
		cancel: "Abbrechen",                                                                                                 // 5
		submit: "Passwort ändern"                                                                                            // 6
	},                                                                                                                    // 7
	enrollAccountDialog: {                                                                                                // 8
		title: "Passwort wählen",                                                                                            // 9
		newPassword: "Neues Passwort",                                                                                       // 10
		cancel: "Schließen",                                                                                                 // 11
		submit: "Passwort ändern"                                                                                            // 12
	},                                                                                                                    // 13
	justVerifiedEmailDialog: {                                                                                            // 14
		verified: "Email Adresse verifizieren",                                                                              // 15
		dismiss: "Schließen"                                                                                                 // 16
	},                                                                                                                    // 17
	loginButtonsMessagesDialog: {                                                                                         // 18
		dismiss: "Schließen"                                                                                                 // 19
	},                                                                                                                    // 20
	loginButtonsLoggedInDropdownActions: {                                                                                // 21
		password: "Passwort ändern",                                                                                         // 22
		signOut: "Abmelden"                                                                                                  // 23
	},                                                                                                                    // 24
	loginButtonsLoggedOutDropdown: {                                                                                      // 25
		signIn: "Anmelden",                                                                                                  // 26
		up: "Registrieren"                                                                                                   // 27
	},                                                                                                                    // 28
	loginButtonsLoggedOutPasswordServiceSeparator: {                                                                      // 29
		or: "oder"                                                                                                           // 30
	},                                                                                                                    // 31
	loginButtonsLoggedOutPasswordService: {                                                                               // 32
		create: "Erstellen",                                                                                                 // 33
		signIn: "Anmelden",                                                                                                  // 34
		forgot: "Passwort vergessen?",                                                                                       // 35
		createAcc: "Account erstellen"                                                                                       // 36
	},                                                                                                                    // 37
	forgotPasswordForm: {                                                                                                 // 38
		email: "Email",                                                                                                      // 39
		reset: "Passwort zurücksetzen",                                                                                      // 40
		sent: "Email gesendet",                                                                                              // 41
		invalidEmail: "Ungültige Email Adresse"                                                                              // 42
	},                                                                                                                    // 43
	loginButtonsBackToLoginLink: {                                                                                        // 44
		back: "Abbrechen"                                                                                                    // 45
	},                                                                                                                    // 46
	loginButtonsChangePassword: {                                                                                         // 47
		submit: "Passwort ändern",                                                                                           // 48
		cancel: "Abbrechen"                                                                                                  // 49
	},                                                                                                                    // 50
	loginButtonsLoggedOutSingleLoginButton: {                                                                             // 51
		signInWith: "Anmelden mit",                                                                                          // 52
		configure: "Konfigurieren",                                                                                          // 53
	},                                                                                                                    // 54
	loginButtonsLoggedInSingleLogoutButton: {                                                                             // 55
		signOut: "Abmelden"                                                                                                  // 56
	},                                                                                                                    // 57
	loginButtonsLoggedOut: {                                                                                              // 58
		noLoginServices: "Keine Anmelde Services konfiguriert"                                                               // 59
	},                                                                                                                    // 60
	loginFields: {                                                                                                        // 61
		usernameOrEmail: "Benutzername oder Email",                                                                          // 62
		username: "Benutzername",                                                                                            // 63
		email: "Email",                                                                                                      // 64
		password: "Passwort"                                                                                                 // 65
	},                                                                                                                    // 66
	signupFields: {                                                                                                       // 67
		username: "Benutzername",                                                                                            // 68
		email: "Email",                                                                                                      // 69
		emailOpt: "Email (freiwillig)",                                                                                      // 70
		password: "Passwort",                                                                                                // 71
		passwordAgain: "Passwort (wiederholen)"                                                                              // 72
	},                                                                                                                    // 73
	changePasswordFields: {                                                                                               // 74
		currentPassword: "Aktuelles Passwort",                                                                               // 75
		newPassword: "Neues Passwort",                                                                                       // 76
		newPasswordAgain: "Neues Passwort (wiederholen)"                                                                     // 77
	},                                                                                                                    // 78
	errorMessages: {                                                                                                      // 79
		usernameTooShort: "Der Benutzername muss mindestens 3 Buchstaben lang sein",                                         // 80
		invalidEmail: "Ungültige Email Adresse",                                                                             // 81
		passwordTooShort: "Passwort muss mindestens 6 Zeichen lang sein",                                                    // 82
		passwordsDontMatch: "Die Passwörter stimmen nicht überein"                                                           // 83
	}                                                                                                                     // 84
})                                                                                                                     // 85
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/ian:accounts-ui-bootstrap-3/i18n/it.i18n.js                                                                //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
i18n.map("it", {                                                                                                       // 1
	resetPasswordDialog: {                                                                                                // 2
		title: "Reimposta la password",                                                                                      // 3
		newPassword: "Nuova password",                                                                                       // 4
		cancel: "Annulla",                                                                                                   // 5
		submit: "Imposta password"                                                                                           // 6
	},                                                                                                                    // 7
	enrollAccountDialog: {                                                                                                // 8
		title: "Scegli una password",                                                                                        // 9
		newPassword: "Nuova password",                                                                                       // 10
		cancel: "Chiudi",                                                                                                    // 11
		submit: "Imposta password"                                                                                           // 12
	},                                                                                                                    // 13
	justVerifiedEmailDialog: {                                                                                            // 14
		verified: "Indirizzo email verificato",                                                                              // 15
		dismiss: "Chiudi"                                                                                                    // 16
	},                                                                                                                    // 17
	loginButtonsMessagesDialog: {                                                                                         // 18
		dismiss: "Chiudi",                                                                                                   // 19
	},                                                                                                                    // 20
	loginButtonsLoggedInDropdownActions: {                                                                                // 21
		password: "Cambia password",                                                                                         // 22
		signOut: "Esci"                                                                                                      // 23
	},                                                                                                                    // 24
	loginButtonsLoggedOutDropdown: {                                                                                      // 25
		signIn: "Accedi",                                                                                                    // 26
		up: "Registrati"                                                                                                     // 27
	},                                                                                                                    // 28
	loginButtonsLoggedOutPasswordServiceSeparator: {                                                                      // 29
		or: "o"                                                                                                              // 30
	},                                                                                                                    // 31
	loginButtonsLoggedOutPasswordService: {                                                                               // 32
		create: "Crea",                                                                                                      // 33
		signIn: "Accedi",                                                                                                    // 34
		forgot: "Password dimenticata?",                                                                                     // 35
		createAcc: "Crea un account"                                                                                         // 36
	},                                                                                                                    // 37
	forgotPasswordForm: {                                                                                                 // 38
		email: "Email",                                                                                                      // 39
		reset: "Reimposta la password",                                                                                      // 40
		sent: "Email inviata",                                                                                               // 41
		invalidEmail: "Email non valida"                                                                                     // 42
	},                                                                                                                    // 43
	loginButtonsBackToLoginLink: {                                                                                        // 44
		back: "Cancella"                                                                                                     // 45
	},                                                                                                                    // 46
	loginButtonsChangePassword: {                                                                                         // 47
		submit: "Cambia password",                                                                                           // 48
		cancel: "Annulla"                                                                                                    // 49
	},                                                                                                                    // 50
	loginButtonsLoggedOutSingleLoginButton: {                                                                             // 51
		signInWith: "Accedi con",                                                                                            // 52
		configure: "Configura",                                                                                              // 53
	},                                                                                                                    // 54
	loginButtonsLoggedInSingleLogoutButton: {                                                                             // 55
		signOut: "Esci"                                                                                                      // 56
	},                                                                                                                    // 57
	loginButtonsLoggedOut: {                                                                                              // 58
		noLoginServices: "Nessun servizio di accesso configurato"                                                            // 59
	},                                                                                                                    // 60
	loginFields: {                                                                                                        // 61
		usernameOrEmail: "Username o Email",                                                                                 // 62
		username: "Username",                                                                                                // 63
		email: "Email",                                                                                                      // 64
		password: "Password"                                                                                                 // 65
	},                                                                                                                    // 66
	signupFields: {                                                                                                       // 67
		username: "Username",                                                                                                // 68
		email: "Email",                                                                                                      // 69
		emailOpt: "Email (opzionale)",                                                                                       // 70
		password: "Password",                                                                                                // 71
		passwordAgain: "Password (di nuovo)"                                                                                 // 72
	},                                                                                                                    // 73
	changePasswordFields: {                                                                                               // 74
		currentPassword: "Password corrente",                                                                                // 75
		newPassword: "Nuova password",                                                                                       // 76
		newPasswordAgain: "Nuova password (di nuovo)"                                                                        // 77
	},                                                                                                                    // 78
	errorMessages: {                                                                                                      // 79
		usernameTooShort: "La Username deve essere almeno di 3 caratteri",                                                   // 80
		invalidEmail: "Email non valida",                                                                                    // 81
		passwordTooShort: "La Password deve essere almeno di 6 caratteri",                                                   // 82
		passwordsDontMatch: "Le password non corrispondono"                                                                  // 83
	}                                                                                                                     // 84
});                                                                                                                    // 85
                                                                                                                       // 86
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/ian:accounts-ui-bootstrap-3/i18n/pt.i18n.js                                                                //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
i18n.map("pt", {                                                                                                       // 1
	resetPasswordDialog: {                                                                                                // 2
		title: "Esqueceu sua senha?",                                                                                        // 3
		newPassword: "Nova senha",                                                                                           // 4
		cancel: "Cancelar",                                                                                                  // 5
		submit: "Alterar senha"                                                                                              // 6
	},                                                                                                                    // 7
	enrollAccountDialog: {                                                                                                // 8
		title: "Digite a nova senha",                                                                                        // 9
		newPassword: "Nova senha",                                                                                           // 10
		cancel: "Fechar",                                                                                                    // 11
		submit: "Alterar senha"                                                                                              // 12
	},                                                                                                                    // 13
	justVerifiedEmailDialog: {                                                                                            // 14
		verified: "E-mail verificado!",                                                                                      // 15
		dismiss: "Ignorar"                                                                                                   // 16
	},                                                                                                                    // 17
	loginButtonsMessagesDialog: {                                                                                         // 18
		dismiss: "Ignorar",                                                                                                  // 19
	},                                                                                                                    // 20
	loginButtonsLoggedInDropdownActions: {                                                                                // 21
		password: "Mudar senha",                                                                                             // 22
		signOut: "Sair"                                                                                                      // 23
	},                                                                                                                    // 24
	loginButtonsLoggedOutDropdown: {                                                                                      // 25
		signIn: "Entrar",                                                                                                    // 26
		up: "Cadastrar"                                                                                                      // 27
	},                                                                                                                    // 28
	loginButtonsLoggedOutPasswordServiceSeparator: {                                                                      // 29
		or: "ou"                                                                                                             // 30
	},                                                                                                                    // 31
	loginButtonsLoggedOutPasswordService: {                                                                               // 32
		create: "Criar",                                                                                                     // 33
		signIn: "Login",                                                                                                     // 34
		forgot: "Esqueceu sua senha?",                                                                                       // 35
		createAcc: "Cadastrar"                                                                                               // 36
	},                                                                                                                    // 37
	forgotPasswordForm: {                                                                                                 // 38
		email: "E-mail",                                                                                                     // 39
		reset: "Alterar senha",                                                                                              // 40
		sent: "E-mail enviado",                                                                                              // 41
		invalidEmail: "E-mail inválido"                                                                                      // 42
	},                                                                                                                    // 43
	loginButtonsBackToLoginLink: {                                                                                        // 44
		back: "Cancelar"                                                                                                     // 45
	},                                                                                                                    // 46
	loginButtonsChangePassword: {                                                                                         // 47
		submit: "Mudar senha",                                                                                               // 48
		cancel: "Cancelar"                                                                                                   // 49
	},                                                                                                                    // 50
	loginButtonsLoggedOutSingleLoginButton: {                                                                             // 51
		signInWith: "Logar com",                                                                                             // 52
		configure: "Configurar",                                                                                             // 53
	},                                                                                                                    // 54
	loginButtonsLoggedInSingleLogoutButton: {                                                                             // 55
		signOut: "Sair"                                                                                                      // 56
	},                                                                                                                    // 57
	loginButtonsLoggedOut: {                                                                                              // 58
		noLoginServices: "Nenhum servico de login configurado"                                                               // 59
	},                                                                                                                    // 60
	loginFields: {                                                                                                        // 61
		usernameOrEmail: "Usuário ou E-mail",                                                                                // 62
		username: "Usuário",                                                                                                 // 63
		email: "E-mail",                                                                                                     // 64
		password: "Senha"                                                                                                    // 65
	},                                                                                                                    // 66
	signupFields: {                                                                                                       // 67
		username: "Usuário",                                                                                                 // 68
		email: "E-mail",                                                                                                     // 69
		emailOpt: "E-mail (opcional)",                                                                                       // 70
		password: "Senha",                                                                                                   // 71
		passwordAgain: "Senha (confirmacão)"                                                                                 // 72
	},                                                                                                                    // 73
	changePasswordFields: {                                                                                               // 74
		currentPassword: "Senah atual",                                                                                      // 75
		newPassword: "Nova Senha",                                                                                           // 76
		newPasswordAgain: "Nova Senha (confirmacao)"                                                                         // 77
	},                                                                                                                    // 78
	errorMessages: {                                                                                                      // 79
		usernameTooShort: "Usuário precisa ter mais de 3 caracteres",                                                        // 80
		invalidEmail: "E-mail inválido",                                                                                     // 81
		passwordTooShort: "Senha precisa ter mais de 6 caracteres",                                                          // 82
		passwordsDontMatch: "Senhas estão diferentes"                                                                        // 83
	}                                                                                                                     // 84
})                                                                                                                     // 85
                                                                                                                       // 86
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/ian:accounts-ui-bootstrap-3/i18n/ru.i18n.js                                                                //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
i18n.map("ru", {                                                                                                       // 1
	resetPasswordDialog: {                                                                                                // 2
		title: "Сбросить пароль",                                                                                            // 3
		newPassword: "Новый пароль",                                                                                         // 4
		cancel: "Отмена",                                                                                                    // 5
		submit: "Сохранить пароль"                                                                                           // 6
	},                                                                                                                    // 7
	enrollAccountDialog: {                                                                                                // 8
		title: "Выбрать пароль",                                                                                             // 9
		newPassword: "Новый пароль",                                                                                         // 10
		cancel: "Отмена",                                                                                                    // 11
		submit: "Сохранить пароль"                                                                                           // 12
	},                                                                                                                    // 13
	justVerifiedEmailDialog: {                                                                                            // 14
		verified: "Email подтвержден",                                                                                       // 15
	    dismiss: "Закрыть"                                                                                                // 16
	},                                                                                                                    // 17
	loginButtonsMessagesDialog: {                                                                                         // 18
	    dismiss: "Закрыть"                                                                                                // 19
	},                                                                                                                    // 20
	loginButtonsLoggedInDropdownActions: {                                                                                // 21
		password: "Изменить пароль",                                                                                         // 22
		signOut: "Выйти"                                                                                                     // 23
	},                                                                                                                    // 24
	loginButtonsLoggedOutDropdown: {                                                                                      // 25
		signIn: "Войти",                                                                                                     // 26
		up: "Зарегистриоваться"                                                                                              // 27
	},                                                                                                                    // 28
	loginButtonsLoggedOutPasswordServiceSeparator: {                                                                      // 29
		or: "или"                                                                                                            // 30
	},                                                                                                                    // 31
	loginButtonsLoggedOutPasswordService: {                                                                               // 32
		create: "Создать",                                                                                                   // 33
		signIn: "Войти",                                                                                                     // 34
		forgot: "Забыли пароль?",                                                                                            // 35
		createAcc: "Создать аккаунт"                                                                                         // 36
	},                                                                                                                    // 37
	forgotPasswordForm: {                                                                                                 // 38
		email: "Email",                                                                                                      // 39
		reset: "Сбросить пароль",                                                                                            // 40
		sent: "Вам отправлено письмо",                                                                                       // 41
		invalidEmail: "Некорректный email"                                                                                   // 42
	},                                                                                                                    // 43
	loginButtonsBackToLoginLink: {                                                                                        // 44
		back: "Отмена"                                                                                                       // 45
	},                                                                                                                    // 46
	loginButtonsChangePassword: {                                                                                         // 47
		submit: "Изменить пароль",                                                                                           // 48
		cancel: "Отмена"                                                                                                     // 49
	},                                                                                                                    // 50
	loginButtonsLoggedOutSingleLoginButton: {                                                                             // 51
		signInWith: "Войти через",                                                                                           // 52
		configure: "Настроить вход через",                                                                                   // 53
	},                                                                                                                    // 54
	loginButtonsLoggedInSingleLogoutButton: {                                                                             // 55
		signOut: "Выйти"                                                                                                     // 56
	},                                                                                                                    // 57
	loginButtonsLoggedOut: {                                                                                              // 58
		noLoginServices: "Сервис для входа не настроен"                                                                      // 59
	},                                                                                                                    // 60
	loginFields: {                                                                                                        // 61
		usernameOrEmail: "Имя пользователя или email",                                                                       // 62
		username: "Имя пользователя",                                                                                        // 63
		email: "Email",                                                                                                      // 64
		password: "Пароль"                                                                                                   // 65
	},                                                                                                                    // 66
	signupFields: {                                                                                                       // 67
		username: "Имя пользователя",                                                                                        // 68
		email: "Email",                                                                                                      // 69
		emailOpt: "Email (необязательный)",                                                                                  // 70
		password: "Пароль",                                                                                                  // 71
		passwordAgain: "Пароль (еще раз)"                                                                                    // 72
	},                                                                                                                    // 73
	changePasswordFields: {                                                                                               // 74
		currentPassword: "Текущий пароль",                                                                                   // 75
		newPassword: "Новый пароль",                                                                                         // 76
		newPasswordAgain: "Новый пароль (еще раз)"                                                                           // 77
	},                                                                                                                    // 78
	errorMessages: {                                                                                                      // 79
		usernameTooShort: "Имя пользователя должно быть длиной не менее 3-х символов",                                       // 80
		invalidEmail: "Некорректный email",                                                                                  // 81
		passwordTooShort: "Пароль должен быть длиной не менее 6-ти символов",                                                // 82
		passwordsDontMatch: "Пароли не совпадают"                                                                            // 83
	}                                                                                                                     // 84
})                                                                                                                     // 85
                                                                                                                       // 86
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/ian:accounts-ui-bootstrap-3/i18n/el.i18n.js                                                                //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
i18n.map("el", {                                                                                                       // 1
	resetPasswordDialog: {                                                                                                // 2
		title: "Ακύρωση κωδικού",                                                                                            // 3
		newPassword: "Νέος κωδικός",                                                                                         // 4
		cancel: "Ακύρωση",                                                                                                   // 5
		submit: "Ορισμός κωδικού"                                                                                            // 6
	},                                                                                                                    // 7
	enrollAccountDialog: {                                                                                                // 8
		title: "Επιλέξτε κωδικό",                                                                                            // 9
		newPassword: "Νέος κωδικός",                                                                                         // 10
		cancel: "Ακύρωση",                                                                                                   // 11
		submit: "Ορισμός κωδικού"                                                                                            // 12
	},                                                                                                                    // 13
	justVerifiedEmailDialog: {                                                                                            // 14
		verified: "Ο λογαριασμός ηλεκτρονικού ταχυδρομείου έχει επιβεβαιωθεί",                                               // 15
		dismiss: "Κλείσιμο"                                                                                                  // 16
	},                                                                                                                    // 17
	loginButtonsMessagesDialog: {                                                                                         // 18
		dismiss: "Κλείσιμο",                                                                                                 // 19
	},                                                                                                                    // 20
	loginButtonsLoggedInDropdownActions: {                                                                                // 21
		password: "Αλλαγή κωδικού",                                                                                          // 22
		signOut: "Αποσύνδεση"                                                                                                // 23
	},                                                                                                                    // 24
	loginButtonsLoggedOutDropdown: {                                                                                      // 25
		signIn: "Είσοδος",                                                                                                   // 26
		up: "Εγγραφή"                                                                                                        // 27
	},                                                                                                                    // 28
	loginButtonsLoggedOutPasswordServiceSeparator: {                                                                      // 29
		or: "ή"                                                                                                              // 30
	},                                                                                                                    // 31
	loginButtonsLoggedOutPasswordService: {                                                                               // 32
		create: "Δημιουργία",                                                                                                // 33
		signIn: "Είσοδος",                                                                                                   // 34
		forgot: "Ξεχάσατε τον κωδικό σας;",                                                                                  // 35
		createAcc: "Δημιουργία λογαριασμού"                                                                                  // 36
	},                                                                                                                    // 37
	forgotPasswordForm: {                                                                                                 // 38
		email: "Ηλεκτρονικό ταχυδρομείο (email)",                                                                            // 39
		reset: "Ακύρωση κωδικού",                                                                                            // 40
		sent: "Το email έχει αποσταλεί",                                                                                     // 41
		invalidEmail: "Μη έγκυρος λογαριασμός ηλεκτρονικού ταχυδρομείου (email)"                                             // 42
	},                                                                                                                    // 43
	loginButtonsBackToLoginLink: {                                                                                        // 44
		back: "Επιστροφή"                                                                                                    // 45
	},                                                                                                                    // 46
	loginButtonsChangePassword: {                                                                                         // 47
		submit: "Αλλαγή κωδικού",                                                                                            // 48
		cancel: "Ακύρωση"                                                                                                    // 49
	},                                                                                                                    // 50
	loginButtonsLoggedOutSingleLoginButton: {                                                                             // 51
		signInWith: "Είσοδος με",                                                                                            // 52
		configure: "Διαμόρφωση",                                                                                             // 53
	},                                                                                                                    // 54
	loginButtonsLoggedInSingleLogoutButton: {                                                                             // 55
		signOut: "Αποσύνδεση"                                                                                                // 56
	},                                                                                                                    // 57
	loginButtonsLoggedOut: {                                                                                              // 58
		noLoginServices: "Δεν έχουν διαμορφωθεί υπηρεσίες εισόδου"                                                           // 59
	},                                                                                                                    // 60
	loginFields: {                                                                                                        // 61
		usernameOrEmail: "Όνομα χρήστη ή Λογαριασμός Ηλεκτρονικού Ταχυδρομείου",                                             // 62
		username: "Όνομα χρήστη",                                                                                            // 63
		email: "Ηλεκτρονικό ταχυδρομείο (email)",                                                                            // 64
		password: "Κωδικός"                                                                                                  // 65
	},                                                                                                                    // 66
	signupFields: {                                                                                                       // 67
		username: "Όνομα χρήστη",                                                                                            // 68
		email: "Ηλεκτρονικό ταχυδρομείο (email)",                                                                            // 69
		emailOpt: "Ηλεκτρονικό ταχυδρομείο (προαιρετικό)",                                                                   // 70
		password: "Κωδικός",                                                                                                 // 71
		passwordAgain: "Κωδικός (ξανά)"                                                                                      // 72
	},                                                                                                                    // 73
	changePasswordFields: {                                                                                               // 74
		currentPassword: "Ισχύων Κωδικός",                                                                                   // 75
		newPassword: "Νέος Κωδικός",                                                                                         // 76
		newPasswordAgain: "Νέος Κωδικός (ξανά)"                                                                              // 77
	},                                                                                                                    // 78
	errorMessages: {                                                                                                      // 79
		usernameTooShort: "Το όνομα χρήστη πρέπει να είναι τουλάχιστον 3 χαρακτήρες",                                        // 80
		invalidEmail: "Μη έγκυρος λογαριασμός ηλεκτρονικού ταχυδρομείου (email)",                                            // 81
		passwordTooShort: "Ο κωδικός πρέπει να είναι τουλάχιστον 6 χαρακτήρες",                                              // 82
		passwordsDontMatch: "Οι κωδικοί δεν ταιριάζουν"                                                                      // 83
	}                                                                                                                     // 84
})                                                                                                                     // 85
                                                                                                                       // 86
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/ian:accounts-ui-bootstrap-3/i18n/ko.i18n.js                                                                //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
i18n.map("ko", {                                                                                                       // 1
	resetPasswordDialog: {                                                                                                // 2
		title: "비밀번호 초기화하기",                                                                                                 // 3
		newPassword: "새로운 비밀번호",                                                                                             // 4
		cancel: "취소",                                                                                                        // 5
		submit: "변경"                                                                                                         // 6
	},                                                                                                                    // 7
	enrollAccountDialog: {                                                                                                // 8
		title: "비밀번호를 입력해주세요",                                                                                               // 9
		newPassword: "새로운 비밀번호",                                                                                             // 10
		cancel: "닫기",                                                                                                        // 11
		submit: "변경"                                                                                                         // 12
	},                                                                                                                    // 13
	justVerifiedEmailDialog: {                                                                                            // 14
		verified: "이메일 주소가 인증되었습니다",                                                                                         // 15
		dismiss: "취소"                                                                                                        // 16
	},                                                                                                                    // 17
	loginButtonsMessagesDialog: {                                                                                         // 18
		dismiss: "취소",                                                                                                       // 19
	},                                                                                                                    // 20
	loginButtonsLoggedInDropdownActions: {                                                                                // 21
		password: "비밀번호 변경하기",                                                                                               // 22
		signOut: "로그아웃"                                                                                                      // 23
	},                                                                                                                    // 24
	loginButtonsLoggedOutDropdown: {                                                                                      // 25
		signIn: "로그인",                                                                                                       // 26
		up: "계정 만들기"                                                                                                         // 27
	},                                                                                                                    // 28
	loginButtonsLoggedOutPasswordServiceSeparator: {                                                                      // 29
		or: "또는"                                                                                                             // 30
	},                                                                                                                    // 31
	loginButtonsLoggedOutPasswordService: {                                                                               // 32
		create: "만들기",                                                                                                       // 33
		signIn: "로그인",                                                                                                       // 34
		forgot: "비밀번호를 잊어버리셨나요?",                                                                                            // 35
		createAcc: "계정 만들기"                                                                                                  // 36
	},                                                                                                                    // 37
	forgotPasswordForm: {                                                                                                 // 38
		email: "이메일 주소",                                                                                                     // 39
		reset: "비밀번호 초기화하기",                                                                                                 // 40
		sent: "이메일이 보내졌습니다",                                                                                                 // 41
		invalidEmail: "올바르지 않은 이메일 주소입니다"                                                                                    // 42
	},                                                                                                                    // 43
	loginButtonsBackToLoginLink: {                                                                                        // 44
		back: "취소"                                                                                                           // 45
	},                                                                                                                    // 46
	loginButtonsChangePassword: {                                                                                         // 47
		submit: "비밀번호 변경하기",                                                                                                 // 48
		cancel: "취소"                                                                                                         // 49
	},                                                                                                                    // 50
	loginButtonsLoggedOutSingleLoginButton: {                                                                             // 51
		signInWith: "다음으로 로그인하기:",                                                                                           // 52
		configure: "설정",                                                                                                     // 53
	},                                                                                                                    // 54
	loginButtonsLoggedInSingleLogoutButton: {                                                                             // 55
		signOut: "로그아웃"                                                                                                      // 56
	},                                                                                                                    // 57
	loginButtonsLoggedOut: {                                                                                              // 58
		noLoginServices: "사용 가능한 로그인 서비스가 없습니다"                                                                              // 59
	},                                                                                                                    // 60
	loginFields: {                                                                                                        // 61
		usernameOrEmail: "사용자이름 또는 이메일 주소",                                                                                  // 62
		username: "사용자이름",                                                                                                   // 63
		email: "이메일 주소",                                                                                                     // 64
		password: "비밀번호"                                                                                                     // 65
	},                                                                                                                    // 66
	signupFields: {                                                                                                       // 67
		username: "사용자이름",                                                                                                   // 68
		email: "이메일 주소",                                                                                                     // 69
		emailOpt: "이메일 주소 (선택)",                                                                                             // 70
		password: "비밀번호",                                                                                                    // 71
		passwordAgain: "비밀번호 (확인)"                                                                                           // 72
	},                                                                                                                    // 73
	changePasswordFields: {                                                                                               // 74
		currentPassword: "현재 비밀번호",                                                                                          // 75
		newPassword: "새로운 비밀번호",                                                                                             // 76
		newPasswordAgain: "새로운 비밀번호 (확인)"                                                                                    // 77
	},                                                                                                                    // 78
	errorMessages: {                                                                                                      // 79
		usernameTooShort: "사용자이름은 최소 3글자 이상이어야 합니다",                                                                         // 80
		invalidEmail: "잘못된 이메일 주소",                                                                                          // 81
		passwordTooShort: "비밀번호는 최소 6글자 이상이어야 합니다",                                                                          // 82
		passwordsDontMatch: "비밀번호가 맞지 않습니다"                                                                                  // 83
	}                                                                                                                     // 84
})                                                                                                                     // 85
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/ian:accounts-ui-bootstrap-3/i18n.js                                                                        //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
i18n.setDefaultLanguage('en')                                                                                          // 1
                                                                                                                       // 2
accountsUIBootstrap3 = {                                                                                               // 3
	setLanguage: function (lang) {                                                                                        // 4
		return i18n.setLanguage(lang)                                                                                        // 5
	},                                                                                                                    // 6
	getLanguage: function () {                                                                                            // 7
		return i18n.getLanguage()                                                                                            // 8
	},                                                                                                                    // 9
	map: function (lang, obj) {                                                                                           // 10
		return i18n.map(lang, obj)                                                                                           // 11
	}                                                                                                                     // 12
}                                                                                                                      // 13
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/ian:accounts-ui-bootstrap-3/template.login_buttons.js                                                      //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
Template.__checkName("_loginButtons");                                                                                 // 2
Template["_loginButtons"] = new Template("Template._loginButtons", (function() {                                       // 3
  var view = this;                                                                                                     // 4
  return Blaze.If(function() {                                                                                         // 5
    return Spacebars.call(view.lookup("currentUser"));                                                                 // 6
  }, function() {                                                                                                      // 7
    return [ "\n		", Blaze.Unless(function() {                                                                         // 8
      return Spacebars.call(view.lookup("loggingIn"));                                                                 // 9
    }, function() {                                                                                                    // 10
      return [ "\n			", Spacebars.include(view.lookupTemplate("_loginButtonsLoggedIn")), "\n		" ];                     // 11
    }), "\n	" ];                                                                                                       // 12
  }, function() {                                                                                                      // 13
    return [ "\n		", Spacebars.include(view.lookupTemplate("_loginButtonsLoggedOut")), "\n	" ];                        // 14
  });                                                                                                                  // 15
}));                                                                                                                   // 16
                                                                                                                       // 17
Template.__checkName("_loginButtonsLoggedIn");                                                                         // 18
Template["_loginButtonsLoggedIn"] = new Template("Template._loginButtonsLoggedIn", (function() {                       // 19
  var view = this;                                                                                                     // 20
  return Blaze.If(function() {                                                                                         // 21
    return Spacebars.call(view.lookup("dropdown"));                                                                    // 22
  }, function() {                                                                                                      // 23
    return [ "\n		", Spacebars.include(view.lookupTemplate("_loginButtonsLoggedInDropdown")), "\n	" ];                 // 24
  }, function() {                                                                                                      // 25
    return [ "\n	", Spacebars.include(view.lookupTemplate("_loginButtonsLoggedInSingleLogoutButton")), "\n	" ];        // 26
  });                                                                                                                  // 27
}));                                                                                                                   // 28
                                                                                                                       // 29
Template.__checkName("_loginButtonsLoggedOut");                                                                        // 30
Template["_loginButtonsLoggedOut"] = new Template("Template._loginButtonsLoggedOut", (function() {                     // 31
  var view = this;                                                                                                     // 32
  return Blaze.If(function() {                                                                                         // 33
    return Spacebars.call(view.lookup("services"));                                                                    // 34
  }, function() {                                                                                                      // 35
    return [ " \n		", Blaze.If(function() {                                                                            // 36
      return Spacebars.call(view.lookup("configurationLoaded"));                                                       // 37
    }, function() {                                                                                                    // 38
      return [ "\n			", Blaze.If(function() {                                                                          // 39
        return Spacebars.call(view.lookup("dropdown"));                                                                // 40
      }, function() {                                                                                                  // 41
        return [ " \n				", Spacebars.include(view.lookupTemplate("_loginButtonsLoggedOutDropdown")), "\n			" ];       // 42
      }, function() {                                                                                                  // 43
        return [ "\n				", Spacebars.With(function() {                                                                 // 44
          return Spacebars.call(view.lookup("singleService"));                                                         // 45
        }, function() {                                                                                                // 46
          return [ " \n					", Blaze.Unless(function() {                                                               // 47
            return Spacebars.call(view.lookup("logginIn"));                                                            // 48
          }, function() {                                                                                              // 49
            return [ "\n						", Spacebars.include(view.lookupTemplate("_loginButtonsLoggedOutSingleLoginButton")), "\n					" ];
          }), "\n				" ];                                                                                              // 51
        }), "\n			" ];                                                                                                 // 52
      }), "\n		" ];                                                                                                    // 53
    }), "\n	" ];                                                                                                       // 54
  }, function() {                                                                                                      // 55
    return [ "\n		", HTML.DIV({                                                                                        // 56
      "class": "no-services"                                                                                           // 57
    }, Blaze.View(function() {                                                                                         // 58
      return Spacebars.mustache(view.lookup("i18n"), "loginButtonsLoggedOut.noLoginServices");                         // 59
    })), "\n	" ];                                                                                                      // 60
  });                                                                                                                  // 61
}));                                                                                                                   // 62
                                                                                                                       // 63
Template.__checkName("_loginButtonsMessages");                                                                         // 64
Template["_loginButtonsMessages"] = new Template("Template._loginButtonsMessages", (function() {                       // 65
  var view = this;                                                                                                     // 66
  return [ Blaze.If(function() {                                                                                       // 67
    return Spacebars.call(view.lookup("errorMessage"));                                                                // 68
  }, function() {                                                                                                      // 69
    return [ "\n		", HTML.DIV({                                                                                        // 70
      "class": "alert alert-danger"                                                                                    // 71
    }, Blaze.View(function() {                                                                                         // 72
      return Spacebars.mustache(view.lookup("errorMessage"));                                                          // 73
    })), "\n	" ];                                                                                                      // 74
  }), "\n	", Blaze.If(function() {                                                                                     // 75
    return Spacebars.call(view.lookup("infoMessage"));                                                                 // 76
  }, function() {                                                                                                      // 77
    return [ "\n		", HTML.DIV({                                                                                        // 78
      "class": "alert alert-success no-margin"                                                                         // 79
    }, Blaze.View(function() {                                                                                         // 80
      return Spacebars.mustache(view.lookup("infoMessage"));                                                           // 81
    })), "\n	" ];                                                                                                      // 82
  }) ];                                                                                                                // 83
}));                                                                                                                   // 84
                                                                                                                       // 85
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/ian:accounts-ui-bootstrap-3/template.login_buttons_single.js                                               //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
Template.__checkName("_loginButtonsLoggedOutSingleLoginButton");                                                       // 2
Template["_loginButtonsLoggedOutSingleLoginButton"] = new Template("Template._loginButtonsLoggedOutSingleLoginButton", (function() {
  var view = this;                                                                                                     // 4
  return HTML.DIV({                                                                                                    // 5
    "class": "navbar-form"                                                                                             // 6
  }, "\n		", Blaze.If(function() {                                                                                     // 7
    return Spacebars.call(view.lookup("configured"));                                                                  // 8
  }, function() {                                                                                                      // 9
    return [ "\n			", HTML.BUTTON({                                                                                    // 10
      "class": function() {                                                                                            // 11
        return [ "login-button btn btn-block btn-", Spacebars.mustache(view.lookup("capitalizedName")) ];              // 12
      }                                                                                                                // 13
    }, Blaze.View(function() {                                                                                         // 14
      return Spacebars.mustache(view.lookup("i18n"), "loginButtonsLoggedOutSingleLoginButton.signInWith");             // 15
    }), " ", Blaze.View(function() {                                                                                   // 16
      return Spacebars.mustache(view.lookup("capitalizedName"));                                                       // 17
    })), "\n		" ];                                                                                                     // 18
  }, function() {                                                                                                      // 19
    return [ "\n			", HTML.BUTTON({                                                                                    // 20
      "class": "login-button btn btn-block configure-button btn-danger"                                                // 21
    }, Blaze.View(function() {                                                                                         // 22
      return Spacebars.mustache(view.lookup("i18n"), "loginButtonsLoggedOutSingleLoginButton.configure");              // 23
    }), " ", Blaze.View(function() {                                                                                   // 24
      return Spacebars.mustache(view.lookup("capitalizedName"));                                                       // 25
    })), "\n		" ];                                                                                                     // 26
  }), "\n	");                                                                                                          // 27
}));                                                                                                                   // 28
                                                                                                                       // 29
Template.__checkName("_loginButtonsLoggedInSingleLogoutButton");                                                       // 30
Template["_loginButtonsLoggedInSingleLogoutButton"] = new Template("Template._loginButtonsLoggedInSingleLogoutButton", (function() {
  var view = this;                                                                                                     // 32
  return HTML.LI("\n		", HTML.A({                                                                                      // 33
    href: "#",                                                                                                         // 34
    id: "login-buttons-logout"                                                                                         // 35
  }, Blaze.View(function() {                                                                                           // 36
    return Spacebars.mustache(view.lookup("displayName"));                                                             // 37
  }), " ", Blaze.View(function() {                                                                                     // 38
    return Spacebars.mustache(view.lookup("i18n"), "loginButtonsLoggedInSingleLogoutButton.signOut");                  // 39
  })), "\n	");                                                                                                         // 40
}));                                                                                                                   // 41
                                                                                                                       // 42
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/ian:accounts-ui-bootstrap-3/template.login_buttons_dropdown.js                                             //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
Template.__checkName("_loginButtonsLoggedInDropdown");                                                                 // 2
Template["_loginButtonsLoggedInDropdown"] = new Template("Template._loginButtonsLoggedInDropdown", (function() {       // 3
  var view = this;                                                                                                     // 4
  return HTML.LI({                                                                                                     // 5
    id: "login-dropdown-list",                                                                                         // 6
    "class": "dropdown"                                                                                                // 7
  }, "\n		", HTML.A({                                                                                                  // 8
    "class": "dropdown-toggle",                                                                                        // 9
    "data-toggle": "dropdown"                                                                                          // 10
  }, "\n			", Blaze.View(function() {                                                                                  // 11
    return Spacebars.mustache(view.lookup("displayName"));                                                             // 12
  }), "\n			", Spacebars.With(function() {                                                                             // 13
    return Spacebars.call(view.lookup("user_profile_picture"));                                                        // 14
  }, function() {                                                                                                      // 15
    return [ "\n				", HTML.IMG({                                                                                      // 16
      src: function() {                                                                                                // 17
        return Spacebars.mustache(view.lookup("."));                                                                   // 18
      },                                                                                                               // 19
      width: "30px",                                                                                                   // 20
      "class": "img-circular",                                                                                         // 21
      alt: "#"                                                                                                         // 22
    }), "\n			" ];                                                                                                     // 23
  }), "\n			", HTML.Raw('<b class="caret"></b>'), "\n		"), "\n		", HTML.DIV({                                          // 24
    "class": "dropdown-menu col-sm-3"                                                                                  // 25
  }, "\n			", Blaze.If(function() {                                                                                    // 26
    return Spacebars.call(view.lookup("inMessageOnlyFlow"));                                                           // 27
  }, function() {                                                                                                      // 28
    return [ "\n				", Spacebars.include(view.lookupTemplate("_loginButtonsMessages")), "\n			" ];                     // 29
  }, function() {                                                                                                      // 30
    return [ "\n				", Blaze.If(function() {                                                                           // 31
      return Spacebars.call(view.lookup("inChangePasswordFlow"));                                                      // 32
    }, function() {                                                                                                    // 33
      return [ "\n					", Spacebars.include(view.lookupTemplate("_loginButtonsChangePassword")), "\n				" ];           // 34
    }, function() {                                                                                                    // 35
      return [ "\n					", Spacebars.include(view.lookupTemplate("_loginButtonsLoggedInDropdownActions")), "\n				" ];  // 36
    }), "\n			" ];                                                                                                     // 37
  }), "\n		"), "\n	");                                                                                                 // 38
}));                                                                                                                   // 39
                                                                                                                       // 40
Template.__checkName("_loginButtonsLoggedInDropdownActions");                                                          // 41
Template["_loginButtonsLoggedInDropdownActions"] = new Template("Template._loginButtonsLoggedInDropdownActions", (function() {
  var view = this;                                                                                                     // 43
  return [ Blaze.If(function() {                                                                                       // 44
    return Spacebars.call(view.lookup("additionalLoggedInDropdownActions"));                                           // 45
  }, function() {                                                                                                      // 46
    return [ "\n		", Spacebars.include(view.lookupTemplate("_loginButtonsAdditionalLoggedInDropdownActions")), "\n	" ];
  }), "\n\n	", Blaze.If(function() {                                                                                   // 48
    return Spacebars.call(view.lookup("allowChangingPassword"));                                                       // 49
  }, function() {                                                                                                      // 50
    return [ "\n		", HTML.BUTTON({                                                                                     // 51
      "class": "btn btn-default btn-block",                                                                            // 52
      id: "login-buttons-open-change-password"                                                                         // 53
    }, Blaze.View(function() {                                                                                         // 54
      return Spacebars.mustache(view.lookup("i18n"), "loginButtonsLoggedInDropdownActions.password");                  // 55
    })), "\n	" ];                                                                                                      // 56
  }), "\n\n	", HTML.BUTTON({                                                                                           // 57
    "class": "btn btn-block btn-primary",                                                                              // 58
    id: "login-buttons-logout"                                                                                         // 59
  }, Blaze.View(function() {                                                                                           // 60
    return Spacebars.mustache(view.lookup("i18n"), "loginButtonsLoggedInDropdownActions.signOut");                     // 61
  })) ];                                                                                                               // 62
}));                                                                                                                   // 63
                                                                                                                       // 64
Template.__checkName("_loginButtonsLoggedOutDropdown");                                                                // 65
Template["_loginButtonsLoggedOutDropdown"] = new Template("Template._loginButtonsLoggedOutDropdown", (function() {     // 66
  var view = this;                                                                                                     // 67
  return HTML.LI({                                                                                                     // 68
    id: "login-dropdown-list",                                                                                         // 69
    "class": "dropdown"                                                                                                // 70
  }, "\n		", HTML.A({                                                                                                  // 71
    "class": "dropdown-toggle",                                                                                        // 72
    "data-toggle": "dropdown"                                                                                          // 73
  }, Blaze.View(function() {                                                                                           // 74
    return Spacebars.mustache(view.lookup("i18n"), "loginButtonsLoggedOutDropdown.signIn");                            // 75
  }), Blaze.Unless(function() {                                                                                        // 76
    return Spacebars.call(view.lookup("forbidClientAccountCreation"));                                                 // 77
  }, function() {                                                                                                      // 78
    return [ " / ", Blaze.View(function() {                                                                            // 79
      return Spacebars.mustache(view.lookup("i18n"), "loginButtonsLoggedOutDropdown.up");                              // 80
    }) ];                                                                                                              // 81
  }), " ", HTML.Raw('<b class="caret"></b>')), "\n		", HTML.DIV({                                                      // 82
    "class": "dropdown-menu"                                                                                           // 83
  }, "\n			", Spacebars.include(view.lookupTemplate("_loginButtonsLoggedOutAllServices")), "\n		"), "\n	");            // 84
}));                                                                                                                   // 85
                                                                                                                       // 86
Template.__checkName("_loginButtonsLoggedOutAllServices");                                                             // 87
Template["_loginButtonsLoggedOutAllServices"] = new Template("Template._loginButtonsLoggedOutAllServices", (function() {
  var view = this;                                                                                                     // 89
  return Blaze.Each(function() {                                                                                       // 90
    return Spacebars.call(view.lookup("services"));                                                                    // 91
  }, function() {                                                                                                      // 92
    return [ "\n	", Blaze.Unless(function() {                                                                          // 93
      return Spacebars.call(view.lookup("hasPasswordService"));                                                        // 94
    }, function() {                                                                                                    // 95
      return [ "\n		", Spacebars.include(view.lookupTemplate("_loginButtonsMessages")), "\n	" ];                       // 96
    }), "\n		", Blaze.If(function() {                                                                                  // 97
      return Spacebars.call(view.lookup("isPasswordService"));                                                         // 98
    }, function() {                                                                                                    // 99
      return [ "\n			", Blaze.If(function() {                                                                          // 100
        return Spacebars.call(view.lookup("hasOtherServices"));                                                        // 101
      }, function() {                                                                                                  // 102
        return [ " \n				", Spacebars.include(view.lookupTemplate("_loginButtonsLoggedOutPasswordServiceSeparator")), "\n			" ];
      }), "\n			", Spacebars.include(view.lookupTemplate("_loginButtonsLoggedOutPasswordService")), "\n		" ];          // 104
    }, function() {                                                                                                    // 105
      return [ "\n			", Spacebars.include(view.lookupTemplate("_loginButtonsLoggedOutSingleLoginButton")), "\n		" ];   // 106
    }), "\n	" ];                                                                                                       // 107
  });                                                                                                                  // 108
}));                                                                                                                   // 109
                                                                                                                       // 110
Template.__checkName("_loginButtonsLoggedOutPasswordServiceSeparator");                                                // 111
Template["_loginButtonsLoggedOutPasswordServiceSeparator"] = new Template("Template._loginButtonsLoggedOutPasswordServiceSeparator", (function() {
  var view = this;                                                                                                     // 113
  return HTML.DIV({                                                                                                    // 114
    "class": "or"                                                                                                      // 115
  }, HTML.Raw('\n		<span class="hline">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>\n		'), HTML.SPAN({
    "class": "or-text"                                                                                                 // 117
  }, Blaze.View(function() {                                                                                           // 118
    return Spacebars.mustache(view.lookup("i18n"), "loginButtonsLoggedOutPasswordServiceSeparator.or");                // 119
  })), HTML.Raw('\n		<span class="hline">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>\n	'));    // 120
}));                                                                                                                   // 121
                                                                                                                       // 122
Template.__checkName("_loginButtonsLoggedOutPasswordService");                                                         // 123
Template["_loginButtonsLoggedOutPasswordService"] = new Template("Template._loginButtonsLoggedOutPasswordService", (function() {
  var view = this;                                                                                                     // 125
  return Blaze.If(function() {                                                                                         // 126
    return Spacebars.call(view.lookup("inForgotPasswordFlow"));                                                        // 127
  }, function() {                                                                                                      // 128
    return [ "\n		", Spacebars.include(view.lookupTemplate("_forgotPasswordForm")), "\n	" ];                           // 129
  }, function() {                                                                                                      // 130
    return [ "\n		", Spacebars.include(view.lookupTemplate("_loginButtonsMessages")), "\n		", Blaze.Each(function() {  // 131
      return Spacebars.call(view.lookup("fields"));                                                                    // 132
    }, function() {                                                                                                    // 133
      return [ "\n			", Spacebars.include(view.lookupTemplate("_loginButtonsFormField")), "\n		" ];                    // 134
    }), "\n		", HTML.BUTTON({                                                                                          // 135
      "class": "btn btn-primary col-sm-12",                                                                            // 136
      id: "login-buttons-password",                                                                                    // 137
      type: "button"                                                                                                   // 138
    }, "\n			", Blaze.If(function() {                                                                                  // 139
      return Spacebars.call(view.lookup("inSignupFlow"));                                                              // 140
    }, function() {                                                                                                    // 141
      return [ "\n				", Blaze.View(function() {                                                                       // 142
        return Spacebars.mustache(view.lookup("i18n"), "loginButtonsLoggedOutPasswordService.create");                 // 143
      }), "\n			" ];                                                                                                   // 144
    }, function() {                                                                                                    // 145
      return [ "\n				", Blaze.View(function() {                                                                       // 146
        return Spacebars.mustache(view.lookup("i18n"), "loginButtonsLoggedOutPasswordService.signIn");                 // 147
      }), "\n			" ];                                                                                                   // 148
    }), "\n		"), "\n		", Blaze.If(function() {                                                                         // 149
      return Spacebars.call(view.lookup("inLoginFlow"));                                                               // 150
    }, function() {                                                                                                    // 151
      return [ "\n			", HTML.DIV({                                                                                     // 152
        id: "login-other-options"                                                                                      // 153
      }, "\n			", Blaze.If(function() {                                                                                // 154
        return Spacebars.call(view.lookup("showForgotPasswordLink"));                                                  // 155
      }, function() {                                                                                                  // 156
        return [ "\n				", HTML.A({                                                                                    // 157
          id: "forgot-password-link",                                                                                  // 158
          "class": "pull-left"                                                                                         // 159
        }, Blaze.View(function() {                                                                                     // 160
          return Spacebars.mustache(view.lookup("i18n"), "loginButtonsLoggedOutPasswordService.forgot");               // 161
        })), "\n			" ];                                                                                                // 162
      }), "\n			", Blaze.If(function() {                                                                               // 163
        return Spacebars.call(view.lookup("showCreateAccountLink"));                                                   // 164
      }, function() {                                                                                                  // 165
        return [ "\n				", HTML.A({                                                                                    // 166
          id: "signup-link",                                                                                           // 167
          "class": "pull-right"                                                                                        // 168
        }, Blaze.View(function() {                                                                                     // 169
          return Spacebars.mustache(view.lookup("i18n"), "loginButtonsLoggedOutPasswordService.createAcc");            // 170
        })), "\n			" ];                                                                                                // 171
      }), "\n			"), "\n		" ];                                                                                          // 172
    }), "\n		", Blaze.If(function() {                                                                                  // 173
      return Spacebars.call(view.lookup("inSignupFlow"));                                                              // 174
    }, function() {                                                                                                    // 175
      return [ "\n			", Spacebars.include(view.lookupTemplate("_loginButtonsBackToLoginLink")), "\n		" ];              // 176
    }), "\n	" ];                                                                                                       // 177
  });                                                                                                                  // 178
}));                                                                                                                   // 179
                                                                                                                       // 180
Template.__checkName("_forgotPasswordForm");                                                                           // 181
Template["_forgotPasswordForm"] = new Template("Template._forgotPasswordForm", (function() {                           // 182
  var view = this;                                                                                                     // 183
  return HTML.DIV({                                                                                                    // 184
    "class": "login-form"                                                                                              // 185
  }, "\n		", Spacebars.include(view.lookupTemplate("_loginButtonsMessages")), "\n		", HTML.DIV({                       // 186
    id: "forgot-password-email-label-and-input"                                                                        // 187
  }, " \n			", HTML.INPUT({                                                                                            // 188
    id: "forgot-password-email",                                                                                       // 189
    type: "email",                                                                                                     // 190
    placeholder: function() {                                                                                          // 191
      return Spacebars.mustache(view.lookup("i18n"), "forgotPasswordForm.email");                                      // 192
    },                                                                                                                 // 193
    "class": "form-control"                                                                                            // 194
  }), "\n		"), "\n		", HTML.BUTTON({                                                                                   // 195
    "class": "btn btn-primary login-button-form-submit col-sm-12",                                                     // 196
    id: "login-buttons-forgot-password"                                                                                // 197
  }, Blaze.View(function() {                                                                                           // 198
    return Spacebars.mustache(view.lookup("i18n"), "forgotPasswordForm.reset");                                        // 199
  })), "\n		", Spacebars.include(view.lookupTemplate("_loginButtonsBackToLoginLink")), "\n	");                         // 200
}));                                                                                                                   // 201
                                                                                                                       // 202
Template.__checkName("_loginButtonsBackToLoginLink");                                                                  // 203
Template["_loginButtonsBackToLoginLink"] = new Template("Template._loginButtonsBackToLoginLink", (function() {         // 204
  var view = this;                                                                                                     // 205
  return HTML.BUTTON({                                                                                                 // 206
    id: "back-to-login-link",                                                                                          // 207
    "class": "btn btn-default col-sm-12"                                                                               // 208
  }, Blaze.View(function() {                                                                                           // 209
    return Spacebars.mustache(view.lookup("i18n"), "loginButtonsBackToLoginLink.back");                                // 210
  }));                                                                                                                 // 211
}));                                                                                                                   // 212
                                                                                                                       // 213
Template.__checkName("_loginButtonsFormField");                                                                        // 214
Template["_loginButtonsFormField"] = new Template("Template._loginButtonsFormField", (function() {                     // 215
  var view = this;                                                                                                     // 216
  return Blaze.If(function() {                                                                                         // 217
    return Spacebars.call(view.lookup("visible"));                                                                     // 218
  }, function() {                                                                                                      // 219
    return [ "\n		", HTML.INPUT({                                                                                      // 220
      id: function() {                                                                                                 // 221
        return [ "login-", Spacebars.mustache(view.lookup("fieldName")) ];                                             // 222
      },                                                                                                               // 223
      type: function() {                                                                                               // 224
        return Spacebars.mustache(view.lookup("inputType"));                                                           // 225
      },                                                                                                               // 226
      placeholder: function() {                                                                                        // 227
        return Spacebars.mustache(view.lookup("fieldLabel"));                                                          // 228
      },                                                                                                               // 229
      "class": "form-control"                                                                                          // 230
    }), "\n	" ];                                                                                                       // 231
  });                                                                                                                  // 232
}));                                                                                                                   // 233
                                                                                                                       // 234
Template.__checkName("_loginButtonsChangePassword");                                                                   // 235
Template["_loginButtonsChangePassword"] = new Template("Template._loginButtonsChangePassword", (function() {           // 236
  var view = this;                                                                                                     // 237
  return [ Spacebars.include(view.lookupTemplate("_loginButtonsMessages")), "\n	", Blaze.Each(function() {             // 238
    return Spacebars.call(view.lookup("fields"));                                                                      // 239
  }, function() {                                                                                                      // 240
    return [ "\n		", Spacebars.include(view.lookupTemplate("_loginButtonsFormField")), "\n	" ];                        // 241
  }), "\n	", HTML.BUTTON({                                                                                             // 242
    "class": "btn btn-primary",                                                                                        // 243
    id: "login-buttons-do-change-password"                                                                             // 244
  }, Blaze.View(function() {                                                                                           // 245
    return Spacebars.mustache(view.lookup("i18n"), "loginButtonsChangePassword.submit");                               // 246
  })), "\n	", HTML.BUTTON({                                                                                            // 247
    "class": "btn btn-default",                                                                                        // 248
    id: "login-buttons-cancel-change-password"                                                                         // 249
  }, Blaze.View(function() {                                                                                           // 250
    return Spacebars.mustache(view.lookup("i18n"), "loginButtonsChangePassword.cancel");                               // 251
  })) ];                                                                                                               // 252
}));                                                                                                                   // 253
                                                                                                                       // 254
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/ian:accounts-ui-bootstrap-3/template.login_buttons_dialogs.js                                              //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
Template.body.addContent((function() {                                                                                 // 2
  var view = this;                                                                                                     // 3
  return [ Spacebars.include(view.lookupTemplate("_resetPasswordDialog")), "\n	", Spacebars.include(view.lookupTemplate("_enrollAccountDialog")), "\n	", Spacebars.include(view.lookupTemplate("_justVerifiedEmailDialog")), "\n	", Spacebars.include(view.lookupTemplate("_configureLoginServiceDialog")), HTML.Raw("\n\n	<!-- if we're not showing a dropdown, we need some other place to show messages -->\n	"), Spacebars.include(view.lookupTemplate("_loginButtonsMessagesDialog")) ];
}));                                                                                                                   // 5
Meteor.startup(Template.body.renderToDocument);                                                                        // 6
                                                                                                                       // 7
Template.__checkName("_resetPasswordDialog");                                                                          // 8
Template["_resetPasswordDialog"] = new Template("Template._resetPasswordDialog", (function() {                         // 9
  var view = this;                                                                                                     // 10
  return Blaze.If(function() {                                                                                         // 11
    return Spacebars.call(view.lookup("inResetPasswordFlow"));                                                         // 12
  }, function() {                                                                                                      // 13
    return [ "\n		", HTML.DIV({                                                                                        // 14
      "class": "modal",                                                                                                // 15
      id: "login-buttons-reset-password-modal"                                                                         // 16
    }, "\n			", HTML.DIV({                                                                                             // 17
      "class": "modal-dialog"                                                                                          // 18
    }, "\n				", HTML.DIV({                                                                                            // 19
      "class": "modal-content"                                                                                         // 20
    }, "\n					", HTML.DIV({                                                                                           // 21
      "class": "modal-header"                                                                                          // 22
    }, "\n						", HTML.BUTTON({                                                                                       // 23
      type: "button",                                                                                                  // 24
      "class": "close",                                                                                                // 25
      "data-dismiss": "modal",                                                                                         // 26
      "aria-hidden": "true"                                                                                            // 27
    }, HTML.CharRef({                                                                                                  // 28
      html: "&times;",                                                                                                 // 29
      str: "×"                                                                                                         // 30
    })), "\n						", HTML.H4({                                                                                         // 31
      "class": "modal-title"                                                                                           // 32
    }, Blaze.View(function() {                                                                                         // 33
      return Spacebars.mustache(view.lookup("i18n"), "resetPasswordDialog.title");                                     // 34
    })), "\n					"), "\n					", HTML.DIV({                                                                             // 35
      "class": "modal-body"                                                                                            // 36
    }, "\n						", HTML.INPUT({                                                                                        // 37
      id: "reset-password-new-password",                                                                               // 38
      "class": "form-control",                                                                                         // 39
      type: "password",                                                                                                // 40
      placeholder: function() {                                                                                        // 41
        return Spacebars.mustache(view.lookup("i18n"), "resetPasswordDialog.newPassword");                             // 42
      }                                                                                                                // 43
    }), "\n						", Spacebars.include(view.lookupTemplate("_loginButtonsMessages")), "\n					"), "\n					", HTML.DIV({ // 44
      "class": "modal-footer"                                                                                          // 45
    }, "\n						", HTML.A({                                                                                            // 46
      "class": "btn btn-default",                                                                                      // 47
      id: "login-buttons-cancel-reset-password"                                                                        // 48
    }, Blaze.View(function() {                                                                                         // 49
      return Spacebars.mustache(view.lookup("i18n"), "resetPasswordDialog.cancel");                                    // 50
    })), "\n						", HTML.BUTTON({                                                                                     // 51
      "class": "btn btn-primary",                                                                                      // 52
      id: "login-buttons-reset-password-button"                                                                        // 53
    }, "\n							", Blaze.View(function() {                                                                            // 54
      return Spacebars.mustache(view.lookup("i18n"), "resetPasswordDialog.submit");                                    // 55
    }), "\n						"), "\n					"), "\n				"), HTML.Comment(" /.modal-content "), "\n			"), HTML.Comment(" /.modal-dalog "), "\n		"), HTML.Comment(" /.modal "), "\n	" ];
  });                                                                                                                  // 57
}));                                                                                                                   // 58
                                                                                                                       // 59
Template.__checkName("_enrollAccountDialog");                                                                          // 60
Template["_enrollAccountDialog"] = new Template("Template._enrollAccountDialog", (function() {                         // 61
  var view = this;                                                                                                     // 62
  return Blaze.If(function() {                                                                                         // 63
    return Spacebars.call(view.lookup("inEnrollAccountFlow"));                                                         // 64
  }, function() {                                                                                                      // 65
    return [ "\n		", HTML.DIV({                                                                                        // 66
      "class": "modal",                                                                                                // 67
      id: "login-buttons-enroll-account-modal"                                                                         // 68
    }, "\n			", HTML.DIV({                                                                                             // 69
      "class": "modal-dialog"                                                                                          // 70
    }, "\n				", HTML.DIV({                                                                                            // 71
      "class": "modal-content"                                                                                         // 72
    }, "\n					", HTML.DIV({                                                                                           // 73
      "class": "modal-header"                                                                                          // 74
    }, "\n						", HTML.BUTTON({                                                                                       // 75
      type: "button",                                                                                                  // 76
      "class": "close",                                                                                                // 77
      "data-dismiss": "modal",                                                                                         // 78
      "aria-hidden": "true"                                                                                            // 79
    }, HTML.CharRef({                                                                                                  // 80
      html: "&times;",                                                                                                 // 81
      str: "×"                                                                                                         // 82
    })), "\n						", HTML.H4({                                                                                         // 83
      "class": "modal-title"                                                                                           // 84
    }, Blaze.View(function() {                                                                                         // 85
      return Spacebars.mustache(view.lookup("i18n"), "enrollAccountDialog.title");                                     // 86
    })), "\n					"), "\n					", HTML.DIV({                                                                             // 87
      "class": "modal-body"                                                                                            // 88
    }, "\n						", HTML.INPUT({                                                                                        // 89
      id: "enroll-account-password",                                                                                   // 90
      "class": "form-control",                                                                                         // 91
      type: "password",                                                                                                // 92
      placeholder: function() {                                                                                        // 93
        return Spacebars.mustache(view.lookup("i18n"), "enrollAccountDialog.newPassword");                             // 94
      }                                                                                                                // 95
    }), "\n						", Spacebars.include(view.lookupTemplate("_loginButtonsMessages")), "\n					"), "\n					", HTML.DIV({ // 96
      "class": "modal-footer"                                                                                          // 97
    }, "\n						", HTML.A({                                                                                            // 98
      "class": "btn btn-default",                                                                                      // 99
      id: "login-buttons-cancel-enroll-account-button"                                                                 // 100
    }, Blaze.View(function() {                                                                                         // 101
      return Spacebars.mustache(view.lookup("i18n"), "enrollAccountDialog.cancel");                                    // 102
    })), "\n						", HTML.BUTTON({                                                                                     // 103
      "class": "btn btn-primary",                                                                                      // 104
      id: "login-buttons-enroll-account-button"                                                                        // 105
    }, "\n							", Blaze.View(function() {                                                                            // 106
      return Spacebars.mustache(view.lookup("i18n"), "enrollAccountDialog.submit");                                    // 107
    }), "\n						"), "\n					"), "\n				"), HTML.Comment(" /.modal-content "), "\n			"), HTML.Comment(" /.modal-dalog "), "\n		"), HTML.Comment(" /.modal "), "\n	" ];
  });                                                                                                                  // 109
}));                                                                                                                   // 110
                                                                                                                       // 111
Template.__checkName("_justVerifiedEmailDialog");                                                                      // 112
Template["_justVerifiedEmailDialog"] = new Template("Template._justVerifiedEmailDialog", (function() {                 // 113
  var view = this;                                                                                                     // 114
  return Blaze.If(function() {                                                                                         // 115
    return Spacebars.call(view.lookup("visible"));                                                                     // 116
  }, function() {                                                                                                      // 117
    return [ "\n		", HTML.DIV({                                                                                        // 118
      "class": "modal",                                                                                                // 119
      id: "login-buttons-email-address-verified-modal"                                                                 // 120
    }, "\n			", HTML.DIV({                                                                                             // 121
      "class": "modal-dialog"                                                                                          // 122
    }, "\n				", HTML.DIV({                                                                                            // 123
      "class": "modal-content"                                                                                         // 124
    }, "\n					", HTML.DIV({                                                                                           // 125
      "class": "modal-body"                                                                                            // 126
    }, "\n						", HTML.H4(HTML.B(Blaze.View(function() {                                                              // 127
      return Spacebars.mustache(view.lookup("i18n"), "justVerifiedEmailDialog.verified");                              // 128
    }))), "\n					"), "\n					", HTML.DIV({                                                                            // 129
      "class": "modal-footer"                                                                                          // 130
    }, "\n						", HTML.BUTTON({                                                                                       // 131
      "class": "btn btn-info login-button",                                                                            // 132
      id: "just-verified-dismiss-button",                                                                              // 133
      "data-dismiss": "modal"                                                                                          // 134
    }, Blaze.View(function() {                                                                                         // 135
      return Spacebars.mustache(view.lookup("i18n"), "justVerifiedEmailDialog.dismiss");                               // 136
    })), "\n					"), "\n				"), "\n			"), "\n		"), "\n	" ];                                                            // 137
  });                                                                                                                  // 138
}));                                                                                                                   // 139
                                                                                                                       // 140
Template.__checkName("_configureLoginServiceDialog");                                                                  // 141
Template["_configureLoginServiceDialog"] = new Template("Template._configureLoginServiceDialog", (function() {         // 142
  var view = this;                                                                                                     // 143
  return Blaze.If(function() {                                                                                         // 144
    return Spacebars.call(view.lookup("visible"));                                                                     // 145
  }, function() {                                                                                                      // 146
    return [ "\n	", HTML.DIV({                                                                                         // 147
      "class": "modal",                                                                                                // 148
      id: "configure-login-service-dialog-modal"                                                                       // 149
    }, "\n			", HTML.DIV({                                                                                             // 150
      "class": "modal-dialog"                                                                                          // 151
    }, "\n					", HTML.DIV({                                                                                           // 152
      "class": "modal-content"                                                                                         // 153
    }, "\n							", HTML.DIV({                                                                                         // 154
      "class": "modal-header"                                                                                          // 155
    }, "\n									", HTML.H4({                                                                                        // 156
      "class": "modal-title"                                                                                           // 157
    }, "Configure Service"), "\n							"), "\n							", HTML.DIV({                                                     // 158
      "class": "modal-body"                                                                                            // 159
    }, "\n									", HTML.DIV({                                                                                       // 160
      id: "configure-login-service-dialog",                                                                            // 161
      "class": "accounts-dialog accounts-centered-dialog"                                                              // 162
    }, "\n											", Spacebars.include(view.lookupTemplate("configurationSteps")), "\n											", HTML.P("\n											Now, copy over some details.\n											"), "\n											", HTML.P("\n											", HTML.TABLE("\n													", HTML.COLGROUP("\n															", HTML.COL({
      span: "1",                                                                                                       // 164
      "class": "configuration_labels"                                                                                  // 165
    }), "\n															", HTML.COL({                                                                                // 166
      span: "1",                                                                                                       // 167
      "class": "configuration_inputs"                                                                                  // 168
    }), "\n													"), "\n													", Blaze.Each(function() {                                                 // 169
      return Spacebars.call(view.lookup("configurationFields"));                                                       // 170
    }, function() {                                                                                                    // 171
      return [ "\n													", HTML.TR("\n															", HTML.TD("\n																	", HTML.LABEL({             // 172
        "for": function() {                                                                                            // 173
          return [ "configure-login-service-dialog-", Spacebars.mustache(view.lookup("property")) ];                   // 174
        }                                                                                                              // 175
      }, Blaze.View(function() {                                                                                       // 176
        return Spacebars.mustache(view.lookup("label"));                                                               // 177
      })), "\n															"), "\n															", HTML.TD("\n																	", HTML.INPUT({                      // 178
        id: function() {                                                                                               // 179
          return [ "configure-login-service-dialog-", Spacebars.mustache(view.lookup("property")) ];                   // 180
        },                                                                                                             // 181
        type: "text"                                                                                                   // 182
      }), "\n															"), "\n													"), "\n													" ];                                               // 183
    }), "\n											"), "\n											"), "\n									"), "\n							"), "\n							", HTML.DIV({                      // 184
      "class": "modal-footer new-section"                                                                              // 185
    }, "\n									", HTML.DIV({                                                                                       // 186
      "class": "login-button btn btn-danger configure-login-service-dismiss-button"                                    // 187
    }, "\n											I'll do this later\n									"), "\n									", HTML.DIV({                                        // 188
      "class": function() {                                                                                            // 189
        return [ "login-button login-button-configure btn btn-success ", Blaze.If(function() {                         // 190
          return Spacebars.call(view.lookup("saveDisabled"));                                                          // 191
        }, function() {                                                                                                // 192
          return "login-button-disabled";                                                                              // 193
        }) ];                                                                                                          // 194
      },                                                                                                               // 195
      id: "configure-login-service-dialog-save-configuration"                                                          // 196
    }, "\n											Save Configuration\n									"), "\n							"), "\n					"), "\n			"), "\n	"), "\n	" ];             // 197
  });                                                                                                                  // 198
}));                                                                                                                   // 199
                                                                                                                       // 200
Template.__checkName("_loginButtonsMessagesDialog");                                                                   // 201
Template["_loginButtonsMessagesDialog"] = new Template("Template._loginButtonsMessagesDialog", (function() {           // 202
  var view = this;                                                                                                     // 203
  return Blaze.If(function() {                                                                                         // 204
    return Spacebars.call(view.lookup("visible"));                                                                     // 205
  }, function() {                                                                                                      // 206
    return [ "\n		", HTML.DIV({                                                                                        // 207
      "class": "accounts-dialog accounts-centered-dialog",                                                             // 208
      id: "login-buttons-message-dialog"                                                                               // 209
    }, "\n			", Spacebars.include(view.lookupTemplate("_loginButtonsMessages")), "\n			", HTML.DIV({                   // 210
      "class": "login-button",                                                                                         // 211
      id: "messages-dialog-dismiss-button"                                                                             // 212
    }, Blaze.View(function() {                                                                                         // 213
      return Spacebars.mustache(view.lookup("i18n"), "loginButtonsMessagesDialog.dismiss");                            // 214
    })), "\n		"), "\n	" ];                                                                                             // 215
  });                                                                                                                  // 216
}));                                                                                                                   // 217
                                                                                                                       // 218
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/ian:accounts-ui-bootstrap-3/login_buttons_session.js                                                       //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
(function () {                                                                                                         // 1
	var VALID_KEYS = [                                                                                                    // 2
		'dropdownVisible',                                                                                                   // 3
                                                                                                                       // 4
		// XXX consider replacing these with one key that has an enum for values.                                            // 5
		'inSignupFlow',                                                                                                      // 6
		'inForgotPasswordFlow',                                                                                              // 7
		'inChangePasswordFlow',                                                                                              // 8
		'inMessageOnlyFlow',                                                                                                 // 9
                                                                                                                       // 10
		'errorMessage',                                                                                                      // 11
		'infoMessage',                                                                                                       // 12
                                                                                                                       // 13
		// dialogs with messages (info and error)                                                                            // 14
		'resetPasswordToken',                                                                                                // 15
		'enrollAccountToken',                                                                                                // 16
		'justVerifiedEmail',                                                                                                 // 17
                                                                                                                       // 18
		'configureLoginServiceDialogVisible',                                                                                // 19
		'configureLoginServiceDialogServiceName',                                                                            // 20
		'configureLoginServiceDialogSaveDisabled'                                                                            // 21
	];                                                                                                                    // 22
                                                                                                                       // 23
	var validateKey = function (key) {                                                                                    // 24
		if (!_.contains(VALID_KEYS, key))                                                                                    // 25
			throw new Error("Invalid key in loginButtonsSession: " + key);                                                      // 26
	};                                                                                                                    // 27
                                                                                                                       // 28
	var KEY_PREFIX = "Meteor.loginButtons.";                                                                              // 29
                                                                                                                       // 30
	// XXX we should have a better pattern for code private to a package like this one                                    // 31
	Accounts._loginButtonsSession = {                                                                                     // 32
		set: function(key, value) {                                                                                          // 33
			validateKey(key);                                                                                                   // 34
			if (_.contains(['errorMessage', 'infoMessage'], key))                                                               // 35
				throw new Error("Don't set errorMessage or infoMessage directly. Instead, use errorMessage() or infoMessage().");  // 36
                                                                                                                       // 37
			this._set(key, value);                                                                                              // 38
		},                                                                                                                   // 39
                                                                                                                       // 40
		_set: function(key, value) {                                                                                         // 41
			Session.set(KEY_PREFIX + key, value);                                                                               // 42
		},                                                                                                                   // 43
                                                                                                                       // 44
		get: function(key) {                                                                                                 // 45
			validateKey(key);                                                                                                   // 46
			return Session.get(KEY_PREFIX + key);                                                                               // 47
		},                                                                                                                   // 48
                                                                                                                       // 49
		closeDropdown: function () {                                                                                         // 50
			this.set('inSignupFlow', false);                                                                                    // 51
			this.set('inForgotPasswordFlow', false);                                                                            // 52
			this.set('inChangePasswordFlow', false);                                                                            // 53
			this.set('inMessageOnlyFlow', false);                                                                               // 54
			this.set('dropdownVisible', false);                                                                                 // 55
			this.resetMessages();                                                                                               // 56
		},                                                                                                                   // 57
                                                                                                                       // 58
		infoMessage: function(message) {                                                                                     // 59
			this._set("errorMessage", null);                                                                                    // 60
			this._set("infoMessage", message);                                                                                  // 61
			this.ensureMessageVisible();                                                                                        // 62
		},                                                                                                                   // 63
                                                                                                                       // 64
		errorMessage: function(message) {                                                                                    // 65
			this._set("errorMessage", message);                                                                                 // 66
			this._set("infoMessage", null);                                                                                     // 67
			this.ensureMessageVisible();                                                                                        // 68
		},                                                                                                                   // 69
                                                                                                                       // 70
		// is there a visible dialog that shows messages (info and error)                                                    // 71
		isMessageDialogVisible: function () {                                                                                // 72
			return this.get('resetPasswordToken') ||                                                                            // 73
				this.get('enrollAccountToken') ||                                                                                  // 74
				this.get('justVerifiedEmail');                                                                                     // 75
		},                                                                                                                   // 76
                                                                                                                       // 77
		// ensure that somethings displaying a message (info or error) is                                                    // 78
		// visible.  if a dialog with messages is open, do nothing;                                                          // 79
		// otherwise open the dropdown.                                                                                      // 80
		//                                                                                                                   // 81
		// notably this doesn't matter when only displaying a single login                                                   // 82
		// button since then we have an explicit message dialog                                                              // 83
		// (_loginButtonsMessageDialog), and dropdownVisible is ignored in                                                   // 84
		// this case.                                                                                                        // 85
		ensureMessageVisible: function () {                                                                                  // 86
			if (!this.isMessageDialogVisible())                                                                                 // 87
				this.set("dropdownVisible", true);                                                                                 // 88
		},                                                                                                                   // 89
                                                                                                                       // 90
		resetMessages: function () {                                                                                         // 91
			this._set("errorMessage", null);                                                                                    // 92
			this._set("infoMessage", null);                                                                                     // 93
		},                                                                                                                   // 94
                                                                                                                       // 95
		configureService: function (name) {                                                                                  // 96
			this.set('configureLoginServiceDialogVisible', true);                                                               // 97
			this.set('configureLoginServiceDialogServiceName', name);                                                           // 98
			this.set('configureLoginServiceDialogSaveDisabled', true);                                                          // 99
			setTimeout(function(){                                                                                              // 100
				$('#configure-login-service-dialog-modal').modal();                                                                // 101
			}, 500)                                                                                                             // 102
		}                                                                                                                    // 103
	};                                                                                                                    // 104
}) ();                                                                                                                 // 105
                                                                                                                       // 106
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/ian:accounts-ui-bootstrap-3/login_buttons.js                                                               //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
(function() {                                                                                                          // 1
	if (!Accounts._loginButtons)                                                                                          // 2
		Accounts._loginButtons = {};                                                                                         // 3
                                                                                                                       // 4
	// for convenience                                                                                                    // 5
	var loginButtonsSession = Accounts._loginButtonsSession;                                                              // 6
                                                                                                                       // 7
	UI.registerHelper("loginButtons", function() {                                                                        // 8
		return Template._loginButtons;                                                                                       // 9
	});                                                                                                                   // 10
                                                                                                                       // 11
	// shared between dropdown and single mode                                                                            // 12
	Template._loginButtons.events({                                                                                       // 13
		'click #login-buttons-logout': function() {                                                                          // 14
			Meteor.logout(function() {                                                                                          // 15
				loginButtonsSession.closeDropdown();                                                                               // 16
			});                                                                                                                 // 17
		}                                                                                                                    // 18
	});                                                                                                                   // 19
                                                                                                                       // 20
	//                                                                                                                    // 21
	// loginButtonLoggedOut template                                                                                      // 22
	//                                                                                                                    // 23
	Template._loginButtonsLoggedOut.helpers({                                                                             // 24
		dropdown: function() {                                                                                               // 25
			return Accounts._loginButtons.dropdown();                                                                           // 26
		},                                                                                                                   // 27
		services: function() {                                                                                               // 28
			return Accounts._loginButtons.getLoginServices();                                                                   // 29
		},                                                                                                                   // 30
		singleService: function() {                                                                                          // 31
			var services = Accounts._loginButtons.getLoginServices();                                                           // 32
			if (services.length !== 1)                                                                                          // 33
				throw new Error(                                                                                                   // 34
					"Shouldn't be rendering this template with more than one configured service");                                    // 35
			return services[0];                                                                                                 // 36
		},                                                                                                                   // 37
		configurationLoaded: function() {                                                                                    // 38
			return Accounts.loginServicesConfigured();                                                                          // 39
		}                                                                                                                    // 40
	});                                                                                                                   // 41
                                                                                                                       // 42
                                                                                                                       // 43
                                                                                                                       // 44
	//                                                                                                                    // 45
	// loginButtonsLoggedIn template                                                                                      // 46
	//                                                                                                                    // 47
                                                                                                                       // 48
	// decide whether we should show a dropdown rather than a row of                                                      // 49
	// buttons                                                                                                            // 50
	Template._loginButtonsLoggedIn.helpers({                                                                              // 51
		dropdown: function() {                                                                                               // 52
			return Accounts._loginButtons.dropdown();                                                                           // 53
		},                                                                                                                   // 54
		displayName: function() {                                                                                            // 55
			return Accounts._loginButtons.displayName();                                                                        // 56
		}                                                                                                                    // 57
	})                                                                                                                    // 58
                                                                                                                       // 59
                                                                                                                       // 60
                                                                                                                       // 61
	//                                                                                                                    // 62
	// loginButtonsMessage template                                                                                       // 63
	//                                                                                                                    // 64
                                                                                                                       // 65
	Template._loginButtonsMessages.helpers({                                                                              // 66
		errorMessage: function() {                                                                                           // 67
			return loginButtonsSession.get('errorMessage');                                                                     // 68
		},                                                                                                                   // 69
		infoMessage: function() {                                                                                            // 70
			return loginButtonsSession.get('infoMessage');                                                                      // 71
		}                                                                                                                    // 72
	});                                                                                                                   // 73
                                                                                                                       // 74
                                                                                                                       // 75
                                                                                                                       // 76
	//                                                                                                                    // 77
	// helpers                                                                                                            // 78
	//                                                                                                                    // 79
                                                                                                                       // 80
	Accounts._loginButtons.displayName = function() {                                                                     // 81
		var user = Meteor.user();                                                                                            // 82
		if (!user)                                                                                                           // 83
			return '';                                                                                                          // 84
                                                                                                                       // 85
		if (user.profile && user.profile.name)                                                                               // 86
			return user.profile.name;                                                                                           // 87
		if (user.username)                                                                                                   // 88
			return user.username;                                                                                               // 89
		if (user.emails && user.emails[0] && user.emails[0].address)                                                         // 90
			return user.emails[0].address;                                                                                      // 91
                                                                                                                       // 92
		return '';                                                                                                           // 93
	};                                                                                                                    // 94
                                                                                                                       // 95
	Accounts._loginButtons.getLoginServices = function() {                                                                // 96
		// First look for OAuth services.                                                                                    // 97
		var services = Package['accounts-oauth'] ? Accounts.oauth.serviceNames() : [];                                       // 98
                                                                                                                       // 99
		// Be equally kind to all login services. This also preserves                                                        // 100
		// backwards-compatibility. (But maybe order should be                                                               // 101
		// configurable?)                                                                                                    // 102
		services.sort();                                                                                                     // 103
                                                                                                                       // 104
		// Add password, if it's there; it must come last.                                                                   // 105
		if (this.hasPasswordService())                                                                                       // 106
			services.push('password');                                                                                          // 107
                                                                                                                       // 108
		return _.map(services, function(name) {                                                                              // 109
			return {                                                                                                            // 110
				name: name                                                                                                         // 111
			};                                                                                                                  // 112
		});                                                                                                                  // 113
	};                                                                                                                    // 114
                                                                                                                       // 115
	Accounts._loginButtons.hasPasswordService = function() {                                                              // 116
		return !!Package['accounts-password'];                                                                               // 117
	};                                                                                                                    // 118
                                                                                                                       // 119
	Accounts._loginButtons.dropdown = function() {                                                                        // 120
		return this.hasPasswordService() || Accounts._loginButtons.getLoginServices().length > 1;                            // 121
	};                                                                                                                    // 122
                                                                                                                       // 123
	// XXX improve these. should this be in accounts-password instead?                                                    // 124
	//                                                                                                                    // 125
	// XXX these will become configurable, and will be validated on                                                       // 126
	// the server as well.                                                                                                // 127
	Accounts._loginButtons.validateUsername = function(username) {                                                        // 128
		if (username.length >= 3) {                                                                                          // 129
			return true;                                                                                                        // 130
		} else {                                                                                                             // 131
			loginButtonsSession.errorMessage(i18n('errorMessages.usernameTooShort'));                                           // 132
			return false;                                                                                                       // 133
		}                                                                                                                    // 134
	};                                                                                                                    // 135
	Accounts._loginButtons.validateEmail = function(email) {                                                              // 136
		if (Accounts.ui._passwordSignupFields() === "USERNAME_AND_OPTIONAL_EMAIL" && email === '')                           // 137
			return true;                                                                                                        // 138
                                                                                                                       // 139
		var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                                                                                                                       // 141
		if (re.test(email)) {                                                                                                // 142
			return true;                                                                                                        // 143
		} else {                                                                                                             // 144
			loginButtonsSession.errorMessage(i18n('errorMessages.invalidEmail'));                                               // 145
			return false;                                                                                                       // 146
		}                                                                                                                    // 147
	};                                                                                                                    // 148
	Accounts._loginButtons.validatePassword = function(password) {                                                        // 149
		if (password.length >= 6) {                                                                                          // 150
			return true;                                                                                                        // 151
		} else {                                                                                                             // 152
			loginButtonsSession.errorMessage(i18n('errorMessages.passwordTooShort'));                                           // 153
			return false;                                                                                                       // 154
		}                                                                                                                    // 155
	};                                                                                                                    // 156
                                                                                                                       // 157
	Accounts._loginButtons.rendered = function() {                                                                        // 158
		debugger;                                                                                                            // 159
	};                                                                                                                    // 160
                                                                                                                       // 161
})();                                                                                                                  // 162
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/ian:accounts-ui-bootstrap-3/login_buttons_single.js                                                        //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
(function() {                                                                                                          // 1
	// for convenience                                                                                                    // 2
	var loginButtonsSession = Accounts._loginButtonsSession;                                                              // 3
                                                                                                                       // 4
	Template._loginButtonsLoggedOutSingleLoginButton.events({                                                             // 5
		'click .login-button': function() {                                                                                  // 6
			var serviceName = this.name;                                                                                        // 7
			loginButtonsSession.resetMessages();                                                                                // 8
			var callback = function(err) {                                                                                      // 9
				if (!err) {                                                                                                        // 10
					loginButtonsSession.closeDropdown();                                                                              // 11
				} else if (err instanceof Accounts.LoginCancelledError) {                                                          // 12
					// do nothing                                                                                                     // 13
				} else if (err instanceof Accounts.ConfigError) {                                                                  // 14
					loginButtonsSession.configureService(serviceName);                                                                // 15
				} else {                                                                                                           // 16
					loginButtonsSession.errorMessage(err.reason || "Unknown error");                                                  // 17
				}                                                                                                                  // 18
			};                                                                                                                  // 19
                                                                                                                       // 20
			var loginWithService = Meteor["loginWith" + capitalize(serviceName)];                                               // 21
                                                                                                                       // 22
			var options = {}; // use default scope unless specified                                                             // 23
			if (Accounts.ui._options.requestPermissions[serviceName])                                                           // 24
				options.requestPermissions = Accounts.ui._options.requestPermissions[serviceName];                                 // 25
                                                                                                                       // 26
			loginWithService(options, callback);                                                                                // 27
		}                                                                                                                    // 28
	});                                                                                                                   // 29
                                                                                                                       // 30
	Template._loginButtonsLoggedOutSingleLoginButton.helpers({                                                            // 31
		configured: function() {                                                                                             // 32
			return !!Accounts.loginServiceConfiguration.findOne({                                                               // 33
				service: this.name                                                                                                 // 34
			});                                                                                                                 // 35
		},                                                                                                                   // 36
		capitalizedName: function() {                                                                                        // 37
			if (this.name === 'github')                                                                                         // 38
			// XXX we should allow service packages to set their capitalized name                                               // 39
				return 'GitHub';                                                                                                   // 40
			else                                                                                                                // 41
				return capitalize(this.name);                                                                                      // 42
		}                                                                                                                    // 43
	});                                                                                                                   // 44
                                                                                                                       // 45
                                                                                                                       // 46
	// XXX from http://epeli.github.com/underscore.string/lib/underscore.string.js                                        // 47
	var capitalize = function(str) {                                                                                      // 48
		str = str == null ? '' : String(str);                                                                                // 49
		return str.charAt(0).toUpperCase() + str.slice(1);                                                                   // 50
	};                                                                                                                    // 51
})();                                                                                                                  // 52
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/ian:accounts-ui-bootstrap-3/login_buttons_dropdown.js                                                      //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
(function() {                                                                                                          // 1
                                                                                                                       // 2
	// for convenience                                                                                                    // 3
	var loginButtonsSession = Accounts._loginButtonsSession;                                                              // 4
                                                                                                                       // 5
	// events shared between loginButtonsLoggedOutDropdown and                                                            // 6
	// loginButtonsLoggedInDropdown                                                                                       // 7
	Template._loginButtons.events({                                                                                       // 8
		'click input': function(event) {                                                                                     // 9
			event.stopPropagation();                                                                                            // 10
		},                                                                                                                   // 11
		'click #login-name-link, click #login-sign-in-link': function(event) {                                               // 12
			event.stopPropagation();                                                                                            // 13
			loginButtonsSession.set('dropdownVisible', true);                                                                   // 14
			Meteor.flush();                                                                                                     // 15
		},                                                                                                                   // 16
		'click .login-close': function() {                                                                                   // 17
			loginButtonsSession.closeDropdown();                                                                                // 18
		},                                                                                                                   // 19
		'click .dropdown-toggle': function() {                                                                               // 20
			focusInput();                                                                                                       // 21
		}                                                                                                                    // 22
	});                                                                                                                   // 23
                                                                                                                       // 24
	Template._loginButtons.toggleDropdown = function() {                                                                  // 25
		toggleDropdown();                                                                                                    // 26
		focusInput();                                                                                                        // 27
	};                                                                                                                    // 28
                                                                                                                       // 29
	//                                                                                                                    // 30
	// loginButtonsLoggedInDropdown template and related                                                                  // 31
	//                                                                                                                    // 32
                                                                                                                       // 33
	Template._loginButtonsLoggedInDropdown.events({                                                                       // 34
		'click #login-buttons-open-change-password': function(event) {                                                       // 35
			event.stopPropagation();                                                                                            // 36
			loginButtonsSession.resetMessages();                                                                                // 37
			loginButtonsSession.set('inChangePasswordFlow', true);                                                              // 38
			Meteor.flush();                                                                                                     // 39
		}                                                                                                                    // 40
	});                                                                                                                   // 41
                                                                                                                       // 42
	Template._loginButtonsLoggedInDropdown.helpers({                                                                      // 43
		displayName: function() {                                                                                            // 44
			return Accounts._loginButtons.displayName();                                                                        // 45
		},                                                                                                                   // 46
                                                                                                                       // 47
		inChangePasswordFlow: function() {                                                                                   // 48
			return loginButtonsSession.get('inChangePasswordFlow');                                                             // 49
		},                                                                                                                   // 50
                                                                                                                       // 51
		inMessageOnlyFlow: function() {                                                                                      // 52
			return loginButtonsSession.get('inMessageOnlyFlow');                                                                // 53
		},                                                                                                                   // 54
                                                                                                                       // 55
		dropdownVisible: function() {                                                                                        // 56
			return loginButtonsSession.get('dropdownVisible');                                                                  // 57
		}                                                                                                                    // 58
	});                                                                                                                   // 59
                                                                                                                       // 60
                                                                                                                       // 61
	Template._loginButtonsLoggedInDropdownActions.helpers({                                                               // 62
		allowChangingPassword: function() {                                                                                  // 63
			// it would be more correct to check whether the user has a password set,                                           // 64
			// but in order to do that we'd have to send more data down to the client,                                          // 65
			// and it'd be preferable not to send down the entire service.password document.                                    // 66
			//                                                                                                                  // 67
			// instead we use the heuristic: if the user has a username or email set.                                           // 68
			var user = Meteor.user();                                                                                           // 69
			return user.username || (user.emails && user.emails[0] && user.emails[0].address);                                  // 70
		},                                                                                                                   // 71
		additionalLoggedInDropdownActions: function() {                                                                      // 72
			return Template._loginButtonsAdditionalLoggedInDropdownActions !== undefined;                                       // 73
		}                                                                                                                    // 74
	});                                                                                                                   // 75
                                                                                                                       // 76
                                                                                                                       // 77
	//                                                                                                                    // 78
	// loginButtonsLoggedOutDropdown template and related                                                                 // 79
	//                                                                                                                    // 80
                                                                                                                       // 81
	Template._loginButtonsLoggedOutDropdown.events({                                                                      // 82
		'click #login-buttons-password': function(event) {                                                                   // 83
			event.stopPropagation();                                                                                            // 84
			loginOrSignup();                                                                                                    // 85
		},                                                                                                                   // 86
                                                                                                                       // 87
		'keypress #forgot-password-email': function(event) {                                                                 // 88
			event.stopPropagation();                                                                                            // 89
			if (event.keyCode === 13)                                                                                           // 90
				forgotPassword();                                                                                                  // 91
		},                                                                                                                   // 92
                                                                                                                       // 93
		'click #login-buttons-forgot-password': function(event) {                                                            // 94
			event.stopPropagation();                                                                                            // 95
			forgotPassword();                                                                                                   // 96
		},                                                                                                                   // 97
                                                                                                                       // 98
		'click #signup-link': function(event) {                                                                              // 99
			event.stopPropagation();                                                                                            // 100
			loginButtonsSession.resetMessages();                                                                                // 101
                                                                                                                       // 102
			// store values of fields before swtiching to the signup form                                                       // 103
			var username = trimmedElementValueById('login-username');                                                           // 104
			var email = trimmedElementValueById('login-email');                                                                 // 105
			var usernameOrEmail = trimmedElementValueById('login-username-or-email');                                           // 106
			// notably not trimmed. a password could (?) start or end with a space                                              // 107
			var password = elementValueById('login-password');                                                                  // 108
                                                                                                                       // 109
			loginButtonsSession.set('inSignupFlow', true);                                                                      // 110
			loginButtonsSession.set('inForgotPasswordFlow', false);                                                             // 111
                                                                                                                       // 112
			// force the ui to update so that we have the approprate fields to fill in                                          // 113
			Meteor.flush();                                                                                                     // 114
                                                                                                                       // 115
			// update new fields with appropriate defaults                                                                      // 116
			if (username !== null)                                                                                              // 117
				document.getElementById('login-username').value = username;                                                        // 118
			else if (email !== null)                                                                                            // 119
				document.getElementById('login-email').value = email;                                                              // 120
			else if (usernameOrEmail !== null)                                                                                  // 121
				if (usernameOrEmail.indexOf('@') === -1)                                                                           // 122
					document.getElementById('login-username').value = usernameOrEmail;                                                // 123
				else                                                                                                               // 124
					document.getElementById('login-email').value = usernameOrEmail;                                                   // 125
		},                                                                                                                   // 126
		'click #forgot-password-link': function(event) {                                                                     // 127
			event.stopPropagation();                                                                                            // 128
			loginButtonsSession.resetMessages();                                                                                // 129
                                                                                                                       // 130
			// store values of fields before swtiching to the signup form                                                       // 131
			var email = trimmedElementValueById('login-email');                                                                 // 132
			var usernameOrEmail = trimmedElementValueById('login-username-or-email');                                           // 133
                                                                                                                       // 134
			loginButtonsSession.set('inSignupFlow', false);                                                                     // 135
			loginButtonsSession.set('inForgotPasswordFlow', true);                                                              // 136
                                                                                                                       // 137
			// force the ui to update so that we have the approprate fields to fill in                                          // 138
			Meteor.flush();                                                                                                     // 139
			//toggleDropdown();                                                                                                 // 140
                                                                                                                       // 141
			// update new fields with appropriate defaults                                                                      // 142
			if (email !== null)                                                                                                 // 143
				document.getElementById('forgot-password-email').value = email;                                                    // 144
			else if (usernameOrEmail !== null)                                                                                  // 145
				if (usernameOrEmail.indexOf('@') !== -1)                                                                           // 146
					document.getElementById('forgot-password-email').value = usernameOrEmail;                                         // 147
		},                                                                                                                   // 148
		'click #back-to-login-link': function(event) {                                                                       // 149
			event.stopPropagation();                                                                                            // 150
			loginButtonsSession.resetMessages();                                                                                // 151
                                                                                                                       // 152
			var username = trimmedElementValueById('login-username');                                                           // 153
			var email = trimmedElementValueById('login-email') || trimmedElementValueById('forgot-password-email'); // Ughh. Standardize on names?
                                                                                                                       // 155
			loginButtonsSession.set('inSignupFlow', false);                                                                     // 156
			loginButtonsSession.set('inForgotPasswordFlow', false);                                                             // 157
                                                                                                                       // 158
			// force the ui to update so that we have the approprate fields to fill in                                          // 159
			Meteor.flush();                                                                                                     // 160
                                                                                                                       // 161
			if (document.getElementById('login-username'))                                                                      // 162
				document.getElementById('login-username').value = username;                                                        // 163
			if (document.getElementById('login-email'))                                                                         // 164
				document.getElementById('login-email').value = email;                                                              // 165
			// "login-password" is preserved thanks to the preserve-inputs package                                              // 166
			if (document.getElementById('login-username-or-email'))                                                             // 167
				document.getElementById('login-username-or-email').value = email || username;                                      // 168
		},                                                                                                                   // 169
		'keypress #login-username, keypress #login-email, keypress #login-username-or-email, keypress #login-password, keypress #login-password-again': function(event) {
			if (event.keyCode === 13)                                                                                           // 171
				loginOrSignup();                                                                                                   // 172
		}                                                                                                                    // 173
	});                                                                                                                   // 174
                                                                                                                       // 175
                                                                                                                       // 176
	Template._loginButtonsLoggedOutDropdown.helpers({                                                                     // 177
		// additional classes that can be helpful in styling the dropdown                                                    // 178
		additionalClasses: function() {                                                                                      // 179
			if (!Accounts.password) {                                                                                           // 180
				return false;                                                                                                      // 181
			} else {                                                                                                            // 182
				if (loginButtonsSession.get('inSignupFlow')) {                                                                     // 183
					return 'login-form-create-account';                                                                               // 184
				} else if (loginButtonsSession.get('inForgotPasswordFlow')) {                                                      // 185
					return 'login-form-forgot-password';                                                                              // 186
				} else {                                                                                                           // 187
					return 'login-form-sign-in';                                                                                      // 188
				}                                                                                                                  // 189
			}                                                                                                                   // 190
		},                                                                                                                   // 191
                                                                                                                       // 192
		dropdownVisible: function() {                                                                                        // 193
			return loginButtonsSession.get('dropdownVisible');                                                                  // 194
		},                                                                                                                   // 195
                                                                                                                       // 196
		hasPasswordService: function() {                                                                                     // 197
			return Accounts._loginButtons.hasPasswordService();                                                                 // 198
		},                                                                                                                   // 199
                                                                                                                       // 200
		forbidClientAccountCreation: function() {                                                                            // 201
			return Accounts._options.forbidClientAccountCreation;                                                               // 202
		}                                                                                                                    // 203
	});                                                                                                                   // 204
                                                                                                                       // 205
	Template._loginButtonsLoggedOutAllServices.helpers({                                                                  // 206
		services: function() {                                                                                               // 207
			return Accounts._loginButtons.getLoginServices();                                                                   // 208
		},                                                                                                                   // 209
                                                                                                                       // 210
		isPasswordService: function() {                                                                                      // 211
			return this.name === 'password';                                                                                    // 212
		},                                                                                                                   // 213
                                                                                                                       // 214
		hasOtherServices: function() {                                                                                       // 215
			return Accounts._loginButtons.getLoginServices().length > 1;                                                        // 216
		},                                                                                                                   // 217
                                                                                                                       // 218
		hasPasswordService: function() {                                                                                     // 219
			return Accounts._loginButtons.hasPasswordService();                                                                 // 220
		}                                                                                                                    // 221
	});                                                                                                                   // 222
                                                                                                                       // 223
                                                                                                                       // 224
	Template._loginButtonsLoggedOutPasswordService.helpers({                                                              // 225
		fields: function() {                                                                                                 // 226
			var loginFields = [{                                                                                                // 227
				fieldName: 'username-or-email',                                                                                    // 228
				fieldLabel: i18n('loginFields.usernameOrEmail'),                                                                   // 229
				visible: function() {                                                                                              // 230
					return _.contains(                                                                                                // 231
						["USERNAME_AND_EMAIL_CONFIRM", "USERNAME_AND_EMAIL", "USERNAME_AND_OPTIONAL_EMAIL"],                             // 232
						Accounts.ui._passwordSignupFields());                                                                            // 233
				}                                                                                                                  // 234
			}, {                                                                                                                // 235
				fieldName: 'username',                                                                                             // 236
				fieldLabel: i18n('loginFields.username'),                                                                          // 237
				visible: function() {                                                                                              // 238
					return Accounts.ui._passwordSignupFields() === "USERNAME_ONLY";                                                   // 239
				}                                                                                                                  // 240
			}, {                                                                                                                // 241
				fieldName: 'email',                                                                                                // 242
				fieldLabel: i18n('loginFields.email'),                                                                             // 243
				inputType: 'email',                                                                                                // 244
				visible: function() {                                                                                              // 245
					return Accounts.ui._passwordSignupFields() === "EMAIL_ONLY";                                                      // 246
				}                                                                                                                  // 247
			}, {                                                                                                                // 248
				fieldName: 'password',                                                                                             // 249
				fieldLabel: i18n('loginFields.password'),                                                                          // 250
				inputType: 'password',                                                                                             // 251
				visible: function() {                                                                                              // 252
					return true;                                                                                                      // 253
				}                                                                                                                  // 254
			}];                                                                                                                 // 255
                                                                                                                       // 256
			var signupFields = [{                                                                                               // 257
				fieldName: 'username',                                                                                             // 258
				fieldLabel: i18n('signupFields.username'),                                                                         // 259
				visible: function() {                                                                                              // 260
					return _.contains(                                                                                                // 261
						["USERNAME_AND_EMAIL_CONFIRM", "USERNAME_AND_EMAIL", "USERNAME_AND_OPTIONAL_EMAIL", "USERNAME_ONLY"],            // 262
						Accounts.ui._passwordSignupFields());                                                                            // 263
				}                                                                                                                  // 264
			}, {                                                                                                                // 265
				fieldName: 'email',                                                                                                // 266
				fieldLabel: i18n('signupFields.email'),                                                                            // 267
				inputType: 'email',                                                                                                // 268
				visible: function() {                                                                                              // 269
					return _.contains(                                                                                                // 270
						["USERNAME_AND_EMAIL_CONFIRM", "USERNAME_AND_EMAIL", "EMAIL_ONLY"],                                              // 271
						Accounts.ui._passwordSignupFields());                                                                            // 272
				}                                                                                                                  // 273
			}, {                                                                                                                // 274
				fieldName: 'email',                                                                                                // 275
				fieldLabel: i18n('signupFields.emailOpt'),                                                                         // 276
				inputType: 'email',                                                                                                // 277
				visible: function() {                                                                                              // 278
					return Accounts.ui._passwordSignupFields() === "USERNAME_AND_OPTIONAL_EMAIL";                                     // 279
				}                                                                                                                  // 280
			}, {                                                                                                                // 281
				fieldName: 'password',                                                                                             // 282
				fieldLabel: i18n('signupFields.password'),                                                                         // 283
				inputType: 'password',                                                                                             // 284
				visible: function() {                                                                                              // 285
					return true;                                                                                                      // 286
				}                                                                                                                  // 287
			}, {                                                                                                                // 288
				fieldName: 'password-again',                                                                                       // 289
				fieldLabel: i18n('signupFields.passwordAgain'),                                                                    // 290
				inputType: 'password',                                                                                             // 291
				visible: function() {                                                                                              // 292
					// No need to make users double-enter their password if                                                           // 293
					// they'll necessarily have an email set, since they can use                                                      // 294
					// the "forgot password" flow.                                                                                    // 295
					return _.contains(                                                                                                // 296
						["USERNAME_AND_EMAIL_CONFIRM", "USERNAME_AND_OPTIONAL_EMAIL", "USERNAME_ONLY"],                                  // 297
						Accounts.ui._passwordSignupFields());                                                                            // 298
				}                                                                                                                  // 299
			}];                                                                                                                 // 300
                                                                                                                       // 301
			signupFields = Accounts.ui._options.extraSignupFields.concat(signupFields);                                         // 302
                                                                                                                       // 303
			return loginButtonsSession.get('inSignupFlow') ? signupFields : loginFields;                                        // 304
		},                                                                                                                   // 305
                                                                                                                       // 306
		inForgotPasswordFlow: function() {                                                                                   // 307
			return loginButtonsSession.get('inForgotPasswordFlow');                                                             // 308
		},                                                                                                                   // 309
                                                                                                                       // 310
		inLoginFlow: function() {                                                                                            // 311
			return !loginButtonsSession.get('inSignupFlow') && !loginButtonsSession.get('inForgotPasswordFlow');                // 312
		},                                                                                                                   // 313
                                                                                                                       // 314
		inSignupFlow: function() {                                                                                           // 315
			return loginButtonsSession.get('inSignupFlow');                                                                     // 316
		},                                                                                                                   // 317
                                                                                                                       // 318
		showForgotPasswordLink: function() {                                                                                 // 319
			return _.contains(                                                                                                  // 320
				["USERNAME_AND_EMAIL_CONFIRM", "USERNAME_AND_EMAIL", "USERNAME_AND_OPTIONAL_EMAIL", "EMAIL_ONLY"],                 // 321
				Accounts.ui._passwordSignupFields());                                                                              // 322
		},                                                                                                                   // 323
                                                                                                                       // 324
		showCreateAccountLink: function() {                                                                                  // 325
			return !Accounts._options.forbidClientAccountCreation;                                                              // 326
		}                                                                                                                    // 327
	});                                                                                                                   // 328
                                                                                                                       // 329
	Template._loginButtonsFormField.helpers({                                                                             // 330
		inputType: function() {                                                                                              // 331
			return this.inputType || "text";                                                                                    // 332
		}                                                                                                                    // 333
	});                                                                                                                   // 334
                                                                                                                       // 335
	//                                                                                                                    // 336
	// loginButtonsChangePassword template                                                                                // 337
	//                                                                                                                    // 338
	Template._loginButtonsChangePassword.events({                                                                         // 339
		'keypress #login-old-password, keypress #login-password, keypress #login-password-again': function(event) {          // 340
			if (event.keyCode === 13)                                                                                           // 341
				changePassword();                                                                                                  // 342
		},                                                                                                                   // 343
		'click #login-buttons-do-change-password': function(event) {                                                         // 344
			event.stopPropagation();                                                                                            // 345
			changePassword();                                                                                                   // 346
		},                                                                                                                   // 347
		'click #login-buttons-cancel-change-password': function(event) {                                                     // 348
			event.stopPropagation();                                                                                            // 349
			loginButtonsSession.resetMessages();                                                                                // 350
			Accounts._loginButtonsSession.set('inChangePasswordFlow', false);                                                   // 351
			Meteor.flush();                                                                                                     // 352
		}                                                                                                                    // 353
	});                                                                                                                   // 354
                                                                                                                       // 355
	Template._loginButtonsChangePassword.helpers({                                                                        // 356
		fields: function() {                                                                                                 // 357
			return [{                                                                                                           // 358
				fieldName: 'old-password',                                                                                         // 359
				fieldLabel: i18n('changePasswordFields.currentPassword'),                                                          // 360
				inputType: 'password',                                                                                             // 361
				visible: function() {                                                                                              // 362
					return true;                                                                                                      // 363
				}                                                                                                                  // 364
			}, {                                                                                                                // 365
				fieldName: 'password',                                                                                             // 366
				fieldLabel: i18n('changePasswordFields.newPassword'),                                                              // 367
				inputType: 'password',                                                                                             // 368
				visible: function() {                                                                                              // 369
					return true;                                                                                                      // 370
				}                                                                                                                  // 371
			}, {                                                                                                                // 372
				fieldName: 'password-again',                                                                                       // 373
				fieldLabel: i18n('changePasswordFields.newPasswordAgain'),                                                         // 374
				inputType: 'password',                                                                                             // 375
				visible: function() {                                                                                              // 376
					// No need to make users double-enter their password if                                                           // 377
					// they'll necessarily have an email set, since they can use                                                      // 378
					// the "forgot password" flow.                                                                                    // 379
					return _.contains(                                                                                                // 380
						["USERNAME_AND_OPTIONAL_EMAIL", "USERNAME_ONLY"],                                                                // 381
						Accounts.ui._passwordSignupFields());                                                                            // 382
				}                                                                                                                  // 383
			}];                                                                                                                 // 384
		}                                                                                                                    // 385
	});                                                                                                                   // 386
                                                                                                                       // 387
	//                                                                                                                    // 388
	// helpers                                                                                                            // 389
	//                                                                                                                    // 390
                                                                                                                       // 391
	var elementValueById = function(id) {                                                                                 // 392
		var element = document.getElementById(id);                                                                           // 393
		if (!element)                                                                                                        // 394
			return null;                                                                                                        // 395
		else                                                                                                                 // 396
			return element.value;                                                                                               // 397
	};                                                                                                                    // 398
                                                                                                                       // 399
	var trimmedElementValueById = function(id) {                                                                          // 400
		var element = document.getElementById(id);                                                                           // 401
		if (!element)                                                                                                        // 402
			return null;                                                                                                        // 403
		else                                                                                                                 // 404
			return element.value.replace(/^\s*|\s*$/g, ""); // trim;                                                            // 405
	};                                                                                                                    // 406
                                                                                                                       // 407
	var loginOrSignup = function() {                                                                                      // 408
		if (loginButtonsSession.get('inSignupFlow'))                                                                         // 409
			signup();                                                                                                           // 410
		else                                                                                                                 // 411
			login();                                                                                                            // 412
	};                                                                                                                    // 413
                                                                                                                       // 414
	var login = function() {                                                                                              // 415
		loginButtonsSession.resetMessages();                                                                                 // 416
                                                                                                                       // 417
		var username = trimmedElementValueById('login-username');                                                            // 418
		var email = trimmedElementValueById('login-email');                                                                  // 419
		var usernameOrEmail = trimmedElementValueById('login-username-or-email');                                            // 420
		// notably not trimmed. a password could (?) start or end with a space                                               // 421
		var password = elementValueById('login-password');                                                                   // 422
                                                                                                                       // 423
		var loginSelector;                                                                                                   // 424
		if (username !== null) {                                                                                             // 425
			if (!Accounts._loginButtons.validateUsername(username))                                                             // 426
				return;                                                                                                            // 427
			else                                                                                                                // 428
				loginSelector = {                                                                                                  // 429
					username: username                                                                                                // 430
				};                                                                                                                 // 431
		} else if (email !== null) {                                                                                         // 432
			if (!Accounts._loginButtons.validateEmail(email))                                                                   // 433
				return;                                                                                                            // 434
			else                                                                                                                // 435
				loginSelector = {                                                                                                  // 436
					email: email                                                                                                      // 437
				};                                                                                                                 // 438
		} else if (usernameOrEmail !== null) {                                                                               // 439
			// XXX not sure how we should validate this. but this seems good enough (for now),                                  // 440
			// since an email must have at least 3 characters anyways                                                           // 441
			if (!Accounts._loginButtons.validateUsername(usernameOrEmail))                                                      // 442
				return;                                                                                                            // 443
			else                                                                                                                // 444
				loginSelector = usernameOrEmail;                                                                                   // 445
		} else {                                                                                                             // 446
			throw new Error("Unexpected -- no element to use as a login user selector");                                        // 447
		}                                                                                                                    // 448
                                                                                                                       // 449
		Meteor.loginWithPassword(loginSelector, password, function(error, result) {                                          // 450
			if (error) {                                                                                                        // 451
				loginButtonsSession.errorMessage(error.reason || "Unknown error");                                                 // 452
			} else {                                                                                                            // 453
				loginButtonsSession.closeDropdown();                                                                               // 454
			}                                                                                                                   // 455
		});                                                                                                                  // 456
	};                                                                                                                    // 457
                                                                                                                       // 458
	var toggleDropdown = function() {                                                                                     // 459
		$("#login-dropdown-list").toggleClass("open");                                                                       // 460
	}                                                                                                                     // 461
                                                                                                                       // 462
	var focusInput = function() {                                                                                         // 463
		setTimeout(function() {                                                                                              // 464
			$("#login-dropdown-list input").first().focus();                                                                    // 465
		}, 0);                                                                                                               // 466
	};                                                                                                                    // 467
                                                                                                                       // 468
	var signup = function() {                                                                                             // 469
		loginButtonsSession.resetMessages();                                                                                 // 470
                                                                                                                       // 471
		var options = {}; // to be passed to Accounts.createUser                                                             // 472
                                                                                                                       // 473
		var username = trimmedElementValueById('login-username');                                                            // 474
		if (username !== null) {                                                                                             // 475
			if (!Accounts._loginButtons.validateUsername(username))                                                             // 476
				return;                                                                                                            // 477
			else                                                                                                                // 478
				options.username = username;                                                                                       // 479
		}                                                                                                                    // 480
                                                                                                                       // 481
		var email = trimmedElementValueById('login-email');                                                                  // 482
		if (email !== null) {                                                                                                // 483
			if (!Accounts._loginButtons.validateEmail(email))                                                                   // 484
				return;                                                                                                            // 485
			else                                                                                                                // 486
				options.email = email;                                                                                             // 487
		}                                                                                                                    // 488
                                                                                                                       // 489
		// notably not trimmed. a password could (?) start or end with a space                                               // 490
		var password = elementValueById('login-password');                                                                   // 491
		if (!Accounts._loginButtons.validatePassword(password))                                                              // 492
			return;                                                                                                             // 493
		else                                                                                                                 // 494
			options.password = password;                                                                                        // 495
                                                                                                                       // 496
		if (!matchPasswordAgainIfPresent())                                                                                  // 497
			return;                                                                                                             // 498
                                                                                                                       // 499
		// prepare the profile object                                                                                        // 500
		options.profile = {};                                                                                                // 501
                                                                                                                       // 502
		// define a proxy function to allow extraSignupFields set error messages                                             // 503
		var errorFn = function(errorMessage) {                                                                               // 504
			Accounts._loginButtonsSession.errorMessage(errorMessage);                                                           // 505
		};                                                                                                                   // 506
                                                                                                                       // 507
		var invalidExtraSignupFields = false;                                                                                // 508
                                                                                                                       // 509
		// parse extraSignupFields to populate account's profile data                                                        // 510
		_.each(Accounts.ui._options.extraSignupFields, function(field, index) {                                              // 511
			var value = elementValueById('login-' + field.fieldName);                                                           // 512
			if (typeof field.validate === 'function') {                                                                         // 513
				if (field.validate(value, errorFn)) {                                                                              // 514
					options.profile[field.fieldName] = elementValueById('login-' + field.fieldName);                                  // 515
				} else {                                                                                                           // 516
					invalidExtraSignupFields = true;                                                                                  // 517
				}                                                                                                                  // 518
			} else {                                                                                                            // 519
				options.profile[field.fieldName] = elementValueById('login-' + field.fieldName);                                   // 520
			}                                                                                                                   // 521
		});                                                                                                                  // 522
                                                                                                                       // 523
		if (invalidExtraSignupFields)                                                                                        // 524
			return;                                                                                                             // 525
                                                                                                                       // 526
		Accounts.createUser(options, function(error) {                                                                       // 527
			if (error) {                                                                                                        // 528
				loginButtonsSession.errorMessage(error.reason || "Unknown error");                                                 // 529
			} else {                                                                                                            // 530
				loginButtonsSession.closeDropdown();                                                                               // 531
			}                                                                                                                   // 532
		});                                                                                                                  // 533
	};                                                                                                                    // 534
                                                                                                                       // 535
	var forgotPassword = function() {                                                                                     // 536
		loginButtonsSession.resetMessages();                                                                                 // 537
                                                                                                                       // 538
		var email = trimmedElementValueById("forgot-password-email");                                                        // 539
		if (email.indexOf('@') !== -1) {                                                                                     // 540
			Accounts.forgotPassword({                                                                                           // 541
				email: email                                                                                                       // 542
			}, function(error) {                                                                                                // 543
				if (error)                                                                                                         // 544
					loginButtonsSession.errorMessage(error.reason || "Unknown error");                                                // 545
				else                                                                                                               // 546
					loginButtonsSession.infoMessage(i18n('forgotPasswordForm.sent'));                                                 // 547
			});                                                                                                                 // 548
		} else {                                                                                                             // 549
			loginButtonsSession.errorMessage(i18n('forgotPasswordForm.invalidEmail'));                                          // 550
		}                                                                                                                    // 551
	};                                                                                                                    // 552
                                                                                                                       // 553
	var changePassword = function() {                                                                                     // 554
		loginButtonsSession.resetMessages();                                                                                 // 555
                                                                                                                       // 556
		// notably not trimmed. a password could (?) start or end with a space                                               // 557
		var oldPassword = elementValueById('login-old-password');                                                            // 558
                                                                                                                       // 559
		// notably not trimmed. a password could (?) start or end with a space                                               // 560
		var password = elementValueById('login-password');                                                                   // 561
		if (!Accounts._loginButtons.validatePassword(password))                                                              // 562
			return;                                                                                                             // 563
                                                                                                                       // 564
		if (!matchPasswordAgainIfPresent())                                                                                  // 565
			return;                                                                                                             // 566
                                                                                                                       // 567
		Accounts.changePassword(oldPassword, password, function(error) {                                                     // 568
			if (error) {                                                                                                        // 569
				loginButtonsSession.errorMessage(error.reason || "Unknown error");                                                 // 570
			} else {                                                                                                            // 571
				loginButtonsSession.infoMessage("Password changed");                                                               // 572
                                                                                                                       // 573
				// wait 3 seconds, then expire the msg                                                                             // 574
				Meteor.setTimeout(function() {                                                                                     // 575
					loginButtonsSession.resetMessages();                                                                              // 576
				}, 3000);                                                                                                          // 577
			}                                                                                                                   // 578
		});                                                                                                                  // 579
	};                                                                                                                    // 580
                                                                                                                       // 581
	var matchPasswordAgainIfPresent = function() {                                                                        // 582
		// notably not trimmed. a password could (?) start or end with a space                                               // 583
		var passwordAgain = elementValueById('login-password-again');                                                        // 584
		if (passwordAgain !== null) {                                                                                        // 585
			// notably not trimmed. a password could (?) start or end with a space                                              // 586
			var password = elementValueById('login-password');                                                                  // 587
			if (password !== passwordAgain) {                                                                                   // 588
				loginButtonsSession.errorMessage(i18n('errorMessages.passwordsDontMatch'));                                        // 589
				return false;                                                                                                      // 590
			}                                                                                                                   // 591
		}                                                                                                                    // 592
		return true;                                                                                                         // 593
	};                                                                                                                    // 594
})();                                                                                                                  // 595
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/ian:accounts-ui-bootstrap-3/login_buttons_dialogs.js                                                       //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
(function() {                                                                                                          // 1
	// for convenience                                                                                                    // 2
	var loginButtonsSession = Accounts._loginButtonsSession;                                                              // 3
                                                                                                                       // 4
                                                                                                                       // 5
	//                                                                                                                    // 6
	// populate the session so that the appropriate dialogs are                                                           // 7
	// displayed by reading variables set by accounts-urls, which parses                                                  // 8
	// special URLs. since accounts-ui depends on accounts-urls, we are                                                   // 9
	// guaranteed to have these set at this point.                                                                        // 10
	//                                                                                                                    // 11
                                                                                                                       // 12
	if (Accounts._resetPasswordToken) {                                                                                   // 13
		loginButtonsSession.set('resetPasswordToken', Accounts._resetPasswordToken);                                         // 14
	}                                                                                                                     // 15
                                                                                                                       // 16
	if (Accounts._enrollAccountToken) {                                                                                   // 17
		loginButtonsSession.set('enrollAccountToken', Accounts._enrollAccountToken);                                         // 18
	}                                                                                                                     // 19
                                                                                                                       // 20
	// Needs to be in Meteor.startup because of a package loading order                                                   // 21
	// issue. We can't be sure that accounts-password is loaded earlier                                                   // 22
	// than accounts-ui so Accounts.verifyEmail might not be defined.                                                     // 23
	Meteor.startup(function() {                                                                                           // 24
		if (Accounts._verifyEmailToken) {                                                                                    // 25
			Accounts.verifyEmail(Accounts._verifyEmailToken, function(error) {                                                  // 26
				Accounts._enableAutoLogin();                                                                                       // 27
				if (!error)                                                                                                        // 28
					loginButtonsSession.set('justVerifiedEmail', true);                                                               // 29
				// XXX show something if there was an error.                                                                       // 30
			});                                                                                                                 // 31
		}                                                                                                                    // 32
	});                                                                                                                   // 33
                                                                                                                       // 34
	//                                                                                                                    // 35
	// resetPasswordDialog template                                                                                       // 36
	//                                                                                                                    // 37
                                                                                                                       // 38
	Template._resetPasswordDialog.events({                                                                                // 39
		'click #login-buttons-reset-password-button': function(event) {                                                      // 40
			event.stopPropagation();                                                                                            // 41
			resetPassword();                                                                                                    // 42
		},                                                                                                                   // 43
		'keypress #reset-password-new-password': function(event) {                                                           // 44
			if (event.keyCode === 13)                                                                                           // 45
				resetPassword();                                                                                                   // 46
		},                                                                                                                   // 47
		'click #login-buttons-cancel-reset-password': function(event) {                                                      // 48
			event.stopPropagation();                                                                                            // 49
			loginButtonsSession.set('resetPasswordToken', null);                                                                // 50
			Accounts._enableAutoLogin();                                                                                        // 51
			$('#login-buttons-reset-password-modal').modal("hide");                                                             // 52
		}                                                                                                                    // 53
	});                                                                                                                   // 54
                                                                                                                       // 55
	var resetPassword = function() {                                                                                      // 56
		loginButtonsSession.resetMessages();                                                                                 // 57
		var newPassword = document.getElementById('reset-password-new-password').value;                                      // 58
		if (!Accounts._loginButtons.validatePassword(newPassword))                                                           // 59
			return;                                                                                                             // 60
                                                                                                                       // 61
		Accounts.resetPassword(                                                                                              // 62
			loginButtonsSession.get('resetPasswordToken'), newPassword,                                                         // 63
			function(error) {                                                                                                   // 64
				if (error) {                                                                                                       // 65
					loginButtonsSession.errorMessage(error.reason || "Unknown error");                                                // 66
				} else {                                                                                                           // 67
					loginButtonsSession.set('resetPasswordToken', null);                                                              // 68
					Accounts._enableAutoLogin();                                                                                      // 69
					$('#login-buttons-reset-password-modal').modal("hide");                                                           // 70
				}                                                                                                                  // 71
			});                                                                                                                 // 72
	};                                                                                                                    // 73
                                                                                                                       // 74
	Template._resetPasswordDialog.helpers({                                                                               // 75
		inResetPasswordFlow: function() {                                                                                    // 76
			return loginButtonsSession.get('resetPasswordToken');                                                               // 77
		}                                                                                                                    // 78
	});                                                                                                                   // 79
                                                                                                                       // 80
	Template._resetPasswordDialog.rendered = function() {                                                                 // 81
		var $modal = $(this.find('#login-buttons-reset-password-modal'));                                                    // 82
		$modal.modal();                                                                                                      // 83
	};                                                                                                                    // 84
                                                                                                                       // 85
	//                                                                                                                    // 86
	// enrollAccountDialog template                                                                                       // 87
	//                                                                                                                    // 88
                                                                                                                       // 89
	Template._enrollAccountDialog.events({                                                                                // 90
		'click #login-buttons-enroll-account-button': function() {                                                           // 91
			enrollAccount();                                                                                                    // 92
		},                                                                                                                   // 93
		'keypress #enroll-account-password': function(event) {                                                               // 94
			if (event.keyCode === 13)                                                                                           // 95
				enrollAccount();                                                                                                   // 96
		},                                                                                                                   // 97
		'click #login-buttons-cancel-enroll-account-button': function() {                                                    // 98
			loginButtonsSession.set('enrollAccountToken', null);                                                                // 99
			Accounts._enableAutoLogin();                                                                                        // 100
			$modal.modal("hide");                                                                                               // 101
		}                                                                                                                    // 102
	});                                                                                                                   // 103
                                                                                                                       // 104
	var enrollAccount = function() {                                                                                      // 105
		loginButtonsSession.resetMessages();                                                                                 // 106
		var password = document.getElementById('enroll-account-password').value;                                             // 107
		if (!Accounts._loginButtons.validatePassword(password))                                                              // 108
			return;                                                                                                             // 109
                                                                                                                       // 110
		Accounts.resetPassword(                                                                                              // 111
			loginButtonsSession.get('enrollAccountToken'), password,                                                            // 112
			function(error) {                                                                                                   // 113
				if (error) {                                                                                                       // 114
					loginButtonsSession.errorMessage(error.reason || "Unknown error");                                                // 115
				} else {                                                                                                           // 116
					loginButtonsSession.set('enrollAccountToken', null);                                                              // 117
					Accounts._enableAutoLogin();                                                                                      // 118
					$modal.modal("hide");                                                                                             // 119
				}                                                                                                                  // 120
			});                                                                                                                 // 121
	};                                                                                                                    // 122
                                                                                                                       // 123
	Template._enrollAccountDialog.helpers({                                                                               // 124
		inEnrollAccountFlow: function() {                                                                                    // 125
			return loginButtonsSession.get('enrollAccountToken');                                                               // 126
		}                                                                                                                    // 127
	});                                                                                                                   // 128
                                                                                                                       // 129
	Template._enrollAccountDialog.rendered = function() {                                                                 // 130
		$modal = $(this.find('#login-buttons-enroll-account-modal'));                                                        // 131
		$modal.modal();                                                                                                      // 132
	};                                                                                                                    // 133
                                                                                                                       // 134
	//                                                                                                                    // 135
	// justVerifiedEmailDialog template                                                                                   // 136
	//                                                                                                                    // 137
                                                                                                                       // 138
	Template._justVerifiedEmailDialog.events({                                                                            // 139
		'click #just-verified-dismiss-button': function() {                                                                  // 140
			loginButtonsSession.set('justVerifiedEmail', false);                                                                // 141
		}                                                                                                                    // 142
	});                                                                                                                   // 143
                                                                                                                       // 144
	Template._justVerifiedEmailDialog.helpers({                                                                           // 145
		visible: function() {                                                                                                // 146
			if (loginButtonsSession.get('justVerifiedEmail')) {                                                                 // 147
				setTimeout(function() {                                                                                            // 148
					$('#login-buttons-email-address-verified-modal').modal()                                                          // 149
				}, 500)                                                                                                            // 150
			}                                                                                                                   // 151
			return loginButtonsSession.get('justVerifiedEmail');                                                                // 152
		}                                                                                                                    // 153
	});                                                                                                                   // 154
                                                                                                                       // 155
                                                                                                                       // 156
	//                                                                                                                    // 157
	// loginButtonsMessagesDialog template                                                                                // 158
	//                                                                                                                    // 159
                                                                                                                       // 160
	// Template._loginButtonsMessagesDialog.rendered = function() {                                                       // 161
	//   var $modal = $(this.find('#configure-login-service-dialog-modal'));                                              // 162
	//   $modal.modal();                                                                                                  // 163
	// }                                                                                                                  // 164
                                                                                                                       // 165
	Template._loginButtonsMessagesDialog.events({                                                                         // 166
		'click #messages-dialog-dismiss-button': function() {                                                                // 167
			loginButtonsSession.resetMessages();                                                                                // 168
		}                                                                                                                    // 169
	});                                                                                                                   // 170
                                                                                                                       // 171
	Template._loginButtonsMessagesDialog.helpers({                                                                        // 172
		visible: function() {                                                                                                // 173
			var hasMessage = loginButtonsSession.get('infoMessage') || loginButtonsSession.get('errorMessage');                 // 174
			return !Accounts._loginButtons.dropdown() && hasMessage;                                                            // 175
		}                                                                                                                    // 176
	});                                                                                                                   // 177
                                                                                                                       // 178
                                                                                                                       // 179
	//                                                                                                                    // 180
	// configureLoginServiceDialog template                                                                               // 181
	//                                                                                                                    // 182
                                                                                                                       // 183
	Template._configureLoginServiceDialog.events({                                                                        // 184
		'click .configure-login-service-dismiss-button': function(event) {                                                   // 185
			event.stopPropagation();                                                                                            // 186
			loginButtonsSession.set('configureLoginServiceDialogVisible', false);                                               // 187
			$('#configure-login-service-dialog-modal').modal('hide');                                                           // 188
		},                                                                                                                   // 189
		'click #configure-login-service-dialog-save-configuration': function() {                                             // 190
			if (loginButtonsSession.get('configureLoginServiceDialogVisible') &&                                                // 191
				!loginButtonsSession.get('configureLoginServiceDialogSaveDisabled')) {                                             // 192
				// Prepare the configuration document for this login service                                                       // 193
				var serviceName = loginButtonsSession.get('configureLoginServiceDialogServiceName');                               // 194
				var configuration = {                                                                                              // 195
					service: serviceName                                                                                              // 196
				};                                                                                                                 // 197
				_.each(configurationFields(), function(field) {                                                                    // 198
					configuration[field.property] = document.getElementById(                                                          // 199
						'configure-login-service-dialog-' + field.property).value                                                        // 200
						.replace(/^\s*|\s*$/g, ""); // trim;                                                                             // 201
				});                                                                                                                // 202
                                                                                                                       // 203
				// Configure this login service                                                                                    // 204
				Meteor.call("configureLoginService", configuration, function(error, result) {                                      // 205
					if (error)                                                                                                        // 206
						Meteor._debug("Error configuring login service " + serviceName, error);                                          // 207
					else                                                                                                              // 208
						loginButtonsSession.set('configureLoginServiceDialogVisible', false);                                            // 209
					$('#configure-login-service-dialog-modal').modal('hide');                                                         // 210
				});                                                                                                                // 211
			}                                                                                                                   // 212
		},                                                                                                                   // 213
		// IE8 doesn't support the 'input' event, so we'll run this on the keyup as                                          // 214
		// well. (Keeping the 'input' event means that this also fires when you use                                          // 215
		// the mouse to change the contents of the field, eg 'Cut' menu item.)                                               // 216
		'input, keyup input': function(event) {                                                                              // 217
			// if the event fired on one of the configuration input fields,                                                     // 218
			// check whether we should enable the 'save configuration' button                                                   // 219
			if (event.target.id.indexOf('configure-login-service-dialog') === 0)                                                // 220
				updateSaveDisabled();                                                                                              // 221
		}                                                                                                                    // 222
	});                                                                                                                   // 223
                                                                                                                       // 224
	// check whether the 'save configuration' button should be enabled.                                                   // 225
	// this is a really strange way to implement this and a Forms                                                         // 226
	// Abstraction would make all of this reactive, and simpler.                                                          // 227
	var updateSaveDisabled = function() {                                                                                 // 228
		var anyFieldEmpty = _.any(configurationFields(), function(field) {                                                   // 229
			return document.getElementById(                                                                                     // 230
				'configure-login-service-dialog-' + field.property).value === '';                                                  // 231
		});                                                                                                                  // 232
                                                                                                                       // 233
		loginButtonsSession.set('configureLoginServiceDialogSaveDisabled', anyFieldEmpty);                                   // 234
	};                                                                                                                    // 235
                                                                                                                       // 236
	// Returns the appropriate template for this login service.  This                                                     // 237
	// template should be defined in the service's package                                                                // 238
	var configureLoginServiceDialogTemplateForService = function() {                                                      // 239
		var serviceName = loginButtonsSession.get('configureLoginServiceDialogServiceName');                                 // 240
		return Template['configureLoginServiceDialogFor' + capitalize(serviceName)];                                         // 241
	};                                                                                                                    // 242
                                                                                                                       // 243
	var configurationFields = function() {                                                                                // 244
		var template = configureLoginServiceDialogTemplateForService();                                                      // 245
		return template.fields();                                                                                            // 246
	};                                                                                                                    // 247
                                                                                                                       // 248
	Template._configureLoginServiceDialog.helpers({                                                                       // 249
		configurationFields: function() {                                                                                    // 250
			return configurationFields();                                                                                       // 251
		},                                                                                                                   // 252
                                                                                                                       // 253
		visible: function() {                                                                                                // 254
			return loginButtonsSession.get('configureLoginServiceDialogVisible');                                               // 255
		},                                                                                                                   // 256
                                                                                                                       // 257
		configurationSteps: function() {                                                                                     // 258
			// renders the appropriate template                                                                                 // 259
			return configureLoginServiceDialogTemplateForService();                                                             // 260
		},                                                                                                                   // 261
                                                                                                                       // 262
		saveDisabled: function() {                                                                                           // 263
			return loginButtonsSession.get('configureLoginServiceDialogSaveDisabled');                                          // 264
		}                                                                                                                    // 265
	});                                                                                                                   // 266
                                                                                                                       // 267
                                                                                                                       // 268
	;                                                                                                                     // 269
                                                                                                                       // 270
                                                                                                                       // 271
                                                                                                                       // 272
	// XXX from http://epeli.github.com/underscore.string/lib/underscore.string.js                                        // 273
	var capitalize = function(str) {                                                                                      // 274
		str = str == null ? '' : String(str);                                                                                // 275
		return str.charAt(0).toUpperCase() + str.slice(1);                                                                   // 276
	};                                                                                                                    // 277
                                                                                                                       // 278
})();                                                                                                                  // 279
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['ian:accounts-ui-bootstrap-3'] = {
  accountsUIBootstrap3: accountsUIBootstrap3
};

})();
