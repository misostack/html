import "@/styles/main.scss";

import "jquery";

(function ($) {
  $(() => {
    console.log(`Jquery version ${$().jquery}`);
    $(document).on("click", ".nav-menu-toggle", function (e) {
      e.preventDefault();
      const menuId = $(this).data("menu");
      $(menuId).toggleClass("h-0");
    });
  });
})(jQuery);
