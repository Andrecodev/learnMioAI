import Link from "next/link"
import Image from "next/image"
import { Card } from "@/components/ui/card"
import { BookOpen } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 text-white mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          {/* Platform Name */}
          <div className="flex items-center gap-3">
            <div className="bg-white/20 rounded-xl p-2">
              <BookOpen className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold">LearnMioAI</h3>
              <p className="text-sm text-blue-100">Plataforma de aprendizaje con IA</p>
            </div>
          </div>

          {/* Collaboration Card */}
          <Card className="bg-white/10 border-white/20 backdrop-blur-sm hover:bg-white/20 transition-all duration-300 cursor-pointer group">
            <div className="p-4 text-center">
              <Link
                href="https://ingnavs.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-white hover:text-blue-100 transition-colors block"
              >
                <div className="flex items-center justify-center gap-3 mb-1">
                  <Image
                    src="/IngNavs.png"
                    alt="IngNavs Logo"
                    width={24}
                    height={24}
                    className="rounded-full"
                  />
                  <div className="font-medium">Desarrollado en colaboración con</div>
                </div>
                <div className="font-bold text-blue-200 group-hover:text-white transition-colors">
                  IngNavs
                </div>
              </Link>
            </div>
          </Card>

          {/* Copyright */}
          <div className="text-right">
            <div className="text-sm text-blue-100">
              © 2025 LearnMioAI
            </div>
            <div className="text-xs text-blue-200 mt-1">
              Todos los derechos reservados
            </div>
          </div>
        </div>

        {/* Bottom decorative line */}
        <div className="mt-6 pt-4 border-t border-white/20">
          <div className="flex justify-center">
            <div className="text-xs text-blue-200">
              Impulsado por tecnología de IA • Aprendizaje personalizado
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
