/* eslint-disable react-hooks/exhaustive-deps */
import { NextPage } from "next";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../utils/providers/User.provider";
import SwitchNetwork from "../Modals/SwitchNetwork.modal";
import { useWeb3 } from "@3rdweb/hooks";
import { Box } from "@chakra-ui/react";

const PageWrapper: NextPage = ({ children }) => {
  const { setUser } = useContext<any>(UserContext);
  const [isUnsupportedChainId, setIsUnsupportedChainId] = useState(false);
  const { address, chainId, error } = useWeb3();

  useEffect(() => {
    console.log(error);
    if (
      error?.name === "UnsupportedChainIdError" ||
      error?.message.endsWith("001.")
    ) {
      setIsUnsupportedChainId(true);
    } else {
      setIsUnsupportedChainId(false);
    }
  }, [error]);

  useEffect(() => {
    if (address) {
      localStorage.setItem("method", "injected");
    }
    setUser({
      address,
      chainId,
    });
  }, [address, chainId]);

  return (
    <Box bg="white" minH="100vh" color="brand.black">
      {isUnsupportedChainId && <SwitchNetwork />}
      <Box mx="auto">{children}</Box>
    </Box>
  );
};

export default PageWrapper;
