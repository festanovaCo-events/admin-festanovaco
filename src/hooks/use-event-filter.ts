import { useMemo } from "react";
import { Event, SortOption } from "@/interfaces";

/**
 * Hook personalizado para filtrar y ordenar eventos
 * Implementa el principio de Single Responsibility
 * 
 * @param events - Array de eventos a filtrar y ordenar
 * @param searchQuery - Query de búsqueda
 * @param sortBy - Opción de ordenamiento
 * @returns Array de eventos filtrados y ordenados
 */
export function useEventFilter(
  events: Event[],
  searchQuery: string,
  sortBy: SortOption
): Event[] {
  return useMemo(() => {
    let filtered = events;

    // Filtrar por búsqueda
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (event) =>
          event.title.toLowerCase().includes(query) ||
          event.description.toLowerCase().includes(query) ||
          event.location.toLowerCase().includes(query)
      );
    }

    // Ordenar
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case "latest":
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        case "oldest":
          return (
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          );
        case "title":
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

    return sorted;
  }, [events, searchQuery, sortBy]);
}

