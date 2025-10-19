"use server"

import { createClient } from "@/lib/supabase/server"

export interface Offer {
  id: string
  title: string
  description: string
  discount_type: string
  discount_value: number
  original_price: number
  final_price: number
  is_urgent: boolean
  expires_at: string
  business_profiles: {
    business_name: string
    business_type: string
    logo_url: string
    address: string
    phone: string
  }
}

export async function getActiveOffers(): Promise<{ offers: Offer[]; error: string | null }> {
  try {
    const supabase = await createClient()

    const { data: offers, error } = await supabase
      .from("offers")
      .select(
        `
        *,
        business_profiles (
          business_name,
          business_type,
          logo_url,
          address,
          phone
        )
      `,
      )
      .eq("is_active", true)
      .gt("expires_at", new Date().toISOString())
      .order("created_at", { ascending: false })
      .limit(10)

    if (error) {
      console.error("[Server] Error de Supabase:", error)
      return { offers: [], error: error.message }
    }

    if (!offers || offers.length === 0) {
      console.log("[Server] No hay ofertas activas")
      return { offers: [], error: null }
    }

    console.log("[Server] Ofertas obtenidas:", offers.length)
    return { offers, error: null }
  } catch (error) {
    console.error("[Server] Error al obtener ofertas:", error)
    return { offers: [], error: "Error de conexión" }
  }
}
