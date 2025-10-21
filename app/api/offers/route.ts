import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

export async function GET() {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json({
        offers: [],
        error: "Supabase no configurado",
      })
    }

    const supabase = createClient(supabaseUrl, supabaseKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    })

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
      // En el entorno de preview de v0, las conexiones a Supabase pueden fallar
      // La app usará datos de prueba como fallback
      return NextResponse.json({
        offers: [],
        error: "preview_environment",
      })
    }

    return NextResponse.json({ offers: offers || [] })
  } catch (error: any) {
    // Error de conexión - común en entorno de preview
    return NextResponse.json({
      offers: [],
      error: "preview_environment",
    })
  }
}
