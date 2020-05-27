$(function() {

  function buildHTML(message){
    if (message.image) {
      var html = `<div class="chat-main__message-list--summary">
                    <div class="chat-main__message-list--summary__name">
                      ${message.user_name}
                    </div>
                    <div class="chat-main__message-list--summary__daily">
                      ${message.created_at}
                    </div>
                  </div>
                  <div class="chat-main__message-list--summary__message">
                    ${message.content}
                  </div>
                  <div class="chat-main__message-list--summary__message--image">
                    <img src=${message.image}>
                  </div>`
      return html;
    } else {
      var html = `<div class="chat-main__message-list--summary">
                    <div class="chat-main__message-list--summary__name">
                      ${message.user_name}
                    </div>
                    <div class="chat-main__message-list--summary__daily">
                      ${message.created_at}
                    </div>
                  </div>
                  <div class="chat-main__message-list--summary__message">
                    ${message.content}
                  </div>`
      return html;
    };
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.chat-main__message-list').append(html);
      $('form')[0].reset();
      $('.chat-main__message-list').animate({ scrollTop: $('.chat-main__message-list')[0].scrollHeight});
      $('#new_message')[0].reset();
      $('.chat-main__message-form__new-message__send-btn').prop('disabled', false);
    })
    .fail(function(){
      alert("メッセージ送信に失敗しました");
      $('.chat-main__message-form__new-message__send-btn').prop('disabled', false);
    })
  });
});