// Punto 3: parsear, filtrar disponibles, agrupar por categoría y stringificar
// Ejecutar con: node script.js
const fs = require("fs");

try {
  // 1. Leer el archivo como TEXTO y PARSEARLO a objeto JS
  const texto = fs.readFileSync("./catalogo.json", "utf-8");
  const catalogo = JSON.parse(texto);
  console.log("Total de productos:", catalogo.productos.length);

  // 2. FILTRAR solo los productos disponibles
  const disponibles = catalogo.productos.filter((p) => p.disponible === true);
  console.log("Productos disponibles:", disponibles.length);

  // 3. AGRUPAR por categoría usando reduce
  const porCategoria = disponibles.reduce((grupos, producto) => {
    const cat = producto.categoria;
    if (!grupos[cat]) {
      grupos[cat] = []; // si la categoría no existe aún, se crea vacía
    }
    grupos[cat].push(producto);
    return grupos;
  }, {});

  // 4. STRINGIFICAR el resultado (con sangría de 2 espacios)
  const resultadoJSON = JSON.stringify(porCategoria, null, 2);
  console.log("\nAgrupados por categoría:\n", resultadoJSON);

  // (Opcional) guardar el resultado en otro archivo
  fs.writeFileSync("./disponibles_por_categoria.json", resultadoJSON);
  console.log("\nArchivo disponibles_por_categoria.json creado.");
} catch (error) {
  // Si el JSON está mal escrito o el archivo no existe, se captura aquí
  console.error("Error procesando el catálogo:", error.message);
}