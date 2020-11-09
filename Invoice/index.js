const rows_array = [1];

const addTableRow = (event) => {
    event.preventDefault()

    const table_body = document.getElementById("table_body");
    const rowId = table_body.rows.length + 1;
    // let addRow = table_body.innerHTML;
    let addRow = ""
    addRow += "<tr id='table_row_" + rowId + "'>";
    addRow += "<td>";
    addRow += "<input type='text' class='form-control'>";
    addRow += "</td>";
    addRow += "<td>";
    addRow += "<input type='number' id='total_fee_" + rowId + "' name='total_fee' onchange='onChange(" + rowId + ")' class='form-control'>";
    addRow += "</td>";
    addRow += "<td>";
    addRow += "<div class='input-group'>";
    addRow += "<input type='number' min='1' max='100' class='form-control' id='com_percent_" + rowId + "' onchange  ='onChange(" + rowId + ")' aria-label='Amount (to the nearest dollar)'>";
    addRow += "<div class='input-group-append'>";
    addRow += " <span class='input-group-text'>%</span>";
    addRow += "</div>";
    addRow += "</div>";
    addRow += "</td>";
    addRow += "<td>";
    addRow += "<input type='number' id='com_ammount_" + rowId + "'  class='form-control' disabled>";
    addRow += "</td>";
    addRow += "<td>";
    addRow += "<div class='form-group'>";
    addRow += "<select class='form-control' id='t_tax_" + rowId + "' disabled>";
    addRow += "<option value='10'>GST(10%)</option>";
    addRow += "</select>";
    addRow += "</div>";
    addRow += "</td>";
    addRow += "<td>";
    addRow += "<input type='number' id='tax_ammount_" + rowId + "' class='form-control' disabled>";
    addRow += "</td>";
    addRow += "<td>";
    addRow += "<div class='input-group'>";
    addRow += "<input type='text'  class='form-control' disabled id='t_total_ammount_" + rowId + "' aria-label='Amount (to the nearest dollar)'>";
    addRow += "<div class='input-group-append'>";
    addRow += "<span class='input-group-text' style='background-color:#e12a3a;color:#fff' onclick='closeItem(event," + rowId + ")'> <i class='fas fa-trash-alt'></i></span>";
    addRow += "</div>";
    addRow += "</div>";
    addRow += "</td> ";
    addRow += "</tr> ";

    // table_body.innerHTML = addRow;
    table_body.insertAdjacentHTML("beforeend", addRow);
    rows_array.push(rowId);

}


const onChange = (rowId) => {
    
    const total_fee = Number(document.getElementById("total_fee_" + rowId).value);
    const com_percent = Number(document.getElementById("com_percent_" + rowId).value) / 100;
    const com_ammount = (total_fee * com_percent).toFixed(2);
    document.getElementById("com_ammount_" + rowId).value = com_ammount;
    const t_tax = Number(document.getElementById("t_tax_" + rowId).value) / 100;

    const tax_ammount = Number((total_fee * t_tax).toFixed(2));
    document.getElementById("tax_ammount_" + rowId).value = tax_ammount
    document.getElementById("t_total_ammount_" + rowId).value = Number(total_fee - com_ammount + tax_ammount).toFixed(2);

    calculation()
    totalDue()
}

const calculation = () => {
    const table_body = document.getElementById("table_body");
    const table_body_length = table_body.rows.length;


    let add_commisson = 0;
    let add_tax_ammount = 0;
    let add_total_ammount = 0;

    for (let init = 0; init < table_body_length; init++) {

        add_commisson += Number(document.getElementById("com_ammount_" + rows_array[init]).value || 0);
        add_tax_ammount += Number(document.getElementById("tax_ammount_" + rows_array[init]).value || 0);
        add_total_ammount += Number(document.getElementById("t_total_ammount_" + rows_array[init]).value || 0);

    }

    document.getElementById("commission_claimed").value = add_commisson.toFixed(2);
    document.getElementById("total_ammount").value = add_tax_ammount.toFixed(2);
    document.getElementById("total_ammount_inc_tax").value = add_total_ammount.toFixed(2);


}

const totalDue = () => {
    const total_paid = document.getElementById("total_paid").value;
    const total_due = document.getElementById("total_due");
    const total_ammount_inc_tax = document.getElementById("total_ammount_inc_tax").value;
    total_due.value = (total_ammount_inc_tax - total_paid).toFixed(2);
}


const closeItem = (event, rowId) => {
    event.preventDefault();
    document.getElementById("table_row_" + rowId).remove()
    rows_array.splice(rows_array.indexOf(rowId),1);
    calculation();
    totalDue()



}


const add_payment_item = (event) => {
    event.preventDefault();
    let item = document.getElementById("add_payment_item");
    const itemId = item.children.length + 1;
    let addRow = "";

    addRow += "<div class='col-lg-12' id='payment_" + itemId + "'>";
    addRow += "<div id='add_item'>";
    addRow += "<div class='row'>";
    addRow += "<div class='col-lg-3 mb-3'>";
    addRow += "<div class='input-group'>";
    addRow += "<input type='text' class='form-control' id='payment_received__" + itemId + "' aria-label='Amount (to the nearest dollar)'>";
    addRow += "<div class='input-group-append'>";
    addRow += "<span class='input-group-text'>AUD</span>";
    addRow += "</div>";
    addRow += "</div>";
    addRow += "</div>";
    addRow += "<div class='col-lg-2 mb-3'>";
    addRow += "<div class='form-group'>";
    addRow += "<select class='form-control' id='cheque__" + itemId + "'>";
    addRow += "<option>Cheque</option>";
    addRow += "</select>";
    addRow += "</div>";
    addRow += "</div>";
    addRow += "<div class='col-lg-3 mb-3'>";
    addRow += "<div class='notes'>";
    addRow += "<textarea class='form-control' id='notes__" + itemId + "' rows='4' cols='50'></textarea>";
    addRow += "</div>";
    addRow += "</div>";
    addRow += "<div class='col-lg-3 mb-3'>";
    addRow += "<input type='file' id='fileupload_" + itemId + "' style='display:none'/>";
    addRow += "<div class='click_upload' id='file_" + itemId + "' onclick='fileUpload(event," + itemId + ")'>";
    addRow += "<p style='font-weight: bold'>Click to upload</p>";
    addRow += " </div>";
    addRow += "</div>";
    addRow += "<div class='col-lg-1 mb-3'>";
    addRow += " <span class='input-group-text payment_delete ' style='background-color:#e12a3a;color:#fff' onclick='payment_delete(event," + itemId + ")'> <i class='fas fa-trash-alt'></i></span>";
    addRow += "</div>";
    addRow += "</div>";
    addRow += "</div>";
    addRow += "</div>";




    item.insertAdjacentHTML("beforeend", addRow);
    rows_array.push(itemId);

    // item.innerHTML = addRow;



}

const fileUpload = (event, itemId) => {
    event.preventDefault;
    document.getElementById("fileupload_" + itemId).click();
    document.getElementById("fileupload_" + itemId).style = "display:block";
    document.getElementById("file_" + itemId).style = "display:none";

}

const payment_delete = (event, itemId) => {
    event.preventDefault;
    document.getElementById("payment_" + itemId).remove()


}