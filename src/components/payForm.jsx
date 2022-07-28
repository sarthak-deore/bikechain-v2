import { useForm } from "react-hook-form";
import {
  FormErrorMessage,
  FormControl,
  Input,
  Button,
  Text,
  Flex,
} from "@chakra-ui/react";
import { useContext } from "react";
import { BlockChainContext } from "../context/blockChainContext";

export default function PayForm() {
  const { makePayment } = useContext(BlockChainContext);
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (values) => {
    const { payment } = values;
    await makePayment(payment);
    console.log(JSON.stringify(values));
  };

  return (
    <Flex justifyContent={"center"} alignItems={"center"} p={5} mt={10}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Text
          fontFamily={"heading"}
          fontSize={"x-large"}
          fontWeight={600}
          mb={4}
        >
          Pay Your Dues
        </Text>
        <FormControl isInvalid={errors.payment}>
          <Input
            id="payment"
            type="number"
            step="any"
            placeholder={"Amount"}
            {...register("payment", {
              required: "This is required",
            })}
          />
          <FormErrorMessage>
            {errors.payment && errors.payment.message}
          </FormErrorMessage>
        </FormControl>
        <Button
          mt={4}
          colorScheme="teal"
          isLoading={isSubmitting}
          type="submit"
        >
          Submit
        </Button>
      </form>
    </Flex>
  );
}
