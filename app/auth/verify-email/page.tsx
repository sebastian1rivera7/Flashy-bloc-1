import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function VerifyEmailPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-yellow-50 p-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-red-600">⚡ FLASHY</CardTitle>
          <CardDescription>Verifica tu email</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-6xl">📧</div>
          <h2 className="text-xl font-semibold">¡Revisa tu email!</h2>
          <p className="text-gray-600">
            Te hemos enviado un enlace de verificación. Haz clic en el enlace para activar tu cuenta.
          </p>
          <div className="pt-4">
            <Link href="/auth/login" className="text-red-600 hover:underline">
              Volver al inicio de sesión
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
