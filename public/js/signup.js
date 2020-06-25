$(document).ready(() => {
    // Getting references to our form and input
    const signUpForm = $('form.inputs-form');
    const emailInput = $('input#signUp-email');
    const passwordInput = $('input#signUp-password');

    // When the signup button is clicked, we validate the email and password are not blank
    signUpForm.on('submit', event => {
        event.preventDefault();
        const newUser = {
            //name: nameInput.val().trim(),
            email: emailInput.val().trim(),
            password: passwordInput.val().trim()
        };

        if (!newUser.email || !newUser.password) {
            // If we have a name email and password, run the signUpUser function
            return;
        }
        console.log(newUser);
        signUpUser(newUser.email, newUser.password);
        //nameInput.val('');
        emailInput.val('');
        passwordInput.val('');
            
    });

    // Does a post to the signup route. If successful, we are redirected to the index(home) page
    // Otherwise we log any errors
    
    function signUpUser(email, password) {
        $.post('/api/auth/signup', {
            //name: name,
            email: email,
            password: password
        })
            .then(() => {
                console.log('sign up completed');
                window.location.replace('/signin');
                // If there's an error, handle it by throwing up a bootstrap alert
            })
            .catch(handleLoginErr);
    }

    function handleLoginErr(err) {
        $('#alert .msg').text(err.responseJSON);
        $('#alert').fadeIn(500);
    }
});
