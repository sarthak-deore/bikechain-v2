import {
  Box,
  chakra,
  Flex,
  SimpleGrid,
  Stat,
  Text,
  StatLabel,
  StatNumber,
  useColorModeValue,
  Button,
} from "@chakra-ui/react";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { MdOutlineAccountBalanceWallet } from "react-icons/md";

import { useForm } from "react-hook-form";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useContext } from "react";

import { BlockChainContext } from "../context/blockChainContext";

function StatsCard(props) {
  const { title, stat, icon, bgcolor } = props;
  return (
    <Stat
      px={{ base: 2, md: 4 }}
      py={"5"}
      shadow={"xl"}
      border={"1px solid"}
      borderColor={useColorModeValue("gray.800", "gray.500")}
      rounded={"lg"}
      backgroundColor={bgcolor}
    >
      <Flex justifyContent={"space-between"}>
        <Box pl={{ base: 2, md: 4 }}>
          <StatLabel fontWeight={"medium"}>{title}</StatLabel>
          <StatNumber fontSize={"2xl"} fontWeight={"medium"}>
            {stat}
          </StatNumber>
        </Box>
        <Box
          my={"auto"}
          color={useColorModeValue("gray.800", "gray.200")}
          alignContent={"center"}
        >
          {icon}
        </Box>
      </Flex>
    </Stat>
  );
}

export default function AdminTotals() {
  const {
    currentAccount,
    isOwner,
    getBalance,
    balance,
    checkOwner,
    ownerBalance,
    getOwnerBalance,
    withdrawToOwner,
  } = useContext(BlockChainContext);

  const {
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async () => {
    toast.success("Withdrawal initiated", {
      position: "top-right",
    });
    await withdrawToOwner();

    await getBalance();
    await getOwnerBalance();
  };

  if (currentAccount) {
    checkOwner();
    if (isOwner) {
      getBalance();
      getOwnerBalance();

      return (
        <>
          <Box maxW="7xl" mx={"auto"} pt={5} px={{ base: 2, sm: 12, md: 17 }}>
            <chakra.h1
              textAlign={"center"}
              fontSize={"4xl"}
              py={10}
              fontWeight={"bold"}
            >
              Welcome Admin, Here are your stats!
            </chakra.h1>
            <SimpleGrid
              columns={{ base: 1, md: 2 }}
              spacing={{ base: 5, lg: 8 }}
            >
              <StatsCard
                title={"Contract Balance"}
                stat={balance}
                icon={<RiMoneyDollarCircleFill size={"3em"} />}
              />
              <StatsCard
                title={"Owner Earnings"}
                stat={ownerBalance}
                icon={<MdOutlineAccountBalanceWallet size={"3em"} />}
              />
            </SimpleGrid>
            <Flex justifyContent={"center"} alignItems={"center"}></Flex>
          </Box>
          <Flex
            justifyContent={"center"}
            alignItems={"center"}
            display={"block"}
          >
            <Text fontSize={20}>Withdraw your earnings!</Text>
            <Button
              mt={4}
              colorScheme="purple"
              isLoading={isSubmitting}
              onClick={onSubmit}
            >
              Withdraw
            </Button>
          </Flex>

          <ToastContainer autoClose={3000} />
        </>
      );
    }
  }
}
