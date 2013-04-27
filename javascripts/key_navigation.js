//key_navigation.js
$(function(){
  $(document).keydown(function(e) {
    var url = false;
        if (e.which == 37 || e.which == 74) {  // Left arrow and J
            {% if page.previous %}
        url = '{{page.previous.url}}';
        {% endif %}
        }
        else if (e.which == 39 || e.which == 75) {  // Right arrow and K
            {% if page.next %}
        url = '{{page.next.url}}';
        {% endif %}
        }
        if (url) {
            window.location = url;
        }
  });
})