$.getJSON('data.example.json', function(json, textStatus) {
    var data = json;
    var search = new Search(data, {
        searchAreas : [
            {
                key : "question",
                weighting : 10,
                engine : 'html'
            },
            {
                key : "answer",
                weighting: 5,
                engine : 'html'

            }
        ]

    });
    console.log(search);

    var $resultsContainer = $('.results');

    $('.js-search').on('keyup', function(){
        var entry = $(this).val();
        var results = search.search(entry);
        $resultsContainer.empty();

        for (var i = 0; i < results.length; i++) {
            var result = results[i];
            var title = result.data.question.highlighted;
            var description = result.data.answer.highlighted;
            if(!title) {
                console.log(title);
            }

            var $container = $('<div class="result-container"/>');
            var $title = $('<h2 class="result-heading"/>');
            var $description = $('<p class="result-description"/>');
            $title.html(title);
            $description.html(description);

            $container.append($title);
            $container.append($description);

            $resultsContainer.append($container);
        }
    });
});
