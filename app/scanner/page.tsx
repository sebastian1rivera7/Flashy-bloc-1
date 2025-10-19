"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Camera, CheckCircle2, XCircle, Loader2, AlertCircle } from "lucide-react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"

export default function ScannerPage() {
  const router = useRouter()
  const [scanning, setScanning] = useState(false)
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null)
  const [qrCode, setQrCode] = useState("")
  const supabase = createClient()

  async function validateAndRedeemOffer(qrCode: string) {
    if (!qrCode || qrCode.trim() === "") {
      setResult({ success: false, message: "Por favor ingresa un código QR válido" })
      return
    }

    setScanning(true)
    setResult(null)

    try {
      const { data: offer, error: offerError } = await supabase
        .from("offers")
        .select(`
          *,
          business_profiles (
            business_name,
            address
          )
        `)
        .eq("qr_code", qrCode.trim())
        .single()

      if (offerError) {
        console.log("[v0] Error fetching offer:", offerError)
        setResult({ success: false, message: "Código QR inválido o no encontrado" })
        return
      }

      if (!offer) {
        setResult({ success: false, message: "Código QR inválido" })
        return
      }

      if (!offer.is_active) {
        setResult({ success: false, message: "Esta oferta ya no está activa" })
        return
      }

      const expiresAt = new Date(offer.expires_at)
      if (expiresAt < new Date()) {
        setResult({ success: false, message: "Esta oferta ha expirado" })
        return
      }

      if (offer.current_redemptions >= offer.max_redemptions) {
        setResult({ success: false, message: "No quedan cupos disponibles para esta oferta" })
        return
      }

      const userEmail = "usuario@ejemplo.com" // TODO: Obtener del usuario autenticado
      const { error: redemptionError } = await supabase.from("redemptions").insert({
        offer_id: offer.id,
        user_email: userEmail,
        redeemed_at: new Date().toISOString(),
      })

      if (redemptionError) {
        console.error("[v0] Error creating redemption:", redemptionError)
        setResult({ success: false, message: "Error al redimir la oferta. Intenta nuevamente." })
        return
      }

      const { error: updateError } = await supabase
        .from("offers")
        .update({ current_redemptions: offer.current_redemptions + 1 })
        .eq("id", offer.id)

      if (updateError) {
        console.error("[v0] Error updating redemptions:", updateError)
        // No fallar la redención si solo falla el contador
      }

      setResult({
        success: true,
        message: `¡Oferta redimida exitosamente! ${offer.title} en ${offer.business_profiles?.business_name || "el negocio"}`,
      })

      setQrCode("")
    } catch (error) {
      console.error("[v0] Error inesperado:", error)
      setResult({
        success: false,
        message: "Error de conexión. Verifica tu internet e intenta nuevamente.",
      })
    } finally {
      setScanning(false)
    }
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#FF6B35] to-[#F7931E] p-4 text-white">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()} className="text-white hover:bg-white/20">
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <h1 className="text-xl font-bold">Escanear QR</h1>
        </div>
      </div>

      {/* Scanner Area */}
      <div className="flex-1 p-6 space-y-6 overflow-y-auto">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Camera className="w-5 h-5 text-[#FF6B35]" />
              Escáner de Ofertas
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Simulated Scanner */}
            <div className="aspect-square bg-gray-900 rounded-lg flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 border-4 border-[#FF6B35] opacity-50"></div>
              <div className="text-white text-center p-6">
                <Camera className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p className="text-sm">Apunta la cámara al código QR</p>
                <p className="text-xs mt-2 opacity-75">O ingresa el código manualmente abajo</p>
              </div>
            </div>

            {/* Manual Input for Testing */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Código QR:</label>
              <input
                type="text"
                value={qrCode}
                onChange={(e) => setQrCode(e.target.value)}
                placeholder="Ingresa el código aquí"
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B35] text-lg"
                disabled={scanning}
              />
            </div>

            <Button
              onClick={() => validateAndRedeemOffer(qrCode)}
              disabled={scanning || !qrCode.trim()}
              className="w-full h-14 text-lg bg-gradient-to-r from-[#FF6B35] to-[#F7931E] hover:opacity-90 disabled:opacity-50"
            >
              {scanning ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Validando...
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-5 h-5 mr-2" />
                  Validar y Redimir
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Result */}
        {result && (
          <Card
            className={`shadow-lg ${result.success ? "border-green-500 bg-green-50" : "border-red-500 bg-red-50"} border-2 animate-in slide-in-from-bottom`}
          >
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                {result.success ? (
                  <CheckCircle2 className="w-10 h-10 text-green-500 flex-shrink-0" />
                ) : (
                  <XCircle className="w-10 h-10 text-red-500 flex-shrink-0" />
                )}
                <div className="flex-1">
                  <h3 className={`font-bold text-xl mb-2 ${result.success ? "text-green-700" : "text-red-700"}`}>
                    {result.success ? "¡Éxito!" : "Error"}
                  </h3>
                  <p className="text-gray-700">{result.message}</p>
                  {result.success && (
                    <Button onClick={() => router.push("/ofertas")} className="mt-4 bg-green-600 hover:bg-green-700">
                      Ver Más Ofertas
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Instructions */}
        <Card className="shadow-lg bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-blue-900 mb-2">Instrucciones:</h3>
                <ul className="text-sm text-blue-800 space-y-1.5">
                  <li>• Apunta la cámara al código QR del negocio</li>
                  <li>• Asegúrate de estar dentro del radio permitido</li>
                  <li>• Verifica que la oferta no haya expirado</li>
                  <li>• Confirma que quedan cupos disponibles</li>
                  <li>• Muestra la confirmación al comerciante</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
