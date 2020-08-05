(function($) {
    'use strict';
    $(document).on('click', '.sl-button', function() {
        var button = $(this);
        var post_id = button.attr('data-post-id');
        var security = button.attr('data-nonce');
        var iscomment = button.attr('data-iscomment');
        var allbuttons;
        if (iscomment === '1') { /* Comments can have same id */
            allbuttons = $('.sl-comment-button-' + post_id);
        } else {
            allbuttons = $('.sl-button-' + post_id);
        }
        var loader = allbuttons.next('#sl-loader');
        if (post_id !== '') {
            $.ajax({
                type: 'POST',
                url: victim_like.ajaxurl,
                data: {
                    action: 'victim_theme_process_simple_like',
                    post_id: post_id,
                    nonce: security,
                    is_comment: iscomment,
                },
                beforeSend: function() {
                    loader.html('&nbsp;<div class="hopper-loader">Loading...</div>');
                },
                success: function(response) {
                    var icon = response.icon;
                    var count = response.count;
                    allbuttons.html(icon + count);
                    if (response.status === 'unliked') {
                        var like_text = victim_like.like;
                        allbuttons.prop('title', like_text);
                        allbuttons.removeClass('liked');
                    } else {
                        var unlike_text = victim_like.unlike;
                        allbuttons.prop('title', unlike_text);
                        allbuttons.addClass('liked');
                    }
                    loader.empty();
                }
            });

        }
        return false;
    });
})(jQuery);
