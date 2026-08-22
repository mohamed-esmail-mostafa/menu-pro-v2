import { Card, CardContent } from '@/components/ui/card'
import { Table } from '@/types/table'
import { Badge } from '@/components/ui/badge'
import { Download, Edit, Eye, Printer, QrCode, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import useImport from '@/hooks/use-import'
import { router } from '@inertiajs/react'
import { toast } from 'sonner'
import { useState } from 'react'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'

export default function TableCard({ table, setSelectedTable, setShowDialog }: { table: Table, setSelectedTable: any, setShowDialog: any }) {
  const { t } = useImport();
  const [deleteDialogOpen, setDeleteDialog] = useState(false)
  const [deleteTable, setDeleteTable] = useState<Table | null>(null)
  const [showQRModal, setShowQRModal] = useState(false)
  const [qrTable, setQrTable] = useState<Table | null>(null)


  const handleEditTable = (table: Table) => {
    setSelectedTable(table)
    setShowDialog(true)
  }


  const handleDeleteTable = () => {
    router.delete(`/store/tables/${deleteTable?.id}`, {
      onSuccess: () => {
        toast.success(t('common.success'))
      },
      onError: (errors) => {
        toast.error(t('common.error'))
      }
    })
  }


  const handleViewQR = (table: Table) => {
    setQrTable(table)
    setShowQRModal(true)
  }


  const handlePrintQR = (table: Table) => {
    const printWindow = window.open('', '', 'height=600,width=800')
    if (printWindow && table.qr_code) {
      printWindow.document.write(`
                     <html>
                         <head>
                             <title>${t('store.print-qr-code')} - ${table.name}</title>
                             <style>
                                 body {
                                     font-family: Arial, sans-serif;
                                     display: flex;
                                     flex-direction: column;
                                     align-items: center;
                                     justify-content: center;
                                     padding: 40px;
                                     text-align: center;
                                 }
                                 h1 {
                                     margin-bottom: 10px;
                                     font-size: 32px;
                                 }
                                 h2 {
                                     color: #666;
                                     margin-bottom: 30px;
                                     font-size: 24px;
                                 }
                                 img {
                                     max-width: 400px;
                                     border: 4px solid #333;
                                     border-radius: 10px;
                                     margin-bottom: 20px;
                                 }
                                 p {
                                     font-size: 18px;
                                     color: #888;
                                 }
                                 @media print {
                                     body {
                                         padding: 0;
                                     }
                                 }
                             </style>
                         </head>
                         <body>
                        
                             <h2>${table.name}</h2>
                             <img src="${table.qr_code}" alt="${table.name} QR Code" />
                             <p>${t('store.scan-to-order')}</p>
                         </body>
                     </html>
                 `)
      printWindow.document.close()
      setTimeout(() => {
        printWindow.print()
      }, 500)
    }
  }
  const handleDownload = (table: Table) => {
    if (table?.qr_code) {
      const link = document.createElement('a')
      link.href = table?.qr_code
      link.download = `${table?.name}_QR_Code.png`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  return (
    <>

      <Card key={table.id} className="overflow-hidden hover:shadow-lg transition-shadow">
        <div className="bg-gradient-to-r from-main to-second p-4 text-white">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-black dark:text-white text-xl">{table.name}</h3>
            <Badge className="text-black dark:text-white">
              {table.capacity} {t('tables.capacity')}
            </Badge>

          </div>
        </div>

        <CardContent className="p-4">
          {table.qr_code ? (
            <div className="mb-4">
              <div className="bg-white p-3 rounded border-2 border-gray-200 flex items-center justify-center">
                <img
                  src={table.qr_code}
                  alt={`${table.name} QR Code`}
                  className="w-32 h-32 object-contain"
                />
              </div>
            </div>
          ) : (
            <div className="mb-4 text-center py-8 bg-gray-50 rounded">
              <QrCode className="w-12 h-12 mx-auto text-gray-300 mb-2" />
              <p className="text-sm text-gray-500">{t('store.generating-qr')}</p>
            </div>
          )}

          <div className="space-y-2">
            {table.qr_code && (
              <div className="grid grid-cols-2 gap-2">
                <Button
                  onClick={() => handleViewQR(table)}
                  size="sm"
                  className="bg-blue-500 hover:bg-blue-600 text-white"
                >
                  <Eye className="w-4 h-4 mr-1" />
                  {t('tables.view-qr')}
                </Button>
                <Button
                  onClick={() => handlePrintQR(table)}
                  size="sm"
                  className="bg-green-500 hover:bg-green-600 text-white"
                >
                  <Printer className="w-4 h-4 mr-1" />
                  {t('tables.print-qr')}
                </Button>
              </div>
            )}
            <div className="grid grid-cols-2 gap-2">
              <Button
                onClick={() => handleEditTable(table)}
                size="sm"
                variant="outline"
                className="w-full"
              >
                <Edit className="w-4 h-4 mr-1" />
                {t('common.edit')}
              </Button>
              <Button
                onClick={() => {
                  setDeleteTable(table)
                  setDeleteDialog(true)
                }}
                size="sm"
                variant="outline"
                className="w-full text-red-600 hover:bg-red-50"
              >
                <Trash2 className="w-4 h-4 mr-1" />
                {t('common.delete')}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>



      {/* Delete Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={() => setDeleteDialog(false)}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>
              {t('common.delete')}
            </DialogTitle>

          </DialogHeader>
          <div className='flex flex-col items-center justify-center'>
            <Trash2 size={40} />

            <h4>{t("common.delete-confirm")}</h4>
          </div>

          <DialogFooter>
            <Button variant="ghost" onClick={() => setDeleteDialog(false)}>
              {t("common.cancel")}
            </Button>

            <Button variant="destructive" onClick={() => handleDeleteTable()}>
              {t("common.delete")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Qr Dialog */}
      <Dialog open={showQRModal} onOpenChange={() => setShowQRModal(false)}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>

            </DialogTitle>

          </DialogHeader>

          <div className="text-center">
            {/* <h3 className="font-bold text-2xl mb-2">{store?.name}</h3>
                    <h4 className="text-xl text-gray-600 mb-6">{table?.name}</h4> */}

            {table?.qr_code ? (
              <div className="flex flex-col items-center">
                <div className="bg-white p-6 rounded-lg border-4 border-gray-300 mb-6">
                  <img
                    src={table?.qr_code}
                    alt={`${table?.name} QR Code`}
                    className="w-80 h-80 object-contain"
                  />
                </div>

                <p className="text-lg text-gray-600 mb-6">{t('tables.scan-to-order')}</p>

                <div className="flex gap-3 w-full max-w-md">
                  <Button
                    onClick={() => handleDownload(table)}
                    className="flex-1 bg-green-500 hover:bg-green-600 text-white"
                  >
                    <Download className="w-5 h-5 mr-2" />
                    {t('common.download')}
                  </Button>
                  <Button
                    onClick={() => handlePrintQR(table)}
                    className="flex-1 bg-blue-500 hover:bg-blue-600 text-white"
                  >
                    <Printer className="w-5 h-5 mr-2" />
                    {t('common.print')}
                  </Button>
                </div>
              </div>
            ) : (
              <div className="py-12">
                <p className="text-gray-500">{t('store.no-qr-code')}</p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
