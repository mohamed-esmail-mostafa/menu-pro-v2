export interface Table {
    id: number
    store_id: number
    name: string
    capacity: number
    qr_code: string | null
    created_at: string
    updated_at: string
}