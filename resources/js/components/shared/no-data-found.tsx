import useImport from '@/hooks/use-import'
import { Database } from 'lucide-react'
import React from 'react'

export default function NoDataFound() {
  const {t}=useImport()
  return (
    <div className='flex flex-col items-center justify-center'>
      <Database size={60} className='text-primary' />
      <p className='mt-4'>{t("common.no-data")}</p>
    </div>
  )
}
