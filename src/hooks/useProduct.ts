// hooks/useProductDetail.ts
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Product {
  detail: {
    id: string;
    imageURL: string;
    name: string;
    price: {
      sellingPrice: number;
    };
  };
}

const useProduct = (productId: string | undefined) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get<Product>(
          `https://react-gift-mock-api-seorinnn.vercel.app/api/v1/products/${productId}/detail`,
        );
        setProduct(response.data);
      } catch (error) {
        console.error('Product not found.');
        navigate('/');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId, navigate]);

  return { product, loading };
};

export default useProduct;
