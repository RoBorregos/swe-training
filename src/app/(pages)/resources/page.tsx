'use client'

import { useState } from "react";
import Resources from "~/app/_components/Nav/navResources";

const resourceContent: Record<string, JSX.Element> = {
  "Complexities": <p>Las complejidades describen el rendimiento de un algoritmo en tiempo y espacio.</p>,
  "Arrays": <p>Un array es una estructura de datos que almacena elementos en posiciones contiguas de memoria.</p>,
  "Searching Algorithms": <p>Incluyen búsqueda lineal, binaria, etc.</p>,
  "Sorting Algorithms": <p>QuickSort, MergeSort, BubbleSort, etc.</p>,
  "Hashing": <p>Hashing es un método para mapear datos a una estructura de tamaño fijo.</p>,
  "Two Pointer Technique": <p>Una técnica para resolver problemas de arrays o listas enlazadas usando dos punteros.</p>,
  "Window Sliding Technique": <p>Una técnica para resolver problemas de subarrays o subsecuencias.</p>,
  "Prefix Sum Technique": <p>Una técnica para optimizar consultas de suma en subarrays.</p>,

};

const homeResources = () => {
  const [selectedResource, setSelectedResource] = useState("Complexities");

  return ( 
    <div className="flex">
      <Resources onSelect={setSelectedResource} />
      <div className="p-4">
        <h1 className="text-2xl font-bold text-white">{selectedResource}</h1>
        <div className="text-lg text-white mt-4">
          {resourceContent[selectedResource] || <p>Contenido no disponible.</p>}
        </div>
      </div>
    </div>
  );
}

export default homeResources;