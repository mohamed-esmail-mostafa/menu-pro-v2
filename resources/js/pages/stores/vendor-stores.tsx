import { Button } from '@/components/ui/button';
import useImport from '@/hooks/use-import';
import useSelectedStore from '@/hooks/use-selected-store';
import useUserStores from '@/hooks/use-user-stores'
import StoreDashboardLayout from '@/layouts/store-dashboard-layout';
import { Store } from '@/types/store'
import { router } from '@inertiajs/react';
import { Plus } from 'lucide-react';


export default function VendorStores() {
    const { t } = useImport();
    const { stores }: any = useUserStores()
    const { selectStore, getCurrentStore }: any = useSelectedStore();

    const handleSelectStore = async (store: Store) => {
        selectStore(store)
        const currentStore = getCurrentStore()
        router.get(`/store/dashboard/${currentStore?.slug}`)

    }
    return (
        <StoreDashboardLayout>
            <div className="container mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {stores.map((store: Store) => (
                        <button onClick={() => handleSelectStore(store)} className='border'>
                            <div className='flex flex-col items-center justify-center py-10'>
                                <img src={store.image || undefined} alt={store.name} />
                                <h2>{store.name}</h2>
                            </div>
                        </button>
                    ))}

                    <button onClick={() => router.get("/register/store/page")} className='border'>
                        <div className='flex flex-col items-center justify-center py-10'>
                            <Plus />
                            <h2>{t('stores.add-new-store')}</h2>
                        </div>
                    </button>
                </div>
            </div>
        </StoreDashboardLayout>
    )
}
