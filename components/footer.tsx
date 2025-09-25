import Link from "next/link"
import { Card } from "@/components/ui/card"

export function Footer() {
  return (
    <footer className="bg-background border-t border-border mt-auto">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Platform Name */}
          <div className="text-sm font-medium text-foreground">
            LearnMioAI
          </div>

          {/* Collaboration Card */}
          <Card className="px-4 py-2 cursor-pointer hover:bg-accent transition-colors">
            <Link
              href="https://ingnavs.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Desarrollado en colaboración con IngNavs
            </Link>
          </Card>

          {/* Copyright */}
          <div className="text-sm text-muted-foreground">
            © 2025 Todos los derechos reservados
          </div>
        </div>
      </div>
    </footer>
  )
}