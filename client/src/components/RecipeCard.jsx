import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Flex,
  Avatar,
  Box,
  Heading,
  Text,
  Image,
} from "@chakra-ui/react";
import { ViewIcon, AddIcon, CheckIcon } from "@chakra-ui/icons";
import React from "react";
import { useState } from "react";
import ViewMoreModal from "./ViewMoreModal";

const RecipeCard = ({ recipe, saveRecipe, isSaved, whichPage }) => {
  const [showModal, setShowModal] = useState(false);
  const [saved, setSaved] = useState(false);
  const { username, imageUrl, name, _id, description } = recipe;
  const handleSaveButtonClick = async () => {
    await saveRecipe(_id);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };
  return (
    <div className="mb-6">
      {showModal && (
        <ViewMoreModal
          recipe={recipe}
          showModal={showModal}
          onClose={() => setShowModal(false)}
        />
      )}

      <Card maxW="md">
        <CardHeader>
          <Flex spacing="4">
            <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
              <Avatar name={username} />
              <Box>
                <Heading size="sm">{username}</Heading>
              </Box>
            </Flex>
          </Flex>
        </CardHeader>
        <CardBody>
          <Text>{name}</Text>
          <Text>{description}</Text>
        </CardBody>
        <Image
          objectFit="cover"
          src={imageUrl}
          alt={`Recipe picture of ${name}`}
          className="max-w-96"
        />

        <CardFooter
          justify="space-between"
          flexWrap="wrap"
          sx={{
            "& > button": {
              minW: "136px",
            },
          }}
        >
          <Button
            flex="1"
            variant="ghost"
            leftIcon={<ViewIcon />}
            onClick={() => setShowModal(true)}
            className="hover:text-blue-500"
          >
            View more
          </Button>
          {whichPage === "home" && (
            <Button
              flex="1"
              variant="ghost"
              className={!isSaved(recipe._id) ? "hover:text-green-500": ""}
              leftIcon={
                !isSaved(recipe._id) ? (
                  <AddIcon />
                ) : (
                  <CheckIcon color={saved ? "green.500" : "currentColor"} 
                  className={isSaved(recipe._id) ? "" : ""}
                  />
                )
              }
              onClick={handleSaveButtonClick}
            >
              {!isSaved(recipe._id) ? "Save" : "Saved"}
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default RecipeCard;
