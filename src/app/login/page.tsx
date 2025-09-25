"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/src/types/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/types/components/ui/card"
import { Alert, AlertDescription } from "@/src/types/components/ui/alert"
import { Loader2, BookOpen, Brain, Users, Award, AlertCircle } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { useTranslations } from "next-intl"

export default function LoginPage() {
  const [error, setError] = useState<string>("")
  const [isLoading, setIsLoading] = useState(false)
  const { signInWithGoogle, user, loading } = useAuth()
  const router = useRouter()
  const t = useTranslations("login")

  // Handle redirection after successful authentication
  useEffect(() => {
    console.log("🔍 LoginPage: Auth state check", { user, loading, pathname: window.location.pathname })
    
    if (!loading && user) {
      console.log("✅ LoginPage: User authenticated, redirecting directly to dashboard")
      router.push("/dashboard")
    }
  }, [user, loading, router])

  const handleGoogleSignIn = async () => {
    try {
      console.log("🔄 LoginPage: Starting sign-in process")
      setError("")
      setIsLoading(true)
      await signInWithGoogle()
      console.log("✅ LoginPage: Sign-in completed, auth state will trigger redirect")
      
      // Don't manually redirect here - let useEffect handle it
    } catch (error: any) {
      console.error("❌ LoginPage: Sign-in error:", error)
      setError(error.message || t("failedToSignIn") || "Failed to sign in. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const isDomainError = error.includes("Domain not authorized") || error.includes("unauthorized-domain")

  return (
    <div className="min-h-[80vh] bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4 py-8">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-12 items-center">
        {/* Left side - Branding */}
        <div className="space-y-8 text-center lg:text-left">
          <div className="space-y-4">
            <div className="flex items-center justify-center lg:justify-start gap-3">
              <div className="bg-blue-600 rounded-xl p-3">
                <BookOpen className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900">{t("learnMioAI")}</h1>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
              {t("masterEnglishAI")}
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">{t("joinThousands")}</p>
          </div>

          {/* Features */}
          <div className="grid grid-cols-2 gap-6">
            <div className="flex items-center gap-3">
              <Brain className="h-6 w-6 text-blue-600" />
              <span className="text-gray-700 font-medium">{t("aiTutoring")}</span>
            </div>
            <div className="flex items-center gap-3">
              <Users className="h-6 w-6 text-green-600" />
              <span className="text-gray-700 font-medium">{t("liveInstructors")}</span>
            </div>
            <div className="flex items-center gap-3">
              <Award className="h-6 w-6 text-purple-600" />
              <span className="text-gray-700 font-medium">{t("cefrCertified")}</span>
            </div>
            <div className="flex items-center gap-3">
              <BookOpen className="h-6 w-6 text-orange-600" />
              <span className="text-gray-700 font-medium">{t("a1ToC2Levels")}</span>
            </div>
          </div>

          {/* Stats */}
          <div className="flex items-center justify-center lg:justify-start gap-8 pt-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">500K+</div>
              <div className="text-sm text-gray-600">{t("activeLearners")}</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">95%</div>
              <div className="text-sm text-gray-600">{t("successRate")}</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">24/7</div>
              <div className="text-sm text-gray-600">{t("aiSupport")}</div>
            </div>
          </div>
        </div>

        {/* Right side - Login Form */}
        <div className="flex justify-center">
          <Card className="w-full max-w-md shadow-2xl border-0">
            <CardHeader className="text-center space-y-2">
              <CardTitle className="text-2xl font-bold">{t("welcomeBack")}</CardTitle>
              <CardDescription className="text-base">{t("signInToContinue")}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {error && (
                <div className="space-y-3">
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>

                  {isDomainError && (
                    <Alert className="border-blue-200 bg-blue-50">
                      <AlertCircle className="h-4 w-4 text-blue-600" />
                      <AlertDescription className="text-blue-800">
                        <strong>{t("quickFix")}</strong> {t("quickFixHelp")}
                        <br />
                        <a
                          href="https://console.firebase.google.com"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline hover:no-underline"
                        >
                          Firebase Console
                        </a>{" "}
                        → Authentication → Settings → Authorized domains, then add: {" "}
                        <code className="bg-blue-100 px-1 rounded">{window.location.hostname}</code>
                      </AlertDescription>
                    </Alert>
                  )}
                </div>
              )}

              <Button
                onClick={handleGoogleSignIn}
                disabled={isLoading}
                className="w-full h-12 text-base font-medium bg-blue-600 text-white border-0 hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
                variant="default"
              >
                {isLoading ? (
                  <Loader2 className="h-5 w-5 animate-spin mr-3 text-white" />
                ) : (
                  <svg className="h-5 w-5 mr-3" viewBox="0 0 24 24">
                    <path
                      fill="#4285f4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34a853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#fbbc05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#ea4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                )}
                {isLoading ? t("signingIn") : t("continueWithGoogle")}
              </Button>

              <div className="text-center text-sm text-gray-600">
                {t("bySigningIn")} {" "}
                <a href="#" className="text-blue-600 hover:underline">
                  {t("termsOfService")}
                </a>{" "}
                {t("and")} {" "}
                <a href="#" className="text-blue-600 hover:underline">
                  {t("privacyPolicy")}
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
