import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { QrCode, Search, Plus, Check, Star, Flame, Leaf, ShoppingBag, Eye, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'

interface MenuItem {
  id: number
  nameEn: string
  nameAr: string
  category: string
  price: string
  rating: number
  tagEn?: string
  tagAr?: string
  image: string
  descEn: string
  descAr: string
}

export default function QrDemoSection() {
  const { t, i18n } = useTranslation()
  const isAr = i18n.language?.startsWith('ar')
  const [activeCategory, setActiveCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [cart, setCart] = useState<{ [key: number]: number }>({})
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null)

  const categories = [
    { id: 'all', nameEn: 'All Items', nameAr: 'الكل' },
    { id: 'burgers', nameEn: 'Burgers', nameAr: 'برجر' },
    { id: 'pizza', nameEn: 'Pizza', nameAr: 'بيتزا' },
    { id: 'drinks', nameEn: 'Drinks', nameAr: 'مشروبات' },
    { id: 'desserts', nameEn: 'Desserts', nameAr: 'حلويات' },
  ]

  const menuItems: MenuItem[] = [
    {
      id: 1,
      nameEn: 'Black Angus Double Burger',
      nameAr: 'برجر بلاك انجوس دبل',
      category: 'burgers',
      price: '$14.99',
      rating: 4.9,
      tagEn: 'Popular ⭐',
      tagAr: 'الأكثر طلباً ⭐',
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=500&q=80',
      descEn: 'Double juicy Black Angus beef patties, aged cheddar, caramelized onions & secret truffle sauce.',
      descAr: 'شريحتان من لحم الأنجوس الأسود الفاخر، جبن شيدر معتق، بصل مكرمل وصلصة الترفل الخاصة.',
    },
    {
      id: 2,
      nameEn: 'Truffle Mushroom Pizza',
      nameAr: 'بيتزا الفطر مع الترفل',
      category: 'pizza',
      price: '$17.50',
      rating: 4.8,
      tagEn: 'Vegetarian 🌱',
      tagAr: 'نباتي 🌱',
      image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=500&q=80',
      descEn: 'Wild mushrooms, mozzarella, white truffle cream oil & fresh basil leaves.',
      descAr: 'فطر بري، جبنة موزاريلا، زيت كريمة الترفل الأبيض وأوراق الريحان الطازجة.',
    },
    {
      id: 3,
      nameEn: 'Spicy Buffalo Wings',
      nameAr: 'أجنحة دجاج بوفالو حارة',
      category: 'burgers',
      price: '$11.00',
      rating: 4.7,
      tagEn: 'Spicy 🔥',
      tagAr: 'حار 🔥',
      image: 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&w=500&q=80',
      descEn: 'Crispy fried wings tossed in signature hot cayenne sauce with blue cheese dip.',
      descAr: 'أجنحة مقرمشة مع صلصة الفلفل الحار المميزة وغموس الجبن الأزرق.',
    },
    {
      id: 4,
      nameEn: 'Iced Passionfruit Drink',
      nameAr: 'مشروب باشن فروت المثلج',
      category: 'drinks',
      price: '$5.50',
      rating: 4.9,
      tagEn: 'Refreshing ❄️',
      tagAr: 'منعش ❄️',
      image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=500&q=80',
      descEn: 'Real passionfruit pulp, fresh mint leaves, sparkling soda and crushed ice.',
      descAr: 'لب الباشن فروت الطبيعي، أوراق النعناع الطازجة، صودا ثلجية.',
    },
    {
      id: 5,
      nameEn: 'Salted Caramel Lava Cake',
      nameAr: 'كيكة التوفي والكراميل',
      category: 'desserts',
      price: '$7.99',
      rating: 5.0,
      tagEn: 'Popular ⭐',
      tagAr: 'الأكثر طلباً ⭐',
      image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=500&q=80',
      descEn: 'Warm chocolate lava cake oozing molten salted caramel served with vanilla ice cream.',
      descAr: 'كيكة الشوكولاتة الدافئة المحشوة بالكراميل المملح والمقدمة مع أيس كريم فانيليا.',
    },
  ]

  const filteredItems = menuItems.filter((item) => {
    const matchesCat = activeCategory === 'all' || item.category === activeCategory
    const name = isAr ? item.nameAr : item.nameEn
    const matchesSearch = name.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCat && matchesSearch
  })

  const addToCart = (id: number) => {
    setCart((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }))
  }

  const totalCartCount = Object.values(cart).reduce((a, b) => a + b, 0)

  return (
    <section id="demo" className="py-16 md:py-24 relative overflow-hidden">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 bg-amber-500/10 px-3.5 py-1 rounded-full">
            {t('home.demo.tag')}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
            {t('home.demo.title')}
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg">
            {t('home.demo.subtitle')}
          </p>
        </div>

        {/* Demo App Container */}
        <div className="max-w-4xl mx-auto rounded-3xl border border-border/80 bg-card shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          {/* Left Scan Panel (QR & Info) */}
          <div className="lg:col-span-4 p-6 sm:p-8 bg-gradient-to-br from-primary/10 via-muted/30 to-background border-b lg:border-b-0 lg:border-r border-border/60 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center font-bold">
                  <QrCode className="size-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-foreground text-base">Le Bistro Cafe</h3>
                  <p className="text-xs text-muted-foreground">Digital QR Menu Experience</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-background/90 backdrop-blur-sm border border-border/80 text-center space-y-3">
                <div className="size-36 mx-auto bg-white p-2.5 rounded-2xl shadow-inner border border-slate-200 flex items-center justify-center">
                  <QrCode className="size-32 text-slate-900" />
                </div>
                <p className="text-xs font-medium text-muted-foreground">
                  {t('home.demo.scan-instruction')}
                </p>
              </div>
            </div>

            {/* Cart Counter Footer */}
            <div className="p-3.5 rounded-2xl bg-accent/80 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingBag className="size-4 text-primary" />
                <span className="text-xs font-bold text-foreground">Order Items:</span>
              </div>
              <Badge variant="default" className="rounded-full font-bold px-3">
                {totalCartCount} items
              </Badge>
            </div>
          </div>

          {/* Right Interactive Menu Panel */}
          <div className="lg:col-span-8 p-6 sm:p-8 flex flex-col space-y-6">
            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground rtl:right-3.5 rtl:left-auto" />
              <Input
                type="text"
                placeholder={isAr ? 'ابحث عن وجبة أو مشروب...' : 'Search meals or drinks...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 rtl:pr-10 rtl:pl-4 rounded-2xl bg-background border-border/80 text-sm h-11"
              />
            </div>

            {/* Category Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                    activeCategory === cat.id
                      ? 'bg-primary text-primary-foreground shadow-sm'
                      : 'bg-muted/50 text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  {isAr ? cat.nameAr : cat.nameEn}
                </button>
              ))}
            </div>

            {/* Menu Items Grid */}
            <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  className="p-3.5 rounded-2xl bg-background border border-border/60 hover:border-primary/40 transition-all flex items-center justify-between gap-4 group"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <img
                      src={item.image}
                      alt={isAr ? item.nameAr : item.nameEn}
                      className="size-16 rounded-xl object-cover shrink-0 group-hover:scale-105 transition-transform"
                    />
                    <div className="min-w-0 space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="font-bold text-sm text-foreground truncate">
                          {isAr ? item.nameAr : item.nameEn}
                        </h4>
                        {item.tagEn && (
                          <span className="text-[10px] font-semibold bg-amber-500/10 text-amber-600 dark:text-amber-400 px-2 py-0.5 rounded-md shrink-0">
                            {isAr ? item.tagAr : item.tagEn}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-1">
                        {isAr ? item.descAr : item.descEn}
                      </p>
                      <div className="text-xs font-extrabold text-primary">{item.price}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setSelectedItem(item)}
                      className="rounded-xl size-8 hover:bg-accent"
                      title="View Details"
                    >
                      <Eye className="size-4 text-muted-foreground" />
                    </Button>

                    <Button
                      size="sm"
                      onClick={() => addToCart(item.id)}
                      className="rounded-xl h-8 px-3 text-xs font-bold gap-1 bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-all"
                    >
                      {cart[item.id] ? (
                        <>
                          <Check className="size-3.5" />
                          <span>{cart[item.id]}</span>
                        </>
                      ) : (
                        <>
                          <Plus className="size-3.5" />
                          <span>{t('home.demo.add-to-cart')}</span>
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Item Detail Modal Preview */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-card border border-border max-w-md w-full rounded-3xl overflow-hidden shadow-2xl space-y-4 p-6 relative">
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4 rtl:left-4 rtl:right-auto size-8 rounded-full bg-background/80 border border-border flex items-center justify-center"
            >
              <X className="size-4" />
            </button>
            <img
              src={selectedItem.image}
              alt={isAr ? selectedItem.nameAr : selectedItem.nameEn}
              className="w-full h-48 rounded-2xl object-cover"
            />
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="font-extrabold text-lg text-foreground">
                  {isAr ? selectedItem.nameAr : selectedItem.nameEn}
                </h3>
                <span className="font-black text-primary text-lg">{selectedItem.price}</span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {isAr ? selectedItem.descAr : selectedItem.descEn}
              </p>
            </div>
            <Button
              onClick={() => {
                addToCart(selectedItem.id)
                setSelectedItem(null)
              }}
              className="w-full rounded-2xl font-bold gap-2"
            >
              <ShoppingBag className="size-4" />
              <span>{t('home.demo.add-to-cart')}</span>
            </Button>
          </div>
        </div>
      )}
    </section>
  )
}
