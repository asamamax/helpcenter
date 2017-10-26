/*
 * jQuery v1.9.1 included
 */

$(document).ready(function() {
  
  // hidden stuff code
  (function() {
    var isCust;
    // find the tag in the array
    function isCustomer(element, index, array) {
      return (element === 'paying');
    }
    //go through the HelpCenter object and look for org tags
    HelpCenter.user.organizations.forEach(function(x) {
      isCust = x.tags.some(isCustomer);
      console.log("isCust:"+isCust);
      console.log(x);
      //isCust = x.fields.value(isCustomer);
      return (isCust === true);
    });
    //is this a customer and show them
    if (isCust === true) {
      $('a[href$="requests/new"]').show();
      $('.my-activities').show();
      $('#user-menu .my-activities').show();
      $('a.submit-a-request').show();
    }
  }());

  // social share popups
  $(".share a").click(function(e) {
    e.preventDefault();
    window.open(this.href, "", "height = 500, width = 500");
  });

  // toggle the share dropdown in communities
  $(".share-label").on("click", function(e) {
    e.stopPropagation();
    var isSelected = this.getAttribute("aria-selected") == "true";
    this.setAttribute("aria-selected", !isSelected);
    $(".share-label").not(this).attr("aria-selected", "false");
  });

  $(document).on("click", function() {
    $(".share-label").attr("aria-selected", "false");
  });

  // show form controls when the textarea receives focus
  $(".answer-body textarea").one("focus", function() {
    $(".answer-form-controls").show();
  });

  $(".comment-container textarea").one("focus", function() {
    $(".comment-form-controls").show();
  });

});

