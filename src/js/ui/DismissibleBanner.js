class DismissibleBanner {
  constructor() {}

  init() {
    var Storage = function() {
      function getItem(item) {
        return window.localStorage.getItem(item);
      }

      function setItem(item, contents) {
        return window.localStorage.setItem(item, contents);
      }

      function deleteItem(item) {
        return window.localStorage.removeItem(item);
      }

      return {
        get: getItem,
        set: setItem,
        delete: deleteItem
      };
    };

    window.Storage = new Storage();

    var dismissibleItem = function(el, id, value, expiry) {
      var hasExpiry = id && expiry ? true : false,
        html =
          '<div class="section-margin"><div class="banner-content">' +
          value +
          '</div><div class="banner-close"><a type="button" class="close"><img src="assets/images/close.svg" /></a></div>';

      if (hasExpiry) {
        var timestamp = window.Storage.get(id);
        if (timestamp) {
          if (expiry === 'forever') {
            el.remove();
            return;
          } else {
            var now = new Date(),
              diffInHours = Math.floor((now.getTime() - parseInt(timestamp)) / (1000 * 60 * 60));
            if (diffInHours >= expiry) {
              window.Storage.delete(id);
            } else {
              el.remove();
              return;
            }
          }
        }
      }

      el.classList.add('dismissible');

      el.removeAttribute('data-component');
      el.removeAttribute('data-expiry');
      el.removeAttribute('data-id');
      el.removeAttribute('data-value');

      el.innerHTML = html;

      function dismissBanner(event) {
        var height = el.offsetHeight,
          timeout = null;

        if (hasExpiry) {
          window.Storage.set(id, new Date().getTime());
        }

        function reduceHeight() {
          height -= 2;
          el.setAttribute('style', 'height: ' + height + 'px; opacity: 0');
          if (height <= 0) {
            window.clearInterval(timeout);
            timeout = null;
            el.remove();
          }
        }

        el.classList.add('fade-out');

        window.setTimeout(function() {
          timeout = window.setInterval(reduceHeight, 1);
        }, 300);
      }

      el.querySelector('.close').addEventListener('click', dismissBanner);
    };

    var dismissibles = document.querySelectorAll('[data-component="dismissible-item"]');
    if (dismissibles.length) {
      for (var i = 0; i < dismissibles.length; i++) {
        var expiry = dismissibles[i].getAttribute('data-expiry'),
          id = dismissibles[i].getAttribute('data-id'),
          value = dismissibles[i].getAttribute('data-value');
        new dismissibleItem(dismissibles[i], id, value, expiry);
      }
    }
  }
}

export default DismissibleBanner;
