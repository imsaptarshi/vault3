/* eslint-disable react-hooks/exhaustive-deps */
import type { NextPage } from "next";
import {
  Box,
  Text,
  Flex,
  Image,
  AspectRatio,
  Link,
  Spinner,
} from "@chakra-ui/react";
import { FaImage, FaLock, FaUnlock } from "react-icons/fa";
import Typed from "react-typed";
import Navigation from "../components/Navigation/Navigation.component";
import { useDropzone } from "react-dropzone";
import { LegacyRef, useCallback, useContext, useEffect, useState } from "react";
import getBase64 from "../utils/helpers/base64";
import React from "react";
import { AccessStatus } from "../types/accessStatus.enum";
import NewImageKey from "../components/Modals/NewImageKey.modal";
import { ImageKeyContext } from "../utils/providers/ImageKey.provider";
import WalletConnect from "../components/Modals/WalletConnect.modal";
import { UserContext } from "../utils/providers/User.provider";
import CreateNewImageKey from "../components/Modals/CreateNewImageKey.modal";
import keyGetter from "../utils/helpers/keyGetter";
import { ConnectorOptions, useWeb3 } from "@3rdweb/hooks";
import config from "../utils/helpers/config";
import Head from "next/head";
import Steps from "../components/Sections/Steps.section";
import Footer from "../components/Navigation/Footer.component";

