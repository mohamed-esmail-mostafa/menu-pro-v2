import useImport from '@/hooks/use-import'
import StoreDashboardLayout from '@/layouts/store-dashboard-layout'
import { Table } from '@/types/table'
import React, { useState } from 'react'
import CreateUpdateDialog from './components/create-update-dialog'
import { Store } from '@/types/store'
import { Card, CardContent } from '@/components/ui/card'
import { Edit, Eye, Printer, QrCode, Table2Icon, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { router } from '@inertiajs/react'
import { toast } from 'sonner'
import PageHeader from '@/components/shared/page-header'
import TableCard from './components/table-card'
import NoDataFound from '@/components/shared/no-data-found'

export default function Tables({ store }: { store: Store }) {
    const { t } = useImport()
    const [showDialog, setShowDialog] = useState(false)
    const [selectedTable, setSelectedTable] = useState<Table | null>(null)




    return (
        <StoreDashboardLayout>

            <PageHeader title={t("tables.tables-title")} subtitle={t("tables.tables-subtitle")} icon={<Table2Icon />}>
                <div>
                    <Button onClick={() => setShowDialog(true)}>{t("tables.add-new-table")}</Button>
                </div>
            </PageHeader>
            <CreateUpdateDialog
                selectedTable={selectedTable}
                store={store}
                showDialog={showDialog}
                setShowDialog={setShowDialog} />

            {store.tables?.length === 0 ? <NoDataFound /> : (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {store?.tables?.map((table: Table) => (
                        <TableCard key={table.id} table={table} setSelectedTable={setSelectedTable} setShowDialog={setShowDialog} />
                    ))}
                </div>
            )}

        </StoreDashboardLayout>
    )
}
