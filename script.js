fetch('./data.csv')
    .then(response => response.text())
    .then(csvText => {
        const lines = csvText.trim().split('\n');
        const headers = lines[0].split(',');
        const data = lines.slice(1).map(line => {
            const values = line.split(',');
            return headers.reduce((obj, header, i) => {
                obj[header] = values[i];
                return obj;
            }, {});
        });

        const table = document.getElementById('sales-table').getElementsByTagName('tbody')[0];
        let totalSales = 0;
        data.forEach(row => {
            const newRow = table.insertRow();
            newRow.innerHTML = `
                <td>${row.Product}</td>
                <td>${row.Quantity}</td>
                <td>${row.Price}</td>
                <td>${row.Date}</td>
            `;
            totalSales += row.Quantity * row.Price;
        });
        document.getElementById('total-sales').textContent = totalSales.toFixed(2);
    });