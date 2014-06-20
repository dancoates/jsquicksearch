describe("Search", function() {
    var data = [
        {
            "question" : "Test Question 1",
            "answer"   : "Test answer"
        },

        {
            "question" : "Test Question 2",
            "answer"   : "Test answer with abbrev' <strong>text</strong> and words after it."
        },
        {
            "question" : "Test Question 3",
            "answer"   : "Test answer with accénted characters"
        },
        {
            "question" : "Test Question 4",
            "answer"   : "It's encyclopædia not encyclopedia"
        },
        {
            "question" : "I’m considering moving to a new suburb and would like more information can this site help? <i class=\"accordion-item--arrow icon-thin-arrow\"></i>",
            "answer" : "\n                      <p>At wed like to help make your property transition simple, efficient and stress free - so we've develped a wealth of information about suburbs and areas.  \nIf you're looking for information on specific suburbs, take a look at our <a href=\"\">Suburb Profiles</a></p>\n                            "
        }
    ];

    var search;

    // Flow:
    // 

    beforeEach(function() {
        search = new Search(data, {
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
    });

    describe("Diatrics Tests", function(){
        it("Should return 1 result for input 'encyclopædia'", function(){
            var results = search.search('encyclopædia');
            expect(results.length).toEqual(1);
        });

        it("Should return 1 result for input 'encyclopaedia'", function(){
            var results = search.search('encyclopaedia');
            expect(results.length).toEqual(1);
        });

        it("Should return 1 result for input 'accénted'", function(){
            var results = search.search('accénted');
            expect(results.length).toEqual(1);
        });

        it("Should return 1 result for input 'accented'", function(){
            var results = search.search('accented');
            expect(results.length).toEqual(1);
        });
    });

    describe("Replacement/Formatting/Highlighting Tests", function(){
        it("Should not match word 'strong'", function(){
            var results = search.search('strong');
            expect(results.length).toEqual(0);
        });

        it("Should correctly highlight word 'after'", function(){
            var results = search.search('after');
            var answer = results[0].answer.highlighted;
            expect(answer).toEqual("Test answer with abbrev' <strong>text</strong> and words <span class='search-highlight'>after</span> it.");
        });

        it("Should correctly highlight word 'Profiles'", function(){
            var results = search.search('Profiles');
            var answer = results[0].answer.highlighted;
            console.log(answer);
            expect(answer.indexOf("<span class='search-highlight'>Profiles</span>")).not.toEqual(-1);
        });
    });

   

  // it("should be able to play a Song", function() {
  //   player.play(song);
  //   expect(player.currentlyPlayingSong).toEqual(song);

  //   //demonstrates use of custom matcher
  //   expect(player).toBePlaying(song);
  // });

  // describe("when song has been paused", function() {
  //   beforeEach(function() {
  //     player.play(song);
  //     player.pause();
  //   });

  //   it("should indicate that the song is currently paused", function() {
  //     expect(player.isPlaying).toBeFalsy();

  //     // demonstrates use of 'not' with a custom matcher
  //     expect(player).not.toBePlaying(song);
  //   });

  //   it("should be possible to resume", function() {
  //     player.resume();
  //     expect(player.isPlaying).toBeTruthy();
  //     expect(player.currentlyPlayingSong).toEqual(song);
  //   });
  // });

  // // demonstrates use of spies to intercept and test method calls
  // it("tells the current song if the user has made it a favorite", function() {
  //   spyOn(song, 'persistFavoriteStatus');

  //   player.play(song);
  //   player.makeFavorite();

  //   expect(song.persistFavoriteStatus).toHaveBeenCalledWith(true);
  // });

  // //demonstrates use of expected exceptions
  // describe("#resume", function() {
  //   it("should throw an exception if song is already playing", function() {
  //     player.play(song);

  //     expect(function() {
  //       player.resume();
  //     }).toThrowError("song is already playing");
  //   });
  // });
});
