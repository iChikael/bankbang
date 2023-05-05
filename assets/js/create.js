$('#btnCreate').on('click', function () {
    $('#mdCreate').modal('show');
});

let currentId;

function findAllProvince() {
    $.ajax({
        type: "GET",
        url: "https://vapi.vnappmob.com/api/province"
    })
        .done((data) => {
            let provinces = data.results;
            $.each(provinces, (index, item) => {
                let str = `<option value = "${item.province_id}">${item.province_name}</option>`;
                $('#provinceCre').append(str);
            })
        })
        .fail((jqXHR) => {
            console.log(jqXHR);
        })
}

findAllProvince();

function findAllDistrictByProvince(provinceId, selectElementId) {
    $.ajax({
        type: "GET",
        url: "https://vapi.vnappmob.com/api/province/district/" + provinceId
    })
        .done((data) => {
            let districts = data.results;
            $.each(districts, (index, item) => {
                let str = `<option value="${item.district_id}">${item.district_name}</option>`;
                $('#' + selectElementId).append(str);
            })
        })
        .fail((jqXHR) => {
            console.log(jqXHR);
        })
}

function handleChangeProvinceForUpdate() {
    $('#provinceCre').on('change', function () {
        let provinceId = $(this).val();
        $('#districtCre').empty();
        $('#wardCre').empty();
        if (provinceId) {
            findAllDistrictByProvince(provinceId, 'districtCre');
        }
    });

    $('#districtCre').on('change', function () {
        let districtId = $(this).val();
        $('#wardCre').empty();
        if (districtId) {
            findAllWardByDistrict(districtId, 'wardCre');
        }
    });
}

handleChangeProvinceForUpdate();


function findAllWardByDistrict(districtId, selectElementId) {
    $.ajax({
        type: "GET",
        url: "https://vapi.vnappmob.com/api/province/ward/" + districtId
    })
        .done((data) => {
            let wards = data.results;
            console.log(wards);
            $.each(wards, (index, item) => {
                let str = `<option value="${item.ward_id}">${item.ward_name}</option>`;
                $('#' + selectElementId).append(str);
            })
        })
        .fail((jqXHR) => {
            console.log(jqXHR);
        })
}

findAllWardByDistrict('districtId', 'wardSelectElementId');



$('#btSave').on('click', function () {
    let id = currentId
    let fullName = $('#fullNameCre').val();
    let email = $('#emailCre').val();
    let phone = $('#phoneCre').val();
    let address = $('#addressCre').val();
    let balance = 0
    let deleted = false;
    let locationRegion = {
        id: 1,
        provinceId: $('#provinceCre').val(),
        provinceName: $('#provinceCre option:selected').text(),
        districtId: $('#districtCre').val(),
        districtName: $('#districtCre option:selected').text(),
        wardId: $('#wardCre').val(),
        wardName: $('#wardCre option:selected').text(),
        address: address
    };
    let customer = {
        fullName,
        email,
        phone,
        locationRegion,
        balance,
        deleted,
        id
    }
    currentId++;
    $.ajax({
        url: 'http://localhost:3300/customers',
        type: 'POST',
        data: JSON.stringify(customer),
        contentType: 'application/json',
        success: function (response) {
            let str = renderCustomer(customer);
            $('#tbCustomer tbody').prepend(str);

            $('#mdCreate').modal('hide');
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Customer have been save successful',
                showConfirmButton: false,
                timer: 1500
            });
        },
        error: function (error) {
            console.log(error);
        }
    });
});
