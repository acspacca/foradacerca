$(document).on('keypress', '[contenteditable]', function(e) {
    // Check if the current text length is already 1
    if ($(this).text().length === 1) {
        // Allow certain control keys: Backspace (8), Delete (46), Left arrow (37), Right arrow (39)
        var allowedKeys = [8, 46, 37, 39];
        if ($.inArray(e.which, allowedKeys) === -1) {
            // Prevent the default action for other keys
            e.preventDefault();
        }
    }
});

// Optional: Add an input event handler to handle pasting or other input methods
$(document).on('input', '[contenteditable]', function() {
    if ($(this).text().length > 1) {
        // Truncate the content to a single character
        $(this).text($(this).text().substring(0, 1));
    }
});


