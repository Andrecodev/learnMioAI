import { Card, CardContent } from "@/src/types/components/ui/card"
import { Button } from "@/src/types/components/ui/button"
import { Target, X } from "lucide-react"
import { useState } from "react"
import { useTranslations } from 'next-intl'

export function LevelTestBanner() {
  const [isVisible, setIsVisible] = useState(true)
  const t = useTranslations('home')

  if (!isVisible) return null

  return (
    <div className="container mx-auto px-4 sm:px-6 py-4">
      <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-none overflow-hidden relative">
        <button
          onClick={() => setIsVisible(false)}
          className="absolute right-2 top-2 p-1.5 rounded-full hover:bg-primary/10 transition-colors"
          aria-label={t('close')}
        >
          <X className="h-4 w-4 text-muted-foreground" />
        </button>
        <CardContent className="flex flex-col sm:flex-row items-center justify-between py-6 px-4 sm:px-8">
          <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left w-full sm:w-auto">
            <div className="p-3 bg-primary/10 rounded-full shrink-0">
              <Target className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2 sm:mb-1">{t('wantToKnowLevel')}</h3>
              <p className="text-muted-foreground text-sm sm:text-base">{t('takeComprehensiveTest')}</p>
            </div>
          </div>
          <Button
            onClick={() => window.open('https://www.efset.org/4-skill/launch/', '_blank')}
            className="w-full sm:w-auto mt-4 sm:mt-0 whitespace-nowrap shrink-0 cursor-pointer"
          >
            {t('takeTheTest')}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
