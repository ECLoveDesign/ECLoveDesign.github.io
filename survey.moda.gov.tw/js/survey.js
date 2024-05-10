

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

  


// sweetalert
$('.btn-save').on('click', function () {
    Swal.fire({
      type: "success",
      title: "儲存成功",
      showConfirmButton: false,
      timer: 1000
    });
});

$('.btn-del').on('click', function () {
  Swal.fire({
    title: '確認刪除此項目?',
    text: "一旦刪除無法復原!",
    type: 'warning',
    showCancelButton: true,
    // confirmButtonColor: '#3085d6',
    // cancelButtonColor: '#d33',
    cancelButtonText: '取消 ',
    confirmButtonText: '確認刪除',
    confirmButtonClass: 'btn btn-dark',
    cancelButtonClass: 'btn btn-light ml-1',
    buttonsStyling: false,
  }).then(function (result) {
    if (result.value) {
      Swal.fire({
        type: "success",
        title: '刪除成功!',
        text: '已刪除此項目',
        showConfirmButton: false,
        timer: 1500
        // confirmButtonClass: 'btn btn-success',
        // confirmButtonText: '關閉',
      })
    }
  })
});



// $('.btn-return').on('click', function () {
//   Swal.fire({
//     title: '確認退回此問卷?',
//     text: "退回問卷可編輯填答!",
//     type: 'info',
//     showCancelButton: true,
//     // confirmButtonColor: '#3085d6',
//     // cancelButtonColor: '#d33',
//     cancelButtonText: '取消 ',
//     confirmButtonText: '確認退回',
//     confirmButtonClass: 'btn btn-dark',
//     cancelButtonClass: 'btn btn-light ml-1',
//     buttonsStyling: false,
//   }).then(function (result) {
//     if (result.value) {
//       Swal.fire({
//         type: "success",
//         title: '退回成功!',
//         text: '已退回此問卷',
//         showConfirmButton: false,
//         timer: 1500
//         // confirmButtonClass: 'btn btn-success',
//         // confirmButtonText: '關閉',
//       })
//     }
//   })
// });


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
