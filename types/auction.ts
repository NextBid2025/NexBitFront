export interface Auction {
  id?: string
  nombre: string
  descripcion: string
  precioInicial: number
  incrementoMinimo: number
  reservaPrecio: number
  inicioTiempo: string
  finTiempo: string
  estado: "Activa" | "Finalizada" | "Programada" | "Cancelada"
  vendedorId: string
  productoId: string
  // Campos adicionales que podríamos necesitar
  precioActual?: number
  numeroOfertas?: number
  ganadorId?: string
}

export interface CreateAuctionRequest {
  nombre: string
  descripcion: string
  precioInicial: number
  incrementoMinimo: number
  reservaPrecio: number
  inicioTiempo: string
  finTiempo: string
  vendedorId: string
  productoId: string
}

export interface AuctionResponse {
  success: boolean
  data?: Auction | Auction[]
  message?: string
  error?: string
}
