var $gallery = $('.gallery').isotope({
  // options
  itemSelector: '.photo',
  layoutMode: 'masonry',
    getSortData: {
        name: '.name',
        meanrank: function( itemElem ) {
            var meanrank = $( itemElem ).find('.meanrank').text();
            return parseFloat( meanrank.replace( /[\(\)]/g, '') );
        },
        plainrank: function( itemElem ) {
            var plainrank = $( itemElem ).find('.plainrank').text();
            return parseFloat( plainrank.replace( /[\(\)]/g, '') );
        },
        crayolarank: function( itemElem ) {
            var crayolarank = $( itemElem ).find('.crayolarank').text();
            return parseFloat( crayolarank.replace( /[\(\)]/g, '') );
        },

        recolorrank: function( itemElem ) {
            var recolorrank = $( itemElem ).find('.recolorrank').text();
            return parseFloat( recolorrank.replace( /[\(\)]/g, '') );
        },

        toonrank: function( itemElem ) {
            var toonrank = $( itemElem ).find('.toonrank').text();
            return parseFloat( toonrank.replace( /[\(\)]/g, '') );
        },
        islandizerank: function( itemElem ) {
            var islandizerank = $( itemElem ).find('.islandizerank').text();
            return parseFloat( islandizerank.replace( /[\(\)]/g, '') );
        }
    }

});

// filter functions
var filterFns = {
    // show if rank is less than 100
    crayolaLessThan100: function() {
       // var number = $(this).find('.crayolarank').text();
        var number = $(this).find('.crayolarank').text();
        return parseInt( number, 10 ) < 101;
    },

    plainLessThan100: function() {
        // var number = $(this).find('.plainrank').text();
        var number = $(this).find('.plainrank').text();
        return parseInt( number, 10 ) < 101;
    },
};
// bind sort button click
$('#sorts').on( 'click', 'button', function() {
    var sortByValue = $(this).attr('data-sort-by');
    $gallery.isotope({ sortBy: sortByValue });
});

// change is-checked class on buttons
$('.button-group').each( function( i, buttonGroup ) {
    var $buttonGroup = $( buttonGroup );
    $buttonGroup.on( 'click', 'button', function() {
        $buttonGroup.find('.is-checked').removeClass('is-checked');
        $( this ).addClass('is-checked');
    });
});

// bind filter button click
$('#filters').on( 'click', 'button', function() {
    var filterValue = $( this ).attr('data-filter');
    // use filterFn if matches value
    filterValue = filterFns[ filterValue ] || filterValue;
    $gallery.isotope({ filter: filterValue });
});

$gallery.imagesLoaded().progress( function() {
    $gallery.isotope('layout');
})
