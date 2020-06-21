// Get references to page elements
$(document).ready(function () {
  const $submitBtn = $('#submit');
  const $resultList = $('#resultList');
  const $savedList = $('#savedList');

  //click events
  $(document).on('click', '#submit', function (event) {
    event.preventDefault();
    var searchItems = $('#searchItems').val().trim();

    handlePostSearch(searchItems).then(function (response) {
      console.log(response);
    });
  });
  // $(document).on('click', 'button.save', handlePostSave);
  // $(document).on('click', 'button.delete', handlePostDelete);

  // The API object contains methods for each kind of request we'll make
  const API = {
    saveFreeItems: function (data) {
      return $.ajax({
        headers: {
          'Content-Type': 'post/json'
        },
        type: 'POST',
        url: 'api/post',
        data: JSON.stringify(data)
      });
    },

    getFreeItems: function () {
      return $.ajax({
        url: 'api/post',
        type: 'GET'
      });
    },

    deleteFreeItems: function (id) {
      return $.ajax({
        url: 'api/post/' + id,
        type: 'DELETE'
      });
    }
  };

  // refresh gets new items from the db and repopulates the list - STILL NEEDS CHANGING
  const refreshFreeItems = function () {
    API.getFreeItems().then(function (data) {
      const $examples = data.map(function (example) {
        const $a = $('<a>')
          .text(example.text)
          .attr('href', '/example/' + example.id);

        const $li = $('<li>')
          .attr({
            class: 'list-group-item',
            'data-id': example.id
          })
          .append($a);

        const $button = $('<button>')
          .addClass('btn btn-danger float-right delete')
          .text('ｘ');

        $li.append($button);

        return $li;
      });

      $resultList.empty();
      $resultList.append($examples);
    });
  };

  // submit a new free item
  // Save the new free item to the db and refresh the list
  const handlePostSearch = function (searchTopic) {
    return $.ajax({
      url: `api/post/search/${searchTopic}`,
      type: 'GET'
    });
  };
  //Save items to list
  // const handlePostSave = function () {
  //   const idToSave = $(this).child().attr('.savedItems');
  //   API.saveExample(idToSave).then(function () {
  //     refreshFreeItems();
  //   });
  // };
  // delete button is clicked
  // Remove the example from the db and refresh the list
  // const handlePostDelete = function () {
  //   const idToDelete = $(this).parent().attr('.savedItems');
  //   API.deleteExample(idToDelete).then(function () {
  //     refreshFreeItems();
  //   });
  // };

  //AUTH STUFF
  $(document).on('click', '.signup-btn', function (event) {
    event.preventDefault();
    const newUser = {
      email: $('#signup-email-input').val().trim(),
      password: $('#signup-password-input').val().trim()
    };

    $.ajax({
      type: 'POST',
      url: '/api/auth/signup',
      data: newUser
    }).done(function () {
      window.location.replace('/');
    });
  });

    $(document).on('click', '.signout-btn', function (event) {
    event.preventDefault();

    $.ajax({
      type: 'POST',
      url: '/api/auth/signout',
    }).done(function () {
      window.location.replace('/');
    });
  });
});