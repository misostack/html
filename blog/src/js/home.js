import "@/styles/home.scss";
import "@/js/theia-sticky-sidebar.js";

console.error("home");
$(function ($) {
  $(".content, .sidebar").theiaStickySidebar({
    // Settings
    additionalMarginTop: 120,
    minWidth: 1024,
  });
});
