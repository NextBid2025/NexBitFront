import type { Auction, CreateAuctionRequest, AuctionResponse } from "@/types/auction"
import { auctionStore } from "./auction-store"

// Configuración de desarrollo - ahora se puede cambiar dinámicamente
let DEVELOPMENT_MODE = true
const SERVICE_VERSION = "v2.1 - Microservicio localhost:5200/api/subastas"

class AuctionService {
  private workingUrl: string | null = null

  // Método para cambiar el modo
  setDevelopmentMode(isDev: boolean) {
    DEVELOPMENT_MODE = isDev
    console.log(`🔄 ${SERVICE_VERSION} - Modo cambiado a: ${isDev ? "DESARROLLO" : "PRODUCCIÓN"}`)
  }

  // Método para obtener el modo actual
  isDevelopmentMode(): boolean {
    return DEVELOPMENT_MODE
  }

  // Método para obtener la versión del servicio
  getVersion(): string {
    return SERVICE_VERSION
  }

  private async fetchWithErrorHandling<T>(endpoint: string, options?: RequestInit): Promise<T> {
    // Si estamos en modo desarrollo, usar el store local
    if (DEVELOPMENT_MODE) {
      console.log(`🔧 ${SERVICE_VERSION} - MODO DESARROLLO: usando store local`)
      await new Promise((resolve) => setTimeout(resolve, 500)) // Simular delay de red

      // Simular respuestas de la API
      if (endpoint === "/") {
        return { data: auctionStore.getAll() } as T
      }

      if (endpoint.startsWith("/") && options?.method !== "POST") {
        const id = endpoint.split("/")[1]
        return { data: auctionStore.getById(id) } as T
      }

      throw new Error("Endpoint no implementado en modo mock")
    }

    // Código para API real - URLs de tu microservicio
    const API_URLS = ["http://localhost:5200/api/subastas", "http://127.0.0.1:5200/api/subastas"]

    let lastError: Error | null = null

    for (const baseUrl of API_URLS) {
      try {
        const url = `${baseUrl}${endpoint}`
        console.log(`🚀 ${SERVICE_VERSION} - MODO PRODUCCIÓN: Conectando a ${url}`)

        const response = await fetch(url, {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            ...options?.headers,
          },
          mode: "cors",
          ...options,
        })

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`)
        }

        const data = await response.json()
        console.log(`✅ ${SERVICE_VERSION} - Conexión exitosa con tu microservicio:`, data)
        this.workingUrl = baseUrl
        return data
      } catch (error: any) {
        console.log(`❌ ${SERVICE_VERSION} - Error en ${baseUrl}:`, error.message)
        lastError = error
        continue
      }
    }

    throw lastError || new Error("No se pudo conectar a tu microservicio")
  }

  // Obtener todas las subastas
  async getAllAuctions(): Promise<Auction[]> {
    try {
      if (DEVELOPMENT_MODE) {
        console.log(`📦 ${SERVICE_VERSION} - Obteniendo subastas del store local`)
        return auctionStore.getAll()
      }

      console.log(`🔍 ${SERVICE_VERSION} - Obteniendo subastas de tu microservicio...`)
      const response = await this.fetchWithErrorHandling<any>("/")

      // Manejar diferentes formatos de respuesta
      let auctions: Auction[] = []
      if (Array.isArray(response)) {
        auctions = response
      } else if (response.data && Array.isArray(response.data)) {
        auctions = response.data
      } else if (response.subastas && Array.isArray(response.subastas)) {
        auctions = response.subastas
      }

      console.log(`✅ ${SERVICE_VERSION} - Subastas obtenidas de tu microservicio:`, auctions)
      return auctions
    } catch (error) {
      console.error(`❌ ${SERVICE_VERSION} - Error obteniendo subastas de tu microservicio:`, error)
      console.log("🔄 Fallback a store local")
      return auctionStore.getAll()
    }
  }

  // Obtener subasta por ID
  async getAuctionById(id: string): Promise<Auction | null> {
    try {
      if (DEVELOPMENT_MODE) {
        return auctionStore.getById(id)
      }

      console.log(`🔍 ${SERVICE_VERSION} - Obteniendo subasta ${id} de tu microservicio...`)
      const response = await this.fetchWithErrorHandling<any>(`/${id}`)

      let auction: Auction | null = null
      if (response.data) {
        auction = response.data
      } else if (response.id) {
        auction = response
      }

      console.log(`✅ ${SERVICE_VERSION} - Subasta obtenida:`, auction)
      return auction
    } catch (error) {
      console.error(`❌ ${SERVICE_VERSION} - Error obteniendo subasta:`, error)
      return auctionStore.getById(id)
    }
  }

  // Crear nueva subasta - Conecta con tu microservicio real
  async createAuction(auctionData: CreateAuctionRequest): Promise<Auction> {
    try {
      if (DEVELOPMENT_MODE) {
        console.log(`🔧 ${SERVICE_VERSION} - MODO DESARROLLO: Creando en store local`)
        const newAuction: Auction = {
          ...auctionData,
          id: Date.now().toString(),
          precioActual: auctionData.precioInicial,
          numeroOfertas: 0,
          estado: "Activa",
        }
        return auctionStore.add(newAuction)
      }

      // API real - Enviar a tu microservicio
      console.log(`🚀 ${SERVICE_VERSION} - MODO PRODUCCIÓN: Enviando a tu microservicio:`, auctionData)
      const response = await this.fetchWithErrorHandling<any>("/create", {
        method: "POST",
        body: JSON.stringify(auctionData),
      })

      let createdAuction: Auction
      if (response.data) {
        createdAuction = response.data
      } else if (response.id) {
        createdAuction = response
      } else {
        createdAuction = { ...auctionData, id: Date.now().toString(), estado: "Activa" }
      }

      console.log(`✅ ${SERVICE_VERSION} - Subasta creada en tu microservicio:`, createdAuction)
      return createdAuction
    } catch (error) {
      console.error(`❌ ${SERVICE_VERSION} - Error creando subasta en tu microservicio:`, error)
      throw error
    }
  }

  // Método para probar la conexión real
  async testConnection(): Promise<{ success: boolean; message: string; url?: string; version: string; mode: string }> {
    const mode = DEVELOPMENT_MODE ? "DESARROLLO" : "PRODUCCIÓN"

    if (DEVELOPMENT_MODE) {
      return {
        success: true,
        message: "Modo desarrollo activo - usando datos locales",
        version: SERVICE_VERSION,
        mode: mode,
      }
    }

    // Probar conexión real con tu microservicio
    const API_URLS = ["http://localhost:5200/api/subastas", "http://127.0.0.1:5200/api/subastas"]

    for (const url of API_URLS) {
      try {
        console.log(`🔍 ${SERVICE_VERSION} - Probando tu microservicio: ${url}`)

        // Primero probar health check
        try {
          const healthResponse = await fetch(`${url}/health`, {
            method: "GET",
            mode: "cors",
          })
          if (healthResponse.ok) {
            return {
              success: true,
              message: "✅ Conexión exitosa con health check",
              url: url,
              version: SERVICE_VERSION,
              mode: mode,
            }
          }
        } catch (healthError) {
          console.log("Health check no disponible, probando endpoint principal...")
        }

        // Si no hay health check, probar endpoint principal
        const response = await fetch(url, {
          method: "GET",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        })

        if (response.ok) {
          const data = await response.json()
          return {
            success: true,
            message: `✅ Conexión exitosa - Datos obtenidos: ${Array.isArray(data) ? data.length : "objeto"} elementos`,
            url: url,
            version: SERVICE_VERSION,
            mode: mode,
          }
        }
      } catch (error: any) {
        console.log(`❌ ${SERVICE_VERSION} - Error conectando a ${url}:`, error.message)
        continue
      }
    }

    return {
      success: false,
      message: "❌ No se pudo conectar a tu microservicio. Verifica que esté corriendo en localhost:5200",
      version: SERVICE_VERSION,
      mode: mode,
    }
  }

  // Método para obtener datos reales de tu microservicio
  async getRealData(): Promise<{ success: boolean; data?: any; error?: string }> {
    try {
      console.log(`🔍 ${SERVICE_VERSION} - Obteniendo datos reales de tu microservicio...`)

      const API_URLS = ["http://localhost:5200/api/subastas", "http://127.0.0.1:5200/api/subastas"]

      for (const url of API_URLS) {
        try {
          const response = await fetch(url, {
            method: "GET",
            mode: "cors",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          })

          if (response.ok) {
            const data = await response.json()
            console.log(`✅ ${SERVICE_VERSION} - Datos reales obtenidos:`, data)
            return { success: true, data: data }
          }
        } catch (error) {
          continue
        }
      }

      return { success: false, error: "No se pudo conectar a tu microservicio" }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }

  // Otros métodos...
  async updateAuction(id: string, auctionData: Partial<Auction>): Promise<Auction> {
    if (DEVELOPMENT_MODE) {
      const updated = auctionStore.update(id, auctionData)
      if (!updated) throw new Error("Subasta no encontrada")
      return updated
    }
    const response = await this.fetchWithErrorHandling<AuctionResponse>(`/${id}`, {
      method: "PUT",
      body: JSON.stringify(auctionData),
    })
    return response.data as Auction
  }

  async deleteAuction(id: string): Promise<boolean> {
    if (DEVELOPMENT_MODE) {
      return auctionStore.delete(id)
    }
    await this.fetchWithErrorHandling<AuctionResponse>(`/${id}`, { method: "DELETE" })
    return true
  }

  async getAuctionsByStatus(estado: string): Promise<Auction[]> {
    if (DEVELOPMENT_MODE) {
      return auctionStore.getByStatus(estado)
    }
    const response = await this.fetchWithErrorHandling<AuctionResponse>(`/?estado=${estado}`)
    return Array.isArray(response.data) ? response.data : []
  }

  async getAuctionsBySeller(vendedorId: string): Promise<Auction[]> {
    if (DEVELOPMENT_MODE) {
      return auctionStore.getBySeller(vendedorId)
    }
    const response = await this.fetchWithErrorHandling<AuctionResponse>(`/?vendedorId=${vendedorId}`)
    return Array.isArray(response.data) ? response.data : []
  }

  subscribe(callback: () => void): () => void {
    if (DEVELOPMENT_MODE) {
      return auctionStore.subscribe(callback)
    }
    return () => {}
  }

  async getStats() {
    if (DEVELOPMENT_MODE) {
      return auctionStore.getStats()
    }
    return { total: 0, activas: 0, finalizadas: 0, programadas: 0 }
  }
}

export const auctionService = new AuctionService()
