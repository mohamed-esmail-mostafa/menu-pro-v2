export interface WebsiteSetting {
  id?: number;
  name_en?: string | null;
  name_ar?: string | null;
  description_en?: string | null;
  description_ar?: string | null;
  keywords_en?: string | null;
  keywords_ar?: string | null;
  light_logo?: string | null;
  public_light_logo_id?: string | null;
  dark_logo?: string | null;
  public_dark_logo_id?: string | null;
  favicon?: string | null;
  public_favicon_id?: string | null;
  email?: string | null;
  phone?: string | null;
  whatsup?: string | null;
  address?: string | null;
  facebook?: string | null;
  instagram?: string | null;
  tiktok?: string | null;
  created_at?: string;
  updated_at?: string;
}
