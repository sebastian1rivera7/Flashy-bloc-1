"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Camera, CheckCircle2, XCircle, Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"

export default function ScannerPage() {
  const router = useRouter()
  const [scanning, setScanning] = useState(false)
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null)
  const [qrCode, setQrCode] = useState("")
  const supabase = createClient()

  async function validateAndRedeemOffer(qrCode: string) {
    setScanning(true)
    setResult(null)

    try {
      // Obtener la oferta por QR code
      const { data: offer, error: offerError } = await supabase
        .from("offers")
        .select(`
          *,
          business_profiles (
            business_name,
            address
          )
        `)
        .eq("qr_code", qrCode)
        .single()

      if (offerError || !offer) {
        setResult({ success: false, message: "Código QR inválido" })
        return
      }

      // Validar que la oferta esté activa
      if (!offer.is_active) {
        setResult({ success: false, message: "Esta oferta ya no está activa" })
        return
      }

      // Validar que no haya expirado
      const expiresAt = new Date(offer.expires_at)
      if (expiresAt < new Date()) {
        setResult({ success: false, message: "Esta oferta ha expirado" })
        return
      }

      // Validar cupos disponibles
      if (offer.current_redemptions >= offer.max_redemptions) {
        setResult({ success: false, message: "No quedan cupos disponibles" })
        return
      }

      // TODO: Validar distancia del usuario (requiere geolocalización)

      // Crear redención
      const userEmail = "usuario@ejemplo.com" // TODO: Obtener del usuario autenticado
      const { error: redemptionError } = await supabase.from("redemptions").insert({
        offer_id: offer.id,
        user_email: userEmail,
      })

      if (redemptionError) {
        console.error("[v0] Error creating redemption:", redemptionError)
        setResult({ success: false, message: "Error al redimir la oferta" })
        return
      }

      // Incrementar contador de redenciones
      const { error: updateError } = await supabase
        .from("offers")
        .update({ current_redemptions: offer.current_redemptions + 1 })
        .eq("id", offer.id)

      if (updateError) {
        console.error("[v0] Error updating redemptions:", updateError)
      }

      setResult({
        success: true,
        message: `¡Oferta redimida! ${offer.title} en ${offer.business_profiles?.business_name}`,
      })
    } catch (error) {
      console.error("[v0] Error:", error)
      setResult({ success: false, message: "Error al procesar la oferta" })
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
      <div className="flex-1 p-6 space-y-6">
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
              </div>
            </div>

            {/* Manual Input for Testing */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">O ingresa el código manualmente:</label>
              <input
                type="text"
                value={qrCode}
                onChange={(e) => setQrCode(e.target.value)}
                placeholder="Código QR"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B35]"
              />
            </div>

            <Button
              onClick={() => validateAndRedeemOffer(qrCode)}
              disabled={scanning || !qrCode}
              className="w-full h-12 bg-gradient-to-r from-[#FF6B35] to-[#F7931E] hover:opacity-90"
            >
              {scanning ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Validando...
                </>
              ) : (
                "Validar Código"
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Result */}
        {result && (
          <Card className={`shadow-lg ${result.success ? "border-green-500" : "border-red-500"} border-2`}>
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                {result.success ? (
                  <CheckCircle2 className="w-8 h-8 text-green-500 flex-shrink-0" />
                ) : (
                  <XCircle className="w-8 h-8 text-red-500 flex-shrink-0" />
                )}
                <div>
                  <h3 className={`font-bold text-lg ${result.success ? "text-green-700" : "text-red-700"}`}>
                    {result.success ? "¡Éxito!" : "Error"}
                  </h3>
                  <p className="text-gray-700 mt-1">{result.message}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Instructions */}
        <Card className="shadow-lg bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <h3 className="font-bold text-blue-900 mb-2">Instrucciones:</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Apunta la cámara al código QR del negocio</li>
              <li>• Asegúrate de estar dentro del radio permitido</li>
              <li>• Verifica que la oferta no haya expirado</li>
              <li>• Confirma que quedan cupos disponibles</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
