import { useState, useEffect, useRef } from 'react'
import { supabase } from '@/lib/supabase'
import { Icon } from '@/components/ui/Icon'
import type { PortfolioItem } from '@/lib/types'

const BUCKET = 'portfolio-images'
const MAX_SIZE = 1200
const QUALITY = 0.8

function getPublicUrl(path: string) {
  return supabase.storage.from(BUCKET).getPublicUrl(path).data.publicUrl
}

function compressImage(file: File): Promise<Blob> {
  return new Promise((resolve) => {
    const img = new Image()
    img.onload = () => {
      let { width, height } = img
      if (width > MAX_SIZE || height > MAX_SIZE) {
        if (width > height) {
          height = Math.round((height * MAX_SIZE) / width)
          width = MAX_SIZE
        } else {
          width = Math.round((width * MAX_SIZE) / height)
          height = MAX_SIZE
        }
      }
      const canvas = document.createElement('canvas')
      canvas.width = width
      canvas.height = height
      canvas.getContext('2d')!.drawImage(img, 0, 0, width, height)
      canvas.toBlob((blob) => resolve(blob!), 'image/jpeg', QUALITY)
    }
    img.src = URL.createObjectURL(file)
  })
}

export function AdminPortfolio() {
  const [items, setItems] = useState<PortfolioItem[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const fileRef = useRef<HTMLInputElement>(null)

  const load = async () => {
    const { data } = await supabase
      .from('portfolio')
      .select('*')
      .order('display_order', { ascending: true })
    setItems(data ?? [])
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  const handleUpload = async () => {
    const file = fileRef.current?.files?.[0]
    if (!file || !title.trim()) return

    setUploading(true)
    const compressed = await compressImage(file)
    const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.jpg`

    const { error: uploadError } = await supabase.storage.from(BUCKET).upload(path, compressed, {
      contentType: 'image/jpeg',
    })
    if (uploadError) {
      alert('Ошибка загрузки: ' + uploadError.message)
      setUploading(false)
      return
    }

    const maxOrder = items.reduce((max, item) => Math.max(max, item.display_order), 0)
    const { data, error: insertError } = await supabase
      .from('portfolio')
      .insert({
        title: title.trim(),
        description: description.trim() || null,
        image_path: path,
        display_order: maxOrder + 1,
      })
      .select()
      .single()

    if (insertError) {
      alert('Ошибка сохранения: ' + insertError.message)
    } else if (data) {
      setItems((prev) => [...prev, data])
    }

    setTitle('')
    setDescription('')
    if (fileRef.current) fileRef.current.value = ''
    setUploading(false)
  }

  const remove = async (item: PortfolioItem) => {
    await supabase.storage.from(BUCKET).remove([item.image_path])
    await supabase.from('portfolio').delete().eq('id', item.id)
    setItems((prev) => prev.filter((i) => i.id !== item.id))
  }

  if (loading) {
    return <div className="flex justify-center py-12"><div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" /></div>
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-text-primary mb-6">Портфолио</h1>

      {/* Upload form */}
      <div className="bg-white rounded-xl border border-gray-200 p-5 mb-6">
        <h3 className="text-sm font-semibold text-text-primary mb-3">Добавить фото</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
          <input
            type="text"
            placeholder="Название *"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="px-3 py-2 rounded-lg border border-gray-200 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-text-primary"
          />
          <input
            type="text"
            placeholder="Описание (необязательно)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="px-3 py-2 rounded-lg border border-gray-200 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-text-primary"
          />
        </div>
        <div className="flex items-center gap-3">
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="text-sm text-text-secondary file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-primary/10 file:text-primary hover:file:bg-primary/20 file:cursor-pointer"
          />
          <button
            onClick={handleUpload}
            disabled={uploading}
            className="px-5 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-50 cursor-pointer"
          >
            {uploading ? 'Загрузка...' : 'Загрузить'}
          </button>
        </div>
      </div>

      {/* Grid */}
      {items.length === 0 ? (
        <div className="text-center py-16 text-text-secondary">
          <Icon name="image" className="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p>Фото пока нет</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map((item) => (
            <div key={item.id} className="group relative bg-white rounded-xl border border-gray-200 overflow-hidden">
              <img
                src={getPublicUrl(item.image_path)}
                alt={item.title}
                className="w-full aspect-[4/3] object-cover"
                loading="lazy"
              />
              <div className="p-3">
                <p className="text-sm font-medium text-text-primary truncate">{item.title}</p>
                {item.description && (
                  <p className="text-xs text-text-secondary truncate mt-0.5">{item.description}</p>
                )}
              </div>
              <button
                onClick={() => remove(item)}
                className="absolute top-2 right-2 p-1.5 bg-white/90 rounded-lg shadow opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50 cursor-pointer"
                title="Удалить"
              >
                <Icon name="trash-2" className="w-4 h-4 text-red-500" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
