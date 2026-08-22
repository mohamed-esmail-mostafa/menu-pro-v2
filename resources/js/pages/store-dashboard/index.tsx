
import useImport from '@/hooks/use-import'
import StoreDashboardLayout from '@/layouts/store-dashboard-layout'
import { Store } from '@/types/store'
import { Grid, ReceiptCentIcon } from 'lucide-react'
export default function StoreDashboard({store,statistics}:{store:Store,statistics:any}) {
  
const {t}=useImport()
console.log("statistics",statistics)
  const stats = [
    {
      title:t('common.categories'),
      icon:<Grid size={50} />,
      count:statistics.categories_count
    },
    {
      title:t('common.products'),
      icon:<Grid size={50} />,
      count:statistics.products_count
    },
    {
      title:t('common.orders'),
      icon:<ReceiptCentIcon size={50} />,
      count:statistics.products_count
    }
  ]

  return (
    <StoreDashboardLayout>
      <div className="container grid grid-cols-2 md:grid:cols-4 gap-4">
        {stats.map((item:any)=>(
        <div className='border bg-green-50 p-3'>
          
          <div className='flex justify-between items-center'>
            <p>{item.icon}</p>
            <h2>{item.title}</h2>
          </div>
           
           <p className='mt-4 font-bold'>{item.count}</p>
        </div>
      ))}
      </div>
    </StoreDashboardLayout>
  )
}