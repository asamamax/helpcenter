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
  
    // Code to populate dynamic article content
  (function() {
     var OrganizationTags = HelpCenter.user.organizations[0].tags;
     if (OrganizationTags.includes('silo2')){
      $("a:contains('maildrop@greenhouse.io')").html('<a href="mailto:maildrop@ivy.greenhouse.io">maildrop@ivy.greenhouse.io</a>');
      $("a:contains('flyonthewall@greenhouse.io')").html('<a href="mailto:flyonthewall@ivy.greenhouse.io">flyonthewall@ivy.greenhouse.io</a>');
      $("a:contains('schedule@ghcalendar.io')").html('<a href="mailto:schedule@ivy.ghcalendar.io">schedule@ivy.ghcalendar.io</a>');
     }  
     var siloArr=JSON.parse(document.getElementById('siloMapping').innerHTML);
     console.log(siloArr);
     var siloName="nosilo";
     var isSilo2,isSilo1="false"
     function checkSilo2(element, index, array) {
       //console.log("DEBUG: Looking at element " + element + " from checkSilo2");
       return (element == 'silo2');
     }
     function checkSilo1(element, index, array) {
       //console.log("DEBUG: Looking at element " + element + " from checkSilo1");
       return (element == 'silo1');
     }
     HelpCenter.user.organizations.forEach(function(x) {
       //console.log("DEBUG: " + x.name + " tags are: " + x.tags);
       isSilo2=x.tags.some(checkSilo2);
       isSilo1=x.tags.some(checkSilo1);
       if (isSilo2) { siloName="silo2"; }
       if (isSilo1) { siloName="silo1"; } 
     return(siloName);
     });
     var siloIndex=-1;
     //console.log("DEBUG: siloMapping Arr Length: " + Object.keys(siloArr.silos).length);
     for (var i=0; i<Object.keys(siloArr.silos).length; i++) {
       if ( siloName == siloArr.silos[i].name ) { siloIndex=i; }
     }
    //document.getElementById('custSilo').innerHTML = "silo" + (siloIndex+1);
    console.log("Organization Silo is: " + siloName);
   
     //maildrop dynamic address content
     var mailDropRefs = document.getElementsByName("mailDropAddress");
     for (var i=0; i<mailDropRefs.length; i++) {
     if (siloIndex != -1) { mailDropRefs[i].innerHTML = siloArr.silos[siloIndex].mailDropAddr; }
     else { mailDropRefs[i].innerHTML = "unknown address"; }
     }
   
     //flyonthewall dynamic address content
     var flyOnTheWallRefs = document.getElementsByName("flyOnTheWallAddress");
     for (var i=0; i<flyOnTheWallRefs.length; i++) {
     if (siloIndex != -1) { flyOnTheWallRefs[i].innerHTML = siloArr.silos[siloIndex].flyOnTheWallAddr; }
     else { flyOnTheWallRefs[i].innerHTML = "unknown address"; }
     }
   
     //schedule dynamic address content
     var schedulingRefs = document.getElementsByName("schedulingAddress");
     for (var i=0; i<schedulingRefs.length; i++) {
     if (siloIndex != -1) { schedulingRefs[i].innerHTML = siloArr.silos[siloIndex].schedulingAddr; }
     else { schedulingRefs[i].innerHTML = "unknown address"; }
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
