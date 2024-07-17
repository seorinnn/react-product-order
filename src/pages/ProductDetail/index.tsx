import { Box, Button, Image, Text } from '@chakra-ui/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

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

const ProductDetailPage = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const response = await axios.get<Product>(
          `https://react-gift-mock-api-seorinnn.vercel.app/api/v1/products/${productId}/detail`,
        );
        console.log('API Response:', response.data);
        setProduct(response.data);
      } catch (error) {
        console.error('Product not found, redirecting to main page');
        navigate('/');
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId, navigate]);

  if (loading) return <Text>Loading...</Text>;
  if (!product) return <Text>상품 정보를 가져오는 중 오류가 발생했습니다.</Text>;

  console.log('Rendered product:', product); //추가

  return (
    <Box>
      <Image src={product.detail.imageURL} alt={product.detail.name} />
      <Text>{product.detail.name}</Text>
      <Text>{product.detail.price.sellingPrice}</Text>
      {/* <Button onClick={() => navigate(`/product/${productId}/purchase`)}>구매하기</Button> */}
      <Button
        onClick={() => {
          //로그인 로직은 추후 수정
          const isLoggedIn = true;
          if (!isLoggedIn) {
            navigate('/login');
          } else {
            navigate(`/product/${productId}/gift`);
          }
        }}
      >
        나에게 선물하기
      </Button>
    </Box>
  );
};

export default ProductDetailPage;
