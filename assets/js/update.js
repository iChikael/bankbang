function findAllProvinceForUpdate() {
    $.ajax({
        type: "GET",
        url: "https://vapi.vnappmob.com/api/province"
    })
        .done((data) => {
            let provinces = data.results;
            $.each(provinces, (index, item) => {
                let str = `<option value = "${item.province_id}">${item.province_name}</option>`;
                $('#provinceUp').append(str);
            })
        })
        .fail((jqXHR) => {
            console.log(jqXHR);
        })
}

findAllProvinceForUpdate();


function handleChangeProvince() {
    $('#provinceUp').on('change', function () {
        let provinceId = $(this).val();
        $('#districtUp').empty();
        $('#wardUp').empty();
        if (provinceId) {
            findAllDistrictByProvinceForUpdate(provinceId, 'districtUp');
        }
    });

    $('#districtUp').on('change', function () {
        let districtId = $(this).val();
        $('#wardUp').empty();
        if (districtId) {
            findAllWardByDistrictForUpdate(districtId, 'wardUp');
        }
    });
}

handleChangeProvince();

function findAllDistrictByProvinceForUpdate(provinceId, selectElementId) {
    $.ajax({
        type: "GET",
        url: "https://vapi.vnappmob.com/api/province/district/" + provinceId
    })
        .done((data) => {
            let districts = data.results;
            $.each(districts, (index, item) => {
                let str = `<option value="${item.district_id}">${item.district_name}</option>`;
                $('#districtUp').append(str);
            })
        })
        .fail((jqXHR) => {
            console.log(jqXHR);
        })
}
findAllDistrictByProvinceForUpdate(provinceId, 'districtUp');

function findAllWardByDistrictForUpdate(districtId, selectElementId) {
    $.ajax({
        type: "GET",
        url: "https://vapi.vnappmob.com/api/province/ward/" + districtId
    })
        .done((data) => {
            let wards = data.results;
            console.log(wards);
            $.each(wards, (index, item) => {
                let str = `<option value="${item.ward_id}">${item.ward_name}</option>`;

                $('#wardUp').append(str);
            })
        })
        .fail((jqXHR) => {
            console.log(jqXHR);
        })
}

findAllWardByDistrictForUpdate(districtId, 'wardUp');

