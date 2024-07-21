import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Image,
  Input,
  Select,
  Text,
  Textarea,
} from '@chakra-ui/react';
import { Controller, useForm } from 'react-hook-form';
import { useLocation, useParams } from 'react-router-dom';

import useProduct from '@/hooks/useProduct';

interface FormData {
  message: string;
  useReceipt: boolean;
  receiptType?: string;
  receiptNumber?: string;
}

const PurchasePage = () => {
  const { productId } = useParams();
  const { product, loading } = useProduct(productId);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const quantity = parseInt(searchParams.get('quantity') || '1');
  const totalPrice = parseInt(searchParams.get('totalPrice') || '0');

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      message: '',
      useReceipt: false,
      receiptType: '',
      receiptNumber: '',
    },
  });

  const useReceipt = watch('useReceipt');

  if (loading) return <Text>Loading...</Text>;
  if (!product) return <Text>상품 정보를 가져오는 중 오류가 발생했습니다.</Text>;

  const onSubmit = (data: FormData) => {
    alert('주문이 완료되었습니다.');
    console.log('결제 정보:', {
      productId,
      ...data,
      quantity,
      totalPrice,
    });
  };

  return (
    <Box p="4" maxW="800px" mx="auto">
      <Flex direction={{ base: 'column', md: 'row' }} gap="4">
        <Box flex="1" mr="70">
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl isInvalid={!!errors.message}>
              <FormLabel fontSize="xl" mt="10" mb="4">
                나에게 주는 선물
              </FormLabel>
              <Textarea
                {...register('message', {
                  required: '메시지를 입력해주세요.',
                  maxLength: { value: 100, message: '메시지는 100자 이내로 입력해주세요.' },
                })}
                placeholder="선물과 함께 보낼 메시지를 적어보세요"
                minWidth="400"
                minHeight="100"
                resize="none"
                mb="4"
              />
              {errors.message ? (
                <FormErrorMessage>{errors.message.message}</FormErrorMessage>
              ) : (
                <FormHelperText>메시지는 100자 이내로 입력해주세요.</FormHelperText>
              )}
            </FormControl>
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
          </form>
        </Box>
        <Box flex="1">
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl>
              <FormLabel fontSize="large" mt="10" mb="4">
                결제 정보
              </FormLabel>
              <Flex alignItems="center" mt="10" mb="4">
                <Controller
                  name="useReceipt"
                  control={control}
                  render={({ field }) => (
                    <Checkbox
                      {...field}
                      isChecked={field.value}
                      onChange={(e) => field.onChange(e.target.checked)}
                      value={undefined}
                    />
                  )}
                />
                <Text ml="2">현금영수증 신청</Text>
              </Flex>
            </FormControl>
            {useReceipt && (
              <>
                <FormControl isInvalid={!!errors.receiptType}>
                  <FormLabel mt="5">현금영수증 유형 선택</FormLabel>
                  <Select {...register('receiptType', { required: useReceipt })} mt="5" mb="2">
                    <option value="personal">개인소득공제</option>
                    <option value="business">사업자증빙용</option>
                  </Select>
                </FormControl>
                <FormControl isInvalid={!!errors.receiptNumber}>
                  <Input
                    {...register('receiptNumber', {
                      required: useReceipt ? '현금영수증 번호를 입력해주세요.' : false,
                      pattern: {
                        value: /^\d+$/,
                        message: '현금영수증 번호는 숫자만 입력해주세요.',
                      },
                    })}
                    type="text"
                    placeholder="(-없이) 숫자만 입력해주세요."
                  />
                  {errors.receiptNumber && (
                    <FormErrorMessage>{errors.receiptNumber.message}</FormErrorMessage>
                  )}
                </FormControl>
              </>
            )}
            <Text fontSize="lg" fontWeight="bold" mt="30" mb="10">
              최종 결제 금액: {totalPrice}원
            </Text>
            <Button type="submit" size="lg" backgroundColor="rgb(254, 229, 0)">
              {totalPrice}원 결제하기
            </Button>
          </form>
        </Box>
      </Flex>
    </Box>
  );
};

export default PurchasePage;
