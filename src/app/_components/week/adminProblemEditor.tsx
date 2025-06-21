'use client';

import { useState } from "react";
import { api } from "~/trpc/react";

export default function AdminProblemEditor({ weekId, problems }) {
    const [localProblems, setLocalProblems] = useState(problems);

    const utils = api.useUtils();
    const create = api.problem.create.useMutation({
        onSuccess: async () => {
            const updated = await utils.week.getWeeks.fetch();
            const currentWeek = updated.find(w => w.id === weekId);
            setLocalProblems(currentWeek?.problems || []);
        }
    });

    const update = api.problem.update.useMutation({
        onSuccess: async () => {
            const updated = await utils.week.getWeeks.fetch();
            const currentWeek = updated.find(w => w.id === weekId);
            setLocalProblems(currentWeek?.problems || []);
        }
    });

    const remove = api.problem.delete.useMutation({
        onSuccess: async () => {
            const updated = await utils.week.getWeeks.fetch();
            const currentWeek = updated.find(w => w.id === weekId);
            setLocalProblems(currentWeek?.problems || []);
        }
    });

    const handleAdd = () => {
        const name = prompt("Nombre del problema:");
        const leetcodeUrl = prompt("Link a LeetCode:");
        const level = prompt("Dificultad (Easy, Medium, Hard):");
        const status = prompt("Estado (TODO, SOLVED):");

        if (name && leetcodeUrl && level && status) {
            create.mutate({ weekId, name, leetcodeUrl, level, status });
        }
    };

    const handleEdit = (p) => {
        const name = prompt("Nombre:", p.name);
        const leetcodeUrl = prompt("Link:", p.leetcodeUrl);
        const level = prompt("Dificultad:", p.level);
        const status = prompt("Estado:", p.status);

        if (name && leetcodeUrl && level && status) {
            update.mutate({ id: p.id, name, leetcodeUrl, level, status });
        }
    };

    const handleDelete = (id) => {
        if (confirm("¿Eliminar problema?")) {
            remove.mutate({ id });
        }
    };

    return (
        <div className="mt-4 border-t pt-4">
            <h4 className="font-bold text-lg">Problemas de la semana:</h4>

            <ul className="mt-2 space-y-2">
                {localProblems.map((p) => (
                    <li key={p.id} className="border p-2 rounded flex justify-between">
                        <div>
                            <p className="font-semibold">{p.name}</p>
                            <a href={p.leetcodeUrl} className="text-blue-500 text-sm" target="_blank">
                                {p.leetcodeUrl}
                            </a>
                            <p className="text-sm">Dificultad: {p.level}</p>
                            <p className="text-sm">Estado: {p.status}</p>
                        </div>
                        <div className="flex gap-2">
                            <button onClick={() => handleEdit(p)} className="text-yellow-600">Editar</button>
                            <button onClick={() => handleDelete(p.id)} className="text-red-600">Eliminar</button>
                        </div>
                    </li>
                ))}
            </ul>

            <button onClick={handleAdd} className="mt-4 bg-green-600 text-white px-3 py-1 rounded">
                + Agregar problema
            </button>
        </div>
    );
}
