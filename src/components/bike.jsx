import { Box, Image, Text, Stack, Button } from "@chakra-ui/react";
import { useContext } from "react";
import { BlockChainContext } from "../context/blockChainContext";

const Bike = ({ bike }) => {
  const { checkOut, checkIn } = useContext(BlockChainContext);
  return (
    <Box boxSize="md" mx={10}>
      <Image src={bike} mb={"-40px"} boxSize="400px" objectFit={"contain"} />
      <Text fontFamily={"sans-serif"}>
        Mountain bikes are designed for off-road riding. The thick tyres and
        treads are perfectly suited to helping you stay upright on rocky, muddy
        singletrack trails.
      </Text>
      <Stack
        spacing={0}
        mt={"10px"}
        direction={"row"}
        align={"center"}
        justify={"center"}
      >
        <Button
          onClick={checkOut}
          colorScheme={"teal"}
          bg={"teal.400"}
          margin="5px"
          rounded={"full"}
          px={6}
          _hover={{
            bg: "teal.500",
          }}
        >
          Check Out
        </Button>
        <Button
          onClick={checkIn}
          colorScheme={"teal"}
          bg={"teal.400"}
          rounded={"full"}
          px={6}
          _hover={{
            bg: "teal.500",
          }}
        >
          Check In
        </Button>
      </Stack>
    </Box>
  );
};

export default Bike;
