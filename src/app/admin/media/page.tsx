'use client'
import { useState, useEffect } from 'react';

// Response Interface
interface GalleryResponse {
  code: number;
  message: string;
  data: {
    totalPages: number;
    totalGalleries: number;
    galleries: Gallery[];
  }
}

// Gallery Interface
interface Gallery {
  galleryId: number;
  title: string;
  fileName: string;
  imgUrl: string;
  createAt: string;
}

interface GallerySearchParams {
  page: number;
  size: number;
  keyword?: string;
  official: boolean;
}

const Page = () => {
  const [galleries, setGalleries] = useState<Gallery[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchGalleries = async (params: GallerySearchParams): Promise<GalleryResponse> => {
    try {
      const { page, size, keyword, official } = params;
      const queryParams = new URLSearchParams({
        page: page.toString(),
        size: size.toString(),
        official: official.toString(),
        ...(keyword && { keyword })
      });

      const response = await fetch(
        `https://jbaserver.shop/v1/api/gallery?${queryParams}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: GalleryResponse = await response.json();
      return data;

    } catch (error) {
      console.error('갤러리 데이터 조회 중 오류 발생:', error);
      throw error;
    }
  }

  useEffect(() => {
    const getGalleries = async () => {
      setLoading(true);
      try {
        const params: GallerySearchParams = {
          page: 0,
          size: 6,
          official: true
        };
        const response = await fetchGalleries(params);
        setGalleries(response.data.galleries);
      } catch (err) {
        setError(err instanceof Error ? err.message : '갤러리 로딩 중 오류가 발생했습니다');
      } finally {
        setLoading(false);
      }
    };

    getGalleries();
  }, []);

  if (loading) return <div>로딩중...</div>;
  if (error) return <div>에러: {error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">갤러리</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {galleries.map((gallery) => (
          <div 
            key={gallery.galleryId} 
            className="border rounded-lg overflow-hidden shadow-lg"
          >
            <img 
              src={gallery.imgUrl} 
              alt={gallery.title}
              className="w-full h-48 object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "https://www.irisoele.com/img/noimage.png";
              }}
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{gallery.title}</h2>
              <p className="text-gray-600">{gallery.fileName}</p>
              <p className="text-sm text-gray-500 mt-2">{gallery.createAt}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;