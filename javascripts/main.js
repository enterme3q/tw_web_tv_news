$(document).ready(function() {
    $selected_channel = {};

    $.ajax({
        url: 'json/embed.json',
        dataType: "json",
    })
    .done(function(response) {
        $container = $('#news_wrapper.row');
        $header_menu = $('#header_menu');
        $selector_wrapper = $('#selector_inner');
        $data = response.data;

        for (i = 0; i<=$data.length; i++) {
            $data_name = $data[i].name;
            $data_url = $data[i].url;

            $news_header_link = $('<li><a href="' + $data_url + '" target="_blank">' + $data_name + '</a></li>');
            $header_menu.append($news_header_link);

            $channels = $('<label class="col-lg-3 col-md-4 col-xs-6 selector_label"><input type="checkbox" class="channel_box" name="channels" value="' + i + '">' + $data_name + '</label>');
            $selector_wrapper.append($channels);

        }
    })
    .fail(function() {
        alert("出了點小問題，請重新整理再試試看！");
    });

    $('#search_channel').click(function() {

        $selected = $('.channel_box:checked');

        if($selected.length > 0) {

            $('.news_item').remove();

            $selected_channel = $selected.map(function(index, value) {
                return this.value;
            }).get();

            $.each($selected_channel, function(index) {

                $i = $selected_channel[index];

                $data_name = $data[$i].name;
                $data_embed = $data[$i].embed_code;
                $data_url = $data[$i].url;

                $news_item = $('<div class="col-lg-4 col-md-6 news_item" id="' + $data_name + '"><iframe class="news_video" src="https://www.youtube.com/embed/' + $data_embed + '" frameborder="0" allowfullscreen=""></iframe><a href="' + $data_url + '" class="news_link" target="_blank"><p class="news_info">' + $data_name + '</p></a></div>');
                $container.append($news_item);

            });

        } else {
            alert('請至少選擇一個頻道');
        }
    });

    $('#select_all').click(function() {
        $('.channel_box').prop('checked', true);
    });

    $('#clear_all').click(function() {
        $('.channel_box').prop('checked', false);
    });
});