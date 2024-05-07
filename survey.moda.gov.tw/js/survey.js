

// validation
(function() {
    'use strict';
    window.addEventListener('load', function() {
      // Fetch all the forms we want to apply custom Bootstrap validation styles to
      var forms = document.getElementsByClassName('needs-validation');
      // Loop over them and prevent submission
      var validation = Array.prototype.filter.call(forms, function(form) {
        form.addEventListener('submit', function(event) {
          if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
          }
          form.classList.add('was-validated');
        }, false);
      });
    }, false);
  })();

  
// save
$('.btn-save').on('click', function () {
    Swal.fire({
      type: "success",
      title: "儲存成功",
      showConfirmButton: false,
      timer: 1000
    });
});


// affix top
$(window).scroll(function () {
  if ($(this).scrollTop() > 40) {
    $(".card-header").addClass('affix-top');
      $(".actions").addClass('affix-top');
  } else {
    $(".card-header").removeClass('affix-top');
    $(".actions").removeClass('affix-top');
  }

  if ($(document).width() > 900) {
      if ($(this).scrollTop() > 135) {
          $(".card-header").addClass('affix-top');
          $(".actions").addClass('affix-top');

      } else {
          $(".card-header").removeClass('affix-top');
          $(".actions").removeClass('affix-top');
      }
  }

});
