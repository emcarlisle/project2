$(function () {
    $("#createPostBtn").on("click", createPost)

    function createPost() {
        const postBody = $("#postBody").val().trim();
        
        if (!postBody) {
            window.alert('Keep your thoughts to yourself then!');
            return;
        }

        $.ajax({
            url: "/posts",
            type: "POST",
            data: {
                body: (postBody, JSON.stringify(data))
            },
            success: function (result) {
                console.log(result);
                window.location.href = `/profile/${result.id}`;
            }
        });
    };
});