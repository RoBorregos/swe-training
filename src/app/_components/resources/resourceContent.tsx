
const ResourceContent = ({ topic }: { topic: string }) => {
  switch (topic) {
    case "Complexities":
      return (
        <>
          <h2 className="text-xl font-semibold mb-2">Complejidades</h2>
          <p>
            Las complejidades describen el rendimiento de un algoritmo en tiempo y espacio...
          </p>
        </>
      );

    case "Arrays":
      return (
        <>
          <h2 className="text-xl font-semibold mb-2">Arrays</h2>
          <p>
            Un array es una estructura de datos que almacena elementos en posiciones contiguas...
          </p>
        </>
      );

    case "Searching Algorithms":
      return (
        <>
          <h2 className="text-xl font-semibold mb-2">Algoritmos de Búsqueda</h2>
          <p>
            Incluyen búsqueda lineal, binaria, etc.
          </p>
        </>
      );

    case "Sorting Algorithms":
      return (
        <>
          <h2 className="text-xl font-semibold mb-2">Algoritmos de Ordenamiento</h2>
          <p>
            QuickSort, MergeSort, BubbleSort, etc.
          </p>
        </>
      );

    case "Hashing":
      return (
        <>
          <h2 className="text-xl font-semibold mb-2">Hashing</h2>
          <p>
            Hashing es un método para mapear datos a una estructura de tamaño fijo.
          </p>
        </>
      );

    default:
      return <p>Contenido no disponible.</p>;
  }
};

export default ResourceContent;
