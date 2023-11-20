document.addEventListener("DOMContentLoaded", function () {
    // Objek untuk menyimpan harga setiap barang
    const hargaBarang = {
        "Beras": 15000,
        "Minyak Goreng": 12000,
        "Kecap": 5000,
        "Gula": 12000,
        "Susu": 10000,
        "Kopi": 8000,
        "Teh": 7000,
        "Mentega": 15000,
        "Telur": 2000,
        "Garam": 3000
    };

    const grosirForm = document.getElementById("grosirForm");
    const grosirTableBody = document.getElementById("GrosirTableBody");
    const selectType = document.getElementById("type");
    const inputHarga = document.getElementById("harga");
    const inputDiskon = document.getElementById("diskon");

    // Menambahkan event listener untuk mendeteksi perubahan pada dropdown
    selectType.addEventListener("change", function () {
        const selectedBarang = selectType.value;
        const selectedHarga = hargaBarang[selectedBarang];

        // Mengisi nilai harga otomatis jika barang terpilih
        if (selectedHarga !== undefined) {
            inputHarga.value = selectedHarga;
        } else {
            // Mengosongkan nilai jika barang tidak terpilih
            inputHarga.value = "";
        }
    });

    // Menambahkan event listener untuk mendeteksi perubahan pada jumlah barang
    document.getElementById("jumlah_barang").addEventListener("change", function () {
        updateDiskon();
    });

    // Menambahkan event listener untuk mendeteksi perubahan pada harga
    inputHarga.addEventListener("change", function () {
        updateDiskon();
    });

    function updateDiskon() {
        // Mengambil nilai jumlah barang dan harga
        const jumlahBarang = parseInt(document.getElementById("jumlah_barang").value);
        const harga = parseFloat(inputHarga.value);

        // Menghitung total biaya tanpa diskon
        const totalBiaya = harga * jumlahBarang;

        // Mengisi nilai diskon otomatis jika total biaya lebih dari 50000
        if (totalBiaya > 50000) {
            inputDiskon.value = "5"; // Diskon tetap 5000
        } else if (totalBiaya < 50000) {
            inputDiskon.value = "0"; // Tidak ada diskon
        }
    }

    grosirForm.addEventListener("submit", function (event) {
        event.preventDefault();

        // Mengambil nilai dari formulir
        const namaBarang = document.getElementById("type").value;
        const harga = parseFloat(inputHarga.value);
        const jumlahBarang = parseInt(document.getElementById("jumlah_barang").value);
        const diskon = parseInt(inputDiskon.value);

        // Menghitung total biaya dengan memperhitungkan diskon
        const totalBiaya = (harga * jumlahBarang) - (harga * jumlahBarang * (diskon / 100));

        // Membuat baris baru di tabel
        const newRow = grosirTableBody.insertRow();
        const cell1 = newRow.insertCell(0);
        const cell2 = newRow.insertCell(1);
        const cell3 = newRow.insertCell(2);
        const cell4 = newRow.insertCell(3);
        const cell5 = newRow.insertCell(4);

        // Mengisi nilai sel-sel
        cell1.textContent = namaBarang;
        cell2.textContent = jumlahBarang;
        cell3.textContent = diskon + "%";
        cell4.textContent = "Rp " + totalBiaya.toLocaleString(); // Menampilkan total biaya dengan format mata uang
        cell5.innerHTML = '<button class="btn btn-danger" onclick="hapusBaris(this)">Hapus</button>' +
            '<button class="btn btn-primary" onclick="editBaris(this)">Edit</button>';
    });

    // Fungsi untuk menghapus baris dari tabel
    window.hapusBaris = function (button) {
        const row = button.parentNode.parentNode;
        grosirTableBody.removeChild(row);
    };

    window.editBaris = function (button) {
        const row = button.parentNode.parentNode;
        const cells = row.getElementsByTagName("td");

        // Populate the form with the values from the selected row for editing
        selectType.value = cells[0].textContent;
        inputHarga.value = hargaBarang[selectType.value];
        document.getElementById("jumlah_barang").value = cells[1].textContent;
        inputDiskon.value = cells[2].textContent.replace("%", ""); // Remove "%" before setting value

        // Remove the row from the table after editing
        grosirTableBody.removeChild(row);
    };
});
