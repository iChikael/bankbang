$('#mdAction').on('click', 'button.delete', function (){
    $('#mdAction').modal('hide');
    let customerId = $(this).data('id');
    getCustomerById(currentCustomerId).then((data) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                $.ajax({
                    type: 'PATCH',
                    url: 'http://localhost:3300/customers/' + currentCustomerId,
                    data: {
                        deleted: true
                    }
                })
                    .done(() => {
                        $('#tr_' + currentCustomerId).remove();
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'Customer has been deleted',
                            showConfirmButton: false,
                            timer: 1500
                        })
                        getAllCustomers();
                    })
                    .fail(() => {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Something went wrong!',
                        })
                    });
            }
        });
    });
});
