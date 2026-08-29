import React from 'react'
import { SearchImage } from '@/assets/SearchImage'

const NoResults: React.FC = () => {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-3 text-center">
      <span className="text-[24px] font-bold text-[#4C4C4C]">
        Nous n'avons trouvé aucun résultat !
      </span>
      <div className="mt-4">
        <p
          className="max-w-[400px] text-[16px] text-[#2C2C2C]"
          style={{
            lineHeight: 'normal',
          }}
        >
          Nous sommes désolés, nous n'avons rien trouvé. Élargissons notre recherche pour vous aider
          à trouver ce que vous cherchez.
        </p>
      </div>
      <SearchImage />
    </div>
  )
}

export default NoResults
