import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function GET() {
  try {
    console.log("[v0] Iniciando petición a Supabase desde API route...")

    const supabase = await createClient()

    console.log("[v0] Cliente de Supabase creado, haciendo query...")

    const { data: offers, error } = await supabase
      .from("offers")
      .select(`
        *,
        business_profiles (
          business_name,
          business_type,
          logo_url,
          address,
          phone
        )
      `)
      .eq("is_active", true)
      .gt("expires_at", new Date().toISOString())
      .order("created_at", { ascending: false })
      .limit(10)

    if (error) {
      console.error("[v0] Error de Supabase en API route:", error)
      return NextResponse.json({ error: error.message, offers: [] }, { status: 200 })
    }

    console.log("[v0] Ofertas obtenidas exitosamente:", offers?.length || 0)
    return NextResponse.json({ offers: offers || [] })
  } catch (error) {
    console.error("[v0] Error en API route:", error)
    return NextResponse.json({ error: "Error interno del servidor", offers: [] }, { status: 200 })
  }
}
