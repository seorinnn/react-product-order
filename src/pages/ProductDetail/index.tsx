import { AddIcon, MinusIcon } from '@chakra-ui/icons';
import { Box, Button, IconButton, Image, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import useProduct from '@/hooks/useProduct';
import { authSessionStorage } from '@/utils/storage';

const ProductDetailPage = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { product, loading } = useProduct(productId);
  const [quantity, setQuantity] = useState(1);

  if (loading) return <Text>Loading...</Text>;
  if (!product) return <Text>상품 정보를 가져오는 중 오류가 발생했습니다.</Text>;

  const handleQuantityChange = (change: number) => {
    setQuantity((prevQuantity) => Math.max(1, prevQuantity + change));
  };

  const totalPrice = product.detail.price.sellingPrice * quantity;

  //나에게 선물하기 버튼 클릭 시 로그인 여부 확인
  const handleGift = () => {
    const authToken = authSessionStorage.get();
    if (!authToken) {
      //로그인이 되어있지 않은 경우
      navigate('/login');
    } else {
      //로그인이 되어있는 경우
      navigate(`/order/${productId}?quantity=${quantity}&totalPrice=${totalPrice}`);
    }
  };

  return (
    <Box display="flex" alignItems="center" mt="30" ml="30">
      <Image
        src={product.detail.imageURL}
        alt={product.detail.name}
        boxSize="450px"
        objectFit="cover"
      />
      <Box ml="20">
        <Text fontSize="x-large">{product.detail.name}</Text>
        <Text fontSize="xx-large">{product.detail.price.sellingPrice}원</Text>
        <Box display="flex" alignItems="center" mt="10">
          <IconButton
            aria-label="Decrease quantity"
            icon={<MinusIcon />}
            onClick={() => handleQuantityChange(-1)}
          />
          <Text fontSize="x-large" mx="10">
            {quantity}
          </Text>
          <IconButton
            aria-label="Increase quantity"
            icon={<AddIcon />}
            onClick={() => handleQuantityChange(1)}
          />
        </Box>
        <Text fontSize="xl" fontWeight="bold" mt="10" mb="5">
          총 결제금액: {totalPrice}원
        </Text>
        <Button border="1px solid" borderColor="gray.400" onClick={handleGift}>
          나에게 선물하기
        </Button>
      </Box>
    </Box>
  );
};

export default ProductDetailPage;
