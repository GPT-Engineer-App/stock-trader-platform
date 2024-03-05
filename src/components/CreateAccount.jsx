import React, { useState } from "react";
import { Box, Button, FormControl, FormLabel, Input, VStack } from "@chakra-ui/react";

const CreateAccount = ({ onCreate }) => {
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreate({ fullName, username, email });
    setFullName("");
    setUsername("");
    setEmail("");
  };

  return (
    <Box as="form" onSubmit={handleSubmit}>
      <VStack spacing={4}>
        <FormControl isRequired>
          <FormLabel>Full Name</FormLabel>
          <Input value={fullName} onChange={(e) => setFullName(e.target.value)} />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Username</FormLabel>
          <Input value={username} onChange={(e) => setUsername(e.target.value)} />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Email</FormLabel>
          <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </FormControl>
        <Button type="submit" colorScheme="teal">
          Create Account
        </Button>
      </VStack>
    </Box>
  );
};

export default CreateAccount;
