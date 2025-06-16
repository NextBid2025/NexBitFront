import type { Auction } from "@/types/auction"

class AuctionStore {
  private auctions: Auction[] = [
    {
      id: "1",
      nombre: "Juego de Porcelana China",
      descripcion: "Servicio de té completo de porcelana china, con delicados diseños florales pintados a mano.",
      precioInicial: 150.0,
      precioActual: 180.0,
      incrementoMinimo: 5.0,
      reservaPrecio: 250.0,
      inicioTiempo: "2025-06-20T09:00:00.000Z",
      finTiempo: "2025-06-27T09:00:00.000Z",
      estado: "Activa",
      vendedorId: "uvwxy13579",
      productoId: "zABCD24680",
      numeroOfertas: 12,
    },
    {
      id: "2",
      nombre: "Reloj Antiguo de Pared",
      descripcion: "Reloj de pared del siglo XIX, funcionando perfectamente.",
      precioInicial: 200.0,
      precioActual: 250.0,
      incrementoMinimo: 10.0,
      reservaPrecio: 400.0,
      inicioTiempo: "2025-06-21T10:00:00.000Z",
      finTiempo: "2025-06-28T10:00:00.000Z",
      estado: "Activa",
      vendedorId: "user456",
      productoId: "prod789",
      numeroOfertas: 8,
    },
    {
      id: "3",
      nombre: "Pintura al Óleo Original",
      descripcion: "Hermosa pintura al óleo de paisaje montañoso, firmada por el artista.",
      precioInicial: 300.0,
      precioActual: 350.0,
      incrementoMinimo: 15.0,
      reservaPrecio: 500.0,
      inicioTiempo: "2025-06-22T14:00:00.000Z",
      finTiempo: "2025-06-29T14:00:00.000Z",
      estado: "Finalizada",
      vendedorId: "artist123",
      productoId: "art456",
      numeroOfertas: 25,
    },
  ]

  private listeners: Array<() => void> = []

  // Obtener todas las subastas
  getAll(): Auction[] {
    return [...this.auctions]
  }

  // Obtener subasta por ID
  getById(id: string): Auction | null {
    return this.auctions.find((auction) => auction.id === id) || null
  }

  // Agregar nueva subasta
  add(auction: Auction): Auction {
    const newAuction = {
      ...auction,
      id: Date.now().toString(),
      precioActual: auction.precioInicial,
      numeroOfertas: 0,
    }

    this.auctions.unshift(newAuction) // Agregar al inicio
    this.notifyListeners()
    console.log("✅ Subasta agregada al store:", newAuction)
    return newAuction
  }

  // Actualizar subasta
  update(id: string, updates: Partial<Auction>): Auction | null {
    const index = this.auctions.findIndex((auction) => auction.id === id)
    if (index === -1) return null

    this.auctions[index] = { ...this.auctions[index], ...updates }
    this.notifyListeners()
    console.log("✅ Subasta actualizada:", this.auctions[index])
    return this.auctions[index]
  }

  // Eliminar subasta
  delete(id: string): boolean {
    const index = this.auctions.findIndex((auction) => auction.id === id)
    if (index === -1) return false

    this.auctions.splice(index, 1)
    this.notifyListeners()
    console.log("✅ Subasta eliminada:", id)
    return true
  }

  // Filtrar por estado
  getByStatus(estado: string): Auction[] {
    return this.auctions.filter((auction) => auction.estado === estado)
  }

  // Filtrar por vendedor
  getBySeller(vendedorId: string): Auction[] {
    return this.auctions.filter((auction) => auction.vendedorId === vendedorId)
  }

  // Sistema de suscripción para actualizaciones en tiempo real
  subscribe(listener: () => void): () => void {
    this.listeners.push(listener)
    return () => {
      const index = this.listeners.indexOf(listener)
      if (index > -1) {
        this.listeners.splice(index, 1)
      }
    }
  }

  private notifyListeners() {
    this.listeners.forEach((listener) => listener())
  }

  // Limpiar store (para testing)
  clear() {
    this.auctions = []
    this.notifyListeners()
  }

  // Obtener estadísticas
  getStats() {
    return {
      total: this.auctions.length,
      activas: this.auctions.filter((a) => a.estado === "Activa").length,
      finalizadas: this.auctions.filter((a) => a.estado === "Finalizada").length,
      programadas: this.auctions.filter((a) => a.estado === "Programada").length,
    }
  }
}

export const auctionStore = new AuctionStore()
