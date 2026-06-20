// Sincronizar inputs con la factura en tiempo real
document.getElementById('inNombre').addEventListener('input', e => document.getElementById('outNombre').innerText = e.target.value || "____________________");
document.getElementById('inRUC').addEventListener('input', e => document.getElementById('outRUC').innerText = e.target.value || "____________________");
document.getElementById('inFecha').addEventListener('input', e => document.getElementById('outFecha').innerText = e.target.value || "--/--/----");

function agregarFila() {
    const cuerpo = document.getElementById('cuerpoTabla');
    const tr = document.createElement('tr');

    tr.innerHTML = `
        <td><input type="text" class="editable-cell" placeholder="Producto/Servicio"></td>
        <td><input type="number" class="editable-cell cant" value="1" min="1" oninput="calcular()"></td>
        <td><input type="number" class="editable-cell prec" value="0" min="0" oninput="calcular()"></td>
        <td class="sub-fila">Gs. 0</td>
        <td class="no-print"><button class="btn-del" onclick="eliminarFila(this)">Eliminar</button></td>
    `;
    cuerpo.appendChild(tr);
    calcular(); // Recalcular al agregar
}

function eliminarFila(btn) {
    btn.closest('tr').remove();
    calcular(); // Recalcular al eliminar
}

function calcular() {
    let subtotalGral = 0;
    // Usamos querySelectorAll para cumplir con la consigna
    const filas = document.querySelectorAll('#cuerpoTabla tr');

    filas.forEach(fila => {
        const c = parseFloat(fila.querySelector('.cant').value) || 0;
        const p = parseFloat(fila.querySelector('.prec').value) || 0;
        const sub = c * p;
        // Formateo local para Guaraníes
        fila.querySelector('.sub-fila').innerText = "Gs. " + sub.toLocaleString('es-PY');
        subtotalGral += sub;
    });

    const iva = subtotalGral * 0.10; // IVA 10%
    const total = subtotalGral + iva;

    // Actualizar totales en el DOM
    document.getElementById('subtotalGral').innerText = "Gs. " + subtotalGral.toLocaleString('es-PY');
    document.getElementById('iva').innerText = "Gs. " + iva.toLocaleString('es-PY');
    document.getElementById('total').innerText = "Gs. " + total.toLocaleString('es-PY');
}

// Número de factura aleatorio y primera fila al iniciar
window.onload = () => {
    // Generar número formato 001-001-XXXXXX
    const num = Math.floor(Math.random() * 900000 + 100000);
    document.getElementById('numFactura').innerText = `001-001-${num}`;
    agregarFila(); // Iniciar con una fila vacía
};