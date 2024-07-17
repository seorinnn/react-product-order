import { AddIcon, MinusIcon } from '@chakra-ui/icons';
import { Box, Button, IconButton, Image, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import useProduct from '@/hooks/useProduct';

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
        <Text fontSize="xx-large" mt="10">
          {product.detail.price.sellingPrice}원
        </Text>
        <Box display="flex" alignItems="center" mt="40">
          <IconButton
            aria-label="Decrease quantity"
            icon={<MinusIcon />}
            onClick={() => handleQuantityChange(-1)}
          />
          <Text mx="20">{quantity}</Text>
          <IconButton
            aria-label="Increase quantity"
            icon={<AddIcon />}
            onClick={() => handleQuantityChange(1)}
          />
        </Box>
        <Text fontSize="xl" fontWeight="bold" my="20">
          총 결제금액: {totalPrice}원
        </Text>
        <Button
          padding="10"
          border="1px solid"
          borderColor="gray.400"
          onClick={() => {
            //로그인 로직은 추후 수정
            const isLoggedIn = true;
            if (!isLoggedIn) {
              navigate('/login');
            } else {
              navigate(`/order/${productId}?quantity=${quantity}&totalPrice=${totalPrice}`);
            }
          }}
        >
          나에게 선물하기
        </Button>
      </Box>
    </Box>
  );
};

export default ProductDetailPage;
