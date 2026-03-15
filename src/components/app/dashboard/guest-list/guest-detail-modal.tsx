"use client";

import { useState, useMemo } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/shadcn/ui/dialog";
import { Badge } from "@/components/shadcn/ui/badge";
import { Input } from "@/components/shadcn/ui/input";
import {
  CheckCircle2,
  XCircle,
  Mail,
  Phone,
  Calendar,
  Search,
} from "lucide-react";
import { GuestDetailModalProps } from "@/interfaces";
import { cn } from "@/lib/utils";

export const GuestDetailModal: React.FC<GuestDetailModalProps> = ({
  open,
  onOpenChange,
  guestList,
  formatDate,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<
    "all" | "confirmed" | "pending"
  >("all");

  if (!guestList) return null;

  const confirmedGuests = guestList.guests.filter((g) => g.confirmed);
  const pendingGuests = guestList.guests.filter((g) => !g.confirmed);

  const filteredGuests = useMemo(() => {
    let filtered = guestList.guests;

    if (filterStatus === "confirmed") {
      filtered = confirmedGuests;
    } else if (filterStatus === "pending") {
      filtered = pendingGuests;
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (guest) =>
          guest.name.toLowerCase().includes(query) ||
          guest.email.toLowerCase().includes(query) ||
          guest.phone?.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [
    guestList.guests,
    searchQuery,
    filterStatus,
    confirmedGuests,
    pendingGuests,
  ]);

  const filteredConfirmed = filteredGuests.filter((g) => g.confirmed);
  const filteredPending = filteredGuests.filter((g) => !g.confirmed);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[90vh] flex flex-col">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle className="text-2xl font-bold">
            {guestList.name}
          </DialogTitle>
          <p className="text-sm text-gray-500">
            Creado por: {guestList.owner} ({guestList.ownerEmail})
          </p>
        </DialogHeader>

        <div className="flex-1 overflow-hidden flex flex-col space-y-4">
          {/* Stats Summary */}
          <div className="grid grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg flex-shrink-0">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">
                {guestList.totalGuests}
              </p>
              <p className="text-sm text-gray-500">Total Invitados</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">
                {guestList.confirmedGuests}
              </p>
              <p className="text-sm text-gray-500">Confirmados</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-orange-600">
                {guestList.totalGuests - guestList.confirmedGuests}
              </p>
              <p className="text-sm text-gray-500">Pendientes</p>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="flex gap-3 flex-shrink-0">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="Buscar invitados..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setFilterStatus("all")}
                className={cn(
                  "px-4 py-2 rounded-md text-sm font-medium transition-colors",
                  filterStatus === "all"
                    ? "bg-gray-900 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                )}
              >
                Todos
              </button>
              <button
                onClick={() => setFilterStatus("confirmed")}
                className={cn(
                  "px-4 py-2 rounded-md text-sm font-medium transition-colors",
                  filterStatus === "confirmed"
                    ? "bg-green-600 text-white"
                    : "bg-green-50 text-green-700 hover:bg-green-100"
                )}
              >
                Confirmados
              </button>
              <button
                onClick={() => setFilterStatus("pending")}
                className={cn(
                  "px-4 py-2 rounded-md text-sm font-medium transition-colors",
                  filterStatus === "pending"
                    ? "bg-orange-600 text-white"
                    : "bg-orange-50 text-orange-700 hover:bg-orange-100"
                )}
              >
                Pendientes
              </button>
            </div>
          </div>

          {/* Guest List - Scrollable */}
          <div className="flex-1 overflow-y-auto space-y-6 pr-2">
            {/* Show filtered results based on filter status */}
            {filterStatus === "all" || filterStatus === "confirmed"
              ? filteredConfirmed.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2 sticky top-0 bg-white py-2 z-10">
                      <CheckCircle2 className="h-5 w-5 text-green-600" />
                      Confirmados (
                      {filterStatus === "all"
                        ? confirmedGuests.length
                        : filteredConfirmed.length}
                      )
                    </h3>
                    <div className="space-y-2">
                      {filteredConfirmed.map((guest) => (
                        <div
                          key={guest.id}
                          className="p-3 border border-green-200 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-2 flex-wrap">
                                <h4 className="font-semibold text-gray-900">
                                  {guest.name}
                                </h4>
                                <Badge className="bg-green-600 text-white text-xs">
                                  Confirmado
                                </Badge>
                              </div>
                              <div className="space-y-1 text-sm text-gray-600">
                                <div className="flex items-center gap-2">
                                  <Mail className="h-3.5 w-3.5 shrink-0" />
                                  <span className="truncate">
                                    {guest.email}
                                  </span>
                                </div>
                                {guest.phone && (
                                  <div className="flex items-center gap-2">
                                    <Phone className="h-3.5 w-3.5 shrink-0" />
                                    <span>{guest.phone}</span>
                                  </div>
                                )}
                                {guest.confirmedAt && (
                                  <div className="flex items-center gap-2">
                                    <Calendar className="h-3.5 w-3.5 shrink-0" />
                                    <span className="text-xs">
                                      Confirmado el:{" "}
                                      {formatDate(guest.confirmedAt)}
                                    </span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              : null}

            {filterStatus === "all" || filterStatus === "pending"
              ? filteredPending.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2 sticky top-0 bg-white py-2 z-10">
                      <XCircle className="h-5 w-5 text-orange-600" />
                      Pendientes (
                      {filterStatus === "all"
                        ? pendingGuests.length
                        : filteredPending.length}
                      )
                    </h3>
                    <div className="space-y-2">
                      {filteredPending.map((guest) => (
                        <div
                          key={guest.id}
                          className="p-3 border border-orange-200 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors"
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-2 flex-wrap">
                                <h4 className="font-semibold text-gray-900">
                                  {guest.name}
                                </h4>
                                <Badge className="bg-orange-600 text-white text-xs">
                                  Pendiente
                                </Badge>
                              </div>
                              <div className="space-y-1 text-sm text-gray-600">
                                <div className="flex items-center gap-2">
                                  <Mail className="h-3.5 w-3.5 shrink-0" />
                                  <span className="truncate">
                                    {guest.email}
                                  </span>
                                </div>
                                {guest.phone && (
                                  <div className="flex items-center gap-2">
                                    <Phone className="h-3.5 w-3.5 shrink-0" />
                                    <span>{guest.phone}</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              : null}

            {filteredGuests.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                <p className="text-lg">No se encontraron invitados</p>
                {searchQuery && (
                  <p className="text-sm mt-2">
                    Intenta con otros términos de búsqueda
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
