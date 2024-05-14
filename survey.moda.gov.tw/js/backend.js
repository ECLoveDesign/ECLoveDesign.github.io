 //TreeView
 if ($('.treeview').length) {

    // $('.treeview .active').parent().parent('li').addClass('treeview-expanded');
    // $('.treeview .list-group').hide();
    
    // $('.treeview .active').parent().parent('li').addClass('treeview-expanded');
    // $('.list-group-item.not:(.active)').removeClass('treeview-expanded');
    
    $('.treeview i').click(function () {
        // $(this).toggleClass('fa-chevron-up');
        $(this).siblings('.list-group').toggleClass('open');
    });
    
    
    // $('.list-group-item>.list-group').hide();
    // $('.open').show();
    
    // $('.treeview i').click(function () {
    //     // $(this).toggleClass('fa-chevron-up');
    //     $(this).siblings('.list-group').toggleClass('open');
    // });
    }