"use strict";

/*****************************************************/
/*                   Download                        */
/*****************************************************/
var BEDownload = {
    "Init": function Init() {}
};
/*****************************************************/
/*                   Download                        */
/*****************************************************/
var FEDownload = {
    "Init": function Init() {
        this.FormValidate();
    },
    "FormValidate": function FormValidate() {
        $("input.js-form-submit").on("click", function (event) {
            var valid = true,
                response = grecaptcha.getResponse();

            // Check if form is valid
            if (!$("form").valid()) {
                valid = false;
            }

            // Check if captcha is valid
            if (response.length == 0) {
                valid = false;
            }

            // Check errors.
            if (!valid) {
                event.preventDefault();
            }
        });
    }
};