import {
  Box,
  Button,
  Checkbox,
  Flex,
  Image,
  Input,
  Select,
  Text,
  Textarea,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import useProduct from '@/hooks/useProduct';

const PurchasePage = () => {
  const { productId } = useParams();
  const { product, loading } = useProduct(productId);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const quantity = parseInt(searchParams.get('quantity') || '1');
  const totalPrice = parseInt(searchParams.get('totalPrice') || '0');

  const [message, setMessage] = useState('');
  const [useReceipt, setUseReceipt] = useState(false);
  const [receiptType, setReceiptType] = useState('');
  const [receiptNumber, setReceiptNumber] = useState('');

  if (loading) return <Text>Loading...</Text>;
  if (!product) return <Text>상품 정보를 가져오는 중 오류가 발생했습니다.</Text>;

  const handlePurchase = () => {
    if (useReceipt && !receiptNumber) {
      // setShowAlert(true);
      return;
    }
    // 결제 로직 추후에 추가
    console.log('결제 정보:', {
      productId,
      message,
      quantity,
      useReceipt,
      receiptType,
      receiptNumber,
      totalPrice,
    });
  };

  return (
    <Box p="4" maxW="800px" mx="auto">
      <Flex direction={{ base: 'column', md: 'row' }} gap="4">
        <Box flex="1" mr="70">
          <Text fontSize="xl" mt="10" mb="4">
            나에게 주는 선물
          </Text>
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="선물과 함께 보낼 메시지를 적어보세요"
            minWidth="400"
            minHeight="100"
            resize="none"
            mb="4"
          />
          <Text fontSize="xl" mt="25" mb="30">
            선물내역
          </Text>
          <Flex align="center" mb="4">
            <Image
              src={product.detail.imageURL}
              alt={product.detail.name}
              boxSize="100px"
              mr="10"
            />
            <Box>
              <Text fontSize="lg">
                {product.detail.name} X {quantity}개
              </Text>
            </Box>
          </Flex>
        </Box>
        <Box flex="1">
          <Text fontSize="large" mt="10" mb="4">
            결제 정보
          </Text>
          <Flex alignItems="center" mt="10" mb="4">
            <Checkbox isChecked={useReceipt} onChange={(e) => setUseReceipt(e.target.checked)} />
            <Text ml="2">현금영수증 신청</Text>
          </Flex>
          <Box mb="4">
            <Select
              value={receiptType}
              onChange={(e) => setReceiptType(e.target.value)}
              mt="5"
              mb="2"
            >
              <option value="personal">개인소득공제</option>
              <option value="business">사업자증빙용</option>
            </Select>
            <Input
              type="number"
              placeholder="(-없이) 숫자만 입력해주세요."
              value={receiptNumber}
              onChange={(e) => setReceiptNumber(e.target.value)}
            />
          </Box>
          <Text fontSize="lg" fontWeight="bold" mt="30" mb="10">
            최종 결제 금액: {totalPrice}원
          </Text>
          <Button size="lg" backgroundColor="rgb(254, 229, 0)" onClick={handlePurchase}>
            {totalPrice}원 결제하기
          </Button>
        </Box>
      </Flex>
    </Box>
  );
};

export default PurchasePage;
