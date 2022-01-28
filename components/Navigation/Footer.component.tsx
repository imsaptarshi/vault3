/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Flex, Image, Text, Box, Grid, Divider, Link } from "@chakra-ui/react";
import config from "../../utils/helpers/config";
import NextLink from "next/link";
import { TwitterShareButton } from "react-twitter-embed";

import type { TextLinkProps } from "../../types/props";

const TextLink: React.FC<TextLinkProps> = ({ text, href }) => {
  return (
    <Link href={href} target="_blank" rel="noreferrer">
      <Text color="white">{text}</Text>
    </Link>
  );
};

export default function Footer() {
  return (
    <Box
      zIndex={999}
      bottom="0"
      left="0"
      w="full"
      display="flex"
      flexDirection="column"
      alignItems="center"
      transitionDuration="300ms"
      bg="linear-gradient(292.63deg, #00254A -20.23%, #000012 88.04%)"
      justifyContent="center"
    >
      <Divider filter="brightness(30%)" />
      <Flex
        justify="space-between"
        w="full"
        alignItems="center"
        px={{ md: "10", lg: "10" }}
        direction={{ base: "column", md: "row" }}
        py="16"
        maxW="5xl"
      >
        <NextLink href="/" passHref>
          <Flex alignItems="center" experimental_spaceX="6" cursor="pointer">
            <Image
              src="assets/vault3_logo.svg"
              alt="vault3"
              w={{ base: "14", lg: "16" }}
              h={{ base: "14", lg: "16" }}
            />
            <Flex
              fontSize={{ base: "4xl", lg: "6xl" }}
              color="white"
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
        </NextLink>

        <a
          href="https://www.producthunt.com/posts/vault3-1?utm_source=badge-top-post-badge&utm_medium=badge&utm_souce=badge-vault3-1"
          target="_blank"
          rel="noreferrer"
        >
          <Image
            src="https://api.producthunt.com/widgets/embed-image/v1/top-post-badge.svg?post_id=327816&theme=dark&period=daily"
            alt="Vault3 - A safe, decentralized vault for your files | Product Hunt"
            width="200"
            height="45"
          />
        </a>

        <Grid
          mt={{ base: "10", md: "0" }}
          templateColumns={{
            base: "repeat(3,1fr)",
            sm: "repeat(3,1fr)",
            md: "repeat(3,1fr)",
            lg: "repeat(3, 1fr)",
          }}
          gap={{ md: "10", lg: "20" }}
          textAlign="center"
          fontSize="base"
          color="white"
        >
          <Grid templateColumns="repeat(1,1fr)" gap="4">
            <TextLink
              text="Contract"
              href={`https://mumbai.polygonscan.com/address/${config.userVault.address}`}
            />
            <TwitterShareButton
              url={"https://vault3.live"}
              options={{
                text: "Vault3 | Your Safest Decentralized Vault\n#vault3\n",
              }}
            />
          </Grid>
          <Grid templateColumns="repeat(1,1fr)" gap="4">
            <TextLink
              text="Support"
              href="mailto:123saptarshi.basu@gmail.com"
            />
            <TextLink text="Product" href="/wiki" />
          </Grid>
          <Grid templateColumns="repeat(1,1fr)" gap="4">
            <TextLink text="How to use" href="/guide" />

            <TextLink href="/about" text="Team" />
          </Grid>
        </Grid>
      </Flex>
    </Box>
  );
}
