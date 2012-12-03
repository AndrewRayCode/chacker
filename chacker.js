(function() {

$.fn.chacker = function(options) {
    options = options || {};
    var $chacker = this,
        chackers = [],
        index = 0;

    var chackTemplate = options.chackTemplate || function(html) {
        var shaded = options.shaded ? '<div class="chack-shadow"></div>' : '';
        return '<div class="chack-stage">' +
            '<div class="chack-up">' +
                shaded +
                '<div class="chack-main">' + html + '</div>' +
            '</div>' +
            '<div class="chack-down">' +
                shaded +
                '<div class="chack-main">' + html + '</div>' +
            '</div>' +
        '</div>';
    };

    var makeChack = function($elem) {
        //$elem.css('width', $elem.css('float', 'left').width() + 10 + 'px').css('float', '');
        chackers.push(
            $elem.html(chackTemplate($elem.html())).addClass('chack')
        );
    };

    var elemSel = options.elementSelector;
    (elemSel ? this.find(elemSel) : this.children()).each(function(i, chack) {
        makeChack($(chack));
    });

    var wrap = function(num) {
        if (num < 0) {
            return chackers.length + num;
        }
        return num % chackers.length;
    };

    var chack = function() {
        var $active = chackers[index];

        chackers[wrap(index - 1)].removeClass('before');
        chackers[index].removeClass('active').addClass('before');
        chackers[wrap(index + 1)].addClass('active');

        index = wrap(index + 1);
    };

    var ci;
    this.startChacking = function() {
        ci = setInterval(chack, options.delay || 1000);
        return this;
    };

    this.stopChacking = function() {
        clearInterval(ci);
        return this;
    };

    return this;
};

}());
