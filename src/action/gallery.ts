'use server'

import { authApi } from '@/services/axios/authApi'
import { revalidatePath } from 'next/cache'

export async function deleteGallery(galleryId: number) {
  try {
    await authApi.delete(`/v1/api/gallery/${galleryId}`)
    revalidatePath('/gallery')
    return { success: true, message: '갤러리가 삭제되었습니다.' }
  } catch (error) {
    console.error('갤러리 삭제 실패:', error)
    return { success: false, message: '갤러리 삭제 중 오류가 발생했습니다.' }
  }
}
