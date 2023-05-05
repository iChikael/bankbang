$('#btnWithdraw').on('click', () => {
    getCustomerById(currentCustomerId).then((data) => {
        let customer = data;
        let currentBalance = customer.balance;
        let transactionAmount = +$('#transactionAmountWd').val();
        let newBalance = currentBalance - transactionAmount;
        if (transactionAmount > currentBalance) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Transaction amount cannot be greater than current balance!'
            });
            return;
        }
        if (isNaN(transactionAmount) || transactionAmount < 0 || !transactionAmount) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Transaction amount must be a positive number !!!'
            });
            return;
        }

        customer.balance = newBalance;

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

              

                $('#mdWithdraw').modal('hide');
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Withdraw successful',
                    showConfirmButton: false,
                    timer: 1500
                });
                getAllCustomers();
            });

        let withdraw = {
            customerId,
            transactionAmount
        };

        $.ajax({
            type: 'POST',
            headers: {
                'accept': 'application/json',
                'content-type': 'application/json'
            },
            url: 'http://localhost:3300/withdraws',
            data: JSON.stringify(withdraw)
        });
    })
        .catch((error) => {
            console.log(error);
        });
});


$('#mdAction').on('click', 'button.withdraw', function () {
    $('#mdAction').modal('hide');
    $('#mdWithdraw').modal('show');
    getCustomerById(currentCustomerId).then((data) => {
        if (data !== {}) {
            console.log(data);
            $('#fullNameWd').val(data.fullName);
            $('#emailWd').val(data.email);
            $('#balanceWd').val(data.balance);
            $('#transactionAmountWd').val('');
            $('#mdWithdraw').modal('show');
            
        } else {
            alert('Customer not found');
        }
    }).catch((error) => {
        console.log(error);
    });
})