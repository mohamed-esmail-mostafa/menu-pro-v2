
import useUserStores from '@/hooks/use-user-stores'
import StoreDashboardLayout from '@/layouts/store-dashboard-layout'
export default function StoreDashboard() {
  const {stores}=useUserStores()

  return (
    <StoreDashboardLayout>
    

     stores main

     
    </StoreDashboardLayout>
  )
}