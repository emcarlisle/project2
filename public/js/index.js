const $ = window.$;
const $exampleText = $('#example-text');
const $exampleDescription = $('#example-description');
const $submitBtn = $('#submit');
const $exampleList = $('#example-list');
const $deleteBtn = $('.deleteBtn');

// The API object contains methods for each kind of request we'll make
const API = {
    deletePost: function (id) {
        return $.ajax({
            url: 'api/posts/delete/' + id,
            type: 'DELETE'
        });
    }
};

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
const handleDeleteBtnClick = function () {
    const idToDelete = $(this).attr('data-postid');
    API.deletePost(idToDelete).then(function () {
        location.reload();
        console.log(idToDelete);
    });
};

// Add event listeners to the submit and delete buttons
$deleteBtn.on('click', handleDeleteBtnClick);

// Button to take us from login page to create survey
$('#start').on('click', function () {
    window.location.href = '/posts/create'
})
// $(document).ready(function () {
//     // This file just does a GET request to figure out which user is logged in
//     // and updates the HTML on the page
//     $.get('/api/user_data').then(function (data) {
//         if (!data.email) {
//             $('.user-control').hide();
//         } else {
//             $('.user-control').show();
//         }
//         $('.user-name').text(data.email);
//     });
// });