const Home: NextPage = () => {
  const { imageKey, setImageKey } = useContext(ImageKeyContext);
  const { connectWallet } = useWeb3();
  const { user } = useContext(UserContext);
  const [accessStatus, setAccessStatus] = useState<any>(undefined);
  const [newImageKeyModal, setImageKeyModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showNewKeyModal, setShowNewKeyModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(undefined);
  const DropzoneRef: LegacyRef<HTMLDivElement> | undefined = React.createRef();

  useEffect(() => {
    if (localStorage.getItem("method")) {
      let method: keyof ConnectorOptions | any = String(
        localStorage.getItem("method")
      );
      connectWallet(method);
    }
  }, []);

  const handleImageKeySubmit = async () => {
    if (user?.address?.length > 0) {
      if (!imageKey?.byteData) {
        DropzoneRef.current?.focus();
      } else {
        setLoading(true);
        const keyData = await keyGetter(imageKey, user.address);
        setAccessStatus(keyData?.accessStatus);
        if (keyData?.accessStatus === AccessStatus.KEY_MATCHED) {
          setError(undefined);
          sessionStorage.setItem("imageKey", JSON.stringify(imageKey));
          window.location.href = "/dashboard";
        }
        if (keyData?.accessStatus === AccessStatus.KEY_NOT_FOUND) {
          setShowNewKeyModal(true);
        }
        if (keyData?.accessStatus === AccessStatus.KEY_NOT_MATCHED) {
          setError("Key doesn't match");
        }
        setLoading(false);
      }
    } else {
      setShowLoginModal(true);
    }
  };

  const onDrop = useCallback((acceptedFiles) => {
    const imageData = acceptedFiles[0];
    if (
      (acceptedFiles[0].type === "image/jpeg" ||
        acceptedFiles[0].type === "image/png" ||
        acceptedFiles[0].type === "image/svg" ||
        acceptedFiles[0].type === "image/svg+xml" ||
        acceptedFiles[0].type === "image/gif" ||
        acceptedFiles[0].type === "image/webp") &&
      acceptedFiles[0].size <= config.maxFileSize
    ) {
      setError(undefined);
      setImageKey({ fileData: imageData, byteData: undefined });
      getBase64(imageData)
        .then((data) => {
          setImageKey({ byteData: data, fileData: imageData });
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (
      acceptedFiles[0].type === "image/jpeg" ||
      acceptedFiles[0].type !== "image/png" ||
      acceptedFiles[0].type !== "image/svg" ||
      acceptedFiles[0].type !== "image/svg+xml" ||
      acceptedFiles[0].type !== "image/gif" ||
      acceptedFiles[0].type !== "image/webp"
    ) {
      setError("File type not supported");
    } else {
      setError("Maximum upload size is 8 MB");
    }
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <Box bg="#030A1C">
      <Head>
        <title>Vault3 | Your Safest Decentralized Vault</title>
      </Head>
      <CreateNewImageKey
        isOpen={showNewKeyModal}
        onButtonClick={() => {
          setImageKeyModal(true);
          setShowNewKeyModal(false);
        }}
        onClose={() => {
          setShowNewKeyModal(false);
        }}
      />

      <WalletConnect
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />
      {newImageKeyModal && (
        <NewImageKey
          isOpen={newImageKeyModal}
          onClose={() => {
            setImageKeyModal(false);
          }}
        />
      )}
      <Image
        src="assets/ui_blur_1.png"
        position="absolute"
        opacity={{ base: 0.3, md: 0.6, lg: 0.8 }}
        top="0"
        right="0"
        zIndex={2}
        alt="ui-blur-one"
      />
      <Image
        src="assets/ui_blur_2.png"
        position="absolute"
        opacity={0.56}
        top="20"
        left="0"
        zIndex={2}
        alt="ui-blur-two"
      />
      <Box position="relative" zIndex={3} maxW="6xl" mx="auto">
        <Navigation color="black" />
        <Box padding={{ base: "24px", md: "30px" }} />
        <Box
          color="white"
          mb="20"
          px="6"
          mx="auto"
          display="flex"
          flexDir="column"
          alignItems="center"
        >
          <Box
            fontSize={{ base: "6xl", md: "6xl", lg: "7xl", xl: "8xl" }}
            mt="10"
            textAlign="center"
            fontWeight="black"
            display="flex"
            justifyContent="center"
            experimental_spaceX={{ md: "7" }}
            experimental_spaceY={{ base: "-7", md: "0" }}
            flexDir={{ base: "column", md: "row" }}
          >
            <Text
              style={{
                background:
                  "-webkit-linear-gradient(169.29deg, #00E3D6 -36.18%, #3788FF 116.82%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Vault
            </Text>
            <Text minH="92px">
              <Typed
                showCursor={false}
                strings={["you", "everyone", "we"]}
                loop
                smartBackspace={true}
                backDelay={2000}
                typeSpeed={90}
                backSpeed={80}
              />
            </Text>
            <Text>trust</Text>
          </Box>
          <Text
            px="4"
            color="whiteAlpha.800"
            mt={{ base: "3", md: "2", lg: "2" }}
            mb={{ base: "10", md: "8", lg: "8" }}
            fontSize={{ md: "xl", lg: "xl" }}
            textAlign="center"
          >
            Secure your passwords, images, documents and much more on-chain with
            vault3.
          </Text>

          <Flex
            maxW="lg"
            mt="4"
            mx="auto"
            fontSize={{ lg: "lg" }}
            rounded="2xl"
            justify="space-between"
            bg="transparent"
            boxShadow="0px 4px 147px rgba(49, 152, 254, 0.54)"
          >
            <input
              style={{ display: "none" }}
              {...getInputProps()}
              type="file"
              accept="image/*"
            />
            <Flex
              {...getRootProps()}
              border="dashed 2px"
              borderRight="0px"
              transitionDuration="200ms"
              _hover={{ borderColor: "#31C0FE" }}
              _focus={{ borderColor: "#31C0FE" }}
              ref={DropzoneRef}
              outline="none"
              borderColor={
                isDragActive ? "#31C0FE" : error ? "red.500" : "whiteAlpha.400"
              }
              bg="rgba(105, 180, 255, 0.24)"
              py={{ base: "3", lg: "4" }}
              px={{ base: "5", lg: "6" }}
              pr={{ base: "2", md: "6" }}
              alignItems="center"
              roundedLeft="2xl"
              cursor="pointer"
              experimental_spaceX="4"
              w="full"
            >
              <Box color="#31C0FE">
                <FaImage size="34px" />
              </Box>
              {imageKey ? (
                <Text
                  noOfLines={1}
                  wordBreak="break-all"
                  color="whiteAlpha.900"
                >
                  {imageKey?.fileData?.name}
                </Text>
              ) : (
                <Text
                  noOfLines={1}
                  wordBreak="break-all"
                  color="whiteAlpha.600"
                >
                  Drop your image key
                </Text>
              )}
            </Flex>

            <Flex
              bg="linear-gradient(289.29deg, #00E3D6 -76.18%, #3788FF 116.82%)"
              cursor="pointer"
              transitionDuration="200ms"
              _hover={{ filter: "brightness(95%)" }}
              px={{ base: "6", lg: "7" }}
              experimental_spaceX="2"
              alignItems="center"
              color="white"
              fontWeight="bold"
              roundedRight="2xl"
              onClick={handleImageKeySubmit}
            >
              {imageKey?.byteData ? (
                loading ? (
                  <Spinner w="18px" h="18px" />
                ) : (
                  <FaUnlock />
                )
              ) : (
                <FaLock />
              )}
              <Text>Unlock</Text>
            </Flex>
          </Flex>

          <Box mt="4" textAlign="center">
            {error && (
              <Text display="block" fontSize="sm" color="red.500">
                {error}
              </Text>
            )}
            <Text display="inline" color="whiteAlpha.600">
              Not sure how it works?
            </Text>{" "}
            <Link color="whiteAlpha.800" href="/#steps">
              Get started
            </Link>
          </Box>
          <Flex
            position="relative"
            w="full"
            maxW="800px"
            h="fit-content"
            justify="center"
            className="gradient-box"
            mt="14"
            rounded="2xl"
          >
            <AspectRatio
              ratio={16 / 9}
              position="relative"
              w="full"
              rounded="xl"
              overflow="hidden"
            >
              <div
                style={{
                  paddingBottom: "56.25%",

                  height: "0",
                }}
              >
                <iframe
                  src="https://www.loom.com/embed/9c53fa5ef09043079a69ff855d188e87"
                  frameBorder="0"
                  allowFullScreen
                  style={{
                    position: "absolute",
                    top: "0",
                    left: "0",
                    width: "100%",
                    height: "100%",
                  }}
                ></iframe>
              </div>
            </AspectRatio>
          </Flex>
        </Box>
      </Box>
      <Steps />

      <Footer />
    </Box>
  );
};

export default Home;
