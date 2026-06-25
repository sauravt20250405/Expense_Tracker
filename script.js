let totalExpenses = 0;
let totalItemCount = 0;

function addExpense() {
    const nameInput = document.getElementById('expenseName');
    const amountInput = document.getElementById('expenseAmount');
    const qtyInput = document.getElementById('expenseQty');

    let expenseName = nameInput.value.trim();
    let expenseAmount = parseFloat(amountInput.value);
    let expenseQty = parseInt(qtyInput.value);

    // Validation
    if (expenseName !== "" && !isNaN(expenseAmount) && expenseAmount > 0 && !isNaN(expenseQty) && expenseQty > 0) {
        
        // Calculate subtotal for this specific entry
        let itemTotal = expenseAmount * expenseQty;
        
        // Target table body
        let expenseList = document.getElementById('expenseList');
        
        // Create table row
        let row = document.createElement('tr');
        
        row.innerHTML = `
            <td><strong>${expenseName}</strong></td>
            <td>$${expenseAmount.toFixed(2)}</td>
            <td>${expenseQty}</td>
            <td>$${itemTotal.toFixed(2)}</td>
            <td><button class="btn-delete" onclick="deleteExpense(this, ${itemTotal}, ${expenseQty})">Delete</button></td>
        `;
        
        // Append row to table
        expenseList.appendChild(row);
        
        // Update App Totals
        totalExpenses += itemTotal;
        totalItemCount += expenseQty;
        
        updateDisplays();
        
        // Reset Input Fields cleanly
        nameInput.value = "";
        amountInput.value = "";
        qtyInput.value = "1"; // Default back to 1
        
    } else {
        alert("Please enter a valid expense name, price, and quantity (greater than 0).");
    }
}

function deleteExpense(button, itemTotal, itemQty) {
    // Remove row from UI
    let row = button.parentElement.parentElement;
    row.remove();
    
    // Subtract from running tracker metrics
    totalExpenses -= itemTotal;
    totalItemCount -= itemQty;
    
    updateDisplays();
}

function updateDisplays() {
    document.getElementById('totalExpenses').innerHTML = totalExpenses.toFixed(2);
    document.getElementById('itemCount').innerHTML = totalItemCount;
}