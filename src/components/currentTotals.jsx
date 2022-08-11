import {
  Box,
  chakra,
  Flex,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  useColorModeValue,
} from "@chakra-ui/react";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { AiOutlineClockCircle } from "react-icons/ai";
import { MdOutlineAccountBalanceWallet } from "react-icons/md";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import PayForm from "./payForm";
import AddBalanceForm from "./addBalanceForm";
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

export default function CurrentTotals() {
  const {
    renterBalance,
    due,
    duration,
    renter,
    checkRenterExists,
    currentAccount,
    getRenter,
  } = useContext(BlockChainContext);

  if (currentAccount && renter) {
    checkRenterExists();
    getRenter();
    return (
      <>
        <Box maxW="7xl" mx={"auto"} pt={5} px={{ base: 2, sm: 12, md: 17 }}>
          <chakra.h1
            textAlign={"center"}
            fontSize={"4xl"}
            py={10}
            fontWeight={"bold"}
          >
            Welcome {renter.firstName}, Here are your stats!
          </chakra.h1>
          <SimpleGrid columns={{ base: 1, md: 4 }} spacing={{ base: 5, lg: 8 }}>
            <StatsCard
              title={"BNB Credit"}
              stat={renterBalance}
              icon={<MdOutlineAccountBalanceWallet size={"3em"} />}
            />
            <StatsCard
              title={"BNB Dues"}
              stat={due}
              icon={<RiMoneyDollarCircleFill size={"3em"} />}
            />
            <StatsCard
              title={"Ride Minutes"}
              stat={duration}
              icon={<AiOutlineClockCircle size={"3em"} />}
            />

            <StatsCard
              title={"Bike Status"}
              bgcolor={renter && renter.active ? "green.300" : "orange"}
              stat={renter && renter.active ? "Rented" : "Parked"}
            />
          </SimpleGrid>
          <Flex justifyContent={"center"} alignItems={"center"}>
            <AddBalanceForm />
            <PayForm />
          </Flex>
        </Box>
        <ToastContainer autoClose={3000} />
      </>
    );
  }
}
