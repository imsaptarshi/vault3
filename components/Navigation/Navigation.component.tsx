/* eslint-disable react-hooks/exhaustive-deps */
import {
  Button,
  Flex,
  Image,
  Text,
  Box,
  useDisclosure,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { FaSignOutAlt, FaWallet } from "react-icons/fa";
import { useWeb3 } from "@3rdweb/hooks";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../utils/providers/User.provider";
import WalletConnect from "../Modals/WalletConnect.modal";
import config from "../../utils/helpers/config";
import Link from "next/link";

export default function Navigation({ color = "white" }) {
  const { disconnectWallet } = useWeb3();

  const { user } = useContext(UserContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [topOfPage, setTopOfPage] = useState(true);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 1) {
        setTopOfPage(false);
      } else {
        setTopOfPage(true);
      }
    });
  }, []);

  return (
    <Box
      position="fixed"
      zIndex={999}
      top="0"
      left="0"
      w="full"
      display="flex"
      transitionDuration="300ms"
      bg={
        topOfPage
          ? "transparent"
          : color === "white"
          ? "rgba(255, 255, 255, 0.43);"
          : "rgba(4, 12, 30, 0.53)"
      }
      backdropFilter={!topOfPage ? "blur(7px)" : ""}
      borderBottom={!topOfPage ? "1px" : "1px"}
      borderColor={
        !topOfPage
          ? color === "white"
            ? "blackAlpha.100"
            : "whiteAlpha.200"
          : "transparent"
      }
      justifyContent="center"
    >
      <WalletConnect isOpen={isOpen} onClose={onClose} />

      <Flex
        justify="space-between"
        w="full"
        alignItems="center"
        p="4"
        maxW="5xl"
      >
        <Link href="/" passHref>
          <Flex alignItems="center" experimental_spaceX="3" cursor="pointer">
            <Image src="assets/vault3_logo.svg" alt="vault3" w="9" h="9" />
            <Flex
              fontSize="2xl"
              color={color == "white" ? "blackAlpha.900" : "white"}
              alignItems="center"
            >
              <Text fontFamily="heading" fontWeight="extrabold">
                vault{" "}
              </Text>
              <Text ml="0.5" fontFamily="body" fontWeight="medium" mb="1">
                3
              </Text>
            </Flex>
          </Flex>
        </Link>
        {!user.address ? (
          <Button
            onClick={onOpen}
            bg="brand.blue"
            color="white"
            fontWeight="semibold"
            rounded="lg"
            leftIcon={<FaWallet />}
            _hover={{}}
            _focus={{}}
            _active={{}}
          >
            Connect Wallet
          </Button>
        ) : (
          <Menu>
            <MenuButton>
              <Flex
                bg={color === "white" ? "whiteAlpha.600" : "whiteAlpha.200"}
                p="2"
                rounded="full"
                experimental_spaceX="2"
                border="1px"
                borderColor={
                  user.chainId === config.chainId
                    ? color === "white"
                      ? "blackAlpha.300"
                      : "whiteAlpha.200"
                    : "red.500"
                }
              >
                {user.chainId === config.chainId ? (
                  <Image src="assets/matic.png" w="6" h="6" alt="matic-logo" />
                ) : (
                  <Image src="assets/eth.png" w="6" h="6" alt="eth-logo" />
                )}
                <Text
                  maxW="100px"
                  color={color == "white" ? "black" : "white"}
                  isTruncated={true}
                  fontWeight="medium"
                >
                  {user.address}
                </Text>
              </Flex>
            </MenuButton>
            <MenuList>
              {user.address && (
                <MenuItem
                  onClick={() => {
                    disconnectWallet();
                    localStorage.removeItem("method");
                    window.location.href = "/";
                  }}
                  icon={<FaSignOutAlt />}
                >
                  Sign out
                </MenuItem>
              )}
            </MenuList>
          </Menu>
        )}
      </Flex>
    </Box>
  );
}
