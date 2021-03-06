// Generated by CoffeeScript 1.7.1
(function() {
  var event, out_of_limits, over_target_placeholder;

  event = function(name, x, y, options) {
    if (options == null) {
      options = {};
    }
    options = $.extend({
      pageX: x,
      pageY: y
    }, options);
    return new $.Event(name, options);
  };

  out_of_limits = function(position, min, max) {
    return position < min || position > max;
  };

  over_target_placeholder = function(container, target_position, direction) {
    var placeholder, position;
    placeholder = container.find('.ui-sortable-placeholder');
    position = placeholder.index();
    if (direction === -1) {
      position += 1;
    }
    return position === target_position;
  };

  window.jquery_simulate_sort = function(element, position) {
    var container, current_position, direction, from_x, from_y, interval, maximum_y, minimum_y, source_point, target_element, target_point, x, y;
    container = element.parent();
    source_point = element.offset();
    from_x = source_point.left;
    from_y = source_point.top;
    element.trigger(event('mousedown', from_x, from_y, {
      which: 1
    }));
    target_element = $(container.children().get(position - 1));
    target_point = target_element.offset();
    x = Math.ceil((target_element.width() - target_point.left) / 2);
    y = source_point.top;
    minimum_y = -element.height();
    maximum_y = $(document).height() + element.height();
    current_position = element.index() + 1;
    direction = current_position > position ? -1 : 1;
    return interval = setInterval(function() {
      $(document).trigger(event('mousemove', x, y));
      y += 1 * direction;
      if (over_target_placeholder(container, position, direction) || out_of_limits(y, minimum_y, maximum_y)) {
        clearInterval(interval);
        return element.trigger(event('mouseup', x, y));
      }
    }, 0);
  };

}).call(this);
