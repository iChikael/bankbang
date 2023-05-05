$('#btnDeposit').on('click', () => {
    getCustomerById(currentCustomerId).then((data) => {
        let customer = data;
        let currentBalance = customer.balance;
        let transactionAmount = +$('#transactionAmountDep').val();
        let newBalance = currentBalance + transactionAmount;
        customer.balance = newBalance;
         if (isNaN(transactionAmount) || transactionAmount < 0) {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Transaction amount must be a positive number !!!'
            });
            return;
          }

        $.ajax({
            type: 'PATCH',
            headers: {
                'accept': 'application/json',
                'content-type': 'application/json'
            },
            url: 'http://localhost:3300/customers/' + customer.id,
            data: JSON.stringify(customer)
        })
            .done((data) => {
                let str = renderCustomer(data);
                $('#tr_' + currentCustomerId).replaceWith(str);

               

                $('#mdDeposit').modal('hide');
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Deposit successful',
                    showConfirmButton: false,
                    timer: 1500
                });
                getAllCustomers();
            })
            .fail((jqXHR, textStatus, errorThrown) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
                });
            });

        let transfer = {
            customerId,
            transactionAmount,
        }

        $.ajax({
            type: 'POST',
            headers: {
                'accept': 'application/json',
                'content-type': 'application/json'
            },
            url: 'http://localhost:3300/deposits',
            data: JSON.stringify(deposit)
        });
    })
        .catch((error) => {
            console.log(error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
            });
        });
});

$('#mdAction').on('click', 'button.deposit', function () {
    $('#mdAction').modal('hide');
    $('#mdDeposit').modal('show');
    getCustomerById(currentCustomerId).then((data) => {
        if (data !== {}) {
            console.log(data);
            $('#fullNameDep').val(data.fullName);
                $('#emailDep').val(data.email);
                $('#balanceDep').val(data.balance);
                $('#transactionAmountDep').val('');
                $('#mdDeposit').modal('show');
            
        } else {
            alert('Customer not found');
        }
    }).catch((error) => {
        console.log(error);
    });
})
