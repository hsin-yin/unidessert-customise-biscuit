function togglePaymentInfo(option) {
    var creditCardInfo = document.getElementById('credit-card-info');
    // var cashInfo = document.getElementById('cash-info');

    if (option === 'credit-card') {
        creditCardInfo.style.display = 'block';
        // cashInfo.style.display = 'none';
    } else if (option === 'cash') {
        creditCardInfo.style.display = 'none';
        // cashInfo.style.display = 'block';
    }
}

function toggleBillInfo(option) {
    // var companyBillInfo = document.getElementById('company-bill-info');
    var cloudInvoiceInfo = document.getElementById('cloud-invoice-info');
    var donateBillInfo = document.getElementById('donate-bill-info');
    var phoneInfo = document.getElementById("phoneInfo");
    var naturalInfo = document.getElementById("naturalInfo");

    if (option === 'companyBill') {
        // companyBillInfo.style.display = 'block';
        cloudInvoiceInfo.style.display = 'none';
        donateBillInfo.style.display = 'none';
        phoneInfo.style.display = 'none';
        naturalInfo.style.display = 'none';

    } else if (option === 'cloudInvoice') {
        // companyBillInfo.style.display = 'none';
        cloudInvoiceInfo.style.display = 'block';
        donateBillInfo.style.display = 'none';
        donateBillInfo.removeAttribute('required');
        phoneInfo.style.display = 'block';
        naturalInfo.style.display = 'none';

    } else if (option === 'donateBill') {
        // companyBillInfo.style.display = 'none';
        cloudInvoiceInfo.style.display = 'none';
        donateBillInfo.style.display = 'block';
        phoneInfo.style.display = 'none';
        naturalInfo.style.display = 'none';
    }
}
function toggleCloudInfo() {
    var selectElement = document.getElementById('invoiceTypeSelect');
    var selectedOption = selectElement.options[selectElement.selectedIndex].value;
    var phoneInfo = document.getElementById('phoneInfo');
    var naturalInfo = document.getElementById('naturalInfo');
    var cloudInvoice_input = document.getElementById('cloudInvoice_input');
    var naturalInfo_input = document.getElementById('naturalInfo_input');

    if (selectedOption === 'phoneInvoice') {
        phoneInfo.style.display = 'block';
        cloudInvoice_input.setAttribute('required', true);
        naturalInfo.style.display = 'none';
        naturalInfo_input.removeAttribute('required');
    } else if (selectedOption === 'naturalInvoice') {
        phoneInfo.style.display = 'none';
        cloudInvoice_input.removeAttribute('required');
        naturalInfo.style.display = 'block';
        naturalInfo_input.setAttribute('required', true);
    }
}

function validateForm() {
    var recipient = document.getElementById('recipient').value;
    var address_code = document.getElementById('address_code').value;
    var address = document.getElementById('address').value;
    var tel = document.getElementById('tel').value;
    var email = document.getElementById('email').value;
    var arrive_date = document.getElementById('arrive_date').value;

    // 檢查必填字段是否為空
    if (recipient === '' || address_code === '' || address === '' || tel === '' || email === '' || arrive_date === '') {
        alert('請填寫所有必填資料。');
        return false; // 阻止表單提交
    }
    // 其他自定義驗證邏輯

    return true; // 允許表單提交
}

window.addEventListener('load', function () {
    var cartform = document.getElementById('cartform');

    const today = new Date();
    let formattedToday = today.setDate(today.getDate() + 7)  // 最快到貨時間為七天後
    formattedToday = today.toISOString().split('T')[0];  //格式化成 YYYY-MM-DD
    document.getElementById('arrive_date').min = formattedToday;

    $("#cartform_button").on('click', function (e) {
        e.preventDefault();
        var recipient = document.getElementById('recipient').value
        var address_code = document.getElementById('address_code').value
        var address = document.getElementById('address').value
        var tel = document.getElementById('tel').value
        var email = document.getElementById('email').value
        var bill_option_checked = document.getElementById('invoiceTypeSelect').value
        var arrive_date = document.getElementById('arrive_date').value

        if (document.getElementById('cloud-invoice-info').style.display === 'block') {
            if (bill_option_checked === 'naturalInvoice') {
                var bill_option_input = document.getElementById('naturalInfo_input').value
                var bill_option = '自然人條碼'
            } else {
                bill_option_input = document.getElementById('cloudInvoice_input').value
                bill_option = '手機條碼'
            }
        } else {
            bill_option = '捐贈發票'
            bill_option_input = document.getElementById('donate_bill_option').value
        }
        if (cartform.checkValidity()) {
            var data = {
                recipient: recipient,
                recipient_address_code: address_code,
                address_code: address_code,
                address: address,
                tel: tel,
                email: email,
                bill_option: bill_option,
                bill_option_input: bill_option_input,
                arrive_date: arrive_date
            };
            $.ajax({
                url: "http://localhost:5678/cart/fillout",
                method: "post",
                contentType: "application/json",
                data: JSON.stringify(data),
                success: function (res) {
                    console.log('表單填寫完成')
                    window.location.assign(`/cart/check/${res.oid}`);
                },
                error: function (err) {
                    alert("發生錯誤 請重新操作");
                }
            });
        } else {
            alert('資料未填寫完成')
        }
    });
});