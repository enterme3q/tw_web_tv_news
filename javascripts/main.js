$(document).ready(function() {

    $.ajax({
        url: 'json/embed.json',
        dataType: "json",
    })
    .done(function(response) {
        $container = $('#news_wrapper.row');
        $header_menu = $('#header_menu');
        $data_length = response.data.length;

        for (i = 0; i<=$data_length; i++) {
            $data_name = response.data[i].name;
            $data_embed = response.data[i].embed_code;
            $data_url = response.data[i].url;

            $news_header_link = $('<li><a href="' + $data_url + '" target="_blank">' + $data_name + '</a></li>');
            $header_menu.append($news_header_link);

            $news_item = $('<div class="col-lg-4 col-md-6 news_item" id="' + $data_name + '"><iframe class="news_video" src="https://www.youtube.com/embed/' + $data_embed + '" frameborder="0" allowfullscreen=""></iframe><a href="' + $data_url + '" class="news_link" target="_blank"><p class="news_info">' + $data_name + '</p></a></div>');
            $container.append($news_item);
        }
    })
    .fail(function() {
        alert("出了點小問題，請重新整理再試試看！");
    });

});