
function printError(elemId, hintMsg) {
    document.getElementById(elemId).innerHTML = hintMsg;
}


function validateForm() {

    var loginEmail = document.getElementById("loginEmail").value;
    var loginPassword = document.getElementById("loginPassword").value;

    var emailErr = passwordErr = true;


    if (loginEmail == "") {
        printError("emailErr", "Please enter your email address");
    } else {
        var regex = /^([a-zA-Z0-9\.-]+)@([a-zA-Z0-9-]+).([a-z]{2,20})$/;
        if (regex.test(loginEmail) === false) {
            printError("emailErr", "Please enter a valid email address");
        } else {
            printError("emailErr", "");
            emailErr = false;
        }
    }

    if (loginPassword == "") {
        printError("passwordErr", "Please enter your password");
    } else {
        var regex = /^[a-zA-Z\s]+$/;
        if (regex.test(loginPassword) === false) {
            printError("passwordErr", "Please enter a valid password");
        } else {
            printError("passwordErr", "");
            passwordErr = false;
        }
    }
}




