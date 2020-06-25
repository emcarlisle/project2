$(document).ready(function () {

    // Getting references to our form and inputs
    const loginForm = $('form.inputs-form');
    const emailInput = $('input#signin-email-input');
    const passwordInput = $('input#signin-password-input');
    const signOutUser = $('.signout-Btn');

    // When the form is submitted, we validate there's an email and password entered
    loginForm.on('#submitBtn', function (event) {
        event.preventDefault();
        const userData = {
            //name: nameInput.val.trim(),
            email: emailInput.val().trim(),
            password: passwordInput.val().trim()
        };

        if (!userData.email || !userData.password) {
            return;
        }

    

        // If we have an email and password we run the loginUser function and clear the form
        loginUser(userData.email, userData.password);
        //nameInput.val('');
        emailInput.val('');
        passwordInput.val('');
    });

    // loginUser does a post to our 'api/login' route and if successful, redirects us the the profile page
    function loginUser(email, password) {
        $.post('/api/auth/signin', {
            //name: name,
            email: email,
            password: password
        })
            .then(function () {
                window.location.replace('/homepage');
                // If there's an error, log the error
            })
            .catch(function (err) {
                console.log(err);
            });
    }


    signOutUser.on('click', (event) => {
        event.preventDefault();
        $.ajax({
            type: 'POST',
            url: '/signout'
        }).done(() => {
            window.location.replace('/signup');
        });
    });
});