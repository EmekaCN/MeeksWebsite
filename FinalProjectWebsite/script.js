/*
	Contact Form Validation
	4/20/2023
	Emeka Nwannemelu
 */

// The event listener for the document load
document.addEventListener("DOMContentLoaded", load);

/**
 * Handles the load event of the document.
 */
function load() {
	document.getElementById("Contactform").addEventListener("submit", validate);
	document.getElementById("Contactform").reset();
    hideErrors();
	document.getElementById("Contactform").addEventListener("reset", resetForm);
}

function resetForm(e) {
	if(confirm('Clear Contact?')) {
		hideErrors();
		document.getElementById("name").focus();
		return true;
	}
	e.preventDefault();
	return false;
}	

function validate(e) {
	if(formHasErrors()) {
		e.preventDefault();
		return false;
	}

	return true;
}

function hideErrors() {
    let error = document.getElementById("name_error");
    let error2 = document.getElementById("phone_error");
    let error3 = document.getElementById("email_error");
	error.style.display = "none";
    error2.style.display = "none";
    error3.style.display = "none";
}


function formHasErrors(){
    let errorFlag = false;
    hideErrors();

	let numberValue = document.getElementById("phonenumber").value;
	let emailValue = document.getElementById("email").value;
	
	let regexPhone = /^\d{10}$/;
	let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    let requiredFields = ["name", "email"];
    for(let i = 0; i < requiredFields.length; i++){
        let textField = document.getElementById(requiredFields[i]);
		if(!formFieldHasInput(textField)){
			document.getElementById(requiredFields[i] + "_error").style.display = "block";
            document.getElementById(requiredFields[i] + "_error").style.color = "red";
			if(true){
				textField.focus();
				textField.select();
			}
			errorFlag =  true;
		}
        let number = document.getElementById("phonenumber").value;
        if(!formFieldHasInput(number)){
            document.getElementById("phone_error").style.display = "block";
            document.getElementById("phone_error").style.color = "red";
            errorFlag = true;
        }
    }

	if(regexPhone.test(numberValue)){
		document.getElementById("phone_error").style.display = "none";
		document.getElementById("phone_error").style.color = "red";
		errorFlag = false;
	}
	console.log(emailValue)
	if(!regexEmail.test(emailValue)){
		document.getElementById("email_error").style.display = "block";
		document.getElementById("email_error").style.color = "red";
		errorFlag = true;
	}
    return errorFlag; 
}



function formFieldHasInput(fieldElement) {
	if(fieldElement.value == null || trim(fieldElement.value) == "") {
		return false;
	}
	return true;
}
function trim(str) 
{
	// Uses a regex to remove spaces from a string.
	return str.replace(/^\s+|\s+$/g,"");
}
