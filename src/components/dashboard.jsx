import { Stack, Box, Flex, Center } from "@chakra-ui/react";
import CurrentTotals from "./currentTotals";
import Bike from "./bike";
import Bike1 from "../assets/bike1.png";
import Bike2 from "../assets/bike2.png";
import Bike3 from "../assets/bike3.png";
import RenterForm from "./renterForm";
import { useContext } from "react";

import { BlockChainContext } from "../context/blockChainContext";
import { useState } from "react";

import ClipLoader from "react-spinners/ClipLoader";

const Dashboard = () => {
  const { renterExists, currentAccount, checkRenterExists } =
    useContext(BlockChainContext);

  let [loading, setLoading] = useState(true);

  return (
    <Stack
      as={Box}
      textAlign={"center"}
      spacing={{ base: 8, md: 14 }}
      py={{ base: 20, md: 36 }}
    >
      {renterExists == null && currentAccount ? (
        <Center>
          <ClipLoader loading={loading} size={75} />
        </Center>
      ) : renterExists ? (
        <CurrentTotals />
      ) : (
        <RenterForm />
      )}
      <Flex justifyContent={"center"} alignItems={"center"}>
        <Bike bike={Bike1}></Bike>
        <Bike bike={Bike2}></Bike>
        <Bike bike={Bike3}></Bike>
      </Flex>
    </Stack>
  );
};

export default Dashboard;
